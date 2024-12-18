import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { paginationOptsValidator } from 'convex/server';
import { filter } from 'convex-helpers/server/filter';

/**
 * 创建新文档
 * @param title - 可选的文档标题
 * @param initialContent - 可选的初始内容
 * @returns 新创建的文档ID
 * @throws ConvexError 当用户未认证时
 */
export const create = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError('未经授权');
    }
    return await ctx.db.insert('documents', {
      title: args.title ?? '无标题文档',
      initialContent: args.initialContent ?? '',
      ownerId: user.subject,
    });
  },
});

/**
 * 获取文档列表
 * @param paginationOpts - 分页选项
 * @param search - 可选的搜索关键词
 * @returns 分页后的文档列表
 * @throws ConvexError 当用户未认证时
 */
export const get = query({
  args: v.object({
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
  }),
  handler: async (ctx, { search, paginationOpts }) => {
    // return await ctx.db.query('documents').collect();
    // return await ctx.db.query('documents').paginate(paginationOpts);

    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError('未经授权');
    }

    console.log('user >>>', user);

    /**
     * 搜索逻辑：
     * 1. 如果提供了search参数，使用search_title索引进行标题搜索
     * 2. 同时确保只返回当前用户拥有的文档
     * 3. 使用分页选项限制返回结果数量
     *
     * withSearchIndex('search_title', q => q.search('title', search).eq('ownerId', user.subject))
     * Convex 的 search() 方法默认使用前缀匹配（prefix matching）
     *
     */
    if (search) {
      // return await ctx.db
      //   .query('documents')
      //   .withSearchIndex('search_title', q => q.search('title', search).eq('ownerId', user.subject))
      //   .paginate(paginationOpts);
    }

    if (search) {
      return await filter(
        ctx.db.query('documents').withIndex('by_owner_id', q => q.eq('ownerId', user.subject)),
        document => document.title.includes(search),
      )
        .order('desc')
        .paginate(paginationOpts);
    }

    /**
     * 默认查询：
     * 使用by_owner_id索引获取当前用户的所有文档
     */
    return await ctx.db
      .query('documents')
      .withIndex('by_owner_id', q => q.eq('ownerId', user.subject))
      .order('desc')
      .paginate(paginationOpts);
  },
});

/**
 * 删除指定文档
 * @param id - 要删除的文档ID
 * @throws ConvexError 当文档不存在或用户无权限时
 */
export const removeById = mutation({
  args: {
    id: v.id('documents'),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError('未经授权');
    }

    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new ConvexError('文档不存在');
    }

    if (document.ownerId !== user.subject) {
      throw new ConvexError('未经授权');
    }

    return await ctx.db.delete(args.id);
  },
});

/**
 * 更新文档标题
 * @param id - 要更新的文档ID
 * @param title - 新的文档标题
 * @throws ConvexError 当文档不存在或用户无权限时
 */
export const updateById = mutation({
  args: {
    id: v.id('documents'),
    title: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError('未经授权');
    }

    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new ConvexError('文档不存在');
    }

    if (document.ownerId !== user.subject) {
      throw new ConvexError('未经授权');
    }

    return await ctx.db.patch(args.id, {
      title: args.title,
    });
  },
});

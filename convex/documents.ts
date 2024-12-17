import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { paginationOptsValidator } from 'convex/server';

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

export const get = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    // return await ctx.db.query('documents').collect();
    return await ctx.db.query('documents').paginate(args.paginationOpts);
  },
});

export const removeById = mutation({
  args: {
    id: v.id('documents'),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError('Unauthorized');
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

export const updateById = mutation({
  args: {
    id: v.id('documents'),
    title: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError('Unauthorized');
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

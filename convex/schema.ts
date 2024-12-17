import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    // 初始内容
    initialContent: v.optional(v.string()),
    // 文档所有者
    ownerId: v.string(),
    // 房间id，用于协作
    roomId: v.optional(v.string()),
    /**
     * 组织id
     * 使用 organizationId 和 roomId 来启用权限协作
     * 我们对谁可以访问我们的房间有严格的规定，只有在我们的房间里居住过的人才可以访问。
     * 谁可以访问我们的房间非常严格，只有在我们组织内的人才可以被邀请，而这些邀请将会发送到用户的邮箱。
     */
    organizationId: v.optional(v.string()),
  })
    .index('by_owner_id', ['ownerId'])
    .index('by_organization_id', ['organizationId'])
    .searchIndex('search_title', {
      // 指定要搜索的字段
      searchField: 'title',
      /**
       * 用于精确过滤的字段
       * 过滤字段将是创建者 ID 和组织 ID，这样我们就不会遍历整个数据库，而只会查找特定文档的创建者或组织 ID
       */
      filterFields: ['ownerId', 'organizationId'],
    }),
});

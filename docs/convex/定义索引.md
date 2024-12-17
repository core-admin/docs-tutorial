基于 Convex 文档，我来解释如何定义索引:

```typescript
// ... existing code ...
documents: defineTable({
  title: v.string(),
  initialContent: v.optional(v.string()),
  ownerId: v.string(),
  roomId: v.optional(v.string()),
  organizationId: v.optional(v.string()),
})
.index("by_owner", ["ownerId"]) // 按所有者查询
.index("by_org_room", ["organizationId", "roomId"]) // 按组织和房间查询
.index("by_room", ["roomId"]), // 按房间查询
// ... existing code ...
```

索引定义的关键点:

1. 使用 `.index()` 方法定义索引
2. 第一个参数是索引名称(必须唯一)
3. 第二个参数是要索引的字段数组
4. 可以定义多个索引
5. 系统会自动在每个索引末尾添加 `_creationTime` 字段
6. 索引字段顺序很重要,决定了排序优先级

限制:
- 每个表最多32个索引
- 每个索引最多16个字段
- 不能包含重复字段
- 不允许使用以 `_` 开头的保留字段

这些索引可以帮助你优化查询性能,特别是在按 ownerId、organizationId 或 roomId 过滤数据时。

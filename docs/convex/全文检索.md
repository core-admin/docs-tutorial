

# Convex SearchIndex 完整指南

## 1. 基本语法

```typescript
.searchIndex(
  "索引名称", // 可选
  {
    // 单字段搜索
    searchField: "fieldName",
    
    // 或多字段搜索
    searchFields: ["field1", "field2"],
    
    // 过滤字段
    filterFields: ["filter1", "filter2"],
    
    // 语言设置
    language: "zh" // en(默认), zh, ja, ko 等
  }
)
```

## 2. 参数详解

### 2.1 索引名称
- 类型: `string | undefined`
- 可选参数
- 在同一表内必须唯一
- 实际查询时不需要引用
- 仅用于提高代码可读性

### 2.2 配置对象

#### searchField/searchFields
```typescript
// 单字段
searchField: "title"

// 多字段
searchFields: ["title", "content", "description"]
```
- 必须是 string 类型字段
- 这些字段将被全文索引
- 支持模糊匹配和前缀搜索
- 搜索时会计算相关性得分

#### filterFields
```typescript
filterFields: ["status", "category", "tags", "authorId"]
```
- 用于精确过滤的字段
- 支持所有数据类型
- 不会被全文索引
- 用于快速筛选和过滤
- 最多16个字段

#### language
```typescript
language: "zh" // 设置中文分词
```
- 可选配置
- 默认为 "en"
- 支持的语言：
  - "en" - 英语
  - "zh" - 中文
  - "ja" - 日语
  - "ko" - 韩语
  - 等

## 3. 使用示例

### 3.1 基本定义
```typescript:convex/schema.ts
export default defineSchema({
  documents: defineTable({
    title: v.string(),
    content: v.string(),
    description: v.string(),
    status: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
    authorId: v.string(),
    createdAt: v.number(),
  })
  .searchIndex("docs_search", {
    searchFields: ["title", "content", "description"],
    filterFields: ["status", "category", "tags", "authorId"],
    language: "zh"
  })
});
```

### 3.2 查询示例
```typescript:convex/queries.ts
// 基本搜索
export const basicSearch = query({
  args: { searchText: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .search("documents")
      .search(args.searchText)
      .take(20);
  }
});

// 复杂搜索
export const advancedSearch = query({
  args: {
    searchText: v.string(),
    status: v.optional(v.string()),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    authorId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db
      .search("documents")
      .search(args.searchText);
    
    // 状态过滤
    if (args.status) {
      query = query.filter(q => q.eq("status", args.status));
    }
    
    // 分类过滤
    if (args.category) {
      query = query.filter(q => q.eq("category", args.category));
    }
    
    // 标签过滤
    if (args.tags?.length) {
      query = query.filter(q => q.includes("tags", args.tags));
    }
    
    // 作者过滤
    if (args.authorId) {
      query = query.filter(q => q.eq("authorId", args.authorId));
    }
    
    return await query
      .take(20);
  }
});
```

## 4. 限制条件

1. **索引限制**
   - 每个表只能有1个搜索索引
   - searchField/searchFields 必须是字符串类型
   - 最多16个 filterFields

2. **查询限制**
   - 搜索词最多16个词条
   - 过滤表达式最多8个
   - 单次查询最多返回1024条结果
   - 不支持正则表达式
   - 不支持通配符搜索

## 5. 最佳实践

### 5.1 索引设计
```typescript
// 好的实践
.searchIndex("content_search", {
  searchFields: ["title", "content"], // 核心搜索内容
  filterFields: [
    "status",      // 用于状态过滤
    "category",    // 用于分类过滤
    "tags",        // 用于标签过滤
    "authorId",    // 用于权限控制
    "isPublished"  // 用于可见性控制
  ]
})
```

### 5.2 性能优化
1. **使用 filterFields**
   - 优先使用 filterFields 进行过滤
   - 避免在 searchFields 中放入不需要搜索的字段

2. **分页处理**
```typescript
// 推荐
const results = await query.take(20);

// 不推荐
const allResults = await query.collect();
```

3. **合理使用复合查询**
```typescript
// 好的实践
query
  .search(searchText)
  .filter(q => q.eq("status", "published"))
  .filter(q => q.gt("createdAt", timestamp))
  .take(20);
```

### 5.3 错误处理
```typescript
try {
  const results = await ctx.db
    .search("documents")
    .search(searchText)
    .take(20);
    
  if (results.length === 0) {
    // 处理无结果情况
  }
} catch (error) {
  // 处理搜索错误
}
```

## 6. 搜索特性
1. **模糊匹配**
   - 自动处理拼写错误
   - 支持部分匹配

2. **相关性排序**
   - 基于 TF-IDF 算法
   - 考虑词频和重要性

3. **实时更新**
   - 搜索索引实时更新
   - 支持事务性

4. **多语言支持**
   - 支持中文分词
   - 支持多语言检索

来源: [Convex Full Text Search](https://docs.convex.dev/search/text-search)

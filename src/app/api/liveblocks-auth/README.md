## rouer.ts 文件分析

### 整体功能

这是一个 Next.js 的 API 路由，主要用于处理 Liveblocks 的身份认证，确保只有授权用户才能访问特定的协作文档房间。

### 详细代码分析

1. **依赖导入部分**

```typescript
import { Liveblocks } from '@liveblocks/node';
import { ConvexHttpClient } from 'convex/browser';
import { auth, currentUser } from '@clerk/nextjs/server';
import { api } from '../../../../convex/_generated/api';
```

- `Liveblocks`: 实时协作功能的核心库
- `ConvexHttpClient`: Convex 数据库的 HTTP 客户端
- `auth, currentUser`: Clerk 身份认证服务的工具函数
- `api`: Convex 生成的类型安全 API

2. **客户端实例化**

```typescript
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});
```

- 创建 Convex 客户端实例，用于查询数据库
- 初始化 Liveblocks 实例，用于处理实时协作

3. **POST 请求处理流程**

```typescript
export async function POST(req: NextApiRequest, res: NextApiResponse) {
```

这个 POST 请求处理函数包含以下几个主要步骤：

a. **身份验证检查**

```typescript
const { sessionClaims } = await auth();
if (!sessionClaims) {
  return res.status(401).json({ message: '无权限访问' });
}

const user = await currentUser();
if (!user) {
  return res.status(401).json({ message: '无权限访问' });
}
```

- `auth()`: 验证当前请求是否带有有效的认证会话
- `currentUser()`: 获取当前认证用户的详细信息
- 如果任一验证失败，返回 401 未授权错误

b. **文档访问权限验证**

```typescript
const { room } = req.body;
const document = await convex.query(api.documents.getById, { id: room });

if (!document) {
  return res.status(404).json({ message: '文档不存在' });
}

const isOwner = document.ownerId === user.id;
const isOrgMember = document.organizationId === sessionClaims.org_id;

if (!isOwner && !isOrgMember) {
  return res.status(401).json({ message: '无权限访问' });
}
```

- 从请求体中获取房间 ID
- 使用 Convex 查询对应的文档
- 检查文档是否存在
- 验证用户是否有权限访问（文档所有者或组织成员）

c. **Liveblocks 会话准备**

```typescript
const session = liveblocks.prepareSession(user.id, {
  userInfo: {
    name: user.firstName ?? '匿名',
    avatar: user.imageUrl,
  },
});
```

- 创建 Liveblocks 会话
- 设置用户信息（名字和头像）
- 这些信息将在协作时对其他用户可见

d. **授权访问并返回令牌**

```typescript
session.allow(room, session.FULL_ACCESS);
const { status, body } = await session.authorize();
return res.status(status).json(body);
```

- `session.allow()`: 授予用户对特定房间的完全访问权限
- `session.authorize()`: 生成访问令牌
- 返回授权状态和访问令牌

### 安全性考虑

1. 多重身份验证检查（Clerk 会话和用户验证）
2. 文档访问权限验证（所有者或组织成员）
3. 使用环境变量存储敏感信息
4. 令牌基于特定用户和房间生成

### 使用场景

这个 API 路由通常在以下情况被调用：

1. 用户首次进入协作文档时
2. 需要刷新访问令牌时
3. 切换到不同文档时

这个认证流程确保了实时协作的安全性，同时提供了良好的用户体验，因为它包含了用户的个性化信息（名字和头像）。

## prepareSession 与 identifyUser

### 1. prepareSession（访问令牌模式）

```typescript
const session = liveblocks.prepareSession(user.id, {
  userInfo: { name: '张三', avatar: '...' },
});
session.allow('room-123', session.FULL_ACCESS);
```

**特点：**

- 类似酒店房卡系统
- 权限直接包含在令牌中
- 权限在后端代码中动态控制
- 适合动态/复杂的权限逻辑
- 无需预先设置权限规则

### 2. identifyUser（身份令牌模式）

```typescript
const { body, status } = await liveblocks.identifyUser(
  {
    userId: user.id,
    groupIds: ['team-1', 'admin'],
  },
  {
    userInfo: { name: '张三', avatar: '...' },
  },
);
```

**特点：**

- 类似会员卡系统
- 权限通过 Liveblocks REST API 预先配置
- 权限规则集中管理
- 适合固定/简单的权限规则
- 需要预先设置权限规则

### 选择建议

使用 `prepareSession` 当：

- 需要动态判断权限（如基于数据库查询）
- 权限逻辑复杂
- 想在代码中完全控制权限
- 需要频繁更改权限规则

使用 `identifyUser` 当：

- 权限规则相对固定
- 想集中管理权限
- 使用 Liveblocks 的权限 REST API
- 团队协作需要统一的权限管理

### 你的场景

根据你的代码，我建议继续使用 `prepareSession`，因为：

1. 你需要基于文档所有权和组织成员身份动态判断权限
2. 权限逻辑与数据库查询相关联
3. 需要在代码中灵活控制访问权限

参考：[Liveblocks 认证文档](https://liveblocks.io/docs/api-reference/liveblocks-node)

# 协作文档编辑器

[English](./README.md) · 中文

一个使用 Next.js、Convex 和 Tiptap 构建的实时协作文档编辑平台。支持多人实时协作、富文本编辑、文档模板等功能。

## 项目特点

- 🚀 基于 Next.js 15 App Router 架构
- 💾 使用 Convex 实现实时数据同步
- 🔐 集成 Clerk 提供完整的身份认证
- ⚡️ 支持实时协作,无缝多人编辑
- 📱 响应式设计,支持多端访问
- 🎨 现代化 UI 设计
- 🛠 完整的开发工具链支持

## 功能预览

![登录与仪表盘](/docs/preview/preview1.png)
*登录界面与项目仪表盘 - 安全的身份认证与文档管理*

![组织管理](/docs/preview/preview2.png)
*组织创建与管理 - 便捷的团队协作体验*

![富文本编辑器](/docs/preview/preview3.png)
*功能丰富的文本编辑器 - 全面的格式化与编辑工具*

![实时协作](/docs/preview/preview4.png)
*实时协作功能 - 在线实时编辑、用户在线状态及内联评论*

## 功能特性

- 🔄 实时协作编辑
- 📝 富文本编辑功能
- 👥 组织级权限管理
- 📋 文档模板系统
- 💬 内联评论功能
- 🎨 丰富的格式化选项
- 📱 响应式设计
- 🔍 文档搜索功能
- 📂 文件夹组织管理
- 🔒 安全的访问控制

## 技术栈

### 前端

- **框架:** [Next.js 14](https://nextjs.org/docs) (App Router)
- **编辑器:** [Tiptap](https://tiptap.dev/docs/editor/introduction)
- **状态管理:** [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- **样式:** [Tailwind CSS](https://tailwindcss.com/docs)
- **UI组件:** [shadcn/ui](https://ui.shadcn.com/docs)
- **图标:** [Lucide Icons](https://lucide.dev/docs)

### 后端

- **数据库:** [Convex](https://docs.convex.dev/home)
- **认证:** [Clerk](https://clerk.com/docs)
- **实时协作:** [Liveblocks](https://liveblocks.io/docs)
- **文件存储:** [Convex Storage](https://docs.convex.dev/file-storage)

## 开发环境要求

- Node.js 18.0.0 或更高版本
- pnpm 9.0.0 或更高版本
- Git

## 开始使用

```bash
# 克隆仓库
git clone https://github.com/core-admin/docs-tutorial.git

# 进入项目目录
cd docs-tutorial

# 安装依赖
pnpm install

# 设置环境变量
cp .env.example .env.local

# 启动开发服务器
pnpm dev
```

## 项目结构

```
src/
├── app/                 # Next.js 应用路由页面
├── components/         # 可复用组件
│   ├── ui/            # shadcn/ui 组件
│   └── custom/        # 自定义业务组件
├── hooks/             # 自定义 React hooks
├── extensions/        # Tiptap 编辑器扩展
├── lib/              # 工具函数
├── constants/        # 常量和配置
├── store/            # 全局状态管理
└── styles/           # 全局样式
```

## 环境变量配置

```bash
# Clerk 认证
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=  # Clerk 公钥
CLERK_SECRET_KEY=                   # Clerk 密钥

# Convex
NEXT_PUBLIC_CONVEX_URL=            # Convex 部署 URL
CONVEX_DEPLOYMENT=                 # Convex 部署 ID
CONVEX_DEPLOY_KEY=                # Convex 部署密钥（部署时仅需这一个变量即可）

# Liveblocks
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY= # Liveblocks 公钥
LIVEBLOCKS_SECRET_KEY=            # Liveblocks 密钥（部署时仅需这一个变量即可）
```

## 核心功能说明

### 实时协作

- 基于 Liveblocks 的实时协作系统
- 支持多人同时编辑
- 实时光标和选区显示
- 用户在线状态同步
- 冲突自动解决

### 文档编辑

- 基于 Tiptap 的富文本编辑器
- 支持多种文本格式化选项
- 支持图片、表格等复杂元素
- 支持快捷键操作
- Markdown 语法支持

### 文档管理

- 文件夹结构组织
- 文档搜索功能
- 文档模板系统
- 文档版本历史
- 文档导入导出

### 权限控制

- 基于组织的访问控制
- 文档级别权限设置
- 支持公开分享
- 访问记录追踪

## 开发指南

### 本地开发

```bash
# 启动开发服务器
pnpm dev

# 启动数据库
pnpm convex:dev
```

### 代码检查

```bash
# 运行 ESLint
pnpm lint
```

### 构建部署

```bash
# 构建项目
pnpm build

# 本地预览构建结果
pnpm start
```

## 部署

1. 确保所有环境变量已正确配置
2. 构建项目
3. 部署到支持 Node.js 的平台（推荐 Vercel）

详细部署指南请参考 [部署文档](docs/deployment.md)

## 性能优化

- 图片自动优化
- 路由预加载
- 组件懒加载
- 静态资源缓存
- API 响应缓存

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 发起 Pull Request

更多详情请参考 [贡献指南](CONTRIBUTING.md)

## 问题反馈

如果你发现任何问题或有改进建议，请:

1. 查看 [常见问题](FAQ.md)
2. 搜索已存在的 [Issues](https://github.com/core-admin/docs-tutorial/issues)
3. 创建新的 Issue 或直接联系维护者

## 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 了解详情

## 维护者

- [@core-admin](https://github.com/core-admin)

## 致谢

感谢以下项目：

- [Next.js](https://nextjs.org)
- [Tiptap](https://tiptap.dev)
- [Convex](https://convex.dev)
- [Clerk](https://clerk.com)
- [Liveblocks](https://liveblocks.io)
- [shadcn/ui](https://ui.shadcn.com)

---

如果觉得这个项目对你有帮助，欢迎 star ⭐️

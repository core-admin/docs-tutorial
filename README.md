# Collaborative Document Editor

English · [中文](./README-zh_CN.md)

A real-time collaborative document editing platform built with Next.js, Convex, and Tiptap. Features include real-time collaboration, rich text editing, and document templates.

## Key Features

- 🚀 Built on Next.js 15 App Router architecture
- 💾 Real-time data synchronization with Convex
- 🔐 Complete authentication with Clerk
- ⚡️ Real-time collaboration for seamless multi-user editing
- 📱 Responsive design for multi-device access
- 🎨 Modern UI design
- 🛠 Comprehensive development toolchain support

## Feature Set

- 🔄 Real-time collaborative editing
- 📝 Rich text editing capabilities
- 👥 Organization-level permission management
- 📋 Document template system
- 💬 Inline commenting functionality
- 🎨 Rich formatting options
- 📱 Responsive design
- 🔍 Document search functionality
- 📂 Folder organization
- 🔒 Secure access control

## Tech Stack

### Frontend

- **Framework:** [Next.js 14](https://nextjs.org/docs) (App Router)
- **Editor:** [Tiptap](https://tiptap.dev/docs/editor/introduction)
- **State Management:** [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/docs)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/docs)
- **Icons:** [Lucide Icons](https://lucide.dev/docs)

### Backend

- **Database:** [Convex](https://docs.convex.dev/home)
- **Authentication:** [Clerk](https://clerk.com/docs)
- **Real-time Collaboration:** [Liveblocks](https://liveblocks.io/docs)
- **File Storage:** [Convex Storage](https://docs.convex.dev/file-storage)

## Development Requirements

- Node.js 18.0.0 or higher
- pnpm 9.0.0 or higher
- Git

## Getting Started

```bash
# Clone repository
git clone https://github.com/core-admin/docs-tutorial.git

# Navigate to project directory
cd docs-tutorial

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Start development server
pnpm dev
```

## Project Structure

```
src/
├── app/                 # Next.js application routes and pages
├── components/         # Reusable components
│   ├── ui/            # shadcn/ui components
│   └── custom/        # Custom business components
├── hooks/             # Custom React hooks
├── extensions/        # Tiptap editor extensions
├── lib/              # Utility functions
├── constants/        # Constants and configurations
├── store/            # Global state management
└── styles/           # Global styles
```

## Environment Variables

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=  # Clerk public key
CLERK_SECRET_KEY=                   # Clerk secret key

# Convex
NEXT_PUBLIC_CONVEX_URL=            # Convex deployment URL
CONVEX_DEPLOYMENT=                 # Convex deployment ID
CONVEX_DEPLOY_KEY=                # Convex deploy key (only needed for deployment)

# Liveblocks
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY= # Liveblocks public key
LIVEBLOCKS_SECRET_KEY=            # Liveblocks secret key (only needed for deployment)
```

## Core Functionality

### Real-time Collaboration

- Real-time collaboration system based on Liveblocks
- Support for simultaneous multi-user editing
- Real-time cursor and selection display
- User online status synchronization
- Automatic conflict resolution

### Document Editing

- Rich text editor based on Tiptap
- Multiple text formatting options
- Support for complex elements like images and tables
- Keyboard shortcut support
- Markdown syntax support

### Document Management

- Folder structure organization
- Document search functionality
- Document template system
- Document version history
- Document import/export

### Access Control

- Organization-based access control
- Document-level permission settings
- Public sharing support
- Access tracking

## Development Guide

### Local Development

```bash
# Start development server
pnpm dev

# Start database
pnpm convex:dev
```

### Code Checking

```bash
# Run ESLint
pnpm lint
```

### Build and Deploy

```bash
# Build project
pnpm build

# Preview build locally
pnpm start
```

## Deployment

1. Ensure all environment variables are properly configured
2. Build the project
3. Deploy to a Node.js-compatible platform (Vercel recommended)

For detailed deployment instructions, refer to the [Deployment Documentation](docs/deployment.md)

## Performance Optimization

- Automatic image optimization
- Route preloading
- Component lazy loading
- Static asset caching
- API response caching

## Contributing Guidelines

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

For more details, please refer to the [Contributing Guidelines](CONTRIBUTING.md)

## Feedback

If you discover any issues or have suggestions for improvements:

1. Check the [FAQ](FAQ.md)
2. Search existing [Issues](https://github.com/core-admin/docs-tutorial/issues)
3. Create a new Issue or contact maintainers directly

## License

This project is open-sourced under the MIT License - see [LICENSE](LICENSE) for details

## Maintainers

- [@core-admin](https://github.com/core-admin)

## Acknowledgments

Thanks to the following projects:

- [Next.js](https://nextjs.org)
- [Tiptap](https://tiptap.dev)
- [Convex](https://convex.dev)
- [Clerk](https://clerk.com)
- [Liveblocks](https://liveblocks.io)
- [shadcn/ui](https://ui.shadcn.com)

---

If you find this project helpful, please consider giving it a star ⭐️

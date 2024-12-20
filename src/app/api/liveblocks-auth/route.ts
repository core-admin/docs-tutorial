import { Liveblocks } from '@liveblocks/node';
import { ConvexHttpClient } from 'convex/browser';
import { auth, currentUser } from '@clerk/nextjs/server';
import { api } from '../../../../convex/_generated/api';
import { getUserName } from '@/lib/utils';

const returnUnauthorized = (message: string) => {
  return new Response(JSON.stringify({ message }), {
    status: 401,
    // 禁止重试 - Liveblocks 会自动重试，此设置无效
    headers: {
      'X-Should-Retry': 'false',
    },
  });
};

/**
 * 创建一个 Convex HTTP 客户端实例，用于与 Convex 后端服务进行通信。
 * ConvexHttpClient - 这是 Convex 提供的一个客户端类，用于处理与 Convex 后端的 HTTP 通信。
 *   - 发送 HTTP 请求到 Convex 后端
 *   - 查询数据
 *   - 调用 Convex 函数
 *   - 管理数据同步
 *
 * 当一个没有权限的用户访问我的文档地址时，当前请求会执行抛出401的错误。
 * 默认情况下 Convex 会自动重试失败的请求，当超过重试次数后，会展示错误页面（error.tsx）。
 */
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(req: Request, res: Response) {
  const { sessionClaims } = await auth();

  if (!sessionClaims) {
    return returnUnauthorized('无权限访问');
  }

  const user = await currentUser();

  if (!user) {
    return returnUnauthorized('无权限访问');
  }

  const { room } = await req.json();
  console.log('room >>>>>>>>>>>>>>', room);
  const document = await convex.query(api.documents.getById, { id: room });

  if (!document) {
    return returnUnauthorized('文档不存在');
  }

  const isOwner = document.ownerId === user.id;
  const isOrgMember = document.organizationId != undefined && document.organizationId === sessionClaims.org_id;

  /**
   * 只要是文档的拥有者或者组织成员，都可以访问（都会创建可允许访问的jwt，然后根据对应的jwt与房间建立关联）
   */
  if (!isOwner && !isOrgMember) {
    return returnUnauthorized('无权限访问');
  }

  /**
   * 准备一个新的会话以授权用户访问 Liveblocks。
   *
   * 重要提示：
   * 在调用 .prepareSession() 之前，务必确保你信任向后端发起请求的用户！
   *
   * @param userId 告诉 Liveblocks 要授权的用户ID。必须在你的系统中
   * 唯一标识用户账户。此值的唯一性将决定计费时计算的月活用户(MAU)数量。
   *
   * @param options.userInfo 附加到此用户的自定义元数据。你在这里添加的
   * 数据将对房间中的所有其他客户端可见，可通过 `other.info` 属性访问。
   *
   * prepareSession 是 Liveblocks 中的一个核心方法，用于创建和准备用户会话。它的主要作用是：
   *  - 初始化一个新的实时协作会话
   *  - 为用户建立安全的连接通道
   *  - 为后续的用户身份验证和房间访问做准备
   */
  console.log('liveblocks-auth user >>> ', user, user.fullName);
  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name: getUserName(user),
      avatar: user.imageUrl,
    },
  });

  // 授予用户对特定房间的完全访问权限
  session.allow(room, session.FULL_ACCESS);
  /**
   * 生成访问令牌：返回授权状态和访问令牌
   *
   * 调用此功能可授权会话访问 Liveblocks。
   * 请注意，这将返回一个 Liveblocks "访问令牌"。
   * 获得该访问令牌的任何人都可以访问允许访问的资源。
   */
  const { status, body } = await session.authorize();

  return new Response(body, { status });
}

/**
 * POST(req: NextApiRequest, res: NextApiResponse)
 *  取值：const { room } = req.body
 *  响应：res.status(status).json(body)
 *
 *
 * POST(req: Request, res: Response)
 *  取值：const { room } = await req.json()
 *  响应：new Response(JSON.stringify({ message: 'Hello, World!' }), { status: 200 })
 *
 * 在 Next.js 中，req与res 对象的类型取决于你使用的 API 路由的上下文。
 *  - 在 API 路由中，req 和 res 的类型是 NextRequest 和 NextResponse，
 *  - 而在普通的 API 路由中，req 和 res 的类型是 NextApiRequest 和 NextApiResponse。
 *
 * Next.js API 路由：
 *  import type { NextApiRequest, NextApiResponse } from 'next';
 *  export default function handler(req: NextApiRequest, res: NextApiResponse) {
 *    req 是 NextApiRequest 对象
 *  }
 *
 * 普通 API 路由：
 *  
 *  node http server：
 *   res.writeHead(200, { 'Content-Type': 'application/json' });
     res.end(JSON.stringify({ message: 'Hello, World!' }));
 * 
 *  比如：使用 xml-http-request 请求 或者 使用 fetch 请求
 *  const response = await fetch('/api/liveblocks-auth', {
 *    method: 'POST',
 *    body: JSON.stringify({ room: '123' }),
 *  });
 *  const data = await response.json();
 *  console.log(data);
 */

'use client';

import { Editor } from './editor';
import { Navbar } from './navbar';
import { Toolbar } from './toolbar';
import { Room } from './room';
import { Preloaded, usePreloadedQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Redirect } from '@/components/redirect';

interface DocumentProps {
  preloadedDocument: Preloaded<typeof api.documents.getById>;
}

/**
 * 既然我们已经有了文档，为什么还要这样做？
 * 这是因为文档可能随时被我们自己或其他用户更新（比如重命名），
 * 我们需要保持Convex的响应式特性和实时更新功能，所以必须通过这个查询方式来传递文档。
 *
 * 这样设计的工作流程是：首次加载由服务器组件处理，之后的更新则通过使用use preloaded query的客户端组件来完成。
 * 获取到文档后，我们可以将它作为props传递给Navbar组件。
 */

export const Document = ({ preloadedDocument }: DocumentProps) => {
  /**
   * 当处于 /documents/ 路径下删除文档时，由于数据库发生更新，
   * convex 感知到更新后，会自动再次获取文档信息，
   * 导致 api 中抛出错误，触发错误边界，
   * 因此我们需要在客户端组件中处理这种情况，
   * 当文档不存在时，重定向到 / 路径。
   */
  try {
    const document = usePreloadedQuery(preloadedDocument);

    if (!document) {
      return null;
    }

    return (
      <Room>
        <div className="DocumentIdPage h-screen bg-[#fafbfd] flex flex-col">
          <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#fafbfd] h-[104px] print:hidden">
            <Navbar data={document} />
            <Toolbar />
          </div>
          <div className="pt-[104px] print:pt-0 flex-1 overflow-auto">
            <Editor initialContent={document.initialContent} />
          </div>
        </div>
      </Room>
    );
  } catch (error) {
    return <Redirect to="/" />;
  }
};

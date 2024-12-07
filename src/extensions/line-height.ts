import { Extension } from '@tiptap/core';
import '@tiptap/extension-text-style';

/**
 * 扩展 @tiptap/core 模块的类型定义
 * 为 Commands 接口添加 fontSize 相关的命令
 */
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    lineHeight: {
      /**
       * 设置行高
       */
      setLineHeight: (lineHeight: string) => ReturnType;
      /**
       * 取消设置行高
       */
      unsetLineHeight: () => ReturnType;
    };
  }
}

/**
 * 字体大小扩展的配置选项接口
 */
export interface LineHeightOptions {
  types: string[];
  defaultLineHeight: 'inherit' | '1.2' | '1.5' | '2' | '2.5' | '3';
}

/**
 * 字体大小扩展的配置选项接口
 */
export const LineHeightExtension = Extension.create<LineHeightOptions>({
  name: 'lineHeight',
  addOptions() {
    return {
      types: ['paragraph', 'heading'],
      defaultLineHeight: 'inherit',
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: this.options.defaultLineHeight,
            parseHTML: element => {
              return element.style.lineHeight || this.options.defaultLineHeight;
            },
            renderHTML: attributes => {
              if (!attributes.lineHeight) {
                return {};
              }
              return {
                style: `line-height: ${attributes.lineHeight};`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setLineHeight:
        lineHeight =>
        /**
         * tr, state, dispatch 是 Tiptap/ProseMirror 编辑器的核心概念
         */
        ({ tr, state, dispatch }) => {
          /**
           * state: EditorState
           * - 编辑器的当前状态，包含了所有的文档信息
           * - 包括：文档内容、选区、插件状态等
           * - 是不可变的（immutable），每次修改都会创建新的 state
           */
          const { selection, doc } = state; // 从 state 中获取当前选区和文档

          /**
           * tr: Transaction
           * - 事务对象，用于收集对编辑器的修改
           * - 可以链式调用，累积多个修改
           * - 所有的修改都通过 tr 来进行，而不是直接修改 state
           */

          // 设置选区，确保在正确的位置应用更改
          tr = tr.setSelection(selection);

          // 获取选区的起始和结束位置
          const { from, to } = selection;

          /**
           * nodesBetween：遍历选区内的所有节点
           * from: 选区开始位置
           * to: 选区结束位置
           */
          doc.nodesBetween(from, to, (node, pos) => {
            // 检查当前节点是否在允许设置行高的节点类型列表中
            if (this.options.types.includes(node.type.name)) {
              /**
               * setNodeMarkup：更新节点的属性
               * pos: 节点在文档中的位置
               * undefined: 保持节点类型不变
               * { ...node.attrs, lineHeight }: 合并现有属性和新的行高值
               */
              tr = tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                lineHeight,
              });
            }
          });

          /**
           * dispatch: Function
           * - 用于提交事务，使修改生效
           * - 可选参数，如果不提供则表示只是预览修改
           * - 当提供时，会应用事务并更新编辑器状态
           */
          dispatch?.(tr);

          // 返回 true 表示命令执行成功
          return true;
        },
      unsetLineHeight:
        () =>
        ({ tr, state, dispatch }) => {
          const { selection, doc } = state;
          tr = tr.setSelection(selection);
          const { from, to } = selection;
          doc.nodesBetween(from, to, (node, pos) => {
            if (this.options.types.includes(node.type.name)) {
              tr = tr.setNodeMarkup(pos, undefined, { ...node.attrs, lineHeight: this.options.defaultLineHeight });
            }
          });
          dispatch?.(tr);
          return true;
        },
    };
  },
});

/*

setNodeMarkup 与 setMark 的对比

-------------------------------- setNodeMarkup --------------------------------

用于修改节点级别的属性
tr.setNodeMarkup(pos, type, attrs)

  - 修改整个节点的属性
  - 应用于块级元素（如段落、标题）
  - 属性会影响整个节点
  - 存储在节点的 attrs 中

行高设置 - 影响整个段落
setLineHeight:
  lineHeight =>
  ({ tr, state, dispatch }) => {
    state.doc.nodesBetween(from, to, (node, pos) => {
      设置整个节点的行高
      tr = tr.setNodeMarkup(pos, undefined, {
        ...node.attrs,
        lineHeight,
      });
    });
  }
  
HTML 结果：

<!-- 行高应用于整个段落 -->
<p style="line-height: 1.5">
  这是一个段落，整个段落都使用相同的行高。
  即使是段落的一部分也会使用相同的行高。
</p>


-------------------------------- setMark --------------------------------

用于修改行内样式
chain().setMark('textStyle', { fontSize: '16px' })

  - 修改文本级别的样式
  - 应用于行内元素
  - 可以选择文本片段应用样式
  - 存储在 marks 中

字体大小设置 - 可以应用于文本片段
setFontSize:
  options =>
  ({ chain }) => {
    设置选中文本的字体大小
    return chain()
      .setMark('textStyle', { fontSize: options.size })
      .run();
  }
  
HTML 结果：

<p>
  这是一个段落，
  <span style="font-size: 16px">这部分文本有特定的字体大小</span>
  而其他部分保持默认大小。
</p>


----------------------------------------------------------------

为什么这样设计？


1. 行高的特性：

行高需要应用于整个块级元素
setLineHeight:
  lineHeight =>
  ({ tr, state, dispatch }) => {
    state.doc.nodesBetween(from, to, (node, pos) => {
      if (this.options.types.includes(node.type.name)) {
        使用 setNodeMarkup 确保整个节点使用相同的行高
        tr = tr.setNodeMarkup(pos, undefined, {
          ...node.attrs,
          lineHeight,
        });
      }
    });
  }
  
2. 字体大小的特性：

字体大小可以应用于文本片段
setFontSize:
  options =>
  ({ chain }) => {
    使用 setMark 允许在段落内部设置不同的字体大小
    return chain()
      .setMark('textStyle', { fontSize: options.size })
      .run();
  }
  

----------------------------------------------------------------

实际应用示例：

1. 混合使用场景：

同时设置行高和字体大小
editor.chain()
  行高应用于整个段落
  .setLineHeight('1.5')
  字体大小只应用于选中的文本
  .setFontSize({ size: '16px' })
  .run();


结果：
<p style="line-height: 1.5">
  这是普通文本，
  <span style="font-size: 16px">这是大号文本</span>
  这又是普通文本。
</p>

这种设计的好处是：
1. 符合 HTML/CSS 的常规使用方式
2. 提供更好的排版控制
3. 保持文档结构的清晰性
4. 符合用户的直觉预期


----------------------------------------------------------------

1. 属性应用方式：
 - line-height.ts 使用 setNodeMarkup 设置节点属性
 - font-size.ts 使用 setMark 设置行内标记

2. 作用范围：
 - 行高应用于整个块级节点（如段落）
 - 字体大小可以应用于文本片段

3. 属性存储位置：
 - 行高存储在节点的 attrs 中
 - 字体大小存储在 marks 中

设计的考量：

1. 行高特性：
 - 行高通常应用于整个段落
 - 不应该在段落内部有不同的行高

2. 节点属性 vs 标记：
 - 节点属性适合整体样式（如行高、对齐方式）
 - 标记适合行内样式（如字体大小、颜色）

*/

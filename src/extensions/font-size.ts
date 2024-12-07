import { Extension } from '@tiptap/core';
import '@tiptap/extension-text-style';

/**
 * 扩展 @tiptap/core 模块的类型定义
 * 为 Commands 接口添加 fontSize 相关的命令
 */
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      /**
       * 设置字体大小
       * @param options.size - 字体大小值，例如: '16px'
       */
      setFontSize: (options: { size: string }) => ReturnType;
      /**
       * 取消设置字体大小
       */
      unsetFontSize: () => ReturnType;
    };
  }
}

/**
 * 字体大小扩展的配置选项接口
 */
export interface FontSizeOptions {
  // 定义哪些类型的节点可以应用字体大小
  types: string[];
  // 添加最小和最大字体大小限制
  minSize: number;
  maxSize: number;
  // 默认字体大小
  defaultSize: number;
  disallowedNodes: string[];
}

/**
 * 字体大小扩展的配置选项接口
 */
export const FontSizeExtension = Extension.create<FontSizeOptions>({
  // 扩展的唯一名称，在编辑器中注册和引用扩展时使用
  name: 'fontSize',

  /**
   * 配置扩展的默认选项
   * @returns 默认配置对象
   *
   * 定义扩展的默认配置选项，当需要自定义扩展行为时
   */
  addOptions() {
    return {
      types: ['textStyle'],
      minSize: 8,
      maxSize: 48,
      defaultSize: 16,
      disallowedNodes: ['heading'],
    };
  },
  /**
   * addGlobalAttributes 是 Tiptap 中用于定义全局属性的配置函数，返回一个数组，因为可能需要为多个不同类型的节点
   * 定义如何解析和渲染字体大小属性
   * @returns 全局属性配置数组
   */
  addGlobalAttributes() {
    return [
      {
        /**
         * 应用到哪些类型的节点，定义哪些节点类型可以使用这个属性
         * 允许多种节点类型使用字体大小：['textStyle', 'heading', 'paragraph']
         *
         * 比如这里的 ['textStyle'] 表示只有 textStyle 类型的节点可以设置字体大小
         */
        types: this.options.types,
        // 定义属性
        attributes: {
          fontSize: {
            // 默认值
            default: `${this.options.defaultSize}px`,
            /**
             * 从 HTML 解析字体大小
             *
             * 执行时机
             *  - 当编辑器加载初始 HTML 内容时
             *  - 当用户从其他地方复制并粘贴带有字体大小样式的内容时
             *  - 通过 API 设置内容时：使用 setContent 方法更新编辑器内容 > editor.commands.setContent('<p style="font-size: 20px">新内容</p>');
             *  - 使用 insertContent 插入内容时：editor.commands.insertContent('<p style="font-size: 20px">新内容</p>');
             *
             * @param element - DOM 元素
             * @returns 处理后的字体大小值
             */
            parseHTML: element => {
              // return element.style.fontSize;

              // "16px"  -> 16px 移除字体大小值中的引号
              // return element.style.fontSize?.replace(/['"]+/g, '');

              /**
               * element.closest 用于查找当前元素的最近的祖先元素（包括自身），该祖先元素与指定的选择器匹配
               * closest() 方法从当前元素开始，向上遍历 DOM 树，查找第一个与指定选择器匹配的祖先元素。
               * 如果当前元素本身匹配选择器，它也会被返回
               * 如果没有找到匹配的元素，closest() 方法将返回 null
               */
              const parentNode = element.closest(
                this.options.disallowedNodes?.map(node => `[data-type="${node}"]`).join(','),
              );
              console.log(this.options.disallowedNodes, parentNode);

              if (parentNode) {
                return;
              }

              const fontSize = element.style.fontSize?.replace(/['"]+/g, '');
              if (!fontSize) {
                return;
              }
              const size = parseInt(fontSize, 10);
              if (size < this.options.minSize) {
                return `${this.options.minSize}px`;
              }
              if (size > this.options.maxSize) {
                return `${this.options.maxSize}px`;
              }
              return fontSize;
            },
            /**
             * 渲染 HTML 时，将字体大小属性转换为 CSS 样式
             * @param attributes - 属性对象
             * @returns 渲染后的 HTML 属性
             */
            renderHTML: attributes => {
              if (!attributes.fontSize) {
                return {};
              }

              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
      // 可以添加更多的属性配置，为标题节点添加不同的字体大小配置
      // {
      //   types: ['heading'],
      //   attributes: {
      //     fontSize: { ... }
      //   }
      // }
    ];
  },

  /**
   * 添加编辑器命令，需要提供操作内容的方法时
   * @returns 命令对象
   */
  addCommands() {
    return {
      /**
       * 设置字体大小命令
       * @param options.size - 字体大小值
       */
      setFontSize:
        options =>
        ({ chain }) => {
          // chain().updateAttributes('textStyle', { fontSize: options.size })

          // 检查当前选区是否在禁用节点内
          const isInDisallowedNodes = this.options.disallowedNodes?.some(
            node => this.editor.state.selection.$from.parent.type.name === node,
          );
          if (isInDisallowedNodes) {
            return false;
          }

          return chain().setMark('textStyle', { fontSize: options.size }).run();
        },
      /**
       * 取消字体大小设置命令
       */
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain().setMark('textStyle', { fontSize: null }).run();
        },
    };
  },
});

/**
  addGlobalAttributes() {
    return [
      // 普通文本的字体大小
      {
        types: ['textStyle'],
        attributes: {
          fontSize: {
            default: '16px',
            parseHTML: element => { ... }
          }
        }
      },
      // 标题的字体大小
      {
        types: ['heading'],
        attributes: {
          fontSize: {
            // h1-h6 的默认大小不同
            default: (node) => {
              const level = node.attrs.level;
              return `${24 - (level - 1) * 2}px`;
            },
            parseHTML: element => { ... }
          }
        }
      }
    ];
  }
 */

/**
 * updateAttributes 和 setMark 的区别
 *
 * updateAttributes: 只更新现有标记的特定属性
 *  - 只更新指定的属性，保留其他属性
 *  - 如果标记不存在，不会创建新标记
 *  - 合并而不是覆盖属性
 * 使用场景：
 *  - 修改现有样式的某个属性
 *  - 需要保留其他样式属性时
 *  - 部分更新属性
 *
 * 更新当前保留其他
 *
 * ----------------------------------------------------------------
 *
 * setMark: 创建或更新一个标记（mark）
 *  - 如果选区内没有该标记，会创建新标记
 *  - 如果选区内已有该标记，会更新标记
 *  - 会覆盖选区内该标记的所有属性
 * 使用场景：
 *  - 设置新的文本样式
 *  - 需要完全覆盖现有样式时
 *  - 处理行内样式（inline styles）
 *
 * 完全重置样式、设置多个新属性
 *
 * ----------------------------------------------------------------
 *
 * 问题：setMark 不是会覆盖选区内该标记的所有属性吗，那为什么当我选中的文字设置了颜色后，在设置字体大小，文字颜色依然存在呢？
 * 这是因为 setMark 只会覆盖同一个 mark type 的属性。在 Tiptap 中，字体大小和颜色是两个不同的 mark type：
 *  1. 字体大小属于 textStyle mark
 *  2. 颜色属于 textStyle mark 的另一个属性
 *
 * 它们属于同一个 mark type (textStyle) 的不同属性，setMark 默认会保留其他属性，这种设计允许多个样式属性共存
 *
 * chain().setMark('textStyle', { fontSize: options.size }).run();
 * 这里的 setMark 只会更新 textStyle mark 的 fontSize 属性，而不会影响 textStyle mark 的 color 属性
 *
 * 如果要完全覆盖所有属性，需要这样做：
 *
 * 获取当前的所有 textStyle 属性
 * const attributes = this.editor.getAttributes('textStyle');
 * 更新 fontSize，保留其他属性
 * chain().setMark('textStyle', { ...attributes, fontSize: options.size }).run();
 *
 * 或者如果真的要清除其他属性：先清除所有 textStyle 属性，只设置字体大小
 * chain().removeEmptyTextStyle().setMark('textStyle', { fontSize: null }).run();
 */

/**
 * editor.commands.setFontSize() 和 editor.chain().focus().setFontSize()
 *
 *
 * editor.commands.setFontSize() 直接执行单个命令
 * editor.commands.setFontSize({ size: '16px' });
 *
 * - 直接执行单个命令
 * - 代码更简洁
 * - 不能与其他命令组合
 * - 不会自动聚焦编辑器
 *
 * 适用场景：
 *  - 只需要执行单个命令时
 *  - 不需要编辑器聚焦时
 *  - 在程序逻辑中批量处理时
 *
 * ----------------------------------------------------------------
 *
 * editor.chain().focus().setFontSize()
 *
 * - 链式调用多个命令
 * - 可以与其他命令组合
 * - 会自动聚焦编辑器
 * - 需要在最后调用 .run() 执行命令链
 *
 * 适用场景：
 *  - 需要执行多个命令时
 *  - 需要编辑器聚焦时
 *  - 在用户交互时（如点击按钮）
 *
 * 字体大小扩展中，由于通常是用户交互触发的操作，建议使用 chain() 方式，这样可以确保编辑器聚焦并提供更好的用户体验。
 */

/**
 * 使用方式：
 *
 * FontSizeExtension.configure({
 *  types: ['textStyle'],
 *  minSize: 8,
 *  maxSize: 48,
 *  defaultSize: 16
 * })
 */

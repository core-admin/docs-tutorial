'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };


/*

这是 Tailwind CSS 的组合选择器语法（Arbitrary Group Syntax），用于指定更复杂的组合选择器。

基本语法是：`group-[选择器]:`

几个例子：

```html
<!-- 基础用法 -->
<div class="group">
  <div class="group-[.custom]:bg-red-500">
    <!-- 当父元素有 .custom 类时，这个 div 背景变红 -->
  </div>
</div>

<!-- 多层嵌套 -->
<div class="group/sidebar">
  <div class="group-[.open]/sidebar:block">
    <!-- 当父元素同时有 .open 类时才显示 -->
  </div>
</div>

<!-- 复杂选择器 -->
<div class="group">
  <div class="group-[.theme-dark]:text-white group-[.theme-light]:text-black">
    <!-- 根据主题类名切换颜色 -->
  </div>
</div>
```

在你提供的代码中：
- `group-[.toaster]` 表示"当父元素有 .toaster 类时"
- 所以 `group-[.toaster]:bg-background` 意思是"当父元素有 .toaster 类时应用 bg-background 样式"

要使用这个功能，需要：
1. 在父元素添加 `group` 类
2. 在子元素使用 `group-[.xxx]:样式` 格式

这种语法特别适合：
- 复杂的条件样式
- 第三方组件样式覆盖
- 主题切换
- 状态管理


*/
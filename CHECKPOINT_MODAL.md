# 卦象详细信息弹窗功能 Checkpoint

## 核心文件结构
1. src/components/SymbolModal.tsx - 弹窗组件
2. src/components/SymbolModal.module.css - 弹窗样式
3. src/hooks/useSymbols.ts - 弹窗逻辑 Hook
4. src/64symbols.ts - 卦象数据源

## 关键功能实现
1. 全屏弹窗设计
   - 使用固定定位覆盖整个视口
   - 背景半透明遮罩
   - 内容区域自适应滚动

2. 数据流转
   - 通过 useSymbols hook 管理状态
   - 点击卦象时从 64symbols.ts 获取详细信息
   - 支持动态加载和更新卦象数据

3. 交互设计
   - 点击背景关闭弹窗
   - 标题栏固定在顶部
   - 响应式布局适配移动端

## 使用方法
1. 在组件中引入必要的依赖： 
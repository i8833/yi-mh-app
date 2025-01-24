# React 项目文档

## 项目简介
这是一个使用 React 18 + TypeScript 开发的现代化 Web 应用。

## 技术栈
- React 18
- TypeScript
- CSS Modules
- Vite

## 项目结构

# 梅花易数 Web App

## 1. 项目架构
```
src/
├── components/          # 组件目录
│   ├── Common/         # 通用组件
│   │   ├── LunarDate/  # 农历日期组件 ✅
│   │   └── Navigation/ # 导航组件 ✅
│   ├── Divination/     # 占卦相关组件
│   │   ├── TimeDivination/      # 时间起卦 ✅
│   │   ├── ThreeNumberDivination/# 三数起卦 ✅
│   │   └── CustomDivination/     # 自选起卦 🚧
│   └── Layout/         # 布局组件 ✅
├── utils/              # 工具函数
│   ├── divinationUtils.ts        # 卦象计算核心 ✅
│   └── threeNumberDivinationUtils.ts # 三数起卦工具 ✅
├── types/              # TypeScript 类型定义
│   ├── divination.ts   # 卦象相关类型 ✅
│   └── css.d.ts        # CSS Modules 类型 ✅
└── pages/             # 页面组件
    ├── Home/          # 首页 ✅
    └── Divination/    # 占卦页面 ✅
```

## 2. 已完成功能
1. 卦象计算核心功能 ✅
   - 主卦计算
   - 互卦计算
   - 变卦计算
   - 综卦计算
   - 错卦计算

2. 时间起卦功能 ✅
   - 农历日期显示
   - 干支纪年
   - 自动计算卦象

3. 三数起卦功能 ✅
   - 数字输入验证
   - 卦象计算
   - 结果显示

4. 基础UI框架 ✅
   - 响应式布局
   - 导航系统
   - 首页设计

## 3. 进行中功能 🚧
1. 自选起卦功能
   - 手动选择卦象
   - 动爻选择
   - 卦象预览

2. 卦象解释系统
   - 卦辞显示
   - 爻辞解释
   - 变爻解释

## 4. 待开发功能 📝
1. 卦象可视化
   - 六爻图形显示
   - 动爻标注
   - 变化动画

2. 用户体验优化
   - 操作引导
   - 结果保存
   - 历史记录

3. 性能优化
   - 代码分割
   - 懒加载
   - 缓存策略

## 项目简介
这是一个基于 React 开发的梅花易数 Web 应用。用户可以通过不同的起卦方法生成卦象，并查看相关解释。

## 功能特点
- 支持多种起卦方式：
  - 时间起卦：根据当前时间自动生成卦象
  - 三数起卦：通过输入三个数字生成卦象
  - 自选起卦：手动选择卦象组合
- 显示完整的卦象信息：主卦、互卦、变卦、错卦、综卦
- 农历日期和时辰显示
- 响应式设计，支持移动端访问

## 技术栈
- React 18
- TypeScript
- Ant Design
- CSS Modules
- Vite

## 项目结构
```
src/
├── components/          # 组件目录
│   ├── Common/         # 通用组件
│   │   ├── LunarDate/  # 农历日期组件
│   │   └── Navigation/ # 导航组件
│   ├── Divination/     # 占卦相关组件
│   │   ├── TimeDivination/
│   │   ├── ThreeNumberDivination/
│   │   └── CustomDivination/
│   └── Layout/         # 布局组件
├── pages/              # 页面组件
├── utils/              # 工具函数
├── types/              # TypeScript 类型定义
└── router/             # 路由配置
```

## 卦象计算规则

### 基础定义
1. 八卦基本数（从下往上）：
```
乾(☰) = 111（阳阳阳）
兑(☱) = 110（阳阳阴）
离(☲) = 101（阳阴阳）
震(☳) = 100（阳阴阴）
巽(☴) = 011（阴阳阳）
坎(☵) = 010（阴阳阴）
艮(☶) = 001（阴阴阳）
坤(☷) = 000（阴阴阴）
```

2. 六爻排列规则：
- 所有卦的六爻都是从下往上数
- 前三位数字代表下卦
- 后三位数字代表上卦
- 1代表阳爻，0代表阴爻

### 卦象计算方法
1. **主卦**：上下卦组合成六爻
2. **互卦**：取第2、3、4爻为下卦，第3、4、5爻为上卦
3. **变卦**：改变动爻位置的阴阳性，其余不变
4. **综卦**：将主卦六爻完全颠倒
5. **错卦**：将主卦所有爻阴阳反转

## 开发说明

### 安装依赖
```bash
npm install
```

### 开发环境运行
```bash
npm run dev
```

### 生产环境构建
```bash
npm run build
```

## 开发检查点

1. 数据结构：
- 使用二进制数组表示六爻
- 从下往上的顺序处理爻位
- 正确分割上下卦

2. 计算流程：
- toBinaryArray：将上下卦转换为六爻数组
- guaToBinary：将卦名转换为二进制数组
- binaryToGuaNumber：将二进制数组转换为卦象数字
- toHexagram：将六爻数组转换为上下卦

3. 验证要点：
- 确保所有卦象计算都基于从下往上的顺序
- 验证互卦取爻的正确性
- 验证变卦动爻改变的准确性
- 验证综卦颠倒的完整性
- 验证错卦反转的正确性

## 后续开发建议

1. 添加卦象可视化：
- 显示六爻的具体形状
- 标注动爻位置
- 展示爻变过程

2. 优化用户体验：
- 添加卦象解释
- 显示卦象变化过程
- 提供详细的爻辞说明

3. 代码优化：
- 添加完整的类型定义
- 增加单元测试
- 优化性能

## 注意事项
- 所有卦象计算都基于从下往上的顺序
- 使用 TypeScript 确保类型安全
- 遵循组件化和模块化开发原则
- 保持代码整洁和注释完整

# 周易起卦系统 - 开发检查点

## 1. 时间起卦模块

### 1.1 基础功能
- [x] 实现农历时间转换
- [x] 显示公历和农历时间
- [x] 显示年月日时的干支信息
- [x] 实现时间自动更新

### 1.2 卦象计算
- [x] 完成时间起卦的核心算法
  - 年支数字转换 (子=1, 丑=2, ..., 亥=12)
  - 农历月份数字 (正月=1, 二月=2, ..., 十二月=12)
  - 农历日期数字 (初一=1, 初二=2, ..., 三十=30)
  - 时辰数字转换 (子时=1, 丑时=2, ..., 亥时=12)
- [x] 实现卦数计算公式
  - 上卦 = (年 + 月 + 日) % 8
  - 下卦 = (年 + 月 + 日 + 时) % 8
  - 动爻 = (年 + 月 + 日 + 时) % 6

### 1.3 卦象推演
- [x] 计算本卦
- [x] 计算互卦
- [x] 计算变卦
- [x] 计算错卦
- [x] 计算综卦

### 1.4 界面展示
- [x] 显示时间信息区域
- [x] 显示卦象结果区域
- [x] 实现响应式布局
- [x] 添加加载动画效果

## 2. 三数起卦模块

### 2.1 基础功能
- [x] 数字输入界面
  - 支持1-999范围的数字输入
  - 三个数字输入框布局
  - 输入验证和错误提示
- [x] 卦象计算规则
  - 上卦 = (num1 + num2) % 8
  - 下卦 = (num2 + num3) % 8
  - 动爻 = (num1 + num2 + num3) % 6

### 2.2 计算流程
- [x] 数字验证
  - 确保输入范围在1-999之间
  - 处理空值和非法输入
- [x] 卦数转换
  - 处理余数为0的情况
  - 正确映射到八卦数值
- [x] 结果生成
  - 计算主卦
  - 推导变卦
  - 生成完整结果

### 2.3 界面功能
- [x] 输入区域
  - 数字输入框
  - 所问之事（选填）
  - 断语分析（选填）
- [x] 结果显示
  - 本卦信息
  - 变卦信息
  - 动爻位置
- [x] 操作按钮
  - 返回首页
  - 查看记录
  - 保存结果

### 2.4 数据存储
- [x] 记录保存
  - 保存卦象结果
  - 保存问题和分析
  - 保存计算参数
- [x] 历史记录
  - 显示历史记录
  - 记录详情查看
  - 时间排序显示

## 3. 自选起卦模块

### 3.1 基础功能
- [x] 卦象选择界面
  - 上卦选择（1-8）
  - 下卦选择（1-8）
  - 动爻选择（1-6）
  - 卦名和数字对应显示

### 3.2 计算流程
- [x] 参数验证
  - 确保上卦、下卦、动爻都已选择
  - 验证参数范围的合法性
- [x] 卦象计算
  - 复用核心计算函数
  - 保持计算规则一致性
  - 结果准确性验证

### 3.3 界面功能
- [x] 选择区域
  - 下拉选择框
  - 卦名和数字显示
  - 选项提示说明
- [x] 结果显示
  - 本卦信息
  - 变卦信息
  - 动爻位置
- [x] 操作按钮
  - 返回首页
  - 查看记录
  - 保存结果

### 3.4 数据存储
- [x] 记录保存
  - 保存卦象结果
  - 保存问题和分析
  - 保存选择参数
- [x] 历史记录
  - 显示历史记录
  - 记录详情查看
  - 时间排序显示

## 4. 通用功能更新

### 4.1 历史记录系统
- [x] 记录存储
  - 统一的记录格式
  - 多种起卦方式支持
  - 本地持久化存储
- [x] 记录显示
  - 统一的记录列表
  - 记录详情展示
  - 时间格式化显示

### 4.2 界面优化
- [x] 导航系统
  - 返回首页按钮
  - 历史记录入口
  - 路由导航
- [x] 响应式布局
  - 移动端适配
  - 界面布局优化
  - 输入框自适应

### 4.3 代码重构
- [x] 类型定义
  - 完善类型接口
  - 统一类型使用
  - 类型错误修复
- [x] 组件复用
  - 提取公共组件
  - 统一样式定义
  - 代码结构优化

## 5. 待优化项目

### 5.1 功能完善
- [ ] 卦象解释系统
  - 卦辞显示
  - 爻辞解释
  - 变爻解释
- [ ] 卦象动画效果
  - 爻变动画
  - 卦象变化过程
  - 交互反馈
- [ ] 记录管理
  - 批量导出
  - 分类管理
  - 搜索功能

### 5.2 性能优化
- [ ] 状态管理优化
  - 缓存机制
  - 数据持久化
  - 状态更新优化
- [ ] 组件优化
  - 组件懒加载
  - 渲染性能
  - 内存管理

### 5.3 用户体验
- [ ] 操作引导
  - 新手引导
  - 功能说明
  - 使用提示
- [ ] 结果分享
  - 分享链接
  - 图片导出
  - 社交分享
- [ ] 主题定制
  - 暗黑模式
  - 主题切换
  - 样式定制

## 6. 技术栈更新
- React 18
- TypeScript
- Ant Design
- Zustand (状态管理)
- CSS Modules
- lunar-javascript (农历转换)

## 7. 注意事项
1. 确保计算规则的准确性
2. 保持代码类型安全
3. 优化用户交互体验
4. 保持文档更新
5. 做好错误处理
6. 注意性能优化

## 8. 参考资料
- [React 官方文档](https://react.dev)
- [Ant Design 组件库](https://ant.design)
- [Zustand 状态管理](https://github.com/pmndrs/zustand)
- [lunar-javascript 文档](https://github.com/6tail/lunar-javascript)

# 周易起卦系统 - 开发检查点更新

## 1. 最新完成功能

### 1.1 时间起卦优化
- [x] 修复农历年份显示格式（改为干支纪年）
- [x] 优化公历时间显示
- [x] 完善干支时间计算
- [x] 添加时间自动更新功能

### 1.2 记录管理系统
- [x] 实现记录保存功能
  - 支持多种起卦方式记录
  - 保存问题和分析内容
  - 记录时间戳和方法类型
- [x] 添加记录删除功能
  - 支持单条记录删除
  - 支持清空所有记录
  - 删除确认提示
- [x] 优化记录显示界面
  - 记录列表布局优化
  - 记录详情展示完善
  - 添加记录类型标签

### 1.3 路由系统完善
- [x] 修复404错误处理
- [x] 添加错误边界处理
- [x] 优化路由配置结构
- [x] 完善导航逻辑

## 2. 当前开发重点

### 2.1 类型系统完善
- [ ] 修复 ThreeNumberDivination 组件类型错误
- [ ] 完善 DivinationResult 类型定义
- [ ] 统一 Record 类型使用
- [ ] 添加更多类型检查

### 2.2 组件优化
- [ ] 提取公共样式组件
- [ ] 优化组件复用逻辑
- [ ] 完善错误处理机制
- [ ] 添加加载状态处理

### 2.3 状态管理优化
- [ ] 优化 Zustand store 结构
- [ ] 添加持久化配置选项
- [ ] 完善状态更新逻辑
- [ ] 添加状态变更日志

## 3. 下一步计划

### 3.1 功能扩展
- [ ] 添加卦象详细解释
- [ ] 实现卦象变化动画
- [ ] 添加用户配置选项
- [ ] 支持数据导出功能

### 3.2 性能优化
- [ ] 实现组件懒加载
- [ ] 优化渲染性能
- [ ] 添加缓存机制
- [ ] 优化移动端体验

### 3.3 测试完善
- [ ] 添加单元测试
- [ ] 实现集成测试
- [ ] 添加端到端测试
- [ ] 完善错误处理测试

## 4. 已知问题修复

### 4.1 类型错误
- [ ] 修复 Gua 类型导入错误
- [ ] 解决 Result status 类型问题
- [ ] 完善 DivinationParams 类型
- [ ] 修复组件 props 类型

### 4.2 样式问题
- [ ] 统一组件样式命名
- [ ] 修复响应式布局问题
- [ ] 优化移动端适配
- [ ] 完善主题定制支持

## 5. 文档更新
- [x] 更新功能说明文档
- [x] 添加最新开发检查点
- [x] 完善类型定义文档
- [x] 更新已知问题列表

## 6. 注意事项
1. 确保所有新功能都有完整的类型定义
2. 保持代码风格统一
3. 及时更新文档
4. 注意代码复用和模块化
5. 做好错误处理和边界情况
6. 保持良好的用户体验

# 时间起卦计算规则与检查点

## 一、计算规则

### 1. 时间参数获取
- 年支：从干支纪年中获取地支，转换为1-12数字
  - 子年=1，丑年=2，...，亥年=12
- 农历月：转换为1-12数字
  - 正月=1，二月=2，...，十二月=12
- 农历日：转换为1-30数字
  - 初一=1，初二=2，...，三十=30
- 时辰：从干支纪时中获取地支，转换为1-12数字
  - 子时=1，丑时=2，...，亥时=12

### 2. 卦数计算
- 上卦数 = (年数 + 月数 + 日数) % 8
- 下卦数 = (年数 + 月数 + 日数 + 时数) % 8
- 动爻数 = (年数 + 月数 + 日数 + 时数) % 6

### 3. 特殊情况处理
- 如果余数为0：
  - 上卦和下卦取8（对应坤卦）
  - 动爻取6（对应上爻）

## 二、检查点

### 检查点1：时间参数转换
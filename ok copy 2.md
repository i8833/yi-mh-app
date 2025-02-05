# 易经项目架构与逻辑说明

## 一、项目概述
本项目是一个基于React的易经起卦应用，提供三种不同的起卦方法，帮助用户进行易经卦象的推演和解读。

## 二、页面架构

### 1. 主页面 (Home.js)
- 功能：展示三种起卦方法的入口
- 布局：三个主要按钮，分别对应不同起卦方法
- 导航：点击按钮后跳转至对应的起卦页面

### 2. 时间起卦页面 (TimeGua.js)
- 功能：根据当前时间自动生成卦象
- 显示内容：
  - 本卦（上卦、下卦）
  - 变爻位置
  - 变卦结果
  - 卦象解释

### 3. 数字起卦页面 (NumberGua.js)
- 功能：用户输入数字进行起卦
- 交互方式：数字输入框
- 显示内容：与时间起卦相同

### 4. 手动起卦页面 (ManualGua.js)
- 功能：用户手动选择爻的形态
- 交互方式：六个爻位的阴阳选择
- 显示内容：与其他方法相同

## 三、起卦方法详细逻辑

### 1. 时间起卦法
#### 计算步骤：
1. 获取当前时间：
   - 年：子年=1，丑年=2，...，亥年=12
   - 月：正月=1，二月=2，...，十二月(腊月）=12
   - 日：初一=1，初二=2，...，三十日=30
   - 时：子时=1，丑时=2，...，亥时=12

2. 计算公式：
   - 上卦数 = (年 + 月 + 日) % 8
   - 下卦数 = (年 + 月 + 日 + 时) % 8
   - 动爻数 = (年 + 月 + 日 + 时) % 6

3. 对应逻辑：
   - 如果结果为0，则取8（坤卦）或6（动爻）

4. 根据数字对应卦象生成主卦。

5. 根据主卦推演出互卦、变卦、错卦和综卦。
#### 示例：
假设现在是2023年（卯年=4），5月，15日，上午10点（巳时=6）
- 上卦 = (4 + 5 + 15) % 8 = 24 % 8 = 0 → 8（坤卦）
- 下卦 = (4 + 5 + 15 + 6) % 8 = 30 % 8 = 6 → 6（坎卦）
- 动爻 = 30 % 6 = 0 → 6（上爻）

### 2. 三数起卦法
#### 计算步骤：
1. 用户输入三个数字（num1, num2, num3）
2. 计算公式：
   - 上卦数 = num1 % 8
   - 下卦数 = num2 % 8
   - 动爻数 = (num1 + num2 + num3) % 6

3. 对应逻辑：
   - 如果结果为0，则取8（坤卦）或6（动爻）

4. 根据数字对应卦象生成主卦。

5. 根据主卦推演出互卦、变卦、错卦和综卦。

#### 示例：
用户输入：7，15，22
- 上卦 = 7 % 8 = 7 → 7（艮卦）
- 下卦 = 15 % 8 = 7 → 7（艮卦）
- 动爻 = (7 + 15 + 22) % 6 = 44 % 6 = 2 → 2（二爻）

### 3. 自定义输入起卦法
#### 计算步骤：
1. 用户输入六个数字（0或1），例如：[1, 0, 1, 1, 0, 1]
   - 0表示阴爻（--）
   - 1表示阳爻（—）
   - 从下往上排列

2. 转换为卦象：
   - 下卦 = 下面三个爻
   - 上卦 = 上面三个爻

3. 动爻由用户指定

4. 根据数字对应卦象生成主卦。

5. 根据主卦推演出互卦、变卦、错卦和综卦。

#### 示例：
用户输入：[1, 0, 1, 1, 0, 1]，动爻=3
- 下卦：1, 0, 1 → 离卦（☲）
- 上卦：1, 0, 1 → 离卦（☲）
- 动爻：3（三爻）

### 数字与卦象对应表
| 数字 | 卦名 | 卦象 |
|------|------|------|
| 1    | 乾   | ☰    |
| 2    | 兑   | ☱    |
| 3    | 离   | ☲    |
| 4    | 震   | ☳    |
| 5    | 巽   | ☴    |
| 6    | 坎   | ☵    |
| 7    | 艮   | ☶    |
| 8    | 坤   | ☷    |

### 动爻说明
- 动爻数范围：1-6
- 1：初爻（最下面的爻）
- 2：二爻
- 3：三爻
- 4：四爻
- 5：五爻
- 6：上爻（最上面的爻）

## 四、卦象解读系统

### 1. 基本卦象数据
- 八卦对应关系：乾(1)、兑(2)、离(3)、震(4)、巽(5)、坎(6)、艮(7)、坤(8)
- 每卦包含：卦名、卦象、卦辞、爻辞

### 2. 五卦的对应与计算

主卦（本卦）
是起卦时最初得到的卦象
由下往上数六爻组成
例如：如果得到的是乾卦(䷀)，则由下往上六爻全阳

互卦（内卦）
从主卦中抽取第2、3、4爻组成下卦
从主卦中抽取第3、4、5爻组成上卦
例如：主卦是乾卦(䷀)时，取第2、3、4爻为下卦，第3、4、5爻为上卦，得到乾卦(䷀)

变卦
根据动爻的变化而来
将主卦中的动爻阳变阴、阴变阳，其余爻保持不变
例如：主卦是乾卦(䷀)，若第六爻动，则上爻由阳变阴，得到变卦：泽天夬卦(䷪)

综卦
把本卦旋转180度，就是综卦。注意，是旋转了，如同倒立，头朝上变成了头朝下。不是上卦和下卦交换位置
例如：主卦是泽天夬卦(䷪)，上下颠倒后就是天风姤卦(䷫)

错卦
将主卦每一爻阴阳颠倒而得
主卦中的阳爻全部变为阴爻
主卦中的阴爻全部变为阳爻
例如：主卦是乾卦(䷀)全阳，则错卦为坤卦(䷁)全阴

### 3. 卦象解读展示
- 显示本卦的卦象和含义
- 显示变爻的具体含义
- 显示变卦的卦象和含义

## 五、技术实现特点
1. 使用React Hooks管理状态
2. 使用React Router进行页面导航
3. 组件化设计，提高代码复用性
4. 响应式布局，适配不同设备

## 六 UI设计规范

#### 响应式设计断点
- 移动端：< 768px
- 平板端：768px - 1023px
- 桌面端：>= 1024px

#### 字体系统
- 标题文字：
  - 桌面端：24px
  - 平板端：20px
  - 移动端：18px
- 正文文字：
  - 桌面端：16px
  - 平板端：14px
  - 移动端：14px
- 注释文字：
  - 桌面端：14px
  - 平板端：12px
  - 移动端：12px

#### 颜色系统
- 主色调：#2C3E50（深蓝灰）
- 次要色：#34495E（浅蓝灰）
- 强调色：#E74C3C（红色）
- 背景色：
  - 主要背景：#FFFFFF
  - 次要背景：#F5F5F5
- 文字颜色：
  - 主要文字：#2C3E50
  - 次要文字：#7F8C8D
  - 链接文字：#3498DB

#### 间距系统
- 基础间距：8px
- 组件间距：
  - 桌面端：24px
  - 平板端：16px
  - 移动端：12px
- 内部间距：
  - 桌面端：16px
  - 平板端：12px
  - 移动端：8px

#### 动画效果
1. 卦象切换动画
   - 持续时间：300ms
   - 效果：淡入淡出

2. 爻位变化动画
   - 持续时间：500ms
   - 效果：翻转效果

3. 页面切换动画
   - 持续时间：200ms
   - 效果：滑动切换

#### 交互反馈
1. 按钮状态
   - 默认状态
   - 悬停状态：轻微放大1.05倍
   - 点击状态：轻微缩小0.95倍
   - 禁用状态：降低透明度到0.5

2. 加载状态
   - 使用动态卦象符号作为加载图标
   - 背景轻微模糊处理

3. 错误提示
   - 文字提示：红色文字
   - 图标提示：感叹号图标
   - 位置：内容区域顶部

### 4. 组件结构


## 六、后续优化方向
1. 添加卦象动画效果
2. 增加历史记录功能
3. 优化移动端体验
4. 添加详细的卦象解释数据库
5. 实现收藏功能

注：本文档会随项目发展持续更新 
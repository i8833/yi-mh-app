// 基础卦象信息
export interface GuaInfo {
  name: string;      // 卦名
  symbol: string;    // 卦符号
  upperGua: string;  // 上卦
  lowerGua: string;  // 下卦
  changingLine?: number; // 动爻位置
}

// 完整卦象结果
export interface DivinationResult {
  timeInfo?: {
    year: string;
    month: string;
    day: string;
    hour: string;
    raw: TimeInfo;
  };
  hexagram: {
    name: string;
    symbol: string;
    upperTrigram: Trigram;
    lowerTrigram: Trigram;
    changingLine: number;
    meaning: string;
  };
  mainGua: GuaInfo;
  huGua: GuaInfo;
  bianGua: GuaInfo;
  cuoGua: GuaInfo;
  zongGua: GuaInfo;
  calculation?: {
    upperTrigramFormula: string;
    lowerTrigramFormula: string;
    changingLineFormula: string;
  };
  timestamp: string;
  method?: 'time' | 'threeNumber' | 'custom';  // 添加方法字段
  customParams?: {  // 添加自选起卦参数
    upperGua: number;
    lowerGua: number;
    changingLine: number;
  };
  numbers?: ThreeNumberParams;  // 添加三数起卦参数
}

// 起卦参数
export interface DivinationParams {
  upperGua: number;    // 上卦数字(1-8)
  lowerGua: number;    // 下卦数字(1-8)
  changingLine: number;// 动爻位置(1-6)
}

// 八卦对应关系
export const GuaMap = {
  1: '乾', // ☰
  2: '兑', // ☱
  3: '离', // ☲
  4: '震', // ☳
  5: '巽', // ☴
  6: '坎', // ☵
  7: '艮', // ☶
  8: '坤'  // ☷
} as const;

// 八卦二进制对应
export const GuaBinary = {
  '乾': '111', // ☰
  '兑': '110', // ☱
  '离': '101', // ☲
  '震': '100', // ☳
  '巽': '011', // ☴
  '坎': '010', // ☵
  '艮': '001', // ☶
  '坤': '000'  // ☷
} as const;

// 时间相关类型
export interface TimeInfo {
  year: number;
  month: number;
  day: number;
  hour: number;
  lunarYear: string;
  lunarMonth: string;
  lunarDay: string;
  lunarHour: string;
  yearGanZhi: string;
  monthGanZhi: string;
  dayGanZhi: string;
  hourGanZhi: string;
}

// 三数起卦参数
export interface ThreeNumberParams {
  num1: number;  // 第一个数字
  num2: number;  // 第二个数字
  num3: number;  // 第三个数字
}

// 地支对应关系
export const EarthlyBranches = {
  1: '子',
  2: '丑',
  3: '寅',
  4: '卯',
  5: '辰',
  6: '巳',
  7: '午',
  8: '未',
  9: '申',
  10: '酉',
  11: '戌',
  12: '亥'
} as const;

// 时辰对应关系
export const ChineseHours = {
  1: '子时',
  2: '丑时',
  3: '寅时',
  4: '卯时',
  5: '辰时',
  6: '巳时',
  7: '午时',
  8: '未时',
  9: '申时',
  10: '酉时',
  11: '戌时',
  12: '亥时'
} as const;

export interface Trigram {
  name: string;
  symbol: string;
  nature: string;
  attribute: string;
}

// 添加占卜记录类型
export interface DivinationRecord {
  id: string;
  timestamp: string;
  question: string;
  analysis: string;
  result: any;
  method: 'time' | 'threeNumber' | 'custom';  // 添加方法类型
  numbers?: ThreeNumberParams;  // 三数起卦的参数
  customParams?: {  // 自选起卦的参数
    upperGua: number;
    lowerGua: number;
    changingLine: number;
  };
}

// 更新 DivinationStore 类型
export interface DivinationStore {
  currentResult: DivinationResult | null;
  records: DivinationRecord[];
  setDivinationResult: (result: DivinationResult) => void;
  addDivinationRecord: (record: DivinationRecord) => void;
  getRecords: () => DivinationRecord[];
}

export interface IDivinationResult {
  mainGua: {
    name: string;
    symbol: string;
    changingLine: number;
    upperGua: string;
    lowerGua: string;
  };
  huGua: {
    name: string;
    symbol: string;
    upperGua: string;
    lowerGua: string;
  };
  bianGua: {
    name: string;
    symbol: string;
    upperGua: string;
    lowerGua: string;
  };
  cuoGua: {
    name: string;
    symbol: string;
    upperGua: string;
    lowerGua: string;
  };
  zongGua: {
    name: string;
    symbol: string;
    upperGua: string;
    lowerGua: string;
  };
  hexagram: string;
  timestamp: string;
} 
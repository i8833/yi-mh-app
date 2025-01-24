// 添加或更新类型定义
interface DivinationResult {
  mainGua: {
    name: string;
    symbol: string;
    upperGua: string;
    lowerGua: string;
    changingLine: number;
    meaning?: string;
  };
  huGua: {
    name: string;
    symbol: string;
  };
  bianGua: {
    name: string;
    symbol: string;
  };
  cuoGua: {
    name: string;
    symbol: string;
  };
  zongGua: {
    name: string;
    symbol: string;
  };
  method?: 'time' | 'threeNumber' | 'custom';
  timestamp?: string;
} 
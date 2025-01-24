import gua64 from '../gua64.json';
import { calculateDivination, type DivinationParams } from './divinationUtils';

export interface ThreeNumberParams {
  num1: number;
  num2: number;
  num3: number;
}

export interface GuaResult {
  mainGua: {
    name: string;
    symbol: string;
    changingLine?: number;
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
}

interface GuaData {
  upperGua: string;
  lowerGua: string;
  name: string;
  symbol: string;
  binary: string;
  upperSymbol: string;
  lowerSymbol: string;
  index: string;
}

// 获取卦名
const getGuaNameByNumber = (num: number): string => {
  switch (num) {
    case 1: return '乾';
    case 2: return '兑';
    case 3: return '离';
    case 4: return '震';
    case 5: return '巽';
    case 6: return '坎';
    case 7: return '艮';
    case 8: return '坤';
    default: return '坤';
  }
};

// 获取卦的二进制表示（从下到上）
const getGuaBinary = (guaNumber: number): string[] => {
  switch(guaNumber) {
    case 1: return ['1', '1', '1']; // 乾
    case 2: return ['1', '1', '0']; // 兑
    case 3: return ['1', '0', '1']; // 离
    case 4: return ['1', '0', '0']; // 震
    case 5: return ['0', '1', '1']; // 巽
    case 6: return ['0', '1', '0']; // 坎
    case 7: return ['0', '0', '1']; // 艮
    case 8: return ['0', '0', '0']; // 坤
    default: return ['0', '0', '0'];
  }
};

// 根据二进制找到对应的卦
const findHexagram = (binary: string): GuaData | undefined => {
  const hexagrams = Object.values(gua64) as unknown as GuaData[];
  return hexagrams.find(gua => gua.binary === binary);
};

export const calculateThreeNumberDivination = (params: ThreeNumberParams) => {
  const { num1, num2, num3 } = params;
  
  // 计算上卦、下卦和动爻
  const upperGua = num1 % 8 || 8;
  const lowerGua = num2 % 8 || 8;
  const changingLine = (num1 + num2 + num3) % 6 || 6;

  // 使用统一的计算函数
  return calculateDivination({ upperGua, lowerGua, changingLine });
}; 
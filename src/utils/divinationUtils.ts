import { Gua } from '../types/divination';
import guaData from '../gua64.json';

interface HexagramData {
  upperGua: string;
  lowerGua: string;
  name: string;
  symbol: string;
  upperSymbol: string;
  lowerSymbol: string;
  binary: string;
  index: string;
}

// 八卦基本数（从下往上）
const GuaBase = {
  '乾': '111', // ☰ 阳阳阳
  '兑': '110', // ☱ 阳阳阴
  '离': '101', // ☲ 阳阴阳
  '震': '100', // ☳ 阳阴阴
  '巽': '011', // ☴ 阴阳阳
  '坎': '010', // ☵ 阴阳阴
  '艮': '001', // ☶ 阴阴阳
  '坤': '000'  // ☷ 阴阴阴
};

// 将数字转换为卦象名称（1-8对应八卦）
export const getGuaNameByNumber = (num: number): string => {
  switch (num) {
    case 1: return '乾'; // 111
    case 2: return '兑'; // 110
    case 3: return '离'; // 101
    case 4: return '震'; // 100
    case 5: return '巽'; // 011
    case 6: return '坎'; // 010
    case 7: return '艮'; // 001
    case 8: return '坤'; // 000
    default: return '坤';
  }
};

// 根据上下卦找到对应的卦象数据
export const findHexagram = (upperGua: string, lowerGua: string): HexagramData | undefined => {
  return guaData.hexagrams.find(
    hexagram => hexagram.upperGua === upperGua && hexagram.lowerGua === lowerGua
  );
};

// 将卦名转换为二进制数组（从下往上）
const guaToBinary = (guaName: string): number[] => {
  const binary = GuaBase[guaName];
  return binary.split('').map(Number);
};

// 将二进制数组转换为卦象数字（1-8）
const binaryToGuaNumber = (binary: number[]): number => {
  const binaryStr = binary.join('');
  for (const [name, value] of Object.entries(GuaBase)) {
    if (value === binaryStr) {
      return Object.keys(GuaBase).indexOf(name) + 1;
    }
  }
  return 8; // 默认返回坤卦
};

// 将上下卦转换为六爻数组（从下往上）
const toBinaryArray = (upperGua: number, lowerGua: number): number[] => {
  const lowerBinary = guaToBinary(getGuaNameByNumber(lowerGua));
  const upperBinary = guaToBinary(getGuaNameByNumber(upperGua));
  return [...lowerBinary, ...upperBinary]; // 从下往上排列：[1,2,3,4,5,6]爻
};

// 将六爻数组转换为上下卦
const toHexagram = (binary: number[]): { upper: number; lower: number } => {
  const lowerBinary = binary.slice(0, 3);
  const upperBinary = binary.slice(3);
  return {
    lower: binaryToGuaNumber(lowerBinary),
    upper: binaryToGuaNumber(upperBinary)
  };
};

// 计算互卦
const calculateHuGua = (upperGua: number, lowerGua: number): { upper: number; lower: number } => {
  // 将卦象转换为二进制数组（从下往上）
  const binary = toBinaryArray(upperGua, lowerGua);
  
  // 取第2、3、4爻为下卦（从下往上数）
  const huLowerBinary = binary.slice(1, 4);
  // 取第3、4、5爻为上卦（从下往上数）
  const huUpperBinary = binary.slice(2, 5);
  
  // 转换回卦象数字
  return {
    lower: binaryToGuaNumber(huLowerBinary),
    upper: binaryToGuaNumber(huUpperBinary)
  };
};

// 计算变卦
const calculateChangedGua = (upperGua: number, lowerGua: number, changingLine: number): { upper: number; lower: number } => {
  // 将卦象转换为二进制数组（从下往上）
  const binary = toBinaryArray(upperGua, lowerGua);
  
  // 改变动爻位置的阴阳性（从下往上数）
  // changingLine 从1开始计数，所以需要减1
  const index = changingLine - 1;
  binary[index] = binary[index] === 0 ? 1 : 0;
  
  // 转换回上下卦
  const lowerBinary = binary.slice(0, 3);
  const upperBinary = binary.slice(3);
  
  return {
    lower: binaryToGuaNumber(lowerBinary),
    upper: binaryToGuaNumber(upperBinary)
  };
};

// 计算综卦（六爻完全颠倒）
const calculateSynthesisGua = (upperGua: number, lowerGua: number): { upper: number; lower: number } => {
  // 将卦象转换为二进制数组（从下往上）
  const binary = toBinaryArray(upperGua, lowerGua);
  
  // 完全颠倒六爻顺序（从下往上变成从上往下）
  // 例如：水山蹇 ䷦ (001010) -> 雷水解 ䷧ (010100)
  const reversedBinary = binary.reverse();
  
  // 转换回上下卦
  const lowerBinary = reversedBinary.slice(0, 3);
  const upperBinary = reversedBinary.slice(3);
  
  return {
    lower: binaryToGuaNumber(lowerBinary),
    upper: binaryToGuaNumber(upperBinary)
  };
};

// 计算错卦（阴阳反转）
const calculateOppositeGua = (upperGua: number, lowerGua: number): { upper: number; lower: number } => {
  // 将卦象转换为二进制数组（从下往上）
  const binary = toBinaryArray(upperGua, lowerGua);
  
  // 阴阳反转
  const oppositeBinary = binary.map(bit => bit === 0 ? 1 : 0);
  
  // 转换回上下卦
  const lowerBinary = oppositeBinary.slice(0, 3);
  const upperBinary = oppositeBinary.slice(3);
  
  return {
    lower: binaryToGuaNumber(lowerBinary),
    upper: binaryToGuaNumber(upperBinary)
  };
};

// 统一的起卦参数接口
export interface DivinationParams {
  upperGua: number;  // 上卦数字(1-8)
  lowerGua: number;  // 下卦数字(1-8)
  changingLine: number;  // 动爻位置(1-6)
}

// 统一的卦象计算函数
export const calculateDivination = (params: DivinationParams) => {
  const { upperGua, lowerGua, changingLine } = params;

  // 计算各种卦
  const hu = calculateHuGua(upperGua, lowerGua);
  const changed = calculateChangedGua(upperGua, lowerGua, changingLine);
  const opposite = calculateOppositeGua(upperGua, lowerGua);
  const synthesis = calculateSynthesisGua(upperGua, lowerGua);

  // 获取卦名和数据
  const mainHexagram = findHexagram(getGuaNameByNumber(upperGua), getGuaNameByNumber(lowerGua));
  const huHexagram = findHexagram(getGuaNameByNumber(hu.upper), getGuaNameByNumber(hu.lower));
  const changedHexagram = findHexagram(getGuaNameByNumber(changed.upper), getGuaNameByNumber(changed.lower));
  const oppositeHexagram = findHexagram(getGuaNameByNumber(opposite.upper), getGuaNameByNumber(opposite.lower));
  const synthesisHexagram = findHexagram(getGuaNameByNumber(synthesis.upper), getGuaNameByNumber(synthesis.lower));

  return {
    mainGua: {
      name: mainHexagram?.name || '',
      symbol: mainHexagram?.symbol || '',
      changingLine,
      upperGua: getGuaNameByNumber(upperGua),
      lowerGua: getGuaNameByNumber(lowerGua)
    },
    huGua: {
      name: huHexagram?.name || '',
      symbol: huHexagram?.symbol || '',
      upperGua: getGuaNameByNumber(hu.upper),
      lowerGua: getGuaNameByNumber(hu.lower)
    },
    bianGua: {
      name: changedHexagram?.name || '',
      symbol: changedHexagram?.symbol || '',
      upperGua: getGuaNameByNumber(changed.upper),
      lowerGua: getGuaNameByNumber(changed.lower)
    },
    cuoGua: {
      name: oppositeHexagram?.name || '',
      symbol: oppositeHexagram?.symbol || '',
      upperGua: getGuaNameByNumber(opposite.upper),
      lowerGua: getGuaNameByNumber(opposite.lower)
    },
    zongGua: {
      name: synthesisHexagram?.name || '',
      symbol: synthesisHexagram?.symbol || '',
      upperGua: getGuaNameByNumber(synthesis.upper),
      lowerGua: getGuaNameByNumber(synthesis.lower)
    }
  };
}; 
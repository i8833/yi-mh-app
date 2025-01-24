import { calculateDivination } from './divinationUtils';

export const calculateTimeDivination = (params: {
  year: number;
  month: number;
  day: number;
  hour: number;
}) => {
  const { year, month, day, hour } = params;
  
  // 计算上卦、下卦和动爻
  const upperGua = ((year + month + day) % 8) || 8;
  const lowerGua = ((year + month + day + hour) % 8) || 8;
  const changingLine = ((year + month + day + hour) % 6) || 6;

  // 使用统一的计算函数
  return calculateDivination({ upperGua, lowerGua, changingLine });
}; 
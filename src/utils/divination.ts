import { calculateDivination } from './divinationUtils';
import { Solar, Lunar } from 'lunar-javascript';
import { EarthlyBranches } from '../types/divination';

// 天干
const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
// 地支
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 地支转数字（1-12）
const branchToNumber = (branch: string): number => {
  return EARTHLY_BRANCHES.indexOf(branch.charAt(0)) + 1;
};

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

// 获取时辰的干支
function getHourGanZhi(hour: number, dayGan: string): string {
  // 根据日干确定子时开始的天干
  const startGan = {
    '甲': 0, '己': 0,    // 甲己日起甲子
    '乙': 2, '庚': 2,    // 乙庚日起丙子
    '丙': 4, '辛': 4,    // 丙辛日起戊子
    '丁': 6, '壬': 6,    // 丁壬日起庚子
    '戊': 8, '癸': 8     // 戊癸日起壬子
  }[dayGan] || 0;

  const hourIndex = Math.floor((hour + 1) / 2) % 12;
  const ganIndex = (startGan + hourIndex) % 10;
  
  return HEAVENLY_STEMS[ganIndex] + EARTHLY_BRANCHES[hourIndex];
}

// 获取当前时间信息
export function getCurrentChineseTime(): TimeInfo {
  const now = new Date();
  const solar = Solar.fromDate(now);
  const lunar = solar.getLunar();
  
  const hour = now.getHours();
  const hourIndex = Math.floor((hour + 1) / 2) % 12;
  
  // 获取日干（用于计算时干）
  const dayGan = lunar.getDayInGanZhi().substring(0, 1);

  return {
    year: now.getFullYear(),  // 公历年
    month: now.getMonth() + 1, // 公历月
    day: now.getDate(),       // 公历日
    hour: hour,
    
    // 农历信息
    lunarYear: lunar.getYearInGanZhi() + '年', // 使用干支纪年
    lunarMonth: lunar.getMonthInChinese() + '月',
    lunarDay: lunar.getDayInChinese(),
    lunarHour: EARTHLY_BRANCHES[hourIndex] + '时',
    
    // 干支信息
    yearGanZhi: lunar.getYearInGanZhi(),
    monthGanZhi: lunar.getMonthInGanZhi(),
    dayGanZhi: lunar.getDayInGanZhi(),
    hourGanZhi: getHourGanZhi(hour, dayGan)
  };
}

// 生成占卜结果
export const generateDivinationResult = () => {
  const timeInfo = getCurrentChineseTime();
  
  // 将年干支转换为地支数字（1-12）
  const yearBranch = timeInfo.yearGanZhi.substring(1);
  const yearNum = branchToNumber(yearBranch);
  
  // 月、日直接使用农历数字
  const monthNum = timeInfo.month;
  const dayNum = timeInfo.day;
  
  // 时辰转换为对应数字（1-12）
  const hourBranch = timeInfo.lunarHour.charAt(0);
  const hourNum = branchToNumber(hourBranch);
  
  console.log('计算参数：', {
    yearNum,
    monthNum,
    dayNum,
    hourNum
  });
  
  // 计算卦数
  let upperGua = (yearNum + monthNum + dayNum) % 8;
  let lowerGua = (yearNum + monthNum + dayNum + hourNum) % 8;
  let changingLine = (yearNum + monthNum + dayNum + hourNum) % 6;
  
  // 处理余数为0的情况
  upperGua = upperGua === 0 ? 8 : upperGua;
  lowerGua = lowerGua === 0 ? 8 : lowerGua;
  changingLine = changingLine === 0 ? 6 : changingLine;

  // 使用 divinationUtils 中的函数计算卦象
  const divinationResult = calculateDivination({
    upperGua,
    lowerGua,
    changingLine
  });

  // 构建完整的卦象结果
  const hexagram = {
    name: divinationResult.mainGua.name,
    symbol: divinationResult.mainGua.symbol,
    upperTrigram: {
      name: divinationResult.mainGua.upperGua,
      symbol: '',  // 这里需要从卦象数据中获取
      nature: '',  // 需要补充卦象属性
      attribute: ''
    },
    lowerTrigram: {
      name: divinationResult.mainGua.lowerGua,
      symbol: '',  // 这里需要从卦象数据中获取
      nature: '',  // 需要补充卦象属性
      attribute: ''
    },
    changingLine: changingLine,
    meaning: ''  // 需要补充卦象含义
  };

  return {
    timeInfo: {
      year: timeInfo.lunarYear,
      month: timeInfo.lunarMonth,
      day: timeInfo.lunarDay,
      hour: timeInfo.lunarHour,
      raw: timeInfo
    },
    hexagram,
    mainGua: divinationResult.mainGua,
    huGua: divinationResult.huGua,
    bianGua: divinationResult.bianGua,
    cuoGua: divinationResult.cuoGua,
    zongGua: divinationResult.zongGua,
    calculation: {
      upperTrigramFormula: `(${yearNum} + ${monthNum} + ${dayNum}) % 8 = ${upperGua}`,
      lowerTrigramFormula: `(${yearNum} + ${monthNum} + ${dayNum} + ${hourNum}) % 8 = ${lowerGua}`,
      changingLineFormula: `(${yearNum} + ${monthNum} + ${dayNum} + ${hourNum}) % 6 = ${changingLine}`
    },
    timestamp: new Date().toISOString(),
  };
}; 
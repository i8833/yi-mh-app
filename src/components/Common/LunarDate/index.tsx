import React, { useState, useEffect, useMemo } from 'react';
import { Typography, Space } from 'antd';
import Lunar from 'lunar-javascript';
import { useDebounce } from '../../../hooks/useDebounce';
import { TimeInfo } from '../../../types/divination';
import styles from './LunarDate.module.css';

const { Text } = Typography;

const LunarDate: React.FC = React.memo(() => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const debouncedTime = useDebounce(currentTime, 1000); // 1秒更新一次

  // 计算农历信息
  const lunarInfo = useMemo(() => {
    const solar = Lunar.Solar.fromDate(debouncedTime);
    const lunar = solar.getLunar();

    return {
      solarDate: `${solar.getYear()}年${solar.getMonth()}月${solar.getDay()}日`,
      lunarYear: lunar.getYearInChinese(),
      lunarMonth: lunar.getMonthInChinese(),
      lunarDay: lunar.getDayInChinese(),
      lunarHour: lunar.getTimeZhi(),
      yearGanZhi: lunar.getYearInGanZhi(),
      monthGanZhi: lunar.getMonthInGanZhi(),
      dayGanZhi: lunar.getDayInGanZhi(),
      hourGanZhi: lunar.getTimeInGanZhi(),
      zodiac: lunar.getYearShengXiao(),
      solarTerm: lunar.getCurrentJieQi()?.getName() || ''
    };
  }, [debouncedTime]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.container}>
      <Space direction="vertical" size="small">
        <Text className={styles.dateText}>
          公历：{lunarInfo.solarDate}
        </Text>
        <Text className={styles.dateText}>
          农历：{lunarInfo.lunarYear}年 {lunarInfo.lunarMonth}月{lunarInfo.lunarDay}
        </Text>
        <Text className={styles.timeText}>
          时辰：{lunarInfo.lunarHour}时
        </Text>
        <Space className={styles.ganzhiText}>
          <Text>年干支：{lunarInfo.yearGanZhi}</Text>
          <Text>月干支：{lunarInfo.monthGanZhi}</Text>
        </Space>
        <Space className={styles.ganzhiText}>
          <Text>日干支：{lunarInfo.dayGanZhi}</Text>
          <Text>时干支：{lunarInfo.hourGanZhi}</Text>
        </Space>
        <Space className={styles.extraInfo}>
          <Text>生肖：{lunarInfo.zodiac}</Text>
          {lunarInfo.solarTerm && <Text>节气：{lunarInfo.solarTerm}</Text>}
        </Space>
      </Space>
    </div>
  );
});

LunarDate.displayName = 'LunarDate';

export default LunarDate; 
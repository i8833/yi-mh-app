import React, { useState, useEffect } from 'react';
import { Card, Button, Typography, Space, Divider, Input, message } from 'antd';
import { LeftOutlined, SaveOutlined, HistoryOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { generateDivinationResult, getCurrentChineseTime } from '../../../utils/divination';
import type { TimeInfo, DivinationRecord } from '../../../types/divination';
import styles from './TimeDivination.module.css';
import { useDivinationStore } from '../../../store/divinationStore';
import { calculateDivination } from '../../../utils/divinationUtils';
import guaData from '../../../gua64.json';
import DivinationResult from '../../Common/DivinationResult';
import { getSymbolsData } from '../../../64symbols';
import { SymbolModal } from '../../SymbolModal';

const { Title, Text } = Typography;

// 地支对应数字（1-12）
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 农历月份中文数字转换
const LUNAR_MONTH_MAP = {
  '正': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6,
  '七': 7, '八': 8, '九': 9, '十': 10, '冬': 11, '腊': 12
};

// 农历日期中文数字转换
const LUNAR_DAY_MAP = {
  '初一': 1, '初二': 2, '初三': 3, '初四': 4, '初五': 5,
  '初六': 6, '初七': 7, '初八': 8, '初九': 9, '初十': 10,
  '十一': 11, '十二': 12, '十三': 13, '十四': 14, '十五': 15,
  '十六': 16, '十七': 17, '十八': 18, '十九': 19, '二十': 20,
  '廿一': 21, '廿二': 22, '廿三': 23, '廿四': 24, '廿五': 25,
  '廿六': 26, '廿七': 27, '廿八': 28, '廿九': 29, '三十': 30
};

const TimeDivination: React.FC = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState<TimeInfo>(getCurrentChineseTime());
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [question, setQuestion] = useState(''); // 所问之事
  const [analysis, setAnalysis] = useState(''); // 断语、分析
  const { setDivinationResult, addDivinationRecord } = useDivinationStore();
  const [selectedSymbol, setSelectedSymbol] = useState<Symbol | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 更新当前时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentChineseTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 地支转数字（1-12）
  const branchToNumber = (branch: string): number => {
    const index = EARTHLY_BRANCHES.indexOf(branch);
    return index === -1 ? 1 : index + 1;
  };

  // 农历月份转数字（1-12）
  const lunarMonthToNumber = (monthStr: string): number => {
    const month = monthStr.replace('月', '');
    return LUNAR_MONTH_MAP[month] || 1;
  };

  // 农历日期转数字（1-30）
  const lunarDayToNumber = (dayStr: string): number => {
    return LUNAR_DAY_MAP[dayStr] || 1;
  };

  const handleDivination = async () => {
    try {
      setLoading(true);
      console.log("开始占卜...");
      
      // 1. 获取时间数字
      const yearBranch = currentTime.yearGanZhi.substring(1, 2);
      const yearNum = branchToNumber(yearBranch);
      
      const monthNum = lunarMonthToNumber(currentTime.lunarMonth);
      const dayNum = lunarDayToNumber(currentTime.lunarDay);
      
      const hourBranch = currentTime.hourGanZhi.substring(1, 2);
      const hourNum = branchToNumber(hourBranch);

      console.log('时间参数：', {
        yearNum: `${yearNum}（${yearBranch}）`,
        monthNum: `${monthNum}（${currentTime.lunarMonth}）`,
        dayNum: `${dayNum}（${currentTime.lunarDay}）`,
        hourNum: `${hourNum}（${hourBranch}时）`
      });

      // 2. 计算卦数
      let upperGua = (yearNum + monthNum + dayNum) % 8;
      let lowerGua = (yearNum + monthNum + dayNum + hourNum) % 8;
      let changingLine = (yearNum + monthNum + dayNum + hourNum) % 6;

      // 3. 处理余数为0的情况
      upperGua = upperGua === 0 ? 8 : upperGua;
      lowerGua = lowerGua === 0 ? 8 : lowerGua;
      changingLine = changingLine === 0 ? 6 : changingLine;

      console.log('卦数计算结果：', {
        upperGua,
        lowerGua,
        changingLine,
        formula: {
          upper: `(${yearNum} + ${monthNum} + ${dayNum}) % 8 = ${upperGua}`,
          lower: `(${yearNum} + ${monthNum} + ${dayNum} + ${hourNum}) % 8 = ${lowerGua}`,
          changing: `(${yearNum} + ${monthNum} + ${dayNum} + ${hourNum}) % 6 = ${changingLine}`
        }
      });

      // 4. 使用 divinationUtils 计算卦象
      const divinationResult = calculateDivination({
        upperGua,
        lowerGua,
        changingLine
      });

      // 5. 从 gua64.json 中查找对应的卦象
      const mainHexagram = guaData.hexagrams.find(
        hex => hex.upperGua === divinationResult.mainGua.upperGua && 
               hex.lowerGua === divinationResult.mainGua.lowerGua
      );

      const huHexagram = guaData.hexagrams.find(
        hex => hex.upperGua === divinationResult.huGua.upperGua && 
               hex.lowerGua === divinationResult.huGua.lowerGua
      );

      const bianHexagram = guaData.hexagrams.find(
        hex => hex.upperGua === divinationResult.bianGua.upperGua && 
               hex.lowerGua === divinationResult.bianGua.lowerGua
      );

      const cuoHexagram = guaData.hexagrams.find(
        hex => hex.upperGua === divinationResult.cuoGua.upperGua && 
               hex.lowerGua === divinationResult.cuoGua.lowerGua
      );

      const zongHexagram = guaData.hexagrams.find(
        hex => hex.upperGua === divinationResult.zongGua.upperGua && 
               hex.lowerGua === divinationResult.zongGua.lowerGua
      );

      // 6. 构建完整的卦象结果
      const result = {
        timeInfo: {
          year: currentTime.lunarYear,
          month: currentTime.lunarMonth,
          day: currentTime.lunarDay,
          hour: currentTime.lunarHour,
          raw: currentTime
        },
        hexagram: {
          name: mainHexagram?.name || '',
          symbol: mainHexagram?.symbol || '',
          upperTrigram: {
            name: divinationResult.mainGua.upperGua,
            symbol: mainHexagram?.upperSymbol || '',
          },
          lowerTrigram: {
            name: divinationResult.mainGua.lowerGua,
            symbol: mainHexagram?.lowerSymbol || '',
          },
          changingLine,
        },
        mainGua: {
          ...divinationResult.mainGua,
          symbol: mainHexagram?.symbol || '',
        },
        huGua: {
          ...divinationResult.huGua,
          symbol: huHexagram?.symbol || '',
        },
        bianGua: {
          ...divinationResult.bianGua,
          symbol: bianHexagram?.symbol || '',
        },
        cuoGua: {
          ...divinationResult.cuoGua,
          symbol: cuoHexagram?.symbol || '',
        },
        zongGua: {
          ...divinationResult.zongGua,
          symbol: zongHexagram?.symbol || '',
        },
        calculation: {
          upperTrigramFormula: `(${yearNum}[${yearBranch}] + ${monthNum}[农历${currentTime.lunarMonth}] + ${dayNum}[农历${currentTime.lunarDay}]) % 8 = ${upperGua}`,
          lowerTrigramFormula: `(${yearNum}[${yearBranch}] + ${monthNum}[农历${currentTime.lunarMonth}] + ${dayNum}[农历${currentTime.lunarDay}] + ${hourNum}[${hourBranch}时]) % 8 = ${lowerGua}`,
          changingLineFormula: `(${yearNum}[${yearBranch}] + ${monthNum}[农历${currentTime.lunarMonth}] + ${dayNum}[农历${currentTime.lunarDay}] + ${hourNum}[${hourBranch}时]) % 6 = ${changingLine}`
        },
        timestamp: new Date().toISOString(),
      };

      setResult(result);
      setDivinationResult({
        ...result,
        method: 'time'
      });

      console.log("完整占卜结果:", result);
    } catch (error) {
      console.error("占卜过程出错:", error);
      message.error('占卜过程出错，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 保存占卜记录
  const handleSave = () => {
    if (!result) {
      message.warning('请先进行起卦');
      return;
    }

    const record: DivinationRecord = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      question: question || '无问题记录',
      analysis: analysis || '无分析记录',
      result: result,
      method: 'time'
    };

    try {
      addDivinationRecord(record);
      message.success({
        content: '占卜记录已保存',
        duration: 2,
        style: {
          marginTop: '20vh',
        },
      });
      
      // 清空输入
      setQuestion('');
      setAnalysis('');
    } catch (error) {
      message.error({
        content: '保存记录失败，请重试',
        duration: 2,
        style: {
          marginTop: '20vh',
        },
      });
    }
  };

  // 查看历史记录
  const handleViewHistory = () => {
    navigate('/divination/history');
  };

  // 添加处理卦象点击的函数
  const handleSymbolClick = (name: string) => {
    console.log('Clicking symbol:', name);
    const symbols = getSymbolsData();
    const symbol = symbols.find(s => s.name === name);
    console.log('Found symbol:', symbol);
    
    if (symbol) {
      setSelectedSymbol(symbol);
      setIsModalOpen(true);
    }
  };

  return (
    <div className={styles.container} style={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '1.5rem',
      backgroundColor: '#f5f5f5'
    }}>
      {/* 优化头部 */}
      <div className={styles.header} style={{ 
        textAlign: 'center',
        marginBottom: '2rem',
        padding: '2rem',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '600px'
      }}>
        
        <Title level={2} style={{ 
          fontSize: '1.8rem',
          marginBottom: '0.5rem',
          color: '#1890ff'
        }}>
          时间起卦
        </Title>   

        

      </div>

      {/* 优化内容容器 */}
      <div style={{ 
        flex: 1,
        width: '100%',
        maxWidth: '600px',
        marginBottom: '2rem'
      }}>
        <Card style={{ 
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          padding: '1.5rem'
        }}>
          {/* 时间信息区域 */}
          <div className={styles.timeInfo}>
            <Space direction="vertical" className={styles.timeDetails}>
              <div className={styles.timeRow}>
                <Text style={{ color: '#666' }}>公历：{currentTime.year}年{currentTime.month}月{currentTime.day}日 {currentTime.hour}时</Text>
              </div>
              <div className={styles.timeRow}>
                <Text style={{ color: '#666' }}>农历：{currentTime.lunarYear}{currentTime.lunarMonth}{currentTime.lunarDay} {currentTime.lunarHour}</Text>
              </div>
              <div className={styles.timeRow}>
                <Text style={{ color: '#666' }}>年干支：{currentTime.yearGanZhi}</Text>
                <Text style={{ color: '#666' }}>月干支：{currentTime.monthGanZhi}</Text>
              </div>
              <div className={styles.timeRow}>
                <Text style={{ color: '#666' }}>日干支：{currentTime.dayGanZhi}</Text>
                <Text style={{ color: '#666' }}>时干支：{currentTime.hourGanZhi}</Text>
              </div>
            </Space>
          </div>

          {/* 所问之事输入区域 */}
          <div className={styles.questionSection}>
            <Text strong>所问之事（选填）：</Text>
            <Input.TextArea 
              rows={4}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="可以输入您想问卜的事情..."
              className={styles.textarea}
            />
          </div>
          
          <Button 
            type="primary" 
            size="large" 
            onClick={handleDivination}
            loading={loading}
            style={{ 
              width: '100%',
              height: '48px',
              borderRadius: '8px',
              fontSize: '1rem',
              marginBottom: '2rem'  // 增加下边距，与保存记录按钮分开
            }}
          >
            {loading ? '占卜中...' : '立即起卦'}
          </Button>

          {result && (
            <div className={styles.resultSection}>
              <DivinationResult 
                result={result}
                analysis={analysis}
                onSymbolClick={handleSymbolClick}
              />
            </div>
          )}

          {result && (
            <div className={styles.analysisSection}>
              <Text strong>断语、分析（选填）：</Text>
              <Input.TextArea 
                rows={4}
                value={analysis}
                onChange={(e) => setAnalysis(e.target.value)}
                placeholder="可以输入您对卦象的分析..."
                className={styles.textarea}
              />
            </div>
          )}

          {/* 保存按钮 */}
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleSave}
            style={{ 
              width: '100%',
              height: '48px',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          >
            保存记录
          </Button>
        </Card>

        <Button 
          type="link" 
          icon={<LeftOutlined style={{ color: '#666' }} />} 
          onClick={() => navigate('/')}
        >
          返回首页
        </Button>
        
      </div>

      {/* 优化页脚 */}
      <div style={{ 
        textAlign: 'left',
        marginTop: '0rem',
        padding: '1rem',
        color: '#666',
        fontSize: '0.9rem',
        width: '100%',
        maxWidth: '600px'
      }}>
        
        
      </div>

      {/* 添加模态框组件 */}
      <SymbolModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        symbol={selectedSymbol}
      />
    </div>
  );
};

export default TimeDivination; 
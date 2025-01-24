import { useState, useCallback } from 'react';
import { calculateDivination, DivinationParams } from '../utils/divinationUtils';
import { useDivinationStore } from '../store/divinationStore';
import { showMessage } from '../utils/messageUtils';
import Loading from '../components/Common/Loading';

const useDivination = () => {
  const [loading, setLoading] = useState(false);
  const { setDivinationResult } = useDivinationStore();

  const calculate = useCallback(async (params: DivinationParams) => {
    setLoading(true);
    try {
      const result = await calculateDivination(params);
      setDivinationResult(result);
    } catch (error: any) {
      showMessage.error(`卦象计算失败: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, [setDivinationResult]);

  return { calculate, loading, Loading };
};

export default useDivination; 
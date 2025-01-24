import { message } from 'antd';

export const showMessage = {
  success: (content: string) => {
    message.success({
      content,
      duration: 2,
    });
  },

  error: (content: string) => {
    message.error({
      content,
      duration: 3,
    });
  },

  warning: (content: string) => {
    message.warning({
      content,
      duration: 2,
    });
  },

  info: (content: string) => {
    message.info({
      content,
      duration: 2,
    });
  },
}; 
export default {
  path: '/chat/history/:userId',
  data: {
    code: 200,
    message: '请求成功',
    data: {
      avatar: '/static/admin-avatar.png',
      name: '插画工坊',
      messages: [
        {
          messageId: 'msg_001',
          from: 1,
          content: '你好，请问这幅画有版权吗？',
          time: Date.now() - 3600000,
          read: true,
        },
        {
          messageId: 'msg_002',
          from: 0,
          content: '你好！这幅画是原创作品，已申请版权保护。',
          time: Date.now() - 3000000,
          read: true,
        },
        {
          messageId: 'msg_003',
          from: 1,
          content: '太好了，我想购买授权使用',
          time: Date.now() - 1800000,
          read: true,
        },
      ],
    },
  },
};

export const chatSendMock = {
  path: '/chat/send',
  method: 'POST',
  data: {
    code: 200,
    message: '发送成功',
    data: {
      messageId: 'msg_' + Date.now(),
    },
  },
};

export default {
  path: '/chat/list',
  data: {
    code: 200,
    message: '请求成功',
    data: [
      {
        userId: 'admin_001',
        name: '插画工坊',
        avatar: '/static/admin-avatar.png',
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
        ],
      },
      {
        userId: 'user_001',
        name: '插画爱好者',
        avatar: '/static/user-avatar.png',
        messages: [
          {
            messageId: 'msg_003',
            from: 1,
            content: '感谢您的关注，最新作品已发布！',
            time: Date.now() - 1800000,
            read: false,
          },
        ],
      },
    ],
  },
};

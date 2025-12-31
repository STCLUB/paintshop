export default {
  path: '/auth/wechat-login',
  data: {
    code: 200,
    message: '登录成功',
    data: {
      token: 'user_token_' + Date.now(),
      userInfo: {
        openid: 'user_openid_123',
        nickName: '插画爱好者',
        avatarUrl: '/static/user-avatar.png',
        gender: 1,
        country: '中国',
        province: '广东',
        city: '深圳',
      },
    },
  },
};

export const adminLoginMock = {
  path: '/auth/admin-login',
  data: {
    code: 200,
    message: '管理员登录成功',
    data: {
      token: 'admin_token_' + Date.now(),
      adminInfo: {
        id: 'admin_001',
        username: 'admin',
        avatar: '/static/admin-avatar.png',
        role: 'admin',
      },
    },
  },
};

import request from '~/api/request';

Page({
  data: {
    username: '',
    password: '',
    loading: false,
    showPassword: false,
  },

  onLoad() {
    this.checkAdminLoginStatus();
  },

  checkAdminLoginStatus() {
    const token = wx.getStorageSync('admin_token');
    const adminInfo = wx.getStorageSync('adminInfo');
    
    if (token && adminInfo) {
      this.redirectToAdminHome();
    }
  },

  onUsernameInput(e) {
    this.setData({ username: e.detail.value });
  },

  onPasswordInput(e) {
    this.setData({ password: e.detail.value });
  },

  togglePassword() {
    this.setData({ showPassword: !this.data.showPassword });
  },

  async handleAdminLogin() {
    const { username, password } = this.data;

    if (!username || !password) {
      wx.showToast({
        title: '请输入账号和密码',
        icon: 'none',
      });
      return;
    }

    this.setData({ loading: true });

    try {
      const loginRes = await this.wxLogin();
      const code = loginRes.code;

      const res = await request('/auth/admin-login', 'POST', {
        code,
        username,
        password,
      });

      if (res.code === 200) {
        const { token, adminInfo } = res.data;
        
        await wx.setStorageSync('admin_token', token);
        await wx.setStorageSync('adminInfo', adminInfo);
        
        wx.showToast({
          title: '管理员登录成功',
          icon: 'success',
        });

        setTimeout(() => {
          this.redirectToAdminHome();
        }, 1500);
      } else {
        wx.showToast({
          title: res.message || '登录失败',
          icon: 'none',
        });
      }
    } catch (error) {
      wx.showToast({
        title: '登录失败，请检查账号密码',
        icon: 'none',
      });
    } finally {
      this.setData({ loading: false });
    }
  },

  wxLogin() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: resolve,
        fail: reject,
      });
    });
  },

  redirectToAdminHome() {
    wx.switchTab({
      url: '/pages/home/index',
    });
  },

  goBack() {
    wx.navigateBack();
  },
});

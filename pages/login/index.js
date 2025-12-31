import request from '~/api/request';

Page({
  data: {
    userInfo: null,
    loading: false,
    loginType: 'user',
    username: '',
    password: '',
    showPassword: false,
  },

  onLoad() {
    this.checkLoginStatus();
  },

  checkLoginStatus() {
    const token = wx.getStorageSync('access_token');
    const userInfo = wx.getStorageSync('userInfo');
    
    if (token && userInfo) {
      this.setData({ userInfo });
      this.redirectToHome();
    }
  },

  onLoginTypeChange(e) {
    this.setData({ loginType: e.detail.value });
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

  async handleWechatLogin() {
    this.setData({ loading: true });

    try {
      const loginRes = await this.wxLogin();
      const code = loginRes.code;

      const userProfile = await this.getUserProfile();
      
      const res = await request('/auth/wechat-login', 'POST', {
        code,
        userInfo: userProfile,
      });

      if (res.code === 200) {
        const { token, userInfo: newUserInfo } = res.data;
        
        await wx.setStorageSync('access_token', token);
        await wx.setStorageSync('userInfo', newUserInfo);
        
        this.setData({ userInfo: newUserInfo });
        
        wx.showToast({
          title: '登录成功',
          icon: 'success',
        });

        setTimeout(() => {
          this.redirectToHome();
        }, 1500);
      }
    } catch (error) {
      wx.showToast({
        title: '登录失败，请重试',
        icon: 'none',
      });
    } finally {
      this.setData({ loading: false });
    }
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
          this.redirectToHome();
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

  getUserProfile() {
    return new Promise((resolve, reject) => {
      wx.getUserProfile({
        desc: '用于完善用户资料',
        success: (res) => {
          resolve({
            nickName: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl,
            gender: res.userInfo.gender,
            country: res.userInfo.country,
            province: res.userInfo.province,
            city: res.userInfo.city,
          });
        },
        fail: reject,
      });
    });
  },

  redirectToHome() {
    wx.switchTab({
      url: '/pages/home/index',
    });
  },
});

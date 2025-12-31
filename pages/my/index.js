import request from '~/api/request';
import useToastBehavior from '~/behaviors/useToast';

Page({
  behaviors: [useToastBehavior],

  data: {
    isLoad: false,
    isAdmin: false,
    userInfo: null,
    adminInfo: null,
    gridList: [],
    settingList: [],
  },

  onLoad() {
    this.checkLoginStatus();
  },

  async onShow() {
    await this.checkLoginStatus();
  },

  async checkLoginStatus() {
    const userToken = wx.getStorageSync('access_token');
    const adminToken = wx.getStorageSync('admin_token');
    
    if (adminToken) {
      const adminInfo = wx.getStorageSync('adminInfo');
      this.setData({
        isAdmin: true,
        adminInfo,
        isLoad: true,
        gridList: [
          {
            name: '全部发布',
            icon: 'root-list',
            type: 'all',
            url: '',
          },
          {
            name: '审核中',
            icon: 'time',
            type: 'progress',
            url: '',
          },
          {
            name: '已发布',
            icon: 'check-circle',
            type: 'published',
            url: '',
          },
          {
            name: '草稿箱',
            icon: 'file-copy',
            type: 'draft',
            url: '',
          },
        ],
        settingList: [
          { name: '退出登录', icon: 'logout', type: 'logout' },
        ],
      });
    } else if (userToken) {
      const userInfo = wx.getStorageSync('userInfo');
      this.setData({
        isAdmin: false,
        userInfo,
        isLoad: true,
        gridList: [
          {
            name: '我的收藏',
            icon: 'heart',
            type: 'favorite',
            url: '',
          },
          {
            name: '浏览历史',
            icon: 'time',
            type: 'history',
            url: '',
          },
        ],
        settingList: [
          { name: '设置', icon: 'setting', type: 'setting', url: '/pages/setting/index' },
          { name: '退出登录', icon: 'logout', type: 'logout' },
        ],
      });
    } else {
      this.setData({
        isLoad: false,
        isAdmin: false,
        userInfo: null,
        adminInfo: null,
        gridList: [],
        settingList: [
          { name: '设置', icon: 'setting', type: 'setting', url: '/pages/setting/index' },
        ],
      });
    }
  },

  onLogin() {
    wx.navigateTo({
      url: '/pages/login/index',
    });
  },

  onNavigateTo() {
    if (this.data.isAdmin) {
      wx.showToast({
        title: '管理员信息编辑',
        icon: 'none',
      });
    } else {
      wx.navigateTo({ url: `/pages/my/info-edit/index` });
    }
  },

  onEleClick(e) {
    const { name, type, url } = e.currentTarget.dataset.data;
    
    if (type === 'logout') {
      this.handleLogout();
    } else if (url) {
      wx.navigateTo({ url });
    } else {
      this.onShowToast('#t-toast', name);
    }
  },

  handleLogout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          if (this.data.isAdmin) {
            wx.removeStorageSync('admin_token');
            wx.removeStorageSync('adminInfo');
          } else {
            wx.removeStorageSync('access_token');
            wx.removeStorageSync('userInfo');
          }
          wx.showToast({
            title: '已退出登录',
            icon: 'success',
          });
          setTimeout(() => {
            this.checkLoginStatus();
          }, 1500);
        }
      },
    });
  },
});

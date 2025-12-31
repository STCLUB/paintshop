import Message from 'tdesign-miniprogram/message/index';
import request from '~/api/request';

Page({
  data: {
    enable: false,
    artworkList: [],
    loading: true,
    isAdmin: false,
    currentTab: 'recommend',
  },

  async onReady() {
    await this.loadArtworkList();
    this.checkAdminStatus();
  },

  onLoad(option) {
    if (option.oper) {
      let content = '';
      if (option.oper === 'release') {
        content = '发布成功';
      } else if (option.oper === 'save') {
        content = '保存成功';
      }
      this.showOperMsg(content);
    }
  },

  checkAdminStatus() {
    const adminToken = wx.getStorageSync('admin_token');
    this.setData({ isAdmin: !!adminToken });
  },

  onRefresh() {
    this.refresh();
  },

  async refresh() {
    this.setData({ enable: true });
    await this.loadArtworkList();
    setTimeout(() => {
      this.setData({ enable: false });
    }, 1500);
  },

  async loadArtworkList() {
    try {
      const res = await request('/artwork/list', 'GET');
      if (res.code === 200) {
        this.setData({
          artworkList: res.data,
          loading: false,
        });
      }
    } catch (error) {
      wx.showToast({
        title: '加载失败',
        icon: 'none',
      });
      this.setData({ loading: false });
    }
  },

  onTabChange(e) {
    this.setData({ currentTab: e.detail.value });
  },

  onArtworkClick(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/artwork/detail/index?id=${id}`,
    });
  },

  goPublish() {
    const adminToken = wx.getStorageSync('admin_token');
    if (!adminToken) {
      wx.showToast({
        title: '请先登录管理员账号',
        icon: 'none',
      });
      return;
    }
    wx.navigateTo({
      url: '/pages/admin/publish/index',
    });
  },

  showOperMsg(content) {
    Message.success({
      context: this,
      offset: [120, 32],
      duration: 4000,
      content,
    });
  },
});

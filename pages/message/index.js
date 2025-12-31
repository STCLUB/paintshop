import request from '~/api/request';

const app = getApp();

Page({
  data: {
    messageList: [],
    loading: true,
  },

  onLoad() {
    this.getMessageList();
    app.eventBus.on('unread-num-change', this.updateUnreadNum);
  },

  onUnload() {
    app.eventBus.off('unread-num-change', this.updateUnreadNum);
  },

  async getMessageList() {
    try {
      const res = await request('/chat/list', 'GET');
      if (res.code === 200) {
        this.setData({ 
          messageList: res.data || [],
          loading: false,
        });
        app.setUnreadNum(this.computeUnreadNum());
      }
    } catch (error) {
      console.error('获取消息列表失败', error);
      this.setData({ loading: false });
    }
  },

  computeUnreadNum() {
    let unreadNum = 0;
    this.data.messageList.forEach(({ messages }) => {
      unreadNum += messages.filter((item) => !item.read).length;
    });
    return unreadNum;
  },

  updateUnreadNum(unreadNum) {
    this.setData({ messageList: this.data.messageList });
  },

  onRefresh() {
    this.getMessageList();
  },

  toChat(event) {
    const { userId, name, avatar } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/chat/index?userId=${userId}`,
    });
  },
});

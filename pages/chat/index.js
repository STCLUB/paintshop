import request from '~/api/request';

Page({
  data: {
    myAvatar: '',
    userId: null,
    avatar: '',
    name: '',
    messages: [],
    input: '',
    anchor: '',
    keyboardHeight: 0,
    artworkId: '',
    isAdmin: false,
  },

  onLoad(options) {
    const { userId, artworkId } = options;
    
    const userInfo = wx.getStorageSync('userInfo');
    const adminToken = wx.getStorageSync('admin_token');
    
    this.setData({
      myAvatar: userInfo ? userInfo.avatarUrl : '/static/user-avatar.png',
      isAdmin: !!adminToken,
      artworkId: artworkId || '',
    });

    if (userId) {
      this.loadChatHistory(userId);
      this.setData({ userId });
    }
  },

  async loadChatHistory(userId) {
    try {
      const res = await request(`/chat/history/${userId}`, 'GET');
      if (res.code === 200) {
        const { avatar, name, messages } = res.data;
        this.setData({ 
          avatar, 
          name, 
          messages: [...messages] 
        });
        wx.nextTick(this.scrollToBottom);
      }
    } catch (error) {
      console.error('加载聊天记录失败', error);
    }
  },

  handleKeyboardHeightChange(event) {
    const { height } = event.detail;
    if (!height) return;
    this.setData({ keyboardHeight: height });
    wx.nextTick(this.scrollToBottom);
  },

  handleBlur() {
    this.setData({ keyboardHeight: 0 });
  },

  handleInput(event) {
    this.setData({ input: event.detail.value });
  },

  async sendMessage() {
    const { userId, messages, input: content } = this.data;
    if (!content.trim()) return;

    const newMessage = { 
      messageId: Date.now(),
      from: this.data.isAdmin ? 1 : 0,
      content, 
      time: Date.now(), 
      read: true 
    };
    
    messages.push(newMessage);
    this.setData({ input: '', messages });
    wx.nextTick(this.scrollToBottom);

    try {
      const res = await request('/chat/send', 'POST', {
        toUserId: userId,
        content,
        artworkId: this.data.artworkId,
      });

      if (res.code !== 200) {
        wx.showToast({
          title: '发送失败',
          icon: 'none',
        });
      }
    } catch (error) {
      wx.showToast({
        title: '发送失败',
        icon: 'none',
      });
    }
  },

  scrollToBottom() {
    this.setData({ anchor: 'bottom' });
  },
});

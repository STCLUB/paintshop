import request from '~/api/request';

Page({
  data: {
    artworkId: '',
    artwork: null,
    loading: true,
    currentImageIndex: 0,
    commentList: [],
    commentInput: '',
    isLiked: false,
    likeCount: 0,
    isAdmin: false,
  },

  onLoad(options) {
    const { id } = options;
    if (id) {
      this.setData({ artworkId: id });
      this.loadArtworkDetail(id);
      this.loadComments(id);
    }
    this.checkAdminStatus();
  },

  checkAdminStatus() {
    const adminToken = wx.getStorageSync('admin_token');
    this.setData({ isAdmin: !!adminToken });
  },

  async loadArtworkDetail(id) {
    try {
      const res = await request(`/artwork/${id}`, 'GET');
      if (res.code === 200) {
        this.setData({
          artwork: res.data,
          likeCount: res.data.likeCount || 0,
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

  async loadComments(id) {
    try {
      const res = await request(`/artwork/${id}/comments`, 'GET');
      if (res.code === 200) {
        this.setData({ commentList: res.data || [] });
      }
    } catch (error) {
      console.error('加载评论失败', error);
    }
  },

  onImageChange(e) {
    this.setData({
      currentImageIndex: e.detail.current,
    });
  },

  previewImage(e) {
    const { url, urls } = e.currentTarget.dataset;
    wx.previewImage({
      current: url,
      urls: urls,
    });
  },

  onCommentInput(e) {
    this.setData({ commentInput: e.detail.value });
  },

  async submitComment() {
    const { commentInput, artworkId } = this.data;
    
    if (!commentInput.trim()) {
      wx.showToast({
        title: '请输入评论内容',
        icon: 'none',
      });
      return;
    }

    const userToken = wx.getStorageSync('access_token');
    if (!userToken) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
      });
      return;
    }

    try {
      const res = await request(`/artwork/${artworkId}/comments`, 'POST', {
        content: commentInput,
      });

      if (res.code === 200) {
        wx.showToast({
          title: '评论成功',
          icon: 'success',
        });
        this.setData({ commentInput: '' });
        this.loadComments(artworkId);
      }
    } catch (error) {
      wx.showToast({
        title: '评论失败',
        icon: 'none',
      });
    }
  },

  async toggleLike() {
    const userToken = wx.getStorageSync('access_token');
    if (!userToken) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
      });
      return;
    }

    const { artworkId, isLiked, likeCount } = this.data;

    try {
      const res = await request(`/artwork/${artworkId}/like`, 'POST', {
        action: isLiked ? 'unlike' : 'like',
      });

      if (res.code === 200) {
        this.setData({
          isLiked: !isLiked,
          likeCount: isLiked ? likeCount - 1 : likeCount + 1,
        });
      }
    } catch (error) {
      wx.showToast({
        title: '操作失败',
        icon: 'none',
      });
    }
  },

  onShareAppMessage() {
    const { artwork } = this.data;
    return {
      title: artwork ? artwork.title : '插画工坊',
      path: `/pages/artwork/detail/index?id=${this.data.artworkId}`,
      imageUrl: artwork ? artwork.images[0] : '',
    };
  },

  onShareTimeline() {
    const { artwork } = this.data;
    return {
      title: artwork ? artwork.title : '插画工坊',
      imageUrl: artwork ? artwork.images[0] : '',
    };
  },

  goToChat() {
    const userToken = wx.getStorageSync('access_token');
    if (!userToken) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
      });
      return;
    }
    wx.navigateTo({
      url: `/pages/chat/index?artworkId=${this.data.artworkId}`,
    });
  },
});

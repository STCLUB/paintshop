import request from '~/api/request';

Page({
  data: {
    artworkId: '',
    artwork: null,
    loading: true,
    currentImageIndex: 0,
  },

  onLoad(options) {
    const { id } = options;
    if (id) {
      this.setData({ artworkId: id });
      this.loadArtworkDetail(id);
    }
  },

  async loadArtworkDetail(id) {
    try {
      const res = await request(`/artwork/${id}`, 'GET');
      if (res.code === 200) {
        this.setData({
          artwork: res.data,
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
});

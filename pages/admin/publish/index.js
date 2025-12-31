import request from '~/api/request';

Page({
  data: {
    images: [],
    title: '',
    description: '',
    tags: [],
    category: '',
    categories: ['原创插画', 'AI绘画', '版权素材', '风格灵动', '其他'],
    selectedTags: [],
    availableTags: ['风景', '人物', '动物', '植物', '抽象', '动漫', '写实', '梦幻'],
    loading: false,
  },

  onLoad() {
    this.checkAdminAuth();
  },

  checkAdminAuth() {
    const adminToken = wx.getStorageSync('admin_token');
    if (!adminToken) {
      wx.showToast({
        title: '请先登录管理员账号',
        icon: 'none',
      });
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/admin/login/index',
        });
      }, 1500);
    }
  },

  onTitleInput(e) {
    this.setData({ title: e.detail.value });
  },

  onDescriptionInput(e) {
    this.setData({ description: e.detail.value });
  },

  onImageUpload(e) {
    const { files } = e.detail;
    this.setData({ images: files });
  },

  onImageRemove(e) {
    const { index } = e.detail;
    const { images } = this.data;
    images.splice(index, 1);
    this.setData({ images });
  },

  onCategoryChange(e) {
    this.setData({ category: e.detail.value });
  },

  onTagToggle(e) {
    const { tag } = e.currentTarget.dataset;
    const { selectedTags } = this.data;
    const index = selectedTags.indexOf(tag);
    
    if (index > -1) {
      selectedTags.splice(index, 1);
    } else {
      selectedTags.push(tag);
    }
    
    this.setData({ selectedTags });
  },

  async handleSaveDraft() {
    if (!this.validateForm()) return;
    
    this.setData({ loading: true });

    try {
      const res = await request('/artwork/draft', 'POST', {
        images: this.data.images.map(img => img.url),
        title: this.data.title,
        description: this.data.description,
        tags: this.data.selectedTags,
        category: this.data.category,
        status: 'draft',
      });

      if (res.code === 200) {
        wx.showToast({
          title: '保存草稿成功',
          icon: 'success',
        });
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      }
    } catch (error) {
      wx.showToast({
        title: '保存失败',
        icon: 'none',
      });
    } finally {
      this.setData({ loading: false });
    }
  },

  async handlePublish() {
    if (!this.validateForm()) return;
    
    this.setData({ loading: true });

    try {
      const res = await request('/artwork/publish', 'POST', {
        images: this.data.images.map(img => img.url),
        title: this.data.title,
        description: this.data.description,
        tags: this.data.selectedTags,
        category: this.data.category,
        status: 'published',
      });

      if (res.code === 200) {
        wx.showToast({
          title: '发布成功',
          icon: 'success',
        });
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/home/index',
          });
        }, 1500);
      }
    } catch (error) {
      wx.showToast({
        title: '发布失败',
        icon: 'none',
      });
    } finally {
      this.setData({ loading: false });
    }
  },

  validateForm() {
    const { images, title, description, category } = this.data;

    if (images.length === 0) {
      wx.showToast({
        title: '请至少上传一张图片',
        icon: 'none',
      });
      return false;
    }

    if (!title.trim()) {
      wx.showToast({
        title: '请输入标题',
        icon: 'none',
      });
      return false;
    }

    if (!description.trim()) {
      wx.showToast({
        title: '请输入描述',
        icon: 'none',
      });
      return false;
    }

    if (!category) {
      wx.showToast({
        title: '请选择分类',
        icon: 'none',
      });
      return false;
    }

    return true;
  },
});

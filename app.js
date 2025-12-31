import config from './config';
import Mock from './mock/index';
import createBus from './utils/eventBus';

if (config.isMock) {
  Mock();
}

App({
  onLaunch() {
    const updateManager = wx.getUpdateManager();

    updateManager.onCheckForUpdate((res) => {
    });

    updateManager.onUpdateReady(() => {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            updateManager.applyUpdate();
          }
        },
      });
    });
  },
  globalData: {
    userInfo: null,
    adminInfo: null,
    unreadNum: 0,
  },

  eventBus: createBus(),

  setUnreadNum(num) {
    this.globalData.unreadNum = num;
    this.eventBus.emit('unread-num-change', num);
  },
});

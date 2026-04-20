// pages/mine/mine.js
const app = getApp();

Page({
  data: {
    // 用户信息
    userInfo: null,
    // 会员信息
    memberInfo: {
      level: 'gold',
      levelName: '黄金会员',
      levelIcon: '⭐',
      balance: 128.50,
      points: 680,
      couponCount: 3,
      stampCount: 5,
      growthValue: 680,
      nextLevelValue: 2000,
      nextLevelName: '钻石会员',
      progressPercent: 34
    },
    // 功能菜单
    menus: [
      { id: 'order', name: '我的订单', icon: '📦', path: '/pages/orders/orders' },
      { id: 'coupon', name: '我的优惠券', icon: '🎫', path: '/pages/coupons/coupons' },
      { id: 'stamps', name: '集点卡', icon: '🏷️', path: '/pages/stamps/stamps' },
      { id: 'address', name: '地址管理', icon: '📍', path: '/pages/addresses/addresses' }
    ],
    bottomMenus: [
      { id: 'recharge', name: '会员充值', icon: '💳', path: '/pages/recharge/recharge' },
      { id: 'service', name: '联系客服', icon: '📱', action: 'contactService' },
      { id: 'settings', name: '设置', icon: '⚙️', path: '/pages/settings/settings' }
    ]
  },

  onLoad() {
    this.loadUserInfo();
  },

  onShow() {
    this.loadUserInfo();
  },

  // 加载用户信息
  loadUserInfo() {
    const userInfo = app.globalData.userInfo;
    if (userInfo) {
      this.setData({ userInfo });
    }
  },

  // 跳转页面
  onMenuTap(e) {
    const menu = e.currentTarget.dataset.menu;
    if (menu.path) {
      wx.navigateTo({ url: menu.path });
    } else if (menu.action) {
      this[menu.action]();
    }
  },

  // 联系客服
  contactService() {
    wx.makePhoneCall({
      phoneNumber: '400-888-8888',
      fail: () => {
        wx.showToast({
          title: '客服电话：400-888-8888',
          icon: 'none',
          duration: 3000
        });
      }
    });
  },

  // 跳转到会员中心
  onMemberTap() {
    wx.navigateTo({
      url: '/pages/member/member'
    });
  },

  // 跳转到充值页面
  onRechargeTap() {
    wx.navigateTo({
      url: '/pages/recharge/recharge'
    });
  },

  // 获取用户信息
  onGetUserInfo() {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        app.globalData.userInfo = res.userInfo;
        this.setData({ userInfo: res.userInfo });
        wx.showToast({
          title: '授权成功',
          icon: 'success'
        });
      },
      fail: () => {
        wx.showToast({
          title: '授权失败',
          icon: 'none'
        });
      }
    });
  }
});

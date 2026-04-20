// pages/coupons/coupons.js
Page({
  data: {
    tabs: [
      { id: 'available', name: '待使用' },
      { id: 'used', name: '已使用' },
      { id: 'expired', name: '已过期' }
    ],
    currentTab: 'available',
    coupons: []
  },

  onLoad(options) {
    if (options.amount) {
      this.setData({ amount: options.amount });
    }
    this.loadCoupons();
  },

  loadCoupons() {
    const availableCoupons = [
      { id: 'c1', name: '新人专享券', type: 'cash', value: 10, minAmount: 50, validDays: 7, description: '新人首单专享' },
      { id: 'c2', name: '满减券', type: 'cash', value: 20, minAmount: 100, validDays: 30, description: '满100减20' },
      { id: 'c3', name: '生日券', type: 'discount', value: 8, minAmount: 0, validDays: 30, description: '生日当月可用' }
    ];

    const usedCoupons = [
      { id: 'c4', name: '限时折扣券', type: 'discount', value: 9, minAmount: 30, validDays: 7, status: 'used', statusText: '已使用' }
    ];

    const expiredCoupons = [
      { id: 'c5', name: '节日特惠券', type: 'cash', value: 15, minAmount: 80, validDays: 7, status: 'expired', statusText: '已过期' }
    ];

    const coupons = {
      available: availableCoupons,
      used: usedCoupons,
      expired: expiredCoupons
    };

    this.setData({ coupons: coupons[this.data.currentTab] || [] });
  },

  onTabChange(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ currentTab: tab });
    this.loadCoupons();
  },

  onReceiveCoupon(e) {
    const coupon = e.currentTarget.dataset.coupon;
    wx.showToast({
      title: '领取成功',
      icon: 'success'
    });
  },

  onUseCoupon(e) {
    const coupon = e.currentTarget.dataset.coupon;
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];
    if (prevPage) {
      prevPage.setData({
        selectedCoupon: coupon,
        couponDiscount: coupon.type === 'cash' ? coupon.value : 0
      });
    }
    wx.navigateBack();
  }
});

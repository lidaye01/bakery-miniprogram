// pages/order/order.js
const app = getApp();

Page({
  data: {
    // 门店信息
    storeInfo: {
      id: 's001',
      name: '周21烘焙（万象城店）',
      address: '杭州市拱墅区祥园路万象城B1层',
      phone: '0571-88888888',
      distance: '500m'
    },
    // 取餐方式
    orderTypes: [
      { id: 'self_pickup', name: '自取', icon: '🏪', desc: '免配送费' },
      { id: 'delivery', name: '外卖', icon: '🚴', desc: '骑手配送' },
      { id: 'express', name: '快递', icon: '📦', desc: '全国配送' }
    ],
    orderType: 'self_pickup',
    // 预约时间
    pickupTime: '',
    pickupTimeOptions: [
      { id: 'now', name: '立即制作' },
      { id: '30min', name: '30分钟后' },
      { id: '1hour', name: '1小时后' },
      { id: '2hour', name: '2小时后' }
    ],
    // 购物车商品
    cartItems: [],
    // 备注
    remark: '',
    // 积分抵扣
    usePoints: false,
    points: 680,
    pointsDiscount: 0,
    // 优惠券
    coupons: [],
    selectedCoupon: null,
    couponDiscount: 0,
    // 价格汇总
    totalAmount: 0,
    deliveryFee: 0,
    discountAmount: 0,
    payAmount: 0
  },

  onLoad(options) {
    this.loadOrderData();
  },

  // 加载订单数据
  loadOrderData() {
    const cart = app.getCart();
    if (cart.length === 0) {
      wx.showToast({
        title: '购物车是空的',
        icon: 'none'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
      return;
    }

    let totalAmount = 0;
    cart.forEach(item => {
      totalAmount += item.price * item.quantity;
    });

    this.setData({
      cartItems: cart,
      totalAmount: totalAmount.toFixed(2),
      deliveryFee: this.data.orderType === 'self_pickup' ? 0 : 5,
      payAmount: totalAmount.toFixed(2)
    });
  },

  // 切换取餐方式
  onOrderTypeChange(e) {
    const orderType = e.currentTarget.dataset.type;
    const deliveryFee = orderType === 'self_pickup' ? 0 : 5;
    const payAmount = parseFloat(this.data.totalAmount) + deliveryFee - this.data.pointsDiscount - this.data.couponDiscount;
    
    this.setData({
      orderType,
      deliveryFee,
      payAmount: payAmount.toFixed(2)
    });
  },

  // 选择预约时间
  onPickupTimeChange(e) {
    const index = e.detail.value;
    this.setData({
      pickupTime: this.data.pickupTimeOptions[index].id
    });
  },

  // 备注输入
  onRemarkInput(e) {
    this.setData({
      remark: e.detail.value
    });
  },

  // 切换积分抵扣
  onTogglePoints() {
    const usePoints = !this.data.usePoints;
    let pointsDiscount = 0;
    
    if (usePoints && this.data.points >= 100) {
      // 100积分抵扣1元
      pointsDiscount = Math.min(Math.floor(this.data.points / 100), parseFloat(this.data.totalAmount));
    }
    
    const payAmount = parseFloat(this.data.totalAmount) + this.data.deliveryFee - pointsDiscount - this.data.couponDiscount;
    
    this.setData({
      usePoints,
      pointsDiscount: pointsDiscount.toFixed(2),
      payAmount: payAmount.toFixed(2)
    });
  },

  // 选择优惠券
  onSelectCoupon() {
    wx.navigateTo({
      url: '/pages/coupons/coupons?amount=' + this.data.totalAmount
    });
  },

  // 提交订单
  onSubmitOrder() {
    if (this.data.cartItems.length === 0) {
      wx.showToast({
        title: '请选择商品',
        icon: 'none'
      });
      return;
    }

    wx.showLoading({ title: '提交中...' });

    // 模拟订单创建
    setTimeout(() => {
      wx.hideLoading();
      
      // 生成订单号
      const orderNo = 'ORD' + Date.now();
      
      // 跳转到支付页面
      wx.redirectTo({
        url: `/pages/order-detail/order-detail?orderId=${orderNo}&status=pending`
      });
      
      // 清空购物车
      app.clearCart();
      
      wx.showToast({
        title: '订单提交成功',
        icon: 'success'
      });
    }, 1000);
  }
});

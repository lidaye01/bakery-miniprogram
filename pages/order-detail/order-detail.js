// pages/order-detail/order-detail.js
const app = getApp();

Page({
  data: {
    // 订单ID
    orderId: '',
    // 订单详情
    orderDetail: {
      orderNo: '',
      status: '',
      statusText: '',
      storeName: '周21烘焙（万象城店）',
      storeAddress: '杭州市拱墅区祥园路万象城B1层',
      storePhone: '0571-88888888',
      orderType: 'self_pickup',
      orderTypeText: '到店自取',
      pickupTime: '立即制作',
      items: [],
      remark: '',
      totalAmount: 0,
      deliveryFee: 0,
      discountAmount: 0,
      payAmount: 0,
      createTime: '',
      payTime: ''
    },
    // 状态步骤
    statusSteps: [],
    // 可执行的操作
    actions: []
  },

  onLoad(options) {
    this.setData({ orderId: options.orderId || 'ord001' });
    this.loadOrderDetail();
  },

  // 加载订单详情
  loadOrderDetail() {
    // 模拟订单详情
    const mockDetail = {
      orderNo: 'ORD2024042010001',
      status: 'preparing',
      statusText: '制作中',
      storeName: '周21烘焙（万象城店）',
      storeAddress: '杭州市拱墅区祥园路万象城B1层',
      storePhone: '0571-88888888',
      orderType: 'self_pickup',
      orderTypeText: '到店自取',
      pickupTime: '立即制作',
      items: [
        { name: '经典可颂', emoji: '🥐', quantity: 2, price: 18, spec: '' },
        { name: '拿铁咖啡', emoji: '🥛', quantity: 1, price: 22, spec: '' }
      ],
      remark: '',
      totalAmount: 58.00,
      deliveryFee: 0,
      discountAmount: 0,
      payAmount: 58.00,
      createTime: '2024-04-20 10:30:25',
      payTime: '2024-04-20 10:30:45'
    };

    // 状态步骤
    const steps = [
      { text: '已下单', desc: '10:30', completed: true },
      { text: '已支付', desc: '10:30', completed: true },
      { text: '制作中', desc: '', completed: true, current: true },
      { text: '待取货', desc: '', completed: false },
      { text: '已完成', desc: '', completed: false }
    ];

    // 可执行操作
    const actions = [
      { type: 'cancel', text: '取消订单', show: mockDetail.status === 'pending' },
      { type: 'pay', text: '去支付', show: mockDetail.status === 'pending' },
      { type: 'remind', text: '提醒制作', show: mockDetail.status === 'preparing' },
      { type: 'confirm', text: '确认取货', show: mockDetail.status === 'ready' },
      { type: 'rate', text: '去评价', show: mockDetail.status === 'completed' }
    ].filter(a => a.show);

    this.setData({
      orderDetail: mockDetail,
      statusSteps: steps,
      actions: actions
    });
  },

  // 取消订单
  onCancelOrder() {
    wx.showModal({
      title: '提示',
      content: '确定要取消该订单吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '订单已取消',
            icon: 'success'
          });
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        }
      }
    });
  },

  // 去支付
  onPayOrder() {
    wx.showToast({
      title: '支付功能开发中',
      icon: 'none'
    });
  },

  // 确认取货
  onConfirmReceive() {
    wx.showModal({
      title: '提示',
      content: '确认已取到商品吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '取货成功',
            icon: 'success'
          });
          this.loadOrderDetail();
        }
      }
    });
  },

  // 提醒制作
  onRemindOrder() {
    wx.showToast({
      title: '已提醒门店',
      icon: 'success'
    });
  },

  // 评价订单
  onRateOrder() {
    wx.showToast({
      title: '评价功能开发中',
      icon: 'none'
    });
  },

  // 联系门店
  onContactStore() {
    wx.makePhoneCall({
      phoneNumber: this.data.orderDetail.storePhone,
      fail: () => {
        wx.showToast({
          title: '拨打电话失败',
          icon: 'none'
        });
      }
    });
  },

  // 复制订单号
  onCopyOrderNo() {
    wx.setClipboardData({
      data: this.data.orderDetail.orderNo,
      success: () => {
        wx.showToast({
          title: '已复制',
          icon: 'success'
        });
      }
    });
  },

  // 统一处理操作按钮点击
  onAction(e) {
    const type = e.currentTarget.dataset.type;
    const actionMap = {
      'cancel': 'onCancelOrder',
      'pay': 'onPayOrder',
      'remind': 'onRemindOrder',
      'confirm': 'onConfirmReceive',
      'rate': 'onRateOrder'
    };
    const methodName = actionMap[type];
    if (methodName && this[methodName]) {
      this[methodName]();
    }
  }
});

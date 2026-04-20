// pages/orders/orders.js
const { getOrderStatusText } = require('../../utils/format.js');

Page({
  data: {
    // Tab配置
    tabs: [
      { id: 'all', name: '全部' },
      { id: 'pending', name: '待支付' },
      { id: 'preparing', name: '制作中' },
      { id: 'ready', name: '待取货' },
      { id: 'completed', name: '已完成' }
    ],
    currentTab: 'all',
    // 订单列表
    orderList: [],
    // 分页
    page: 1,
    pageSize: 10,
    hasMore: true,
    loading: false
  },

  onLoad(options) {
    if (options.status) {
      this.setData({ currentTab: options.status });
    }
    this.loadOrders();
  },

  onShow() {
    this.loadOrders();
  },

  onPullDownRefresh() {
    this.setData({ page: 1, orderList: [] });
    this.loadOrders();
    wx.stopPullDownRefresh();
  },

  onReachBottom() {
    if (this.data.hasMore && !this.data.loading) {
      this.loadOrders(true);
    }
  },

  // 加载订单列表
  loadOrders(append = false) {
    if (this.data.loading) return;
    
    this.setData({ loading: true });
    
    // 模拟数据
    const mockOrders = [
      {
        id: 'ord001',
        orderNo: 'ORD2024042010001',
        storeName: '周21烘焙（万象城店）',
        status: 'preparing',
        statusText: '制作中',
        items: [
          { name: '经典可颂', emoji: '🥐', quantity: 2, price: 18 },
          { name: '拿铁咖啡', emoji: '🥛', quantity: 1, price: 22 }
        ],
        totalCount: 3,
        payAmount: 58.00,
        createTime: '2024-04-20 10:30',
        showActions: true
      },
      {
        id: 'ord002',
        orderNo: 'ORD2024041910002',
        storeName: '周21烘焙（万象城店）',
        status: 'ready',
        statusText: '待取货',
        items: [
          { name: '提拉米苏', emoji: '🍰', quantity: 1, price: 38 },
          { name: '鲜奶吐司', emoji: '🍞', quantity: 2, price: 12 }
        ],
        totalCount: 3,
        payAmount: 62.00,
        createTime: '2024-04-19 14:20',
        showActions: true
      },
      {
        id: 'ord003',
        orderNo: 'ORD2024041810003',
        storeName: '周21烘焙（万象城店）',
        status: 'completed',
        statusText: '已完成',
        items: [
          { name: '贝果面包', emoji: '🥯', quantity: 3, price: 15 }
        ],
        totalCount: 3,
        payAmount: 45.00,
        createTime: '2024-04-18 09:15',
        showActions: true
      },
      {
        id: 'ord004',
        orderNo: 'ORD2024042010004',
        storeName: '周21烘焙（万象城店）',
        status: 'pending',
        statusText: '待支付',
        items: [
          { name: '生日礼盒', emoji: '🎁', quantity: 1, price: 128 }
        ],
        totalCount: 1,
        payAmount: 128.00,
        createTime: '2024-04-20 16:45',
        showActions: true
      }
    ];

    let orders = mockOrders;
    if (this.data.currentTab !== 'all') {
      orders = mockOrders.filter(o => o.status === this.data.currentTab);
    }

    this.setData({
      orderList: append ? this.data.orderList.concat(orders) : orders,
      hasMore: false,
      loading: false
    });
  },

  // 切换Tab
  onTabChange(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      currentTab: tab,
      page: 1,
      orderList: []
    });
    this.loadOrders();
  },

  // 跳转到订单详情
  onOrderTap(e) {
    const order = e.currentTarget.dataset.order;
    wx.navigateTo({
      url: `/pages/order-detail/order-detail?orderId=${order.id}`
    });
  },

  // 取消订单
  onCancelOrder(e) {
    const order = e.currentTarget.dataset.order;
    wx.showModal({
      title: '提示',
      content: '确定要取消该订单吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '订单已取消',
            icon: 'success'
          });
          this.loadOrders();
        }
      }
    });
  },

  // 去支付
  onPayOrder(e) {
    const order = e.currentTarget.dataset.order;
    wx.showToast({
      title: '支付功能开发中',
      icon: 'none'
    });
  },

  // 确认取货
  onConfirmReceive(e) {
    const order = e.currentTarget.dataset.order;
    wx.showModal({
      title: '提示',
      content: '确认已取到商品吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '取货成功',
            icon: 'success'
          });
          this.loadOrders();
        }
      }
    });
  },

  // 提醒制作
  onRemindOrder(e) {
    const order = e.currentTarget.dataset.order;
    wx.showToast({
      title: '已提醒门店',
      icon: 'success'
    });
  },

  // 评价订单
  onRateOrder(e) {
    const order = e.currentTarget.dataset.order;
    wx.showToast({
      title: '评价功能开发中',
      icon: 'none'
    });
  }
});

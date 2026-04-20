// pages/cart/cart.js
const app = getApp();

Page({
  data: {
    // 购物车商品列表
    cartItems: [],
    // 总金额
    totalAmount: 0,
    // 是否全选
    selectedAll: false,
    // 已选商品数量
    selectedCount: 0,
    // 已选商品金额
    selectedAmount: 0
  },

  onLoad(options) {
    this.loadCartData();
  },

  onShow() {
    this.loadCartData();
  },

  // 加载购物车数据
  loadCartData() {
    const cart = app.getCart();
    let totalAmount = 0;
    cart.forEach(item => {
      totalAmount += item.price * item.quantity;
    });
    
    this.setData({
      cartItems: cart,
      totalAmount: totalAmount.toFixed(2),
      selectedAll: cart.length > 0,
      selectedCount: cart.reduce((sum, item) => sum + item.quantity, 0),
      selectedAmount: totalAmount.toFixed(2)
    });
  },

  // 选择/取消选择商品
  onSelectItem(e) {
    // 简化处理：全选逻辑
  },

  // 全选/取消全选
  onSelectAll() {
    const selectedAll = !this.data.selectedAll;
    this.setData({ selectedAll });
  },

  // 减少数量
  onReduce(e) {
    const index = e.currentTarget.dataset.index;
    const item = this.data.cartItems[index];
    if (item.quantity > 1) {
      app.updateCartQuantity(item.id, item.quantity - 1);
    } else {
      app.updateCartQuantity(item.id, 0);
    }
    this.loadCartData();
  },

  // 增加数量
  onIncrease(e) {
    const index = e.currentTarget.dataset.index;
    const item = this.data.cartItems[index];
    app.updateCartQuantity(item.id, item.quantity + 1);
    this.loadCartData();
  },

  // 删除商品
  onDeleteItem(e) {
    const index = e.currentTarget.dataset.index;
    const item = this.data.cartItems[index];
    wx.showModal({
      title: '提示',
      content: `确定要删除 ${item.name} 吗？`,
      success: (res) => {
        if (res.confirm) {
          app.updateCartQuantity(item.id, 0);
          this.loadCartData();
        }
      }
    });
  },

  // 清空购物车
  onClearCart() {
    wx.showModal({
      title: '提示',
      content: '确定要清空购物车吗？',
      success: (res) => {
        if (res.confirm) {
          app.clearCart();
          this.loadCartData();
        }
      }
    });
  },

  // 去结算
  onCheckout() {
    if (this.data.cartItems.length === 0) {
      wx.showToast({
        title: '购物车是空的',
        icon: 'none'
      });
      return;
    }
    
    wx.navigateTo({
      url: '/pages/order/order'
    });
  },

  // 继续点单
  onContinueOrder() {
    wx.switchTab({
      url: '/pages/menu/menu'
    });
  }
});

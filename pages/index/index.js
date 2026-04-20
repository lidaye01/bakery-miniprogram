// pages/index/index.js
const app = getApp();
const { mockLogin } = require('../../utils/auth.js');

Page({
  data: {
    // 搜索关键词
    searchKeyword: '',
    // Banner数据
    banners: [
      { id: 1, image: '/assets/images/banner1.png', title: '新品上市', subtitle: '烘焙本真味道 顶级原料' },
      { id: 2, image: '/assets/images/banner2.png', title: '会员专享', subtitle: '充值满100送20' },
      { id: 3, image: '/assets/images/banner3.png', title: '生日蛋糕', subtitle: '定制专属甜蜜' }
    ],
    // 分类数据
    categories: [
      { id: 'bread', name: '面包', icon: '🥖', color: '#D4883A' },
      { id: 'cake', name: '蛋糕', icon: '🎂', color: '#E56B6B' },
      { id: 'drink', name: '饮品', icon: '🥤', color: '#5D9C59' },
      { id: 'gift', name: '礼盒', icon: '🎁', color: '#9B59B6' }
    ],
    // 热门推荐商品
    hotProducts: [
      { id: 'p1', name: '经典可颂', price: 18, originalPrice: 22, image: '/assets/images/product1.png', tag: '爆款', emoji: '🥐' },
      { id: 'p2', name: '鲜奶吐司', price: 12, originalPrice: 15, image: '/assets/images/product2.png', emoji: '🍞' },
      { id: 'p3', name: '提拉米苏', price: 38, originalPrice: 48, image: '/assets/images/product3.png', tag: '新品', emoji: '🍰' },
      { id: 'p4', name: '贝果面包', price: 15, originalPrice: 18, image: '/assets/images/product4.png', emoji: '🥯' }
    ],
    // 新品上市商品
    newProducts: [
      { id: 'p5', name: '芋泥软包', price: 16, image: '/assets/images/product5.png', emoji: '🍞' },
      { id: 'p6', name: '抹茶红豆', price: 22, image: '/assets/images/product6.png', emoji: '🥐' },
      { id: 'p7', name: '巧克力泡芙', price: 25, image: '/assets/images/product7.png', emoji: '🍫' },
      { id: 'p8', name: '芒果慕斯', price: 42, image: '/assets/images/product8.png', emoji: '🥭' }
    ],
    // 购物车数量
    cartCount: 0
  },

  onLoad(options) {
    // 模拟登录（开发环境）
    if (!app.globalData.isLogin) {
      mockLogin();
    }
    
    this.loadData();
  },

  onShow() {
    // 更新购物车数量
    this.updateCartCount();
  },

  onPullDownRefresh() {
    this.loadData();
    wx.stopPullDownRefresh();
  },

  // 加载数据
  loadData() {
    // 模拟数据加载
    this.updateCartCount();
  },

  // 更新购物车数量
  updateCartCount() {
    const cart = app.getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    this.setData({ cartCount: count });
  },

  // 搜索
  onSearch() {
    wx.navigateTo({
      url: '/pages/menu/menu'
    });
  },

  // 点击分类
  onCategoryTap(e) {
    const category = e.currentTarget.dataset.category;
    wx.navigateTo({
      url: `/pages/menu/menu?category=${category.id}`
    });
  },

  // 点击商品
  onProductTap(e) {
    const product = e.currentTarget.dataset.product;
    wx.navigateTo({
      url: `/pages/product/product?id=${product.id}`
    });
  },

  // 加入购物车
  onAddCart(e) {
    const product = e.currentTarget.dataset.product;
    app.addToCart(product);
    this.updateCartCount();
    wx.showToast({
      title: '已加入购物车',
      icon: 'success',
      duration: 1500
    });
  },

  // 查看更多商品
  onViewMore(type) {
    wx.navigateTo({
      url: `/pages/menu/menu?type=${type}`
    });
  },

  // 跳转购物车
  onCartTap() {
    wx.navigateTo({
      url: '/pages/cart/cart'
    });
  },

  // 分享配置
  onShareAppMessage() {
    return {
      title: '周21烘焙 - 新鲜美味 品质生活',
      path: '/pages/index/index',
      imageUrl: '/assets/images/share.png'
    };
  }
});

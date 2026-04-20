// pages/menu/menu.js
const app = getApp();

Page({
  data: {
    // 分类列表
    categories: [
      { id: 'all', name: '全部' },
      { id: 'bread', name: '面包' },
      { id: 'cake', name: '蛋糕' },
      { id: 'drink', name: '饮品' },
      { id: 'gift', name: '礼盒' },
      { id: 'dessert', name: '甜点' }
    ],
    // 当前选中分类
    currentCategory: 'all',
    // 商品列表
    products: [
      { id: 'p1', name: '经典可颂', desc: '层层酥脆，黄油香浓', price: 18, originalPrice: 22, image: '/assets/images/product1.png', category: 'bread', emoji: '🥐', sales: 520 },
      { id: 'p2', name: '鲜奶吐司', desc: '细腻绵软，天然酵母', price: 12, originalPrice: 15, image: '/assets/images/product2.png', category: 'bread', emoji: '🍞', sales: 380 },
      { id: 'p3', name: '提拉米苏', desc: '经典意式，浓郁咖啡香', price: 38, originalPrice: 48, image: '/assets/images/product3.png', category: 'cake', emoji: '🍰', sales: 260 },
      { id: 'p4', name: '贝果面包', desc: '嚼劲十足，低卡健康', price: 15, originalPrice: 18, image: '/assets/images/product4.png', category: 'bread', emoji: '🥯', sales: 210 },
      { id: 'p5', name: '芋泥软包', desc: '香芋绵密，口感软糯', price: 16, image: '/assets/images/product5.png', category: 'bread', emoji: '🍞', sales: 180 },
      { id: 'p6', name: '抹茶红豆', desc: '日式风味，清新爽口', price: 22, image: '/assets/images/product6.png', category: 'dessert', emoji: '🍵', sales: 150 },
      { id: 'p7', name: '巧克力泡芙', desc: '酥脆外皮，浓郁内馅', price: 25, image: '/assets/images/product7.png', category: 'dessert', emoji: '🍫', sales: 140 },
      { id: 'p8', name: '芒果慕斯', desc: '热带风情，清爽甜蜜', price: 42, image: '/assets/images/product8.png', category: 'cake', emoji: '🥭', sales: 120 },
      { id: 'p9', name: '美式咖啡', desc: '现磨现煮，香醇回甘', price: 18, image: '/assets/images/drink1.png', category: 'drink', emoji: '☕', sales: 300 },
      { id: 'p10', name: '拿铁咖啡', desc: '丝滑拿铁，奶香浓郁', price: 22, image: '/assets/images/drink2.png', category: 'drink', emoji: '🥛', sales: 280 },
      { id: 'p11', name: '鲜榨橙汁', desc: '100%鲜榨，活力满满', price: 15, image: '/assets/images/drink3.png', category: 'drink', emoji: '🍊', sales: 220 },
      { id: 'p12', name: '生日礼盒', desc: '精美包装，送礼首选', price: 128, image: '/assets/images/gift1.png', category: 'gift', emoji: '🎁', sales: 50 }
    ],
    // 购物车
    cart: [],
    // 购物车总数量
    cartCount: 0,
    // 购物车总金额
    cartAmount: 0,
    // 是否显示购物车详情
    showCartDetail: false
  },

  onLoad(options) {
    // 如果有分类参数
    if (options.category) {
      this.setData({ currentCategory: options.category });
    }
    // 加载购物车
    this.loadCart();
  },

  onShow() {
    this.loadCart();
  },

  // 加载购物车
  loadCart() {
    const cart = app.getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const amount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    this.setData({
      cart,
      cartCount: count,
      cartAmount: amount.toFixed(2)
    });
  },

  // 切换分类
  onCategoryChange(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({ currentCategory: category });
  },

  // 获取当前分类的商品
  getFilteredProducts() {
    if (this.data.currentCategory === 'all') {
      return this.data.products;
    }
    return this.data.products.filter(p => p.category === this.data.currentCategory);
  },

  // 添加到购物车
  onAddToCart(e) {
    const product = e.currentTarget.dataset.product;
    app.addToCart(product);
    this.loadCart();
    wx.showToast({
      title: '已加入购物车',
      icon: 'success',
      duration: 1200
    });
  },

  // 显示购物车详情
  onShowCartDetail() {
    if (this.data.cartCount > 0) {
      this.setData({ showCartDetail: !this.data.showCartDetail });
    }
  },

  // 减少数量
  onReduce(e) {
    const product = e.currentTarget.dataset.product;
    const cart = app.getCart();
    const item = cart.find(i => i.id === product.id);
    if (item) {
      if (item.quantity > 1) {
        app.updateCartQuantity(product.id, item.quantity - 1);
      } else {
        app.updateCartQuantity(product.id, 0);
      }
      this.loadCart();
    }
  },

  // 增加数量
  onIncrease(e) {
    const product = e.currentTarget.dataset.product;
    const cart = app.getCart();
    const item = cart.find(i => i.id === product.id);
    if (item) {
      app.updateCartQuantity(product.id, item.quantity + 1);
    } else {
      app.addToCart(product);
    }
    this.loadCart();
  },

  // 清空购物车
  onClearCart() {
    wx.showModal({
      title: '提示',
      content: '确定要清空购物车吗？',
      success: (res) => {
        if (res.confirm) {
          app.clearCart();
          this.loadCart();
          this.setData({ showCartDetail: false });
        }
      }
    });
  },

  // 去结算
  onCheckout() {
    if (this.data.cartCount > 0) {
      wx.navigateTo({
        url: '/pages/cart/cart'
      });
    }
  }
});

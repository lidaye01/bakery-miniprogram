// pages/product/product.js
const app = getApp();

Page({
  data: {
    productId: '',
    // 商品详情
    product: {
      id: '',
      name: '',
      price: 0,
      originalPrice: 0,
      description: '',
      images: [],
      specifications: [],
      stock: 100,
      sales: 0,
      emoji: '🍞'
    },
    // 已选规格
    selectedSpec: '',
    // 数量
    quantity: 1,
    // 规格选项
    specOptions: [
      { id: 'default', name: '默认' },
      { id: 'mini', name: '迷你装' },
      { id: 'large', name: '大份装' }
    ],
    // 图片索引
    currentImageIndex: 0
  },

  onLoad(options) {
    const productId = options.id || 'p1';
    this.setData({ productId });
    this.loadProductDetail(productId);
  },

  // 加载商品详情
  loadProductDetail(id) {
    // 模拟商品详情
    const mockProduct = {
      id: id,
      name: '经典可颂',
      price: 18,
      originalPrice: 22,
      description: '层层酥脆，黄油香浓。精选法国进口AOP黄油，采用传统法式工艺制作，外酥内软，层次分明。',
      images: ['/assets/images/product1.png'],
      specifications: [
        { id: 'default', name: '默认', price: 18 },
        { id: 'mini', name: '迷你装', price: 12 },
        { id: 'large', name: '大份装', price: 28 }
      ],
      stock: 100,
      sales: 520,
      emoji: '🥐'
    };

    this.setData({
      product: mockProduct,
      selectedSpec: mockProduct.specifications[0].id
    });
  },

  // 选择规格
  onSelectSpec(e) {
    const specId = e.currentTarget.dataset.specId;
    const spec = this.data.product.specifications.find(s => s.id === specId);
    if (spec) {
      this.setData({
        selectedSpec: specId,
        'product.price': spec.price
      });
    }
  },

  // 减少数量
  onReduce() {
    if (this.data.quantity > 1) {
      this.setData({
        quantity: this.data.quantity - 1
      });
    }
  },

  // 增加数量
  onIncrease() {
    if (this.data.quantity < this.data.product.stock) {
      this.setData({
        quantity: this.data.quantity + 1
      });
    } else {
      wx.showToast({
        title: '库存不足',
        icon: 'none'
      });
    }
  },

  // 加入购物车
  onAddToCart() {
    const { product, quantity, selectedSpec } = this.data;
    const spec = product.specifications.find(s => s.id === selectedSpec);
    
    app.addToCart({
      id: product.id,
      name: product.name,
      price: spec ? spec.price : product.price,
      image: product.images[0],
      emoji: product.emoji
    }, quantity, spec ? spec.name : '');
    
    wx.showToast({
      title: '已加入购物车',
      icon: 'success'
    });
  },

  // 立即购买
  onBuyNow() {
    const { product, quantity, selectedSpec } = this.data;
    const spec = product.specifications.find(s => s.id === selectedSpec);
    
    // 先添加到购物车
    app.clearCart();
    app.addToCart({
      id: product.id,
      name: product.name,
      price: spec ? spec.price : product.price,
      image: product.images[0],
      emoji: product.emoji
    }, quantity, spec ? spec.name : '');
    
    // 跳转到订单确认页
    wx.navigateTo({
      url: '/pages/order/order'
    });
  }
});

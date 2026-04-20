// product-card/product-card.js
Component({
  properties: {
    // 商品数据
    product: {
      type: Object,
      value: {}
    },
    // 是否显示原价
    showOriginalPrice: {
      type: Boolean,
      value: true
    },
    // 是否显示加入购物车按钮
    showAddBtn: {
      type: Boolean,
      value: true
    },
    // 卡片宽度
    width: {
      type: String,
      value: '100%'
    }
  },

  methods: {
    // 点击商品
    onTap() {
      this.triggerEvent('tap', this.data.product);
    },

    // 加入购物车
    onAddCart(e) {
      e.stopPropagation();
      this.triggerEvent('addcart', this.data.product);
    }
  }
});

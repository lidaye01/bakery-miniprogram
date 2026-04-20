// cart-bar/cart-bar.js
Component({
  properties: {
    // 购物车商品数量
    count: {
      type: Number,
      value: 0
    },
    // 购物车总金额
    amount: {
      type: Number,
      value: 0
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    // 点击购物车
    onCartTap() {
      if (this.data.count > 0) {
        this.triggerEvent('carttap');
      }
    },

    // 点击结算
    onCheckout() {
      if (this.data.count > 0 && !this.data.disabled) {
        this.triggerEvent('checkout');
      }
    }
  }
});

// coupon-card/coupon-card.js
Component({
  properties: {
    // 优惠券数据
    coupon: {
      type: Object,
      value: {}
    },
    // 模式：receive-领取, use-使用, detail-详情
    mode: {
      type: String,
      value: 'detail'
    },
    // 是否可用
    available: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    // 领取优惠券
    onReceive() {
      this.triggerEvent('receive', this.data.coupon);
    },

    // 使用优惠券
    onUse() {
      this.triggerEvent('use', this.data.coupon);
    },

    // 点击优惠券
    onTap() {
      this.triggerEvent('tap', this.data.coupon);
    }
  }
});

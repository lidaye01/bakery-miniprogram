// order-card/order-card.js
Component({
  properties: {
    // 订单数据
    order: {
      type: Object,
      value: {}
    }
  },

  methods: {
    // 点击订单
    onTap() {
      this.triggerEvent('tap', this.data.order);
    },

    // 取消订单
    onCancel(e) {
      e.stopPropagation();
      this.triggerEvent('cancel', this.data.order);
    },

    // 去支付
    onPay(e) {
      e.stopPropagation();
      this.triggerEvent('pay', this.data.order);
    },

    // 确认收货
    onConfirm(e) {
      e.stopPropagation();
      this.triggerEvent('confirm', this.data.order);
    },

    // 评价订单
    onRate(e) {
      e.stopPropagation();
      this.triggerEvent('rate', this.data.order);
    },

    // 提醒制作
    onRemind(e) {
      e.stopPropagation();
      this.triggerEvent('remind', this.data.order);
    }
  }
});

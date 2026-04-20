// pages/recharge/recharge.js
Page({
  data: {
    // 充值金额选项
    amounts: [
      { value: 50, give: 5 },
      { value: 100, give: 20 },
      { value: 200, give: 50 },
      { value: 500, give: 150 }
    ],
    // 选中金额
    selectedAmount: 100,
    // 自定义金额
    customAmount: '',
    // 当前余额
    currentBalance: 128.50,
    // 实际到账金额
    actualAmount: 120
  },

  onLoad() {
    this.loadBalance();
    this.updateActualAmount();
  },

  loadBalance() {
    // 加载当前余额
  },

  // 选择金额
  onSelectAmount(e) {
    const amount = e.currentTarget.dataset.amount;
    this.setData({
      selectedAmount: amount.value,
      customAmount: ''
    });
    this.updateActualAmount();
  },

  // 自定义金额输入
  onCustomInput(e) {
    const value = e.detail.value;
    this.setData({
      customAmount: value,
      selectedAmount: 0
    });
    this.updateActualAmount();
  },

  // 计算赠送金额
  getGiveAmount() {
    if (this.data.selectedAmount > 0) {
      const option = this.data.amounts.find(a => a.value === this.data.selectedAmount);
      return option ? option.give : 0;
    } else if (this.data.customAmount > 0) {
      return Math.floor(this.data.customAmount / 50) * 5;
    }
    return 0;
  },

  // 更新实际到账金额
  updateActualAmount() {
    const amount = this.data.selectedAmount > 0 ? this.data.selectedAmount : (this.data.customAmount || 0);
    const actualAmount = parseFloat(amount) + this.getGiveAmount();
    this.setData({ actualAmount });
  },

  // 去支付
  onRecharge() {
    const amount = this.data.selectedAmount > 0 ? this.data.selectedAmount : this.data.customAmount;
    if (!amount || parseFloat(amount) <= 0) {
      wx.showToast({
        title: '请选择或输入充值金额',
        icon: 'none'
      });
      return;
    }

    wx.showToast({
      title: '充值功能开发中',
      icon: 'none'
    });
  }
});

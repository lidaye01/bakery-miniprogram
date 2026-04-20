// empty-state/empty-state.js
Component({
  properties: {
    // 图标
    icon: {
      type: String,
      value: '📦'
    },
    // 提示文字
    text: {
      type: String,
      value: '暂无数据'
    },
    // 按钮文字
    buttonText: {
      type: String,
      value: ''
    }
  },

  methods: {
    onButtonTap() {
      this.triggerEvent('buttonTap');
    }
  }
});

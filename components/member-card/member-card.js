// member-card/member-card.js
Component({
  properties: {
    // 会员数据
    member: {
      type: Object,
      value: {}
    },
    // 是否显示完整信息
    showFull: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    onTap() {
      this.triggerEvent('tap', this.data.member);
    }
  }
});

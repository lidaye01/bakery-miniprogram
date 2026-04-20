// pages/member/member.js
const app = getApp();

Page({
  data: {
    // 会员信息
    memberInfo: {
      level: 'gold',
      levelName: '黄金会员',
      levelIcon: '⭐',
      balance: 128.50,
      points: 680,
      couponCount: 3,
      stampCount: 5,
      growthValue: 680,
      nextLevelValue: 2000,
      nextLevelName: '钻石会员',
      progressPercent: 34
    },
    // 会员权益
    rights: [
      { icon: '🎁', name: '会员折扣', desc: '9折优惠' },
      { icon: '💰', name: '积分抵扣', desc: '2倍积分' },
      { icon: '🚀', name: '优先制作', desc: '免排队' },
      { icon: '📞', name: '专属客服', desc: '优先响应' }
    ],
    // 成长任务
    tasks: [
      { name: '每日签到', reward: '+10成长值', completed: true },
      { name: '消费满50元', reward: '+50成长值', completed: false },
      { name: '分享给好友', reward: '+20成长值', completed: false },
      { name: '评价订单', reward: '+15成长值', completed: false }
    ]
  },

  onLoad() {
    this.loadMemberInfo();
  },

  onShow() {
    this.loadMemberInfo();
  },

  loadMemberInfo() {
    // 加载会员信息
  },

  // 跳转充值
  onRecharge() {
    wx.navigateTo({
      url: '/pages/recharge/recharge'
    });
  },

  // 跳转优惠券
  onCoupons() {
    wx.navigateTo({
      url: '/pages/coupons/coupons'
    });
  },

  // 跳转集点卡
  onStamps() {
    wx.navigateTo({
      url: '/pages/stamps/stamps'
    });
  }
});

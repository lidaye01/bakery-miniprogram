// pages/addresses/addresses.js
Page({
  data: {
    addresses: [
      {
        id: 'addr001',
        name: '张三',
        phone: '138****8888',
        province: '浙江省',
        city: '杭州市',
        district: '拱墅区',
        detail: '祥园路万象城B座1201',
        isDefault: true
      },
      {
        id: 'addr002',
        name: '李四',
        phone: '139****6666',
        province: '浙江省',
        city: '杭州市',
        district: '西湖区',
        detail: '文三路xxx号',
        isDefault: false
      }
    ]
  },

  onLoad() {
    this.loadAddresses();
  },

  loadAddresses() {
    // 加载地址列表
  },

  // 添加地址
  onAddAddress() {
    wx.showToast({
      title: '添加地址功能开发中',
      icon: 'none'
    });
  },

  // 编辑地址
  onEditAddress(e) {
    const address = e.currentTarget.dataset.address;
    wx.showToast({
      title: '编辑地址功能开发中',
      icon: 'none'
    });
  },

  // 删除地址
  onDeleteAddress(e) {
    const address = e.currentTarget.dataset.address;
    wx.showModal({
      title: '提示',
      content: '确定要删除该地址吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
          this.loadAddresses();
        }
      }
    });
  },

  // 设为默认
  onSetDefault(e) {
    const address = e.currentTarget.dataset.address;
    wx.showToast({
      title: '已设为默认',
      icon: 'success'
    });
    this.loadAddresses();
  },

  // 选择地址
  onSelectAddress(e) {
    const address = e.currentTarget.dataset.address;
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];
    if (prevPage) {
      prevPage.setData({ selectedAddress: address });
    }
    wx.navigateBack();
  }
});

export const setStorage = (key, data, sync = false) => {
  if (sync) {
    uni['setStorageSync'](key, data)
  } else {
    uni['setStorage']({key, data})
  }
};

export const getStorage = (key, sync = true) => {
  if (sync) {
    return uni['getStorageSync'](key)
  } else {
    return uni['getStorage']({key})
  }
};

export const removeStorage = (key, sync) => {
  if (sync) {
    return uni['removeStorageSync'](key)
  } else {
    return uni['removeStorage']({key})
  }
};

export const clearStorage = (sync = false) => {
  if (sync) {
    uni.clearStorageSync();
  } else {
    uni.clearStorage();
  }
};
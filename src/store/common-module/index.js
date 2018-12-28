const SET_MENU_LEVEL_OBJECT = 'SET_MENU_LEVEL_OBJECT'

export default {
  namespaced: true,
  state: {
    menuLevelObject: null
  },
  getters: {
    getMenuLevelObject (state) {
      let mlo = state.menuLevelObject
      if (!mlo) {
        let jsonString = sessionStorage.getItem('menuLevelString')
        if (jsonString) {
          let mlo = JSON.parse(jsonString)
          state.menuLevelObject = mlo
        }
      }
      return state.menuLevelObject
    }
  },
  mutations: {
    [SET_MENU_LEVEL_OBJECT] (state, data) {
      state.menuLevelObject = data
      let menuLevelString = JSON.stringify(data)
      sessionStorage.setItem('menuLevelString', menuLevelString)
    }
  },
  actions: {
    actionMenuLevelObject ({
      commit
    }, data) {
      let menuLevelObject = {
        one: null,
        two: null
      }
      let urlOne = data.keyPath[0]
      let urlTwo = data.keyPath[1]
      let menuList = data.menuList
      // 第一层遍历集合，确定一级菜单名称
      menuList.forEach(elementOne => {
        if (urlOne === elementOne.menuUrl) {
          menuLevelObject.one = elementOne.menuName
          // 第二层遍历集合，确定二级菜单名称
          elementOne.children.forEach(elementTwo => {
            if (urlTwo === elementTwo.menuUrl) {
              menuLevelObject.two = elementTwo.menuName
              menuLevelObject.active = elementTwo
            }
          })
        }
      })
      // console.info(menuLevelObject)
      commit(SET_MENU_LEVEL_OBJECT, menuLevelObject)
    }
  }
}

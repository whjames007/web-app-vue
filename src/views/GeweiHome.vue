<template>
    <div id="GeweiHome">
        <el-container>
            <el-header>
                <el-row>
                    <el-col :span="7">
                        <div><a
                                href="http://www.gewei-wh.com/"
                                target="_blank>"
                            >
                                <img
                                    src="/static/gewei_logo.jpg"
                                    style="height:60px;"
                                /></a>
                        </div>
                    </el-col>
                    <el-col :span="13">
                        <el-menu
                            :default-active="defaultActive"
                            mode="horizontal"
                            @select="handleSelect"
                            text-color="#409EFF"
                            active-text-color="#67C23A"
                            router
                        >
                            <template v-for="menuItem in menuList">
                                <el-submenu
                                    :index="menuItem.menuUrl"
                                    :key="menuItem.menuId"
                                >
                                    <template slot="title">
                                        {{menuItem.menuName}}</template>
                                    <template v-for="subItem in menuItem.children">
                                        <el-menu-item
                                            :index="subItem.menuUrl"
                                            :key="subItem.menuId"
                                        >
                                            <i :class="subItem.menuIcon"></i>{{subItem.menuName}}
                                        </el-menu-item>
                                    </template>
                                </el-submenu>
                            </template>
                        </el-menu>
                    </el-col>
                    <el-col :span="2">
                        <div style="padding:24px 0px 0px 0px;text-align: center;">
                            <el-popover
                                placement="left"
                                width="280"
                                trigger="hover"
                            >
                                <div style="padding:10px 0px 0px 0px; background:#FFFFCC; border:1px solid #BEBEBE; border-radius:50px 50px 50px 50px;">
                                    <el-form
                                        ref="userInfo"
                                        label-width="120px"
                                        label-suffix="："
                                    >
                                        <el-row>
                                            <el-col>
                                                <el-form-item :label="$t('message.username')">
                                                    <el-tag>{{ userInfo.userAccount }}</el-tag>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col>
                                                <el-form-item :label="$t('message.userInfo.nickName')">
                                                    <el-tag>{{ userInfo.nickName }}</el-tag>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col>
                                                <el-form-item :label="$t('message.userInfo.roleName')">
                                                    <el-tag>{{ userInfo.roleName }}</el-tag>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col>
                                                <el-form-item :label="$t('message.userInfo.loginTime')">
                                                    <el-tag>{{ loginDateString }}</el-tag>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col>
                                                <el-form-item :label="$t('message.userInfo.currentTime')">
                                                    <el-tag type="success">{{ currentDateString }}</el-tag>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                    </el-form>
                                </div>
                                <el-tag
                                    size="medium"
                                    slot="reference"
                                    type="warning"
                                ><i class="ali-iot-icon-icon_zhanghao"></i>{{ userInfo.nickName}}</el-tag>
                            </el-popover>
                        </div>
                    </el-col>
                    <el-col :span="2">
                        <div style="padding:22px 0px 0px 0px;text-align: center;">
                            <el-button
                                type="danger"
                                size="mini"
                                icon="ali-iot-icon-icon_rukou"
                                plain
                                round
                                @click="methodQuit"
                            >{{$t('message.signOut')}}</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <router-view
                    :userInfo="userInfo"
                    :menuLevelObject="menuLevelObject"
                    :headers="headers"
                />
            </el-main>
            <el-footer class="home-footer-style">
                <el-row
                    type="flex"
                    justify="center"
                >
                    <el-col :span="19">
                        <div>
                            {{ $t('message.enterpriseCopyright') }}
                        </div>
                        <div>
                            {{ $t('message.enterpriseAddress') }}
                        </div>
                    </el-col>
                    <el-col :span="1"><img
                            :src="langInfo.flag"
                            style="width:32px;"
                        ></el-col>
                    <el-col :span="4">
                        <div style="padding: 0px 0px 40px 0px;">
                            <el-select
                                clearable
                                v-model="currentLanguage"
                                :placeholder="$t('message.selectCountry')"
                                @change="changeLanguage"
                            >
                                <el-option
                                    v-for="item in langList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                    <img
                                        :src="item.flag"
                                        style="width:24px;"
                                    ><span>{{ item.label }}</span>
                                </el-option>
                            </el-select>
                        </div>
                    </el-col>
                </el-row>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
import {formatDateTimeString} from '../utils/FormatDateTimeString.js'
export default {
  name: 'GeweiHome',
  data () {
    return {
      currentLanguage: null, // 当前选择的国家语言
      langList: this.commonConstants.langList, // 公共常量中的语言集合
      currentDateString: null,
      loginDateString: null,
      defaultActive: 'GeweiSummary',
      menuList: [],
      menuLevelObject: {}
    }
  },
  beforeCreate: function () {
    let log = `【主页面之beforeCreate函数】`
    let user = this.$store.getters['loginModule/getUserInfo']
    let langInfo = this.$store.getters['loginModule/getLocale']
    console.info(log + `【打印缓存中的用户信息】`)
    console.info(user)
    console.info(langInfo)
    if (user) {
      this.userInfo = user
      this.langInfo = langInfo
      this.$i18n.locale = langInfo.value
      this.headers = {headers: {'Authorization': this.userInfo.authorization}}
    } else {
      this.$router.push({name: 'Gewei401'})
    }
  },
  mounted: function () {
    let log = `【主页面之mounted函数】`
    let url = this.commonConstants.url.getMenuByUserId
    this.axios.post(url, this.userInfo, this.headers
    ).then((response) => {
      this.menuList = response.data.dataInfo.children
      console.info(log + `【打印后台获取的菜单列表数据】`)
      console.info(this.menuList)
    })
    this.menuLevelObject = this.$store.getters['commonModule/getMenuLevelObject']
    console.info(log + `【333】`)
    console.info(this.menuLevelObject)
    this.defaultActive = this.menuLevelObject.two
    this.loginDateString = formatDateTimeString(new Date(), 'DTS')
    setInterval(this.getCurrentDate, 1000)
    let accessurl = this.$store.getters['loginModule/getAccessPath']
    if (accessurl !== null && accessurl !== '') {
      this.$router.push({name: accessurl})
    }
  },
  methods: {
    changeLanguage () {
      let value = this.currentLanguage
      if (value) {
        console.info(`当前选择的语言：` + value)
        let obj = {
          lang: value,
          list: this.langList
        }
        this.$store.dispatch('loginModule/localeAction', obj)
        let langInfo = this.$store.getters['loginModule/getLocale']
        this.langInfo = langInfo
        this.$i18n.locale = value
      } else {
        console.info('未选择语言')
      }
      this.$router.go(0)
    },
    handleSelect: function (key, keyPath) {
      let data = {
        keyPath: keyPath,
        menuList: this.menuList
      }
      this.$store.dispatch('commonModule/actionMenuLevelObject', data)
      this.menuLevelObject = this.$store.getters['commonModule/getMenuLevelObject']
    },
    methodQuit () {
      this.$confirm('您好，你将要退出本系统吗？', '提示', {
        type: 'warning'
      }).then(() => {
        console.info(`good bye!`)
        this.$store.dispatch('loginModule/quitSystem')
        this.$router.replace({name: 'GeweiLogin'})
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '您已取消退出系统的操作！'
        })
      })
    },
    getCurrentDate () {
      this.currentDateString = formatDateTimeString(new Date(), 'DTS')
      // console.info(this.currentDateString)
    },
    setAccessPath (url) {
      this.$store.dispatch('loginModule/setAccessPath', url)
    }
  }
}
</script>

<style>
.home-footer-style {
  padding: 20px 0px 0px 20px;
  background: #E4E7ED;
  line-height: 20px;
  color:#909399;
}
/* 子页面主标题顶部样式 */
.home-subView-top-style {
  border-radius: 20px 20px 0px 0px;
  margin: 0px 21px 2px 0px;
  padding: 5px 0px 5px 20px;
  background: #409EFF;
}
/* 子页面主标题底部样式 */
.home-subView-foot-style {
  border-radius: 0px 0px 20px 20px;
  margin: 3px 21px 0px 0px;
  padding: 5px 10px 5px 20px;
  background: #409EFF;
}
/* 子页面主标题字体样式 */
.home-subView-font-style {
  font-size: 14px;
  color: #ffffff;
}
/* 子页面手风琴标题样式 */
.home-subView-collapseDiv {
  width: 100%;
  font-size: 16px;
  padding : 0px 40px 0px 20px;
  color: #ffffff;
  background: #409EFF;
}
/* 子页面查询条件DIV样式 */
.home-subView-condition-style {
  border: 2px solid #409EFF;
  background: #C0C4CC;
  margin: 3px 20px 0px 0px;
  padding: 20px 0px 0px 0px;
}
/* 子页面查询结果DIV样式 */
.home-subView-result-style {
  border: 2px solid #409EFF;
  margin: 3px 20px 0px 0px;
  padding: 0px 0px 0px 0px;
  text-align: center;
}
/* 子页面普通标题样式 */
.home-subView-normalTitleDiv {
  height: 28px;
  font-size: 14px;
  border-radius: 20px 20px 0 0;
  margin: 0px 0px 0px 0px;
  padding : 15px 10px 5px 20px;
  color: #cccccc;
  background: #67C23A;
}
.home-subView-container-header {
  padding : 13px 10px 7px 20px;
  color: #FFFFFF;
  background: #67C23A;
  border-radius: 20px 20px 0 0;
  border:1px solid #FFFFFF;
  text-align: center;
}
.home-subView-container-aside {
  background: #E0E0E0;
  border:1px solid #FFFFFF;
  text-align: center;
  line-height: 200px;
}
.home-subView-container-main {
  color: #FFFFFF;
  background: #FFD9EC;
  border:1px solid #FFFFFF;
}
.home-subView-container-footer {
  margin: 0px 0px 20px 0px;
  padding : 10px 10px 10px 10px;
  color: #FFFFFF;
  border-radius: 0 0 20px 20px;
  background: #67C23A;
  border:1px solid #FFFFFF;
  text-align: center;
}
.home-subView-red-star {
  color: #F56C6C;
}
</style>

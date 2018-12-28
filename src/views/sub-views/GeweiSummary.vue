<template>
  <div id="GeweiSummary">
    <el-row>
      <el-col :span="24">
        <div class="home-subView-top-style">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item><span class="home-subView-font-style"><i class="ali-iot-icon-ditu-dibiao"></i></span></el-breadcrumb-item>
            <el-breadcrumb-item><span class="home-subView-font-style">{{menuLevelObject.one}}</span></el-breadcrumb-item>
            <el-breadcrumb-item><span class="home-subView-font-style">{{menuLevelObject.two}}</span></el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div>
          <h3>&emsp;&emsp;武汉正维电子技术有限公司成立于2003年，是一家专注于射频技术、移动通信产品研发、生产、销售及服务的高新技术企业。产品包括移动通信功率放大器，射频拉远单元，TETRA专网设备，网络优化设备，物联网(IoT)解决方案，微功率，小功率无线通信自组网模块等设计，生产和销售服务等。
            公司获得ISO9001质量管理体系认证、ISO14001环境管理体系认证，2013年通过OHSAS18001职业健康安全体系和安全生产体系认证。2012年公司导入ERP(SAP)系统，2013年第三季度启动了基于IPD高效研发管理体系认证、2014年通过了CMMI3认证。
            公司自成立以来，正维人秉承“对事负责，心态平和；专业精神，成就他人；系统思维，团队运作”的管理理念，依靠为客户提供优质的产品和服务，为员工提供良好的工作和生活环境，为社会承担更多的企业责任．
          </h3><el-button type="success" @click="aaa">成功按钮</el-button>
          <h4>一．愿景：</h4>
          <p>迅捷跟进移动通讯领域最前沿科技，专注于射频技术和移动通信产品的研发、生产和服务，</p>
          <p>致力于射频、无线通信产品及解决方案的创新和产业化，为振兴民族通信工业做出贡献。</p>
          <h4>二．行为准则：</h4>
          <p>恒取正维，铸就诚信。</p>
          <h4>三．管理理念：</h4>
          <p>对事负责，心态平和；</p>
          <p>专业精神，成就他人；</p>
          <p>系统思维，团队运作。</p>
          <h4>四．质量方针</h4>
          <p>以顾客为中心、以规范为准则</p>
          <p>坚持持续改进、目标六西格玛</p>
          <h4>五．环境方针</h4>
          <p>遵纪守法、预防污染、维护人类可持续发展</p>
          <p>力兴新技术、新工艺、新材料、节能降耗</p>
          <p>全员参与、共建绿色家园、持续改进环境绩效</p>
          <h4>六．职业健康安全方针</h4>
          <p>预防为主、安全优先</p>
          <p>遵章守法、规范管理</p>
          <p>保障健康、持续改进</p>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="home-subView-foot-style">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item><span class="home-subView-font-style"><i class="ali-iot-icon-ditu-dibiao"></i></span></el-breadcrumb-item>
            <el-breadcrumb-item><span class="home-subView-font-style">{{menuLevelObject.one}}</span></el-breadcrumb-item>
            <el-breadcrumb-item><span class="home-subView-font-style">{{menuLevelObject.two}}</span></el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-col>
    </el-row>
 </div>
</template>

<script>
import {formatDateTimeString} from '../../utils/FormatDateTimeString.js'
export default {
  data () {
    return {
      menuLevelObject: {
        one: 'Home', // this.$t('message.menuInfo.show'),
        two: 'Summary' // this.$t('message.menuInfo.summary')
      }
    }
  },
  mounted () {
    let mlo = this.$store.getters['commonModule/getMenuLevelObject']
    if (mlo) {
      this.menuLevelObject = mlo
      console.info(mlo)
    } else {
    }
  },
  methods: {
    aaa () {
      let string = '2018-01-02 03:04:05'
      let a = formatDateTimeString(string, 'STD')
      console.info(a)
    }
  }
}
</script>

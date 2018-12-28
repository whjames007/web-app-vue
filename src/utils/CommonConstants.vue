<script>
const status = {success: 'SUCCESS', warning: 'WARNING', error: 'ERROR'}
const operation = {create: 'CREATE', delete: 'DELETE', update: 'UPDATE', retrieve: 'RETRIEVE', init: 'INIT'}
const langList = [{
  value: 'zh',
  label: 'China',
  flag: '/static/flagChina.png'
}, {
  value: 'en',
  label: 'English',
  flag: '/static/flagEnglish.png'
}, {
  value: 'jp',
  label: 'Japan',
  flag: '/static/flagJapan.png'
}]
// 后台的一系列接口
const auth = 'Authorization'
const urlWebapi = '/webapi'
const localdevapi = '/localdevapi'
const urlUserRouter = urlWebapi + '/userRouter'
const url = {
  aaa1: localdevapi,
  userLogin: urlUserRouter + '/userLogin',
  getMenuByUserId: urlUserRouter + '/getMenuByUserId',
  findRoleList: urlUserRouter + '/findRoleList',
  pageUserList: urlUserRouter + '/pageUserList',
  addUserInfo: urlUserRouter + '/addUserInfo',
  editUserInfo: urlUserRouter + '/editUserInfo',
  removeUserInfo: urlUserRouter + '/removeUserInfo'
}
// 方法
function aaa () {
  console.info(url)
}
export default {
  status,
  operation,
  langList,
  auth,
  aaa,
  url
}
</script>

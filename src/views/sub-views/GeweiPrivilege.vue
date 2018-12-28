<template>
    <div id="GeweiPrivilege">
      <el-row>
  <el-col :span="all"><div class="grid-content bg-unit-a">用户权限管理</div></el-col>
</el-row>
      <el-row>
  <el-col :span="all"><div class="grid-content bg-unit-b">查询条件</div></el-col>
</el-row>

<el-row>
  <el-col :span="four"><div class="parent"><div class="grid-content bg-unit-c">权限名称：</div></div></el-col>
  <el-col :span="four"><div class="parent"><div class="grid-content bg-unit-c"><el-input v-model="privilegeName" placeholder="请输入权限名称"></el-input></div></div></el-col>
  <el-col :span="four"><div class="parent"><div class="grid-content bg-unit-c"></div></div></el-col>
  <el-col :span="four"><div class="parent"><div class="grid-content bg-unit-c"></div></div>
</el-col>
  <el-col :span="four"><div class="parent"><div class="grid-content bg-unit-c">
    <el-button type="primary" icon="el-icon-search" @click="handleQuery">查询</el-button></div></div></el-col>
  <el-col :span="four"><div class="parent"><div class="grid-content bg-unit-c">
    <el-button type="warning" icon="el-icon-back" @click="handleReset">重置</el-button></div></div></el-col>
</el-row>

<el-row>
  <el-col :span="all"><div class="grid-content bg-unit-b">查询结果</div>
    <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleAdd" round>新增权限</el-button></el-col>
</el-row>
<el-dialog
  :title="dialogTitle"
  :visible.sync="centerDialogVisible"
  width="60%"
  center>
  <el-row>
    <el-col :span="6"><div class="parent"><div class="grid-content bg-unit-c"><span class="text_red">*</span>权限名称：</div></div></el-col>
    <el-col :span="6"><div class="parent"><div class="grid-content bg-unit-c">
      <el-input v-model="privilegeInfo.privilegeName" placeholder="请输入权限名称"></el-input></div></div></el-col>
  </el-row>
  <el-row>
    <el-col :span="6"><div class="parent"><div class="grid-content bg-unit-c">权限描述：</div></div></el-col>
    <el-col :span="6"><div class="parent"><div class="grid-content bg-unit-c">
      <el-input v-model="privilegeInfo.privilegeDesc" placeholder="请输入权限描述" type="textarea" ></el-input></div></div></el-col>
  </el-row>
  <el-row>
    <el-col :span="6"><div class="parent"><div class="grid-content bg-unit-c"><span><el-tag type="success">注意</el-tag><span class="text_red">*</span>为必填项。</span></div></div></el-col>
    <el-col :span="6"></el-col>
  </el-row>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" size="mini" @click="dialogForCommit">提交</el-button>
    <el-button type="primary" size="mini" @click="dialogForReset">重置</el-button>
    <el-button type="primary" size="mini" @click="dialogForClose">关闭</el-button>
  </span>
</el-dialog>
<el-dialog
  :title="dialogTitleMenu"
  :visible.sync="centerMenuDialogVisible"
  width="60%"
  center>
  <div>
    <el-tree
      ref="menutree"
      :props="defaultProps"
      :data="dataList"
      node-key="menuId"
      default-expand-all
      highlight-current
      show-checkbox
      check-strictly
      :default-checked-keys="checkedKeys"
      :check-change="checkChange"
      :node-click="nodeClick">
    </el-tree>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" size="mini" @click="dialogMenuForCommit">提交</el-button>
    <el-button type="primary" size="mini" @click="dialogMenuForClose">关闭</el-button>
  </span>
</el-dialog>
<div>
<el-table
      :data="tableData"
      height="380"
      stripe
      border
      highlight-current-row
      style="width: 100%">
      <el-table-column
        type="index"
        label="行号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="privilegeId"
        label="权限ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="privilegeName"
        label="权限名称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="privilegeDesc"
        label="权限描述">
      </el-table-column>
      <el-table-column
        prop="firstCreateDate"
        label="初次创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="lastUpdateDate"
        label="最后修改时间"
        width="260">
      </el-table-column>
      <el-table-column label="操作" width="350">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="success"
          icon="el-icon-edit"
          round
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="warning"
          icon="el-icon-warning"
          round
          @click="handleDisMenu(scope.$index, scope.row)">分配菜单</el-button>
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          round
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
</div>

<div class="block parent">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalRows">
    </el-pagination>
  </div>
    </div>
</template>

<script>

export default {
  name: 'GeweiUser',
  data () {
    return {
      baseurl: '',
      privilegeName: '',
      userInfo: {
        profile: null
      },
      privilegeInfo: {
        profile: null,
        privilegeId: null,
        privilegeName: null,
        privilegeDesc: null
      },
      privilegeList: [],
      all: 24,
      four: 4,
      value: '',
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      totalRows: 0,
      centerDialogVisible: false,
      dialogTitle: null,
      dialogTitleMenu: null,
      centerMenuDialogVisible: false,
      dataList: [],
      checkedKeys: [],
      chooseData: null,
      defaultProps: {
        children: 'children',
        isLeaf: 'isLeaf',
        label: 'menuName',
        id: 'menuId'
      },
      operType: 'add'
    }
  },
  mounted: function () {
    console.info(`用户信息页面之mounted`)
    let p = this.$store.getters['commonModule/getProfile']
    this.baseurl = this.$store.getters['urlModule/getUserRouter']
    this.userInfo.profile = p
    this.privilegeInfo.profile = p
    this.pageList(this.userInfo)
    /*     let token = this.userInfo.profile.accessToken
    this.axios.post('api/user/pageprivList', {}, {headers: {Authorization: 'Bearer ' + token}}).then((response) => {
      this.privilegeList = response.data.dataList
    }) */
  },
  methods: {
    pageList (param) {
      if (this.privilegeName != null) {
        param.privilegeName = this.privilegeName
      }
      param.profile.pageNum = this.currentPage
      param.profile.pageSize = this.pageSize
      let token = this.userInfo.profile.accessToken
      this.axios.post(this.baseurl + '/pagePrivList', param, {headers: {Authorization: 'Bearer ' + token}}).then((response) => {
        console.log(response.data)
        if (response.data != null && response.data.pageList != null) {
          let result = response.data.pageList
          result.list.forEach((item, index) => {
            let date1 = item.firstCreateDate
            item.firstCreateDate = date1
            let date2 = item.lastUpdateDate
            item.lastUpdateDate = date2
            item.itemIndex = (this.currentPage - 1) * this.pageSize + index + 1
          })
          this.totalRows = result.total
          this.tableData = result.list
        }
      })
    },
    checkChange (item, node, self) {
      if (node === true) {
        this.editItem = item.id
        this.$refs.privtree.setCheckedKeys([item.id])
      } else {
        if (this.editItem === item.id) {
          this.$refs.privtree.setCheckedKeys([item.id])
        }
      }
    },
    nodeClick (item, node, self) {
      this.editItem = item.id
      this.$refs.privtree.setCheckedKeys([item.id])
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.pageList(this.userInfo)
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.pageList(this.userInfo)
      console.log(`当前页: ${val}`)
    },
    handleAdd () {
      this.operType = 'add'
      this.privilegeInfo.profile = this.userInfo.profile
      this.privilegeName = ''
      this.dialogTitle = '新增权限信息'
      this.centerDialogVisible = true
    },
    handleReset () {
      this.privilegeName = ''
    },
    handleQuery () {
      this.pageList(this.userInfo)
    },
    dialogForCommit () {
      if (this.privilegeInfo.privilegeName === null || this.privilegeInfo.privilegeName === '') {
        this.$message({
          type: 'warning',
          message: '权限名称不能为空！'
        })
        return
      }
      this.centerDialogVisible = false
      let token = this.userInfo.profile.accessToken
      if (this.operType === 'add') {
        this.axios.post(this.baseurl + '/addPrivInfo', this.privilegeInfo, {headers: {Authorization: 'Bearer ' + token}}).then((response) => {
          console.log(response.data)
          if (response.status === 200) {
            if (response.data.dataInfo != null && response.data.dataInfo.privilegeId != null) {
              this.privilegeName = ''
              this.privilegeInfo = {}
              this.pageList(this.userInfo)
              this.$message({
                type: 'warning',
                message: '添加权限成功'
              })
            } else {
              this.$message({
                type: 'warning',
                message: '添加权限，系统错误'
              })
            }
          } else {
            this.$message({
              type: 'warning',
              message: '添加权限失败'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '添加权限失败'
          })
        })
      } else if (this.operType === 'edit') {
        this.privilegeInfo.firstCreateDate = new Date(this.privilegeInfo.firstCreateDate)
        if (this.privilegeInfo.lastUpdateDate !== '') {
          this.privilegeInfo.lastUpdateDate = new Date(this.privilegeInfo.lastUpdateDate)
        }
        this.axios.post(this.baseurl + '/updatePrivInfo', this.privilegeInfo, {headers: {Authorization: 'Bearer ' + token}}).then((response) => {
          console.log(response.data)
          if (response.status === 200) {
            if (response.data.dataInfo != null && response.data.dataInfo.privilegeId != null) {
              this.privilegeName = ''
              this.privilegeInfo = {}
              this.pageList(this.userInfo)
            } else {
              this.$message({
                type: 'warning',
                message: '编辑权限，系统错误'
              })
            }
          } else {
            this.$message({
              type: 'warning',
              message: '编辑权限失败'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '编辑权限失败'
          })
        })
      }
    },
    dialogForReset () {
      this.privilegeName = ''
      this.centerDialogVisible = false
      this.centerMenuDialogVisible = false
    },
    dialogForClose () {
      this.privilegeName = ''
      this.centerDialogVisible = false
      this.centerMenuDialogVisible = false
    },
    handleEdit (index, row) {
      this.dialogTitle = '编辑权限信息'
      this.privilegeInfo = row
      this.privilegeInfo.profile = this.userInfo.profile
      this.privilegeName = ''
      this.operType = 'edit'
      this.centerDialogVisible = true
      this.centerMenuDialogVisible = false
    },
    handleDisMenu (index, row) {
      this.dialogTitleMenu = '分配菜单信息'
      this.centerMenuDialogVisible = true
      this.centerDialogVisible = false
      this.chooseData = {}
      this.checkedKeys = []
      this.chooseData.row = row
      let token = this.userInfo.profile.accessToken
      this.axios.post(this.baseurl + '/getAllMenus', null, {headers: {Authorization: 'Bearer ' + token}}).then((response) => {
        console.log(response.data)
        if (response.data != null && response.data.dataList != null) {
          this.setDataList(response.data.dataList)
          this.getDefaultCheckedMenus(row.privilegeId)
        }
      })
    },
    setDataList (result) {
      this.dataList = result
    },
    getDefaultCheckedMenus (privilegeId) {
      let token = this.userInfo.profile.accessToken
      this.axios.post(this.baseurl + '/getPrivRelationMenuByPrivilegeId', {privilegeId: privilegeId}, {headers: {Authorization: 'Bearer ' + token}}).then((response) => {
        console.log(response.data)
        if (response.data != null && response.data.dataList != null) {
          let attr = []
          for (let item of response.data.dataList) {
            attr.push(item)
          }
          this.setCheckedResult(attr)
        }
      })
    },
    setCheckedResult (attr) {
      this.checkedKeys = attr
    },
    dialogMenuForCommit () {
      this.chooseData.items = this.$refs.menutree.getCheckedKeys()
      if (this.chooseData.items.length === 0) {
        this.$message({
          type: 'error',
          message: `您好，请选择一个菜单再提交！`
        })
        return
      }
      if (this.chooseData.items.length !== 1) {
        this.$message({
          type: 'error',
          message: `您好，一个权限只能分配一个菜单！`
        })
        return
      }
      this.$confirm(`您确定选定勾选的菜单吗？`, '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.saveChooseMenus()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '菜单分配错误，请刷新重试'
        })
      })
    },
    saveChooseMenus () {
      let token = this.userInfo.profile.accessToken
      this.chooseData.items = this.$refs.menutree.getCheckedKeys()
      this.chooseData.privilegeId = this.chooseData.row.privilegeId
      this.chooseData.userId = this.userInfo.profile.userId
      this.axios.post(this.baseurl + '/updatePrivRelationMenus', this.chooseData, {headers: {Authorization: 'Bearer ' + token}}).then((response) => {
        console.log(response.data)
        if (response.status === 200) {
          this.chooseData = {}
          if (response.data.dataInfo != null) {
            this.centerDialogVisible = false
            this.centerMenuDialogVisible = false
            this.pageList(this.userInfo)
            this.$message({
              type: 'warning',
              message: `您好，菜单分配成功！`
            })
          } else {
            this.$message({
              type: 'error',
              message: `您好，${response.data.msg}, 本次菜单分配失败！`
            })
          }
        } else {
          this.$message({
            type: 'error',
            message: '已取消分配菜单'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '菜单分配系统异常，请刷新重试'
        })
      })
    },
    dialogMenuForClose () {
      this.privilegeName = ''
      this.centerMenuDialogVisible = false
      this.centerDialogVisible = false
      this.chooseData = null
      this.checkedKeys = []
    },
    handleDelete (index, row) {
      this.centerMenuDialogVisible = false
      let privilegeName = row.privilegeName
      this.$confirm(`您确定将要删除${privilegeName}的权限吗？`, '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('test')
        this.operDelete(row)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    operDelete (row) {
      let token = this.userInfo.profile.accessToken
      let privilegeName = row.privilegeName
      this.privilegeInfo.privilegeId = row.privilegeId
      this.privilegeInfo.privilegeName = row.privilegeName
      this.privilegeInfo.privilegeDesc = row.privilegeDesc
      this.privilegeInfo.profile = this.userInfo.profile
      this.axios.post(this.baseurl + '/removePrivInfo', this.privilegeInfo, {headers: {Authorization: 'Bearer ' + token}}).then((response) => {
        console.log(response.data)
        if (response.status === 200) {
          if (response.data.dataInfo != null && response.data.dataInfo.privilegeId != null) {
            this.pageList(this.userInfo)
            this.$message({
              type: 'warning',
              message: `您好，${privilegeName}权限已删除成功！`
            })
          } else {
            this.$message({
              type: 'warning',
              message: '已取消删除'
            })
          }
        } else {
          this.$message({
            type: 'warning',
            message: '已取消删除'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '删除失败'
        })
      })
    }
  }
}
</script>

<style scoped>
.parent{
    display: flex;
    justify-content:center;
    align-items: center;
    height: 60px;
}
  .bg-unit-a {
    padding : 10px 0px 10px 10px;
    color: #ffffff;
    background: #409EFF;
  }
  .bg-unit-b {
    margin : 5px 0px 5px 0px;
    padding : 10px 0px 10px 10px;
    color: #ffffff;
    background: #909399;
  }
  .bg-unit-c {
    padding : 10px 0px 10px 10px;
  }
.text_red {
  color: #F56C6C
}
</style>

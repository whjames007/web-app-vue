<template>
    <div id="GeweiRole">
      <el-row>
  <el-col :span="all"><div class="grid-content bg-unit-a">用户角色管理</div></el-col>
</el-row>
      <el-row>
  <el-col :span="all"><div class="grid-content bg-unit-b">查询条件</div></el-col>
</el-row>

<el-row>
  <el-col :span="four"><div class="parent"><div class="grid-content bg-unit-c">角色名称：</div></div></el-col>
  <el-col :span="four"><div class="parent"><div class="grid-content bg-unit-c"><el-input v-model="roleName" placeholder="请输入角色名称"></el-input></div></div></el-col>
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
    <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleAdd" round>新增角色</el-button></el-col>
</el-row>
<el-dialog
  :title="dialogTitle"
  :visible.sync="centerDialogVisible"
  width="60%"
  center>
  <el-row>
    <el-col :span="6"><div class="parent"><div class="grid-content bg-unit-c"><span class="text_red">*</span>角色名称：</div></div></el-col>
    <el-col :span="6"><div class="parent"><div class="grid-content bg-unit-c">
      <el-input v-model="roleInfo.roleName" placeholder="请输入角色名称"></el-input></div></div></el-col>
  </el-row>
  <el-row>
    <el-col :span="6"><div class="parent"><div class="grid-content bg-unit-c">角色描述：</div></div></el-col>
    <el-col :span="6"><div class="parent"><div class="grid-content bg-unit-c">
      <el-input v-model="roleInfo.roleDesc" placeholder="请输入角色描述" type="textarea" ></el-input></div></div></el-col>
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
  :title="dialogTitlePriv"
  :visible.sync="centerPrivDialogVisible"
  width="60%"
  center>
  <div>
    <el-tree
      ref="privtree"
      :props="defaultProps"
      :data="dataList"
      node-key="privilegeId"
      show-checkbox
      :check-strictly="true"
      default-expand-all
      highlight-current
      :default-checked-keys="checkedKeys"
      check-change=""
      >
    </el-tree>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" size="mini" @click="dialogPrivForCommit">提交</el-button>
    <el-button type="primary" size="mini" @click="dialogPrivForClose">关闭</el-button>
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
        prop="roleId"
        label="角色ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述">
      </el-table-column>
      <el-table-column
        prop="firstCreateDate"
        label="初次创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="lastUpdateDate"
        label="最后修改时间"
        width="180">
      </el-table-column>
      <el-table-column label="操作" width="220">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="success"
          icon="el-icon-edit"
          round
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
<!--         <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          round
          @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
         <el-button
          size="mini"
          type="warning"
          icon="el-icon-check"
          round
          @click="handleDisPriv(scope.$index, scope.row)">权限分配</el-button>
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
      roleName: '',
      userInfo: {
        profile: null
      },
      roleInfo: {
        profile: null,
        roleId: null,
        roleName: null,
        roleDesc: null
      },
      defaultProps: {
        children: null,
        label: 'privilegeName',
        id: 'privilegeId'
      },
      roleList: [],
      privlegeList: [],
      all: 24,
      four: 4,
      value: '',
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      totalRows: 0,
      centerDialogVisible: false,
      dialogTitle: null,
      dialogTitlePriv: null,
      centerPrivDialogVisible: false,
      dataList: [],
      chooseData: {},
      checkedKeys: [],
      editItem: null,
      operType: 'add'
    }
  },
  mounted: function () {
    console.info(`用户信息页面之mounted`)
    let p = this.$store.getters['commonModule/getProfile']
    this.baseurl = this.$store.getters['urlModule/getUserRouter']
    this.userInfo.profile = p
    this.roleInfo.profile = p
    this.pageList(this.userInfo)
    /*     let token = this.userInfo.profile.accessToken
    this.axios.post('api/user/pageRoleList', {}, {headers: {Authorization: 'Bearer ' + token}}).then((response) => {
      this.roleList = response.data.dataList
    }) */
  },
  methods: {
    pageList (param) {
      if (this.roleName != null) {
        param.roleName = this.roleName
      }
      this.centerDialogVisible = false
      this.centerPrivDialogVisible = false
      param.profile.pageNum = this.currentPage
      param.profile.pageSize = this.pageSize
      let token = this.userInfo.profile.accessToken
      this.axios.post(this.baseurl + '/pageRoleList', param, {headers: {Authorization: 'Bearer ' + token}}).then((response) => {
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
    handleSizeChange (val) {
      this.pageSize = val
      this.pageList(this.userInfo)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.pageList(this.userInfo)
    },
    handleAdd () {
      this.operType = 'add'
      this.roleInfo.profile = this.userInfo.profile
      this.roleName = ''
      this.dialogTitle = '新增角色信息'
      this.centerDialogVisible = true
      this.centerPrivDialogVisible = false
    },
    handleReset () {
      this.roleName = ''
    },
    handleQuery () {
      this.pageList(this.userInfo)
    },
    dialogForCommit () {
      if (this.roleInfo.roleName === null || this.roleInfo.roleName === '') {
        this.$message({
          type: 'warning',
          message: '角色名称不能为空！'
        })
        return
      }
      this.centerDialogVisible = false
      this.centerPrivDialogVisible = false
      let token = this.userInfo.profile.accessToken
      if (this.operType === 'add') {
        this.axios.post(this.baseurl + '/addRoleInfo', this.roleInfo, {headers: {Authorization: 'Bearer ' + token}}).then((response) => {
          console.log(response.data)
          if (response.status === 200) {
            if (response.data.dataInfo != null && response.data.dataInfo.roleId != null) {
              this.roleName = ''
              this.roleInfo = {}
              this.pageList(this.userInfo)
              this.$message({
                type: 'warning',
                message: '添加角色成功'
              })
            } else {
              this.$message({
                type: 'warning',
                message: '添加角色，系统错误'
              })
            }
          } else {
            this.$message({
              type: 'warning',
              message: '添加角色失败'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '添加角色失败'
          })
        })
      } else if (this.operType === 'edit') {
        this.roleInfo.firstCreateDate = new Date(this.roleInfo.firstCreateDate)
        if (this.roleInfo.lastUpdateDate !== '') {
          this.roleInfo.lastUpdateDate = new Date(this.roleInfo.lastUpdateDate)
        }
        this.axios.post(this.baseurl + '/updateRoleInfo', this.roleInfo, {headers: {Authorization: 'Bearer ' + token}}).then((response) => {
          console.log(response.data)
          if (response.status === 200) {
            if (response.data.dataInfo != null && response.data.dataInfo.roleId != null) {
              this.roleName = ''
              this.roleInfo = {}
              this.pageList(this.userInfo)
            } else {
              this.$message({
                type: 'warning',
                message: '编辑角色，系统错误'
              })
            }
          } else {
            this.$message({
              type: 'warning',
              message: '编辑角色失败'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '编辑角色失败'
          })
        })
      }
    },
    dialogForReset () {
      this.roleName = ''
      this.centerDialogVisible = false
      this.centerPrivDialogVisible = false
    },
    dialogForClose () {
      this.roleName = ''
      this.centerDialogVisible = false
      this.centerPrivDialogVisible = false
    },
    handleEdit (index, row) {
      this.dialogTitle = '编辑角色信息'
      this.roleInfo = row
      this.roleInfo.profile = this.userInfo.profile
      this.roleName = ''
      this.operType = 'edit'
      this.centerDialogVisible = true
      this.centerPrivDialogVisible = false
    },
    handleDelete (index, row) {
      this.centerPrivDialogVisible = false
      let roleName = row.roleName
      this.$confirm(`您确定将要删除${roleName}的角色吗？`, '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
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
      let roleName = row.roleName
      this.roleInfo.roleId = row.roleId
      this.roleInfo.roleName = row.roleName
      this.roleInfo.roleDesc = row.roleDesc
      this.roleInfo.profile = this.userInfo.profile
      this.axios.post(this.baseurl + '/removeRoleInfo', this.roleInfo, {headers: {Authorization: 'Bearer ' + token}}).then((response) => {
        if (response.status === 200) {
          if (response.data.dataInfo != null && response.data.dataInfo.roleId != null) {
            this.pageList(this.userInfo)
            this.$message({
              type: 'warning',
              message: `您好，${roleName}角色已删除成功！`
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
    },
    handleDisPriv (index, row) {
      this.chooseData = {}
      this.checkedKeys = []
      let token = this.userInfo.profile.accessToken
      this.centerDialogVisible = false
      this.chooseData.row = row
      this.dialogTitlePriv = '请选择角色关联的权限'
      this.axios.post(this.baseurl + '/getAllPrivilege', this.userInfo, {headers: {Authorization: 'Bearer ' + token}}).then((response) => {
        console.log(response.data)
        if (response.data != null && response.data.dataList != null) {
          this.setDataList(response.data.dataList)
          this.getDefaultCheckedPrivs(row.roleId)
        }
      })
      this.centerPrivDialogVisible = true
    },
    setDataList (dataList) {
      this.dataList = dataList
    },
    getDefaultCheckedPrivs (roleId) {
      let token = this.userInfo.profile.accessToken
      this.axios.post(this.baseurl + '/getRoleRelationPrivByRoleId', {roleId: roleId}, {headers: {Authorization: 'Bearer ' + token}}).then((response) => {
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
    dialogPrivForClose () {
      this.roleName = ''
      this.centerDialogVisible = false
      this.centerPrivDialogVisible = false
      this.chooseData = {}
    },
    dialogPrivForCommit () {
      this.$confirm(`您确定选定勾选的权限吗？`, '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('test')
        this.saveChoosePriv()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '权限分配错误，请刷新重试'
        })
      })
    },
    saveChoosePriv () {
      let token = this.userInfo.profile.accessToken
      this.chooseData.items = this.$refs.privtree.getCheckedKeys()
      this.chooseData.roleId = this.chooseData.row.roleId
      this.chooseData.userId = this.userInfo.profile.userId
      this.axios.post(this.baseurl + '/updateRoleRelationPrivs', this.chooseData, {headers: {Authorization: 'Bearer ' + token}}).then((response) => {
        console.log(response.data)
        if (response.status === 200) {
          this.chooseData = {}
          if (response.data.dataInfo != null) {
            this.centerDialogVisible = false
            this.centerPrivDialogVisible = false
            this.pageList(this.userInfo)
            this.$message({
              type: 'warning',
              message: `您好，权限分配成功！`
            })
          } else {
            this.$message({
              type: 'warning',
              message: '获取权限信息失败，请刷新重试'
            })
          }
        } else {
          this.$message({
            type: 'warning',
            message: '已取消分配权限'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '权限分配错误，请刷新重试'
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

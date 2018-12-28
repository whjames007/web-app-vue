<template>
    <div id="GeweiMenu">
      <el-row>
  <el-col :span="all"><div class="grid-content bg-unit-a">用户菜单管理</div></el-col>
</el-row>
      <el-row>
  <el-col :span="all"><div class="grid-content bg-unit-b">查询条件</div></el-col>
</el-row>

<el-row>
  <el-col :span="four"><div class="parent"><div class="grid-content bg-unit-c">菜单名称：</div></div></el-col>
  <el-col :span="four"><div class="parent"><div class="grid-content bg-unit-c"><el-input v-model="menuName" placeholder="请输入菜单名称"></el-input></div></div></el-col>
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
    <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleAdd" round>新增菜单</el-button></el-col>
</el-row>
<el-dialog
  :title="dialogTitle"
  :visible.sync="centerDialogVisible"
  width="60%"
  center>
  <el-row>
    <el-col :span="6"><div class="parent"><div class="grid-content bg-unit-c"><span class="text_red">*</span>菜单名称：</div></div></el-col>
    <el-col :span="6"><div class="parent"><div class="grid-content bg-unit-c">
      <el-input v-model="menuInfo.menuName" placeholder="请输入菜单名称"></el-input></div></div></el-col>
  </el-row>
  <el-row>
    <el-col :span="6"><div class="parent"><div class="grid-content bg-unit-c">菜单图标：</div></div></el-col>
    <el-col :span="6"><div class="parent"><div class="grid-content bg-unit-c">
      <el-input v-model="menuInfo.menuIcon" placeholder="请输入菜单图标" ></el-input></div></div></el-col>
  </el-row>
  <el-row>
    <el-col :span="6"><div class="parent"><div class="grid-content bg-unit-c"><span class="text_red">*</span>菜单地址：</div></div></el-col>
    <el-col :span="6"><div class="parent"><div class="grid-content bg-unit-c">
      <el-input v-model="menuInfo.menuUrl" placeholder="请输入菜单地址" ></el-input></div></div></el-col>
  </el-row>
  <el-row>
    <el-col :span="6"><div class="parent"><div class="grid-content bg-unit-c"><span class="text_red">*</span>菜单父节点：</div></div></el-col>
    <el-col :span="6"><div class="parent"><div class="grid-content bg-unit-c">
      <el-select
      v-model="menuInfo.parentId"
      placeholder="请选择父节点">
      <el-option v-for="item in options"
      :key="item.menuId"
      :label="item.menuName"
      :value="item.menuId">
      </el-option>
      </el-select></div></div></el-col>
  </el-row>
  <el-row>
    <el-col :span="6"><div class="parent"><div class="grid-content bg-unit-c">是否子菜单：</div></div></el-col>
    <el-col :span="6"><div class="parent"><div class="grid-content bg-unit-c">
      <el-radio-group v-model="menuInfo.menuType">
        <el-radio label="BRANCH">否</el-radio>
        <el-radio label="LEAF">是</el-radio>
      </el-radio-group>
      </div>
      </div>
      </el-col>
  </el-row>
  <el-row>
    <el-col :span="6"><div class="parent"><div class="grid-content bg-unit-c">菜单描述：</div></div></el-col>
    <el-col :span="6"><div class="parent"><div class="grid-content bg-unit-c">
      <el-input v-model="menuInfo.menuDesc" placeholder="请输入菜单描述" type="textarea" ></el-input></div></div></el-col>
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
        prop="menuId"
        label="菜单ID"
        width="80">
      </el-table-column>
      <el-table-column
        prop="menuName"
        label="菜单名称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="menuIcon"
        label="菜单图标"
        width="120">
      </el-table-column>
      <el-table-column
        prop="menuUrl"
        label="菜单地址"
        width="300">
      </el-table-column>
      <el-table-column
        prop="menuDesc"
        label="菜单描述">
      </el-table-column>
      <el-table-column
        prop="menuType"
        label="菜单类型"
        width="80">
      </el-table-column>
      <el-table-column
        prop="parentId"
        label="父节点ID"
        width="80">
      </el-table-column>
      <el-table-column
        prop="firstCreateDate"
        label="初次创建时间"
        width="160">
      </el-table-column>
      <el-table-column
        prop="lastUpdateDate"
        label="最后修改时间"
        width="160">
      </el-table-column>
      <el-table-column label="操作" width="200">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="success"
          icon="el-icon-edit"
          round
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
      menuName: '',
      userInfo: {
        profile: null
      },
      menuInfo: {
        profile: null,
        menuId: null,
        menuName: null,
        menuIcon: null,
        menuUrl: null,
        parentId: null,
        menuType: 'LEAF',
        menuDesc: null
      },
      options: [],
      menuList: [],
      all: 24,
      four: 4,
      value: '',
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      totalRows: 0,
      centerDialogVisible: false,
      dialogTitle: null,
      operType: 'add'
    }
  },
  mounted: function () {
    console.info(`用户信息页面之mounted`)
    let p = this.$store.getters['commonModule/getProfile']
    this.baseurl = this.$store.getters['urlModule/getUserRouter']
    this.userInfo.profile = p
    this.menuInfo.profile = p
    this.pageList(this.menuInfo)
    /*     let token = this.userInfo.profile.accessToken
    this.axios.post('api/user/pageprivList', {}, {headers: {Authorization: 'Bearer ' + token}}).then((response) => {
      this.privilegeList = response.data.dataList
    }) */
  },
  methods: {
    pageList (param) {
      if (this.menuName != null) {
        param.menuName = this.menuName
      }
      param.profile.pageNum = this.currentPage
      param.profile.pageSize = this.pageSize
      let token = this.userInfo.profile.accessToken
      this.axios.post(this.baseurl + '/pageMenuInfoList', param, {headers: {Authorization: 'Bearer ' + token}}).then((response) => {
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
    getAllParentMenu () {
      this.options = []
      let token = this.userInfo.profile.accessToken
      this.axios.post(this.baseurl + '/getAllParentMenu', null, {headers: {Authorization: 'Bearer ' + token}}).then((response) => {
        console.log(response.data)
        if (response.data != null && response.data.dataList != null) {
          this.options = response.data.dataList
        }
      })
    },
    setOptionItem (item, index) {
      this.options[index].menuId = item.menuId
      this.options[index].menuName = item.menuName
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
      this.menuInfo = {}
      this.menuInfo.profile = this.userInfo.profile
      this.menuName = ''
      this.dialogTitle = '新增菜单信息'
      this.centerDialogVisible = true
      this.getAllParentMenu()
    },
    handleReset () {
      this.privilegeName = ''
    },
    handleQuery () {
      this.pageList(this.userInfo)
    },
    dialogForCommit () {
      if (this.menuInfo.menuName === null || this.menuInfo.menuName === '') {
        this.$message({
          type: 'warning',
          message: '菜单名称不能为空！'
        })
        return
      }
      if (this.menuInfo.menuUrl === null || this.menuInfo.menuUrl === '') {
        this.$message({
          type: 'warning',
          message: '菜单地址不能为空！'
        })
        return
      }
      this.centerDialogVisible = false
      let token = this.userInfo.profile.accessToken
      if (this.operType === 'add') {
        this.axios.post(this.baseurl + '/addMenuInfo', this.menuInfo, {headers: {Authorization: 'Bearer ' + token}}).then((response) => {
          console.log(response.data)
          if (response.status === 200) {
            if (response.data.dataInfo != null && response.data.dataInfo.menuId != null) {
              this.menuName = ''
              this.menuInfo = {}
              this.pageList(this.userInfo)
              this.$message({
                type: 'warning',
                message: '添加菜单成功'
              })
            } else {
              this.$message({
                type: 'warning',
                message: '添加菜单，系统错误'
              })
            }
          } else {
            this.$message({
              type: 'warning',
              message: '添加菜单失败'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '添加菜单失败'
          })
        })
      } else if (this.operType === 'edit') {
        this.menuInfo.firstCreateDate = new Date(this.menuInfo.firstCreateDate)
        if (this.menuInfo.lastUpdateDate !== '') {
          this.menuInfo.lastUpdateDate = new Date(this.menuInfo.lastUpdateDate)
        }
        this.axios.post(this.baseurl + '/editMenuInfo', this.menuInfo, {headers: {Authorization: 'Bearer ' + token}}).then((response) => {
          console.log(response.data)
          if (response.status === 200) {
            if (response.data.dataInfo != null && response.data.dataInfo.menuId != null) {
              this.menuName = ''
              this.menuInfo = {}
              this.pageList(this.userInfo)
              this.$message({
                type: 'warning',
                message: '编辑菜单成功'
              })
            } else {
              this.$message({
                type: 'warning',
                message: '编辑菜单，系统错误'
              })
            }
          } else {
            this.$message({
              type: 'warning',
              message: '编辑菜单失败'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '编辑菜单失败'
          })
        })
      }
    },
    dialogForReset () {
      this.menuName = ''
      this.centerDialogVisible = false
    },
    dialogForClose () {
      this.menuName = ''
      this.centerDialogVisible = false
    },
    handleEdit (index, row) {
      this.dialogTitle = '编辑菜单信息'
      this.menuInfo = row
      this.menuInfo.profile = this.userInfo.profile
      this.menuName = ''
      this.operType = 'edit'
      this.centerDialogVisible = true
      this.getAllParentMenu()
    },
    handleDelete (index, row) {
      console.log(index, row)
      let menuName = row.menuName
      this.$confirm(`您确定将要删除${menuName}的菜单吗？`, '系统提示', {
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
      let menuName = row.menuName
      this.menuInfo.menuId = row.menuId
      this.menuInfo.menuName = row.menuName
      this.menuInfo.menuIcon = row.menuIcon
      this.menuInfo.menuUrl = row.menuUrl
      this.menuInfo.menuDesc = row.menuDesc
      this.menuInfo.profile = this.userInfo.profile
      this.axios.post(this.baseurl + '/removeMenuInfo', this.menuInfo, {headers: {Authorization: 'Bearer ' + token}}).then((response) => {
        console.log(response.data)
        if (response.status === 200) {
          if (response.data.dataInfo != null && response.data.dataInfo.menuId != null) {
            this.pageList(this.userInfo)
            this.$message({
              type: 'warning',
              message: `您好，${menuName}菜单已删除成功！`
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

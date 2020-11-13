<template>
  <div class="app-container">
      <el-card style="margin-top:10px;font-size:14px;line-height:30px;margin-bottom:15px;">
          <el-row style="font-weight:800;">
              操作提示：
          </el-row>
          <el-row>
              1、系统管理员角色设置。
          </el-row>
          <el-row>
              2、可添加各种角色、给指定角色赋予某些功能权限。
          </el-row>
      </el-card>
      <el-row>
      <el-button type="primary" @click="handleCreateRole">创建</el-button>
    </el-row>
    <el-card style="margin-top:10px">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%;min-height:300px;margin-bottom:20px;"
      >
        <el-table-column label="角色名">
          <template slot-scope="scope">{{ scope.row.roleName }}</template>
        </el-table-column>
        <el-table-column prop="roleRemark" label="备注" />
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form ref="form" label-position="top" :model="form" label-width="80px" status-icon>
        <el-form-item label="角色名">
          <el-input v-model="form.roleName"/>
        </el-form-item>
        <el-form-item label="角色备注">
          <el-input v-model="form.roleRemark"/>
        </el-form-item>
        <el-form-item label="角色权限">
            <template>
                <el-transfer 
                v-model="aclActionValue" 
                :data="aclActionData" 
                :titles="['全部权限组', '拥有权限组']"
                ></el-transfer>
            </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handPostData()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title=""
      :visible.sync="dialogVisibleCreateRole"
      width="50%"
    >
      <el-form ref="form" label-position="top" :model="form" label-width="80px" status-icon>
        <el-form-item label="角色名">
          <el-input v-model="form.roleName"/>
        </el-form-item>
        <el-form-item label="角色备注">
          <el-input v-model="form.roleRemark"/>
        </el-form-item>
        <el-form-item label="角色权限">
            <template>
                <el-transfer 
                v-model="aclActionValue" 
                :data="aclActionData" 
                :titles="['全部权限组', '拥有权限组']"
                ></el-transfer>
            </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleCreateRole = false">取 消</el-button>
        <el-button type="primary" @click="handPostDataCreateRole()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
        title="提示"
        :visible.sync="dialogVisibleConfirmDelete"
        width="30%">
        <span>确定删除该角色：{{prepareDeleteRoleName}}</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleConfirmDelete = false">取 消</el-button>
        <el-button type="primary" @click="handPostDataDeleteRole()">确 定</el-button>
        </span>
    </el-dialog>

  </div>
</template>

<script>
import { Message } from 'element-ui'
export default {
  data() {
    return {
      dialogVisibleConfirmDelete: false,
      dialogVisibleCreateRole: false,
      dialogVisible: false,
      isCreate: false,
      form: {
        roleId: 1,
        roleName: '',
        roleRemark: '',
      },
      aclActionData: [],
      aclActionValue: [],
      prepareDeleteRoleId: null,
      prepareDeleteRoleName: null
    }
  },
  computed: {
    tableData() {
      return this.$store.state.acl.roleList
    },
  },
  created() {
    this.load()
  },
  methods: {

    load() {
      this.$store.dispatch('acl/getRoleList')
      this.$store.dispatch('acl/getGroupList')
    },

    handleCreateRole() {
        var then = this
      this.dialogVisibleCreateRole = true
      this.form.roleId = null
      this.form.roleName = ''
      this.form.roleRemark = ''
      var groupList = this.$store.state.acl.groupList;
      const data = [];
      const value = [];
        for (let i = 0; i < groupList.length; i++) {
            var groupDetail = groupList[i]
            var groupId = groupDetail.id
            data.push({
                key: groupId,
                label: groupDetail.groupName,
                disabled: false
            });
        }
        then.aclActionData = data;
        then.aclActionValue = value;
    },
    handleDelete(index, row) {
        this.prepareDeleteRoleId = row.id
        this.prepareDeleteRoleName = row.roleName
        this.dialogVisibleConfirmDelete = true
    },
    handleEdit(index, row) {
        var then = this
        this.form.roleName = row.roleName
        this.form.roleRemark = row.roleRemark
        this.form.roleId = row.id
        this.$store.dispatch('acl/roleDetail', {
           id: this.form.roleId
           }).then(res => {
                var roleDetail = this.$store.state.acl.roleDetail;
                const data = [];
                const value = [];
                var listRoleGroupDetail = roleDetail.listRoleGroupDetail;
                for (let i = 0; i < listRoleGroupDetail.length; i++) {
                    var groupDetail = listRoleGroupDetail[i]
                    var groupId = groupDetail.groupId
                    data.push({
                        key: groupId,
                        label: groupDetail.groupName,
                        disabled: false
                    });
                    if(groupDetail.selected){
                        value.push(groupId)
                    }
                }
                then.aclActionData = data;
                then.aclActionValue = value;
                then.dialogVisible = true
            })
    },

    handPostData() {
      var then = this
      this.$store.dispatch('acl/roleDetailUpdate', {
           id: this.form.roleId, 
           roleName: this.form.roleName,
           roleRemark: this.form.roleRemark,
           roleGroupList: this.aclActionValue
           }).then(res => {
              then.dialogVisible = false
              Message({
                message: '修改完成',
                type: 'success',
                duration: 5 * 1000
              })
              then.load()
            })
    },

    handPostDataCreateRole() {
      var then = this
      this.$store.dispatch('acl/roleAdd', {
           roleName: this.form.roleName,
           roleRemark: this.form.roleRemark,
           roleGroupList: this.aclActionValue
           }).then(res => {
              then.dialogVisible = false
              Message({
                message: '添加完成',
                type: 'success',
                duration: 5 * 1000
              })
              then.dialogVisibleCreateRole = false
              then.load()
            })
    },
    handPostDataDeleteRole() {
        var then = this
        this.$store.dispatch('acl/roleDelete', {
            id: this.prepareDeleteRoleId
            }).then(res => {
                then.dialogVisible = false
                Message({
                message: '完成',
                type: 'success',
                duration: 5 * 1000
                })
                then.dialogVisibleConfirmDelete = false
                then.load()
            })
    }

  }
}
</script>

<style scoped>
.dialog-footer{
    display: flex;
    justify-content: center;
    width: 100%;
}
</style>

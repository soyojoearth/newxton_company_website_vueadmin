<template>
  <div class="app-container">
      <el-card style="margin-top:10px;font-size:14px;line-height:30px;margin-bottom:15px;">
          <el-row style="font-weight:800;">
              操作提示：
          </el-row>
          <el-row>
              1、这里可以创建一个个权限分组，每个权限分组包含若干个操作权限。
          </el-row>
          <el-row>
              2、然后，在“角色管理”中给角色增加某个“权限组”，这个角色就有了这部分权限。
          </el-row>
      </el-card>
      <el-row>
      <el-button type="primary" @click="handleCreate">创建</el-button>
    </el-row>
    <el-card style="margin-top:10px">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%;min-height:300px;margin-bottom:20px;"
      >
        <el-table-column label="权限组名称">
          <template slot-scope="scope">{{ scope.row.groupName }}</template>
        </el-table-column>
        <el-table-column prop="groupRemark" label="备注" />
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
        <el-form-item label="权限组名称">
          <el-input v-model="form.groupName"/>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.groupRemark"/>
        </el-form-item>
        <el-form-item label="操作权限">
            <template>
                <el-transfer 
                v-model="aclActionValue" 
                :data="aclActionData" 
                :titles="['全部操作权限', '拥有操作权限']"
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
      :visible.sync="dialogVisibleCreate"
      width="50%"
    >
      <el-form ref="form" label-position="top" :model="form" label-width="80px" status-icon>
        <el-form-item label="权限组名称">
          <el-input v-model="form.groupName"/>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.groupRemark"/>
        </el-form-item>
        <el-form-item label="操作权限">
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
        <el-button @click="dialogVisibleCreate = false">取 消</el-button>
        <el-button type="primary" @click="handPostDataCreate()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
        title="提示"
        :visible.sync="dialogVisibleConfirmDelete"
        width="30%">
        <span>确定删除该权限组：{{prepareDeleteGroupName}}</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleConfirmDelete = false">取 消</el-button>
        <el-button type="primary" @click="handPostDataDelete()">确 定</el-button>
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
      dialogVisibleCreate: false,
      dialogVisible: false,
      isCreate: false,
      form: {
        groupId: 1,
        groupName: '',
        groupRemark: '',
      },
      aclActionData: [],
      aclActionValue: [],
      prepareDeleteGroupId: null,
      prepareDeleteGroupName: null
    }
  },
  computed: {
    tableData() {
      return this.$store.state.acl.groupList
    },
  },
  created() {
    this.load()
  },
  methods: {

    load() {
      this.$store.dispatch('acl/getGroupList')
      this.$store.dispatch('acl/getActionList')
    },

    handleCreate() {
        var then = this
      this.dialogVisibleCreate = true
      this.form.groupId = null
      this.form.groupName = ''
      this.form.groupRemark = ''
      var actionList = this.$store.state.acl.actionList;
      const data = [];
      const value = [];
        for (let i = 0; i < actionList.length; i++) {
            var actionDetail = actionList[i]
            var actionId = actionDetail.id
            data.push({
                key: actionId,
                label: actionDetail.actionName,
                disabled: false
            });
        }
        then.aclActionData = data;
        then.aclActionValue = value;
    },
    handleDelete(index, row) {
        this.prepareDeleteGroupId = row.id
        this.prepareDeleteGroupName = row.groupName
        this.dialogVisibleConfirmDelete = true
    },
    handleEdit(index, row) {
        var then = this
        this.form.groupName = row.groupName
        this.form.groupRemark = row.groupRemark
        this.form.groupId = row.id
        this.$store.dispatch('acl/groupDetail', {
           id: this.form.groupId
           }).then(res => {
                var groupDetail = this.$store.state.acl.groupDetail;
                const data = [];
                const value = [];
                var listGroupActionDetail = groupDetail.listGroupActionDetail;
                for (let i = 0; i < listGroupActionDetail.length; i++) {
                    var actionDetail = listGroupActionDetail[i]
                    var actionId = actionDetail.actionId
                    data.push({
                        key: actionId,
                        label: actionDetail.actionName,
                        disabled: false
                    });
                    if(actionDetail.selected){
                        value.push(actionId)
                    }
                }
                then.aclActionData = data;
                then.aclActionValue = value;
                then.dialogVisible = true
            })
    },

    handPostData() {
      var then = this
      this.$store.dispatch('acl/groupDetailUpdate', {
           id: this.form.groupId, 
           groupName: this.form.groupName,
           groupRemark: this.form.groupRemark,
           groupActionList: this.aclActionValue
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

    handPostDataCreate() {
      var then = this
      this.$store.dispatch('acl/groupAdd', {
           groupName: this.form.groupName,
           groupRemark: this.form.groupRemark,
           groupActionList: this.aclActionValue
           }).then(res => {
              then.dialogVisible = false
              Message({
                message: '添加完成',
                type: 'success',
                duration: 5 * 1000
              })
              then.dialogVisibleCreate = false
              then.load()
            })
    },
    handPostDataDelete() {
        var then = this
        this.$store.dispatch('acl/groupDelete', {
            id: this.prepareDeleteGroupId
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

<template>
  <div class="app-container">
    <el-row>
      <el-button type="primary" @click="handleCreate">创建</el-button>
    </el-row>
    <el-card style="margin-top:10px">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%;min-height:300px;margin-bottom:20px;"
        @selection-change="handleSelectionChange"
      >>
        <el-table-column label="用户名">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column prop="roleName" label="角色" />
        <el-table-column prop="status_description" label="状态" show-overflow-tooltip />
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row style="margin-top:20px; text-align:right">
        <el-button type="primary" icon="el-icon-arrow-left" @click="handlePage(-1)">上一页</el-button>
        <el-button>{{ listNumber }}</el-button>
        <el-button type="primary" icon="el-icon-arrow-right" @click="handlePage(1)">下一页</el-button>
      </el-row>
    </el-card>
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form ref="form" label-position="top" :model="form" label-width="80px" status-icon :rules="rules">
        <el-form-item label="用户名">
          <el-input v-model="form.name" :disabled="!isCreate" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select
            v-model="form.roleId"
            placeholder="请选择"
          >
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <template>
            <el-radio v-model="form.state" :label="0">正常</el-radio>
            <el-radio v-model="form.state" :label="-1">拉黑</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input v-model="form.newPwd" type="password" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handPostData('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createUser } from '@/api/set'
import { Message } from 'element-ui'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      console.log(this)
      if (value === '' && this.isCreate) {
        callback(new Error('请输入密码'))
      }
      callback()
    }
    return {
      dialogVisible: false,
      multipleSelection: [],
      isCreate: false,
      form: {
        name: 'Linda',
        roleId: 1,
        state: 1,
        content: '测试测试测试测试测试测试',
        date: '',
        newPwd: '',
        id: ''
      },
      rules: {
        newPwd: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    tableData() {
      return this.$store.state.set.userArr
    },
    listNumber() {
      return this.$store.state.set.userPageNumber
    },
    roleList() {
      return this.$store.state.set.roleList
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.$store.commit('set/SET_USER_PAGE', 1)
      this.$store.dispatch('set/getUserArr')
      this.$store.dispatch('set/getRoleList')
    },
    handlePage(page) {
      if (this.listNumber + page < 1) {
        return false
      }
      this.$store.commit('set/SET_USER_PAGE', this.listNumber + page)
      this.$store.dispatch('set/getUserArr')
    },
    handPostData(formName) {
      const then = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          then.postData()
        } else {
          return false
        }
      })
    },
    handleChange(val) {
      this.$store.commit('set/SET_USER_PAGE', val)
      this.$store.dispatch('set/getUserArr')
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleEdit(index, row) {
      this.$nextTick(() => {
        this.dialogVisible = true
        this.isCreate = false
        this.form.name = row.username
        this.form.roleId = row.roleId
        this.form.state = row.status
        this.form.id = row.id
        this.form.newPwd = ''
      })
    },
    handleCreate() {
      this.dialogVisible = true
      this.isCreate = true
      this.form.name = ''
      this.form.roleId = null
      this.form.state = 0
    },
    postData() {
      var then = this
      if (this.isCreate) {
        new Promise((resolve, rejust) => {
          createUser({
            new_user_name: then.form.name,
            new_user_pwd: then.form.newPwd,
            new_user_role: then.form.roleId })
            .then(res => {
              Message({
                message: '新建成功！',
                type: 'success',
                duration: 5 * 1000
              })
              then.load()
              resolve()
            })
            .catch(error => {
              rejust(error)
            })
        })
      } else {
        this.$store.dispatch('set/resetUserRole', { id: this.form.id, roleId: this.form.roleId })
        this.$store.dispatch('set/blockUser', { id: this.form.id, is_block: this.form.state === -1 ? 1 : 0 })
        if (this.form.newPwd !== '') {
          this.$store.dispatch('set/resetUserPwd', { id: this.form.id, pwd: this.form.newPwd })
        }
        Message({
          message: '编辑成功！',
          type: 'success',
          duration: 5 * 1000
        })
      }
      setTimeout(function() {
        then.load()
      },
      500)
      then.form.newPwd = ''
      then.dialogVisible = false
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

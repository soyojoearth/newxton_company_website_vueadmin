<template>
  <div class="app-container">
    <el-row>
      <el-button
        type="primary"
        @click="handleCreate"
      >创建</el-button>
    </el-row>
    <el-card style="margin-top:10px">
      <el-table
        ref="multipleTable"
        :data="listData"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          prop="brandName"
          label="品牌名称"
          height="30px"
        />
        <el-table-column
          prop=""
          label="品牌图片"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <img
              :src="scope.row.picUrlPathWithDomain"
              class="brandImg"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="操作"
          show-overflow-tooltip
          header-align="left"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="editorClick(scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="deleteClick(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      title="品牌管理"
      :visible.sync="saveDialog"
      :close-on-click-modal="false"
      :show-close="false"
      :close-on-press-escape="false"
      width="500px"
      center
    >
      <el-form
        ref="brandParamRef"
        :model="brandParam"
        :rules="brandParamRules"
      >
        <el-form-item
          label="品牌名称"
          prop="brandName"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="brandParam.brandName"
            autocomplete="off"
            maxlength="50"
            style="float: left;width: 335px"
          />
        </el-form-item>
        <el-form-item
          label="品牌图片"
          prop="uploadfileId"
          :label-width="formLabelWidth"
        >
          <el-input
            v-show="false"
            v-model="brandParam.uploadfileId"
          />
          <el-upload
            class="upload-demo"
            action="/api/admin/upload/public_pic"
            :headers="headers"
            :on-success="UploadOnSuccess"
            :before-upload="beforeAvatarUpload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
            :limit="1"
            <<<<<<<
            HEAD
            <<<<<<<
            HEAD=======style="width:300px;hight:50px"
          >>>>>>> 0c1c3e923d19a237098db79693259c0567f52749
            >
            =======
            style="width:300px;hight:50px"
            >
            >>>>>>> 62a2706c4aa445671053ceb2c5b9a9238ccdfe8b
            <el-button type="primary">选 择</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="closeDialog">取 消</el-button>
        <el-button
          type="primary"
          @click="saveConfirm"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getToken, getUserId } from '@/utils/auth'

export default {
  data () {
    const validateBrandName = (rule, value, callback) => {
      if (value == null || value.length === 0) {
        callback(new Error('品牌名称不能为空'))
      } else {
        callback()
      }
    }
    const validateUploadfileId = (rule, value, callback) => {
      if (value == null || value.length === 0) {
        callback(new Error('品牌图片不能为空'))
      } else {
        callback()
      }
    }
    return {
      multipleSelection: [],
      brandParam: {},
      saveDialog: false,
      formLabelWidth: '120px',
      headers: {
        'token': getToken(),
        'user_id': getUserId()
      },
      listData: [],
      brandParamRules: {
        brandName: [{ required: true, trigger: 'blur', validator: validateBrandName }],
        uploadfileId: [{ required: true, trigger: 'change', validator: validateUploadfileId }]
      },
      fileList: []

    }
  },
  computed: {
  },
  created () {
    this.load()
  },
  mounted () {
  },
  methods: {
    load () {
      this.$store.dispatch('brand/getBrandList').then(() => {
        this.listData = []
        this.listData = this.$store.state.brand.brandList
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleCreate () {
      this.brandParam = {}
      this.resetForm('brandParamRef')
      this.saveDialog = true
    },
    // 删除上传图片触发
    handleRemove (file, fileList) {
      this.brandParam.uploadfileId = null
    },
    // 点击上传图片触发
    handlePreview (file) {
    },
    UploadOnSuccess (res, file, fileList) {
      this.$set(this.brandParam, 'uploadfileId', res.id)
      this.$forceUpdate()
    },
    beforeAvatarUpload (file) {
      const isImg = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
      const isLt20M = file.size / 1024 / 1024 < 20
      if (!isImg) {
        this.$message.error('上传图片只能是 JPG、PNG、GIF 格式之一!')
      }
      if (!isLt20M) {
        this.$message.error('上传图片大小不能超过 20MB!')
      }
      return isImg && isLt20M
    },
    closeDialog: function () {
      this.saveDialog = false
      this.fileList = []
    },
    // 确认添加或修改
    saveConfirm: function () {
      this.$refs.brandParamRef.validate(valid => {
        if (valid) {
          this.saveChange()
        }
      })
    },
    // 保存操作
    saveChange () {
      this.newParams = Object.assign({}, this.brandParam)
      this.$store.dispatch('brand/saveBrand', this.newParams).then(() => {
        const status = this.$store.state.brand.brandSaveStatus
        if (status != null && status === 0) {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.closeDialog()
          this.load()
        } else {
          this.$message({
            type: 'error',
            message: '保存失败'
          })
        }
      })
    },
    editorClick: function (data) {
      this.resetForm('brandParamRef')
      this.saveDialog = true
      this.fileList = [{
        name: data.brandName,
        url: data.picUrlPathWithDomain
      }]
      this.brandParam = {
        id: data.id,
        brandName: data.brandName,
        uploadfileId: data.uploadFileId
      }
    },
    deleteClick: function (data) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const param = Object.assign({}, { id: data.id })
        this.$store.dispatch('brand/deleteBrand', param).then(() => {
          const status = this.$store.state.brand.brandDeleteStatus
          if (status != null && status === 0) {
            this.load()
            this.$message({
              type: 'success',
              message: '删除成功'
            })
          } else {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 重置表单
    resetForm (formName) {
      if (this.$refs[formName] != null) {
        this.$refs[formName].resetFields()
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.brandImg {
  vertical-align: middle;
  max-height: 80px;
}
</style>

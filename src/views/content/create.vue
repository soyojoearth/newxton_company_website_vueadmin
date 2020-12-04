<template>
  <div class="app-container">
    <el-card style="margin-top:10px">
      <el-form
        label-position="top"
        label-width="80px"
        :model="formLabelAlign"
      >
        <el-form-item label="标题">
          <el-input v-model="formLabelAlign.title" />
        </el-form-item>
        <el-form-item>
          <div style="margin-top: 20px">
            <el-select
              v-model="formLabelAlign.category_id"
              placeholder="请选择"
            >
              <el-option
                v-for="item in category_list"
                :key="item.category_id"
                :label="item.category_name_display"
                :value="item.category_id"
              />
            </el-select>
            <router-link to="/content/kind">
              <el-button>类别管理</el-button>
            </router-link>
          </div>
        </el-form-item>
        <el-form-item style="margin-bottom: 30px;">
          <Tinymce
            ref="editor"
            v-model="formLabelAlign.detail"
            :height="400"
          />
        </el-form-item>
        <el-form-item>
          <span>上传图片</span>
          <el-upload
            class="avatar-uploader"
            action="/api/admin/upload/public_pic"
            list-type="picture-card"
            :headers="headers"
            :on-success="UploadOnSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <i class="el-icon-plus" />
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img
              width="100%"
              :src="imageUrl"
              alt=""
            >
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="formLabelAlign.is_recommend">推荐</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleCreate"
          >发布</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { mapState } from 'vuex'
import { getToken, getUserId } from '@/utils/auth'
export default {
  components: { Tinymce },
  data () {
    return {
      radio2: '1',
      checked: false,
      formLabelAlign: {
        title: '',
        detail: '',
        category_id: '',
        is_recommend: false
      },
      headers: {
        'token': getToken(),
        'user_id': getUserId()
      },
      imageUrl: '',
      dialogVisible: false
    }
  },
  computed: {
    ...mapState({
      category_list: state => state.new.CategoryListData
    })
  },
  created () {

    this.$store.dispatch('new/getCategory')
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = file.url
      console.log(this.imageUrl)
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
    UploadOnSuccess (res, file, fileList) {
      this.$refs.editor.imageSuccessCBK([{ url: res.url }])
      // this.formLabelAlign.detail = this.formLabelAlign.detail + `<img src="${res.url}"/>`
      // console.log(this.formLabelAlign.detail)
      // this.$refs.editor.setContent(this.formLabelAlign.detail)
      // console.log(this.formLabelAlign.detail)
      this.$forceUpdate()
    },
    handleCreate () {
      this.$myLoading.myLoading.loading()
      const then = this
      this.formLabelAlign.is_recommend = this.formLabelAlign.is_recommend ? 1 : 0
      this.$store.dispatch('new/createNew', this.formLabelAlign).then(res => {
        then.$myLoading.myLoading.closeLoading()

        this.$message({
          message: '创建成功！',
          type: 'success'
        })
        console.log(res);
        if (res.status === 0) {
          then.$router.back()
        }
      })
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
.avatar {
  width: 30px;
  height: 30px;
  display: block;
}
.el-upload--picture-card {
  width: 60px;
  height: 60px;
  line-height: 66px;
}
.el-upload-list__item {
  display: none !important;
}
</style>

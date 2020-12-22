<template>
  <div class="app-container">
    <el-card style="margin-top:10px">
      <el-form label-position="top" label-width="80px" :model="formLabelAlign">
        <el-form-item label="网页标题">
          <el-input v-model="formLabelAlign.webTitle" />
        </el-form-item>
        <el-form-item label="内容标题">
          <el-input v-model="formLabelAlign.title" />
        </el-form-item>
        <el-form-item style="margin-bottom: 30px;">
          <Tinymce ref="editor" v-model="formLabelAlign.detail" :height="400" />
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
            <!-- <img width="100%" :src="imageUrl" alt=""> -->
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleUpdate">确定</el-button>
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
  props: {
    id: {
      type: [String, Number],
      default: '0'
    }
  },
  data() {
    return {
      radio2: '1',
      checked: false,
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
      formLabelAlign: state => state.set.pageDetail
    })
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.$store.dispatch('set/getPageDetail', this.id)
    },
    handleUpdate() {
      this.$store.dispatch('set/editPageDetail').then(value => {
        if (value) {
          this.$message({
            message: '修改成功！',
            type: 'success'
          })
          this.$router.replace({ path: '/content/pages' })
        }
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = file.url
    },
    beforeAvatarUpload(file) {
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
    UploadOnSuccess(res, file, fileList) {
      this.$refs.editor.imageSuccessCBK([{ url: res.url }])
      // this.formLabelAlign.detail = this.formLabelAlign.detail + `<img src="${res.url}"/>`
      // console.log(this.formLabelAlign.detail)
      // this.$refs.editor.setContent(this.formLabelAlign.detail)
      // console.log(this.formLabelAlign.detail)
      this.$forceUpdate()
    }
  }
}
</script>

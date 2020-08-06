<template>
  <div class="app-container">
    <el-card style="margin-top:10px">
      <el-form label-position="top" label-width="80px" :model="formLabelAlign">
        <el-form-item label="网页标题">
          <el-input v-model="formLabelAlign.name" />
        </el-form-item>
        <el-form-item label="内容标题">
          <div style="margin-top: 20px">
            <el-input v-model="formLabelAlign.name" />
          </div>
        </el-form-item>
        <el-form-item label="内容">
          <Tinymce ref="editor" v-model="formLabelAlign.content" :height="400" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">确实</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
export default {
  components: { Tinymce },
  data() {
    return {
      radio2: '1',
      checked: false,
      formLabelAlign: {
        name: '',
        region: '',
        type: '',
        content: ''
      }
    }
  }
}
</script>

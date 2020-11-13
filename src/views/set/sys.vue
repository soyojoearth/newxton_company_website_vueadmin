<template>
  <div class="app-container">
    <el-card style="margin-top:10px">
      <el-form ref="form" label-width="160px">
        <el-form-item label="统计代码">
          <el-input v-model="list.statCode" type="textarea" rows="6" resize="none" />
        </el-form-item>
        <el-form-item label="客服链接">
          <el-input v-model="list.contactLink" type="text" rows="6" />
        </el-form-item>
        <el-form-item label="第三方网页客服代码">
          <el-input v-model="list.contactCode" type="textarea" rows="6"  resize="none" />
        </el-form-item>
        <el-form-item label="备案号">
          <el-input v-model="list.beianCode" type="text" rows="6" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getWebInfo, getWebSave } from '@/api/web'
import { Message } from 'element-ui'
export default {
  data() {
    return {
      list: [],
      oldList: []
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      var then = this
      new Promise((resolve, rejust) => {
        getWebInfo()
          .then(res => {
            then.list = res.detail
            console.log(res.detail)
            // then.oldList = JSON.parse(JSON.stringify(res.list))
            resolve()
          })
          .catch(error => {
            rejust(error)
          })
      })
      console.log('sss')
    },
    onSubmit() {
      var list = this.list
      var sum = 0
      var postDatas = {}
      postDatas['statCode'] = list.statCode
      postDatas['contactCode'] = list.contactCode
      postDatas['contactLink'] = list.contactLink
      postDatas['beianCode'] = list.beianCode
      getWebSave(postDatas)
      if (sum > 0) {
        Message({
          message: '修改成功',
          type: 'success',
          duration: 5 * 1000
        })
      }
    }
  }
}
</script>


<template>
  <div class="app-container">
    <el-card style="margin-top:10px">
      <el-form ref="form" label-width="80px">
        <template v-for="item in list">
          <el-form-item :key="item.id" :label="item.settingName">
            <el-input v-model="item.settingValue" :type="item.displayType" rows="6" />

          </el-form-item>
        </template>
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
            then.list = res.list
            then.oldList = JSON.parse(JSON.stringify(res.list))
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
      var oldList = this.oldList
      var sum = 0
      var postDatas = []
      for (let i = 0; i < list.length; i++) {
        if (list[i].settingValue !== oldList[i].settingValue) {
          sum++
          var postData = {}
          postData['setting_value'] = list[i].settingValue
          postData['setting_key'] = list[i].settingKey
          postDatas.push(postData)
        }
      }
      console.log(postDatas.length)
      for (let i = 0; i < sum; i++) {
        getWebSave(postDatas[i])
        // console.log(postDatas[i])
      }
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


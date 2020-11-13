<template>
  <div class="app-container">
    <el-card style="margin-top:10px">
      <el-form ref="form" label-width="160px">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="基础设置" name="first">
            <el-form-item label="存储方式" label-width="120px" prop="pass">
              <el-radio v-model="ossLocation" label="local">当前服务器</el-radio>
              <el-radio v-model="ossLocation" label="qiniu">七牛云OSS</el-radio>
            </el-form-item>
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <p>切换后不希望图片分布于多处？点击这里：<router-link to="/set/oss" style="color: #1890ff;">图片搬家</router-link></p>
          </el-tab-pane>
          <el-tab-pane label="七牛云OSS配置" name="second">
            <el-form-item label="OSS域名" prop="pass">
              <el-input v-model="ossQiniuDomain" placeholder="" />
            </el-form-item>
            <el-form-item label="AccessKey" prop="pass">
              <el-input v-model="ossQiniuAccessKey" placeholder="" />
            </el-form-item>
            <el-form-item label="SecretKey" prop="pass">
              <el-input v-model="ossQiniuSecretKey" placeholder="" />
            </el-form-item>
            <el-form-item label="Bucket" prop="pass">
              <el-input v-model="ossQiniuBucket" placeholder="" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">确定</el-button>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getImageInfo, getImageSave } from '@/api/web'
export default {
  data() {
    return {
      list: [],
      oldList: [],
      activeName: 'first',
      input: '',
      ossQiniuAccessKey: '',
      ossQiniuSecretKey: '',
      ossQiniuBucket: '',
      ossQiniuDomain: '',
      ossLocation: 'local'
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      var then = this
      new Promise((resolve, rejust) => {
        getImageInfo()
          .then(res => {
            then.ossLocation = res.detail.ossLocation
            then.ossQiniuAccessKey = res.detail.ossQiniuAccessKey
            then.ossQiniuSecretKey = res.detail.ossQiniuSecretKey
            then.ossQiniuBucket = res.detail.ossQiniuBucket
            then.ossQiniuDomain = res.detail.ossQiniuDomain
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
      var postData = {}
      postData['ossLocation'] = this.ossLocation
      postData['ossQiniuAccessKey'] = this.ossQiniuAccessKey
      postData['ossQiniuSecretKey'] = this.ossQiniuSecretKey
      postData['ossQiniuBucket'] = this.ossQiniuBucket
      postData['ossQiniuDomain'] = this.ossQiniuDomain
      getImageSave(postData)
    },
    handleClick(tab, event) {
      // console.log(tab, event)
    }
  }
}
</script>


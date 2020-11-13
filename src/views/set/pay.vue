<template>
  <div class="app-container">
    <el-card style="margin-top:10px;font-size:14px;line-height:30px;">
      <el-row style="font-weight:800;">
        操作提示：
      </el-row>
      <el-row>
        1、若没有配置支付方式，买家无法付款。
      </el-row>
      <el-row>
        2、如果不知道怎么配置，请到本后台首页，进入“帮助文档”链接查看相关指南。
      </el-row>
    </el-card>
    <el-card style="margin-top:10px">
      <el-form ref="form" label-width="160px">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="微信支付设置" name="first">
            <el-form-item label="绑定支付的APPID" prop="pass">
              <el-input v-model="wxpayAPPID" placeholder="" />
            </el-form-item>
            <el-form-item label="商户号" prop="pass">
              <el-input v-model="wxpayClinetID" placeholder="" />
            </el-form-item>
            <el-form-item label="商户支付密钥" prop="pass">
              <el-input v-model="wxpaySecretKey" placeholder="" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">确定</el-button>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="支付宝设置" name="second">
            <el-form-item label="支付宝appid" prop="pass">
              <el-input v-model="alipayAPPID" placeholder="" />
            </el-form-item>
            <el-form-item label="商户私钥" prop="pass">
              <el-input v-model="alipaySecretKey" placeholder="" />
            </el-form-item>
            <el-form-item label="支付宝公钥" prop="pass">
              <el-input v-model="alipayPublicKey" placeholder="" />
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
import { getPayInfo, getPaySave } from '@/api/shop'
export default {
  data() {
    return {
      list: [],
      oldList: [],
      activeName: 'first',
      input: '',
      wxpayAPPID: '',
      wxpayClinetID: '',
      wxpaySecretKey: '',
      alipayAPPID: '',
      alipaySecretKey: '',
      alipayPublicKey: ''
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      var then = this
      new Promise((resolve, rejust) => {
        getPayInfo()
          .then(res => {
            then.wxpayAPPID = res.detail.wxpayAPPID
            then.wxpayClinetID = res.detail.wxpayClinetID
            then.wxpaySecretKey = res.detail.wxpaySecretKey
            then.alipayAPPID = res.detail.alipayAPPID
            then.alipaySecretKey = res.detail.alipaySecretKey
            then.alipayPublicKey = res.detail.alipayPublicKey
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
      postData['wxpayAPPID'] = this.wxpayAPPID
      postData['wxpayClinetID'] = this.wxpayClinetID
      postData['wxpaySecretKey'] = this.wxpaySecretKey
      postData['alipayAPPID'] = this.alipayAPPID
      postData['alipaySecretKey'] = this.alipaySecretKey
      postData['alipayPublicKey'] = this.alipayPublicKey
      getPaySave(postData).then(value => {
        console.log(value)
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      }).catch(() => {
        this.$message({
          message: '修改失败',
          type: 'error'
        })
      })
    },
    handleClick(tab, event) {
      // console.log(tab, event)
    }
  }
}
</script>


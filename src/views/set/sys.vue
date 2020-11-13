<template>
  <div class="app-container">
    <el-card style="margin-top:10px;font-size:14px;line-height:30px;">
      <el-row style="font-weight:800;">
        操作提示：
      </el-row>
      <el-row>
        1、此处配置默认空白，但不影响网站正常运行。
      </el-row>
      <el-row>
        2、如需个性化，请在下面对应配置相关内容。
      </el-row>
      <el-row>
        3、如果服务器放置在大陆以外的地区，不需要ICP备案；但是如果想要放在大陆机房，或做大陆cdn，或者申请竞价广告、公众号等，则必须备案。
      </el-row>
    </el-card>
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
      var postDatas = {}
      postDatas['statCode'] = list.statCode
      postDatas['contactCode'] = list.contactCode
      postDatas['contactLink'] = list.contactLink
      postDatas['beianCode'] = list.beianCode
      getWebSave(postDatas).then(value => {
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
    }
  }
}
</script>


<template>
  <div class="app-container">
      <el-card style="margin-top:10px;font-size:14px;line-height:30px;">
          <el-row style="font-weight:800;">
              操作提示：
          </el-row>
          <el-row>
              1、该功能可以将一处图片搬到另一处。
          </el-row>
          <el-row>
              2、点击“提交任务”，然后，你可以离开该页面，服务器会默默自动搬运。
          </el-row>
      </el-card>
    <el-card style="margin-top:10px">
      <el-form ref="form" label-width="160px">
          <el-form-item label="当前服务器图片数量">
              <span>{{totalLocal}}</span>
          </el-form-item>
          <el-form-item label="七牛云图片数量">
            <span>{{totalQiniu}}</span>
          </el-form-item>
          <el-form-item label="状态">
            <span>{{statusDescription}}</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="refresh">刷新</el-button>
        </el-form-item>
      </el-form>
    </el-card>
        <el-card style="margin-top:10px">
      <el-form ref="form" label-width="160px">
          <el-form-item label="从">
            <el-select v-model="params.location_from" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="搬到">
            
            <el-select v-model="params.location_to" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="handleSubmit">提交任务</el-button>
            </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { mapState } from 'vuex'
import { getToken, getUserId } from '@/utils/auth'
export default {
  data() {
    return {
      options:[{
          value:"local",
          label:"当前服务器"
      },{
          value:"qiniu",
          label:"七牛云OSS"
      }],
      params: {
        location_from: '',
        location_to: ''
      },
    }
  },
  computed: {
    ...mapState({
      statusDescription: state => state.oss.statusDescription,
      totalLocal: state => state.oss.totalLocal,
      totalQiniu: state => state.oss.totalQiniu
    })
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.$store.dispatch('oss/getInfo')
    },
    refresh() {
      this.$store.dispatch('oss/getInfo')
      .then(value => {
            this.$message({
                message: "已刷新",
                type: 'success'
            })
        })
    },
    handleSubmit() {
        this.$store.dispatch('oss/addjobTransfer', {location_from:this.params.location_from, location_to:this.params.location_to})
        .then(value => {
            this.$message({
                message: "任务提交成功",
                type: 'success'
            })
        })
        .catch(() => {
            
        })
    }
  }
}
</script>


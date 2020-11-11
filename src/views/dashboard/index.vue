<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header">
        <span class="header-span">
          系统信息
        </span>
      </div>
      <div class="box-items">
        <el-row>
          <el-col :span="24">
            <p>名称：NxtFramework </p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <p>版本：v0.1.0</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <p>授权协议：Apache (可商用）</p>
          </el-col>
          <el-col :span="12" style="text-align: right;"><el-button type="primary" round size="medium"><a target="_blank" href="https://github.com/soyojoearth/nxtframework">查看最新版本</a></el-button></el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import '@/assets/custom-theme/index.css' // the theme changed version element-ui css

export default {
}
</script>

<style scoped>
.header-span{
  color: #0090FF;
}
.field-label{
  vertical-align: middle;
}
.box-card {
  width: 100%;
  max-width: 100%;
  margin: 20px auto;
}
.box-items{
  display: flex;
  flex-direction: column;
}

.block {
  padding: 30px 24px;
}

.tag-item {
  margin-right: 15px;
}
</style>

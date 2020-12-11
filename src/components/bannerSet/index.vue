<template>
  <div>
    <vuedraggable class="wrapper"
                  v-model="list">
      <!-- 过度效果 -->
      <transition-group>
        <div v-for="(item,index) in list"
             :key="index"
             class="item">
          <i class="el-icon-close delIcon"
             @click="deleImg(item,index)" />
          <img :src="item.banner_picture_url"
               style="height:300px;width:100%"
               alt=""
               srcset="">
          <div class="link">
            <span style="width: 55px;">链接</span>
            <el-input v-model="item.banner_href_url"
                      placeholder="请输入内容"></el-input>
          </div>

        </div>
      </transition-group>
    </vuedraggable>
    <el-upload :show-file-list="false"
               action=""
               list-type="picture-card"
               :http-request="handleUploadHttpRequest"
               :on-success="handlePictureSuccess">
      <i class="el-icon-plus" />
    </el-upload>
    <el-button plain
               class="buttom"
               @click="handlerSave">更新</el-button>
  </div>
</template>

<script>
import { uploadPic } from '@/api/product'
import { save } from '@/api/banner'
import vuedraggable from 'vuedraggable'
export default {
  name: 'bannerSet',
  components: { vuedraggable },
  props: {
    bannerList: {
      type: Array,
      default: () => []
    },
    location_name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      list: [],

    }
  },
  watch: {
    bannerList: {
      handler (newData, old) {
        this.list = newData
      },
      immediate: true
    }
  },

  updated () {
    console.log(this.list);
  },
  methods: {
    async handlerSave () {
      var banner_picture_list = [], banner_href_list = [];
      this.list.forEach(element => {
        banner_picture_list.push(element.banner_picture_id)
        banner_href_list.push(element.banner_href_url)
      });


      var fd = new FormData()
      fd.append('location_name', this.location_name)
      fd.append('banner_picture_list', '[' + banner_picture_list.toString() + ']')
      fd.append('banner_href_list', '["' + banner_href_list.join('","') + '"]')
      if (fd.get("banner_href_list") == '[""]') {
        fd.set("banner_href_list", '[]')

      }
      // console.log(data);
      var res = await save(fd)
      if (res.status === 0) {
        this.$notify({
          title: '提示信息',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
      } else {
        this.$notify({
          title: '提示信息',
          message: response.message,
          type: 'error',
          duration: 2000
        })
      }
    },
    async handleUploadHttpRequest (param) {
      const fileObj = param.file
      var fd = new FormData()
      fd.append('file', fileObj)
      const response = await uploadPic(fd)
      if (response.status === 0) {
        this.$notify({
          title: '提示信息',
          message: '图片上传成功',
          type: 'success',
          duration: 2000
        })
        var form = {
          banner_picture_id: response.id,
          banner_picture_url: response.url,
          banner_href_url: ''
        }
        this.list.push(form)
        console.log(this.list);
        // this.productForm.productObj.push({ 'id': response.id, 'url': response.url })
      } else {
        this.$notify({
          title: '提示信息',
          message: response.message,
          type: 'error',
          duration: 2000
        })
      }
    },
    deleImg (data, index) {
      this.list.splice(index, 1)
    },
    handlePictureSuccess (response, file, fileList) {
      // console.log(file)
      const isJPG = file.raw.type === 'image/jpeg'
      const isJPG2 = file.raw.type === 'image/jpg'
      const isPNG = file.raw.type === 'image/png'
      const isGIF = file.raw.type === 'image/gif'
      if (!isJPG && !isJPG2 && !isPNG && !isGIF) {
        this.$message.warning('只支持jpg或png或gif格式图片')
        return
      }
      const _this = this
      new Promise(function (resolve, reject) {
        const url = window.URL || window.webkitURL
        const img = new Image()
        img.src = url.createObjectURL(file.raw)
      }).then(
        () => {

          _this.list.push(file.response.data)
          console.log(_this.list);
          return file.raw
        }

      )
    }
  }
}
</script>

<style scoped>
.delIcon {
  position: absolute;
  z-index: 2;
  right: 10px;
  background-color: aliceblue;
  font-size: 40px;
}
.wrapper {
  display: flex;
  justify-content: center;
}
.item {
  width: 100%;
  height: 380px;
  display: flex;
  flex-direction: column;
  border: 1px solid #000;
  margin-bottom: 10px;
  padding: 10px 10px;
}
.link {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px;
}
.buttom {
  margin-top: 20px;
}
</style>
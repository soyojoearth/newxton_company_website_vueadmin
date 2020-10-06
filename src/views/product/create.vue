<template>
  <div class="app-container">
    <el-card style="margin-top:10px">
      <el-form
        label-position="top"
        label-width="80px"
        :model="formLabelAlign"
      >
        <el-form-item label="标题">
          <el-input v-model="formLabelAlign.product_name" />
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="formLabelAlign.category_id"
            placeholder="请选择"
          >
            <el-option
              v-for="item in category_list"
              :key="item.category_id"
              :label="item.category_name_display"
              :value="item.category_id"
            />
          </el-select>
          <router-link to="/product/kind">
            <el-button>类别管理</el-button>
          </router-link>
        </el-form-item>
        <el-form-item label="副标题（营销性文字）">
          <el-input v-model="formLabelAlign.product_subtitle" />
        </el-form-item>
        <el-card
          shadow="never"
          style="margin-bottom:10px"
        >
          <el-form-item>
            价格
            <el-input
              v-model="formLabelAlign.price"
              style="width:220px"
            />
            <el-checkbox v-model="price_negotiation">是否面议</el-checkbox>
          </el-form-item>
          <el-form-item>
            价格说明
            <el-input
              v-model="formLabelAlign.price_remark"
              style="width:500px"
            />
          </el-form-item>
        </el-card>
        <el-form-item label="产品属性">
          <el-card shadow="never">
            <el-form-item
              :key="index"
              v-for="(item,index) in formLabelAlign.product_sku"
              :label="item.name"
            >
              <el-tag
                :key="index"
                v-for="(tag,index) in item.sku"
                closable
                :disable-transitions="false"
                @close="handleColorClose(item.name,tag)"
              >
                {{tag}}
              </el-tag>
              <el-input
                class="input-new-tag"
                ref="saveColorTagInput"
                v-model="item[index]"
                size="small"
              >
              </el-input>
              <el-button
                class="button-new-tag"
                size="small"
                @click="handleConfirm(item.name,item[index])"
              >增加</el-button>

            </el-form-item>
            <el-card shadow="never">
              <el-form-item label="属性名称">
                <el-tag
                  :key="index"
                  v-for="(tag,index) in attributeNameTags"
                  closable
                  :disable-transitions="false"
                  @close="handleAttributeNameClose(tag)"
                >
                  {{tag}}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-model="AttributeNameinputValue"
                  ref="saveAttributeNameTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button
                  class="button-new-tag"
                  size="small"
                  @click="showAttributeNameInput"
                >添加属性</el-button>
              </el-form-item>
            </el-card>
          </el-card>
        </el-form-item>
        <el-form-item label="产品图片">
          <div class="box">

            <draggable
              v-model="productForm.productPicList"
              class="list-group"
              tag="ul"
              v-bind="dragOptions"
              @start="productForm.drag = true"
              @end="productForm.drag = false"
            >
              <div
                v-for="(item,index) in productForm.productPicList"
                :key="index"
                v-loading="productForm.loadingapp"
                class="img-wrapper divBox"
                @mouseenter="showDelBtn(index)"
                @mouseleave="hiddenDelBtn"
              >

                <img
                  v-if="item"
                  :src="item"
                  width="148"
                  height="148"
                  class="imgSty"
                >
                <div :class="{mask:index===productForm.currentDelBtn}" />
                <i
                  v-show="index===productForm.currentDelBtn"
                  class="el-icon-delete delIcon"
                  @click="deleImg(item,index)"
                />
              </div>
            </draggable>

            <el-upload
              :show-file-list="false"
              action=""
              list-type="picture-card"
              :http-request="handleUploadHttpRequest"
              :on-success="handlePictureSuccess"
            >
              <i class="el-icon-plus" />
            </el-upload>

          </div>
        </el-form-item>
        <el-form-item style="margin-bottom: 30px;">
          <Tinymce
            ref="editor"
            v-model="formLabelAlign.product_description"
            :height="400"
          />
        </el-form-item>
        <el-form-item>
          <el-upload
            class="pic upload-demo"
            action="/api/admin/upload/public_pic"
            :headers="headers"
            :show-file-list="false"
            :on-success="UploadOnSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <el-button>上传插入图片</el-button>
          </el-upload>

        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="formLabelAlign.is_recommend">推荐</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleCreate"
          >发布</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { uploadPic } from '@/api/product'
import { mapState } from 'vuex'
import { getToken, getUserId } from '@/utils/auth'
import draggable from 'vuedraggable'

export default {
  components: { Tinymce, draggable },
  data () {
    return {
      checked: false,
      formLabelAlign: {
        product_name: '',
        product_description: '',
        category_id: '',
        is_recommend: false,
        product_picture_list: [],
        product_subtitle: '',//副
        price: '',
        price_negotiation: '0',
        price_remark: '',
        product_sku: [],


      },
      headers: {
        'token': getToken(),
        'user_id': getUserId()
      },
      imageUrl: '',
      dialogVisible: false,
      productForm: {
        productPicList: [],
        currentDelBtn: -1,
        loadingapp: false,
        drag: false,
        productObj: []
      },
      colorTags: [],

      attributeNameTags: [],
      price_negotiation: false,



      ColorinputVisible: false,
      AttributeNameinputVisible: false,

      ColorinputValue: '',
      AttributeNameinputValue: '',
      inputValue: ''

    }
  },
  computed: {
    ...mapState({
      category_list: state => state.product.CategoryListData
    }),
    dragOptions () {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',

      }
    }
  },
  created () {
    this.$store.dispatch('product/getCategory')
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
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
    //
    handleColorClose (name, tag) {
      this.formLabelAlign.product_sku.forEach(element => {
        if (element.name === name) {
          element.sku.splice(element.sku.indexOf(tag), 1);
          return
        }
      });

    },

    handleAttributeNameClose (tag) {
      this.attributeNameTags.splice(this.attributeNameTags.indexOf(tag), 1);
    },
    showAttributeNameInput () {
      this.AttributeNameinputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveAttributeNameTagInput.$refs.input.focus();
      });
    },

    handleConfirm (name, value) {
      console.log(name);
      if (value) {
        this.formLabelAlign.product_sku.forEach(element => {
          if (element.name === name) {
            element.sku.push(value)
            return
          }
        });
      }
    },

    handleInputConfirm () {
      let inputValue = this.AttributeNameinputValue;
      if (inputValue) {
        this.formLabelAlign.product_sku.push({ 'name': inputValue, 'sku': [] })
      }
      this.AttributeNameinputVisible = false;
      this.AttributeNameinputValue = '';
    },
    //
    handleCreate () {
      this.formLabelAlign.is_recommend = this.formLabelAlign.is_recommend ? 1 : 0
      // product_picture_list
      this.formLabelAlign.product_picture_list = []
      this.productForm.productPicList.forEach((item) => {
        this.productForm.productObj.forEach((ele) => {
          if (item === ele.url) {
            this.formLabelAlign.product_picture_list.push(ele.id)
          }
        })
      })
      const _this = this
      var fd = new FormData()

      fd.append('category_id', this.formLabelAlign.category_id)
      fd.append('product_name', this.formLabelAlign.product_name)
      fd.append('product_description', this.formLabelAlign.product_description)
      fd.append('is_recommend', this.formLabelAlign.is_recommend)
      var re = '[' + this.formLabelAlign.product_picture_list.toString() + ']'
      fd.append('product_picture_list', re)
      // this.formLabelAlign.product_sku.splice(0, 1)
      var str = ''

      for (let index = 0; index < this.formLabelAlign.product_sku.length; index++) {
        const element = this.formLabelAlign.product_sku[index];
        if (index !== this.formLabelAlign.product_sku.length - 1) {
          str = str + '{"name":"' + element.name + '",sku:["' + element.sku.join('","') + '"]},'

        } else {
          str = str + '{"name":"' + element.name + '",sku:["' + element.sku.join('","') + '"]}'

        }
      }
      console.log(this.formLabelAlign.product_sku);
      console.log('[' + str + ']');
      fd.append('product_sku', '[' + str + ']')
      fd.append('price', this.formLabelAlign.price)
      fd.append('price_negotiation', this.price_negotiation ? '1' : '0')
      fd.append('price_remark', this.formLabelAlign.price_remark)
      fd.append('product_subtitle', this.formLabelAlign.product_subtitle)

      this.$store.dispatch('product/createProduct', fd).then(res => {
        this.$message({
          message: '创建成功！',
          type: 'success'
        })
        _this.$router.back()
      })
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
        this.productForm.productPicList.push(response.url)
        this.productForm.productObj.push({ 'id': response.id, 'url': response.url })
      } else {
        this.$notify({
          title: '提示信息',
          message: response.message,
          type: 'error',
          duration: 2000
        })
      }
    },
    UploadOnSuccess (res, file, fileList) {
      this.$refs.editor.imageSuccessCBK([{ url: res.url }])
      // this.formLabelAlign.product_description = this.formLabelAlign.product_description + `<img src="${res.url}"/>`
      // console.log(this.formLabelAlign.product_description)
      // this.$refs.editor.setContent(this.formLabelAlign.product_description)
      this.$forceUpdate()
    },
    // 显示删除图片的图标
    showDelBtn (index) {
      // console.log(index)
      this.productForm.currentDelBtn = index
    },
    // 隐藏删除图片的图标
    hiddenDelBtn () {
      this.productForm.currentDelBtn = -1
    },
    // 删除图片
    deleImg (data, index) {
      this.productForm.productPicList.splice(index, 1)
    },
    // 图片上传成功之后的校验：
    // 最多只能上传5张、必须是1：1的 ；不能超过100k
    // 这里为什么没有用el-upload自带图片上传之前的验证before-upload 呢 因为 一但上传了失败的图片以前上传的所有图片都不显示了 （目前不太清楚原因）
    // 以下函数 里为什么一直用的 是file 而不是fileList  因为涉及到了编辑回显，如果没有编辑回显可以直接用fileList这个参数来处理代码逻辑；
    handlePictureSuccess (response, file, fileList) {
      // console.log(file)
      const isJPG = file.raw.type === 'image/jpeg'
      const isJPG2 = file.raw.type === 'image/jpg'
      const isPNG = file.raw.type === 'image/png'
      const isGIF = file.raw.type === 'image/gif'
      // const isLt5M = file.raw.size / 1024 < 100
      // const isSize = this.imgSize(file)
      if (!isJPG && !isJPG2 && !isPNG && !isGIF) {
        this.$message.warning('只支持jpg或png或gif格式图片')
        return
      }
      // if (!isLt5M) {
      //   this.$message.warning('商品图片须小于100K!')
      //   return
      // }

      // if (this.productForm.productPicList.length >= 5) {
      //   this.$message.warning(`当前限制选择 5 张图片`)
      //   return
      // }
      // 以下代码是验证是否符合比例，如果不需要验证比例可以直接把图片push到数组里
      // _this.productForm.productPicList.push(file.response.data)
      const _this = this
      new Promise(function (resolve, reject) {
        const url = window.URL || window.webkitURL
        const img = new Image()
        // img.onload = function() {
        //   // 图片比例校验
        //   const valid = img.width / img.height === 1
        //   valid ? resolve() : reject()
        // }
        img.src = url.createObjectURL(file.raw)
      }).then(
        () => {
          // 只有验证通过了才添加到  productForm.productPicList这个数组里，这个数组就是用来显示上传的图片的file.response.data  这个是后台接口返回来的值
          _this.productForm.productPicList.push(file.response.data)
          return file.raw
        }
        // () => {
        //   this.$message.warning('商品图片尺寸仅支持方形!')
        //   return Promise.reject()
        // }
      )
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  >>> .el-tag + .el-tag {
    margin-left: 10px;
  }
  >>> .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  >>> .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .box {
    border: 1px solid #eee;
    height: 200px;
    padding: 10px;
    overflow: auto;
    >>> .el-upload--picture-card {
      position: relative;
    }

    .divBox {
      float: left;
      position: relative;
      left: -40px;
    }
    .imgSty {
      margin-right: 6px;
      border-radius: 6px;
    }
    .mask {
      position: absolute;
      border-radius: 6px;
      top: 0;
      left: 0;
      width: 148px;
      height: 148px;
      background: rgba(0, 0, 0, 0.5);
    }
    .delIcon {
      position: absolute;
      top: 40%;
      left: 40%;
      font-size: 20px;
      color: #fff;
      cursor: pointer;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
  .pic {
    >>> .el-upload--picture-card {
      background-color: none;
      border: none;
      width: 0px;
      height: 0px;
      line-height: normal;
    }
  }
}
</style>

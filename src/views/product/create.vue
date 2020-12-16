<template>
  <div class="app-container">
    <el-card style="margin-top:10px">
      <el-form
        label-position="top"
        label-width="80px"
        :model="formLabelAlign"
      >

        <el-row>
          <el-col :span="24">
            <el-form-item label="标题">
              <el-input v-model="NxtStructProduct.productName" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="促销语">
              <el-input class="input_small" v-model="NxtStructProduct.productSubtitle" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品标签(用逗号隔开)">
              <el-input class="input_small" v-model="NxtStructProduct.productTags" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="产品类别">
              <el-select
                v-model="NxtStructProduct.categoryId"
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
          </el-col>
          <el-col :span="12">
            <el-form-item label="五星评分(例如：5、4、3.5)">
              <el-input
                class="input_small"
                v-model="NxtStructProduct.productRatings"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="该货品外部链接（其它网店）">
              <el-input
                v-model="NxtStructProduct.externalUrl"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="货号">
              <el-input
                class="input_small"
                v-model="NxtStructProduct.itemNo"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="品牌">
              <el-select
                v-model="NxtStructProduct.brandId"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in brand_list"
                  :key="item.id"
                  :label="item.brandName"
                  :value="item.id"
                />
              </el-select>
              <router-link to="/product/kind">
                <el-button>品牌管理</el-button>
              </router-link>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">

            <el-form-item label="最低起购">
              <el-input
                class="input_small"
                v-model="NxtStructProduct.dealQuantityMin"
              />
            </el-form-item>

          </el-col>

          <el-col :span="12">
            <el-form-item label="单次最多购买">
              <el-input
                class="input_small"
                v-model="NxtStructProduct.dealQuantityMax"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="运费模版">
              <el-select
                v-model="NxtStructProduct.deliveryConfigId"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in delivery_config_list"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
              <router-link to="/product/kind">
                <el-button>模版管理</el-button>
              </router-link>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="产品规格">
              <el-radio-group v-model="NxtStructProduct.withSku">
                <el-radio
                  class="radio"
                  :label="false"
                >单一规格</el-radio>
                <el-radio
                  class="radio"
                  :label="true"
                >多规格</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="NxtStructProduct.withSku==false">
          <el-col :span="12">

            <el-form-item label="价格">
              <el-input
                v-model="NxtStructProduct.price"
                class="input_small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="折扣">
              <el-input
                class="input_small"
                v-model="NxtStructProduct.priceDiscount"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="NxtStructProduct.withSku==false">
          <el-col :span="12">
            <el-form-item label="总库存">
              <el-input
                class="input_small"
                v-model="NxtStructProduct.inventoryQuantity"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">

          </el-col>
        </el-row>

        <el-row v-if="NxtStructProduct.withSku==true">
          <el-col :span="24">

            <el-form-item label="产品规格">
              <el-card shadow="never">

                <el-card shadow="never">
                  <el-form-item label="规格名称">
                    <el-tag
                      :key="index"
                      v-for="(tag,index) in attributeNameTags"
                      closable
                      :disable-transitions="false"
                      @close="handleAttributeNameClose(tag)"
                    >
                      {{tag.valueName}}
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
                    >添加规格</el-button>
                    <span class="tips"> &nbsp;&nbsp;请填写规格名，如：颜色、容量、尺码等………（最多可以添加2种）</span>
                  </el-form-item>
                </el-card>
                <el-row>&nbsp;</el-row>
                <el-card shadow="never">
                  <el-form-item
                    :key="index"
                    v-for="(item,index) in NxtStructProduct.skuList"
                    :label="item.skuKeyName"
                  >
                    <el-tag
                      :key="index"
                      v-for="(skuValue,index) in item.skuValueList"
                      closable
                      :disable-transitions="false"
                      @close="handleColorClose(item.skuKeyName,skuValue)"
                    >
                      {{skuValue.skuValueName}}
                    </el-tag>
                    <el-input
                      class="input-new-tag"
                      ref="saveColorTagInput"
                      v-model="item.skuValueNameNew"
                      size="small"
                    >
                    </el-input>
                    <el-button
                      class="button-new-tag"
                      size="small"
                      @click="handleConfirm(item.skuKeyName,item)"
                    >增加</el-button>

                  </el-form-item>
                </el-card>

              </el-card>
            </el-form-item>

          </el-col>
        </el-row>

        <el-form-item v-if="NxtStructProduct.withSku==true">
          <el-card shadow="never">

            <el-table
              ref="multipleTable"
              :data="NxtStructProduct.skuValuePriceEtcList"
              tooltip-effect="dark"
              style="width: 100%;"
            >
              <el-table-column label="规格名称">
                <template slot-scope="scope">{{ scope.row.skuValueName1 }},{{ scope.row.skuValueName2 }}</template>
              </el-table-column>
              <el-table-column label="库存">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.skuValueInventoryQuantity" />
                </template>
              </el-table-column>
              <el-table-column label="价格">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.skuValuePrice" />
                </template>
              </el-table-column>
              <el-table-column label="折扣">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.skuValuePriceDiscount" />
                </template>
              </el-table-column>
              <el-table-column>
                <span class="tips">&nbsp;&nbsp;1表示不打折，0.95是95折，以此类推。</span>
              </el-table-column>
              <el-table-column>
              </el-table-column>
            </el-table>

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
            v-model="NxtStructProduct.productDescription"
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

          推荐
          <el-switch v-model="NxtStructProduct.isRecommend" />
          热卖
          <el-switch v-model="NxtStructProduct.isHot" />
          新品
          <el-switch v-model="NxtStructProduct.isNew" />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="handleCreate"
          >发布</el-button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          立即上架
          <el-switch v-model="NxtStructProduct.isSelling" />
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
      NxtStructProduct: {
        id: null,
        categoryId: null,
        brandId: null,
        productName: '',
        productSubtitle: '',
        productTags: '',
        productRatings: null,
        externalUrl: '',
        dealQuantityMin: 1,
        dealQuantityMax: 10,
        freeShipping: false,
        deliveryConfigId: null,
        itemNo: '',
        withSku: false,
        price: 0,
        priceDiscount: 1,
        inventoryQuantity: 100,
        productDescription: '',
        isRecommend: false,
        isHot: false,
        isNew: true,
        isSelling: true,
        isTrash: false,
        skuList: [],
        skuValuePriceEtcList: [],
        pictureList: [],
      },
      NxtStructProductSku: {
        skuId: null,
        skuKeyName: null,
        skuValueList: []
      },
      NxtStructProductSkuValue: {
        id: null,
        skuId: null,
        skuValueName: null,
      },
      NxtStructProductSkuValuePriceEtc: {
        skuValueName1: null,
        skuValueName2: null,
        skuValueInventoryQuantity: 100,
        skuValuePrice: 0,
        skuValuePriceDiscount: 1,
      },
      NxtStructProductPicture: {
        id: null,
        url: null,
      },

      checked: false,
      formLabelAlign: {
        product_name: '',
        product_description: '',
        category_id: '',
        is_recommend: false,
        product_picture_list: [],
        product_subtitle: '',//副
        price: '',
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


      ColorinputVisible: false,
      AttributeNameinputVisible: false,

      ColorinputValue: '',
      AttributeNameinputValue: '',
      inputValue: ''

    }
  },
  computed: {
    ...mapState({
      category_list: state => state.product.CategoryListData,
      delivery_config_list: state => state.delivery.deliveryConfigList,
      brand_list: state => state.brand.brandList,
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
    this.$store.dispatch('brand/getBrandList')
    this.$store.dispatch('delivery/getDeliveryConfigList')
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
    handleColorClose (skuKeyName, skuValueItem) {

      var than = this;

      var num = -1;
      this.NxtStructProduct.skuList.forEach((element,index) => {
        if (element.skuKeyName === skuKeyName) {
          num = index;
          element.skuValueList.splice(element.skuValueList.indexOf(skuValueItem), 1);
          if (element.skuValueList.length == 0) {
            this.NxtStructProduct.skuList.splice(this.NxtStructProduct.skuList.indexOf(element), 1)
          }
          return
        }
      });


      
      for (var i = than.NxtStructProduct.skuValuePriceEtcList.length - 1; i >= 0; i--) {

        var itemPriceEtc = than.NxtStructProduct.skuValuePriceEtcList[i];

        if(num == 0){
              if (itemPriceEtc.skuValueName1 == skuValueItem.skuValueName) {
                if(than.NxtStructProduct.skuList.length == 1){
                  //不删
                  than.NxtStructProduct.skuValuePriceEtcList[i]["skuValueName1"] = null;
                }
                else{
                  //删
                  than.NxtStructProduct.skuValuePriceEtcList.splice(i, 1)
                }
              }
          }
          if(num == 1){
            if (itemPriceEtc.skuValueName2 == skuValueItem.skuValueName) {
              if(than.NxtStructProduct.skuList.length == 1){
                //不删
                than.NxtStructProduct.skuValuePriceEtcList[i]["skuValueName2"] = null;
              }
              else{
                //删
                than.NxtStructProduct.skuValuePriceEtcList.splice(i, 1)
              }
            }
          }

      }


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

    handleConfirm (skuKeyName, skuItem) {
      var than = this;
      if (skuItem.skuValueNameNew) {
        var num = 0;
        than.NxtStructProduct.skuList.forEach(element => {
          num++;
          if (element.skuKeyName === skuKeyName) {

            element.skuValueList.push({ 'skuValueName': skuItem.skuValueNameNew })

            if (than.NxtStructProduct.skuList.length == 1) {
              var itemSkuValuePriceEtc = JSON.parse(JSON.stringify(than.NxtStructProductSkuValuePriceEtc))
              itemSkuValuePriceEtc.skuValueName1 = skuItem.skuValueNameNew
              than.NxtStructProduct.skuValuePriceEtcList.push(itemSkuValuePriceEtc)
            }
            element.skuValueName = null
            return
          }
          else {
            element.skuValueList.forEach(skuValue => {
              var skuValueName1 = skuItem.skuValueNameNew;
              var skuValueName2 = skuValue.skuValueName;
              if (num == 1) {
                [skuValueName1, skuValueName2] = [skuValueName2, skuValueName1];
              }
              var itemSkuValuePriceEtc = JSON.parse(JSON.stringify(than.NxtStructProductSkuValuePriceEtc))
              itemSkuValuePriceEtc.skuValueName1 = skuValueName1
              itemSkuValuePriceEtc.skuValueName2 = skuValueName2
              than.NxtStructProduct.skuValuePriceEtcList.push(itemSkuValuePriceEtc)
            });
            for (var i = than.NxtStructProduct.skuValuePriceEtcList.length - 1; i >= 0; i--) {
              var itemPriceEtc = than.NxtStructProduct.skuValuePriceEtcList[i];
              if (itemPriceEtc.skuValueName1 == null || itemPriceEtc.skuValueName2 == null) {
                than.NxtStructProduct.skuValuePriceEtcList.splice(i, 1)
              }
            }
          }
        });

      }
    },

    handleInputConfirm () {
      let skuKeyName = this.AttributeNameinputValue;
      if (this.NxtStructProduct.skuList.length >= 2) {
        return
      }
      if (skuKeyName) {
        var sku = JSON.parse(JSON.stringify(this.NxtStructProductSku));
        sku.skuKeyName = skuKeyName;
        this.NxtStructProduct.skuList.push(sku)
      }
      this.AttributeNameinputVisible = false;
      this.AttributeNameinputValue = '';
    },
    //
    handleCreate () {
      this.$myLoading.myLoading.loading()
      const then = this
      this.$store.dispatch('product/createProduct', this.NxtStructProduct).then(res => {
        then.$myLoading.myLoading.closeLoading()
        this.$message({
          message: '创建成功！',
          type: 'success'
        })
        if (res.status === 0) {
          this.$router.replace({ path: '/product/product' })
        }
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

        var picObject = JSON.parse(JSON.stringify(this.NxtStructProductPicture));
        picObject.id = response.id
        picObject.url = response.url

        this.NxtStructProduct.pictureList.push(picObject);

        this.productForm.productPicList.push(response.url)
        this.productForm.productObj.push(picObject)
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
      this.productForm.productObj.splice(index, 1)
      this.NxtStructProduct.pictureList.splice(index, 1)
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

  .input_small {
    width: 80%;
  }
  .tips {
    font-size: 14px;
    color: #8c939d;
  }
}
</style>

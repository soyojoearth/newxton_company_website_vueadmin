<template>
  <div class="app-container">
    <div v-show="showPage === 'homePage'">
      <el-card class="operatingHints">
        <el-row style="font-weight:800;">
          操作提示：
        </el-row>
        <el-row>
          1、订单列表，可查看订单详情、费用、对应商品、发货状态、物流信息等。
        </el-row>
        <el-row>
          2、可在订单详情里面“打印订单”。
        </el-row>
        <el-row>
          3、可在订单详情里面填写发货信息，进行发货。
        </el-row>
      </el-card>

      <el-card class="operatingHints">
        <el-row style="margin-top: 10px">
          <el-col :span="18" :offset="7">
            <el-date-picker
              v-model="starDate"
              type="date"
              :picker-options="beginDateAfter"
              format="yyyy-MM-dd"
              placeholder="请输入开始日期"
              :clearable="true"
            />
            <span class="date-in">~</span>
            <el-date-picker
              v-model="endDate"
              type="date"
              format="yyyy-MM-dd"
              :picker-options="beginDateBefore"
              placeholder="请输入结束时间"
              :clearable="true"
            />
            <el-select v-model="searchBean.isPaid" placeholder="支付状态" :clearable="true">
              <el-option
                v-for="item in payList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select v-model="searchBean.isDelivery" placeholder="发货状态" :clearable="true">
              <el-option
                v-for="item in deliveryList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select v-model="searchBean.dealPlatform" placeholder="成交终端" :clearable="true">
              <el-option
                v-for="item in platformList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-button type="primary" @click="searchAction">筛选</el-button>
          </el-col>
        </el-row>
        <el-card style="margin:10px 10px">
          <el-row style="font-weight:800;">
            <el-col :span="1">
              <el-checkbox v-model="allChecked" @change="allCheckedAction" disabled/>
            </el-col>
            <el-col :span="4" :offset="1">
              <span>商品信息</span>
            </el-col>
            <el-col :span="2">
              <span>商品清单</span>
            </el-col>
            <el-col :span="2">
              <span>订单总金额</span>
            </el-col>
            <el-col :span="2">
              <span>买家</span>
            </el-col>
            <el-col :span="4">
              <span>收货信息</span>
            </el-col>
            <el-col :span="2">
              <span>配送方式</span>
            </el-col>
            <el-col :span="2">
              <span>交易状态</span>
            </el-col>
            <el-col :span="2">
              <span>操作</span>
            </el-col>
          </el-row>
        </el-card>
        <div style="overflow: auto;max-height: 450px">
          <el-card v-for="item in listData" style="margin:10px 10px 0 10px;min-height: 100px">
            <el-row>
              <el-col :span="4" style="margin-left: 10px">
                <span>下单时间：{{ item.datelineCreateReadable }}</span>
              </el-col>
              <el-col :span="6">
                <span>订单编号：{{ item.serialNum }}</span>
              </el-col>
              <el-divider />
            </el-row>
            <el-row style="margin:10px 10px 0 0" type="flex" align="middle">
              <el-col :span="1">
                <el-checkbox v-model="item.rowChecked" @change="rowCheckedAction(item)"/>
              </el-col>

              <el-col :span="6">
                <el-row v-for="itm in item.orderFormProductList">
                  <el-col :span="20">
                    <el-row type="flex" align="middle">
                      <el-col :span="6" :offset="1">
                        <el-image :src="itm.picUrl" class="brandImg" />
                      </el-col>
                      <el-col :span="18" :offset="1">
                        <div>
                          {{ itm.productName }}{{itm.picUrl}}
                        </div>
                        <div>
                          <span>规格：</span>
                          <span v-for="itmi in itm.productSku"> {{ itmi.skuKeyName }}/{{ itmi.skuValueName }}</span>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="4">
                    <el-row type="flex" align="middle">
                      <!--                <el-divider direction="vertical"></el-divider>-->
                      <span>¥{{ itm.productPrice }}</span>
                      <span>/件</span>
                    </el-row>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="3">
                <el-row style="text-align: center">¥{{ item.amountFinally }}</el-row>
                <el-row style="text-align: center">（运费：¥{{ item.deliveryCost }}）</el-row>
                <el-row style="text-align: center">支付方式：无</el-row>
                <el-row style="text-align: center">成交终端：{{ item.dealPlatform }}</el-row>
              </el-col>
              <el-col :span="2">
                <el-row style="text-align: center">{{ item.deliveryPerson }}</el-row>
              </el-col>
              <el-col :span="4">
                <el-row style="text-align: left">{{ item.deliveryPerson }}</el-row>
                <el-row style="text-align: left">电话：{{ item.deliveryPhone }}</el-row>
                <el-row style="text-align: left">地址：{{ item.deliveryAddress }}</el-row>
              </el-col>
              <el-col :span="2">
                <el-row style="text-align: center">{{ item.deliveryConfigName }}</el-row>
              </el-col>
              <el-col :span="2">
                <el-row style="text-align: center">{{ item.paid? '已付款' : '未付款' }}</el-row>
                <el-row style="text-align: center">{{ item.delivery? '已发货' : '未发货' }}</el-row>
                <el-row style="text-align: center">{{ item.done? '已完成' : '未完成' }}</el-row>
              </el-col>
              <el-col :span="2">
                <el-button type="text" @click="showDetail(item)">查看详情</el-button>
              </el-col>
            </el-row>
          </el-card>
          <el-card style="margin:10px 10px 0 10px;min-height: 100px">
            <el-row>
              <el-col :offset="8">
                <el-button type="primary" icon="el-icon-arrow-left" @click="handlePage(-1)">上一页</el-button>
                <el-button>{{ searchBean.offset }} / {{ pageCount }}</el-button>
                <el-button type="primary" icon="el-icon-arrow-right" @click="handlePage(1)">下一页</el-button>
              </el-col>
            </el-row>
          </el-card>
        </div>
        <el-row style="margin-top: 10px">
          <el-col :span="2">
            <el-button type="primary">选中导出Excel数据</el-button>
          </el-col>

        </el-row>
      </el-card>
    </div>
    <div v-show="showPage === 'editorPage'">
      <el-card class="operatingHints">
        <el-row style="font-weight:800;">
          操作提示：
        </el-row>
        <el-row>
          1、订单列表，可查看订单详情、费用、对应商品、发货状态、物流信息等。
        </el-row>
        <el-row>
          2、可在订单详情里面“打印订单”。
        </el-row>
        <el-row>
          3、可在订单详情里面填写发货信息，进行发货。
        </el-row>
      </el-card>
      <el-row style="margin-top: 10px">
        <el-col :span="2">
          <el-button @click="showListPag">返回</el-button>
        </el-col>
        <el-col :span="2" :offset="9">
          <el-button type="primary" @click="printOrder">打印订单</el-button>
        </el-col>
      </el-row>

      <el-card class="operatingHints">
        <el-row style="margin-top: 10px">
          基本信息
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="4" :offset="1">
            订单编号：{{ detailData.serialNum }}
          </el-col>
          <el-col :span="4" :offset="2">
            会员ID：{{ detailData.userId }}
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="4" :offset="1">
            成交平台：{{ detailData.dealPlatform }}
          </el-col>
          <el-col :span="4" :offset="2">
            下单时间：{{ detailData.datelineCreateReadable }}
          </el-col>
          <el-col :span="4" :offset="2">
            付款时间：{{ detailData.datelinePaidReadable != null ? detailData.datelinePaidReadable: '- -' }}
          </el-col>
        </el-row>
        <el-divider />
        <el-row style="margin-top: 10px">
          <el-col :span="2">
            收货信息
          </el-col>
          <el-col :span="2" :offset="20">
            <el-button type="primary" size="small" @click="modifyAddress(detailData)">修改收货信息</el-button>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="4" :offset="1">
            收货人：{{ detailData.deliveryPerson }}
          </el-col>
          <el-col :span="4" :offset="2">
            联系方式：{{ detailData.deliveryPhone }}
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :offset="1">
            收货地址：{{ detailData.deliveryAddress }}
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="4" :offset="1">
            邮编：{{ detailData.deliveryPostcode }}
          </el-col>
          <el-col :span="4" :offset="2">
            配送方式：{{ detailData.deliveryConfigName }}
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="4" :offset="1">
            留言：{{ detailData.deliveryRemark }}
          </el-col>
        </el-row>
        <el-divider />
        <el-row style="margin-top: 10px">
          <el-col :span="2">
            商品信息
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="22" :offset="1">
            <el-table ref="multipleTable" :data="detailData.orderFormProductList" tooltip-effect="dark">
              <el-table-column prop="productId" label="货号" />
              <el-table-column prop="brandName" label="商品信息">
                <template slot-scope="scope">
                  <img :src="scope.row.picUrl" class="brandImg">
                  <span>{{ scope.row.productName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="brandName" label="规格">
                <template slot-scope="scope">
                  <span v-for="data in scope.row.productSku">{{ data.skuValueName }} </span>
                </template>
              </el-table-column>
              <el-table-column prop="quantity" label="数量" />
              <el-table-column prop="" label="商品价格">
                <template slot-scope="scope">
                  <span>￥{{ scope.row.productPrice }} </span>
                </template>
              </el-table-column>
              <el-table-column prop="" label="成交价">
                <template slot-scope="scope">
                  <span>￥{{ scope.row.productPriceDeal }} </span>
                </template>
              </el-table-column>
              <el-table-column prop="" label="金额小计">
                <template slot-scope="scope">
                  <span>￥{{ scope.row.productPriceDeal }} </span>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="4" :offset="20">
            订单总额：¥ {{ detailData.amountFinally }}
          </el-col>
        </el-row>
        <el-divider />
        <el-row style="margin-top: 10px">
          <el-col :span="2">
            费用信息
          </el-col>
          <el-col :span="2" :offset="20">
            <el-button type="primary" size="small" @click="adjustPrice(detailData)">调整价格</el-button>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="4" :offset="1">
            总计: {{ detailData.amountInitial }}
          </el-col>
          <el-col :span="4" :offset="2">
            运费： {{ detailData.deliveryCost }}
          </el-col>
          <el-col :span="4" :offset="2">
            运费调整： {{ detailData.manualDeliveryCostDiscount }}
          </el-col>
          <el-col :span="4" :offset="2">
            价格调整:  {{ detailData.amountDiscount }}
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="4" :offset="1">
            总计应付： {{ detailData.amountFinally }}
          </el-col>
        </el-row>
        <el-divider />
        <el-row style="margin-top: 10px">
          <el-col :span="2">
            操作信息
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="1" :offset="1">
            操作备注
          </el-col>
          <el-col :span="21">
            <el-input v-model="detailData.deliveryRemark" disabled type="textarea" style="width: 100%" placeholder="请输入内容" maxlength="30" show-word-limit />
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="2" :offset="2">
            <el-button v-if="!detailData.delivery" type="primary" size="small" @click="deliveryAction(detailData.id)">发货</el-button>
<!--            <el-button v-else type="primary" size="small" @click="unDeliveryAction">取消发货</el-button>-->
          </el-col>
          <el-col :span="2" :offset="2">
            <el-button v-if="detailData.delivery" type="primary" size="small" @click="modifyChangeFast(detailData)">修改快递信息</el-button>
          </el-col>
        </el-row>
        <el-divider />
        <el-row style="margin-top: 10px">
          <el-col :span="2">
            操作记录
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="22" :offset="1">
            <!--            <el-table ref="multipleTable" :data="listData" tooltip-effect="dark" >-->
            <!--              <el-table-column prop="brandName" label="操作者">-->

            <!--              </el-table-column>-->
            <!--              <el-table-column prop="brandName" label="操作时间">-->

            <!--              </el-table-column>-->
            <!--              <el-table-column prop="" label="付款状态">-->
            <!--                <template slot-scope="scope">-->
            <!--                </template>-->
            <!--              </el-table-column>-->
            <!--              <el-table-column prop="" label="发货状态">-->
            <!--                <template slot-scope="scope">-->
            <!--                </template>-->
            <!--              </el-table-column>-->
            <!--              <el-table-column prop="brandName" label="操作描述">-->

            <!--              </el-table-column>-->
            <!--              <el-table-column prop="brandName" label="备注">-->

            <!--              </el-table-column>-->
            <!--            </el-table>-->
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="2" :offset="1">
            商家内入订单备注
          </el-col>
          <el-col :span="20">
            <el-input v-model="detailData.sellerRemark" type="textarea" style="width: 100%" placeholder="请输入内容" maxlength="30" show-word-limit />
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="2" :offset="3">
            <el-button type="primary" @click="updateAction(detailData)">更新</el-button>
          </el-col>
        </el-row>
      </el-card>

      <el-dialog title="价格调整" :visible.sync="priceDialog" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false" width="500px" center>
        <el-form ref="dialogRef" :model="priceParam" :rules="priceParamRules" :label-width="formLabelWidth">
          <el-form-item label="商品总价" prop="amountInitial">
            <span>{{ priceParam.amountInitial }}</span>
          </el-form-item>
          <el-form-item label="运费" prop="deliveryCost">
            <span>{{ priceParam.deliveryCost }}</span>
          </el-form-item>
          <el-form-item label="运费调整" prop="manualDeliveryCostDiscount">
            <el-input-number v-model="priceParam.manualDeliveryCostDiscount" style="width: 200px" :controls="false" />
          </el-form-item>
          <el-form-item label="价格微调" prop="manualAmountDiscount">
            <el-input-number v-model="priceParam.manualAmountDiscount" style="width: 200px" :controls="false" />
          </el-form-item>
        </el-form>
        <div style="margin-left: 120px">
          <el-button type="primary" @click="savePrice">确 定</el-button>
          <el-button @click="priceDialog = false">取 消</el-button>
        </div>
        <div style="margin-left: 30px;margin-top: 20px;color: red">
          请输入要调整的金额, 正数价格上调, 负数价格下调, 0维持原价
        </div>
      </el-dialog>

      <el-dialog title="发货信息" :visible.sync="deliveryDialog" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false" width="500px" center>
        <el-form ref="deliveryRef" :model="deliveryParam" :rules="deliveryParamRules" :label-width="formLabelWidth">
          <el-form-item label="物流公司" prop="deliveryCompanyId">
            <el-select v-model="deliveryParam.deliveryCompanyId" placeholder="--请选择--">
              <el-option v-for="item in $store.state.delivery.deliveryCompanyList" :key="item.id" :label="item.name" :value="item.id">
                {{ item.name }}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="快递单号" prop="deliverySerialNum">
            <el-input v-model="deliveryParam.deliverySerialNum" style="width: 200px" :controls="false" />
          </el-form-item>
          <el-form-item label="操作备注" prop="remark">
            <el-input v-model="deliveryParam.remark" type="textarea" style="width: 200px" :controls="false" />
          </el-form-item>
        </el-form>
        <div style="margin-left: 120px">
          <el-button type="primary" @click="saveDelivery">确 定</el-button>
          <el-button @click="deliveryDialog = false">取 消</el-button>
        </div>
      </el-dialog>

      <el-dialog title="修改收货地址" :visible.sync="addressDialog" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false" width="500px" center>
        <el-form ref="addressRef" :model="addressParam" :rules="addressParamRules" :label-width="formLabelWidth">
          <el-form-item label="收货人" prop="deliveryPerson">
            <el-input v-model="addressParam.deliveryPerson" style="width: 200px" :controls="false" />
          </el-form-item>
          <el-form-item label="手机" prop="deliveryPhone">
            <el-input v-model="addressParam.deliveryPhone" style="width: 200px" :controls="false" />
          </el-form-item>
          <el-form-item label="邮编" prop="deliveryPostcode">
            <el-input v-model="addressParam.deliveryPostcode" style="width: 200px" :controls="false" />
          </el-form-item>
          <el-form-item label="国家" prop="">
            <el-select placeholder="- 选择国家（不选不改） -" disabled>
            </el-select>
          </el-form-item>
          <el-form-item label="省份" prop="">
            <el-select placeholder="- 选择省份（不选不改） -" disabled>
            </el-select>
          </el-form-item>
          <el-form-item label="城市" prop="">
            <el-select placeholder="- 选择城市（不选不改） -" disabled>
            </el-select>
          </el-form-item>
          <el-form-item label="地址" prop="deliveryAddress">
            <el-input v-model="addressParam.deliveryAddress" type="textarea" style="width: 200px" :controls="false" />
          </el-form-item>

          <el-form-item label="备注" prop="deliveryRemark">
            <el-input v-model="addressParam.deliveryRemark" style="width: 200px" :controls="false" />
          </el-form-item>
          <el-form-item label="配送方式" prop="">
            <el-select disabled placeholder="- 选择运费模板（不选不改） -">
            </el-select>
          </el-form-item>
        </el-form>
        <div style="margin-left: 120px">
          <el-button type="primary" @click="saveAddress">确 定</el-button>
          <el-button @click="addressDialog = false">取 消</el-button>
        </div>
      </el-dialog>

    </div>
    <div v-show="showPage === 'printPage'">
      <div  id="printTest">
        <el-row style="margin-top: 10px">
          <el-col :span="6" :offset="10">
            <h1>订单信息</h1>
          </el-col>
        </el-row>
        <el-card class="operatingHints">
          <el-row style="margin-top: 10px">
            基本信息
          </el-row>
          <el-row style="margin-top: 10px">
            <el-col :offset="1">
              订单编号：{{ detailData.serialNum }}
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px">
            <el-col :span="4" :offset="1">
              会员ID：{{ detailData.userId }}
            </el-col>
            <el-col :span="4" :offset="1">
              成交平台：{{ detailData.dealPlatform }}
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px">
            <el-col :span="8" :offset="1">
              下单时间：{{ detailData.datelineCreateReadable }}
            </el-col>
            <el-col :span="8" :offset="2">
              付款时间：{{ detailData.datelinePaidReadable != null ? detailData.datelinePaidReadable: '- -' }}
            </el-col>
          </el-row>
          <el-divider />
          <el-row style="margin-top: 10px">
            <el-col :span="2">
              收货信息
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px">
            <el-col :span="4" :offset="1">
              收货人：{{ detailData.deliveryPerson }}
            </el-col>
            <el-col :span="4" :offset="2">
              联系方式：{{ detailData.deliveryPhone }}
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px">
            <el-col :offset="1">
              收货地址：{{ detailData.deliveryAddress }}
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px">
            <el-col :span="4" :offset="1">
              邮编：{{ detailData.deliveryPostcode }}
            </el-col>
            <el-col :span="8" :offset="2">
              配送方式：{{ detailData.deliveryConfigName }}
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px">
            <el-col :span="4" :offset="1">
              留言：{{ detailData.deliveryRemark }}
            </el-col>
          </el-row>
          <el-divider />
          <el-row style="margin-top: 10px">
            <el-col :span="2">
              商品信息
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px">
            <el-col :span="22" :offset="1">
              <el-table ref="multipleTable" :data="detailData.orderFormProductList" tooltip-effect="dark">
                <el-table-column prop="productId" label="货号" width="60px" />
                <el-table-column prop="brandName" label="商品信息" width="180px">
                  <template slot-scope="scope">
                    <img :src="scope.row.picUrl" class="brandImg">
                    <span>{{ scope.row.productName }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="brandName" label="规格" width="60px">
                  <template slot-scope="scope">
                    <span v-for="data in scope.row.productSku">{{ data.skuValueName }} </span>
                  </template>
                </el-table-column>
                <el-table-column prop="quantity" label="数量" width="60px" />
                <el-table-column prop="" label="商品价格" width="90px">
                  <template slot-scope="scope">
                    <span>￥{{ scope.row.productPrice }} </span>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="成交价" width="90px">
                  <template slot-scope="scope">
                    <span>￥{{ scope.row.productPriceDeal }} </span>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="金额小计" width="90px">
                  <template slot-scope="scope">
                    <span>￥{{ scope.row.productPriceDeal }} </span>
                  </template>
                </el-table-column>
                <el-table-column/>
              </el-table>
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px">
            <el-col :span="8" :offset="18">
              订单总额：¥ {{ detailData.amountFinally }}
            </el-col>
          </el-row>
          <el-divider />
          <el-row style="margin-top: 10px">
            <el-col :span="2">
              费用信息
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px">
            <el-col :span="4" :offset="1">
              总计: {{ detailData.amountInitial }}
            </el-col>
            <el-col :span="4" :offset="2">
              运费： {{ detailData.deliveryCost }}
            </el-col>
            <el-col :span="4" :offset="2">
              运费调整： {{ detailData.manualDeliveryCostDiscount }}
            </el-col>
            <el-col :span="4" :offset="2">
              价格调整:  {{ detailData.amountDiscount }}
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px">
            <el-col :span="4" :offset="1">
              总计应付： {{ detailData.amountFinally }}
            </el-col>
          </el-row>
        </el-card>
      </div>
      <el-row style="margin-top: 10px" class="no-print">
        <el-col :span="2" :offset="9">
          <el-button v-print="'#printTest'" type="primary">打印</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="showEditorPag(detailData)">返回</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    const validateDeliveryCompanyId = (rule, value, callback) => {
      if (value == null || value.length === 0) {
        callback(new Error('物流公司不能为空'))
      } else {
        callback()
      }
    }
    const validateDeliverySerialNum = (rule, value, callback) => {
      if (value == null || value.length === 0) {
        callback(new Error('快递单号不能为空'))
      } else {
        callback()
      }
    }
    const validateDeliveryPerson = (rule, value, callback) => {
      if (value == null || value.length === 0) {
        callback(new Error('收货人不能为空'))
      } else {
        callback()
      }
    }
    const validateDeliveryPhone = (rule, value, callback) => {
      if (value == null || value.length === 0) {
        callback(new Error('手机不能为空'))
      } else {
        callback()
      }
    }
    const validateDeliveryPostcode = (rule, value, callback) => {
      if (value == null || value.length === 0) {
        callback(new Error('邮编不能为空'))
      } else {
        callback()
      }
    }
    const validateDeliveryAddress = (rule, value, callback) => {
      if (value == null || value.length === 0) {
        callback(new Error('内部地址不能为空'))
      } else {
        callback()
      }
    }
    const validateDeliveryRemark = (rule, value, callback) => {
      if (value == null || value.length === 0) {
        callback(new Error('备注不能为空'))
      } else {
        callback()
      }
    }

    return {
      searchBean: {
        offset: 1,
        limit: 10
      },
      payList: [{
        value: true,
        label: '已支付'
      }, {
        value: false,
        label: '未支付'
      }],
      deliveryList: [{
        value: true,
        label: '已发货'
      }, {
        value: false,
        label: '未发货'
      }],
      platformList: [{
        value: 0,
        label: 'web'
      }, {
        value: 1,
        label: 'ios'
      }, {
        value: 2,
        label: 'android'
      }, {
        value: 3,
        label: 'wx'
      }],
      // 开始日期选中
      starDate: new Date(new Date().getTime() - 5 * 24 * 3600 * 1000),
      // 结束日期选中
      endDate: new Date(),
      // 开始日期选择限制
      beginDateAfter: {
        disabledDate: (time) => {
          return time.getTime() > Date.now() || time.getTime() > this.endDate
        }
      },
      // 结束日期选择限制
      beginDateBefore: {
        disabledDate: (time) => {
          return time.getTime() > Date.now() || this.starDate > time.getTime()
        }
      },
      listData: [],
      pageCount: 0,
      showPage: 'homePage',
      allChecked: false,
      allCheckedId: [],
      rowChecked: false,
      detailData: {},
      priceParam: {},
      priceDialog: false,
      priceParamRules: {
      },
      formLabelWidth: '140px',
      deliveryParam: {},
      deliveryDialog: false,
      deliveryParamRules: {
        deliveryCompanyId: [{ required: true, trigger: 'blur', validator: validateDeliveryCompanyId }],
        deliverySerialNum: [{ required: true, trigger: 'blur', validator: validateDeliverySerialNum }]
      },
      addressParam: {},
      addressDialog: false,
      addressParamRules: {
        deliveryPerson: [{ required: true, trigger: 'blur', validator: validateDeliveryPerson }],
        deliveryPhone: [{ required: true, trigger: 'blur', validator: validateDeliveryPhone }],
        deliveryPostcode: [{ required: true, trigger: 'blur', validator: validateDeliveryPostcode }],
        deliveryAddress: [{ required: true, trigger: 'blur', validator: validateDeliveryAddress }],
        deliveryRemark: [{ required: true, trigger: 'blur', validator: validateDeliveryRemark }],
      }
    }
  },
  computed: {
  },
  created() {
  },
  mounted() {
    this.searchDate()
    this.$store.dispatch('delivery/getDeliveryCompanyList')
    this.$store.dispatch('delivery/getDeliveryConfigList')
  },
  methods: {
    searchDate() {
      this.$store.dispatch('orderForm/searchListData', this.searchBean).then(() => {
        this.listData = this.$store.state.orderForm.listData
        this.pageCount = this.$store.state.orderForm.countData
        console.log(this.allCheckedId)
        if (this.allCheckedId != null && this.allCheckedId.length > 0) {
          if (this.listData != null && this.listData.length > 0) {
            for (const i in this.listData) {
              for (const j in this.allCheckedId) {
                if (this.listData[i].id === this.allCheckedId[j]) {
                  this.$set(this.listData[i], 'rowChecked', false)
                }
              }
            }
          }
        }
      })
    },
    // 筛选操作
    searchAction() {
      if (this.starDate != null) {
        this.searchBean.datelineBegin = this.dateFormat('YYYY-mm-dd', this.starDate)
      } else {
        this.searchBean.datelineBegin = null
      }
      if (this.endDate != null) {
        this.searchBean.datelineEnd = this.dateFormat('YYYY-mm-dd', this.endDate)
      } else {
        this.searchBean.datelineEnd = null
      }
      this.searchDate()
    },
    // 日期格式
    dateFormat(fmt, date) {
      let ret
      const opt = {
        'Y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'H+': date.getHours().toString(), // 时
        'M+': date.getMinutes().toString(), // 分
        'S+': date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      }
      for (const k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
        }
      }
      return fmt
    },
    handlePage(page) {
      if (this.searchBean.offset + page < 1 || this.searchBean.offset + page > this.pageCount) {
        return false
      }
      this.searchBean.offset = this.searchBean.offset + page
      this.searchDate()
    },
    allCheckedAction() {
      this.allCheckedId = []
      if (this.allChecked) {
        if (this.listData != null && this.listData.length > 0) {
          for (const i in this.listData) {
            this.$set(this.listData[i], 'rowChecked', true)
            this.rowCheckedAction(this.listData[i])
          }
        }
      } else {
        if (this.listData != null && this.listData.length > 0) {
          for (const i in this.listData) {
            this.$set(this.listData[i], 'rowChecked', false)
          }
        }
      }
    },
    rowCheckedAction(data) {
      const newCheckData = []
      if (!data.rowChecked) {
        this.allChecked = false
        if (this.allCheckedId != null && this.allCheckedId.length > 0) {
          for (const i in this.allCheckedId) {
            if (this.allCheckedId[i] !== data.id) {
              newCheckData.push(this.allCheckedId[i])
            }
          }
          this.allCheckedId = newCheckData
        } else {
          this.allCheckedId.push(data.id)
        }
      } else {
        if (this.allCheckedId != null && this.allCheckedId.length > 0) {
          for (const i in this.allCheckedId) {
            if (this.allCheckedId[i] !== data.id) {
              this.allCheckedId.push(data.id)
            }
          }
        } else {
          this.allCheckedId.push(data.id)
        }
      }
    },
    showDetail(data) {
      this.showDetailInterface(data.id)
      this.showPage = 'editorPage'
    },
    showDetailInterface(id) {
      this.$store.dispatch('orderForm/searchDetailData', { id: id }).then(() => {
        this.detailData = this.$store.state.orderForm.detailData
        console.log(this.detailData)
      })
    },
    showListPag() {
      this.showPage = 'homePage'
    },
    showEditorPag(data) {
      this.showDetailInterface(data.id)
      this.showPage = 'editorPage'
    },
    printOrder() {
      this.showPage = 'printPage'
    },
    modifyAddress(data) {
      this.addressParam = {}
      this.$set(this.addressParam, 'id', data.id)
      this.$set(this.addressParam, 'deliveryCountry', null)
      this.$set(this.addressParam, 'deliveryProvince', null)
      this.$set(this.addressParam, 'deliveryCity', null)
      this.$set(this.addressParam, 'deliveryAddress', data.deliveryAddress)
      this.$set(this.addressParam, 'deliveryPerson', data.deliveryPerson)
      this.$set(this.addressParam, 'deliveryPhone', data.deliveryPhone)
      this.$set(this.addressParam, 'deliveryPostcode', data.deliveryPostcode)
      this.$set(this.addressParam, 'deliveryRemark', data.deliveryRemark)
      this.$set(this.addressParam, 'deliveryConfigId', null)
      this.addressDialog = true
      this.resetForm('addressRef')
    },
    saveAddress() {
      this.$refs.addressRef.validate(valid => {
        if (valid) {
          this.$store.dispatch('orderForm/updateAddress', this.addressParam).then(() => {
            const status = this.$store.state.orderForm.updateAddressStatus
            if (status != null && status === 0) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.showDetailInterface(this.addressParam.id)
              this.addressDialog = false
            } else {
              this.$message({
                type: 'error',
                message: '操作失败'
              })
            }
          })
        }
      })
    },

    adjustPrice(data) {
      this.priceParam = {}
      this.priceParam.id = data.id
      this.priceParam.amountInitial = data.amountInitial
      this.priceParam.deliveryCost = data.deliveryCost
      this.$set(this.priceParam, 'manualDeliveryCostDiscount', 0)
      if (data.manualDeliveryCostDiscount != null) {
        this.priceParam.manualDeliveryCostDiscount = data.manualDeliveryCostDiscount
      }
      this.$set(this.priceParam, 'manualAmountDiscount', 0)
      this.priceDialog = true
    },
    deliveryAction(id) {
      this.deliveryParam = {}
      this.deliveryParam.id = id
      this.deliveryDialog = true
      this.resetForm('deliveryRef')
    },
    saveDelivery() {
      this.$refs.deliveryRef.validate(valid => {
        if (valid) {
          this.$store.dispatch('orderForm/updateDelivery', this.deliveryParam).then(() => {
            const status = this.$store.state.orderForm.updateDeliveryStatus
            if (status != null && status === 0) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.closePriceDialog()
              this.showDetailInterface(this.deliveryParam.id)
              this.deliveryDialog = false
            } else {
              this.$message({
                type: 'error',
                message: '操作失败'
              })
            }
          })
        }
      })
    },
    unDeliveryAction() {

    },
    modifyChangeFast(data) {

      this.deliveryParam = {}
      this.$set(this.deliveryParam, 'id', data.orderFormDelivery.orderFormId)
      this.$set(this.deliveryParam, 'deliveryCompanyId', data.orderFormDelivery.deliveryCompanyId)
      this.$set(this.deliveryParam, 'deliverySerialNum', data.orderFormDelivery.deliverySerialNum)
      this.$set(this.deliveryParam, 'remark', data.deliveryRemark)
      this.deliveryDialog = true
      this.resetForm('deliveryRef')
    },
    updateAction(data) {
      const param = {
        id: data.id,
        remark: data.sellerRemark
      }
      this.$store.dispatch('orderForm/updateRemark', param).then(() => {
        const status = this.$store.state.orderForm.updateRemarkStatus
        if (status != null && status === 0) {
          this.$message({
            type: 'success',
            message: '更新成功'
          })
          this.showDetailInterface(data.id)
        } else {
          this.$message({
            type: 'error',
            message: '更新失败'
          })
        }
      })
    },

    closePriceDialog() {
      this.priceDialog = false
    },
    savePrice() {
      this.$store.dispatch('orderForm/updatePrice', this.priceParam).then(() => {
        const status = this.$store.state.orderForm.updatePriceStatus
        if (status != null && status === 0) {
          this.$message({
            type: 'success',
            message: '调整成功'
          })
          this.closePriceDialog()
          this.showDetailInterface(this.priceParam.id)
        } else {
          this.$message({
            type: 'error',
            message: '调整失败'
          })
        }
      })
    },
    // 重置表单
    resetForm(formName) {
      if (this.$refs[formName] != null) {
        this.$refs[formName].resetFields()
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.brandImg{
  vertical-align: middle;
  max-height: 80px;
}
.operatingHints{
  margin-top:10px;font-size:14px;line-height:30px;
}

.brandImg {
  vertical-align: middle;
  max-height: 80px;
}
</style>

<template>
  <div class="app-container">
    <el-card style="margin-top:10px">
      <el-form ref="form"
               label-position="top"
               label-width="80px"
               :model="form"
               :rules="rules">

        <el-row>
          <el-col :span="24">
            <el-form-item label="模板名称"
                          prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row hidden>
          <el-col :span="24">
            <el-form-item label="计费方式"
                          prop="type">
              <el-radio-group v-model="form.type"
                              @change="changeType">
                <el-radio class="radio"
                          label="3">计件</el-radio>
                <el-radio class="radio"
                          label="1">重量</el-radio>
                <el-radio class="radio"
                          label="2">体积</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-table :data="tableData.filter(data => handleAdd || data.name.toLowerCase().includes(handleAdd.toLowerCase()))"
                  style="width: 100%">
          <el-table-column prop="code"
                           align="center"
                           label="配送区域">
            <template slot-scope="scope">
              {{scope.row.regionList|areaFilters}}
            </template>
          </el-table-column>
          <!-- 起步数量 -->
          <el-table-column prop="billableQuantity"
                           align="center"
                           width="200px"
                           :label="'首'+first">
            <template slot-scope="scope">
              <el-input placeholder="请输入内容"
                        style="width:120px"
                        type="text"
                        onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                        onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'0')}else{this.value=this.value.replace(/\D/g,'')}"
                        v-model="scope.row.billableQuantity"></el-input>
              {{unit}}
            </template>
          </el-table-column>
          <!-- 起步价格 -->
          <el-table-column align="center"
                           prop="billablePrice"
                           label="运费"
                           width="150px">
            <template slot-scope="scope">
              <el-input placeholder="请输入内容"
                        type="number"
                        v-model="scope.row.billablePrice"></el-input>

            </template>

          </el-table-column>
          <!-- 最小续量 -->
          <el-table-column prop="additionQuantity"
                           align="center"
                           width="200px"
                           :label="'续'+Continued">
            <template slot-scope="scope">
              <el-input placeholder="请输入内容"
                        style="width:120px"
                        type="text"
                        onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                        onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'0')}else{this.value=this.value.replace(/\D/g,'')}"
                        v-model="scope.row.additionQuantity"></el-input>
              <span>{{unit}}</span>

            </template>

          </el-table-column>
          <!-- 最小续价格 -->
          <el-table-column prop="additionPrice"
                           align="center"
                           width="150px"
                           label="运费">
            <template slot-scope="scope">
              <el-input placeholder="请输入内容"
                        type="number"
                        v-model="scope.row.additionPrice"></el-input>

            </template>

          </el-table-column>

          <el-table-column align="center"
                           width="200px"
                           label="操作">

            <template slot-scope="scope">
              <el-button size="mini"
                         type="primary"
                         plain
                         @click="handleEdit(scope.$index, scope.row)">
                设置地区
              </el-button>
              <el-button size="mini"
                         type="danger"
                         plain
                         @click="handleDelete(scope.$index, scope.row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-form-item>
          <el-button v-model="handleAdd"
                     size="mini"
                     plain
                     icon="el-icon-plus"
                     @click="handleAdd()">
            添加一行自定义区域
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="handleCreate">确认提交</el-button>

        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog width="70%"
               :visible.sync="dialogVisible">
      <!-- <el-transfer
        :titles="transferTitles"
        :props="{
      key: 'region_id',
      label: 'region_name_display'
    }"
        v-model="selectValue"
        :data="allValue"
      ></el-transfer> -->
      <!-- <many-area-select :selectedData.sync="manyAreaValue"></many-area-select> -->
      <!-- <cn-region-picker v-model="pickCity"
                        :width="500"
                        @on-pick-city="pickedCity = $event">
      </cn-region-picker> -->
      <!-- <el-checkbox :indeterminate="isIndeterminate"
                         v-model="checkAll"
                         @change="handleCheckAllChange">全选</el-checkbox> -->

      <div v-if="allValue.length!==0">
        <el-checkbox v-model="checkAll"
                     @change="handleCheckAllChange"
                     :indeterminate="isIndeterminate"
                     style="width:180px">{{allValue[0].region.regionName}}</el-checkbox>

        <el-checkbox-group v-model="pickCity"
                           @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in allValue[0].sub_region_list"
                       :label="city.region.regionName"
                       :key="city.region.regionName"
                       style="width:180px">{{city.region.regionName}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="handleConfirmArea">确 定</el-button>
      </span>

    </el-dialog>

  </div>
</template>

<script>
import { getAreaList, createFreight } from '@/api/freight'
import { mapState } from 'vuex'
import manyAreaSelect from '@/components/manyAreaSelect/index'
export default {
  components: {
    manyAreaSelect
  },
  filters: {
    areaFilters (val) {
      if (val.length === 0) {
        return '无'
      }
      var array = []
      val.forEach(item => {
        array.push(item.regionName)

      })
      return array.join(',')
    }
  },
  data () {
    return {
      manyAreaValue: '',
      form: {
        name: '',
        type: '3',
        itemList: []
      },

      pickCity: [],
      isIndeterminate: true,
      checkAll: false,
      transferTitles: ['全部地区', '已选择地区'],
      tableData: [],
      pieces: '件数',
      heavy: '重',
      volume: '体积',
      piece: '件',
      stere: '立方米',
      g: '克',
      unit: '件',
      first: '件',
      Continued: '件数',
      dialogVisible: false,
      allValue: [],
      selectValue: [],
      currentRow: '',
      currentIndex: '',
      allArea: [],
      rules: {
        name: [
          { required: true, message: '请输入模板名称', trigger: 'blur' }
        ],
        type: [
          { required: false, message: '请选择活动区域', trigger: 'change' }
        ],

      }
    }
  },

  created () {
    this.getAreaList()
  },
  methods: {
    changeType () {
      this.$confirm('切换计价方式后，当前模板的运费信息将被清空，确定继续吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData = []
        switch (this.form.type) {
          case '1':
            //重量
            this.first = this.heavy
            this.Continued = this.heavy
            this.unit = this.g
            break;
          case '2':
            //体积
            this.first = this.volume
            this.Continued = this.volume
            this.unit = this.stere
            break;
          case '3':
            //件数
            this.first = this.pieces
            this.Continued = this.pieces
            this.unit = this.piece
            break;
        }
      })
    },
    async getAreaList () {
      var res = await getAreaList({})
      this.allValue = res.list
      // this.allArea = res.result[0]
    },
    handleCheckAllChange (val) {
      console.log(val);
      var pickAll = []
      this.allValue[0].sub_region_list.forEach(i => {
        pickAll.push(i.region.regionName)
      })
      this.pickCity = val ? pickAll : [];
      this.isIndeterminate = false;
      console.log(this.pickCity);

    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.allValue[0].sub_region_list.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.allValue[0].sub_region_list.length;

    },
    handleConfirmArea () {
      console.log(this.pickCity);
      var area = []

      if (this.pickCity.length !== 0) {
        this.allValue[0].sub_region_list.forEach(i => {
          this.pickCity.forEach(p => {
            if (i.region.regionName === p) {
              var form = {
                regionId: '',
                regionName: ''
              }
              form.regionId = i.region.id
              form.regionName = i.region.regionName
              area.push(form)
            }
          })

        })
      }
      // if (this.manyAreaValue.length !== 0) {
      //   for (let index = 0; index < this.manyAreaValue.length; index++) {
      //     const element = this.manyAreaValue[index];
      //     var a = element.regionId.split("-")
      //     var b = element.regionName.split("-")
      //     if (a[2] != 0) {
      //       var form = {
      //         regionId: '',
      //         regionName: ''
      //       }
      //       form.regionId = a[2]
      //       form.regionName = b[2]
      //       area.push(form)

      //     } else {

      //       this.allArea.child.forEach(e => {
      //         if (e.regionId == a[1]) {

      //           area = area.concat(e.child)

      //           return
      //         }
      //       })
      //     }

      //   }
      // }
      this.currentRow.regionList = area
      // this.currentRow.selectRegionList = this.manyAreaValue
      this.tableData.splice(this.currentIndex, 1, this.currentRow)
      this.pickCity = []
      // this.allValue = this.allArea
      this.dialogVisible = false
    },
    handleAdd () {
      let row = {
        billableQuantity: 0,
        billablePrice: 0,
        additionQuantity: 0,
        additionPrice: 0,
        regionList: [],
        selectRegionList: []
      }
      this.tableData.push(row)
    },
    // 编辑
    handleEdit (index, row) {
      // console.log(row);
      this.pickCity = []
      // this.manyAreaValue = row.selectRegionList
      row.regionList.forEach(i => {
        this.pickCity.push(i.regionName)
      })
      this.currentIndex = index
      this.currentRow = row
      this.dialogVisible = true
    },
    // 删除行
    handleDelete (index, row) {
      this.tableData.splice(index, 1)
    },
    handleCreate () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          console.log(this.tableData);
          var flag = true
          if (this.tableData.length === 0) {
            flag = false
          } else {

            for (let index = 0; index < this.tableData.length; index++) {
              const element = this.tableData[index];
              for (const key in element) {
                if (key === 'regionList') {
                  if (element[key].length === 0) {
                    flag = false
                    break
                  }
                } else {
                  if (element.hasOwnProperty(key)) {
                    const item = element[key]
                    if (item === '') {
                      flag = false
                      break
                    }
                  }

                }
              }
            }
          }
          if (!flag) {
            this.$message({
              type: 'warning',
              message: '模板中有未填写的值，请检查后提交！'
            })
          } else {
            this.form.itemList = this.tableData

            var res = await createFreight(this.form)
            this.$message({
              message: '创建成功！',
              type: 'success'
            })
            this.$router.replace({ path: '/delivery/config' })
          }
        } else {

          return false;
        }
      });
    },

  }
}
</script>
<style lang="scss" scoped>
>>> .el-transfer {
  display: flex;
  justify-content: center;
  align-items: center;
}
>>> .el-transfer-panel__body {
  height: 500px;
}
>>> .el-transfer-panel__list {
  height: 500px;
}
</style>

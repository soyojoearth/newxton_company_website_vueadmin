<template>
  <div class="app-container">
    <el-row>
      <el-button
        type="primary"
        @click="handleCreate"
      >新增运费模板</el-button>

    </el-row>
    <el-card
      style="margin-top:10px"
      v-if="heavyListData.length"
    >
      <div
        slot="header"
        class="clearfix"
      >
        <span>{{heavyData.name}}</span>
        <el-button
          type="text"
          @click="update_heavy"
        >修改</el-button>
        <el-button
          type="text"
          @click="deleteFreight(heavyData.id)"
        >删除</el-button>
        <span style="float: right; padding: 3px 0">
          类型: 按重量计费
        </span>
      </div>
      <el-table
        ref="multipleTable"
        :data="heavyListData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange_heavy"
      >
        <el-table-column type="selection" />
        <el-table-column
          prop="productName"
          label="配送区域"
        >
          <template slot-scope="scope">
            {{scope.row.regionList|areaFilters}}
          </template>
        </el-table-column>
        <el-table-column
          label="首重量（克）"
          align="center"
        >

          <template slot-scope="scope">
            {{scope.row.billableQuantity}}
          </template>
        </el-table-column>

        <el-table-column
          label="运费（元）"
          align="center"
        >
          <template slot-scope="scope">

            {{scope.row.billablePrice}}

          </template>
        </el-table-column>
        <el-table-column
          label="续重量（克）"
          align="center"
        >
          <template slot-scope="scope">

            {{scope.row.additionQuantity}}

          </template>
        </el-table-column>
        <el-table-column
          label="运费（元）"
          align="center"
        >
          <template slot-scope="scope">

            {{scope.row.additionPrice}}

          </template>
        </el-table-column>

      </el-table>
    </el-card>
    <el-card
      style="margin-top:10px"
      v-if="piecesListData.length"
    >
      <div
        slot="header"
        class="clearfix"
      >
        <span>{{piecesData.name}}</span>
        <el-button
          type="text"
          @click="update_pieces"
        >修改</el-button>
        <el-button
          type="text"
          @click="deleteFreight(piecesData.id)"
        >删除</el-button>
        <span style="float: right; padding: 3px 0">
          类型: 按件数计费
        </span>
      </div>
      <el-table
        ref="multipleTable"
        :data="piecesListData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange_pieces"
      >
        <el-table-column type="selection" />
        <el-table-column
          prop="productName"
          label="配送区域"
        >
          <template slot-scope="scope">
            {{scope.row.regionList|areaFilters}}
          </template>
        </el-table-column>
        <el-table-column
          label="首件数（件）"
          align="center"
        >

          <template slot-scope="scope">
            {{scope.row.billableQuantity}}
          </template>
        </el-table-column>

        <el-table-column
          label="运费（元）"
          align="center"
        >
          <template slot-scope="scope">

            {{scope.row.billablePrice}}

          </template>
        </el-table-column>
        <el-table-column
          label="续件数（件）"
          align="center"
        >
          <template slot-scope="scope">

            {{scope.row.additionQuantity}}

          </template>
        </el-table-column>
        <el-table-column
          label="运费（元）"
          align="center"
        >
          <template slot-scope="scope">

            {{scope.row.additionPrice}}

          </template>
        </el-table-column>

      </el-table>
    </el-card>
    <el-card
      style="margin-top:10px"
      v-if="volumeListData.length"
    >
      <div
        slot="header"
        class="clearfix"
      >
        <span>{{volumeData.name}}</span>
        <el-button
          type="text"
          @click="update_volume"
        >修改</el-button>
        <el-button
          type="text"
          @click="deleteFreight(volumeData.id)"
        >删除</el-button>
        <span style="float: right; padding: 3px 0">
          类型: 按体积计费
        </span>
      </div>
      <el-table
        ref="multipleTable"
        :data="volumeListData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange_volume"
      >
        <el-table-column type="selection" />
        <el-table-column
          prop="productName"
          label="配送区域"
        >
          <template slot-scope="scope">
            {{scope.row.regionList|areaFilters}}
          </template>
        </el-table-column>
        <el-table-column
          label="首体积（立方米）"
          align="center"
        >

          <template slot-scope="scope">
            {{scope.row.billableQuantity}}
          </template>
        </el-table-column>

        <el-table-column
          label="运费（元）"
          align="center"
        >
          <template slot-scope="scope">

            {{scope.row.billablePrice}}

          </template>
        </el-table-column>
        <el-table-column
          label="续体积（立方米）"
          align="center"
        >
          <template slot-scope="scope">

            {{scope.row.additionQuantity}}

          </template>
        </el-table-column>
        <el-table-column
          label="运费（元）"
          align="center"
        >
          <template slot-scope="scope">

            {{scope.row.additionPrice}}

          </template>
        </el-table-column>

      </el-table>
    </el-card>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { mapState } from 'vuex'
import { getFreightList, deleteFreight } from '@/api/freight'
export default {
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
      multipleSelection_heavy: [],
      multipleSelection_pieces: [],
      multipleSelection_volume: [],
      piecesData: [],//件数
      heavyData: [],//重
      volumeData: [],//体积
      piecesListData: [],//件数
      heavyListData: [],//重
      volumeListData: []//体积
    }
  },
  created () {

    this.load()
    // this.$store.dispatch('product/getCategory')

  },
  methods: {
    async load () {
      var res = await getFreightList({})
      res.list.forEach(element => {
        switch (element.type) {
          case 1:
            this.heavyListData = element.itemList
            this.heavyData = element
            break;
          case 2:
            this.volumeListData = element.itemList
            this.volumeData = element
            break;
          case 3:
            this.piecesListData = element.itemList
            this.piecesData = element
            break;
        }
      });
    },


    handleSelectionChange_heavy (val) {
      this.multipleSelection_heavy = val
    },
    handleSelectionChange_pieces (val) {
      this.multipleSelection_pieces = val
    },
    handleSelectionChange_volume (val) {
      this.multipleSelection_volume = val
    },
    async deleteFreight (id) {

      var _this = this
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {

        var res = await deleteFreight({ id: id })
        if (res.status != null && res.status === 0) {

          _this.$router.go(0)

          this.$message({
            type: 'success',
            message: '删除成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: '删除失败'
          })
        }

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },


    handleCreate () {
      this.$router.push({ name: 'CreateFreight' })
    },
    update_heavy () {
      this.$router.push({
        name: 'UpdateFreight', params: {
          list: this.heavyData
        }
      })
    },
    update_pieces () {
      this.$router.push({
        name: 'UpdateFreight', params: {
          list: this.piecesData
        }
      })
    },
    update_volume () {
      this.$router.push({
        name: 'UpdateFreight', params: {
          list: this.volumeData
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>
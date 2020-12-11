<template>
  <div class="app-container">
    <el-card class="operatingHints">
      <el-row style="font-weight:800;">
        操作提示：
      </el-row>
      <el-row>
        1、用户的余额增加、减少情况，都会在这里展示
      </el-row>
      <el-row>
        2、用户下单付款一次，等于1次余额充值+1次余额消费。
      </el-row>
      <el-row>
        3、可按条件查询某用户的余额变动记录。
      </el-row>
    </el-card>

    <el-card class="operatingHints">
      <el-row style="margin-top: 10px">
        <el-col :offset="16">
          <el-select v-model="searchBean.type" placeholder="类型" clearable>
            <el-option v-for="item in isList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-input v-model="searchBean.username" placeholder="用户名" style="width: 150px" />
          <el-button type="primary" @click="searchAction">筛选</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-table ref="multipleTable" :data="listData" tooltip-effect="dark">
          <el-table-column prop="username" label="用户名" width="220px" />
          <el-table-column prop="" label="交易号" width="220px;">
            <template slot-scope="scope">
              <div style="text-align: left;text-overflow: ellipsis;overflow: hidden">{{ scope.row.dateline }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="typeText" label="类型" width="120px" />
          <el-table-column prop="amount" label="金额" width="120px" />
          <el-table-column prop="balance" label="余额" width="120px" />
          <el-table-column prop="datelineReadable" label="时间" />
        </el-table>
      </el-row>
      <el-row style="margin-top:20px">
        <el-col :offset="18">
          <el-button type="primary" icon="el-icon-arrow-left" @click="handlePage(-1)">上一页</el-button>
          <el-button>{{ searchBean.listNumber }} / {{ pageCount }}</el-button>
          <el-button type="primary" icon="el-icon-arrow-right" @click="handlePage(1)">下一页</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>

export default {
  data() {
    return {
      searchBean: {
        offset: 0,
        limit: 10,
        listNumber: 1
      },
      isList: [
        {
          value: 1,
          label: '充值'
        },
        {
          value: 2,
          label: '消费'
        },
        {
          value: 3,
          label: '退款'
        },
        {
          value: 4,
          label: '提现'
        },
        {
          value: 5,
          label: '撤销提现 '
        },
        {
          value: 6,
          label: '佣金结算收入'
        }
      ],
      listData: [],
      pageCount: 0
    }
  },
  computed: {
  },
  watch: {
    $route(to, from) {
      console.log(this.$route.params.username)
    }

  },
  created() {
    if (this.$route.query.username != null) {
      this.$set(this.searchBean, 'username', this.$route.query.username)
    }
  },
  mounted() {
    this.searchDate()
  },
  methods: {
    searchAction() {
      this.$set(this.searchBean, 'offset', 0)
      this.$set(this.searchBean, 'listNumber', 1)
      this.searchDate()
    },
    searchDate() {
      this.$myLoading.myLoading.loading()
      if (this.searchBean.type != null && this.searchBean.type === '') {
        this.searchBean.type = null
      }
      this.$store.dispatch('transaction/getTansactionList', this.searchBean).then(() => {
        this.listData = this.$store.state.transaction.listData
        this.pageCount = Math.ceil(this.$store.state.transaction.countData / this.searchBean.limit)
        const that = this
        that.$myLoading.myLoading.closeLoading()
      })
    },
    handlePage(page) {
      if (this.searchBean.listNumber + page < 1 || this.searchBean.listNumber + page > this.pageCount) {
        return false
      }
      this.searchBean.listNumber = this.searchBean.listNumber + page
      this.searchBean.offset = (this.searchBean.listNumber - 1) * this.searchBean.limit
      this.searchDate()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.operatingHints{
  margin-top:10px;font-size:14px;line-height:30px;
}
</style>

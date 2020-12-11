<template>
  <div class="app-container">
    <el-tabs v-model="activeName"
             @tab-click="handleClick"
             v-if=" JSON.stringify(list) !=='[]'">
      <el-tab-pane v-for="(item,index) in list"
                   :key="index"
                   :label="item.location_name"
                   :name="item.location_name">
        <bannerSet :bannerList="bannerList"
                   :location_name="activeName" />
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
import { list } from '@/api/banner'
import bannerSet from '@/components/bannerSet'
export default {
  components: {
    bannerSet
  },
  data () {
    return {
      list: [],
      activeName: "",
      bannerList: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    handleClick (tab, event) {
      this.list.forEach(element => {

        if (element.location_name === tab.name) {
          this.bannerList = element.banner
          return
        }
      });
    },
    async getList () {
      var res = await list({})
      this.list = res.list
      if (this.list.length !== 0) {

        this.activeName = this.list[0].location_name
        this.bannerList = this.list[0].banner
      }
    }
  }
}
</script>

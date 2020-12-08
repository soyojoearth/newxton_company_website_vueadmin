<template>
  <div class="app-container">
    <el-card shadow="never">
      <div style="padding:0 0 20px 0">
        评论回复
      </div>
      <el-card
        shadow="never"
        class="bottom"
      >
        <div class="itemList">
          <div class="avatar">
            <el-image
              style="width: 50px; height: 50px"
              :src="list.avatar+'?imageView2/1/w/50/h/50/q/75'"
            ></el-image>
          </div>
          <div class="content">
            <div class="top">
              <div class="title">{{list.username}}</div>
              <div class="time">{{list.date}}</div>
            </div>
            <div class="desc">
              <div class="descText">{{list.content}}</div>
              <div class="descImg">
                <div
                  v-for="(i,index) in list.picUrlList"
                  :key="index"
                  style="margin-right:10px"
                >
                  <el-popover trigger="hover">
                    <el-image
                      style="width: 150px; height: 150px;"
                      :src="i+'?imageView2/1/w/100/h/100/q/125'"
                    ></el-image>
                    <el-image
                      slot="reference"
                      style="width: 50px; height: 50px;"
                      :src="i+'?imageView2/1/w/50/h/50/q/75'"
                    ></el-image>

                  </el-popover>

                </div>
              </div>
            </div>
          </div>
        </div>
      </el-card>
      <el-card
        shadow="never"
        v-for="(item,index) in list.replyList"
        :key="index"
        class="bottom"
      >
        <div
          class="itemList"
          :class="index%2===0?'reverse':''"
        >
          <div class="avatar">
            <el-image
              style="width: 50px; height: 50px"
              :src="item.avatar+'?imageView2/1/w/50/h/50/q/75'"
            ></el-image>
          </div>
          <div class="content">
            <div
              class="top"
              :class="index%2===0?'reverse':''"
            >
              <div class="title">{{item.username}}</div>
              <div class="time">{{item.date}}</div>
            </div>
            <div class="desc">
              <div class="descText">{{item.content}}</div>

            </div>
          </div>
        </div>
      </el-card>
      <el-input
        type="textarea"
        :autosize="{ minRows: 6}"
        placeholder="请输入内容"
        v-model="form.content"
      >
      </el-input>
      <el-button
        style="margin-top:20px"
        type="primary"
        @click="handleReply"
      >回复</el-button>
    </el-card>
  </div>
</template>
<script>
import { getDetail, reply } from "@/api/reviews"
export default {
  data () {
    return {
      form: {
        id: '',
        content: ''
      },
      id: '',
      list: {}
    }
  },
  created () {

    this.id = this.$route.params.id
    this.getList()
  },

  methods: {
    async getList () {
      var res = await getDetail({ id: parseInt(this.id) })
      this.list = res.result
      this.form.id = res.result.id
      console.log(this.list);
    },
    async handleReply () {
      var res = await reply(this.form)
      this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
// flex-direction: row-reverse;
.app-container {
  .bottom {
    margin-bottom: 20px;
  }
  .itemList {
    display: flex;
    height: auto;
    width: 100%;
    align-items: flex-start;
    &.reverse {
      flex-direction: row-reverse;
    }
    .avatar {
      padding: 0 20px;
    }
    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      .top {
        display: flex;
        justify-content: space-between;
        &.reverse {
          flex-direction: row-reverse;
        }
      }
      .desc {
        margin-top: 10px;
        background-color: #f2f6fc;
        padding: 10px;
        .descImg {
          display: flex;
          flex-direction: row;
        }
      }
    }
  }
}
</style>
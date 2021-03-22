<template>
  <div class="bus_four blockbg">
    <div class="block_title">今日查岗情况</div>
    <div class="bus_fourmid" v-show="this.listData.length">
      <dl>
        <dt>{{ parseFloat(obj.total).toLocaleString() }}</dt>
        <dd>今日查岗数量</dd>
      </dl>
      <dl>
        <dt>{{ parseFloat(obj.replyIntime).toLocaleString() }}</dt>
        <dd>及时应答数</dd>
      </dl>
      <dl>
        <dt>{{ ((obj.replyIntime / obj.total) * 100).toFixed(0) }}%</dt>
        <dd>及时应答率</dd>
      </dl>
    </div>
    <vue-seamless-scroll
      class="bus_fourbot"
      :class-option="options"
      :data="listData"
    >
      <dl v-for="(item, index) in listData" :key="index">
        <dt>
          <p>{{ item.infoContent }}</p>
          <p>{{ item.createTime | timeFormat }}</p>
        </dt>
        <dd :class="item.status == 2 ? 'green' : 'red'">
          {{
            item.status == 0
              ? "未回复"
              : item.status == 1
              ? "未确认"
              : item.status == 2
              ? "已确认"
              : ""
          }}
        </dd>
      </dl>
    </vue-seamless-scroll>
    <div class="mengsha" v-show="this.listData.length">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  data() {
    return {
      obj: {},
      listData: [],
      timer: null,
    };
  },
  components: {
    vueSeamlessScroll,
  },
  computed: {
    options() {
      return {
        singleHeight: 48,
        limitMoveNum: 1,
        waitTime: 2500,
      };
    },
  },
  methods: {
    getData() {
      this.$post("/api/getUserGmpQuery").then((res) => {
        if (res.data && res.data.length) {
          this.obj = res.data[0];
          this.listData = res.data[1];
        }
      });
    },
  },
  watch: {
    "$store.state.tokenCheck.token"(newv, oldv) {
      if (newv) {
        this.getData();
        this.timer = setInterval(() => {
          this.getData();
        }, 5 * 60000);
      }
    },
  },
  mounted() {},
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>
<style lang="scss" scoped>
</style>

<template>
  <div class="bus_one blockbg">
    <div class="bus_one_left">
      <div class="row">
        <span>车辆总数</span>
        <span>{{ datas.totalCounter }}</span>
      </div>
      <div class="row">
        <span>在线车辆</span>
        <span>{{ zaixian }}</span>
      </div>
      <div class="row">
        <span>离线车辆</span>
        <span>{{ lixian }}</span>
      </div>
      <div class="zhanbi">
        <div class="zhanbi_title">
          <span>在线{{ zaixianzhanbi }}%</span>
          <span>离线{{ lixianzhanbi }}%</span>
        </div>
        <div class="zhanbi_graphic">
          <div
            :style="{
              width: zaixianzhanbi + '%',
              height: '100%',
              background: '#6dd400',
            }"
          ></div>
        </div>
      </div>
    </div>
    <div class="bus_one_right" id="BusOne"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datas: {},
      zaixian: 0,
      lixian: 0,
      zaixianzhanbi: 0,
      lixianzhanbi: 0,
      timer: null,
    };
  },
  methods: {
    init() {
      let option = {
        color: [
          "#5E81F4",
          "#6DD400",
          "#FFCD43",
          "#F7B500",
          "#FF9528",
          "#FF7D27",
          "#FF5A29",
          "#E02020",
          "#EEEEEE",
        ],
        title: {
          text: "基本信息",
          textStyle: {
            color: this.themes2,
            fontWeight: "normal",
            fontSize: 12,
          },
          left: "31%",
          top: "middle",
        },
        legend: {
          left: "right",
          top: "middle",
          orient: "vertical",
          align: "left",
          itemWidth: 14,
          itemHeight: 4,
          //   selectedMode: false,
          textStyle: {
            color: this.themes,
            fontSize: 10,
          },
        },
        series: [
          {
            type: "pie",
            radius: [30, 50],
            center: ["40%", "50%"],
            label: {
              formatter: "{d}%",
              color: "#000",
              position: "inside",
              fontSize: 8,
            },
            itemStyle: {
              borderRadius: 0,
            },
            data: [
              {
                value: this.datas.onlineFlameCounter,
                name: `在线(熄火) ${this.datas.onlineFlameCounter}`,
              },
              {
                value: this.datas.onlineDriveCounter,
                name: `在线(行驶) ${this.datas.onlineDriveCounter}`,
              },
            ],
          },
          {
            type: "pie",
            radius: [60, 80],
            center: ["40%", "50%"],
            label: {
              formatter: "{d}%",
              color: "#000",
              position: "inside",
              fontSize: 8,
            },
            itemStyle: {
              borderRadius: 0,
            },
            data: [
              {
                value: this.datas.offlineCounter1,
                name: `离线1 ${this.datas.offlineCounter1}`,
              },
              {
                value: this.datas.offlineCounter2,
                name: `离线2 ${this.datas.offlineCounter2}`,
              },
              {
                value: this.datas.offlineCounter3,
                name: `离线3 ${this.datas.offlineCounter3}`,
              },
              {
                value: this.datas.offlineCounter4,
                name: `离线4 ${this.datas.offlineCounter4}`,
              },
              {
                value: this.datas.offlineCounter5,
                name: `离线5 ${this.datas.offlineCounter5}`,
              },
              {
                value: this.datas.offlineCounter,
                name: `离线(熄火) ${this.datas.offlineCounter}`,
              },
              {
                value: this.datas.notOnlineCounter,
                name: `未上线 ${this.datas.notOnlineCounter}`,
              },
            ],
          },
        ],
      };
      this.ECT.init(document.getElementById("BusOne")).setOption(option);
    },
    getData() {
      this.$post("/api/getUserVehStatusMap").then((res) => {
        this.datas = res.data;
        this.zaixian =
          res.data.onlineDriveCounter + res.data.onlineFlameCounter;
        this.lixian =
          res.data.totalCounter -
          res.data.onlineDriveCounter -
          res.data.onlineFlameCounter;
        this.zaixianzhanbi = (
          (this.zaixian / res.data.totalCounter) *
          100
        ).toFixed(0);
        this.lixianzhanbi = 100 - this.zaixianzhanbi;
        this.init();
      });
    },
  },
  computed: {
    themes() {
      return this.$store.state.theme.theme == "dark" ? "#BABDC3" : "#666666";
    },
    themes2() {
      return this.$store.state.theme.theme == "dark" ? "#fff" : "#666666";
    },
  },
  watch: {
    themes() {
      this.getData();
    },
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

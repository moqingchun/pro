<template>
  <div class="bus_three">
    <div class="blockbg bus_count">
      <h2>
        本月运营车辆<span class="sp1"> {{ data2.total }} </span>辆 行驶里程<span
          class="sp2"
        >
          {{ data1.total }} </span
        >公里
      </h2>
      <h2>
        七日运营车辆<span class="sp1"> {{ data2.sevenday }} </span>辆
        行驶里程<span class="sp2"> {{ data1.sevenday }} </span>公里
      </h2>
      <h2>
        昨日运营车辆<span class="sp1"> {{ data2.yesterday }} </span>辆
        行驶里程<span class="sp2"> {{ data1.yesterday }} </span>公里
      </h2>
      <div class="huantu" id="Busthree"></div>
    </div>
    <div class="blockbg list_box">
      <div style="padding-bottom: 26px">
        <h1 class="green">
          <span>里程排行月榜</span>
          <span>{{ lastMonth }}</span>
        </h1>
        <div>
          <span>序号</span>
          <span>车牌号</span>
          <span>公里数</span>
        </div>
        <p v-for="(item, index) in data3.milageTop5_lastMonth" :key="index">
          <span>{{ index + 1 }}</span>
          <span>{{ item.licenseName }}</span>
          <span>{{ item.value }}</span>
        </p>
      </div>
      <div>
        <h1 class="green">
          <span>里程排行日榜</span>
          <span>{{ yesterday }}</span>
        </h1>
        <div>
          <span>序号</span>
          <span>车牌号</span>
          <span>公里数</span>
        </div>
        <p v-for="(item, index) in data3.milageTop5_yesterday" :key="index">
          <span>{{ index + 1 }}</span>
          <span>{{ item.licenseName }}</span>
          <span>{{ item.value }}</span>
        </p>
      </div>
    </div>
    <div class="blockbg list_box">
      <div style="padding-bottom: 26px">
        <h1 class="yellow">
          <span>超速车辆排名月榜</span>
          <span>{{ lastMonth }}</span>
        </h1>
        <div>
          <span>序号</span>
          <span>车牌号</span>
          <span>超速次数</span>
        </div>
        <p v-for="(item, index) in data3.overspeed_lastMonth" :key="index">
          <span>{{ index + 1 }}</span>
          <span>{{ item.licenseName }}</span>
          <span>{{ item.value }}</span>
        </p>
      </div>
      <div>
        <h1 class="yellow">
          <span>超速车辆排名日榜</span>
          <span>{{ yesterday }}</span>
        </h1>
        <div>
          <span>序号</span>
          <span>车牌号</span>
          <span>超速次数</span>
        </div>
        <p v-for="(item, index) in data3.overspeed_yesterday" :key="index">
          <span>{{ index + 1 }}</span>
          <span>{{ item.licenseName }}</span>
          <span>{{ item.value }}</span>
        </p>
      </div>
    </div>
    <div class="blockbg list_box">
      <div style="padding-bottom: 26px">
        <h1 class="blue">
          <span>疲劳驾驶排名月榜</span>
          <span>{{ lastMonth }}</span>
        </h1>
        <div>
          <span>序号</span>
          <span>车牌号</span>
          <span>疲劳驾驶次数</span>
        </div>
        <p v-for="(item, index) in data3.fatigue_lastMonth" :key="index">
          <span>{{ index + 1 }}</span>
          <span>{{ item.licenseName }}</span>
          <span>{{ item.value }}</span>
        </p>
      </div>
      <div>
        <h1 class="blue">
          <span>疲劳驾驶排名日榜</span>
          <span>{{ yesterday }}</span>
        </h1>
        <div>
          <span>序号</span>
          <span>车牌号</span>
          <span>疲劳驾驶次数</span>
        </div>
        <p v-for="(item, index) in data3.fatigue_yesterday" :key="index">
          <span>{{ index + 1 }}</span>
          <span>{{ item.licenseName }}</span>
          <span>{{ item.value }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartData: [],
      data1: {},
      data2: {},
      data3: {},
      lastMonth: null,
      yesterday: null,
    };
  },
  methods: {
    init() {
      let option = {
        color: [
          {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#3fcaf7",
              },
              {
                offset: 1,
                color: "#6c4cfa",
              },
            ],
            global: false,
          },
        ],
        title: {
          text: "昨日\n里程占比",
          textStyle: {
            color: this.themes,
            fontWeight: "normal",
            fontSize: 12,
            lineHeight: 20,
          },
          left: "47%",
          top: "middle",
          borderColor: "#3fcaf7",
          borderWidth: 1,
          borderRadius: 50,
          padding: [20, 12],
          textAlign: "center",
        },
        series: [
          {
            name: "昨日里程占比",
            type: "pie",
            radius: ["40%", "66%"],
            label: {
              formatter: "{name|{b}} \n\n{percent|{d} %} \n\n{val|{c} 辆}",
              lineHeight: 14,
              overflow: "breakAll",
              alignTo: "labelLine",
              rich: {
                name: {
                  color: this.themes,
                  fontSize: 10,
                },
                percent: {
                  color: "#41D2FF",
                  fontSize: 14,
                },
                val: {
                  color: this.themes2,
                  fontSize: 10,
                },
              },
            },
            labelLine: {
              //   length2: 0,
              smooth: true,
            },
            itemStyle: {
              borderRadius: 20,
              borderColor: this.themes1,
              borderWidth: 10,
            },
            data: this.chartData,
          },
        ],
      };
      this.ECT.init(document.getElementById("Busthree")).setOption(option);
    },
    getData() {
      this.$post("/api/getUserVehYesterdayOperateMap").then((res) => {
        if (!res.data) {
          return;
        }
        this.chartData = [];
        for (let key in res.data) {
          this.chartData.push({
            value: res.data[key],
            name: key,
          });
        }
        this.init();
      });
    },
    getData2() {
      this.$post("/api/getUserVehTotalMileageMap").then((res) => {
        let { sevenday, total, yesterday } = res.data;
        this.data1 = {
          sevenday:
            sevenday.length > 7
              ? (Number(sevenday) / 10000).toFixed(2) + "万"
              : sevenday,
          total:
            total.length > 7
              ? (Number(total) / 10000).toFixed(2) + "万"
              : total,
          yesterday:
            yesterday.length > 7
              ? (Number(yesterday) / 10000).toFixed(2) + "万"
              : yesterday,
        };
      });
      this.$post("/api/getUserVehCount").then((res) => {
        this.data2 = res.data;
      });
      this.$post("/api/getUserVehTop5").then((res) => {
        this.data3 = res.data;
      });
    },
    getDate() {
      let year = new Date().getFullYear(),
        month = new Date().getMonth();
      if (month == 0) {
        year = year - 1;
        month = 12;
      }
      month = this.toStrings(month);
      this.lastMonth = year + "-" + month;

      let day1 = new Date();
      day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
      let year1 = day1.getFullYear(),
        month1 = this.toStrings(day1.getMonth() + 1),
        day2 = this.toStrings(day1.getDate());
      this.yesterday = year1 + "-" + month1 + "-" + day2;
    },
    toStrings(pa) {
      let n = pa.toString();
      return n[1] ? n : "0" + n;
    },
  },
  computed: {
    themes() {
      return this.$store.state.theme.theme == "dark" ? "#fff" : "#333333";
    },
    themes1() {
      return this.$store.state.theme.theme == "dark" ? "#001030" : "#fff";
    },
    themes2() {
      return this.$store.state.theme.theme == "dark" ? "#FFF254" : "#FFBB00";
    },
  },
  watch: {
    themes() {
      this.getData();
    },
    "$store.state.tokenCheck.token"(newv, oldv) {
      if (newv) {
        this.getData();
        this.getData2();
        this.getDate();
      }
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
</style>

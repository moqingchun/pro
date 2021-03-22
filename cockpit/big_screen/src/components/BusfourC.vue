<template>
  <div class="bus_fourC blockbg">
    <div class="block_title">近6个月运营分析</div>
    <div class="bus_fourcchart" id="Busfourc"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datas: [],
    };
  },
  methods: {
    init() {
      let option = {
        grid: {
          left: "15%",
          bottom: "15%",
        },
        legend: {
          right: "4%",
          itemGap: 18,
          itemWidth: 12,
          itemHeight: 1,
          textStyle: {
            color: this.themes,
            fontSize: 12,
          },
        },
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: this.themes,
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: 12,
          },
          data: this.datas.map((v) => {
            return v.date;
          }),
        },
        yAxis: [
          {
            name: "(公里)",
            type: "value",
            nameTextStyle: {
              color: this.themes,
              fontSize: 12,
              align: "right",
            },
            axisLabel: {
              fontSize: 12,
              color: this.themes,
            },
            splitLine: {
              show: false,
            },
          },
          {
            name: "(辆)",
            type: "value",
            nameTextStyle: {
              color: this.themes,
              fontSize: 12,
              align: "left",
            },
            axisLabel: {
              fontSize: 12,
              color: this.themes,
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            data: this.datas.map((v) => {
              return v.mileage;
            }),
            name: "总里程",
            type: "line",
            showSymbol: false,
            lineStyle: {
              color: "#5E81F4",
              width: 2,
            },
          },
          {
            data: this.datas.map((v) => {
              return v.vehCount;
            }),
            name: "车辆数",
            type: "line",
            yAxisIndex: 1,
            showSymbol: false,
            lineStyle: {
              color: "#5AD8A6",
              width: 2,
            },
          },
        ],
      };
      this.ECT.init(document.getElementById("Busfourc")).setOption(option);
    },
    getData() {
      this.$post("/api/getUserOperateAnalysis").then((res) => {
        let arr = [];
        for (let key in res.data) {
          arr.push({
            date: key,
            vehCount: res.data[key].vehCount,
            mileage: res.data[key].mileage,
          });
        }
        arr.sort((a, b) => {
          return b.date > a.date ? -1 : b.date < a.date ? 1 : 0;
        });
        this.datas = arr;
        this.init();
      });
    },
  },
  computed: {
    themes() {
      return this.$store.state.theme.theme == "dark" ? "#fff" : "#333";
    },
  },
  watch: {
    themes() {
      this.getData();
    },
    "$store.state.tokenCheck.token"(newv, oldv) {
      if (newv) {
        this.getData();
      }
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
</style>

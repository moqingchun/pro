<template>
  <div class="bus_five blockbg">
    <div class="block_title">未来7天上报台账完整率</div>
    <div class="Busfive" id="Busfive"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      yData: [],
      xData1: [],
      xData2: [],
      timer: null,
    };
  },
  methods: {
    init() {
      let option = {
        legend: {
          left: "right",
          align: "left",
          itemWidth: 14,
          itemHeight: 4,
          textStyle: {
            color: this.themes,
            fontSize: 10,
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          show: false,
          type: "value",
        },
        yAxis: {
          type: "category",
          inverse: true,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            margin: 24,
            color: this.themes1,
            formatter: (value) => {
              let one = value.split(" ")[0];
              let two = value.split(" ")[1];
              return `{a|${one}} {b|${two}}`;
            },
            rich: {
              b: {
                color: "#59E0FF",
              },
            },
          },
          data: this.yData,
        },
        series: [
          {
            name: "完整",
            type: "bar",
            stack: "total",
            label: {
              show: true,
              position: "insideLeft",
              color: "#000",
              fontSize: 10,
            },
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#58E1FF",
                  },
                  {
                    offset: 1,
                    color: "#734FFE",
                  },
                ],
                global: false,
              },
              borderColor: this.themes2,
              borderWidth: 2,
            },
            data: this.xData1,
          },
          {
            name: "不完整",
            type: "bar",
            stack: "total",
            label: {
              show: true,
              position: "insideRight",
              color: "#000",
              fontSize: 10,
            },
            barWidth: 14,
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#FFF572",
                  },
                  {
                    offset: 1,
                    color: "#FFB038",
                  },
                ],
                global: false,
              },
              borderColor: this.themes2,
              borderWidth: 2,
            },
            data: this.xData2,
          },
        ],
      };
      this.ECT.init(document.getElementById("Busfive")).setOption(option);
    },
    getData() {
      this.$post("/api/getUserAccount").then((res) => {
        if (res.data && res.data.length) {
          this.yData = [];
          this.xData1 = [];
          this.xData2 = [];
          res.data.map((v) => {
            this.yData.push(v.date + " " + v.total);
            this.xData1.push(Number(v.total) - Number(v.unfinished));
            this.xData2.push(Number(v.unfinished));
          });
          this.init();
        }
      });
    },
  },
  computed: {
    themes() {
      return this.$store.state.theme.theme == "dark" ? "#C2C5CA" : "#333";
    },
    themes1() {
      return this.$store.state.theme.theme == "dark" ? "#fff" : "#666";
    },
    themes2() {
      return this.$store.state.theme.theme == "dark" ? "#001030" : "#fff";
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
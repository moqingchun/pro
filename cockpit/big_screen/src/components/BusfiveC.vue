<template>
  <div class="bus_fiveC blockbg">
    <div class="block_title">百公里报警数分析</div>
    <div class="bus_fivecchart" id="BusfiveC"></div>
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
          left: "2%",
          right: "4%",
          bottom: "4%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          axisLine: {
            show: true,
            lineStyle: {
              color: this.themes,
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: this.themes,
          },
          data: this.datas.map((v) => {
            return v.date;
          }),
        },
        yAxis: {
          name: "(次)",
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
        series: [
          {
            name: "",
            type: "bar",
            label: {
              show: true,
              position: "top",
              color: this.themes1,
              fontSize: 12,
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
                    color: "#FD9D00",
                  },
                  {
                    offset: 1,
                    color: "#FA6400",
                  },
                ],
                global: false,
              },
            },
            barWidth: 20,
            data: this.datas.map((v) => {
              return v.av;
            }),
          },
        ],
      };
      this.ECT.init(document.getElementById("BusfiveC")).setOption(option);
    },
    getData() {
      this.$post("/api/getUserAlarmAnalysis").then((res) => {
        this.datas = [];
        for (let key in res.data) {
          this.datas.push({
            date: key,
            av: (
              ((Number(res.data[key].emergency) +
                Number(res.data[key].fatigure) +
                Number(res.data[key].overspeed)) /
                Number(res.data[key].mileage)) *
              100
            ).toFixed(2),
          });
        }
        this.datas.sort((a, b) => {
          return b.date > a.date ? -1 : b.date < a.date ? 1 : 0;
        });
        this.init();
      });
    },
  },
  computed: {
    themes() {
      return this.$store.state.theme.theme == "dark" ? "#fff" : "#333";
    },
    themes1() {
      return this.$store.state.theme.theme == "dark" ? "#fff" : "#5E81F4";
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

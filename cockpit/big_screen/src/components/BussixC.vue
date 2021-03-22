<template>
  <div class="bus_sixC blockbg">
    <div class="block_title">终端报警分布情况</div>
    <div class="Bussix" id="BussixC"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      emergencymax: 0,
      overspeedmax: 0,
      fatiguemax: 0,
      yesData: [],
      timer: null,
    };
  },
  methods: {
    init() {
      let option = {
        legend: {
          left: "right",
          orient: "vertical",
          align: "left",
          itemWidth: 20,
          itemHeight: 4,
          textStyle: {
            color: this.themes1,
            fontSize: 10,
          },
        },
        radar: {
          center: ["50%", "60%"],
          radius: "90%",
          name: {
            textStyle: {
              color: this.themes,
            },
          },
          splitNumber: 0,
          axisLine: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#33EDF6",
                  },
                  {
                    offset: 1,
                    color: "#7927FB",
                  },
                ],
                global: false,
              },
            },
          },
          splitArea: {
            areaStyle: {
              color: "transparent",
            },
          },
          indicator: [
            { name: "紧急报警", max: this.emergencymax },
            { name: "超速报警", max: this.overspeedmax },
            { name: "疲劳驾驶", max: this.fatiguemax },
          ],
        },
        series: [
          {
            name: "终端报警分布情况",
            type: "radar",
            symbolSize: 0,
            label: {
              show: true,
              formatter: "{c}",
              color: this.themes,
              fontSize: 10,
              position: "inside",
            },
            lineStyle: {
              width: 0,
            },
            data: [
              {
                value: this.yesData,
                name: "昨日终端报警",
                areaStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#33EDF6",
                      },
                      {
                        offset: 1,
                        color: "#7927FB",
                      },
                    ],
                    global: false,
                  },
                  opacity: 0.5,
                },
              },
            ],
          },
        ],
      };
      this.ECT.init(document.getElementById("BussixC")).setOption(option);
    },
    getData() {
      this.$post("/api/getTeminalAlarms").then((res) => {
        this.yesData = [
          Number(res.data.emergency) ? Number(res.data.emergency) : 0,
          Number(res.data.overspeed) ? Number(res.data.overspeed) : 0,
          Number(res.data.fatigue) ? Number(res.data.fatigue) : 0,
        ];
        let emergencymax = Number(res.data.emergency)
          ? Number(res.data.emergency)
          : 0;
        for (emergencymax; emergencymax < emergencymax + 1; emergencymax++) {
          if (emergencymax % 100 === 0 && emergencymax !== 0) {
            this.emergencymax = emergencymax;
            break;
          }
        }
        let overspeedmax = Number(res.data.overspeed)
          ? Number(res.data.overspeed)
          : 0;
        for (overspeedmax; overspeedmax < overspeedmax + 1; overspeedmax++) {
          if (overspeedmax % 100 === 0 && overspeedmax !== 0) {
            this.overspeedmax = overspeedmax;
            break;
          }
        }
        let fatiguemax = Number(res.data.fatigue)
          ? Number(res.data.fatigue)
          : 0;
        for (fatiguemax; fatiguemax < fatiguemax + 1; fatiguemax++) {
          if (fatiguemax % 100 === 0 && fatiguemax !== 0) {
            this.fatiguemax = fatiguemax;
            break;
          }
        }
        this.init();
      });
    },
  },
  computed: {
    themes() {
      return this.$store.state.theme.theme == "dark" ? "#fff" : "#333";
    },
    themes1() {
      return this.$store.state.theme.theme == "dark" ? "#BABDC3" : "#333";
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
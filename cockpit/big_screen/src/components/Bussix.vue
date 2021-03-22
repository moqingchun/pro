<template>
  <div class="bus_six blockbg">
    <div class="block_title">行业报警分布情况</div>
    <div class="Bussix" id="Bussix"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      illegalmax: 0,
      overspeedmax: 0,
      fatiguemax: 0,
      nowData: [],
      yesterdayData: [],
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
            { name: "2-5时禁行", max: this.illegalmax },
            { name: "超速报警", max: this.overspeedmax },
            { name: "疲劳驾驶", max: this.fatiguemax },
          ],
        },
        series: [
          {
            name: "行业报警分布情况",
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
                value: this.yesterdayData,
                name: "昨日行业报警",
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
              {
                value: this.nowData,
                name: "今日行业报警",
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
                        color: "#93EED2",
                      },
                      {
                        offset: 1,
                        color: "#5AD8A6",
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
      this.ECT.init(document.getElementById("Bussix")).setOption(option);
    },
    getData() {
      let day1 = new Date();
      day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
      let year1 = day1.getFullYear(),
        month1 = this.toStrings(day1.getMonth() + 1),
        day2 = this.toStrings(day1.getDate());
      let yesterday = year1 + "" + month1 + "" + day2;
      Promise.all([
        this.$post("/api/getUserAlarms"),
        this.$post("/api/getUserAlarms", {
          date: yesterday,
        }),
      ]).then((res) => {
        this.nowData = [
          Number(res[0].data.illegal) ? Number(res[0].data.illegal) : 0,
          Number(res[0].data.overspeed) ? Number(res[0].data.overspeed) : 0,
          Number(res[0].data.fatigue) ? Number(res[0].data.fatigue) : 0,
        ];
        this.yesterdayData = [
          Number(res[1].data.illegal) ? Number(res[1].data.illegal) : 0,
          Number(res[1].data.overspeed) ? Number(res[1].data.overspeed) : 0,
          Number(res[1].data.fatigue) ? Number(res[1].data.fatigue) : 0,
        ];
        let illegalmax = Math.max.apply(null, [
          Number(res[0].data.illegal) ? Number(res[0].data.illegal) : 0,
          Number(res[1].data.illegal) ? Number(res[1].data.illegal) : 0,
        ]);
        for (illegalmax; illegalmax < illegalmax + 1; illegalmax++) {
          if (illegalmax % 100 === 0 && illegalmax !== 0) {
            this.illegalmax = illegalmax;
            break;
          }
        }
        let overspeedmax = Math.max.apply(null, [
          Number(res[0].data.overspeed) ? Number(res[0].data.overspeed) : 0,
          Number(res[1].data.overspeed) ? Number(res[1].data.overspeed) : 0,
        ]);
        for (overspeedmax; overspeedmax < overspeedmax + 1; overspeedmax++) {
          if (overspeedmax % 100 === 0 && overspeedmax !== 0) {
            this.overspeedmax = overspeedmax;
            break;
          }
        }
        let fatiguemax = Math.max.apply(null, [
          Number(res[0].data.fatigue) ? Number(res[0].data.fatigue) : 0,
          Number(res[1].data.fatigue) ? Number(res[1].data.fatigue) : 0,
        ]);
        for (fatiguemax; fatiguemax < fatiguemax + 1; fatiguemax++) {
          if (fatiguemax % 100 === 0 && fatiguemax !== 0) {
            this.fatiguemax = fatiguemax;
            break;
          }
        }
        this.init();
      });
    },
    toStrings(pa) {
      let n = pa.toString();
      return n[1] ? n : "0" + n;
    },
  },
  computed: {
    themes() {
      return this.$store.state.theme.theme == "dark" ? "#fff" : "#333";
    },
    themes1() {
      return this.$store.state.theme.theme == "dark" ? "#C9CCD0" : "#333";
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
<template>
  <div class="bus_two blockbg">
    <div class="block_title">七日车辆运营分析</div>
    <div class="bus_two_mid">
      <div class="bus_two_midlt">
        <div style="padding-top: 20px">
          <p>
            <span>{{ datas.avgMeter }}</span>
            <span> 公里/车</span>
          </p>
          <p>日均里程</p>
        </div>
        <div>
          <p>
            <span>{{ datas.avgTime }}</span>
            <span> 小时/车</span>
          </p>
          <p>日均运行时长</p>
        </div>
      </div>
      <div class="bus_two_midrt" id="Bustwoone"></div>
    </div>
    <div class="bus_two_bot" id="Bustwotwo"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datas: {},
    };
  },
  methods: {
    init() {
      let option = {
          series: [
            {
              type: "gauge",
              center: ["60%", "50%"],
              radius: "100%",
              startAngle: 200,
              endAngle: -20,
              axisLine: {
                show: false,
              },
              splitLine: {
                distance: 0,
                length: 8,
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
                  width: 2,
                },
              },
              axisTick: {
                distance: 0,
                length: 8,
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
                  width: 1,
                },
              },
              axisLabel: {
                show: false,
              },
              pointer: {
                icon: "triangle",
                length: "60%",
                width: 4,
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#7927FB",
                      },
                      {
                        offset: 1,
                        color: "#33EDF6",
                      },
                    ],
                    global: false,
                  },
                },
              },
              anchor: {
                show: true,
                showAbove: true,
                icon: "circle",
                size: 8,
                itemStyle: {
                  color: "#33EDF6",
                },
              },
              title: {
                color: this.themes1,
                offsetCenter: ["0%", "80%"],
                fontSize: 12,
              },
              detail: {
                valueAnimation: true,
                //   color: "#33EDF6",
                //   fontSize: 20,
                offsetCenter: [0, "50%"],
                formatter: ["{a|{value}}{b| km/h}"].join("\n"),
                rich: {
                  a: {
                    color: "#5E81F4",
                    fontSize: 20,
                  },
                  b: {
                    fontSize: 14,
                    color: "#5E81F4",
                  },
                },
              },
              data: [
                {
                  value: this.datas.speed,
                  name: "平均运行速度",
                },
              ],
            },
          ],
        },
        option2 = {
          grid: {
            bottom: "15%",
          },
          legend: {
            right: "10%",
            itemGap: 30,
            itemWidth: 9,
            itemHeight: 9,
            textStyle: {
              color: "#BABDC3",
              fontSize: 10,
            },
          },
          xAxis: {
            type: "category",
            axisLine: {
              lineStyle: {
                color: "#5E81F4",
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              fontSize: 10,
            },
            data: this.datas.list.map((v) => {
              return v.date;
            }),
          },
          yAxis: [
            {
              name: "公里",
              type: "value",
              nameTextStyle: {
                color: "#5E81F4",
                fontSize: 10,
                align: "right",
              },
              axisLabel: {
                fontSize: 10,
                color: "#5E81F4",
              },
              splitLine: {
                show: false,
              },
            },
            {
              name: "小时",
              type: "value",
              nameTextStyle: {
                color: "#5E81F4",
                fontSize: 10,
                align: "left",
              },
              axisLabel: {
                fontSize: 10,
                color: "#5E81F4",
              },
              splitLine: {
                show: false,
              },
            },
          ],
          series: [
            {
              data: this.datas.list.map((v) => {
                return v.totalMeter;
              }),
              name: "公里",
              type: "line",
              symbol: "circle",
              symbolSize: 0,
              smooth: true,
              label: {
                show: false,
                color: this.themes1,
                fontSize: 10,
              },
              itemStyle: {
                color: "#f05d28",
              },
              lineStyle: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#f05d28",
                    },
                    {
                      offset: 1,
                      color: "#f49827",
                    },
                  ],
                  global: false,
                },
                width: 2,
              },
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
                      color: "rgba(241,92,40,.6)",
                    },
                    {
                      offset: 1,
                      color: "rgba(241,92,40,0)",
                    },
                  ],
                  global: false,
                },
              },
            },
            {
              data: this.datas.list.map((v) => {
                return v.totalTime;
              }),
              name: "小时",
              type: "line",
              yAxisIndex: 1,
              type: "line",
              symbol: "circle",
              symbolSize: 0,
              smooth: true,
              label: {
                show: false,
                color: this.themes1,
                fontSize: 10,
              },
              itemStyle: {
                color: "#1eafc7",
              },
              lineStyle: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#1eafc7",
                    },
                    {
                      offset: 1,
                      color: "#4189a5",
                    },
                  ],
                  global: false,
                },
                width: 2,
              },
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
                      color: "rgba(65,132,165,.6)",
                    },
                    {
                      offset: 1,
                      color: "rgba(65,132,165,0)",
                    },
                  ],
                  global: false,
                },
              },
            },
          ],
        };
      this.ECT.init(document.getElementById("Bustwoone")).setOption(option);
      this.ECT.init(document.getElementById("Bustwotwo")).setOption(option2);
    },
    getData() {
      this.$post("/api/getUserVehOperateMap").then((res) => {
        res.data.list.sort((a, b) => {
          return b.date > a.date ? -1 : b.date < a.date ? 1 : 0;
        });
        this.datas = res.data;
        this.init();
      });
    },
  },
  computed: {
    themes1() {
      return this.$store.state.theme.theme == "dark" ? "#fff" : "#333333";
    },
  },
  watch: {
    themes1() {
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

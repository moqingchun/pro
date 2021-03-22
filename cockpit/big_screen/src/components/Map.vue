<template>
  <div class="map_box" id="main"></div>
</template>

<script>
import "@/assets/js/china.js";
export default {
  data() {
    return {
      geoDatas: [],
    };
  },
  methods: {
    init() {
      let option = {
        geo: {
          map: "china",
          label: {
            emphasis: {
              show: false,
            },
          },
          itemStyle: {
            normal: {
              areaColor: this.themes,
              borderColor: "#4e6bcd",
              borderWidth: 1,
            },
            emphasis: {
              areaColor: this.themes,
            },
          },
        },
        series: [
          {
            type: "scatter",
            coordinateSystem: "geo",
            symbolSize: 4,
            itemStyle: {
              normal: {
                color: "#FFF139",
              },
            },
            zlevel: 1,
            data: this.geoDatas,
          },
        ],
      };
      this.ECT.init(document.getElementById("main")).setOption(option, true);
    },
    getData() {
      this.$post("/api/getVehs").then((res) => {
        this.geoDatas = [];
        res.data.map((v) => {
          this.geoDatas.push({
            name: v.id,
            value: [v.lon, v.lat],
          });
        });
        this.init();
      });
    },
  },
  computed: {
    themes() {
      return this.$store.state.theme.theme == "dark" ? "#212d5e" : "#c3cff6";
    },
  },
  watch: {
    themes() {
      this.getData();
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
<style lang="scss" scoped>
</style>

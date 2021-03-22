<template>
  <div class="map_box" id="main"></div>
</template>

<script>
export default {
  data() {
    return {
      points: [],
      timer: null,
    };
  },
  methods: {
    init() {
      let disCountry = new AMap.DistrictLayer.Country({
        zIndex: 10,
        SOC: "CHN",
        depth: 1,
        styles: {
          "nation-stroke": "#5E81F4",
          "coastline-stroke": "#4e6bcd",
          "province-stroke": "#5E81F4",
          fill: this.themes,
        },
      });
      let map = new AMap.Map("main", {
        center: [105.339, 39.9],
        zoom: 4,
        layers: [disCountry],
        // zoomEnable: false,
        // dragEnable: false,
      });
      let cluster,
        markers = [];

      for (let i = 0; i < this.points.length; i += 1) {
        markers.push(
          new AMap.Marker({
            position: this.points[i],
            content:
              '<div style="background: #FFF139; height: 10px; width: 10px;  border-radius: 12px; "></div>',
            offset: new AMap.Pixel(-15, -15),
          })
        );
      }

      let _renderClusterMarker = function (context) {
        let bgColor =
          context.count > 9999
            ? "#E02020"
            : context.count > 999
            ? "#FF4949"
            : context.count > 99
            ? "#F7B500"
            : context.count > 9
            ? "#7352FE"
            : "#6DD400";
        let widthheight =
          context.count > 9999
            ? 55
            : context.count > 999
            ? 45
            : context.count > 99
            ? 35
            : context.count > 9
            ? 25
            : 15;
        let div = `<div style="background:${bgColor};width:${widthheight}px;height:${widthheight}px;border-radius:50%;position:relative;">
            <div style="background:${bgColor};width:${widthheight}px;height:${widthheight}px;line-height:${widthheight}px;border-radius:50%;color:#fff;font-size:12px;text-align:center;position:absolute;top:0;left:0;z-index:3;">${context.count}</div>
            <div class="juhe_box" style="background:${bgColor};width:${widthheight}px;height:${widthheight}px;border-radius:50%;position:absolute;top:0;left:0;z-index:2"></div>
            <div class="juhe_box1" style="background:${bgColor};width:${widthheight}px;height:${widthheight}px;border-radius:50%;position:absolute;top:0;left:0;z-index:1"></div>
        </div>`;
        context.marker.setOffset(new AMap.Pixel(-15, -15));
        context.marker.setContent(div);
      };

      addCluster();

      function addCluster() {
        if (cluster) {
          cluster.setMap(null);
        }
        cluster = new AMap.MarkerClusterer(map, markers, {
          gridSize: 80,
          //   zoomOnClick: false,
          renderClusterMarker: _renderClusterMarker,
        });
      }
    },
    getData() {
      this.$post("/api/getVehs").then((res) => {
        this.points = [];
        res.data.map((v) => {
          this.points.push([v.lon, v.lat]);
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

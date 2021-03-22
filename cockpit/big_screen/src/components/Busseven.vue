<template>
  <div class="bus_seven blockbg">
    <div class="block_title">昨日疑似故障车辆</div>
    <dl>
      <dt>漂移车辆</dt>
      <dd :style="{ width: widtha }">{{ datas.drift }} 辆</dd>
    </dl>
    <dl>
      <dt>轨迹不完整</dt>
      <dd :style="{ width: widthb }">{{ datas.gpsUnqualified }} 辆</dd>
    </dl>
    <dl>
      <dt>数据不合格</dt>
      <dd :style="{ width: widthc }">{{ datas.integrity }} 辆</dd>
    </dl>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datas: {},
      widtha: 0,
      widthb: 0,
      widthc: 0,
    };
  },
  methods: {
    getData() {
      this.$post("/api/getUserErrorVeh").then((res) => {
        let [drift, gpsUnqualified, integrity] = [
          res.data.drift,
          res.data.gpsUnqualified,
          res.data.integrity,
        ];
        this.datas = {
          drift,
          gpsUnqualified,
          integrity,
        };

        let [a, b, c] = [
          Number(res.data.drift) ? Number(res.data.drift) : 0,
          Number(res.data.gpsUnqualified) ? Number(res.data.gpsUnqualified) : 0,
          Number(res.data.integrity) ? Number(res.data.integrity) : 0,
        ];
        let arr = [a, b, c];
        let max = Math.max.apply(null, arr);
        this.widtha = (a / max) * 300 + "px";
        this.widthb = (b / max) * 300 + "px";
        this.widthc = (c / max) * 300 + "px";
      });
    },
  },
  watch: {
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
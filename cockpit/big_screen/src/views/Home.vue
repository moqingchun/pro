<template>
  <div :class="[$store.state.theme.theme, 'home_page']">
    <div class="left">
      <div class="left_top">
        <div class="left_top_left">
          <Busone />
          <Bustwo />
        </div>
        <div class="left_top_right">
          <div class="title_bg">{{ corpName }}车辆监控平台</div>
          <div class="control_box">
            <dl @click="changeThemes">
              <dt>
                <img
                  v-if="$store.state.theme.theme == 'dark'"
                  src="../assets/img/black1.png"
                  alt=""
                />
                <img v-else src="../assets/img/white1.png" alt="" />
              </dt>
              <dd>
                {{
                  $store.state.theme.theme == "dark" ? "浅色模式" : "深色模式"
                }}
              </dd>
            </dl>
            <dl @click="fullScreen">
              <dt>
                <img v-if="!isTrue" src="../assets/img/black2.png" alt="" />
                <img v-else src="../assets/img/white2.png" alt="" />
              </dt>
              <dd>{{ isTrue ? "缩屏" : "全屏" }}</dd>
            </dl>
          </div>
          <div class="amap_maskj"></div>
          <Map1 />
        </div>
      </div>
      <div class="left_bottom">
        <Busthree />
      </div>
    </div>
    <div class="right">
      <Busfour v-if="envs == 'tengwei'" />
      <BusfourC v-else />
      <Busfive v-if="envs == 'tengwei'" />
      <BusfiveC v-else />
      <Bussix v-if="envs == 'tengwei'" />
      <BussixC v-else />
      <Busseven />
    </div>
    <div class="system_time">{{ timestr }}</div>
  </div>
</template>

<script>
import Map1 from "@/components/Map1";
import Busone from "@/components/Busone";
import Bustwo from "@/components/Bustwo";
import Busthree from "@/components/Busthree";
import Busfour from "@/components/Busfour";
import Busfive from "@/components/Busfive";
import Bussix from "@/components/Bussix";
import Busseven from "@/components/Busseven";
import BusfourC from "@/components/BusfourC";
import BusfiveC from "@/components/BusfiveC";
import BussixC from "@/components/BussixC";
import { mapMutations, mapGetters } from "vuex";
export default {
  components: {
    Map1,
    Busone,
    Bustwo,
    Busthree,
    Busfour,
    Busfive,
    Bussix,
    Busseven,
    BusfourC,
    BusfiveC,
    BussixC,
  },
  data() {
    return {
      envs: "",
      //   isFullscreen: false,
      isTrue: false,
      corpName: "",
      timestr: "",
      timers: null,
    };
  },
  methods: {
    ...mapMutations({
      changeTheme: "theme/changeTheme",
      setToken: "tokenCheck/setToken",
    }),
    changeThemes() {
      this.$store.state.theme.theme == "dark"
        ? this.changeTheme("light")
        : this.changeTheme("dark");
    },
    fullScreen() {
      let el = document.documentElement;
      //   this.isFullscreen =
      //     document.fullScreen ||
      //     document.mozFullScreen ||
      //     document.webkitIsFullScreen;
      if (!this.isTrue) {
        (el.requestFullscreen && el.requestFullscreen()) ||
          (el.mozRequestFullScreen && el.mozRequestFullScreen()) ||
          (el.webkitRequestFullscreen && el.webkitRequestFullscreen()) ||
          (el.msRequestFullscreen && el.msRequestFullscreen());
      } else {
        document.exitFullscreen
          ? document.exitFullscreen()
          : document.mozCancelFullScreen
          ? document.mozCancelFullScreen()
          : document.webkitExitFullscreen
          ? document.webkitExitFullscreen()
          : "";
      }
    },
    NowTime() {
      let myDate = new Date(),
        y = myDate.getFullYear(),
        M = myDate.getMonth() + 1,
        d = myDate.getDate(),
        h = myDate.getHours(),
        m = myDate.getMinutes(),
        s = myDate.getSeconds();
      M = check(M);
      d = check(d);
      h = check(h);
      m = check(m);
      s = check(s);
      this.timestr = y + "-" + M + "-" + d + " " + h + ":" + m + ":" + s;
      function check(i) {
        let num = i < 10 ? "0" + i : i;
        return num;
      }
    },
    resetScreenSize(dw, dh) {
      var init = function () {
        var el = document.querySelector("body");
        var hScale = window.innerHeight / (dh || 1080);
        var wScale = window.innerWidth / (dw || 1920);
        el.style.cssText =
          "transform: scale(" +
          wScale +
          ");transform-origin:left top;backgroundSize: 100% 100%";
      };

      window.onresize = this.debounce(init, 600);
      init();
    },
    debounce(func, wait, immediate) {
      var timeout;

      return function () {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
          var callNow = !timeout;
          timeout = setTimeout(() => {
            timeout = null;
          }, wait);
          if (callNow) func.apply(context, args);
        } else {
          timeout = setTimeout(function () {
            func.apply(context, args);
          }, wait);
        }
      };
    },
  },
  mounted() {
    document.addEventListener("fullscreenchange", () => {
      this.isTrue = !this.isTrue;
    });
    document.addEventListener("mozfullscreenchange", () => {
      this.isTrue = !this.isTrue;
    });
    document.addEventListener("webkitfullscreenchange", () => {
      this.isTrue = !this.isTrue;
    });
    document.addEventListener("msfullscreenchange", () => {
      this.isTrue = !this.isTrue;
    });
    this.envs = process.env.VUE_APP_TYPE;
    this.timers = setInterval(this.NowTime, 500);
    this.resetScreenSize(1920, 1080);
  },
  created() {
    let username = this.$route.query.username || this.Util.getCookie("tw_un");
    if (!username) {
      this.$router.push("/404");
      return;
    }
    this.$post("/tokenGet/menu/getToken", {
      username,
    }).then((res) => {
      this.setToken(res.data);
      this.$post("/api/getCorpname").then((res) => {
        this.corpName = res.data;
      });
    });
  },
  destroyed() {
    clearInterval(this.timers);
  },
};
</script>
<style lang="scss" scoped>
</style>

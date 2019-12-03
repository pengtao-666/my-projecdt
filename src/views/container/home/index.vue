<template>
    <div class="templateCont">
      <el-row :gutter="20" class="home">
        <el-col :lg="4">
          <div class="clock-main">
            <p>{{currentTiem}}</p>
            <p>{{currentDate}}</p>
          </div>
        </el-col>
        <el-col :lg="12">
          <div class="weather">
            <div class="left">
              <div>
                <p>{{city}}</p>
                <p>体感温度：{{weather.fl}}℃</p>
                <p>实测温度：{{weather.tmp}}℃</p>
              </div>
              <div>
                <p>风向：{{weather.wind_dir}}</p>
                <p>风力：{{weather.wind_sc}}</p>
                <p>风速：{{weather.wind_spd}}km/小时</p>
              </div>
              <div>
                <p>云量：{{weather.cloud}}</p>
                <p>降水量：{{weather.pcpn}}</p>
                <p>能见度：{{weather.vis}}</p>
              </div>
            </div>
            <div class="right">
              <div style="margin-left:5px;">
                <p>{{weather.tmp}}℃</p>
                <p>{{weather.cond_txt}}</p>
              </div>
              <img :src="weatherImg" alt="天气">
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import { parseTime } from '@/utils/date'
export default {
  data () {
    return {
      currentTiem: parseTime(new Date(), '{h}:{i}:{s}'),
      currentDate: parseTime(new Date(), '{y}年{m}月{d}日'),
      weather: '',
      weatherImg: '',
      city: ''
    }
  },
  mounted () {
    this.getCurrentTime()
    this.getWeather()
  },
  methods: {
    // 获取天气
    getWeather () {
      this.axios.get('https://free-api.heweather.net/s6/weather/now?location=auto_ip&key=6eeef1d9fb6a4f7c9e322dddc088e13b')
        .then(res => {
          this.city = res.data.HeWeather6[0].basic.location
          this.weather = res.data.HeWeather6[0].now
          if (this.currentTiem > '18:00:00') {
            this.weatherImg = require(`@/assets/cond-icon-heweather/${this.weather.cond_code}n.png`)
          } else {
            this.weatherImg = require(`@/assets/cond-icon-heweather/${this.weather.cond_code}.png`)
          }
        })
    },
    // 时间
    getCurrentTime () {
      setInterval(() => {
        this.currentTiem = parseTime(new Date(), '{h}:{i}:{s}')
      }, 1000)
    }
  }

}
</script>

<style lang="scss" scoped>
  .home{
    padding: 100px;
  }
  @mixin cont_style($h:120px){
    width: 100%;
    height: $h;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    display: flex;
  }
  .clock-main{
    @include cont_style();
    flex-direction: column;
    justify-content: center;
    p{
      text-align: center;
      display: block;
      font-size: 28px;
      color: #fff;
      font-weight: bold;
      &:last-child{
        font-size: 18px;
      }
    }
  }
  .weather{
    @include cont_style();
    justify-content: space-between;
    color: #fff;
    @mixin public_style($w,$fz){
      display: flex;
      justify-content: space-between;
      width: $w;
      font-size: $fz;
      padding: 5px;
    }
    .left{
      @include public_style(75%,18px);
    }
    .right{
      @include public_style(25%,38px);
      align-items: flex-end;
      background: rgba(255, 255, 255, 0.295);
      border-radius: 6px;
    }
  }
</style>

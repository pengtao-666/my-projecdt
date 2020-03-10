<template>
    <div class="templateCont">
      <el-row :gutter="20" class="home">
        <el-col :lg="4" :md="10" :sm="10">
          <div class="clock-main">
            <p>{{currentTiem}}</p>
            <p>{{currentDate}}</p>
          </div>
        </el-col>
        <el-col :lg="8" :md="14" :sm="14">
          <div class="remind">
            <h4>暂未开放</h4>
            <!-- <div>
              <a>1.这是一段很长很长的提醒这是一段很长很长的提醒</a>
              <a>2.这是一段很长很长的提醒</a>
            </div> -->
          </div>
        </el-col>
        <!-- 天气 -->
        <el-col :lg="12" :md="24" :sm="24">
          <div class="weather">
            <div class="left">
            <h3>{{city}}</h3>
              <div class="between">
                <div>
                <p>体感温度：{{weather.fl}}℃</p>
                <p>实测温度：{{weather.tmp}}℃</p>
              </div>
              <div>
                <p>风力：{{weather.wind_sc}}</p>
                <p>风向：{{weather.wind_dir}}</p>
                <p>风速：{{weather.wind_spd}}km/小时</p>
              </div>
              <div>
                <p>云量：{{weather.cloud}}</p>
                <p>降水量：{{weather.pcpn}}</p>
                <p>能见度：{{weather.vis}}</p>
              </div>
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
        <el-col :lg="10" :md="10" :sm="10" >
          <el-row>
            <el-col :lg="12" :md="12" :sm="12" style="padding-right:20px">
              <div class="article journal" @click="jump('/article')">
                <p>所有日志</p>
                <p>点击进入</p>
              </div>
            </el-col>
            <el-col :lg="12" :md="12" :sm="12">
              <el-col><div class="articles" @click="jump('/article/publish')"><p>发布日志</p></div></el-col>
              <el-col><div class="articles"><p>暂未开放</p><p>99</p></div></el-col>
            </el-col>
          </el-row>
        </el-col>
        <el-col :lg="14" :md="14" :sm="14">
          <el-row :gutter="10">
            <el-col :sm="24" :md="24" :lg="24"><div class="div2"><p>暂未开放</p></div></el-col>
            <el-col :sm="6" :md="6" :lg="6"><div class="div1"><p>暂未开放</p><p>99</p></div></el-col>
            <el-col :sm="6" :md="6" :lg="6"><div class="div1"><p>暂未开放</p></div></el-col>
            <el-col :sm="6" :md="6" :lg="6"><div class="div1"><p>暂未开放</p></div></el-col>
            <el-col :sm="6" :md="6" :lg="6"><div class="div1"><p>暂未开放</p></div></el-col>
          </el-row>
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
            try {
              this.weatherImg = require(`@/assets/cond-icon-heweather/${this.weather.cond_code}n.png`)
            } catch {
              this.weatherImg = require(`@/assets/cond-icon-heweather/${this.weather.cond_code}.png`)
            }
          } else {
            this.weatherImg = require(`@/assets/cond-icon-heweather/${this.weather.cond_code}.png`)
          }
        })
    },
    jump (url) {
      this.$router.push({
        path: url
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
  .templateCont{
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .el-col{
    margin-bottom: 20px;
  }
  @mixin cont_style($h:120px){
    width: 100%;
    height: $h;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
    border-radius: 6px;
    display: flex;
    color: #333;
    background: rgba(255, 255, 255, 0.5);
    transition: .3s;
    &:hover{
      transform: scale(1.05);
    }
  }
  .clock-main{
    @include cont_style();
    flex-direction: column;
    justify-content: center;
    p{
      text-align: center;
      display: block;
      font-size: 28px;
      font-weight: bold;
      &:last-child{
        font-size: 18px;
      }
    }
  }
  .remind{
    @include cont_style;
    flex-direction: column;
    padding: 10px;
    font-size: 20px;
    font-weight: normal;
    div{
      padding: 0 10px;
    }
    a{
      font-size: 18px;
      display: block;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      height: 36px;
      &:hover{
        text-decoration:underline;
      }
    }
  }
  .weather{
    @include cont_style();
    justify-content: space-between;
    @mixin public_style($w,$fz){
      display: flex;
      justify-content: space-between;
      width: $w;
      font-size: $fz;
      padding: 5px;
    }
    .left{
      width: 70%;
      padding: 5px;
      .between{
      @include public_style(100%,18px);
      p{height: 28px;}
      }
    }
    .right{
      @include public_style(25%,25px);
      align-items: flex-end;
      background: rgba(255, 255, 255, 0.295);
      border-radius: 6px;
      color: #409EFF;
      div{
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
      }
      p{text-align: center}
    }
  }
  .journal{
    flex-direction: column;
    justify-content: center;
    p{
      text-align: center;
      display: block;
      font-weight: bold;
      width: 100%;
      font-size: 38px;
      &:first-child{
        font-size: 18px;
      }
    }
  }
  .article{
    cursor: pointer;
    @include cont_style(280px);
  }
  .articles,.div1,.div2{
    @include cont_style(130px);
  }
  @media (max-width: 768px) {
    .div1,.div2,.articles{
      height: 100px;
    }
    .article{
      height: 220px;
    }
  }
</style>

<template>
  <div class="container">
    <canvas ref="stars" id="stars"></canvas>
    <el-form v-model="form" label-width="auto" class="login-wrap-form">
      <el-form-item label="账号">
        <el-input v-model="form.loginNum" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="are_you_ok">登录</el-button>
        <el-button type="warning" @click="region">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { apiLogin } from '../../api/index'
export default {
  data () {
    return {
      form: {
        loginNum: 'admin',
        password: 'admin'
      },
      context: null,
      arr: [],
      starCount: 600,
      rains: [],
      rainCount: 40
    }
  },
  mounted () {
    this.init()
    // 画星星
    for (let i = 0; i < this.starCount; i++) {
      var star = new this.Star(this)
      star.init()
      star.draw()
      this.arr.push(star)
    }
    // 画流星
    for (var i = 0; i < this.rainCount; i++) {
      var rain = new this.MeteorRain(this)
      rain.init()
      rain.draw()
      this.rains.push(rain)
    }
    setInterval(() => {
      this.playStars() // 绘制闪动的星星
    }, 300)
    setInterval(() => {
      this.playRains() // 绘制流星
    }, 5)
  },
  methods: {
    are_you_ok () {
      apiLogin(this.form).then(res => {
        if (res.msg === '成功') {
          sessionStorage.setItem('userInfo', JSON.stringify(res.data))
          this.$router.push({
            path: '/'
          })
        }
      })
    },
    region () {
      this.$message({
        message: '暂未开放',
        type: 'success'
      })
    },
    //   初始化画布及context
    init () {
      var starts = this.$refs.stars
      starts.width = window.innerWidth
      starts.height = window.innerHeight
      //   获取context
      this.context = starts.getContext('2d')
    },

    // 创建一个星星对象
    Star: function (_this) {
      this.x = window.innerWidth * Math.random() // 横坐标
      this.y = window.innerHeight * Math.random() // 纵坐标
      this.text = '.'
      this.color = 'white'
      this.getColor = function () {
        var _r = Math.random()
        if (_r < 0.5) {
          this.color = '#333'
        } else {
          this.color = 'white'
        }
      }
      // 初始化
      this.init = function () {
        this.getColor()
      }
      // 绘制
      this.draw = () => {
        _this.context.font = '20px Arial'
        _this.context.fillStyle = this.color
        _this.context.fillText(this.text, this.x, this.y)
      }
    },
    // 星星闪起来
    playStars () {
      for (var n = 0; n < 200; n++) {
        this.arr[n].getColor()
        this.arr[n].draw()
      }
    },
    // 流星
    MeteorRain: function (_this) {
      this.x = -1
      this.y = -1
      this.length = -1 // 长度
      this.angle = 30 // 倾斜角度
      this.width = -1 // 宽度
      this.height = -1 // 高度
      this.speed = 1 // 速度
      this.offset_x = -1 // 横轴移动偏移量
      this.offset_y = -1 // 纵轴移动偏移量
      this.alpha = 1 // 透明度
      this.color1 = '' // 流星的色彩
      this.color2 = '' // 流星的色彩
      /** **************初始化函数********************/
      this.init = function () {
        this.getPos()
        this.alpha = 1 // 透明度
        this.getRandomColor()
        // 最小长度，最大长度
        var x = Math.random() * 80 + 150
        this.length = Math.ceil(x)
        //         x = Math.random()*10+30;
        this.angle = 30 // 流星倾斜角
        x = Math.random() + 0.5
        this.speed = Math.ceil(x) // 流星的速度
        var cos = Math.cos((this.angle * 3.14) / 180)
        var sin = Math.sin((this.angle * 3.14) / 180)
        this.width = this.length * cos // 流星所占宽度
        this.height = this.length * sin // 流星所占高度
        this.offset_x = this.speed * cos
        this.offset_y = this.speed * sin
      }
      /** ************获取随机颜色函数*****************/
      this.getRandomColor = function () {
        var a = Math.ceil(255 - 240 * Math.random())
        // 中段颜色
        this.color1 = 'rgba(' + a + ',' + a + ',' + a + ',1)'
        // 结束颜色
        this.color2 = '#090723'
      }
      /** *************重新计算流星坐标的函数******************/
      this.countPos = function () {
        // 往左下移动,x减少，y增加
        this.x = this.x - this.offset_x
        this.y = this.y + this.offset_y
      }
      /** ***************获取随机坐标的函数*****************/
      this.getPos = function () {
        // 横坐标200--1200
        this.x = Math.random() * window.innerWidth // 窗口高度
        // 纵坐标小于600
        this.y = Math.random() * window.innerHeight // 窗口宽度
      }
      /** **绘制流星***************************/
      this.draw = function () {
        _this.context.save()
        _this.context.beginPath()
        _this.context.lineWidth = 1 // 宽度
        _this.context.globalAlpha = this.alpha // 设置透明度
        // 创建横向渐变颜色,起点坐标至终点坐标
        var line = _this.context.createLinearGradient(
          this.x,
          this.y,
          this.x + this.width,
          this.y - this.height
        )
        // 分段设置颜色
        line.addColorStop(0, '#f5742e')
        line.addColorStop(0.3, this.color1)
        line.addColorStop(0.6, this.color2)
        _this.context.strokeStyle = line
        // 起点
        _this.context.moveTo(this.x, this.y)
        // 终点
        _this.context.lineTo(this.x + this.width, this.y - this.height)
        _this.context.closePath()
        _this.context.stroke()
        _this.context.restore()
      }
      this.move = function () {
        // 清空流星像素
        var x = this.x + this.width - this.offset_x
        var y = this.y - this.height
        _this.context.clearRect(
          x - 3,
          y - 3,
          this.offset_x + 5,
          this.offset_y + 5
        )
        //         context.strokeStyle="red";
        //         context.strokeRect(x,y-1,this.offset_x+1,this.offset_y+1);
        // 重新计算位置，往左下移动
        this.countPos()
        // 透明度增加
        this.alpha -= 0.002
        // 重绘
        this.draw()
      }
    },
    // 绘制流星
    playRains () {
      for (var n = 0; n < this.rainCount; n++) {
        var rain = this.rains[n]
        // 移动
        rain.move()
        if (rain.y > window.innerHeight) {
          // 超出界限后重来
          this.context.clearRect(
            rain.x,
            rain.y - rain.height,
            rain.width,
            rain.height
          )
          this.rains[n] = new this.MeteorRain(this)
          this.rains[n].init()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  background: #000;
}
.login-wrap-form {
  width: 20%;
  padding: 40px 20px 20px;
  background: #fff;
  box-shadow: 0 0 30px #437bf1;
  border-radius: 6px;
  z-index: 999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .el-form-item:last-child {
    display: flex;
    justify-content: center;
    margin-left: -20px;
  }
}
</style>

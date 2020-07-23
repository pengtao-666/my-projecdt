/*
 * @Date: 2020-07-16 17:02:46
 * @LastEditTime: 2020-07-17 14:58:39
 * @Description: 测试
 */
function f1 () {
  let b = new Date().getTime() + ''
  for (let i = 0; i < 4; i++) {
    let a = parseInt(Math.random() * b.length)
    let aa = parseInt(Math.random() * 10)
    b = `${b.substring(0, a)}${aa}${b.substring(a, b.length)}`
  }
}

let i = 0
let timer = setInterval(() => {
  i++
  f1()
  if (i > 10) clearInterval(timer)
}, 700)

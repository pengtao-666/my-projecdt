/*
 * @Date: 2020-07-16 17:02:46
 * @LastEditTime: 2020-07-16 17:29:43
 * @Description: 测试
 */
function f1 (time, name) {
  return new Promise((resolve, reject) => {
    let i = 0
    let timer = setInterval(() => {
      if (i > 10) {
        clearInterval(timer)
        resolve({ i, name })
      }
      console.log(i, name)
      i++
    }, time)
  })
}

Promise.all([f1(1000, '一号'), f1(1500, '二号')]).then(res => {
  console.log(res)
})

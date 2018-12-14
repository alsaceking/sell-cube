export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

// 获取星期几
let weeks = ['日', '一', '二', '三', '四', '五', '六']
export function getWeek(date) {
  if (date >= 0) {
    return weeks[date % 7]
  } else {
    return weeks[7 - Math.abs(date)]
  }
}
// 根据当前日期计算前后几日的日期
export function getNewDate(year, month, newday) {
  let leapyear = year % 4 ? 0 : 1

  if ((month + 1) === 2) {
    if (newday > 0 && newday <= (28 + leapyear)) {
      return newday
    } else if (newday > 28 + leapyear) {
      return newday % (28 + leapyear)
    } else {
      return 31 - Math.abs(newday)
    }
  } else if (month === 3 || month === 5 || month === 8 || month === 10) {
    if (newday > 0 && newday <= 30) {
      return newday
    } else if (newday > 30) {
      return newday % 30
    } else {
      return 31 - Math.abs(newday)
    }
  } else {
    if (newday > 0 && newday <= 31) {
      return newday
    } else if (newday > 31) {
      return newday % 31
    } else {
      if (month === 4 || month === 6 || month === 9 || month === 11) {
        return 30 - Math.abs(newday)
      } else {
        return 31 - Math.abs(newday)
      }
    }
  }
}
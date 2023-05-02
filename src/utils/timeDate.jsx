export function timestampToDate(value) {
    const date = new Date(value)
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    let d = date.getDate()
  
    y = Math.abs(y)
    const ySplit = y.toString().split('')
  
    if (ySplit.length < 4) {
      const prefix = '0'.repeat(4 - ySplit.length)
      y = prefix + y
    }
    y = ySplit.slice(-4).join('')
  
    if (m < 10) m = '0' + m
    if (d < 10) d = '0' + d
  
    return `${y}-${m}-${d}`
  }
  
  export function formatDate(date, format = 'YY-M-D') {
    const dt = new Date(date)
    const dd = dt.getDate()
    const mm = dt.getMonth() + 1
    const yy = dt.getFullYear()
    let str = format
  
    str = str.replace('D', dd > 9 ? dd : '0' + dd)
    str = str.replace('M', mm > 9 ? mm : '0' + mm)
    str = str.replace('YY', yy)
    str = str.replace('Y', yy.toString().substring(-2))
  
    return str
  }
  
  // export default function ShowDate() {
  //   const current = new Date()
  //   const date = `${current.getDate()}.${current.getMonth() + 1}.${current.getFullYear()}`
  
  //   return (
  //     <div>
  //       <h3>Date: {date}</h3>
  //     </div>
  //   )
  // }
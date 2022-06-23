
const DateFormat=(datetime, formatStr='YYYY-MM-DD')=>{
  var dat = datetime;
  var str = formatStr;
  var Week = ['日', '一', '二', '三', '四', '五', '六'];
  str = str.replace(/yyyy|YYYY/, dat.getFullYear());
  str = str.replace(/yy|YY/, (dat.getYear() % 100) > 9 ? (dat.getYear() % 100).toString() : '0' + (dat.getYear() % 100));
  str = str.replace(/MM/, (dat.getMonth()+1) > 9 ? (dat.getMonth() + 1).toString() : '0' + (dat.getMonth() + 1));
  str = str.replace(/M/g, (dat.getMonth() + 1));
  str = str.replace(/w|W/g, Week[dat.getDay()]);
  str = str.replace(/dd|DD/, dat.getDate() > 9 ? dat.getDate().toString() : '0' + dat.getDate());
  str = str.replace(/d|D/g, dat.getDate());
  str = str.replace(/hh|HH/, dat.getHours() > 9 ? dat.getHours().toString() : '0' + dat.getHours());
  str = str.replace(/h|H/g, dat.getHours());
  str = str.replace(/mm/, dat.getMinutes() > 9 ? dat.getMinutes().toString() : '0' + dat.getMinutes());
  str = str.replace(/m/g, dat.getMinutes());
  str = str.replace(/ss|SS/, dat.getSeconds() > 9 ? dat.getSeconds().toString() : '0' + dat.getSeconds());
  str = str.replace(/s|S/g, dat.getSeconds());
  return str
}

module.exports = {
  DateFormat
}

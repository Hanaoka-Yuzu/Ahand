const formatTime = date => {
  // const year = date.getFullYear()
  // const month = date.getMonth() + 1
  // const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  return [hour, minute, second].map(formatNumber).join(':')
}

function timeFormat(date){
  var newDate;
  if(typeof date==='string'){
    newDate=new Date(Date.parse(date));
  }
  if(typeof date==='date'){
    newDate=date;
  }
  var y=newDate.getFullYear(), m=newDate.getMonth(), d=newDate.getDate();
  var hour=newDate.getHours(), minute=newDate.getMinutes(), second=newDate.getSeconds();
  var time="";
  if(hour<10) time+="0";
  time+=(hour.toString()+":");
  if(minute<10) time+="0";
  time+=(minute.toString()+":");
  if(second<10) time+="0";
  time+=(second.toString());
  var currentDate=new Date();
  if(currentDate.getFullYear()===y){
    if(currentDate.getDate()===d){
      return time;
    }
    var tmp=new Date(newDate);
    tmp.setDate(tmp.getDate()+1);
    if(currentDate.getMonth()===tmp.getMonth()&&currentDate.getDate()===tmp.getDate()){
      return '昨天 '+time;
    }
    return (m+1).toString()+'-'+d.toString()+' '+time;
  }
  return y.toString()+'-'+(m+1).toString()+'-'+d.toString()+' '+time;

}

const formatNumber = n => {
      n = n.toString()
      return n[1] ? n : '0' + n
  }
  //数组去重
function contains(arr, obj) {
  var i = arr.length;
  while (i--) {
      if (arr[i] === obj) {
          return true;
      }
  }
  return false;
}

module.exports = {
  formatTime: formatTime,
  contains: contains,
  timeFormat: timeFormat
}
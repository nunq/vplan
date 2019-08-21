var fullurl = ""
var classfile = ""
Date.prototype.getWeekNumber=function(){var d=new Date(Date.UTC(this.getFullYear(),this.getMonth(),this.getDate()));var dayNum=d.getUTCDay()||7;d.setUTCDate(d.getUTCDate()+4-dayNum);var yearStart=new Date(Date.UTC(d.getUTCFullYear(),0,1));weekNum=Math.ceil((((d-yearStart)/86400000)+1)/7);return(weekNum<10?"0":"")+weekNum;}
function redir() {
  window.location.href = fullurl+new Date().getWeekNumber()+classfile;
}
// cuts old items
var d2 = new Date();
for (i=0; i<document.getElementsByTagName("p").length; i++) {
  var daymonth = document.getElementsByTagName("p")[i].innerHTML.match(/[0-9]{1,2}\.[0-9]{1,2}\./g)[0].match(/[0-9]{1,2}/g);
  if (daymonth[0] < d2.getDate() || daymonth[1] < (d2.getMonth()+1) || (daymonth[0] == d2.getDate() && d2.getHours() > 16) ) {
    document.getElementsByTagName("p")[i].style.display = "none";
  }
}

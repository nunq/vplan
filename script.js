var fullurl = ""
var classfile = ""
const ls = window.localStorage;
Date.prototype.getWeekNumber=function(){var d=new Date(Date.UTC(this.getFullYear(),this.getMonth(),this.getDate()));var dayNum=d.getUTCDay()||7;d.setUTCDate(d.getUTCDate()+4-dayNum);var yearStart=new Date(Date.UTC(d.getUTCFullYear(),0,1));weekNum=Math.ceil((((d-yearStart)/86400000)+1)/7);return(weekNum<10?"0":"")+weekNum;}
function redir() {
  window.location.href = fullurl+new Date().getWeekNumber()+classfile;
}
function f5() {
  location.reload(true);
}
// item hiding funcs
function hideold() {
  const d2 = new Date();
  for (i=0; i<document.getElementsByTagName("p").length; i++) {
    var daymonth = document.getElementsByTagName("p")[i].innerHTML.match(/[0-9]{1,2}\.[0-9]{1,2}\./g)[0].match(/[0-9]{1,2}/g);
    if (daymonth[0] < d2.getDate() || daymonth[1] < (d2.getMonth()+1) || (daymonth[0] == d2.getDate() && d2.getHours() > 16) ) {
      document.getElementsByTagName("p")[i].style.display = "none";
    }
  }
}
function showall() {
  for (i=0; i<document.getElementsByTagName("p").length; i++) {
    document.getElementsByTagName("p")[i].style.display = "block";
  }
}
function openfm() {
  document.getElementById("filtermenu").style.display = "block";
  if (ls.getItem("filters") === null) {
    alert("enter comma separated filters, if an item contains a filter, it will be hidden, enter nothing to undo the filters");
  }
}
function filter() {
  if (ls.getItem("filters") !== null) {
  document.getElementById("tb").value = (ls.getItem("filters")=="cXZ4QTdFekpOQ2czS20zeQo") ? "" : ls.getItem("filters");
    filters = ls.getItem("filters").split(",");
    for (i=0; i<document.getElementsByTagName("p").length; i++) {
      document.getElementsByTagName("p")[i].style.display = "block";
      var text = document.getElementsByTagName("p")[i].innerHTML;
      for (j=0; j<filters.length; j++) {
        if (text.match(new RegExp(".*"+filters[j]+".*"))) {
          document.getElementsByTagName("p")[i].style.display = "none";
        }
      }
    }
  }
  hideold();
}
function setfilters() {
  ls.clear();
  ls.setItem("filters", document.getElementById("tb").value);
  if (ls.getItem("filters") == "") {
    ls.setItem("filters", "cXZ4QTdFekpOQ2czS20zeQo"); //regex that won't match
  }
  filter();
  document.getElementById("filtermenu").style.display = "none";
}
window.addEventListener('DOMContentLoaded', (event) => {
    filter();
});

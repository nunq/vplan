var fullurl = ""
var classfile = ""
var doshowall = false;
var filters;
const ls = window.localStorage;
const d2 = new Date();
const weekdays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
Date.prototype.getWeekNumber=function(){var d=new Date(Date.UTC(this.getFullYear(),this.getMonth(),this.getDate()));var dayNum=d.getUTCDay()||7;d.setUTCDate(d.getUTCDate()+4-dayNum);var yearStart=new Date(Date.UTC(d.getUTCFullYear(),0,1));weekNum=Math.ceil((((d-yearStart)/86400000)+1)/7);return(weekNum<10?"0":"")+weekNum;}
function redir() { window.location.href = fullurl+new Date().getWeekNumber()+classfile; };
function f5() { if (window.navigator.onLine) {location.reload(true);} };
function hideold(includeall) {
  while (document.getElementsByTagName("h2")[0]) { document.getElementsByTagName("h2")[0].parentNode.removeChild(document.getElementsByTagName("h2")[0]) };
  var dateofprevitem = document.getElementsByClassName("item")[0].classList[0].match(/[0-9]{1,2}\.[0-9]{1,2}\./g)[0].match(/[0-9]{1,2}/g);
    document.getElementsByClassName("item")[0].insertAdjacentHTML("beforebegin", "<h2>"+getweekday(dateofprevitem[1]-1, dateofprevitem[0])+" "+((dateofprevitem[0].length<2?"0":"")+dateofprevitem[0])+"."+((dateofprevitem[1].length<2?"0":"")+dateofprevitem[1])+"</h2>");
  for (i=0; i<document.getElementsByClassName("item").length; i++) {
    var daymonth = document.getElementsByClassName("item")[i].classList[0].match(/[0-9]{1,2}\.[0-9]{1,2}\./g)[0].match(/[0-9]{1,2}/g);
    if ( ((daymonth[0] < d2.getDate() && daymonth[1] <= (d2.getMonth()+1)) || daymonth[1] < (d2.getMonth()+1) || (daymonth[0] == d2.getDate() && d2.getHours() > 16)) && !includeall ) {
      document.getElementsByClassName("item")[i].style.display = "none";
    }
    if (daymonth[0] > dateofprevitem[0] || daymonth[1] > dateofprevitem[1]) {
        document.getElementsByClassName("item")[i].insertAdjacentHTML("beforebegin", "<h2>"+getweekday(daymonth[1]-1, daymonth[0])+" "+((daymonth[0].length<2?"0":"")+daymonth[0])+"."+((daymonth[1].length<2?"0":"")+daymonth[1])+"</h2>");
    dateofprevitem[0] = daymonth[0];
    dateofprevitem[1] = daymonth[1];
  }}
  if (!includeall) {
    for (i=0; i<document.getElementsByTagName("h2").length; i++) {
      var h2dm = document.getElementsByTagName("h2")[i].innerHTML.replace(/^[a-zA-Z]*? /, "").replace(/^0/, "").replace(/\.0/, ".").match(/[0-9]{1,2}\.[0-9]{1,2}/g)[0].match(/[0-9]{1,2}/g);
      for (j=0; j<document.getElementsByClassName(h2dm[0]+"."+h2dm[1]+".").length; j++) {
        if (document.getElementsByClassName(h2dm[0]+"."+h2dm[1]+".")[j].style.display !== "none") { break; };
        document.getElementsByTagName("h2")[i].style.display = "none";
  }}}
}
function getweekday(day, month) {
  var weekday = new Date(d2.getFullYear(), day, month).getDay();
  return weekdays[weekday];
}
function selectview() {
  if (!doshowall) {
    document.getElementById("viewsel").classList.remove("fa-eye");
    document.getElementById("viewsel").classList.add("fa-eye-slash");
    for (i=0; i<document.getElementsByClassName("item").length; i++) {
      document.getElementsByClassName("item")[i].style.display = "";
    }
    hideold(true);
    doshowall = true;
    } else if (doshowall) {
    document.getElementById("viewsel").classList.remove("fa-eye-slash");
    document.getElementById("viewsel").classList.add("fa-eye");
    filter();
    doshowall = false;
}}
function openfm() {
  filters = prompt("enter comma separated filters, if an item contains a filter, it will be hidden, enter nothing to undo the filters", (ls.getItem("filters")==="cXZ4QTdFekpOQ2czS20zeQo" || ls.getItem("filters")===null) ? "" : ls.getItem("filters"));
  if (filters === "") {
    ls.setItem("filters", "cXZ4QTdFekpOQ2czS20zeQo"); //regex that won't match
  } else if (filters !== null && filters !== "null") {
    ls.setItem("filters", filters);
  }
    filter();
}
function filter() {
  if (ls.getItem("filters") !== null && ls.getItem("filters") !== "null") {
    filters = ls.getItem("filters").split(",");
    for (i=0; i<document.getElementsByClassName("item").length; i++) {
      document.getElementsByClassName("item")[i].style.display = "";
      var text = document.getElementsByClassName("item")[i].innerHTML;
      for (j=0; j<filters.length; j++) {
        if (text.match(new RegExp(".*"+filters[j]+".*"))) {
          document.getElementsByClassName("item")[i].style.display = "none";
}}}} hideold(false); }
function pinheader() {
  var header = document.getElementsByClassName("header")[0];
  (window.pageYOffset > header.offsetTop) ? header.classList.add("sticky") : header.classList.remove("sticky");
}
window.addEventListener('DOMContentLoaded', (event) => {
  filter();
});
window.onscroll = function() { pinheader(); };

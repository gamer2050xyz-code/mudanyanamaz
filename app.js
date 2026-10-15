var NAMES=["İmsak","Güneş","Öğle","İkindi","Akşam","Yatsı"];
var LAT=40.376,LON=28.884,R=Math.PI/180;
function pad(n){return(n<10?"0":"")+n}
function key(d){return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate())}
function fmt(m){m=Math.round(m);return pad(Math.floor(m/60))+":"+pad(m%60)}
// Diyanet yöntemine yakın hesap: İmsak 18°, Yatsı 17°, İkindi standart, Diyanet tampon süreleri
function calc(d){
  var N=Math.round((new Date(d.getFullYear(),d.getMonth(),d.getDate())-new Date(d.getFullYear(),0,0))/864e5);
  var B=2*Math.PI*(N-1)/365;
  var dec=0.006918-0.399912*Math.cos(B)+0.070257*Math.sin(B)-0.006758*Math.cos(2*B)+0.000907*Math.sin(2*B)-0.002697*Math.cos(3*B)+0.00148*Math.sin(3*B);
  var eot=229.18*(0.000075+0.001868*Math.cos(B)-0.032077*Math.sin(B)-0.014615*Math.cos(2*B)-0.04089*Math.sin(2*B));
  var noon=720+4*(45-LON)-eot,s=Math.sin(LAT*R)*Math.sin(dec),c=Math.cos(LAT*R)*Math.cos(dec);
  function H(a){return Math.acos((Math.sin(a*R)-s)/c)/R*4}
  var asrAlt=Math.atan(1/(1+Math.tan(Math.abs(LAT*R-dec))))/R;
  return [noon-H(-18),noon-H(-0.833)-5,noon+4,noon+H(asrAlt)+4,noon+H(-0.833)+7,noon+H(-17)].map(fmt);
}
function times(d){var k=key(d);return SNAP[k]?{t:SNAP[k].split(" "),snap:true}:{t:calc(d),snap:false}}
var view=new Date();
function now(){var n=new Date();return new Date(n.getTime()+(180+n.getTimezoneOffset())*6e4)} // İstanbul saati
function mins(s){var p=s.split(":");return +p[0]*60+ +p[1]}
function render(){
  var n=now(),isToday=key(view)===key(n),r=times(view),cur=-1;
  document.getElementById("dt").textContent=view.toLocaleDateString("tr-TR",{day:"numeric",month:"long",year:"numeric",weekday:"long"});
  if(isToday){var m=n.getHours()*60+n.getMinutes();r.t.forEach(function(x,i){if(m>=mins(x))cur=i})}
  document.getElementById("ls").innerHTML=r.t.map(function(x,i){return '<div class="row'+(i===cur?' on':'')+'"><span>'+NAMES[i]+'</span><span>'+x+'</span></div>'}).join("");
  document.getElementById("td").style.display=isToday?"none":"block";
  document.getElementById("sr").textContent=r.snap?
    "Kaynak: Diyanet İşleri Başkanlığı verileriyle uyumlu yayınlanmış Mudanya listesi.":
    "Bu gün için vakitler, Diyanet yöntemine (İmsak 18°, Yatsı 17°) göre Mudanya koordinatlarından hesaplanmıştır; resmî değerden ±1–2 dk sapabilir. Kesin saat için namazvakitleri.diyanet.gov.tr adresine bakın.";
}
function tick(){
  var n=now(),r=times(n).t,sec=n.getHours()*3600+n.getMinutes()*60+n.getSeconds(),i=-1,target;
  for(var j=0;j<6;j++){if(mins(r[j])*60>sec){i=j;break}}
  if(i<0){var tm=new Date(n.getTime()+864e5);target=mins(times(tm).t[0])*60+86400;i=0}else target=mins(r[i])*60;
  var d=target-sec;
  document.getElementById("nx").textContent=NAMES[i]+" · "+(i===0&&target>86400?times(new Date(n.getTime()+864e5)).t[0]:r[i]);
  document.getElementById("cd").textContent=pad(Math.floor(d/3600))+":"+pad(Math.floor(d%3600/60))+":"+pad(d%60);
  document.getElementById("lbl").textContent="Sıradaki vakte kalan süre";
}
function shift(k){view=new Date(view.getFullYear(),view.getMonth(),view.getDate()+k);render()}
document.getElementById("pv").onclick=function(){shift(-1)};
document.getElementById("nt").onclick=function(){shift(1)};
document.getElementById("td").onclick=function(){var n=now();view=new Date(n.getFullYear(),n.getMonth(),n.getDate());render()};
(function(){var n=now();view=new Date(n.getFullYear(),n.getMonth(),n.getDate())})();
render();tick();setInterval(function(){tick();if(key(view)===key(now()))render()},1000);

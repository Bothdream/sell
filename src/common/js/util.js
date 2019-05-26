/**
 *  解析url
 *  @?id=123&a=b
 *  @return {id:123,a:b}
 */
export function urlParse () {
  let url =  window.location.search; 
  let o = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg);
  //["?id=1234","&a=b"]
  if (arr) {
     arr.forEach((item)=>{
         let tempArr = item.substring(1).split("=");
         let k = decodeURIComponent(tempArr[0]);
         let v = decodeURIComponent(tempArr[1]);
         o[k] =v
     });
  }
  return o;
};
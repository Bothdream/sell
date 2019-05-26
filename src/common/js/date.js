export function formatDate(time,format) {
     if(/(y+)/.test(format)) {
        format = format.replace(RegExp.$1,(time.getFullYear()+"").substr(4 - RegExp.$1.length));
     }
     let o = {
     	"M+":time.getMonth() + 1,
     	"d+":time.getDate(),
     	"h+":time.getHours(),
     	"m+":time.getMinutes(),
     	"s+":time.getSeconds()
     };
     for(let k in o) {
     	if(new RegExp(`(${k})`).test(format)) {
           let str = o[k] + "";
           format = format.replace(RegExp.$1,(RegExp.$1.length === 1?str:padLeftZero(str)));
     	}      
     }
     return format;
};

function padLeftZero(str) {
	return ("00" + str).substr(str.length);
}
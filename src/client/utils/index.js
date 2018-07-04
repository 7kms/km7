export const qs = (search)=>{
    let obj = {};
    if(search){
        let str = ''
        if(search.indexOf('?') === 0){
            str = search.slice(1);
        }
        let paramsArr = str.split('&');
        paramsArr.forEach((item) => {
            let arr = item.split('=');
            let key = arr[0],value = arr[1];
            obj[key] = obj[key] ? obj[key] = [].concat(obj[key],value) : value;
        })
    }
    return obj;
}

export const object2querystr = (obj)=>{
    let str = Object.keys(obj).map(key=>{
        return `${key}=${encodeURIComponent(obj[key])}`
    }).join('&');
    return str;
}

export const getVarType = (obj)=>{
    const toString = Object.prototype.toString;
    const class2type = {
        "[object Boolean]": "boolean",
        "[object Number]": "number",
        "[object String]": "string",
        "[object Function]": "function",
        "[object Array]": "array",
        "[object Date]": "date",
        "[object RegExp]": "regexp",
        "[object Object]": "object"
    };
    return obj == null ? String(obj) : class2type[toString.call(obj)] || "object"
}

export const guid = ()=>{
    function S4() {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4()
}

export const getBrowserInfo = ()=>{
    var Sys = {};
    var ua = window.navigator.userAgent.toLowerCase();
    var s;
    /*eslint-disable*/
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
        (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
            (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
                (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
                (s = ua.match(/iphone.*([\d.]+)/)) ? Sys.iphone = s[1] :
                (s = ua.match(/android.*([\d.]+)/)) ? Sys.android = s[1] :
                    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
                        (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
    /*eslint-enable*/
    if (Sys.ie) {
        return 'IE:' + Sys.ie;
    }
    if (Sys.firefox) {
        return 'Firefox:' + Sys.firefox;
    }
    if (Sys.chrome) {
        return 'Chrome:' + Sys.chrome;
    }
    if (Sys.android) {
        return 'Andorid:' + Sys.chrome;
    }
    if (Sys.iphone) {
        return 'iPhone:' + Sys.chrome;
    }
    if (Sys.opera) {
        return 'Opera:' + Sys.opera;
    }
    if (Sys.safari) {
        return 'Safari:' + Sys.safari;
    }
    if (Sys.opera) {
        return 'Opera:' + Sys.opera;
    }
    else {
        return 'Unkown'
    }
}


export const UTCTimestamp = ()=>{
    let date = new Date();
    return date.getTime() + date.getTimezoneOffset() * 60000;
}
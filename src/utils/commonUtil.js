import moment from 'moment';
/** Date */
Date.prototype.format = function(fmt) {
    let o = {
        'M+': this.getMonth() + 1, //月份
        'd+': this.getDate(), //日
        'h+': this.getHours(), //小时
        'm+': this.getMinutes(), //分
        's+': this.getSeconds(), //秒
        'q+': Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds(), //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (let k in o) if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    return fmt;
};
Date.prototype.addHours = function(h) {
    let copiedDate = new Date(this.getTime());
    copiedDate.setHours(copiedDate.getHours() + h);
    return copiedDate;
};
Date.prototype.addMins = function(m) {
    let copiedDate = new Date(this.getTime());
    copiedDate.setMinutes(copiedDate.getMinutes() + m);
    return copiedDate;
};
Date.prototype.addDays = function(d) {
    let copiedDate = new Date(this.getTime());
    copiedDate.setDate(copiedDate.getDate() + d);
    return copiedDate;
};
/* Date **/

/** param */
export let getUrlParameterValue = function(paramName) {
    let url = document.location.href;
    let start = url.indexOf('?') + 1;
    if (start == 0) {
        return '';
    }
    let value = '';
    let queryString = url.substring(start);
    let paraNames = queryString.split('&');
    for (let i = 0; i < paraNames.length; i++) {
        if (paramName == extractParameterName(paraNames[i])) {
            value = extractParameterValue(paraNames[i]);
        }
    }
    return value;
};
let extractParameterName = function(param) {
    let start = param.indexOf('=');
    if (start == -1) {
        return param;
    }
    return param.substring(0, start);
};
let extractParameterValue = function(param) {
    let start = param.indexOf('=');
    if (start == -1) {
        return '';
    }
    return param.substring(start + 1);
};
/* param **/

export const getSel2Opts = function(data, id, text) {
    let opts = [];
    data.forEach((el) => {
        opts.push({
            id: el[id],
            text: el[text],
        });
    });
    return opts;
};

export const memId = getUrlParameterValue('memId') || 'memId';
export const session = getUrlParameterValue('session');
export const theme = getUrlParameterValue('theme');
export const lang = getUrlParameterValue('lang') || 'zh-TW';
moment.locale(lang);
const webpack = require('webpack');
const path = require('path');
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/Connesia/' : '/',
    pages: {
        deviceMonitor: {
            entry: 'src/pages/deviceMonitor/main.js',
            template: 'public/deviceMonitor.html',
            filename: 'deviceMonitor.html',
        },
        messageSetting: {
            entry: 'src/pages/messageSetting/main.js',
            template: 'public/messageSetting.html',
            filename: 'messageSetting.html',
        },
        trigErrorCodeReport: {
            entry: 'src/pages/trigErrorCodeReport/main.js',
            template: 'public/trigErrorCodeReport.html',
            filename: 'trigErrorCodeReport.html',
        },
    },
    filenameHashing:false,
    productionSourceMap:false,
    chainWebpack: (config) => {
        config.plugin('copy').tap(([pathConfigs]) => {
            pathConfigs.unshift({
                from: 'conf',
                to: 'conf',
            });
            return [pathConfigs];
        });
    },
};

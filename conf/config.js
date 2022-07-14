(function(window) {
    window.__env = window.__env || {};

    var conf = {
        cnApiDomainName: 'http://192.168.9.228:8080//Connesia/',
    };

    window.conf = conf;
    window.__env.url = {
        CN_URL: conf.cnApiDomainName,
    };
})(this);
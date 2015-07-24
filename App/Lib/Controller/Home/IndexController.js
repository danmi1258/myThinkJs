var cp = require('child_process');

module.exports = Controller("Home/BaseController", function () {
    var worker;
    return {
        indexAction: function () {
            var self = this;
            this.assign('wsport', C('port'));
            D('config').field('configName').select().then(function (data) {
                var list = [];
                data.forEach(function (row) {
                    list.push(row.configName);
                });
                self.assign('wsport', C('port'));
                self.assign('list', list);
                return self.display();
            });
        },
        openAction: function () {
            var _ws = this.http.websocket;
            this.http.on("websocket.close", function () {
                console.log('close')
            });
        },
        messageAction: function () {
            var _ws = this.http.websocket;
            var message = this.get();
            console.log(message);
            if (message.action === 'start') {
                /// 开启子进程来执行抓取
                worker = cp.fork(LIB_PATH + '/crawler.js');
                worker.on("message", function (data) {
                    _ws.send(data);
                });
                worker.on("close", function (code, signal) {
                    !code && _ws.send(JSON.stringify({ color: 'redBG', info: !signal ? '执行完毕' : '已手动停止抓取', status: 0 }));
                });

                /// 将要使用的配置文件名传送给子进程
                worker.send(message.config);
            } else if (message.action === "stop") {
                worker.kill();
            }
        }
    };
});
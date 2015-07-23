module.exports = Controller(function () {
    //websocket列表
    var wsList = {};
    setInterval(function () {
        for (var id in wsList) {
            wsList[id].send({
                name: '机器人',
                text: '每隔10秒我就发一条消息哦'
            })
        }
    }, 10000)
    return {
        indexAction: function () {
            this.display();
        },
        /**
         * 建立连接
         * @return {[type]} [description]
         */
        openAction: function () {
            var websocket = this.http.websocket;
            var id = websocket.id;
            for (var wid in wsList) {
                wsList[wid].send({
                    name: '系统',
                    text: 'id_' + id + '进入了聊天室'
                });
            }
            wsList[id] = websocket;
            this.http.on("websocket.close", function () {
                console.log('close')
                delete wsList[id];
                for (var wid in wsList) {
                    wsList[wid].send({
                        name: 'id_' + id,
                        text: 'goodbye~~'
                    });
                }
            })
        },
        /**
         * 获取到消息
         * @return {[type]} [description]
         */
        messageAction: function () {
            var data = this.get();
            data.name = 'id_' + this.http.websocket.id;
            data.wslength = Object.keys(wsList).length;
            //有消息后向所有人广播
            for (var id in wsList) {
                wsList[id].send(data);
            }
        }
    }
})
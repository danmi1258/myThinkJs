process.on('message', function (m) {
    /*D('config').where({configName: m}).find().then(function (data) {
        if (!isEmpty(data.levels)) {
            data.levels = JSON.parse(data.levels);
        }
        console.log(data.selector);
    });*/
    console.log('CHILD got message:', m);
});
process.send({ color: 'red', info: 'starting...' });
module.exports = Controller("Home/BaseController", function () {
    "use strict";
    return {
        addAction: function () {
            var self = this;
            var myPost = this.post();
            var selector = [];
            JSON.parse(myPost.levels).forEach(function (element, index) {
                selector.push({
                    $: element.selector,
                    attr: element.attr
                });
            });
            myPost.selector = JSON.stringify(selector);
            myPost.isPagination = !!myPost.page ? 1 : 0;
            myPost.mode = 'web';
            delete myPost.page;
            delete myPost.levels;

            D('config').thenAdd(myPost, {configName: myPost.configName}).then(function (id) {
                var result = {
                    status: true,
                    info: "保存成功",
                    error: null
                };
                return self.json(result);
            });
        },
        deleteAction: function () {
            this.end('add');
        },
        editAction: function () {
            var self = this;
            var configName = this.get('name');
            D('config').where({configName: configName}).find().then(function (data) {
                //data.selector = JSON.parse(data.selector);
                var result = {
                    status: true,
                    data: data,
                    configName: data.configName
                };
                return self.json(result);
            });
        }
    };
});
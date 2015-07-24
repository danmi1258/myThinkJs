module.exports = Controller("Home/BaseController", function () {
    "use strict";
    return {
        indexAction: function () {
            var self = this;
            this.assign('wsport', C('port'));
            D('config').field('configName').select().then(function(data){
                var list = [];
                data.forEach(function(row) {
                   list.push(row.configName);
                });
                self.assign('wsport', C('port'));
                self.assign('list', list);
                return self.display();
            });
        }
    };
});
/**
 * controller
 * @return
 */
module.exports = Controller("Home/BaseController", function () {
    "use strict";
    return {
        indexAction: function () {
            //this.end('nnd');
            this.display();
        },
        testAction: function () {
            var self = this;
            var userModel = D('test');
            userModel.add({
                title: "welefen",
                text: "xxx",
                created: "2010-08-16 12:42:15"
            }).then(function (insertId) {
                    self.echo(insertId);
                }).catch(function (err) {
                    self.echo(err);
                });
            userModel.where().find().then(function (data) {
                self.assign('list', data);
                self.display();
            });
            //this.end(result);
            //this.assign('list', {title: 'aaaaa'});
            //this.display();
        }
    };
});
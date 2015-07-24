module.exports = Controller("Home/BaseController", function () {
    "use strict";
    return {
        addAction: function () {
            this.end('add');
        },
        deleteAction: function () {
            this.end('add');
        },
        editAction: function () {
            this.end('sss');
        }
    };
});
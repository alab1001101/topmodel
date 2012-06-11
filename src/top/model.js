define(['top/collection/process', 'top/view/list', 'socket.io'],
function(collection, list) {
    return Backbone.Model.extend({
        procs: null,
        initialize: function() {
            this.procs = new collection();
            new list({collection: this.procs});
            this.connect();
        },
        connect: function() {
            var socket = io.connect('http://localhost:8080');
            socket.on('top', _.bind(this.update, this));
        },
        update: function(data) {
            this.procs.update(data.procs);
        }
    });
});
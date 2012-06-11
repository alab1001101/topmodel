define([],
function() {
    return Backbone.Model.extend({
        idAttribute: "PID",
        defaults: {
            "PID":     null,
            "USER":    null,
            "PR":      null,
            "NI":      null,
            "VIRT":    null,
            "RES":     null,
            "SHR":     null,
            "S":       null,
            "%CPU":    null,
            "%MEM":    null,
            "TIME+":   null,
            "COMMAND": null
        },
        initialize: function() {
            this.on('remove', this.remove, this);
        },
        remove: function() {
            this.off();
        }
    });
});

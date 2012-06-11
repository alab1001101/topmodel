define([],
function() {
    return Backbone.View.extend({
        tagName: 'tr',
        cells: null,
        initialize: function() {
            this.$el.attr('id', this.model.id);
            this.cells = {};
            this.render();
            this.model.on('change', this.change, this);
            this.model.on('remove', this.onModelRemove, this);
        },
        render: function() {
            _.each(this.model.attributes, function(val, key) {
                this.cells[key] = this.el.appendChild(document.createElement('td'))
                                         .appendChild(document.createTextNode(val));
            }, this);
        },
        change: function(model) {
            _.each(model.changed, function(val, key) {
                this.cells[key].nodeValue = val;
            }, this);
        },
        onModelRemove: function() {
            delete this.model;
            delete this.cells;
            this.$el.remove();
            delete this.$el;
        }
    });
});

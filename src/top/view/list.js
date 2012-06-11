define(['top/view/list/process'],
function(row) {
    return Backbone.View.extend({
        tagName: 'table',
        tbody: null,
        initialize: function() {
            this.render();
            this.collection.on('add', this.addRow, this);
            this.collection.on('update', this.updateRow, this);
        },
        render: function() {
            var tr = $('<thead><tr></tr></thead>').appendTo(this.$el.appendTo('.lister'));
            _.each(this.collection.model.prototype.defaults, function(val, key) {
                $('<th align="left">').text(key).appendTo(tr);
            }, this);
            this.tbody = $('<tbody></tbody>').appendTo(this.$el).get(0);
            return this;
        },
        addRow: function(model) {
            this.tbody.appendChild(new row({model: model}).el);
        },
        updateRow: function(model) {
            this.tbody.appendChild(document.getElementById(model.id));
        }
    });
});
define(['top/model/process'],
function(model) {
    return Backbone.Collection.extend({
        model: model,
        update: function(models, options) {
            var lookup = {};
            _.map(this.models, function(m){lookup[m.id]=1});
            for (var i = 0; i < models.length; i++) {
                var model = models[i],
                    pid = model.PID;
                if (!(pid in lookup)) {
                    this.add(model, options);
                } else {
                    delete lookup[pid];
                    this.trigger('update', this.get(pid).set(model, options));
                }
            }
            this.remove(_.keys(lookup), options);
        }
    });
});
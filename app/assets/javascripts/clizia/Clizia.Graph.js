Clizia.Graph = function(args) {
        var that = {};

        that.init = function(args) {
                if (!args.chart) throw "Clizia.Graph needs a chart";
                that.chart = args.chart;

                if (!args.metric) throw "Clizia.Graph needs a metric"
                that.metric = args.metric;
        }

        that.render = function(args) { throw "Cannot invoke parent Clizia.Graph.render() directly." }
        that.update = function(args) { throw "Cannot invoke parent Clizia.Graph.update() directly." }

        that.init(args);
        return that;
}


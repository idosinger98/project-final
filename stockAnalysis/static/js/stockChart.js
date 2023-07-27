
export class StockChart {

    constructor() {
        this.chart = anychart.stock();
        this.indicator_to_plot_map = {};
    }

    createFromData(data, volumeData) {
        const plot = this.chart.plot(0);
        this.setupGraphSettings(plot, data);
        this.setupStockVolumeSettings(plot, volumeData);

    }

    setupGraphSettings(plot,data){
        plot.yGrid(true).xGrid(true).yMinorGrid(true).xMinorGrid(true);
        const series = plot.candlestick(data);
        series.name('stock name');
        series.legendItem().iconType('rising-falling');
        series.risingFill('green');
        series.fallingFill('red');
        series.risingStroke('green');
        series.fallingStroke('red');
        // make scroller and the details line invisible
        this.showScroller(false);
        plot.legend().enabled(false);
    }

    setupStockVolumeSettings(plot, data){
        const volumeSeries = plot.column(data);
        // set series settings
        volumeSeries.name('Volume').zIndex(100).maxHeight('15%').bottom(0); // maybe remove the zindex

        // create a logarithmic scale
        const customScale = anychart.scales.log();
        // sets y-scale
        volumeSeries.yScale(customScale);

        volumeSeries.risingStroke('red');
        volumeSeries.fallingStroke('green');
        volumeSeries.risingFill('red 0.7');
        volumeSeries.fallingFill('green 0.7');
    }

    showScroller(enable){
        this.chart.scroller().enabled(enable);
    }

    drawChart(container) {
        anychart.onDocumentReady(() => {
            this.chart.container(container);
            this.chart.draw();

            const rangeSelector = anychart.ui.rangeSelector().render(this.chart);
        });
    }

    saveChart(){
        return this.chart.toJson();
    }

    loadChartFromJson(json){

    }

    addIndicatorToChart(data) {
        for (const key of Object.keys(data)) {
            this.addIndicatorLineSeriesOnNewPlot(data[key], key);
            // for now everyone is on new plot.
        }
    }

    addIndicatorLineSeriesOnNewPlot(data, indicatorName, color) {
        const plotIndex = this.chart.getPlotsCount() + 1;
        const plot = this.chart.plot(plotIndex);

        plot.title(indicatorName);
        this.indicator_to_plot_map[indicatorName] = plotIndex;
        for(const key in data){
            this.addLineSeriesOnPlot(data[key], plot, key, color);
        }
    }

    addLineSeriesOnPlot(data, plot, name, color) {
        const lineSeries = plot.line(data);

        lineSeries.stroke(color);
        lineSeries.name(name);
        lineSeries.id(name);
    }

    // addIndicatorLineSeriesOnMainPlot(data, indicatorName, color) {
    //     this.addIndicatorLineOnPlot(data,this.chart.plot(0),indicatorName, color);
    // }
    //
    // addAreaToPlot(data){
    //     const areaSeries = this.chart.plot(0).area(data);
    //     areaSeries.fill('rgba(255, 0, 0, 0.3)');
    // }

    removeIndicatorLine(name){
        const plot_index = this.indicator_to_plot_map[name];

        if(plot_index !== 0){
            this.chart.plot(plot_index).remove();
            this.chart.plot(plot_index).enabled(false);
        }
        else{
            this.chart.plot(plot_index).removeSeries(name);
        }
    }
}
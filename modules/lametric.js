/**
 * LaMetric response class builder.
 *
 * Example usage:
 *
 * const {LaMetricResponse} = require("./lametric.js")
 *
 * new LaMetricResponse()
 *   .addText("Hello!", "i50")
 *   .addGoalData(0, 100, 50, "%", "i50")
 *   .addChartData([10, 20, 5])
 */
class LaMetricResponse {
    constructor() {
        this.frames = []
    }

    addFrame(frame) {
        this.frames.push(frame)
        return this
    }

    addText(text, icon) {
        return this.addFrame(new LaMetricTextFrame(text, icon))
    }

    addGoalData(start, end, current, unit, icon) {
        return this.addFrame(new LaMetricGoalFrame(start, end, current, unit, icon))
    }

    addChartData(intArray) {
        return this.addFrame(new LaMetricChartData(intArray))
    }
}

class LaMetricFrame {
}

class LaMetricTextFrame extends LaMetricFrame {
    constructor(text, icon) {
        super()
        this.text = text
        this.icon = icon
    }
}

class LaMetricGoalFrame extends LaMetricFrame {
    constructor(start, end, current, unit, icon) {
        super();
        this.start = start
        this.end = end
        this.current = current
        this.unit = unit
        this.icon = icon
    }
}

class LaMetricChartData extends LaMetricFrame {
    constructor(intArray) {
        super();
        this.chartData = intArray
    }
}

module.exports = {
    LaMetricResponse: LaMetricResponse,
}
/**
 * LaMetric response class builder.
 *
 * Example usage:
 *
 * new LaMetricResponse().addText("Hello!")
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

    addGoalData(text, icon, start, end, current) {
        return this.addFrame(new LaMetricTextFrame(text, icon).addGoalData(start, end, current))
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

    addGoalData(start, end, current, unit) {
        this.goalData = {start: start, end: end, current: current, unit: unit}
        return this
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
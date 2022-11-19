const data = require("./data.js")
const {LaMetricResponse} = require("./lametric.js")

/**
 * Sample function that serves polling request from your LaMetric indicator app.
 * Returns incremented counter for the current LaMetric device using Deta database.
 *
 * @param deviceId unique ID string of LaMetric device
 * @param userId unique ID string of LaMetric device's user
 * @param timestamp current LaMetric device timestamp string
 * @param appInstance LaMetric app ID
 * @param instanceName LaMetric app name
 * @param params LaMetric app user's parameters key-value object
 * @returns {Promise<LaMetricResponse>} response in LaMetric app format
 */
module.exports = async (deviceId, userId, timestamp, appInstance, instanceName, params) => {
    let counter = await data.incrementCounter(deviceId)
    return new LaMetricResponse().addText(`${counter}`)
}
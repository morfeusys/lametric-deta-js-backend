const data = require("./data.js")

/**
 * Button click event action function.
 * This sample action just resets a device's counter.
 *
 * @param deviceId unique ID string of LaMetric device
 * @param userId unique ID string of LaMetric device's user
 * @param timestamp current LaMetric device timestamp string
 * @param appInstance LaMetric app ID
 * @param instanceName LaMetric app name
 * @param params LaMetric app user's parameters key-value object
 */
module.exports = (deviceId, userId, timestamp, appInstance, instanceName, params) => {
    data.resetCounter(deviceId)
}
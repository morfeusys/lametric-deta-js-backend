const { Deta } = require('deta')
const deta = process.env.DETA_RUNTIME ? Deta() : Deta(process.env.DETA_PROJECT_KEY)
const devices = deta.Base('devices')

/**
 * Sample module demonstrates how to use Deta persistence layer.
 *
 * Please read more about Deta Base - https://docs.deta.sh/docs/base/about
 */
module.exports = {
    /**
     * Creates a new LaMetric device record in the database if no one exists for this ID.
     * Increments device's counter and returns it.
     *
     * @param deviceId LaMetric device ID string
     * @returns {Promise<*>} incremented device's counter to show on LaMetric display.
     */
    incrementCounter: async deviceId => {
        let device = await devices.get(deviceId)
        if (!device) {
            device = await devices.insert({counter: 0}, deviceId)
        }
        devices.update({
            "counter": devices.util.increment()
        }, deviceId)

        return device["counter"] + 1
    },

    /**
     * Removes device's record from the database.
     *
     * @param deviceId LaMetric device ID string
     * @returns {Promise<void>}
     */
    resetCounter: async deviceId => {
        devices.delete(deviceId)
    }
}
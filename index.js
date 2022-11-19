const express = require("express")
const poll = require("./modules/poll.js")      // polling request action
const button = require("./modules/button.js")  // button click event action
const {LaMetricResponse} = require("./modules/lametric.js")

const app = express()

app.use(express.json())

/**
 * Just returns 200 OK to signal that everything works as expected
 */
app.get("/", (req, res) => {
    res.sendStatus(200)
})

/**
 * Serves polling requests of indicator LaMetric app.
 * Automatically responds with empty payload on 'ping' requests.
 * Fetches LaMetric headers to fulfill device ID, user ID and others LaMetric device meta.
 *
 * Please read more about LaMetric polling indicator apps - https://lametric-documentation.readthedocs.io/en/latest/guides/first-steps/first-lametric-indicator-app.html
 */
app.get("/poll", async (req, res) => {
    let deviceId = req.header("x-lametric-device-id")
    if (deviceId) {
        res.json(await poll(
            deviceId,
            req.header("x-lametric-user-id"),
            req.header("x-lametric-timestamputc"),
            req.header("x-lametric-app-instance"),
            req.header("x-lametric-instance-name"),
            req.query
        ))
    } else {
        res.json(new LaMetricResponse().addText('', ''))
    }
})

/**
 * Serves button click events of indicator LaMetric app.
 * Responds with 200 OK.
 */
app.get("/button", (req, res) => {
    let deviceId = req.header("x-lametric-device-id")
    if (deviceId) {
        button(
            deviceId,
            req.header("x-lametric-user-id"),
            req.header("x-lametric-timestamputc"),
            req.header("x-lametric-app-instance"),
            req.header("x-lametric-instance-name"),
            req.query
        )
    }
    res.sendStatus(200)
})

/**
 * Starts server on port 8000 locally or exports the module in Deta environment.
 *
 * Please read more about Deta micros - https://docs.deta.sh/docs/micros/about
 */
if (process.env.DETA_RUNTIME !== "true") {
    app.listen(8000, () => {
        console.log(`Webhook is listening on 8000`);
    })
} else {
    module.exports = app
}
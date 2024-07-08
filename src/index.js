const express = require("express")
const bodyParser = require("body-parser")

const { PORT } = require("./config/serverConfig")

const app = express()

process.on("uncaughtException", (err) => {
    console.log(`Error Name: ${err.name} Error: ${err.message}`)
    console.log(`Shutting down the server due to Uncaught Exception`)

    process.exit(1)

})



const setupAndStart = () => {

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    const server = app.listen(PORT, () => {
        console.log(`Server started at port ${PORT}`)
    })

    process.on("unhandledRejection", (err) => {
        console.log(`Error Name: ${err.name} Error: ${err.message}`)
        console.log(`Shutting down the server due to Unhandled Promise Rejection`)

        server.close(() => {
            process.exit(1)
        })
    })
}

setupAndStart()
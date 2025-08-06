const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 5001;
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('simple database oparation done')
})
app.listen(port, () => {
    console.log(`databas theke data connect hoise:${port}`)
})
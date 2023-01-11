const Tracker = require('./initdb')
const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var multer = require('multer')
var upload = multer();
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(upload.array())
app.use(bodyParser.json())
require('dotenv').config();

app.post('/insert', async (req, res) => {
    let d = req.body.name
    let de = req.body.gps_hm_imei

    console.log(d)
    console.log(de)

    try {
        let data = await Tracker.insertdatainmongo(d, de)
        if (data==0) {
            // console.log(data)
            res.send(400)
        }else{
            res.send(200)
        }
    }catch{
        res.send(400)
    }
})


app.get('/find', async (req, res) => {
    let d = req.query.imei
    tracker_data = await Tracker.finddatainmongo(d)
    console.log(tracker_data)
    console.log(tracker_data.name)
    console.log(tracker_data.gps_hm_imei)
    res.send(200)
})

app.get('', async (req, res) => {

    let data = await Tracker.findalldata()
    console.log(data)
    console.log(`this works for ${process.env.NAME}`)
    res.send(data)

})


app.listen(3000)

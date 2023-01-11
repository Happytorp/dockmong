const mongoose = require('mongoose')
require('dotenv').config();
const url = process.env.MONGODB_URI
mongoose.connect(url, {})
    .then(result => console.log("database connected"))
    .catch(err => console.log(err))


const TrackerSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        requied: true,
    },
    gps_hm_imei: String,
    last_lat: Number,
    last_long: Number
})

let tracker = mongoose.model('tracker', TrackerSchema)


exports.insertdatainmongo = async (name1,imei) => {

    try {
        let data = new tracker({name:name1, gps_hm_imei:imei})
        let a = data.save()
        // console.log(data)
        return a
    } catch (err) {
        console.log("error")
        return 0
    }

}

exports.finddatainmongo = async (imei) => {

    try {
        let data = await tracker.findOne({ gps_hm_imei: imei })
        console.log(data)
        return data
    } catch (err) {
        console.log("error")
        return 0
    }

}

exports.findalldata = async()=>{
    let data = await tracker.find()
    return data
}


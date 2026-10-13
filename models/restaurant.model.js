const mongoose = require("mongoose")

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    cuisine: {
        type: [String],
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
    reviews: [String],
    website: String,
    phoneNumber: {
        type: String,
        required: true,
    },
    openHours: String,
    priceRange: String,
    reservationsNeeded: {
        type: Boolean,
        default: false,
    },
    isDeliveryAvailable: {
        type: Boolean,
        default: false,
    },
    menuUrl: String,
    photos: [String],
}, { timestamps: true })

module.exports = mongoose.model("Restaurant", restaurantSchema)

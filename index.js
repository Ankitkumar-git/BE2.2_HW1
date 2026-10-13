const mongoose = require("mongoose")
const Restaurant = require("./models/restaurant.model")

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/restaurantDB"

const somiRestaurant = {
    name: "Somi",
    cuisine: ["Greek"],
    location: "11 Main Road, Gem",
    rating: 4.3,
    reviews: [],
    website: "https://somi-example.com",
    phoneNumber: "+1234997390",
    openHours: "Tue-Sun: 11:00 AM - 10:00 PM",
    priceRange: "$$ (11-30)",
    reservationsNeeded: false,
    isDeliveryAvailable: true,
    menuUrl: "https://somi-example.com/menu",
    photos: [
        "https://example.com/somi-photo1.jpg",
        "https://example.com/somi-photo2.jpg",
    ],
}

const yoChinaRestaurant = {
    name: "Yo China",
    cuisine: ["Chinese", "Italian"],
    location: "MG Road, Bangalore",
    rating: 3.9,
    reviews: [],
    website: "https://yo-example.com",
    phoneNumber: "+1288997392",
    openHours: "Tue-Sun: 10:00 AM - 11:00 PM",
    priceRange: "$$$ (31-60)",
    reservationsNeeded: true,
    isDeliveryAvailable: false,
    menuUrl: "https://yo-example.com/menu",
    photos: [
        "https://example.com/yo-photo1.jpg",
        "https://example.com/yo-photo2.jpg",
        "https://example.com/yo-photo3.jpg",
    ],
}

async function createRestaurant(restaurantData) {
    const restaurant = new Restaurant(restaurantData)
    const savedRestaurant = await restaurant.save()
    console.log("Created restaurant:", savedRestaurant)
}

async function readAllRestaurants() {
    const restaurants = await Restaurant.find()
    console.log("All restaurants:", restaurants)
}

async function readRestaurantByName(restaurantName) {
    const restaurant = await Restaurant.findOne({ name: restaurantName })
    console.log(`Restaurant named ${restaurantName}:`, restaurant)
}

async function readRestaurantsWithReservations() {
    const restaurants = await Restaurant.find({ reservationsNeeded: true })
    console.log("Restaurants with reservations:", restaurants)
}

async function readRestaurantsWithDelivery() {
    const restaurants = await Restaurant.find({ isDeliveryAvailable: true })
    console.log("Restaurants with delivery:", restaurants)
}

async function readRestaurantByPhoneNumber(phoneNumber) {
    const restaurant = await Restaurant.findOne({ phoneNumber })
    console.log(`Restaurant with phone number ${phoneNumber}:`, restaurant)
}

async function readRestaurantsByCuisine(cuisineName) {
    const restaurants = await Restaurant.find({ cuisine: cuisineName })
    console.log(`Restaurants with ${cuisineName} cuisine:`, restaurants)
}

async function runRestaurantQueries() {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })

    await createRestaurant(somiRestaurant)
    await createRestaurant(yoChinaRestaurant)
    await readAllRestaurants()
    await readRestaurantByName("New Restaurant")
    await readRestaurantsWithReservations()
    await readRestaurantsWithDelivery()
    await readRestaurantByPhoneNumber("+1288997392")
    await readRestaurantsByCuisine("Italian")
}

runRestaurantQueries()
    .catch((error) => {
        console.error("Error running restaurant queries:", error)
    })
    .finally(async () => {
        await mongoose.connection.close()
    })

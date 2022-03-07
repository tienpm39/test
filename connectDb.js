const mongoose = require("mongoose")

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    })
    console.log("MongoDb Connected")
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB

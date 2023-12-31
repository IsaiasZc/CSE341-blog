const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      dbName: process.env.DATABASE
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err: any) {
    console.log(`Error: ${err.message}`)
    process.exit(1)
  }
}

export default connectDB

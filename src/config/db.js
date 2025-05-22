import mongoose from "mongoose"

export default function connectDB() {
    mongoose
        .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log("MongoDB connected"))
        .catch((err) => {
            console.error(err)
            process.exit(1)
        })
}

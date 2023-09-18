import mongoose from "mongoose"
import app from "./app"
import env from "./util/validateEnv"


const MONGODB_CONNECTION_STRING = env.MONGODB_CONNECTION_STRING
const PORT = env.PORT

mongoose.connect(MONGODB_CONNECTION_STRING)
    .then(() => {
        console.log("Mongoose connected");
        app.listen(PORT, () => {
            console.log("Server started on port: " + PORT);
        })
    })
    .catch(console.error)



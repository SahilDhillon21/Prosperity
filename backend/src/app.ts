import "dotenv/config"
import express from "express"
import userRoutes from "./routes/user.routes"
import session from "express-session"
import env from "./util/validateEnv"
import MongoStore from "connect-mongo"

const app = express()

app.use(express.json())

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60*60*1000*168, //one week
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGODB_CONNECTION_STRING
    })
}))

app.use('/users', userRoutes)

app.get("/", (req, res) => {
    res.send("Hellooo")
})

export default app
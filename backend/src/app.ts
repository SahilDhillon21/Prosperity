import "dotenv/config"
import express from "express"
import userRoutes from "./routes/user.routes"
import todoRoutes from "./routes/todo.routes"
import session from "express-session"
import noteRoutes from './routes/note.routes'
import env from "./util/validateEnv"
import MongoStore from "connect-mongo"
import morgan from 'morgan'

const app = express()

app.use(morgan("dev"))

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

app.use('/notes', noteRoutes)

app.use('/todo', todoRoutes)

app.get("/", (req, res) => {
    res.send("Hellooo")
})

export default app
import { cleanEnv } from "envalid";
import {port,str} from "envalid/dist/validators"

export default cleanEnv(process.env, {
    MONGODB_CONNECTION_STRING: str(),
    PORT: port(),
    SESSION_SECRET: str(),
    CLOUD_NAME: str(),
    CLOUD_API_KEY: str(),
    CLOUD_API_SECRET: str(),
})
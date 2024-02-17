import 'dotenv/config'
import * as env from 'env-var'


export const envs = {
    PORT: env.get("PORT").required().asPortNumber(),
    MAILER_SERVICE: env.get("MAILER_SERVICE").required().asString(), 
    MAILER_MAIL: env.get("MAILER_MAIL").required().asEmailString(),
    MAILER_MAIL_PASS: env.get("MAILER_MAIL_PASS").required().asString(),

    MONGO_URL: env.get('MONGO_URL').required().asString(),

    MONGO_DB_NAME: env.get('MONGO_DB_NAME').required().asString(), 
    POSTGRES_DB: env.get('POSTGRES_DB').required().asString(),

    USER: env.get('USER').required().asString(),
    PASS: env.get('PASS').required().asString()
}
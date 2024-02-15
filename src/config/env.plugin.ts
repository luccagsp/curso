import 'dotenv/config'
import * as env from 'env-var'


export const envs = {
    PORT: env.get("PORT").required().asPortNumber(),
    MAILER_SERVICE: env.get("MAILER_SERVICE").required().asString(), 
    MAILER_MAIL: env.get("MAILER_MAIL").required().asEmailString(),
    MAILER_MAIL_PASS: env.get("MAILER_MAIL_PASS").required().asString()
}
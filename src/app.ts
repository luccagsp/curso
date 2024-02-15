import 'dotenv/config'
import { Server } from "./presentation/server";
import { envs } from './config/env.plugin';


(async () => {
    main()
})();

function main() {
    Server.start()
    console.log(envs.PORT)
}
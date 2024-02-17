import 'dotenv/config'
import { Server } from "./presentation/server";
import { envs } from './config/env.plugin';
import { MongoDB, LogModel } from './data/mongo';



(async () => {
    main()
})();

async function main() {

    await MongoDB.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL,
    }); 

    //* Crear una coleccion = una table en sql
    //* Crear un documento = un registro en sql

    // const newLog = await LogModel.create({
    //     message: 'test message from mongo and low',
    //     origin: 'app.ts',
    //     level:'low'
    // })

    // await newLog.save()
    // console.log("new log created")
    // console.log(newLog)

    Server.start()
}
import { CronJob } from "cron"


type CronTime = string | Date;
type OnTick = () => void


export class CronService {


    static createJob(cronTime: CronTime, onTick:OnTick) {
        const Job = new CronJob( cronTime, onTick )
        Job.start()
    }
}
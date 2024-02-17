
import { LogEntity, LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/check-service";
import { SendMailLogs } from "../domain/use-cases/mail/send-mail-logs";
import { FileSystemDatasoruce } from "../infrastructure/datasources/file-system.datasource";
import { MongoDBLogDatasource } from "../infrastructure/datasources/mongo_db-log-datasource";
import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository.implementation";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";



const logRepository = new LogRepositoryImplementation(
  new FileSystemDatasoruce()
)
const emailService = new EmailService()




export class Server {

  static async start() {

    console.log("Server is running...");


    const logs = await logRepository.getLogs(LogSeverityLevel.high)
    console.log(logs)
    // emailService.sendLogsMail('aseholaq406@gmail.com')

    // new SendMailLogs(emailService, fsLogRepository).run('aseholaq406@gmail.com')

    // new MongoDBLogDatasource().saveLog(new LogEntity({message:'message', level:LogSeverityLevel.low, origin:'server.ts'}))
    //* old code
    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = "https://gookasdgvfuidgsufsdguigle.com";
    //   new CheckService(
    //     logRepository,
    //     () => console.log(`${url} is ok!`),
    //     (err) => console.error(err)
    //   ).execute(url);
    // });
  }

}

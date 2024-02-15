
import { CheckService } from "../domain/use-cases/check-service";
import { SendMailLogs } from "../domain/use-cases/mail/send-mail-logs";
import { FileSystemDatasoruce } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository.implementation";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";



const fsLogRepository = new LogRepositoryImplementation(new FileSystemDatasoruce())
const emailService = new EmailService()




export class Server {

  static start() {

    console.log("Server is running...");

    // emailService.sendLogsMail('aseholaq406@gmail.com')

    // new SendMailLogs(emailService, fsLogRepository).run('aseholaq406@gmail.com')

    //* old code
    // CronService.createJob("*/10 * * * * *", () => {
    //   const url = "https://google.com";
    //   new CheckService(
    //     fsLogRepository,
    //     () => console.log(`${url} is ok!`),
    //     (err) => console.error(err)
    //   ).execute(url);
    // });
  }

}

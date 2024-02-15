import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";


interface SendLogEmailUsecase {
  run: (to: string | string[]) => Promise<boolean>;
}


export class SendMailLogs implements SendLogEmailUsecase {

  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}

  async run(to: string | string[]) {
    
    try {
      const sent = await this.emailService.sendLogsMail("asehola406@gmaik.com")
      if (!sent) throw new Error('email log not sent')
      this.logRepository.saveLog(new LogEntity({level: LogSeverityLevel.low, message: `Email sent sucessfully`, origin:'send-email-logs.ts'}))
      return true
    } catch (error) {
      this.logRepository.saveLog(new LogEntity({level: LogSeverityLevel.high, message: `${error}`, origin:'send-email-logs.ts'}))
      return false
    }
    
  }
}
import { LogEntity, LogSeverityLevel } from "../entities/log.entity"
import { LogRepository } from "../repository/log.repository"




interface CheckServiceInterface {
    execute(url:string):Promise<boolean> 
}



type SuccessCallback = () => void
type ErrorCallback = (error: string) => void

export class CheckService implements CheckServiceInterface  {


    constructor(
        private readonly logRepository: LogRepository,
        private readonly succesCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) {}


    public async execute(url: string): Promise<boolean> {
        
        try {
            const req = await fetch(url)
            if (!req.ok) throw new Error('error on check service: '+url) //! Error?
            this.logRepository.saveLog(new LogEntity({level: LogSeverityLevel.low, message: `success fetch to: ${url}!`, origin: 'src/domain/use-cases/check-service.ts'}))
            this.succesCallback()
            return true;
        } catch (error) {
            const errorMessage = `error to fetch: ${url}!`
            this.logRepository.saveLog(new LogEntity({level: LogSeverityLevel.high, message: `fail to fetch: ${url}!`, origin: 'src/domain/use-cases/check-service.ts'}))
            this.errorCallback(errorMessage)
            return false
        }
        
    }
}
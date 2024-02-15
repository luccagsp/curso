import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import fs from 'fs'



export class FileSystemDatasoruce implements LogDataSource{
    private readonly logPath = 'logs/'
    private readonly allLogPath = 'logs/logs-all.log'
    private readonly mediumLogPath = 'logs/logs-medium.log'
    private readonly highLogPath = 'logs/logs-high.log'

    constructor() {
        this.createLogsFile()
    }

    private createLogsFile = () => {

        if (!fs.existsSync(this.logPath)){
            fs.mkdirSync(this.logPath)
        }
        
        
        [
            this.logPath, 
            this.mediumLogPath, 
            this.highLogPath
        ].forEach(path => {
            if (fs.existsSync(path)) return;
            
            fs.writeFileSync(path, '')
        });
    }

    async saveLog(currentLog: LogEntity): Promise<void> {
        const jsonString = `${JSON.stringify(currentLog)}\n`

        fs.appendFileSync(this.allLogPath, jsonString) // agregar a el log general

        if (currentLog.level === LogSeverityLevel.low) return
        if (currentLog.level === LogSeverityLevel.medium) {
            fs.appendFileSync(this.mediumLogPath, jsonString)
            return
        }
        if (currentLog.level === LogSeverityLevel.high) {
            fs.appendFileSync(this.highLogPath, jsonString)
        }

    }

    private GetLogsFromFile = (path: string): LogEntity[] => {
        const content = fs.readFileSync(path, 'utf-8')
        const logs = content.split('\n').map(
            log => LogEntity.fromJson(log)
        )

        return logs
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch (severityLevel) {
            case LogSeverityLevel.low:
                return this.GetLogsFromFile(this.allLogPath)
            case LogSeverityLevel.medium:
                return this.GetLogsFromFile(this.mediumLogPath)
            case LogSeverityLevel.high:
                return this.GetLogsFromFile(this.highLogPath)
            default:
                throw new Error(`${severityLevel} not implemented `)
        }
    }

}


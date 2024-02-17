import { LogModel, MongoDB } from "../../data/mongo";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class MongoDBLogDatasource implements LogDataSource{
  async saveLog(log: LogEntity): Promise<void> {
    const {message, createdAt, level, origin} = log
    const newLog = await LogModel.create(log)

    console.log('Log created successfully:', newLog)
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({ //! Dentro del parentesis van las condiciones que se incluyen
      level: severityLevel
    }) 
    return logs.map(log => LogEntity.createEntityByObject(log))
  }
}
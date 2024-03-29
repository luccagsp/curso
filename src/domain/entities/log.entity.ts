

export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',

}

export interface LogEntityOptions {
    level: LogSeverityLevel, 
    message: string, 
    origin: string,
    createdAt?: Date
}



export class LogEntity {
    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options: LogEntityOptions) {
        const {message, createdAt = new Date(), origin, level} = options
        this.level = level
        this.message = message
        this.createdAt = createdAt
        this.origin = origin
    }

    static fromJson = (json: string): LogEntity => {
        if (json === '') json = '{}'
        const {message, level, createdAt, origin} = JSON.parse(json)

        const log = new LogEntity({message, level, createdAt, origin})

        return log
    }

    static createEntityByObject = (obj: {[key:string]: any}):LogEntity =>  {
        const {message, level, createdAt, origin} = obj
        const log = new LogEntity({
            message,level,createdAt,origin
        })
        return log;
    }
}
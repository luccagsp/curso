
import { envs } from '../../config/env.plugin'
import nodemailer from 'nodemailer'
import { LogRepository } from '../../domain/repository/log.repository'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'


interface Attachment {
    filename: string,
    path: string
}

interface SendMailOptions {
    to:string | string[], 
    subject:string, 
    html: string
    attachments?: Attachment[]
}


export class EmailService {


    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_MAIL,
            pass: envs.MAILER_MAIL_PASS
        }
    });

    async sendMail(options: SendMailOptions):Promise<boolean> {
        const {to, subject, html, attachments = []} = options
        try {
            console.log("stasrted")
            const sendInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: html,
                attachments: attachments
            })
            const logRepo = new LogEntity({level:LogSeverityLevel.low, message:'Email sent', origin:'email.service.ts'})
            console.log(sendInformation)
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }

    async sendLogsMail(to: string | string[]) {
        const subject = 'Mail with logs'
        const html = `
        <h1>Logs del sistema</h1>
        <h3>Logs level high<h3>
        <p>A continuacion se le adjuntara el informe con la informacion de logs del sistema NOC</p>
        `;
        const attachments:Attachment[] = [
            {filename: 'logs-all.log', path: './logs/logs-all.log'},
            {filename: 'logs-medium.log', path: './logs/logs-medium.log'},
            {filename: 'logs-high.log', path: './logs/logs-high.log'}
        ]

        return this.sendMail({to, html, attachments, subject})
    }

}






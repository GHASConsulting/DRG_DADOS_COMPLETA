import fs from 'fs'
import { makeDirectory } from './makeDirectory'
import winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: 'log.json' })],
})

export async function writeLog(xml: string) {
  try {
    const folder = await makeDirectory()
    const now = new Date()
    const hour = String(now.getHours()).padStart(2, '0')
    const minute = String(now.getMinutes()).padStart(2, '0')
    const date = now.toISOString().slice(0, 10).replace(/-/g, '')
    const fileName = `${date}-${hour}-${minute}.xml`
    const filePath = `${folder}${fileName}`

    try {
      await fs.promises.access(filePath)
      await fs.promises.appendFile(filePath, xml)
      console.log(`Dados foram anexados ao arquivo ${fileName} em ${folder}`)
      logger.info(`Dados foram anexados ao arquivo ${fileName} em ${folder}`)
    } catch (err) {
      await fs.promises.writeFile(filePath, xml)
      console.log(`Arquivo ${fileName} foi criado em ${folder}`)
      logger.info(`Arquivo ${fileName} foi criado em ${folder}`)
    }
  } catch (err) {
    console.log(`Erro ao criar o diretório ou o arquivo: ${err.message}`)
    logger.error(`Erro ao criar o diretório ou o arquivo: ${err.message}`)
  }
}

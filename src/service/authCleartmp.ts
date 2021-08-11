import { CronJob } from 'cron'
import fs from 'fs'
import transporter from '@/plugins/nodemailer'

export const authClearTmp = new CronJob('00 00 00 * * *', () => {
  if (fs.existsSync('./tmp')) {
    fs.readdir('./tmp', (err, files) => {
      if (err) throw err
      for (const file of files) {
        fs.unlinkSync('./tmp/' + file)
      }
    })
    transporter.sendMail({
      from: 'kec',
      to: 'ncomusibsim7@gmail.com',
      subject: 'temp folder have been cleared'
    })
  }
}, null, true, 'Asia/Bangkok')
#!/usr/bin/env node

const { spawn } = require('node:child_process')

const env = { ...process.env }

;(async() => {
  // If running the web server then migrate existing database
  if (process.argv.slice(2).join(' ') === 'npm run start') {
    try {
      await exec('npx prisma migrate deploy')
    } catch(err) {
      console.error('Could not migrade but it does not matter in this case');
    }
  }

  // launch application
  await exec(process.argv.slice(2).join(' '))
})()

function exec(command) {
  const child = spawn(command, { shell: true, stdio: 'inherit', env })
  return new Promise((resolve, reject) => {
    child.on('exit', code => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`${command} failed rc=${code}`))
      }
    })
  })
}

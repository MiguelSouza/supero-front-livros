#!/usr/local/bin/node

const fs = require('fs')

const projectVars = [
  'API_URL',
  'GOOGLE_API_KEY',
]
const configFileContent = projectVars.map((entry) => {
  let envEntry = process.env[entry]

  if (envEntry === 'true') envEntry = true
  if (envEntry === 'false') envEntry = false

  return envEntry ? `export const ${entry} = '${envEntry}'` : null
}).filter((entry) => entry)

if (configFileContent.length) {
  fs.writeFileSync('src/config.js', `${configFileContent.join('\n')}\n`)
}

const path = require('path')
const fs = require('fs')

const getMarkdown = async ({name, description, author, license, licenseFile}) => {
  let licenseMarkdown = ''
  if (licenseFile) {
    licenseMarkdown = `
## License

[${license} license](${licenseFile})
`
  } else if (license) {
    licenseMarkdown = `
## License

__${license} license__
`
  }

  return `
# ${name}

<p align="center">
  <i>${description}</i>
</p>

## Install

\`\`\`bash
npm install ${name}
\`\`\`

## Usage

_Show basic usage_

## Contribute

Feel free to open an _issue_ or a _PR_.

${licenseMarkdown}

## Author

| ![me](https://www.lightstim.com/images/pro/icon-youraccount.jpg) |
| ----------------------------------------------------------------------------- |
| © 2017 [__${author}__]() |
`
}

const getFilePath = file => {
  let filePath = file.split('/')
  filePath.pop()
  filePath = filePath.join(filePath)
  return filePath
}

const doesItHaveALicenseFile = folder => {
  const possibleFiles = ['license', 'LICENSE', 'License', 'license.md', 'LICENSE.md', 'License.md', 'license.txt', 'LICENSE.txt', 'License.txt']
  let match
  possibleFiles.some(file => {
    const fileName = path.join(folder, file)
    if (fs.existsSync(fileName)) {
      match = fileName
      return true
    }
  })
  return match || false
}

module.exports = async (pkgJson = './package.json') => {
  const pkg = require(`${pkgJson}`)
  if (!pkg) {
    throw Error(`${pkgJson} not found`)
  }

  const folder = getFilePath(pkgJson)
  const name = pkg.name || 'Title goes here'
  const description = pkg.description || 'Introduce your software here'
  const author = pkg.author || 'Your Name'
  const license = pkg.license || ''
  let licenseFile
  if (license) {
    licenseFile = doesItHaveALicenseFile(folder)
  }
  const output = await getMarkdown({name, description, author, license, licenseFile})
  return output
}

const path = require('path')
const fs = require('fs')
const gravatar = require('gravatar')

const getMarkdown = async ({name, description, author, imageUrl, license, licenseFile}) => {
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

| ![me](http:${imageUrl}) |
| ----------------------------------------------------------------------------- |
| © 2017 [__${author}__]() |
`
}

const defaultImage = '//www.lightstim.com/images/pro/icon-youraccount.jpg'

const getImageUrl = email => {
  const image = gravatar.url(email, {s: 200})
  return image || defaultImage
}

const getFilePath = path.dirname

const isThereALicenseFile = folder => {
  const possibleFiles = ['license', 'LICENSE', 'License', 'license.md', 'LICENSE.md', 'License.md', 'license.txt', 'LICENSE.txt', 'License.txt']
  let match
  possibleFiles.some(file => {
    const filePath = path.join(folder, file)
    if (fs.existsSync(filePath)) {
      match = file
      return true
    }
  })
  return match || false
}

module.exports = async (pkgJson = './package.json', {gravatarEmail} = {gravatarEmail: null}) => {
  const pkg = require(`${pkgJson}`)
  if (!pkg) {
    throw Error(`${pkgJson} not found`)
  }

  const folder = getFilePath(pkgJson)
  const name = pkg.name || 'Title goes here'
  const description = pkg.description || 'Introduce your software here'
  const author = pkg.author || 'Your Name'
  const license = pkg.license || ''
  const imageUrl = gravatarEmail ? getImageUrl(gravatarEmail) : defaultImage
  let licenseFile
  if (license) {
    licenseFile = isThereALicenseFile(folder)
  }
  const output = await getMarkdown({name, description, author, license, licenseFile, imageUrl})
  return output
}

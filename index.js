const path = require('path')

const getMarkdown = async ({name, description, author}) => {
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

## Author

| ![me](https://www.lightstim.com/images/pro/icon-youraccount.jpg) |
| ----------------------------------------------------------------------------- |
| © 2017 [__${author}__]() |
`
}

module.exports = async (packagePath = './package.json') => {
  const package = require(`${packagePath}`)
  if (!package) {
    throw Error(`${packagePath} not found`)
  }

  const name = package.name || 'Title goes here'
  const description = package.description || 'Introduce your software here'
  const author = package.author || 'Your Name'
  const output = await getMarkdown({name, description, author})
  return output
}

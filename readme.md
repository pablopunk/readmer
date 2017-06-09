
# readmer

<p align="center">
  <i>Module to create simple markdown readme for a project</i>
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/readmer"><img src="https://img.shields.io/npm/dt/readmer.svg" /></a>
</p>

## Install

```bash
npm install --save readmer
```

## Usage

```javascript
const readmer = require('readmer')
readmer().then(console.log)
/* =>
# readmer

<p align="center">
  <i>Module to create simple markdown readme for a project</i>
</p>

## Install

npm install readmer

...

*/
```

## Options

```javascript
readmer(
  'package.json', // path to package.json
  { // optional
    gravatarEmail: 'Email to retrieve gravatar image'
  }
)
```

## Contribute

Feel free to open an _issue_ or a _PR_.

## Related

CLI for this module => [readmer-cli](https://github.com/pablopunk/readmer-cli)

## Author

| ![me](https://www.gravatar.com/avatar/fa50aeff0ddd6e63273a068b04353d9d?s=100)|
| -----------------------------------------------------------------------------|
| © 2017 [__Pablo Varela__](http://pablo.life)                                 |


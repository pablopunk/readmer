const test = require('ava')
const readmer = require('./index')

test('Returns output', async t => {
  t.plan(1)
  await readmer().then(output => t.pass())
})

test('Handles total path', async t => {
  t.plan(1)
  await readmer(`${process.cwd()}/package.json`).then(output => t.pass())
})

test('Retrieves gravatar image', async t => {
  t.plan(1)
  const gravatarEmail = 'pablovarela182@gmail.com'
  await readmer(`${process.cwd()}/package.json`, {gravatarEmail}).then(output => {
    t.true(output.includes('gravatar.com'))
  })
})

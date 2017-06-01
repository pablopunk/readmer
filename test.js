const test = require('ava')
const readmer = require('./index')

test('Returns output', async t => {
  t.plan(1)
  await readmer().then(output => t.pass())
  await readmer().then(console.log)
})

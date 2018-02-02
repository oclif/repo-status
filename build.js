const _ = require('lodash')
const Handlebars = require('handlebars')
const fs = require('fs-extra')

const template = Handlebars.compile(fs.readFileSync('./.github/README.md.hbs', 'utf8'))
const data = {
  projects: _([
    ...[
      'cli-ux',
      'eslint-config-anycli',
    ].map(name => ({
      name,
      repo: {
        user: 'anycli',
        name,
      },
    })),
    ...[
      'command',
      'config',
      'cli',
      'engine',
      'example-multi-js',
      'example-multi-ts',
      'example-plugin-js',
      'example-plugin-ts',
      'example-single-js',
      'example-single-ts',
      'help-plugin',
      'manifest-file',
      'not-found-plugin',
      'nyc-config',
      'parser',
      'plugins-plugin',
      'screen',
      'semantic-release',
      'test',
      'tslint',
      'version-plugin',
    ].map(name => ({
      name: `@anycli/${name}`,
      appveyor: name === 'cli' ? 'heroku/cli-m41wo' : `heroku/${name}`,
      repo: {
        user: 'anycli',
        name,
      },
    })),
  ])
  .sortBy('name')
  .value(),
}

fs.writeFileSync('./README.md', template(data).trim())

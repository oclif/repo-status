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
      'help',
      'manifest-file',
      'not-found',
      'nyc-config',
      'parser',
      'plugins',
      'screen',
      'semantic-release',
      'test',
      'tslint',
      'version',
    ].map(name => ({
      name: `@anycli/${name}`,
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

const _ = require('lodash')
const Handlebars = require('handlebars')
const fs = require('fs-extra')

const template = Handlebars.compile(fs.readFileSync('./.github/README.md.hbs', 'utf8'))
const data = {
  projects: _([
    ...[
      'cli-ux',
      'create-dxcli',
      'eslint-config-dxcli',
    ].map(name => ({
      name,
      repo: {
        user: 'dxcli',
        name,
      },
    })),
    ...[
      'command',
      'config',
      'dev',
      'dxcli',
      'engine',
      'example-multi-js',
      'example-multi-ts',
      'example-plugin-js',
      'example-plugin-ts',
      'example-single-js',
      'example-single-ts',
      'help',
      'loader',
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
      name: `@dxcli/${name}`,
      repo: {
        user: 'dxcli',
        name,
      },
    })),
  ])
    .sortBy('name')
    .value(),
}

fs.writeFileSync('./README.md', template(data).trim())

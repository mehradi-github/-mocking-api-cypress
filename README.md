# Mocking API with Cypress
[Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress) is a purely JavaScript-based front-end testing tool built for the modern web.
We use [RealWorld](https://github.com/gothinkster/angular-realworld-example-app) to practice API Automation with Cypress.
- [Mocking API with Cypress](#mocking-api-with-cypress)
  - [Installing and opening Cypress](#installing-and-opening-cypress)
  - [APIs](#apis)
    - [Libraries and Tools](#libraries-and-tools)
  - [Command Line](#command-line)
  - [Environment Variables](#environment-variables)
  - [Configuration API](#configuration-api)
  - [Multiple Test Reports](#multiple-test-reports)



## Installing and opening Cypress
```sh
npm install cypress --save-dev
npx cypress open
```


## APIs
you can find here [table of contents](https://docs.cypress.io/api/table-of-contents):
- Events
- [Assertions](https://docs.cypress.io/guides/references/assertions)
  - [Chi](https://github.com/chaijs/chai)
  - BDD-Assertions
  - TDD-Assertions
  - [Chai-jQuery](https://github.com/chaijs/chai-jquery)
  - [sinon-chai](https://github.com/domenic/sinon-chai)
    - [cy.stub()](https://docs.cypress.io/api/commands/stub)
    - [cy.spy()](https://docs.cypress.io/api/commands/spy)
    - [Stubs, Spies, and Clocks](https://docs.cypress.io/guides/guides/stubs-spies-and-clocks)
- Commands
- Utilities
- Cypress API
  - [intercept](https://docs.cypress.io/api/commands/intercept): Spy and stub network requests and responses.
  - [its](https://docs.cypress.io/api/commands/its): Get a property's value on the previously yielded subject.
- Plugins

### Libraries and Tools
Cypress automatically bundles and wraps these libraries:
| Name                                                | What it does                               |
| :-------------------------------------------------- | :----------------------------------------- |
| [sinon](http://sinonjs.org/)                        | provides the cy.stub() and cy.spy() APIs   |
| [lolex ](https://github.com/sinonjs/lolex)          | provides the cy.clock() and cy.tick() APIs |
| [sinon-chai](https://github.com/domenic/sinon-chai) | adds chai assertions for stubs and spies   |

## Command Line 
[Cypress CLI](https://docs.cypress.io/guides/guides/command-line):
```sh
npx cypress run
```

```sh
npm install --save-dev start-server-and-test
```

## Environment Variables
[Environment Variables](https://docs.cypress.io/guides/guides/environment-variables) are useful when:

- Values are different across developer machines.
- Values are different across multiple environments: (dev, staging, qa, prod)
- Values change frequently and are highly dynamic.

## Configuration API
Cypress enables you to dynamically modify configuration values and environment variables from your [Cypress configuration](https://docs.cypress.io/api/plugins/configuration-api).

```js
// promisified fs module
const fs = require('fs-extra')
const path = require('path')

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve('..', 'config', `${file}.json`)

  return fs.readJson(pathToConfigFile)
}

// plugins file
module.exports = (on, config) => {
  // accept a configFile value or use development by default
  const file = config.env.configFile || 'development'

  return getConfigurationByFile(file)
}
```
```sh
cypress run
cypress run --env configFile=qa
cypress run --env configFile=staging
cypress run --env configFile=production
```
## Multiple Test Reports
Cypress is built on top of Mocha, that means any [reporter](https://docs.cypress.io/guides/tooling/reporters) built for Mocha can be used with Cypress.

```sh
npm install --save-dev cypress-multi-reporters mocha-junit-reporter junit-report-merger
npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator
```
cypress.config.ts
```ts
import { defineConfig } from 'cypress'

export default defineConfig({
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json'
  }
})
```
reporter-config.json :
```json
  {
    "reporterEnabled": "mocha-junit-reporter, mochawesome",
    "mochaJunitReporterReporterOptions": {
      "mochaFile": "cypress/results/junit/results-[hash].xml"
    },
    "reporterOptions": {
        "reportDir": "cypress/results/mochawesome",
        "overwrite": false,
        "html": false,
        "json": true
      }
  }
```
package.json
```json
{
  "scripts": {
    "delete:reports": "rm cypress/results/* || true",
    "combine:reports": "jrm cypress/results/combined-report.xml \"cypress/results/*.xml\"",
    "prereport": "npm run delete:reports",
    "report": "cypress run --reporter cypress-multi-reporters --reporter-options configFile=reporter-config.json",
    "postreport": "npm run combine:reports"
  }
}
```
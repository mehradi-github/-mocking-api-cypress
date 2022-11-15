import { defineConfig } from 'cypress'

export default defineConfig({
  env: {
    baseUrl: 'http://localhost:4200/',
    username: 'cytest@test.com', 
    password: 'Welcome123',
    apiUrl: 'https://api.realworld.io'
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  }
})
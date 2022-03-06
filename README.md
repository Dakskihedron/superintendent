# Superintendent
Another discord.js bot written in Typescript.

## Hosting
### Heroku
The bot can be hosted on Heroku. Simply deploy the code to Heroku and provide the environment variables specified in `.env.example`. Heroku will automatically install any dependencies and launch the bot as a worker.
### Self-Host
To self-host, clone the repo and run `yarn` to install the dependencies. Rename `.env.example` to `.env` and provide the relevant environment variables. Run `yarn build` to compile the TypeScript code to JavaScript and `yarn start` to run the bot.
## Development Mode
To run the bot in development mode, run `yarn start:dev` after installing the dependencies. ts-node-dev will automatically watch for changes and restart the bot.

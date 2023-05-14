# Learn SRS

App that helps you learn foreign words using [SRS (space repetition system)](https://knowledge.wanikani.com/wanikani/srs/)

You can add new word as well as its definition or translation. Then after several hours you can review your words and try to input its definition. If you are correct time gap before next review increases.

## Development

1. Run `npm install`

2. To start development database you will need `docker` installed. For the first time you need to run `npm run db:init` to start db docker container, initialize database and populate it with necessary data

3. You must specify env variables in `.env` file. You can look at `.env.example` to see which variables you will need

3. Run `npm run dev` to start dev server

## Deployment

This app uses [Vercel](https://vercel.com) for deployment

After you connect github repo with Vercel you need to make small adjustments:

1. Override default build command with `npm run db:deploy && npm run build` to run database migrations before building the app

2. Remember to provide all production environment variables from `.env.example` in Vercel app settings
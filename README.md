# nextjs-serverless
An example of nextjs with serverless

## Setup
1. Clone the repo
2. Run `npm install`
3. Run `npm run dev`
4. The project will be running at `http://localhots:8000`

## Issues?
Currently if you open your browser and navigate to `http://localhots:8000/test` just look at your terminal it'll keep on cleaning `.next` directory and rebuild the app infinitely.

## Goal?
The main goal of this project is to get all the following pieces work together
1. Use `serverless`
2. Use `serverless-offline` to get it work in dev mode with HMR - (`development`)
3. Use `express` to handle all the routes and middlewares
3. Use `aws-serverless-express`
4. Deploy it on AWS lambda - (`production`)

# poker
Side project to build a simple poker game so I understand the rules better

# how to run
This repo has both api and client side logic. If you run the server from the root foler using `yarn dev` and hit `localhost:4000`, you should see the hosted React application running. This means you need to `yarn build` from `/src/client` after you make client-side changes. 

If you prefer to work only on client side, please change your directory to `/src/client` and then run `yarn start` which opens up webpack web server that supports hot-reloading. Since our express server includes `cors` middleware, you should be able to hit the server from the different port - e.g. React is running on `localhost:4000` and interfaces with `localhost:3000` (Express server with Websocket connection)

# hangeul-to-hiragana

http://node-express-env.eba-krtvdf5u.us-east-2.elasticbeanstalk.com/

## Run locally

#### Step 1
In `src/bin/www:15` change

    var port = normalizePort(process.env.PORT || '8081');

to

    var port = normalizePort(process.env.PORT || '9000');

#### Step 2
In `src/client/package.json:35` change

    "proxy": "http://node-express-env.eba-krtvdf5u.us-east-2.elasticbeanstalk.com:8081"

to

    "proxy": "http://localhost:9000"

#### Step 3
In `src/` run

    npm start

#### Step 4
In a separate terminal session, cd into `src/client/` and run

    npm start

#### Step 5
Point your browser to `http://localhost:3000`
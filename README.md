# Survey-Collector

This is a simple web application where users can start Email survey campaign, sending a templated Emails to a list of receiving Email address. The messaging service is powered by `Twilio SendGrid`.

When Email receivers response to the survey, the statistics of the response will be reflected in a user's campaign home page throught `webhook`.
![](https://imgur.com/hopkmV6.jpg | width=100)
![](https://imgur.com/hopkmV6.jpg | =250x250)

In order to use the service, user need to buy credit through a payment service called `Stripe`.

User can login through their Email/Password combination (`JWT token + bcrypt`), or using `Google/Facebook/Github Oauth` through `passport`. After login, a `cookie session of 30 days` will be initiated. The login page is protected by reCAPTCHA v3.

User and survey data will be stored in `mongoDB tables`, backend api is served through `Express.js` and frontend UI is rendered by `React` and `Bootstrap`.

In the project we also explored `direct deployment`, `containerized deployment` and the use of `Github Action`.

# Get Started

## Pre-reqs

### Oauth

- [Google Oauth Key Pair](https://developers.google.com/identity/protocols/oauth2)
- [Facebook Oauth Key Pair](https://theonetechnologies.com/blog/post/how-to-get-facebook-application-id-and-secret-key)
- [Github Oauth Key Pair](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)

### Stripe

- an Stripe account
- a [Stripe API Secret Key](https://support.stripe.com/questions/locate-api-keys-in-the-dashboard)
- [Stripe cli](https://stripe.com/docs/stripe-cli) - if you want to run the application locally. Stripe cli can forward Stripe webhook event to your local endpoint

```bash
stripe listen --forward-to localhost:4242/stripe_webhooks
```

### SendGrid

- a SendGrid account
- a [SendGrid API Key](https://docs.gravityforms.com/sendgrid-api-key/#:~:text=Log%20into%20your%20SendGrid%20account,create%20a%20new%20API%20key.)
- [ngrok](https://ngrok.com/docs/getting-started/) - used to forward SendGrid's webhook event to the localhost

### MongoDB

- An vaild MongoDB endpoint (eg. [Atlas](https://www.mongodb.com/atlas)).

## Run locally

### Step 1: prepare .env files

- the application use dotenv to load environment variables. Prepare variables as follow
- in `./backend/.env`

```bash
# the port backend will be running
PORT=4000

# url to the frontend application
FRONT_URL='http://localhost:3000'

# mangoDB url
MONGO_URL=

# Google Oauth: https://developers.google.com/identity/protocols/oauth2
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Facebook Oauth: https://theonetechnologies.com/blog/post/how-to-get-facebook-application-id-and-secret-key
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=

# Github Oauth: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# JWT: a randomly generated string
JWT_SECRET=

# cookie-session key: a randomly generated string
COOKIE_KEY=

# Stripe API: https://stripe.com/docs/keys
STRIPE_PRIVATE_KEY=

# SENDGRID_API: https://docs.sendgrid.com/api-reference/api-keys/create-api-keys
SENDGRID_API_KEY=
```

- in `./frontend/.env`

```bash
# google reCAPTCHA key
REACT_APP_RECAPTCHA_KEY=

# url to the backend
REACT_APP_API_URL=http://localhost:4000

```

### Step 2: run application

```bash
cd frontend
npm install
npm start

cd backend
npm install
npm run dev
```

### When run locally, You may want to use `stripe cli` or `ngrok` to access full feature of the app

- `stripe cli` can simulate stripe action without actually using the web service, enabling payment function testing in the local environment.

```bash
stripe listen --forward-to localhost:4000/api/credit/webhook
```

- `ngrok` makes it possible to expose your machine to external traffic from `sendgrid`, to `receive sendgrid webhook message`.
  - see [sendgrid doc](https://ngrok.com/docs) about ngrok

## Run from container

### Step 1: prepare .env files

- prepare .env files in same format as before

### Step 2: run application

- pull the image I uploaded and run with these .env file

```bash
IMAGE_NAME=mlpppp/survey-collector
IMAGE_TAG_BACK=back_latest
IMAGE_TAG_FRONT=front_latest

sudo docker run -d -p 4000:4000 \
  --env-file path/to/backend/envfile/.env \
  $IMAGE_NAME:$IMAGE_TAG_BACK
sudo docker run -d -p 3000:3000 \
  --env-file path/to/frontend/envfile/.env \
  $IMAGE_NAME:$IMAGE_TAG_FRONT
```

# refs

- strip:

  - strip cli: https://stripe.com/docs/stripe-cli
  - test webhook: https://stripe.com/docs/webhooks/test

- sendgrid:
  - https://docs.sendgrid.com/for-developers/sending-email/quickstart-nodejs
  - https://www.youtube.com/watch?v=vThujL5-fZQ
- Facebook Oauth
  - https://developers.facebook.com/docs/facebook-login/web
  - https://theonetechnologies.com/blog/post/how-to-get-facebook-application-id-and-secret-key
- github Oauth
  - https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app
  - https://www.youtube.com/watch?v=qUE4-kSlPIk
- jwt auth
  - https://www.passportjs.org/packages/passport-jwt/
  - https://www.youtube.com/watch?v=fYaduF4iUSQ&list=PL4cUxeGkcC9g8OhpOZxNdhXggFz2lOuCT&index=5

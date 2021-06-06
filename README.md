# AWS APIGateway Path Replacer GUI

![concept1](https://user-images.githubusercontent.com/54195833/64548894-843b8c80-d36a-11e9-8a14-73501b4a285e.jpg)

![concept2](https://user-images.githubusercontent.com/54195833/64548898-869de680-d36a-11e9-8b38-bd0d6e973d4e.jpg)

On AWS API Gateway console (AWS Web console), we can add or remove api path resources, then we can create method to those resources.
On the otherhand, we also want to change API path with that web console, but it can't.
```
For example: /person/age-info -> /person/info
```
You must use the AWS CLI or SDK for this action. It takes time to do every time.

So we created a support app for it. This app will help to change the api path.
The inside of this app is simple. Start the WEB server locally with node.js and access to your AWS resource directly by AWS SDK for node.js. It's secure.

Try this app with the following text commands.

Oops, you need "npm" or "docker-compose". If you don't have either, install it first.

## First, Project setup
```
git clone https://github.com/sabacan509/aws-apigw-path-replacer.git
cd aws-apigw-path-replacer
```

## For This App User: * You need Node.js (npm) before.
### Build app, and start API Server and GUI Server
```
npm ci
npm run build
npm run express:run
```

### Open this app on browser
```
http://localhost:3000/
```

### For docker user, instead of above build and run:
```
docker-compose up -d --build
* It may take a few minutes for the service to start
```
```
http://localhost:3131/
```

## For This App Developper
The main components for this app are vue-cli and aws-sdk for Node.js.

### Compiles and hot-reloads for development
```
npm run serve
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

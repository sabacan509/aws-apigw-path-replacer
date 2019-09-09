# AWS APIGateway Path Replacer GUI

![concept1](https://user-images.githubusercontent.com/54195833/64548894-843b8c80-d36a-11e9-8a14-73501b4a285e.jpg)

![concept2](https://user-images.githubusercontent.com/54195833/64548898-869de680-d36a-11e9-8b38-bd0d6e973d4e.jpg)

## First, Project setup
```
git clone https://github.com/sabacan509/aws-apigw-path-replacer.git
cd aws-apigw-path-replacer
npm install
```

## For This App User
### Compile for production, and start API Server and GUI Server
```
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

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

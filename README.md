# AWS APIGateway Path Replacer GUI

![コンセプト２](https://user-images.githubusercontent.com/54195833/64545495-cd3c1280-d363-11e9-989f-b44de9878f85.jpg)

![コンセプト](https://user-images.githubusercontent.com/54195833/64548548-cc0de400-d369-11e9-8352-805900f64d35.jpg)

## First, Project setup
```
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

### For docker user, instead of above build and run.
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

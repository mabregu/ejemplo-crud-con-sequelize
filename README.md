# Plantis API

Plantis API is a RESTful API for the Plantis project. It is written in Node.js and uses Express.js as a web framework.

## Installation

To install the API, you need to have Node.js and npm installed. Then, you can install the dependencies with:

```bash
npm install
```

## Usage

To start the API, you can use the following command:

```bash
npm start
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

[]: # Path: package.json
{
  "name": "plantis-api",
  "version": "1.0.0",
  "description": "RESTful API for the Plantis project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "author": "Plantis",
  "license": "MIT",
  "dependencies": {
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "mongoose": "^5.9.7"
  }
}

[]: # Path: index.js
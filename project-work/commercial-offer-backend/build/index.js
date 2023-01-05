module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/graphpack/config/index.js":
/*!************************************************!*\
  !*** ./node_modules/graphpack/config/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const cosmiconfig = __webpack_require__(/*! cosmiconfig */ "cosmiconfig");
const webpack = __webpack_require__(/*! webpack */ "webpack");
const defaultConfig = __webpack_require__(/*! ./webpack.config */ "./node_modules/graphpack/config/webpack.config.js");
const explorer = cosmiconfig('graphpack').search();
const loadServerConfig = async () => {
  const result = await explorer;
  const userConfig = result ? typeof result.config === 'function' ? result.config(defaultConfig.mode) : result.config : {};
  return {
    port: Number(process.env.PORT),
    ...userConfig.server
  };
};
const loadWebpackConfig = async () => {
  const result = await explorer;
  const userConfig = result ? typeof result.config === 'function' ? result.config(defaultConfig.mode) : result.config : {};
  if (typeof userConfig.webpack === 'function') {
    return userConfig.webpack({
      config: defaultConfig,
      webpack
    });
  }
  return {
    ...defaultConfig,
    ...userConfig.webpack
  };
};
exports.loadServerConfig = loadServerConfig;
exports.loadWebpackConfig = loadWebpackConfig;

/***/ }),

/***/ "./node_modules/graphpack/config/webpack.config.js":
/*!*********************************************************!*\
  !*** ./node_modules/graphpack/config/webpack.config.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const FriendlyErrorsWebpackPlugin = __webpack_require__(/*! friendly-errors-webpack-plugin */ "friendly-errors-webpack-plugin");
const fs = __webpack_require__(/*! fs */ "fs");
const path = __webpack_require__(/*! path */ "path");
const webpack = __webpack_require__(/*! webpack */ "webpack");
const nodeExternals = __webpack_require__(/*! webpack-node-externals */ "webpack-node-externals");
const isDev = "development" !== 'production';
const isWebpack = typeof __webpack_require__.m === 'object';
const hasBabelRc = fs.existsSync(path.resolve('babel.config.js'));
if (hasBabelRc && !isWebpack) {
  console.info('🐠 Using babel.config.js defined in your app root');
}
module.exports = {
  devtool: 'source-map',
  entry: {
    // We take care of setting up entry file under lib/index.js
    index: ['graphpack']
  },
  // When bundling with Webpack for the backend you usually don't want to bundle
  // its node_modules dependencies. This creates an externals function that
  // ignores node_modules when bundling in Webpack.
  externals: [nodeExternals({
    whitelist: [/^graphpack$/]
  })],
  mode: isDev ? 'development' : 'production',
  module: {
    rules: [{
      test: /\.(gql|graphql)/,
      use: 'graphql-tag/loader'
    }, {
      test: /\.(js|ts)$/,
      use: [{
        loader: /*require.resolve*/(/*! babel-loader */ "babel-loader"),
        options: {
          babelrc: true,
          cacheDirectory: true,
          presets: hasBabelRc ? undefined : [/*require.resolve*/(/*! babel-preset-graphpack */ "babel-preset-graphpack")]
        }
      }]
    }, {
      test: /\.mjs$/,
      type: 'javascript/auto'
    }]
  },
  node: {
    __filename: true,
    __dirname: true
  },
  optimization: {
    noEmitOnErrors: true
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.join(process.cwd(), './build'),
    sourceMapFilename: '[name].map'
  },
  performance: {
    hints: false
  },
  plugins: [new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1
  }), new webpack.EnvironmentPlugin({
    DEBUG: false,
    GRAPHPACK_SRC_DIR: path.resolve(process.cwd(), 'src'),
    NODE_ENV: 'development'
  }), new FriendlyErrorsWebpackPlugin({
    clearConsole: isDev
  })],
  resolve: {
    extensions: ['.ts', '.js']
  },
  stats: 'minimal',
  target: 'node'
};

/***/ }),

/***/ "./node_modules/graphpack/lib/server.js":
/*!**********************************************!*\
  !*** ./node_modules/graphpack/lib/server.js ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server */ "./node_modules/graphpack/node_modules/apollo-server/dist/index.js");
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! apollo-server-express */ "./node_modules/graphpack/node_modules/apollo-server-express/dist/index.js");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _srcFiles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./srcFiles */ "./node_modules/graphpack/lib/srcFiles.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../config */ "./node_modules/graphpack/config/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_3__);




if (!(_srcFiles__WEBPACK_IMPORTED_MODULE_2__["resolvers"] && Object.keys(_srcFiles__WEBPACK_IMPORTED_MODULE_2__["resolvers"]).length > 0)) {
  throw Error(`Couldn't find any resolvers. Please add resolvers to your src/resolvers.js`);
}
const createServer = config => {
  const {
    applyMiddleware,
    port: serverPort,
    ...options
  } = config;
  const port = Number(process.env.PORT) || serverPort || 4000;
  // Pull out fields that are not relevant for the apollo server

  // Use apollo-server-express when middleware detected
  if (applyMiddleware && applyMiddleware.app && typeof applyMiddleware.app.listen === 'function') {
    const server = new apollo_server_express__WEBPACK_IMPORTED_MODULE_1__["ApolloServer"](options);
    server.applyMiddleware(applyMiddleware);
    return applyMiddleware.app.listen({
      port
    }, () => console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`));
  }

  // Use apollo-server
  const server = new apollo_server__WEBPACK_IMPORTED_MODULE_0__["ApolloServer"](options);
  return server.listen({
    port
  }).then(({
    url
  }) => console.log(`🚀 Server ready at ${url}`));
};
const startServer = async () => {
  // Load server config from graphpack.config.js
  const config = await Object(_config__WEBPACK_IMPORTED_MODULE_3__["loadServerConfig"])();
  createServer({
    ...config,
    context: _srcFiles__WEBPACK_IMPORTED_MODULE_2__["context"],
    resolvers: _srcFiles__WEBPACK_IMPORTED_MODULE_2__["resolvers"],
    typeDefs: _srcFiles__WEBPACK_IMPORTED_MODULE_2__["typeDefs"]
  });
};
startServer();

/***/ }),

/***/ "./node_modules/graphpack/lib/srcFiles.js":
/*!************************************************!*\
  !*** ./node_modules/graphpack/lib/srcFiles.js ***!
  \************************************************/
/*! exports provided: importFirst, context, resolvers, typeDefs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "importFirst", function() { return importFirst; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "context", function() { return context; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolvers", function() { return resolvers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "typeDefs", function() { return typeDefs; });
const importFirst = req => req.keys().map(mod => req(mod).default || req(mod))[0];

// Optionally import modules
const context = importFirst(__webpack_require__("./src sync recursive ^\\.\\/(context|context\\/index)\\.(js|ts)$"));
const resolvers = importFirst(__webpack_require__("./src sync recursive ^\\.\\/(resolvers|resolvers\\/index)\\.(js|ts)$"));
const typeDefs = importFirst(__webpack_require__("./src sync recursive ^\\.\\/(schema|schema\\/index)\\.(gql|graphql|js|ts)$"));

/***/ }),

/***/ "./node_modules/graphpack/node_modules/@apollographql/graphql-upload-8-fork/lib/GraphQLUpload.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/@apollographql/graphql-upload-8-fork/lib/GraphQLUpload.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.GraphQLUpload = void 0;
var _graphql = __webpack_require__(/*! graphql */ "graphql");
const GraphQLUpload = new _graphql.GraphQLScalarType({
  name: 'Upload',
  description: 'The `Upload` scalar type represents a file upload.',
  parseValue: value => value,
  parseLiteral() {
    throw new Error('‘Upload’ scalar literal unsupported.');
  },
  serialize() {
    throw new Error('‘Upload’ scalar serialization unsupported.');
  }
});
exports.GraphQLUpload = GraphQLUpload;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/@apollographql/graphql-upload-8-fork/lib/constants.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/@apollographql/graphql-upload-8-fork/lib/constants.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.SPEC_URL = void 0;
const SPEC_URL = 'https://github.com/jaydenseric/graphql-multipart-request-spec';
exports.SPEC_URL = SPEC_URL;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/@apollographql/graphql-upload-8-fork/lib/graphqlUploadExpress.js":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/@apollographql/graphql-upload-8-fork/lib/graphqlUploadExpress.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.graphqlUploadExpress = void 0;
var _processRequest = __webpack_require__(/*! ./processRequest */ "./node_modules/graphpack/node_modules/@apollographql/graphql-upload-8-fork/lib/processRequest.js");
const graphqlUploadExpress = ({
  processRequest = _processRequest.processRequest,
  ...processRequestOptions
} = {}) => (request, response, next) => {
  if (!request.is('multipart/form-data')) return next();
  const finished = new Promise(resolve => request.on('end', resolve));
  const {
    send
  } = response;
  response.send = (...args) => {
    finished.then(() => {
      response.send = send;
      response.send(...args);
    });
  };
  processRequest(request, response, processRequestOptions).then(body => {
    request.body = body;
    next();
  }).catch(error => {
    if (error.status && error.expose) response.status(error.status);
    next(error);
  });
};
exports.graphqlUploadExpress = graphqlUploadExpress;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/@apollographql/graphql-upload-8-fork/lib/graphqlUploadKoa.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/@apollographql/graphql-upload-8-fork/lib/graphqlUploadKoa.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.graphqlUploadKoa = void 0;
var _processRequest = __webpack_require__(/*! ./processRequest */ "./node_modules/graphpack/node_modules/@apollographql/graphql-upload-8-fork/lib/processRequest.js");
const graphqlUploadKoa = ({
  processRequest = _processRequest.processRequest,
  ...processRequestOptions
} = {}) => async (ctx, next) => {
  if (!ctx.request.is('multipart/form-data')) return next();
  const finished = new Promise(resolve => ctx.req.on('end', resolve));
  try {
    ctx.request.body = await processRequest(ctx.req, ctx.res, processRequestOptions);
    await next();
  } finally {
    await finished;
  }
};
exports.graphqlUploadKoa = graphqlUploadKoa;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/@apollographql/graphql-upload-8-fork/lib/ignoreStream.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/@apollographql/graphql-upload-8-fork/lib/ignoreStream.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.ignoreStream = void 0;
const ignoreStream = stream => {
  stream.on('error', () => {});
  stream.resume();
};
exports.ignoreStream = ignoreStream;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/@apollographql/graphql-upload-8-fork/lib/index.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/@apollographql/graphql-upload-8-fork/lib/index.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.graphqlUploadExpress = exports.graphqlUploadKoa = exports.processRequest = exports.GraphQLUpload = void 0;
var _GraphQLUpload = __webpack_require__(/*! ./GraphQLUpload */ "./node_modules/graphpack/node_modules/@apollographql/graphql-upload-8-fork/lib/GraphQLUpload.js");
exports.GraphQLUpload = _GraphQLUpload.GraphQLUpload;
var _processRequest = __webpack_require__(/*! ./processRequest */ "./node_modules/graphpack/node_modules/@apollographql/graphql-upload-8-fork/lib/processRequest.js");
exports.processRequest = _processRequest.processRequest;
var _graphqlUploadKoa = __webpack_require__(/*! ./graphqlUploadKoa */ "./node_modules/graphpack/node_modules/@apollographql/graphql-upload-8-fork/lib/graphqlUploadKoa.js");
exports.graphqlUploadKoa = _graphqlUploadKoa.graphqlUploadKoa;
var _graphqlUploadExpress = __webpack_require__(/*! ./graphqlUploadExpress */ "./node_modules/graphpack/node_modules/@apollographql/graphql-upload-8-fork/lib/graphqlUploadExpress.js");
exports.graphqlUploadExpress = _graphqlUploadExpress.graphqlUploadExpress;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/@apollographql/graphql-upload-8-fork/lib/isEnumerableObject.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/@apollographql/graphql-upload-8-fork/lib/isEnumerableObject.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.isEnumerableObject = void 0;
const isEnumerableObject = value => typeof value === 'object' && value !== null && !Array.isArray(value);
exports.isEnumerableObject = isEnumerableObject;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/@apollographql/graphql-upload-8-fork/lib/processRequest.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/@apollographql/graphql-upload-8-fork/lib/processRequest.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.processRequest = void 0;
var _util = _interopRequireDefault(__webpack_require__(/*! util */ "util"));
var _busboy = _interopRequireDefault(__webpack_require__(/*! busboy */ "busboy"));
var _fsCapacitor = __webpack_require__(/*! fs-capacitor */ "fs-capacitor");
var _httpErrors = _interopRequireDefault(__webpack_require__(/*! http-errors */ "http-errors"));
var _objectPath = _interopRequireDefault(__webpack_require__(/*! object-path */ "object-path"));
var _constants = __webpack_require__(/*! ./constants */ "./node_modules/graphpack/node_modules/@apollographql/graphql-upload-8-fork/lib/constants.js");
var _ignoreStream = __webpack_require__(/*! ./ignoreStream */ "./node_modules/graphpack/node_modules/@apollographql/graphql-upload-8-fork/lib/ignoreStream.js");
var _isEnumerableObject = __webpack_require__(/*! ./isEnumerableObject */ "./node_modules/graphpack/node_modules/@apollographql/graphql-upload-8-fork/lib/isEnumerableObject.js");

// istanbul ignore next
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
class Upload {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = file => {
        this.file = file;
        resolve(file);
      };
      this.reject = reject;
    });
    this.promise.catch(() => {});
  }
}
const processRequest = (request, response, {
  maxFieldSize = 1000000,
  maxFileSize = Infinity,
  maxFiles = Infinity
} = {}) => new Promise((resolve, reject) => {
  let released;
  let exitError;
  let currentStream;
  let operations;
  let operationsPath;
  let map;
  const parser = new _busboy.default({
    headers: request.headers,
    limits: {
      fieldSize: maxFieldSize,
      fields: 2,
      fileSize: maxFileSize,
      files: maxFiles
    }
  });
  const exit = error => {
    if (exitError) return;
    exitError = error;
    reject(exitError);
    parser.destroy();
    if (currentStream) currentStream.destroy(exitError);
    if (map) for (const upload of map.values()) if (!upload.file) upload.reject(exitError);
    request.unpipe(parser);
    setImmediate(() => {
      request.resume();
    });
  };
  const release = () => {
    // istanbul ignore next
    if (released) return;
    released = true;
    if (map) for (const upload of map.values()) if (upload.file) upload.file.capacitor.destroy();
  };
  const abort = () => {
    exit((0, _httpErrors.default)(499, 'Request disconnected during file upload stream parsing.'));
  };
  parser.on('field', (fieldName, value, fieldNameTruncated, valueTruncated) => {
    if (exitError) return;
    if (valueTruncated) return exit((0, _httpErrors.default)(413, `The ‘${fieldName}’ multipart field value exceeds the ${maxFieldSize} byte size limit.`));
    switch (fieldName) {
      case 'operations':
        try {
          operations = JSON.parse(value);
        } catch (error) {
          return exit((0, _httpErrors.default)(400, `Invalid JSON in the ‘operations’ multipart field (${_constants.SPEC_URL}).`));
        }
        if (!(0, _isEnumerableObject.isEnumerableObject)(operations) && !Array.isArray(operations)) return exit((0, _httpErrors.default)(400, `Invalid type for the ‘operations’ multipart field (${_constants.SPEC_URL}).`));
        operationsPath = (0, _objectPath.default)(operations);
        break;
      case 'map':
        {
          if (!operations) return exit((0, _httpErrors.default)(400, `Misordered multipart fields; ‘map’ should follow ‘operations’ (${_constants.SPEC_URL}).`));
          let parsedMap;
          try {
            parsedMap = JSON.parse(value);
          } catch (error) {
            return exit((0, _httpErrors.default)(400, `Invalid JSON in the ‘map’ multipart field (${_constants.SPEC_URL}).`));
          }
          if (!(0, _isEnumerableObject.isEnumerableObject)(parsedMap)) return exit((0, _httpErrors.default)(400, `Invalid type for the ‘map’ multipart field (${_constants.SPEC_URL}).`));
          const mapEntries = Object.entries(parsedMap);
          if (mapEntries.length > maxFiles) return exit((0, _httpErrors.default)(413, `${maxFiles} max file uploads exceeded.`));
          map = new Map();
          for (const [fieldName, paths] of mapEntries) {
            if (!Array.isArray(paths)) return exit((0, _httpErrors.default)(400, `Invalid type for the ‘map’ multipart field entry key ‘${fieldName}’ array (${_constants.SPEC_URL}).`));
            map.set(fieldName, new Upload());
            for (const [index, path] of paths.entries()) {
              if (typeof path !== 'string') return exit((0, _httpErrors.default)(400, `Invalid type for the ‘map’ multipart field entry key ‘${fieldName}’ array index ‘${index}’ value (${_constants.SPEC_URL}).`));
              try {
                operationsPath.set(path, map.get(fieldName).promise);
              } catch (error) {
                return exit((0, _httpErrors.default)(400, `Invalid object path for the ‘map’ multipart field entry key ‘${fieldName}’ array index ‘${index}’ value ‘${path}’ (${_constants.SPEC_URL}).`));
              }
            }
          }
          resolve(operations);
        }
    }
  });
  parser.on('file', (fieldName, stream, filename, encoding, mimetype) => {
    if (exitError) {
      ;
      (0, _ignoreStream.ignoreStream)(stream);
      return;
    }
    if (!map) {
      ;
      (0, _ignoreStream.ignoreStream)(stream);
      return exit((0, _httpErrors.default)(400, `Misordered multipart fields; files should follow ‘map’ (${_constants.SPEC_URL}).`));
    }
    currentStream = stream;
    stream.on('end', () => {
      currentStream = null;
    });
    const upload = map.get(fieldName);
    if (!upload) {
      ;
      (0, _ignoreStream.ignoreStream)(stream);
      return;
    }
    const capacitor = new _fsCapacitor.WriteStream();
    capacitor.on('error', () => {
      stream.unpipe();
      stream.resume();
    });
    stream.on('limit', () => {
      stream.unpipe();
      capacitor.destroy((0, _httpErrors.default)(413, `File truncated as it exceeds the ${maxFileSize} byte size limit.`));
    });
    stream.on('error', error => {
      stream.unpipe(); // istanbul ignore next

      capacitor.destroy(exitError || error);
    });
    stream.pipe(capacitor);
    const file = {
      filename,
      mimetype,
      encoding,
      createReadStream() {
        const error = capacitor.error || (released ? exitError : null);
        if (error) throw error;
        return capacitor.createReadStream();
      }
    };
    let capacitorStream;
    Object.defineProperty(file, 'stream', {
      get: _util.default.deprecate(function () {
        if (!capacitorStream) capacitorStream = this.createReadStream();
        return capacitorStream;
      }, 'File upload property ‘stream’ is deprecated. Use ‘createReadStream()’ instead.')
    });
    Object.defineProperty(file, 'capacitor', {
      value: capacitor
    });
    upload.resolve(file);
  });
  parser.once('filesLimit', () => exit((0, _httpErrors.default)(413, `${maxFiles} max file uploads exceeded.`)));
  parser.once('finish', () => {
    request.unpipe(parser);
    request.resume();
    if (!operations) return exit((0, _httpErrors.default)(400, `Missing multipart field ‘operations’ (${_constants.SPEC_URL}).`));
    if (!map) return exit((0, _httpErrors.default)(400, `Missing multipart field ‘map’ (${_constants.SPEC_URL}).`));
    for (const upload of map.values()) if (!upload.file) upload.reject((0, _httpErrors.default)(400, 'File missing in the request.'));
  });
  parser.once('error', exit);
  response.once('finish', release);
  response.once('close', release);
  request.once('close', abort);
  request.once('end', () => {
    request.removeListener('close', abort);
  });
  request.pipe(parser);
});
exports.processRequest = processRequest;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-cache-control/dist/index.js":
/*!********************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-cache-control/dist/index.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const graphql_1 = __webpack_require__(/*! graphql */ "graphql");
var CacheScope;
(function (CacheScope) {
  CacheScope["Public"] = "PUBLIC";
  CacheScope["Private"] = "PRIVATE";
})(CacheScope = exports.CacheScope || (exports.CacheScope = {}));
class CacheControlExtension {
  constructor(options = {}) {
    this.options = options;
    this.hints = new Map();
    this.defaultMaxAge = options.defaultMaxAge || 0;
  }
  willResolveField(_source, _args, _context, info) {
    let hint = {};
    const targetType = graphql_1.getNamedType(info.returnType);
    if (targetType instanceof graphql_1.GraphQLObjectType || targetType instanceof graphql_1.GraphQLInterfaceType) {
      if (targetType.astNode) {
        hint = mergeHints(hint, cacheHintFromDirectives(targetType.astNode.directives));
      }
    }
    const fieldDef = info.parentType.getFields()[info.fieldName];
    if (fieldDef.astNode) {
      hint = mergeHints(hint, cacheHintFromDirectives(fieldDef.astNode.directives));
    }
    if ((targetType instanceof graphql_1.GraphQLObjectType || targetType instanceof graphql_1.GraphQLInterfaceType || !info.path.prev) && hint.maxAge === undefined) {
      hint.maxAge = this.defaultMaxAge;
    }
    if (hint.maxAge !== undefined || hint.scope !== undefined) {
      this.addHint(info.path, hint);
    }
    info.cacheControl = {
      setCacheHint: hint => {
        this.addHint(info.path, hint);
      },
      cacheHint: hint
    };
  }
  addHint(path, hint) {
    const existingCacheHint = this.hints.get(path);
    if (existingCacheHint) {
      this.hints.set(path, mergeHints(existingCacheHint, hint));
    } else {
      this.hints.set(path, hint);
    }
  }
  format() {
    if (this.options.stripFormattedExtensions) return;
    return ['cacheControl', {
      version: 1,
      hints: Array.from(this.hints).map(([path, hint]) => Object.assign({
        path: [...graphql_1.responsePathAsArray(path)]
      }, hint))
    }];
  }
  willSendResponse(o) {
    if (this.options.calculateHttpHeaders && o.graphqlResponse.http) {
      const overallCachePolicy = this.computeOverallCachePolicy();
      if (overallCachePolicy) {
        o.graphqlResponse.http.headers.set('Cache-Control', `max-age=${overallCachePolicy.maxAge}, ${overallCachePolicy.scope.toLowerCase()}`);
      }
    }
  }
  computeOverallCachePolicy() {
    let lowestMaxAge = undefined;
    let scope = CacheScope.Public;
    for (const hint of this.hints.values()) {
      if (hint.maxAge !== undefined) {
        lowestMaxAge = lowestMaxAge !== undefined ? Math.min(lowestMaxAge, hint.maxAge) : hint.maxAge;
      }
      if (hint.scope === CacheScope.Private) {
        scope = CacheScope.Private;
      }
    }
    return lowestMaxAge ? {
      maxAge: lowestMaxAge,
      scope
    } : undefined;
  }
}
exports.CacheControlExtension = CacheControlExtension;
function cacheHintFromDirectives(directives) {
  if (!directives) return undefined;
  const cacheControlDirective = directives.find(directive => directive.name.value === 'cacheControl');
  if (!cacheControlDirective) return undefined;
  if (!cacheControlDirective.arguments) return undefined;
  const maxAgeArgument = cacheControlDirective.arguments.find(argument => argument.name.value === 'maxAge');
  const scopeArgument = cacheControlDirective.arguments.find(argument => argument.name.value === 'scope');
  return {
    maxAge: maxAgeArgument && maxAgeArgument.value && maxAgeArgument.value.kind === 'IntValue' ? parseInt(maxAgeArgument.value.value) : undefined,
    scope: scopeArgument && scopeArgument.value && scopeArgument.value.kind === 'EnumValue' ? scopeArgument.value.value : undefined
  };
}
function mergeHints(hint, otherHint) {
  if (!otherHint) return hint;
  return {
    maxAge: otherHint.maxAge !== undefined ? otherHint.maxAge : hint.maxAge,
    scope: otherHint.scope || hint.scope
  };
}

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-link/lib/bundle.esm.js":
/*!***************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-link/lib/bundle.esm.js ***!
  \***************************************************************************/
/*! exports provided: Observable, getOperationName, ApolloLink, concat, createOperation, empty, execute, from, fromError, fromPromise, makePromise, split, toPromise */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApolloLink", function() { return ApolloLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "concat", function() { return concat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createOperation", function() { return createOperation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "empty", function() { return empty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "execute", function() { return execute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "from", function() { return from; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromError", function() { return fromError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromPromise", function() { return fromPromise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makePromise", function() { return makePromise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "split", function() { return split; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toPromise", function() { return toPromise; });
/* harmony import */ var zen_observable_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable-ts */ "zen-observable-ts");
/* harmony import */ var zen_observable_ts__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable_ts__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "Observable", function() { return zen_observable_ts__WEBPACK_IMPORTED_MODULE_0___default.a; });
/* harmony import */ var ts_invariant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ts-invariant */ "ts-invariant");
/* harmony import */ var ts_invariant__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ts_invariant__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var apollo_utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! apollo-utilities */ "./node_modules/graphpack/node_modules/apollo-utilities/lib/bundle.esm.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getOperationName", function() { return apollo_utilities__WEBPACK_IMPORTED_MODULE_3__["getOperationName"]; });







function validateOperation(operation) {
  var OPERATION_FIELDS = ['query', 'operationName', 'variables', 'extensions', 'context'];
  for (var _i = 0, _a = Object.keys(operation); _i < _a.length; _i++) {
    var key = _a[_i];
    if (OPERATION_FIELDS.indexOf(key) < 0) {
      throw  false ? undefined : new ts_invariant__WEBPACK_IMPORTED_MODULE_1__["InvariantError"]("illegal argument: " + key);
    }
  }
  return operation;
}
var LinkError = function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__extends"])(LinkError, _super);
  function LinkError(message, link) {
    var _this = _super.call(this, message) || this;
    _this.link = link;
    return _this;
  }
  return LinkError;
}(Error);
function isTerminating(link) {
  return link.request.length <= 1;
}
function toPromise(observable) {
  var completed = false;
  return new Promise(function (resolve, reject) {
    observable.subscribe({
      next: function (data) {
        if (completed) {
           false || ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"].warn("Promise Wrapper does not support multiple results from Observable");
        } else {
          completed = true;
          resolve(data);
        }
      },
      error: reject
    });
  });
}
var makePromise = toPromise;
function fromPromise(promise) {
  return new zen_observable_ts__WEBPACK_IMPORTED_MODULE_0___default.a(function (observer) {
    promise.then(function (value) {
      observer.next(value);
      observer.complete();
    }).catch(observer.error.bind(observer));
  });
}
function fromError(errorValue) {
  return new zen_observable_ts__WEBPACK_IMPORTED_MODULE_0___default.a(function (observer) {
    observer.error(errorValue);
  });
}
function transformOperation(operation) {
  var transformedOperation = {
    variables: operation.variables || {},
    extensions: operation.extensions || {},
    operationName: operation.operationName,
    query: operation.query
  };
  if (!transformedOperation.operationName) {
    transformedOperation.operationName = typeof transformedOperation.query !== 'string' ? Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_3__["getOperationName"])(transformedOperation.query) : '';
  }
  return transformedOperation;
}
function createOperation(starting, operation) {
  var context = Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__assign"])({}, starting);
  var setContext = function (next) {
    if (typeof next === 'function') {
      context = Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__assign"])({}, context, next(context));
    } else {
      context = Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__assign"])({}, context, next);
    }
  };
  var getContext = function () {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__assign"])({}, context);
  };
  Object.defineProperty(operation, 'setContext', {
    enumerable: false,
    value: setContext
  });
  Object.defineProperty(operation, 'getContext', {
    enumerable: false,
    value: getContext
  });
  Object.defineProperty(operation, 'toKey', {
    enumerable: false,
    value: function () {
      return getKey(operation);
    }
  });
  return operation;
}
function getKey(operation) {
  var query = operation.query,
    variables = operation.variables,
    operationName = operation.operationName;
  return JSON.stringify([operationName, query, variables]);
}
function passthrough(op, forward) {
  return forward ? forward(op) : zen_observable_ts__WEBPACK_IMPORTED_MODULE_0___default.a.of();
}
function toLink(handler) {
  return typeof handler === 'function' ? new ApolloLink(handler) : handler;
}
function empty() {
  return new ApolloLink(function () {
    return zen_observable_ts__WEBPACK_IMPORTED_MODULE_0___default.a.of();
  });
}
function from(links) {
  if (links.length === 0) return empty();
  return links.map(toLink).reduce(function (x, y) {
    return x.concat(y);
  });
}
function split(test, left, right) {
  var leftLink = toLink(left);
  var rightLink = toLink(right || new ApolloLink(passthrough));
  if (isTerminating(leftLink) && isTerminating(rightLink)) {
    return new ApolloLink(function (operation) {
      return test(operation) ? leftLink.request(operation) || zen_observable_ts__WEBPACK_IMPORTED_MODULE_0___default.a.of() : rightLink.request(operation) || zen_observable_ts__WEBPACK_IMPORTED_MODULE_0___default.a.of();
    });
  } else {
    return new ApolloLink(function (operation, forward) {
      return test(operation) ? leftLink.request(operation, forward) || zen_observable_ts__WEBPACK_IMPORTED_MODULE_0___default.a.of() : rightLink.request(operation, forward) || zen_observable_ts__WEBPACK_IMPORTED_MODULE_0___default.a.of();
    });
  }
}
var concat = function (first, second) {
  var firstLink = toLink(first);
  if (isTerminating(firstLink)) {
     false || ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"].warn(new LinkError("You are calling concat on a terminating link, which will have no effect", firstLink));
    return firstLink;
  }
  var nextLink = toLink(second);
  if (isTerminating(nextLink)) {
    return new ApolloLink(function (operation) {
      return firstLink.request(operation, function (op) {
        return nextLink.request(op) || zen_observable_ts__WEBPACK_IMPORTED_MODULE_0___default.a.of();
      }) || zen_observable_ts__WEBPACK_IMPORTED_MODULE_0___default.a.of();
    });
  } else {
    return new ApolloLink(function (operation, forward) {
      return firstLink.request(operation, function (op) {
        return nextLink.request(op, forward) || zen_observable_ts__WEBPACK_IMPORTED_MODULE_0___default.a.of();
      }) || zen_observable_ts__WEBPACK_IMPORTED_MODULE_0___default.a.of();
    });
  }
};
var ApolloLink = function () {
  function ApolloLink(request) {
    if (request) this.request = request;
  }
  ApolloLink.prototype.split = function (test, left, right) {
    return this.concat(split(test, left, right || new ApolloLink(passthrough)));
  };
  ApolloLink.prototype.concat = function (next) {
    return concat(this, next);
  };
  ApolloLink.prototype.request = function (operation, forward) {
    throw  false ? undefined : new ts_invariant__WEBPACK_IMPORTED_MODULE_1__["InvariantError"]('request is not implemented');
  };
  ApolloLink.empty = empty;
  ApolloLink.from = from;
  ApolloLink.split = split;
  ApolloLink.execute = execute;
  return ApolloLink;
}();
function execute(link, operation) {
  return link.request(createOperation(operation.context, transformOperation(validateOperation(operation)))) || zen_observable_ts__WEBPACK_IMPORTED_MODULE_0___default.a.of();
}


/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-core/dist/ApolloServer.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-core/dist/ApolloServer.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
  return t;
};
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const graphql_tools_1 = __webpack_require__(/*! graphql-tools */ "./node_modules/graphpack/node_modules/graphql-tools/dist/index.js");
const graphql_1 = __webpack_require__(/*! graphql */ "graphql");
const apollo_server_caching_1 = __webpack_require__(/*! apollo-server-caching */ "apollo-server-caching");
const runtimeSupportsUploads_1 = __importDefault(__webpack_require__(/*! ./utils/runtimeSupportsUploads */ "./node_modules/graphpack/node_modules/apollo-server-core/dist/utils/runtimeSupportsUploads.js"));
const subscriptions_transport_ws_1 = __webpack_require__(/*! subscriptions-transport-ws */ "subscriptions-transport-ws");
const apollo_server_errors_1 = __webpack_require__(/*! apollo-server-errors */ "./node_modules/graphpack/node_modules/apollo-server-errors/dist/index.js");
const formatters_1 = __webpack_require__(/*! ./formatters */ "./node_modules/graphpack/node_modules/apollo-server-core/dist/formatters.js");
const index_1 = __webpack_require__(/*! ./index */ "./node_modules/graphpack/node_modules/apollo-server-core/dist/index.js");
const playground_1 = __webpack_require__(/*! ./playground */ "./node_modules/graphpack/node_modules/apollo-server-core/dist/playground.js");
const schemaHash_1 = __webpack_require__(/*! ./utils/schemaHash */ "./node_modules/graphpack/node_modules/apollo-server-core/dist/utils/schemaHash.js");
const requestPipeline_1 = __webpack_require__(/*! ./requestPipeline */ "./node_modules/graphpack/node_modules/apollo-server-core/dist/requestPipeline.js");
const apollo_server_env_1 = __webpack_require__(/*! apollo-server-env */ "apollo-server-env");
const apollo_tools_1 = __webpack_require__(/*! @apollographql/apollo-tools */ "@apollographql/apollo-tools");
const NoIntrospection = context => ({
  Field(node) {
    if (node.name.value === '__schema' || node.name.value === '__type') {
      context.reportError(new graphql_1.GraphQLError('GraphQL introspection is not allowed by Apollo Server, but the query contained __schema or __type. To enable introspection, pass introspection: true to ApolloServer in production', [node]));
    }
  }
});
function getEngineServiceId(engine) {
  const keyFromEnv = process.env.ENGINE_API_KEY || '';
  if (!(engine || engine !== false && keyFromEnv)) {
    return;
  }
  let engineApiKey = '';
  if (typeof engine === 'object' && engine.apiKey) {
    engineApiKey = engine.apiKey;
  } else if (keyFromEnv) {
    engineApiKey = keyFromEnv;
  }
  if (engineApiKey) {
    return engineApiKey.split(':', 2)[1];
  }
  return;
}
const forbidUploadsForTesting = process && "development" === 'test' && !runtimeSupportsUploads_1.default;
function approximateObjectSize(obj) {
  return Buffer.byteLength(JSON.stringify(obj), 'utf8');
}
class ApolloServerBase {
  constructor(config) {
    this.graphqlPath = '/graphql';
    this.requestOptions = Object.create(null);
    this.plugins = [];
    if (!config) throw new Error('ApolloServer requires options.');
    const {
        context,
        resolvers,
        schema,
        schemaDirectives,
        modules,
        typeDefs,
        parseOptions = {},
        introspection,
        mocks,
        mockEntireSchema,
        extensions,
        engine,
        subscriptions,
        uploads,
        playground,
        plugins
      } = config,
      requestOptions = __rest(config, ["context", "resolvers", "schema", "schemaDirectives", "modules", "typeDefs", "parseOptions", "introspection", "mocks", "mockEntireSchema", "extensions", "engine", "subscriptions", "uploads", "playground", "plugins"]);
    this.initializeDocumentStore();
    this.ensurePluginInstantiation(plugins);
    const isDev = "development" !== 'production';
    if (typeof introspection === 'boolean' && !introspection || introspection === undefined && !isDev) {
      const noIntro = [NoIntrospection];
      requestOptions.validationRules = requestOptions.validationRules ? requestOptions.validationRules.concat(noIntro) : noIntro;
    }
    if (requestOptions.cacheControl !== false) {
      if (typeof requestOptions.cacheControl === 'boolean' && requestOptions.cacheControl === true) {
        requestOptions.cacheControl = {
          stripFormattedExtensions: false,
          calculateHttpHeaders: false,
          defaultMaxAge: 0
        };
      } else {
        requestOptions.cacheControl = Object.assign({
          stripFormattedExtensions: true,
          calculateHttpHeaders: true,
          defaultMaxAge: 0
        }, requestOptions.cacheControl);
      }
    }
    if (!requestOptions.cache) {
      requestOptions.cache = new apollo_server_caching_1.InMemoryLRUCache();
    }
    if (requestOptions.persistedQueries !== false) {
      if (!requestOptions.persistedQueries) {
        requestOptions.persistedQueries = {
          cache: requestOptions.cache
        };
      }
    } else {
      delete requestOptions.persistedQueries;
    }
    this.requestOptions = requestOptions;
    this.context = context;
    if (uploads !== false && !forbidUploadsForTesting) {
      if (this.supportsUploads()) {
        if (!runtimeSupportsUploads_1.default) {
          printNodeFileUploadsMessage();
          throw new Error('`graphql-upload` is no longer supported on Node.js < v8.5.0.  ' + 'See https://bit.ly/gql-upload-node-6.');
        }
        if (uploads === true || typeof uploads === 'undefined') {
          this.uploadsConfig = {};
        } else {
          this.uploadsConfig = uploads;
        }
      } else if (uploads) {
        throw new Error('This implementation of ApolloServer does not support file uploads because the environment cannot accept multi-part forms');
      }
    }
    if (schema) {
      this.schema = schema;
    } else if (modules) {
      const {
        schema,
        errors
      } = apollo_tools_1.buildServiceDefinition(modules);
      if (errors && errors.length > 0) {
        throw new Error(errors.map(error => error.message).join('\n\n'));
      }
      this.schema = schema;
    } else {
      if (!typeDefs) {
        throw Error('Apollo Server requires either an existing schema, modules or typeDefs');
      }
      let augmentedTypeDefs = Array.isArray(typeDefs) ? typeDefs : [typeDefs];
      augmentedTypeDefs.push(index_1.gql`
          enum CacheControlScope {
            PUBLIC
            PRIVATE
          }

          directive @cacheControl(
            maxAge: Int
            scope: CacheControlScope
          ) on FIELD_DEFINITION | OBJECT | INTERFACE
        `);
      if (this.uploadsConfig) {
        const {
          GraphQLUpload
        } = __webpack_require__(/*! graphql-upload */ "./node_modules/graphpack/node_modules/graphql-upload/lib/index.js");
        if (resolvers && !resolvers.Upload) {
          resolvers.Upload = GraphQLUpload;
        }
        augmentedTypeDefs.push(index_1.gql`
            scalar Upload
          `);
      }
      this.schema = graphql_tools_1.makeExecutableSchema({
        typeDefs: augmentedTypeDefs,
        schemaDirectives,
        resolvers,
        parseOptions
      });
    }
    this.parseOptions = parseOptions;
    if (mocks || typeof mockEntireSchema !== 'undefined' && mocks !== false) {
      graphql_tools_1.addMockFunctionsToSchema({
        schema: this.schema,
        mocks: typeof mocks === 'boolean' || typeof mocks === 'undefined' ? {} : mocks,
        preserveResolvers: typeof mockEntireSchema === 'undefined' ? false : !mockEntireSchema
      });
    }
    this.schemaHash = schemaHash_1.generateSchemaHash(this.schema);
    this.extensions = [];
    const debugDefault =  true && "development" !== 'test';
    const debug = requestOptions.debug !== undefined ? requestOptions.debug : debugDefault;
    this.extensions.push(() => new formatters_1.FormatErrorExtension(requestOptions.formatError, debug));
    this.engineServiceId = getEngineServiceId(engine);
    if (this.engineServiceId) {
      const {
        EngineReportingAgent
      } = __webpack_require__(/*! apollo-engine-reporting */ "apollo-engine-reporting");
      this.engineReportingAgent = new EngineReportingAgent(typeof engine === 'object' ? engine : Object.create(null), {
        schema: this.schema,
        schemaHash: this.schemaHash,
        engine: {
          serviceID: this.engineServiceId
        }
      });
      this.extensions.push(() => this.engineReportingAgent.newExtension());
    }
    if (extensions) {
      this.extensions = [...this.extensions, ...extensions];
    }
    if (subscriptions !== false) {
      if (this.supportsSubscriptions()) {
        if (subscriptions === true || typeof subscriptions === 'undefined') {
          this.subscriptionServerOptions = {
            path: this.graphqlPath
          };
        } else if (typeof subscriptions === 'string') {
          this.subscriptionServerOptions = {
            path: subscriptions
          };
        } else {
          this.subscriptionServerOptions = Object.assign({
            path: this.graphqlPath
          }, subscriptions);
        }
        this.subscriptionsPath = this.subscriptionServerOptions.path;
      } else if (subscriptions) {
        throw new Error('This implementation of ApolloServer does not support GraphQL subscriptions.');
      }
    }
    this.playgroundOptions = playground_1.createPlaygroundOptions(playground);
  }
  setGraphQLPath(path) {
    this.graphqlPath = path;
  }
  willStart() {
    return __awaiter(this, void 0, void 0, function* () {
      yield Promise.all(this.plugins.map(plugin => plugin.serverWillStart && plugin.serverWillStart({
        schema: this.schema,
        schemaHash: this.schemaHash,
        engine: {
          serviceID: this.engineServiceId
        },
        persistedQueries: this.requestOptions.persistedQueries
      })));
    });
  }
  stop() {
    return __awaiter(this, void 0, void 0, function* () {
      if (this.subscriptionServer) yield this.subscriptionServer.close();
      if (this.engineReportingAgent) {
        this.engineReportingAgent.stop();
        yield this.engineReportingAgent.sendReport();
      }
    });
  }
  installSubscriptionHandlers(server) {
    if (!this.subscriptionServerOptions) {
      if (this.supportsSubscriptions()) {
        throw Error('Subscriptions are disabled, due to subscriptions set to false in the ApolloServer constructor');
      } else {
        throw Error('Subscriptions are not supported, choose an integration, such as apollo-server-express that allows persistent connections');
      }
    }
    const {
      onDisconnect,
      onConnect,
      keepAlive,
      path
    } = this.subscriptionServerOptions;
    this.subscriptionServer = subscriptions_transport_ws_1.SubscriptionServer.create({
      schema: this.schema,
      execute: graphql_1.execute,
      subscribe: graphql_1.subscribe,
      onConnect: onConnect ? onConnect : connectionParams => Object.assign({}, connectionParams),
      onDisconnect: onDisconnect,
      onOperation: (message, connection) => __awaiter(this, void 0, void 0, function* () {
        connection.formatResponse = value => Object.assign({}, value, {
          errors: value.errors && apollo_server_errors_1.formatApolloErrors([...value.errors], {
            formatter: this.requestOptions.formatError,
            debug: this.requestOptions.debug
          })
        });
        let context = this.context ? this.context : {
          connection
        };
        try {
          context = typeof this.context === 'function' ? yield this.context({
            connection,
            payload: message.payload
          }) : context;
        } catch (e) {
          throw apollo_server_errors_1.formatApolloErrors([e], {
            formatter: this.requestOptions.formatError,
            debug: this.requestOptions.debug
          })[0];
        }
        return Object.assign({}, connection, {
          context
        });
      }),
      keepAlive
    }, {
      server,
      path
    });
  }
  supportsSubscriptions() {
    return false;
  }
  supportsUploads() {
    return false;
  }
  ensurePluginInstantiation(plugins) {
    if (!plugins || !plugins.length) {
      return;
    }
    this.plugins = plugins.map(plugin => {
      if (typeof plugin === 'function') {
        return plugin();
      }
      return plugin;
    });
  }
  initializeDocumentStore() {
    this.documentStore = new apollo_server_caching_1.InMemoryLRUCache({
      maxSize: Math.pow(2, 20) * 30,
      sizeCalculator: approximateObjectSize
    });
  }
  graphQLServerOptions(integrationContextArgument) {
    return __awaiter(this, void 0, void 0, function* () {
      let context = this.context ? this.context : {};
      try {
        context = typeof this.context === 'function' ? yield this.context(integrationContextArgument || {}) : context;
      } catch (error) {
        context = () => {
          throw error;
        };
      }
      return Object.assign({
        schema: this.schema,
        plugins: this.plugins,
        documentStore: this.documentStore,
        extensions: this.extensions,
        context,
        persistedQueries: this.requestOptions.persistedQueries,
        fieldResolver: this.requestOptions.fieldResolver,
        parseOptions: this.parseOptions
      }, this.requestOptions);
    });
  }
  executeOperation(request) {
    return __awaiter(this, void 0, void 0, function* () {
      let options;
      try {
        options = yield this.graphQLServerOptions();
      } catch (e) {
        e.message = `Invalid options provided to ApolloServer: ${e.message}`;
        throw new Error(e);
      }
      if (typeof options.context === 'function') {
        options.context = options.context();
      }
      const requestCtx = {
        request,
        context: options.context || Object.create(null),
        cache: options.cache,
        response: {
          http: {
            headers: new apollo_server_env_1.Headers()
          }
        }
      };
      return requestPipeline_1.processGraphQLRequest(options, requestCtx);
    });
  }
}
exports.ApolloServerBase = ApolloServerBase;
function printNodeFileUploadsMessage() {
  console.error(['*****************************************************************', '*                                                               *', '* ERROR! Manual intervention is necessary for Node.js < v8.5.0! *', '*                                                               *', '*****************************************************************', '', 'The third-party `graphql-upload` package, which is used to implement', 'file uploads in Apollo Server 2.x, no longer supports Node.js LTS', 'versions prior to Node.js v8.5.0.', '', 'Deployments which NEED file upload capabilities should update to', 'Node.js >= v8.5.0 to continue using uploads.', '', 'If this server DOES NOT NEED file uploads and wishes to continue', 'using this version of Node.js, uploads can be disabled by adding:', '', '  uploads: false,', '', '...to the options for Apollo Server and re-deploying the server.', '', 'For more information, see https://bit.ly/gql-upload-node-6.', ''].join('\n'));
}

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-core/dist/formatters.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-core/dist/formatters.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const graphql_extensions_1 = __webpack_require__(/*! graphql-extensions */ "./node_modules/graphpack/node_modules/graphql-extensions/dist/index.js");
const apollo_server_errors_1 = __webpack_require__(/*! apollo-server-errors */ "./node_modules/graphpack/node_modules/apollo-server-errors/dist/index.js");
class FormatErrorExtension extends graphql_extensions_1.GraphQLExtension {
  constructor(formatError, debug = false) {
    super();
    this.formatError = formatError;
    this.debug = debug;
  }
  willSendResponse(o) {
    if (o.graphqlResponse.errors) {
      return Object.assign({}, o, {
        graphqlResponse: Object.assign({}, o.graphqlResponse, {
          errors: apollo_server_errors_1.formatApolloErrors(o.graphqlResponse.errors, {
            formatter: this.formatError,
            debug: this.debug
          })
        })
      });
    }
  }
}
exports.FormatErrorExtension = FormatErrorExtension;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-core/dist/graphqlOptions.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-core/dist/graphqlOptions.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
function resolveGraphqlOptions(options, ...args) {
  return __awaiter(this, void 0, void 0, function* () {
    if (typeof options === 'function') {
      return yield options(...args);
    } else {
      return options;
    }
  });
}
exports.resolveGraphqlOptions = resolveGraphqlOptions;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-core/dist/index.js":
/*!******************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-core/dist/index.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
__webpack_require__(/*! apollo-server-env */ "apollo-server-env");
var runHttpQuery_1 = __webpack_require__(/*! ./runHttpQuery */ "./node_modules/graphpack/node_modules/apollo-server-core/dist/runHttpQuery.js");
exports.runHttpQuery = runHttpQuery_1.runHttpQuery;
exports.HttpQueryError = runHttpQuery_1.HttpQueryError;
var graphqlOptions_1 = __webpack_require__(/*! ./graphqlOptions */ "./node_modules/graphpack/node_modules/apollo-server-core/dist/graphqlOptions.js");
exports.resolveGraphqlOptions = graphqlOptions_1.resolveGraphqlOptions;
var apollo_server_errors_1 = __webpack_require__(/*! apollo-server-errors */ "./node_modules/graphpack/node_modules/apollo-server-errors/dist/index.js");
exports.ApolloError = apollo_server_errors_1.ApolloError;
exports.toApolloError = apollo_server_errors_1.toApolloError;
exports.SyntaxError = apollo_server_errors_1.SyntaxError;
exports.ValidationError = apollo_server_errors_1.ValidationError;
exports.AuthenticationError = apollo_server_errors_1.AuthenticationError;
exports.ForbiddenError = apollo_server_errors_1.ForbiddenError;
exports.UserInputError = apollo_server_errors_1.UserInputError;
exports.formatApolloErrors = apollo_server_errors_1.formatApolloErrors;
var nodeHttpToRequest_1 = __webpack_require__(/*! ./nodeHttpToRequest */ "./node_modules/graphpack/node_modules/apollo-server-core/dist/nodeHttpToRequest.js");
exports.convertNodeHttpToRequest = nodeHttpToRequest_1.convertNodeHttpToRequest;
var playground_1 = __webpack_require__(/*! ./playground */ "./node_modules/graphpack/node_modules/apollo-server-core/dist/playground.js");
exports.createPlaygroundOptions = playground_1.createPlaygroundOptions;
exports.defaultPlaygroundOptions = playground_1.defaultPlaygroundOptions;
var ApolloServer_1 = __webpack_require__(/*! ./ApolloServer */ "./node_modules/graphpack/node_modules/apollo-server-core/dist/ApolloServer.js");
exports.ApolloServerBase = ApolloServer_1.ApolloServerBase;
__export(__webpack_require__(/*! ./types */ "./node_modules/graphpack/node_modules/apollo-server-core/dist/types.js"));
const graphql_tag_1 = __importDefault(__webpack_require__(/*! graphql-tag */ "graphql-tag"));
exports.gql = graphql_tag_1.default;
const runtimeSupportsUploads_1 = __importDefault(__webpack_require__(/*! ./utils/runtimeSupportsUploads */ "./node_modules/graphpack/node_modules/apollo-server-core/dist/utils/runtimeSupportsUploads.js"));
var processFileUploads_1 = __webpack_require__(/*! ./processFileUploads */ "./node_modules/graphpack/node_modules/apollo-server-core/dist/processFileUploads.js");
exports.processFileUploads = processFileUploads_1.default;
exports.GraphQLUpload = runtimeSupportsUploads_1.default ? __webpack_require__(/*! graphql-upload */ "./node_modules/graphpack/node_modules/graphql-upload/lib/index.js").GraphQLUpload : undefined;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-core/dist/nodeHttpToRequest.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-core/dist/nodeHttpToRequest.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const apollo_server_env_1 = __webpack_require__(/*! apollo-server-env */ "apollo-server-env");
function convertNodeHttpToRequest(req) {
  const headers = new apollo_server_env_1.Headers();
  Object.keys(req.headers).forEach(key => {
    const values = req.headers[key];
    if (Array.isArray(values)) {
      values.forEach(value => headers.append(key, value));
    } else {
      headers.append(key, values);
    }
  });
  return new apollo_server_env_1.Request(req.url, {
    headers,
    method: req.method
  });
}
exports.convertNodeHttpToRequest = convertNodeHttpToRequest;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-core/dist/playground.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-core/dist/playground.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const playgroundVersion = '1.7.10';
exports.defaultPlaygroundOptions = {
  version: playgroundVersion,
  settings: {
    'general.betaUpdates': false,
    'editor.theme': 'dark',
    'editor.cursorShape': 'line',
    'editor.reuseHeaders': true,
    'tracing.hideTracingResponse': true,
    'editor.fontSize': 14,
    'editor.fontFamily': `'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace`,
    'request.credentials': 'omit'
  }
};
function createPlaygroundOptions(playground) {
  const isDev = "development" !== 'production';
  const enabled = typeof playground !== 'undefined' ? !!playground : isDev;
  if (!enabled) {
    return undefined;
  }
  const playgroundOverrides = typeof playground === 'boolean' ? {} : playground || {};
  const settingsOverrides = playgroundOverrides.hasOwnProperty('settings') ? {
    settings: Object.assign({}, exports.defaultPlaygroundOptions.settings, playgroundOverrides.settings)
  } : {
    settings: undefined
  };
  const playgroundOptions = Object.assign({}, exports.defaultPlaygroundOptions, playgroundOverrides, settingsOverrides);
  return playgroundOptions;
}
exports.createPlaygroundOptions = createPlaygroundOptions;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-core/dist/processFileUploads.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-core/dist/processFileUploads.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const runtimeSupportsUploads_1 = __importDefault(__webpack_require__(/*! ./utils/runtimeSupportsUploads */ "./node_modules/graphpack/node_modules/apollo-server-core/dist/utils/runtimeSupportsUploads.js"));
const processFileUploads = (() => {
  if (runtimeSupportsUploads_1.default) {
    return __webpack_require__(/*! graphql-upload */ "./node_modules/graphpack/node_modules/graphql-upload/lib/index.js").processRequest;
  }
  return undefined;
})();
exports.default = processFileUploads;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-core/dist/requestPipeline.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-core/dist/requestPipeline.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result["default"] = mod;
  return result;
};
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const graphql_1 = __webpack_require__(/*! graphql */ "graphql");
const graphql = __importStar(__webpack_require__(/*! graphql */ "graphql"));
const graphql_extensions_1 = __webpack_require__(/*! graphql-extensions */ "./node_modules/graphpack/node_modules/graphql-extensions/dist/index.js");
const apollo_cache_control_1 = __webpack_require__(/*! apollo-cache-control */ "./node_modules/graphpack/node_modules/apollo-cache-control/dist/index.js");
const apollo_tracing_1 = __webpack_require__(/*! apollo-tracing */ "./node_modules/graphpack/node_modules/apollo-tracing/dist/index.js");
const apollo_server_errors_1 = __webpack_require__(/*! apollo-server-errors */ "./node_modules/graphpack/node_modules/apollo-server-errors/dist/index.js");
const requestPipelineAPI_1 = __webpack_require__(/*! ../dist/requestPipelineAPI */ "./node_modules/graphpack/node_modules/apollo-server-core/dist/requestPipelineAPI.js");
exports.InvalidGraphQLRequestError = requestPipelineAPI_1.InvalidGraphQLRequestError;
const dispatcher_1 = __webpack_require__(/*! ./utils/dispatcher */ "./node_modules/graphpack/node_modules/apollo-server-core/dist/utils/dispatcher.js");
const createSHA_1 = __importDefault(__webpack_require__(/*! ./utils/createSHA */ "./node_modules/graphpack/node_modules/apollo-server-core/dist/utils/createSHA.js"));
function computeQueryHash(query) {
  return createSHA_1.default('sha256').update(query).digest('hex');
}
function processGraphQLRequest(config, requestContext) {
  return __awaiter(this, void 0, void 0, function* () {
    let cacheControlExtension;
    const extensionStack = initializeExtensionStack();
    requestContext.context._extensionStack = extensionStack;
    const dispatcher = initializeRequestListenerDispatcher();
    initializeDataSources();
    const request = requestContext.request;
    let {
      query,
      extensions
    } = request;
    let queryHash;
    let persistedQueryCache;
    let persistedQueryHit = false;
    let persistedQueryRegister = false;
    if (extensions && extensions.persistedQuery) {
      if (!config.persistedQueries || !config.persistedQueries.cache) {
        throw new apollo_server_errors_1.PersistedQueryNotSupportedError();
      } else if (extensions.persistedQuery.version !== 1) {
        throw new requestPipelineAPI_1.InvalidGraphQLRequestError('Unsupported persisted query version');
      }
      persistedQueryCache = config.persistedQueries.cache;
      queryHash = extensions.persistedQuery.sha256Hash;
      if (query === undefined) {
        query = yield persistedQueryCache.get(`apq:${queryHash}`);
        if (query) {
          persistedQueryHit = true;
        } else {
          throw new apollo_server_errors_1.PersistedQueryNotFoundError();
        }
      } else {
        const computedQueryHash = computeQueryHash(query);
        if (queryHash !== computedQueryHash) {
          throw new requestPipelineAPI_1.InvalidGraphQLRequestError('provided sha does not match query');
        }
        persistedQueryRegister = true;
      }
    } else if (query) {
      queryHash = computeQueryHash(query);
    } else {
      throw new requestPipelineAPI_1.InvalidGraphQLRequestError('Must provide query string.');
    }
    requestContext.queryHash = queryHash;
    const requestDidEnd = extensionStack.requestDidStart({
      request: request.http,
      queryString: request.query,
      operationName: request.operationName,
      variables: request.variables,
      extensions: request.extensions,
      persistedQueryHit,
      persistedQueryRegister,
      context: requestContext.context,
      requestContext
    });
    try {
      if (config.documentStore) {
        try {
          requestContext.document = yield config.documentStore.get(queryHash);
        } catch (err) {
          console.warn('An error occurred while attempting to read from the documentStore.', err);
        }
      }
      if (!requestContext.document) {
        const parsingDidEnd = yield dispatcher.invokeDidStartHook('parsingDidStart', requestContext);
        try {
          requestContext.document = parse(query, config.parseOptions);
          parsingDidEnd();
        } catch (syntaxError) {
          parsingDidEnd(syntaxError);
          return sendErrorResponse(syntaxError, apollo_server_errors_1.SyntaxError);
        }
        const validationDidEnd = yield dispatcher.invokeDidStartHook('validationDidStart', requestContext);
        const validationErrors = validate(requestContext.document);
        if (validationErrors.length === 0) {
          validationDidEnd();
        } else {
          validationDidEnd(validationErrors);
          return sendErrorResponse(validationErrors, apollo_server_errors_1.ValidationError);
        }
        if (config.documentStore) {
          Promise.resolve(config.documentStore.set(queryHash, requestContext.document)).catch(err => console.warn('Could not store validated document.', err));
        }
      }
      const operation = graphql_1.getOperationAST(requestContext.document, request.operationName);
      requestContext.operation = operation || undefined;
      requestContext.operationName = operation && operation.name && operation.name.value || null;
      yield dispatcher.invokeHookAsync('didResolveOperation', requestContext);
      if (persistedQueryRegister && persistedQueryCache) {
        Promise.resolve(persistedQueryCache.set(`apq:${queryHash}`, query)).catch(console.warn);
      }
      const executionDidEnd = yield dispatcher.invokeDidStartHook('executionDidStart', requestContext);
      let response;
      try {
        response = yield execute(requestContext.document, request.operationName, request.variables);
        executionDidEnd();
      } catch (executionError) {
        executionDidEnd(executionError);
        return sendErrorResponse(executionError);
      }
      const formattedExtensions = extensionStack.format();
      if (Object.keys(formattedExtensions).length > 0) {
        response.extensions = formattedExtensions;
      }
      if (config.formatResponse) {
        response = config.formatResponse(response, {
          context: requestContext.context
        });
      }
      return sendResponse(response);
    } finally {
      requestDidEnd();
    }
    function parse(query, parseOptions) {
      const parsingDidEnd = extensionStack.parsingDidStart({
        queryString: query
      });
      try {
        return graphql.parse(query, parseOptions);
      } finally {
        parsingDidEnd();
      }
    }
    function validate(document) {
      let rules = graphql_1.specifiedRules;
      if (config.validationRules) {
        rules = rules.concat(config.validationRules);
      }
      const validationDidEnd = extensionStack.validationDidStart();
      try {
        return graphql.validate(config.schema, document, rules);
      } finally {
        validationDidEnd();
      }
    }
    function execute(document, operationName, variables) {
      return __awaiter(this, void 0, void 0, function* () {
        const executionArgs = {
          schema: config.schema,
          document,
          rootValue: typeof config.rootValue === 'function' ? config.rootValue(document) : config.rootValue,
          contextValue: requestContext.context,
          variableValues: variables,
          operationName,
          fieldResolver: config.fieldResolver
        };
        const executionDidEnd = extensionStack.executionDidStart({
          executionArgs
        });
        try {
          return yield graphql.execute(executionArgs);
        } finally {
          executionDidEnd();
        }
      });
    }
    function sendResponse(response) {
      return __awaiter(this, void 0, void 0, function* () {
        requestContext.response = extensionStack.willSendResponse({
          graphqlResponse: Object.assign({}, requestContext.response, {
            errors: response.errors,
            data: response.data,
            extensions: response.extensions
          }),
          context: requestContext.context
        }).graphqlResponse;
        yield dispatcher.invokeHookAsync('willSendResponse', requestContext);
        return requestContext.response;
      });
    }
    function sendErrorResponse(errorOrErrors, errorClass) {
      const errors = Array.isArray(errorOrErrors) ? errorOrErrors : [errorOrErrors];
      return sendResponse({
        errors: errors.map(err => apollo_server_errors_1.fromGraphQLError(err, errorClass && {
          errorClass
        }))
      });
    }
    function initializeRequestListenerDispatcher() {
      const requestListeners = [];
      if (config.plugins) {
        for (const plugin of config.plugins) {
          if (!plugin.requestDidStart) continue;
          const listener = plugin.requestDidStart(requestContext);
          if (listener) {
            requestListeners.push(listener);
          }
        }
      }
      return new dispatcher_1.Dispatcher(requestListeners);
    }
    function initializeExtensionStack() {
      graphql_extensions_1.enableGraphQLExtensions(config.schema);
      const extensions = config.extensions ? config.extensions.map(f => f()) : [];
      if (config.tracing) {
        extensions.push(new apollo_tracing_1.TracingExtension());
      }
      if (config.cacheControl) {
        cacheControlExtension = new apollo_cache_control_1.CacheControlExtension(config.cacheControl);
        extensions.push(cacheControlExtension);
      }
      return new graphql_extensions_1.GraphQLExtensionStack(extensions);
    }
    function initializeDataSources() {
      if (config.dataSources) {
        const context = requestContext.context;
        const dataSources = config.dataSources();
        for (const dataSource of Object.values(dataSources)) {
          if (dataSource.initialize) {
            dataSource.initialize({
              context,
              cache: requestContext.cache
            });
          }
        }
        if ('dataSources' in context) {
          throw new Error('Please use the dataSources config option instead of putting dataSources on the context yourself.');
        }
        context.dataSources = dataSources;
      }
    }
  });
}
exports.processGraphQLRequest = processGraphQLRequest;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-core/dist/requestPipelineAPI.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-core/dist/requestPipelineAPI.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
class InvalidGraphQLRequestError extends Error {}
exports.InvalidGraphQLRequestError = InvalidGraphQLRequestError;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-core/dist/runHttpQuery.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-core/dist/runHttpQuery.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const apollo_server_env_1 = __webpack_require__(/*! apollo-server-env */ "apollo-server-env");
const graphqlOptions_1 = __webpack_require__(/*! ./graphqlOptions */ "./node_modules/graphpack/node_modules/apollo-server-core/dist/graphqlOptions.js");
const apollo_server_errors_1 = __webpack_require__(/*! apollo-server-errors */ "./node_modules/graphpack/node_modules/apollo-server-errors/dist/index.js");
const requestPipeline_1 = __webpack_require__(/*! ./requestPipeline */ "./node_modules/graphpack/node_modules/apollo-server-core/dist/requestPipeline.js");
class HttpQueryError extends Error {
  constructor(statusCode, message, isGraphQLError = false, headers) {
    super(message);
    this.name = 'HttpQueryError';
    this.statusCode = statusCode;
    this.isGraphQLError = isGraphQLError;
    this.headers = headers;
  }
}
exports.HttpQueryError = HttpQueryError;
function throwHttpGraphQLError(statusCode, errors, options) {
  throw new HttpQueryError(statusCode, prettyJSONStringify({
    errors: options ? apollo_server_errors_1.formatApolloErrors(errors, {
      debug: options.debug,
      formatter: options.formatError
    }) : errors
  }), true, {
    'Content-Type': 'application/json'
  });
}
function runHttpQuery(handlerArguments, request) {
  return __awaiter(this, void 0, void 0, function* () {
    let options;
    const debugDefault =  true && "development" !== 'test';
    try {
      options = yield graphqlOptions_1.resolveGraphqlOptions(request.options, ...handlerArguments);
    } catch (e) {
      e.message = `Invalid options provided to ApolloServer: ${e.message}`;
      if (!debugDefault) {
        e.warning = `To remove the stacktrace, set the NODE_ENV environment variable to production if the options creation can fail`;
      }
      return throwHttpGraphQLError(500, [e], {
        debug: debugDefault
      });
    }
    if (options.debug === undefined) {
      options.debug = debugDefault;
    }
    if (typeof options.context === 'function') {
      try {
        options.context();
      } catch (e) {
        e.message = `Context creation failed: ${e.message}`;
        if (e.extensions && e.extensions.code && e.extensions.code !== 'INTERNAL_SERVER_ERROR') {
          return throwHttpGraphQLError(400, [e], options);
        } else {
          return throwHttpGraphQLError(500, [e], options);
        }
      }
    }
    const config = {
      schema: options.schema,
      rootValue: options.rootValue,
      context: options.context || {},
      validationRules: options.validationRules,
      fieldResolver: options.fieldResolver,
      cache: options.cache,
      cacheControl: options.cacheControl,
      dataSources: options.dataSources,
      documentStore: options.documentStore,
      extensions: options.extensions,
      persistedQueries: options.persistedQueries,
      tracing: options.tracing,
      formatError: options.formatError,
      formatResponse: options.formatResponse,
      debug: options.debug,
      plugins: options.plugins || []
    };
    return processHTTPRequest(config, request);
  });
}
exports.runHttpQuery = runHttpQuery;
function processHTTPRequest(options, httpRequest) {
  return __awaiter(this, void 0, void 0, function* () {
    let requestPayload;
    switch (httpRequest.method) {
      case 'POST':
        if (!httpRequest.query || Object.keys(httpRequest.query).length === 0) {
          throw new HttpQueryError(500, 'POST body missing. Did you forget use body-parser middleware?');
        }
        requestPayload = httpRequest.query;
        break;
      case 'GET':
        if (!httpRequest.query || Object.keys(httpRequest.query).length === 0) {
          throw new HttpQueryError(400, 'GET query missing.');
        }
        requestPayload = httpRequest.query;
        break;
      default:
        throw new HttpQueryError(405, 'Apollo Server supports only GET/POST requests.', false, {
          Allow: 'GET, POST'
        });
    }
    options = Object.assign({}, options, {
      plugins: [checkOperationPlugin, ...options.plugins]
    });
    function buildRequestContext(request) {
      const context = cloneObject(options.context);
      return {
        request,
        response: {
          http: {
            headers: new apollo_server_env_1.Headers()
          }
        },
        context,
        cache: options.cache,
        debug: options.debug
      };
    }
    const responseInit = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    let body;
    try {
      if (Array.isArray(requestPayload)) {
        const requests = requestPayload.map(requestParams => parseGraphQLRequest(httpRequest.request, requestParams));
        const responses = yield Promise.all(requests.map(request => __awaiter(this, void 0, void 0, function* () {
          try {
            const requestContext = buildRequestContext(request);
            return yield requestPipeline_1.processGraphQLRequest(options, requestContext);
          } catch (error) {
            return {
              errors: apollo_server_errors_1.formatApolloErrors([error], options)
            };
          }
        })));
        body = prettyJSONStringify(responses.map(serializeGraphQLResponse));
      } else {
        const request = parseGraphQLRequest(httpRequest.request, requestPayload);
        try {
          const requestContext = buildRequestContext(request);
          const response = yield requestPipeline_1.processGraphQLRequest(options, requestContext);
          if (response.errors && typeof response.data === 'undefined') {
            return throwHttpGraphQLError(400, response.errors);
          }
          if (response.http) {
            for (const [name, value] of response.http.headers) {
              responseInit.headers[name] = value;
            }
          }
          body = prettyJSONStringify(serializeGraphQLResponse(response));
        } catch (error) {
          if (error instanceof requestPipeline_1.InvalidGraphQLRequestError) {
            throw new HttpQueryError(400, error.message);
          } else if (error instanceof apollo_server_errors_1.PersistedQueryNotSupportedError || error instanceof apollo_server_errors_1.PersistedQueryNotFoundError) {
            return throwHttpGraphQLError(200, [error], options);
          } else {
            throw error;
          }
        }
      }
    } catch (error) {
      if (error instanceof HttpQueryError) {
        throw error;
      }
      return throwHttpGraphQLError(500, [error], options);
    }
    responseInit.headers['Content-Length'] = Buffer.byteLength(body, 'utf8').toString();
    return {
      graphqlResponse: body,
      responseInit
    };
  });
}
exports.processHTTPRequest = processHTTPRequest;
function parseGraphQLRequest(httpRequest, requestParams) {
  let queryString = requestParams.query;
  let extensions = requestParams.extensions;
  if (typeof extensions === 'string') {
    try {
      extensions = JSON.parse(extensions);
    } catch (error) {
      throw new HttpQueryError(400, 'Extensions are invalid JSON.');
    }
  }
  if (queryString && typeof queryString !== 'string') {
    if (queryString.kind === 'Document') {
      throw new HttpQueryError(400, "GraphQL queries must be strings. It looks like you're sending the " + 'internal graphql-js representation of a parsed query in your ' + 'request instead of a request in the GraphQL query language. You ' + 'can convert an AST to a string using the `print` function from ' + '`graphql`, or use a client like `apollo-client` which converts ' + 'the internal representation to a string for you.');
    } else {
      throw new HttpQueryError(400, 'GraphQL queries must be strings.');
    }
  }
  const operationName = requestParams.operationName;
  let variables = requestParams.variables;
  if (typeof variables === 'string') {
    try {
      variables = JSON.parse(variables);
    } catch (error) {
      throw new HttpQueryError(400, 'Variables are invalid JSON.');
    }
  }
  return {
    query: queryString,
    operationName,
    variables,
    extensions,
    http: httpRequest
  };
}
const checkOperationPlugin = {
  requestDidStart() {
    return {
      didResolveOperation({
        request,
        operation
      }) {
        if (!request.http) return;
        if (request.http.method === 'GET' && operation.operation !== 'query') {
          throw new HttpQueryError(405, `GET supports only query operation`, false, {
            Allow: 'POST'
          });
        }
      }
    };
  }
};
function serializeGraphQLResponse(response) {
  return {
    errors: response.errors,
    data: response.data,
    extensions: response.extensions
  };
}
function prettyJSONStringify(value) {
  return JSON.stringify(value) + '\n';
}
function cloneObject(object) {
  return Object.assign(Object.create(Object.getPrototypeOf(object)), object);
}

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-core/dist/types.js":
/*!******************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-core/dist/types.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_extensions_1 = __webpack_require__(/*! graphql-extensions */ "./node_modules/graphpack/node_modules/graphql-extensions/dist/index.js");
exports.GraphQLExtension = graphql_extensions_1.GraphQLExtension;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-core/dist/utils/createSHA.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-core/dist/utils/createSHA.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const isNodeLike_1 = __importDefault(__webpack_require__(/*! ./isNodeLike */ "./node_modules/graphpack/node_modules/apollo-server-core/dist/utils/isNodeLike.js"));
function default_1(kind) {
  if (isNodeLike_1.default) {
    return __webpack_require__(/*! crypto */ "crypto").createHash(kind);
  }
  return __webpack_require__(/*! sha.js */ "sha.js")(kind);
}
exports.default = default_1;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-core/dist/utils/dispatcher.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-core/dist/utils/dispatcher.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
class Dispatcher {
  constructor(targets) {
    this.targets = targets;
  }
  invokeHookAsync(methodName, ...args) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield Promise.all(this.targets.map(target => {
        const method = target[methodName];
        if (method && typeof method === 'function') {
          return method(...args);
        }
      }));
    });
  }
  invokeDidStartHook(methodName, ...args) {
    const didEndHooks = [];
    for (const target of this.targets) {
      const method = target[methodName];
      if (method && typeof method === 'function') {
        const didEndHook = method(...args);
        if (didEndHook) {
          didEndHooks.push(didEndHook);
        }
      }
    }
    return (...args) => {
      didEndHooks.reverse();
      for (const didEndHook of didEndHooks) {
        didEndHook(...args);
      }
    };
  }
}
exports.Dispatcher = Dispatcher;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-core/dist/utils/isNodeLike.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-core/dist/utils/isNodeLike.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = typeof process === 'object' && process && process.release && process.versions && typeof process.versions.node === 'string';

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-core/dist/utils/runtimeSupportsUploads.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-core/dist/utils/runtimeSupportsUploads.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const isNodeLike_1 = __importDefault(__webpack_require__(/*! ./isNodeLike */ "./node_modules/graphpack/node_modules/apollo-server-core/dist/utils/isNodeLike.js"));
const runtimeSupportsUploads = (() => {
  if (isNodeLike_1.default) {
    const [nodeMajor, nodeMinor] = process.versions.node.split('.', 2).map(segment => parseInt(segment, 10));
    if (nodeMajor < 8 || nodeMajor === 8 && nodeMinor < 5) {
      return false;
    }
    return true;
  }
  return false;
})();
exports.default = runtimeSupportsUploads;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-core/dist/utils/schemaHash.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-core/dist/utils/schemaHash.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const language_1 = __webpack_require__(/*! graphql/language */ "graphql/language");
const execution_1 = __webpack_require__(/*! graphql/execution */ "graphql/execution");
const utilities_1 = __webpack_require__(/*! graphql/utilities */ "graphql/utilities");
const fast_json_stable_stringify_1 = __importDefault(__webpack_require__(/*! fast-json-stable-stringify */ "fast-json-stable-stringify"));
const createSHA_1 = __importDefault(__webpack_require__(/*! ./createSHA */ "./node_modules/graphpack/node_modules/apollo-server-core/dist/utils/createSHA.js"));
function generateSchemaHash(schema) {
  const introspectionQuery = utilities_1.getIntrospectionQuery();
  const documentAST = language_1.parse(introspectionQuery);
  const result = execution_1.execute(schema, documentAST);
  if (result && typeof result.then === 'function') {
    throw new Error(['The introspection query is resolving asynchronously; execution of an introspection query is not expected to return a `Promise`.', '', 'Wrapped type resolvers should maintain the existing execution dynamics of the resolvers they wrap (i.e. async vs sync) or introspection types should be excluded from wrapping by checking them with `graphql/type`s, `isIntrospectionType` predicate function prior to wrapping.'].join('\n'));
  }
  if (!result || !result.data || !result.data.__schema) {
    throw new Error('Unable to generate server introspection document.');
  }
  const introspectionSchema = result.data.__schema;
  const stringifiedSchema = fast_json_stable_stringify_1.default(introspectionSchema);
  return createSHA_1.default('sha512').update(stringifiedSchema).digest('hex');
}
exports.generateSchemaHash = generateSchemaHash;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-errors/dist/index.js":
/*!********************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-errors/dist/index.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const graphql_1 = __webpack_require__(/*! graphql */ "graphql");
class ApolloError extends Error {
  constructor(message, code, properties) {
    super(message);
    if (properties) {
      Object.keys(properties).forEach(key => {
        this[key] = properties[key];
      });
    }
    if (!this.name) {
      Object.defineProperty(this, 'name', {
        value: 'ApolloError'
      });
    }
    this.extensions = {
      code
    };
  }
}
exports.ApolloError = ApolloError;
function enrichError(error, debug = false) {
  const expanded = Object.create(Object.getPrototypeOf(error), {
    name: {
      value: error.name
    },
    message: {
      value: error.message,
      enumerable: true,
      writable: true
    },
    locations: {
      value: error.locations || undefined,
      enumerable: true
    },
    path: {
      value: error.path || undefined,
      enumerable: true
    },
    nodes: {
      value: error.nodes || undefined
    },
    source: {
      value: error.source || undefined
    },
    positions: {
      value: error.positions || undefined
    },
    originalError: {
      value: error.originalError
    }
  });
  expanded.extensions = Object.assign({}, error.extensions, {
    code: error.extensions && error.extensions.code || 'INTERNAL_SERVER_ERROR',
    exception: Object.assign({}, error.extensions && error.extensions.exception, error.originalError)
  });
  delete expanded.extensions.exception.extensions;
  if (debug && !expanded.extensions.exception.stacktrace) {
    expanded.extensions.exception.stacktrace = error.originalError && error.originalError.stack && error.originalError.stack.split('\n') || error.stack && error.stack.split('\n');
  }
  if (Object.keys(expanded.extensions.exception).length === 0) {
    delete expanded.extensions.exception;
  }
  return expanded;
}
function toApolloError(error, code = 'INTERNAL_SERVER_ERROR') {
  let err = error;
  if (err.extensions) {
    err.extensions.code = code;
  } else {
    err.extensions = {
      code
    };
  }
  return err;
}
exports.toApolloError = toApolloError;
function fromGraphQLError(error, options) {
  const copy = options && options.errorClass ? new options.errorClass(error.message) : new ApolloError(error.message);
  Object.keys(error).forEach(key => {
    copy[key] = error[key];
  });
  copy.extensions = Object.assign({}, copy.extensions, error.extensions);
  if (!copy.extensions.code) {
    copy.extensions.code = options && options.code || 'INTERNAL_SERVER_ERROR';
  }
  Object.defineProperty(copy, 'originalError', {
    value: {}
  });
  Object.getOwnPropertyNames(error).forEach(key => {
    Object.defineProperty(copy.originalError, key, {
      value: error[key]
    });
  });
  return copy;
}
exports.fromGraphQLError = fromGraphQLError;
class SyntaxError extends ApolloError {
  constructor(message) {
    super(message, 'GRAPHQL_PARSE_FAILED');
    Object.defineProperty(this, 'name', {
      value: 'SyntaxError'
    });
  }
}
exports.SyntaxError = SyntaxError;
class ValidationError extends ApolloError {
  constructor(message) {
    super(message, 'GRAPHQL_VALIDATION_FAILED');
    Object.defineProperty(this, 'name', {
      value: 'ValidationError'
    });
  }
}
exports.ValidationError = ValidationError;
class AuthenticationError extends ApolloError {
  constructor(message) {
    super(message, 'UNAUTHENTICATED');
    Object.defineProperty(this, 'name', {
      value: 'AuthenticationError'
    });
  }
}
exports.AuthenticationError = AuthenticationError;
class ForbiddenError extends ApolloError {
  constructor(message) {
    super(message, 'FORBIDDEN');
    Object.defineProperty(this, 'name', {
      value: 'ForbiddenError'
    });
  }
}
exports.ForbiddenError = ForbiddenError;
class PersistedQueryNotFoundError extends ApolloError {
  constructor() {
    super('PersistedQueryNotFound', 'PERSISTED_QUERY_NOT_FOUND');
    Object.defineProperty(this, 'name', {
      value: 'PersistedQueryNotFoundError'
    });
  }
}
exports.PersistedQueryNotFoundError = PersistedQueryNotFoundError;
class PersistedQueryNotSupportedError extends ApolloError {
  constructor() {
    super('PersistedQueryNotSupported', 'PERSISTED_QUERY_NOT_SUPPORTED');
    Object.defineProperty(this, 'name', {
      value: 'PersistedQueryNotSupportedError'
    });
  }
}
exports.PersistedQueryNotSupportedError = PersistedQueryNotSupportedError;
class UserInputError extends ApolloError {
  constructor(message, properties) {
    super(message, 'BAD_USER_INPUT', properties);
    Object.defineProperty(this, 'name', {
      value: 'UserInputError'
    });
  }
}
exports.UserInputError = UserInputError;
function formatApolloErrors(errors, options) {
  if (!options) {
    return errors.map(error => enrichError(error));
  }
  const {
    formatter,
    debug
  } = options;
  const enrichedErrors = errors.map(error => enrichError(error, debug));
  if (!formatter) {
    return enrichedErrors;
  }
  return enrichedErrors.map(error => {
    try {
      return formatter(error);
    } catch (err) {
      if (debug) {
        return enrichError(err, debug);
      } else {
        const newError = fromGraphQLError(new graphql_1.GraphQLError('Internal server error'));
        return enrichError(newError, debug);
      }
    }
  });
}
exports.formatApolloErrors = formatApolloErrors;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/dist/ApolloServer.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/dist/ApolloServer.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApolloServer = void 0;
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const cors_1 = __importDefault(__webpack_require__(/*! cors */ "cors"));
const body_parser_1 = __webpack_require__(/*! body-parser */ "body-parser");
const graphql_playground_html_1 = __webpack_require__(/*! @apollographql/graphql-playground-html */ "@apollographql/graphql-playground-html");
const apollo_server_core_1 = __webpack_require__(/*! apollo-server-core */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/index.js");
const accepts_1 = __importDefault(__webpack_require__(/*! accepts */ "accepts"));
const type_is_1 = __importDefault(__webpack_require__(/*! type-is */ "type-is"));
const expressApollo_1 = __webpack_require__(/*! ./expressApollo */ "./node_modules/graphpack/node_modules/apollo-server-express/dist/expressApollo.js");
var apollo_server_core_2 = __webpack_require__(/*! apollo-server-core */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/index.js");
Object.defineProperty(exports, "GraphQLExtension", {
  enumerable: true,
  get: function () {
    return apollo_server_core_2.GraphQLExtension;
  }
});
const fileUploadMiddleware = (uploadsConfig, server) => (req, res, next) => {
  if (!server.disableUploads() && typeof apollo_server_core_1.processFileUploads === 'function' && type_is_1.default(req, ['multipart/form-data'])) {
    apollo_server_core_1.processFileUploads(req, res, uploadsConfig).then(body => {
      req.body = body;
      next();
    }).catch(error => {
      if (error.status && error.expose) res.status(error.status);
      next(apollo_server_core_1.formatApolloErrors([error], {
        formatter: server.requestOptions.formatError,
        debug: server.requestOptions.debug
      }));
    });
  } else {
    next();
  }
};
class ApolloServer extends apollo_server_core_1.ApolloServerBase {
  constructor(config) {
    super(config);
  }
  createGraphQLServerOptions(req, res) {
    const _super = Object.create(null, {
      graphQLServerOptions: {
        get: () => super.graphQLServerOptions
      }
    });
    return __awaiter(this, void 0, void 0, function* () {
      return _super.graphQLServerOptions.call(this, {
        req,
        res
      });
    });
  }
  supportsSubscriptions() {
    return true;
  }
  supportsUploads() {
    return true;
  }
  applyMiddleware(_a) {
    var {
        app
      } = _a,
      rest = __rest(_a, ["app"]);
    app.use(this.getMiddleware(rest));
  }
  getMiddleware({
    path,
    cors,
    bodyParserConfig,
    disableHealthCheck,
    onHealthCheck
  } = {}) {
    if (!path) path = '/graphql';
    this.ensureStarting();
    const router = express_1.default.Router();
    if (!disableHealthCheck) {
      router.use('/.well-known/apollo/server-health', (req, res) => {
        res.type('application/health+json');
        if (onHealthCheck) {
          onHealthCheck(req).then(() => {
            res.json({
              status: 'pass'
            });
          }).catch(() => {
            res.status(503).json({
              status: 'fail'
            });
          });
        } else {
          res.json({
            status: 'pass'
          });
        }
      });
    }
    let uploadsMiddleware;
    if (this.uploadsConfig && typeof apollo_server_core_1.processFileUploads === 'function') {
      uploadsMiddleware = fileUploadMiddleware(this.uploadsConfig, this);
    }
    this.graphqlPath = path;
    if (cors === true) {
      router.use(path, cors_1.default());
    } else if (cors !== false) {
      router.use(path, cors_1.default(cors));
    }
    if (bodyParserConfig === true) {
      router.use(path, body_parser_1.json());
    } else if (bodyParserConfig !== false) {
      router.use(path, body_parser_1.json(bodyParserConfig));
    }
    if (uploadsMiddleware) {
      router.use(path, uploadsMiddleware);
    }
    router.use(path, (req, res, next) => {
      if (this.playgroundOptions && req.method === 'GET') {
        const accept = accepts_1.default(req);
        const types = accept.types();
        const prefersHTML = types.find(x => x === 'text/html' || x === 'application/json') === 'text/html';
        if (prefersHTML) {
          const playgroundRenderPageOptions = Object.assign({
            endpoint: req.originalUrl,
            subscriptionEndpoint: this.subscriptionsPath
          }, this.playgroundOptions);
          res.setHeader('Content-Type', 'text/html');
          const playground = graphql_playground_html_1.renderPlaygroundPage(playgroundRenderPageOptions);
          res.write(playground);
          res.end();
          return;
        }
      }
      return expressApollo_1.graphqlExpress(() => this.createGraphQLServerOptions(req, res))(req, res, next);
    });
    return router;
  }
}
exports.ApolloServer = ApolloServer;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/dist/expressApollo.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/dist/expressApollo.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.graphqlExpress = void 0;
const apollo_server_core_1 = __webpack_require__(/*! apollo-server-core */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/index.js");
function graphqlExpress(options) {
  if (!options) {
    throw new Error('Apollo Server requires options.');
  }
  if (arguments.length > 1) {
    throw new Error(`Apollo Server expects exactly one argument, got ${arguments.length}`);
  }
  return (req, res, next) => {
    apollo_server_core_1.runHttpQuery([req, res], {
      method: req.method,
      options: options,
      query: req.method === 'POST' ? req.body : req.query,
      request: apollo_server_core_1.convertNodeHttpToRequest(req)
    }).then(({
      graphqlResponse,
      responseInit
    }) => {
      if (responseInit.headers) {
        for (const [name, value] of Object.entries(responseInit.headers)) {
          res.setHeader(name, value);
        }
      }
      if (typeof res.send === 'function') {
        res.send(graphqlResponse);
      } else {
        res.end(graphqlResponse);
      }
    }, error => {
      if ('HttpQueryError' !== error.name) {
        return next(error);
      }
      if (error.headers) {
        for (const [name, value] of Object.entries(error.headers)) {
          res.setHeader(name, value);
        }
      }
      res.statusCode = error.statusCode;
      if (typeof res.send === 'function') {
        res.send(error.message);
      } else {
        res.end(error.message);
      }
    });
  };
}
exports.graphqlExpress = graphqlExpress;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/dist/index.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/dist/index.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var apollo_server_core_1 = __webpack_require__(/*! apollo-server-core */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/index.js");
Object.defineProperty(exports, "GraphQLUpload", {
  enumerable: true,
  get: function () {
    return apollo_server_core_1.GraphQLUpload;
  }
});
Object.defineProperty(exports, "GraphQLExtension", {
  enumerable: true,
  get: function () {
    return apollo_server_core_1.GraphQLExtension;
  }
});
Object.defineProperty(exports, "gql", {
  enumerable: true,
  get: function () {
    return apollo_server_core_1.gql;
  }
});
Object.defineProperty(exports, "ApolloError", {
  enumerable: true,
  get: function () {
    return apollo_server_core_1.ApolloError;
  }
});
Object.defineProperty(exports, "toApolloError", {
  enumerable: true,
  get: function () {
    return apollo_server_core_1.toApolloError;
  }
});
Object.defineProperty(exports, "SyntaxError", {
  enumerable: true,
  get: function () {
    return apollo_server_core_1.SyntaxError;
  }
});
Object.defineProperty(exports, "ValidationError", {
  enumerable: true,
  get: function () {
    return apollo_server_core_1.ValidationError;
  }
});
Object.defineProperty(exports, "AuthenticationError", {
  enumerable: true,
  get: function () {
    return apollo_server_core_1.AuthenticationError;
  }
});
Object.defineProperty(exports, "ForbiddenError", {
  enumerable: true,
  get: function () {
    return apollo_server_core_1.ForbiddenError;
  }
});
Object.defineProperty(exports, "UserInputError", {
  enumerable: true,
  get: function () {
    return apollo_server_core_1.UserInputError;
  }
});
Object.defineProperty(exports, "defaultPlaygroundOptions", {
  enumerable: true,
  get: function () {
    return apollo_server_core_1.defaultPlaygroundOptions;
  }
});
__exportStar(__webpack_require__(/*! graphql-tools */ "./node_modules/graphpack/node_modules/graphql-tools/dist/index.js"), exports);
__exportStar(__webpack_require__(/*! graphql-subscriptions */ "./node_modules/graphpack/node_modules/graphql-subscriptions/dist/index.js"), exports);
var ApolloServer_1 = __webpack_require__(/*! ./ApolloServer */ "./node_modules/graphpack/node_modules/apollo-server-express/dist/ApolloServer.js");
Object.defineProperty(exports, "ApolloServer", {
  enumerable: true,
  get: function () {
    return ApolloServer_1.ApolloServer;
  }
});

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-cache-control/dist/index.js":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-cache-control/dist/index.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__testing__ = exports.plugin = exports.CacheScope = void 0;
const graphql_1 = __webpack_require__(/*! graphql */ "graphql");
var CacheScope;
(function (CacheScope) {
  CacheScope["Public"] = "PUBLIC";
  CacheScope["Private"] = "PRIVATE";
})(CacheScope = exports.CacheScope || (exports.CacheScope = {}));
exports.plugin = (options = Object.create(null)) => ({
  requestDidStart(requestContext) {
    const defaultMaxAge = options.defaultMaxAge || 0;
    const hints = new Map();
    function setOverallCachePolicyWhenUnset() {
      if (!requestContext.overallCachePolicy) {
        requestContext.overallCachePolicy = computeOverallCachePolicy(hints);
      }
    }
    return {
      executionDidStart: () => ({
        executionDidEnd: () => setOverallCachePolicyWhenUnset(),
        willResolveField({
          info
        }) {
          let hint = {};
          const targetType = graphql_1.getNamedType(info.returnType);
          if (targetType instanceof graphql_1.GraphQLObjectType || targetType instanceof graphql_1.GraphQLInterfaceType) {
            if (targetType.astNode) {
              hint = mergeHints(hint, cacheHintFromDirectives(targetType.astNode.directives));
            }
          }
          const fieldDef = info.parentType.getFields()[info.fieldName];
          if (fieldDef.astNode) {
            hint = mergeHints(hint, cacheHintFromDirectives(fieldDef.astNode.directives));
          }
          if ((targetType instanceof graphql_1.GraphQLObjectType || targetType instanceof graphql_1.GraphQLInterfaceType || !info.path.prev) && hint.maxAge === undefined) {
            hint.maxAge = defaultMaxAge;
          }
          if (hint.maxAge !== undefined || hint.scope !== undefined) {
            addHint(hints, info.path, hint);
          }
          info.cacheControl = {
            setCacheHint: hint => {
              addHint(hints, info.path, hint);
            },
            cacheHint: hint
          };
        }
      }),
      responseForOperation() {
        setOverallCachePolicyWhenUnset();
        return null;
      },
      willSendResponse(requestContext) {
        const {
          response,
          overallCachePolicy: overallCachePolicyOverride
        } = requestContext;
        if (response.errors) {
          return;
        }
        const overallCachePolicy = overallCachePolicyOverride || (requestContext.overallCachePolicy = computeOverallCachePolicy(hints));
        if (overallCachePolicy && options.calculateHttpHeaders && response.http) {
          response.http.headers.set('Cache-Control', `max-age=${overallCachePolicy.maxAge}, ${overallCachePolicy.scope.toLowerCase()}`);
        }
        if (options.stripFormattedExtensions !== false) return;
        const extensions = response.extensions || (response.extensions = Object.create(null));
        if (typeof extensions.cacheControl !== 'undefined') {
          throw new Error("The cacheControl information already existed.");
        }
        extensions.cacheControl = {
          version: 1,
          hints: Array.from(hints).map(([path, hint]) => Object.assign({
            path: [...graphql_1.responsePathAsArray(path)]
          }, hint))
        };
      }
    };
  }
});
function cacheHintFromDirectives(directives) {
  if (!directives) return undefined;
  const cacheControlDirective = directives.find(directive => directive.name.value === 'cacheControl');
  if (!cacheControlDirective) return undefined;
  if (!cacheControlDirective.arguments) return undefined;
  const maxAgeArgument = cacheControlDirective.arguments.find(argument => argument.name.value === 'maxAge');
  const scopeArgument = cacheControlDirective.arguments.find(argument => argument.name.value === 'scope');
  return {
    maxAge: maxAgeArgument && maxAgeArgument.value && maxAgeArgument.value.kind === 'IntValue' ? parseInt(maxAgeArgument.value.value) : undefined,
    scope: scopeArgument && scopeArgument.value && scopeArgument.value.kind === 'EnumValue' ? scopeArgument.value.value : undefined
  };
}
function mergeHints(hint, otherHint) {
  if (!otherHint) return hint;
  return {
    maxAge: otherHint.maxAge !== undefined ? otherHint.maxAge : hint.maxAge,
    scope: otherHint.scope || hint.scope
  };
}
function computeOverallCachePolicy(hints) {
  let lowestMaxAge = undefined;
  let scope = CacheScope.Public;
  for (const hint of hints.values()) {
    if (hint.maxAge !== undefined) {
      lowestMaxAge = lowestMaxAge !== undefined ? Math.min(lowestMaxAge, hint.maxAge) : hint.maxAge;
    }
    if (hint.scope === CacheScope.Private) {
      scope = CacheScope.Private;
    }
  }
  return lowestMaxAge ? {
    maxAge: lowestMaxAge,
    scope
  } : undefined;
}
function addHint(hints, path, hint) {
  const existingCacheHint = hints.get(path);
  if (existingCacheHint) {
    hints.set(path, mergeHints(existingCacheHint, hint));
  } else {
    hints.set(path, hint);
  }
}
exports.__testing__ = {
  addHint,
  computeOverallCachePolicy
};

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/ApolloServer.js":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/ApolloServer.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApolloServerBase = void 0;
const graphql_tools_1 = __webpack_require__(/*! graphql-tools */ "./node_modules/graphpack/node_modules/graphql-tools/dist/index.js");
const net_1 = __webpack_require__(/*! net */ "net");
const tls_1 = __webpack_require__(/*! tls */ "tls");
const loglevel_1 = __importDefault(__webpack_require__(/*! loglevel */ "loglevel"));
const graphql_1 = __webpack_require__(/*! graphql */ "graphql");
const resolvable_1 = __importDefault(__webpack_require__(/*! @josephg/resolvable */ "@josephg/resolvable"));
const apollo_server_caching_1 = __webpack_require__(/*! apollo-server-caching */ "apollo-server-caching");
const runtimeSupportsUploads_1 = __importDefault(__webpack_require__(/*! ./utils/runtimeSupportsUploads */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/utils/runtimeSupportsUploads.js"));
const apollo_server_errors_1 = __webpack_require__(/*! apollo-server-errors */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-errors/dist/index.js");
const index_1 = __webpack_require__(/*! ./index */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/index.js");
const playground_1 = __webpack_require__(/*! ./playground */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/playground.js");
const schemaHash_1 = __webpack_require__(/*! ./utils/schemaHash */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/utils/schemaHash.js");
const isDirectiveDefined_1 = __webpack_require__(/*! ./utils/isDirectiveDefined */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/utils/isDirectiveDefined.js");
const requestPipeline_1 = __webpack_require__(/*! ./requestPipeline */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/requestPipeline.js");
const apollo_server_env_1 = __webpack_require__(/*! apollo-server-env */ "apollo-server-env");
const apollo_tools_1 = __webpack_require__(/*! @apollographql/apollo-tools */ "@apollographql/apollo-tools");
const apollo_tracing_1 = __webpack_require__(/*! apollo-tracing */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-tracing/dist/index.js");
const apollo_cache_control_1 = __webpack_require__(/*! apollo-cache-control */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-cache-control/dist/index.js");
const runHttpQuery_1 = __webpack_require__(/*! ./runHttpQuery */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/runHttpQuery.js");
const isNodeLike_1 = __importDefault(__webpack_require__(/*! ./utils/isNodeLike */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/utils/isNodeLike.js"));
const determineApolloConfig_1 = __webpack_require__(/*! ./determineApolloConfig */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/determineApolloConfig.js");
const plugin_1 = __webpack_require__(/*! ./plugin */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/index.js");
const internalPlugin_1 = __webpack_require__(/*! ./plugin/internalPlugin */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/internalPlugin.js");
const NoIntrospection = context => ({
  Field(node) {
    if (node.name.value === '__schema' || node.name.value === '__type') {
      context.reportError(new graphql_1.GraphQLError('GraphQL introspection is not allowed by Apollo Server, but the query contained __schema or __type. To enable introspection, pass introspection: true to ApolloServer in production', [node]));
    }
  }
});
const forbidUploadsForTesting = process && "development" === 'test' && !runtimeSupportsUploads_1.default;
function approximateObjectSize(obj) {
  return Buffer.byteLength(JSON.stringify(obj), 'utf8');
}
class UnreachableCaseError extends Error {
  constructor(val) {
    super(`Unreachable case: ${val}`);
  }
}
class ApolloServerBase {
  constructor(config) {
    this.graphqlPath = '/graphql';
    this.requestOptions = Object.create(null);
    this.plugins = [];
    this.toDispose = new Set();
    this.toDisposeLast = new Set();
    if (!config) throw new Error('ApolloServer requires options.');
    this.config = config;
    const {
        context,
        resolvers,
        schema,
        schemaDirectives,
        modules,
        typeDefs,
        parseOptions = {},
        introspection,
        mocks,
        mockEntireSchema,
        extensions,
        subscriptions,
        uploads,
        playground,
        plugins,
        gateway,
        cacheControl,
        experimental_approximateDocumentStoreMiB,
        stopOnTerminationSignals,
        apollo,
        engine
      } = config,
      requestOptions = __rest(config, ["context", "resolvers", "schema", "schemaDirectives", "modules", "typeDefs", "parseOptions", "introspection", "mocks", "mockEntireSchema", "extensions", "subscriptions", "uploads", "playground", "plugins", "gateway", "cacheControl", "experimental_approximateDocumentStoreMiB", "stopOnTerminationSignals", "apollo", "engine"]);
    if (engine !== undefined && apollo) {
      throw new Error('You cannot provide both `engine` and `apollo` to `new ApolloServer()`. ' + 'For details on how to migrate all of your options out of `engine`, see ' + 'https://go.apollo.dev/s/migration-engine-plugins');
    }
    if (config.logger) {
      this.logger = config.logger;
    } else {
      const loglevelLogger = loglevel_1.default.getLogger('apollo-server');
      if (this.config.debug === true) {
        loglevelLogger.setLevel(loglevel_1.default.levels.DEBUG);
      } else {
        loglevelLogger.setLevel(loglevel_1.default.levels.INFO);
      }
      this.logger = loglevelLogger;
    }
    this.apolloConfig = determineApolloConfig_1.determineApolloConfig(apollo, engine, this.logger);
    if (gateway && (modules || schema || typeDefs || resolvers)) {
      throw new Error('Cannot define both `gateway` and any of: `modules`, `schema`, `typeDefs`, or `resolvers`');
    }
    this.parseOptions = parseOptions;
    this.context = context;
    const isDev = "development" !== 'production';
    if (typeof introspection === 'boolean' && !introspection || introspection === undefined && !isDev) {
      const noIntro = [NoIntrospection];
      requestOptions.validationRules = requestOptions.validationRules ? requestOptions.validationRules.concat(noIntro) : noIntro;
    }
    if (!requestOptions.cache) {
      requestOptions.cache = new apollo_server_caching_1.InMemoryLRUCache();
    }
    if (requestOptions.persistedQueries !== false) {
      const _a = requestOptions.persistedQueries || Object.create(null),
        {
          cache: apqCache = requestOptions.cache
        } = _a,
        apqOtherOptions = __rest(_a, ["cache"]);
      requestOptions.persistedQueries = Object.assign({
        cache: new apollo_server_caching_1.PrefixingKeyValueCache(apqCache, requestPipeline_1.APQ_CACHE_PREFIX)
      }, apqOtherOptions);
    } else {
      delete requestOptions.persistedQueries;
    }
    this.requestOptions = requestOptions;
    this.disableUploadsIfSchemaDoesNotUseUploadScalar = false;
    if (uploads !== false && !forbidUploadsForTesting) {
      if (this.supportsUploads()) {
        if (!runtimeSupportsUploads_1.default) {
          printNodeFileUploadsMessage(this.logger);
          throw new Error('`graphql-upload` is no longer supported on Node.js < v8.5.0.  ' + 'See https://bit.ly/gql-upload-node-6.');
        }
        if (uploads === true) {
          this.uploadsConfig = {};
          warnAboutUploads(this.logger, false);
        } else if (typeof uploads === 'undefined') {
          this.uploadsConfig = {};
          this.disableUploadsIfSchemaDoesNotUseUploadScalar = true;
        } else {
          this.uploadsConfig = uploads;
          warnAboutUploads(this.logger, false);
        }
      } else if (uploads) {
        throw new Error('This implementation of ApolloServer does not support file uploads because the environment cannot accept multi-part forms');
      }
    }
    if (gateway && subscriptions !== false) {
      throw new Error(['Subscriptions are not yet compatible with the gateway.', "Set `subscriptions: false` in Apollo Server's constructor to", 'explicitly disable subscriptions (which are on by default)', 'and allow for gateway functionality.'].join(' '));
    } else if (subscriptions !== false) {
      if (this.supportsSubscriptions()) {
        if (subscriptions === true || typeof subscriptions === 'undefined') {
          this.subscriptionServerOptions = {
            path: this.graphqlPath
          };
        } else if (typeof subscriptions === 'string') {
          this.subscriptionServerOptions = {
            path: subscriptions
          };
        } else {
          this.subscriptionServerOptions = Object.assign({
            path: this.graphqlPath
          }, subscriptions);
        }
        this.subscriptionsPath = this.subscriptionServerOptions.path;
      } else if (subscriptions) {
        throw new Error('This implementation of ApolloServer does not support GraphQL subscriptions.');
      }
    }
    this.playgroundOptions = playground_1.createPlaygroundOptions(playground);
    this.ensurePluginInstantiation(plugins);
    if (typeof stopOnTerminationSignals === 'boolean' ? stopOnTerminationSignals : typeof engine === 'object' && typeof engine.handleSignals === 'boolean' ? engine.handleSignals : isNodeLike_1.default && "development" !== 'test') {
      const signals = ['SIGINT', 'SIGTERM'];
      let receivedSignal = false;
      signals.forEach(signal => {
        const handler = () => __awaiter(this, void 0, void 0, function* () {
          if (receivedSignal) {
            return;
          }
          receivedSignal = true;
          try {
            yield this.stop();
          } catch (e) {
            this.logger.error(`stop() threw during ${signal} shutdown`);
            this.logger.error(e);
            process.exit(1);
          }
          process.kill(process.pid, signal);
        });
        process.on(signal, handler);
        this.toDisposeLast.add(() => __awaiter(this, void 0, void 0, function* () {
          process.removeListener(signal, handler);
        }));
      });
    }
    if (gateway) {
      this.state = {
        phase: 'initialized with gateway',
        gateway
      };
      this.requestOptions.executor = gateway.executor;
    } else {
      this.state = {
        phase: 'initialized with schema',
        schemaDerivedData: this.generateSchemaDerivedData(this.constructSchema())
      };
      this.schema = this.state.schemaDerivedData.schema;
    }
    if (this.serverlessFramework()) {
      this.ensureStarting();
    }
  }
  setGraphQLPath(path) {
    this.graphqlPath = path;
  }
  start() {
    return __awaiter(this, void 0, void 0, function* () {
      if (this.serverlessFramework()) {
        throw new Error('When using an ApolloServer subclass from a serverless framework ' + "package, you don't need to call start(); just call createHandler().");
      }
      return yield this._start();
    });
  }
  _start() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
      const initialState = this.state;
      if (initialState.phase !== 'initialized with gateway' && initialState.phase !== 'initialized with schema') {
        throw new Error(`called start() with surprising state ${initialState.phase}`);
      }
      const barrier = resolvable_1.default();
      this.state = {
        phase: 'starting',
        barrier
      };
      let loadedSchema = false;
      try {
        const schemaDerivedData = initialState.phase === 'initialized with schema' ? initialState.schemaDerivedData : this.generateSchemaDerivedData(yield this.startGatewayAndLoadSchema(initialState.gateway));
        loadedSchema = true;
        this.state = {
          phase: 'invoking serverWillStart',
          barrier,
          schemaDerivedData
        };
        const service = {
          logger: this.logger,
          schema: schemaDerivedData.schema,
          schemaHash: schemaDerivedData.schemaHash,
          apollo: this.apolloConfig,
          serverlessFramework: this.serverlessFramework(),
          engine: {
            serviceID: this.apolloConfig.graphId,
            apiKeyHash: this.apolloConfig.keyHash
          }
        };
        if ((_a = this.requestOptions.persistedQueries) === null || _a === void 0 ? void 0 : _a.cache) {
          service.persistedQueries = {
            cache: this.requestOptions.persistedQueries.cache
          };
        }
        const serverListeners = (yield Promise.all(this.plugins.map(plugin => plugin.serverWillStart && plugin.serverWillStart(service)))).filter(maybeServerListener => typeof maybeServerListener === 'object' && !!maybeServerListener.serverWillStop);
        this.toDispose.add(() => __awaiter(this, void 0, void 0, function* () {
          yield Promise.all(serverListeners.map(({
            serverWillStop
          }) => serverWillStop === null || serverWillStop === void 0 ? void 0 : serverWillStop()));
        }));
        this.state = {
          phase: 'started',
          schemaDerivedData
        };
      } catch (error) {
        this.state = {
          phase: 'failed to start',
          error,
          loadedSchema
        };
        throw error;
      } finally {
        barrier.resolve();
      }
    });
  }
  willStart() {
    return __awaiter(this, void 0, void 0, function* () {
      this.ensureStarting();
    });
  }
  ensureStarted() {
    return __awaiter(this, void 0, void 0, function* () {
      while (true) {
        switch (this.state.phase) {
          case 'initialized with gateway':
          case 'initialized with schema':
            try {
              yield this._start();
            } catch (_a) {}
            break;
          case 'starting':
          case 'invoking serverWillStart':
            yield this.state.barrier;
            break;
          case 'failed to start':
            this.logStartupError(this.state.error);
            throw new Error('This data graph is missing a valid configuration. More details may be available in the server logs.');
          case 'started':
            return this.state.schemaDerivedData;
          case 'stopping':
            throw new Error('Cannot execute GraphQL operations while the server is stopping.');
          case 'stopped':
            throw new Error('Cannot execute GraphQL operations after the server has stopped.');
          default:
            throw new UnreachableCaseError(this.state);
        }
      }
    });
  }
  ensureStarting() {
    if (this.state.phase === 'initialized with gateway' || this.state.phase === 'initialized with schema') {
      this._start().catch(e => this.logStartupError(e));
    }
  }
  logStartupError(err) {
    const prelude = this.serverlessFramework() ? 'An error occurred during Apollo Server startup.' : 'Apollo Server was started implicitly and an error occurred during startup. ' + '(Consider calling `await server.start()` immediately after ' + '`server = new ApolloServer()` so you can handle these errors directly before ' + 'starting your web server.)';
    this.logger.error(prelude + ' All GraphQL requests will now fail. The startup error ' + 'was: ' + (err && err.message || err));
  }
  startGatewayAndLoadSchema(gateway) {
    return __awaiter(this, void 0, void 0, function* () {
      const unsubscriber = gateway.onSchemaChange(schema => {
        if (this.state.phase === 'started') {
          this.state.schemaDerivedData = this.generateSchemaDerivedData(schema);
        }
      });
      this.toDispose.add(() => __awaiter(this, void 0, void 0, function* () {
        return unsubscriber();
      }));
      const engineConfig = this.apolloConfig.keyHash && this.apolloConfig.graphId ? {
        apiKeyHash: this.apolloConfig.keyHash,
        graphId: this.apolloConfig.graphId,
        graphVariant: this.apolloConfig.graphVariant
      } : undefined;
      const config = yield gateway.load({
        apollo: this.apolloConfig,
        engine: engineConfig
      });
      this.toDispose.add(() => __awaiter(this, void 0, void 0, function* () {
        var _a;
        return yield (_a = gateway.stop) === null || _a === void 0 ? void 0 : _a.call(gateway);
      }));
      return config.schema;
    });
  }
  constructSchema() {
    const {
      schema,
      modules,
      typeDefs,
      resolvers,
      schemaDirectives,
      parseOptions
    } = this.config;
    if (schema) {
      return schema;
    }
    if (modules) {
      const {
        schema,
        errors
      } = apollo_tools_1.buildServiceDefinition(modules);
      if (errors && errors.length > 0) {
        throw new Error(errors.map(error => error.message).join('\n\n'));
      }
      return schema;
    }
    if (!typeDefs) {
      throw Error('Apollo Server requires either an existing schema, modules or typeDefs');
    }
    const augmentedTypeDefs = Array.isArray(typeDefs) ? typeDefs : [typeDefs];
    if (!isDirectiveDefined_1.isDirectiveDefined(augmentedTypeDefs, 'cacheControl')) {
      augmentedTypeDefs.push(index_1.gql`
          enum CacheControlScope {
            PUBLIC
            PRIVATE
          }

          directive @cacheControl(
            maxAge: Int
            scope: CacheControlScope
          ) on FIELD_DEFINITION | OBJECT | INTERFACE
        `);
    }
    if (this.uploadsConfig) {
      const {
        GraphQLUpload
      } = __webpack_require__(/*! @apollographql/graphql-upload-8-fork */ "./node_modules/graphpack/node_modules/@apollographql/graphql-upload-8-fork/lib/index.js");
      if (Array.isArray(resolvers)) {
        if (resolvers.every(resolver => !resolver.Upload)) {
          resolvers.push({
            Upload: GraphQLUpload
          });
        }
      } else {
        if (resolvers && !resolvers.Upload) {
          resolvers.Upload = GraphQLUpload;
        }
      }
      augmentedTypeDefs.push(index_1.gql`
          scalar Upload
        `);
    }
    return graphql_tools_1.makeExecutableSchema({
      typeDefs: augmentedTypeDefs,
      schemaDirectives,
      resolvers,
      parseOptions
    });
  }
  generateSchemaDerivedData(schema) {
    const schemaHash = schemaHash_1.generateSchemaHash(schema);
    const {
      mocks,
      mockEntireSchema,
      extensions: _extensions
    } = this.config;
    if (mocks || typeof mockEntireSchema !== 'undefined' && mocks !== false) {
      graphql_tools_1.addMockFunctionsToSchema({
        schema,
        mocks: typeof mocks === 'boolean' || typeof mocks === 'undefined' ? {} : mocks,
        preserveResolvers: typeof mockEntireSchema === 'undefined' ? false : !mockEntireSchema
      });
    }
    const extensions = [];
    extensions.push(...(_extensions || []));
    const documentStore = this.initializeDocumentStore();
    let disableUploads = false;
    if (this.disableUploadsIfSchemaDoesNotUseUploadScalar) {
      const ast = graphql_1.parse(graphql_1.printSchema(schema));
      disableUploads = true;
      graphql_1.visit(ast, {
        NamedType(node) {
          if (node.name.value === 'Upload') {
            disableUploads = false;
          }
        }
      });
      if (!disableUploads) {
        warnAboutUploads(this.logger, true);
      }
    }
    return {
      schema,
      schemaHash,
      extensions,
      documentStore,
      disableUploads
    };
  }
  disableUploads() {
    return this.state.phase !== 'started' || this.state.schemaDerivedData.disableUploads;
  }
  stop() {
    return __awaiter(this, void 0, void 0, function* () {
      if (this.state.phase === 'stopped') {
        if (this.state.stopError) {
          throw this.state.stopError;
        }
        return;
      }
      if (this.state.phase === 'stopping') {
        yield this.state.barrier;
        const state = this.state;
        if (state.phase !== 'stopped') {
          throw Error(`Surprising post-stopping state ${state.phase}`);
        }
        if (state.stopError) {
          throw state.stopError;
        }
        return;
      }
      this.state = {
        phase: 'stopping',
        barrier: resolvable_1.default()
      };
      try {
        yield Promise.all([...this.toDispose].map(dispose => dispose()));
        if (this.subscriptionServer) this.subscriptionServer.close();
        yield Promise.all([...this.toDisposeLast].map(dispose => dispose()));
      } catch (stopError) {
        this.state = {
          phase: 'stopped',
          stopError
        };
        return;
      }
      this.state = {
        phase: 'stopped',
        stopError: null
      };
    });
  }
  installSubscriptionHandlers(server) {
    if (!this.subscriptionServerOptions) {
      if (this.config.gateway) {
        throw Error('Subscriptions are not supported when operating as a gateway');
      }
      if (this.supportsSubscriptions()) {
        throw Error('Subscriptions are disabled, due to subscriptions set to false in the ApolloServer constructor');
      } else {
        throw Error('Subscriptions are not supported, choose an integration, such as apollo-server-express that allows persistent connections');
      }
    }
    const {
      SubscriptionServer
    } = __webpack_require__(/*! subscriptions-transport-ws */ "subscriptions-transport-ws");
    const {
      onDisconnect,
      onConnect,
      keepAlive,
      path
    } = this.subscriptionServerOptions;
    let schema;
    switch (this.state.phase) {
      case 'initialized with schema':
      case 'invoking serverWillStart':
      case 'started':
        schema = this.state.schemaDerivedData.schema;
        break;
      case 'initialized with gateway':
      case 'starting':
      case 'failed to start':
      case 'stopping':
      case 'stopped':
        throw new Error(`Can't install subscription handlers when state is ${this.state.phase}`);
      default:
        throw new UnreachableCaseError(this.state);
    }
    this.subscriptionServer = SubscriptionServer.create({
      schema,
      execute: graphql_1.execute,
      subscribe: graphql_1.subscribe,
      onConnect: onConnect ? onConnect : connectionParams => Object.assign({}, connectionParams),
      onDisconnect: onDisconnect,
      onOperation: (message, connection) => __awaiter(this, void 0, void 0, function* () {
        connection.formatResponse = value => Object.assign(Object.assign({}, value), {
          errors: value.errors && apollo_server_errors_1.formatApolloErrors([...value.errors], {
            formatter: this.requestOptions.formatError,
            debug: this.requestOptions.debug
          })
        });
        connection.formatError = this.requestOptions.formatError;
        let context = this.context ? this.context : {
          connection
        };
        try {
          context = typeof this.context === 'function' ? yield this.context({
            connection,
            payload: message.payload
          }) : context;
        } catch (e) {
          throw apollo_server_errors_1.formatApolloErrors([e], {
            formatter: this.requestOptions.formatError,
            debug: this.requestOptions.debug
          })[0];
        }
        return Object.assign(Object.assign({}, connection), {
          context
        });
      }),
      keepAlive,
      validationRules: this.requestOptions.validationRules
    }, server instanceof net_1.Server || server instanceof tls_1.Server ? {
      server,
      path
    } : server);
  }
  supportsSubscriptions() {
    return false;
  }
  supportsUploads() {
    return false;
  }
  serverlessFramework() {
    return false;
  }
  ensurePluginInstantiation(plugins = []) {
    var _a, _b;
    const pluginsToInit = [];
    if (this.config.tracing) {
      pluginsToInit.push(apollo_tracing_1.plugin());
    }
    if (this.config.cacheControl !== false) {
      let cacheControlOptions = {};
      if (typeof this.config.cacheControl === 'boolean' && this.config.cacheControl === true) {
        cacheControlOptions = {
          stripFormattedExtensions: false,
          calculateHttpHeaders: false,
          defaultMaxAge: 0
        };
      } else {
        cacheControlOptions = Object.assign({
          stripFormattedExtensions: true,
          calculateHttpHeaders: true,
          defaultMaxAge: 0
        }, this.config.cacheControl);
      }
      pluginsToInit.push(apollo_cache_control_1.plugin(cacheControlOptions));
    }
    pluginsToInit.push(...plugins);
    this.plugins = pluginsToInit.map(plugin => {
      if (typeof plugin === 'function') {
        return plugin();
      }
      return plugin;
    });
    const alreadyHavePluginWithInternalId = id => this.plugins.some(p => internalPlugin_1.pluginIsInternal(p) && p.__internal_plugin_id__() === id);
    {
      const alreadyHavePlugin = alreadyHavePluginWithInternalId('UsageReporting');
      const {
        engine
      } = this.config;
      const disabledViaLegacyOption = engine === false || typeof engine === 'object' && engine.reportTiming === false;
      if (alreadyHavePlugin) {
        if (engine !== undefined) {
          throw Error("You can't combine the legacy `new ApolloServer({engine})` option with directly " + 'creating an ApolloServerPluginUsageReporting plugin. See ' + 'https://go.apollo.dev/s/migration-engine-plugins');
        }
      } else if (this.apolloConfig.key && !disabledViaLegacyOption) {
        this.plugins.unshift(typeof engine === 'object' ? plugin_1.ApolloServerPluginUsageReportingFromLegacyOptions(engine) : plugin_1.ApolloServerPluginUsageReporting());
      }
    }
    {
      const alreadyHavePlugin = alreadyHavePluginWithInternalId('SchemaReporting');
      const enabledViaEnvVar = process.env.APOLLO_SCHEMA_REPORTING === 'true';
      const {
        engine
      } = this.config;
      const enabledViaLegacyOption = typeof engine === 'object' && (engine.reportSchema || engine.experimental_schemaReporting);
      if (alreadyHavePlugin || enabledViaEnvVar || enabledViaLegacyOption) {
        if (this.config.gateway) {
          throw new Error(["Schema reporting is not yet compatible with the gateway. If you're", 'interested in using schema reporting with the gateway, please', 'contact Apollo support. To set up managed federation, see', 'https://go.apollo.dev/s/managed-federation'].join(' '));
        }
      }
      if (alreadyHavePlugin) {
        if (engine !== undefined) {
          throw Error("You can't combine the legacy `new ApolloServer({engine})` option with directly " + 'creating an ApolloServerPluginSchemaReporting plugin. See ' + 'https://go.apollo.dev/s/migration-engine-plugins');
        }
      } else if (!this.apolloConfig.key) {
        if (enabledViaEnvVar) {
          throw new Error("You've enabled schema reporting by setting the APOLLO_SCHEMA_REPORTING " + 'environment variable to true, but you also need to provide your ' + 'Apollo API key, via the APOLLO_KEY environment ' + 'variable or via `new ApolloServer({apollo: {key})');
        }
        if (enabledViaLegacyOption) {
          throw new Error("You've enabled schema reporting in the `engine` argument to `new ApolloServer()`, " + 'but you also need to provide your Apollo API key, via the APOLLO_KEY environment ' + 'variable or via `new ApolloServer({apollo: {key})');
        }
      } else if (enabledViaEnvVar || enabledViaLegacyOption) {
        const options = {};
        if (typeof engine === 'object') {
          options.initialDelayMaxMs = (_a = engine.schemaReportingInitialDelayMaxMs) !== null && _a !== void 0 ? _a : engine.experimental_schemaReportingInitialDelayMaxMs;
          options.overrideReportedSchema = (_b = engine.overrideReportedSchema) !== null && _b !== void 0 ? _b : engine.experimental_overrideReportedSchema;
          options.endpointUrl = engine.schemaReportingUrl;
        }
        this.plugins.push(plugin_1.ApolloServerPluginSchemaReporting(options));
      }
    }
    {
      const alreadyHavePlugin = alreadyHavePluginWithInternalId('InlineTrace');
      const {
        engine
      } = this.config;
      if (alreadyHavePlugin) {
        if (engine !== undefined) {
          throw Error("You can't combine the legacy `new ApolloServer({engine})` option with directly " + 'creating an ApolloServerPluginInlineTrace plugin. See ' + 'https://go.apollo.dev/s/migration-engine-plugins');
        }
      } else if (this.config.engine !== false) {
        const options = {
          __onlyIfSchemaIsFederated: true
        };
        if (typeof engine === 'object') {
          options.rewriteError = engine.rewriteError;
        }
        this.plugins.push(plugin_1.ApolloServerPluginInlineTrace(options));
      }
    }
  }
  initializeDocumentStore() {
    return new apollo_server_caching_1.InMemoryLRUCache({
      maxSize: Math.pow(2, 20) * (this.experimental_approximateDocumentStoreMiB || 30),
      sizeCalculator: approximateObjectSize
    });
  }
  graphQLServerOptions(integrationContextArgument) {
    return __awaiter(this, void 0, void 0, function* () {
      const {
        schema,
        schemaHash,
        documentStore,
        extensions
      } = yield this.ensureStarted();
      let context = this.context ? this.context : {};
      try {
        context = typeof this.context === 'function' ? yield this.context(integrationContextArgument || {}) : context;
      } catch (error) {
        context = () => {
          throw error;
        };
      }
      return Object.assign({
        schema,
        schemaHash,
        logger: this.logger,
        plugins: this.plugins,
        documentStore,
        extensions,
        context,
        persistedQueries: this.requestOptions.persistedQueries,
        fieldResolver: this.requestOptions.fieldResolver,
        parseOptions: this.parseOptions
      }, this.requestOptions);
    });
  }
  executeOperation(request, integrationContextArgument) {
    return __awaiter(this, void 0, void 0, function* () {
      const options = yield this.graphQLServerOptions(integrationContextArgument);
      if (typeof options.context === 'function') {
        options.context = options.context();
      } else if (typeof options.context === 'object') {
        options.context = runHttpQuery_1.cloneObject(options.context);
      }
      const requestCtx = {
        logger: this.logger,
        schema: options.schema,
        schemaHash: options.schemaHash,
        request: Object.assign(Object.assign({}, request), {
          query: request.query && typeof request.query !== 'string' ? graphql_1.print(request.query) : request.query
        }),
        context: options.context || Object.create(null),
        cache: options.cache,
        metrics: {},
        response: {
          http: {
            headers: new apollo_server_env_1.Headers()
          }
        },
        debug: options.debug
      };
      return requestPipeline_1.processGraphQLRequest(options, requestCtx);
    });
  }
}
exports.ApolloServerBase = ApolloServerBase;
function printNodeFileUploadsMessage(logger) {
  logger.error(['*****************************************************************', '*                                                               *', '* ERROR! Manual intervention is necessary for Node.js < v8.5.0! *', '*                                                               *', '*****************************************************************', '', 'The third-party `graphql-upload` package, which is used to implement', 'file uploads in Apollo Server 2.x, no longer supports Node.js LTS', 'versions prior to Node.js v8.5.0.', '', 'Deployments which NEED file upload capabilities should update to', 'Node.js >= v8.5.0 to continue using uploads.', '', 'If this server DOES NOT NEED file uploads and wishes to continue', 'using this version of Node.js, uploads can be disabled by adding:', '', '  uploads: false,', '', '...to the options for Apollo Server and re-deploying the server.', '', 'For more information, see https://bit.ly/gql-upload-node-6.', ''].join('\n'));
}
function warnAboutUploads(logger, implicit) {
  logger.error(['The third-party `graphql-upload` package is enabled in your server', implicit ? 'because you use the `Upload` scalar in your schema.' : 'because you explicitly enabled it with the `uploads` option.', 'This package is vulnerable to Cross-Site Request Forgery (CSRF) attacks.', 'We recommend you either disable uploads if it is not a necessary part of', 'your server, or upgrade to Apollo Server 3.7 and enable CSRF prevention.', 'See https://go.apollo.dev/s/graphql-upload-csrf for more details.'].join('\n'));
}

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/determineApolloConfig.js":
/*!*********************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/determineApolloConfig.js ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.determineApolloConfig = void 0;
const createSHA_1 = __importDefault(__webpack_require__(/*! ./utils/createSHA */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/utils/createSHA.js"));
function determineApolloConfig(input, engine, logger) {
  if (input && engine !== undefined) {
    throw Error('Cannot pass both `apollo` and `engine`');
  }
  const apolloConfig = {};
  const {
    APOLLO_KEY,
    APOLLO_GRAPH_REF,
    APOLLO_GRAPH_ID,
    APOLLO_GRAPH_VARIANT,
    ENGINE_API_KEY,
    ENGINE_SCHEMA_TAG
  } = process.env;
  if (input === null || input === void 0 ? void 0 : input.key) {
    apolloConfig.key = input.key;
  } else if (typeof engine === 'object' && engine.apiKey) {
    apolloConfig.key = engine.apiKey;
  } else if (APOLLO_KEY) {
    if (ENGINE_API_KEY) {
      logger.warn('Using `APOLLO_KEY` since `ENGINE_API_KEY` (deprecated) is also set in the environment.');
    }
    apolloConfig.key = APOLLO_KEY;
  } else if (ENGINE_API_KEY) {
    logger.warn('[deprecated] The `ENGINE_API_KEY` environment variable has been renamed to `APOLLO_KEY`.');
    apolloConfig.key = ENGINE_API_KEY;
  }
  if (apolloConfig.key) {
    apolloConfig.keyHash = createSHA_1.default('sha512').update(apolloConfig.key).digest('hex');
  }
  if (input === null || input === void 0 ? void 0 : input.graphRef) {
    apolloConfig.graphRef = input.graphRef;
  } else if (APOLLO_GRAPH_REF) {
    apolloConfig.graphRef = APOLLO_GRAPH_REF;
  }
  if (input === null || input === void 0 ? void 0 : input.graphId) {
    apolloConfig.graphId = input.graphId;
  } else if (APOLLO_GRAPH_ID) {
    apolloConfig.graphId = APOLLO_GRAPH_ID;
  }
  if (input === null || input === void 0 ? void 0 : input.graphVariant) {
    apolloConfig.graphVariant = input.graphVariant;
  } else if (typeof engine === 'object' && engine.graphVariant) {
    if (engine.schemaTag) {
      throw new Error('Cannot set more than one of apollo.graphVariant, ' + 'engine.graphVariant, and engine.schemaTag. Please use apollo.graphVariant.');
    }
    apolloConfig.graphVariant = engine.graphVariant;
  } else if (typeof engine === 'object' && engine.schemaTag) {
    logger.warn('[deprecated] The `engine.schemaTag` option has been renamed to `apollo.graphVariant` ' + '(or you may set it with the `APOLLO_GRAPH_VARIANT` environment variable).');
    apolloConfig.graphVariant = engine.schemaTag;
  } else if (APOLLO_GRAPH_VARIANT) {
    if (ENGINE_SCHEMA_TAG) {
      throw new Error('`APOLLO_GRAPH_VARIANT` and `ENGINE_SCHEMA_TAG` (deprecated) environment variables must not both be set.');
    }
    apolloConfig.graphVariant = APOLLO_GRAPH_VARIANT;
  } else if (ENGINE_SCHEMA_TAG) {
    logger.warn('[deprecated] The `ENGINE_SCHEMA_TAG` environment variable has been renamed to `APOLLO_GRAPH_VARIANT`.');
    apolloConfig.graphVariant = ENGINE_SCHEMA_TAG;
  }
  if (apolloConfig.graphRef) {
    if (apolloConfig.graphId) {
      throw new Error('Cannot specify both graph ref and graph ID. Please use ' + '`apollo.graphRef` or `APOLLO_GRAPH_REF` without also setting the graph ID.');
    }
    if (apolloConfig.graphVariant) {
      throw new Error('Cannot specify both graph ref and graph variant. Please use ' + '`apollo.graphRef` or `APOLLO_GRAPH_REF` without also setting the graph ID.');
    }
    const at = apolloConfig.graphRef.indexOf('@');
    if (at === -1) {
      apolloConfig.graphId = apolloConfig.graphRef;
      apolloConfig.graphVariant = 'current';
    } else {
      apolloConfig.graphId = apolloConfig.graphRef.substring(0, at);
      apolloConfig.graphVariant = apolloConfig.graphRef.substring(at + 1);
    }
  } else {
    if (!apolloConfig.graphId && apolloConfig.key) {
      const parts = apolloConfig.key.split(':', 2);
      if (parts[0] === 'service') {
        apolloConfig.graphId = parts[1];
      } else {
        throw Error('You have specified an API key in `apollo.key` or `APOLLO_KEY`, ' + 'but you have not specified your graph ref or graph ID and the key ' + 'does not start with `service:`. Please specify your graph ref; for ' + 'example, set `APOLLO_GRAPH_REF` to `my-graph-id@my-graph-variant`.');
      }
    }
    if (!apolloConfig.graphVariant) {
      apolloConfig.graphVariant = 'current';
    }
    if (apolloConfig.graphId) {
      apolloConfig.graphRef = `${apolloConfig.graphId}@${apolloConfig.graphVariant}`;
    }
  }
  return apolloConfig;
}
exports.determineApolloConfig = determineApolloConfig;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/graphqlOptions.js":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/graphqlOptions.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveGraphqlOptions = void 0;
function resolveGraphqlOptions(options, ...args) {
  return __awaiter(this, void 0, void 0, function* () {
    if (typeof options === 'function') {
      return yield options(...args);
    } else {
      return options;
    }
  });
}
exports.resolveGraphqlOptions = resolveGraphqlOptions;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/index.js":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/index.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GraphQLUpload = exports.gql = void 0;
__webpack_require__(/*! apollo-server-env */ "apollo-server-env");
var runHttpQuery_1 = __webpack_require__(/*! ./runHttpQuery */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/runHttpQuery.js");
Object.defineProperty(exports, "runHttpQuery", {
  enumerable: true,
  get: function () {
    return runHttpQuery_1.runHttpQuery;
  }
});
Object.defineProperty(exports, "HttpQueryError", {
  enumerable: true,
  get: function () {
    return runHttpQuery_1.HttpQueryError;
  }
});
var graphqlOptions_1 = __webpack_require__(/*! ./graphqlOptions */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/graphqlOptions.js");
Object.defineProperty(exports, "resolveGraphqlOptions", {
  enumerable: true,
  get: function () {
    return graphqlOptions_1.resolveGraphqlOptions;
  }
});
var apollo_server_errors_1 = __webpack_require__(/*! apollo-server-errors */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-errors/dist/index.js");
Object.defineProperty(exports, "ApolloError", {
  enumerable: true,
  get: function () {
    return apollo_server_errors_1.ApolloError;
  }
});
Object.defineProperty(exports, "toApolloError", {
  enumerable: true,
  get: function () {
    return apollo_server_errors_1.toApolloError;
  }
});
Object.defineProperty(exports, "SyntaxError", {
  enumerable: true,
  get: function () {
    return apollo_server_errors_1.SyntaxError;
  }
});
Object.defineProperty(exports, "ValidationError", {
  enumerable: true,
  get: function () {
    return apollo_server_errors_1.ValidationError;
  }
});
Object.defineProperty(exports, "AuthenticationError", {
  enumerable: true,
  get: function () {
    return apollo_server_errors_1.AuthenticationError;
  }
});
Object.defineProperty(exports, "ForbiddenError", {
  enumerable: true,
  get: function () {
    return apollo_server_errors_1.ForbiddenError;
  }
});
Object.defineProperty(exports, "UserInputError", {
  enumerable: true,
  get: function () {
    return apollo_server_errors_1.UserInputError;
  }
});
Object.defineProperty(exports, "formatApolloErrors", {
  enumerable: true,
  get: function () {
    return apollo_server_errors_1.formatApolloErrors;
  }
});
var nodeHttpToRequest_1 = __webpack_require__(/*! ./nodeHttpToRequest */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/nodeHttpToRequest.js");
Object.defineProperty(exports, "convertNodeHttpToRequest", {
  enumerable: true,
  get: function () {
    return nodeHttpToRequest_1.convertNodeHttpToRequest;
  }
});
var playground_1 = __webpack_require__(/*! ./playground */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/playground.js");
Object.defineProperty(exports, "createPlaygroundOptions", {
  enumerable: true,
  get: function () {
    return playground_1.createPlaygroundOptions;
  }
});
Object.defineProperty(exports, "defaultPlaygroundOptions", {
  enumerable: true,
  get: function () {
    return playground_1.defaultPlaygroundOptions;
  }
});
var ApolloServer_1 = __webpack_require__(/*! ./ApolloServer */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/ApolloServer.js");
Object.defineProperty(exports, "ApolloServerBase", {
  enumerable: true,
  get: function () {
    return ApolloServer_1.ApolloServerBase;
  }
});
__exportStar(__webpack_require__(/*! ./types */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/types.js"), exports);
__exportStar(__webpack_require__(/*! ./requestPipelineAPI */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/requestPipelineAPI.js"), exports);
const graphql_tag_1 = __importDefault(__webpack_require__(/*! graphql-tag */ "graphql-tag"));
exports.gql = graphql_tag_1.default;
const runtimeSupportsUploads_1 = __importDefault(__webpack_require__(/*! ./utils/runtimeSupportsUploads */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/utils/runtimeSupportsUploads.js"));
var processFileUploads_1 = __webpack_require__(/*! ./processFileUploads */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/processFileUploads.js");
Object.defineProperty(exports, "processFileUploads", {
  enumerable: true,
  get: function () {
    return processFileUploads_1.default;
  }
});
exports.GraphQLUpload = runtimeSupportsUploads_1.default ? __webpack_require__(/*! @apollographql/graphql-upload-8-fork */ "./node_modules/graphpack/node_modules/@apollographql/graphql-upload-8-fork/lib/index.js").GraphQLUpload : undefined;
__exportStar(__webpack_require__(/*! ./plugin */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/index.js"), exports);

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/nodeHttpToRequest.js":
/*!*****************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/nodeHttpToRequest.js ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertNodeHttpToRequest = void 0;
const apollo_server_env_1 = __webpack_require__(/*! apollo-server-env */ "apollo-server-env");
function convertNodeHttpToRequest(req) {
  const headers = new apollo_server_env_1.Headers();
  Object.keys(req.headers).forEach(key => {
    const values = req.headers[key];
    if (Array.isArray(values)) {
      values.forEach(value => headers.append(key, value));
    } else {
      headers.append(key, values);
    }
  });
  return new apollo_server_env_1.Request(req.url, {
    headers,
    method: req.method
  });
}
exports.convertNodeHttpToRequest = convertNodeHttpToRequest;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/playground.js":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/playground.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPlaygroundOptions = exports.defaultPlaygroundOptions = void 0;
const playgroundVersion = '1.7.42';
exports.defaultPlaygroundOptions = {
  version: playgroundVersion,
  settings: {
    'general.betaUpdates': false,
    'editor.theme': 'dark',
    'editor.cursorShape': 'line',
    'editor.reuseHeaders': true,
    'tracing.hideTracingResponse': true,
    'queryPlan.hideQueryPlanResponse': true,
    'editor.fontSize': 14,
    'editor.fontFamily': `'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace`,
    'request.credentials': 'omit'
  }
};
function createPlaygroundOptions(playground) {
  const isDev = "development" !== 'production';
  const enabled = typeof playground !== 'undefined' ? !!playground : isDev;
  if (!enabled) {
    return undefined;
  }
  const playgroundOverrides = typeof playground === 'boolean' ? {} : playground || {};
  const settingsOverrides = playgroundOverrides.hasOwnProperty('settings') ? {
    settings: Object.assign(Object.assign({}, exports.defaultPlaygroundOptions.settings), playgroundOverrides.settings)
  } : {
    settings: undefined
  };
  const playgroundOptions = Object.assign(Object.assign(Object.assign({}, exports.defaultPlaygroundOptions), playgroundOverrides), settingsOverrides);
  return playgroundOptions;
}
exports.createPlaygroundOptions = createPlaygroundOptions;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/index.js":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/index.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApolloServerPluginInlineTraceDisabled = exports.ApolloServerPluginInlineTrace = exports.ApolloServerPluginSchemaReporting = exports.ApolloServerPluginUsageReportingFromLegacyOptions = exports.ApolloServerPluginUsageReportingDisabled = exports.ApolloServerPluginUsageReporting = void 0;
function ApolloServerPluginUsageReporting(options = Object.create(null)) {
  return __webpack_require__(/*! ./usageReporting */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/usageReporting/index.js").ApolloServerPluginUsageReporting(options);
}
exports.ApolloServerPluginUsageReporting = ApolloServerPluginUsageReporting;
function ApolloServerPluginUsageReportingDisabled() {
  return __webpack_require__(/*! ./usageReporting */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/usageReporting/index.js").ApolloServerPluginUsageReportingDisabled();
}
exports.ApolloServerPluginUsageReportingDisabled = ApolloServerPluginUsageReportingDisabled;
function ApolloServerPluginUsageReportingFromLegacyOptions(options = Object.create(null)) {
  return __webpack_require__(/*! ./usageReporting */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/usageReporting/index.js").ApolloServerPluginUsageReportingFromLegacyOptions(options);
}
exports.ApolloServerPluginUsageReportingFromLegacyOptions = ApolloServerPluginUsageReportingFromLegacyOptions;
function ApolloServerPluginSchemaReporting(options = Object.create(null)) {
  return __webpack_require__(/*! ./schemaReporting */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/schemaReporting/index.js").ApolloServerPluginSchemaReporting(options);
}
exports.ApolloServerPluginSchemaReporting = ApolloServerPluginSchemaReporting;
function ApolloServerPluginInlineTrace(options = Object.create(null)) {
  return __webpack_require__(/*! ./inlineTrace */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/inlineTrace/index.js").ApolloServerPluginInlineTrace(options);
}
exports.ApolloServerPluginInlineTrace = ApolloServerPluginInlineTrace;
function ApolloServerPluginInlineTraceDisabled() {
  return __webpack_require__(/*! ./inlineTrace */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/inlineTrace/index.js").ApolloServerPluginInlineTraceDisabled();
}
exports.ApolloServerPluginInlineTraceDisabled = ApolloServerPluginInlineTraceDisabled;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/inlineTrace/index.js":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/inlineTrace/index.js ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApolloServerPluginInlineTraceDisabled = exports.ApolloServerPluginInlineTrace = void 0;
const apollo_reporting_protobuf_1 = __webpack_require__(/*! apollo-reporting-protobuf */ "apollo-reporting-protobuf");
const traceTreeBuilder_1 = __webpack_require__(/*! ../traceTreeBuilder */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/traceTreeBuilder.js");
const schemaIsFederated_1 = __webpack_require__(/*! ../schemaIsFederated */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/schemaIsFederated.js");
function ApolloServerPluginInlineTrace(options = Object.create(null)) {
  let enabled = options.__onlyIfSchemaIsFederated ? null : true;
  return {
    __internal_plugin_id__() {
      return 'InlineTrace';
    },
    serverWillStart({
      schema,
      logger
    }) {
      if (enabled === null) {
        enabled = schemaIsFederated_1.schemaIsFederated(schema);
        if (enabled) {
          logger.info('Enabling inline tracing for this federated service. To disable, use ' + 'ApolloServerPluginInlineTraceDisabled.');
        }
      }
    },
    requestDidStart({
      request: {
        http
      }
    }) {
      if (!enabled) {
        return;
      }
      const treeBuilder = new traceTreeBuilder_1.TraceTreeBuilder({
        rewriteError: options.rewriteError
      });
      if ((http === null || http === void 0 ? void 0 : http.headers.get('apollo-federation-include-trace')) !== 'ftv1') {
        return;
      }
      treeBuilder.startTiming();
      return {
        executionDidStart: () => ({
          willResolveField({
            info
          }) {
            return treeBuilder.willResolveField(info);
          }
        }),
        didEncounterErrors({
          errors
        }) {
          treeBuilder.didEncounterErrors(errors);
        },
        willSendResponse({
          response
        }) {
          treeBuilder.stopTiming();
          const encodedUint8Array = apollo_reporting_protobuf_1.Trace.encode(treeBuilder.trace).finish();
          const encodedBuffer = Buffer.from(encodedUint8Array, encodedUint8Array.byteOffset, encodedUint8Array.byteLength);
          const extensions = response.extensions || (response.extensions = Object.create(null));
          if (typeof extensions.ftv1 !== 'undefined') {
            throw new Error('The `ftv1` extension was already present.');
          }
          extensions.ftv1 = encodedBuffer.toString('base64');
        }
      };
    }
  };
}
exports.ApolloServerPluginInlineTrace = ApolloServerPluginInlineTrace;
function ApolloServerPluginInlineTraceDisabled() {
  return {
    __internal_plugin_id__() {
      return 'InlineTrace';
    }
  };
}
exports.ApolloServerPluginInlineTraceDisabled = ApolloServerPluginInlineTraceDisabled;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/internalPlugin.js":
/*!*********************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/internalPlugin.js ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pluginIsInternal = void 0;
function pluginIsInternal(plugin) {
  return '__internal_plugin_id__' in plugin;
}
exports.pluginIsInternal = pluginIsInternal;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/schemaIsFederated.js":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/schemaIsFederated.js ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schemaIsFederated = void 0;
const graphql_1 = __webpack_require__(/*! graphql */ "graphql");
function schemaIsFederated(schema) {
  const serviceType = schema.getType('_Service');
  if (!(serviceType && graphql_1.isObjectType(serviceType))) {
    return false;
  }
  const sdlField = serviceType.getFields().sdl;
  if (!sdlField) {
    return false;
  }
  const sdlFieldType = sdlField.type;
  if (!graphql_1.isScalarType(sdlFieldType)) {
    return false;
  }
  return sdlFieldType.name == 'String';
}
exports.schemaIsFederated = schemaIsFederated;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/schemaReporting/index.js":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/schemaReporting/index.js ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.computeCoreSchemaHash = exports.ApolloServerPluginSchemaReporting = void 0;
const os_1 = __importDefault(__webpack_require__(/*! os */ "os"));
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
const graphql_1 = __webpack_require__(/*! graphql */ "graphql");
const schemaReporter_1 = __webpack_require__(/*! ./schemaReporter */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/schemaReporting/schemaReporter.js");
const createSHA_1 = __importDefault(__webpack_require__(/*! ../../utils/createSHA */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/utils/createSHA.js"));
const schemaIsFederated_1 = __webpack_require__(/*! ../schemaIsFederated */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/schemaIsFederated.js");
function ApolloServerPluginSchemaReporting({
  initialDelayMaxMs,
  overrideReportedSchema,
  endpointUrl,
  fetcher
} = Object.create(null)) {
  const bootId = uuid_1.v4();
  return {
    __internal_plugin_id__() {
      return 'SchemaReporting';
    },
    serverWillStart({
      apollo,
      schema,
      logger
    }) {
      return __awaiter(this, void 0, void 0, function* () {
        const {
          key,
          graphRef
        } = apollo;
        if (!key) {
          throw Error('To use ApolloServerPluginSchemaReporting, you must provide an Apollo API ' + 'key, via the APOLLO_KEY environment variable or via `new ApolloServer({apollo: {key})`');
        }
        if (!graphRef) {
          throw Error('To use ApolloServerPluginSchemaReporting, you must provide your graph ref (eg, ' + "'my-graph-id@my-graph-variant'). Try setting the APOLLO_GRAPH_REF environment " + 'variable or passing `new ApolloServer({apollo: {graphRef}})`.');
        }
        if (overrideReportedSchema) {
          try {
            const validationErrors = graphql_1.validateSchema(graphql_1.buildSchema(overrideReportedSchema, {
              noLocation: true
            }));
            if (validationErrors.length) {
              throw new Error(validationErrors.map(error => error.message).join('\n'));
            }
          } catch (err) {
            throw new Error('The schema provided to overrideReportedSchema failed to parse or ' + `validate: ${err.message}`);
          }
        }
        if (schemaIsFederated_1.schemaIsFederated(schema)) {
          throw Error(['Schema reporting is not yet compatible with federated services.', "If you're interested in using schema reporting with federated", 'services, please contact Apollo support. To set up managed federation, see', 'https://go.apollo.dev/s/managed-federation'].join(' '));
        }
        const coreSchema = overrideReportedSchema !== null && overrideReportedSchema !== void 0 ? overrideReportedSchema : graphql_1.printSchema(schema);
        const coreSchemaHash = computeCoreSchemaHash(coreSchema);
        if (overrideReportedSchema !== undefined) {
          logger.info('Apollo schema reporting: schema to report has been overridden');
        }
        if (endpointUrl !== undefined) {
          logger.info(`Apollo schema reporting: schema reporting URL override: ${endpointUrl}`);
        }
        const schemaReport = {
          bootId,
          graphRef,
          platform: process.env.APOLLO_SERVER_PLATFORM || 'local',
          runtimeVersion: `node ${process.version}`,
          coreSchemaHash,
          userVersion: process.env.APOLLO_SERVER_USER_VERSION,
          serverId: process.env.APOLLO_SERVER_ID || process.env.HOSTNAME || os_1.default.hostname(),
          libraryVersion: `apollo-server-core@${__webpack_require__(/*! ../../../package.json */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/package.json").version}`
        };
        logger.info('Apollo schema reporting starting! See your graph at ' + `https://studio.apollographql.com/graph/${encodeURI(graphRef)}/ with server info ${JSON.stringify(schemaReport)}`);
        const schemaReporter = new schemaReporter_1.SchemaReporter({
          schemaReport,
          coreSchema,
          apiKey: key,
          endpointUrl,
          logger,
          initialReportingDelayInMs: Math.floor(Math.random() * (initialDelayMaxMs !== null && initialDelayMaxMs !== void 0 ? initialDelayMaxMs : 10000)),
          fallbackReportingDelayInMs: 20000,
          fetcher
        });
        schemaReporter.start();
        return {
          serverWillStop() {
            return __awaiter(this, void 0, void 0, function* () {
              schemaReporter.stop();
            });
          }
        };
      });
    }
  };
}
exports.ApolloServerPluginSchemaReporting = ApolloServerPluginSchemaReporting;
function computeCoreSchemaHash(schema) {
  return createSHA_1.default('sha256').update(schema).digest('hex');
}
exports.computeCoreSchemaHash = computeCoreSchemaHash;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/schemaReporting/schemaReporter.js":
/*!*************************************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/schemaReporting/schemaReporter.js ***!
  \*************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SchemaReporter = exports.schemaReportGql = void 0;
const __1 = __webpack_require__(/*! ../.. */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/index.js");
const apollo_server_env_1 = __webpack_require__(/*! apollo-server-env */ "apollo-server-env");
const graphql_1 = __webpack_require__(/*! graphql */ "graphql");
exports.schemaReportGql = graphql_1.print(__1.gql`
  mutation SchemaReport($report: SchemaReport!, $coreSchema: String) {
    reportSchema(report: $report, coreSchema: $coreSchema) {
      __typename
      ... on ReportSchemaError {
        message
        code
      }
      ... on ReportSchemaResponse {
        inSeconds
        withCoreSchema
      }
    }
  }
`);
class SchemaReporter {
  constructor(options) {
    var _a;
    this.headers = new apollo_server_env_1.Headers();
    this.headers.set('Content-Type', 'application/json');
    this.headers.set('x-api-key', options.apiKey);
    this.headers.set('apollographql-client-name', 'ApolloServerPluginSchemaReporting');
    this.headers.set('apollographql-client-version', __webpack_require__(/*! ../../../package.json */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/package.json").version);
    this.endpointUrl = options.endpointUrl || 'https://schema-reporting.api.apollographql.com/api/graphql';
    this.schemaReport = options.schemaReport;
    this.coreSchema = options.coreSchema;
    this.isStopped = false;
    this.logger = options.logger;
    this.initialReportingDelayInMs = options.initialReportingDelayInMs;
    this.fallbackReportingDelayInMs = options.fallbackReportingDelayInMs;
    this.fetcher = (_a = options.fetcher) !== null && _a !== void 0 ? _a : apollo_server_env_1.fetch;
  }
  stopped() {
    return this.isStopped;
  }
  start() {
    this.pollTimer = setTimeout(() => this.sendOneReportAndScheduleNext(false), this.initialReportingDelayInMs);
  }
  stop() {
    this.isStopped = true;
    if (this.pollTimer) {
      clearTimeout(this.pollTimer);
      this.pollTimer = undefined;
    }
  }
  sendOneReportAndScheduleNext(sendNextWithCoreSchema) {
    return __awaiter(this, void 0, void 0, function* () {
      this.pollTimer = undefined;
      if (this.stopped()) return;
      try {
        const result = yield this.reportSchema(sendNextWithCoreSchema);
        if (!result) {
          return;
        }
        if (!this.stopped()) {
          this.pollTimer = setTimeout(() => this.sendOneReportAndScheduleNext(result.withCoreSchema), result.inSeconds * 1000);
        }
        return;
      } catch (error) {
        this.logger.error(`Error reporting server info to Apollo during schema reporting: ${error}`);
        if (!this.stopped()) {
          this.pollTimer = setTimeout(() => this.sendOneReportAndScheduleNext(false), this.fallbackReportingDelayInMs);
        }
      }
    });
  }
  reportSchema(withCoreSchema) {
    return __awaiter(this, void 0, void 0, function* () {
      const {
        data,
        errors
      } = yield this.apolloQuery({
        report: this.schemaReport,
        coreSchema: withCoreSchema ? this.coreSchema : null
      });
      if (errors) {
        throw new Error(errors.map(x => x.message).join('\n'));
      }
      function msgForUnexpectedResponse(data) {
        return ['Unexpected response shape from Apollo when', 'reporting schema. If this continues, please reach', 'out to support@apollographql.com.', 'Received response:', JSON.stringify(data)].join(' ');
      }
      if (!data || !data.reportSchema) {
        throw new Error(msgForUnexpectedResponse(data));
      }
      if (data.reportSchema.__typename === 'ReportSchemaResponse') {
        return data.reportSchema;
      } else if (data.reportSchema.__typename === 'ReportSchemaError') {
        this.logger.error(['Received input validation error from Apollo:', data.reportSchema.message, 'Stopping reporting. Please fix the input errors.'].join(' '));
        this.stop();
        return null;
      }
      throw new Error(msgForUnexpectedResponse(data));
    });
  }
  apolloQuery(variables) {
    return __awaiter(this, void 0, void 0, function* () {
      const request = {
        query: exports.schemaReportGql,
        variables
      };
      const httpRequest = new apollo_server_env_1.Request(this.endpointUrl, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(request)
      });
      const httpResponse = yield this.fetcher(httpRequest);
      if (!httpResponse.ok) {
        throw new Error([`An unexpected HTTP status code (${httpResponse.status}) was`, 'encountered during schema reporting.'].join(' '));
      }
      try {
        return yield httpResponse.json();
      } catch (error) {
        throw new Error(["Couldn't report schema to Apollo.", 'Parsing response as JSON failed.', 'If this continues please reach out to support@apollographql.com', error].join(' '));
      }
    });
  }
}
exports.SchemaReporter = SchemaReporter;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/traceTreeBuilder.js":
/*!***********************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/traceTreeBuilder.js ***!
  \***********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateToProtoTimestamp = exports.TraceTreeBuilder = void 0;
const graphql_1 = __webpack_require__(/*! graphql */ "graphql");
const apollo_reporting_protobuf_1 = __webpack_require__(/*! apollo-reporting-protobuf */ "apollo-reporting-protobuf");
function internalError(message) {
  return new Error(`[internal apollo-server error] ${message}`);
}
class TraceTreeBuilder {
  constructor(options) {
    this.rootNode = new apollo_reporting_protobuf_1.Trace.Node();
    this.logger = console;
    this.trace = new apollo_reporting_protobuf_1.Trace({
      root: this.rootNode
    });
    this.stopped = false;
    this.nodes = new Map([[responsePathAsString(), this.rootNode]]);
    this.rewriteError = options.rewriteError;
    if (options.logger) this.logger = options.logger;
  }
  startTiming() {
    if (this.startHrTime) {
      throw internalError('startTiming called twice!');
    }
    if (this.stopped) {
      throw internalError('startTiming called after stopTiming!');
    }
    this.trace.startTime = dateToProtoTimestamp(new Date());
    this.startHrTime = process.hrtime();
  }
  stopTiming() {
    if (!this.startHrTime) {
      throw internalError('stopTiming called before startTiming!');
    }
    if (this.stopped) {
      throw internalError('stopTiming called twice!');
    }
    this.trace.durationNs = durationHrTimeToNanos(process.hrtime(this.startHrTime));
    this.trace.endTime = dateToProtoTimestamp(new Date());
    this.stopped = true;
  }
  willResolveField(info) {
    if (!this.startHrTime) {
      throw internalError('willResolveField called before startTiming!');
    }
    if (this.stopped) {
      throw internalError('willResolveField called after stopTiming!');
    }
    const path = info.path;
    const node = this.newNode(path);
    node.type = info.returnType.toString();
    node.parentType = info.parentType.toString();
    node.startTime = durationHrTimeToNanos(process.hrtime(this.startHrTime));
    if (typeof path.key === 'string' && path.key !== info.fieldName) {
      node.originalFieldName = info.fieldName;
    }
    return () => {
      node.endTime = durationHrTimeToNanos(process.hrtime(this.startHrTime));
    };
  }
  didEncounterErrors(errors) {
    errors.forEach(err => {
      if (err.extensions && err.extensions.serviceName) {
        return;
      }
      const errorForReporting = this.rewriteAndNormalizeError(err);
      if (errorForReporting === null) {
        return;
      }
      this.addProtobufError(errorForReporting.path, errorToProtobufError(errorForReporting));
    });
  }
  addProtobufError(path, error) {
    if (!this.startHrTime) {
      throw internalError('addProtobufError called before startTiming!');
    }
    if (this.stopped) {
      throw internalError('addProtobufError called after stopTiming!');
    }
    let node = this.rootNode;
    if (Array.isArray(path)) {
      const specificNode = this.nodes.get(path.join('.'));
      if (specificNode) {
        node = specificNode;
      } else {
        this.logger.warn(`Could not find node with path ${path.join('.')}; defaulting to put errors on root node.`);
      }
    }
    node.error.push(error);
  }
  newNode(path) {
    const node = new apollo_reporting_protobuf_1.Trace.Node();
    const id = path.key;
    if (typeof id === 'number') {
      node.index = id;
    } else {
      node.responseName = id;
    }
    this.nodes.set(responsePathAsString(path), node);
    const parentNode = this.ensureParentNode(path);
    parentNode.child.push(node);
    return node;
  }
  ensureParentNode(path) {
    const parentPath = responsePathAsString(path.prev);
    const parentNode = this.nodes.get(parentPath);
    if (parentNode) {
      return parentNode;
    }
    return this.newNode(path.prev);
  }
  rewriteAndNormalizeError(err) {
    if (this.rewriteError) {
      const clonedError = Object.assign(Object.create(Object.getPrototypeOf(err)), err);
      const rewrittenError = this.rewriteError(clonedError);
      if (rewrittenError === null) {
        return null;
      }
      if (!(rewrittenError instanceof graphql_1.GraphQLError)) {
        return err;
      }
      return new graphql_1.GraphQLError(rewrittenError.message, err.nodes, err.source, err.positions, err.path, err.originalError, rewrittenError.extensions || err.extensions);
    }
    return err;
  }
}
exports.TraceTreeBuilder = TraceTreeBuilder;
function durationHrTimeToNanos(hrtime) {
  return hrtime[0] * 1e9 + hrtime[1];
}
function responsePathAsString(p) {
  if (p === undefined) {
    return '';
  }
  let res = String(p.key);
  while ((p = p.prev) !== undefined) {
    res = `${p.key}.${res}`;
  }
  return res;
}
function errorToProtobufError(error) {
  return new apollo_reporting_protobuf_1.Trace.Error({
    message: error.message,
    location: (error.locations || []).map(({
      line,
      column
    }) => new apollo_reporting_protobuf_1.Trace.Location({
      line,
      column
    })),
    json: JSON.stringify(error)
  });
}
function dateToProtoTimestamp(date) {
  const totalMillis = +date;
  const millis = totalMillis % 1000;
  return new apollo_reporting_protobuf_1.google.protobuf.Timestamp({
    seconds: (totalMillis - millis) / 1000,
    nanos: millis * 1e6
  });
}
exports.dateToProtoTimestamp = dateToProtoTimestamp;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/usageReporting/defaultSendOperationsAsTrace.js":
/*!**************************************************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/usageReporting/defaultSendOperationsAsTrace.js ***!
  \**************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSendOperationsAsTrace = void 0;
const lru_cache_1 = __importDefault(__webpack_require__(/*! lru-cache */ "lru-cache"));
const iterateOverTrace_1 = __webpack_require__(/*! ./iterateOverTrace */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/usageReporting/iterateOverTrace.js");
const durationHistogram_1 = __webpack_require__(/*! ./durationHistogram */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/usageReporting/durationHistogram.js");
function defaultSendOperationsAsTrace() {
  const cache = new lru_cache_1.default({
    max: Math.pow(2, 20),
    length: (_val, key) => {
      return key && Buffer.byteLength(key) || 0;
    }
  });
  return (trace, statsReportKey) => {
    var _a;
    const endTimeSeconds = (_a = trace.endTime) === null || _a === void 0 ? void 0 : _a.seconds;
    if (endTimeSeconds == null) {
      throw Error('programming error: endTime not set on trace');
    }
    const hasErrors = traceHasErrors(trace);
    const cacheKey = JSON.stringify([statsReportKey, durationHistogram_1.DurationHistogram.durationToBucket(trace.durationNs), Math.floor(endTimeSeconds / 60), hasErrors ? Math.floor(endTimeSeconds / 5) : '']);
    if (cache.get(cacheKey)) {
      return false;
    }
    cache.set(cacheKey, true);
    return true;
  };
}
exports.defaultSendOperationsAsTrace = defaultSendOperationsAsTrace;
function traceHasErrors(trace) {
  let hasErrors = false;
  function traceNodeStats(node) {
    var _a, _b;
    if (((_b = (_a = node.error) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0) {
      hasErrors = true;
    }
    return hasErrors;
  }
  iterateOverTrace_1.iterateOverTrace(trace, traceNodeStats, false);
  return hasErrors;
}

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/usageReporting/durationHistogram.js":
/*!***************************************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/usageReporting/durationHistogram.js ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DurationHistogram = void 0;
class DurationHistogram {
  constructor(options) {
    const initSize = (options === null || options === void 0 ? void 0 : options.initSize) || 74;
    const buckets = options === null || options === void 0 ? void 0 : options.buckets;
    const arrayInitSize = Math.max((buckets === null || buckets === void 0 ? void 0 : buckets.length) || 0, initSize);
    this.buckets = Array(arrayInitSize).fill(0);
    if (buckets) {
      buckets.forEach((val, index) => this.buckets[index] = val);
    }
  }
  toArray() {
    let bufferedZeroes = 0;
    const outputArray = [];
    for (const value of this.buckets) {
      if (value === 0) {
        bufferedZeroes++;
      } else {
        if (bufferedZeroes === 1) {
          outputArray.push(0);
        } else if (bufferedZeroes !== 0) {
          outputArray.push(-bufferedZeroes);
        }
        outputArray.push(value);
        bufferedZeroes = 0;
      }
    }
    return outputArray;
  }
  static durationToBucket(durationNs) {
    const log = Math.log(durationNs / 1000.0);
    const unboundedBucket = Math.ceil(log / DurationHistogram.EXPONENT_LOG);
    return unboundedBucket <= 0 || Number.isNaN(unboundedBucket) ? 0 : unboundedBucket >= DurationHistogram.BUCKET_COUNT ? DurationHistogram.BUCKET_COUNT - 1 : unboundedBucket;
  }
  incrementDuration(durationNs) {
    this.incrementBucket(DurationHistogram.durationToBucket(durationNs));
    return this;
  }
  incrementBucket(bucket, value = 1) {
    if (bucket >= DurationHistogram.BUCKET_COUNT) {
      throw Error('Bucket is out of bounds of the buckets array');
    }
    if (bucket >= this.buckets.length) {
      const oldLength = this.buckets.length;
      this.buckets.length = bucket + 1;
      this.buckets.fill(0, oldLength);
    }
    this.buckets[bucket] += value;
  }
  combine(otherHistogram) {
    for (let i = 0; i < otherHistogram.buckets.length; i++) {
      this.incrementBucket(i, otherHistogram.buckets[i]);
    }
  }
}
exports.DurationHistogram = DurationHistogram;
DurationHistogram.BUCKET_COUNT = 384;
DurationHistogram.EXPONENT_LOG = Math.log(1.1);

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/usageReporting/index.js":
/*!***************************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/usageReporting/index.js ***!
  \***************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var plugin_1 = __webpack_require__(/*! ./plugin */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/usageReporting/plugin.js");
Object.defineProperty(exports, "ApolloServerPluginUsageReporting", {
  enumerable: true,
  get: function () {
    return plugin_1.ApolloServerPluginUsageReporting;
  }
});
Object.defineProperty(exports, "ApolloServerPluginUsageReportingDisabled", {
  enumerable: true,
  get: function () {
    return plugin_1.ApolloServerPluginUsageReportingDisabled;
  }
});
var legacyOptions_1 = __webpack_require__(/*! ./legacyOptions */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/usageReporting/legacyOptions.js");
Object.defineProperty(exports, "ApolloServerPluginUsageReportingFromLegacyOptions", {
  enumerable: true,
  get: function () {
    return legacyOptions_1.ApolloServerPluginUsageReportingFromLegacyOptions;
  }
});

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/usageReporting/iterateOverTrace.js":
/*!**************************************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/usageReporting/iterateOverTrace.js ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iterateOverTrace = void 0;
function iterateOverTrace(trace, f, includePath) {
  const rootPath = includePath ? new RootCollectingPathsResponseNamePath() : notCollectingPathsResponseNamePath;
  if (trace.root) {
    if (iterateOverTraceNode(trace.root, rootPath, f)) return;
  }
  if (trace.queryPlan) {
    if (iterateOverQueryPlan(trace.queryPlan, rootPath, f)) return;
  }
}
exports.iterateOverTrace = iterateOverTrace;
function iterateOverQueryPlan(node, rootPath, f) {
  var _a, _b, _c, _d, _e;
  if (!node) return false;
  if (((_b = (_a = node.fetch) === null || _a === void 0 ? void 0 : _a.trace) === null || _b === void 0 ? void 0 : _b.root) && node.fetch.serviceName) {
    return iterateOverTraceNode(node.fetch.trace.root, rootPath.child(`service:${node.fetch.serviceName}`), f);
  }
  if ((_c = node.flatten) === null || _c === void 0 ? void 0 : _c.node) {
    return iterateOverQueryPlan(node.flatten.node, rootPath, f);
  }
  if ((_d = node.parallel) === null || _d === void 0 ? void 0 : _d.nodes) {
    return node.parallel.nodes.some(node => iterateOverQueryPlan(node, rootPath, f));
  }
  if ((_e = node.sequence) === null || _e === void 0 ? void 0 : _e.nodes) {
    return node.sequence.nodes.some(node => iterateOverQueryPlan(node, rootPath, f));
  }
  return false;
}
function iterateOverTraceNode(node, path, f) {
  var _a, _b;
  if (f(node, path)) {
    return true;
  }
  return (_b = (_a = node.child) === null || _a === void 0 ? void 0 : _a.some(child => {
    const childPath = child.responseName ? path.child(child.responseName) : path;
    return iterateOverTraceNode(child, childPath, f);
  })) !== null && _b !== void 0 ? _b : false;
}
const notCollectingPathsResponseNamePath = {
  toArray() {
    throw Error('not collecting paths!');
  },
  child() {
    return this;
  }
};
class RootCollectingPathsResponseNamePath {
  toArray() {
    return [];
  }
  child(responseName) {
    return new ChildCollectingPathsResponseNamePath(responseName, this);
  }
}
class ChildCollectingPathsResponseNamePath {
  constructor(responseName, prev) {
    this.responseName = responseName;
    this.prev = prev;
  }
  toArray() {
    const out = [];
    let curr = this;
    while (curr instanceof ChildCollectingPathsResponseNamePath) {
      out.push(curr.responseName);
      curr = curr.prev;
    }
    return out.reverse();
  }
  child(responseName) {
    return new ChildCollectingPathsResponseNamePath(responseName, this);
  }
}

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/usageReporting/legacyOptions.js":
/*!***********************************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/usageReporting/legacyOptions.js ***!
  \***********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.legacyOptionsToPluginOptions = exports.ApolloServerPluginUsageReportingFromLegacyOptions = void 0;
const graphql_1 = __webpack_require__(/*! graphql */ "graphql");
const plugin_1 = __webpack_require__(/*! ./plugin */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/usageReporting/plugin.js");
function ApolloServerPluginUsageReportingFromLegacyOptions(options = Object.create(null)) {
  return plugin_1.ApolloServerPluginUsageReporting(legacyOptionsToPluginOptions(options));
}
exports.ApolloServerPluginUsageReportingFromLegacyOptions = ApolloServerPluginUsageReportingFromLegacyOptions;
function legacyOptionsToPluginOptions(engine) {
  var _a;
  const pluginOptions = {};
  pluginOptions.calculateSignature = engine.calculateSignature;
  pluginOptions.reportIntervalMs = engine.reportIntervalMs;
  pluginOptions.maxUncompressedReportSize = engine.maxUncompressedReportSize;
  pluginOptions.endpointUrl = (_a = engine.tracesEndpointUrl) !== null && _a !== void 0 ? _a : engine.endpointUrl;
  pluginOptions.debugPrintReports = engine.debugPrintReports;
  pluginOptions.requestAgent = engine.requestAgent;
  pluginOptions.maxAttempts = engine.maxAttempts;
  pluginOptions.minimumRetryDelayMs = engine.minimumRetryDelayMs;
  pluginOptions.reportErrorFunction = engine.reportErrorFunction;
  pluginOptions.sendVariableValues = engine.sendVariableValues;
  if (typeof engine.reportTiming === 'function') {
    pluginOptions.includeRequest = engine.reportTiming;
  }
  pluginOptions.sendHeaders = engine.sendHeaders;
  pluginOptions.sendReportsImmediately = engine.sendReportsImmediately;
  if (engine.maskErrorDetails && engine.rewriteError) {
    throw new Error("Can't set both maskErrorDetails and rewriteError!");
  } else if (engine.rewriteError && typeof engine.rewriteError !== 'function') {
    throw new Error('rewriteError must be a function');
  } else if (engine.maskErrorDetails) {
    pluginOptions.rewriteError = () => new graphql_1.GraphQLError('<masked>');
    delete engine.maskErrorDetails;
  } else if (engine.rewriteError) {
    pluginOptions.rewriteError = engine.rewriteError;
  }
  pluginOptions.generateClientInfo = engine.generateClientInfo;
  pluginOptions.logger = engine.logger;
  if (typeof engine.privateVariables !== 'undefined' && engine.sendVariableValues) {
    throw new Error("You have set both the 'sendVariableValues' and the deprecated 'privateVariables' options. " + "Please only set 'sendVariableValues' (ideally, when calling `ApolloServerPluginUsageReporting` " + 'instead of the deprecated `engine` option to the `ApolloServer` constructor).');
  } else if (typeof engine.privateVariables !== 'undefined') {
    if (engine.privateVariables !== null) {
      pluginOptions.sendVariableValues = makeSendValuesBaseOptionsFromLegacy(engine.privateVariables);
    }
  } else {
    pluginOptions.sendVariableValues = engine.sendVariableValues;
  }
  if (typeof engine.privateHeaders !== 'undefined' && engine.sendHeaders) {
    throw new Error("You have set both the 'sendHeaders' and the deprecated 'privateVariables' options. " + "Please only set 'sendHeaders' (ideally, when calling `ApolloServerPluginUsageReporting` " + 'instead of the deprecated `engine` option to the `ApolloServer` constructor).');
  } else if (typeof engine.privateHeaders !== 'undefined') {
    if (engine.privateHeaders !== null) {
      pluginOptions.sendHeaders = makeSendValuesBaseOptionsFromLegacy(engine.privateHeaders);
    }
  } else {
    pluginOptions.sendHeaders = engine.sendHeaders;
  }
  return pluginOptions;
}
exports.legacyOptionsToPluginOptions = legacyOptionsToPluginOptions;
function makeSendValuesBaseOptionsFromLegacy(legacyPrivateOption) {
  return Array.isArray(legacyPrivateOption) ? {
    exceptNames: legacyPrivateOption
  } : legacyPrivateOption ? {
    none: true
  } : {
    all: true
  };
}

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/usageReporting/plugin.js":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/usageReporting/plugin.js ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApolloServerPluginUsageReportingDisabled = exports.makeHTTPRequestHeaders = exports.ApolloServerPluginUsageReporting = void 0;
const os_1 = __importDefault(__webpack_require__(/*! os */ "os"));
const zlib_1 = __webpack_require__(/*! zlib */ "zlib");
const async_retry_1 = __importDefault(__webpack_require__(/*! async-retry */ "async-retry"));
const apollo_graphql_1 = __webpack_require__(/*! apollo-graphql */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/index.js");
const apollo_reporting_protobuf_1 = __webpack_require__(/*! apollo-reporting-protobuf */ "apollo-reporting-protobuf");
const apollo_server_env_1 = __webpack_require__(/*! apollo-server-env */ "apollo-server-env");
const signatureCache_1 = __webpack_require__(/*! ./signatureCache */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/usageReporting/signatureCache.js");
const traceTreeBuilder_1 = __webpack_require__(/*! ../traceTreeBuilder */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/traceTreeBuilder.js");
const traceDetails_1 = __webpack_require__(/*! ./traceDetails */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/usageReporting/traceDetails.js");
const graphql_1 = __webpack_require__(/*! graphql */ "graphql");
const schemaReporting_1 = __webpack_require__(/*! ../schemaReporting */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/schemaReporting/index.js");
const stats_1 = __webpack_require__(/*! ./stats */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/usageReporting/stats.js");
const apollo_cache_control_1 = __webpack_require__(/*! apollo-cache-control */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-cache-control/dist/index.js");
const defaultSendOperationsAsTrace_1 = __webpack_require__(/*! ./defaultSendOperationsAsTrace */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/usageReporting/defaultSendOperationsAsTrace.js");
const reportHeaderDefaults = {
  hostname: os_1.default.hostname(),
  agentVersion: `apollo-server-core@${__webpack_require__(/*! ../../../package.json */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/package.json").version}`,
  runtimeVersion: `node ${process.version}`,
  uname: `${os_1.default.platform()}, ${os_1.default.type()}, ${os_1.default.release()}, ${os_1.default.arch()})`
};
class ReportData {
  constructor(executableSchemaId, graphRef) {
    this.header = new apollo_reporting_protobuf_1.ReportHeader(Object.assign(Object.assign({}, reportHeaderDefaults), {
      executableSchemaId,
      graphRef
    }));
    this.reset();
  }
  reset() {
    this.report = new stats_1.OurReport(this.header);
  }
}
function ApolloServerPluginUsageReporting(options = Object.create(null)) {
  let requestDidStartHandler;
  return {
    __internal_plugin_id__() {
      return 'UsageReporting';
    },
    requestDidStart(requestContext) {
      if (!requestDidStartHandler) {
        throw Error('The usage reporting plugin has been asked to handle a request before the ' + 'server has started. See https://github.com/apollographql/apollo-server/issues/4588 ' + 'for more details.');
      }
      return requestDidStartHandler(requestContext);
    },
    serverWillStart({
      logger: serverLogger,
      apollo,
      serverlessFramework
    }) {
      var _a, _b, _c, _d;
      const logger = (_a = options.logger) !== null && _a !== void 0 ? _a : serverLogger;
      const {
        key,
        graphRef
      } = apollo;
      if (!(key && graphRef)) {
        throw new Error("You've enabled usage reporting via ApolloServerPluginUsageReporting, " + 'but you also need to provide your Apollo API key and graph ref, via ' + 'the APOLLO_KEY/APOLLO_GRAPH_REF environment ' + 'variables or via `new ApolloServer({apollo: {key, graphRef})`.');
      }
      logger.info('Apollo usage reporting starting! See your graph at ' + `https://studio.apollographql.com/graph/${encodeURI(graphRef)}/`);
      const sendReportsImmediately = (_b = options.sendReportsImmediately) !== null && _b !== void 0 ? _b : serverlessFramework;
      const signatureCache = signatureCache_1.createSignatureCache({
        logger
      });
      const reportDataByExecutableSchemaId = Object.create(null);
      const overriddenExecutableSchemaId = options.overrideReportedSchema ? schemaReporting_1.computeCoreSchemaHash(options.overrideReportedSchema) : undefined;
      let lastSeenExecutableSchemaToId;
      let reportTimer;
      if (!sendReportsImmediately) {
        reportTimer = setInterval(() => sendAllReportsAndReportErrors(), options.reportIntervalMs || 10 * 1000);
      }
      let graphMightSupportTraces = true;
      const sendOperationAsTrace = (_c = options.experimental_sendOperationAsTrace) !== null && _c !== void 0 ? _c : defaultSendOperationsAsTrace_1.defaultSendOperationsAsTrace();
      const includeTracesContributingToStats = (_d = options.internal_includeTracesContributingToStats) !== null && _d !== void 0 ? _d : false;
      let stopped = false;
      function executableSchemaIdForSchema(schema) {
        if ((lastSeenExecutableSchemaToId === null || lastSeenExecutableSchemaToId === void 0 ? void 0 : lastSeenExecutableSchemaToId.executableSchema) === schema) {
          return lastSeenExecutableSchemaToId.executableSchemaId;
        }
        const id = schemaReporting_1.computeCoreSchemaHash(graphql_1.printSchema(schema));
        lastSeenExecutableSchemaToId = {
          executableSchema: schema,
          executableSchemaId: id
        };
        return id;
      }
      const getReportData = executableSchemaId => {
        const existing = reportDataByExecutableSchemaId[executableSchemaId];
        if (existing) {
          return existing;
        }
        const reportData = new ReportData(executableSchemaId, graphRef);
        reportDataByExecutableSchemaId[executableSchemaId] = reportData;
        return reportData;
      };
      function sendAllReportsAndReportErrors() {
        return __awaiter(this, void 0, void 0, function* () {
          yield Promise.all(Object.keys(reportDataByExecutableSchemaId).map(executableSchemaId => sendReportAndReportErrors(executableSchemaId)));
        });
      }
      function sendReportAndReportErrors(executableSchemaId) {
        return __awaiter(this, void 0, void 0, function* () {
          return sendReport(executableSchemaId).catch(err => {
            if (options.reportErrorFunction) {
              options.reportErrorFunction(err);
            } else {
              logger.error(err.message);
            }
          });
        });
      }
      const sendReport = executableSchemaId => __awaiter(this, void 0, void 0, function* () {
        var _e, _f;
        const reportData = getReportData(executableSchemaId);
        const {
          report
        } = reportData;
        reportData.reset();
        if (Object.keys(report.tracesPerQuery).length === 0) {
          return;
        }
        report.endTime = traceTreeBuilder_1.dateToProtoTimestamp(new Date());
        const protobufError = apollo_reporting_protobuf_1.Report.verify(report);
        if (protobufError) {
          throw new Error(`Error encoding report: ${protobufError}`);
        }
        const message = apollo_reporting_protobuf_1.Report.encode(report).finish();
        if (options.debugPrintReports) {
          const decodedReport = apollo_reporting_protobuf_1.Report.decode(message);
          logger.warn(`Apollo usage report: ${JSON.stringify(decodedReport.toJSON())}`);
        }
        const compressed = yield new Promise((resolve, reject) => {
          const messageBuffer = Buffer.from(message.buffer, message.byteOffset, message.byteLength);
          zlib_1.gzip(messageBuffer, (err, gzipResult) => {
            if (err) {
              reject(err);
            } else {
              resolve(gzipResult);
            }
          });
        });
        const fetcher = (_e = options.fetcher) !== null && _e !== void 0 ? _e : apollo_server_env_1.fetch;
        const response = yield async_retry_1.default(() => __awaiter(this, void 0, void 0, function* () {
          const curResponse = yield fetcher((options.endpointUrl || 'https://usage-reporting.api.apollographql.com') + '/api/ingress/traces', {
            method: 'POST',
            headers: {
              'user-agent': 'ApolloServerPluginUsageReporting',
              'x-api-key': key,
              'content-encoding': 'gzip',
              accept: 'application/json'
            },
            body: compressed,
            agent: options.requestAgent
          });
          if (curResponse.status >= 500 && curResponse.status < 600) {
            throw new Error(`HTTP status ${curResponse.status}, ${(yield curResponse.text()) || '(no body)'}`);
          } else {
            return curResponse;
          }
        }), {
          retries: (options.maxAttempts || 5) - 1,
          minTimeout: options.minimumRetryDelayMs || 100,
          factor: 2
        }).catch(err => {
          throw new Error(`Error sending report to Apollo servers: ${err.message}`);
        });
        if (response.status < 200 || response.status >= 300) {
          throw new Error(`Error sending report to Apollo servers: HTTP status ${response.status}, ${(yield response.text()) || '(no body)'}`);
        }
        if (graphMightSupportTraces && response.status === 200 && ((_f = response.headers.get('content-type')) === null || _f === void 0 ? void 0 : _f.match(/^\s*application\/json\s*(?:;|$)/i))) {
          const body = yield response.text();
          let parsedBody;
          try {
            parsedBody = JSON.parse(body);
          } catch (e) {
            throw new Error(`Error parsing response from Apollo servers: ${e}`);
          }
          if (parsedBody.tracesIgnored === true) {
            logger.debug("This graph's organization does not have access to traces; sending all " + 'subsequent operations as traces.');
            graphMightSupportTraces = false;
          }
        }
        if (options.debugPrintReports) {
          logger.warn(`Apollo usage report: status ${response.status}`);
        }
      });
      requestDidStartHandler = ({
        logger: requestLogger,
        metrics,
        schema,
        request: {
          http,
          variables
        }
      }) => {
        var _a;
        const logger = (_a = requestLogger !== null && requestLogger !== void 0 ? requestLogger : options.logger) !== null && _a !== void 0 ? _a : serverLogger;
        const treeBuilder = new traceTreeBuilder_1.TraceTreeBuilder({
          rewriteError: options.rewriteError,
          logger
        });
        treeBuilder.startTiming();
        metrics.startHrTime = treeBuilder.startHrTime;
        let graphqlValidationFailure = false;
        let graphqlUnknownOperationName = false;
        if (http) {
          treeBuilder.trace.http = new apollo_reporting_protobuf_1.Trace.HTTP({
            method: apollo_reporting_protobuf_1.Trace.HTTP.Method[http.method] || apollo_reporting_protobuf_1.Trace.HTTP.Method.UNKNOWN,
            host: null,
            path: null
          });
          if (options.sendHeaders) {
            makeHTTPRequestHeaders(treeBuilder.trace.http, http.headers, options.sendHeaders);
          }
        }
        function shouldIncludeRequest(requestContext) {
          return __awaiter(this, void 0, void 0, function* () {
            if (metrics.captureTraces !== undefined) return;
            if (typeof options.includeRequest !== 'function') {
              metrics.captureTraces = true;
              return;
            }
            metrics.captureTraces = yield options.includeRequest(requestContext);
            if (typeof metrics.captureTraces !== 'boolean') {
              logger.warn("The 'includeRequest' async predicate function must return a boolean value.");
              metrics.captureTraces = true;
            }
          });
        }
        let endDone = false;
        function didEnd(requestContext) {
          if (endDone) return;
          endDone = true;
          treeBuilder.stopTiming();
          if (metrics.captureTraces === undefined) {
            logger.warn('captureTrace is undefined at the end of the request. This is a bug in ApolloServerPluginUsageReporting.');
          }
          if (metrics.captureTraces === false) return;
          treeBuilder.trace.fullQueryCacheHit = !!metrics.responseCacheHit;
          treeBuilder.trace.forbiddenOperation = !!metrics.forbiddenOperation;
          treeBuilder.trace.registeredOperation = !!metrics.registeredOperation;
          if (requestContext.overallCachePolicy) {
            treeBuilder.trace.cachePolicy = new apollo_reporting_protobuf_1.Trace.CachePolicy({
              scope: requestContext.overallCachePolicy.scope === apollo_cache_control_1.CacheScope.Private ? apollo_reporting_protobuf_1.Trace.CachePolicy.Scope.PRIVATE : requestContext.overallCachePolicy.scope === apollo_cache_control_1.CacheScope.Public ? apollo_reporting_protobuf_1.Trace.CachePolicy.Scope.PUBLIC : apollo_reporting_protobuf_1.Trace.CachePolicy.Scope.UNKNOWN,
              maxAgeNs: requestContext.overallCachePolicy.maxAge * 1e9
            });
          }
          const operationName = requestContext.operationName || requestContext.request.operationName || '';
          if (metrics.queryPlanTrace) {
            treeBuilder.trace.queryPlan = metrics.queryPlanTrace;
          }
          addTrace().catch(logger.error);
          function addTrace() {
            return __awaiter(this, void 0, void 0, function* () {
              if (stopped) {
                return;
              }
              yield new Promise(res => setImmediate(res));
              const executableSchemaId = overriddenExecutableSchemaId !== null && overriddenExecutableSchemaId !== void 0 ? overriddenExecutableSchemaId : executableSchemaIdForSchema(schema);
              const reportData = getReportData(executableSchemaId);
              const {
                report
              } = reportData;
              const {
                trace
              } = treeBuilder;
              let statsReportKey = undefined;
              if (!requestContext.document) {
                statsReportKey = `## GraphQLParseFailure\n`;
              } else if (graphqlValidationFailure) {
                statsReportKey = `## GraphQLValidationFailure\n`;
              } else if (graphqlUnknownOperationName) {
                statsReportKey = `## GraphQLUnknownOperationName\n`;
              }
              if (statsReportKey) {
                if (options.sendUnexecutableOperationDocuments) {
                  trace.unexecutedOperationBody = requestContext.source;
                  trace.unexecutedOperationName = operationName;
                }
              } else {
                const signature = getTraceSignature();
                statsReportKey = `# ${operationName || '-'}\n${signature}`;
              }
              const protobufError = apollo_reporting_protobuf_1.Trace.verify(trace);
              if (protobufError) {
                throw new Error(`Error encoding trace: ${protobufError}`);
              }
              report.addTrace({
                statsReportKey,
                trace,
                asTrace: graphMightSupportTraces && sendOperationAsTrace(trace, statsReportKey),
                includeTracesContributingToStats
              });
              if (sendReportsImmediately || report.sizeEstimator.bytes >= (options.maxUncompressedReportSize || 4 * 1024 * 1024)) {
                yield sendReportAndReportErrors(executableSchemaId);
              }
            });
          }
          function getTraceSignature() {
            if (!requestContext.document) {
              throw new Error('No document?');
            }
            const cacheKey = signatureCache_1.signatureCacheKey(requestContext.queryHash, operationName);
            const cachedSignature = signatureCache.get(cacheKey);
            if (cachedSignature) {
              return cachedSignature;
            }
            const generatedSignature = (options.calculateSignature || apollo_graphql_1.defaultUsageReportingSignature)(requestContext.document, operationName);
            signatureCache.set(cacheKey, generatedSignature);
            return generatedSignature;
          }
        }
        let didResolveSource = false;
        return {
          didResolveSource(requestContext) {
            didResolveSource = true;
            if (metrics.persistedQueryHit) {
              treeBuilder.trace.persistedQueryHit = true;
            }
            if (metrics.persistedQueryRegister) {
              treeBuilder.trace.persistedQueryRegister = true;
            }
            if (variables) {
              treeBuilder.trace.details = traceDetails_1.makeTraceDetails(variables, options.sendVariableValues, requestContext.source);
            }
            const clientInfo = (options.generateClientInfo || defaultGenerateClientInfo)(requestContext);
            if (clientInfo) {
              const {
                clientName,
                clientVersion,
                clientReferenceId
              } = clientInfo;
              treeBuilder.trace.clientVersion = clientVersion || '';
              treeBuilder.trace.clientReferenceId = clientReferenceId || '';
              treeBuilder.trace.clientName = clientName || '';
            }
          },
          validationDidStart() {
            return validationErrors => {
              graphqlValidationFailure = validationErrors ? validationErrors.length !== 0 : false;
            };
          },
          didResolveOperation(requestContext) {
            return __awaiter(this, void 0, void 0, function* () {
              graphqlUnknownOperationName = requestContext.operation === undefined;
              yield shouldIncludeRequest(requestContext);
              if (metrics.captureTraces === false) {
                didEnd(requestContext);
              }
            });
          },
          executionDidStart() {
            if (endDone) return;
            return {
              willResolveField({
                info
              }) {
                return treeBuilder.willResolveField(info);
              }
            };
          },
          willSendResponse(requestContext) {
            didEnd(requestContext);
          },
          didEncounterErrors(requestContext) {
            return __awaiter(this, void 0, void 0, function* () {
              if (!didResolveSource || endDone) return;
              treeBuilder.didEncounterErrors(requestContext.errors);
              yield shouldIncludeRequest(requestContext);
              didEnd(requestContext);
            });
          }
        };
      };
      return {
        serverWillStop() {
          return __awaiter(this, void 0, void 0, function* () {
            if (reportTimer) {
              clearInterval(reportTimer);
              reportTimer = undefined;
            }
            stopped = true;
            yield sendAllReportsAndReportErrors();
          });
        }
      };
    }
  };
}
exports.ApolloServerPluginUsageReporting = ApolloServerPluginUsageReporting;
function makeHTTPRequestHeaders(http, headers, sendHeaders) {
  if (!sendHeaders || 'none' in sendHeaders && sendHeaders.none || 'all' in sendHeaders && !sendHeaders.all) {
    return;
  }
  for (const [key, value] of headers) {
    const lowerCaseKey = key.toLowerCase();
    if ('exceptNames' in sendHeaders && sendHeaders.exceptNames.some(exceptHeader => {
      return exceptHeader.toLowerCase() === lowerCaseKey;
    }) || 'onlyNames' in sendHeaders && !sendHeaders.onlyNames.some(header => {
      return header.toLowerCase() === lowerCaseKey;
    })) {
      continue;
    }
    switch (key) {
      case 'authorization':
      case 'cookie':
      case 'set-cookie':
        break;
      default:
        http.requestHeaders[key] = new apollo_reporting_protobuf_1.Trace.HTTP.Values({
          value: [value]
        });
    }
  }
}
exports.makeHTTPRequestHeaders = makeHTTPRequestHeaders;
function defaultGenerateClientInfo({
  request
}) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
  const clientNameHeaderKey = 'apollographql-client-name';
  const clientReferenceIdHeaderKey = 'apollographql-client-reference-id';
  const clientVersionHeaderKey = 'apollographql-client-version';
  if (((_b = (_a = request.http) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.get(clientNameHeaderKey)) || ((_d = (_c = request.http) === null || _c === void 0 ? void 0 : _c.headers) === null || _d === void 0 ? void 0 : _d.get(clientVersionHeaderKey)) || ((_f = (_e = request.http) === null || _e === void 0 ? void 0 : _e.headers) === null || _f === void 0 ? void 0 : _f.get(clientReferenceIdHeaderKey))) {
    return {
      clientName: (_h = (_g = request.http) === null || _g === void 0 ? void 0 : _g.headers) === null || _h === void 0 ? void 0 : _h.get(clientNameHeaderKey),
      clientVersion: (_k = (_j = request.http) === null || _j === void 0 ? void 0 : _j.headers) === null || _k === void 0 ? void 0 : _k.get(clientVersionHeaderKey),
      clientReferenceId: (_m = (_l = request.http) === null || _l === void 0 ? void 0 : _l.headers) === null || _m === void 0 ? void 0 : _m.get(clientReferenceIdHeaderKey)
    };
  } else if ((_o = request.extensions) === null || _o === void 0 ? void 0 : _o.clientInfo) {
    return request.extensions.clientInfo;
  } else {
    return {};
  }
}
function ApolloServerPluginUsageReportingDisabled() {
  return {
    __internal_plugin_id__() {
      return 'UsageReporting';
    }
  };
}
exports.ApolloServerPluginUsageReportingDisabled = ApolloServerPluginUsageReportingDisabled;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/usageReporting/signatureCache.js":
/*!************************************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/usageReporting/signatureCache.js ***!
  \************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signatureCacheKey = exports.createSignatureCache = void 0;
const lru_cache_1 = __importDefault(__webpack_require__(/*! lru-cache */ "lru-cache"));
function createSignatureCache({
  logger
}) {
  let lastSignatureCacheWarn;
  let lastSignatureCacheDisposals = 0;
  return new lru_cache_1.default({
    length(obj) {
      return Buffer.byteLength(JSON.stringify(obj), 'utf8');
    },
    max: Math.pow(2, 20) * 3,
    dispose() {
      lastSignatureCacheDisposals++;
      if (!lastSignatureCacheWarn || new Date().getTime() - lastSignatureCacheWarn.getTime() > 60000) {
        lastSignatureCacheWarn = new Date();
        logger.warn(['This server is processing a high number of unique operations.  ', `A total of ${lastSignatureCacheDisposals} records have been `, 'ejected from the ApolloServerPluginUsageReporting signature cache in the past ', 'interval.  If you see this warning frequently, please open an ', 'issue on the Apollo Server repository.'].join(''));
        lastSignatureCacheDisposals = 0;
      }
    }
  });
}
exports.createSignatureCache = createSignatureCache;
function signatureCacheKey(queryHash, operationName) {
  return `${queryHash}${operationName && ':' + operationName}`;
}
exports.signatureCacheKey = signatureCacheKey;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/usageReporting/stats.js":
/*!***************************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/usageReporting/stats.js ***!
  \***************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OurContextualizedStats = exports.OurReport = exports.SizeEstimator = void 0;
const durationHistogram_1 = __webpack_require__(/*! ./durationHistogram */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/usageReporting/durationHistogram.js");
const apollo_reporting_protobuf_1 = __webpack_require__(/*! apollo-reporting-protobuf */ "apollo-reporting-protobuf");
const iterateOverTrace_1 = __webpack_require__(/*! ./iterateOverTrace */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/usageReporting/iterateOverTrace.js");
class SizeEstimator {
  constructor() {
    this.bytes = 0;
  }
}
exports.SizeEstimator = SizeEstimator;
class OurReport {
  constructor(header) {
    this.header = header;
    this.tracesPerQuery = Object.create(null);
    this.endTime = null;
    this.sizeEstimator = new SizeEstimator();
  }
  addTrace({
    statsReportKey,
    trace,
    asTrace,
    includeTracesContributingToStats
  }) {
    const tracesAndStats = this.getTracesAndStats(statsReportKey);
    if (asTrace) {
      const encodedTrace = apollo_reporting_protobuf_1.Trace.encode(trace).finish();
      tracesAndStats.trace.push(encodedTrace);
      this.sizeEstimator.bytes += 2 + encodedTrace.length;
    } else {
      tracesAndStats.statsWithContext.addTrace(trace, this.sizeEstimator);
      if (includeTracesContributingToStats) {
        const encodedTrace = apollo_reporting_protobuf_1.Trace.encode(trace).finish();
        tracesAndStats.internalTracesContributingToStats.push(encodedTrace);
        this.sizeEstimator.bytes += 2 + encodedTrace.length;
      }
    }
  }
  getTracesAndStats(statsReportKey) {
    const existing = this.tracesPerQuery[statsReportKey];
    if (existing) {
      return existing;
    }
    this.sizeEstimator.bytes += estimatedBytesForString(statsReportKey);
    return this.tracesPerQuery[statsReportKey] = new OurTracesAndStats();
  }
}
exports.OurReport = OurReport;
class OurTracesAndStats {
  constructor() {
    this.trace = [];
    this.statsWithContext = new StatsByContext();
    this.internalTracesContributingToStats = [];
  }
}
class StatsByContext {
  constructor() {
    this.map = Object.create(null);
  }
  toArray() {
    return Object.values(this.map);
  }
  addTrace(trace, sizeEstimator) {
    this.getContextualizedStats(trace, sizeEstimator).addTrace(trace, sizeEstimator);
  }
  getContextualizedStats(trace, sizeEstimator) {
    const statsContext = {
      clientName: trace.clientName,
      clientVersion: trace.clientVersion,
      clientReferenceId: trace.clientReferenceId
    };
    const statsContextKey = JSON.stringify(statsContext);
    const existing = this.map[statsContextKey];
    if (existing) {
      return existing;
    }
    sizeEstimator.bytes += 20 + estimatedBytesForString(trace.clientName) + estimatedBytesForString(trace.clientVersion) + estimatedBytesForString(trace.clientReferenceId);
    const contextualizedStats = new OurContextualizedStats(statsContext);
    this.map[statsContextKey] = contextualizedStats;
    return contextualizedStats;
  }
}
class OurContextualizedStats {
  constructor(context) {
    this.context = context;
    this.queryLatencyStats = new OurQueryLatencyStats();
    this.perTypeStat = Object.create(null);
  }
  addTrace(trace, sizeEstimator) {
    var _a;
    this.queryLatencyStats.requestCount++;
    if (trace.fullQueryCacheHit) {
      this.queryLatencyStats.cacheLatencyCount.incrementDuration(trace.durationNs);
      this.queryLatencyStats.cacheHits++;
    } else {
      this.queryLatencyStats.latencyCount.incrementDuration(trace.durationNs);
    }
    if (!trace.fullQueryCacheHit && ((_a = trace.cachePolicy) === null || _a === void 0 ? void 0 : _a.maxAgeNs) != null) {
      switch (trace.cachePolicy.scope) {
        case apollo_reporting_protobuf_1.Trace.CachePolicy.Scope.PRIVATE:
          this.queryLatencyStats.privateCacheTtlCount.incrementDuration(trace.cachePolicy.maxAgeNs);
          break;
        case apollo_reporting_protobuf_1.Trace.CachePolicy.Scope.PUBLIC:
          this.queryLatencyStats.publicCacheTtlCount.incrementDuration(trace.cachePolicy.maxAgeNs);
          break;
      }
    }
    if (trace.persistedQueryHit) {
      this.queryLatencyStats.persistedQueryHits++;
    }
    if (trace.persistedQueryRegister) {
      this.queryLatencyStats.persistedQueryMisses++;
    }
    if (trace.forbiddenOperation) {
      this.queryLatencyStats.forbiddenOperationCount++;
    }
    if (trace.registeredOperation) {
      this.queryLatencyStats.registeredOperationCount++;
    }
    let hasError = false;
    const traceNodeStats = (node, path) => {
      var _a, _b, _c, _d, _e;
      if ((_a = node.error) === null || _a === void 0 ? void 0 : _a.length) {
        hasError = true;
        let currPathErrorStats = this.queryLatencyStats.rootErrorStats;
        path.toArray().forEach(subPath => {
          currPathErrorStats = currPathErrorStats.getChild(subPath, sizeEstimator);
        });
        currPathErrorStats.requestsWithErrorsCount += 1;
        currPathErrorStats.errorsCount += node.error.length;
      }
      const fieldName = node.originalFieldName || node.responseName;
      if (node.parentType && fieldName && node.type && node.endTime != null && node.startTime != null && node.endTime >= node.startTime) {
        const typeStat = this.getTypeStat(node.parentType, sizeEstimator);
        const fieldStat = typeStat.getFieldStat(fieldName, node.type, sizeEstimator);
        fieldStat.errorsCount += (_c = (_b = node.error) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0;
        fieldStat.count++;
        fieldStat.requestsWithErrorsCount += ((_e = (_d = node.error) === null || _d === void 0 ? void 0 : _d.length) !== null && _e !== void 0 ? _e : 0) > 0 ? 1 : 0;
        fieldStat.latencyCount.incrementDuration(node.endTime - node.startTime);
      }
      return false;
    };
    iterateOverTrace_1.iterateOverTrace(trace, traceNodeStats, true);
    if (hasError) {
      this.queryLatencyStats.requestsWithErrorsCount++;
    }
  }
  getTypeStat(parentType, sizeEstimator) {
    const existing = this.perTypeStat[parentType];
    if (existing) {
      return existing;
    }
    sizeEstimator.bytes += estimatedBytesForString(parentType);
    const typeStat = new OurTypeStat();
    this.perTypeStat[parentType] = typeStat;
    return typeStat;
  }
}
exports.OurContextualizedStats = OurContextualizedStats;
class OurQueryLatencyStats {
  constructor() {
    this.latencyCount = new durationHistogram_1.DurationHistogram();
    this.requestCount = 0;
    this.cacheHits = 0;
    this.persistedQueryHits = 0;
    this.persistedQueryMisses = 0;
    this.cacheLatencyCount = new durationHistogram_1.DurationHistogram();
    this.rootErrorStats = new OurPathErrorStats();
    this.requestsWithErrorsCount = 0;
    this.publicCacheTtlCount = new durationHistogram_1.DurationHistogram();
    this.privateCacheTtlCount = new durationHistogram_1.DurationHistogram();
    this.registeredOperationCount = 0;
    this.forbiddenOperationCount = 0;
  }
}
class OurPathErrorStats {
  constructor() {
    this.children = Object.create(null);
    this.errorsCount = 0;
    this.requestsWithErrorsCount = 0;
  }
  getChild(subPath, sizeEstimator) {
    const existing = this.children[subPath];
    if (existing) {
      return existing;
    }
    const child = new OurPathErrorStats();
    this.children[subPath] = child;
    sizeEstimator.bytes += estimatedBytesForString(subPath) + 4;
    return child;
  }
}
class OurTypeStat {
  constructor() {
    this.perFieldStat = Object.create(null);
  }
  getFieldStat(fieldName, returnType, sizeEstimator) {
    const existing = this.perFieldStat[fieldName];
    if (existing) {
      return existing;
    }
    sizeEstimator.bytes += estimatedBytesForString(fieldName) + estimatedBytesForString(returnType) + 10;
    const fieldStat = new OurFieldStat(returnType);
    this.perFieldStat[fieldName] = fieldStat;
    return fieldStat;
  }
}
class OurFieldStat {
  constructor(returnType) {
    this.returnType = returnType;
    this.errorsCount = 0;
    this.count = 0;
    this.requestsWithErrorsCount = 0;
    this.latencyCount = new durationHistogram_1.DurationHistogram();
  }
}
function estimatedBytesForString(s) {
  return 2 + Buffer.byteLength(s);
}

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/usageReporting/traceDetails.js":
/*!**********************************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/plugin/usageReporting/traceDetails.js ***!
  \**********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeTraceDetails = void 0;
const apollo_reporting_protobuf_1 = __webpack_require__(/*! apollo-reporting-protobuf */ "apollo-reporting-protobuf");
function makeTraceDetails(variables, sendVariableValues, operationString) {
  const details = new apollo_reporting_protobuf_1.Trace.Details();
  const variablesToRecord = (() => {
    if (sendVariableValues && 'transform' in sendVariableValues) {
      const originalKeys = Object.keys(variables);
      try {
        const modifiedVariables = sendVariableValues.transform({
          variables: variables,
          operationString: operationString
        });
        return cleanModifiedVariables(originalKeys, modifiedVariables);
      } catch (e) {
        return handleVariableValueTransformError(originalKeys);
      }
    } else {
      return variables;
    }
  })();
  Object.keys(variablesToRecord).forEach(name => {
    if (!sendVariableValues || 'none' in sendVariableValues && sendVariableValues.none || 'all' in sendVariableValues && !sendVariableValues.all || 'exceptNames' in sendVariableValues && sendVariableValues.exceptNames.includes(name) || 'onlyNames' in sendVariableValues && !sendVariableValues.onlyNames.includes(name)) {
      details.variablesJson[name] = '';
    } else {
      try {
        details.variablesJson[name] = typeof variablesToRecord[name] === 'undefined' ? '' : JSON.stringify(variablesToRecord[name]);
      } catch (e) {
        details.variablesJson[name] = JSON.stringify('[Unable to convert value to JSON]');
      }
    }
  });
  return details;
}
exports.makeTraceDetails = makeTraceDetails;
function handleVariableValueTransformError(variableNames) {
  const modifiedVariables = Object.create(null);
  variableNames.forEach(name => {
    modifiedVariables[name] = '[PREDICATE_FUNCTION_ERROR]';
  });
  return modifiedVariables;
}
function cleanModifiedVariables(originalKeys, modifiedVariables) {
  const cleanedVariables = Object.create(null);
  originalKeys.forEach(name => {
    cleanedVariables[name] = modifiedVariables[name];
  });
  return cleanedVariables;
}

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/processFileUploads.js":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/processFileUploads.js ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const runtimeSupportsUploads_1 = __importDefault(__webpack_require__(/*! ./utils/runtimeSupportsUploads */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/utils/runtimeSupportsUploads.js"));
const processFileUploads = (() => {
  if (runtimeSupportsUploads_1.default) {
    return __webpack_require__(/*! @apollographql/graphql-upload-8-fork */ "./node_modules/graphpack/node_modules/@apollographql/graphql-upload-8-fork/lib/index.js").processRequest;
  }
  return undefined;
})();
exports.default = processFileUploads;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/requestPipeline.js":
/*!***************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/requestPipeline.js ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processGraphQLRequest = exports.APQ_CACHE_PREFIX = exports.InvalidGraphQLRequestError = void 0;
const graphql_1 = __webpack_require__(/*! graphql */ "graphql");
const graphql_extensions_1 = __webpack_require__(/*! graphql-extensions */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/graphql-extensions/dist/index.js");
const schemaInstrumentation_1 = __webpack_require__(/*! ./utils/schemaInstrumentation */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/utils/schemaInstrumentation.js");
const apollo_server_errors_1 = __webpack_require__(/*! apollo-server-errors */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-errors/dist/index.js");
const apollo_server_types_1 = __webpack_require__(/*! apollo-server-types */ "./node_modules/graphpack/node_modules/apollo-server-types/dist/index.js");
Object.defineProperty(exports, "InvalidGraphQLRequestError", {
  enumerable: true,
  get: function () {
    return apollo_server_types_1.InvalidGraphQLRequestError;
  }
});
const dispatcher_1 = __webpack_require__(/*! ./utils/dispatcher */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/utils/dispatcher.js");
const apollo_server_caching_1 = __webpack_require__(/*! apollo-server-caching */ "apollo-server-caching");
const createSHA_1 = __importDefault(__webpack_require__(/*! ./utils/createSHA */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/utils/createSHA.js"));
const runHttpQuery_1 = __webpack_require__(/*! ./runHttpQuery */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/runHttpQuery.js");
exports.APQ_CACHE_PREFIX = 'apq:';
function computeQueryHash(query) {
  return createSHA_1.default('sha256').update(query).digest('hex');
}
const symbolExtensionDeprecationDone = Symbol("apolloServerExtensionDeprecationDone");
function processGraphQLRequest(config, requestContext) {
  var _a;
  return __awaiter(this, void 0, void 0, function* () {
    const logger = requestContext.logger || console;
    const metrics = requestContext.metrics = requestContext.metrics || Object.create(null);
    const extensionStack = initializeExtensionStack();
    requestContext.context._extensionStack = extensionStack;
    const dispatcher = initializeRequestListenerDispatcher();
    yield initializeDataSources();
    const request = requestContext.request;
    let {
      query,
      extensions
    } = request;
    let queryHash;
    let persistedQueryCache;
    metrics.persistedQueryHit = false;
    metrics.persistedQueryRegister = false;
    if (extensions && extensions.persistedQuery) {
      if (!config.persistedQueries || !config.persistedQueries.cache) {
        return yield emitErrorAndThrow(new apollo_server_errors_1.PersistedQueryNotSupportedError());
      } else if (extensions.persistedQuery.version !== 1) {
        return yield emitErrorAndThrow(new apollo_server_types_1.InvalidGraphQLRequestError('Unsupported persisted query version'));
      }
      persistedQueryCache = config.persistedQueries.cache;
      if (!(persistedQueryCache instanceof apollo_server_caching_1.PrefixingKeyValueCache)) {
        persistedQueryCache = new apollo_server_caching_1.PrefixingKeyValueCache(persistedQueryCache, exports.APQ_CACHE_PREFIX);
      }
      queryHash = extensions.persistedQuery.sha256Hash;
      if (query === undefined) {
        query = yield persistedQueryCache.get(queryHash);
        if (query) {
          metrics.persistedQueryHit = true;
        } else {
          return yield emitErrorAndThrow(new apollo_server_errors_1.PersistedQueryNotFoundError());
        }
      } else {
        const computedQueryHash = computeQueryHash(query);
        if (queryHash !== computedQueryHash) {
          return yield emitErrorAndThrow(new apollo_server_types_1.InvalidGraphQLRequestError('provided sha does not match query'));
        }
        metrics.persistedQueryRegister = true;
      }
    } else if (query) {
      queryHash = computeQueryHash(query);
    } else {
      return yield emitErrorAndThrow(new apollo_server_types_1.InvalidGraphQLRequestError('Must provide query string.'));
    }
    requestContext.queryHash = queryHash;
    requestContext.source = query;
    yield dispatcher.invokeHookAsync('didResolveSource', requestContext);
    const requestDidEnd = extensionStack.requestDidStart({
      request: request.http,
      queryString: request.query,
      operationName: request.operationName,
      variables: request.variables,
      extensions: request.extensions,
      context: requestContext.context,
      persistedQueryHit: metrics.persistedQueryHit,
      persistedQueryRegister: metrics.persistedQueryRegister,
      requestContext: requestContext
    });
    try {
      if (config.documentStore) {
        try {
          requestContext.document = yield config.documentStore.get(queryHash);
        } catch (err) {
          logger.warn('An error occurred while attempting to read from the documentStore. ' + (err && err.message) || false);
        }
      }
      if (!requestContext.document) {
        const parsingDidEnd = yield dispatcher.invokeDidStartHook('parsingDidStart', requestContext);
        try {
          requestContext.document = parse(query, config.parseOptions);
          parsingDidEnd();
        } catch (syntaxError) {
          parsingDidEnd(syntaxError);
          return yield sendErrorResponse(syntaxError, apollo_server_errors_1.SyntaxError);
        }
        const validationDidEnd = yield dispatcher.invokeDidStartHook('validationDidStart', requestContext);
        const validationErrors = validate(requestContext.document);
        if (validationErrors.length === 0) {
          validationDidEnd();
        } else {
          validationDidEnd(validationErrors);
          return yield sendErrorResponse(validationErrors, apollo_server_errors_1.ValidationError);
        }
        if (config.documentStore) {
          Promise.resolve(config.documentStore.set(queryHash, requestContext.document)).catch(err => logger.warn('Could not store validated document. ' + (err && err.message) || false));
        }
      }
      const operation = graphql_1.getOperationAST(requestContext.document, request.operationName);
      requestContext.operation = operation || undefined;
      requestContext.operationName = operation && operation.name && operation.name.value || null;
      try {
        yield dispatcher.invokeHookAsync('didResolveOperation', requestContext);
      } catch (err) {
        if (err instanceof runHttpQuery_1.HttpQueryError) {
          const graphqlError = new graphql_1.GraphQLError(err.message);
          graphqlError.stack = err.stack;
          yield didEncounterErrors([graphqlError]);
          throw err;
        }
        return yield sendErrorResponse(err);
      }
      if (metrics.persistedQueryRegister && persistedQueryCache) {
        Promise.resolve(persistedQueryCache.set(queryHash, query, config.persistedQueries && typeof config.persistedQueries.ttl !== 'undefined' ? {
          ttl: config.persistedQueries.ttl
        } : Object.create(null))).catch(logger.warn);
      }
      let response = yield dispatcher.invokeHooksUntilNonNull('responseForOperation', requestContext);
      if (response == null) {
        const executionListeners = [];
        dispatcher.invokeHookSync('executionDidStart', requestContext).forEach(executionListener => {
          if (typeof executionListener === 'function') {
            executionListeners.push({
              executionDidEnd: executionListener
            });
          } else if (typeof executionListener === 'object') {
            executionListeners.push(executionListener);
          }
        });
        const executionDispatcher = new dispatcher_1.Dispatcher(executionListeners);
        const invokeWillResolveField = (...args) => executionDispatcher.invokeDidStartHook('willResolveField', ...args);
        Object.defineProperty(requestContext.context, schemaInstrumentation_1.symbolExecutionDispatcherWillResolveField, {
          value: invokeWillResolveField
        });
        if (config.fieldResolver) {
          Object.defineProperty(requestContext.context, schemaInstrumentation_1.symbolUserFieldResolver, {
            value: config.fieldResolver
          });
        }
        schemaInstrumentation_1.enablePluginsForSchemaResolvers(config.schema);
        try {
          const result = yield execute(requestContext);
          const resultErrors = (_a = result.errors) === null || _a === void 0 ? void 0 : _a.map(e => {
            var _a;
            if (((_a = e.nodes) === null || _a === void 0 ? void 0 : _a.length) === 1 && e.nodes[0].kind === graphql_1.Kind.VARIABLE_DEFINITION && e.message.startsWith(`Variable "$${e.nodes[0].variable.name.value}" got invalid value `)) {
              return apollo_server_errors_1.fromGraphQLError(e, {
                errorClass: apollo_server_errors_1.UserInputError
              });
            }
            return e;
          });
          if (resultErrors) {
            yield didEncounterErrors(resultErrors);
          }
          response = Object.assign(Object.assign({}, result), {
            errors: resultErrors ? formatErrors(resultErrors) : undefined
          });
          executionDispatcher.reverseInvokeHookSync('executionDidEnd');
        } catch (executionError) {
          executionDispatcher.reverseInvokeHookSync("executionDidEnd", executionError);
          return yield sendErrorResponse(executionError);
        }
      }
      const formattedExtensions = extensionStack.format();
      if (Object.keys(formattedExtensions).length > 0) {
        response.extensions = formattedExtensions;
      }
      if (config.formatResponse) {
        const formattedResponse = config.formatResponse(response, requestContext);
        if (formattedResponse != null) {
          response = formattedResponse;
        }
      }
      return sendResponse(response);
    } finally {
      requestDidEnd();
    }
    function parse(query, parseOptions) {
      const parsingDidEnd = extensionStack.parsingDidStart({
        queryString: query
      });
      try {
        return graphql_1.parse(query, parseOptions);
      } finally {
        parsingDidEnd();
      }
    }
    function validate(document) {
      let rules = graphql_1.specifiedRules;
      if (config.validationRules) {
        rules = rules.concat(config.validationRules);
      }
      const validationDidEnd = extensionStack.validationDidStart();
      try {
        return graphql_1.validate(config.schema, document, rules);
      } finally {
        validationDidEnd();
      }
    }
    function execute(requestContext) {
      return __awaiter(this, void 0, void 0, function* () {
        const {
          request,
          document
        } = requestContext;
        const executionArgs = {
          schema: config.schema,
          document,
          rootValue: typeof config.rootValue === 'function' ? config.rootValue(document) : config.rootValue,
          contextValue: requestContext.context,
          variableValues: request.variables,
          operationName: request.operationName,
          fieldResolver: config.fieldResolver
        };
        const executionDidEnd = extensionStack.executionDidStart({
          executionArgs
        });
        try {
          if (config.executor) {
            return yield config.executor(requestContext);
          } else {
            return yield graphql_1.execute(executionArgs);
          }
        } finally {
          executionDidEnd();
        }
      });
    }
    function sendResponse(response) {
      return __awaiter(this, void 0, void 0, function* () {
        requestContext.response = extensionStack.willSendResponse({
          graphqlResponse: Object.assign(Object.assign({}, requestContext.response), {
            errors: response.errors,
            data: response.data,
            extensions: response.extensions
          }),
          context: requestContext.context
        }).graphqlResponse;
        yield dispatcher.invokeHookAsync('willSendResponse', requestContext);
        return requestContext.response;
      });
    }
    function emitErrorAndThrow(error) {
      return __awaiter(this, void 0, void 0, function* () {
        yield didEncounterErrors([error]);
        throw error;
      });
    }
    function didEncounterErrors(errors) {
      return __awaiter(this, void 0, void 0, function* () {
        requestContext.errors = errors;
        extensionStack.didEncounterErrors(errors);
        return yield dispatcher.invokeHookAsync('didEncounterErrors', requestContext);
      });
    }
    function sendErrorResponse(errorOrErrors, errorClass) {
      return __awaiter(this, void 0, void 0, function* () {
        const errors = Array.isArray(errorOrErrors) ? errorOrErrors : [errorOrErrors];
        yield didEncounterErrors(errors);
        return sendResponse({
          errors: formatErrors(errors.map(err => apollo_server_errors_1.fromGraphQLError(err, errorClass && {
            errorClass
          })))
        });
      });
    }
    function formatErrors(errors) {
      return apollo_server_errors_1.formatApolloErrors(errors, {
        formatter: config.formatError,
        debug: requestContext.debug
      });
    }
    function initializeRequestListenerDispatcher() {
      const requestListeners = [];
      if (config.plugins) {
        for (const plugin of config.plugins) {
          if (!plugin.requestDidStart) continue;
          const listener = plugin.requestDidStart(requestContext);
          if (listener) {
            requestListeners.push(listener);
          }
        }
      }
      return new dispatcher_1.Dispatcher(requestListeners);
    }
    function initializeExtensionStack() {
      var _a;
      if ((_a = config.extensions) === null || _a === void 0 ? void 0 : _a.length) {
        graphql_extensions_1.enableGraphQLExtensions(config.schema);
      }
      const extensions = config.extensions ? config.extensions.map(f => f()) : [];
      const hasOwn = Object.prototype.hasOwnProperty;
      extensions.forEach(extension => {
        if (!extension.constructor || hasOwn.call(extension.constructor, symbolExtensionDeprecationDone)) {
          return;
        }
        Object.defineProperty(extension.constructor, symbolExtensionDeprecationDone, {
          value: true
        });
        const extensionName = extension.constructor.name;
        logger.warn('[deprecated] ' + (extensionName ? 'A "' + extensionName + '" ' : 'An anonymous extension ') + 'was defined within the "extensions" configuration for ' + 'Apollo Server.  The API on which this extension is built ' + '("graphql-extensions") is being deprecated in the next major ' + 'version of Apollo Server in favor of the new plugin API.  See ' + 'https://go.apollo.dev/s/plugins for the documentation on how ' + 'these plugins are to be defined and used.');
      });
      return new graphql_extensions_1.GraphQLExtensionStack(extensions);
    }
    function initializeDataSources() {
      return __awaiter(this, void 0, void 0, function* () {
        if (config.dataSources) {
          const context = requestContext.context;
          const dataSources = config.dataSources();
          const initializers = [];
          for (const dataSource of Object.values(dataSources)) {
            if (dataSource.initialize) {
              initializers.push(dataSource.initialize({
                context,
                cache: requestContext.cache
              }));
            }
          }
          yield Promise.all(initializers);
          if ('dataSources' in context) {
            throw new Error('Please use the dataSources config option instead of putting dataSources on the context yourself.');
          }
          context.dataSources = dataSources;
        }
      });
    }
  });
}
exports.processGraphQLRequest = processGraphQLRequest;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/requestPipelineAPI.js":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/requestPipelineAPI.js ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var apollo_server_types_1 = __webpack_require__(/*! apollo-server-types */ "./node_modules/graphpack/node_modules/apollo-server-types/dist/index.js");
Object.defineProperty(exports, "InvalidGraphQLRequestError", {
  enumerable: true,
  get: function () {
    return apollo_server_types_1.InvalidGraphQLRequestError;
  }
});

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/runHttpQuery.js":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/runHttpQuery.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cloneObject = exports.processHTTPRequest = exports.runHttpQuery = exports.throwHttpGraphQLError = exports.HttpQueryError = void 0;
const apollo_server_env_1 = __webpack_require__(/*! apollo-server-env */ "apollo-server-env");
const graphqlOptions_1 = __webpack_require__(/*! ./graphqlOptions */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/graphqlOptions.js");
const apollo_server_errors_1 = __webpack_require__(/*! apollo-server-errors */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-errors/dist/index.js");
const requestPipeline_1 = __webpack_require__(/*! ./requestPipeline */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/requestPipeline.js");
class HttpQueryError extends Error {
  constructor(statusCode, message, isGraphQLError = false, headers) {
    super(message);
    this.name = 'HttpQueryError';
    this.statusCode = statusCode;
    this.isGraphQLError = isGraphQLError;
    this.headers = headers;
  }
}
exports.HttpQueryError = HttpQueryError;
function throwHttpGraphQLError(statusCode, errors, options, extensions) {
  const defaultHeaders = {
    'Content-Type': 'application/json'
  };
  const headers = apollo_server_errors_1.hasPersistedQueryError(errors) ? Object.assign(Object.assign({}, defaultHeaders), {
    'Cache-Control': 'private, no-cache, must-revalidate'
  }) : defaultHeaders;
  const result = {
    errors: options ? apollo_server_errors_1.formatApolloErrors(errors, {
      debug: options.debug,
      formatter: options.formatError
    }) : errors
  };
  if (extensions) {
    result.extensions = extensions;
  }
  throw new HttpQueryError(statusCode, prettyJSONStringify(result), true, headers);
}
exports.throwHttpGraphQLError = throwHttpGraphQLError;
function runHttpQuery(handlerArguments, request) {
  return __awaiter(this, void 0, void 0, function* () {
    let options;
    const debugDefault =  true && "development" !== 'test';
    try {
      options = yield graphqlOptions_1.resolveGraphqlOptions(request.options, ...handlerArguments);
    } catch (e) {
      return throwHttpGraphQLError(500, [e], {
        debug: debugDefault
      });
    }
    if (options.debug === undefined) {
      options.debug = debugDefault;
    }
    if (typeof options.context === 'function') {
      try {
        options.context();
      } catch (e) {
        e.message = `Context creation failed: ${e.message}`;
        if (e.extensions && e.extensions.code && e.extensions.code !== 'INTERNAL_SERVER_ERROR') {
          return throwHttpGraphQLError(400, [e], options);
        } else {
          return throwHttpGraphQLError(500, [e], options);
        }
      }
    }
    const config = {
      schema: options.schema,
      schemaHash: options.schemaHash,
      logger: options.logger,
      rootValue: options.rootValue,
      context: options.context || {},
      validationRules: options.validationRules,
      executor: options.executor,
      fieldResolver: options.fieldResolver,
      cache: options.cache,
      dataSources: options.dataSources,
      documentStore: options.documentStore,
      extensions: options.extensions,
      persistedQueries: options.persistedQueries,
      tracing: options.tracing,
      formatError: options.formatError,
      formatResponse: options.formatResponse,
      debug: options.debug,
      plugins: options.plugins || []
    };
    return processHTTPRequest(config, request);
  });
}
exports.runHttpQuery = runHttpQuery;
function processHTTPRequest(options, httpRequest) {
  return __awaiter(this, void 0, void 0, function* () {
    let requestPayload;
    switch (httpRequest.method) {
      case 'POST':
        if (!httpRequest.query || Object.keys(httpRequest.query).length === 0) {
          throw new HttpQueryError(500, 'POST body missing. Did you forget use body-parser middleware?');
        }
        requestPayload = httpRequest.query;
        break;
      case 'GET':
        if (!httpRequest.query || Object.keys(httpRequest.query).length === 0) {
          throw new HttpQueryError(400, 'GET query missing.');
        }
        requestPayload = httpRequest.query;
        break;
      default:
        throw new HttpQueryError(405, 'Apollo Server supports only GET/POST requests.', false, {
          Allow: 'GET, POST'
        });
    }
    options = Object.assign(Object.assign({}, options), {
      plugins: [checkOperationPlugin, ...options.plugins]
    });
    function buildRequestContext(request) {
      const context = cloneObject(options.context);
      return {
        logger: options.logger || console,
        schema: options.schema,
        schemaHash: options.schemaHash,
        request,
        response: {
          http: {
            headers: new apollo_server_env_1.Headers()
          }
        },
        context,
        cache: options.cache,
        debug: options.debug,
        metrics: {}
      };
    }
    const responseInit = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    let body;
    try {
      if (Array.isArray(requestPayload)) {
        const requests = requestPayload.map(requestParams => parseGraphQLRequest(httpRequest.request, requestParams));
        const responses = yield Promise.all(requests.map(request => __awaiter(this, void 0, void 0, function* () {
          try {
            const requestContext = buildRequestContext(request);
            return yield requestPipeline_1.processGraphQLRequest(options, requestContext);
          } catch (error) {
            return {
              errors: apollo_server_errors_1.formatApolloErrors([error], options)
            };
          }
        })));
        body = prettyJSONStringify(responses.map(serializeGraphQLResponse));
      } else {
        const request = parseGraphQLRequest(httpRequest.request, requestPayload);
        try {
          const requestContext = buildRequestContext(request);
          const response = yield requestPipeline_1.processGraphQLRequest(options, requestContext);
          if (response.errors && typeof response.data === 'undefined') {
            return throwHttpGraphQLError(response.http && response.http.status || 400, response.errors, undefined, response.extensions);
          }
          if (response.http) {
            for (const [name, value] of response.http.headers) {
              responseInit.headers[name] = value;
            }
          }
          body = prettyJSONStringify(serializeGraphQLResponse(response));
        } catch (error) {
          if (error instanceof requestPipeline_1.InvalidGraphQLRequestError) {
            throw new HttpQueryError(400, error.message);
          } else if (error instanceof apollo_server_errors_1.PersistedQueryNotSupportedError || error instanceof apollo_server_errors_1.PersistedQueryNotFoundError) {
            return throwHttpGraphQLError(200, [error], options);
          } else {
            throw error;
          }
        }
      }
    } catch (error) {
      if (error instanceof HttpQueryError) {
        throw error;
      }
      return throwHttpGraphQLError(500, [error], options);
    }
    responseInit.headers['Content-Length'] = Buffer.byteLength(body, 'utf8').toString();
    return {
      graphqlResponse: body,
      responseInit
    };
  });
}
exports.processHTTPRequest = processHTTPRequest;
function parseGraphQLRequest(httpRequest, requestParams) {
  let queryString = requestParams.query;
  let extensions = requestParams.extensions;
  if (typeof extensions === 'string' && extensions !== '') {
    try {
      extensions = JSON.parse(extensions);
    } catch (error) {
      throw new HttpQueryError(400, 'Extensions are invalid JSON.');
    }
  }
  if (queryString && typeof queryString !== 'string') {
    if (queryString.kind === 'Document') {
      throw new HttpQueryError(400, "GraphQL queries must be strings. It looks like you're sending the " + 'internal graphql-js representation of a parsed query in your ' + 'request instead of a request in the GraphQL query language. You ' + 'can convert an AST to a string using the `print` function from ' + '`graphql`, or use a client like `apollo-client` which converts ' + 'the internal representation to a string for you.');
    } else {
      throw new HttpQueryError(400, 'GraphQL queries must be strings.');
    }
  }
  const operationName = requestParams.operationName;
  let variables = requestParams.variables;
  if (typeof variables === 'string' && variables !== '') {
    try {
      variables = JSON.parse(variables);
    } catch (error) {
      throw new HttpQueryError(400, 'Variables are invalid JSON.');
    }
  }
  return {
    query: queryString,
    operationName,
    variables,
    extensions,
    http: httpRequest
  };
}
const checkOperationPlugin = {
  requestDidStart() {
    return {
      didResolveOperation({
        request,
        operation
      }) {
        if (!request.http) return;
        if (request.http.method === 'GET' && operation.operation !== 'query') {
          throw new HttpQueryError(405, `GET supports only query operation`, false, {
            Allow: 'POST'
          });
        }
      }
    };
  }
};
function serializeGraphQLResponse(response) {
  return {
    errors: response.errors,
    data: response.data,
    extensions: response.extensions
  };
}
function prettyJSONStringify(value) {
  return JSON.stringify(value) + '\n';
}
function cloneObject(object) {
  return Object.assign(Object.create(Object.getPrototypeOf(object)), object);
}
exports.cloneObject = cloneObject;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/types.js":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/types.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_extensions_1 = __webpack_require__(/*! graphql-extensions */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/graphql-extensions/dist/index.js");
Object.defineProperty(exports, "GraphQLExtension", {
  enumerable: true,
  get: function () {
    return graphql_extensions_1.GraphQLExtension;
  }
});

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/utils/createSHA.js":
/*!***************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/utils/createSHA.js ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const isNodeLike_1 = __importDefault(__webpack_require__(/*! ./isNodeLike */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/utils/isNodeLike.js"));
function default_1(kind) {
  if (isNodeLike_1.default) {
    return __webpack_require__(/*! crypto */ "crypto").createHash(kind);
  }
  return __webpack_require__(/*! sha.js */ "sha.js")(kind);
}
exports.default = default_1;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/utils/dispatcher.js":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/utils/dispatcher.js ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dispatcher = void 0;
class Dispatcher {
  constructor(targets) {
    this.targets = targets;
  }
  callTargets(targets, methodName, ...args) {
    return targets.map(target => {
      const method = target[methodName];
      if (method && typeof method === 'function') {
        return method.apply(target, args);
      }
    });
  }
  invokeHookAsync(methodName, ...args) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield Promise.all(this.callTargets(this.targets, methodName, ...args));
    });
  }
  invokeHookSync(methodName, ...args) {
    return this.callTargets(this.targets, methodName, ...args);
  }
  reverseInvokeHookSync(methodName, ...args) {
    return this.callTargets(this.targets.reverse(), methodName, ...args);
  }
  invokeHooksUntilNonNull(methodName, ...args) {
    return __awaiter(this, void 0, void 0, function* () {
      for (const target of this.targets) {
        const method = target[methodName];
        if (!(method && typeof method === 'function')) {
          continue;
        }
        const value = yield method.apply(target, args);
        if (value !== null) {
          return value;
        }
      }
      return null;
    });
  }
  invokeDidStartHook(methodName, ...args) {
    const didEndHooks = [];
    for (const target of this.targets) {
      const method = target[methodName];
      if (method && typeof method === 'function') {
        const didEndHook = method.apply(target, args);
        if (didEndHook) {
          didEndHooks.push(didEndHook);
        }
      }
    }
    return (...args) => {
      didEndHooks.reverse();
      for (const didEndHook of didEndHooks) {
        didEndHook(...args);
      }
    };
  }
}
exports.Dispatcher = Dispatcher;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/utils/isDirectiveDefined.js":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/utils/isDirectiveDefined.js ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDirectiveDefined = void 0;
const language_1 = __webpack_require__(/*! graphql/language */ "graphql/language");
const __1 = __webpack_require__(/*! ../ */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/index.js");
exports.isDirectiveDefined = (typeDefs, directiveName) => {
  typeDefs = Array.isArray(typeDefs) ? typeDefs : [typeDefs];
  return typeDefs.some(typeDef => {
    if (typeof typeDef === 'string') {
      typeDef = __1.gql(typeDef);
    }
    return typeDef.definitions.some(definition => definition.kind === language_1.Kind.DIRECTIVE_DEFINITION && definition.name.value === directiveName);
  });
};

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/utils/isNodeLike.js":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/utils/isNodeLike.js ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = typeof process === 'object' && process && process.release && process.versions && typeof process.versions.node === 'string';

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/utils/runtimeSupportsUploads.js":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/utils/runtimeSupportsUploads.js ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const isNodeLike_1 = __importDefault(__webpack_require__(/*! ./isNodeLike */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/utils/isNodeLike.js"));
const runtimeSupportsUploads = (() => {
  if (isNodeLike_1.default) {
    const [nodeMajor, nodeMinor] = process.versions.node.split('.', 2).map(segment => parseInt(segment, 10));
    if (nodeMajor < 8 || nodeMajor === 8 && nodeMinor < 5) {
      return false;
    }
    return true;
  }
  return false;
})();
exports.default = runtimeSupportsUploads;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/utils/schemaHash.js":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/utils/schemaHash.js ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateSchemaHash = void 0;
const language_1 = __webpack_require__(/*! graphql/language */ "graphql/language");
const execution_1 = __webpack_require__(/*! graphql/execution */ "graphql/execution");
const utilities_1 = __webpack_require__(/*! graphql/utilities */ "graphql/utilities");
const fast_json_stable_stringify_1 = __importDefault(__webpack_require__(/*! fast-json-stable-stringify */ "fast-json-stable-stringify"));
const createSHA_1 = __importDefault(__webpack_require__(/*! ./createSHA */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/utils/createSHA.js"));
function generateSchemaHash(schema) {
  const introspectionQuery = utilities_1.getIntrospectionQuery();
  const documentAST = language_1.parse(introspectionQuery);
  const result = execution_1.execute(schema, documentAST);
  if (result && typeof result.then === 'function') {
    throw new Error(['The introspection query is resolving asynchronously; execution of an introspection query is not expected to return a `Promise`.', '', 'Wrapped type resolvers should maintain the existing execution dynamics of the resolvers they wrap (i.e. async vs sync) or introspection types should be excluded from wrapping by checking them with `graphql/type`s, `isIntrospectionType` predicate function prior to wrapping.'].join('\n'));
  }
  if (!result || !result.data || !result.data.__schema) {
    throw new Error('Unable to generate server introspection document.');
  }
  const introspectionSchema = result.data.__schema;
  const stringifiedSchema = fast_json_stable_stringify_1.default(introspectionSchema);
  return createSHA_1.default('sha512').update(stringifiedSchema).digest('hex');
}
exports.generateSchemaHash = generateSchemaHash;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/utils/schemaInstrumentation.js":
/*!***************************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/dist/utils/schemaInstrumentation.js ***!
  \***************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.whenResultIsFinished = exports.enablePluginsForSchemaResolvers = exports.symbolPluginsEnabled = exports.symbolUserFieldResolver = exports.symbolExecutionDispatcherWillResolveField = void 0;
const type_1 = __webpack_require__(/*! graphql/type */ "graphql/type");
const execution_1 = __webpack_require__(/*! graphql/execution */ "graphql/execution");
exports.symbolExecutionDispatcherWillResolveField = Symbol("apolloServerExecutionDispatcherWillResolveField");
exports.symbolUserFieldResolver = Symbol("apolloServerUserFieldResolver");
exports.symbolPluginsEnabled = Symbol("apolloServerPluginsEnabled");
function enablePluginsForSchemaResolvers(schema) {
  if (schema[exports.symbolPluginsEnabled]) {
    return schema;
  }
  Object.defineProperty(schema, exports.symbolPluginsEnabled, {
    value: true
  });
  forEachField(schema, wrapField);
  return schema;
}
exports.enablePluginsForSchemaResolvers = enablePluginsForSchemaResolvers;
function wrapField(field) {
  const originalFieldResolve = field.resolve;
  field.resolve = (source, args, context, info) => {
    const parentPath = info.path.prev;
    const willResolveField = context === null || context === void 0 ? void 0 : context[exports.symbolExecutionDispatcherWillResolveField];
    const userFieldResolver = context === null || context === void 0 ? void 0 : context[exports.symbolUserFieldResolver];
    const didResolveField = typeof willResolveField === 'function' && willResolveField({
      source,
      args,
      context,
      info
    });
    const resolveObject = info.parentType.resolveObject;
    let whenObjectResolved;
    if (parentPath && resolveObject) {
      if (!parentPath.__fields) {
        parentPath.__fields = {};
      }
      parentPath.__fields[info.fieldName] = info.fieldNodes;
      whenObjectResolved = parentPath.__whenObjectResolved;
      if (!whenObjectResolved) {
        whenObjectResolved = Promise.resolve().then(() => {
          return resolveObject(source, parentPath.__fields, context, info);
        });
        parentPath.__whenObjectResolved = whenObjectResolved;
      }
    }
    const fieldResolver = originalFieldResolve || userFieldResolver || execution_1.defaultFieldResolver;
    try {
      let result;
      if (whenObjectResolved) {
        result = whenObjectResolved.then(resolvedObject => {
          return fieldResolver(resolvedObject, args, context, info);
        });
      } else {
        result = fieldResolver(source, args, context, info);
      }
      if (typeof didResolveField === "function") {
        whenResultIsFinished(result, didResolveField);
      }
      return result;
    } catch (error) {
      if (typeof didResolveField === "function") {
        didResolveField(error);
      }
      throw error;
    }
  };
  ;
}
function isPromise(x) {
  return x && typeof x.then === 'function';
}
function whenResultIsFinished(result, callback) {
  if (isPromise(result)) {
    result.then(r => callback(null, r), err => callback(err));
  } else if (Array.isArray(result)) {
    if (result.some(isPromise)) {
      Promise.all(result).then(r => callback(null, r), err => callback(err));
    } else {
      callback(null, result);
    }
  } else {
    callback(null, result);
  }
}
exports.whenResultIsFinished = whenResultIsFinished;
function forEachField(schema, fn) {
  const typeMap = schema.getTypeMap();
  Object.entries(typeMap).forEach(([typeName, type]) => {
    if (!type_1.getNamedType(type).name.startsWith('__') && type instanceof type_1.GraphQLObjectType) {
      const fields = type.getFields();
      Object.entries(fields).forEach(([fieldName, field]) => {
        fn(field, typeName, fieldName);
      });
    }
  });
}

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/index.js":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/index.js ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }
  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hideLiterals = exports.hideStringAndNumericLiterals = exports.printWithReducedWhitespace = exports.defaultEngineReportingSignature = exports.operationHash = exports.operationRegistrySignature = exports.defaultUsageReportingSignature = exports.defaultOperationRegistrySignature = void 0;
var operationId_1 = __webpack_require__(/*! ./operationId */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/operationId.js");
Object.defineProperty(exports, "defaultOperationRegistrySignature", {
  enumerable: true,
  get: function () {
    return operationId_1.defaultOperationRegistrySignature;
  }
});
Object.defineProperty(exports, "defaultUsageReportingSignature", {
  enumerable: true,
  get: function () {
    return operationId_1.defaultUsageReportingSignature;
  }
});
Object.defineProperty(exports, "operationRegistrySignature", {
  enumerable: true,
  get: function () {
    return operationId_1.operationRegistrySignature;
  }
});
Object.defineProperty(exports, "operationHash", {
  enumerable: true,
  get: function () {
    return operationId_1.operationHash;
  }
});
Object.defineProperty(exports, "defaultEngineReportingSignature", {
  enumerable: true,
  get: function () {
    return operationId_1.defaultUsageReportingSignature;
  }
});
__exportStar(__webpack_require__(/*! ./schema */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/schema/index.js"), exports);
var transforms_1 = __webpack_require__(/*! ./transforms */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/transforms.js");
Object.defineProperty(exports, "printWithReducedWhitespace", {
  enumerable: true,
  get: function () {
    return transforms_1.printWithReducedWhitespace;
  }
});
Object.defineProperty(exports, "hideStringAndNumericLiterals", {
  enumerable: true,
  get: function () {
    return transforms_1.hideStringAndNumericLiterals;
  }
});
Object.defineProperty(exports, "hideLiterals", {
  enumerable: true,
  get: function () {
    return transforms_1.hideLiterals;
  }
});

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/operationId.js":
/*!**************************************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/operationId.js ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.operationHash = exports.defaultOperationRegistrySignature = exports.operationRegistrySignature = exports.defaultUsageReportingSignature = void 0;
const transforms_1 = __webpack_require__(/*! ./transforms */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/transforms.js");
const createHash_1 = __webpack_require__(/*! ./utilities/createHash */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/utilities/createHash.js");
function defaultUsageReportingSignature(ast, operationName) {
  return (0, transforms_1.printWithReducedWhitespace)((0, transforms_1.sortAST)((0, transforms_1.removeAliases)((0, transforms_1.hideLiterals)((0, transforms_1.dropUnusedDefinitions)(ast, operationName)))));
}
exports.defaultUsageReportingSignature = defaultUsageReportingSignature;
function operationRegistrySignature(ast, operationName, options = {
  preserveStringAndNumericLiterals: false
}) {
  const withoutUnusedDefs = (0, transforms_1.dropUnusedDefinitions)(ast, operationName);
  const maybeWithLiterals = options.preserveStringAndNumericLiterals ? withoutUnusedDefs : (0, transforms_1.hideStringAndNumericLiterals)(withoutUnusedDefs);
  return (0, transforms_1.printWithReducedWhitespace)((0, transforms_1.sortAST)(maybeWithLiterals));
}
exports.operationRegistrySignature = operationRegistrySignature;
function defaultOperationRegistrySignature(ast, operationName) {
  return operationRegistrySignature(ast, operationName, {
    preserveStringAndNumericLiterals: false
  });
}
exports.defaultOperationRegistrySignature = defaultOperationRegistrySignature;
function operationHash(operation) {
  return (0, createHash_1.createHash)("sha256").update(operation).digest("hex");
}
exports.operationHash = operationHash;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/schema/GraphQLSchemaValidationError.js":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/schema/GraphQLSchemaValidationError.js ***!
  \**************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GraphQLSchemaValidationError = void 0;
class GraphQLSchemaValidationError extends Error {
  constructor(errors) {
    super();
    this.errors = errors;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.message = errors.map(error => error.message).join("\n\n");
  }
}
exports.GraphQLSchemaValidationError = GraphQLSchemaValidationError;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/schema/buildSchemaFromSDL.js":
/*!****************************************************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/schema/buildSchemaFromSDL.js ***!
  \****************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addResolversToSchema = exports.buildSchemaFromSDL = exports.modulesFromSDL = void 0;
const graphql_1 = __webpack_require__(/*! graphql */ "graphql");
const validate_1 = __webpack_require__(/*! graphql/validation/validate */ "graphql/validation/validate");
const graphql_2 = __webpack_require__(/*! ../utilities/graphql */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/utilities/graphql.js");
const GraphQLSchemaValidationError_1 = __webpack_require__(/*! ./GraphQLSchemaValidationError */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/schema/GraphQLSchemaValidationError.js");
const specifiedRules_1 = __webpack_require__(/*! graphql/validation/specifiedRules */ "graphql/validation/specifiedRules");
const flat_1 = __importDefault(__webpack_require__(/*! core-js-pure/features/array/flat */ "core-js-pure/features/array/flat"));
const validation_1 = __webpack_require__(/*! graphql/validation */ "graphql/validation");
const mapValues_1 = __webpack_require__(/*! ../utilities/mapValues */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/utilities/mapValues.js");
const skippedSDLRules = [validation_1.KnownTypeNamesRule, validation_1.UniqueDirectivesPerLocationRule];
try {
  const PossibleTypeExtensions = __webpack_require__(/*! graphql/validation/rules/PossibleTypeExtensions */ "graphql/validation/rules/PossibleTypeExtensions").PossibleTypeExtensions;
  if (PossibleTypeExtensions) {
    skippedSDLRules.push(PossibleTypeExtensions);
  }
} catch (e) {}
const sdlRules = specifiedRules_1.specifiedSDLRules.filter(rule => !skippedSDLRules.includes(rule));
function modulesFromSDL(modulesOrSDL) {
  if (Array.isArray(modulesOrSDL)) {
    return modulesOrSDL.map(moduleOrSDL => {
      if ((0, graphql_2.isNode)(moduleOrSDL) && (0, graphql_2.isDocumentNode)(moduleOrSDL)) {
        return {
          typeDefs: moduleOrSDL
        };
      } else {
        return moduleOrSDL;
      }
    });
  } else {
    return [{
      typeDefs: modulesOrSDL
    }];
  }
}
exports.modulesFromSDL = modulesFromSDL;
function buildSchemaFromSDL(modulesOrSDL, schemaToExtend) {
  const modules = modulesFromSDL(modulesOrSDL);
  const documentAST = (0, graphql_1.concatAST)(modules.map(module => module.typeDefs));
  const errors = (0, validate_1.validateSDL)(documentAST, schemaToExtend, sdlRules);
  if (errors.length > 0) {
    throw new GraphQLSchemaValidationError_1.GraphQLSchemaValidationError(errors);
  }
  const definitionsMap = Object.create(null);
  const extensionsMap = Object.create(null);
  const directiveDefinitions = [];
  const schemaDefinitions = [];
  const schemaExtensions = [];
  const schemaDirectives = [];
  for (const definition of documentAST.definitions) {
    if ((0, graphql_1.isTypeDefinitionNode)(definition)) {
      const typeName = definition.name.value;
      if (definitionsMap[typeName]) {
        definitionsMap[typeName].push(definition);
      } else {
        definitionsMap[typeName] = [definition];
      }
    } else if ((0, graphql_1.isTypeExtensionNode)(definition)) {
      const typeName = definition.name.value;
      if (extensionsMap[typeName]) {
        extensionsMap[typeName].push(definition);
      } else {
        extensionsMap[typeName] = [definition];
      }
    } else if (definition.kind === graphql_1.Kind.DIRECTIVE_DEFINITION) {
      directiveDefinitions.push(definition);
    } else if (definition.kind === graphql_1.Kind.SCHEMA_DEFINITION) {
      schemaDefinitions.push(definition);
      schemaDirectives.push(...(definition.directives ? definition.directives : []));
    } else if (definition.kind === graphql_1.Kind.SCHEMA_EXTENSION) {
      schemaExtensions.push(definition);
    }
  }
  let schema = schemaToExtend ? schemaToExtend : new graphql_1.GraphQLSchema({
    query: undefined
  });
  const missingTypeDefinitions = [];
  for (const [extendedTypeName, extensions] of Object.entries(extensionsMap)) {
    if (!definitionsMap[extendedTypeName]) {
      const extension = extensions[0];
      const kind = extension.kind;
      const definition = {
        kind: extKindToDefKind[kind],
        name: extension.name
      };
      missingTypeDefinitions.push(definition);
    }
  }
  schema = (0, graphql_1.extendSchema)(schema, {
    kind: graphql_1.Kind.DOCUMENT,
    definitions: [...(0, flat_1.default)(Object.values(definitionsMap)), ...missingTypeDefinitions, ...directiveDefinitions]
  }, {
    assumeValidSDL: true
  });
  schema = (0, graphql_1.extendSchema)(schema, {
    kind: graphql_1.Kind.DOCUMENT,
    definitions: (0, flat_1.default)(Object.values(extensionsMap))
  }, {
    assumeValidSDL: true
  });
  let operationTypeMap;
  if (schemaDefinitions.length > 0 || schemaExtensions.length > 0) {
    operationTypeMap = {};
    const operationTypes = (0, flat_1.default)([...schemaDefinitions, ...schemaExtensions].map(node => node.operationTypes).filter(isNotNullOrUndefined));
    for (const {
      operation,
      type
    } of operationTypes) {
      operationTypeMap[operation] = type.name.value;
    }
  } else {
    operationTypeMap = {
      query: "Query",
      mutation: "Mutation",
      subscription: "Subscription"
    };
  }
  schema = new graphql_1.GraphQLSchema(Object.assign(Object.assign(Object.assign({}, schema.toConfig()), (0, mapValues_1.mapValues)(operationTypeMap, typeName => typeName ? schema.getType(typeName) : undefined)), {
    astNode: {
      kind: graphql_1.Kind.SCHEMA_DEFINITION,
      directives: schemaDirectives,
      operationTypes: []
    }
  }));
  for (const module of modules) {
    if (!module.resolvers) continue;
    addResolversToSchema(schema, module.resolvers);
  }
  return schema;
}
exports.buildSchemaFromSDL = buildSchemaFromSDL;
const extKindToDefKind = {
  [graphql_1.Kind.SCALAR_TYPE_EXTENSION]: graphql_1.Kind.SCALAR_TYPE_DEFINITION,
  [graphql_1.Kind.OBJECT_TYPE_EXTENSION]: graphql_1.Kind.OBJECT_TYPE_DEFINITION,
  [graphql_1.Kind.INTERFACE_TYPE_EXTENSION]: graphql_1.Kind.INTERFACE_TYPE_DEFINITION,
  [graphql_1.Kind.UNION_TYPE_EXTENSION]: graphql_1.Kind.UNION_TYPE_DEFINITION,
  [graphql_1.Kind.ENUM_TYPE_EXTENSION]: graphql_1.Kind.ENUM_TYPE_DEFINITION,
  [graphql_1.Kind.INPUT_OBJECT_TYPE_EXTENSION]: graphql_1.Kind.INPUT_OBJECT_TYPE_DEFINITION
};
function addResolversToSchema(schema, resolvers) {
  for (const [typeName, fieldConfigs] of Object.entries(resolvers)) {
    const type = schema.getType(typeName);
    if ((0, graphql_1.isAbstractType)(type)) {
      for (const [fieldName, fieldConfig] of Object.entries(fieldConfigs)) {
        if (fieldName.startsWith("__")) {
          type[fieldName.substring(2)] = fieldConfig;
        }
      }
    }
    if ((0, graphql_1.isScalarType)(type)) {
      for (const fn in fieldConfigs) {
        type[fn] = fieldConfigs[fn];
      }
    }
    if ((0, graphql_1.isEnumType)(type)) {
      const values = type.getValues();
      const newValues = {};
      values.forEach(value => {
        let newValue = fieldConfigs[value.name];
        if (newValue === undefined) {
          newValue = value.name;
        }
        newValues[value.name] = {
          value: newValue,
          deprecationReason: value.deprecationReason,
          description: value.description,
          astNode: value.astNode,
          extensions: undefined
        };
      });
      Object.assign(type, new graphql_1.GraphQLEnumType(Object.assign(Object.assign({}, type.toConfig()), {
        values: newValues
      })));
    }
    if (!(0, graphql_1.isObjectType)(type)) continue;
    const fieldMap = type.getFields();
    for (const [fieldName, fieldConfig] of Object.entries(fieldConfigs)) {
      if (fieldName.startsWith("__")) {
        type[fieldName.substring(2)] = fieldConfig;
        continue;
      }
      const field = fieldMap[fieldName];
      if (!field) continue;
      if (typeof fieldConfig === "function") {
        field.resolve = fieldConfig;
      } else {
        field.resolve = fieldConfig.resolve;
      }
    }
  }
}
exports.addResolversToSchema = addResolversToSchema;
function isNotNullOrUndefined(value) {
  return value !== null && typeof value !== "undefined";
}

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/schema/index.js":
/*!***************************************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/schema/index.js ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }
  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
__exportStar(__webpack_require__(/*! ./buildSchemaFromSDL */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/schema/buildSchemaFromSDL.js"), exports);
__exportStar(__webpack_require__(/*! ./GraphQLSchemaValidationError */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/schema/GraphQLSchemaValidationError.js"), exports);
__exportStar(__webpack_require__(/*! ./transformSchema */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/schema/transformSchema.js"), exports);
__exportStar(__webpack_require__(/*! ./resolverMap */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/schema/resolverMap.js"), exports);
__exportStar(__webpack_require__(/*! ./resolveObject */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/schema/resolveObject.js"), exports);

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/schema/resolveObject.js":
/*!***********************************************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/schema/resolveObject.js ***!
  \***********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/schema/resolverMap.js":
/*!*********************************************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/schema/resolverMap.js ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/schema/transformSchema.js":
/*!*************************************************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/schema/transformSchema.js ***!
  \*************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformSchema = void 0;
const graphql_1 = __webpack_require__(/*! graphql */ "graphql");
const mapValues_1 = __webpack_require__(/*! ../utilities/mapValues */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/utilities/mapValues.js");
function transformSchema(schema, transformType) {
  const typeMap = Object.create(null);
  for (const oldType of Object.values(schema.getTypeMap())) {
    if ((0, graphql_1.isIntrospectionType)(oldType)) continue;
    const result = transformType(oldType);
    if (result === null) continue;
    const newType = result || oldType;
    typeMap[newType.name] = recreateNamedType(newType);
  }
  const schemaConfig = schema.toConfig();
  return new graphql_1.GraphQLSchema(Object.assign(Object.assign({}, schemaConfig), {
    types: Object.values(typeMap),
    query: replaceMaybeType(schemaConfig.query),
    mutation: replaceMaybeType(schemaConfig.mutation),
    subscription: replaceMaybeType(schemaConfig.subscription),
    directives: replaceDirectives(schemaConfig.directives)
  }));
  function recreateNamedType(type) {
    if ((0, graphql_1.isObjectType)(type)) {
      const config = type.toConfig();
      return new graphql_1.GraphQLObjectType(Object.assign(Object.assign({}, config), {
        interfaces: () => config.interfaces.map(replaceNamedType),
        fields: () => replaceFields(config.fields)
      }));
    } else if ((0, graphql_1.isInterfaceType)(type)) {
      const config = type.toConfig();
      return new graphql_1.GraphQLInterfaceType(Object.assign(Object.assign({}, config), {
        interfaces: () => config.interfaces.map(replaceNamedType),
        fields: () => replaceFields(config.fields)
      }));
    } else if ((0, graphql_1.isUnionType)(type)) {
      const config = type.toConfig();
      return new graphql_1.GraphQLUnionType(Object.assign(Object.assign({}, config), {
        types: () => config.types.map(replaceNamedType)
      }));
    } else if ((0, graphql_1.isInputObjectType)(type)) {
      const config = type.toConfig();
      return new graphql_1.GraphQLInputObjectType(Object.assign(Object.assign({}, config), {
        fields: () => replaceInputFields(config.fields)
      }));
    }
    return type;
  }
  function replaceType(type) {
    if ((0, graphql_1.isListType)(type)) {
      return new graphql_1.GraphQLList(replaceType(type.ofType));
    } else if ((0, graphql_1.isNonNullType)(type)) {
      return new graphql_1.GraphQLNonNull(replaceType(type.ofType));
    }
    return replaceNamedType(type);
  }
  function replaceNamedType(type) {
    const newType = typeMap[type.name];
    return newType ? newType : type;
  }
  function replaceMaybeType(type) {
    return type ? replaceNamedType(type) : undefined;
  }
  function replaceFields(fieldsMap) {
    return (0, mapValues_1.mapValues)(fieldsMap, field => Object.assign(Object.assign({}, field), {
      type: replaceType(field.type),
      args: field.args ? replaceArgs(field.args) : undefined
    }));
  }
  function replaceInputFields(fieldsMap) {
    return (0, mapValues_1.mapValues)(fieldsMap, field => Object.assign(Object.assign({}, field), {
      type: replaceType(field.type)
    }));
  }
  function replaceArgs(args) {
    return (0, mapValues_1.mapValues)(args, arg => Object.assign(Object.assign({}, arg), {
      type: replaceType(arg.type)
    }));
  }
  function replaceDirectives(directives) {
    return directives.map(directive => {
      const config = directive.toConfig();
      return new graphql_1.GraphQLDirective(Object.assign(Object.assign({}, config), {
        args: replaceArgs(config.args)
      }));
    });
  }
}
exports.transformSchema = transformSchema;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/transforms.js":
/*!*************************************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/transforms.js ***!
  \*************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printWithReducedWhitespace = exports.removeAliases = exports.sortAST = exports.dropUnusedDefinitions = exports.hideStringAndNumericLiterals = exports.hideLiterals = void 0;
const visitor_1 = __webpack_require__(/*! graphql/language/visitor */ "graphql/language/visitor");
const printer_1 = __webpack_require__(/*! graphql/language/printer */ "graphql/language/printer");
const utilities_1 = __webpack_require__(/*! graphql/utilities */ "graphql/utilities");
const lodash_sortby_1 = __importDefault(__webpack_require__(/*! lodash.sortby */ "lodash.sortby"));
function hideLiterals(ast) {
  return (0, visitor_1.visit)(ast, {
    IntValue(node) {
      return Object.assign(Object.assign({}, node), {
        value: "0"
      });
    },
    FloatValue(node) {
      return Object.assign(Object.assign({}, node), {
        value: "0"
      });
    },
    StringValue(node) {
      return Object.assign(Object.assign({}, node), {
        value: "",
        block: false
      });
    },
    ListValue(node) {
      return Object.assign(Object.assign({}, node), {
        values: []
      });
    },
    ObjectValue(node) {
      return Object.assign(Object.assign({}, node), {
        fields: []
      });
    }
  });
}
exports.hideLiterals = hideLiterals;
function hideStringAndNumericLiterals(ast) {
  return (0, visitor_1.visit)(ast, {
    IntValue(node) {
      return Object.assign(Object.assign({}, node), {
        value: "0"
      });
    },
    FloatValue(node) {
      return Object.assign(Object.assign({}, node), {
        value: "0"
      });
    },
    StringValue(node) {
      return Object.assign(Object.assign({}, node), {
        value: "",
        block: false
      });
    }
  });
}
exports.hideStringAndNumericLiterals = hideStringAndNumericLiterals;
function dropUnusedDefinitions(ast, operationName) {
  const separated = (0, utilities_1.separateOperations)(ast)[operationName];
  if (!separated) {
    return ast;
  }
  return separated;
}
exports.dropUnusedDefinitions = dropUnusedDefinitions;
function sorted(items, ...iteratees) {
  if (items) {
    return (0, lodash_sortby_1.default)(items, ...iteratees);
  }
  return undefined;
}
function sortAST(ast) {
  return (0, visitor_1.visit)(ast, {
    Document(node) {
      return Object.assign(Object.assign({}, node), {
        definitions: (0, lodash_sortby_1.default)(node.definitions, "kind", "name.value")
      });
    },
    OperationDefinition(node) {
      return Object.assign(Object.assign({}, node), {
        variableDefinitions: sorted(node.variableDefinitions, "variable.name.value")
      });
    },
    SelectionSet(node) {
      return Object.assign(Object.assign({}, node), {
        selections: (0, lodash_sortby_1.default)(node.selections, "kind", "name.value")
      });
    },
    Field(node) {
      return Object.assign(Object.assign({}, node), {
        arguments: sorted(node.arguments, "name.value")
      });
    },
    FragmentSpread(node) {
      return Object.assign(Object.assign({}, node), {
        directives: sorted(node.directives, "name.value")
      });
    },
    InlineFragment(node) {
      return Object.assign(Object.assign({}, node), {
        directives: sorted(node.directives, "name.value")
      });
    },
    FragmentDefinition(node) {
      return Object.assign(Object.assign({}, node), {
        directives: sorted(node.directives, "name.value"),
        variableDefinitions: sorted(node.variableDefinitions, "variable.name.value")
      });
    },
    Directive(node) {
      return Object.assign(Object.assign({}, node), {
        arguments: sorted(node.arguments, "name.value")
      });
    }
  });
}
exports.sortAST = sortAST;
function removeAliases(ast) {
  return (0, visitor_1.visit)(ast, {
    Field(node) {
      return Object.assign(Object.assign({}, node), {
        alias: undefined
      });
    }
  });
}
exports.removeAliases = removeAliases;
function printWithReducedWhitespace(ast) {
  const sanitizedAST = (0, visitor_1.visit)(ast, {
    StringValue(node) {
      return Object.assign(Object.assign({}, node), {
        value: Buffer.from(node.value, "utf8").toString("hex"),
        block: false
      });
    }
  });
  const withWhitespace = (0, printer_1.print)(sanitizedAST);
  const minimizedButStillHex = withWhitespace.replace(/\s+/g, " ").replace(/([^_a-zA-Z0-9]) /g, (_, c) => c).replace(/ ([^_a-zA-Z0-9])/g, (_, c) => c);
  return minimizedButStillHex.replace(/"([a-f0-9]+)"/g, (_, hex) => JSON.stringify(Buffer.from(hex, "hex").toString("utf8")));
}
exports.printWithReducedWhitespace = printWithReducedWhitespace;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/utilities/createHash.js":
/*!***********************************************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/utilities/createHash.js ***!
  \***********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHash = void 0;
const isNodeLike_1 = __webpack_require__(/*! ./isNodeLike */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/utilities/isNodeLike.js");
function createHash(kind) {
  if (isNodeLike_1.isNodeLike) {
    return __webpack_require__(/*! crypto */ "crypto").createHash(kind);
  }
  return __webpack_require__(/*! sha.js */ "sha.js")(kind);
}
exports.createHash = createHash;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/utilities/graphql.js":
/*!********************************************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/utilities/graphql.js ***!
  \********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDocumentNode = exports.isNode = void 0;
const graphql_1 = __webpack_require__(/*! graphql */ "graphql");
function isNode(maybeNode) {
  return maybeNode && typeof maybeNode.kind === "string";
}
exports.isNode = isNode;
function isDocumentNode(node) {
  return isNode(node) && node.kind === graphql_1.Kind.DOCUMENT;
}
exports.isDocumentNode = isDocumentNode;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/utilities/isNodeLike.js":
/*!***********************************************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/utilities/isNodeLike.js ***!
  \***********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNodeLike = void 0;
exports.isNodeLike = typeof process === "object" && process && process.release && process.versions && typeof process.versions.node === "string";

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/utilities/mapValues.js":
/*!**********************************************************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/node_modules/apollo-graphql/lib/utilities/mapValues.js ***!
  \**********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapValues = void 0;
function mapValues(object, callback) {
  const result = Object.create(null);
  for (const [key, value] of Object.entries(object)) {
    result[key] = callback(value);
  }
  return result;
}
exports.mapValues = mapValues;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/package.json":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-core/package.json ***!
  \****************************************************************************************************************/
/*! exports provided: name, version, description, main, types, repository, keywords, author, license, bugs, homepage, engines, dependencies, peerDependencies, gitHead, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"apollo-server-core\",\"version\":\"2.26.1\",\"description\":\"Core engine for Apollo GraphQL server\",\"main\":\"dist/index.js\",\"types\":\"dist/index.d.ts\",\"repository\":{\"type\":\"git\",\"url\":\"https://github.com/apollographql/apollo-server\",\"directory\":\"packages/apollo-server-core\"},\"keywords\":[\"GraphQL\",\"Apollo\",\"Server\",\"Javascript\"],\"author\":\"Apollo <opensource@apollographql.com>\",\"license\":\"MIT\",\"bugs\":{\"url\":\"https://github.com/apollographql/apollo-server/issues\"},\"homepage\":\"https://github.com/apollographql/apollo-server#readme\",\"engines\":{\"node\":\">=6\"},\"dependencies\":{\"@apollographql/apollo-tools\":\"^0.5.0\",\"@apollographql/graphql-playground-html\":\"1.6.27\",\"@apollographql/graphql-upload-8-fork\":\"^8.1.4\",\"@josephg/resolvable\":\"^1.0.0\",\"@types/ws\":\"^7.0.0\",\"apollo-cache-control\":\"^0.15.0\",\"apollo-datasource\":\"^0.10.0\",\"apollo-graphql\":\"^0.9.0\",\"apollo-reporting-protobuf\":\"^0.8.0\",\"apollo-server-caching\":\"^0.7.0\",\"apollo-server-env\":\"^3.2.0\",\"apollo-server-errors\":\"^2.5.0\",\"apollo-server-plugin-base\":\"^0.14.0\",\"apollo-server-types\":\"^0.10.0\",\"apollo-tracing\":\"^0.16.0\",\"async-retry\":\"^1.2.1\",\"fast-json-stable-stringify\":\"^2.0.0\",\"graphql-extensions\":\"^0.16.0\",\"graphql-tag\":\"^2.11.0\",\"graphql-tools\":\"^4.0.8\",\"loglevel\":\"^1.6.7\",\"lru-cache\":\"^6.0.0\",\"sha.js\":\"^2.4.11\",\"subscriptions-transport-ws\":\"^0.9.19\",\"uuid\":\"^8.0.0\"},\"peerDependencies\":{\"graphql\":\"^0.12.0 || ^0.13.0 || ^14.0.0 || ^15.0.0\"},\"gitHead\":\"84852fcfb40bc5ea83c341dba546464d6114d7ed\"}");

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-errors/dist/index.js":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-server-errors/dist/index.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasPersistedQueryError = exports.formatApolloErrors = exports.UserInputError = exports.PersistedQueryNotSupportedError = exports.PersistedQueryNotFoundError = exports.ForbiddenError = exports.AuthenticationError = exports.ValidationError = exports.SyntaxError = exports.fromGraphQLError = exports.toApolloError = exports.ApolloError = void 0;
const graphql_1 = __webpack_require__(/*! graphql */ "graphql");
class ApolloError extends Error {
  constructor(message, code, extensions) {
    super(message);
    if (extensions) {
      Object.keys(extensions).filter(keyName => keyName !== 'message' && keyName !== 'extensions').forEach(key => {
        this[key] = extensions[key];
      });
    }
    if (!this.name) {
      Object.defineProperty(this, 'name', {
        value: 'ApolloError'
      });
    }
    const userProvidedExtensions = extensions && extensions.extensions || null;
    this.extensions = Object.assign(Object.assign(Object.assign({}, extensions), userProvidedExtensions), {
      code
    });
  }
}
exports.ApolloError = ApolloError;
function enrichError(error, debug = false) {
  const expanded = Object.create(Object.getPrototypeOf(error), {
    name: {
      value: error.name
    },
    message: {
      value: error.message,
      enumerable: true,
      writable: true
    },
    locations: {
      value: error.locations || undefined,
      enumerable: true
    },
    path: {
      value: error.path || undefined,
      enumerable: true
    },
    nodes: {
      value: error.nodes || undefined
    },
    source: {
      value: error.source || undefined
    },
    positions: {
      value: error.positions || undefined
    },
    originalError: {
      value: error.originalError
    }
  });
  expanded.extensions = Object.assign(Object.assign({}, error.extensions), {
    code: error.extensions && error.extensions.code || 'INTERNAL_SERVER_ERROR',
    exception: Object.assign(Object.assign({}, error.extensions && error.extensions.exception), error.originalError)
  });
  delete expanded.extensions.exception.extensions;
  if (debug && !expanded.extensions.exception.stacktrace) {
    expanded.extensions.exception.stacktrace = error.originalError && error.originalError.stack && error.originalError.stack.split('\n') || error.stack && error.stack.split('\n');
  }
  if (Object.keys(expanded.extensions.exception).length === 0) {
    delete expanded.extensions.exception;
  }
  return expanded;
}
function toApolloError(error, code = 'INTERNAL_SERVER_ERROR') {
  let err = error;
  if (err.extensions) {
    err.extensions.code = code;
  } else {
    err.extensions = {
      code
    };
  }
  return err;
}
exports.toApolloError = toApolloError;
function fromGraphQLError(error, options) {
  const copy = options && options.errorClass ? new options.errorClass(error.message) : new ApolloError(error.message);
  Object.keys(error).forEach(key => {
    copy[key] = error[key];
  });
  copy.extensions = Object.assign(Object.assign({}, copy.extensions), error.extensions);
  if (!copy.extensions.code) {
    copy.extensions.code = options && options.code || 'INTERNAL_SERVER_ERROR';
  }
  Object.defineProperty(copy, 'originalError', {
    value: {}
  });
  Object.getOwnPropertyNames(error).forEach(key => {
    Object.defineProperty(copy.originalError, key, {
      value: error[key]
    });
  });
  return copy;
}
exports.fromGraphQLError = fromGraphQLError;
class SyntaxError extends ApolloError {
  constructor(message) {
    super(message, 'GRAPHQL_PARSE_FAILED');
    Object.defineProperty(this, 'name', {
      value: 'SyntaxError'
    });
  }
}
exports.SyntaxError = SyntaxError;
class ValidationError extends ApolloError {
  constructor(message) {
    super(message, 'GRAPHQL_VALIDATION_FAILED');
    Object.defineProperty(this, 'name', {
      value: 'ValidationError'
    });
  }
}
exports.ValidationError = ValidationError;
class AuthenticationError extends ApolloError {
  constructor(message) {
    super(message, 'UNAUTHENTICATED');
    Object.defineProperty(this, 'name', {
      value: 'AuthenticationError'
    });
  }
}
exports.AuthenticationError = AuthenticationError;
class ForbiddenError extends ApolloError {
  constructor(message) {
    super(message, 'FORBIDDEN');
    Object.defineProperty(this, 'name', {
      value: 'ForbiddenError'
    });
  }
}
exports.ForbiddenError = ForbiddenError;
class PersistedQueryNotFoundError extends ApolloError {
  constructor() {
    super('PersistedQueryNotFound', 'PERSISTED_QUERY_NOT_FOUND');
    Object.defineProperty(this, 'name', {
      value: 'PersistedQueryNotFoundError'
    });
  }
}
exports.PersistedQueryNotFoundError = PersistedQueryNotFoundError;
class PersistedQueryNotSupportedError extends ApolloError {
  constructor() {
    super('PersistedQueryNotSupported', 'PERSISTED_QUERY_NOT_SUPPORTED');
    Object.defineProperty(this, 'name', {
      value: 'PersistedQueryNotSupportedError'
    });
  }
}
exports.PersistedQueryNotSupportedError = PersistedQueryNotSupportedError;
class UserInputError extends ApolloError {
  constructor(message, properties) {
    super(message, 'BAD_USER_INPUT', properties);
    Object.defineProperty(this, 'name', {
      value: 'UserInputError'
    });
  }
}
exports.UserInputError = UserInputError;
function formatApolloErrors(errors, options) {
  if (!options) {
    return errors.map(error => enrichError(error));
  }
  const {
    formatter,
    debug
  } = options;
  const enrichedErrors = errors.map(error => enrichError(error, debug));
  const makePrintable = error => {
    if (error instanceof Error) {
      const graphQLError = error;
      return Object.assign(Object.assign(Object.assign({
        message: graphQLError.message
      }, graphQLError.locations && {
        locations: graphQLError.locations
      }), graphQLError.path && {
        path: graphQLError.path
      }), graphQLError.extensions && {
        extensions: graphQLError.extensions
      });
    }
    return error;
  };
  if (!formatter) {
    return enrichedErrors;
  }
  return enrichedErrors.map(error => {
    try {
      return makePrintable(formatter(error));
    } catch (err) {
      if (debug) {
        return enrichError(err, debug);
      } else {
        const newError = fromGraphQLError(new graphql_1.GraphQLError('Internal server error'));
        return enrichError(newError, debug);
      }
    }
  });
}
exports.formatApolloErrors = formatApolloErrors;
function hasPersistedQueryError(errors) {
  return Array.isArray(errors) ? errors.some(error => error instanceof PersistedQueryNotFoundError || error instanceof PersistedQueryNotSupportedError) : false;
}
exports.hasPersistedQueryError = hasPersistedQueryError;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-tracing/dist/index.js":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-tracing/dist/index.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plugin = void 0;
const graphql_1 = __webpack_require__(/*! graphql */ "graphql");
const {
  name: PACKAGE_NAME
} = __webpack_require__(/*! ../package.json */ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-tracing/package.json");
exports.plugin = (_futureOptions = {}) => () => ({
  requestDidStart() {
    const startWallTime = new Date();
    let endWallTime;
    const startHrTime = process.hrtime();
    let duration;
    const resolverCalls = [];
    return {
      executionDidStart: () => ({
        executionDidEnd: () => {
          duration = process.hrtime(startHrTime);
          endWallTime = new Date();
        },
        willResolveField({
          info
        }) {
          const resolverCall = {
            path: info.path,
            fieldName: info.fieldName,
            parentType: info.parentType,
            returnType: info.returnType,
            startOffset: process.hrtime(startHrTime)
          };
          resolverCalls.push(resolverCall);
          return () => {
            resolverCall.endOffset = process.hrtime(startHrTime);
          };
        }
      }),
      willSendResponse({
        response
      }) {
        if (typeof endWallTime === 'undefined' || typeof duration === 'undefined') {
          return;
        }
        const extensions = response.extensions || (response.extensions = Object.create(null));
        if (typeof extensions.tracing !== 'undefined') {
          throw new Error(PACKAGE_NAME + ": Could not add `tracing` to " + "`extensions` since `tracing` was unexpectedly already present.");
        }
        extensions.tracing = {
          version: 1,
          startTime: startWallTime.toISOString(),
          endTime: endWallTime.toISOString(),
          duration: durationHrTimeToNanos(duration),
          execution: {
            resolvers: resolverCalls.map(resolverCall => {
              const startOffset = durationHrTimeToNanos(resolverCall.startOffset);
              const duration = resolverCall.endOffset ? durationHrTimeToNanos(resolverCall.endOffset) - startOffset : 0;
              return {
                path: [...graphql_1.responsePathAsArray(resolverCall.path)],
                parentType: resolverCall.parentType.toString(),
                fieldName: resolverCall.fieldName,
                returnType: resolverCall.returnType.toString(),
                startOffset,
                duration
              };
            })
          }
        };
      }
    };
  }
});
function durationHrTimeToNanos(hrtime) {
  return hrtime[0] * 1e9 + hrtime[1];
}

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-tracing/package.json":
/*!************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/apollo-tracing/package.json ***!
  \************************************************************************************************************/
/*! exports provided: name, version, description, main, types, license, repository, author, engines, dependencies, peerDependencies, gitHead, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"apollo-tracing\",\"version\":\"0.16.0\",\"description\":\"Collect and expose trace data for GraphQL requests\",\"main\":\"./dist/index.js\",\"types\":\"./dist/index.d.ts\",\"license\":\"MIT\",\"repository\":\"apollographql/apollo-tracing-js\",\"author\":\"Apollo <opensource@apollographql.com>\",\"engines\":{\"node\":\">=4.0\"},\"dependencies\":{\"apollo-server-env\":\"^3.2.0\",\"apollo-server-plugin-base\":\"^0.14.0\"},\"peerDependencies\":{\"graphql\":\"^0.12.0 || ^0.13.0 || ^14.0.0 || ^15.0.0\"},\"gitHead\":\"91de501bb389c07ccfc5e684811153267b91e9ac\"}");

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-express/node_modules/graphql-extensions/dist/index.js":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-express/node_modules/graphql-extensions/dist/index.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enableGraphQLExtensions = exports.GraphQLExtensionStack = exports.GraphQLExtension = void 0;
const graphql_1 = __webpack_require__(/*! graphql */ "graphql");
class GraphQLExtension {}
exports.GraphQLExtension = GraphQLExtension;
class GraphQLExtensionStack {
  constructor(extensions) {
    this.extensions = extensions;
  }
  requestDidStart(o) {
    return this.handleDidStart(ext => ext.requestDidStart && ext.requestDidStart(o));
  }
  parsingDidStart(o) {
    return this.handleDidStart(ext => ext.parsingDidStart && ext.parsingDidStart(o));
  }
  validationDidStart() {
    return this.handleDidStart(ext => ext.validationDidStart && ext.validationDidStart());
  }
  executionDidStart(o) {
    if (o.executionArgs.fieldResolver) {
      this.fieldResolver = o.executionArgs.fieldResolver;
    }
    return this.handleDidStart(ext => ext.executionDidStart && ext.executionDidStart(o));
  }
  didEncounterErrors(errors) {
    this.extensions.forEach(extension => {
      if (extension.didEncounterErrors) {
        extension.didEncounterErrors(errors);
      }
    });
  }
  willSendResponse(o) {
    let reference = o;
    [...this.extensions].reverse().forEach(extension => {
      if (extension.willSendResponse) {
        const result = extension.willSendResponse(reference);
        if (result) {
          reference = result;
        }
      }
    });
    return reference;
  }
  willResolveField(source, args, context, info) {
    const handlers = this.extensions.map(extension => extension.willResolveField && extension.willResolveField(source, args, context, info)).filter(x => x).reverse();
    return (error, result) => {
      for (const handler of handlers) {
        handler(error, result);
      }
    };
  }
  format() {
    return this.extensions.map(extension => extension.format && extension.format()).filter(x => x).reduce((extensions, [key, value]) => Object.assign(extensions, {
      [key]: value
    }), {});
  }
  handleDidStart(startInvoker) {
    const endHandlers = [];
    this.extensions.forEach(extension => {
      try {
        const endHandler = startInvoker(extension);
        if (endHandler) {
          endHandlers.push(endHandler);
        }
      } catch (error) {
        console.error(error);
      }
    });
    return (...errors) => {
      endHandlers.reverse();
      for (const endHandler of endHandlers) {
        try {
          endHandler(...errors);
        } catch (error) {
          console.error(error);
        }
      }
    };
  }
}
exports.GraphQLExtensionStack = GraphQLExtensionStack;
function enableGraphQLExtensions(schema) {
  if (schema._extensionsEnabled) {
    return schema;
  }
  schema._extensionsEnabled = true;
  forEachField(schema, wrapField);
  return schema;
}
exports.enableGraphQLExtensions = enableGraphQLExtensions;
function wrapField(field) {
  const fieldResolver = field.resolve;
  field.resolve = (source, args, context, info) => {
    const parentPath = info.path.prev;
    const extensionStack = context && context._extensionStack;
    const handler = extensionStack && extensionStack.willResolveField(source, args, context, info) || ((_err, _result) => {});
    const resolveObject = info.parentType.resolveObject;
    let whenObjectResolved;
    if (parentPath && resolveObject) {
      if (!parentPath.__fields) {
        parentPath.__fields = {};
      }
      parentPath.__fields[info.fieldName] = info.fieldNodes;
      whenObjectResolved = parentPath.__whenObjectResolved;
      if (!whenObjectResolved) {
        whenObjectResolved = Promise.resolve().then(() => {
          return resolveObject(source, parentPath.__fields, context, info);
        });
        parentPath.__whenObjectResolved = whenObjectResolved;
      }
    }
    try {
      const actualFieldResolver = fieldResolver || extensionStack && extensionStack.fieldResolver || graphql_1.defaultFieldResolver;
      let result;
      if (whenObjectResolved) {
        result = whenObjectResolved.then(resolvedObject => {
          return actualFieldResolver(resolvedObject, args, context, info);
        });
      } else {
        result = actualFieldResolver(source, args, context, info);
      }
      whenResultIsFinished(result, handler);
      return result;
    } catch (error) {
      handler(error);
      throw error;
    }
  };
}
function isPromise(x) {
  return x && typeof x.then === 'function';
}
function whenResultIsFinished(result, callback) {
  if (isPromise(result)) {
    result.then(r => callback(null, r), err => callback(err));
  } else if (Array.isArray(result)) {
    if (result.some(isPromise)) {
      Promise.all(result).then(r => callback(null, r), err => callback(err));
    } else {
      callback(null, result);
    }
  } else {
    callback(null, result);
  }
}
function forEachField(schema, fn) {
  const typeMap = schema.getTypeMap();
  Object.keys(typeMap).forEach(typeName => {
    const type = typeMap[typeName];
    if (!graphql_1.getNamedType(type).name.startsWith('__') && type instanceof graphql_1.GraphQLObjectType) {
      const fields = type.getFields();
      Object.keys(fields).forEach(fieldName => {
        const field = fields[fieldName];
        fn(field, typeName, fieldName);
      });
    }
  });
}

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server-types/dist/index.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server-types/dist/index.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvalidGraphQLRequestError = void 0;
const graphql_1 = __webpack_require__(/*! graphql */ "graphql");
class InvalidGraphQLRequestError extends graphql_1.GraphQLError {}
exports.InvalidGraphQLRequestError = InvalidGraphQLRequestError;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server/dist/exports.js":
/*!***************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server/dist/exports.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
__export(__webpack_require__(/*! graphql-tools */ "./node_modules/graphpack/node_modules/graphql-tools/dist/index.js"));
__export(__webpack_require__(/*! graphql-subscriptions */ "./node_modules/graphpack/node_modules/graphql-subscriptions/dist/index.js"));
var apollo_server_core_1 = __webpack_require__(/*! apollo-server-core */ "./node_modules/graphpack/node_modules/apollo-server-core/dist/index.js");
exports.gql = apollo_server_core_1.gql;
exports.GraphQLUpload = apollo_server_core_1.GraphQLUpload;
exports.GraphQLExtension = apollo_server_core_1.GraphQLExtension;
exports.ApolloError = apollo_server_core_1.ApolloError;
exports.toApolloError = apollo_server_core_1.toApolloError;
exports.SyntaxError = apollo_server_core_1.SyntaxError;
exports.ValidationError = apollo_server_core_1.ValidationError;
exports.AuthenticationError = apollo_server_core_1.AuthenticationError;
exports.ForbiddenError = apollo_server_core_1.ForbiddenError;
exports.UserInputError = apollo_server_core_1.UserInputError;
exports.defaultPlaygroundOptions = apollo_server_core_1.defaultPlaygroundOptions;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server/dist/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server/dist/index.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function __export(m) {
  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const http_1 = __importDefault(__webpack_require__(/*! http */ "http"));
const apollo_server_express_1 = __webpack_require__(/*! apollo-server-express */ "./node_modules/graphpack/node_modules/apollo-server/node_modules/apollo-server-express/dist/index.js");
__export(__webpack_require__(/*! ./exports */ "./node_modules/graphpack/node_modules/apollo-server/dist/exports.js"));
class ApolloServer extends apollo_server_express_1.ApolloServer {
  constructor(config) {
    super(config);
    this.cors = config && config.cors;
  }
  createServerInfo(server, subscriptionsPath) {
    const serverInfo = Object.assign({}, server.address(), {
      server,
      subscriptionsPath
    });
    let hostForUrl = serverInfo.address;
    if (serverInfo.address === '' || serverInfo.address === '::') hostForUrl = 'localhost';
    serverInfo.url = __webpack_require__(/*! url */ "url").format({
      protocol: 'http',
      hostname: hostForUrl,
      port: serverInfo.port,
      pathname: this.graphqlPath
    });
    serverInfo.subscriptionsUrl = __webpack_require__(/*! url */ "url").format({
      protocol: 'ws',
      hostname: hostForUrl,
      port: serverInfo.port,
      slashes: true,
      pathname: subscriptionsPath
    });
    return serverInfo;
  }
  applyMiddleware() {
    throw new Error('To use Apollo Server with an existing express application, please use apollo-server-express');
  }
  listen(...opts) {
    const _super = Object.create(null, {
      applyMiddleware: {
        get: () => super.applyMiddleware
      }
    });
    return __awaiter(this, void 0, void 0, function* () {
      const app = express_1.default();
      _super.applyMiddleware.call(this, {
        app,
        path: '/',
        bodyParserConfig: {
          limit: '50mb'
        },
        cors: typeof this.cors !== 'undefined' ? this.cors : {
          origin: '*'
        }
      });
      const httpServer = http_1.default.createServer(app);
      this.httpServer = httpServer;
      if (this.subscriptionServerOptions) {
        this.installSubscriptionHandlers(httpServer);
      }
      yield new Promise(resolve => {
        httpServer.once('listening', resolve);
        httpServer.listen(...(opts.length ? opts : [{
          port: 4000
        }]));
      });
      return this.createServerInfo(httpServer, this.subscriptionsPath);
    });
  }
  stop() {
    const _super = Object.create(null, {
      stop: {
        get: () => super.stop
      }
    });
    return __awaiter(this, void 0, void 0, function* () {
      if (this.httpServer) {
        const httpServer = this.httpServer;
        yield new Promise(resolve => httpServer.close(resolve));
        this.httpServer = undefined;
      }
      yield _super.stop.call(this);
    });
  }
}
exports.ApolloServer = ApolloServer;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server/node_modules/apollo-server-express/dist/ApolloServer.js":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server/node_modules/apollo-server-express/dist/ApolloServer.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const cors_1 = __importDefault(__webpack_require__(/*! cors */ "cors"));
const body_parser_1 = __webpack_require__(/*! body-parser */ "body-parser");
const graphql_playground_html_1 = __webpack_require__(/*! @apollographql/graphql-playground-html */ "@apollographql/graphql-playground-html");
const apollo_server_core_1 = __webpack_require__(/*! apollo-server-core */ "./node_modules/graphpack/node_modules/apollo-server-core/dist/index.js");
const accepts_1 = __importDefault(__webpack_require__(/*! accepts */ "accepts"));
const type_is_1 = __importDefault(__webpack_require__(/*! type-is */ "type-is"));
const expressApollo_1 = __webpack_require__(/*! ./expressApollo */ "./node_modules/graphpack/node_modules/apollo-server/node_modules/apollo-server-express/dist/expressApollo.js");
var apollo_server_core_2 = __webpack_require__(/*! apollo-server-core */ "./node_modules/graphpack/node_modules/apollo-server-core/dist/index.js");
exports.GraphQLExtension = apollo_server_core_2.GraphQLExtension;
const fileUploadMiddleware = (uploadsConfig, server) => (req, res, next) => {
  if (typeof apollo_server_core_1.processFileUploads === 'function' && type_is_1.default(req, ['multipart/form-data'])) {
    apollo_server_core_1.processFileUploads(req, res, uploadsConfig).then(body => {
      req.body = body;
      next();
    }).catch(error => {
      if (error.status && error.expose) res.status(error.status);
      next(apollo_server_core_1.formatApolloErrors([error], {
        formatter: server.requestOptions.formatError,
        debug: server.requestOptions.debug
      }));
    });
  } else {
    next();
  }
};
class ApolloServer extends apollo_server_core_1.ApolloServerBase {
  constructor(config) {
    super(config);
  }
  createGraphQLServerOptions(req, res) {
    const _super = Object.create(null, {
      graphQLServerOptions: {
        get: () => super.graphQLServerOptions
      }
    });
    return __awaiter(this, void 0, void 0, function* () {
      return _super.graphQLServerOptions.call(this, {
        req,
        res
      });
    });
  }
  supportsSubscriptions() {
    return true;
  }
  supportsUploads() {
    return true;
  }
  applyMiddleware({
    app,
    path,
    cors,
    bodyParserConfig,
    disableHealthCheck,
    onHealthCheck
  }) {
    if (!path) path = '/graphql';
    const promiseWillStart = this.willStart();
    app.use(path, (_req, _res, next) => {
      promiseWillStart.then(() => next()).catch(next);
    });
    if (!disableHealthCheck) {
      app.use('/.well-known/apollo/server-health', (req, res) => {
        res.type('application/health+json');
        if (onHealthCheck) {
          onHealthCheck(req).then(() => {
            res.json({
              status: 'pass'
            });
          }).catch(() => {
            res.status(503).json({
              status: 'fail'
            });
          });
        } else {
          res.json({
            status: 'pass'
          });
        }
      });
    }
    let uploadsMiddleware;
    if (this.uploadsConfig && typeof apollo_server_core_1.processFileUploads === 'function') {
      uploadsMiddleware = fileUploadMiddleware(this.uploadsConfig, this);
    }
    this.graphqlPath = path;
    if (cors === true) {
      app.use(path, cors_1.default());
    } else if (cors !== false) {
      app.use(path, cors_1.default(cors));
    }
    if (bodyParserConfig === true) {
      app.use(path, body_parser_1.json());
    } else if (bodyParserConfig !== false) {
      app.use(path, body_parser_1.json(bodyParserConfig));
    }
    if (uploadsMiddleware) {
      app.use(path, uploadsMiddleware);
    }
    app.use(path, (req, res, next) => {
      if (this.playgroundOptions && req.method === 'GET') {
        const accept = accepts_1.default(req);
        const types = accept.types();
        const prefersHTML = types.find(x => x === 'text/html' || x === 'application/json') === 'text/html';
        if (prefersHTML) {
          const playgroundRenderPageOptions = Object.assign({
            endpoint: path,
            subscriptionEndpoint: this.subscriptionsPath
          }, this.playgroundOptions);
          res.setHeader('Content-Type', 'text/html');
          const playground = graphql_playground_html_1.renderPlaygroundPage(playgroundRenderPageOptions);
          res.write(playground);
          res.end();
          return;
        }
      }
      return expressApollo_1.graphqlExpress(() => {
        return this.createGraphQLServerOptions(req, res);
      })(req, res, next);
    });
  }
}
exports.ApolloServer = ApolloServer;
exports.registerServer = () => {
  throw new Error('Please use server.applyMiddleware instead of registerServer. This warning will be removed in the next release');
};

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server/node_modules/apollo-server-express/dist/expressApollo.js":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server/node_modules/apollo-server-express/dist/expressApollo.js ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const apollo_server_core_1 = __webpack_require__(/*! apollo-server-core */ "./node_modules/graphpack/node_modules/apollo-server-core/dist/index.js");
function graphqlExpress(options) {
  if (!options) {
    throw new Error('Apollo Server requires options.');
  }
  if (arguments.length > 1) {
    throw new Error(`Apollo Server expects exactly one argument, got ${arguments.length}`);
  }
  return (req, res, next) => {
    apollo_server_core_1.runHttpQuery([req, res], {
      method: req.method,
      options: options,
      query: req.method === 'POST' ? req.body : req.query,
      request: apollo_server_core_1.convertNodeHttpToRequest(req)
    }).then(({
      graphqlResponse,
      responseInit
    }) => {
      if (responseInit.headers) {
        for (const [name, value] of Object.entries(responseInit.headers)) {
          res.setHeader(name, value);
        }
      }
      res.write(graphqlResponse);
      res.end();
    }, error => {
      if ('HttpQueryError' !== error.name) {
        return next(error);
      }
      if (error.headers) {
        for (const [name, value] of Object.entries(error.headers)) {
          res.setHeader(name, value);
        }
      }
      res.statusCode = error.statusCode;
      res.write(error.message);
      res.end();
    });
  };
}
exports.graphqlExpress = graphqlExpress;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-server/node_modules/apollo-server-express/dist/index.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-server/node_modules/apollo-server-express/dist/index.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
var apollo_server_core_1 = __webpack_require__(/*! apollo-server-core */ "./node_modules/graphpack/node_modules/apollo-server-core/dist/index.js");
exports.GraphQLUpload = apollo_server_core_1.GraphQLUpload;
exports.GraphQLExtension = apollo_server_core_1.GraphQLExtension;
exports.gql = apollo_server_core_1.gql;
exports.ApolloError = apollo_server_core_1.ApolloError;
exports.toApolloError = apollo_server_core_1.toApolloError;
exports.SyntaxError = apollo_server_core_1.SyntaxError;
exports.ValidationError = apollo_server_core_1.ValidationError;
exports.AuthenticationError = apollo_server_core_1.AuthenticationError;
exports.ForbiddenError = apollo_server_core_1.ForbiddenError;
exports.UserInputError = apollo_server_core_1.UserInputError;
exports.defaultPlaygroundOptions = apollo_server_core_1.defaultPlaygroundOptions;
__export(__webpack_require__(/*! graphql-tools */ "./node_modules/graphpack/node_modules/graphql-tools/dist/index.js"));
__export(__webpack_require__(/*! graphql-subscriptions */ "./node_modules/graphpack/node_modules/graphql-subscriptions/dist/index.js"));
var ApolloServer_1 = __webpack_require__(/*! ./ApolloServer */ "./node_modules/graphpack/node_modules/apollo-server/node_modules/apollo-server-express/dist/ApolloServer.js");
exports.ApolloServer = ApolloServer_1.ApolloServer;
exports.registerServer = ApolloServer_1.registerServer;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-tracing/dist/index.js":
/*!**************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-tracing/dist/index.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const graphql_1 = __webpack_require__(/*! graphql */ "graphql");
class TracingExtension {
  constructor() {
    this.resolverCalls = [];
  }
  requestDidStart() {
    this.startWallTime = new Date();
    this.startHrTime = process.hrtime();
  }
  executionDidStart() {
    return () => {
      this.duration = process.hrtime(this.startHrTime);
      this.endWallTime = new Date();
    };
  }
  willResolveField(_source, _args, _context, info) {
    const resolverCall = {
      path: info.path,
      fieldName: info.fieldName,
      parentType: info.parentType,
      returnType: info.returnType,
      startOffset: process.hrtime(this.startHrTime)
    };
    this.resolverCalls.push(resolverCall);
    return () => {
      resolverCall.endOffset = process.hrtime(this.startHrTime);
    };
  }
  format() {
    if (typeof this.startWallTime === 'undefined' || typeof this.endWallTime === 'undefined' || typeof this.duration === 'undefined') {
      return;
    }
    return ['tracing', {
      version: 1,
      startTime: this.startWallTime.toISOString(),
      endTime: this.endWallTime.toISOString(),
      duration: durationHrTimeToNanos(this.duration),
      execution: {
        resolvers: this.resolverCalls.map(resolverCall => {
          const startOffset = durationHrTimeToNanos(resolverCall.startOffset);
          const duration = resolverCall.endOffset ? durationHrTimeToNanos(resolverCall.endOffset) - startOffset : 0;
          return {
            path: [...graphql_1.responsePathAsArray(resolverCall.path)],
            parentType: resolverCall.parentType.toString(),
            fieldName: resolverCall.fieldName,
            returnType: resolverCall.returnType.toString(),
            startOffset,
            duration
          };
        })
      }
    }];
  }
}
exports.TracingExtension = TracingExtension;
function durationHrTimeToNanos(hrtime) {
  return hrtime[0] * 1e9 + hrtime[1];
}

/***/ }),

/***/ "./node_modules/graphpack/node_modules/apollo-utilities/lib/bundle.esm.js":
/*!********************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/apollo-utilities/lib/bundle.esm.js ***!
  \********************************************************************************/
/*! exports provided: isEqual, addTypenameToDocument, argumentsObjectFromField, assign, buildQueryFromSelectionSet, canUseWeakMap, checkDocument, cloneDeep, createFragmentMap, getDefaultValues, getDirectiveInfoFromField, getDirectiveNames, getDirectivesFromDocument, getEnv, getFragmentDefinition, getFragmentDefinitions, getFragmentQueryDocument, getInclusionDirectives, getMainDefinition, getMutationDefinition, getOperationDefinition, getOperationDefinitionOrDie, getOperationName, getQueryDefinition, getStoreKeyName, graphQLResultHasError, hasClientExports, hasDirectives, isDevelopment, isEnv, isField, isIdValue, isInlineFragment, isJsonValue, isNumberValue, isProduction, isScalarValue, isTest, maybeDeepFreeze, mergeDeep, mergeDeepArray, removeArgumentsFromDocument, removeClientSetsFromDocument, removeConnectionDirectiveFromDocument, removeDirectivesFromDocument, removeFragmentSpreadFromDocument, resultKeyNameFromField, shouldInclude, storeKeyNameFromField, stripSymbols, toIdValue, tryFunctionOrLogError, valueFromNode, valueToObjectRepresentation, variablesInOperation, warnOnceInDevelopment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addTypenameToDocument", function() { return addTypenameToDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "argumentsObjectFromField", function() { return argumentsObjectFromField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assign", function() { return assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildQueryFromSelectionSet", function() { return buildQueryFromSelectionSet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canUseWeakMap", function() { return canUseWeakMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkDocument", function() { return checkDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneDeep", function() { return cloneDeep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFragmentMap", function() { return createFragmentMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDefaultValues", function() { return getDefaultValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDirectiveInfoFromField", function() { return getDirectiveInfoFromField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDirectiveNames", function() { return getDirectiveNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDirectivesFromDocument", function() { return getDirectivesFromDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEnv", function() { return getEnv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFragmentDefinition", function() { return getFragmentDefinition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFragmentDefinitions", function() { return getFragmentDefinitions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFragmentQueryDocument", function() { return getFragmentQueryDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInclusionDirectives", function() { return getInclusionDirectives; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMainDefinition", function() { return getMainDefinition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMutationDefinition", function() { return getMutationDefinition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOperationDefinition", function() { return getOperationDefinition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOperationDefinitionOrDie", function() { return getOperationDefinitionOrDie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOperationName", function() { return getOperationName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQueryDefinition", function() { return getQueryDefinition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStoreKeyName", function() { return getStoreKeyName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "graphQLResultHasError", function() { return graphQLResultHasError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasClientExports", function() { return hasClientExports; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasDirectives", function() { return hasDirectives; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDevelopment", function() { return isDevelopment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEnv", function() { return isEnv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isField", function() { return isField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIdValue", function() { return isIdValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInlineFragment", function() { return isInlineFragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isJsonValue", function() { return isJsonValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumberValue", function() { return isNumberValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isProduction", function() { return isProduction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isScalarValue", function() { return isScalarValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isTest", function() { return isTest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "maybeDeepFreeze", function() { return maybeDeepFreeze; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeDeep", function() { return mergeDeep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeDeepArray", function() { return mergeDeepArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeArgumentsFromDocument", function() { return removeArgumentsFromDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeClientSetsFromDocument", function() { return removeClientSetsFromDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeConnectionDirectiveFromDocument", function() { return removeConnectionDirectiveFromDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeDirectivesFromDocument", function() { return removeDirectivesFromDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeFragmentSpreadFromDocument", function() { return removeFragmentSpreadFromDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resultKeyNameFromField", function() { return resultKeyNameFromField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shouldInclude", function() { return shouldInclude; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storeKeyNameFromField", function() { return storeKeyNameFromField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stripSymbols", function() { return stripSymbols; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toIdValue", function() { return toIdValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tryFunctionOrLogError", function() { return tryFunctionOrLogError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "valueFromNode", function() { return valueFromNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "valueToObjectRepresentation", function() { return valueToObjectRepresentation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "variablesInOperation", function() { return variablesInOperation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "warnOnceInDevelopment", function() { return warnOnceInDevelopment; });
/* harmony import */ var graphql_language_visitor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql/language/visitor */ "graphql/language/visitor");
/* harmony import */ var graphql_language_visitor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_language_visitor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ts_invariant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ts-invariant */ "ts-invariant");
/* harmony import */ var ts_invariant__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ts_invariant__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var fast_json_stable_stringify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! fast-json-stable-stringify */ "fast-json-stable-stringify");
/* harmony import */ var fast_json_stable_stringify__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(fast_json_stable_stringify__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wry_equality__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wry/equality */ "@wry/equality");
/* harmony import */ var _wry_equality__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wry_equality__WEBPACK_IMPORTED_MODULE_4__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isEqual", function() { return _wry_equality__WEBPACK_IMPORTED_MODULE_4__["equal"]; });






function isScalarValue(value) {
  return ['StringValue', 'BooleanValue', 'EnumValue'].indexOf(value.kind) > -1;
}
function isNumberValue(value) {
  return ['IntValue', 'FloatValue'].indexOf(value.kind) > -1;
}
function isStringValue(value) {
  return value.kind === 'StringValue';
}
function isBooleanValue(value) {
  return value.kind === 'BooleanValue';
}
function isIntValue(value) {
  return value.kind === 'IntValue';
}
function isFloatValue(value) {
  return value.kind === 'FloatValue';
}
function isVariable(value) {
  return value.kind === 'Variable';
}
function isObjectValue(value) {
  return value.kind === 'ObjectValue';
}
function isListValue(value) {
  return value.kind === 'ListValue';
}
function isEnumValue(value) {
  return value.kind === 'EnumValue';
}
function isNullValue(value) {
  return value.kind === 'NullValue';
}
function valueToObjectRepresentation(argObj, name, value, variables) {
  if (isIntValue(value) || isFloatValue(value)) {
    argObj[name.value] = Number(value.value);
  } else if (isBooleanValue(value) || isStringValue(value)) {
    argObj[name.value] = value.value;
  } else if (isObjectValue(value)) {
    var nestedArgObj_1 = {};
    value.fields.map(function (obj) {
      return valueToObjectRepresentation(nestedArgObj_1, obj.name, obj.value, variables);
    });
    argObj[name.value] = nestedArgObj_1;
  } else if (isVariable(value)) {
    var variableValue = (variables || {})[value.name.value];
    argObj[name.value] = variableValue;
  } else if (isListValue(value)) {
    argObj[name.value] = value.values.map(function (listValue) {
      var nestedArgArrayObj = {};
      valueToObjectRepresentation(nestedArgArrayObj, name, listValue, variables);
      return nestedArgArrayObj[name.value];
    });
  } else if (isEnumValue(value)) {
    argObj[name.value] = value.value;
  } else if (isNullValue(value)) {
    argObj[name.value] = null;
  } else {
    throw  false ? undefined : new ts_invariant__WEBPACK_IMPORTED_MODULE_1__["InvariantError"]("The inline argument \"" + name.value + "\" of kind \"" + value.kind + "\"" + 'is not supported. Use variables instead of inline arguments to ' + 'overcome this limitation.');
  }
}
function storeKeyNameFromField(field, variables) {
  var directivesObj = null;
  if (field.directives) {
    directivesObj = {};
    field.directives.forEach(function (directive) {
      directivesObj[directive.name.value] = {};
      if (directive.arguments) {
        directive.arguments.forEach(function (_a) {
          var name = _a.name,
            value = _a.value;
          return valueToObjectRepresentation(directivesObj[directive.name.value], name, value, variables);
        });
      }
    });
  }
  var argObj = null;
  if (field.arguments && field.arguments.length) {
    argObj = {};
    field.arguments.forEach(function (_a) {
      var name = _a.name,
        value = _a.value;
      return valueToObjectRepresentation(argObj, name, value, variables);
    });
  }
  return getStoreKeyName(field.name.value, argObj, directivesObj);
}
var KNOWN_DIRECTIVES = ['connection', 'include', 'skip', 'client', 'rest', 'export'];
function getStoreKeyName(fieldName, args, directives) {
  if (directives && directives['connection'] && directives['connection']['key']) {
    if (directives['connection']['filter'] && directives['connection']['filter'].length > 0) {
      var filterKeys = directives['connection']['filter'] ? directives['connection']['filter'] : [];
      filterKeys.sort();
      var queryArgs_1 = args;
      var filteredArgs_1 = {};
      filterKeys.forEach(function (key) {
        filteredArgs_1[key] = queryArgs_1[key];
      });
      return directives['connection']['key'] + "(" + JSON.stringify(filteredArgs_1) + ")";
    } else {
      return directives['connection']['key'];
    }
  }
  var completeFieldName = fieldName;
  if (args) {
    var stringifiedArgs = fast_json_stable_stringify__WEBPACK_IMPORTED_MODULE_3___default()(args);
    completeFieldName += "(" + stringifiedArgs + ")";
  }
  if (directives) {
    Object.keys(directives).forEach(function (key) {
      if (KNOWN_DIRECTIVES.indexOf(key) !== -1) return;
      if (directives[key] && Object.keys(directives[key]).length) {
        completeFieldName += "@" + key + "(" + JSON.stringify(directives[key]) + ")";
      } else {
        completeFieldName += "@" + key;
      }
    });
  }
  return completeFieldName;
}
function argumentsObjectFromField(field, variables) {
  if (field.arguments && field.arguments.length) {
    var argObj_1 = {};
    field.arguments.forEach(function (_a) {
      var name = _a.name,
        value = _a.value;
      return valueToObjectRepresentation(argObj_1, name, value, variables);
    });
    return argObj_1;
  }
  return null;
}
function resultKeyNameFromField(field) {
  return field.alias ? field.alias.value : field.name.value;
}
function isField(selection) {
  return selection.kind === 'Field';
}
function isInlineFragment(selection) {
  return selection.kind === 'InlineFragment';
}
function isIdValue(idObject) {
  return idObject && idObject.type === 'id' && typeof idObject.generated === 'boolean';
}
function toIdValue(idConfig, generated) {
  if (generated === void 0) {
    generated = false;
  }
  return Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__assign"])({
    type: 'id',
    generated: generated
  }, typeof idConfig === 'string' ? {
    id: idConfig,
    typename: undefined
  } : idConfig);
}
function isJsonValue(jsonObject) {
  return jsonObject != null && typeof jsonObject === 'object' && jsonObject.type === 'json';
}
function defaultValueFromVariable(node) {
  throw  false ? undefined : new ts_invariant__WEBPACK_IMPORTED_MODULE_1__["InvariantError"]("Variable nodes are not supported by valueFromNode");
}
function valueFromNode(node, onVariable) {
  if (onVariable === void 0) {
    onVariable = defaultValueFromVariable;
  }
  switch (node.kind) {
    case 'Variable':
      return onVariable(node);
    case 'NullValue':
      return null;
    case 'IntValue':
      return parseInt(node.value, 10);
    case 'FloatValue':
      return parseFloat(node.value);
    case 'ListValue':
      return node.values.map(function (v) {
        return valueFromNode(v, onVariable);
      });
    case 'ObjectValue':
      {
        var value = {};
        for (var _i = 0, _a = node.fields; _i < _a.length; _i++) {
          var field = _a[_i];
          value[field.name.value] = valueFromNode(field.value, onVariable);
        }
        return value;
      }
    default:
      return node.value;
  }
}
function getDirectiveInfoFromField(field, variables) {
  if (field.directives && field.directives.length) {
    var directiveObj_1 = {};
    field.directives.forEach(function (directive) {
      directiveObj_1[directive.name.value] = argumentsObjectFromField(directive, variables);
    });
    return directiveObj_1;
  }
  return null;
}
function shouldInclude(selection, variables) {
  if (variables === void 0) {
    variables = {};
  }
  return getInclusionDirectives(selection.directives).every(function (_a) {
    var directive = _a.directive,
      ifArgument = _a.ifArgument;
    var evaledValue = false;
    if (ifArgument.value.kind === 'Variable') {
      evaledValue = variables[ifArgument.value.name.value];
       false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"])(evaledValue !== void 0, "Invalid variable referenced in @" + directive.name.value + " directive.");
    } else {
      evaledValue = ifArgument.value.value;
    }
    return directive.name.value === 'skip' ? !evaledValue : evaledValue;
  });
}
function getDirectiveNames(doc) {
  var names = [];
  Object(graphql_language_visitor__WEBPACK_IMPORTED_MODULE_0__["visit"])(doc, {
    Directive: function (node) {
      names.push(node.name.value);
    }
  });
  return names;
}
function hasDirectives(names, doc) {
  return getDirectiveNames(doc).some(function (name) {
    return names.indexOf(name) > -1;
  });
}
function hasClientExports(document) {
  return document && hasDirectives(['client'], document) && hasDirectives(['export'], document);
}
function isInclusionDirective(_a) {
  var value = _a.name.value;
  return value === 'skip' || value === 'include';
}
function getInclusionDirectives(directives) {
  return directives ? directives.filter(isInclusionDirective).map(function (directive) {
    var directiveArguments = directive.arguments;
    var directiveName = directive.name.value;
     false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"])(directiveArguments && directiveArguments.length === 1, "Incorrect number of arguments for the @" + directiveName + " directive.");
    var ifArgument = directiveArguments[0];
     false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"])(ifArgument.name && ifArgument.name.value === 'if', "Invalid argument for the @" + directiveName + " directive.");
    var ifValue = ifArgument.value;
     false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"])(ifValue && (ifValue.kind === 'Variable' || ifValue.kind === 'BooleanValue'), "Argument for the @" + directiveName + " directive must be a variable or a boolean value.");
    return {
      directive: directive,
      ifArgument: ifArgument
    };
  }) : [];
}
function getFragmentQueryDocument(document, fragmentName) {
  var actualFragmentName = fragmentName;
  var fragments = [];
  document.definitions.forEach(function (definition) {
    if (definition.kind === 'OperationDefinition') {
      throw  false ? undefined : new ts_invariant__WEBPACK_IMPORTED_MODULE_1__["InvariantError"]("Found a " + definition.operation + " operation" + (definition.name ? " named '" + definition.name.value + "'" : '') + ". " + 'No operations are allowed when using a fragment as a query. Only fragments are allowed.');
    }
    if (definition.kind === 'FragmentDefinition') {
      fragments.push(definition);
    }
  });
  if (typeof actualFragmentName === 'undefined') {
     false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"])(fragments.length === 1, "Found " + fragments.length + " fragments. `fragmentName` must be provided when there is not exactly 1 fragment.");
    actualFragmentName = fragments[0].name.value;
  }
  var query = Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__assign"])({}, document), {
    definitions: Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__spreadArrays"])([{
      kind: 'OperationDefinition',
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{
          kind: 'FragmentSpread',
          name: {
            kind: 'Name',
            value: actualFragmentName
          }
        }]
      }
    }], document.definitions)
  });
  return query;
}
function assign(target) {
  var sources = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    sources[_i - 1] = arguments[_i];
  }
  sources.forEach(function (source) {
    if (typeof source === 'undefined' || source === null) {
      return;
    }
    Object.keys(source).forEach(function (key) {
      target[key] = source[key];
    });
  });
  return target;
}
function getMutationDefinition(doc) {
  checkDocument(doc);
  var mutationDef = doc.definitions.filter(function (definition) {
    return definition.kind === 'OperationDefinition' && definition.operation === 'mutation';
  })[0];
   false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"])(mutationDef, 'Must contain a mutation definition.');
  return mutationDef;
}
function checkDocument(doc) {
   false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"])(doc && doc.kind === 'Document', "Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a \"gql\" tag? http://docs.apollostack.com/apollo-client/core.html#gql");
  var operations = doc.definitions.filter(function (d) {
    return d.kind !== 'FragmentDefinition';
  }).map(function (definition) {
    if (definition.kind !== 'OperationDefinition') {
      throw  false ? undefined : new ts_invariant__WEBPACK_IMPORTED_MODULE_1__["InvariantError"]("Schema type definitions not allowed in queries. Found: \"" + definition.kind + "\"");
    }
    return definition;
  });
   false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"])(operations.length <= 1, "Ambiguous GraphQL document: contains " + operations.length + " operations");
  return doc;
}
function getOperationDefinition(doc) {
  checkDocument(doc);
  return doc.definitions.filter(function (definition) {
    return definition.kind === 'OperationDefinition';
  })[0];
}
function getOperationDefinitionOrDie(document) {
  var def = getOperationDefinition(document);
   false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"])(def, "GraphQL document is missing an operation");
  return def;
}
function getOperationName(doc) {
  return doc.definitions.filter(function (definition) {
    return definition.kind === 'OperationDefinition' && definition.name;
  }).map(function (x) {
    return x.name.value;
  })[0] || null;
}
function getFragmentDefinitions(doc) {
  return doc.definitions.filter(function (definition) {
    return definition.kind === 'FragmentDefinition';
  });
}
function getQueryDefinition(doc) {
  var queryDef = getOperationDefinition(doc);
   false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"])(queryDef && queryDef.operation === 'query', 'Must contain a query definition.');
  return queryDef;
}
function getFragmentDefinition(doc) {
   false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"])(doc.kind === 'Document', "Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a \"gql\" tag? http://docs.apollostack.com/apollo-client/core.html#gql");
   false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"])(doc.definitions.length <= 1, 'Fragment must have exactly one definition.');
  var fragmentDef = doc.definitions[0];
   false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"])(fragmentDef.kind === 'FragmentDefinition', 'Must be a fragment definition.');
  return fragmentDef;
}
function getMainDefinition(queryDoc) {
  checkDocument(queryDoc);
  var fragmentDefinition;
  for (var _i = 0, _a = queryDoc.definitions; _i < _a.length; _i++) {
    var definition = _a[_i];
    if (definition.kind === 'OperationDefinition') {
      var operation = definition.operation;
      if (operation === 'query' || operation === 'mutation' || operation === 'subscription') {
        return definition;
      }
    }
    if (definition.kind === 'FragmentDefinition' && !fragmentDefinition) {
      fragmentDefinition = definition;
    }
  }
  if (fragmentDefinition) {
    return fragmentDefinition;
  }
  throw  false ? undefined : new ts_invariant__WEBPACK_IMPORTED_MODULE_1__["InvariantError"]('Expected a parsed GraphQL query with a query, mutation, subscription, or a fragment.');
}
function createFragmentMap(fragments) {
  if (fragments === void 0) {
    fragments = [];
  }
  var symTable = {};
  fragments.forEach(function (fragment) {
    symTable[fragment.name.value] = fragment;
  });
  return symTable;
}
function getDefaultValues(definition) {
  if (definition && definition.variableDefinitions && definition.variableDefinitions.length) {
    var defaultValues = definition.variableDefinitions.filter(function (_a) {
      var defaultValue = _a.defaultValue;
      return defaultValue;
    }).map(function (_a) {
      var variable = _a.variable,
        defaultValue = _a.defaultValue;
      var defaultValueObj = {};
      valueToObjectRepresentation(defaultValueObj, variable.name, defaultValue);
      return defaultValueObj;
    });
    return assign.apply(void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__spreadArrays"])([{}], defaultValues));
  }
  return {};
}
function variablesInOperation(operation) {
  var names = new Set();
  if (operation.variableDefinitions) {
    for (var _i = 0, _a = operation.variableDefinitions; _i < _a.length; _i++) {
      var definition = _a[_i];
      names.add(definition.variable.name.value);
    }
  }
  return names;
}
function filterInPlace(array, test, context) {
  var target = 0;
  array.forEach(function (elem, i) {
    if (test.call(this, elem, i, array)) {
      array[target++] = elem;
    }
  }, context);
  array.length = target;
  return array;
}
var TYPENAME_FIELD = {
  kind: 'Field',
  name: {
    kind: 'Name',
    value: '__typename'
  }
};
function isEmpty(op, fragments) {
  return op.selectionSet.selections.every(function (selection) {
    return selection.kind === 'FragmentSpread' && isEmpty(fragments[selection.name.value], fragments);
  });
}
function nullIfDocIsEmpty(doc) {
  return isEmpty(getOperationDefinition(doc) || getFragmentDefinition(doc), createFragmentMap(getFragmentDefinitions(doc))) ? null : doc;
}
function getDirectiveMatcher(directives) {
  return function directiveMatcher(directive) {
    return directives.some(function (dir) {
      return dir.name && dir.name === directive.name.value || dir.test && dir.test(directive);
    });
  };
}
function removeDirectivesFromDocument(directives, doc) {
  var variablesInUse = Object.create(null);
  var variablesToRemove = [];
  var fragmentSpreadsInUse = Object.create(null);
  var fragmentSpreadsToRemove = [];
  var modifiedDoc = nullIfDocIsEmpty(Object(graphql_language_visitor__WEBPACK_IMPORTED_MODULE_0__["visit"])(doc, {
    Variable: {
      enter: function (node, _key, parent) {
        if (parent.kind !== 'VariableDefinition') {
          variablesInUse[node.name.value] = true;
        }
      }
    },
    Field: {
      enter: function (node) {
        if (directives && node.directives) {
          var shouldRemoveField = directives.some(function (directive) {
            return directive.remove;
          });
          if (shouldRemoveField && node.directives && node.directives.some(getDirectiveMatcher(directives))) {
            if (node.arguments) {
              node.arguments.forEach(function (arg) {
                if (arg.value.kind === 'Variable') {
                  variablesToRemove.push({
                    name: arg.value.name.value
                  });
                }
              });
            }
            if (node.selectionSet) {
              getAllFragmentSpreadsFromSelectionSet(node.selectionSet).forEach(function (frag) {
                fragmentSpreadsToRemove.push({
                  name: frag.name.value
                });
              });
            }
            return null;
          }
        }
      }
    },
    FragmentSpread: {
      enter: function (node) {
        fragmentSpreadsInUse[node.name.value] = true;
      }
    },
    Directive: {
      enter: function (node) {
        if (getDirectiveMatcher(directives)(node)) {
          return null;
        }
      }
    }
  }));
  if (modifiedDoc && filterInPlace(variablesToRemove, function (v) {
    return !variablesInUse[v.name];
  }).length) {
    modifiedDoc = removeArgumentsFromDocument(variablesToRemove, modifiedDoc);
  }
  if (modifiedDoc && filterInPlace(fragmentSpreadsToRemove, function (fs) {
    return !fragmentSpreadsInUse[fs.name];
  }).length) {
    modifiedDoc = removeFragmentSpreadFromDocument(fragmentSpreadsToRemove, modifiedDoc);
  }
  return modifiedDoc;
}
function addTypenameToDocument(doc) {
  return Object(graphql_language_visitor__WEBPACK_IMPORTED_MODULE_0__["visit"])(checkDocument(doc), {
    SelectionSet: {
      enter: function (node, _key, parent) {
        if (parent && parent.kind === 'OperationDefinition') {
          return;
        }
        var selections = node.selections;
        if (!selections) {
          return;
        }
        var skip = selections.some(function (selection) {
          return isField(selection) && (selection.name.value === '__typename' || selection.name.value.lastIndexOf('__', 0) === 0);
        });
        if (skip) {
          return;
        }
        var field = parent;
        if (isField(field) && field.directives && field.directives.some(function (d) {
          return d.name.value === 'export';
        })) {
          return;
        }
        return Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__assign"])({}, node), {
          selections: Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__spreadArrays"])(selections, [TYPENAME_FIELD])
        });
      }
    }
  });
}
var connectionRemoveConfig = {
  test: function (directive) {
    var willRemove = directive.name.value === 'connection';
    if (willRemove) {
      if (!directive.arguments || !directive.arguments.some(function (arg) {
        return arg.name.value === 'key';
      })) {
         false || ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"].warn('Removing an @connection directive even though it does not have a key. ' + 'You may want to use the key parameter to specify a store key.');
      }
    }
    return willRemove;
  }
};
function removeConnectionDirectiveFromDocument(doc) {
  return removeDirectivesFromDocument([connectionRemoveConfig], checkDocument(doc));
}
function hasDirectivesInSelectionSet(directives, selectionSet, nestedCheck) {
  if (nestedCheck === void 0) {
    nestedCheck = true;
  }
  return selectionSet && selectionSet.selections && selectionSet.selections.some(function (selection) {
    return hasDirectivesInSelection(directives, selection, nestedCheck);
  });
}
function hasDirectivesInSelection(directives, selection, nestedCheck) {
  if (nestedCheck === void 0) {
    nestedCheck = true;
  }
  if (!isField(selection)) {
    return true;
  }
  if (!selection.directives) {
    return false;
  }
  return selection.directives.some(getDirectiveMatcher(directives)) || nestedCheck && hasDirectivesInSelectionSet(directives, selection.selectionSet, nestedCheck);
}
function getDirectivesFromDocument(directives, doc) {
  checkDocument(doc);
  var parentPath;
  return nullIfDocIsEmpty(Object(graphql_language_visitor__WEBPACK_IMPORTED_MODULE_0__["visit"])(doc, {
    SelectionSet: {
      enter: function (node, _key, _parent, path) {
        var currentPath = path.join('-');
        if (!parentPath || currentPath === parentPath || !currentPath.startsWith(parentPath)) {
          if (node.selections) {
            var selectionsWithDirectives = node.selections.filter(function (selection) {
              return hasDirectivesInSelection(directives, selection);
            });
            if (hasDirectivesInSelectionSet(directives, node, false)) {
              parentPath = currentPath;
            }
            return Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__assign"])({}, node), {
              selections: selectionsWithDirectives
            });
          } else {
            return null;
          }
        }
      }
    }
  }));
}
function getArgumentMatcher(config) {
  return function argumentMatcher(argument) {
    return config.some(function (aConfig) {
      return argument.value && argument.value.kind === 'Variable' && argument.value.name && (aConfig.name === argument.value.name.value || aConfig.test && aConfig.test(argument));
    });
  };
}
function removeArgumentsFromDocument(config, doc) {
  var argMatcher = getArgumentMatcher(config);
  return nullIfDocIsEmpty(Object(graphql_language_visitor__WEBPACK_IMPORTED_MODULE_0__["visit"])(doc, {
    OperationDefinition: {
      enter: function (node) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__assign"])({}, node), {
          variableDefinitions: node.variableDefinitions.filter(function (varDef) {
            return !config.some(function (arg) {
              return arg.name === varDef.variable.name.value;
            });
          })
        });
      }
    },
    Field: {
      enter: function (node) {
        var shouldRemoveField = config.some(function (argConfig) {
          return argConfig.remove;
        });
        if (shouldRemoveField) {
          var argMatchCount_1 = 0;
          node.arguments.forEach(function (arg) {
            if (argMatcher(arg)) {
              argMatchCount_1 += 1;
            }
          });
          if (argMatchCount_1 === 1) {
            return null;
          }
        }
      }
    },
    Argument: {
      enter: function (node) {
        if (argMatcher(node)) {
          return null;
        }
      }
    }
  }));
}
function removeFragmentSpreadFromDocument(config, doc) {
  function enter(node) {
    if (config.some(function (def) {
      return def.name === node.name.value;
    })) {
      return null;
    }
  }
  return nullIfDocIsEmpty(Object(graphql_language_visitor__WEBPACK_IMPORTED_MODULE_0__["visit"])(doc, {
    FragmentSpread: {
      enter: enter
    },
    FragmentDefinition: {
      enter: enter
    }
  }));
}
function getAllFragmentSpreadsFromSelectionSet(selectionSet) {
  var allFragments = [];
  selectionSet.selections.forEach(function (selection) {
    if ((isField(selection) || isInlineFragment(selection)) && selection.selectionSet) {
      getAllFragmentSpreadsFromSelectionSet(selection.selectionSet).forEach(function (frag) {
        return allFragments.push(frag);
      });
    } else if (selection.kind === 'FragmentSpread') {
      allFragments.push(selection);
    }
  });
  return allFragments;
}
function buildQueryFromSelectionSet(document) {
  var definition = getMainDefinition(document);
  var definitionOperation = definition.operation;
  if (definitionOperation === 'query') {
    return document;
  }
  var modifiedDoc = Object(graphql_language_visitor__WEBPACK_IMPORTED_MODULE_0__["visit"])(document, {
    OperationDefinition: {
      enter: function (node) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__assign"])({}, node), {
          operation: 'query'
        });
      }
    }
  });
  return modifiedDoc;
}
function removeClientSetsFromDocument(document) {
  checkDocument(document);
  var modifiedDoc = removeDirectivesFromDocument([{
    test: function (directive) {
      return directive.name.value === 'client';
    },
    remove: true
  }], document);
  if (modifiedDoc) {
    modifiedDoc = Object(graphql_language_visitor__WEBPACK_IMPORTED_MODULE_0__["visit"])(modifiedDoc, {
      FragmentDefinition: {
        enter: function (node) {
          if (node.selectionSet) {
            var isTypenameOnly = node.selectionSet.selections.every(function (selection) {
              return isField(selection) && selection.name.value === '__typename';
            });
            if (isTypenameOnly) {
              return null;
            }
          }
        }
      }
    });
  }
  return modifiedDoc;
}
var canUseWeakMap = typeof WeakMap === 'function' && !(typeof navigator === 'object' && navigator.product === 'ReactNative');
var toString = Object.prototype.toString;
function cloneDeep(value) {
  return cloneDeepHelper(value, new Map());
}
function cloneDeepHelper(val, seen) {
  switch (toString.call(val)) {
    case "[object Array]":
      {
        if (seen.has(val)) return seen.get(val);
        var copy_1 = val.slice(0);
        seen.set(val, copy_1);
        copy_1.forEach(function (child, i) {
          copy_1[i] = cloneDeepHelper(child, seen);
        });
        return copy_1;
      }
    case "[object Object]":
      {
        if (seen.has(val)) return seen.get(val);
        var copy_2 = Object.create(Object.getPrototypeOf(val));
        seen.set(val, copy_2);
        Object.keys(val).forEach(function (key) {
          copy_2[key] = cloneDeepHelper(val[key], seen);
        });
        return copy_2;
      }
    default:
      return val;
  }
}
function getEnv() {
  if (typeof process !== 'undefined' && "development") {
    return "development";
  }
  return 'development';
}
function isEnv(env) {
  return getEnv() === env;
}
function isProduction() {
  return isEnv('production') === true;
}
function isDevelopment() {
  return isEnv('development') === true;
}
function isTest() {
  return isEnv('test') === true;
}
function tryFunctionOrLogError(f) {
  try {
    return f();
  } catch (e) {
    if (console.error) {
      console.error(e);
    }
  }
}
function graphQLResultHasError(result) {
  return result.errors && result.errors.length;
}
function deepFreeze(o) {
  Object.freeze(o);
  Object.getOwnPropertyNames(o).forEach(function (prop) {
    if (o[prop] !== null && (typeof o[prop] === 'object' || typeof o[prop] === 'function') && !Object.isFrozen(o[prop])) {
      deepFreeze(o[prop]);
    }
  });
  return o;
}
function maybeDeepFreeze(obj) {
  if (isDevelopment() || isTest()) {
    var symbolIsPolyfilled = typeof Symbol === 'function' && typeof Symbol('') === 'string';
    if (!symbolIsPolyfilled) {
      return deepFreeze(obj);
    }
  }
  return obj;
}
var hasOwnProperty = Object.prototype.hasOwnProperty;
function mergeDeep() {
  var sources = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    sources[_i] = arguments[_i];
  }
  return mergeDeepArray(sources);
}
function mergeDeepArray(sources) {
  var target = sources[0] || {};
  var count = sources.length;
  if (count > 1) {
    var pastCopies = [];
    target = shallowCopyForMerge(target, pastCopies);
    for (var i = 1; i < count; ++i) {
      target = mergeHelper(target, sources[i], pastCopies);
    }
  }
  return target;
}
function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}
function mergeHelper(target, source, pastCopies) {
  if (isObject(source) && isObject(target)) {
    if (Object.isExtensible && !Object.isExtensible(target)) {
      target = shallowCopyForMerge(target, pastCopies);
    }
    Object.keys(source).forEach(function (sourceKey) {
      var sourceValue = source[sourceKey];
      if (hasOwnProperty.call(target, sourceKey)) {
        var targetValue = target[sourceKey];
        if (sourceValue !== targetValue) {
          target[sourceKey] = mergeHelper(shallowCopyForMerge(targetValue, pastCopies), sourceValue, pastCopies);
        }
      } else {
        target[sourceKey] = sourceValue;
      }
    });
    return target;
  }
  return source;
}
function shallowCopyForMerge(value, pastCopies) {
  if (value !== null && typeof value === 'object' && pastCopies.indexOf(value) < 0) {
    if (Array.isArray(value)) {
      value = value.slice(0);
    } else {
      value = Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__assign"])({
        __proto__: Object.getPrototypeOf(value)
      }, value);
    }
    pastCopies.push(value);
  }
  return value;
}
var haveWarned = Object.create({});
function warnOnceInDevelopment(msg, type) {
  if (type === void 0) {
    type = 'warn';
  }
  if (!isProduction() && !haveWarned[msg]) {
    if (!isTest()) {
      haveWarned[msg] = true;
    }
    if (type === 'error') {
      console.error(msg);
    } else {
      console.warn(msg);
    }
  }
}
function stripSymbols(data) {
  return JSON.parse(JSON.stringify(data));
}


/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-extensions/dist/index.js":
/*!******************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-extensions/dist/index.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const graphql_1 = __webpack_require__(/*! graphql */ "graphql");
var apollo_server_env_1 = __webpack_require__(/*! apollo-server-env */ "apollo-server-env");
exports.Request = apollo_server_env_1.Request;
class GraphQLExtension {}
exports.GraphQLExtension = GraphQLExtension;
class GraphQLExtensionStack {
  constructor(extensions) {
    this.extensions = extensions;
  }
  requestDidStart(o) {
    return this.handleDidStart(ext => ext.requestDidStart && ext.requestDidStart(o));
  }
  parsingDidStart(o) {
    return this.handleDidStart(ext => ext.parsingDidStart && ext.parsingDidStart(o));
  }
  validationDidStart() {
    return this.handleDidStart(ext => ext.validationDidStart && ext.validationDidStart());
  }
  executionDidStart(o) {
    if (o.executionArgs.fieldResolver) {
      this.fieldResolver = o.executionArgs.fieldResolver;
    }
    return this.handleDidStart(ext => ext.executionDidStart && ext.executionDidStart(o));
  }
  willSendResponse(o) {
    let reference = o;
    [...this.extensions].reverse().forEach(extension => {
      if (extension.willSendResponse) {
        const result = extension.willSendResponse(reference);
        if (result) {
          reference = result;
        }
      }
    });
    return reference;
  }
  willResolveField(source, args, context, info) {
    const handlers = this.extensions.map(extension => extension.willResolveField && extension.willResolveField(source, args, context, info)).filter(x => x).reverse();
    return (error, result) => {
      for (const handler of handlers) {
        handler(error, result);
      }
    };
  }
  format() {
    return this.extensions.map(extension => extension.format && extension.format()).filter(x => x).reduce((extensions, [key, value]) => Object.assign(extensions, {
      [key]: value
    }), {});
  }
  handleDidStart(startInvoker) {
    const endHandlers = [];
    this.extensions.forEach(extension => {
      try {
        const endHandler = startInvoker(extension);
        if (endHandler) {
          endHandlers.push(endHandler);
        }
      } catch (error) {
        console.error(error);
      }
    });
    return (...errors) => {
      endHandlers.reverse();
      for (const endHandler of endHandlers) {
        try {
          endHandler(...errors);
        } catch (error) {
          console.error(error);
        }
      }
    };
  }
}
exports.GraphQLExtensionStack = GraphQLExtensionStack;
function enableGraphQLExtensions(schema) {
  if (schema._extensionsEnabled) {
    return schema;
  }
  schema._extensionsEnabled = true;
  forEachField(schema, wrapField);
  return schema;
}
exports.enableGraphQLExtensions = enableGraphQLExtensions;
function wrapField(field) {
  const fieldResolver = field.resolve;
  field.resolve = (source, args, context, info) => {
    const parentPath = info.path.prev;
    const extensionStack = context && context._extensionStack;
    const handler = extensionStack && extensionStack.willResolveField(source, args, context, info) || ((_err, _result) => {});
    const resolveObject = info.parentType.resolveObject;
    let whenObjectResolved;
    if (parentPath && resolveObject) {
      if (!parentPath.__fields) {
        parentPath.__fields = {};
      }
      parentPath.__fields[info.fieldName] = info.fieldNodes;
      whenObjectResolved = parentPath.__whenObjectResolved;
      if (!whenObjectResolved) {
        whenObjectResolved = Promise.resolve().then(() => {
          return resolveObject(source, parentPath.__fields, context, info);
        });
        parentPath.__whenObjectResolved = whenObjectResolved;
      }
    }
    try {
      const actualFieldResolver = fieldResolver || extensionStack && extensionStack.fieldResolver || graphql_1.defaultFieldResolver;
      let result;
      if (whenObjectResolved) {
        result = whenObjectResolved.then(resolvedObject => {
          return actualFieldResolver(resolvedObject, args, context, info);
        });
      } else {
        result = actualFieldResolver(source, args, context, info);
      }
      whenResultIsFinished(result, handler);
      return result;
    } catch (error) {
      handler(error);
      throw error;
    }
  };
}
function isPromise(x) {
  return x && typeof x.then === 'function';
}
function whenResultIsFinished(result, callback) {
  if (isPromise(result)) {
    result.then(r => callback(null, r), err => callback(err));
  } else if (Array.isArray(result)) {
    if (result.some(isPromise)) {
      Promise.all(result).then(r => callback(null, r), err => callback(err));
    } else {
      callback(null, result);
    }
  } else {
    callback(null, result);
  }
}
function forEachField(schema, fn) {
  const typeMap = schema.getTypeMap();
  Object.keys(typeMap).forEach(typeName => {
    const type = typeMap[typeName];
    if (!graphql_1.getNamedType(type).name.startsWith('__') && type instanceof graphql_1.GraphQLObjectType) {
      const fields = type.getFields();
      Object.keys(fields).forEach(fieldName => {
        const field = fields[fieldName];
        fn(field, typeName, fieldName);
      });
    }
  });
}

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-subscriptions/dist/index.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-subscriptions/dist/index.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var pubsub_engine_1 = __webpack_require__(/*! ./pubsub-engine */ "./node_modules/graphpack/node_modules/graphql-subscriptions/dist/pubsub-engine.js");
Object.defineProperty(exports, "PubSubEngine", {
  enumerable: true,
  get: function () {
    return pubsub_engine_1.PubSubEngine;
  }
});
var pubsub_1 = __webpack_require__(/*! ./pubsub */ "./node_modules/graphpack/node_modules/graphql-subscriptions/dist/pubsub.js");
Object.defineProperty(exports, "PubSub", {
  enumerable: true,
  get: function () {
    return pubsub_1.PubSub;
  }
});
var with_filter_1 = __webpack_require__(/*! ./with-filter */ "./node_modules/graphpack/node_modules/graphql-subscriptions/dist/with-filter.js");
Object.defineProperty(exports, "withFilter", {
  enumerable: true,
  get: function () {
    return with_filter_1.withFilter;
  }
});

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-subscriptions/dist/pubsub-async-iterator.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-subscriptions/dist/pubsub-async-iterator.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PubSubAsyncIterator = void 0;
var iterall_1 = __webpack_require__(/*! iterall */ "iterall");
var PubSubAsyncIterator = function () {
  function PubSubAsyncIterator(pubsub, eventNames) {
    this.pubsub = pubsub;
    this.pullQueue = [];
    this.pushQueue = [];
    this.running = true;
    this.allSubscribed = null;
    this.eventsArray = typeof eventNames === 'string' ? [eventNames] : eventNames;
  }
  PubSubAsyncIterator.prototype.next = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!!this.allSubscribed) return [3, 2];
            return [4, this.allSubscribed = this.subscribeAll()];
          case 1:
            _a.sent();
            _a.label = 2;
          case 2:
            return [2, this.pullValue()];
        }
      });
    });
  };
  PubSubAsyncIterator.prototype.return = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.emptyQueue()];
          case 1:
            _a.sent();
            return [2, {
              value: undefined,
              done: true
            }];
        }
      });
    });
  };
  PubSubAsyncIterator.prototype.throw = function (error) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.emptyQueue()];
          case 1:
            _a.sent();
            return [2, Promise.reject(error)];
        }
      });
    });
  };
  PubSubAsyncIterator.prototype[iterall_1.$$asyncIterator] = function () {
    return this;
  };
  PubSubAsyncIterator.prototype.pushValue = function (event) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.allSubscribed];
          case 1:
            _a.sent();
            if (this.pullQueue.length !== 0) {
              this.pullQueue.shift()(this.running ? {
                value: event,
                done: false
              } : {
                value: undefined,
                done: true
              });
            } else {
              this.pushQueue.push(event);
            }
            return [2];
        }
      });
    });
  };
  PubSubAsyncIterator.prototype.pullValue = function () {
    var _this = this;
    return new Promise(function (resolve) {
      if (_this.pushQueue.length !== 0) {
        resolve(_this.running ? {
          value: _this.pushQueue.shift(),
          done: false
        } : {
          value: undefined,
          done: true
        });
      } else {
        _this.pullQueue.push(resolve);
      }
    });
  };
  PubSubAsyncIterator.prototype.emptyQueue = function () {
    return __awaiter(this, void 0, void 0, function () {
      var subscriptionIds;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!this.running) return [3, 2];
            this.running = false;
            this.pullQueue.forEach(function (resolve) {
              return resolve({
                value: undefined,
                done: true
              });
            });
            this.pullQueue.length = 0;
            this.pushQueue.length = 0;
            return [4, this.allSubscribed];
          case 1:
            subscriptionIds = _a.sent();
            if (subscriptionIds) {
              this.unsubscribeAll(subscriptionIds);
            }
            _a.label = 2;
          case 2:
            return [2];
        }
      });
    });
  };
  PubSubAsyncIterator.prototype.subscribeAll = function () {
    var _this = this;
    return Promise.all(this.eventsArray.map(function (eventName) {
      return _this.pubsub.subscribe(eventName, _this.pushValue.bind(_this), {});
    }));
  };
  PubSubAsyncIterator.prototype.unsubscribeAll = function (subscriptionIds) {
    for (var _i = 0, subscriptionIds_1 = subscriptionIds; _i < subscriptionIds_1.length; _i++) {
      var subscriptionId = subscriptionIds_1[_i];
      this.pubsub.unsubscribe(subscriptionId);
    }
  };
  return PubSubAsyncIterator;
}();
exports.PubSubAsyncIterator = PubSubAsyncIterator;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-subscriptions/dist/pubsub-engine.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-subscriptions/dist/pubsub-engine.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PubSubEngine = void 0;
var pubsub_async_iterator_1 = __webpack_require__(/*! ./pubsub-async-iterator */ "./node_modules/graphpack/node_modules/graphql-subscriptions/dist/pubsub-async-iterator.js");
var PubSubEngine = function () {
  function PubSubEngine() {}
  PubSubEngine.prototype.asyncIterator = function (triggers) {
    return new pubsub_async_iterator_1.PubSubAsyncIterator(this, triggers);
  };
  return PubSubEngine;
}();
exports.PubSubEngine = PubSubEngine;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-subscriptions/dist/pubsub.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-subscriptions/dist/pubsub.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return extendStatics(d, b);
  };
  return function (d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PubSub = void 0;
var events_1 = __webpack_require__(/*! events */ "events");
var pubsub_engine_1 = __webpack_require__(/*! ./pubsub-engine */ "./node_modules/graphpack/node_modules/graphql-subscriptions/dist/pubsub-engine.js");
var PubSub = function (_super) {
  __extends(PubSub, _super);
  function PubSub(options) {
    if (options === void 0) {
      options = {};
    }
    var _this = _super.call(this) || this;
    _this.ee = options.eventEmitter || new events_1.EventEmitter();
    _this.subscriptions = {};
    _this.subIdCounter = 0;
    return _this;
  }
  PubSub.prototype.publish = function (triggerName, payload) {
    this.ee.emit(triggerName, payload);
    return Promise.resolve();
  };
  PubSub.prototype.subscribe = function (triggerName, onMessage) {
    this.ee.addListener(triggerName, onMessage);
    this.subIdCounter = this.subIdCounter + 1;
    this.subscriptions[this.subIdCounter] = [triggerName, onMessage];
    return Promise.resolve(this.subIdCounter);
  };
  PubSub.prototype.unsubscribe = function (subId) {
    var _a = this.subscriptions[subId],
      triggerName = _a[0],
      onMessage = _a[1];
    delete this.subscriptions[subId];
    this.ee.removeListener(triggerName, onMessage);
  };
  return PubSub;
}(pubsub_engine_1.PubSubEngine);
exports.PubSub = PubSub;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-subscriptions/dist/with-filter.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-subscriptions/dist/with-filter.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withFilter = void 0;
var iterall_1 = __webpack_require__(/*! iterall */ "iterall");
exports.withFilter = function (asyncIteratorFn, filterFn) {
  return function (rootValue, args, context, info) {
    var _a;
    var asyncIterator = asyncIteratorFn(rootValue, args, context, info);
    var getNextPromise = function () {
      return new Promise(function (resolve, reject) {
        var inner = function () {
          asyncIterator.next().then(function (payload) {
            if (payload.done === true) {
              resolve(payload);
              return;
            }
            Promise.resolve(filterFn(payload.value, args, context, info)).catch(function () {
              return false;
            }).then(function (filterResult) {
              if (filterResult === true) {
                resolve(payload);
                return;
              }
              inner();
              return;
            });
          }).catch(function (err) {
            reject(err);
            return;
          });
        };
        inner();
      });
    };
    var asyncIterator2 = (_a = {
      next: function () {
        return getNextPromise();
      },
      return: function () {
        return asyncIterator.return();
      },
      throw: function (error) {
        return asyncIterator.throw(error);
      }
    }, _a[iterall_1.$$asyncIterator] = function () {
      return this;
    }, _a);
    return asyncIterator2;
  };
};

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/SchemaError.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/generate/SchemaError.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return extendStatics(d, b);
  };
  return function (d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(exports, "__esModule", {
  value: true
});
// @schemaDefinition: A GraphQL type schema in shorthand
// @resolvers: Definitions for resolvers to be merged with schema
var SchemaError = /** @class */function (_super) {
  __extends(SchemaError, _super);
  function SchemaError(message) {
    var _this = _super.call(this, message) || this;
    _this.message = message;
    Error.captureStackTrace(_this, _this.constructor);
    return _this;
  }
  return SchemaError;
}(Error);
exports.default = SchemaError;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/addResolveFunctionsToSchema.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/generate/addResolveFunctionsToSchema.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _1 = __webpack_require__(/*! . */ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/index.js");
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
var transforms_1 = __webpack_require__(/*! ../transforms/transforms */ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/transforms.js");
var _2 = __webpack_require__(/*! . */ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/index.js");
var ConvertEnumValues_1 = __webpack_require__(/*! ../transforms/ConvertEnumValues */ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/ConvertEnumValues.js");
function addResolveFunctionsToSchema(options, legacyInputResolvers, legacyInputValidationOptions) {
  if (options instanceof graphql_1.GraphQLSchema) {
    console.warn('The addResolveFunctionsToSchema function takes named options now; see IAddResolveFunctionsToSchemaOptions');
    options = {
      schema: options,
      resolvers: legacyInputResolvers,
      resolverValidationOptions: legacyInputValidationOptions
    };
  }
  var schema = options.schema,
    inputResolvers = options.resolvers,
    _a = options.resolverValidationOptions,
    resolverValidationOptions = _a === void 0 ? {} : _a,
    _b = options.inheritResolversFromInterfaces,
    inheritResolversFromInterfaces = _b === void 0 ? false : _b;
  var _c = resolverValidationOptions.allowResolversNotInSchema,
    allowResolversNotInSchema = _c === void 0 ? false : _c,
    requireResolversForResolveType = resolverValidationOptions.requireResolversForResolveType;
  var resolvers = inheritResolversFromInterfaces ? _2.extendResolversFromInterfaces(schema, inputResolvers) : inputResolvers;
  // Used to map the external value of an enum to its internal value, when
  // that internal value is provided by a resolver.
  var enumValueMap = Object.create(null);
  Object.keys(resolvers).forEach(function (typeName) {
    var resolverValue = resolvers[typeName];
    var resolverType = typeof resolverValue;
    if (resolverType !== 'object' && resolverType !== 'function') {
      throw new _1.SchemaError("\"" + typeName + "\" defined in resolvers, but has invalid value \"" + resolverValue + "\". A resolver's value " + "must be of type object or function.");
    }
    var type = schema.getType(typeName);
    if (!type && typeName !== '__schema') {
      if (allowResolversNotInSchema) {
        return;
      }
      throw new _1.SchemaError("\"" + typeName + "\" defined in resolvers, but not in schema");
    }
    Object.keys(resolverValue).forEach(function (fieldName) {
      if (fieldName.startsWith('__')) {
        // this is for isTypeOf and resolveType and all the other stuff.
        type[fieldName.substring(2)] = resolverValue[fieldName];
        return;
      }
      if (type instanceof graphql_1.GraphQLScalarType) {
        type[fieldName] = resolverValue[fieldName];
        return;
      }
      if (type instanceof graphql_1.GraphQLEnumType) {
        if (!type.getValue(fieldName)) {
          if (allowResolversNotInSchema) {
            return;
          }
          throw new _1.SchemaError(typeName + "." + fieldName + " was defined in resolvers, but enum is not in schema");
        }
        // We've encountered an enum resolver that is being used to provide an
        // internal enum value.
        // Reference: https://www.apollographql.com/docs/graphql-tools/scalars.html#internal-values
        //
        // We're storing a map of the current enums external facing value to
        // its resolver provided internal value. This map is used to transform
        // the current schema to a new schema that includes enums with the new
        // internal value.
        enumValueMap[type.name] = enumValueMap[type.name] || {};
        enumValueMap[type.name][fieldName] = resolverValue[fieldName];
        return;
      }
      // object type
      var fields = getFieldsForType(type);
      if (!fields) {
        if (allowResolversNotInSchema) {
          return;
        }
        throw new _1.SchemaError(typeName + " was defined in resolvers, but it's not an object");
      }
      if (!fields[fieldName]) {
        if (allowResolversNotInSchema) {
          return;
        }
        throw new _1.SchemaError(typeName + "." + fieldName + " defined in resolvers, but not in schema");
      }
      var field = fields[fieldName];
      var fieldResolve = resolverValue[fieldName];
      if (typeof fieldResolve === 'function') {
        // for convenience. Allows shorter syntax in resolver definition file
        setFieldProperties(field, {
          resolve: fieldResolve
        });
      } else {
        if (typeof fieldResolve !== 'object') {
          throw new _1.SchemaError("Resolver " + typeName + "." + fieldName + " must be object or function");
        }
        setFieldProperties(field, fieldResolve);
      }
    });
  });
  _2.checkForResolveTypeResolver(schema, requireResolversForResolveType);
  // If there are any enum resolver functions (that are used to return
  // internal enum values), create a new schema that includes enums with the
  // new internal facing values.
  var updatedSchema = transforms_1.applySchemaTransforms(schema, [new ConvertEnumValues_1.default(enumValueMap)]);
  return updatedSchema;
}
function getFieldsForType(type) {
  if (type instanceof graphql_1.GraphQLObjectType || type instanceof graphql_1.GraphQLInterfaceType) {
    return type.getFields();
  } else {
    return undefined;
  }
}
function setFieldProperties(field, propertiesObj) {
  Object.keys(propertiesObj).forEach(function (propertyName) {
    field[propertyName] = propertiesObj[propertyName];
  });
}
exports.default = addResolveFunctionsToSchema;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/addSchemaLevelResolveFunction.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/generate/addSchemaLevelResolveFunction.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
// wraps all resolve functions of query, mutation or subscription fields
// with the provided function to simulate a root schema level resolve funciton
function addSchemaLevelResolveFunction(schema, fn) {
  // TODO test that schema is a schema, fn is a function
  var rootTypes = [schema.getQueryType(), schema.getMutationType(), schema.getSubscriptionType()].filter(function (x) {
    return !!x;
  });
  rootTypes.forEach(function (type) {
    // XXX this should run at most once per request to simulate a true root resolver
    // for graphql-js this is an approximation that works with queries but not mutations
    var rootResolveFn = runAtMostOncePerRequest(fn);
    var fields = type.getFields();
    Object.keys(fields).forEach(function (fieldName) {
      // XXX if the type is a subscription, a same query AST will be ran multiple times so we
      // deactivate here the runOnce if it's a subscription. This may not be optimal though...
      if (type === schema.getSubscriptionType()) {
        fields[fieldName].resolve = wrapResolver(fields[fieldName].resolve, fn);
      } else {
        fields[fieldName].resolve = wrapResolver(fields[fieldName].resolve, rootResolveFn);
      }
    });
  });
}
// XXX badly named function. this doesn't really wrap, it just chains resolvers...
function wrapResolver(innerResolver, outerResolver) {
  return function (obj, args, ctx, info) {
    return Promise.resolve(outerResolver(obj, args, ctx, info)).then(function (root) {
      if (innerResolver) {
        return innerResolver(root, args, ctx, info);
      }
      return graphql_1.defaultFieldResolver(root, args, ctx, info);
    });
  };
}
// XXX this function only works for resolvers
// XXX very hacky way to remember if the function
// already ran for this request. This will only work
// if people don't actually cache the operation.
// if they do cache the operation, they will have to
// manually remove the __runAtMostOnce before every request.
function runAtMostOncePerRequest(fn) {
  var value;
  var randomNumber = Math.random();
  return function (root, args, ctx, info) {
    if (!info.operation['__runAtMostOnce']) {
      info.operation['__runAtMostOnce'] = {};
    }
    if (!info.operation['__runAtMostOnce'][randomNumber]) {
      info.operation['__runAtMostOnce'][randomNumber] = true;
      value = fn(root, args, ctx, info);
    }
    return value;
  };
}
exports.default = addSchemaLevelResolveFunction;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/assertResolveFunctionsPresent.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/generate/assertResolveFunctionsPresent.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
var _1 = __webpack_require__(/*! . */ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/index.js");
function assertResolveFunctionsPresent(schema, resolverValidationOptions) {
  if (resolverValidationOptions === void 0) {
    resolverValidationOptions = {};
  }
  var _a = resolverValidationOptions.requireResolversForArgs,
    requireResolversForArgs = _a === void 0 ? false : _a,
    _b = resolverValidationOptions.requireResolversForNonScalar,
    requireResolversForNonScalar = _b === void 0 ? false : _b,
    _c = resolverValidationOptions.requireResolversForAllFields,
    requireResolversForAllFields = _c === void 0 ? false : _c;
  if (requireResolversForAllFields && (requireResolversForArgs || requireResolversForNonScalar)) {
    throw new TypeError('requireResolversForAllFields takes precedence over the more specific assertions. ' + 'Please configure either requireResolversForAllFields or requireResolversForArgs / ' + 'requireResolversForNonScalar, but not a combination of them.');
  }
  _1.forEachField(schema, function (field, typeName, fieldName) {
    // requires a resolve function for *every* field.
    if (requireResolversForAllFields) {
      expectResolveFunction(field, typeName, fieldName);
    }
    // requires a resolve function on every field that has arguments
    if (requireResolversForArgs && field.args.length > 0) {
      expectResolveFunction(field, typeName, fieldName);
    }
    // requires a resolve function on every field that returns a non-scalar type
    if (requireResolversForNonScalar && !(graphql_1.getNamedType(field.type) instanceof graphql_1.GraphQLScalarType)) {
      expectResolveFunction(field, typeName, fieldName);
    }
  });
}
function expectResolveFunction(field, typeName, fieldName) {
  if (!field.resolve) {
    console.warn(
    // tslint:disable-next-line: max-line-length
    "Resolve function missing for \"" + typeName + "." + fieldName + "\". To disable this warning check https://github.com/apollostack/graphql-tools/issues/131");
    return;
  }
  if (typeof field.resolve !== 'function') {
    throw new _1.SchemaError("Resolver \"" + typeName + "." + fieldName + "\" must be a function");
  }
}
exports.default = assertResolveFunctionsPresent;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/attachConnectorsToContext.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/generate/attachConnectorsToContext.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
var deprecated_decorator_1 = __webpack_require__(/*! deprecated-decorator */ "deprecated-decorator");
var _1 = __webpack_require__(/*! . */ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/index.js");
// takes a GraphQL-JS schema and an object of connectors, then attaches
// the connectors to the context by wrapping each query or mutation resolve
// function with a function that attaches connectors if they don't exist.
// attaches connectors only once to make sure they are singletons
var attachConnectorsToContext = deprecated_decorator_1.deprecated({
  version: '0.7.0',
  url: 'https://github.com/apollostack/graphql-tools/issues/140'
}, function (schema, connectors) {
  if (!schema || !(schema instanceof graphql_1.GraphQLSchema)) {
    throw new Error('schema must be an instance of GraphQLSchema. ' + 'This error could be caused by installing more than one version of GraphQL-JS');
  }
  if (typeof connectors !== 'object') {
    var connectorType = typeof connectors;
    throw new Error("Expected connectors to be of type object, got " + connectorType);
  }
  if (Object.keys(connectors).length === 0) {
    throw new Error('Expected connectors to not be an empty object');
  }
  if (Array.isArray(connectors)) {
    throw new Error('Expected connectors to be of type object, got Array');
  }
  if (schema['_apolloConnectorsAttached']) {
    throw new Error('Connectors already attached to context, cannot attach more than once');
  }
  schema['_apolloConnectorsAttached'] = true;
  var attachconnectorFn = function (root, args, ctx) {
    if (typeof ctx !== 'object') {
      // if in any way possible, we should throw an error when the attachconnectors
      // function is called, not when a query is executed.
      var contextType = typeof ctx;
      throw new Error("Cannot attach connector because context is not an object: " + contextType);
    }
    if (typeof ctx.connectors === 'undefined') {
      ctx.connectors = {};
    }
    Object.keys(connectors).forEach(function (connectorName) {
      var connector = connectors[connectorName];
      if (!!connector.prototype) {
        ctx.connectors[connectorName] = new connector(ctx);
      } else {
        throw new Error("Connector must be a function or an class");
      }
    });
    return root;
  };
  _1.addSchemaLevelResolveFunction(schema, attachconnectorFn);
});
exports.default = attachConnectorsToContext;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/attachDirectiveResolvers.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/generate/attachDirectiveResolvers.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return extendStatics(d, b);
  };
  return function (d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
var schemaVisitor_1 = __webpack_require__(/*! ../schemaVisitor */ "./node_modules/graphpack/node_modules/graphql-tools/dist/schemaVisitor.js");
function attachDirectiveResolvers(schema, directiveResolvers) {
  if (typeof directiveResolvers !== 'object') {
    throw new Error("Expected directiveResolvers to be of type object, got " + typeof directiveResolvers);
  }
  if (Array.isArray(directiveResolvers)) {
    throw new Error('Expected directiveResolvers to be of type object, got Array');
  }
  var schemaDirectives = Object.create(null);
  Object.keys(directiveResolvers).forEach(function (directiveName) {
    schemaDirectives[directiveName] = /** @class */function (_super) {
      __extends(class_1, _super);
      function class_1() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      class_1.prototype.visitFieldDefinition = function (field) {
        var _this = this;
        var resolver = directiveResolvers[directiveName];
        var originalResolver = field.resolve || graphql_1.defaultFieldResolver;
        var directiveArgs = this.args;
        field.resolve = function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          var source = args[0] /* original args */,
            context = args[2],
            info = args[3];
          return resolver(function () {
            return __awaiter(_this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                return [2 /*return*/, originalResolver.apply(field, args)];
              });
            });
          }, source, directiveArgs, context, info);
        };
      };
      return class_1;
    }(schemaVisitor_1.SchemaDirectiveVisitor);
  });
  schemaVisitor_1.SchemaDirectiveVisitor.visitSchemaDirectives(schema, schemaDirectives);
}
exports.default = attachDirectiveResolvers;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/buildSchemaFromTypeDefinitions.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/generate/buildSchemaFromTypeDefinitions.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
var _1 = __webpack_require__(/*! . */ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/index.js");
var filterExtensionDefinitions_1 = __webpack_require__(/*! ./filterExtensionDefinitions */ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/filterExtensionDefinitions.js");
function buildSchemaFromTypeDefinitions(typeDefinitions, parseOptions) {
  // TODO: accept only array here, otherwise interfaces get confusing.
  var myDefinitions = typeDefinitions;
  var astDocument;
  if (isDocumentNode(typeDefinitions)) {
    astDocument = typeDefinitions;
  } else if (typeof myDefinitions !== 'string') {
    if (!Array.isArray(myDefinitions)) {
      var type = typeof myDefinitions;
      throw new _1.SchemaError("typeDefs must be a string, array or schema AST, got " + type);
    }
    myDefinitions = _1.concatenateTypeDefs(myDefinitions);
  }
  if (typeof myDefinitions === 'string') {
    astDocument = graphql_1.parse(myDefinitions, parseOptions);
  }
  var backcompatOptions = {
    commentDescriptions: true
  };
  var typesAst = filterExtensionDefinitions_1.default(astDocument);
  // TODO fix types https://github.com/apollographql/graphql-tools/issues/542
  var schema = graphql_1.buildASTSchema(typesAst, backcompatOptions);
  var extensionsAst = _1.extractExtensionDefinitions(astDocument);
  if (extensionsAst.definitions.length > 0) {
    // TODO fix types https://github.com/apollographql/graphql-tools/issues/542
    schema = graphql_1.extendSchema(schema, extensionsAst, backcompatOptions);
  }
  return schema;
}
function isDocumentNode(typeDefinitions) {
  return typeDefinitions.kind !== undefined;
}
exports.default = buildSchemaFromTypeDefinitions;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/chainResolvers.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/generate/chainResolvers.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
function chainResolvers(resolvers) {
  return function (root, args, ctx, info) {
    return resolvers.reduce(function (prev, curResolver) {
      if (curResolver) {
        return curResolver(prev, args, ctx, info);
      }
      return graphql_1.defaultFieldResolver(prev, args, ctx, info);
    }, root);
  };
}
exports.chainResolvers = chainResolvers;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/checkForResolveTypeResolver.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/generate/checkForResolveTypeResolver.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
var _1 = __webpack_require__(/*! . */ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/index.js");
// If we have any union or interface types throw if no there is no resolveType or isTypeOf resolvers
function checkForResolveTypeResolver(schema, requireResolversForResolveType) {
  Object.keys(schema.getTypeMap()).map(function (typeName) {
    return schema.getType(typeName);
  }).forEach(function (type) {
    if (!(type instanceof graphql_1.GraphQLUnionType || type instanceof graphql_1.GraphQLInterfaceType)) {
      return;
    }
    if (!type.resolveType) {
      if (requireResolversForResolveType === false) {
        return;
      }
      if (requireResolversForResolveType === true) {
        throw new _1.SchemaError("Type \"" + type.name + "\" is missing a \"resolveType\" resolver");
      }
      // tslint:disable-next-line:max-line-length
      console.warn("Type \"" + type.name + "\" is missing a \"__resolveType\" resolver. Pass false into " + "\"resolverValidationOptions.requireResolversForResolveType\" to disable this warning.");
    }
  });
}
exports.default = checkForResolveTypeResolver;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/concatenateTypeDefs.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/generate/concatenateTypeDefs.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
var _1 = __webpack_require__(/*! . */ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/index.js");
function concatenateTypeDefs(typeDefinitionsAry, calledFunctionRefs) {
  if (calledFunctionRefs === void 0) {
    calledFunctionRefs = [];
  }
  var resolvedTypeDefinitions = [];
  typeDefinitionsAry.forEach(function (typeDef) {
    if (typeDef.kind !== undefined) {
      typeDef = graphql_1.print(typeDef);
    }
    if (typeof typeDef === 'function') {
      if (calledFunctionRefs.indexOf(typeDef) === -1) {
        calledFunctionRefs.push(typeDef);
        resolvedTypeDefinitions = resolvedTypeDefinitions.concat(concatenateTypeDefs(typeDef(), calledFunctionRefs));
      }
    } else if (typeof typeDef === 'string') {
      resolvedTypeDefinitions.push(typeDef.trim());
    } else {
      var type = typeof typeDef;
      throw new _1.SchemaError("typeDef array must contain only strings and functions, got " + type);
    }
  });
  return uniq(resolvedTypeDefinitions.map(function (x) {
    return x.trim();
  })).join('\n');
}
function uniq(array) {
  return array.reduce(function (accumulator, currentValue) {
    return accumulator.indexOf(currentValue) === -1 ? __spreadArrays(accumulator, [currentValue]) : accumulator;
  }, []);
}
exports.default = concatenateTypeDefs;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/decorateWithLogger.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/generate/decorateWithLogger.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
/*
 * fn: The function to decorate with the logger
 * logger: an object instance of type Logger
 * hint: an optional hint to add to the error's message
 */
function decorateWithLogger(fn, logger, hint) {
  if (typeof fn === 'undefined') {
    fn = graphql_1.defaultFieldResolver;
  }
  var logError = function (e) {
    // TODO: clone the error properly
    var newE = new Error();
    newE.stack = e.stack;
    /* istanbul ignore else: always get the hint from addErrorLoggingToSchema */
    if (hint) {
      newE['originalMessage'] = e.message;
      newE['message'] = "Error in resolver " + hint + "\n" + e.message;
    }
    logger.log(newE);
  };
  return function (root, args, ctx, info) {
    try {
      var result = fn(root, args, ctx, info);
      // If the resolve function returns a Promise log any Promise rejects.
      if (result && typeof result.then === 'function' && typeof result.catch === 'function') {
        result.catch(function (reason) {
          // make sure that it's an error we're logging.
          var error = reason instanceof Error ? reason : new Error(reason);
          logError(error);
          // We don't want to leave an unhandled exception so pass on error.
          return reason;
        });
      }
      return result;
    } catch (e) {
      logError(e);
      // we want to pass on the error, just in case.
      throw e;
    }
  };
}
exports.default = decorateWithLogger;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/extendResolversFromInterfaces.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/generate/extendResolversFromInterfaces.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
function extendResolversFromInterfaces(schema, resolvers) {
  var typeNames = Object.keys(__assign(__assign({}, schema.getTypeMap()), resolvers));
  var extendedResolvers = {};
  typeNames.forEach(function (typeName) {
    var typeResolvers = resolvers[typeName];
    var type = schema.getType(typeName);
    if (type instanceof graphql_1.GraphQLObjectType) {
      var interfaceResolvers = type.getInterfaces().map(function (iFace) {
        return resolvers[iFace.name];
      });
      extendedResolvers[typeName] = Object.assign.apply(Object, __spreadArrays([{}], interfaceResolvers, [typeResolvers]));
    } else {
      if (typeResolvers) {
        extendedResolvers[typeName] = typeResolvers;
      }
    }
  });
  return extendedResolvers;
}
exports.default = extendResolversFromInterfaces;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/extractExtensionDefinitions.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/generate/extractExtensionDefinitions.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var newExtensionDefinitionKind = 'ObjectTypeExtension';
var interfaceExtensionDefinitionKind = 'InterfaceTypeExtension';
var inputObjectExtensionDefinitionKind = 'InputObjectTypeExtension';
var unionExtensionDefinitionKind = 'UnionTypeExtension';
var enumExtensionDefinitionKind = 'EnumTypeExtension';
function extractExtensionDefinitions(ast) {
  var extensionDefs = ast.definitions.filter(function (def) {
    return def.kind === newExtensionDefinitionKind || def.kind === interfaceExtensionDefinitionKind || def.kind === inputObjectExtensionDefinitionKind || def.kind === unionExtensionDefinitionKind || def.kind === enumExtensionDefinitionKind;
  });
  return Object.assign({}, ast, {
    definitions: extensionDefs
  });
}
exports.default = extractExtensionDefinitions;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/filterExtensionDefinitions.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/generate/filterExtensionDefinitions.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
function filterExtensionDefinitions(ast) {
  var extensionDefs = ast.definitions.filter(function (def) {
    return def.kind !== graphql_1.Kind.OBJECT_TYPE_EXTENSION && def.kind !== graphql_1.Kind.INTERFACE_TYPE_EXTENSION && def.kind !== graphql_1.Kind.INPUT_OBJECT_TYPE_EXTENSION && def.kind !== graphql_1.Kind.UNION_TYPE_EXTENSION && def.kind !== graphql_1.Kind.ENUM_TYPE_EXTENSION && def.kind !== graphql_1.Kind.SCALAR_TYPE_EXTENSION && def.kind !== graphql_1.Kind.SCHEMA_EXTENSION;
  });
  return __assign(__assign({}, ast), {
    definitions: extensionDefs
  });
}
exports.default = filterExtensionDefinitions;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/forEachField.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/generate/forEachField.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
function forEachField(schema, fn) {
  var typeMap = schema.getTypeMap();
  Object.keys(typeMap).forEach(function (typeName) {
    var type = typeMap[typeName];
    // TODO: maybe have an option to include these?
    if (!graphql_1.getNamedType(type).name.startsWith('__') && type instanceof graphql_1.GraphQLObjectType) {
      var fields_1 = type.getFields();
      Object.keys(fields_1).forEach(function (fieldName) {
        var field = fields_1[fieldName];
        fn(field, typeName, fieldName);
      });
    }
  });
}
exports.default = forEachField;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/index.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/generate/index.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var addResolveFunctionsToSchema_1 = __webpack_require__(/*! ./addResolveFunctionsToSchema */ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/addResolveFunctionsToSchema.js");
exports.addResolveFunctionsToSchema = addResolveFunctionsToSchema_1.default;
var addSchemaLevelResolveFunction_1 = __webpack_require__(/*! ./addSchemaLevelResolveFunction */ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/addSchemaLevelResolveFunction.js");
exports.addSchemaLevelResolveFunction = addSchemaLevelResolveFunction_1.default;
var assertResolveFunctionsPresent_1 = __webpack_require__(/*! ./assertResolveFunctionsPresent */ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/assertResolveFunctionsPresent.js");
exports.assertResolveFunctionsPresent = assertResolveFunctionsPresent_1.default;
var attachDirectiveResolvers_1 = __webpack_require__(/*! ./attachDirectiveResolvers */ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/attachDirectiveResolvers.js");
exports.attachDirectiveResolvers = attachDirectiveResolvers_1.default;
var attachConnectorsToContext_1 = __webpack_require__(/*! ./attachConnectorsToContext */ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/attachConnectorsToContext.js");
exports.attachConnectorsToContext = attachConnectorsToContext_1.default;
var buildSchemaFromTypeDefinitions_1 = __webpack_require__(/*! ./buildSchemaFromTypeDefinitions */ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/buildSchemaFromTypeDefinitions.js");
exports.buildSchemaFromTypeDefinitions = buildSchemaFromTypeDefinitions_1.default;
var chainResolvers_1 = __webpack_require__(/*! ./chainResolvers */ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/chainResolvers.js");
exports.chainResolvers = chainResolvers_1.chainResolvers;
var checkForResolveTypeResolver_1 = __webpack_require__(/*! ./checkForResolveTypeResolver */ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/checkForResolveTypeResolver.js");
exports.checkForResolveTypeResolver = checkForResolveTypeResolver_1.default;
var concatenateTypeDefs_1 = __webpack_require__(/*! ./concatenateTypeDefs */ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/concatenateTypeDefs.js");
exports.concatenateTypeDefs = concatenateTypeDefs_1.default;
var decorateWithLogger_1 = __webpack_require__(/*! ./decorateWithLogger */ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/decorateWithLogger.js");
exports.decorateWithLogger = decorateWithLogger_1.default;
var extendResolversFromInterfaces_1 = __webpack_require__(/*! ./extendResolversFromInterfaces */ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/extendResolversFromInterfaces.js");
exports.extendResolversFromInterfaces = extendResolversFromInterfaces_1.default;
var extractExtensionDefinitions_1 = __webpack_require__(/*! ./extractExtensionDefinitions */ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/extractExtensionDefinitions.js");
exports.extractExtensionDefinitions = extractExtensionDefinitions_1.default;
var forEachField_1 = __webpack_require__(/*! ./forEachField */ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/forEachField.js");
exports.forEachField = forEachField_1.default;
var SchemaError_1 = __webpack_require__(/*! ./SchemaError */ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/SchemaError.js");
exports.SchemaError = SchemaError_1.default;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/implementsAbstractType.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/implementsAbstractType.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
function implementsAbstractType(schema, typeA, typeB) {
  if (typeA === typeB) {
    return true;
  } else if (graphql_1.isCompositeType(typeA) && graphql_1.isCompositeType(typeB)) {
    return graphql_1.doTypesOverlap(schema, typeA, typeB);
  } else {
    return false;
  }
}
exports.default = implementsAbstractType;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/index.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function __export(m) {
  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
__export(__webpack_require__(/*! ./makeExecutableSchema */ "./node_modules/graphpack/node_modules/graphql-tools/dist/makeExecutableSchema.js"));
__export(__webpack_require__(/*! ./mock */ "./node_modules/graphpack/node_modules/graphql-tools/dist/mock.js"));
__export(__webpack_require__(/*! ./stitching */ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/index.js"));
__export(__webpack_require__(/*! ./transforms */ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/index.js"));
var schemaVisitor_1 = __webpack_require__(/*! ./schemaVisitor */ "./node_modules/graphpack/node_modules/graphql-tools/dist/schemaVisitor.js");
exports.SchemaDirectiveVisitor = schemaVisitor_1.SchemaDirectiveVisitor;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/isEmptyObject.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/isEmptyObject.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
function isEmptyObject(obj) {
  if (!obj) {
    return true;
  }
  for (var key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}
exports.default = isEmptyObject;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/isSpecifiedScalarType.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/isSpecifiedScalarType.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
// FIXME: Replace with https://github.com/graphql/graphql-js/blob/master/src/type/scalars.js#L139
exports.specifiedScalarTypes = [graphql_1.GraphQLString, graphql_1.GraphQLInt, graphql_1.GraphQLFloat, graphql_1.GraphQLBoolean, graphql_1.GraphQLID];
function isSpecifiedScalarType(type) {
  return graphql_1.isNamedType(type) && (
  // Would prefer to use specifiedScalarTypes.some(), however %checks needs
  // a simple expression.
  type.name === graphql_1.GraphQLString.name || type.name === graphql_1.GraphQLInt.name || type.name === graphql_1.GraphQLFloat.name || type.name === graphql_1.GraphQLBoolean.name || type.name === graphql_1.GraphQLID.name);
}
exports.default = isSpecifiedScalarType;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/makeExecutableSchema.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/makeExecutableSchema.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function __export(m) {
  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
var schemaVisitor_1 = __webpack_require__(/*! ./schemaVisitor */ "./node_modules/graphpack/node_modules/graphql-tools/dist/schemaVisitor.js");
var mergeDeep_1 = __webpack_require__(/*! ./mergeDeep */ "./node_modules/graphpack/node_modules/graphql-tools/dist/mergeDeep.js");
var generate_1 = __webpack_require__(/*! ./generate */ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/index.js");
function makeExecutableSchema(_a) {
  var typeDefs = _a.typeDefs,
    _b = _a.resolvers,
    resolvers = _b === void 0 ? {} : _b,
    connectors = _a.connectors,
    logger = _a.logger,
    _c = _a.allowUndefinedInResolve,
    allowUndefinedInResolve = _c === void 0 ? true : _c,
    _d = _a.resolverValidationOptions,
    resolverValidationOptions = _d === void 0 ? {} : _d,
    _e = _a.directiveResolvers,
    directiveResolvers = _e === void 0 ? null : _e,
    _f = _a.schemaDirectives,
    schemaDirectives = _f === void 0 ? null : _f,
    _g = _a.parseOptions,
    parseOptions = _g === void 0 ? {} : _g,
    _h = _a.inheritResolversFromInterfaces,
    inheritResolversFromInterfaces = _h === void 0 ? false : _h;
  // Validate and clean up arguments
  if (typeof resolverValidationOptions !== 'object') {
    throw new generate_1.SchemaError('Expected `resolverValidationOptions` to be an object');
  }
  if (!typeDefs) {
    throw new generate_1.SchemaError('Must provide typeDefs');
  }
  if (!resolvers) {
    throw new generate_1.SchemaError('Must provide resolvers');
  }
  // We allow passing in an array of resolver maps, in which case we merge them
  var resolverMap = Array.isArray(resolvers) ? resolvers.filter(function (resolverObj) {
    return typeof resolverObj === 'object';
  }).reduce(mergeDeep_1.default, {}) : resolvers;
  // Arguments are now validated and cleaned up
  var schema = generate_1.buildSchemaFromTypeDefinitions(typeDefs, parseOptions);
  schema = generate_1.addResolveFunctionsToSchema({
    schema: schema,
    resolvers: resolverMap,
    resolverValidationOptions: resolverValidationOptions,
    inheritResolversFromInterfaces: inheritResolversFromInterfaces
  });
  generate_1.assertResolveFunctionsPresent(schema, resolverValidationOptions);
  if (!allowUndefinedInResolve) {
    addCatchUndefinedToSchema(schema);
  }
  if (logger) {
    addErrorLoggingToSchema(schema, logger);
  }
  if (typeof resolvers['__schema'] === 'function') {
    // TODO a bit of a hack now, better rewrite generateSchema to attach it there.
    // not doing that now, because I'd have to rewrite a lot of tests.
    generate_1.addSchemaLevelResolveFunction(schema, resolvers['__schema']);
  }
  if (connectors) {
    // connectors are optional, at least for now. That means you can just import them in the resolve
    // function if you want.
    generate_1.attachConnectorsToContext(schema, connectors);
  }
  if (directiveResolvers) {
    generate_1.attachDirectiveResolvers(schema, directiveResolvers);
  }
  if (schemaDirectives) {
    schemaVisitor_1.SchemaDirectiveVisitor.visitSchemaDirectives(schema, schemaDirectives);
  }
  return schema;
}
exports.makeExecutableSchema = makeExecutableSchema;
function decorateToCatchUndefined(fn, hint) {
  if (typeof fn === 'undefined') {
    fn = graphql_1.defaultFieldResolver;
  }
  return function (root, args, ctx, info) {
    var result = fn(root, args, ctx, info);
    if (typeof result === 'undefined') {
      throw new Error("Resolve function for \"" + hint + "\" returned undefined");
    }
    return result;
  };
}
function addCatchUndefinedToSchema(schema) {
  generate_1.forEachField(schema, function (field, typeName, fieldName) {
    var errorHint = typeName + "." + fieldName;
    field.resolve = decorateToCatchUndefined(field.resolve, errorHint);
  });
}
exports.addCatchUndefinedToSchema = addCatchUndefinedToSchema;
function addErrorLoggingToSchema(schema, logger) {
  if (!logger) {
    throw new Error('Must provide a logger');
  }
  if (typeof logger.log !== 'function') {
    throw new Error('Logger.log must be a function');
  }
  generate_1.forEachField(schema, function (field, typeName, fieldName) {
    var errorHint = typeName + "." + fieldName;
    field.resolve = generate_1.decorateWithLogger(field.resolve, logger, errorHint);
  });
}
exports.addErrorLoggingToSchema = addErrorLoggingToSchema;
__export(__webpack_require__(/*! ./generate */ "./node_modules/graphpack/node_modules/graphql-tools/dist/generate/index.js"));

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/mergeDeep.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/mergeDeep.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
function mergeDeep(target, source) {
  var output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(function (key) {
      var _a, _b;
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, (_a = {}, _a[key] = source[key], _a));
        } else {
          output[key] = mergeDeep(target[key], source[key]);
        }
      } else {
        Object.assign(output, (_b = {}, _b[key] = source[key], _b));
      }
    });
  }
  return output;
}
exports.default = mergeDeep;
function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/mock.js":
/*!************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/mock.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
var uuid = __webpack_require__(/*! uuid */ "uuid");
var makeExecutableSchema_1 = __webpack_require__(/*! ./makeExecutableSchema */ "./node_modules/graphpack/node_modules/graphql-tools/dist/makeExecutableSchema.js");
// This function wraps addMockFunctionsToSchema for more convenience
function mockServer(schema, mocks, preserveResolvers) {
  if (preserveResolvers === void 0) {
    preserveResolvers = false;
  }
  var mySchema;
  if (!(schema instanceof graphql_1.GraphQLSchema)) {
    // TODO: provide useful error messages here if this fails
    mySchema = makeExecutableSchema_1.buildSchemaFromTypeDefinitions(schema);
  } else {
    mySchema = schema;
  }
  addMockFunctionsToSchema({
    schema: mySchema,
    mocks: mocks,
    preserveResolvers: preserveResolvers
  });
  return {
    query: function (query, vars) {
      return graphql_1.graphql(mySchema, query, {}, {}, vars);
    }
  };
}
exports.mockServer = mockServer;
var defaultMockMap = new Map();
defaultMockMap.set('Int', function () {
  return Math.round(Math.random() * 200) - 100;
});
defaultMockMap.set('Float', function () {
  return Math.random() * 200 - 100;
});
defaultMockMap.set('String', function () {
  return 'Hello World';
});
defaultMockMap.set('Boolean', function () {
  return Math.random() > 0.5;
});
defaultMockMap.set('ID', function () {
  return uuid.v4();
});
// TODO allow providing a seed such that lengths of list could be deterministic
// this could be done by using casual to get a random list length if the casual
// object is global.
function addMockFunctionsToSchema(_a) {
  var schema = _a.schema,
    _b = _a.mocks,
    mocks = _b === void 0 ? {} : _b,
    _c = _a.preserveResolvers,
    preserveResolvers = _c === void 0 ? false : _c;
  if (!schema) {
    throw new Error('Must provide schema to mock');
  }
  if (!(schema instanceof graphql_1.GraphQLSchema)) {
    throw new Error('Value at "schema" must be of type GraphQLSchema');
  }
  if (!isObject(mocks)) {
    throw new Error('mocks must be of type Object');
  }
  // use Map internally, because that API is nicer.
  var mockFunctionMap = new Map();
  Object.keys(mocks).forEach(function (typeName) {
    mockFunctionMap.set(typeName, mocks[typeName]);
  });
  mockFunctionMap.forEach(function (mockFunction, mockTypeName) {
    if (typeof mockFunction !== 'function') {
      throw new Error("mockFunctionMap[" + mockTypeName + "] must be a function");
    }
  });
  var mockType = function (type, typeName, fieldName) {
    // order of precendence for mocking:
    // 1. if the object passed in already has fieldName, just use that
    // --> if it's a function, that becomes your resolver
    // --> if it's a value, the mock resolver will return that
    // 2. if the nullableType is a list, recurse
    // 2. if there's a mock defined for this typeName, that will be used
    // 3. if there's no mock defined, use the default mocks for this type
    return function (root, args, context, info) {
      // nullability doesn't matter for the purpose of mocking.
      var fieldType = graphql_1.getNullableType(type);
      var namedFieldType = graphql_1.getNamedType(fieldType);
      if (root && typeof root[fieldName] !== 'undefined') {
        var result = void 0;
        // if we're here, the field is already defined
        if (typeof root[fieldName] === 'function') {
          result = root[fieldName](root, args, context, info);
          if (result instanceof MockList) {
            result = result.mock(root, args, context, info, fieldType, mockType);
          }
        } else {
          result = root[fieldName];
        }
        // Now we merge the result with the default mock for this type.
        // This allows overriding defaults while writing very little code.
        if (mockFunctionMap.has(namedFieldType.name)) {
          result = mergeMocks(mockFunctionMap.get(namedFieldType.name).bind(null, root, args, context, info), result);
        }
        return result;
      }
      if (fieldType instanceof graphql_1.GraphQLList || fieldType instanceof graphql_1.GraphQLNonNull) {
        return [mockType(fieldType.ofType)(root, args, context, info), mockType(fieldType.ofType)(root, args, context, info)];
      }
      if (mockFunctionMap.has(fieldType.name) && !(fieldType instanceof graphql_1.GraphQLUnionType || fieldType instanceof graphql_1.GraphQLInterfaceType)) {
        // the object passed doesn't have this field, so we apply the default mock
        return mockFunctionMap.get(fieldType.name)(root, args, context, info);
      }
      if (fieldType instanceof graphql_1.GraphQLObjectType) {
        // objects don't return actual data, we only need to mock scalars!
        return {};
      }
      // if a mock function is provided for unionType or interfaceType, execute it to resolve the concrete type
      // otherwise randomly pick a type from all implementation types
      if (fieldType instanceof graphql_1.GraphQLUnionType || fieldType instanceof graphql_1.GraphQLInterfaceType) {
        var implementationType = void 0;
        if (mockFunctionMap.has(fieldType.name)) {
          var interfaceMockObj = mockFunctionMap.get(fieldType.name)(root, args, context, info);
          if (!interfaceMockObj || !interfaceMockObj.__typename) {
            return Error("Please return a __typename in \"" + fieldType.name + "\"");
          }
          implementationType = schema.getType(interfaceMockObj.__typename);
        } else {
          var possibleTypes = schema.getPossibleTypes(fieldType);
          implementationType = getRandomElement(possibleTypes);
        }
        return Object.assign({
          __typename: implementationType
        }, mockType(implementationType)(root, args, context, info));
      }
      if (fieldType instanceof graphql_1.GraphQLEnumType) {
        return getRandomElement(fieldType.getValues()).value;
      }
      if (defaultMockMap.has(fieldType.name)) {
        return defaultMockMap.get(fieldType.name)(root, args, context, info);
      }
      // if we get to here, we don't have a value, and we don't have a mock for this type,
      // we could return undefined, but that would be hard to debug, so we throw instead.
      // however, we returning it instead of throwing it, so preserveResolvers can handle the failures.
      return Error("No mock defined for type \"" + fieldType.name + "\"");
    };
  };
  makeExecutableSchema_1.forEachField(schema, function (field, typeName, fieldName) {
    assignResolveType(field.type, preserveResolvers);
    var mockResolver;
    // we have to handle the root mutation and root query types differently,
    // because no resolver is called at the root.
    /* istanbul ignore next: Must provide schema DefinitionNode with query type or a type named Query. */
    var isOnQueryType = schema.getQueryType() && schema.getQueryType().name === typeName;
    var isOnMutationType = schema.getMutationType() && schema.getMutationType().name === typeName;
    if (isOnQueryType || isOnMutationType) {
      if (mockFunctionMap.has(typeName)) {
        var rootMock_1 = mockFunctionMap.get(typeName);
        // XXX: BUG in here, need to provide proper signature for rootMock.
        if (typeof rootMock_1(undefined, {}, {}, {})[fieldName] === 'function') {
          mockResolver = function (root, args, context, info) {
            var updatedRoot = root || {}; // TODO: should we clone instead?
            updatedRoot[fieldName] = rootMock_1(root, args, context, info)[fieldName];
            // XXX this is a bit of a hack to still use mockType, which
            // lets you mock lists etc. as well
            // otherwise we could just set field.resolve to rootMock()[fieldName]
            // it's like pretending there was a resolve function that ran before
            // the root resolve function.
            return mockType(field.type, typeName, fieldName)(updatedRoot, args, context, info);
          };
        }
      }
    }
    if (!mockResolver) {
      mockResolver = mockType(field.type, typeName, fieldName);
    }
    if (!preserveResolvers || !field.resolve) {
      field.resolve = mockResolver;
    } else {
      var oldResolver_1 = field.resolve;
      field.resolve = function (rootObject, args, context, info) {
        return Promise.all([mockResolver(rootObject, args, context, info), oldResolver_1(rootObject, args, context, info)]).then(function (values) {
          var mockedValue = values[0],
            resolvedValue = values[1];
          // In case we couldn't mock
          if (mockedValue instanceof Error) {
            // only if value was not resolved, populate the error.
            if (undefined === resolvedValue) {
              throw mockedValue;
            }
            return resolvedValue;
          }
          if (resolvedValue instanceof Date && mockedValue instanceof Date) {
            return undefined !== resolvedValue ? resolvedValue : mockedValue;
          }
          if (isObject(mockedValue) && isObject(resolvedValue)) {
            // Object.assign() won't do here, as we need to all properties, including
            // the non-enumerable ones and defined using Object.defineProperty
            var emptyObject = Object.create(Object.getPrototypeOf(resolvedValue));
            return copyOwnProps(emptyObject, resolvedValue, mockedValue);
          }
          return undefined !== resolvedValue ? resolvedValue : mockedValue;
        });
      };
    }
  });
}
exports.addMockFunctionsToSchema = addMockFunctionsToSchema;
function isObject(thing) {
  return thing === Object(thing) && !Array.isArray(thing);
}
// returns a random element from that ary
function getRandomElement(ary) {
  var sample = Math.floor(Math.random() * ary.length);
  return ary[sample];
}
function mergeObjects(a, b) {
  return Object.assign(a, b);
}
function copyOwnPropsIfNotPresent(target, source) {
  Object.getOwnPropertyNames(source).forEach(function (prop) {
    if (!Object.getOwnPropertyDescriptor(target, prop)) {
      Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
    }
  });
}
function copyOwnProps(target) {
  var sources = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    sources[_i - 1] = arguments[_i];
  }
  sources.forEach(function (source) {
    var chain = source;
    while (chain) {
      copyOwnPropsIfNotPresent(target, chain);
      chain = Object.getPrototypeOf(chain);
    }
  });
  return target;
}
// takes either an object or a (possibly nested) array
// and completes the customMock object with any fields
// defined on genericMock
// only merges objects or arrays. Scalars are returned as is
function mergeMocks(genericMockFunction, customMock) {
  if (Array.isArray(customMock)) {
    return customMock.map(function (el) {
      return mergeMocks(genericMockFunction, el);
    });
  }
  if (isObject(customMock)) {
    return mergeObjects(genericMockFunction(), customMock);
  }
  return customMock;
}
function getResolveType(namedFieldType) {
  if (namedFieldType instanceof graphql_1.GraphQLInterfaceType || namedFieldType instanceof graphql_1.GraphQLUnionType) {
    return namedFieldType.resolveType;
  } else {
    return undefined;
  }
}
function assignResolveType(type, preserveResolvers) {
  var fieldType = graphql_1.getNullableType(type);
  var namedFieldType = graphql_1.getNamedType(fieldType);
  var oldResolveType = getResolveType(namedFieldType);
  if (preserveResolvers && oldResolveType && oldResolveType.length) {
    return;
  }
  if (namedFieldType instanceof graphql_1.GraphQLUnionType || namedFieldType instanceof graphql_1.GraphQLInterfaceType) {
    // the default `resolveType` always returns null. We add a fallback
    // resolution that works with how unions and interface are mocked
    namedFieldType.resolveType = function (data, context, info) {
      return info.schema.getType(data.__typename);
    };
  }
}
var MockList = /** @class */function () {
  // wrappedFunction can return another MockList or a value
  function MockList(len, wrappedFunction) {
    this.len = len;
    if (typeof wrappedFunction !== 'undefined') {
      if (typeof wrappedFunction !== 'function') {
        throw new Error('Second argument to MockList must be a function or undefined');
      }
      this.wrappedFunction = wrappedFunction;
    }
  }
  MockList.prototype.mock = function (root, args, context, info, fieldType, mockTypeFunc) {
    var arr;
    if (Array.isArray(this.len)) {
      arr = new Array(this.randint(this.len[0], this.len[1]));
    } else {
      arr = new Array(this.len);
    }
    for (var i = 0; i < arr.length; i++) {
      if (typeof this.wrappedFunction === 'function') {
        var res = this.wrappedFunction(root, args, context, info);
        if (res instanceof MockList) {
          var nullableType = graphql_1.getNullableType(fieldType.ofType);
          arr[i] = res.mock(root, args, context, info, nullableType, mockTypeFunc);
        } else {
          arr[i] = res;
        }
      } else {
        arr[i] = mockTypeFunc(fieldType.ofType)(root, args, context, info);
      }
    }
    return arr;
  };
  MockList.prototype.randint = function (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
  };
  return MockList;
}();
exports.MockList = MockList;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/schemaVisitor.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/schemaVisitor.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return extendStatics(d, b);
  };
  return function (d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
var values_1 = __webpack_require__(/*! graphql/execution/values */ "graphql/execution/values");
var hasOwn = Object.prototype.hasOwnProperty;
// Abstract base class of any visitor implementation, defining the available
// visitor methods along with their parameter types, and providing a static
// helper function for determining whether a subclass implements a given
// visitor method, as opposed to inheriting one of the stubs defined here.
var SchemaVisitor = /** @class */function () {
  function SchemaVisitor() {}
  // Determine if this SchemaVisitor (sub)class implements a particular
  // visitor method.
  SchemaVisitor.implementsVisitorMethod = function (methodName) {
    if (!methodName.startsWith('visit')) {
      return false;
    }
    var method = this.prototype[methodName];
    if (typeof method !== 'function') {
      return false;
    }
    if (this === SchemaVisitor) {
      // The SchemaVisitor class implements every visitor method.
      return true;
    }
    var stub = SchemaVisitor.prototype[methodName];
    if (method === stub) {
      // If this.prototype[methodName] was just inherited from SchemaVisitor,
      // then this class does not really implement the method.
      return false;
    }
    return true;
  };
  // Concrete subclasses of SchemaVisitor should override one or more of these
  // visitor methods, in order to express their interest in handling certain
  // schema types/locations. Each method may return null to remove the given
  // type from the schema, a non-null value of the same type to update the
  // type in the schema, or nothing to leave the type as it was.
  /* tslint:disable:no-empty */
  SchemaVisitor.prototype.visitSchema = function (schema) {};
  SchemaVisitor.prototype.visitScalar = function (scalar) {};
  SchemaVisitor.prototype.visitObject = function (object) {};
  SchemaVisitor.prototype.visitFieldDefinition = function (field, details) {};
  SchemaVisitor.prototype.visitArgumentDefinition = function (argument, details) {};
  SchemaVisitor.prototype.visitInterface = function (iface) {};
  SchemaVisitor.prototype.visitUnion = function (union) {};
  SchemaVisitor.prototype.visitEnum = function (type) {};
  SchemaVisitor.prototype.visitEnumValue = function (value, details) {};
  SchemaVisitor.prototype.visitInputObject = function (object) {};
  SchemaVisitor.prototype.visitInputFieldDefinition = function (field, details) {};
  return SchemaVisitor;
}();
exports.SchemaVisitor = SchemaVisitor;
// Generic function for visiting GraphQLSchema objects.
function visitSchema(schema,
// To accommodate as many different visitor patterns as possible, the
// visitSchema function does not simply accept a single instance of the
// SchemaVisitor class, but instead accepts a function that takes the
// current VisitableSchemaType object and the name of a visitor method and
// returns an array of SchemaVisitor instances that implement the visitor
// method and have an interest in handling the given VisitableSchemaType
// object. In the simplest case, this function can always return an array
// containing a single visitor object, without even looking at the type or
// methodName parameters. In other cases, this function might sometimes
// return an empty array to indicate there are no visitors that should be
// applied to the given VisitableSchemaType object. For an example of a
// visitor pattern that benefits from this abstraction, see the
// SchemaDirectiveVisitor class below.
visitorSelector) {
  // Helper function that calls visitorSelector and applies the resulting
  // visitors to the given type, with arguments [type, ...args].
  function callMethod(methodName, type) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    visitorSelector(type, methodName).every(function (visitor) {
      var newType = visitor[methodName].apply(visitor, __spreadArrays([type], args));
      if (typeof newType === 'undefined') {
        // Keep going without modifying type.
        return true;
      }
      if (methodName === 'visitSchema' || type instanceof graphql_1.GraphQLSchema) {
        throw new Error("Method " + methodName + " cannot replace schema with " + newType);
      }
      if (newType === null) {
        // Stop the loop and return null form callMethod, which will cause
        // the type to be removed from the schema.
        type = null;
        return false;
      }
      // Update type to the new type returned by the visitor method, so that
      // later directives will see the new type, and callMethod will return
      // the final type.
      type = newType;
      return true;
    });
    // If there were no directives for this type object, or if all visitor
    // methods returned nothing, type will be returned unmodified.
    return type;
  }
  // Recursive helper function that calls any appropriate visitor methods for
  // each object in the schema, then traverses the object's children (if any).
  function visit(type) {
    if (type instanceof graphql_1.GraphQLSchema) {
      // Unlike the other types, the root GraphQLSchema object cannot be
      // replaced by visitor methods, because that would make life very hard
      // for SchemaVisitor subclasses that rely on the original schema object.
      callMethod('visitSchema', type);
      updateEachKey(type.getTypeMap(), function (namedType, typeName) {
        if (!typeName.startsWith('__')) {
          // Call visit recursively to let it determine which concrete
          // subclass of GraphQLNamedType we found in the type map. Because
          // we're using updateEachKey, the result of visit(namedType) may
          // cause the type to be removed or replaced.
          return visit(namedType);
        }
      });
      return type;
    }
    if (type instanceof graphql_1.GraphQLObjectType) {
      // Note that callMethod('visitObject', type) may not actually call any
      // methods, if there are no @directive annotations associated with this
      // type, or if this SchemaDirectiveVisitor subclass does not override
      // the visitObject method.
      var newObject = callMethod('visitObject', type);
      if (newObject) {
        visitFields(newObject);
      }
      return newObject;
    }
    if (type instanceof graphql_1.GraphQLInterfaceType) {
      var newInterface = callMethod('visitInterface', type);
      if (newInterface) {
        visitFields(newInterface);
      }
      return newInterface;
    }
    if (type instanceof graphql_1.GraphQLInputObjectType) {
      var newInputObject_1 = callMethod('visitInputObject', type);
      if (newInputObject_1) {
        updateEachKey(newInputObject_1.getFields(), function (field) {
          // Since we call a different method for input object fields, we
          // can't reuse the visitFields function here.
          return callMethod('visitInputFieldDefinition', field, {
            objectType: newInputObject_1
          });
        });
      }
      return newInputObject_1;
    }
    if (type instanceof graphql_1.GraphQLScalarType) {
      return callMethod('visitScalar', type);
    }
    if (type instanceof graphql_1.GraphQLUnionType) {
      return callMethod('visitUnion', type);
    }
    if (type instanceof graphql_1.GraphQLEnumType) {
      var newEnum_1 = callMethod('visitEnum', type);
      if (newEnum_1) {
        updateEachKey(newEnum_1.getValues(), function (value) {
          return callMethod('visitEnumValue', value, {
            enumType: newEnum_1
          });
        });
      }
      return newEnum_1;
    }
    throw new Error("Unexpected schema type: " + type);
  }
  function visitFields(type) {
    updateEachKey(type.getFields(), function (field) {
      // It would be nice if we could call visit(field) recursively here, but
      // GraphQLField is merely a type, not a value that can be detected using
      // an instanceof check, so we have to visit the fields in this lexical
      // context, so that TypeScript can validate the call to
      // visitFieldDefinition.
      var newField = callMethod('visitFieldDefinition', field, {
        // While any field visitor needs a reference to the field object, some
        // field visitors may also need to know the enclosing (parent) type,
        // perhaps to determine if the parent is a GraphQLObjectType or a
        // GraphQLInterfaceType. To obtain a reference to the parent, a
        // visitor method can have a second parameter, which will be an object
        // with an .objectType property referring to the parent.
        objectType: type
      });
      if (newField && newField.args) {
        updateEachKey(newField.args, function (arg) {
          return callMethod('visitArgumentDefinition', arg, {
            // Like visitFieldDefinition, visitArgumentDefinition takes a
            // second parameter that provides additional context, namely the
            // parent .field and grandparent .objectType. Remember that the
            // current GraphQLSchema is always available via this.schema.
            field: newField,
            objectType: type
          });
        });
      }
      return newField;
    });
  }
  visit(schema);
  // Return the original schema for convenience, even though it cannot have
  // been replaced or removed by the code above.
  return schema;
}
exports.visitSchema = visitSchema;
// Update any references to named schema types that disagree with the named
// types found in schema.getTypeMap().
function healSchema(schema) {
  heal(schema);
  return schema;
  function heal(type) {
    if (type instanceof graphql_1.GraphQLSchema) {
      var originalTypeMap_1 = type.getTypeMap();
      var actualNamedTypeMap_1 = Object.create(null);
      // If any of the .name properties of the GraphQLNamedType objects in
      // schema.getTypeMap() have changed, the keys of the type map need to
      // be updated accordingly.
      each(originalTypeMap_1, function (namedType, typeName) {
        if (typeName.startsWith('__')) {
          return;
        }
        var actualName = namedType.name;
        if (actualName.startsWith('__')) {
          return;
        }
        if (hasOwn.call(actualNamedTypeMap_1, actualName)) {
          throw new Error("Duplicate schema type name " + actualName);
        }
        actualNamedTypeMap_1[actualName] = namedType;
        // Note: we are deliberately leaving namedType in the schema by its
        // original name (which might be different from actualName), so that
        // references by that name can be healed.
      });
      // Now add back every named type by its actual name.
      each(actualNamedTypeMap_1, function (namedType, typeName) {
        originalTypeMap_1[typeName] = namedType;
      });
      // Directive declaration argument types can refer to named types.
      each(type.getDirectives(), function (decl) {
        if (decl.args) {
          each(decl.args, function (arg) {
            arg.type = healType(arg.type);
          });
        }
      });
      each(originalTypeMap_1, function (namedType, typeName) {
        if (!typeName.startsWith('__')) {
          heal(namedType);
        }
      });
      updateEachKey(originalTypeMap_1, function (namedType, typeName) {
        // Dangling references to renamed types should remain in the schema
        // during healing, but must be removed now, so that the following
        // invariant holds for all names: schema.getType(name).name === name
        if (!typeName.startsWith('__') && !hasOwn.call(actualNamedTypeMap_1, typeName)) {
          return null;
        }
      });
    } else if (type instanceof graphql_1.GraphQLObjectType) {
      healFields(type);
      each(type.getInterfaces(), function (iface) {
        return heal(iface);
      });
    } else if (type instanceof graphql_1.GraphQLInterfaceType) {
      healFields(type);
    } else if (type instanceof graphql_1.GraphQLInputObjectType) {
      each(type.getFields(), function (field) {
        field.type = healType(field.type);
      });
    } else if (type instanceof graphql_1.GraphQLScalarType) {
      // Nothing to do.
    } else if (type instanceof graphql_1.GraphQLUnionType) {
      updateEachKey(type.getTypes(), function (t) {
        return healType(t);
      });
    } else if (type instanceof graphql_1.GraphQLEnumType) {
      // Nothing to do.
    } else {
      throw new Error("Unexpected schema type: " + type);
    }
  }
  function healFields(type) {
    each(type.getFields(), function (field) {
      field.type = healType(field.type);
      if (field.args) {
        each(field.args, function (arg) {
          arg.type = healType(arg.type);
        });
      }
    });
  }
  function healType(type) {
    // Unwrap the two known wrapper types
    if (type instanceof graphql_1.GraphQLList) {
      type = new graphql_1.GraphQLList(healType(type.ofType));
    } else if (type instanceof graphql_1.GraphQLNonNull) {
      type = new graphql_1.GraphQLNonNull(healType(type.ofType));
    } else if (graphql_1.isNamedType(type)) {
      // If a type annotation on a field or an argument or a union member is
      // any `GraphQLNamedType` with a `name`, then it must end up identical
      // to `schema.getType(name)`, since `schema.getTypeMap()` is the source
      // of truth for all named schema types.
      var namedType = type;
      var officialType = schema.getType(namedType.name);
      if (officialType && namedType !== officialType) {
        return officialType;
      }
    }
    return type;
  }
}
exports.healSchema = healSchema;
// This class represents a reusable implementation of a @directive that may
// appear in a GraphQL schema written in Schema Definition Language.
//
// By overriding one or more visit{Object,Union,...} methods, a subclass
// registers interest in certain schema types, such as GraphQLObjectType,
// GraphQLUnionType, etc. When SchemaDirectiveVisitor.visitSchemaDirectives is
// called with a GraphQLSchema object and a map of visitor subclasses, the
// overidden methods of those subclasses allow the visitors to obtain
// references to any type objects that have @directives attached to them,
// enabling visitors to inspect or modify the schema as appropriate.
//
// For example, if a directive called @rest(url: "...") appears after a field
// definition, a SchemaDirectiveVisitor subclass could provide meaning to that
// directive by overriding the visitFieldDefinition method (which receives a
// GraphQLField parameter), and then the body of that visitor method could
// manipulate the field's resolver function to fetch data from a REST endpoint
// described by the url argument passed to the @rest directive:
//
//   const typeDefs = `
//   type Query {
//     people: [Person] @rest(url: "/api/v1/people")
//   }`;
//
//   const schema = makeExecutableSchema({ typeDefs });
//
//   SchemaDirectiveVisitor.visitSchemaDirectives(schema, {
//     rest: class extends SchemaDirectiveVisitor {
//       public visitFieldDefinition(field: GraphQLField<any, any>) {
//         const { url } = this.args;
//         field.resolve = () => fetch(url);
//       }
//     }
//   });
//
// The subclass in this example is defined as an anonymous class expression,
// for brevity. A truly reusable SchemaDirectiveVisitor would most likely be
// defined in a library using a named class declaration, and then exported for
// consumption by other modules and packages.
//
// See below for a complete list of overridable visitor methods, their
// parameter types, and more details about the properties exposed by instances
// of the SchemaDirectiveVisitor class.
var SchemaDirectiveVisitor = /** @class */function (_super) {
  __extends(SchemaDirectiveVisitor, _super);
  // Mark the constructor protected to enforce passing SchemaDirectiveVisitor
  // subclasses (not instances) to visitSchemaDirectives.
  function SchemaDirectiveVisitor(config) {
    var _this = _super.call(this) || this;
    _this.name = config.name;
    _this.args = config.args;
    _this.visitedType = config.visitedType;
    _this.schema = config.schema;
    _this.context = config.context;
    return _this;
  }
  // Override this method to return a custom GraphQLDirective (or modify one
  // already present in the schema) to enforce argument types, provide default
  // argument values, or specify schema locations where this @directive may
  // appear. By default, any declaration found in the schema will be returned.
  SchemaDirectiveVisitor.getDirectiveDeclaration = function (directiveName, schema) {
    return schema.getDirective(directiveName);
  };
  // Call SchemaDirectiveVisitor.visitSchemaDirectives to visit every
  // @directive in the schema and create an appropriate SchemaDirectiveVisitor
  // instance to visit the object decorated by the @directive.
  SchemaDirectiveVisitor.visitSchemaDirectives = function (schema, directiveVisitors,
  // Optional context object that will be available to all visitor instances
  // via this.context. Defaults to an empty null-prototype object.
  context) {
    if (context === void 0) {
      context = Object.create(null);
    }
    // If the schema declares any directives for public consumption, record
    // them here so that we can properly coerce arguments when/if we encounter
    // an occurrence of the directive while walking the schema below.
    var declaredDirectives = this.getDeclaredDirectives(schema, directiveVisitors);
    // Map from directive names to lists of SchemaDirectiveVisitor instances
    // created while visiting the schema.
    var createdVisitors = Object.create(null);
    Object.keys(directiveVisitors).forEach(function (directiveName) {
      createdVisitors[directiveName] = [];
    });
    function visitorSelector(type, methodName) {
      var visitors = [];
      var directiveNodes = type.astNode && type.astNode.directives;
      if (!directiveNodes) {
        return visitors;
      }
      directiveNodes.forEach(function (directiveNode) {
        var directiveName = directiveNode.name.value;
        if (!hasOwn.call(directiveVisitors, directiveName)) {
          return;
        }
        var visitorClass = directiveVisitors[directiveName];
        // Avoid creating visitor objects if visitorClass does not override
        // the visitor method named by methodName.
        if (!visitorClass.implementsVisitorMethod(methodName)) {
          return;
        }
        var decl = declaredDirectives[directiveName];
        var args;
        if (decl) {
          // If this directive was explicitly declared, use the declared
          // argument types (and any default values) to check, coerce, and/or
          // supply default values for the given arguments.
          args = values_1.getArgumentValues(decl, directiveNode);
        } else {
          // If this directive was not explicitly declared, just convert the
          // argument nodes to their corresponding JavaScript values.
          args = Object.create(null);
          directiveNode.arguments.forEach(function (arg) {
            args[arg.name.value] = valueFromASTUntyped(arg.value);
          });
        }
        // As foretold in comments near the top of the visitSchemaDirectives
        // method, this is where instances of the SchemaDirectiveVisitor class
        // get created and assigned names. While subclasses could override the
        // constructor method, the constructor is marked as protected, so
        // these are the only arguments that will ever be passed.
        visitors.push(new visitorClass({
          name: directiveName,
          args: args,
          visitedType: type,
          schema: schema,
          context: context
        }));
      });
      if (visitors.length > 0) {
        visitors.forEach(function (visitor) {
          createdVisitors[visitor.name].push(visitor);
        });
      }
      return visitors;
    }
    visitSchema(schema, visitorSelector);
    // Automatically update any references to named schema types replaced
    // during the traversal, so implementors don't have to worry about that.
    healSchema(schema);
    return createdVisitors;
  };
  SchemaDirectiveVisitor.getDeclaredDirectives = function (schema, directiveVisitors) {
    var declaredDirectives = Object.create(null);
    each(schema.getDirectives(), function (decl) {
      declaredDirectives[decl.name] = decl;
    });
    // If the visitor subclass overrides getDirectiveDeclaration, and it
    // returns a non-null GraphQLDirective, use that instead of any directive
    // declared in the schema itself. Reasoning: if a SchemaDirectiveVisitor
    // goes to the trouble of implementing getDirectiveDeclaration, it should
    // be able to rely on that implementation.
    each(directiveVisitors, function (visitorClass, directiveName) {
      var decl = visitorClass.getDirectiveDeclaration(directiveName, schema);
      if (decl) {
        declaredDirectives[directiveName] = decl;
      }
    });
    each(declaredDirectives, function (decl, name) {
      if (!hasOwn.call(directiveVisitors, name)) {
        // SchemaDirectiveVisitors.visitSchemaDirectives might be called
        // multiple times with partial directiveVisitors maps, so it's not
        // necessarily an error for directiveVisitors to be missing an
        // implementation of a directive that was declared in the schema.
        return;
      }
      var visitorClass = directiveVisitors[name];
      each(decl.locations, function (loc) {
        var visitorMethodName = directiveLocationToVisitorMethodName(loc);
        if (SchemaVisitor.implementsVisitorMethod(visitorMethodName) && !visitorClass.implementsVisitorMethod(visitorMethodName)) {
          // While visitor subclasses may implement extra visitor methods,
          // it's definitely a mistake if the GraphQLDirective declares itself
          // applicable to certain schema locations, and the visitor subclass
          // does not implement all the corresponding methods.
          throw new Error("SchemaDirectiveVisitor for @" + name + " must implement " + visitorMethodName + " method");
        }
      });
    });
    return declaredDirectives;
  };
  return SchemaDirectiveVisitor;
}(SchemaVisitor);
exports.SchemaDirectiveVisitor = SchemaDirectiveVisitor;
// Convert a string like "FIELD_DEFINITION" to "visitFieldDefinition".
function directiveLocationToVisitorMethodName(loc) {
  return 'visit' + loc.replace(/([^_]*)_?/g, function (wholeMatch, part) {
    return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
  });
}
function each(arrayOrObject, callback) {
  Object.keys(arrayOrObject).forEach(function (key) {
    callback(arrayOrObject[key], key);
  });
}
// A more powerful version of each that has the ability to replace or remove
// array or object keys.
function updateEachKey(arrayOrObject,
// The callback can return nothing to leave the key untouched, null to remove
// the key from the array or object, or a non-null V to replace the value.
callback) {
  var deletedCount = 0;
  Object.keys(arrayOrObject).forEach(function (key) {
    var result = callback(arrayOrObject[key], key);
    if (typeof result === 'undefined') {
      return;
    }
    if (result === null) {
      delete arrayOrObject[key];
      deletedCount++;
      return;
    }
    arrayOrObject[key] = result;
  });
  if (deletedCount > 0 && Array.isArray(arrayOrObject)) {
    // Remove any holes from the array due to deleted elements.
    arrayOrObject.splice(0).forEach(function (elem) {
      arrayOrObject.push(elem);
    });
  }
}
// Similar to the graphql-js function of the same name, slightly simplified:
// https://github.com/graphql/graphql-js/blob/master/src/utilities/valueFromASTUntyped.js
function valueFromASTUntyped(valueNode) {
  switch (valueNode.kind) {
    case graphql_1.Kind.NULL:
      return null;
    case graphql_1.Kind.INT:
      return parseInt(valueNode.value, 10);
    case graphql_1.Kind.FLOAT:
      return parseFloat(valueNode.value);
    case graphql_1.Kind.STRING:
    case graphql_1.Kind.ENUM:
    case graphql_1.Kind.BOOLEAN:
      return valueNode.value;
    case graphql_1.Kind.LIST:
      return valueNode.values.map(valueFromASTUntyped);
    case graphql_1.Kind.OBJECT:
      var obj_1 = Object.create(null);
      valueNode.fields.forEach(function (field) {
        obj_1[field.name.value] = valueFromASTUntyped(field.value);
      });
      return obj_1;
    /* istanbul ignore next */
    default:
      throw new Error('Unexpected value kind: ' + valueNode.kind);
  }
}

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/defaultMergedResolver.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/defaultMergedResolver.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
var error_1 = __webpack_require__(/*! graphql/error */ "graphql/error");
var errors_1 = __webpack_require__(/*! ./errors */ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/errors.js");
var getResponseKeyFromInfo_1 = __webpack_require__(/*! ./getResponseKeyFromInfo */ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/getResponseKeyFromInfo.js");
// Resolver that knows how to:
// a) handle aliases for proxied schemas
// b) handle errors from proxied schemas
var defaultMergedResolver = function (parent, args, context, info) {
  if (!parent) {
    return null;
  }
  var responseKey = getResponseKeyFromInfo_1.getResponseKeyFromInfo(info);
  var errorResult = errors_1.getErrorsFromParent(parent, responseKey);
  if (errorResult.kind === 'OWN') {
    throw error_1.locatedError(new Error(errorResult.error.message), info.fieldNodes, graphql_1.responsePathAsArray(info.path));
  }
  var result = parent[responseKey];
  if (result == null) {
    result = parent[info.fieldName];
  }
  // subscription result mapping
  if (!result && parent.data && parent.data[responseKey]) {
    result = parent.data[responseKey];
  }
  if (errorResult.errors) {
    result = errors_1.annotateWithChildrenErrors(result, errorResult.errors);
  }
  return result;
};
exports.default = defaultMergedResolver;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/delegateToSchema.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/delegateToSchema.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
var transforms_1 = __webpack_require__(/*! ../transforms/transforms */ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/transforms.js");
var AddArgumentsAsVariables_1 = __webpack_require__(/*! ../transforms/AddArgumentsAsVariables */ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/AddArgumentsAsVariables.js");
var FilterToSchema_1 = __webpack_require__(/*! ../transforms/FilterToSchema */ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/FilterToSchema.js");
var AddTypenameToAbstract_1 = __webpack_require__(/*! ../transforms/AddTypenameToAbstract */ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/AddTypenameToAbstract.js");
var CheckResultAndHandleErrors_1 = __webpack_require__(/*! ../transforms/CheckResultAndHandleErrors */ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/CheckResultAndHandleErrors.js");
var mapAsyncIterator_1 = __webpack_require__(/*! ./mapAsyncIterator */ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/mapAsyncIterator.js");
var ExpandAbstractTypes_1 = __webpack_require__(/*! ../transforms/ExpandAbstractTypes */ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/ExpandAbstractTypes.js");
var ReplaceFieldWithFragment_1 = __webpack_require__(/*! ../transforms/ReplaceFieldWithFragment */ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/ReplaceFieldWithFragment.js");
var ConvertEnumResponse_1 = __webpack_require__(/*! ../transforms/ConvertEnumResponse */ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/ConvertEnumResponse.js");
function delegateToSchema(options) {
  var args = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }
  if (options instanceof graphql_1.GraphQLSchema) {
    throw new Error('Passing positional arguments to delegateToSchema is a deprecated. ' + 'Please pass named parameters instead.');
  }
  return delegateToSchemaImplementation(options);
}
exports.default = delegateToSchema;
function delegateToSchemaImplementation(options) {
  return __awaiter(this, void 0, void 0, function () {
    var info, _a, args, operation, rawDocument, rawRequest, transforms, processedRequest, errors, _b, executionResult;
    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          info = options.info, _a = options.args, args = _a === void 0 ? {} : _a;
          operation = options.operation || info.operation.operation;
          rawDocument = createDocument(options.fieldName, operation, info.fieldNodes, Object.keys(info.fragments).map(function (fragmentName) {
            return info.fragments[fragmentName];
          }), info.operation.variableDefinitions, info.operation.name);
          rawRequest = {
            document: rawDocument,
            variables: info.variableValues
          };
          transforms = __spreadArrays(options.transforms || [], [new ExpandAbstractTypes_1.default(info.schema, options.schema)]);
          if (info.mergeInfo && info.mergeInfo.fragments) {
            transforms.push(new ReplaceFieldWithFragment_1.default(options.schema, info.mergeInfo.fragments));
          }
          transforms = transforms.concat([new AddArgumentsAsVariables_1.default(options.schema, args), new FilterToSchema_1.default(options.schema), new AddTypenameToAbstract_1.default(options.schema), new CheckResultAndHandleErrors_1.default(info, options.fieldName)]);
          if (graphql_1.isEnumType(options.info.returnType)) {
            transforms = transforms.concat(new ConvertEnumResponse_1.default(options.info.returnType));
          }
          processedRequest = transforms_1.applyRequestTransforms(rawRequest, transforms);
          if (!options.skipValidation) {
            errors = graphql_1.validate(options.schema, processedRequest.document);
            if (errors.length > 0) {
              throw errors;
            }
          }
          if (!(operation === 'query' || operation === 'mutation')) return [3 /*break*/, 2];
          _b = transforms_1.applyResultTransforms;
          return [4 /*yield*/, graphql_1.execute(options.schema, processedRequest.document, info.rootValue, options.context, processedRequest.variables)];
        case 1:
          return [2 /*return*/, _b.apply(void 0, [_c.sent(), transforms])];
        case 2:
          if (!(operation === 'subscription')) return [3 /*break*/, 4];
          return [4 /*yield*/, graphql_1.subscribe(options.schema, processedRequest.document, info.rootValue, options.context, processedRequest.variables)];
        case 3:
          executionResult = _c.sent();
          // "subscribe" to the subscription result and map the result through the transforms
          return [2 /*return*/, mapAsyncIterator_1.default(executionResult, function (result) {
            var _a;
            var transformedResult = transforms_1.applyResultTransforms(result, transforms);
            var subscriptionKey = Object.keys(result.data)[0];
            // for some reason the returned transformedResult needs to be nested inside the root subscription field
            // does not work otherwise...
            return _a = {}, _a[subscriptionKey] = transformedResult, _a;
          })];
        case 4:
          return [2 /*return*/];
      }
    });
  });
}

function createDocument(targetField, targetOperation, originalSelections, fragments, variables, operationName) {
  var selections = [];
  var args = [];
  originalSelections.forEach(function (field) {
    var fieldSelections = field.selectionSet ? field.selectionSet.selections : [];
    selections = selections.concat(fieldSelections);
    args = args.concat(field.arguments || []);
  });
  var selectionSet = null;
  if (selections.length > 0) {
    selectionSet = {
      kind: graphql_1.Kind.SELECTION_SET,
      selections: selections
    };
  }
  var rootField = {
    kind: graphql_1.Kind.FIELD,
    alias: null,
    arguments: args,
    selectionSet: selectionSet,
    name: {
      kind: graphql_1.Kind.NAME,
      value: targetField
    }
  };
  var rootSelectionSet = {
    kind: graphql_1.Kind.SELECTION_SET,
    selections: [rootField]
  };
  var operationDefinition = {
    kind: graphql_1.Kind.OPERATION_DEFINITION,
    operation: targetOperation,
    variableDefinitions: variables,
    selectionSet: rootSelectionSet,
    name: operationName
  };
  return {
    kind: graphql_1.Kind.DOCUMENT,
    definitions: __spreadArrays([operationDefinition], fragments)
  };
}

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/errors.js":
/*!************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/errors.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return extendStatics(d, b);
  };
  return function (d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
var error_1 = __webpack_require__(/*! graphql/error */ "graphql/error");
var getResponseKeyFromInfo_1 = __webpack_require__(/*! ./getResponseKeyFromInfo */ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/getResponseKeyFromInfo.js");
if (typeof global !== 'undefined' && 'Symbol' in global || typeof window !== 'undefined' && 'Symbol' in window) {
  exports.ERROR_SYMBOL = Symbol('subSchemaErrors');
} else {
  exports.ERROR_SYMBOL = '@@__subSchemaErrors';
}
function annotateWithChildrenErrors(object, childrenErrors) {
  var _a;
  if (!childrenErrors || childrenErrors.length === 0) {
    // Nothing to see here, move along
    return object;
  }
  if (Array.isArray(object)) {
    var byIndex_1 = {};
    childrenErrors.forEach(function (error) {
      if (!error.path) {
        return;
      }
      var index = error.path[1];
      var current = byIndex_1[index] || [];
      current.push(__assign(__assign({}, error), {
        path: error.path.slice(1)
      }));
      byIndex_1[index] = current;
    });
    return object.map(function (item, index) {
      return annotateWithChildrenErrors(item, byIndex_1[index]);
    });
  }
  return __assign(__assign({}, object), (_a = {}, _a[exports.ERROR_SYMBOL] = childrenErrors.map(function (error) {
    return __assign(__assign({}, error), error.path ? {
      path: error.path.slice(1)
    } : {});
  }), _a));
}
exports.annotateWithChildrenErrors = annotateWithChildrenErrors;
function getErrorsFromParent(object, fieldName) {
  var errors = object && object[exports.ERROR_SYMBOL] || [];
  var childrenErrors = [];
  for (var _i = 0, errors_1 = errors; _i < errors_1.length; _i++) {
    var error = errors_1[_i];
    if (!error.path || error.path.length === 1 && error.path[0] === fieldName) {
      return {
        kind: 'OWN',
        error: error
      };
    } else if (error.path[0] === fieldName) {
      childrenErrors.push(error);
    }
  }
  return {
    kind: 'CHILDREN',
    errors: childrenErrors
  };
}
exports.getErrorsFromParent = getErrorsFromParent;
var CombinedError = /** @class */function (_super) {
  __extends(CombinedError, _super);
  function CombinedError(message, errors) {
    var _this = _super.call(this, message) || this;
    _this.errors = errors;
    return _this;
  }
  return CombinedError;
}(Error);
function checkResultAndHandleErrors(result, info, responseKey) {
  if (!responseKey) {
    responseKey = getResponseKeyFromInfo_1.getResponseKeyFromInfo(info);
  }
  if (result.errors && (!result.data || result.data[responseKey] == null)) {
    // apollo-link-http & http-link-dataloader need the
    // result property to be passed through for better error handling.
    // If there is only one error, which contains a result property, pass the error through
    var newError = result.errors.length === 1 && hasResult(result.errors[0]) ? result.errors[0] : new CombinedError(concatErrors(result.errors), result.errors);
    throw error_1.locatedError(newError, info.fieldNodes, graphql_1.responsePathAsArray(info.path));
  }
  var resultObject = result.data[responseKey];
  if (result.errors) {
    resultObject = annotateWithChildrenErrors(resultObject, result.errors);
  }
  return resultObject;
}
exports.checkResultAndHandleErrors = checkResultAndHandleErrors;
function concatErrors(errors) {
  return errors.map(function (error) {
    return error.message;
  }).join('\n');
}
function hasResult(error) {
  return error.result || error.extensions || error.originalError && error.originalError.result;
}

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/getResponseKeyFromInfo.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/getResponseKeyFromInfo.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Get the key under which the result of this resolver will be placed in the response JSON. Basically, just
 * resolves aliases.
 * @param info The info argument to the resolver.
 */
function getResponseKeyFromInfo(info) {
  return info.fieldNodes[0].alias ? info.fieldNodes[0].alias.value : info.fieldName;
}
exports.getResponseKeyFromInfo = getResponseKeyFromInfo;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/index.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/index.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var makeRemoteExecutableSchema_1 = __webpack_require__(/*! ./makeRemoteExecutableSchema */ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/makeRemoteExecutableSchema.js");
exports.makeRemoteExecutableSchema = makeRemoteExecutableSchema_1.default;
exports.defaultCreateRemoteResolver = makeRemoteExecutableSchema_1.createResolver;
var introspectSchema_1 = __webpack_require__(/*! ./introspectSchema */ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/introspectSchema.js");
exports.introspectSchema = introspectSchema_1.default;
var mergeSchemas_1 = __webpack_require__(/*! ./mergeSchemas */ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/mergeSchemas.js");
exports.mergeSchemas = mergeSchemas_1.default;
var delegateToSchema_1 = __webpack_require__(/*! ./delegateToSchema */ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/delegateToSchema.js");
exports.delegateToSchema = delegateToSchema_1.default;
var defaultMergedResolver_1 = __webpack_require__(/*! ./defaultMergedResolver */ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/defaultMergedResolver.js");
exports.defaultMergedResolver = defaultMergedResolver_1.default;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/introspectSchema.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/introspectSchema.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
var utilities_1 = __webpack_require__(/*! graphql/utilities */ "graphql/utilities");
var linkToFetcher_1 = __webpack_require__(/*! ./linkToFetcher */ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/linkToFetcher.js");
var parsedIntrospectionQuery = graphql_1.parse(utilities_1.getIntrospectionQuery());
function introspectSchema(fetcher, linkContext) {
  return __awaiter(this, void 0, void 0, function () {
    var introspectionResult, schema;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          // Convert link to fetcher
          if (fetcher.request) {
            fetcher = linkToFetcher_1.default(fetcher);
          }
          return [4 /*yield*/, fetcher({
            query: parsedIntrospectionQuery,
            context: linkContext
          })];
        case 1:
          introspectionResult = _a.sent();
          if (introspectionResult.errors && introspectionResult.errors.length || !introspectionResult.data.__schema) {
            throw introspectionResult.errors;
          } else {
            schema = graphql_1.buildClientSchema(introspectionResult.data);
            return [2 /*return*/, schema];
          }
          return [2 /*return*/];
      }
    });
  });
}

exports.default = introspectSchema;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/linkToFetcher.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/linkToFetcher.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var apollo_link_1 = __webpack_require__(/*! apollo-link */ "./node_modules/graphpack/node_modules/apollo-link/lib/bundle.esm.js");
var apollo_link_2 = __webpack_require__(/*! apollo-link */ "./node_modules/graphpack/node_modules/apollo-link/lib/bundle.esm.js");
exports.execute = apollo_link_2.execute;
function linkToFetcher(link) {
  return function (fetcherOperation) {
    return apollo_link_1.makePromise(apollo_link_1.execute(link, fetcherOperation));
  };
}
exports.default = linkToFetcher;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/makeRemoteExecutableSchema.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/makeRemoteExecutableSchema.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
var linkToFetcher_1 = __webpack_require__(/*! ./linkToFetcher */ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/linkToFetcher.js");
var isEmptyObject_1 = __webpack_require__(/*! ../isEmptyObject */ "./node_modules/graphpack/node_modules/graphql-tools/dist/isEmptyObject.js");
var makeExecutableSchema_1 = __webpack_require__(/*! ../makeExecutableSchema */ "./node_modules/graphpack/node_modules/graphql-tools/dist/makeExecutableSchema.js");
var schemaRecreation_1 = __webpack_require__(/*! ./schemaRecreation */ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/schemaRecreation.js");
var resolveFromParentTypename_1 = __webpack_require__(/*! ./resolveFromParentTypename */ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/resolveFromParentTypename.js");
var defaultMergedResolver_1 = __webpack_require__(/*! ./defaultMergedResolver */ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/defaultMergedResolver.js");
var errors_1 = __webpack_require__(/*! ./errors */ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/errors.js");
var observableToAsyncIterable_1 = __webpack_require__(/*! ./observableToAsyncIterable */ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/observableToAsyncIterable.js");
function makeRemoteExecutableSchema(_a) {
  var _b;
  var schema = _a.schema,
    link = _a.link,
    fetcher = _a.fetcher,
    _c = _a.createResolver,
    customCreateResolver = _c === void 0 ? createResolver : _c,
    buildSchemaOptions = _a.buildSchemaOptions,
    _d = _a.printSchemaOptions,
    printSchemaOptions = _d === void 0 ? {
      commentDescriptions: true
    } : _d;
  if (!fetcher && link) {
    fetcher = linkToFetcher_1.default(link);
  }
  var typeDefs;
  if (typeof schema === 'string') {
    typeDefs = schema;
    schema = graphql_1.buildSchema(typeDefs, buildSchemaOptions);
  } else {
    typeDefs = graphql_1.printSchema(schema, printSchemaOptions);
  }
  // prepare query resolvers
  var queryResolvers = {};
  var queryType = schema.getQueryType();
  var queries = queryType.getFields();
  Object.keys(queries).forEach(function (key) {
    queryResolvers[key] = customCreateResolver(fetcher);
  });
  // prepare mutation resolvers
  var mutationResolvers = {};
  var mutationType = schema.getMutationType();
  if (mutationType) {
    var mutations = mutationType.getFields();
    Object.keys(mutations).forEach(function (key) {
      mutationResolvers[key] = customCreateResolver(fetcher);
    });
  }
  // prepare subscription resolvers
  var subscriptionResolvers = {};
  var subscriptionType = schema.getSubscriptionType();
  if (subscriptionType) {
    var subscriptions = subscriptionType.getFields();
    Object.keys(subscriptions).forEach(function (key) {
      subscriptionResolvers[key] = {
        subscribe: createSubscriptionResolver(key, link)
      };
    });
  }
  // merge resolvers into resolver map
  var resolvers = (_b = {}, _b[queryType.name] = queryResolvers, _b);
  if (!isEmptyObject_1.default(mutationResolvers)) {
    resolvers[mutationType.name] = mutationResolvers;
  }
  if (!isEmptyObject_1.default(subscriptionResolvers)) {
    resolvers[subscriptionType.name] = subscriptionResolvers;
  }
  // add missing abstract resolvers (scalar, unions, interfaces)
  var typeMap = schema.getTypeMap();
  var types = Object.keys(typeMap).map(function (name) {
    return typeMap[name];
  });
  var _loop_1 = function (type) {
    if (type instanceof graphql_1.GraphQLInterfaceType || type instanceof graphql_1.GraphQLUnionType) {
      resolvers[type.name] = {
        __resolveType: function (parent, context, info) {
          return resolveFromParentTypename_1.default(parent, info.schema);
        }
      };
    } else if (type instanceof graphql_1.GraphQLScalarType) {
      if (!(type === graphql_1.GraphQLID || type === graphql_1.GraphQLString || type === graphql_1.GraphQLFloat || type === graphql_1.GraphQLBoolean || type === graphql_1.GraphQLInt)) {
        resolvers[type.name] = schemaRecreation_1.recreateType(type, function (name) {
          return null;
        }, false);
      }
    } else if (type instanceof graphql_1.GraphQLObjectType && type.name.slice(0, 2) !== '__' && type !== queryType && type !== mutationType && type !== subscriptionType) {
      var resolver_1 = {};
      Object.keys(type.getFields()).forEach(function (field) {
        resolver_1[field] = defaultMergedResolver_1.default;
      });
      resolvers[type.name] = resolver_1;
    }
  };
  for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
    var type = types_1[_i];
    _loop_1(type);
  }
  return makeExecutableSchema_1.makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
  });
}
exports.default = makeRemoteExecutableSchema;
function createResolver(fetcher) {
  var _this = this;
  return function (root, args, context, info) {
    return __awaiter(_this, void 0, void 0, function () {
      var fragments, document, result;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            fragments = Object.keys(info.fragments).map(function (fragment) {
              return info.fragments[fragment];
            });
            document = {
              kind: graphql_1.Kind.DOCUMENT,
              definitions: __spreadArrays([info.operation], fragments)
            };
            return [4 /*yield*/, fetcher({
              query: document,
              variables: info.variableValues,
              context: {
                graphqlContext: context
              }
            })];
          case 1:
            result = _a.sent();
            return [2 /*return*/, errors_1.checkResultAndHandleErrors(result, info)];
        }
      });
    });
  };
}
exports.createResolver = createResolver;
function createSubscriptionResolver(name, link) {
  return function (root, args, context, info) {
    var fragments = Object.keys(info.fragments).map(function (fragment) {
      return info.fragments[fragment];
    });
    var document = {
      kind: graphql_1.Kind.DOCUMENT,
      definitions: __spreadArrays([info.operation], fragments)
    };
    var operation = {
      query: document,
      variables: info.variableValues,
      context: {
        graphqlContext: context
      }
    };
    var observable = linkToFetcher_1.execute(link, operation);
    return observableToAsyncIterable_1.observableToAsyncIterable(observable);
  };
}

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/mapAsyncIterator.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/mapAsyncIterator.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var iterall_1 = __webpack_require__(/*! iterall */ "iterall");
/**
 * Given an AsyncIterable and a callback function, return an AsyncIterator
 * which produces values mapped via calling the callback function.
 */
function mapAsyncIterator(iterator, callback, rejectCallback) {
  var _a;
  var $return;
  var abruptClose;
  if (typeof iterator.return === 'function') {
    $return = iterator.return;
    abruptClose = function (error) {
      var rethrow = function () {
        return Promise.reject(error);
      };
      return $return.call(iterator).then(rethrow, rethrow);
    };
  }
  function mapResult(result) {
    return result.done ? result : asyncMapValue(result.value, callback).then(iteratorResult, abruptClose);
  }
  var mapReject;
  if (rejectCallback) {
    // Capture rejectCallback to ensure it cannot be null.
    var reject_1 = rejectCallback;
    mapReject = function (error) {
      return asyncMapValue(error, reject_1).then(iteratorResult, abruptClose);
    };
  }
  return _a = {
    next: function () {
      return iterator.next().then(mapResult, mapReject);
    },
    return: function () {
      return $return ? $return.call(iterator).then(mapResult, mapReject) : Promise.resolve({
        value: undefined,
        done: true
      });
    },
    throw: function (error) {
      if (typeof iterator.throw === 'function') {
        return iterator.throw(error).then(mapResult, mapReject);
      }
      return Promise.reject(error).catch(abruptClose);
    }
  }, _a[iterall_1.$$asyncIterator] = function () {
    return this;
  }, _a;
}
exports.default = mapAsyncIterator;
function asyncMapValue(value, callback) {
  return new Promise(function (resolve) {
    return resolve(callback(value));
  });
}
function iteratorResult(value) {
  return {
    value: value,
    done: false
  };
}

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/mergeSchemas.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/mergeSchemas.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
var makeExecutableSchema_1 = __webpack_require__(/*! ../makeExecutableSchema */ "./node_modules/graphpack/node_modules/graphql-tools/dist/makeExecutableSchema.js");
var schemaRecreation_1 = __webpack_require__(/*! ./schemaRecreation */ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/schemaRecreation.js");
var delegateToSchema_1 = __webpack_require__(/*! ./delegateToSchema */ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/delegateToSchema.js");
var typeFromAST_1 = __webpack_require__(/*! ./typeFromAST */ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/typeFromAST.js");
var transforms_1 = __webpack_require__(/*! ../transforms */ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/index.js");
var mergeDeep_1 = __webpack_require__(/*! ../mergeDeep */ "./node_modules/graphpack/node_modules/graphql-tools/dist/mergeDeep.js");
var schemaVisitor_1 = __webpack_require__(/*! ../schemaVisitor */ "./node_modules/graphpack/node_modules/graphql-tools/dist/schemaVisitor.js");
function mergeSchemas(_a) {
  var schemas = _a.schemas,
    onTypeConflict = _a.onTypeConflict,
    resolvers = _a.resolvers,
    schemaDirectives = _a.schemaDirectives,
    inheritResolversFromInterfaces = _a.inheritResolversFromInterfaces,
    mergeDirectives = _a.mergeDirectives;
  return mergeSchemasImplementation({
    schemas: schemas,
    resolvers: resolvers,
    schemaDirectives: schemaDirectives,
    inheritResolversFromInterfaces: inheritResolversFromInterfaces,
    mergeDirectives: mergeDirectives
  });
}
exports.default = mergeSchemas;
function mergeSchemasImplementation(_a) {
  var schemas = _a.schemas,
    resolvers = _a.resolvers,
    schemaDirectives = _a.schemaDirectives,
    inheritResolversFromInterfaces = _a.inheritResolversFromInterfaces,
    mergeDirectives = _a.mergeDirectives;
  var allSchemas = [];
  var typeCandidates = {};
  var types = {};
  var extensions = [];
  var directives = [];
  var fragments = [];
  var resolveType = schemaRecreation_1.createResolveType(function (name) {
    if (types[name] === undefined) {
      throw new Error("Can't find type " + name + ".");
    }
    return types[name];
  });
  schemas.forEach(function (schema) {
    if (schema instanceof graphql_1.GraphQLSchema) {
      allSchemas.push(schema);
      var queryType_1 = schema.getQueryType();
      var mutationType_1 = schema.getMutationType();
      var subscriptionType_1 = schema.getSubscriptionType();
      if (queryType_1) {
        addTypeCandidate(typeCandidates, 'Query', {
          schema: schema,
          type: queryType_1
        });
      }
      if (mutationType_1) {
        addTypeCandidate(typeCandidates, 'Mutation', {
          schema: schema,
          type: mutationType_1
        });
      }
      if (subscriptionType_1) {
        addTypeCandidate(typeCandidates, 'Subscription', {
          schema: schema,
          type: subscriptionType_1
        });
      }
      if (mergeDirectives) {
        var directiveInstances = schema.getDirectives();
        directiveInstances.forEach(function (directive) {
          directives.push(directive);
        });
      }
      var typeMap_1 = schema.getTypeMap();
      Object.keys(typeMap_1).forEach(function (typeName) {
        var type = typeMap_1[typeName];
        if (graphql_1.isNamedType(type) && graphql_1.getNamedType(type).name.slice(0, 2) !== '__' && type !== queryType_1 && type !== mutationType_1 && type !== subscriptionType_1) {
          addTypeCandidate(typeCandidates, type.name, {
            schema: schema,
            type: type
          });
        }
      });
    } else if (typeof schema === 'string' || schema && schema.kind === graphql_1.Kind.DOCUMENT) {
      var parsedSchemaDocument = typeof schema === 'string' ? graphql_1.parse(schema) : schema;
      parsedSchemaDocument.definitions.forEach(function (def) {
        var type = typeFromAST_1.default(def);
        if (type instanceof graphql_1.GraphQLDirective && mergeDirectives) {
          directives.push(type);
        } else if (type && !(type instanceof graphql_1.GraphQLDirective)) {
          addTypeCandidate(typeCandidates, type.name, {
            type: type
          });
        }
      });
      var extensionsDocument = makeExecutableSchema_1.extractExtensionDefinitions(parsedSchemaDocument);
      if (extensionsDocument.definitions.length > 0) {
        extensions.push(extensionsDocument);
      }
    } else if (Array.isArray(schema)) {
      schema.forEach(function (type) {
        addTypeCandidate(typeCandidates, type.name, {
          type: type
        });
      });
    } else {
      throw new Error("Invalid schema passed");
    }
  });
  var mergeInfo = createMergeInfo(allSchemas, fragments);
  if (!resolvers) {
    resolvers = {};
  } else if (typeof resolvers === 'function') {
    console.warn('Passing functions as resolver parameter is deprecated. Use `info.mergeInfo` instead.');
    resolvers = resolvers(mergeInfo);
  } else if (Array.isArray(resolvers)) {
    resolvers = resolvers.reduce(function (left, right) {
      if (typeof right === 'function') {
        console.warn('Passing functions as resolver parameter is deprecated. Use `info.mergeInfo` instead.');
        right = right(mergeInfo);
      }
      return mergeDeep_1.default(left, right);
    }, {});
  }
  var generatedResolvers = {};
  Object.keys(typeCandidates).forEach(function (typeName) {
    var resultType = defaultVisitType(typeName, typeCandidates[typeName]);
    if (resultType === null) {
      types[typeName] = null;
    } else {
      var type = void 0;
      var typeResolvers = void 0;
      if (graphql_1.isNamedType(resultType)) {
        type = resultType;
      } else if (resultType.type) {
        type = resultType.type;
        typeResolvers = resultType.resolvers;
      } else {
        throw new Error("Invalid visitType result for type " + typeName);
      }
      types[typeName] = schemaRecreation_1.recreateType(type, resolveType, false);
      if (typeResolvers) {
        generatedResolvers[typeName] = typeResolvers;
      }
    }
  });
  var mergedSchema = new graphql_1.GraphQLSchema({
    query: types.Query,
    mutation: types.Mutation,
    subscription: types.Subscription,
    types: Object.keys(types).map(function (key) {
      return types[key];
    }),
    directives: directives.map(function (directive) {
      return schemaRecreation_1.recreateDirective(directive, resolveType);
    })
  });
  extensions.forEach(function (extension) {
    mergedSchema = graphql_1.extendSchema(mergedSchema, extension, {
      commentDescriptions: true
    });
  });
  if (!resolvers) {
    resolvers = {};
  } else if (Array.isArray(resolvers)) {
    resolvers = resolvers.reduce(mergeDeep_1.default, {});
  }
  Object.keys(resolvers).forEach(function (typeName) {
    var type = resolvers[typeName];
    if (type instanceof graphql_1.GraphQLScalarType) {
      return;
    }
    Object.keys(type).forEach(function (fieldName) {
      var field = type[fieldName];
      if (field.fragment) {
        fragments.push({
          field: fieldName,
          fragment: field.fragment
        });
      }
    });
  });
  mergedSchema = makeExecutableSchema_1.addResolveFunctionsToSchema({
    schema: mergedSchema,
    resolvers: mergeDeep_1.default(generatedResolvers, resolvers),
    inheritResolversFromInterfaces: inheritResolversFromInterfaces
  });
  forEachField(mergedSchema, function (field) {
    if (field.resolve) {
      var fieldResolver_1 = field.resolve;
      field.resolve = function (parent, args, context, info) {
        var newInfo = __assign(__assign({}, info), {
          mergeInfo: mergeInfo
        });
        return fieldResolver_1(parent, args, context, newInfo);
      };
    }
    if (field.subscribe) {
      var fieldResolver_2 = field.subscribe;
      field.subscribe = function (parent, args, context, info) {
        var newInfo = __assign(__assign({}, info), {
          mergeInfo: mergeInfo
        });
        return fieldResolver_2(parent, args, context, newInfo);
      };
    }
  });
  if (schemaDirectives) {
    schemaVisitor_1.SchemaDirectiveVisitor.visitSchemaDirectives(mergedSchema, schemaDirectives);
  }
  return mergedSchema;
}
function createMergeInfo(allSchemas, fragments) {
  return {
    delegate: function (operation, fieldName, args, context, info, transforms) {
      console.warn('`mergeInfo.delegate` is deprecated. ' + 'Use `mergeInfo.delegateToSchema and pass explicit schema instances.');
      var schema = guessSchemaByRootField(allSchemas, operation, fieldName);
      var expandTransforms = new transforms_1.ExpandAbstractTypes(info.schema, schema);
      var fragmentTransform = new transforms_1.ReplaceFieldWithFragment(schema, fragments);
      return delegateToSchema_1.default({
        schema: schema,
        operation: operation,
        fieldName: fieldName,
        args: args,
        context: context,
        info: info,
        transforms: __spreadArrays(transforms || [], [expandTransforms, fragmentTransform])
      });
    },
    delegateToSchema: function (options) {
      return delegateToSchema_1.default(__assign(__assign({}, options), {
        transforms: options.transforms
      }));
    },
    fragments: fragments
  };
}
function guessSchemaByRootField(schemas, operation, fieldName) {
  for (var _i = 0, schemas_1 = schemas; _i < schemas_1.length; _i++) {
    var schema = schemas_1[_i];
    var rootObject = void 0;
    if (operation === 'subscription') {
      rootObject = schema.getSubscriptionType();
    } else if (operation === 'mutation') {
      rootObject = schema.getMutationType();
    } else {
      rootObject = schema.getQueryType();
    }
    if (rootObject) {
      var fields = rootObject.getFields();
      if (fields[fieldName]) {
        return schema;
      }
    }
  }
  throw new Error("Could not find subschema with field `" + operation + "." + fieldName + "`");
}
function createDelegatingResolver(schema, operation, fieldName) {
  return function (root, args, context, info) {
    return info.mergeInfo.delegateToSchema({
      schema: schema,
      operation: operation,
      fieldName: fieldName,
      args: args,
      context: context,
      info: info
    });
  };
}
function forEachField(schema, fn) {
  var typeMap = schema.getTypeMap();
  Object.keys(typeMap).forEach(function (typeName) {
    var type = typeMap[typeName];
    if (!graphql_1.getNamedType(type).name.startsWith('__') && type instanceof graphql_1.GraphQLObjectType) {
      var fields_1 = type.getFields();
      Object.keys(fields_1).forEach(function (fieldName) {
        var field = fields_1[fieldName];
        fn(field, typeName, fieldName);
      });
    }
  });
}
function addTypeCandidate(typeCandidates, name, typeCandidate) {
  if (!typeCandidates[name]) {
    typeCandidates[name] = [];
  }
  typeCandidates[name].push(typeCandidate);
}
function defaultVisitType(name, candidates, candidateSelector) {
  if (!candidateSelector) {
    candidateSelector = function (cands) {
      return cands[cands.length - 1];
    };
  }
  var resolveType = schemaRecreation_1.createResolveType(function (_, type) {
    return type;
  });
  if (name === 'Query' || name === 'Mutation' || name === 'Subscription') {
    var fields_2 = {};
    var operationName_1;
    switch (name) {
      case 'Query':
        operationName_1 = 'query';
        break;
      case 'Mutation':
        operationName_1 = 'mutation';
        break;
      case 'Subscription':
        operationName_1 = 'subscription';
        break;
      default:
        break;
    }
    var resolvers_1 = {};
    var resolverKey_1 = operationName_1 === 'subscription' ? 'subscribe' : 'resolve';
    candidates.forEach(function (_a) {
      var candidateType = _a.type,
        schema = _a.schema;
      var candidateFields = candidateType.getFields();
      fields_2 = __assign(__assign({}, fields_2), candidateFields);
      Object.keys(candidateFields).forEach(function (fieldName) {
        var _a;
        resolvers_1[fieldName] = (_a = {}, _a[resolverKey_1] = createDelegatingResolver(schema, operationName_1, fieldName), _a);
      });
    });
    var type = new graphql_1.GraphQLObjectType({
      name: name,
      fields: schemaRecreation_1.fieldMapToFieldConfigMap(fields_2, resolveType, false)
    });
    return {
      type: type,
      resolvers: resolvers_1
    };
  } else {
    var candidate = candidateSelector(candidates);
    return candidate.type;
  }
}

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/observableToAsyncIterable.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/observableToAsyncIterable.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var iterall_1 = __webpack_require__(/*! iterall */ "iterall");
function observableToAsyncIterable(observable) {
  var _a;
  var pullQueue = [];
  var pushQueue = [];
  var listening = true;
  var pushValue = function (_a) {
    var data = _a.data;
    if (pullQueue.length !== 0) {
      pullQueue.shift()({
        value: data,
        done: false
      });
    } else {
      pushQueue.push({
        value: data
      });
    }
  };
  var pushError = function (error) {
    if (pullQueue.length !== 0) {
      pullQueue.shift()({
        value: {
          errors: [error]
        },
        done: false
      });
    } else {
      pushQueue.push({
        value: {
          errors: [error]
        }
      });
    }
  };
  var pullValue = function () {
    return new Promise(function (resolve) {
      if (pushQueue.length !== 0) {
        var element = pushQueue.shift();
        // either {value: {errors: [...]}} or {value: ...}
        resolve(__assign(__assign({}, element), {
          done: false
        }));
      } else {
        pullQueue.push(resolve);
      }
    });
  };
  var subscription = observable.subscribe({
    next: function (value) {
      pushValue(value);
    },
    error: function (err) {
      pushError(err);
    }
  });
  var emptyQueue = function () {
    if (listening) {
      listening = false;
      subscription.unsubscribe();
      pullQueue.forEach(function (resolve) {
        return resolve({
          value: undefined,
          done: true
        });
      });
      pullQueue.length = 0;
      pushQueue.length = 0;
    }
  };
  return _a = {
    next: function () {
      return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          return [2 /*return*/, listening ? pullValue() : this.return()];
        });
      });
    },
    return: function () {
      emptyQueue();
      return Promise.resolve({
        value: undefined,
        done: true
      });
    },
    throw: function (error) {
      emptyQueue();
      return Promise.reject(error);
    }
  }, _a[iterall_1.$$asyncIterator] = function () {
    return this;
  }, _a;
}
exports.observableToAsyncIterable = observableToAsyncIterable;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/resolveFromParentTypename.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/resolveFromParentTypename.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
function resolveFromParentTypename(parent, schema) {
  var parentTypename = parent['__typename'];
  if (!parentTypename) {
    throw new Error('Did not fetch typename for object, unable to resolve interface.');
  }
  var resolvedType = schema.getType(parentTypename);
  if (!(resolvedType instanceof graphql_1.GraphQLObjectType)) {
    throw new Error('__typename did not match an object type: ' + parentTypename);
  }
  return resolvedType;
}
exports.default = resolveFromParentTypename;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/resolvers.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/resolvers.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var delegateToSchema_1 = __webpack_require__(/*! ./delegateToSchema */ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/delegateToSchema.js");
function generateProxyingResolvers(targetSchema, transforms, mapping) {
  var result = {};
  Object.keys(mapping).forEach(function (name) {
    result[name] = {};
    var innerMapping = mapping[name];
    Object.keys(innerMapping).forEach(function (from) {
      var _a;
      var to = innerMapping[from];
      var resolverType = to.operation === 'subscription' ? 'subscribe' : 'resolve';
      result[name][from] = (_a = {}, _a[resolverType] = createProxyingResolver(targetSchema, to.operation, to.name, transforms), _a);
    });
  });
  return result;
}
exports.generateProxyingResolvers = generateProxyingResolvers;
function generateSimpleMapping(targetSchema) {
  var query = targetSchema.getQueryType();
  var mutation = targetSchema.getMutationType();
  var subscription = targetSchema.getSubscriptionType();
  var result = {};
  if (query) {
    result[query.name] = generateMappingFromObjectType(query, 'query');
  }
  if (mutation) {
    result[mutation.name] = generateMappingFromObjectType(mutation, 'mutation');
  }
  if (subscription) {
    result[subscription.name] = generateMappingFromObjectType(subscription, 'subscription');
  }
  return result;
}
exports.generateSimpleMapping = generateSimpleMapping;
function generateMappingFromObjectType(type, operation) {
  var result = {};
  var fields = type.getFields();
  Object.keys(fields).forEach(function (fieldName) {
    result[fieldName] = {
      name: fieldName,
      operation: operation
    };
  });
  return result;
}
exports.generateMappingFromObjectType = generateMappingFromObjectType;
function createProxyingResolver(schema, operation, fieldName, transforms) {
  return function (parent, args, context, info) {
    return delegateToSchema_1.default({
      schema: schema,
      operation: operation,
      fieldName: fieldName,
      args: {},
      context: context,
      info: info,
      transforms: transforms
    });
  };
}

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/schemaRecreation.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/schemaRecreation.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
var isSpecifiedScalarType_1 = __webpack_require__(/*! ../isSpecifiedScalarType */ "./node_modules/graphpack/node_modules/graphql-tools/dist/isSpecifiedScalarType.js");
var resolveFromParentTypename_1 = __webpack_require__(/*! ./resolveFromParentTypename */ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/resolveFromParentTypename.js");
var defaultMergedResolver_1 = __webpack_require__(/*! ./defaultMergedResolver */ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/defaultMergedResolver.js");
function recreateType(type, resolveType, keepResolvers) {
  if (type instanceof graphql_1.GraphQLObjectType) {
    var fields_1 = type.getFields();
    var interfaces_1 = type.getInterfaces();
    return new graphql_1.GraphQLObjectType({
      name: type.name,
      description: type.description,
      astNode: type.astNode,
      isTypeOf: keepResolvers ? type.isTypeOf : undefined,
      fields: function () {
        return fieldMapToFieldConfigMap(fields_1, resolveType, keepResolvers);
      },
      interfaces: function () {
        return interfaces_1.map(function (iface) {
          return resolveType(iface);
        });
      }
    });
  } else if (type instanceof graphql_1.GraphQLInterfaceType) {
    var fields_2 = type.getFields();
    return new graphql_1.GraphQLInterfaceType({
      name: type.name,
      description: type.description,
      astNode: type.astNode,
      fields: function () {
        return fieldMapToFieldConfigMap(fields_2, resolveType, keepResolvers);
      },
      resolveType: keepResolvers ? type.resolveType : function (parent, context, info) {
        return resolveFromParentTypename_1.default(parent, info.schema);
      }
    });
  } else if (type instanceof graphql_1.GraphQLUnionType) {
    return new graphql_1.GraphQLUnionType({
      name: type.name,
      description: type.description,
      astNode: type.astNode,
      types: function () {
        return type.getTypes().map(function (unionMember) {
          return resolveType(unionMember);
        });
      },
      resolveType: keepResolvers ? type.resolveType : function (parent, context, info) {
        return resolveFromParentTypename_1.default(parent, info.schema);
      }
    });
  } else if (type instanceof graphql_1.GraphQLInputObjectType) {
    return new graphql_1.GraphQLInputObjectType({
      name: type.name,
      description: type.description,
      astNode: type.astNode,
      fields: function () {
        return inputFieldMapToFieldConfigMap(type.getFields(), resolveType);
      }
    });
  } else if (type instanceof graphql_1.GraphQLEnumType) {
    var values = type.getValues();
    var newValues_1 = {};
    values.forEach(function (value) {
      newValues_1[value.name] = {
        value: value.value,
        deprecationReason: value.deprecationReason,
        description: value.description,
        astNode: value.astNode
      };
    });
    return new graphql_1.GraphQLEnumType({
      name: type.name,
      description: type.description,
      astNode: type.astNode,
      values: newValues_1
    });
  } else if (type instanceof graphql_1.GraphQLScalarType) {
    if (keepResolvers || isSpecifiedScalarType_1.default(type)) {
      return type;
    } else {
      return new graphql_1.GraphQLScalarType({
        name: type.name,
        description: type.description,
        astNode: type.astNode,
        serialize: function (value) {
          return value;
        },
        parseValue: function (value) {
          return value;
        },
        parseLiteral: function (ast) {
          return parseLiteral(ast);
        }
      });
    }
  } else {
    throw new Error("Invalid type " + type);
  }
}
exports.recreateType = recreateType;
function recreateDirective(directive, resolveType) {
  return new graphql_1.GraphQLDirective({
    name: directive.name,
    description: directive.description,
    locations: directive.locations,
    args: argsToFieldConfigArgumentMap(directive.args, resolveType),
    astNode: directive.astNode
  });
}
exports.recreateDirective = recreateDirective;
function parseLiteral(ast) {
  switch (ast.kind) {
    case graphql_1.Kind.STRING:
    case graphql_1.Kind.BOOLEAN:
      {
        return ast.value;
      }
    case graphql_1.Kind.INT:
    case graphql_1.Kind.FLOAT:
      {
        return parseFloat(ast.value);
      }
    case graphql_1.Kind.OBJECT:
      {
        var value_1 = Object.create(null);
        ast.fields.forEach(function (field) {
          value_1[field.name.value] = parseLiteral(field.value);
        });
        return value_1;
      }
    case graphql_1.Kind.LIST:
      {
        return ast.values.map(parseLiteral);
      }
    default:
      return null;
  }
}
function fieldMapToFieldConfigMap(fields, resolveType, keepResolvers) {
  var result = {};
  Object.keys(fields).forEach(function (name) {
    var field = fields[name];
    var type = resolveType(field.type);
    if (type !== null) {
      result[name] = fieldToFieldConfig(fields[name], resolveType, keepResolvers);
    }
  });
  return result;
}
exports.fieldMapToFieldConfigMap = fieldMapToFieldConfigMap;
function createResolveType(getType) {
  var resolveType = function (type) {
    if (type instanceof graphql_1.GraphQLList) {
      var innerType = resolveType(type.ofType);
      if (innerType === null) {
        return null;
      } else {
        return new graphql_1.GraphQLList(innerType);
      }
    } else if (type instanceof graphql_1.GraphQLNonNull) {
      var innerType = resolveType(type.ofType);
      if (innerType === null) {
        return null;
      } else {
        return new graphql_1.GraphQLNonNull(innerType);
      }
    } else if (graphql_1.isNamedType(type)) {
      var typeName = graphql_1.getNamedType(type).name;
      switch (typeName) {
        case graphql_1.GraphQLInt.name:
          return graphql_1.GraphQLInt;
        case graphql_1.GraphQLFloat.name:
          return graphql_1.GraphQLFloat;
        case graphql_1.GraphQLString.name:
          return graphql_1.GraphQLString;
        case graphql_1.GraphQLBoolean.name:
          return graphql_1.GraphQLBoolean;
        case graphql_1.GraphQLID.name:
          return graphql_1.GraphQLID;
        default:
          return getType(typeName, type);
      }
    } else {
      return type;
    }
  };
  return resolveType;
}
exports.createResolveType = createResolveType;
function fieldToFieldConfig(field, resolveType, keepResolvers) {
  return {
    type: resolveType(field.type),
    args: argsToFieldConfigArgumentMap(field.args, resolveType),
    resolve: keepResolvers ? field.resolve : defaultMergedResolver_1.default,
    subscribe: keepResolvers ? field.subscribe : null,
    description: field.description,
    deprecationReason: field.deprecationReason,
    astNode: field.astNode
  };
}
exports.fieldToFieldConfig = fieldToFieldConfig;
function argsToFieldConfigArgumentMap(args, resolveType) {
  var result = {};
  args.forEach(function (arg) {
    var newArg = argumentToArgumentConfig(arg, resolveType);
    if (newArg) {
      result[newArg[0]] = newArg[1];
    }
  });
  return result;
}
exports.argsToFieldConfigArgumentMap = argsToFieldConfigArgumentMap;
function argumentToArgumentConfig(argument, resolveType) {
  var type = resolveType(argument.type);
  if (type === null) {
    return null;
  } else {
    return [argument.name, {
      type: type,
      defaultValue: argument.defaultValue,
      description: argument.description
    }];
  }
}
exports.argumentToArgumentConfig = argumentToArgumentConfig;
function inputFieldMapToFieldConfigMap(fields, resolveType) {
  var result = {};
  Object.keys(fields).forEach(function (name) {
    var field = fields[name];
    var type = resolveType(field.type);
    if (type !== null) {
      result[name] = inputFieldToFieldConfig(fields[name], resolveType);
    }
  });
  return result;
}
exports.inputFieldMapToFieldConfigMap = inputFieldMapToFieldConfigMap;
function inputFieldToFieldConfig(field, resolveType) {
  return {
    type: resolveType(field.type),
    defaultValue: field.defaultValue,
    description: field.description,
    astNode: field.astNode
  };
}
exports.inputFieldToFieldConfig = inputFieldToFieldConfig;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/typeFromAST.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/typeFromAST.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
var resolveFromParentTypename_1 = __webpack_require__(/*! ./resolveFromParentTypename */ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/resolveFromParentTypename.js");
var backcompatOptions = {
  commentDescriptions: true
};
function typeFromAST(node) {
  switch (node.kind) {
    case graphql_1.Kind.OBJECT_TYPE_DEFINITION:
      return makeObjectType(node);
    case graphql_1.Kind.INTERFACE_TYPE_DEFINITION:
      return makeInterfaceType(node);
    case graphql_1.Kind.ENUM_TYPE_DEFINITION:
      return makeEnumType(node);
    case graphql_1.Kind.UNION_TYPE_DEFINITION:
      return makeUnionType(node);
    case graphql_1.Kind.SCALAR_TYPE_DEFINITION:
      return makeScalarType(node);
    case graphql_1.Kind.INPUT_OBJECT_TYPE_DEFINITION:
      return makeInputObjectType(node);
    case graphql_1.Kind.DIRECTIVE_DEFINITION:
      return makeDirective(node);
    default:
      return null;
  }
}
exports.default = typeFromAST;
function makeObjectType(node) {
  return new graphql_1.GraphQLObjectType({
    name: node.name.value,
    fields: function () {
      return makeFields(node.fields);
    },
    interfaces: function () {
      return node.interfaces.map(function (iface) {
        return createNamedStub(iface.name.value, 'interface');
      });
    },
    description: graphql_1.getDescription(node, backcompatOptions)
  });
}
function makeInterfaceType(node) {
  return new graphql_1.GraphQLInterfaceType({
    name: node.name.value,
    fields: function () {
      return makeFields(node.fields);
    },
    description: graphql_1.getDescription(node, backcompatOptions),
    resolveType: function (parent, context, info) {
      return resolveFromParentTypename_1.default(parent, info.schema);
    }
  });
}
function makeEnumType(node) {
  var values = {};
  node.values.forEach(function (value) {
    values[value.name.value] = {
      description: graphql_1.getDescription(value, backcompatOptions)
    };
  });
  return new graphql_1.GraphQLEnumType({
    name: node.name.value,
    values: values,
    description: graphql_1.getDescription(node, backcompatOptions)
  });
}
function makeUnionType(node) {
  return new graphql_1.GraphQLUnionType({
    name: node.name.value,
    types: function () {
      return node.types.map(function (type) {
        return resolveType(type, 'object');
      });
    },
    description: graphql_1.getDescription(node, backcompatOptions),
    resolveType: function (parent, context, info) {
      return resolveFromParentTypename_1.default(parent, info.schema);
    }
  });
}
function makeScalarType(node) {
  return new graphql_1.GraphQLScalarType({
    name: node.name.value,
    description: graphql_1.getDescription(node, backcompatOptions),
    serialize: function () {
      return null;
    },
    // Note: validation calls the parse functions to determine if a
    // literal value is correct. Returning null would cause use of custom
    // scalars to always fail validation. Returning false causes them to
    // always pass validation.
    parseValue: function () {
      return false;
    },
    parseLiteral: function () {
      return false;
    }
  });
}
function makeInputObjectType(node) {
  return new graphql_1.GraphQLInputObjectType({
    name: node.name.value,
    fields: function () {
      return makeValues(node.fields);
    },
    description: graphql_1.getDescription(node, backcompatOptions)
  });
}
function makeFields(nodes) {
  var result = {};
  nodes.forEach(function (node) {
    var deprecatedDirective = node.directives.find(function (directive) {
      return directive && directive.name && directive.name.value === 'deprecated';
    });
    var deprecatedArgument = deprecatedDirective && deprecatedDirective.arguments && deprecatedDirective.arguments.find(function (arg) {
      return arg && arg.name && arg.name.value === 'reason';
    });
    var deprecationReason = deprecatedArgument && deprecatedArgument.value && deprecatedArgument.value.value;
    result[node.name.value] = {
      type: resolveType(node.type, 'object'),
      args: makeValues(node.arguments),
      description: graphql_1.getDescription(node, backcompatOptions),
      deprecationReason: deprecationReason
    };
  });
  return result;
}
function makeValues(nodes) {
  var result = {};
  nodes.forEach(function (node) {
    var type = resolveType(node.type, 'input');
    result[node.name.value] = {
      type: type,
      defaultValue: graphql_1.valueFromAST(node.defaultValue, type),
      description: graphql_1.getDescription(node, backcompatOptions)
    };
  });
  return result;
}
function resolveType(node, type) {
  switch (node.kind) {
    case graphql_1.Kind.LIST_TYPE:
      return new graphql_1.GraphQLList(resolveType(node.type, type));
    case graphql_1.Kind.NON_NULL_TYPE:
      return new graphql_1.GraphQLNonNull(resolveType(node.type, type));
    default:
      return createNamedStub(node.name.value, type);
  }
}
function createNamedStub(name, type) {
  var constructor;
  if (type === 'object') {
    constructor = graphql_1.GraphQLObjectType;
  } else if (type === 'interface') {
    constructor = graphql_1.GraphQLInterfaceType;
  } else {
    constructor = graphql_1.GraphQLInputObjectType;
  }
  return new constructor({
    name: name,
    fields: {
      __fake: {
        type: graphql_1.GraphQLString
      }
    }
  });
}
function makeDirective(node) {
  var locations = [];
  node.locations.forEach(function (location) {
    if (location.value in graphql_1.DirectiveLocation) {
      locations.push(location.value);
    }
  });
  return new graphql_1.GraphQLDirective({
    name: node.name.value,
    description: node.description ? node.description.value : null,
    args: makeValues(node.arguments),
    locations: locations
  });
}

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/AddArgumentsAsVariables.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/AddArgumentsAsVariables.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
var AddArgumentsAsVariablesTransform = /** @class */function () {
  function AddArgumentsAsVariablesTransform(schema, args) {
    this.schema = schema;
    this.args = args;
  }
  AddArgumentsAsVariablesTransform.prototype.transformRequest = function (originalRequest) {
    var _a = addVariablesToRootField(this.schema, originalRequest.document, this.args),
      document = _a.document,
      newVariables = _a.newVariables;
    var variables = __assign(__assign({}, originalRequest.variables), newVariables);
    return {
      document: document,
      variables: variables
    };
  };
  return AddArgumentsAsVariablesTransform;
}();
exports.default = AddArgumentsAsVariablesTransform;
function addVariablesToRootField(targetSchema, document, args) {
  var operations = document.definitions.filter(function (def) {
    return def.kind === graphql_1.Kind.OPERATION_DEFINITION;
  });
  var fragments = document.definitions.filter(function (def) {
    return def.kind === graphql_1.Kind.FRAGMENT_DEFINITION;
  });
  var variableNames = {};
  var newOperations = operations.map(function (operation) {
    var existingVariables = operation.variableDefinitions.map(function (variableDefinition) {
      return variableDefinition.variable.name.value;
    });
    var variableCounter = 0;
    var variables = {};
    var generateVariableName = function (argName) {
      var varName;
      do {
        varName = "_v" + variableCounter + "_" + argName;
        variableCounter++;
      } while (existingVariables.indexOf(varName) !== -1);
      return varName;
    };
    var type;
    if (operation.operation === 'subscription') {
      type = targetSchema.getSubscriptionType();
    } else if (operation.operation === 'mutation') {
      type = targetSchema.getMutationType();
    } else {
      type = targetSchema.getQueryType();
    }
    var newSelectionSet = [];
    operation.selectionSet.selections.forEach(function (selection) {
      if (selection.kind === graphql_1.Kind.FIELD) {
        var newArgs_1 = {};
        selection.arguments.forEach(function (argument) {
          newArgs_1[argument.name.value] = argument;
        });
        var name_1 = selection.name.value;
        var field = type.getFields()[name_1];
        field.args.forEach(function (argument) {
          if (argument.name in args) {
            var variableName = generateVariableName(argument.name);
            variableNames[argument.name] = variableName;
            newArgs_1[argument.name] = {
              kind: graphql_1.Kind.ARGUMENT,
              name: {
                kind: graphql_1.Kind.NAME,
                value: argument.name
              },
              value: {
                kind: graphql_1.Kind.VARIABLE,
                name: {
                  kind: graphql_1.Kind.NAME,
                  value: variableName
                }
              }
            };
            existingVariables.push(variableName);
            variables[variableName] = {
              kind: graphql_1.Kind.VARIABLE_DEFINITION,
              variable: {
                kind: graphql_1.Kind.VARIABLE,
                name: {
                  kind: graphql_1.Kind.NAME,
                  value: variableName
                }
              },
              type: typeToAst(argument.type)
            };
          }
        });
        newSelectionSet.push(__assign(__assign({}, selection), {
          arguments: Object.keys(newArgs_1).map(function (argName) {
            return newArgs_1[argName];
          })
        }));
      } else {
        newSelectionSet.push(selection);
      }
    });
    return __assign(__assign({}, operation), {
      variableDefinitions: operation.variableDefinitions.concat(Object.keys(variables).map(function (varName) {
        return variables[varName];
      })),
      selectionSet: {
        kind: graphql_1.Kind.SELECTION_SET,
        selections: newSelectionSet
      }
    });
  });
  var newVariables = {};
  Object.keys(variableNames).forEach(function (name) {
    newVariables[variableNames[name]] = args[name];
  });
  return {
    document: __assign(__assign({}, document), {
      definitions: __spreadArrays(newOperations, fragments)
    }),
    newVariables: newVariables
  };
}
function typeToAst(type) {
  if (type instanceof graphql_1.GraphQLNonNull) {
    var innerType = typeToAst(type.ofType);
    if (innerType.kind === graphql_1.Kind.LIST_TYPE || innerType.kind === graphql_1.Kind.NAMED_TYPE) {
      return {
        kind: graphql_1.Kind.NON_NULL_TYPE,
        type: innerType
      };
    } else {
      throw new Error('Incorrent inner non-null type');
    }
  } else if (type instanceof graphql_1.GraphQLList) {
    return {
      kind: graphql_1.Kind.LIST_TYPE,
      type: typeToAst(type.ofType)
    };
  } else {
    return {
      kind: graphql_1.Kind.NAMED_TYPE,
      name: {
        kind: graphql_1.Kind.NAME,
        value: type.toString()
      }
    };
  }
}

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/AddTypenameToAbstract.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/AddTypenameToAbstract.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
var AddTypenameToAbstract = /** @class */function () {
  function AddTypenameToAbstract(targetSchema) {
    this.targetSchema = targetSchema;
  }
  AddTypenameToAbstract.prototype.transformRequest = function (originalRequest) {
    var document = addTypenameToAbstract(this.targetSchema, originalRequest.document);
    return __assign(__assign({}, originalRequest), {
      document: document
    });
  };
  return AddTypenameToAbstract;
}();
exports.default = AddTypenameToAbstract;
function addTypenameToAbstract(targetSchema, document) {
  var _a;
  var typeInfo = new graphql_1.TypeInfo(targetSchema);
  return graphql_1.visit(document, graphql_1.visitWithTypeInfo(typeInfo, (_a = {}, _a[graphql_1.Kind.SELECTION_SET] = function (node) {
    var parentType = typeInfo.getParentType();
    var selections = node.selections;
    if (parentType && (parentType instanceof graphql_1.GraphQLInterfaceType || parentType instanceof graphql_1.GraphQLUnionType) && !selections.find(function (_) {
      return _.kind === graphql_1.Kind.FIELD && _.name.value === '__typename';
    })) {
      selections = selections.concat({
        kind: graphql_1.Kind.FIELD,
        name: {
          kind: graphql_1.Kind.NAME,
          value: '__typename'
        }
      });
    }
    if (selections !== node.selections) {
      return __assign(__assign({}, node), {
        selections: selections
      });
    }
  }, _a)));
}

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/CheckResultAndHandleErrors.js":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/CheckResultAndHandleErrors.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var errors_1 = __webpack_require__(/*! ../stitching/errors */ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/errors.js");
var CheckResultAndHandleErrors = /** @class */function () {
  function CheckResultAndHandleErrors(info, fieldName) {
    this.info = info;
    this.fieldName = fieldName;
  }
  CheckResultAndHandleErrors.prototype.transformResult = function (result) {
    return errors_1.checkResultAndHandleErrors(result, this.info, this.fieldName);
  };
  return CheckResultAndHandleErrors;
}();
exports.default = CheckResultAndHandleErrors;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/ConvertEnumResponse.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/ConvertEnumResponse.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ConvertEnumResponse = /** @class */function () {
  function ConvertEnumResponse(enumNode) {
    this.enumNode = enumNode;
  }
  ConvertEnumResponse.prototype.transformResult = function (result) {
    var value = this.enumNode.getValue(result);
    if (value) {
      return value.value;
    }
    return result;
  };
  return ConvertEnumResponse;
}();
exports.default = ConvertEnumResponse;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/ConvertEnumValues.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/ConvertEnumValues.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
var visitSchema_1 = __webpack_require__(/*! ../transforms/visitSchema */ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/visitSchema.js");
// Transformation used to modifiy `GraphQLEnumType` values in a schema.
var ConvertEnumValues = /** @class */function () {
  function ConvertEnumValues(enumValueMap) {
    this.enumValueMap = enumValueMap;
  }
  // Walk a schema looking for `GraphQLEnumType` types. If found, and
  // matching types have been identified in `this.enumValueMap`, create new
  // `GraphQLEnumType` types using the `this.enumValueMap` specified new
  // values, and return them in the new schema.
  ConvertEnumValues.prototype.transformSchema = function (schema) {
    var _a;
    var enumValueMap = this.enumValueMap;
    if (!enumValueMap || Object.keys(enumValueMap).length === 0) {
      return schema;
    }
    var transformedSchema = visitSchema_1.visitSchema(schema, (_a = {}, _a[visitSchema_1.VisitSchemaKind.ENUM_TYPE] = function (enumType) {
      var externalToInternalValueMap = enumValueMap[enumType.name];
      if (externalToInternalValueMap) {
        var values = enumType.getValues();
        var newValues_1 = {};
        values.forEach(function (value) {
          var newValue = Object.keys(externalToInternalValueMap).includes(value.name) ? externalToInternalValueMap[value.name] : value.name;
          newValues_1[value.name] = {
            value: newValue,
            deprecationReason: value.deprecationReason,
            description: value.description,
            astNode: value.astNode
          };
        });
        return new graphql_1.GraphQLEnumType({
          name: enumType.name,
          description: enumType.description,
          astNode: enumType.astNode,
          values: newValues_1
        });
      }
      return enumType;
    }, _a));
    return transformedSchema;
  };
  return ConvertEnumValues;
}();
exports.default = ConvertEnumValues;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/ExpandAbstractTypes.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/ExpandAbstractTypes.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
var implementsAbstractType_1 = __webpack_require__(/*! ../implementsAbstractType */ "./node_modules/graphpack/node_modules/graphql-tools/dist/implementsAbstractType.js");
var ExpandAbstractTypes = /** @class */function () {
  function ExpandAbstractTypes(transformedSchema, targetSchema) {
    this.targetSchema = targetSchema;
    this.mapping = extractPossibleTypes(transformedSchema, targetSchema);
    this.reverseMapping = flipMapping(this.mapping);
  }
  ExpandAbstractTypes.prototype.transformRequest = function (originalRequest) {
    var document = expandAbstractTypes(this.targetSchema, this.mapping, this.reverseMapping, originalRequest.document);
    return __assign(__assign({}, originalRequest), {
      document: document
    });
  };
  return ExpandAbstractTypes;
}();
exports.default = ExpandAbstractTypes;
function extractPossibleTypes(transformedSchema, targetSchema) {
  var typeMap = transformedSchema.getTypeMap();
  var mapping = {};
  Object.keys(typeMap).forEach(function (typeName) {
    var type = typeMap[typeName];
    if (graphql_1.isAbstractType(type)) {
      var targetType = targetSchema.getType(typeName);
      if (!graphql_1.isAbstractType(targetType)) {
        var implementations = transformedSchema.getPossibleTypes(type) || [];
        mapping[typeName] = implementations.filter(function (impl) {
          return targetSchema.getType(impl.name);
        }).map(function (impl) {
          return impl.name;
        });
      }
    }
  });
  return mapping;
}
function flipMapping(mapping) {
  var result = {};
  Object.keys(mapping).forEach(function (typeName) {
    var toTypeNames = mapping[typeName];
    toTypeNames.forEach(function (toTypeName) {
      if (!result[toTypeName]) {
        result[toTypeName] = [];
      }
      result[toTypeName].push(typeName);
    });
  });
  return result;
}
function expandAbstractTypes(targetSchema, mapping, reverseMapping, document) {
  var _a;
  var operations = document.definitions.filter(function (def) {
    return def.kind === graphql_1.Kind.OPERATION_DEFINITION;
  });
  var fragments = document.definitions.filter(function (def) {
    return def.kind === graphql_1.Kind.FRAGMENT_DEFINITION;
  });
  var existingFragmentNames = fragments.map(function (fragment) {
    return fragment.name.value;
  });
  var fragmentCounter = 0;
  var generateFragmentName = function (typeName) {
    var fragmentName;
    do {
      fragmentName = "_" + typeName + "_Fragment" + fragmentCounter;
      fragmentCounter++;
    } while (existingFragmentNames.indexOf(fragmentName) !== -1);
    return fragmentName;
  };
  var newFragments = [];
  var fragmentReplacements = {};
  fragments.forEach(function (fragment) {
    newFragments.push(fragment);
    var possibleTypes = mapping[fragment.typeCondition.name.value];
    if (possibleTypes) {
      fragmentReplacements[fragment.name.value] = [];
      possibleTypes.forEach(function (possibleTypeName) {
        var name = generateFragmentName(possibleTypeName);
        existingFragmentNames.push(name);
        var newFragment = {
          kind: graphql_1.Kind.FRAGMENT_DEFINITION,
          name: {
            kind: graphql_1.Kind.NAME,
            value: name
          },
          typeCondition: {
            kind: graphql_1.Kind.NAMED_TYPE,
            name: {
              kind: graphql_1.Kind.NAME,
              value: possibleTypeName
            }
          },
          selectionSet: fragment.selectionSet
        };
        newFragments.push(newFragment);
        fragmentReplacements[fragment.name.value].push({
          fragmentName: name,
          typeName: possibleTypeName
        });
      });
    }
  });
  var newDocument = __assign(__assign({}, document), {
    definitions: __spreadArrays(operations, newFragments)
  });
  var typeInfo = new graphql_1.TypeInfo(targetSchema);
  return graphql_1.visit(newDocument, graphql_1.visitWithTypeInfo(typeInfo, (_a = {}, _a[graphql_1.Kind.SELECTION_SET] = function (node) {
    var newSelections = __spreadArrays(node.selections);
    var parentType = graphql_1.getNamedType(typeInfo.getParentType());
    node.selections.forEach(function (selection) {
      if (selection.kind === graphql_1.Kind.INLINE_FRAGMENT) {
        var possibleTypes = mapping[selection.typeCondition.name.value];
        if (possibleTypes) {
          possibleTypes.forEach(function (possibleType) {
            if (implementsAbstractType_1.default(targetSchema, parentType, targetSchema.getType(possibleType))) {
              newSelections.push({
                kind: graphql_1.Kind.INLINE_FRAGMENT,
                typeCondition: {
                  kind: graphql_1.Kind.NAMED_TYPE,
                  name: {
                    kind: graphql_1.Kind.NAME,
                    value: possibleType
                  }
                },
                selectionSet: selection.selectionSet
              });
            }
          });
        }
      } else if (selection.kind === graphql_1.Kind.FRAGMENT_SPREAD) {
        var fragmentName = selection.name.value;
        var replacements = fragmentReplacements[fragmentName];
        if (replacements) {
          replacements.forEach(function (replacement) {
            var typeName = replacement.typeName;
            if (implementsAbstractType_1.default(targetSchema, parentType, targetSchema.getType(typeName))) {
              newSelections.push({
                kind: graphql_1.Kind.FRAGMENT_SPREAD,
                name: {
                  kind: graphql_1.Kind.NAME,
                  value: replacement.fragmentName
                }
              });
            }
          });
        }
      }
    });
    if (parentType && reverseMapping[parentType.name]) {
      newSelections.push({
        kind: graphql_1.Kind.FIELD,
        name: {
          kind: graphql_1.Kind.NAME,
          value: '__typename'
        }
      });
    }
    if (newSelections.length !== node.selections.length) {
      return __assign(__assign({}, node), {
        selections: newSelections
      });
    }
  }, _a)));
}

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/ExtractField.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/ExtractField.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
var ExtractField = /** @class */function () {
  function ExtractField(_a) {
    var from = _a.from,
      to = _a.to;
    this.from = from;
    this.to = to;
  }
  ExtractField.prototype.transformRequest = function (originalRequest) {
    var _a, _b;
    var fromSelection;
    var ourPathFrom = JSON.stringify(this.from);
    var ourPathTo = JSON.stringify(this.to);
    var fieldPath = [];
    graphql_1.visit(originalRequest.document, (_a = {}, _a[graphql_1.Kind.FIELD] = {
      enter: function (node) {
        fieldPath.push(node.name.value);
        if (ourPathFrom === JSON.stringify(fieldPath)) {
          fromSelection = node.selectionSet;
          return graphql_1.BREAK;
        }
      },
      leave: function (node) {
        fieldPath.pop();
      }
    }, _a));
    fieldPath = [];
    var newDocument = graphql_1.visit(originalRequest.document, (_b = {}, _b[graphql_1.Kind.FIELD] = {
      enter: function (node) {
        fieldPath.push(node.name.value);
        if (ourPathTo === JSON.stringify(fieldPath) && fromSelection) {
          return __assign(__assign({}, node), {
            selectionSet: fromSelection
          });
        }
      },
      leave: function (node) {
        fieldPath.pop();
      }
    }, _b));
    return __assign(__assign({}, originalRequest), {
      document: newDocument
    });
  };
  return ExtractField;
}();
exports.default = ExtractField;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/FilterRootFields.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/FilterRootFields.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TransformRootFields_1 = __webpack_require__(/*! ./TransformRootFields */ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/TransformRootFields.js");
var FilterRootFields = /** @class */function () {
  function FilterRootFields(filter) {
    this.transformer = new TransformRootFields_1.default(function (operation, fieldName, field) {
      if (filter(operation, fieldName, field)) {
        return undefined;
      } else {
        return null;
      }
    });
  }
  FilterRootFields.prototype.transformSchema = function (originalSchema) {
    return this.transformer.transformSchema(originalSchema);
  };
  return FilterRootFields;
}();
exports.default = FilterRootFields;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/FilterToSchema.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/FilterToSchema.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
var implementsAbstractType_1 = __webpack_require__(/*! ../implementsAbstractType */ "./node_modules/graphpack/node_modules/graphql-tools/dist/implementsAbstractType.js");
var FilterToSchema = /** @class */function () {
  function FilterToSchema(targetSchema) {
    this.targetSchema = targetSchema;
  }
  FilterToSchema.prototype.transformRequest = function (originalRequest) {
    var document = filterDocumentToSchema(this.targetSchema, originalRequest.document);
    return __assign(__assign({}, originalRequest), {
      document: document
    });
  };
  return FilterToSchema;
}();
exports.default = FilterToSchema;
function filterDocumentToSchema(targetSchema, document) {
  var operations = document.definitions.filter(function (def) {
    return def.kind === graphql_1.Kind.OPERATION_DEFINITION;
  });
  var fragments = document.definitions.filter(function (def) {
    return def.kind === graphql_1.Kind.FRAGMENT_DEFINITION;
  });
  var usedFragments = [];
  var newOperations = [];
  var newFragments = [];
  var validFragments = fragments.filter(function (fragment) {
    var typeName = fragment.typeCondition.name.value;
    return Boolean(targetSchema.getType(typeName));
  });
  var validFragmentsWithType = {};
  validFragments.forEach(function (fragment) {
    var typeName = fragment.typeCondition.name.value;
    var type = targetSchema.getType(typeName);
    validFragmentsWithType[fragment.name.value] = type;
  });
  var fragmentSet = Object.create(null);
  operations.forEach(function (operation) {
    var type;
    if (operation.operation === 'subscription') {
      type = targetSchema.getSubscriptionType();
    } else if (operation.operation === 'mutation') {
      type = targetSchema.getMutationType();
    } else {
      type = targetSchema.getQueryType();
    }
    var _a = filterSelectionSet(targetSchema, type, validFragmentsWithType, operation.selectionSet),
      selectionSet = _a.selectionSet,
      operationUsedFragments = _a.usedFragments,
      operationUsedVariables = _a.usedVariables;
    usedFragments = union(usedFragments, operationUsedFragments);
    var _b = collectFragmentVariables(targetSchema, fragmentSet, validFragments, validFragmentsWithType, usedFragments),
      collectedUsedVariables = _b.usedVariables,
      collectedNewFragments = _b.newFragments,
      collectedFragmentSet = _b.fragmentSet;
    var fullUsedVariables = union(operationUsedVariables, collectedUsedVariables);
    newFragments = collectedNewFragments;
    fragmentSet = collectedFragmentSet;
    var variableDefinitions = operation.variableDefinitions.filter(function (variable) {
      return fullUsedVariables.indexOf(variable.variable.name.value) !== -1;
    });
    newOperations.push({
      kind: graphql_1.Kind.OPERATION_DEFINITION,
      operation: operation.operation,
      name: operation.name,
      directives: operation.directives,
      variableDefinitions: variableDefinitions,
      selectionSet: selectionSet
    });
  });
  return {
    kind: graphql_1.Kind.DOCUMENT,
    definitions: __spreadArrays(newOperations, newFragments)
  };
}
function collectFragmentVariables(targetSchema, fragmentSet, validFragments, validFragmentsWithType, usedFragments) {
  var usedVariables = [];
  var newFragments = [];
  var _loop_1 = function () {
    var nextFragmentName = usedFragments.pop();
    var fragment = validFragments.find(function (fr) {
      return fr.name.value === nextFragmentName;
    });
    if (fragment) {
      var name_1 = nextFragmentName;
      var typeName = fragment.typeCondition.name.value;
      var type = targetSchema.getType(typeName);
      var _a = filterSelectionSet(targetSchema, type, validFragmentsWithType, fragment.selectionSet),
        selectionSet = _a.selectionSet,
        fragmentUsedFragments = _a.usedFragments,
        fragmentUsedVariables = _a.usedVariables;
      usedFragments = union(usedFragments, fragmentUsedFragments);
      usedVariables = union(usedVariables, fragmentUsedVariables);
      if (!fragmentSet[name_1]) {
        fragmentSet[name_1] = true;
        newFragments.push({
          kind: graphql_1.Kind.FRAGMENT_DEFINITION,
          name: {
            kind: graphql_1.Kind.NAME,
            value: name_1
          },
          typeCondition: fragment.typeCondition,
          selectionSet: selectionSet
        });
      }
    }
  };
  while (usedFragments.length !== 0) {
    _loop_1();
  }
  return {
    usedVariables: usedVariables,
    newFragments: newFragments,
    fragmentSet: fragmentSet
  };
}
function filterSelectionSet(schema, type, validFragments, selectionSet) {
  var _a;
  var usedFragments = [];
  var usedVariables = [];
  var typeStack = [type];
  // Should be rewritten using visitWithSchema
  var filteredSelectionSet = graphql_1.visit(selectionSet, (_a = {}, _a[graphql_1.Kind.FIELD] = {
    enter: function (node) {
      var parentType = resolveType(typeStack[typeStack.length - 1]);
      if (parentType instanceof graphql_1.GraphQLObjectType || parentType instanceof graphql_1.GraphQLInterfaceType) {
        var fields = parentType.getFields();
        var field = node.name.value === '__typename' ? graphql_1.TypeNameMetaFieldDef : fields[node.name.value];
        if (!field) {
          return null;
        } else {
          typeStack.push(field.type);
        }
        var argNames_1 = (field.args || []).map(function (arg) {
          return arg.name;
        });
        if (node.arguments) {
          var args = node.arguments.filter(function (arg) {
            return argNames_1.indexOf(arg.name.value) !== -1;
          });
          if (args.length !== node.arguments.length) {
            return __assign(__assign({}, node), {
              arguments: args
            });
          }
        }
      } else if (parentType instanceof graphql_1.GraphQLUnionType && node.name.value === '__typename') {
        typeStack.push(graphql_1.TypeNameMetaFieldDef.type);
      }
    },
    leave: function (node) {
      var _a;
      var currentType = typeStack.pop();
      var resolvedType = resolveType(currentType);
      if (resolvedType instanceof graphql_1.GraphQLObjectType || resolvedType instanceof graphql_1.GraphQLInterfaceType) {
        var selections = node.selectionSet && node.selectionSet.selections || null;
        if (!selections || selections.length === 0) {
          // need to remove any added variables. Is there a better way to do this?
          graphql_1.visit(node, (_a = {}, _a[graphql_1.Kind.VARIABLE] = function (variableNode) {
            var index = usedVariables.indexOf(variableNode.name.value);
            if (index !== -1) {
              usedVariables.splice(index, 1);
            }
          }, _a));
          return null;
        }
      }
    }
  }, _a[graphql_1.Kind.FRAGMENT_SPREAD] = function (node) {
    if (node.name.value in validFragments) {
      var parentType = resolveType(typeStack[typeStack.length - 1]);
      var innerType = validFragments[node.name.value];
      if (!implementsAbstractType_1.default(schema, parentType, innerType)) {
        return null;
      } else {
        usedFragments.push(node.name.value);
        return;
      }
    } else {
      return null;
    }
  }, _a[graphql_1.Kind.INLINE_FRAGMENT] = {
    enter: function (node) {
      if (node.typeCondition) {
        var innerType = schema.getType(node.typeCondition.name.value);
        var parentType = resolveType(typeStack[typeStack.length - 1]);
        if (implementsAbstractType_1.default(schema, parentType, innerType)) {
          typeStack.push(innerType);
        } else {
          return null;
        }
      }
    },
    leave: function (node) {
      typeStack.pop();
    }
  }, _a[graphql_1.Kind.VARIABLE] = function (node) {
    usedVariables.push(node.name.value);
  }, _a));
  return {
    selectionSet: filteredSelectionSet,
    usedFragments: usedFragments,
    usedVariables: usedVariables
  };
}
function resolveType(type) {
  var lastType = type;
  while (lastType instanceof graphql_1.GraphQLNonNull || lastType instanceof graphql_1.GraphQLList) {
    lastType = lastType.ofType;
  }
  return lastType;
}
function union() {
  var arrays = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    arrays[_i] = arguments[_i];
  }
  var cache = {};
  var result = [];
  arrays.forEach(function (array) {
    array.forEach(function (item) {
      if (!cache[item]) {
        cache[item] = true;
        result.push(item);
      }
    });
  });
  return result;
}

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/FilterTypes.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/FilterTypes.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* tslint:disable:no-unused-expression */
Object.defineProperty(exports, "__esModule", {
  value: true
});
var visitSchema_1 = __webpack_require__(/*! ../transforms/visitSchema */ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/visitSchema.js");
var FilterTypes = /** @class */function () {
  function FilterTypes(filter) {
    this.filter = filter;
  }
  FilterTypes.prototype.transformSchema = function (schema) {
    var _a;
    var _this = this;
    return visitSchema_1.visitSchema(schema, (_a = {}, _a[visitSchema_1.VisitSchemaKind.TYPE] = function (type) {
      if (_this.filter(type)) {
        return undefined;
      } else {
        return null;
      }
    }, _a));
  };
  return FilterTypes;
}();
exports.default = FilterTypes;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/RenameRootFields.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/RenameRootFields.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var schemaRecreation_1 = __webpack_require__(/*! ../stitching/schemaRecreation */ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/schemaRecreation.js");
var TransformRootFields_1 = __webpack_require__(/*! ./TransformRootFields */ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/TransformRootFields.js");
var RenameRootFields = /** @class */function () {
  function RenameRootFields(renamer) {
    var resolveType = schemaRecreation_1.createResolveType(function (name, type) {
      return type;
    });
    this.transformer = new TransformRootFields_1.default(function (operation, fieldName, field) {
      return {
        name: renamer(operation, fieldName, field),
        field: schemaRecreation_1.fieldToFieldConfig(field, resolveType, true)
      };
    });
  }
  RenameRootFields.prototype.transformSchema = function (originalSchema) {
    return this.transformer.transformSchema(originalSchema);
  };
  return RenameRootFields;
}();
exports.default = RenameRootFields;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/RenameTypes.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/RenameTypes.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
var isSpecifiedScalarType_1 = __webpack_require__(/*! ../isSpecifiedScalarType */ "./node_modules/graphpack/node_modules/graphql-tools/dist/isSpecifiedScalarType.js");
var visitSchema_1 = __webpack_require__(/*! ../transforms/visitSchema */ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/visitSchema.js");
var RenameTypes = /** @class */function () {
  function RenameTypes(renamer, options) {
    this.renamer = renamer;
    this.reverseMap = {};
    var _a = options || {},
      _b = _a.renameBuiltins,
      renameBuiltins = _b === void 0 ? false : _b,
      _c = _a.renameScalars,
      renameScalars = _c === void 0 ? true : _c;
    this.renameBuiltins = renameBuiltins;
    this.renameScalars = renameScalars;
  }
  RenameTypes.prototype.transformSchema = function (originalSchema) {
    var _a;
    var _this = this;
    return visitSchema_1.visitSchema(originalSchema, (_a = {}, _a[visitSchema_1.VisitSchemaKind.TYPE] = function (type) {
      if (isSpecifiedScalarType_1.default(type) && !_this.renameBuiltins) {
        return undefined;
      }
      if (type instanceof graphql_1.GraphQLScalarType && !_this.renameScalars) {
        return undefined;
      }
      var newName = _this.renamer(type.name);
      if (newName && newName !== type.name) {
        _this.reverseMap[newName] = type.name;
        var newType = Object.assign(Object.create(type), type);
        newType.name = newName;
        return newType;
      }
    }, _a[visitSchema_1.VisitSchemaKind.ROOT_OBJECT] = function (type) {
      return undefined;
    }, _a));
  };
  RenameTypes.prototype.transformRequest = function (originalRequest) {
    var _a;
    var _this = this;
    var newDocument = graphql_1.visit(originalRequest.document, (_a = {}, _a[graphql_1.Kind.NAMED_TYPE] = function (node) {
      var name = node.name.value;
      if (name in _this.reverseMap) {
        return __assign(__assign({}, node), {
          name: {
            kind: graphql_1.Kind.NAME,
            value: _this.reverseMap[name]
          }
        });
      }
    }, _a));
    return {
      document: newDocument,
      variables: originalRequest.variables
    };
  };
  RenameTypes.prototype.transformResult = function (result) {
    if (result.data) {
      var data = this.renameTypes(result.data, 'data');
      if (data !== result.data) {
        return __assign(__assign({}, result), {
          data: data
        });
      }
    }
    return result;
  };
  RenameTypes.prototype.renameTypes = function (value, name) {
    var _this = this;
    if (name === '__typename') {
      return this.renamer(value);
    }
    if (value && typeof value === 'object') {
      var newValue_1 = Array.isArray(value) ? []
      // Create a new object with the same prototype.
      : Object.create(Object.getPrototypeOf(value));
      var returnNewValue_1 = false;
      Object.keys(value).forEach(function (key) {
        var oldChild = value[key];
        var newChild = _this.renameTypes(oldChild, key);
        newValue_1[key] = newChild;
        if (newChild !== oldChild) {
          returnNewValue_1 = true;
        }
      });
      if (returnNewValue_1) {
        return newValue_1;
      }
    }
    return value;
  };
  return RenameTypes;
}();
exports.default = RenameTypes;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/ReplaceFieldWithFragment.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/ReplaceFieldWithFragment.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
var ReplaceFieldWithFragment = /** @class */function () {
  function ReplaceFieldWithFragment(targetSchema, fragments) {
    this.targetSchema = targetSchema;
    this.mapping = {};
    for (var _i = 0, fragments_1 = fragments; _i < fragments_1.length; _i++) {
      var _a = fragments_1[_i],
        field = _a.field,
        fragment = _a.fragment;
      var parsedFragment = parseFragmentToInlineFragment(fragment);
      var actualTypeName = parsedFragment.typeCondition.name.value;
      this.mapping[actualTypeName] = this.mapping[actualTypeName] || {};
      if (this.mapping[actualTypeName][field]) {
        this.mapping[actualTypeName][field].push(parsedFragment);
      } else {
        this.mapping[actualTypeName][field] = [parsedFragment];
      }
    }
  }
  ReplaceFieldWithFragment.prototype.transformRequest = function (originalRequest) {
    var document = replaceFieldsWithFragments(this.targetSchema, originalRequest.document, this.mapping);
    return __assign(__assign({}, originalRequest), {
      document: document
    });
  };
  return ReplaceFieldWithFragment;
}();
exports.default = ReplaceFieldWithFragment;
function replaceFieldsWithFragments(targetSchema, document, mapping) {
  var _a;
  var typeInfo = new graphql_1.TypeInfo(targetSchema);
  return graphql_1.visit(document, graphql_1.visitWithTypeInfo(typeInfo, (_a = {}, _a[graphql_1.Kind.SELECTION_SET] = function (node) {
    var parentType = typeInfo.getParentType();
    if (parentType) {
      var parentTypeName_1 = parentType.name;
      var selections_1 = node.selections;
      if (mapping[parentTypeName_1]) {
        node.selections.forEach(function (selection) {
          if (selection.kind === graphql_1.Kind.FIELD) {
            var name_1 = selection.name.value;
            var fragments = mapping[parentTypeName_1][name_1];
            if (fragments && fragments.length > 0) {
              var fragment = concatInlineFragments(parentTypeName_1, fragments);
              selections_1 = selections_1.concat(fragment);
            }
          }
        });
      }
      if (selections_1 !== node.selections) {
        return __assign(__assign({}, node), {
          selections: selections_1
        });
      }
    }
  }, _a)));
}
function parseFragmentToInlineFragment(definitions) {
  if (definitions.trim().startsWith('fragment')) {
    var document_1 = graphql_1.parse(definitions);
    for (var _i = 0, _a = document_1.definitions; _i < _a.length; _i++) {
      var definition = _a[_i];
      if (definition.kind === graphql_1.Kind.FRAGMENT_DEFINITION) {
        return {
          kind: graphql_1.Kind.INLINE_FRAGMENT,
          typeCondition: definition.typeCondition,
          selectionSet: definition.selectionSet
        };
      }
    }
  }
  var query = graphql_1.parse("{" + definitions + "}").definitions[0];
  for (var _b = 0, _c = query.selectionSet.selections; _b < _c.length; _b++) {
    var selection = _c[_b];
    if (selection.kind === graphql_1.Kind.INLINE_FRAGMENT) {
      return selection;
    }
  }
  throw new Error('Could not parse fragment');
}
function concatInlineFragments(type, fragments) {
  var fragmentSelections = fragments.reduce(function (selections, fragment) {
    return selections.concat(fragment.selectionSet.selections);
  }, []);
  var deduplicatedFragmentSelection = deduplicateSelection(fragmentSelections);
  return {
    kind: graphql_1.Kind.INLINE_FRAGMENT,
    typeCondition: {
      kind: graphql_1.Kind.NAMED_TYPE,
      name: {
        kind: graphql_1.Kind.NAME,
        value: type
      }
    },
    selectionSet: {
      kind: graphql_1.Kind.SELECTION_SET,
      selections: deduplicatedFragmentSelection
    }
  };
}
function deduplicateSelection(nodes) {
  var selectionMap = nodes.reduce(function (map, node) {
    var _a, _b, _c;
    switch (node.kind) {
      case 'Field':
        {
          if (node.alias) {
            if (map.hasOwnProperty(node.alias.value)) {
              return map;
            } else {
              return __assign(__assign({}, map), (_a = {}, _a[node.alias.value] = node, _a));
            }
          } else {
            if (map.hasOwnProperty(node.name.value)) {
              return map;
            } else {
              return __assign(__assign({}, map), (_b = {}, _b[node.name.value] = node, _b));
            }
          }
        }
      case 'FragmentSpread':
        {
          if (map.hasOwnProperty(node.name.value)) {
            return map;
          } else {
            return __assign(__assign({}, map), (_c = {}, _c[node.name.value] = node, _c));
          }
        }
      case 'InlineFragment':
        {
          if (map.__fragment) {
            var fragment = map.__fragment;
            return __assign(__assign({}, map), {
              __fragment: concatInlineFragments(fragment.typeCondition.name.value, [fragment, node])
            });
          } else {
            return __assign(__assign({}, map), {
              __fragment: node
            });
          }
        }
      default:
        {
          return map;
        }
    }
  }, {});
  var selection = Object.keys(selectionMap).reduce(function (selectionList, node) {
    return selectionList.concat(selectionMap[node]);
  }, []);
  return selection;
}

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/TransformRootFields.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/TransformRootFields.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
var isEmptyObject_1 = __webpack_require__(/*! ../isEmptyObject */ "./node_modules/graphpack/node_modules/graphql-tools/dist/isEmptyObject.js");
var visitSchema_1 = __webpack_require__(/*! ./visitSchema */ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/visitSchema.js");
var schemaRecreation_1 = __webpack_require__(/*! ../stitching/schemaRecreation */ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/schemaRecreation.js");
var TransformRootFields = /** @class */function () {
  function TransformRootFields(transform) {
    this.transform = transform;
  }
  TransformRootFields.prototype.transformSchema = function (originalSchema) {
    var _a;
    var _this = this;
    return visitSchema_1.visitSchema(originalSchema, (_a = {}, _a[visitSchema_1.VisitSchemaKind.QUERY] = function (type) {
      return transformFields(type, function (fieldName, field) {
        return _this.transform('Query', fieldName, field);
      });
    }, _a[visitSchema_1.VisitSchemaKind.MUTATION] = function (type) {
      return transformFields(type, function (fieldName, field) {
        return _this.transform('Mutation', fieldName, field);
      });
    }, _a[visitSchema_1.VisitSchemaKind.SUBSCRIPTION] = function (type) {
      return transformFields(type, function (fieldName, field) {
        return _this.transform('Subscription', fieldName, field);
      });
    }, _a));
  };
  return TransformRootFields;
}();
exports.default = TransformRootFields;
function transformFields(type, transformer) {
  var resolveType = schemaRecreation_1.createResolveType(function (name, originalType) {
    return originalType;
  });
  var fields = type.getFields();
  var newFields = {};
  Object.keys(fields).forEach(function (fieldName) {
    var field = fields[fieldName];
    var newField = transformer(fieldName, field);
    if (typeof newField === 'undefined') {
      newFields[fieldName] = schemaRecreation_1.fieldToFieldConfig(field, resolveType, true);
    } else if (newField !== null) {
      if (newField.name) {
        newFields[newField.name] = newField.field;
      } else {
        newFields[fieldName] = newField;
      }
    }
  });
  if (isEmptyObject_1.default(newFields)) {
    return null;
  } else {
    return new graphql_1.GraphQLObjectType({
      name: type.name,
      description: type.description,
      astNode: type.astNode,
      fields: newFields
    });
  }
}

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/WrapQuery.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/WrapQuery.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
var WrapQuery = /** @class */function () {
  function WrapQuery(path, wrapper, extractor) {
    this.path = path;
    this.wrapper = wrapper;
    this.extractor = extractor;
  }
  WrapQuery.prototype.transformRequest = function (originalRequest) {
    var _a;
    var _this = this;
    var document = originalRequest.document;
    var fieldPath = [];
    var ourPath = JSON.stringify(this.path);
    var newDocument = graphql_1.visit(document, (_a = {}, _a[graphql_1.Kind.FIELD] = {
      enter: function (node) {
        fieldPath.push(node.name.value);
        if (ourPath === JSON.stringify(fieldPath)) {
          var wrapResult = _this.wrapper(node.selectionSet);
          // Selection can be either a single selection or a selection set. If it's just one selection,
          // let's wrap it in a selection set. Otherwise, keep it as is.
          var selectionSet = wrapResult.kind === graphql_1.Kind.SELECTION_SET ? wrapResult : {
            kind: graphql_1.Kind.SELECTION_SET,
            selections: [wrapResult]
          };
          return __assign(__assign({}, node), {
            selectionSet: selectionSet
          });
        }
      },
      leave: function (node) {
        fieldPath.pop();
      }
    }, _a));
    return __assign(__assign({}, originalRequest), {
      document: newDocument
    });
  };
  WrapQuery.prototype.transformResult = function (originalResult) {
    var rootData = originalResult.data;
    if (rootData) {
      var data = rootData;
      var path = __spreadArrays(this.path);
      while (path.length > 1) {
        var next = path.shift();
        if (data[next]) {
          data = data[next];
        }
      }
      data[path[0]] = this.extractor(data[path[0]]);
    }
    return {
      data: rootData,
      errors: originalResult.errors
    };
  };
  return WrapQuery;
}();
exports.default = WrapQuery;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/index.js":
/*!************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/index.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var transformSchema_1 = __webpack_require__(/*! ./transformSchema */ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/transformSchema.js");
exports.transformSchema = transformSchema_1.default;
var AddArgumentsAsVariables_1 = __webpack_require__(/*! ./AddArgumentsAsVariables */ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/AddArgumentsAsVariables.js");
exports.AddArgumentsAsVariables = AddArgumentsAsVariables_1.default;
var CheckResultAndHandleErrors_1 = __webpack_require__(/*! ./CheckResultAndHandleErrors */ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/CheckResultAndHandleErrors.js");
exports.CheckResultAndHandleErrors = CheckResultAndHandleErrors_1.default;
var ReplaceFieldWithFragment_1 = __webpack_require__(/*! ./ReplaceFieldWithFragment */ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/ReplaceFieldWithFragment.js");
exports.ReplaceFieldWithFragment = ReplaceFieldWithFragment_1.default;
var AddTypenameToAbstract_1 = __webpack_require__(/*! ./AddTypenameToAbstract */ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/AddTypenameToAbstract.js");
exports.AddTypenameToAbstract = AddTypenameToAbstract_1.default;
var FilterToSchema_1 = __webpack_require__(/*! ./FilterToSchema */ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/FilterToSchema.js");
exports.FilterToSchema = FilterToSchema_1.default;
var RenameTypes_1 = __webpack_require__(/*! ./RenameTypes */ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/RenameTypes.js");
exports.RenameTypes = RenameTypes_1.default;
var FilterTypes_1 = __webpack_require__(/*! ./FilterTypes */ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/FilterTypes.js");
exports.FilterTypes = FilterTypes_1.default;
var TransformRootFields_1 = __webpack_require__(/*! ./TransformRootFields */ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/TransformRootFields.js");
exports.TransformRootFields = TransformRootFields_1.default;
var RenameRootFields_1 = __webpack_require__(/*! ./RenameRootFields */ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/RenameRootFields.js");
exports.RenameRootFields = RenameRootFields_1.default;
var FilterRootFields_1 = __webpack_require__(/*! ./FilterRootFields */ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/FilterRootFields.js");
exports.FilterRootFields = FilterRootFields_1.default;
var ExpandAbstractTypes_1 = __webpack_require__(/*! ./ExpandAbstractTypes */ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/ExpandAbstractTypes.js");
exports.ExpandAbstractTypes = ExpandAbstractTypes_1.default;
var ExtractField_1 = __webpack_require__(/*! ./ExtractField */ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/ExtractField.js");
exports.ExtractField = ExtractField_1.default;
var WrapQuery_1 = __webpack_require__(/*! ./WrapQuery */ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/WrapQuery.js");
exports.WrapQuery = WrapQuery_1.default;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/transformSchema.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/transformSchema.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var makeExecutableSchema_1 = __webpack_require__(/*! ../makeExecutableSchema */ "./node_modules/graphpack/node_modules/graphql-tools/dist/makeExecutableSchema.js");
var visitSchema_1 = __webpack_require__(/*! ../transforms/visitSchema */ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/visitSchema.js");
var transforms_1 = __webpack_require__(/*! ../transforms/transforms */ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/transforms.js");
var resolvers_1 = __webpack_require__(/*! ../stitching/resolvers */ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/resolvers.js");
function transformSchema(targetSchema, transforms) {
  var schema = visitSchema_1.visitSchema(targetSchema, {}, true);
  var mapping = resolvers_1.generateSimpleMapping(targetSchema);
  var resolvers = resolvers_1.generateProxyingResolvers(targetSchema, transforms, mapping);
  schema = makeExecutableSchema_1.addResolveFunctionsToSchema({
    schema: schema,
    resolvers: resolvers,
    resolverValidationOptions: {
      allowResolversNotInSchema: true
    }
  });
  schema = transforms_1.applySchemaTransforms(schema, transforms);
  schema.transforms = transforms;
  return schema;
}
exports.default = transformSchema;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/transforms.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/transforms.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
function applySchemaTransforms(originalSchema, transforms) {
  return transforms.reduce(function (schema, transform) {
    return transform.transformSchema ? transform.transformSchema(schema) : schema;
  }, originalSchema);
}
exports.applySchemaTransforms = applySchemaTransforms;
function applyRequestTransforms(originalRequest, transforms) {
  return transforms.reduce(function (request, transform) {
    return transform.transformRequest ? transform.transformRequest(request) : request;
  }, originalRequest);
}
exports.applyRequestTransforms = applyRequestTransforms;
function applyResultTransforms(originalResult, transforms) {
  return transforms.reduce(function (result, transform) {
    return transform.transformResult ? transform.transformResult(result) : result;
  }, originalResult);
}
exports.applyResultTransforms = applyResultTransforms;
function composeTransforms() {
  var transforms = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    transforms[_i] = arguments[_i];
  }
  var reverseTransforms = __spreadArrays(transforms).reverse();
  return {
    transformSchema: function (originalSchema) {
      return applySchemaTransforms(originalSchema, transforms);
    },
    transformRequest: function (originalRequest) {
      return applyRequestTransforms(originalRequest, reverseTransforms);
    },
    transformResult: function (result) {
      return applyResultTransforms(result, reverseTransforms);
    }
  };
}
exports.composeTransforms = composeTransforms;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/visitSchema.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-tools/dist/transforms/visitSchema.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql_1 = __webpack_require__(/*! graphql */ "graphql");
var schemaRecreation_1 = __webpack_require__(/*! ../stitching/schemaRecreation */ "./node_modules/graphpack/node_modules/graphql-tools/dist/stitching/schemaRecreation.js");
var VisitSchemaKind;
(function (VisitSchemaKind) {
  VisitSchemaKind["TYPE"] = "VisitSchemaKind.TYPE";
  VisitSchemaKind["SCALAR_TYPE"] = "VisitSchemaKind.SCALAR_TYPE";
  VisitSchemaKind["ENUM_TYPE"] = "VisitSchemaKind.ENUM_TYPE";
  VisitSchemaKind["COMPOSITE_TYPE"] = "VisitSchemaKind.COMPOSITE_TYPE";
  VisitSchemaKind["OBJECT_TYPE"] = "VisitSchemaKind.OBJECT_TYPE";
  VisitSchemaKind["INPUT_OBJECT_TYPE"] = "VisitSchemaKind.INPUT_OBJECT_TYPE";
  VisitSchemaKind["ABSTRACT_TYPE"] = "VisitSchemaKind.ABSTRACT_TYPE";
  VisitSchemaKind["UNION_TYPE"] = "VisitSchemaKind.UNION_TYPE";
  VisitSchemaKind["INTERFACE_TYPE"] = "VisitSchemaKind.INTERFACE_TYPE";
  VisitSchemaKind["ROOT_OBJECT"] = "VisitSchemaKind.ROOT_OBJECT";
  VisitSchemaKind["QUERY"] = "VisitSchemaKind.QUERY";
  VisitSchemaKind["MUTATION"] = "VisitSchemaKind.MUTATION";
  VisitSchemaKind["SUBSCRIPTION"] = "VisitSchemaKind.SUBSCRIPTION";
})(VisitSchemaKind = exports.VisitSchemaKind || (exports.VisitSchemaKind = {}));
function visitSchema(schema, visitor, stripResolvers) {
  var types = {};
  var resolveType = schemaRecreation_1.createResolveType(function (name) {
    if (typeof types[name] === 'undefined') {
      throw new Error("Can't find type " + name + ".");
    }
    return types[name];
  });
  var queryType = schema.getQueryType();
  var mutationType = schema.getMutationType();
  var subscriptionType = schema.getSubscriptionType();
  var typeMap = schema.getTypeMap();
  Object.keys(typeMap).map(function (typeName) {
    var type = typeMap[typeName];
    if (graphql_1.isNamedType(type) && graphql_1.getNamedType(type).name.slice(0, 2) !== '__') {
      var specifiers = getTypeSpecifiers(type, schema);
      var typeVisitor = getVisitor(visitor, specifiers);
      if (typeVisitor) {
        var result = typeVisitor(type, schema);
        if (typeof result === 'undefined') {
          types[typeName] = schemaRecreation_1.recreateType(type, resolveType, !stripResolvers);
        } else if (result === null) {
          types[typeName] = null;
        } else {
          types[typeName] = schemaRecreation_1.recreateType(result, resolveType, !stripResolvers);
        }
      } else {
        types[typeName] = schemaRecreation_1.recreateType(type, resolveType, !stripResolvers);
      }
    }
  });
  return new graphql_1.GraphQLSchema({
    query: queryType ? types[queryType.name] : null,
    mutation: mutationType ? types[mutationType.name] : null,
    subscription: subscriptionType ? types[subscriptionType.name] : null,
    types: Object.keys(types).map(function (name) {
      return types[name];
    })
  });
}
exports.visitSchema = visitSchema;
function getTypeSpecifiers(type, schema) {
  var specifiers = [VisitSchemaKind.TYPE];
  if (type instanceof graphql_1.GraphQLObjectType) {
    specifiers.unshift(VisitSchemaKind.COMPOSITE_TYPE, VisitSchemaKind.OBJECT_TYPE);
    var query = schema.getQueryType();
    var mutation = schema.getMutationType();
    var subscription = schema.getSubscriptionType();
    if (type === query) {
      specifiers.push(VisitSchemaKind.ROOT_OBJECT, VisitSchemaKind.QUERY);
    } else if (type === mutation) {
      specifiers.push(VisitSchemaKind.ROOT_OBJECT, VisitSchemaKind.MUTATION);
    } else if (type === subscription) {
      specifiers.push(VisitSchemaKind.ROOT_OBJECT, VisitSchemaKind.SUBSCRIPTION);
    }
  } else if (type instanceof graphql_1.GraphQLInputObjectType) {
    specifiers.push(VisitSchemaKind.INPUT_OBJECT_TYPE);
  } else if (type instanceof graphql_1.GraphQLInterfaceType) {
    specifiers.push(VisitSchemaKind.COMPOSITE_TYPE, VisitSchemaKind.ABSTRACT_TYPE, VisitSchemaKind.INTERFACE_TYPE);
  } else if (type instanceof graphql_1.GraphQLUnionType) {
    specifiers.push(VisitSchemaKind.COMPOSITE_TYPE, VisitSchemaKind.ABSTRACT_TYPE, VisitSchemaKind.UNION_TYPE);
  } else if (type instanceof graphql_1.GraphQLEnumType) {
    specifiers.push(VisitSchemaKind.ENUM_TYPE);
  } else if (type instanceof graphql_1.GraphQLScalarType) {
    specifiers.push(VisitSchemaKind.SCALAR_TYPE);
  }
  return specifiers;
}
function getVisitor(visitor, specifiers) {
  var typeVisitor = null;
  var stack = __spreadArrays(specifiers);
  while (!typeVisitor && stack.length > 0) {
    var next = stack.pop();
    typeVisitor = visitor[next];
  }
  return typeVisitor;
}

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-upload/lib/GraphQLUpload.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-upload/lib/GraphQLUpload.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.GraphQLUpload = void 0;
var _graphql = __webpack_require__(/*! graphql */ "graphql");
const GraphQLUpload = new _graphql.GraphQLScalarType({
  name: 'Upload',
  description: 'The `Upload` scalar type represents a file upload.',
  parseValue: value => value,
  parseLiteral() {
    throw new Error('‘Upload’ scalar literal unsupported.');
  },
  serialize() {
    throw new Error('‘Upload’ scalar serialization unsupported.');
  }
});
exports.GraphQLUpload = GraphQLUpload;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-upload/lib/constants.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-upload/lib/constants.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.SPEC_URL = void 0;
const SPEC_URL = 'https://github.com/jaydenseric/graphql-multipart-request-spec';
exports.SPEC_URL = SPEC_URL;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-upload/lib/graphqlUploadExpress.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-upload/lib/graphqlUploadExpress.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.graphqlUploadExpress = void 0;
var _processRequest = __webpack_require__(/*! ./processRequest */ "./node_modules/graphpack/node_modules/graphql-upload/lib/processRequest.js");
const graphqlUploadExpress = ({
  processRequest = _processRequest.processRequest,
  ...processRequestOptions
} = {}) => (request, response, next) => {
  if (!request.is('multipart/form-data')) return next();
  const finished = new Promise(resolve => request.on('end', resolve));
  const {
    send
  } = response;
  response.send = (...args) => {
    finished.then(() => {
      response.send = send;
      response.send(...args);
    });
  };
  processRequest(request, response, processRequestOptions).then(body => {
    request.body = body;
    next();
  }).catch(error => {
    if (error.status && error.expose) response.status(error.status);
    next(error);
  });
};
exports.graphqlUploadExpress = graphqlUploadExpress;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-upload/lib/graphqlUploadKoa.js":
/*!************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-upload/lib/graphqlUploadKoa.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.graphqlUploadKoa = void 0;
var _processRequest = __webpack_require__(/*! ./processRequest */ "./node_modules/graphpack/node_modules/graphql-upload/lib/processRequest.js");
const graphqlUploadKoa = ({
  processRequest = _processRequest.processRequest,
  ...processRequestOptions
} = {}) => async (ctx, next) => {
  if (!ctx.request.is('multipart/form-data')) return next();
  const finished = new Promise(resolve => ctx.req.on('end', resolve));
  try {
    ctx.request.body = await processRequest(ctx.req, ctx.res, processRequestOptions);
    await next();
  } finally {
    await finished;
  }
};
exports.graphqlUploadKoa = graphqlUploadKoa;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-upload/lib/ignoreStream.js":
/*!********************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-upload/lib/ignoreStream.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.ignoreStream = void 0;
const ignoreStream = stream => {
  stream.on('error', () => {});
  stream.resume();
};
exports.ignoreStream = ignoreStream;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-upload/lib/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-upload/lib/index.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.graphqlUploadExpress = exports.graphqlUploadKoa = exports.processRequest = exports.GraphQLUpload = void 0;
var _GraphQLUpload = __webpack_require__(/*! ./GraphQLUpload */ "./node_modules/graphpack/node_modules/graphql-upload/lib/GraphQLUpload.js");
exports.GraphQLUpload = _GraphQLUpload.GraphQLUpload;
var _processRequest = __webpack_require__(/*! ./processRequest */ "./node_modules/graphpack/node_modules/graphql-upload/lib/processRequest.js");
exports.processRequest = _processRequest.processRequest;
var _graphqlUploadKoa = __webpack_require__(/*! ./graphqlUploadKoa */ "./node_modules/graphpack/node_modules/graphql-upload/lib/graphqlUploadKoa.js");
exports.graphqlUploadKoa = _graphqlUploadKoa.graphqlUploadKoa;
var _graphqlUploadExpress = __webpack_require__(/*! ./graphqlUploadExpress */ "./node_modules/graphpack/node_modules/graphql-upload/lib/graphqlUploadExpress.js");
exports.graphqlUploadExpress = _graphqlUploadExpress.graphqlUploadExpress;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-upload/lib/isEnumerableObject.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-upload/lib/isEnumerableObject.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.isEnumerableObject = void 0;
const isEnumerableObject = value => typeof value === 'object' && value !== null && !Array.isArray(value);
exports.isEnumerableObject = isEnumerableObject;

/***/ }),

/***/ "./node_modules/graphpack/node_modules/graphql-upload/lib/processRequest.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/graphpack/node_modules/graphql-upload/lib/processRequest.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.processRequest = void 0;
var _util = _interopRequireDefault(__webpack_require__(/*! util */ "util"));
var _busboy = _interopRequireDefault(__webpack_require__(/*! busboy */ "busboy"));
var _fsCapacitor = __webpack_require__(/*! fs-capacitor */ "fs-capacitor");
var _httpErrors = _interopRequireDefault(__webpack_require__(/*! http-errors */ "http-errors"));
var _objectPath = _interopRequireDefault(__webpack_require__(/*! object-path */ "object-path"));
var _constants = __webpack_require__(/*! ./constants */ "./node_modules/graphpack/node_modules/graphql-upload/lib/constants.js");
var _ignoreStream = __webpack_require__(/*! ./ignoreStream */ "./node_modules/graphpack/node_modules/graphql-upload/lib/ignoreStream.js");
var _isEnumerableObject = __webpack_require__(/*! ./isEnumerableObject */ "./node_modules/graphpack/node_modules/graphql-upload/lib/isEnumerableObject.js");

// istanbul ignore next
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
class Upload {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = file => {
        this.file = file;
        resolve(file);
      };
      this.reject = reject;
    });
    this.promise.catch(() => {});
  }
}
const processRequest = (request, response, {
  maxFieldSize = 1000000,
  maxFileSize = Infinity,
  maxFiles = Infinity
} = {}) => new Promise((resolve, reject) => {
  let released;
  let exitError;
  let currentStream;
  let operations;
  let operationsPath;
  let map;
  const parser = new _busboy.default({
    headers: request.headers,
    limits: {
      fieldSize: maxFieldSize,
      fields: 2,
      fileSize: maxFileSize,
      files: maxFiles
    }
  });
  const exit = error => {
    if (exitError) return;
    exitError = error;
    reject(exitError);
    parser.destroy();
    if (currentStream) currentStream.destroy(exitError);
    if (map) for (const upload of map.values()) if (!upload.file) upload.reject(exitError);
    request.unpipe(parser);
    setImmediate(() => {
      request.resume();
    });
  };
  const release = () => {
    // istanbul ignore next
    if (released) return;
    released = true;
    if (map) for (const upload of map.values()) if (upload.file) upload.file.capacitor.destroy();
  };
  const abort = () => {
    exit((0, _httpErrors.default)(499, 'Request disconnected during file upload stream parsing.'));
  };
  parser.on('field', (fieldName, value, fieldNameTruncated, valueTruncated) => {
    if (exitError) return;
    if (valueTruncated) return exit((0, _httpErrors.default)(413, `The ‘${fieldName}’ multipart field value exceeds the ${maxFieldSize} byte size limit.`));
    switch (fieldName) {
      case 'operations':
        try {
          operations = JSON.parse(value);
        } catch (error) {
          return exit((0, _httpErrors.default)(400, `Invalid JSON in the ‘operations’ multipart field (${_constants.SPEC_URL}).`));
        }
        if (!(0, _isEnumerableObject.isEnumerableObject)(operations) && !Array.isArray(operations)) return exit((0, _httpErrors.default)(400, `Invalid type for the ‘operations’ multipart field (${_constants.SPEC_URL}).`));
        operationsPath = (0, _objectPath.default)(operations);
        break;
      case 'map':
        {
          if (!operations) return exit((0, _httpErrors.default)(400, `Misordered multipart fields; ‘map’ should follow ‘operations’ (${_constants.SPEC_URL}).`));
          let parsedMap;
          try {
            parsedMap = JSON.parse(value);
          } catch (error) {
            return exit((0, _httpErrors.default)(400, `Invalid JSON in the ‘map’ multipart field (${_constants.SPEC_URL}).`));
          }
          if (!(0, _isEnumerableObject.isEnumerableObject)(parsedMap)) return exit((0, _httpErrors.default)(400, `Invalid type for the ‘map’ multipart field (${_constants.SPEC_URL}).`));
          const mapEntries = Object.entries(parsedMap);
          if (mapEntries.length > maxFiles) return exit((0, _httpErrors.default)(413, `${maxFiles} max file uploads exceeded.`));
          map = new Map();
          for (const [fieldName, paths] of mapEntries) {
            if (!Array.isArray(paths)) return exit((0, _httpErrors.default)(400, `Invalid type for the ‘map’ multipart field entry key ‘${fieldName}’ array (${_constants.SPEC_URL}).`));
            map.set(fieldName, new Upload());
            for (const [index, path] of paths.entries()) {
              if (typeof path !== 'string') return exit((0, _httpErrors.default)(400, `Invalid type for the ‘map’ multipart field entry key ‘${fieldName}’ array index ‘${index}’ value (${_constants.SPEC_URL}).`));
              try {
                operationsPath.set(path, map.get(fieldName).promise);
              } catch (error) {
                return exit((0, _httpErrors.default)(400, `Invalid object path for the ‘map’ multipart field entry key ‘${fieldName}’ array index ‘${index}’ value ‘${path}’ (${_constants.SPEC_URL}).`));
              }
            }
          }
          resolve(operations);
        }
    }
  });
  parser.on('file', (fieldName, stream, filename, encoding, mimetype) => {
    if (exitError) {
      ;
      (0, _ignoreStream.ignoreStream)(stream);
      return;
    }
    if (!map) {
      ;
      (0, _ignoreStream.ignoreStream)(stream);
      return exit((0, _httpErrors.default)(400, `Misordered multipart fields; files should follow ‘map’ (${_constants.SPEC_URL}).`));
    }
    currentStream = stream;
    stream.on('end', () => {
      currentStream = null;
    });
    const upload = map.get(fieldName);
    if (!upload) {
      ;
      (0, _ignoreStream.ignoreStream)(stream);
      return;
    }
    const capacitor = new _fsCapacitor.WriteStream();
    capacitor.on('error', () => {
      stream.unpipe();
      stream.resume();
    });
    stream.on('limit', () => {
      stream.unpipe();
      capacitor.destroy((0, _httpErrors.default)(413, `File truncated as it exceeds the ${maxFileSize} byte size limit.`));
    });
    stream.on('error', error => {
      stream.unpipe(); // istanbul ignore next

      capacitor.destroy(exitError || error);
    });
    stream.pipe(capacitor);
    const file = {
      filename,
      mimetype,
      encoding,
      createReadStream() {
        const error = capacitor.error || (released ? exitError : null);
        if (error) throw error;
        return capacitor.createReadStream();
      }
    };
    let capacitorStream;
    Object.defineProperty(file, 'stream', {
      get: _util.default.deprecate(function () {
        if (!capacitorStream) capacitorStream = this.createReadStream();
        return capacitorStream;
      }, 'File upload property ‘stream’ is deprecated. Use ‘createReadStream()’ instead.')
    });
    Object.defineProperty(file, 'capacitor', {
      value: capacitor
    });
    upload.resolve(file);
  });
  parser.once('filesLimit', () => exit((0, _httpErrors.default)(413, `${maxFiles} max file uploads exceeded.`)));
  parser.once('finish', () => {
    request.unpipe(parser);
    request.resume();
    if (!operations) return exit((0, _httpErrors.default)(400, `Missing multipart field ‘operations’ (${_constants.SPEC_URL}).`));
    if (!map) return exit((0, _httpErrors.default)(400, `Missing multipart field ‘map’ (${_constants.SPEC_URL}).`));
    for (const upload of map.values()) if (!upload.file) upload.reject((0, _httpErrors.default)(400, 'File missing in the request.'));
  });
  parser.once('error', exit);
  response.once('finish', release);
  response.once('close', release);
  request.once('close', abort);
  request.once('end', () => {
    request.removeListener('close', abort);
  });
  request.pipe(parser);
});
exports.processRequest = processRequest;

/***/ }),

/***/ "./src sync recursive ^\\.\\/(context|context\\/index)\\.(js|ts)$":
/*!**********************************************************!*\
  !*** ./src sync ^\.\/(context|context\/index)\.(js|ts)$ ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "./src sync recursive ^\\.\\/(context|context\\/index)\\.(js|ts)$";

/***/ }),

/***/ "./src sync recursive ^\\.\\/(resolvers|resolvers\\/index)\\.(js|ts)$":
/*!**************************************************************!*\
  !*** ./src sync ^\.\/(resolvers|resolvers\/index)\.(js|ts)$ ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./resolvers.js": "./src/resolvers.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src sync recursive ^\\.\\/(resolvers|resolvers\\/index)\\.(js|ts)$";

/***/ }),

/***/ "./src sync recursive ^\\.\\/(schema|schema\\/index)\\.(gql|graphql|js|ts)$":
/*!********************************************************************!*\
  !*** ./src sync ^\.\/(schema|schema\/index)\.(gql|graphql|js|ts)$ ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./schema.graphql": "./src/schema.graphql"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src sync recursive ^\\.\\/(schema|schema\\/index)\\.(gql|graphql|js|ts)$";

/***/ }),

/***/ "./src/db.js":
/*!*******************!*\
  !*** ./src/db.js ***!
  \*******************/
/*! exports provided: slides */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slides", function() { return slides; });
// заглушка базы данных

const slides = [{
  title: "title1",
  imageUrl: "imageUrl1",
  description: "description1",
  slideId: "slideId1"
}, {
  title: "title2",
  imageUrl: "imageUrl2",
  description: "description2",
  slideId: "slideId1"
}, {
  title: "title3",
  imageUrl: "imageUrl3",
  description: "description13",
  slideId: "slideId1"
}, {
  title: "title4",
  imageUrl: "imageUrl4",
  description: "description4",
  slideId: "slideId2"
}, {
  title: "title5",
  imageUrl: "imageUrl5",
  description: "description5",
  slideId: "slideId2"
}];

/***/ }),

/***/ "./src/resolvers.js":
/*!**************************!*\
  !*** ./src/resolvers.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./db */ "./src/db.js");

const resolvers = {
  Query: {
    slidesById: (parent, {
      slideId
    }, context, info) => _db__WEBPACK_IMPORTED_MODULE_0__["slides"].filter(p => p.slideId == slideId),
    slides: () => _db__WEBPACK_IMPORTED_MODULE_0__["slides"]
  }
};
/* harmony default export */ __webpack_exports__["default"] = (resolvers);

/***/ }),

/***/ "./src/schema.graphql":
/*!****************************!*\
  !*** ./src/schema.graphql ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Slide"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"title"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"description"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"imageUrl"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"slideId"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Query"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"slides"},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Slide"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"slidesById"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"slideId"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Slide"}}},"directives":[]}]}],"loc":{"start":0,"end":166}};
    doc.loc.source = {"body":"type Slide {\n  title: String!\n  description: String\n  imageUrl: String!\n  slideId: String\n}\n\ntype Query {\n  slides: [Slide]\n  slidesById(slideId: String): [Slide]\n}\n\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  

      module.exports = doc;
    


/***/ }),

/***/ 0:
/*!***********************!*\
  !*** multi graphpack ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! graphpack */"./node_modules/graphpack/lib/server.js");


/***/ }),

/***/ "@apollographql/apollo-tools":
/*!**********************************************!*\
  !*** external "@apollographql/apollo-tools" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@apollographql/apollo-tools");

/***/ }),

/***/ "@apollographql/graphql-playground-html":
/*!*********************************************************!*\
  !*** external "@apollographql/graphql-playground-html" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@apollographql/graphql-playground-html");

/***/ }),

/***/ "@josephg/resolvable":
/*!**************************************!*\
  !*** external "@josephg/resolvable" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@josephg/resolvable");

/***/ }),

/***/ "@wry/equality":
/*!********************************!*\
  !*** external "@wry/equality" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@wry/equality");

/***/ }),

/***/ "accepts":
/*!**************************!*\
  !*** external "accepts" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("accepts");

/***/ }),

/***/ "apollo-engine-reporting":
/*!******************************************!*\
  !*** external "apollo-engine-reporting" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-engine-reporting");

/***/ }),

/***/ "apollo-reporting-protobuf":
/*!********************************************!*\
  !*** external "apollo-reporting-protobuf" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-reporting-protobuf");

/***/ }),

/***/ "apollo-server-caching":
/*!****************************************!*\
  !*** external "apollo-server-caching" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-server-caching");

/***/ }),

/***/ "apollo-server-env":
/*!************************************!*\
  !*** external "apollo-server-env" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-server-env");

/***/ }),

/***/ "async-retry":
/*!******************************!*\
  !*** external "async-retry" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("async-retry");

/***/ }),

/***/ "babel-loader":
/*!*******************************!*\
  !*** external "babel-loader" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-loader");

/***/ }),

/***/ "babel-preset-graphpack":
/*!*****************************************!*\
  !*** external "babel-preset-graphpack" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-preset-graphpack");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "busboy":
/*!*************************!*\
  !*** external "busboy" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("busboy");

/***/ }),

/***/ "core-js-pure/features/array/flat":
/*!***************************************************!*\
  !*** external "core-js-pure/features/array/flat" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js-pure/features/array/flat");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "cosmiconfig":
/*!******************************!*\
  !*** external "cosmiconfig" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cosmiconfig");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),

/***/ "deprecated-decorator":
/*!***************************************!*\
  !*** external "deprecated-decorator" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("deprecated-decorator");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "fast-json-stable-stringify":
/*!*********************************************!*\
  !*** external "fast-json-stable-stringify" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fast-json-stable-stringify");

/***/ }),

/***/ "friendly-errors-webpack-plugin":
/*!*************************************************!*\
  !*** external "friendly-errors-webpack-plugin" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("friendly-errors-webpack-plugin");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "fs-capacitor":
/*!*******************************!*\
  !*** external "fs-capacitor" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs-capacitor");

/***/ }),

/***/ "graphql":
/*!**************************!*\
  !*** external "graphql" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),

/***/ "graphql-tag":
/*!******************************!*\
  !*** external "graphql-tag" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql-tag");

/***/ }),

/***/ "graphql/error":
/*!********************************!*\
  !*** external "graphql/error" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql/error");

/***/ }),

/***/ "graphql/execution":
/*!************************************!*\
  !*** external "graphql/execution" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql/execution");

/***/ }),

/***/ "graphql/execution/values":
/*!*******************************************!*\
  !*** external "graphql/execution/values" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql/execution/values");

/***/ }),

/***/ "graphql/language":
/*!***********************************!*\
  !*** external "graphql/language" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql/language");

/***/ }),

/***/ "graphql/language/printer":
/*!*******************************************!*\
  !*** external "graphql/language/printer" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql/language/printer");

/***/ }),

/***/ "graphql/language/visitor":
/*!*******************************************!*\
  !*** external "graphql/language/visitor" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql/language/visitor");

/***/ }),

/***/ "graphql/type":
/*!*******************************!*\
  !*** external "graphql/type" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql/type");

/***/ }),

/***/ "graphql/utilities":
/*!************************************!*\
  !*** external "graphql/utilities" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql/utilities");

/***/ }),

/***/ "graphql/validation":
/*!*************************************!*\
  !*** external "graphql/validation" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql/validation");

/***/ }),

/***/ "graphql/validation/rules/PossibleTypeExtensions":
/*!******************************************************************!*\
  !*** external "graphql/validation/rules/PossibleTypeExtensions" ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql/validation/rules/PossibleTypeExtensions");

/***/ }),

/***/ "graphql/validation/specifiedRules":
/*!****************************************************!*\
  !*** external "graphql/validation/specifiedRules" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql/validation/specifiedRules");

/***/ }),

/***/ "graphql/validation/validate":
/*!**********************************************!*\
  !*** external "graphql/validation/validate" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql/validation/validate");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "http-errors":
/*!******************************!*\
  !*** external "http-errors" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http-errors");

/***/ }),

/***/ "iterall":
/*!**************************!*\
  !*** external "iterall" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("iterall");

/***/ }),

/***/ "lodash.sortby":
/*!********************************!*\
  !*** external "lodash.sortby" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash.sortby");

/***/ }),

/***/ "loglevel":
/*!***************************!*\
  !*** external "loglevel" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("loglevel");

/***/ }),

/***/ "lru-cache":
/*!****************************!*\
  !*** external "lru-cache" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lru-cache");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ }),

/***/ "object-path":
/*!******************************!*\
  !*** external "object-path" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("object-path");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "sha.js":
/*!*************************!*\
  !*** external "sha.js" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sha.js");

/***/ }),

/***/ "subscriptions-transport-ws":
/*!*********************************************!*\
  !*** external "subscriptions-transport-ws" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("subscriptions-transport-ws");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tls");

/***/ }),

/***/ "ts-invariant":
/*!*******************************!*\
  !*** external "ts-invariant" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ts-invariant");

/***/ }),

/***/ "tslib":
/*!************************!*\
  !*** external "tslib" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ }),

/***/ "type-is":
/*!**************************!*\
  !*** external "type-is" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("type-is");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),

/***/ "webpack-node-externals":
/*!*****************************************!*\
  !*** external "webpack-node-externals" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("webpack-node-externals");

/***/ }),

/***/ "zen-observable-ts":
/*!************************************!*\
  !*** external "zen-observable-ts" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("zen-observable-ts");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("zlib");

/***/ })

/******/ });
//# sourceMappingURL=index.map
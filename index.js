var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) =>
  key in obj
    ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value,
      })
    : (obj[key] = value);
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source2, exclude) => {
  var target = {};
  for (var prop in source2)
    if (__hasOwnProp.call(source2, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source2[prop];
  if (source2 != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source2)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source2, prop))
        target[prop] = source2[prop];
    }
  return target;
};
var __commonJS = (cb, mod) =>
  function __require() {
    return (
      mod ||
        (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod),
      mod.exports
    );
  };
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === "object") || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    isNodeMode || !mod || !mod.__esModule
      ? __defProp(target, "default", { value: mod, enumerable: true })
      : target,
    mod
  )
);

// ../node_modules/react-fast-compare/index.js
var require_react_fast_compare = __commonJS({
  "../node_modules/react-fast-compare/index.js"(exports, module) {
    var hasElementType = typeof Element !== "undefined";
    var hasMap = typeof Map === "function";
    var hasSet = typeof Set === "function";
    var hasArrayBuffer =
      typeof ArrayBuffer === "function" && !!ArrayBuffer.isView;
    function equal(a, b) {
      if (a === b) return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor) return false;
        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length) return false;
          for (i = length; i-- !== 0; ) if (!equal(a[i], b[i])) return false;
          return true;
        }
        var it;
        if (hasMap && a instanceof Map && b instanceof Map) {
          if (a.size !== b.size) return false;
          it = a.entries();
          while (!(i = it.next()).done) if (!b.has(i.value[0])) return false;
          it = a.entries();
          while (!(i = it.next()).done)
            if (!equal(i.value[1], b.get(i.value[0]))) return false;
          return true;
        }
        if (hasSet && a instanceof Set && b instanceof Set) {
          if (a.size !== b.size) return false;
          it = a.entries();
          while (!(i = it.next()).done) if (!b.has(i.value[0])) return false;
          return true;
        }
        if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
          length = a.length;
          if (length != b.length) return false;
          for (i = length; i-- !== 0; ) if (a[i] !== b[i]) return false;
          return true;
        }
        if (a.constructor === RegExp)
          return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf)
          return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString)
          return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) return false;
        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
        if (hasElementType && a instanceof Element) return false;
        for (i = length; i-- !== 0; ) {
          if (
            (keys[i] === "_owner" || keys[i] === "__v" || keys[i] === "__o") &&
            a.$$typeof
          ) {
            continue;
          }
          if (!equal(a[keys[i]], b[keys[i]])) return false;
        }
        return true;
      }
      return a !== a && b !== b;
    }
    module.exports = function isEqual2(a, b) {
      try {
        return equal(a, b);
      } catch (error) {
        if ((error.message || "").match(/stack|recursion/i)) {
          console.warn("react-fast-compare cannot handle circular refs");
          return false;
        }
        throw error;
      }
    };
  },
});

// ../node_modules/prop-types/lib/ReactPropTypesSecret.js
var require_ReactPropTypesSecret = __commonJS({
  "../node_modules/prop-types/lib/ReactPropTypesSecret.js"(exports, module) {
    "use strict";
    var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    module.exports = ReactPropTypesSecret;
  },
});

// ../node_modules/prop-types/factoryWithThrowingShims.js
var require_factoryWithThrowingShims = __commonJS({
  "../node_modules/prop-types/factoryWithThrowingShims.js"(exports, module) {
    "use strict";
    var ReactPropTypesSecret = require_ReactPropTypesSecret();
    function emptyFunction() {}
    function emptyFunctionWithReset() {}
    emptyFunctionWithReset.resetWarningCache = emptyFunction;
    module.exports = function () {
      function shim(
        props,
        propName,
        componentName,
        location,
        propFullName,
        secret
      ) {
        if (secret === ReactPropTypesSecret) {
          return;
        }
        var err = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        err.name = "Invariant Violation";
        throw err;
      }
      shim.isRequired = shim;
      function getShim() {
        return shim;
      }
      var ReactPropTypes = {
        array: shim,
        bigint: shim,
        bool: shim,
        func: shim,
        number: shim,
        object: shim,
        string: shim,
        symbol: shim,
        any: shim,
        arrayOf: getShim,
        element: shim,
        elementType: shim,
        instanceOf: getShim,
        node: shim,
        objectOf: getShim,
        oneOf: getShim,
        oneOfType: getShim,
        shape: getShim,
        exact: getShim,
        checkPropTypes: emptyFunctionWithReset,
        resetWarningCache: emptyFunction,
      };
      ReactPropTypes.PropTypes = ReactPropTypes;
      return ReactPropTypes;
    };
  },
});

// ../node_modules/prop-types/index.js
var require_prop_types = __commonJS({
  "../node_modules/prop-types/index.js"(exports, module) {
    if (false) {
      ReactIs = null;
      throwOnDirectAccess = true;
      module.exports = null(ReactIs.isElement, throwOnDirectAccess);
    } else {
      module.exports = require_factoryWithThrowingShims()();
    }
    var ReactIs;
    var throwOnDirectAccess;
  },
});

// ../node_modules/react-is/cjs/react-is.production.min.js
var require_react_is_production_min = __commonJS({
  "../node_modules/react-is/cjs/react-is.production.min.js"(exports) {
    "use strict";
    var b = 60103;
    var c = 60106;
    var d = 60107;
    var e2 = 60108;
    var f = 60114;
    var g = 60109;
    var h = 60110;
    var k = 60112;
    var l = 60113;
    var m = 60120;
    var n2 = 60115;
    var p = 60116;
    var q = 60121;
    var r2 = 60122;
    var u = 60117;
    var v = 60129;
    var w = 60131;
    if ("function" === typeof Symbol && Symbol.for) {
      x = Symbol.for;
      b = x("react.element");
      c = x("react.portal");
      d = x("react.fragment");
      e2 = x("react.strict_mode");
      f = x("react.profiler");
      g = x("react.provider");
      h = x("react.context");
      k = x("react.forward_ref");
      l = x("react.suspense");
      m = x("react.suspense_list");
      n2 = x("react.memo");
      p = x("react.lazy");
      q = x("react.block");
      r2 = x("react.server.block");
      u = x("react.fundamental");
      v = x("react.debug_trace_mode");
      w = x("react.legacy_hidden");
    }
    var x;
    function y(a) {
      if ("object" === typeof a && null !== a) {
        var t2 = a.$$typeof;
        switch (t2) {
          case b:
            switch (((a = a.type), a)) {
              case d:
              case f:
              case e2:
              case l:
              case m:
                return a;
              default:
                switch (((a = a && a.$$typeof), a)) {
                  case h:
                  case k:
                  case p:
                  case n2:
                  case g:
                    return a;
                  default:
                    return t2;
                }
            }
          case c:
            return t2;
        }
      }
    }
    var z = g;
    var A = b;
    var B = k;
    var C = d;
    var D = p;
    var E = n2;
    var F = c;
    var G = f;
    var H = e2;
    var I = l;
    exports.ContextConsumer = h;
    exports.ContextProvider = z;
    exports.Element = A;
    exports.ForwardRef = B;
    exports.Fragment = C;
    exports.Lazy = D;
    exports.Memo = E;
    exports.Portal = F;
    exports.Profiler = G;
    exports.StrictMode = H;
    exports.Suspense = I;
    exports.isAsyncMode = function () {
      return false;
    };
    exports.isConcurrentMode = function () {
      return false;
    };
    exports.isContextConsumer = function (a) {
      return y(a) === h;
    };
    exports.isContextProvider = function (a) {
      return y(a) === g;
    };
    exports.isElement = function (a) {
      return "object" === typeof a && null !== a && a.$$typeof === b;
    };
    exports.isForwardRef = function (a) {
      return y(a) === k;
    };
    exports.isFragment = function (a) {
      return y(a) === d;
    };
    exports.isLazy = function (a) {
      return y(a) === p;
    };
    exports.isMemo = function (a) {
      return y(a) === n2;
    };
    exports.isPortal = function (a) {
      return y(a) === c;
    };
    exports.isProfiler = function (a) {
      return y(a) === f;
    };
    exports.isStrictMode = function (a) {
      return y(a) === e2;
    };
    exports.isSuspense = function (a) {
      return y(a) === l;
    };
    exports.isValidElementType = function (a) {
      return "string" === typeof a ||
        "function" === typeof a ||
        a === d ||
        a === f ||
        a === v ||
        a === e2 ||
        a === l ||
        a === m ||
        a === w ||
        ("object" === typeof a &&
          null !== a &&
          (a.$$typeof === p ||
            a.$$typeof === n2 ||
            a.$$typeof === g ||
            a.$$typeof === h ||
            a.$$typeof === k ||
            a.$$typeof === u ||
            a.$$typeof === q ||
            a[0] === r2))
        ? true
        : false;
    };
    exports.typeOf = y;
  },
});

// ../node_modules/react-is/index.js
var require_react_is = __commonJS({
  "../node_modules/react-is/index.js"(exports, module) {
    "use strict";
    if (true) {
      module.exports = require_react_is_production_min();
    } else {
      module.exports = null;
    }
  },
});

// ../node_modules/tslib/tslib.js
var require_tslib = __commonJS({
  "../node_modules/tslib/tslib.js"(exports, module) {
    var __extends2;
    var __assign2;
    var __rest2;
    var __decorate2;
    var __param2;
    var __metadata2;
    var __awaiter2;
    var __generator2;
    var __exportStar2;
    var __values2;
    var __read2;
    var __spread2;
    var __spreadArrays2;
    var __spreadArray2;
    var __await2;
    var __asyncGenerator2;
    var __asyncDelegator2;
    var __asyncValues2;
    var __makeTemplateObject2;
    var __importStar2;
    var __importDefault2;
    var __classPrivateFieldGet2;
    var __classPrivateFieldSet2;
    var __classPrivateFieldIn2;
    var __createBinding2;
    (function (factory) {
      var root =
        typeof global === "object"
          ? global
          : typeof self === "object"
          ? self
          : typeof this === "object"
          ? this
          : {};
      if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function (exports2) {
          factory(createExporter(root, createExporter(exports2)));
        });
      } else if (
        typeof module === "object" &&
        typeof module.exports === "object"
      ) {
        factory(createExporter(root, createExporter(module.exports)));
      } else {
        factory(createExporter(root));
      }
      function createExporter(exports2, previous) {
        if (exports2 !== root) {
          if (typeof Object.create === "function") {
            Object.defineProperty(exports2, "__esModule", { value: true });
          } else {
            exports2.__esModule = true;
          }
        }
        return function (id, v) {
          return (exports2[id] = previous ? previous(id, v) : v);
        };
      }
    })(function (exporter) {
      var extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
      __extends2 = function (d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError(
            "Class extends value " + String(b) + " is not a constructor or null"
          );
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype =
          b === null
            ? Object.create(b)
            : ((__.prototype = b.prototype), new __());
      };
      __assign2 =
        Object.assign ||
        function (t2) {
          for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p)) t2[p] = s[p];
          }
          return t2;
        };
      __rest2 = function (s, e2) {
        var t2 = {};
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0)
            t2[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (
            var i = 0, p = Object.getOwnPropertySymbols(s);
            i < p.length;
            i++
          ) {
            if (
              e2.indexOf(p[i]) < 0 &&
              Object.prototype.propertyIsEnumerable.call(s, p[i])
            )
              t2[p[i]] = s[p[i]];
          }
        return t2;
      };
      __decorate2 = function (decorators, target, key, desc) {
        var c = arguments.length,
          r2 =
            c < 3
              ? target
              : desc === null
              ? (desc = Object.getOwnPropertyDescriptor(target, key))
              : desc,
          d;
        if (
          typeof Reflect === "object" &&
          typeof Reflect.decorate === "function"
        )
          r2 = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if ((d = decorators[i]))
              r2 =
                (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) ||
                r2;
        return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
      };
      __param2 = function (paramIndex, decorator) {
        return function (target, key) {
          decorator(target, key, paramIndex);
        };
      };
      __metadata2 = function (metadataKey, metadataValue) {
        if (
          typeof Reflect === "object" &&
          typeof Reflect.metadata === "function"
        )
          return Reflect.metadata(metadataKey, metadataValue);
      };
      __awaiter2 = function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P
            ? value
            : new P(function (resolve) {
                resolve(value);
              });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e2) {
              reject(e2);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e2) {
              reject(e2);
            }
          }
          function step(result) {
            result.done
              ? resolve(result.value)
              : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      __generator2 = function (thisArg, body) {
        var _ = {
            label: 0,
            sent: function () {
              if (t2[0] & 1) throw t2[1];
              return t2[1];
            },
            trys: [],
            ops: [],
          },
          f,
          y,
          t2,
          g;
        return (
          (g = { next: verb(0), throw: verb(1), return: verb(2) }),
          typeof Symbol === "function" &&
            (g[Symbol.iterator] = function () {
              return this;
            }),
          g
        );
        function verb(n2) {
          return function (v) {
            return step([n2, v]);
          };
        }
        function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (_)
            try {
              if (
                ((f = 1),
                y &&
                  (t2 =
                    op[0] & 2
                      ? y["return"]
                      : op[0]
                      ? y["throw"] || ((t2 = y["return"]) && t2.call(y), 0)
                      : y.next) &&
                  !(t2 = t2.call(y, op[1])).done)
              )
                return t2;
              if (((y = 0), t2)) op = [op[0] & 2, t2.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t2 = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
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
                  if (
                    !((t2 = _.trys),
                    (t2 = t2.length > 0 && t2[t2.length - 1])) &&
                    (op[0] === 6 || op[0] === 2)
                  ) {
                    _ = 0;
                    continue;
                  }
                  if (
                    op[0] === 3 &&
                    (!t2 || (op[1] > t2[0] && op[1] < t2[3]))
                  ) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t2[1]) {
                    _.label = t2[1];
                    t2 = op;
                    break;
                  }
                  if (t2 && _.label < t2[2]) {
                    _.label = t2[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t2[2]) _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e2) {
              op = [6, e2];
              y = 0;
            } finally {
              f = t2 = 0;
            }
          if (op[0] & 5) throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      __exportStar2 = function (m, o) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
            __createBinding2(o, m, p);
      };
      __createBinding2 = Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            var desc = Object.getOwnPropertyDescriptor(m, k);
            if (
              !desc ||
              ("get" in desc
                ? !m.__esModule
                : desc.writable || desc.configurable)
            ) {
              desc = {
                enumerable: true,
                get: function () {
                  return m[k];
                },
              };
            }
            Object.defineProperty(o, k2, desc);
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          };
      __values2 = function (o) {
        var s = typeof Symbol === "function" && Symbol.iterator,
          m = s && o[s],
          i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number")
          return {
            next: function () {
              if (o && i >= o.length) o = void 0;
              return { value: o && o[i++], done: !o };
            },
          };
        throw new TypeError(
          s ? "Object is not iterable." : "Symbol.iterator is not defined."
        );
      };
      __read2 = function (o, n2) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o),
          r2,
          ar = [],
          e2;
        try {
          while ((n2 === void 0 || n2-- > 0) && !(r2 = i.next()).done)
            ar.push(r2.value);
        } catch (error) {
          e2 = { error };
        } finally {
          try {
            if (r2 && !r2.done && (m = i["return"])) m.call(i);
          } finally {
            if (e2) throw e2.error;
          }
        }
        return ar;
      };
      __spread2 = function () {
        for (var ar = [], i = 0; i < arguments.length; i++)
          ar = ar.concat(__read2(arguments[i]));
        return ar;
      };
      __spreadArrays2 = function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
          s += arguments[i].length;
        for (var r2 = Array(s), k = 0, i = 0; i < il; i++)
          for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r2[k] = a[j];
        return r2;
      };
      __spreadArray2 = function (to, from, pack) {
        if (pack || arguments.length === 2)
          for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
              if (!ar) ar = Array.prototype.slice.call(from, 0, i);
              ar[i] = from[i];
            }
          }
        return to.concat(ar || Array.prototype.slice.call(from));
      };
      __await2 = function (v) {
        return this instanceof __await2
          ? ((this.v = v), this)
          : new __await2(v);
      };
      __asyncGenerator2 = function (thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []),
          i,
          q = [];
        return (
          (i = {}),
          verb("next"),
          verb("throw"),
          verb("return"),
          (i[Symbol.asyncIterator] = function () {
            return this;
          }),
          i
        );
        function verb(n2) {
          if (g[n2])
            i[n2] = function (v) {
              return new Promise(function (a, b) {
                q.push([n2, v, a, b]) > 1 || resume(n2, v);
              });
            };
        }
        function resume(n2, v) {
          try {
            step(g[n2](v));
          } catch (e2) {
            settle(q[0][3], e2);
          }
        }
        function step(r2) {
          r2.value instanceof __await2
            ? Promise.resolve(r2.value.v).then(fulfill, reject)
            : settle(q[0][2], r2);
        }
        function fulfill(value) {
          resume("next", value);
        }
        function reject(value) {
          resume("throw", value);
        }
        function settle(f, v) {
          if ((f(v), q.shift(), q.length)) resume(q[0][0], q[0][1]);
        }
      };
      __asyncDelegator2 = function (o) {
        var i, p;
        return (
          (i = {}),
          verb("next"),
          verb("throw", function (e2) {
            throw e2;
          }),
          verb("return"),
          (i[Symbol.iterator] = function () {
            return this;
          }),
          i
        );
        function verb(n2, f) {
          i[n2] = o[n2]
            ? function (v) {
                return (p = !p)
                  ? { value: __await2(o[n2](v)), done: n2 === "return" }
                  : f
                  ? f(v)
                  : v;
              }
            : f;
        }
      };
      __asyncValues2 = function (o) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator],
          i;
        return m
          ? m.call(o)
          : ((o =
              typeof __values2 === "function"
                ? __values2(o)
                : o[Symbol.iterator]()),
            (i = {}),
            verb("next"),
            verb("throw"),
            verb("return"),
            (i[Symbol.asyncIterator] = function () {
              return this;
            }),
            i);
        function verb(n2) {
          i[n2] =
            o[n2] &&
            function (v) {
              return new Promise(function (resolve, reject) {
                (v = o[n2](v)), settle(resolve, reject, v.done, v.value);
              });
            };
        }
        function settle(resolve, reject, d, v) {
          Promise.resolve(v).then(function (v2) {
            resolve({ value: v2, done: d });
          }, reject);
        }
      };
      __makeTemplateObject2 = function (cooked, raw) {
        if (Object.defineProperty) {
          Object.defineProperty(cooked, "raw", { value: raw });
        } else {
          cooked.raw = raw;
        }
        return cooked;
      };
      var __setModuleDefault = Object.create
        ? function (o, v) {
            Object.defineProperty(o, "default", { enumerable: true, value: v });
          }
        : function (o, v) {
            o["default"] = v;
          };
      __importStar2 = function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding2(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      __importDefault2 = function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
      };
      __classPrivateFieldGet2 = function (receiver, state, kind, f) {
        if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a getter");
        if (
          typeof state === "function"
            ? receiver !== state || !f
            : !state.has(receiver)
        )
          throw new TypeError(
            "Cannot read private member from an object whose class did not declare it"
          );
        return kind === "m"
          ? f
          : kind === "a"
          ? f.call(receiver)
          : f
          ? f.value
          : state.get(receiver);
      };
      __classPrivateFieldSet2 = function (receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a setter");
        if (
          typeof state === "function"
            ? receiver !== state || !f
            : !state.has(receiver)
        )
          throw new TypeError(
            "Cannot write private member to an object whose class did not declare it"
          );
        return (
          kind === "a"
            ? f.call(receiver, value)
            : f
            ? (f.value = value)
            : state.set(receiver, value),
          value
        );
      };
      __classPrivateFieldIn2 = function (state, receiver) {
        if (
          receiver === null ||
          (typeof receiver !== "object" && typeof receiver !== "function")
        )
          throw new TypeError("Cannot use 'in' operator on non-object");
        return typeof state === "function"
          ? receiver === state
          : state.has(receiver);
      };
      exporter("__extends", __extends2);
      exporter("__assign", __assign2);
      exporter("__rest", __rest2);
      exporter("__decorate", __decorate2);
      exporter("__param", __param2);
      exporter("__metadata", __metadata2);
      exporter("__awaiter", __awaiter2);
      exporter("__generator", __generator2);
      exporter("__exportStar", __exportStar2);
      exporter("__createBinding", __createBinding2);
      exporter("__values", __values2);
      exporter("__read", __read2);
      exporter("__spread", __spread2);
      exporter("__spreadArrays", __spreadArrays2);
      exporter("__spreadArray", __spreadArray2);
      exporter("__await", __await2);
      exporter("__asyncGenerator", __asyncGenerator2);
      exporter("__asyncDelegator", __asyncDelegator2);
      exporter("__asyncValues", __asyncValues2);
      exporter("__makeTemplateObject", __makeTemplateObject2);
      exporter("__importStar", __importStar2);
      exporter("__importDefault", __importDefault2);
      exporter("__classPrivateFieldGet", __classPrivateFieldGet2);
      exporter("__classPrivateFieldSet", __classPrivateFieldSet2);
      exporter("__classPrivateFieldIn", __classPrivateFieldIn2);
    });
  },
});

// rui/AccordionItem.tsx
import * as React2 from "react";

// rui/tokens.ts
import { css } from "@emotion/react";

// themes/util.ts

// ../shared/mapObject.ts
function mapObject(obj, fn2) {
  const obj2 = {};
  for (const k1 in obj) {
    const result = fn2(k1, obj[k1]);
    if (Array.isArray(result)) {
      obj2[result[0]] = result[1];
    } else {
      for (const [k2, v2] of result) {
        obj2[k2] = v2;
      }
    }
  }
  return obj2;
}

// ../shared/themes/tokens.ts
var baseTokens = {
  borderRadius1: ["--border-radius-1", "1px"],
  borderRadius2: ["--border-radius-2", "2px"],
  borderRadius4: ["--border-radius-4", "4px"],
  borderRadius8: ["--border-radius-8", "8px"],
  borderRadius16: ["--border-radius-16", "16px"],
  borderRadiusDefault: ["--border-radius-default", "var(--border-radius-8)"],
  borderRadiusRound: ["--border-radius-round", "1028px"],
  space2: ["--space-2", "2px"],
  space4: ["--space-4", "4px"],
  space8: ["--space-8", "8px"],
  space12: ["--space-12", "12px"],
  space16: ["--space-16", "16px"],
  space24: ["--space-24", "24px"],
  space32: ["--space-32", "32px"],
  space48: ["--space-48", "48px"],
  space64: ["--space-64", "64px"],
  space128: ["--space-128", "128px"],
  space256: ["--space-256", "256px"],
  spaceDefault: ["--space-default", "var(--space-8)"],
  shadow1: ["--shadow-1", "0px 4px 8px 0px rgba(2, 2, 3, 0.16)"],
  shadow2: ["--shadow-2", "0px 8px 16px 0px rgba(2, 2, 3, 0.32)"],
  shadow3: ["--shadow-3", "0px 16px 32px 0px rgba(2, 2, 3, 0.48)"],
  shadowDefault: ["--shadow-default", "var(--shadow-1)"],
  fontFamilyDefault: ["--font-family-default", "'IBM Plex Sans', sans-serif"],
  fontFamilyCode: ["--font-family-code", "'ReplitHack',  monospace"],
  fontSizeSmall: ["--font-size-small", "12px"],
  lineHeightSmall: ["--line-height-small", "1.5"],
  fontSizeDefault: ["--font-size-default", "14px"],
  lineHeightDefault: ["--line-height-default", "1.6"],
  fontSizeSubheadDefault: ["--font-size-subhead-default", "16px"],
  lineHeightSubheadDefault: ["--line-height-subhead-default", "1.375"],
  fontSizeSubheadBig: ["--font-size-subhead-big", "20px"],
  lineHeightSubheadBig: ["--line-height-subhead-big", "1.2"],
  fontSizeHeaderDefault: ["--font-size-header-default", "24px"],
  lineHeightHeaderDefault: ["--line-height-header-default", "1"],
  fontSizeHeaderBig: ["--font-size-header-big", "32px"],
  lineHeightHeaderBig: ["--line-height-header-big", "1"],
  fontWeightRegular: ["--font-weight-regular", "400"],
  fontWeightMedium: ["--font-weight-medium", "500"],
  fontWeightBold: ["--font-weight-bold", "600"],
  transitionDurationSnappy: ["--transition-duration-snappy", "120ms"],
  transitionTimingFunctionSnappy: [
    "--transition-timing-function-snappy",
    "ease-out",
  ],
  transitionDurationChill: ["--transition-duration-chill", "300ms"],
  transitionTimingFunctionChill: [
    "--transition-timing-function-chill",
    "ease-in-out",
  ],
  borderWidthDefault: ["--border-width-default", "1px"],
  singleLine: ["--single-line", "1"],
};
var themeValueToCssPropertyMap = {
  backgroundRoot: "--background-root",
  backgroundDefault: "--background-default",
  backgroundHigher: "--background-higher",
  backgroundHighest: "--background-highest",
  backgroundOverlay: "--background-overlay",
  foregroundDefault: "--foreground-default",
  foregroundDimmer: "--foreground-dimmer",
  foregroundDimmest: "--foreground-dimmest",
  outlineDimmest: "--outline-dimmest",
  outlineDimmer: "--outline-dimmer",
  outlineDefault: "--outline-default",
  outlineStronger: "--outline-stronger",
  outlineStrongest: "--outline-strongest",
  accentPrimaryDimmest: "--accent-primary-dimmest",
  accentPrimaryDimmer: "--accent-primary-dimmer",
  accentPrimaryDefault: "--accent-primary-default",
  accentPrimaryStronger: "--accent-primary-stronger",
  accentPrimaryStrongest: "--accent-primary-strongest",
  accentPositiveDimmest: "--accent-positive-dimmest",
  accentPositiveDimmer: "--accent-positive-dimmer",
  accentPositiveDefault: "--accent-positive-default",
  accentPositiveStronger: "--accent-positive-stronger",
  accentPositiveStrongest: "--accent-positive-strongest",
  accentNegativeDimmest: "--accent-negative-dimmest",
  accentNegativeDimmer: "--accent-negative-dimmer",
  accentNegativeDefault: "--accent-negative-default",
  accentNegativeStronger: "--accent-negative-stronger",
  accentNegativeStrongest: "--accent-negative-strongest",
  redDimmest: "--accent-red-dimmest",
  redDimmer: "--accent-red-dimmer",
  redDefault: "--accent-red-default",
  redStronger: "--accent-red-stronger",
  redStrongest: "--accent-red-strongest",
  orangeDimmest: "--accent-orange-dimmest",
  orangeDimmer: "--accent-orange-dimmer",
  orangeDefault: "--accent-orange-default",
  orangeStronger: "--accent-orange-stronger",
  orangeStrongest: "--accent-orange-strongest",
  yellowDimmest: "--accent-yellow-dimmest",
  yellowDimmer: "--accent-yellow-dimmer",
  yellowDefault: "--accent-yellow-default",
  yellowStronger: "--accent-yellow-stronger",
  yellowStrongest: "--accent-yellow-strongest",
  limeDimmest: "--accent-lime-dimmest",
  limeDimmer: "--accent-lime-dimmer",
  limeDefault: "--accent-lime-default",
  limeStronger: "--accent-lime-stronger",
  limeStrongest: "--accent-lime-strongest",
  greenDimmest: "--accent-green-dimmest",
  greenDimmer: "--accent-green-dimmer",
  greenDefault: "--accent-green-default",
  greenStronger: "--accent-green-stronger",
  greenStrongest: "--accent-green-strongest",
  tealDimmest: "--accent-teal-dimmest",
  tealDimmer: "--accent-teal-dimmer",
  tealDefault: "--accent-teal-default",
  tealStronger: "--accent-teal-stronger",
  tealStrongest: "--accent-teal-strongest",
  blueDimmest: "--accent-blue-dimmest",
  blueDimmer: "--accent-blue-dimmer",
  blueDefault: "--accent-blue-default",
  blueStronger: "--accent-blue-stronger",
  blueStrongest: "--accent-blue-strongest",
  blurpleDimmest: "--accent-blurple-dimmest",
  blurpleDimmer: "--accent-blurple-dimmer",
  blurpleDefault: "--accent-blurple-default",
  blurpleStronger: "--accent-blurple-stronger",
  blurpleStrongest: "--accent-blurple-strongest",
  purpleDimmest: "--accent-purple-dimmest",
  purpleDimmer: "--accent-purple-dimmer",
  purpleDefault: "--accent-purple-default",
  purpleStronger: "--accent-purple-stronger",
  purpleStrongest: "--accent-purple-strongest",
  magentaDimmest: "--accent-magenta-dimmest",
  magentaDimmer: "--accent-magenta-dimmer",
  magentaDefault: "--accent-magenta-default",
  magentaStronger: "--accent-magenta-stronger",
  magentaStrongest: "--accent-magenta-strongest",
  pinkDimmest: "--accent-pink-dimmest",
  pinkDimmer: "--accent-pink-dimmer",
  pinkDefault: "--accent-pink-default",
  pinkStronger: "--accent-pink-stronger",
  pinkStrongest: "--accent-pink-strongest",
  greyDimmest: "--accent-grey-dimmest",
  greyDimmer: "--accent-grey-dimmer",
  greyDefault: "--accent-grey-default",
  greyStronger: "--accent-grey-stronger",
  greyStrongest: "--accent-grey-strongest",
  brownDimmest: "--accent-brown-dimmest",
  brownDimmer: "--accent-brown-dimmer",
  brownDefault: "--accent-brown-default",
  brownStronger: "--accent-brown-stronger",
  brownStrongest: "--accent-brown-strongest",
  black: "--black",
  white: "--white",
};
var cssPropertyToThemeValueMap = mapObject(
  themeValueToCssPropertyMap,
  (key, value) => [`var(${value})`, key]
);
var tokens = __spreadValues(
  __spreadValues(
    {},
    mapObject(baseTokens, (key, [cssProp]) => [key, `var(${cssProp})`])
  ),
  mapObject(themeValueToCssPropertyMap, (key, cssProp) => [
    key,
    `var(${cssProp})`,
  ])
);
function isGlobalTokenName(name) {
  return name in themeValueToCssPropertyMap;
}

// ../shared/themes/replitDark.ts
var replitDark = {
  id: "replitDark",
  name: "Dark",
  colorScheme: "dark" /* Dark */,
  values: {
    global: {
      backgroundRoot: "#0E1525",
      backgroundDefault: "#1C2333",
      backgroundHigher: "#2B3245",
      backgroundHighest: "#3C445C",
      backgroundOverlay: "#0e1525A0",
      foregroundDefault: "#F5F9FC",
      foregroundDimmer: "#C2C8CC",
      foregroundDimmest: "#9DA2A6",
      outlineDimmest: "#4E5569",
      outlineDimmer: "#5F677A",
      outlineDefault: "#70788C",
      outlineStronger: "#828899",
      outlineStrongest: "#9195A1",
      accentPrimaryDimmest: "#004182",
      accentPrimaryDimmer: "#0053A6",
      accentPrimaryDefault: "#0079F2",
      accentPrimaryStronger: "#57ABFF",
      accentPrimaryStrongest: "#B2D9FF",
      accentPositiveDimmest: "#044A10",
      accentPositiveDimmer: "#046113",
      accentPositiveDefault: "#009118",
      accentPositiveStronger: "#6CD97E",
      accentPositiveStrongest: "#BFFFCA",
      accentNegativeDimmest: "#660000",
      accentNegativeDimmer: "#A60808",
      accentNegativeDefault: "#E52222",
      accentNegativeStronger: "#FF6666",
      accentNegativeStrongest: "#FFCFCF",
      redDimmest: "#660000",
      redDimmer: "#A60808",
      redDefault: "#E52222",
      redStronger: "#FF6666",
      redStrongest: "#FFCFCF",
      orangeDimmest: "#542A00",
      orangeDimmer: "#703800",
      orangeDefault: "#AD5700",
      orangeStronger: "#D4781C",
      orangeStrongest: "#FFBD7A",
      yellowDimmest: "#4D4000",
      yellowDimmer: "#635300",
      yellowDefault: "#967D00",
      yellowStronger: "#BFA730",
      yellowStrongest: "#F2E088",
      limeDimmest: "#314A00",
      limeDimmer: "#3D5C00",
      limeDefault: "#5A8700",
      limeStronger: "#87B825",
      limeStrongest: "#C4E581",
      greenDimmest: "#044A10",
      greenDimmer: "#046113",
      greenDefault: "#009118",
      greenStronger: "#6CD97E",
      greenStrongest: "#7AEB8D",
      tealDimmest: "#004452",
      tealDimmer: "#006073",
      tealDefault: "#0093B0",
      tealStronger: "#27B9D6",
      tealStrongest: "#69D9F0",
      blueDimmest: "#004182",
      blueDimmer: "#0053A6",
      blueDefault: "#0079F2",
      blueStronger: "#57ABFF",
      blueStrongest: "#B2D9FF",
      blurpleDimmest: "#39298A",
      blurpleDimmer: "#5239CC",
      blurpleDefault: "#795EFF",
      blurpleStronger: "#A694FF",
      blurpleStrongest: "#CEC4FF",
      purpleDimmest: "#582987",
      purpleDimmer: "#7633B8",
      purpleDefault: "#A64DFF",
      purpleStronger: "#C78FFF",
      purpleStrongest: "#E2C4FF",
      magentaDimmest: "#6B1A6B",
      magentaDimmer: "#8A218A",
      magentaDefault: "#C73AC7",
      magentaStronger: "#F562F5",
      magentaStrongest: "#FFBFFF",
      pinkDimmest: "#6E1B52",
      pinkDimmer: "#8F226B",
      pinkDefault: "#D4359F",
      pinkStronger: "#FF70CF",
      pinkStrongest: "#FFBAE8",
      greyDimmest: "#404040",
      greyDimmer: "#545454",
      greyDefault: "#808080",
      greyStronger: "#A6A6A6",
      greyStrongest: "#D4D4D4",
      brownDimmest: "#594031",
      brownDimmer: "#75503B",
      brownDefault: "#A3765C",
      brownStronger: "#D49877",
      brownStrongest: "#FFC8A8",
      black: "#0E1525",
      white: "#FCFCFC",
    },
    editor: {
      syntaxHighlighting: [
        { tags: [{ name: "url" }], values: { textDecoration: "underline" } },
        {
          tags: [{ name: "heading1" }],
          values: { fontWeight: tokens.fontWeightBold, fontSize: "1.2em" },
        },
        {
          tags: [{ name: "heading2" }],
          values: { fontWeight: tokens.fontWeightBold, fontSize: "1.1em" },
        },
        {
          tags: [{ name: "heading3" }],
          values: { fontWeight: tokens.fontWeightBold, fontSize: "1.05" },
        },
        { tags: [{ name: "emphasis" }], values: { fontStyle: "italic" } },
        {
          tags: [{ name: "heading" }, { name: "strong" }],
          values: { fontWeight: tokens.fontWeightBold },
        },
        {
          tags: [{ name: "strikethrough" }, { name: "deleted" }],
          values: { textDecoration: "line-through" },
        },
        {
          tags: [{ name: "monospace" }],
          values: { fontFamily: tokens.fontFamilyCode },
        },
        {
          tags: [{ name: "bracket" }],
          values: { color: tokens.foregroundDefault },
        },
        {
          tags: [{ name: "squareBracket" }],
          values: { color: tokens.foregroundDefault },
        },
        {
          tags: [{ name: "angleBracket" }],
          values: { color: tokens.foregroundDimmest },
        },
        {
          tags: [{ name: "variableName" }],
          values: { color: tokens.foregroundDefault },
        },
        {
          tags: [{ name: "variableName", modifiers: ["definition"] }],
          values: { color: tokens.foregroundDefault },
        },
        {
          tags: [{ name: "comment" }],
          values: {
            color: tokens.greenDefault,
          },
        },
        {
          tags: [{ name: "blockComment" }],
          values: {
            color: tokens.greenDefault,
          },
        },
        {
          tags: [{ name: "lineComment" }],
          values: {
            color: tokens.greenDefault,
          },
        },
        {
          tags: [{ name: "docComment" }],
          values: {
            color: tokens.greenDefault,
          },
        },
        {
          tags: [{ name: "invalid" }],
          values: { color: tokens.redStronger },
        },
        {
          tags: [
            { name: "string" },
            { name: "string", modifiers: ["special"] },
            { name: "character" },
          ],
          values: { color: tokens.orangeStrongest },
        },
        {
          tags: [{ name: "deleted" }],
          values: { color: tokens.orangeStrongest },
        },
        {
          tags: [{ name: "literal" }],
          values: { color: tokens.yellowStrongest },
        },
        {
          tags: [{ name: "inserted" }],
          values: { color: tokens.yellowStrongest },
        },
        {
          tags: [{ name: "link" }],
          values: { color: tokens.yellowStrongest },
        },
        {
          tags: [{ name: "contentSeparator" }],
          values: { color: tokens.yellowStrongest },
        },
        {
          tags: [{ name: "labelName" }],
          values: { color: tokens.yellowStrongest },
        },
        {
          tags: [{ name: "propertyName", modifiers: ["function"] }],
          values: { color: tokens.yellowStrongest },
        },
        {
          tags: [{ name: "variableName", modifiers: ["function"] }],
          values: { color: tokens.yellowStrongest },
        },
        {
          tags: [
            { name: "variableName", modifiers: ["function", "definition"] },
          ],
          values: { color: tokens.yellowStrongest },
        },
        {
          tags: [{ name: "number" }, { name: "integer" }, { name: "float" }],
          values: { color: tokens.limeStrongest },
        },
        {
          tags: [{ name: "variableName", modifiers: ["local"] }],
          values: { color: tokens.blueStrongest },
        },
        {
          tags: [{ name: "propertyName", modifiers: ["definition"] }],
          values: { color: tokens.blueStrongest },
        },
        {
          tags: [{ name: "propertyName" }],
          values: { color: tokens.blueStrongest },
        },
        {
          tags: [{ name: "attributeName" }],
          values: { color: tokens.blueStrongest },
        },
        {
          tags: [{ name: "operator" }],
          values: { color: tokens.blueStrongest },
        },
        {
          tags: [{ name: "bool" }],
          values: { color: tokens.blueStrongest },
        },
        {
          tags: [{ name: "className" }],
          values: { color: tokens.blueStronger },
        },
        {
          tags: [{ name: "macroName" }],
          values: { color: tokens.blueStronger },
        },
        {
          tags: [{ name: "variableName", modifiers: ["special"] }],
          values: { color: tokens.blueStronger },
        },
        {
          tags: [{ name: "typeName" }],
          values: { color: tokens.blueStronger },
        },
        {
          tags: [{ name: "meta" }],
          values: { color: tokens.blueStronger },
        },
        {
          tags: [{ name: "atom" }],
          values: { color: tokens.blueStronger },
        },
        {
          tags: [{ name: "keyword" }],
          values: { color: tokens.blueStronger },
        },
        {
          tags: [{ name: "variableName", modifiers: ["standard"] }],
          values: { color: tokens.purpleStronger },
        },
        {
          tags: [{ name: "namespace" }],
          values: { color: tokens.tealStrongest },
        },
        {
          tags: [{ name: "escape" }],
          values: { color: tokens.pinkStronger },
        },
        {
          tags: [{ name: "regexp" }],
          values: { color: tokens.pinkStronger },
        },
      ],
    },
  },
};

// ../shared/themes/replitLight.ts
var replitLight = {
  id: "replitLight",
  name: "Light",
  colorScheme: "light" /* Light */,
  values: {
    global: {
      backgroundRoot: "#EBECED",
      backgroundDefault: "#FCFCFC",
      backgroundHigher: "#F0F1F2",
      backgroundHighest: "#E4E5E6",
      backgroundOverlay: "#F0F1F2A0",
      foregroundDefault: "#07080A",
      foregroundDimmer: "#3D4047",
      foregroundDimmest: "#5C5F66",
      outlineDimmest: "#D2D4D6",
      outlineDimmer: "#C0C3C4",
      outlineDefault: "#AFB1B3",
      outlineStronger: "#98999C",
      outlineStrongest: "#74767A",
      accentPrimaryDimmest: "#B2D9FF",
      accentPrimaryDimmer: "#6BB5FF",
      accentPrimaryDefault: "#0F87FF",
      accentPrimaryStronger: "#005CB8",
      accentPrimaryStrongest: "#004182",
      accentPositiveDimmest: "#7AEB8D",
      accentPositiveDimmer: "#3CC954",
      accentPositiveDefault: "#00A11B",
      accentPositiveStronger: "#036E15",
      accentPositiveStrongest: "#004D0D",
      accentNegativeDimmest: "#FFC7C7",
      accentNegativeDimmer: "#FF9494",
      accentNegativeDefault: "#FA4B4B",
      accentNegativeStronger: "#C20A0A",
      accentNegativeStrongest: "#8A0000",
      redDimmest: "#FFC7C7",
      redDimmer: "#FF9494",
      redDefault: "#FA4B4B",
      redStronger: "#C20A0A",
      redStrongest: "#8A0000",
      orangeDimmest: "#FFCC99",
      orangeDimmer: "#FF9933",
      orangeDefault: "#D96D00",
      orangeStronger: "#964B00",
      orangeStrongest: "#693400",
      yellowDimmest: "#EBD66E",
      yellowDimmer: "#CFB015",
      yellowDefault: "#A68A00",
      yellowStronger: "#736000",
      yellowStrongest: "#4F4200",
      limeDimmest: "#C0E378",
      limeDimmer: "#93C926",
      limeDefault: "#639400",
      limeStronger: "#466900",
      limeStrongest: "#3A5700",
      greenDimmest: "#7AEB8D",
      greenDimmer: "#3CC954",
      greenDefault: "#00A11B",
      greenStronger: "#036E15",
      greenStrongest: "#004D0D",
      tealDimmest: "#6FE5FC",
      tealDimmer: "#22C1E0",
      tealDefault: "#0093B0",
      tealStronger: "#00687D",
      tealStrongest: "#004857",
      blueDimmest: "#B2D9FF",
      blueDimmer: "#6BB5FF",
      blueDefault: "#0F87FF",
      blueStronger: "#005CB8",
      blueStrongest: "#004182",
      blurpleDimmest: "#D7CFFF",
      blurpleDimmer: "#B2A3FF",
      blurpleDefault: "#8E78FF",
      blurpleStronger: "#5B40E3",
      blurpleStrongest: "#412F9C",
      purpleDimmest: "#E6CCFF",
      purpleDimmer: "#D0A1FF",
      purpleDefault: "#B266FF",
      purpleStronger: "#7F38C7",
      purpleStrongest: "#5B278F",
      magentaDimmest: "#FFBFFF",
      magentaDimmer: "#FF82FF",
      magentaDefault: "#EB3BEB",
      magentaStronger: "#A321A3",
      magentaStrongest: "#731C73",
      pinkDimmest: "#FFC7EC",
      pinkDimmer: "#FF87D7",
      pinkDefault: "#F545BA",
      pinkStronger: "#AB2980",
      pinkStrongest: "#781E5A",
      greyDimmest: "#D5D5D5",
      greyDimmer: "#B0B0B0",
      greyDefault: "#898989",
      greyStronger: "#616161",
      greyStrongest: "#454545",
      brownDimmest: "#FFC9AB",
      brownDimmer: "#DEA483",
      brownDefault: "#B07F63",
      brownStronger: "#805740",
      brownStrongest: "#573E30",
      black: "#0E1525",
      white: "#FCFCFC",
    },
    editor: {
      syntaxHighlighting: [
        { tags: [{ name: "url" }], values: { textDecoration: "underline" } },
        {
          tags: [{ name: "heading1" }],
          values: { fontWeight: tokens.fontWeightBold, fontSize: "1.2em" },
        },
        {
          tags: [{ name: "heading2" }],
          values: { fontWeight: tokens.fontWeightBold, fontSize: "1.1em" },
        },
        {
          tags: [{ name: "heading3" }],
          values: { fontWeight: tokens.fontWeightBold, fontSize: "1.05" },
        },
        { tags: [{ name: "emphasis" }], values: { fontStyle: "italic" } },
        {
          tags: [{ name: "heading" }, { name: "strong" }],
          values: { fontWeight: tokens.fontWeightBold },
        },
        {
          tags: [{ name: "strikethrough" }, { name: "deleted" }],
          values: { textDecoration: "line-through" },
        },
        {
          tags: [{ name: "monospace" }],
          values: { fontFamily: tokens.fontFamilyCode },
        },
        {
          tags: [{ name: "bracket" }],
          values: { color: tokens.foregroundDefault },
        },
        {
          tags: [{ name: "squareBracket" }],
          values: { color: tokens.foregroundDefault },
        },
        {
          tags: [{ name: "angleBracket" }],
          values: { color: tokens.foregroundDimmest },
        },
        {
          tags: [{ name: "variableName" }],
          values: { color: tokens.foregroundDefault },
        },
        {
          tags: [{ name: "variableName", modifiers: ["definition"] }],
          values: { color: tokens.foregroundDefault },
        },
        {
          tags: [{ name: "comment" }],
          values: {
            color: tokens.outlineStronger,
          },
        },
        {
          tags: [{ name: "blockComment" }],
          values: {
            color: tokens.outlineStronger,
          },
        },
        {
          tags: [{ name: "lineComment" }],
          values: {
            color: tokens.outlineStronger,
          },
        },
        {
          tags: [{ name: "docComment" }],
          values: {
            color: tokens.outlineStronger,
          },
        },
        {
          tags: [{ name: "invalid" }],
          values: { color: tokens.redDefault },
        },
        {
          tags: [
            { name: "string" },
            { name: "string", modifiers: ["special"] },
            { name: "character" },
          ],
          values: { color: tokens.orangeStronger },
        },
        {
          tags: [{ name: "deleted" }],
          values: { color: tokens.orangeStronger },
        },
        {
          tags: [{ name: "literal" }],
          values: { color: tokens.yellowStronger },
        },
        {
          tags: [{ name: "inserted" }],
          values: { color: tokens.yellowStronger },
        },
        {
          tags: [{ name: "link" }],
          values: { color: tokens.yellowStronger },
        },
        {
          tags: [{ name: "contentSeparator" }],
          values: { color: tokens.yellowStronger },
        },
        {
          tags: [{ name: "labelName" }],
          values: { color: tokens.yellowStronger },
        },
        {
          tags: [{ name: "propertyName", modifiers: ["function"] }],
          values: { color: tokens.yellowStronger },
        },
        {
          tags: [{ name: "variableName", modifiers: ["function"] }],
          values: { color: tokens.yellowStronger },
        },
        {
          tags: [
            { name: "variableName", modifiers: ["function", "definition"] },
          ],
          values: { color: tokens.yellowStronger },
        },
        {
          tags: [{ name: "number" }, { name: "integer" }, { name: "float" }],
          values: { color: tokens.limeStronger },
        },
        {
          tags: [{ name: "variableName", modifiers: ["local"] }],
          values: { color: tokens.blueStrongest },
        },
        {
          tags: [{ name: "propertyName", modifiers: ["definition"] }],
          values: { color: tokens.blueStrongest },
        },
        {
          tags: [{ name: "propertyName" }],
          values: { color: tokens.blueStrongest },
        },
        {
          tags: [{ name: "attributeName" }],
          values: { color: tokens.blueStrongest },
        },
        {
          tags: [{ name: "operator" }],
          values: { color: tokens.blueStrongest },
        },
        {
          tags: [{ name: "bool" }],
          values: { color: tokens.blueStrongest },
        },
        {
          tags: [{ name: "className" }],
          values: { color: tokens.blueStronger },
        },
        {
          tags: [{ name: "macroName" }],
          values: { color: tokens.blueStronger },
        },
        {
          tags: [{ name: "variableName", modifiers: ["special"] }],
          values: { color: tokens.blueStronger },
        },
        {
          tags: [{ name: "typeName" }],
          values: { color: tokens.blueStronger },
        },
        {
          tags: [{ name: "meta" }],
          values: { color: tokens.blueStronger },
        },
        {
          tags: [{ name: "atom" }],
          values: { color: tokens.blueStronger },
        },
        {
          tags: [{ name: "keyword" }],
          values: { color: tokens.blueStronger },
        },
        {
          tags: [{ name: "variableName", modifiers: ["standard"] }],
          values: { color: tokens.purpleStronger },
        },
        {
          tags: [{ name: "namespace" }],
          values: { color: tokens.tealStronger },
        },
        {
          tags: [{ name: "escape" }],
          values: { color: tokens.pinkStronger },
        },
        {
          tags: [{ name: "regexp" }],
          values: { color: tokens.pinkStronger },
        },
      ],
    },
  },
};

// ../shared/themes/replitSpooky.ts
var replitSpooky = {
  id: "replitSpooky",
  name: "Spooky",
  colorScheme: "dark" /* Dark */,
  values: {
    global: {
      backgroundRoot: "#020203",
      backgroundDefault: "#292C33",
      backgroundHigher: "#383B42",
      backgroundHighest: "#474A52",
      backgroundOverlay: "#F0F1F2A0",
      foregroundDefault: "#F5F9FC",
      foregroundDimmer: "#C2C8CC",
      foregroundDimmest: "#9DA2A6",
      outlineDimmest: "#4E5569",
      outlineDimmer: "#5F677A",
      outlineDefault: "#70788C",
      outlineStronger: "#828899",
      outlineStrongest: "#9195A1",
      accentPrimaryDimmest: "#753B00",
      accentPrimaryDimmer: "#9C4E00",
      accentPrimaryDefault: "#D96D00",
      accentPrimaryStronger: "#FFC285",
      accentPrimaryStrongest: "#FFD9B2",
      accentPositiveDimmest: "#753B00",
      accentPositiveDimmer: "#9C4E00",
      accentPositiveDefault: "#D96D00",
      accentPositiveStronger: "#FFC285",
      accentPositiveStrongest: "#FFD9B2",
      accentNegativeDimmest: "#573A3A",
      accentNegativeDimmer: "#8F2828",
      accentNegativeDefault: "#F23F3F",
      accentNegativeStronger: "#FF8585",
      accentNegativeStrongest: "#FFBFBF",
      redDimmest: "#6E0000",
      redDimmer: "#A60000",
      redDefault: "#E50000",
      redStronger: "#FF8585",
      redStrongest: "#FFC7C7",
      orangeDimmest: "#753B00",
      orangeDimmer: "#9C4E00",
      orangeDefault: "#D96D00",
      orangeStronger: "#FFC285",
      orangeStrongest: "#FFD9B2",
      yellowDimmest: "#756200",
      yellowDimmer: "#A68A00",
      yellowDefault: "#CCAD14",
      yellowStronger: "#FFEA7F",
      yellowStrongest: "#FFF2B2",
      limeDimmest: "#314A00",
      limeDimmer: "#3D5C00",
      limeDefault: "#5A8700",
      limeStronger: "#87B825",
      limeStrongest: "#C4E581",
      greenDimmest: "#00540E",
      greenDimmer: "#007814",
      greenDefault: "#36B24A",
      greenStronger: "#66FF7F",
      greenStrongest: "#B2FFBF",
      tealDimmest: "#005B6E",
      tealDimmer: "#007F99",
      tealDefault: "#3DB4CC",
      tealStronger: "#7FEAFF",
      tealStrongest: "#BFF4FF",
      blueDimmest: "#004D99",
      blueDimmer: "#005EBD",
      blueDefault: "#2E8AE5",
      blueStronger: "#7FBFFF",
      blueStrongest: "#B2D9FF",
      blurpleDimmest: "#422F9E",
      blurpleDimmer: "#563CD6",
      blurpleDefault: "#7559FF",
      blurpleStronger: "#A18FFF",
      blurpleStrongest: "#CEC4FF",
      purpleDimmest: "#6C32A6",
      purpleDimmer: "#9140E3",
      purpleDefault: "#A64DFF",
      purpleStronger: "#C78FFF",
      purpleStrongest: "#E2C4FF",
      magentaDimmest: "#802680",
      magentaDimmer: "#B031B0",
      magentaDefault: "#E55AE5",
      magentaStronger: "#FF8AFF",
      magentaStrongest: "#FFC2FF",
      pinkDimmest: "#802662",
      pinkDimmer: "#B03186",
      pinkDefault: "#E545B0",
      pinkStronger: "#FF8AD8",
      pinkStrongest: "#FFC2EB",
      greyDimmest: "#595959",
      greyDimmer: "#666666",
      greyDefault: "#808080",
      greyStronger: "#999999",
      greyStrongest: "#BFBFBF",
      brownDimmest: "#594031",
      brownDimmer: "#75503B",
      brownDefault: "#A3765C",
      brownStronger: "#D49877",
      brownStrongest: "#FFC8A8",
      black: "#0E1525",
      white: "#FCFCFC",
    },
    editor: replitDark.values.editor,
  },
};

// ../shared/themes/index.ts
var allOfficialThemes = [replitLight, replitDark, replitSpooky];
var officialReplitThemeKeys = allOfficialThemes.map((theme) => theme.id);
var ROOT_THEME_CLASS = "replit-ui-theme-root";

// themes/util.ts
var AUTO_LIGHT_CLASSNAME = "replitLight";
var AUTO_DARK_CLASSNAME = "replitDark";
function getThemeSettingsCss(values) {
  const themeCssProps = {};
  Object.entries(values.global).forEach(([key, val]) => {
    if (isGlobalTokenName(key)) {
      const cssPropertyName = themeValueToCssPropertyMap[key];
      themeCssProps[cssPropertyName] = val;
    }
  });
  return themeCssProps;
}

// rui/tokens.ts
var globalStyles = {
  [`.${ROOT_THEME_CLASS}, :root`]: mapObject(
    baseTokens,
    (_key, [cssVar, value]) => [cssVar, value]
  ),
  [`.${ROOT_THEME_CLASS}.${AUTO_LIGHT_CLASSNAME}`]: mapObject(
    replitLight.values.global,
    (key, value) => [themeValueToCssPropertyMap[key], value]
  ),
  [`.${ROOT_THEME_CLASS}.${AUTO_DARK_CLASSNAME}`]: mapObject(
    replitDark.values.global,
    (key, value) => [themeValueToCssPropertyMap[key], value]
  ),
};
var toSpace = (space) => `var(--space-${space})`;
var toBorderRadius = (radius) => {
  if (radius === "full") {
    return "50%";
  }
  if (radius === 0) {
    return "0";
  }
  return `var(--border-radius-${radius})`;
};
var toShadow = (shadow) => `var(--shadow-${shadow})`;
var ModalZIndex = 3e5;
var rcss = {
  p: (space) => css({ padding: toSpace(space) }),
  px: (space) =>
    css({ paddingLeft: toSpace(space), paddingRight: toSpace(space) }),
  py: (space) =>
    css({ paddingTop: toSpace(space), paddingBottom: toSpace(space) }),
  pt: (space) => css({ paddingTop: toSpace(space) }),
  pb: (space) => css({ paddingBottom: toSpace(space) }),
  pl: (space) => css({ paddingLeft: toSpace(space) }),
  pr: (space) => css({ paddingRight: toSpace(space) }),
  shadow: (shadow) => css({ boxShadow: toShadow(shadow) }),
  m: (space) => css({ margin: toSpace(space) }),
  mx: (space) =>
    css({ marginLeft: toSpace(space), marginRight: toSpace(space) }),
  my: (space) =>
    css({ marginTop: toSpace(space), marginBottom: toSpace(space) }),
  mt: (space) => css({ marginTop: toSpace(space) }),
  mb: (space) => css({ marginBottom: toSpace(space) }),
  ml: (space) => css({ marginLeft: toSpace(space) }),
  mr: (space) => css({ marginRight: toSpace(space) }),
  position: {
    static: css({ position: "static" }),
    relative: css({ position: "relative" }),
    absolute: css({ position: "absolute" }),
    fixed: css({ position: "fixed" }),
    sticky: css({ position: "sticky" }),
  },
  flex: {
    row: css({ display: "flex", flexDirection: "row" }),
    column: css({ display: "flex", flexDirection: "column" }),
    rowReverse: css({ display: "flex", flexDirection: "row-reverse" }),
    columnReverse: css({ display: "flex", flexDirection: "column-reverse" }),
    grow: (flexGrow) => css({ flexGrow }),
    growAndShrink: (flex) => css({ flexGrow: flex, flexShrink: flex }),
    shrink: (flex) => css({ flexShrink: flex }),
    wrap: css({ flexWrap: "wrap" }),
    wrapReverse: css({ flexWrap: "wrap-reverse" }),
  },
  layout: {
    columns: css({
      display: "grid",
      gridTemplateColumns: "repeat(var(--column-number), minmax(0, 1fr))",
      gap: tokens.space16,
      gridAutoColumns: "max-content",
    }),
    colSpan: (columns) => {
      return css({
        gridColumn:
          "span min(" +
          columns +
          ", var(--column-number)) / span min(" +
          columns +
          ", var(--column-number))",
      });
    },
  },
  display: {
    none: css({ display: "none" }),
    block: css({ display: "block" }),
    inline: css({ display: "inline" }),
    inlineBlock: css({ display: "inline-block" }),
    flex: css({ display: "flex" }),
    inlineFlex: css({ display: "inline-flex" }),
    grid: css({ display: "grid" }),
  },
  visibility: {
    visible: css({ visibility: "visible" }),
    hidden: css({ visibility: "hidden" }),
  },
  center: css({ alignItems: "center", justifyContent: "center" }),
  align: {
    start: css({ alignItems: "flex-start" }),
    center: css({ alignItems: "center" }),
    stretch: css({ alignItems: "stretch" }),
    baseline: css({ alignItems: "baseline" }),
    end: css({ alignItems: "flex-end" }),
  },
  justify: {
    start: css({ justifyContent: "flex-start" }),
    center: css({ justifyContent: "center" }),
    end: css({ justifyContent: "flex-end" }),
    spaceBetween: css({ justifyContent: "space-between" }),
    spaceAround: css({ justifyContent: "space-around" }),
    spaceEvenly: css({ justifyContent: "space-evenly" }),
  },
  srOnly: css({
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0,0,0,0)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  }),
  rowWithGap: (space) =>
    css({
      flexDirection: "row",
      "& > *": { marginRight: toSpace(space) },
      "& > *:last-child": { marginRight: 0 },
    }),
  colWithGap: (space) =>
    css({
      flexDirection: "column",
      "& > *": { marginBottom: toSpace(space) },
      "& > *:last-child": { marginBottom: 0 },
    }),
  rowReverseWithGap: (space) =>
    css({
      flexDirection: "row-reverse",
      "& > *": { marginRight: toSpace(space) },
      "& > *:first-child": { marginRight: 0 },
    }),
  colReverseWithGap: (space) =>
    css({
      flexDirection: "column-reverse",
      "& > *": { marginBottom: toSpace(space) },
      "& > *:first-child": { marginBottom: 0 },
    }),
  borderRadius: (...radius) => {
    return css({
      borderRadius: radius.map(toBorderRadius).join(" "),
    });
  },
  font: {
    default: css({ fontFamily: tokens.fontFamilyDefault }),
    code: css({ fontFamily: tokens.fontFamilyCode }),
  },
  fontWeight: {
    normal: css({ fontWeight: tokens.fontWeightRegular }),
    medium: css({ fontWeight: tokens.fontWeightMedium }),
    bold: css({ fontWeight: tokens.fontWeightBold }),
  },
  fontSize: (fontSize) => css({ fontSize }),
  textAlign: {
    left: css({ textAlign: "left" }),
    center: css({ textAlign: "center" }),
    right: css({ textAlign: "right" }),
  },
  color: __spreadValues(
    {},
    mapObject(themeValueToCssPropertyMap, (name, cssProp) => [
      name,
      css({
        color: `var(${cssProp})`,
      }),
    ])
  ),
  backgroundColor: __spreadValues(
    {},
    mapObject(themeValueToCssPropertyMap, (name, cssProp) => [
      name,
      css({
        backgroundColor: `var(${cssProp})`,
      }),
    ])
  ),
  backgroundImage: (url) =>
    css({
      backgroundImage: `url("${url}")`,
      backgroundPosition: "center",
      backgroundSize: "cover",
    }),
  cursor: {
    pointer: css({ cursor: "pointer" }),
    default: css({ cursor: "default" }),
    auto: css({ cursor: "auto" }),
  },
  overflow: (overflow) => css({ overflow }),
  overflowX: (overflowX) => css({ overflowX }),
  overflowY: (overflowY) => css({ overflowY }),
  zIndex: (zIndex) => css({ zIndex }),
  top: (top2) => css({ top: top2 }),
  bottom: (bottom2) => css({ bottom: bottom2 }),
  left: (left2) => css({ left: left2 }),
  right: (right2) => css({ right: right2 }),
  width: (width) => css({ width }),
  height: (height) => css({ height }),
  maxWidth: (maxWidth) => css({ maxWidth }),
  maxHeight: (maxHeight) => css({ maxHeight }),
  minWidth: (minWidth) => css({ minWidth }),
  minHeight: (minHeight) => css({ minHeight }),
  coverContainer: css({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  }),
  transition: {
    snappy: css({
      transitionProperty: "all",
      transitionDuration: "120ms",
      transitionTimingFunction: "ease-out",
    }),
    chill: css({
      transitionProperty: "all",
      transitionDuration: "300ms",
      transitionTimingFunction: "ease-in-out",
    }),
  },
  focusRing: css({
    ":focus": {
      boxShadow: "0 0 0 2px " + tokens.accentPrimaryDefault,
      outline: "2px solid transparent",
      outlineOffset: "4px",
      ":not(:focus-visible)": {
        outline: "none",
        boxShadow: "none",
      },
    },
  }),
};

// rui/AccordionItem.tsx
import { css as css3 } from "@emotion/react";

// rui/View.tsx
import * as React from "react";
import { css as css2 } from "@emotion/react";
import { jsx } from "@emotion/react/jsx-runtime";
var viewStyle = css2({
  alignItems: "stretch",
  borderWidth: 0,
  borderStyle: "solid",
  boxSizing: "border-box",
  display: "flex",
  flexBasis: "auto",
  flexDirection: "column",
  flexShrink: 0,
  outline: "none",
  minHeight: 0,
  minWidth: 0,
});
function View(_a) {
  var _b = _a,
    { tag: TagElt = "div", innerRef, dataCy } = _b,
    props = __objRest(_b, ["tag", "innerRef", "dataCy"]);
  return /* @__PURE__ */ jsx(
    TagElt,
    __spreadValues(
      {
        ref: innerRef,
        css: viewStyle,
        "data-cy": dataCy,
      },
      props
    )
  );
}
var viewComponentCache = /* @__PURE__ */ new Map();
function SpecializedView(tag) {
  const existing = viewComponentCache.get(tag);
  if (existing != null) {
    return existing;
  }
  const Component2 = React.forwardRef((props, ref) =>
    /* @__PURE__ */ jsx(
      View,
      __spreadValues(
        {
          tag,
          innerRef: ref,
        },
        props
      )
    )
  );
  if (false) {
    Component2.displayName = `Specialized${tag[0].toUpperCase()}${tag.slice(
      1
    )}`;
  }
  viewComponentCache.set(tag, Component2);
  return Component2;
}

// rui/Interactive.tsx
var Interactive_exports = {};
__export(Interactive_exports, {
  focusRing: () => focusRing,
  interactive: () => interactive,
  interactiveTokens: () => interactiveTokens,
  interactiveVars: () => interactiveVars,
});

// ui/constants.ts
var BREAKPOINTS = {
  mobileMin: 320,
  mobileMax: 480,
  tabletMin: 768,
  tabletMax: 1024,
};
var TRANSITIONS = {
  duration: "120ms",
  timingFunction: "ease-out",
};

// rui/Interactive.tsx
var interactiveTokens = {
  interactiveBackground: "--interactive-background",
  interactiveBackgroundActive: "--interactive-background--active",
  interactiveBorder: "--interactive-border",
  interactiveBorderHover: "--interactive-border--hover",
};
var interactiveVars = {
  interactiveBackground: `var(${interactiveTokens.interactiveBackground})`,
  interactiveBackgroundActive: `var(${interactiveTokens.interactiveBackgroundActive})`,
  interactiveBorder: `var(${interactiveTokens.interactiveBorder})`,
  interactiveBorderHover: `var(${interactiveTokens.interactiveBorderHover})`,
};
var focusRing = {
  ":focus": {
    boxShadow: "0 0 0 2px " + tokens.accentPrimaryDefault,
    outline: "2px solid transparent",
    outlineOffset: "4px",
    ":not(:focus-visible)": {
      outline: "none",
      boxShadow: "none",
    },
  },
};
var interactive = {
  nofill: {
    transitionProperty: "border-color, background-color, box-shadow",
    transitionDuration: TRANSITIONS.duration,
    transitionTimingFunction: TRANSITIONS.timingFunction,
    borderRadius: tokens.borderRadius8,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    ":not([disabled])": __spreadProps(__spreadValues({}, focusRing), {
      cursor: "pointer",
      "@media (hover: hover)": {
        ":hover": {
          borderColor: interactiveVars.interactiveBorderHover,
          backgroundColor: interactiveVars.interactiveBackground,
        },
      },
      ":not(textarea):active": {
        backgroundColor: interactiveVars.interactiveBackgroundActive,
        borderColor: tokens.accentPrimaryDefault,
      },
    }),
  },
  filled: {
    transitionProperty: "border-color, box-shadow",
    transitionDuration: TRANSITIONS.duration,
    transitionTimingFunction: TRANSITIONS.timingFunction,
    borderRadius: tokens.borderRadius8,
    backgroundColor: interactiveVars.interactiveBackground,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    ":not([disabled])": __spreadProps(__spreadValues({}, focusRing), {
      cursor: "pointer",
      "@media (hover: hover)": {
        ":hover": {
          borderColor: interactiveVars.interactiveBorderHover,
        },
      },
      ":active": {
        backgroundColor: interactiveVars.interactiveBackgroundActive,
        borderColor: tokens.accentPrimaryDefault,
      },
    }),
  },
  outlined: {
    transitionProperty: "border-color, background-color, box-shadow",
    transitionDuration: TRANSITIONS.duration,
    transitionTimingFunction: TRANSITIONS.timingFunction,
    borderRadius: tokens.borderRadius8,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: interactiveVars.interactiveBorder,
    ":not([disabled])": __spreadProps(__spreadValues({}, focusRing), {
      cursor: "pointer",
      "@media (hover: hover)": {
        ":hover": {
          borderColor: interactiveVars.interactiveBorderHover,
          backgroundColor: interactiveVars.interactiveBackground,
        },
      },
      ":not(textarea):active": {
        backgroundColor: interactiveVars.interactiveBackgroundActive,
        borderColor: tokens.accentPrimaryDefault,
      },
    }),
  },
  filledAndOutlined: {
    transitionProperty: "border-color, box-shadow",
    transitionDuration: TRANSITIONS.duration,
    transitionTimingFunction: TRANSITIONS.timingFunction,
    borderRadius: tokens.borderRadius8,
    backgroundColor: interactiveVars.interactiveBackground,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    ":not([disabled])": __spreadProps(
      __spreadValues(
        {
          borderColor: interactiveVars.interactiveBorder,
        },
        focusRing
      ),
      {
        cursor: "pointer",
        "@media (hover: hover)": {
          ":hover": {
            borderColor: interactiveVars.interactiveBorderHover,
          },
        },
        ":not(textarea):active": {
          backgroundColor: interactiveVars.interactiveBackgroundActive,
          borderColor: tokens.accentPrimaryDefault,
        },
      }
    ),
  },
  listItem: {
    transitionProperty: "background-color, box-shadow",
    transitionDuration: TRANSITIONS.duration,
    transitionTimingFunction: TRANSITIONS.timingFunction,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    ":not([disabled])": __spreadProps(__spreadValues({}, focusRing), {
      cursor: "pointer",
      "@media (hover: hover)": {
        ":hover": {
          backgroundColor: interactiveVars.interactiveBackground,
        },
      },
      ":not(textarea):active": {
        backgroundColor: interactiveVars.interactiveBackgroundActive,
        borderColor: tokens.accentPrimaryDefault,
      },
    }),
  },
};

// ui/icons/Icon.tsx
import { jsx as jsx2, jsxs } from "@emotion/react/jsx-runtime";
function Icon(_a) {
  var _b = _a,
    {
      size = 16,
      rotate: rotate2 = 0,
      color = "currentColor",
      style,
      children,
      alt,
    } = _b,
    rest = __objRest(_b, [
      "size",
      "rotate",
      "color",
      "style",
      "children",
      "alt",
    ]);
  return /* @__PURE__ */ jsxs(
    "svg",
    __spreadProps(
      __spreadValues(
        {
          preserveAspectRatio: "xMidYMin",
          width: size,
          height: size,
          viewBox: "0 0 24 24",
          fill: color,
          style: __spreadProps(__spreadValues({}, style), {
            verticalAlign: "middle",
          }),
          "aria-hidden": !alt,
          css: [
            {
              minWidth: size,
              minHeight: size,
            },
            rotate2 && {
              transform: `rotate(${rotate2}deg);`,
            },
          ],
        },
        rest
      ),
      {
        children: [
          alt &&
            /* @__PURE__ */ jsx2("title", {
              children: alt,
            }),
          children,
        ],
      }
    )
  );
}

// ui/icons/ChevronUp.tsx
import { jsx as jsx3 } from "@emotion/react/jsx-runtime";
function ChevronUpIcon(props) {
  return /* @__PURE__ */ jsx3(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ jsx3("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M11.4697 8.46967C11.7626 8.17678 12.2374 8.17678 12.5303 8.46967L18.5303 14.4697C18.8232 14.7626 18.8232 15.2374 18.5303 15.5303C18.2374 15.8232 17.7626 15.8232 17.4697 15.5303L12 10.0607L6.53033 15.5303C6.23744 15.8232 5.76256 15.8232 5.46967 15.5303C5.17678 15.2374 5.17678 14.7626 5.46967 14.4697L11.4697 8.46967Z",
      }),
    })
  );
}

function SendIcon(props) {
  return /* @__PURE__ */ jsx3(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ jsx3("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M2.47614 2.46329C2.70058 2.24421 3.03764 2.18792 3.32109 2.32219L22.3211 11.3222C22.583 11.4463 22.75 11.7102 22.75 12C22.75 12.2898 22.583 12.5537 22.3211 12.6778L3.32109 21.6778C3.03764 21.8121 2.70058 21.7558 2.47614 21.5367C2.2517 21.3176 2.18728 20.982 2.31467 20.6954L6.17929 12L2.31467 3.30459C2.18728 3.01798 2.2517 2.68238 2.47614 2.46329ZM7.48743 12.75L4.50682 19.4564L18.6647 12.75H7.48743ZM18.6647 11.25H7.48743L4.50682 4.54362L18.6647 11.25Z",
      }),
    })
  );
}

function SettingsIcon(props) {
  return /* @__PURE__ */ jsx3(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ jsx3("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M12 1.75C11.6685 1.75 11.3505 1.8817 11.1161 2.11612C10.8817 2.35054 10.75 2.66848 10.75 3V3.17L10.75 3.17299C10.7481 3.64104 10.6094 4.09834 10.351 4.48858C10.0926 4.87882 9.72566 5.18497 9.29545 5.36935C9.22441 5.3998 9.14924 5.41902 9.07261 5.42648C8.6745 5.57098 8.24422 5.60787 7.8256 5.53197C7.35376 5.44642 6.91836 5.22147 6.57555 4.88615L6.56964 4.88036L6.50967 4.82033C6.39358 4.70411 6.25542 4.61162 6.10368 4.54871C5.95193 4.4858 5.78927 4.45343 5.625 4.45343C5.46073 4.45343 5.29807 4.4858 5.14632 4.54871C4.99458 4.61162 4.85672 4.70381 4.74063 4.82003C4.6244 4.93613 4.53162 5.07458 4.46871 5.22632C4.4058 5.37807 4.37343 5.54073 4.37343 5.705C4.37343 5.86927 4.4058 6.03193 4.46871 6.18368C4.53162 6.33542 4.62381 6.47328 4.74004 6.58938L4.80618 6.65552C5.14151 6.99833 5.36642 7.43376 5.45197 7.9056C5.53612 8.36967 5.48163 8.84807 5.29561 9.28109C5.12785 9.72368 4.83288 10.107 4.44761 10.3825C4.05591 10.6627 3.58898 10.8185 3.10754 10.8298L3.09 10.83H3C2.66848 10.83 2.35054 10.9617 2.11612 11.1961C1.8817 11.4305 1.75 11.7485 1.75 12.08C1.75 12.4115 1.8817 12.7295 2.11612 12.9639C2.35054 13.1983 2.66848 13.33 3 13.33H3.17299C3.64104 13.3319 4.09834 13.4706 4.48858 13.729C4.8777 13.9867 5.18322 14.3522 5.36777 14.7809C5.56009 15.2186 5.61729 15.7039 5.53197 16.1744C5.44642 16.6462 5.22147 17.0816 4.88615 17.4244L4.88036 17.4304L4.82033 17.4903C4.70411 17.6064 4.61162 17.7446 4.54871 17.8963C4.4858 18.0481 4.45343 18.2107 4.45343 18.375C4.45343 18.5393 4.4858 18.7019 4.54871 18.8537C4.61162 19.0054 4.70382 19.1433 4.82003 19.2594C4.93612 19.3756 5.07457 19.4684 5.22632 19.5313C5.37807 19.5942 5.54073 19.6266 5.705 19.6266C5.86927 19.6266 6.03193 19.5942 6.18368 19.5313C6.33542 19.4684 6.47329 19.3762 6.58938 19.26L6.65552 19.1938C6.99833 18.8585 7.43376 18.6336 7.9056 18.548C8.36968 18.4639 8.84809 18.5184 9.28112 18.7044C9.72371 18.8722 10.107 19.1671 10.3825 19.5524C10.6627 19.9441 10.8185 20.411 10.8298 20.8925L10.83 20.91V21C10.83 21.3315 10.9617 21.6495 11.1961 21.8839C11.4305 22.1183 11.7485 22.25 12.08 22.25C12.4115 22.25 12.7295 22.1183 12.9639 21.8839C13.1983 21.6495 13.33 21.3315 13.33 21V20.83L13.33 20.827C13.3319 20.359 13.4706 19.9017 13.729 19.5114C13.9867 19.1224 14.3521 18.8169 14.7807 18.6323C15.2185 18.4399 15.7038 18.3827 16.1744 18.468C16.6462 18.5536 17.0816 18.7785 17.4244 19.1139L17.4304 19.1196L17.4903 19.1797C17.6064 19.2959 17.7446 19.3884 17.8963 19.4513C18.0481 19.5142 18.2107 19.5466 18.375 19.5466C18.5393 19.5466 18.7019 19.5142 18.8537 19.4513C19.0054 19.3884 19.1433 19.2962 19.2594 19.18C19.3756 19.0639 19.4684 18.9254 19.5313 18.7737C19.5942 18.6219 19.6266 18.4593 19.6266 18.295C19.6266 18.1307 19.5942 17.9681 19.5313 17.8163C19.4684 17.6646 19.3762 17.5267 19.26 17.4106L19.1938 17.3445C18.8585 17.0017 18.6336 16.5662 18.548 16.0944C18.4627 15.6238 18.5199 15.1385 18.7123 14.7007C18.8969 14.2721 19.2024 13.9067 19.5914 13.649C19.9817 13.3906 20.439 13.2519 20.907 13.25L20.91 13.25L21 13.25C21.3315 13.25 21.6495 13.1183 21.8839 12.8839C22.1183 12.6495 22.25 12.3315 22.25 12C22.25 11.6685 22.1183 11.3505 21.8839 11.1161C21.6495 10.8817 21.3315 10.75 21 10.75H20.83L20.827 10.75C20.359 10.7481 19.9017 10.6094 19.5114 10.351C19.1212 10.0926 18.815 9.72566 18.6306 9.29545C18.6002 9.22442 18.581 9.14924 18.5735 9.07261C18.429 8.6745 18.3921 8.24422 18.468 7.8256C18.5536 7.35376 18.7785 6.91836 19.1139 6.57555L19.1196 6.56964L19.1797 6.50967C19.2959 6.39358 19.3884 6.25542 19.4513 6.10368C19.5142 5.95193 19.5466 5.78927 19.5466 5.625C19.5466 5.46073 19.5142 5.29807 19.4513 5.14632C19.3884 4.99458 19.2962 4.85672 19.18 4.74063C19.0639 4.6244 18.9254 4.53162 18.7737 4.46871C18.6219 4.4058 18.4593 4.37343 18.295 4.37343C18.1307 4.37343 17.9681 4.4058 17.8163 4.46871C17.6646 4.53162 17.5267 4.62382 17.4106 4.74004L17.3445 4.80618C17.0017 5.14151 16.5662 5.36642 16.0944 5.45197C15.6239 5.53729 15.1386 5.48009 14.7009 5.28777C14.2722 5.10322 13.9067 4.7977 13.649 4.40858C13.3906 4.01834 13.2519 3.56104 13.25 3.09299L13.25 3.09V3C13.25 2.66848 13.1183 2.35054 12.8839 2.11612C12.6495 1.8817 12.3315 1.75 12 1.75ZM10.0555 1.05546C10.5712 0.539732 11.2707 0.25 12 0.25C12.7293 0.25 13.4288 0.539732 13.9445 1.05546C14.4603 1.57118 14.75 2.27065 14.75 3V3.08823C14.7509 3.26333 14.8029 3.43435 14.8996 3.58035C14.9965 3.72669 15.1341 3.8415 15.2954 3.91065L15.3028 3.91381C15.4674 3.98642 15.6498 4.00812 15.8268 3.97604C16.0026 3.94417 16.1648 3.86071 16.293 3.73633L16.3494 3.67997C16.3493 3.68006 16.3495 3.67987 16.3494 3.67997C16.6047 3.42442 16.9082 3.22139 17.2419 3.08305C17.5758 2.94466 17.9336 2.87343 18.295 2.87343C18.6564 2.87343 19.0142 2.94466 19.3481 3.08305C19.6817 3.22134 19.9848 3.42397 20.24 3.67937C20.4957 3.93478 20.6986 4.23807 20.8369 4.57191C20.9753 4.90576 21.0466 5.26361 21.0466 5.625C21.0466 5.98639 20.9753 6.34424 20.8369 6.67809C20.6986 7.0118 20.4959 7.31499 20.2403 7.57033C20.2402 7.57043 20.2404 7.57023 20.2403 7.57033L20.1837 7.62699C20.0593 7.75515 19.9758 7.91744 19.944 8.09322C19.9119 8.27016 19.9335 8.45266 20.0061 8.61718C20.033 8.67803 20.0516 8.74203 20.0615 8.80746C20.1306 8.92448 20.2255 9.0248 20.3396 9.10038C20.4856 9.19707 20.6567 9.24906 20.8318 9.25H21C21.7293 9.25 22.4288 9.53973 22.9445 10.0555C23.4603 10.5712 23.75 11.2707 23.75 12C23.75 12.7293 23.4603 13.4288 22.9445 13.9445C22.4288 14.4603 21.7293 14.75 21 14.75H20.9118C20.7367 14.7509 20.5656 14.8029 20.4196 14.8996C20.2733 14.9965 20.1585 15.1341 20.0894 15.2954L20.0862 15.3028C20.0136 15.4674 19.9919 15.6498 20.024 15.8268C20.0558 16.0026 20.1393 16.1649 20.2637 16.293L20.32 16.3494C20.5757 16.6048 20.7786 16.9081 20.9169 17.2419C21.0553 17.5758 21.1266 17.9336 21.1266 18.295C21.1266 18.6564 21.0553 19.0142 20.9169 19.3481C20.7786 19.6818 20.5759 19.985 20.3203 20.2403C20.065 20.4959 19.7618 20.6986 19.4281 20.8369C19.0942 20.9753 18.7364 21.0466 18.375 21.0466C18.0136 21.0466 17.6558 20.9753 17.3219 20.8369C16.9881 20.6986 16.6848 20.4957 16.4294 20.24L16.373 20.1837C16.2448 20.0593 16.0826 19.9758 15.9068 19.944C15.7298 19.9119 15.5473 19.9335 15.3828 20.0061L15.3755 20.0094C15.2141 20.0785 15.0765 20.1933 14.9796 20.3396C14.8829 20.4856 14.8309 20.6567 14.83 20.8318V21C14.83 21.7293 14.5403 22.4288 14.0245 22.9445C13.5088 23.4603 12.8093 23.75 12.08 23.75C11.3507 23.75 10.6512 23.4603 10.1355 22.9445C9.61973 22.4288 9.33 21.7293 9.33 21V20.9201C9.32437 20.7422 9.2661 20.5699 9.16248 20.425C9.05742 20.2781 8.91061 20.1662 8.74111 20.1039C8.72628 20.0984 8.71163 20.0925 8.69718 20.0861C8.53266 20.0135 8.35016 19.9919 8.17322 20.024C7.99743 20.0558 7.83513 20.1393 7.70696 20.2637L7.65062 20.32C7.39522 20.5757 7.09193 20.7786 6.75809 20.9169C6.42424 21.0553 6.06639 21.1266 5.705 21.1266C5.34361 21.1266 4.98576 21.0553 4.65191 20.9169C4.31807 20.7786 4.01478 20.5757 3.75937 20.32C3.50397 20.0648 3.30134 19.7617 3.16305 19.4281C3.02466 19.0942 2.95343 18.7364 2.95343 18.375C2.95343 18.0136 3.02466 17.6558 3.16305 17.3219C3.30139 16.9882 3.50412 16.685 3.75967 16.4297L3.81633 16.373C3.94071 16.2448 4.02417 16.0826 4.05604 15.9068C4.08812 15.7298 4.06646 15.5473 3.99385 15.3828L3.99061 15.3755C3.92146 15.2141 3.80669 15.0765 3.66035 14.9796C3.51435 14.8829 3.34333 14.8309 3.16823 14.83H3C2.27065 14.83 1.57118 14.5403 1.05546 14.0245C0.539732 13.5088 0.25 12.8093 0.25 12.08C0.25 11.3507 0.539732 10.6512 1.05546 10.1355C1.57118 9.61973 2.27065 9.33 3 9.33H3.07991C3.25782 9.32437 3.43012 9.2661 3.57499 9.16248C3.72188 9.05742 3.83376 8.91061 3.8961 8.74111C3.90155 8.72628 3.90747 8.71163 3.91385 8.69718C3.98646 8.53266 4.00812 8.35016 3.97604 8.17322C3.94416 7.99743 3.8607 7.83513 3.73631 7.70697L3.67997 7.65062C3.67987 7.65053 3.68006 7.65072 3.67997 7.65062C3.42442 7.39529 3.22139 7.0918 3.08305 6.75809C2.94466 6.42424 2.87343 6.06639 2.87343 5.705C2.87343 5.34361 2.94466 4.98576 3.08305 4.65191C3.22139 4.3182 3.42412 4.01501 3.67967 3.75967C3.93501 3.50412 4.2382 3.30139 4.57191 3.16305C4.90576 3.02466 5.26361 2.95343 5.625 2.95343C5.98639 2.95343 6.34424 3.02466 6.67809 3.16305C7.0118 3.30139 7.31499 3.50412 7.57033 3.75967C7.57023 3.75957 7.57043 3.75977 7.57033 3.75967L7.62697 3.81631C7.75513 3.9407 7.91743 4.02416 8.09322 4.05604C8.27016 4.08812 8.45266 4.06646 8.61718 3.99385C8.67803 3.967 8.74203 3.94842 8.80746 3.93849C8.92449 3.86943 9.0248 3.77448 9.10038 3.66035C9.19707 3.51435 9.24906 3.34333 9.25 3.16823V3C9.25 2.27065 9.53973 1.57118 10.0555 1.05546ZM12 9.75C10.7574 9.75 9.75 10.7574 9.75 12C9.75 13.2426 10.7574 14.25 12 14.25C13.2426 14.25 14.25 13.2426 14.25 12C14.25 10.7574 13.2426 9.75 12 9.75ZM8.25 12C8.25 9.92893 9.92893 8.25 12 8.25C14.0711 8.25 15.75 9.92893 15.75 12C15.75 14.0711 14.0711 15.75 12 15.75C9.92893 15.75 8.25 14.0711 8.25 12Z",
      }),
    })
  );
}

function ListIcon(props) {
  return /* @__PURE__ */ jsx3(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ jsx3("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M2.25 6C2.25 5.58579 2.58579 5.25 3 5.25H3.01C3.42421 5.25 3.76 5.58579 3.76 6C3.76 6.41421 3.42421 6.75 3.01 6.75H3C2.58579 6.75 2.25 6.41421 2.25 6ZM7.25 6C7.25 5.58579 7.58579 5.25 8 5.25H21C21.4142 5.25 21.75 5.58579 21.75 6C21.75 6.41421 21.4142 6.75 21 6.75H8C7.58579 6.75 7.25 6.41421 7.25 6ZM2.25 12C2.25 11.5858 2.58579 11.25 3 11.25H3.01C3.42421 11.25 3.76 11.5858 3.76 12C3.76 12.4142 3.42421 12.75 3.01 12.75H3C2.58579 12.75 2.25 12.4142 2.25 12ZM7.25 12C7.25 11.5858 7.58579 11.25 8 11.25H21C21.4142 11.25 21.75 11.5858 21.75 12C21.75 12.4142 21.4142 12.75 21 12.75H8C7.58579 12.75 7.25 12.4142 7.25 12ZM2.25 18C2.25 17.5858 2.58579 17.25 3 17.25H3.01C3.42421 17.25 3.76 17.5858 3.76 18C3.76 18.4142 3.42421 18.75 3.01 18.75H3C2.58579 18.75 2.25 18.4142 2.25 18ZM7.25 18C7.25 17.5858 7.58579 17.25 8 17.25H21C21.4142 17.25 21.75 17.5858 21.75 18C21.75 18.4142 21.4142 18.75 21 18.75H8C7.58579 18.75 7.25 18.4142 7.25 18Z",
      }),
    })
  );
}

function LettersIcon(props) {
  return /* @__PURE__ */ jsx3(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ jsx3("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M6.99995 2.25C7.30273 2.25 7.57581 2.43205 7.69226 2.71154L12.6923 14.7115C12.8516 15.0939 12.6708 15.533 12.2884 15.6923C11.9061 15.8516 11.467 15.6708 11.3076 15.2885L9.72106 11.4806H4.27885L2.69226 15.2885C2.53295 15.6708 2.09384 15.8516 1.71149 15.6923C1.32914 15.533 1.14833 15.0939 1.30764 14.7115L6.30764 2.71154C6.4241 2.43205 6.69718 2.25 6.99995 2.25ZM4.90385 9.98065H9.09606L6.99995 4.95L4.90385 9.98065ZM14.25 8C14.25 7.58579 14.5857 7.25 15 7.25H19C21.071 7.25 22.75 8.92893 22.75 11C22.75 12.2267 22.1609 13.3158 21.2503 14C22.1609 14.6842 22.75 15.7733 22.75 17C22.75 19.0711 21.071 20.75 19 20.75H15C14.5857 20.75 14.25 20.4142 14.25 20V8ZM15.75 14.75V19.25H19C20.2426 19.25 21.25 18.2426 21.25 17C21.25 15.7574 20.2426 14.75 19 14.75H15.75ZM19 13.25C20.2426 13.25 21.25 12.2426 21.25 11C21.25 9.75736 20.2426 8.75 19 8.75H15.75V13.25H19Z",
      }),
    })
  );
}

function PlusIcon(props) {
  return /* @__PURE__ */ jsx3(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ jsx3("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M12 3.25C12.4142 3.25 12.75 3.58579 12.75 4V11.25H20C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H12.75V20C12.75 20.4142 12.4142 20.75 12 20.75C11.5858 20.75 11.25 20.4142 11.25 20V12.75H4C3.58579 12.75 3.25 12.4142 3.25 12C3.25 11.5858 3.58579 11.25 4 11.25H11.25V4C11.25 3.58579 11.5858 3.25 12 3.25Z",
      }),
    })
  );
}

function CopyIcon(props) {
  return /* @__PURE__ */ jsx3(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ jsx3("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M9.05546 2.05546C9.57118 1.53973 10.2707 1.25 11 1.25H20C20.7293 1.25 21.4288 1.53973 21.9445 2.05546C22.4603 2.57118 22.75 3.27065 22.75 4V13C22.75 13.7293 22.4603 14.4288 21.9445 14.9445C21.4288 15.4603 20.7293 15.75 20 15.75H19C18.5858 15.75 18.25 15.4142 18.25 15C18.25 14.5858 18.5858 14.25 19 14.25H20C20.3315 14.25 20.6495 14.1183 20.8839 13.8839C21.1183 13.6495 21.25 13.3315 21.25 13V4C21.25 3.66848 21.1183 3.35054 20.8839 3.11612C20.6495 2.8817 20.3315 2.75 20 2.75H11C10.6685 2.75 10.3505 2.8817 10.1161 3.11612C9.8817 3.35054 9.75 3.66848 9.75 4V5C9.75 5.41421 9.41421 5.75 9 5.75C8.58579 5.75 8.25 5.41421 8.25 5V4C8.25 3.27065 8.53973 2.57118 9.05546 2.05546ZM1.25 11C1.25 9.48122 2.48122 8.25 4 8.25H13C14.5188 8.25 15.75 9.48122 15.75 11V20C15.75 21.5188 14.5188 22.75 13 22.75H4C2.48122 22.75 1.25 21.5188 1.25 20V11ZM4 9.75C3.30964 9.75 2.75 10.3096 2.75 11V20C2.75 20.6904 3.30964 21.25 4 21.25H13C13.6904 21.25 14.25 20.6904 14.25 20V11C14.25 10.3096 13.6904 9.75 13 9.75H4Z",
      }),
    })
  );
}

function InfoIcon(props) {
  return /* @__PURE__ */ jsx3(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ [
        jsx3("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          key: Math.random().toString(36),
          d: "M12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 11.25C12.4142 11.25 12.75 11.5858 12.75 12V16C12.75 16.4142 12.4142 16.75 12 16.75C11.5858 16.75 11.25 16.4142 11.25 16V12C11.25 11.5858 11.5858 11.25 12 11.25Z",
        }),
        jsx3("path", {
          fillRule: "evenodd",
          key: Math.random().toString(36),
          clipRule: "evenodd",
          d: "M13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8Z",
        }),
      ],
    })
  );
}

function LockLockedIcon(props) {
  return /* @__PURE__ */ jsx3(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ jsx3("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M12 2.75C10.8462 2.75 9.75483 3.15823 8.96274 3.8623C8.17353 4.56382 7.75 5.49503 7.75 6.44444V9.25H16.25V6.44444C16.25 5.49503 15.8265 4.56382 15.0373 3.8623C14.2452 3.15823 13.1538 2.75 12 2.75ZM17.75 9.27466V6.44444C17.75 5.03638 17.12 3.70666 16.0338 2.74119C14.9505 1.77828 13.4983 1.25 12 1.25C10.5017 1.25 9.04947 1.77828 7.96619 2.74119C6.88004 3.70666 6.25 5.03638 6.25 6.44444V9.27466C5.65522 9.37184 5.17164 9.74541 4.84493 10.2036C4.46284 10.7396 4.25 11.4413 4.25 12.1818V19.8182C4.25 20.5587 4.46284 21.2604 4.84493 21.7964C5.22593 22.3307 5.8203 22.75 6.55556 22.75H17.4444C18.1797 22.75 18.7741 22.3307 19.1551 21.7964C19.5372 21.2604 19.75 20.5587 19.75 19.8182V12.1818C19.75 11.4413 19.5372 10.7396 19.1551 10.2036C18.8284 9.74541 18.3448 9.37184 17.75 9.27466ZM6.55556 10.75C6.4317 10.75 6.24829 10.8192 6.06629 11.0744C5.88538 11.3282 5.75 11.7173 5.75 12.1818V19.8182C5.75 20.2827 5.88538 20.6718 6.06629 20.9256C6.24829 21.1808 6.4317 21.25 6.55556 21.25H17.4444C17.5683 21.25 17.7517 21.1808 17.9337 20.9256C18.1146 20.6718 18.25 20.2827 18.25 19.8182V12.1818C18.25 11.7173 18.1146 11.3282 17.9337 11.0744C17.7517 10.8192 17.5683 10.75 17.4444 10.75H6.55556Z",
      }),
    })
  );
}

function TrashIcon(props) {
  return /* @__PURE__ */ jsx3(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ jsx3("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M10 2.75C9.66848 2.75 9.35054 2.8817 9.11612 3.11612C8.8817 3.35054 8.75 3.66848 8.75 4V5.25H15.25V4C15.25 3.66848 15.1183 3.35054 14.8839 3.11612C14.6495 2.8817 14.3315 2.75 14 2.75H10ZM16.75 5.25V4C16.75 3.27065 16.4603 2.57118 15.9445 2.05546C15.4288 1.53973 14.7293 1.25 14 1.25H10C9.27065 1.25 8.57118 1.53973 8.05546 2.05546C7.53973 2.57118 7.25 3.27065 7.25 4V5.25H3C2.58579 5.25 2.25 5.58579 2.25 6C2.25 6.41421 2.58579 6.75 3 6.75H4.25V20C4.25 20.7293 4.53973 21.4288 5.05546 21.9445C5.57118 22.4603 6.27065 22.75 7 22.75H17C17.7293 22.75 18.4288 22.4603 18.9445 21.9445C19.4603 21.4288 19.75 20.7293 19.75 20V6.75H21C21.4142 6.75 21.75 6.41421 21.75 6C21.75 5.58579 21.4142 5.25 21 5.25H16.75ZM5.75 6.75V20C5.75 20.3315 5.8817 20.6495 6.11612 20.8839C6.35054 21.1183 6.66848 21.25 7 21.25H17C17.3315 21.25 17.6495 21.1183 17.8839 20.8839C18.1183 20.6495 18.25 20.3315 18.25 20V6.75H5.75ZM10 10.25C10.4142 10.25 10.75 10.5858 10.75 11V17C10.75 17.4142 10.4142 17.75 10 17.75C9.58579 17.75 9.25 17.4142 9.25 17V11C9.25 10.5858 9.58579 10.25 10 10.25ZM14 10.25C14.4142 10.25 14.75 10.5858 14.75 11V17C14.75 17.4142 14.4142 17.75 14 17.75C13.5858 17.75 13.25 17.4142 13.25 17V11C13.25 10.5858 13.5858 10.25 14 10.25Z",
      }),
    })
  );
}

function ChevronDownIcon(props) {
  return /* @__PURE__ */ jsx3(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ jsx3("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M12.5303 15.5303C12.2374 15.8232 11.7626 15.8232 11.4697 15.5303L5.46967 9.53033C5.17678 9.23744 5.17678 8.76256 5.46967 8.46967C5.76256 8.17678 6.23744 8.17678 6.53033 8.46967L12 13.9393L17.4697 8.46967C17.7626 8.17678 18.2374 8.17678 18.5303 8.46967C18.8232 8.76256 18.8232 9.23744 18.5303 9.53033L12.5303 15.5303Z",
      }),
    })
  );
}

function BellIcon(props) {
  return /* @__PURE__ */ jsx3(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ jsx3("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M7.22709 3.22703C8.49296 1.96116 10.2098 1.25 12.0001 1.25C13.7903 1.25 15.5072 1.96116 16.773 3.22703C18.0389 4.4929 18.7501 6.20979 18.7501 8C18.7501 11.3895 19.4754 13.5135 20.1585 14.7659C20.5011 15.394 20.8371 15.8104 21.0758 16.0623C21.1953 16.1885 21.2909 16.2739 21.3513 16.3242C21.3815 16.3494 21.403 16.3658 21.4142 16.3742L21.4229 16.3805C21.6931 16.5649 21.8129 16.9036 21.7179 17.2173C21.6221 17.5337 21.3306 17.75 21.0001 17.75H3.00006C2.66956 17.75 2.37801 17.5337 2.28224 17.2173C2.18726 16.9036 2.30703 16.5649 2.57726 16.3805L2.58589 16.3742C2.59716 16.3658 2.61861 16.3494 2.64883 16.3242C2.70925 16.2739 2.80483 16.1885 2.92434 16.0623C3.16298 15.8104 3.49904 15.394 3.84164 14.7659C4.52476 13.5135 5.25006 11.3895 5.25006 8C5.25006 6.20979 5.96122 4.4929 7.22709 3.22703ZM4.68988 16.25H19.3102C19.1568 16.0265 18.9987 15.7721 18.8416 15.4841C18.0248 13.9865 17.2501 11.6105 17.2501 8C17.2501 6.60761 16.6969 5.27225 15.7124 4.28769C14.7278 3.30312 13.3924 2.75 12.0001 2.75C10.6077 2.75 9.27231 3.30312 8.28775 4.28769C7.30318 5.27226 6.75006 6.60761 6.75006 8C6.75006 11.6105 5.97536 13.9865 5.15848 15.4841C5.0014 15.7721 4.84336 16.0265 4.68988 16.25ZM9.89373 20.3512C10.252 20.1434 10.711 20.2654 10.9188 20.6237C11.0287 20.8131 11.1864 20.9703 11.3762 21.0796C11.5659 21.1889 11.7811 21.2465 12.0001 21.2465C12.219 21.2465 12.4342 21.1889 12.6239 21.0796C12.8137 20.9703 12.9714 20.8131 13.0813 20.6237C13.2891 20.2654 13.7481 20.1434 14.1064 20.3512C14.4647 20.5591 14.5866 21.018 14.3788 21.3763C14.1371 21.7931 13.7901 22.139 13.3726 22.3794C12.9551 22.6199 12.4818 22.7465 12.0001 22.7465C11.5183 22.7465 11.045 22.6199 10.6275 22.3794C10.21 22.139 9.86305 21.7931 9.62131 21.3763C9.41347 21.018 9.53544 20.5591 9.89373 20.3512Z",
      }),
    })
  );
}

// ui/icons/Eye.tsx
function EyeIcon(props) {
  return /* @__PURE__ */ jsx3(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ jsx3("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M1.85273 12C1.9691 12.2059 2.14027 12.4961 2.3644 12.8431C2.83126 13.566 3.523 14.5279 4.42215 15.487C6.23414 17.4198 8.79963 19.25 12 19.25C15.2004 19.25 17.7659 17.4198 19.5778 15.487C20.477 14.5279 21.1687 13.566 21.6356 12.8431C21.8597 12.4961 22.0309 12.2059 22.1473 12C22.0309 11.7941 21.8597 11.5039 21.6356 11.1569C21.1687 10.434 20.477 9.47205 19.5778 8.51296C17.7659 6.58017 15.2004 4.75 12 4.75C8.79963 4.75 6.23414 6.58017 4.42215 8.51296C3.523 9.47205 2.83126 10.434 2.3644 11.1569C2.14027 11.5039 1.9691 11.7941 1.85273 12ZM23 12C23.6708 11.6646 23.6707 11.6643 23.6705 11.664L23.6702 11.6633L23.6692 11.6613L23.666 11.6551L23.6553 11.6341C23.6462 11.6164 23.6332 11.5913 23.6163 11.5594C23.5824 11.4954 23.533 11.4038 23.4681 11.2886C23.3385 11.0581 23.1471 10.7324 22.8957 10.3431C22.3938 9.56598 21.648 8.52795 20.6722 7.48704C18.7341 5.41983 15.7996 3.25 12 3.25C8.20037 3.25 5.26586 5.41983 3.32785 7.48704C2.352 8.52795 1.60624 9.56598 1.10435 10.3431C0.852934 10.7324 0.661492 11.0581 0.531865 11.2886C0.467023 11.4038 0.417564 11.4954 0.383723 11.5594C0.3668 11.5913 0.353774 11.6164 0.344675 11.6341L0.333974 11.6551L0.330837 11.6613L0.329823 11.6633L0.329455 11.664C0.32931 11.6643 0.32918 11.6646 1 12L0.32918 11.6646C0.223607 11.8757 0.223607 12.1243 0.32918 12.3354L1 12C0.32918 12.3354 0.32931 12.3357 0.329455 12.336L0.329823 12.3367L0.330837 12.3387L0.333974 12.3449L0.344675 12.3659C0.353774 12.3836 0.3668 12.4087 0.383723 12.4406C0.417564 12.5046 0.467023 12.5962 0.531865 12.7114C0.661492 12.9419 0.852934 13.2676 1.10435 13.6569C1.60624 14.434 2.352 15.4721 3.32785 16.513C5.26586 18.5802 8.20037 20.75 12 20.75C15.7996 20.75 18.7341 18.5802 20.6722 16.513C21.648 15.4721 22.3938 14.434 22.8957 13.6569C23.1471 13.2676 23.3385 12.9419 23.4681 12.7114C23.533 12.5962 23.5824 12.5046 23.6163 12.4406C23.6332 12.4087 23.6462 12.3836 23.6553 12.3659L23.666 12.3449L23.6692 12.3387L23.6702 12.3367L23.6705 12.336C23.6707 12.3357 23.6708 12.3354 23 12ZM23 12L23.6708 12.3354C23.7764 12.1243 23.7764 11.8757 23.6708 11.6646L23 12ZM12 9.75C10.7574 9.75 9.75 10.7574 9.75 12C9.75 13.2426 10.7574 14.25 12 14.25C13.2426 14.25 14.25 13.2426 14.25 12C14.25 10.7574 13.2426 9.75 12 9.75ZM8.25 12C8.25 9.92893 9.92893 8.25 12 8.25C14.0711 8.25 15.75 9.92893 15.75 12C15.75 14.0711 14.0711 15.75 12 15.75C9.92893 15.75 8.25 14.0711 8.25 12Z",
      }),
    })
  );
}

// ui/icons/EyeOff.tsx
function EyeOffIcon(props) {
  return /* @__PURE__ */ jsx3(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ jsx3("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M0.46967 0.46967C0.762563 0.176777 1.23744 0.176777 1.53033 0.46967L6.58983 5.52917C6.59 5.52934 6.59016 5.5295 6.59033 5.52967L10.4073 9.34667C10.4074 9.34669 10.4074 9.34672 10.4074 9.34674C10.4091 9.34846 10.4109 9.35019 10.4126 9.35193C10.4126 9.35195 10.4126 9.35197 10.4127 9.35199L14.6479 13.5872C14.6479 13.5872 14.6479 13.5873 14.648 13.5873C14.6498 13.5891 14.6516 13.5909 14.6534 13.5927C14.6534 13.5927 14.6534 13.5928 14.6535 13.5928L18.4703 17.4097C18.4706 17.4099 18.4708 17.4102 18.4711 17.4104L23.5303 22.4697C23.8232 22.7626 23.8232 23.2374 23.5303 23.5303C23.2374 23.8232 22.7626 23.8232 22.4697 23.5303L17.859 18.9196C16.131 20.0776 14.1014 20.7157 12.0123 20.7499C12.0109 20.7499 12.0096 20.7499 12.0082 20.75C12.0055 20.75 12.0027 20.75 12 20.75C8.20037 20.75 5.26586 18.5802 3.32785 16.513C2.352 15.4721 1.60624 14.434 1.10435 13.6569C0.852934 13.2676 0.661492 12.9419 0.531865 12.7114C0.413677 12.5013 0.346639 12.37 0.331972 12.341C0.223066 12.125 0.224569 11.8589 0.339133 11.6454C1.49869 9.48444 3.0602 7.56802 4.93709 5.99775L0.46967 1.53033C0.176777 1.23744 0.176777 0.762563 0.46967 0.46967ZM6.0023 7.06296C4.32935 8.44128 2.9232 10.1157 1.85457 12.0033C1.9709 12.2089 2.14145 12.4979 2.3644 12.8431C2.83126 13.566 3.523 14.5279 4.42215 15.487C6.23298 17.4186 8.79636 19.2477 11.9939 19.25C13.6916 19.2211 15.3435 18.7292 16.7744 17.8351L14.0819 15.1426C13.8843 15.2815 13.6732 15.4014 13.4514 15.5002C12.9914 15.7052 12.4948 15.8154 11.9913 15.8242C11.4878 15.8331 10.9877 15.7405 10.5207 15.5519C10.0538 15.3633 9.62961 15.0826 9.27352 14.7265C8.91742 14.3704 8.6367 13.9462 8.44809 13.4793C8.25949 13.0123 8.16687 12.5122 8.17575 12.0087C8.18463 11.5052 8.29484 11.0086 8.4998 10.5486C8.59862 10.3268 8.71849 10.1157 8.85744 9.91809L6.0023 7.06296ZM9.94528 11.0059C9.91828 11.0559 9.89315 11.107 9.86995 11.1591C9.74697 11.4351 9.68085 11.733 9.67552 12.0351C9.67019 12.3372 9.72576 12.6373 9.83892 12.9175C9.95209 13.1977 10.1205 13.4522 10.3342 13.6658C10.5478 13.8795 10.8023 14.0479 11.0825 14.1611C11.3627 14.2742 11.6628 14.3298 11.9649 14.3245C12.267 14.3192 12.5649 14.253 12.8409 14.13C12.893 14.1069 12.9441 14.0817 12.9941 14.0547L9.94528 11.0059ZM11.9982 4.75C11.3494 4.74847 10.7027 4.82239 10.0709 4.97026C9.66762 5.06467 9.26414 4.81425 9.16974 4.41093C9.07533 4.00762 9.32575 3.60414 9.72906 3.50974C10.4737 3.33544 11.2361 3.24827 12.0009 3.25C15.8001 3.25032 18.7343 5.41998 20.6722 7.48704C21.648 8.52795 22.3938 9.56598 22.8957 10.3431C23.1471 10.7324 23.3385 11.0581 23.4681 11.2886C23.551 11.4358 23.6087 11.5444 23.6408 11.6061C23.7628 11.8403 23.7891 12.1148 23.6614 12.3536C23.0298 13.5352 22.2765 14.6477 21.4139 15.6729C21.1472 15.9898 20.6741 16.0306 20.3571 15.7639C20.0402 15.4972 19.9994 15.0241 20.2661 14.7071C20.9756 13.864 21.6048 12.9568 22.1458 11.9974C22.0295 11.7917 21.8588 11.5025 21.6356 11.1569C21.1687 10.434 20.477 9.47205 19.5778 8.51296C17.7659 6.58017 15.2004 4.75 12 4.75L11.9982 4.75Z",
      }),
    })
  );
}

function EditIcon(props) {
  return /* @__PURE__ */ jsx3(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ jsx3("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M19 2.92157C18.7271 2.92157 18.4568 2.97533 18.2046 3.07978C17.9525 3.18423 17.7233 3.33733 17.5303 3.53033L4.17118 16.8895L3.06893 20.9311L7.11052 19.8288L20.4697 6.46967C20.6627 6.27667 20.8158 6.04754 20.9202 5.79538C21.0247 5.54321 21.0784 5.27294 21.0784 5C21.0784 4.72705 21.0247 4.45678 20.9202 4.20462C20.8158 3.95245 20.6627 3.72333 20.4697 3.53033C20.2767 3.33733 20.0476 3.18423 19.7954 3.07978C19.5432 2.97533 19.273 2.92157 19 2.92157ZM17.6306 1.69396C18.0648 1.51413 18.5301 1.42157 19 1.42157C19.4699 1.42157 19.9353 1.51413 20.3694 1.69396C20.8036 1.87379 21.1981 2.13738 21.5303 2.46967C21.8626 2.80195 22.1262 3.19644 22.3061 3.63059C22.4859 4.06475 22.5784 4.53007 22.5784 5C22.5784 5.46992 22.4859 5.93524 22.3061 6.3694C22.1262 6.80356 21.8626 7.19804 21.5303 7.53033L8.03035 21.0303C7.93806 21.1226 7.82328 21.1892 7.69736 21.2236L2.19736 22.7236C1.9377 22.7944 1.66 22.7206 1.46969 22.5303C1.27937 22.34 1.20563 22.0623 1.27644 21.8027L2.77644 16.3027C2.81079 16.1767 2.8774 16.062 2.96969 15.9697L16.4697 2.46967C16.802 2.13738 17.1965 1.87379 17.6306 1.69396Z",
      }),
    })
  );
}

// ui/icons/ChevronUp.tsx
import { jsx as jsx311 } from "@emotion/react/jsx-runtime";
function ChatIcon(props) {
  return /* @__PURE__ */ jsx311(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ jsx311("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M5 3.75C4.66848 3.75 4.35054 3.8817 4.11612 4.11612C3.8817 4.35054 3.75 4.66848 3.75 5V19.1893L6.46967 16.4697C6.61032 16.329 6.80109 16.25 7 16.25H19C19.3315 16.25 19.6495 16.1183 19.8839 15.8839C20.1183 15.6495 20.25 15.3315 20.25 15V5C20.25 4.66848 20.1183 4.35054 19.8839 4.11612C19.6495 3.8817 19.3315 3.75 19 3.75H5ZM3.05546 3.05546C3.57118 2.53973 4.27065 2.25 5 2.25H19C19.7293 2.25 20.4288 2.53973 20.9445 3.05546C21.4603 3.57118 21.75 4.27065 21.75 5V15C21.75 15.7293 21.4603 16.4288 20.9445 16.9445C20.4288 17.4603 19.7293 17.75 19 17.75H7.31066L3.53033 21.5303C3.31583 21.7448 2.99324 21.809 2.71299 21.6929C2.43273 21.5768 2.25 21.3033 2.25 21V5C2.25 4.27065 2.53973 3.57118 3.05546 3.05546Z",
      }),
    })
  );
}

// ui/icons/FireIcon.tsx
import { jsx as jsx312 } from "@emotion/react/jsx-runtime";
function FireIcon(props) {
  return /* @__PURE__ */ jsx312(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ jsx312("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M19.1303 8.9256C18.8634 9.34874 18.5502 9.76469 18.1927 10.1735C18.1427 10.2306 18.0919 10.2877 18.0401 10.3446C17.8356 10.5701 17.5873 10.7535 17.3098 10.8838C17.0323 11.0142 16.7312 11.089 16.4239 11.1038C16.1165 11.1212 15.8085 11.0785 15.518 10.9781C15.2275 10.8776 14.9602 10.7215 14.7317 10.5188C14.468 10.2862 14.2614 9.9979 14.1275 9.6756C13.9935 9.35329 13.9357 9.00537 13.9585 8.65799C14.0535 7.18303 13.5655 5.44979 12.5071 3.50184C12.2868 3.10007 12.0489 2.72251 11.792 2.36915C11.4242 1.86314 11.0173 1.40676 10.5676 1C10.4894 1.4937 10.361 1.97845 10.1842 2.44696C10.1574 2.51746 10.1298 2.58765 10.1016 2.65754C9.67266 3.71822 9.07844 4.70752 8.33981 5.58982C7.79319 6.24814 7.16993 6.84134 6.48277 7.35729C5.4053 8.16945 4.51798 9.22433 3.92221 10.4037C3.3126 11.6017 2.9968 12.923 3.00002 14.2622C3.00002 16.5929 3.93488 18.7836 5.6303 20.4359C7.33206 22.0914 9.59156 23 12 23C14.4085 23 16.668 22.0914 18.3697 20.4359C20.0651 18.7867 21 16.5929 21 14.2622C21 13.0424 20.7433 11.8569 20.2394 10.7429C20.1699 10.5887 20.0962 10.4372 20.0183 10.2884C19.7658 9.80596 19.4693 9.35124 19.1303 8.9256ZM18.956 11.5523C19.3173 12.4164 19.5 13.3261 19.5 14.2622C19.5 16.1215 18.7807 17.8767 17.4532 19.2317C16.0242 20.6905 14.0408 21.5 12 21.5C10.0442 21.5 8.06952 20.754 6.67717 19.3616C5.26558 17.9859 4.50002 16.1802 4.50002 14.2622C4.49869 13.1611 4.76042 12.0646 5.25961 11.0829C5.76151 10.0921 6.49857 9.22397 7.38482 8.55574C8.1638 7.97069 8.87103 7.29776 9.49188 6.5504C10.1284 5.7897 10.6709 4.95845 11.1086 4.07424C11.1361 4.12243 11.1633 4.17114 11.1903 4.22035C11.8964 5.52028 12.5618 7.04595 12.4616 8.56151C12.424 9.13913 12.5203 9.71696 12.7423 10.2512C12.9641 10.7851 13.3052 11.2603 13.7378 11.6423C14.1144 11.9759 14.5531 12.2316 15.0279 12.3957C15.5015 12.5594 16.0026 12.6293 16.5027 12.6018C17.0029 12.5768 17.494 12.4546 17.9476 12.2415C18.3188 12.0671 18.6594 11.8344 18.956 11.5523Z",
      }),
    })
  );
}

// ui/icons/FireIcon.tsx
import { jsx as jsx313 } from "@emotion/react/jsx-runtime";
function PinIcon(props) {
  return /* @__PURE__ */ jsx313(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ jsx313("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M6.86201 1.6057C6.99867 1.38459 7.24007 1.25 7.5 1.25H16.5C16.7599 1.25 17.0013 1.38459 17.138 1.6057C17.2746 1.82681 17.2871 2.10292 17.1708 2.33541L16.25 4.17705V10.6895C17.2334 11.6784 18.75 13.3116 18.75 15.5C18.75 15.9142 18.4142 16.25 18 16.25H12.75V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V16.25H6C5.58579 16.25 5.25 15.9142 5.25 15.5C5.25 13.3116 6.76656 11.6784 7.75 10.6895V4.17705L6.82918 2.33541C6.71293 2.10292 6.72536 1.82681 6.86201 1.6057ZM8.71353 2.75L9.17082 3.66459C9.22289 3.76873 9.25 3.88357 9.25 4V11C9.25 11.1989 9.17098 11.3897 9.03033 11.5303C8.15176 12.4089 7.13532 13.4598 6.83665 14.75H17.1633C16.8647 13.4598 15.8482 12.4089 14.9697 11.5303C14.829 11.3897 14.75 11.1989 14.75 11V4C14.75 3.88357 14.7771 3.76873 14.8292 3.66459L15.2865 2.75H8.71353Z",
      }),
    })
  );
}

function GhostwriterIcon(props) {
  return /* @__PURE__ */ jsx313(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ [
        jsx313("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          key: Math.random().toString(36),
          d: "M15.9375 1.04363C15.7914 0.644422 15.2086 0.644422 15.0625 1.04363L14.058 3.78793C14.0093 3.92086 13.8991 4.02397 13.7603 4.06645L11.3244 4.8118C10.8925 4.94397 10.8917 5.53577 11.3233 5.66901L13.7612 6.42166C13.8995 6.46437 14.0092 6.56729 14.0577 6.69983L15.0625 9.44482C15.2086 9.84402 15.7914 9.84402 15.9375 9.44482L16.9421 6.70017C16.9907 6.56744 17.1007 6.46442 17.2393 6.42183L19.6762 5.67283C20.1079 5.54012 20.1079 4.94832 19.6762 4.81562L17.2393 4.06662C17.1007 4.02402 16.9907 3.92101 16.9421 3.78827L15.9375 1.04363Z",
        }),
        jsx313("path", {
          key: Math.random().toString(36),
          d: "M6.76405 19.3341C6.88427 19.0336 7.2583 18.9172 7.54217 19.0727C8.34775 19.5142 9.98458 20.2443 12 20.2443C14.0154 20.2443 15.6522 19.5142 16.4578 19.0727C16.7417 18.9172 17.1157 19.0336 17.236 19.3341L18.4514 21.8728C18.7142 22.5297 18.2304 23.2442 17.523 23.2442H6.47703C5.76957 23.2442 5.28581 22.5297 5.54856 21.8728L6.76405 19.3341Z",
        }),
        jsx313("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          key: Math.random().toString(36),
          d: "M10.8141 1.05266C10.9232 1.45225 10.6877 1.86462 10.2881 1.97371C9.24513 2.25845 8.28967 2.79883 7.50822 3.54593C6.72677 4.29303 6.14402 5.22325 5.81272 6.25236C5.48142 7.28147 5.41204 8.37696 5.61087 9.43964C5.8097 10.5023 6.27046 11.4986 6.95142 12.3383C7.63238 13.1781 8.51203 13.8347 9.51073 14.2487C10.5094 14.6627 11.5956 14.8211 12.671 14.7095C13.7463 14.5979 14.7768 14.2198 15.6692 13.6095C16.5616 12.9993 17.2877 12.176 17.7817 11.2144C17.971 10.8459 18.4231 10.7007 18.7916 10.8899C19.16 11.0792 19.3052 11.5313 19.116 11.8998C18.508 13.0833 17.6143 14.0966 16.516 14.8477C15.4177 15.5988 14.1493 16.0641 12.8258 16.2015C11.5023 16.3388 10.1655 16.1439 8.93628 15.6343C7.70712 15.1248 6.62446 14.3166 5.78636 13.2831C4.94825 12.2496 4.38117 11.0234 4.13646 9.71551C3.89174 8.40759 3.97713 7.05929 4.38488 5.7927C4.79263 4.5261 5.50988 3.38122 6.47166 2.46171C7.43344 1.5422 8.60939 0.877113 9.89303 0.526667C10.2926 0.417575 10.705 0.65307 10.8141 1.05266Z",
        }),
      ],
    })
  );
}

// ui/media.ts
var screenMediaForMaxWidth = (bp) =>
  `@media screen and (max-width: ${BREAKPOINTS[bp]}px)`;

// rui/AccordionItem.tsx
import { jsx as jsx4, jsxs as jsxs2 } from "@emotion/react/jsx-runtime";
var buttonReset = css3({
  border: "none",
  background: "transparent",
  color: "inherit",
  font: "inherit",
  lineHeight: "normal",
});
function AccordionItem({
  className,
  children,
  headerContent,
  expanded = false,
  uuid,
  variant = "default",
  onClick,
}) {
  const [isExpanded, setExpanded] = React2.useState(expanded);
  const switchItem = () => {
    if (onClick) {
      onClick();
    }
    setExpanded(!isExpanded);
  };
  const iconSize = variant === "large" ? 24 : void 0;
  const padding =
    variant === "large"
      ? [
          rcss.py(16),
          rcss.px(24),
          { [screenMediaForMaxWidth("mobileMax")]: [rcss.p(16)] },
        ]
      : [rcss.p(4)];
  return /* @__PURE__ */ jsxs2(View, {
    css: [rcss.flex.column],
    className,
    children: [
      /* @__PURE__ */ jsx4(View, {
        role: "heading",
        "aria-level": 4,
        children: /* @__PURE__ */ jsxs2(View, {
          css: [
            buttonReset,
            rcss.display.flex,
            rcss.flex.row,
            rcss.justify.spaceBetween,
            interactive.listItem,
            rcss.align.center,
            padding,
            {
              background: "transparent",
              ":hover": {
                cursor: "pointer",
              },
            },
          ],
          role: "button",
          tag: "button",
          "aria-expanded": isExpanded,
          id: "AccordionControl" + uuid,
          "aria-controls": "AccordionContent" + uuid,
          type: "button",
          onClick: () => {
            switchItem();
          },
          children: [
            headerContent,
            /* @__PURE__ */ jsx4(ChevronUpIcon, {
              size: iconSize,
              rotate: isExpanded ? 0 : 180,
              css: [rcss.transition.snappy],
            }),
          ],
        }),
      }),
      isExpanded &&
        /* @__PURE__ */ jsx4(View, {
          "aria-labelledby": "AccordionControl" + uuid,
          id: "AccordionContent" + uuid,
          children,
        }),
    ],
  });
}

// rui/Button.tsx
import * as React4 from "react";
import { css as css5 } from "@emotion/react";

// rui/Colorway.tsx
var colormap = {
  primary: {
    dimmest: tokens.accentPrimaryDimmest,
    dimmer: tokens.accentPrimaryDimmer,
    default: tokens.accentPrimaryDefault,
    stronger: tokens.accentPrimaryStronger,
    strongest: tokens.accentPrimaryStrongest,
  },
  positive: {
    dimmest: tokens.accentPositiveDimmest,
    dimmer: tokens.accentPositiveDimmer,
    default: tokens.accentPositiveDefault,
    stronger: tokens.accentPositiveStronger,
    strongest: tokens.accentPositiveStrongest,
  },
  negative: {
    dimmest: tokens.accentNegativeDimmest,
    dimmer: tokens.accentNegativeDimmer,
    default: tokens.accentNegativeDefault,
    stronger: tokens.accentNegativeStronger,
    strongest: tokens.accentNegativeStrongest,
  },
  warning: {
    dimmest: tokens.orangeDimmest,
    dimmer: tokens.orangeDimmer,
    default: tokens.orangeDefault,
    stronger: tokens.orangeStronger,
    strongest: tokens.orangeStrongest,
  },
  red: {
    dimmest: tokens.redDimmest,
    dimmer: tokens.redDimmer,
    default: tokens.redDefault,
    stronger: tokens.redStronger,
    strongest: tokens.redStrongest,
  },
  orange: {
    dimmest: tokens.orangeDimmest,
    dimmer: tokens.orangeDimmer,
    default: tokens.orangeDefault,
    stronger: tokens.orangeStronger,
    strongest: tokens.orangeStrongest,
  },
  yellow: {
    dimmest: tokens.yellowDimmest,
    dimmer: tokens.yellowDimmer,
    default: tokens.yellowDefault,
    stronger: tokens.yellowStronger,
    strongest: tokens.yellowStrongest,
  },
  green: {
    dimmest: tokens.greenDimmest,
    dimmer: tokens.greenDimmer,
    default: tokens.greenDefault,
    stronger: tokens.greenStronger,
    strongest: tokens.greenStrongest,
  },
  teal: {
    dimmest: tokens.tealDimmest,
    dimmer: tokens.tealDimmer,
    default: tokens.tealDefault,
    stronger: tokens.tealStronger,
    strongest: tokens.tealStrongest,
  },
  blue: {
    dimmest: tokens.blueDimmest,
    dimmer: tokens.blueDimmer,
    default: tokens.blueDefault,
    stronger: tokens.blueStronger,
    strongest: tokens.blueStrongest,
  },
  blurple: {
    dimmest: tokens.blurpleDimmest,
    dimmer: tokens.blurpleDimmer,
    default: tokens.blurpleDefault,
    stronger: tokens.blurpleStronger,
    strongest: tokens.blurpleStrongest,
  },
  purple: {
    dimmest: tokens.purpleDimmest,
    dimmer: tokens.purpleDimmer,
    default: tokens.purpleDefault,
    stronger: tokens.purpleStronger,
    strongest: tokens.purpleStrongest,
  },
  magenta: {
    dimmest: tokens.magentaDimmest,
    dimmer: tokens.magentaDimmer,
    default: tokens.magentaDefault,
    stronger: tokens.magentaStronger,
    strongest: tokens.magentaStrongest,
  },
  pink: {
    dimmest: tokens.pinkDimmest,
    dimmer: tokens.pinkDimmer,
    default: tokens.pinkDefault,
    stronger: tokens.pinkStronger,
    strongest: tokens.pinkStrongest,
  },
  grey: {
    dimmest: tokens.greyDimmest,
    dimmer: tokens.greyDimmer,
    default: tokens.greyDefault,
    stronger: tokens.greyStronger,
    strongest: tokens.greyStrongest,
  },
};
function nofill(colorway) {
  const { dimmest, dimmer, stronger, strongest } = colormap[colorway];
  return {
    transitionProperty: "color, background-color, box-shadow",
    transitionDuration: TRANSITIONS.duration,
    transitionTimingFunction: TRANSITIONS.timingFunction,
    borderStyle: "solid",
    borderColor: "transparent",
    borderWidth: 1,
    "&": {
      color: stronger,
    },
    ":disabled": {
      color: dimmer,
    },
    ":not([disabled])": {
      ":hover": {
        color: strongest,
        backgroundColor: dimmer,
      },
      ":focus": {
        color: strongest,
        boxShadow: "0 0 0 2px " + strongest,
        ":not(:focus-visible)": {
          boxShadow: "none",
        },
      },
      ":active": {
        color: strongest,
        backgroundColor: dimmest,
        borderColor: strongest,
      },
    },
  };
}
function outlined(colorway) {
  const {
    dimmest,
    dimmer,
    default: dflt,
    stronger,
    strongest,
  } = colormap[colorway];
  return {
    transitionProperty: "color, border-color, background-color, box-shadow",
    transitionDuration: TRANSITIONS.duration,
    transitionTimingFunction: TRANSITIONS.timingFunction,
    borderStyle: "solid",
    borderColor: dimmer,
    borderWidth: 1,
    "&": {
      color: stronger,
    },
    ":disabled": {
      color: dimmer,
    },
    ":not([disabled])": {
      "@media (hover: hover)": {
        ":hover": {
          color: strongest,
          borderColor: dflt,
          backgroundColor: dimmer,
        },
      },
      ":focus": {
        color: strongest,
        boxShadow: "0 0 0 2px " + strongest,
        ":not(:focus-visible)": {
          boxShadow: "none",
        },
      },
      ":active": {
        color: strongest,
        backgroundColor: dimmest,
        borderColor: strongest,
      },
    },
  };
}
function filledStatic(colorway) {
  const { dimmer } = colormap[colorway];
  return {
    transitionProperty: "border-color, box-shadow",
    transitionDuration: TRANSITIONS.duration,
    transitionTimingFunction: TRANSITIONS.timingFunction,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "transparent",
    "&": {
      color: tokens.foregroundDefault,
      backgroundColor: dimmer,
      boxShadow: "none",
    },
  };
}
function filledInteractive(colorway) {
  const { dimmest, default: dflt, stronger } = colormap[colorway];
  return __spreadProps(__spreadValues({}, filledStatic(colorway)), {
    ":disabled": {
      backgroundColor: dimmest,
      color: dflt,
    },
    ":not([disabled])": {
      "@media (hover: hover)": {
        ":hover": {
          borderColor: stronger,
        },
      },
      ":focus": {
        boxShadow: "0 0 0 2px " + stronger,
        ":not(:focus-visible)": {
          boxShadow: "none",
        },
      },
      ":active": {
        backgroundColor: dimmest,
        borderColor: dflt,
      },
    },
  });
}

// rui/Text.tsx
import * as React3 from "react";
import { css as css4 } from "@emotion/react";
import { jsx as jsx5 } from "@emotion/react/jsx-runtime";
var defaults = css4({
  display: "inline",
  overflowWrap: "break-word",
});
var variants = {
  text: css4({
    fontSize: tokens.fontSizeDefault,
    lineHeight: tokens.lineHeightDefault,
  }),
  small: css4({
    fontSize: tokens.fontSizeSmall,
    lineHeight: tokens.lineHeightSmall,
  }),
  headerBig: css4({
    fontSize: tokens.fontSizeHeaderBig,
    fontWeight: tokens.fontWeightMedium,
    lineHeight: tokens.lineHeightHeaderBig,
  }),
  headerDefault: css4({
    fontSize: tokens.fontSizeHeaderDefault,
    fontWeight: tokens.fontWeightMedium,
    lineHeight: tokens.lineHeightHeaderDefault,
  }),
  subheadBig: css4({
    fontSize: tokens.fontSizeSubheadBig,
    fontWeight: tokens.fontWeightMedium,
    lineHeight: tokens.lineHeightSubheadBig,
  }),
  subheadDefault: css4({
    fontSize: tokens.fontSizeSubheadDefault,
    fontWeight: tokens.fontWeightMedium,
    lineHeight: tokens.lineHeightSubheadDefault,
  }),
};
var colors = {
  default: void 0,
  dimmer: rcss.color.foregroundDimmer,
  dimmest: rcss.color.foregroundDimmest,
};
var truncate = css4({
  display: "inline-block",
  lineHeight: 1.2,
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});
var lineClamp = (n2) =>
  css4({
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: n2,
    WebkitBoxOrient: "vertical",
  });
function textCss(variant, color, multiline, maxLines) {
  return css4([
    defaults,
    variants[variant],
    color != null && colors[color],
    !multiline && !maxLines && truncate,
    maxLines && lineClamp(maxLines),
  ]);
}
var SpanView = SpecializedView("span");
var HeaderViews = {
  1: SpecializedView("h1"),
  2: SpecializedView("h2"),
  3: SpecializedView("h3"),
};
var Header = React3.forwardRef((_a, ref) => {
  var _b = _a,
    { color, level, variant = "text", children } = _b,
    rest = __objRest(_b, ["color", "level", "variant", "children"]);
  const Component2 = HeaderViews[level];
  return /* @__PURE__ */ jsx5(
    Component2,
    __spreadProps(
      __spreadValues(
        {
          ref,
          css: textCss(variant, color, true, void 0),
        },
        rest
      ),
      {
        children,
      }
    )
  );
});
var Text = React3.forwardRef((_a, ref) => {
  var _b = _a,
    { color, multiline, maxLines, variant = "text", children } = _b,
    rest = __objRest(_b, [
      "color",
      "multiline",
      "maxLines",
      "variant",
      "children",
    ]);
  return /* @__PURE__ */ jsx5(
    SpanView,
    __spreadProps(
      __spreadValues(
        {
          ref,
        },
        rest
      ),
      {
        css: textCss(variant, color, multiline, maxLines),
        children,
      }
    )
  );
});

// rui/Button.tsx
import {
  Fragment,
  jsx as jsx6,
  jsxs as jsxs3,
} from "@emotion/react/jsx-runtime";
var buttonReset2 = css5({
  border: "none",
  background: "transparent",
  color: "inherit",
  font: "inherit",
  lineHeight: "normal",
});
var ButtonView = SpecializedView("button");
function buttonCss({
  disabled,
  outlined: outlined2,
  stretch,
  colorway,
  alignment,
  size,
}) {
  return [
    rcss.rowWithGap(8),
    rcss.align[alignment != null ? alignment : "center"],
    rcss.justify[alignment != null ? alignment : "center"],
    buttonReset2,
    disabled && { color: tokens.foregroundDimmest },
    outlined2 ? interactive.outlined : interactive.filled,
    rcss.p(8),
    rcss.borderRadius(8),
    stretch && { alignSelf: "stretch" },
    colorway && (outlined2 ? outlined(colorway) : filledInteractive(colorway)),
    { height: size + 16 },
  ];
}
function getTextVariant({ small, big }) {
  if (big) {
    return "subheadDefault";
  }
  if (small) {
    return "small";
  }
  return "text";
}
function getIconSize({ small, big }) {
  if (big) {
    return 20;
  }
  if (small) {
    return 12;
  }
  return 16;
}
function ButtonContent({
  iconLeft,
  iconRight,
  text,
  secondaryText,
  iconSize,
  variant,
  alignment,
  small,
}) {
  const buttonText = text
    ? /* @__PURE__ */ jsx6(Text, {
        variant,
        children: text,
      })
    : null;
  return /* @__PURE__ */ jsxs3(Fragment, {
    children: [
      iconLeft
        ? /* @__PURE__ */ jsxs3(View, {
            css: [
              rcss.flex.growAndShrink(1),
              rcss.align[alignment != null ? alignment : "center"],
              rcss.justify[alignment != null ? alignment : "center"],
              rcss.rowWithGap(small ? 4 : 8),
            ],
            children: [
              React4.cloneElement(iconLeft, { size: iconSize }),
              buttonText,
            ],
          })
        : buttonText,
      secondaryText &&
        /* @__PURE__ */ jsx6(Text, {
          variant,
          color: "default",
          children: secondaryText,
        }),
      iconRight && React4.cloneElement(iconRight, { size: iconSize }),
    ],
  });
}
var Button = React4.forwardRef((_a, ref) => {
  var _b = _a,
    {
      colorway,
      disabled,
      iconLeft,
      iconRight,
      outlined: outlined2,
      small,
      big,
      stretch,
      text,
      secondaryText,
      alignment,
    } = _b,
    props = __objRest(_b, [
      "colorway",
      "disabled",
      "iconLeft",
      "iconRight",
      "outlined",
      "small",
      "big",
      "stretch",
      "text",
      "secondaryText",
      "alignment",
    ]);
  const variant = getTextVariant({ small, big });
  const iconSize = getIconSize({ small, big });
  const eltCss = buttonCss({
    disabled,
    outlined: outlined2,
    stretch,
    colorway,
    alignment,
    size: iconSize,
  });
  return /* @__PURE__ */ jsx6(
    ButtonView,
    __spreadProps(
      __spreadValues(
        {
          ref,
          css: eltCss,
          disabled,
        },
        props
      ),
      {
        children: /* @__PURE__ */ jsx6(ButtonContent, {
          text,
          secondaryText,
          iconLeft,
          iconRight,
          iconSize,
          variant,
          alignment,
        }),
      }
    )
  );
});
var Button_default = Button;

// rui/ButtonGroup.tsx
import * as React5 from "react";
import { jsx as jsx7 } from "@emotion/react/jsx-runtime";
var ButtonGroupContext = React5.createContext(null);
function ButtonGroup(_a) {
  var _b = _a,
    {
      name,
      value,
      row,
      stretch,
      disabled,
      onChange,
      children,
      primary,
      tag = "fieldset",
      dataCy,
    } = _b,
    props = __objRest(_b, [
      "name",
      "value",
      "row",
      "stretch",
      "disabled",
      "onChange",
      "children",
      "primary",
      "tag",
      "dataCy",
    ]);
  return /* @__PURE__ */ jsx7(
    View,
    __spreadProps(
      __spreadValues(
        {
          tag,
        },
        props
      ),
      {
        "data-cy": dataCy,
        css: [
          rcss.borderRadius(8),
          {
            backgroundColor: interactiveVars.interactiveBackground,
          },
          row && {
            display: "flex",
            flexDirection: "row",
            width: stretch ? "100%" : "min-content",
          },
          row && stretch && { justifyItems: "stretch" },
        ],
        children: /* @__PURE__ */ jsx7(ButtonGroupContext.Provider, {
          value: { value, name, onChange, primary, disabled },
          children,
        }),
      }
    )
  );
}
var Input = SpecializedView("input");

// ui/icons/Check.tsx
import { jsx as jsx8 } from "@emotion/react/jsx-runtime";
function CheckIcon(props) {
  return /* @__PURE__ */ jsx8(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ jsx8("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M20.5303 5.46967C20.8232 5.76256 20.8232 6.23744 20.5303 6.53033L9.53033 17.5303C9.23744 17.8232 8.76256 17.8232 8.46967 17.5303L3.46967 12.5303C3.17678 12.2374 3.17678 11.7626 3.46967 11.4697C3.76256 11.1768 4.23744 11.1768 4.53033 11.4697L9 15.9393L19.4697 5.46967C19.7626 5.17678 20.2374 5.17678 20.5303 5.46967Z",
      }),
    })
  );
}

// rui/Checkbox.tsx
import { jsx as jsx9, jsxs as jsxs5 } from "@emotion/react/jsx-runtime";
var Input2 = SpecializedView("input");
function Checkbox(_a) {
  var _b = _a,
    { checked, onChange, required } = _b,
    props = __objRest(_b, ["checked", "onChange", "required"]);
  return /* @__PURE__ */ jsxs5(View, {
    tag: "div",
    css: [rcss.justify.center, rcss.align.center, rcss.position.relative],
    children: [
      /* @__PURE__ */ jsx9(
        Input2,
        __spreadValues(
          {
            tag: "input",
            type: "checkbox",
            checked,
            required,
            onChange: (e2) => {
              if (onChange) {
                onChange(e2);
              }
            },
            css: [
              interactive.filledAndOutlined,
              {
                appearance: "none",
                width: 20,
                height: 20,
                borderRadius: tokens.borderRadius4,
              },
            ],
          },
          props
        )
      ),
      checked
        ? /* @__PURE__ */ jsx9(CheckIcon, {
            css: [{ position: "absolute", pointerEvents: "none" }],
          })
        : null,
    ],
  });
}

// rui/DetailedInput.tsx
import { css as css8 } from "@emotion/react";
import React9 from "react";

// ../node_modules/react-uid/dist/es2015/uid.js
var generateUID = function () {
  var counter2 = 1;
  var map = /* @__PURE__ */ new WeakMap();
  var uid2 = function (item, index) {
    if (typeof item === "number" || typeof item === "string") {
      return index ? "idx-" + index : "val-" + item;
    }
    if (!map.has(item)) {
      map.set(item, counter2++);
      return uid2(item);
    }
    return "uid" + map.get(item);
  };
  return uid2;
};
var uid = generateUID();

// ../node_modules/react-uid/dist/es2015/context.js
import * as React6 from "react";
var createSource = function (prefix) {
  if (prefix === void 0) {
    prefix = "";
  }
  return {
    value: 1,
    prefix,
    uid: generateUID(),
  };
};
var counter = createSource();
var source = React6.createContext(createSource());
var getId = function (source2) {
  return source2.value++;
};
var getPrefix = function (source2) {
  return source2 ? source2.prefix : "";
};

// ../node_modules/react-uid/dist/es2015/hooks.js
import * as React7 from "react";
var generateUID2 = function (context) {
  var quartz = context || counter;
  var prefix = getPrefix(quartz);
  var id = getId(quartz);
  var uid2 = prefix + id;
  var gen = function (item) {
    return uid2 + quartz.uid(item);
  };
  return { uid: uid2, gen };
};
var useUIDState = function () {
  if (false) {
    if (!("useContext" in React7)) {
      throw new Error("Hooks API requires React 16.8+");
    }
  }
  return React7.useState(generateUID2(React7.useContext(source)));
};
var useUIDSeed = function () {
  var gen = useUIDState()[0].gen;
  return gen;
};

// rui/Input.tsx
import React8 from "react";
import { css as css6 } from "@emotion/react";
import { jsx as jsx10 } from "@emotion/react/jsx-runtime";
var inputCss = css6([
  interactive.filledAndOutlined,
  rcss.px(8),
  rcss.py(4),
  rcss.flex.growAndShrink(1),
  rcss.color.foregroundDefault,
  {
    outline: "0 none",
    fontSize: tokens.fontSizeDefault,
    lineHeight: "22px",
    fontFamily: tokens.fontFamilyDefault,
    "&::placeholder": [rcss.color.foregroundDimmest],
    "&:not([disabled])": { cursor: "text" },
  },
]);
var InputView = SpecializedView("input");
var Input3 = React8.forwardRef((props, ref) =>
  /* @__PURE__ */ jsx10(
    InputView,
    __spreadProps(__spreadValues({}, props), {
      ref,
      css: inputCss,
    })
  )
);
var Input_default = Input3;
var TextareaView = SpecializedView("textarea");
var MultiLineInput = React8.forwardRef((props, ref) =>
  /* @__PURE__ */ jsx10(
    TextareaView,
    __spreadProps(__spreadValues({}, props), {
      ref,
      css: inputCss,
    })
  )
);

// ui/icons/Loading.tsx
import { css as css7, keyframes } from "@emotion/react";

// ui/icons/Loader.tsx
import { jsx as jsx11 } from "@emotion/react/jsx-runtime";
function LoaderIcon(props) {
  return /* @__PURE__ */ jsx11(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ jsx11("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M12 3.75C7.44365 3.75 3.75 7.44365 3.75 12C3.75 16.5563 7.44365 20.25 12 20.25C16.5563 20.25 20.25 16.5563 20.25 12C20.25 11.5858 20.5858 11.25 21 11.25C21.4142 11.25 21.75 11.5858 21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C12.4142 2.25 12.75 2.58579 12.75 3C12.75 3.41421 12.4142 3.75 12 3.75Z",
      }),
    })
  );
}

// ui/icons/Loading.tsx
import { jsx as jsx12 } from "@emotion/react/jsx-runtime";
var rotation = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(359deg)" },
});
var rotate = css7({
  animation: `${rotation} 1s linear infinite`,
});
function LoadingIcon(props) {
  return /* @__PURE__ */ jsx12(
    LoaderIcon,
    __spreadProps(__spreadValues({}, props), {
      css: rotate,
    })
  );
}

// ui/icons/Exclamation.tsx
import { jsx as jsx13 } from "@emotion/react/jsx-runtime";
function ExclamationIcon(props) {
  return /* @__PURE__ */ jsx13(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ jsx13("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M12 2.25C12.4142 2.25 12.75 2.58579 12.75 3V15.5C12.75 15.9142 12.4142 16.25 12 16.25C11.5858 16.25 11.25 15.9142 11.25 15.5V3C11.25 2.58579 11.5858 2.25 12 2.25ZM10.25 21C10.25 20.0335 11.0335 19.25 12 19.25C12.9665 19.25 13.75 20.0335 13.75 21C13.75 21.9665 12.9665 22.75 12 22.75C11.0335 22.75 10.25 21.9665 10.25 21Z",
      }),
    })
  );
}

// ui/icons/Warning.tsx
import { jsx as jsx14 } from "@emotion/react/jsx-runtime";
function WarningIcon(props) {
  return /* @__PURE__ */ jsx14(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ jsx14("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M10.5792 3.125C11.2528 1.95833 12.9367 1.95833 13.6103 3.125L22.7036 18.875C23.3772 20.0417 22.5352 21.5 21.188 21.5H3.00151C1.65436 21.5 0.812393 20.0417 1.48597 18.875L10.5792 3.125ZM12.3113 3.875C12.2151 3.70833 11.9745 3.70833 11.8783 3.875L2.78501 19.625C2.68878 19.7917 2.80906 20 3.00151 20H21.188C21.3805 20 21.5008 19.7917 21.4046 19.625L12.3113 3.875ZM12.043 8.35254C12.4572 8.35254 12.793 8.68833 12.793 9.10254V13.1025C12.793 13.5168 12.4572 13.8525 12.043 13.8525C11.6288 13.8525 11.293 13.5168 11.293 13.1025V9.10254C11.293 8.68833 11.6288 8.35254 12.043 8.35254ZM11.293 17.1025C11.293 16.6883 11.6288 16.3525 12.043 16.3525H12.053C12.4672 16.3525 12.803 16.6883 12.803 17.1025C12.803 17.5168 12.4672 17.8525 12.053 17.8525H12.043C11.6288 17.8525 11.293 17.5168 11.293 17.1025Z",
      }),
    })
  );
}

// rui/DetailedInput.tsx
import { jsx as jsx15, jsxs as jsxs6 } from "@emotion/react/jsx-runtime";
function toValidationState(field) {
  if (!field.touched && field.description) {
    return {
      state: "default",
      message: field.description,
    };
  }
  if (field.error) {
    return {
      message: field.error.message,
      state: "error",
    };
  }
  if (field.warning) {
    return {
      message: field.warning.message,
      state: "warning",
    };
  }
  if (field.isValid) {
    return {
      message: field.successText || "",
      state: "success",
    };
  }
  if (!field.touched) {
    return;
  }
  return {
    message: "",
    state: "loading",
  };
}
var inputStyleMap = {
  success: css8({
    ":not([disabled])": {
      borderColor: tokens.accentPositiveStrongest,
    },
  }),
  error: css8({
    ":not([disabled])": {
      borderColor: tokens.accentNegativeStrongest,
    },
  }),
  warning: css8({
    ":not([disabled])": {
      borderColor: tokens.yellowStrongest,
    },
  }),
  default: void 0,
  loading: void 0,
};
var validationStyleMap = {
  success: css8([
    {
      color: tokens.accentPositiveStrongest,
    },
  ]),
  error: css8([
    {
      color: tokens.accentNegativeStrongest,
    },
  ]),
  warning: css8([
    {
      color: tokens.yellowStrongest,
    },
  ]),
  default: void 0,
  loading: void 0,
};
var validationIconMap = {
  success: /* @__PURE__ */ jsx15(CheckIcon, {}),
  error: /* @__PURE__ */ jsx15(ExclamationIcon, {}),
  warning: /* @__PURE__ */ jsx15(WarningIcon, {}),
  default: void 0,
  loading: /* @__PURE__ */ jsx15(LoadingIcon, {}),
};
var Validation = (props) => {
  const Icon2 = validationIconMap[props.state];
  return /* @__PURE__ */ jsxs6(View, {
    css: [validationStyleMap[props.state], rcss.rowWithGap(4)],
    children: [
      React9.isValidElement(Icon2) &&
        React9.cloneElement(Icon2, {
          size: 12,
        }),
      /* @__PURE__ */ jsx15(Text, {
        variant: "small",
        children: props.message,
      }),
    ],
  });
};
var grid = css8`
  display: grid;
  grid-gap: ${tokens.space8};
  grid-template-areas:
    'label . status'
    'input input input'
    'validation validation validation'
    'details details details';
  > .label {
    grid-area: label;
  }
  > .status {
    grid-area: status;
  }
  > .input {
    grid-area: input;
  }
  > .details {
    grid-area: details;
  }
  > .validation {
    grid-area: validation;
  }
`;
var DetailedInput = (_a) => {
  var _b = _a,
    {
      id: _id,
      label,
      status,
      description,
      "aria-describedby": _describedBy,
      error,
      isValid,
      touched,
      value,
      warning,
      successText,
    } = _b,
    props = __objRest(_b, [
      "id",
      "label",
      "status",
      "description",
      "aria-describedby",
      "error",
      "isValid",
      "touched",
      "value",
      "warning",
      "successText",
    ]);
  const seed = useUIDSeed();
  const id = _id || seed("input");
  const statusId = status && seed("status");
  const descriptionId = description ? seed("description") : void 0;
  const describedBy = [statusId, descriptionId, _describedBy]
    .filter(Boolean)
    .join(" ");
  const validationState = toValidationState({
    description,
    error,
    isValid,
    touched,
    value,
    warning,
    successText,
  });
  return /* @__PURE__ */ jsxs6("div", {
    css: grid,
    children: [
      /* @__PURE__ */ jsx15("label", {
        htmlFor: id,
        className: "label",
        children: /* @__PURE__ */ jsx15(Text, {
          variant: "small",
          color: "dimmer",
          children: label,
        }),
      }),
      status &&
        /* @__PURE__ */ jsx15(Text, {
          variant: "small",
          color: "dimmer",
          css: [rcss.textAlign.right],
          className: "status",
          children: status,
        }),
      /* @__PURE__ */ jsx15(
        Input_default,
        __spreadProps(
          __spreadValues(
            {
              id,
              className: "input",
              value,
              css: [
                inputStyleMap[
                  (validationState == null ? void 0 : validationState.state) ||
                    "default"
                ],
              ],
            },
            props
          ),
          {
            "aria-describedby": describedBy,
            "aria-invalid":
              (validationState == null ? void 0 : validationState.state) ===
              "error",
          }
        )
      ),
      /* @__PURE__ */ jsx15("div", {
        id: descriptionId,
        className: "validation",
        css: [
          validationStyleMap[
            (validationState == null ? void 0 : validationState.state) ||
              "default"
          ],
        ],
        "aria-live":
          (validationState == null ? void 0 : validationState.state) !==
          "default"
            ? "polite"
            : void 0,
        children:
          validationState &&
          /* @__PURE__ */ jsx15(
            Validation,
            __spreadValues({}, validationState)
          ),
      }),
    ],
  });
};

// rui/IconButton.tsx
import * as React12 from "react";
import { css as css10 } from "@emotion/react";
import { useButton } from "@react-aria/button";
import { mergeProps as mergeProps2 } from "@react-aria/utils";

// rui/Tooltip.tsx
import { useState as useState6 } from "react";
import { css as css9 } from "@emotion/react";
import { useTooltip, useTooltipTrigger } from "@react-aria/tooltip";
import { mergeProps } from "@react-aria/utils";

// ../node_modules/@react-stately/tooltip/dist/module.js
import {
  useMemo as $1OhDq$useMemo,
  useRef as $1OhDq$useRef,
  useEffect as $1OhDq$useEffect,
} from "react";

// ../node_modules/@react-stately/utils/dist/module.js
import {
  useState as $6imuh$useState,
  useRef as $6imuh$useRef,
  useCallback as $6imuh$useCallback,
} from "react";
function $458b0a5536c1a7cf$export$40bfa8c7b0832715(
  value1,
  defaultValue,
  onChange
) {
  let [stateValue, setStateValue] = $6imuh$useState(value1 || defaultValue);
  let ref = $6imuh$useRef(value1 !== void 0);
  let wasControlled = ref.current;
  let isControlled = value1 !== void 0;
  let stateRef = $6imuh$useRef(stateValue);
  if (wasControlled !== isControlled)
    console.warn(
      `WARN: A component changed from ${
        wasControlled ? "controlled" : "uncontrolled"
      } to ${isControlled ? "controlled" : "uncontrolled"}.`
    );
  ref.current = isControlled;
  let setValue = $6imuh$useCallback(
    (value2, ...args) => {
      let onChangeCaller = (value, ...onChangeArgs) => {
        if (onChange) {
          if (!Object.is(stateRef.current, value))
            onChange(value, ...onChangeArgs);
        }
        if (!isControlled) stateRef.current = value;
      };
      if (typeof value2 === "function") {
        console.warn(
          "We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320"
        );
        let updateFunction = (oldValue, ...functionArgs) => {
          let interceptedValue = value2(
            isControlled ? stateRef.current : oldValue,
            ...functionArgs
          );
          onChangeCaller(interceptedValue, ...args);
          if (!isControlled) return interceptedValue;
          return oldValue;
        };
        setStateValue(updateFunction);
      } else {
        if (!isControlled) setStateValue(value2);
        onChangeCaller(value2, ...args);
      }
    },
    [isControlled, onChange]
  );
  if (isControlled) stateRef.current = value1;
  else value1 = stateValue;
  return [value1, setValue];
}

// ../node_modules/@react-stately/overlays/dist/module.js
function $fc909762b330b746$export$61c6a8c84e605fb6(props) {
  let [isOpen, setOpen] = $458b0a5536c1a7cf$export$40bfa8c7b0832715(
    props.isOpen,
    props.defaultOpen || false,
    props.onOpenChange
  );
  return {
    isOpen,
    setOpen,
    open() {
      setOpen(true);
    },
    close() {
      setOpen(false);
    },
    toggle() {
      setOpen(!isOpen);
    },
  };
}

// ../node_modules/@react-stately/tooltip/dist/module.js
var $8796f90736e175cb$var$TOOLTIP_DELAY = 1500;
var $8796f90736e175cb$var$TOOLTIP_COOLDOWN = 500;
var $8796f90736e175cb$var$tooltips = {};
var $8796f90736e175cb$var$tooltipId = 0;
var $8796f90736e175cb$var$globalWarmedUp = false;
var $8796f90736e175cb$var$globalWarmUpTimeout = null;
var $8796f90736e175cb$var$globalCooldownTimeout = null;
function $8796f90736e175cb$export$4d40659c25ecb50b(props = {}) {
  let { delay = $8796f90736e175cb$var$TOOLTIP_DELAY } = props;
  let { isOpen, open, close } =
    $fc909762b330b746$export$61c6a8c84e605fb6(props);
  let id = $1OhDq$useMemo(() => `${++$8796f90736e175cb$var$tooltipId}`, []);
  let closeTimeout = $1OhDq$useRef();
  let ensureTooltipEntry = () => {
    $8796f90736e175cb$var$tooltips[id] = hideTooltip;
  };
  let closeOpenTooltips = () => {
    for (let hideTooltipId in $8796f90736e175cb$var$tooltips)
      if (hideTooltipId !== id) {
        $8796f90736e175cb$var$tooltips[hideTooltipId](true);
        delete $8796f90736e175cb$var$tooltips[hideTooltipId];
      }
  };
  let showTooltip = () => {
    clearTimeout(closeTimeout.current);
    closeTimeout.current = null;
    closeOpenTooltips();
    ensureTooltipEntry();
    $8796f90736e175cb$var$globalWarmedUp = true;
    open();
    if ($8796f90736e175cb$var$globalWarmUpTimeout) {
      clearTimeout($8796f90736e175cb$var$globalWarmUpTimeout);
      $8796f90736e175cb$var$globalWarmUpTimeout = null;
    }
    if ($8796f90736e175cb$var$globalCooldownTimeout) {
      clearTimeout($8796f90736e175cb$var$globalCooldownTimeout);
      $8796f90736e175cb$var$globalCooldownTimeout = null;
    }
  };
  let hideTooltip = (immediate) => {
    if (immediate) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
      close();
    } else if (!closeTimeout.current)
      closeTimeout.current = setTimeout(() => {
        closeTimeout.current = null;
        close();
      }, $8796f90736e175cb$var$TOOLTIP_COOLDOWN);
    if ($8796f90736e175cb$var$globalWarmUpTimeout) {
      clearTimeout($8796f90736e175cb$var$globalWarmUpTimeout);
      $8796f90736e175cb$var$globalWarmUpTimeout = null;
    }
    if ($8796f90736e175cb$var$globalWarmedUp) {
      if ($8796f90736e175cb$var$globalCooldownTimeout)
        clearTimeout($8796f90736e175cb$var$globalCooldownTimeout);
      $8796f90736e175cb$var$globalCooldownTimeout = setTimeout(() => {
        delete $8796f90736e175cb$var$tooltips[id];
        $8796f90736e175cb$var$globalCooldownTimeout = null;
        $8796f90736e175cb$var$globalWarmedUp = false;
      }, $8796f90736e175cb$var$TOOLTIP_COOLDOWN);
    }
  };
  let warmupTooltip = () => {
    closeOpenTooltips();
    ensureTooltipEntry();
    if (
      !isOpen &&
      !$8796f90736e175cb$var$globalWarmUpTimeout &&
      !$8796f90736e175cb$var$globalWarmedUp
    )
      $8796f90736e175cb$var$globalWarmUpTimeout = setTimeout(() => {
        $8796f90736e175cb$var$globalWarmUpTimeout = null;
        $8796f90736e175cb$var$globalWarmedUp = true;
        showTooltip();
      }, delay);
    else if (!isOpen) showTooltip();
  };
  $1OhDq$useEffect(() => {
    return () => {
      clearTimeout(closeTimeout.current);
      let tooltip = $8796f90736e175cb$var$tooltips[id];
      if (tooltip) delete $8796f90736e175cb$var$tooltips[id];
    };
  }, [id]);
  return {
    isOpen,
    open: (immediate) => {
      if (!immediate && delay > 0 && !closeTimeout.current) warmupTooltip();
      else showTooltip();
    },
    close: hideTooltip,
  };
}

// ../node_modules/react-popper/lib/esm/utils.js
import * as React10 from "react";
var fromEntries = function fromEntries2(entries) {
  return entries.reduce(function (acc, _ref) {
    var key = _ref[0],
      value = _ref[1];
    acc[key] = value;
    return acc;
  }, {});
};
var useIsomorphicLayoutEffect =
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
    ? React10.useLayoutEffect
    : React10.useEffect;

// ../node_modules/react-popper/lib/esm/usePopper.js
import * as React11 from "react";
import * as ReactDOM from "react-dom";

// ../node_modules/@popperjs/core/lib/enums.js
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function (
  acc,
  placement
) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
},
[]);
var placements = /* @__PURE__ */ []
  .concat(basePlacements, [auto])
  .reduce(function (acc, placement) {
    return acc.concat([
      placement,
      placement + "-" + start,
      placement + "-" + end,
    ]);
  }, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [
  beforeRead,
  read,
  afterRead,
  beforeMain,
  main,
  afterMain,
  beforeWrite,
  write,
  afterWrite,
];

// ../node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}

// ../node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}

// ../node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

// ../node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0",
    },
    arrow: {
      position: "absolute",
    },
    reference: {},
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(
        state.styles.hasOwnProperty(name)
          ? state.styles[name]
          : initialStyles[name]
      );
      var style = styleProperties.reduce(function (style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles_default = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect,
  requires: ["computeStyles"],
};

// ../node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function getBasePlacement(placement) {
  return placement.split("-")[0];
}

// ../node_modules/@popperjs/core/lib/utils/math.js
var max = Math.max;
var min = Math.min;
var round = Math.round;

// ../node_modules/@popperjs/core/lib/utils/userAgent.js
function getUAString() {
  var uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands) {
    return uaData.brands
      .map(function (item) {
        return item.brand + "/" + item.version;
      })
      .join(" ");
  }
  return navigator.userAgent;
}

// ../node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}

// ../node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (includeScale && isHTMLElement(element)) {
    scaleX =
      element.offsetWidth > 0
        ? round(clientRect.width) / element.offsetWidth || 1
        : 1;
    scaleY =
      element.offsetHeight > 0
        ? round(clientRect.height) / element.offsetHeight || 1
        : 1;
  }
  var _ref = isElement(element) ? getWindow(element) : window,
    visualViewport = _ref.visualViewport;
  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x =
    (clientRect.left +
      (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) /
    scaleX;
  var y =
    (clientRect.top +
      (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) /
    scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width,
    height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x,
    y,
  };
}

// ../node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height,
  };
}

// ../node_modules/@popperjs/core/lib/dom-utils/contains.js
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}

// ../node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function getComputedStyle2(element) {
  return getWindow(element).getComputedStyle(element);
}

// ../node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}

// ../node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function getDocumentElement(element) {
  return (
    (isElement(element) ? element.ownerDocument : element.document) ||
    window.document
  ).documentElement;
}

// ../node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return (
    element.assignedSlot ||
    element.parentNode ||
    (isShadowRoot(element) ? element.host : null) ||
    getDocumentElement(element)
  );
}

// ../node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function getTrueOffsetParent(element) {
  if (
    !isHTMLElement(element) ||
    getComputedStyle2(element).position === "fixed"
  ) {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle2(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (
    isHTMLElement(currentNode) &&
    ["html", "body"].indexOf(getNodeName(currentNode)) < 0
  ) {
    var css16 = getComputedStyle2(currentNode);
    if (
      css16.transform !== "none" ||
      css16.perspective !== "none" ||
      css16.contain === "paint" ||
      ["transform", "perspective"].indexOf(css16.willChange) !== -1 ||
      (isFirefox && css16.willChange === "filter") ||
      (isFirefox && css16.filter && css16.filter !== "none")
    ) {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (
    offsetParent &&
    isTableElement(offsetParent) &&
    getComputedStyle2(offsetParent).position === "static"
  ) {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (
    offsetParent &&
    (getNodeName(offsetParent) === "html" ||
      (getNodeName(offsetParent) === "body" &&
        getComputedStyle2(offsetParent).position === "static"))
  ) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}

// ../node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}

// ../node_modules/@popperjs/core/lib/utils/within.js
function within(min2, value, max2) {
  return max(min2, min(value, max2));
}
function withinMaxClamp(min2, value, max2) {
  var v = within(min2, value, max2);
  return v > max2 ? max2 : v;
}

// ../node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
}

// ../node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}

// ../node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

// ../node_modules/@popperjs/core/lib/modifiers/arrow.js
var toPaddingObject = function toPaddingObject2(padding, state) {
  padding =
    typeof padding === "function"
      ? padding(
          Object.assign({}, state.rects, {
            placement: state.placement,
          })
        )
      : padding;
  return mergePaddingObject(
    typeof padding !== "number"
      ? padding
      : expandToHashMap(padding, basePlacements)
  );
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state,
    name = _ref.name,
    options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff =
    state.rects.reference[len] +
    state.rects.reference[axis] -
    popperOffsets2[axis] -
    state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent
    ? axis === "y"
      ? arrowOffsetParent.clientHeight || 0
      : arrowOffsetParent.clientWidth || 0
    : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state.modifiersData[name] =
    ((_state$modifiersData$ = {}),
    (_state$modifiersData$[axisProp] = offset2),
    (_state$modifiersData$.centerOffset = offset2 - center),
    _state$modifiersData$);
}
function effect2(_ref2) {
  var state = _ref2.state,
    options = _ref2.options;
  var _options$element = options.element,
    arrowElement =
      _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (false) {
    if (!isHTMLElement(arrowElement)) {
      console.error(
        [
          'Popper: "arrow" element must be an HTMLElement (not an SVGElement).',
          "To use an SVG arrow, wrap it in an HTMLElement that will be used as",
          "the arrow.",
        ].join(" ")
      );
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    if (false) {
      console.error(
        [
          'Popper: "arrow" modifier\'s `element` must be a child of the popper',
          "element.",
        ].join(" ")
      );
    }
    return;
  }
  state.elements.arrow = arrowElement;
}
var arrow_default = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect2,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"],
};

// ../node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(placement) {
  return placement.split("-")[1];
}

// ../node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto",
};
function roundOffsetsByDPR(_ref) {
  var x = _ref.x,
    y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0,
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper,
    popperRect = _ref2.popperRect,
    placement = _ref2.placement,
    variation = _ref2.variation,
    offsets = _ref2.offsets,
    position = _ref2.position,
    gpuAcceleration = _ref2.gpuAcceleration,
    adaptive = _ref2.adaptive,
    roundOffsets = _ref2.roundOffsets,
    isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x,
    x = _offsets$x === void 0 ? 0 : _offsets$x,
    _offsets$y = offsets.y,
    y = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 =
    typeof roundOffsets === "function"
      ? roundOffsets({
          x,
          y,
        })
      : {
          x,
          y,
        };
  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (
        getComputedStyle2(offsetParent).position !== "static" &&
        position === "absolute"
      ) {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (
      placement === top ||
      ((placement === left || placement === right) && variation === end)
    ) {
      sideY = bottom;
      var offsetY =
        isFixed && offsetParent === win && win.visualViewport
          ? win.visualViewport.height
          : offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (
      placement === left ||
      ((placement === top || placement === bottom) && variation === end)
    ) {
      sideX = right;
      var offsetX =
        isFixed && offsetParent === win && win.visualViewport
          ? win.visualViewport.width
          : offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign(
    {
      position,
    },
    adaptive && unsetSides
  );
  var _ref4 =
    roundOffsets === true
      ? roundOffsetsByDPR({
          x,
          y,
        })
      : {
          x,
          y,
        };
  x = _ref4.x;
  y = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign(
      {},
      commonStyles,
      ((_Object$assign = {}),
      (_Object$assign[sideY] = hasY ? "0" : ""),
      (_Object$assign[sideX] = hasX ? "0" : ""),
      (_Object$assign.transform =
        (win.devicePixelRatio || 1) <= 1
          ? "translate(" + x + "px, " + y + "px)"
          : "translate3d(" + x + "px, " + y + "px, 0)"),
      _Object$assign)
    );
  }
  return Object.assign(
    {},
    commonStyles,
    ((_Object$assign2 = {}),
    (_Object$assign2[sideY] = hasY ? y + "px" : ""),
    (_Object$assign2[sideX] = hasX ? x + "px" : ""),
    (_Object$assign2.transform = ""),
    _Object$assign2)
  );
}
function computeStyles(_ref5) {
  var state = _ref5.state,
    options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
    gpuAcceleration =
      _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
    _options$adaptive = options.adaptive,
    adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
    _options$roundOffsets = options.roundOffsets,
    roundOffsets =
      _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  if (false) {
    var transitionProperty =
      getComputedStyle2(state.elements.popper).transitionProperty || "";
    if (
      adaptive &&
      ["transform", "top", "right", "bottom", "left"].some(function (property) {
        return transitionProperty.indexOf(property) >= 0;
      })
    ) {
      console.warn(
        [
          "Popper: Detected CSS transitions on at least one of the following",
          'CSS properties: "transform", "top", "right", "bottom", "left".',
          "\n\n",
          'Disable the "computeStyles" modifier\'s `adaptive` option to allow',
          "for smooth transitions, or remove these properties from the CSS",
          "transition declaration on the popper element if only transitioning",
          "opacity or background-color for example.",
          "\n\n",
          "We recommend using the popper element as a wrapper around an inner",
          "element that can have any CSS property transitioned for animations.",
        ].join(" ")
      );
    }
  }
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed",
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign(
      {},
      state.styles.popper,
      mapToStyles(
        Object.assign({}, commonStyles, {
          offsets: state.modifiersData.popperOffsets,
          position: state.options.strategy,
          adaptive,
          roundOffsets,
        })
      )
    );
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign(
      {},
      state.styles.arrow,
      mapToStyles(
        Object.assign({}, commonStyles, {
          offsets: state.modifiersData.arrow,
          position: "absolute",
          adaptive: false,
          roundOffsets,
        })
      )
    );
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement,
  });
}
var computeStyles_default = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {},
};

// ../node_modules/@popperjs/core/lib/modifiers/eventListeners.js
var passive = {
  passive: true,
};
function effect3(_ref) {
  var state = _ref.state,
    instance = _ref.instance,
    options = _ref.options;
  var _options$scroll = options.scroll,
    scroll = _options$scroll === void 0 ? true : _options$scroll,
    _options$resize = options.resize,
    resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(
    state.scrollParents.reference,
    state.scrollParents.popper
  );
  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var eventListeners_default = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {},
  effect: effect3,
  data: {},
};

// ../node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
var hash = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom",
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

// ../node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var hash2 = {
  start: "end",
  end: "start",
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash2[matched];
  });
}

// ../node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop,
  };
}

// ../node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function getWindowScrollBarX(element) {
  return (
    getBoundingClientRect(getDocumentElement(element)).left +
    getWindowScroll(element).scrollLeft
  );
}

// ../node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function getViewportRect(element, strategy) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = isLayoutViewport();
    if (layoutViewport || (!layoutViewport && strategy === "fixed")) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x + getWindowScrollBarX(element),
    y,
  };
}

// ../node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body =
    (_element$ownerDocumen = element.ownerDocument) == null
      ? void 0
      : _element$ownerDocumen.body;
  var width = max(
    html.scrollWidth,
    html.clientWidth,
    body ? body.scrollWidth : 0,
    body ? body.clientWidth : 0
  );
  var height = max(
    html.scrollHeight,
    html.clientHeight,
    body ? body.scrollHeight : 0,
    body ? body.clientHeight : 0
  );
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;
  if (getComputedStyle2(body || html).direction === "rtl") {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x,
    y,
  };
}

// ../node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle2(element),
    overflow = _getComputedStyle.overflow,
    overflowX = _getComputedStyle.overflowX,
    overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

// ../node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}

// ../node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody =
    scrollParent ===
    ((_element$ownerDocumen = element.ownerDocument) == null
      ? void 0
      : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody
    ? [win].concat(
        win.visualViewport || [],
        isScrollParent(scrollParent) ? scrollParent : []
      )
    : scrollParent;
  var updatedList = list.concat(target);
  return isBody
    ? updatedList
    : updatedList.concat(listScrollParents(getParentNode(target)));
}

// ../node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height,
  });
}

// ../node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function getInnerBoundingClientRect(element, strategy) {
  var rect = getBoundingClientRect(element, false, strategy === "fixed");
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === viewport
    ? rectToClientRect(getViewportRect(element, strategy))
    : isElement(clippingParent)
    ? getInnerBoundingClientRect(clippingParent, strategy)
    : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping =
    ["absolute", "fixed"].indexOf(getComputedStyle2(element).position) >= 0;
  var clipperElement =
    canEscapeClipping && isHTMLElement(element)
      ? getOffsetParent(element)
      : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function (clippingParent) {
    return (
      isElement(clippingParent) &&
      contains(clippingParent, clipperElement) &&
      getNodeName(clippingParent) !== "body"
    );
  });
}
function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents =
    boundary === "clippingParents"
      ? getClippingParents(element)
      : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function (
    accRect,
    clippingParent
  ) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  },
  getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

// ../node_modules/@popperjs/core/lib/utils/computeOffsets.js
function computeOffsets(_ref) {
  var reference2 = _ref.reference,
    element = _ref.element,
    placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height,
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height,
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY,
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY,
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y,
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] =
          offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] =
          offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
      default:
    }
  }
  return offsets;
}

// ../node_modules/@popperjs/core/lib/utils/detectOverflow.js
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options,
    _options$placement = _options.placement,
    placement =
      _options$placement === void 0 ? state.placement : _options$placement,
    _options$strategy = _options.strategy,
    strategy =
      _options$strategy === void 0 ? state.strategy : _options$strategy,
    _options$boundary = _options.boundary,
    boundary =
      _options$boundary === void 0 ? clippingParents : _options$boundary,
    _options$rootBoundary = _options.rootBoundary,
    rootBoundary =
      _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
    _options$elementConte = _options.elementContext,
    elementContext =
      _options$elementConte === void 0 ? popper : _options$elementConte,
    _options$altBoundary = _options.altBoundary,
    altBoundary =
      _options$altBoundary === void 0 ? false : _options$altBoundary,
    _options$padding = _options.padding,
    padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(
    typeof padding !== "number"
      ? padding
      : expandToHashMap(padding, basePlacements)
  );
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(
    isElement(element)
      ? element
      : element.contextElement || getDocumentElement(state.elements.popper),
    boundary,
    rootBoundary,
    strategy
  );
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement,
  });
  var popperClientRect = rectToClientRect(
    Object.assign({}, popperRect, popperOffsets2)
  );
  var elementClientRect =
    elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom:
      elementClientRect.bottom -
      clippingClientRect.bottom +
      paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right:
      elementClientRect.right - clippingClientRect.right + paddingObject.right,
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}

// ../node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options,
    placement = _options.placement,
    boundary = _options.boundary,
    rootBoundary = _options.rootBoundary,
    padding = _options.padding,
    flipVariations = _options.flipVariations,
    _options$allowedAutoP = _options.allowedAutoPlacements,
    allowedAutoPlacements =
      _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements2 = variation
    ? flipVariations
      ? variationPlacements
      : variationPlacements.filter(function (placement2) {
          return getVariation(placement2) === variation;
        })
    : basePlacements;
  var allowedPlacements = placements2.filter(function (placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements2;
    if (false) {
      console.error(
        [
          "Popper: The `allowedAutoPlacements` option did not allow any",
          "placements. Ensure the `placement` option matches the variation",
          "of the allowed placements.",
          'For example, "auto" cannot be used to allow "bottom-start".',
          'Use "auto-start" instead.',
        ].join(" ")
      );
    }
  }
  var overflows = allowedPlacements.reduce(function (acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

// ../node_modules/@popperjs/core/lib/modifiers/flip.js
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [
    getOppositeVariationPlacement(placement),
    oppositePlacement,
    getOppositeVariationPlacement(oppositePlacement),
  ];
}
function flip(_ref) {
  var state = _ref.state,
    options = _ref.options,
    name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis,
    checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
    _options$altAxis = options.altAxis,
    checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
    specifiedFallbackPlacements = options.fallbackPlacements,
    padding = options.padding,
    boundary = options.boundary,
    rootBoundary = options.rootBoundary,
    altBoundary = options.altBoundary,
    _options$flipVariatio = options.flipVariations,
    flipVariations =
      _options$flipVariatio === void 0 ? true : _options$flipVariatio,
    allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements =
    specifiedFallbackPlacements ||
    (isBasePlacement || !flipVariations
      ? [getOppositePlacement(preferredPlacement)]
      : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement]
    .concat(fallbackPlacements)
    .reduce(function (acc, placement2) {
      return acc.concat(
        getBasePlacement(placement2) === auto
          ? computeAutoPlacement(state, {
              placement: placement2,
              boundary,
              rootBoundary,
              padding,
              flipVariations,
              allowedAutoPlacements,
            })
          : placement2
      );
    }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = /* @__PURE__ */ new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0; i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding,
    });
    var mainVariationSide = isVertical
      ? isStartVariation
        ? right
        : left
      : isStartVariation
      ? bottom
      : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(
        overflow[mainVariationSide] <= 0,
        overflow[altVariationSide] <= 0
      );
    }
    if (
      checks.every(function (check) {
        return check;
      })
    ) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function (placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function (check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break") break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
var flip_default = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false,
  },
};

// ../node_modules/@popperjs/core/lib/modifiers/hide.js
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0,
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x,
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function (side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state,
    name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference",
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true,
  });
  var referenceClippingOffsets = getSideOffsets(
    referenceOverflow,
    referenceRect
  );
  var popperEscapeOffsets = getSideOffsets(
    popperAltOverflow,
    popperRect,
    preventedOffsets
  );
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped,
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped,
  });
}
var hide_default = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide,
};

// ../node_modules/@popperjs/core/lib/modifiers/offset.js
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref =
      typeof offset2 === "function"
        ? offset2(
            Object.assign({}, rects, {
              placement,
            })
          )
        : offset2,
    skidding = _ref[0],
    distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0
    ? {
        x: distance,
        y: skidding,
      }
    : {
        x: skidding,
        y: distance,
      };
}
function offset(_ref2) {
  var state = _ref2.state,
    options = _ref2.options,
    name = _ref2.name;
  var _options$offset = options.offset,
    offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
    x = _data$state$placement.x,
    y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name] = data;
}
var offset_default = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset,
};

// ../node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function popperOffsets(_ref) {
  var state = _ref.state,
    name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement,
  });
}
var popperOffsets_default = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {},
};

// ../node_modules/@popperjs/core/lib/utils/getAltAxis.js
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}

// ../node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function preventOverflow(_ref) {
  var state = _ref.state,
    options = _ref.options,
    name = _ref.name;
  var _options$mainAxis = options.mainAxis,
    checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
    _options$altAxis = options.altAxis,
    checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
    boundary = options.boundary,
    rootBoundary = options.rootBoundary,
    altBoundary = options.altBoundary,
    padding = options.padding,
    _options$tether = options.tether,
    tether = _options$tether === void 0 ? true : _options$tether,
    _options$tetherOffset = options.tetherOffset,
    tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding,
    altBoundary,
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue =
    typeof tetherOffset === "function"
      ? tetherOffset(
          Object.assign({}, state.rects, {
            placement: state.placement,
          })
        )
      : tetherOffset;
  var normalizedTetherOffsetValue =
    typeof tetherOffsetValue === "number"
      ? {
          mainAxis: tetherOffsetValue,
          altAxis: tetherOffsetValue,
        }
      : Object.assign(
          {
            mainAxis: 0,
            altAxis: 0,
          },
          tetherOffsetValue
        );
  var offsetModifierState = state.modifiersData.offset
    ? state.modifiersData.offset[state.placement]
    : null;
  var data = {
    x: 0,
    y: 0,
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min2 = offset2 + overflow[mainSide];
    var max2 = offset2 - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect =
      tether && arrowElement
        ? getLayoutRect(arrowElement)
        : {
            width: 0,
            height: 0,
          };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"]
      ? state.modifiersData["arrow#persistent"].padding
      : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement
      ? referenceRect[len] / 2 -
        additive -
        arrowLen -
        arrowPaddingMin -
        normalizedTetherOffsetValue.mainAxis
      : minLen -
        arrowLen -
        arrowPaddingMin -
        normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement
      ? -referenceRect[len] / 2 +
        additive +
        arrowLen +
        arrowPaddingMax +
        normalizedTetherOffsetValue.mainAxis
      : maxLen +
        arrowLen +
        arrowPaddingMax +
        normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent =
      state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent
      ? mainAxis === "y"
        ? arrowOffsetParent.clientTop || 0
        : arrowOffsetParent.clientLeft || 0
      : 0;
    var offsetModifierValue =
      (_offsetModifierState$ =
        offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) !=
      null
        ? _offsetModifierState$
        : 0;
    var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset2 + maxOffset - offsetModifierValue;
    var preventedOffset = within(
      tether ? min(min2, tetherMin) : min2,
      offset2,
      tether ? max(max2, tetherMax) : max2
    );
    popperOffsets2[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset2;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === "x" ? top : left;
    var _altSide = mainAxis === "x" ? bottom : right;
    var _offset = popperOffsets2[altAxis];
    var _len = altAxis === "y" ? "height" : "width";
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue =
      (_offsetModifierState$2 =
        offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) !=
      null
        ? _offsetModifierState$2
        : 0;
    var _tetherMin = isOriginSide
      ? _min
      : _offset -
        referenceRect[_len] -
        popperRect[_len] -
        _offsetModifierValue +
        normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide
      ? _offset +
        referenceRect[_len] +
        popperRect[_len] -
        _offsetModifierValue -
        normalizedTetherOffsetValue.altAxis
      : _max;
    var _preventedOffset =
      tether && isOriginSide
        ? withinMaxClamp(_tetherMin, _offset, _tetherMax)
        : within(
            tether ? _tetherMin : _min,
            _offset,
            tether ? _tetherMax : _max
          );
    popperOffsets2[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name] = data;
}
var preventOverflow_default = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"],
};

// ../node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop,
  };
}

// ../node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

// ../node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled =
    isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(
    elementOrVirtualElement,
    offsetParentIsScaled,
    isFixed
  );
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0,
  };
  var offsets = {
    x: 0,
    y: 0,
  };
  if (isOffsetParentAnElement || (!isOffsetParentAnElement && !isFixed)) {
    if (
      getNodeName(offsetParent) !== "body" ||
      isScrollParent(documentElement)
    ) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height,
  };
}

// ../node_modules/@popperjs/core/lib/utils/orderModifiers.js
function order(modifiers) {
  var map = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(
      modifier.requires || [],
      modifier.requiresIfExists || []
    );
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function (acc, phase) {
    return acc.concat(
      orderedModifiers.filter(function (modifier) {
        return modifier.phase === phase;
      })
    );
  }, []);
}

// ../node_modules/@popperjs/core/lib/utils/debounce.js
function debounce(fn2) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}

// ../node_modules/@popperjs/core/lib/utils/mergeByName.js
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing
      ? Object.assign({}, existing, current, {
          options: Object.assign({}, existing.options, current.options),
          data: Object.assign({}, existing.data, current.data),
        })
      : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

// ../node_modules/@popperjs/core/lib/createPopper.js
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute",
};
function areValidElements() {
  for (
    var _len = arguments.length, args = new Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    args[_key] = arguments[_key];
  }
  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions,
    _generatorOptions$def = _generatorOptions.defaultModifiers,
    defaultModifiers2 =
      _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
    _generatorOptions$def2 = _generatorOptions.defaultOptions,
    defaultOptions =
      _generatorOptions$def2 === void 0
        ? DEFAULT_OPTIONS
        : _generatorOptions$def2;
  return function createPopper2(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2,
      },
      attributes: {},
      styles: {},
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 =
          typeof setOptionsAction === "function"
            ? setOptionsAction(state.options)
            : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign(
          {},
          defaultOptions,
          state.options,
          options2
        );
        state.scrollParents = {
          reference: isElement(reference2)
            ? listScrollParents(reference2)
            : reference2.contextElement
            ? listScrollParents(reference2.contextElement)
            : [],
          popper: listScrollParents(popper2),
        };
        var orderedModifiers = orderModifiers(
          mergeByName([].concat(defaultModifiers2, state.options.modifiers))
        );
        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        });
        if (false) {
          var modifiers = uniqueBy(
            [].concat(orderedModifiers, state.options.modifiers),
            function (_ref) {
              var name = _ref.name;
              return name;
            }
          );
          validateModifiers(modifiers);
          if (getBasePlacement(state.options.placement) === auto) {
            var flipModifier = state.orderedModifiers.find(function (_ref2) {
              var name = _ref2.name;
              return name === "flip";
            });
            if (!flipModifier) {
              console.error(
                [
                  'Popper: "auto" placements require the "flip" modifier be',
                  "present and enabled to work.",
                ].join(" ")
              );
            }
          }
          var _getComputedStyle = getComputedStyle2(popper2),
            marginTop = _getComputedStyle.marginTop,
            marginRight = _getComputedStyle.marginRight,
            marginBottom = _getComputedStyle.marginBottom,
            marginLeft = _getComputedStyle.marginLeft;
          if (
            [marginTop, marginRight, marginBottom, marginLeft].some(function (
              margin
            ) {
              return parseFloat(margin);
            })
          ) {
            console.warn(
              [
                'Popper: CSS "margin" styles cannot be used to apply padding',
                "between the popper and its reference element or boundary.",
                "To replicate margin, use the `offset` modifier, as well as",
                "the `padding` option in the `preventOverflow` and `flip`",
                "modifiers.",
              ].join(" ")
            );
          }
        }
        runModifierEffects();
        return instance.update();
      },
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements,
          reference3 = _state$elements.reference,
          popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          if (false) {
            console.error(INVALID_ELEMENT_ERROR);
          }
          return;
        }
        state.rects = {
          reference: getCompositeRect(
            reference3,
            getOffsetParent(popper3),
            state.options.strategy === "fixed"
          ),
          popper: getLayoutRect(popper3),
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function (modifier) {
          return (state.modifiersData[modifier.name] = Object.assign(
            {},
            modifier.data
          ));
        });
        var __debug_loops__ = 0;
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (false) {
            __debug_loops__ += 1;
            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index],
            fn2 = _state$orderedModifie.fn,
            _state$orderedModifie2 = _state$orderedModifie.options,
            _options =
              _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
            name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state =
              fn2({
                state,
                options: _options,
                name,
                instance,
              }) || state;
          }
        }
      },
      update: debounce(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      },
    };
    if (!areValidElements(reference2, popper2)) {
      if (false) {
        console.error(INVALID_ELEMENT_ERROR);
      }
      return instance;
    }
    instance.setOptions(options).then(function (state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
          _ref3$options = _ref3.options,
          options2 = _ref3$options === void 0 ? {} : _ref3$options,
          effect4 = _ref3.effect;
        if (typeof effect4 === "function") {
          var cleanupFn = effect4({
            state,
            name,
            instance,
            options: options2,
          });
          var noopFn = function noopFn2() {};
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}

// ../node_modules/@popperjs/core/lib/popper.js
var defaultModifiers = [
  eventListeners_default,
  popperOffsets_default,
  computeStyles_default,
  applyStyles_default,
  offset_default,
  flip_default,
  preventOverflow_default,
  arrow_default,
  hide_default,
];
var createPopper = /* @__PURE__ */ popperGenerator({
  defaultModifiers,
});

// ../node_modules/react-popper/lib/esm/usePopper.js
var import_react_fast_compare = __toESM(require_react_fast_compare());
var EMPTY_MODIFIERS = [];
var usePopper = function usePopper2(referenceElement, popperElement, options) {
  if (options === void 0) {
    options = {};
  }
  var prevOptions = React11.useRef(null);
  var optionsWithDefaults = {
    onFirstUpdate: options.onFirstUpdate,
    placement: options.placement || "bottom",
    strategy: options.strategy || "absolute",
    modifiers: options.modifiers || EMPTY_MODIFIERS,
  };
  var _React$useState = React11.useState({
      styles: {
        popper: {
          position: optionsWithDefaults.strategy,
          left: "0",
          top: "0",
        },
        arrow: {
          position: "absolute",
        },
      },
      attributes: {},
    }),
    state = _React$useState[0],
    setState = _React$useState[1];
  var updateStateModifier = React11.useMemo(function () {
    return {
      name: "updateState",
      enabled: true,
      phase: "write",
      fn: function fn2(_ref) {
        var state2 = _ref.state;
        var elements = Object.keys(state2.elements);
        ReactDOM.flushSync(function () {
          setState({
            styles: fromEntries(
              elements.map(function (element) {
                return [element, state2.styles[element] || {}];
              })
            ),
            attributes: fromEntries(
              elements.map(function (element) {
                return [element, state2.attributes[element]];
              })
            ),
          });
        });
      },
      requires: ["computeStyles"],
    };
  }, []);
  var popperOptions = React11.useMemo(
    function () {
      var newOptions = {
        onFirstUpdate: optionsWithDefaults.onFirstUpdate,
        placement: optionsWithDefaults.placement,
        strategy: optionsWithDefaults.strategy,
        modifiers: [].concat(optionsWithDefaults.modifiers, [
          updateStateModifier,
          {
            name: "applyStyles",
            enabled: false,
          },
        ]),
      };
      if (
        (0, import_react_fast_compare.default)(prevOptions.current, newOptions)
      ) {
        return prevOptions.current || newOptions;
      } else {
        prevOptions.current = newOptions;
        return newOptions;
      }
    },
    [
      optionsWithDefaults.onFirstUpdate,
      optionsWithDefaults.placement,
      optionsWithDefaults.strategy,
      optionsWithDefaults.modifiers,
      updateStateModifier,
    ]
  );
  var popperInstanceRef = React11.useRef();
  useIsomorphicLayoutEffect(
    function () {
      if (popperInstanceRef.current) {
        popperInstanceRef.current.setOptions(popperOptions);
      }
    },
    [popperOptions]
  );
  useIsomorphicLayoutEffect(
    function () {
      if (referenceElement == null || popperElement == null) {
        return;
      }
      var createPopper2 = options.createPopper || createPopper;
      var popperInstance = createPopper2(
        referenceElement,
        popperElement,
        popperOptions
      );
      popperInstanceRef.current = popperInstance;
      return function () {
        popperInstance.destroy();
        popperInstanceRef.current = null;
      };
    },
    [referenceElement, popperElement, options.createPopper]
  );
  return {
    state: popperInstanceRef.current ? popperInstanceRef.current.state : null,
    styles: state.styles,
    attributes: state.attributes,
    update: popperInstanceRef.current ? popperInstanceRef.current.update : null,
    forceUpdate: popperInstanceRef.current
      ? popperInstanceRef.current.forceUpdate
      : null,
  };
};

// ../node_modules/@reach/portal/dist/reach-portal.esm.js
import {
  useRef as useRef2,
  useEffect as useEffect3,
  createElement,
} from "react";

// ../node_modules/@reach/portal/node_modules/@reach/utils/use-isomorphic-layout-effect/dist/reach-utils-use-isomorphic-layout-effect.esm.js
import {
  useLayoutEffect as useLayoutEffect2,
  useEffect as useEffect2,
} from "react";

// ../node_modules/@reach/portal/node_modules/@reach/utils/can-use-dom/dist/reach-utils-can-use-dom.esm.js
function canUseDOM() {
  return !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  );
}

// ../node_modules/@reach/portal/node_modules/@reach/utils/use-isomorphic-layout-effect/dist/reach-utils-use-isomorphic-layout-effect.esm.js
var useIsomorphicLayoutEffect2 = /* @__PURE__ */ canUseDOM()
  ? useLayoutEffect2
  : useEffect2;

// ../node_modules/@reach/portal/node_modules/@reach/utils/use-force-update/dist/reach-utils-use-force-update.esm.js
import { useState as useState4, useCallback } from "react";
function useForceUpdate() {
  var _useState = useState4(/* @__PURE__ */ Object.create(null)),
    dispatch = _useState[1];
  return useCallback(function () {
    dispatch(/* @__PURE__ */ Object.create(null));
  }, []);
}

// ../node_modules/@reach/portal/dist/reach-portal.esm.js
import { createPortal } from "react-dom";
var Portal = function Portal2(_ref) {
  var children = _ref.children,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? "reach-portal" : _ref$type,
    containerRef = _ref.containerRef;
  var mountNode = useRef2(null);
  var portalNode = useRef2(null);
  var forceUpdate = useForceUpdate();
  if (false) {
    useEffect3(
      function () {
        if (containerRef != null) {
          false
            ? tiny_warning_esm_default(
                typeof containerRef === "object" && "current" in containerRef,
                "@reach/portal: Invalid value passed to the `containerRef` of a `Portal`. The portal will be appended to the document body, but if you want to attach it to another DOM node you must pass a valid React ref object to `containerRef`."
              )
            : void 0;
          false
            ? tiny_warning_esm_default(
                containerRef ? containerRef.current != null : true,
                "@reach/portal: A ref was passed to the `containerRef` prop of a `Portal`, but no DOM node was attached to it. Be sure to pass the ref to a DOM component.\n\nIf you are forwarding the ref from another component, be sure to use the React.forwardRef API. See https://reactjs.org/docs/forwarding-refs.html."
              )
            : void 0;
        }
      },
      [containerRef]
    );
  }
  useIsomorphicLayoutEffect2(
    function () {
      if (!mountNode.current) return;
      var ownerDocument = mountNode.current.ownerDocument;
      var body =
        (containerRef == null ? void 0 : containerRef.current) ||
        ownerDocument.body;
      portalNode.current =
        ownerDocument == null ? void 0 : ownerDocument.createElement(type);
      body.appendChild(portalNode.current);
      forceUpdate();
      return function () {
        if (portalNode.current && body) {
          body.removeChild(portalNode.current);
        }
      };
    },
    [type, forceUpdate, containerRef]
  );
  return portalNode.current
    ? /* @__PURE__ */ createPortal(children, portalNode.current)
    : /* @__PURE__ */ createElement("span", {
        ref: mountNode,
      });
};
if (false) {
  Portal.displayName = "Portal";
}
var reach_portal_esm_default = Portal;

// hooks/useRefState.ts
import {
  useCallback as useCallback2,
  useRef as useRef3,
  useState as useState5,
} from "react";
function useRefState() {
  const [, setValue] = useState5(null);
  const ref = useRef3(null);
  const combinedRef = useCallback2((next) => {
    ref.current = next;
    setValue(next);
  }, []);
  return [ref, combinedRef];
}

// rui/Tooltip.tsx
import {
  Fragment as Fragment2,
  jsx as jsx16,
  jsxs as jsxs7,
} from "@emotion/react/jsx-runtime";
var tooltipCss = css9({
  maxWidth: 240,
  pointerEvents: "none",
  fontFamily: tokens.fontFamilyDefault,
});
var tooltipContentCss = css9([
  {
    border: `1px solid ${tokens.outlineDimmer}`,
    borderRadius: tokens.borderRadius8,
    backgroundColor: tokens.backgroundHighest,
  },
  rcss.p(8),
  rcss.shadow(1),
]);
var arrowCss = css9({
  display: "block",
  pointerEvents: "none",
  "&::after": {
    content: '""',
    display: "block",
    border: `1px solid ${tokens.outlineDimmer}`,
    borderTopLeftRadius: tokens.borderRadius4,
    background: tokens.backgroundHighest,
    width: 12,
    height: 12,
    clipPath: "polygon(0 0, 100% 0, 0 100%)",
  },
  '[data-popper-placement^="top"] > &': {
    bottom: -6,
    "&::after": {
      transform: "rotate(225deg)",
    },
  },
  '[data-popper-placement^="right"] > &': {
    left: -6,
    "&::after": {
      transform: "rotate(315deg)",
    },
  },
  '[data-popper-placement^="bottom"] > &': {
    top: -6,
    "&::after": {
      transform: "rotate(45deg)",
    },
  },
  '[data-popper-placement^="left"] > &': {
    right: -6,
    "&::after": {
      transform: "rotate(135deg)",
    },
  },
});
var SpanView2 = SpecializedView("span");
function TargetedTooltip({
  placement,
  state,
  strategy,
  target: referenceElt,
  tooltip,
  tooltipProps: passedTooltipProps,
  zIndex,
  borderColor,
  backgroundColor,
}) {
  const [popperElt, setPopperElt] = useState6(null);
  const [arrowElt, setArrowElt] = useState6(null);
  const { styles: styles2, attributes } = usePopper(referenceElt, popperElt, {
    modifiers: [
      { name: "arrow", options: { element: arrowElt, padding: 8 } },
      { name: "offset", options: { offset: [0, 16] } },
    ],
    strategy,
    placement,
  });
  const { tooltipProps } = useTooltip(passedTooltipProps, state);
  if (typeof window === "undefined") {
    return null;
  }
  return /* @__PURE__ */ jsx16(reach_portal_esm_default, {
    children: /* @__PURE__ */ jsxs7(
      SpanView2,
      __spreadProps(
        __spreadValues(
          {},
          mergeProps(
            {
              ref: setPopperElt,
              style: styles2.popper,
              css: [tooltipCss, { zIndex }],
            },
            attributes.popper || {},
            tooltipProps
          )
        ),
        {
          children: [
            /* @__PURE__ */ jsx16(SpanView2, {
              css: [tooltipContentCss, { borderColor, backgroundColor }],
              children: tooltip,
            }),
            /* @__PURE__ */ jsx16("span", {
              ref: setArrowElt,
              style: styles2.arrow,
              css: [
                arrowCss,
                borderColor && {
                  "&::after": {
                    borderColor,
                  },
                },
                backgroundColor && { "&::after": { backgroundColor } },
              ],
            }),
          ],
        }
      )
    ),
  });
}
function Tooltip({
  children,
  defaultOpen,
  delay = 600,
  isDisabled,
  isOpen,
  onOpenChange,
  placement,
  strategy,
  tooltip,
  zIndex = ModalZIndex,
  borderColor = tokens.outlineDimmer,
  backgroundColor,
}) {
  const [ref, setRef] = useRefState();
  const tooltipTriggerOptions = {
    defaultOpen,
    delay,
    isDisabled,
    isOpen,
    onOpenChange,
  };
  const state = $8796f90736e175cb$export$4d40659c25ecb50b(
    tooltipTriggerOptions
  );
  const { triggerProps, tooltipProps } = useTooltipTrigger(
    tooltipTriggerOptions,
    state,
    ref
  );
  return /* @__PURE__ */ jsxs7(Fragment2, {
    children: [
      typeof children === "function"
        ? children(triggerProps, setRef)
        : /* @__PURE__ */ jsx16(
            SpanView2,
            __spreadProps(
              __spreadValues({}, mergeProps({ ref: setRef }, triggerProps)),
              {
                children,
              }
            )
          ),
      state.isOpen
        ? /* @__PURE__ */ jsx16(TargetedTooltip, {
            placement,
            state,
            strategy,
            target: ref.current,
            tooltip,
            tooltipProps,
            zIndex,
            borderColor,
            backgroundColor,
          })
        : null,
    ],
  });
}

// lib/mergeRefs.ts
function mergeRefs(...refs) {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref) {
        ref.current = value;
      }
    });
  };
}

// rui/IconButton.tsx
import { jsx as jsx17, jsxs as jsxs8 } from "@emotion/react/jsx-runtime";
var IconSizeMap = {
  18: 16,
  24: 16,
  28: 20,
  32: 24,
  36: 24,
  40: 24,
};
var buttonReset3 = css10({
  border: "none",
  background: "transparent",
  color: "inherit",
  font: "inherit",
  lineHeight: "normal",
});
var ButtonView2 = SpecializedView("button");
function IconButtonInner(_a) {
  var _b = _a,
    {
      alt,
      children,
      colorway,
      disabled,
      innerRef,
      onClick,
      size = 24,
      triggerProps,
      type,
      suffix,
    } = _b,
    props = __objRest(_b, [
      "alt",
      "children",
      "colorway",
      "disabled",
      "innerRef",
      "onClick",
      "size",
      "triggerProps",
      "type",
      "suffix",
    ]);
  const tooltipRef = React12.useRef(null);
  const { buttonProps } = useButton(
    {
      isDisabled: disabled,
      onPress: onClick,
      type,
      "aria-label": alt,
    },
    tooltipRef
  );
  return /* @__PURE__ */ jsxs8(
    ButtonView2,
    __spreadProps(
      __spreadValues(
        {},
        mergeProps2(
          {
            ref: mergeRefs(tooltipRef, innerRef),
            css: [
              buttonReset3,
              disabled && { color: tokens.foregroundDimmest },
              interactive.listItem,
              rcss.borderRadius(8),
              rcss.center,
              { width: size, height: size },
              colorway && nofill(colorway),
            ],
          },
          props,
          triggerProps,
          buttonProps
        )
      ),
      {
        children: [
          React12.cloneElement(children, { size: IconSizeMap[size] }),
          suffix,
        ],
      }
    )
  );
}
var IconButton = React12.forwardRef((_a, viewRef) => {
  var _b = _a,
    {
      alt,
      tooltipDelay,
      tooltipHidden,
      tooltipPlacement,
      tooltipText,
      tooltipZIndex,
      innerRef,
    } = _b,
    props = __objRest(_b, [
      "alt",
      "tooltipDelay",
      "tooltipHidden",
      "tooltipPlacement",
      "tooltipText",
      "tooltipZIndex",
      "innerRef",
    ]);
  return /* @__PURE__ */ jsx17(View, {
    innerRef: viewRef,
    children: /* @__PURE__ */ jsx17(Tooltip, {
      delay: tooltipDelay,
      isDisabled: tooltipHidden,
      tooltip: tooltipText != null ? tooltipText : alt,
      placement: tooltipPlacement,
      zIndex: tooltipZIndex,
      children: (triggerProps, ref) => {
        return /* @__PURE__ */ jsx17(
          IconButtonInner,
          __spreadValues(
            {
              alt,
              innerRef: mergeRefs(ref, innerRef),
              triggerProps,
            },
            props
          )
        );
      },
    }),
  });
});
var IconButton_default = IconButton;

// rui/Surface.tsx
import * as React13 from "react";
import { jsx as jsx18 } from "@emotion/react/jsx-runtime";
var Elevation = React13.createContext(0);
function Surface(_a) {
  var _b = _a,
    { elevated, background } = _b,
    props = __objRest(_b, ["elevated", "background"]);
  let elevation = React13.useContext(Elevation);
  if (!background) {
    const backgrounds = Object.keys(styles);
    if (elevated && elevation < backgrounds.length - 1) {
      elevation++;
    }
    background = backgrounds[elevation];
  }
  return /* @__PURE__ */ jsx18(Elevation.Provider, {
    value: elevation,
    children: /* @__PURE__ */ jsx18(
      View,
      __spreadValues(
        {
          css: styles[background],
        },
        props
      )
    ),
  });
}
var styles = {
  root: {
    backgroundColor: tokens.backgroundRoot,
    [interactiveTokens.interactiveBackground]: tokens.backgroundDefault,
    [interactiveTokens.interactiveBackgroundActive]: tokens.backgroundHigher,
    [interactiveTokens.interactiveBorder]: tokens.outlineDimmest,
    [interactiveTokens.interactiveBorderHover]: tokens.outlineDefault,
  },
  default: {
    backgroundColor: tokens.backgroundDefault,
    [interactiveTokens.interactiveBackground]: tokens.backgroundHigher,
    [interactiveTokens.interactiveBackgroundActive]: tokens.backgroundHighest,
    [interactiveTokens.interactiveBorder]: tokens.outlineDimmest,
    [interactiveTokens.interactiveBorderHover]: tokens.outlineDefault,
  },
  higher: {
    backgroundColor: tokens.backgroundHigher,
    [interactiveTokens.interactiveBackground]: tokens.backgroundHighest,
    [interactiveTokens.interactiveBackgroundActive]: tokens.outlineDimmer,
    [interactiveTokens.interactiveBorder]: tokens.outlineDimmer,
    [interactiveTokens.interactiveBorderHover]: tokens.outlineDefault,
  },
  highest: {
    backgroundColor: tokens.backgroundHighest,
    [interactiveTokens.interactiveBackground]: tokens.outlineDimmest,
    [interactiveTokens.interactiveBackgroundActive]: tokens.outlineDimmer,
    [interactiveTokens.interactiveBorder]: tokens.outlineDimmer,
    [interactiveTokens.interactiveBorderHover]: tokens.outlineDefault,
  },
};

// rui/InlineCode.tsx
import { jsx as jsx19 } from "@emotion/react/jsx-runtime";
function InlineCode({ className, children }) {
  return /* @__PURE__ */ jsx19(Surface, {
    elevated: true,
    tag: "span",
    css: [
      {
        display: "inline",
        lineHeight: 1,
      },
      rcss.fontSize(tokens.fontSizeSmall),
      rcss.borderRadius(4),
      rcss.px(4),
      rcss.font.code,
      className,
    ],
    children,
  });
}

// rui/LoadingStyle.tsx
var LoadingStyle_exports = {};
__export(LoadingStyle_exports, {
  loadingStyle: () => loadingStyle,
});
import { keyframes as keyframes2, css as css11 } from "@emotion/react";
var moveGradient = keyframes2(`
  0% {background-position-x: 0%}
  100% {background-position-x: 100%}
`);
var loadingStyle = {
  backgroundPulse: (lowPulse, highPulse) => {
    const lowExists = typeof lowPulse !== "undefined";
    const highExists = typeof highPulse !== "undefined";
    return css11({
      background: `linear-gradient(90deg, ${
        lowExists ? lowPulse : tokens.outlineDimmest
      }, ${highExists ? highPulse : interactiveVars.interactiveBackground}, ${
        lowExists ? lowPulse : tokens.outlineDimmest
      }, ${highExists ? highPulse : interactiveVars.interactiveBackground})`,
      backgroundSize: "300% 100%",
      backgroundPositionX: "0%",
      animation: `${moveGradient} 2s linear infinite`,
    });
  },
  foregroundPulse: (lowPulse, highPulse) => {
    const lowExists = typeof lowPulse !== "undefined";
    const highExists = typeof highPulse !== "undefined";
    return css11({
      position: "relative",
      overflow: "hidden",
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        content: '""',
        opacity: "50%",
        pointerEvents: "none",
        width: "100%",
        height: "100%",
        background: `linear-gradient(90deg, ${
          lowExists ? lowPulse : tokens.outlineDefault
        }, ${highExists ? highPulse : tokens.backgroundRoot}, ${
          lowExists ? lowPulse : tokens.outlineDefault
        }, ${highExists ? highPulse : tokens.backgroundRoot})`,
        backgroundSize: "300% 100%",
        backgroundPositionX: "0%",
        animation: `${moveGradient} 2s linear infinite`,
      },
    });
  },
};

// rui/MeasureBar.tsx
import { keyframes as keyframes3 } from "@emotion/react";

// hooks/usePrefersReducedMotion.ts
import * as React14 from "react";
var QUERY = "(prefers-reduced-motion: no-preference)";
var getInitialState = () =>
  typeof window === "undefined" ? true : !window.matchMedia(QUERY).matches;
function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] =
    React14.useState(getInitialState);
  React14.useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);
    const listener = (event) => {
      setPrefersReducedMotion(!event.matches);
    };
    if (!(mediaQueryList == null ? void 0 : mediaQueryList.addEventListener)) {
      return;
    }
    mediaQueryList.addEventListener("change", listener);
    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, []);
  return prefersReducedMotion;
}

// rui/MeasureBar.tsx
import { jsx as jsx20, jsxs as jsxs9 } from "@emotion/react/jsx-runtime";
var shakeAnim = keyframes3(`
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -1px) rotate(-1deg); }
  20% { transform: translate(-1px, 0px) rotate(1deg); }
  30% { transform: translate(1px, 1px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 1px) rotate(-1deg); }
  60% { transform: translate(-1px, 1px) rotate(0deg); }
  70% { transform: translate(1px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 1px) rotate(0deg); }
  100% { transform: translate(1px, -1px) rotate(-1deg); }`);
function MeasureBar({
  total,
  current,
  disabled = false,
  color = tokens.accentPrimaryDefault,
  className,
  shake,
  smoke,
  tooltip,
}) {
  const valueMeasured = tooltip
    ? tooltip
    : (current !== void 0 ? current : "0") + "/" + total;
  let definedCurrent = 0;
  if (current !== void 0) {
    definedCurrent = current;
  }
  const widthPercent =
    total !== 0 ? Math.floor((definedCurrent / total) * 100) : 0;
  const allowAnimation = !usePrefersReducedMotion();
  return /* @__PURE__ */ jsxs9(View, {
    css: [
      rcss.height(tokens.space12),
      rcss.borderRadius(tokens.borderRadiusRound),
      interactive.filledAndOutlined,
      ...(allowAnimation && shake
        ? [
            {
              animation: `${shakeAnim} 0.2s ease infinite`,
            },
          ]
        : []),
    ],
    className,
    "data-microtip-position": "top",
    "aria-label": valueMeasured,
    role: "tooltip",
    children: [
      current !== void 0 &&
        /* @__PURE__ */ jsx20(View, {
          css: {
            width: widthPercent + "%",
            height: "100%",
            backgroundColor: disabled ? tokens.outlineDefault : color,
            borderRadius: tokens.borderRadiusRound,
          },
        }),
      !!(allowAnimation && smoke) &&
        /* @__PURE__ */ jsx20("img", {
          src: "/public/images/smoke.gif",
          css: {
            height: "500%",
            width: "150%",
            position: "absolute",
            left: "50%",
            top: "100%",
            opacity: smoke ? 0.4 : 0,
            transition: "1s opacity",
            transform: "translate(-50%, -100%)",
          },
        }),
    ],
  });
}

// rui/Menu.tsx
import { useRef as useRef5, useEffect as useEffect5 } from "react";
import { css as css12 } from "@emotion/react";
import { useMenu, useMenuItem } from "@react-aria/menu";
import { mergeProps as mergeProps3 } from "@react-aria/utils";

// ../node_modules/@react-stately/tree/dist/module.js
import {
  useMemo as $1OoTj$useMemo,
  useEffect as $1OoTj$useEffect,
} from "react";

// ../node_modules/@react-stately/selection/dist/module.js
import {
  useRef as $Qsto2$useRef,
  useState as $Qsto2$useState,
  useMemo as $Qsto2$useMemo,
  useEffect as $Qsto2$useEffect,
} from "react";
var $e40ea825a81a3709$export$52baac22726c72bf = class extends Set {
  constructor(keys, anchorKey, currentKey) {
    super(keys);
    if (keys instanceof $e40ea825a81a3709$export$52baac22726c72bf) {
      this.anchorKey = anchorKey || keys.anchorKey;
      this.currentKey = currentKey || keys.currentKey;
    } else {
      this.anchorKey = anchorKey;
      this.currentKey = currentKey;
    }
  }
};
function $7af3f5b51489e0b5$var$equalSets(setA, setB) {
  if (setA.size !== setB.size) return false;
  for (let item of setA) {
    if (!setB.has(item)) return false;
  }
  return true;
}
function $7af3f5b51489e0b5$export$253fe78d46329472(props) {
  let {
    selectionMode = "none",
    disallowEmptySelection,
    allowDuplicateSelectionEvents,
    selectionBehavior: selectionBehaviorProp = "toggle",
    disabledBehavior = "all",
  } = props;
  let isFocusedRef = $Qsto2$useRef(false);
  let [, setFocused] = $Qsto2$useState(false);
  let focusedKeyRef = $Qsto2$useRef(null);
  let childFocusStrategyRef = $Qsto2$useRef(null);
  let [, setFocusedKey] = $Qsto2$useState(null);
  let selectedKeysProp = $Qsto2$useMemo(
    () => $7af3f5b51489e0b5$var$convertSelection(props.selectedKeys),
    [props.selectedKeys]
  );
  let defaultSelectedKeys = $Qsto2$useMemo(
    () =>
      $7af3f5b51489e0b5$var$convertSelection(
        props.defaultSelectedKeys,
        new $e40ea825a81a3709$export$52baac22726c72bf()
      ),
    [props.defaultSelectedKeys]
  );
  let [selectedKeys, setSelectedKeys] =
    $458b0a5536c1a7cf$export$40bfa8c7b0832715(
      selectedKeysProp,
      defaultSelectedKeys,
      props.onSelectionChange
    );
  let disabledKeysProp = $Qsto2$useMemo(
    () =>
      props.disabledKeys
        ? new Set(props.disabledKeys)
        : /* @__PURE__ */ new Set(),
    [props.disabledKeys]
  );
  let [selectionBehavior, setSelectionBehavior] = $Qsto2$useState(
    selectionBehaviorProp
  );
  if (
    selectionBehaviorProp === "replace" &&
    selectionBehavior === "toggle" &&
    typeof selectedKeys === "object" &&
    selectedKeys.size === 0
  )
    setSelectionBehavior("replace");
  let lastSelectionBehavior = $Qsto2$useRef(selectionBehaviorProp);
  $Qsto2$useEffect(() => {
    if (selectionBehaviorProp !== lastSelectionBehavior.current) {
      setSelectionBehavior(selectionBehaviorProp);
      lastSelectionBehavior.current = selectionBehaviorProp;
    }
  }, [selectionBehaviorProp]);
  return {
    selectionMode,
    disallowEmptySelection,
    selectionBehavior,
    setSelectionBehavior,
    get isFocused() {
      return isFocusedRef.current;
    },
    setFocused(f) {
      isFocusedRef.current = f;
      setFocused(f);
    },
    get focusedKey() {
      return focusedKeyRef.current;
    },
    get childFocusStrategy() {
      return childFocusStrategyRef.current;
    },
    setFocusedKey(k, childFocusStrategy = "first") {
      focusedKeyRef.current = k;
      childFocusStrategyRef.current = childFocusStrategy;
      setFocusedKey(k);
    },
    selectedKeys,
    setSelectedKeys(keys) {
      if (
        allowDuplicateSelectionEvents ||
        !$7af3f5b51489e0b5$var$equalSets(keys, selectedKeys)
      )
        setSelectedKeys(keys);
    },
    disabledKeys: disabledKeysProp,
    disabledBehavior,
  };
}
function $7af3f5b51489e0b5$var$convertSelection(selection, defaultValue) {
  if (!selection) return defaultValue;
  return selection === "all"
    ? "all"
    : new $e40ea825a81a3709$export$52baac22726c72bf(selection);
}
var $d496c0a20b6e58ec$export$6c8a5aaad13c9852 = class {
  get selectionMode() {
    return this.state.selectionMode;
  }
  get disallowEmptySelection() {
    return this.state.disallowEmptySelection;
  }
  get selectionBehavior() {
    return this.state.selectionBehavior;
  }
  setSelectionBehavior(selectionBehavior) {
    this.state.setSelectionBehavior(selectionBehavior);
  }
  get isFocused() {
    return this.state.isFocused;
  }
  setFocused(isFocused) {
    this.state.setFocused(isFocused);
  }
  get focusedKey() {
    return this.state.focusedKey;
  }
  get childFocusStrategy() {
    return this.state.childFocusStrategy;
  }
  setFocusedKey(key, childFocusStrategy) {
    this.state.setFocusedKey(key, childFocusStrategy);
  }
  get selectedKeys() {
    return this.state.selectedKeys === "all"
      ? new Set(this.getSelectAllKeys())
      : this.state.selectedKeys;
  }
  get rawSelection() {
    return this.state.selectedKeys;
  }
  isSelected(key) {
    if (this.state.selectionMode === "none") return false;
    key = this.getKey(key);
    return this.state.selectedKeys === "all"
      ? this.canSelectItem(key)
      : this.state.selectedKeys.has(key);
  }
  get isEmpty() {
    return (
      this.state.selectedKeys !== "all" && this.state.selectedKeys.size === 0
    );
  }
  get isSelectAll() {
    if (this.isEmpty) return false;
    if (this.state.selectedKeys === "all") return true;
    if (this._isSelectAll != null) return this._isSelectAll;
    let allKeys = this.getSelectAllKeys();
    let selectedKeys = this.state.selectedKeys;
    this._isSelectAll = allKeys.every((k) => selectedKeys.has(k));
    return this._isSelectAll;
  }
  get firstSelectedKey() {
    let first = null;
    for (let key of this.state.selectedKeys) {
      let item = this.collection.getItem(key);
      if (
        !first ||
        (item === null || item === void 0 ? void 0 : item.index) < first.index
      )
        first = item;
    }
    return first === null || first === void 0 ? void 0 : first.key;
  }
  get lastSelectedKey() {
    let last = null;
    for (let key of this.state.selectedKeys) {
      let item = this.collection.getItem(key);
      if (
        !last ||
        (item === null || item === void 0 ? void 0 : item.index) > last.index
      )
        last = item;
    }
    return last === null || last === void 0 ? void 0 : last.key;
  }
  get disabledKeys() {
    return this.state.disabledKeys;
  }
  get disabledBehavior() {
    return this.state.disabledBehavior;
  }
  extendSelection(toKey) {
    if (this.selectionMode === "none") return;
    if (this.selectionMode === "single") {
      this.replaceSelection(toKey);
      return;
    }
    toKey = this.getKey(toKey);
    let selection;
    if (this.state.selectedKeys === "all")
      selection = new $e40ea825a81a3709$export$52baac22726c72bf(
        [toKey],
        toKey,
        toKey
      );
    else {
      let selectedKeys = this.state.selectedKeys;
      let anchorKey = selectedKeys.anchorKey || toKey;
      selection = new $e40ea825a81a3709$export$52baac22726c72bf(
        selectedKeys,
        anchorKey,
        toKey
      );
      for (let key of this.getKeyRange(
        anchorKey,
        selectedKeys.currentKey || toKey
      ))
        selection.delete(key);
      for (let key1 of this.getKeyRange(toKey, anchorKey))
        if (this.canSelectItem(key1)) selection.add(key1);
    }
    this.state.setSelectedKeys(selection);
  }
  getKeyRange(from, to) {
    let fromItem = this.collection.getItem(from);
    let toItem = this.collection.getItem(to);
    if (fromItem && toItem) {
      if (fromItem.index <= toItem.index)
        return this.getKeyRangeInternal(from, to);
      return this.getKeyRangeInternal(to, from);
    }
    return [];
  }
  getKeyRangeInternal(from, to) {
    let keys = [];
    let key = from;
    while (key) {
      let item = this.collection.getItem(key);
      if (
        (item && item.type === "item") ||
        (item.type === "cell" && this.allowsCellSelection)
      )
        keys.push(key);
      if (key === to) return keys;
      key = this.collection.getKeyAfter(key);
    }
    return [];
  }
  getKey(key) {
    let item = this.collection.getItem(key);
    if (!item) return key;
    if (item.type === "cell" && this.allowsCellSelection) return key;
    while (item.type !== "item" && item.parentKey != null)
      item = this.collection.getItem(item.parentKey);
    if (!item || item.type !== "item") return null;
    return item.key;
  }
  toggleSelection(key) {
    if (this.selectionMode === "none") return;
    if (this.selectionMode === "single" && !this.isSelected(key)) {
      this.replaceSelection(key);
      return;
    }
    key = this.getKey(key);
    if (key == null) return;
    let keys = new $e40ea825a81a3709$export$52baac22726c72bf(
      this.state.selectedKeys === "all"
        ? this.getSelectAllKeys()
        : this.state.selectedKeys
    );
    if (keys.has(key)) keys.delete(key);
    else if (this.canSelectItem(key)) {
      keys.add(key);
      keys.anchorKey = key;
      keys.currentKey = key;
    }
    if (this.disallowEmptySelection && keys.size === 0) return;
    this.state.setSelectedKeys(keys);
  }
  replaceSelection(key) {
    if (this.selectionMode === "none") return;
    key = this.getKey(key);
    if (key == null) return;
    let selection = this.canSelectItem(key)
      ? new $e40ea825a81a3709$export$52baac22726c72bf([key], key, key)
      : new $e40ea825a81a3709$export$52baac22726c72bf();
    this.state.setSelectedKeys(selection);
  }
  setSelectedKeys(keys) {
    if (this.selectionMode === "none") return;
    let selection = new $e40ea825a81a3709$export$52baac22726c72bf();
    for (let key of keys) {
      key = this.getKey(key);
      if (key != null) {
        selection.add(key);
        if (this.selectionMode === "single") break;
      }
    }
    this.state.setSelectedKeys(selection);
  }
  getSelectAllKeys() {
    let keys = [];
    let addKeys = (key) => {
      while (key) {
        if (this.canSelectItem(key)) {
          let item = this.collection.getItem(key);
          if (item.type === "item") keys.push(key);
          if (
            item.hasChildNodes &&
            (this.allowsCellSelection || item.type !== "item")
          )
            addKeys([...item.childNodes][0].key);
        }
        key = this.collection.getKeyAfter(key);
      }
    };
    addKeys(this.collection.getFirstKey());
    return keys;
  }
  selectAll() {
    if (this.selectionMode === "multiple") this.state.setSelectedKeys("all");
  }
  clearSelection() {
    if (
      !this.disallowEmptySelection &&
      (this.state.selectedKeys === "all" || this.state.selectedKeys.size > 0)
    )
      this.state.setSelectedKeys(
        new $e40ea825a81a3709$export$52baac22726c72bf()
      );
  }
  toggleSelectAll() {
    if (this.isSelectAll) this.clearSelection();
    else this.selectAll();
  }
  select(key, e2) {
    if (this.selectionMode === "none") return;
    if (this.selectionMode === "single") {
      if (this.isSelected(key) && !this.disallowEmptySelection)
        this.toggleSelection(key);
      else this.replaceSelection(key);
    } else if (
      this.selectionBehavior === "toggle" ||
      (e2 && (e2.pointerType === "touch" || e2.pointerType === "virtual"))
    )
      this.toggleSelection(key);
    else this.replaceSelection(key);
  }
  isSelectionEqual(selection) {
    if (selection === this.state.selectedKeys) return true;
    let selectedKeys = this.selectedKeys;
    if (selection.size !== selectedKeys.size) return false;
    for (let key of selection) {
      if (!selectedKeys.has(key)) return false;
    }
    for (let key2 of selectedKeys) {
      if (!selection.has(key2)) return false;
    }
    return true;
  }
  canSelectItem(key) {
    if (this.state.selectionMode === "none" || this.state.disabledKeys.has(key))
      return false;
    let item = this.collection.getItem(key);
    if (!item || (item.type === "cell" && !this.allowsCellSelection))
      return false;
    return true;
  }
  isDisabled(key) {
    return (
      this.state.disabledKeys.has(key) && this.state.disabledBehavior === "all"
    );
  }
  constructor(collection, state, options) {
    this.collection = collection;
    this.state = state;
    var ref;
    this.allowsCellSelection =
      (ref =
        options === null || options === void 0
          ? void 0
          : options.allowsCellSelection) !== null && ref !== void 0
        ? ref
        : false;
    this._isSelectAll = null;
  }
};

// ../node_modules/@react-stately/collections/dist/module.js
import $tyW6A$react, {
  useMemo as $tyW6A$useMemo,
  useRef as $tyW6A$useRef,
} from "react";
function $c1d7fb2ec91bae71$var$Item(props) {
  return null;
}
$c1d7fb2ec91bae71$var$Item.getCollectionNode = function* getCollectionNode(
  props,
  context
) {
  let { childItems, title, children } = props;
  let rendered = props.title || props.children;
  let textValue =
    props.textValue ||
    (typeof rendered === "string" ? rendered : "") ||
    props["aria-label"] ||
    "";
  if (
    !textValue &&
    !(context === null || context === void 0
      ? void 0
      : context.suppressTextValueWarning)
  )
    console.warn(
      "<Item> with non-plain text contents is unsupported by type to select for accessibility. Please add a `textValue` prop."
    );
  yield {
    type: "item",
    props,
    rendered,
    textValue,
    "aria-label": props["aria-label"],
    hasChildNodes: $c1d7fb2ec91bae71$var$hasChildItems(props),
    *childNodes() {
      if (childItems)
        for (let child1 of childItems)
          yield {
            type: "item",
            value: child1,
          };
      else if (title) {
        let items = [];
        $tyW6A$react.Children.forEach(children, (child) => {
          items.push({
            type: "item",
            element: child,
          });
        });
        yield* items;
      }
    },
  };
};
function $c1d7fb2ec91bae71$var$hasChildItems(props) {
  if (props.hasChildItems != null) return props.hasChildItems;
  if (props.childItems) return true;
  if (props.title && $tyW6A$react.Children.count(props.children) > 0)
    return true;
  return false;
}
function $9fc4852771d079eb$var$Section(props) {
  return null;
}
$9fc4852771d079eb$var$Section.getCollectionNode = function* getCollectionNode2(
  props
) {
  let { children, title, items: items1 } = props;
  yield {
    type: "section",
    hasChildNodes: true,
    rendered: title,
    "aria-label": props["aria-label"],
    *childNodes() {
      if (typeof children === "function") {
        if (!items1)
          throw new Error(
            "props.children was a function but props.items is missing"
          );
        for (let item of items1)
          yield {
            type: "item",
            value: item,
            renderer: children,
          };
      } else {
        let items = [];
        $tyW6A$react.Children.forEach(children, (child) => {
          items.push({
            type: "item",
            element: child,
          });
        });
        yield* items;
      }
    },
  };
};
var $eb2240fc39a57fa5$export$bf788dd355e3a401 = class {
  build(props, context) {
    this.context = context;
    return $eb2240fc39a57fa5$var$iterable(() => this.iterateCollection(props));
  }
  *iterateCollection(props) {
    let { children, items } = props;
    if (typeof children === "function") {
      if (!items)
        throw new Error(
          "props.children was a function but props.items is missing"
        );
      for (let item of props.items)
        yield* this.getFullNode(
          {
            value: item,
          },
          {
            renderer: children,
          }
        );
    } else {
      let items2 = [];
      $tyW6A$react.Children.forEach(children, (child) => {
        items2.push(child);
      });
      let index = 0;
      for (let item of items2) {
        let nodes = this.getFullNode(
          {
            element: item,
            index,
          },
          {}
        );
        for (let node of nodes) {
          index++;
          yield node;
        }
      }
    }
  }
  getKey(item, partialNode, state, parentKey) {
    if (item.key != null) return item.key;
    if (partialNode.type === "cell" && partialNode.key != null)
      return `${parentKey}${partialNode.key}`;
    let v = partialNode.value;
    if (v != null) {
      var _key;
      let key = (_key = v.key) !== null && _key !== void 0 ? _key : v.id;
      if (key == null) throw new Error("No key found for item");
      return key;
    }
    return parentKey
      ? `${parentKey}.${partialNode.index}`
      : `$.${partialNode.index}`;
  }
  getChildState(state, partialNode) {
    return {
      renderer: partialNode.renderer || state.renderer,
    };
  }
  *getFullNode(partialNode, state, parentKey, parentNode) {
    let element = partialNode.element;
    if (!element && partialNode.value && state && state.renderer) {
      let cached = this.cache.get(partialNode.value);
      if (
        cached &&
        (!cached.shouldInvalidate || !cached.shouldInvalidate(this.context))
      ) {
        cached.index = partialNode.index;
        cached.parentKey = parentNode ? parentNode.key : null;
        yield cached;
        return;
      }
      element = state.renderer(partialNode.value);
    }
    if ($tyW6A$react.isValidElement(element)) {
      let type = element.type;
      if (
        typeof type !== "function" &&
        typeof type.getCollectionNode !== "function"
      ) {
        let name =
          typeof element.type === "function" ? element.type.name : element.type;
        throw new Error(`Unknown element <${name}> in collection.`);
      }
      let childNodes = type.getCollectionNode(element.props, this.context);
      let index = partialNode.index;
      let result = childNodes.next();
      while (!result.done && result.value) {
        let childNode = result.value;
        partialNode.index = index;
        let nodeKey = childNode.key;
        if (!nodeKey)
          nodeKey = childNode.element
            ? null
            : this.getKey(element, partialNode, state, parentKey);
        let nodes = this.getFullNode(
          __spreadProps(__spreadValues({}, childNode), {
            key: nodeKey,
            index,
            wrapper: $eb2240fc39a57fa5$var$compose(
              partialNode.wrapper,
              childNode.wrapper
            ),
          }),
          this.getChildState(state, childNode),
          parentKey ? `${parentKey}${element.key}` : element.key,
          parentNode
        );
        let children = [...nodes];
        for (let node2 of children) {
          node2.value = childNode.value || partialNode.value;
          if (node2.value) this.cache.set(node2.value, node2);
          if (partialNode.type && node2.type !== partialNode.type)
            throw new Error(
              `Unsupported type <${$eb2240fc39a57fa5$var$capitalize(
                node2.type
              )}> in <${$eb2240fc39a57fa5$var$capitalize(
                parentNode.type
              )}>. Only <${$eb2240fc39a57fa5$var$capitalize(
                partialNode.type
              )}> is supported.`
            );
          index++;
          yield node2;
        }
        result = childNodes.next(children);
      }
      return;
    }
    if (partialNode.key == null) return;
    let builder = this;
    let node = {
      type: partialNode.type,
      props: partialNode.props,
      key: partialNode.key,
      parentKey: parentNode ? parentNode.key : null,
      value: partialNode.value,
      level: parentNode ? parentNode.level + 1 : 0,
      index: partialNode.index,
      rendered: partialNode.rendered,
      textValue: partialNode.textValue,
      "aria-label": partialNode["aria-label"],
      wrapper: partialNode.wrapper,
      shouldInvalidate: partialNode.shouldInvalidate,
      hasChildNodes: partialNode.hasChildNodes,
      childNodes: $eb2240fc39a57fa5$var$iterable(function* () {
        if (!partialNode.hasChildNodes) return;
        let index = 0;
        for (let child of partialNode.childNodes()) {
          if (child.key != null) child.key = `${node.key}${child.key}`;
          child.index = index;
          let nodes = builder.getFullNode(
            child,
            builder.getChildState(state, child),
            node.key,
            node
          );
          for (let node1 of nodes) {
            index++;
            yield node1;
          }
        }
      }),
    };
    yield node;
  }
  constructor() {
    this.cache = /* @__PURE__ */ new WeakMap();
  }
};
function $eb2240fc39a57fa5$var$iterable(iterator) {
  let cache = [];
  let iterable = null;
  return {
    *[Symbol.iterator]() {
      for (let item of cache) yield item;
      if (!iterable) iterable = iterator();
      for (let item1 of iterable) {
        cache.push(item1);
        yield item1;
      }
    },
  };
}
function $eb2240fc39a57fa5$var$compose(outer, inner) {
  if (outer && inner) return (element) => outer(inner(element));
  if (outer) return outer;
  if (inner) return inner;
}
function $eb2240fc39a57fa5$var$capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}
function $7613b1592d41b092$export$6cd28814d92fa9c9(
  props,
  factory,
  context,
  invalidators = []
) {
  let builder = $tyW6A$useMemo(
    () => new $eb2240fc39a57fa5$export$bf788dd355e3a401(),
    []
  );
  let prev = $tyW6A$useRef(null);
  return $tyW6A$useMemo(() => {
    let nodes = builder.build(props, context);
    prev.current = factory(nodes, prev.current);
    return prev.current;
  }, [builder, props.children, props.items, context, ...invalidators]);
}

// ../node_modules/@react-stately/tree/dist/module.js
var tmp = Symbol.iterator;
var $05ca4cd7c4a5a999$export$863faf230ee2118a = class {
  *[tmp]() {
    yield* this.iterable;
  }
  get size() {
    return this.keyMap.size;
  }
  getKeys() {
    return this.keyMap.keys();
  }
  getKeyBefore(key) {
    let node = this.keyMap.get(key);
    return node ? node.prevKey : null;
  }
  getKeyAfter(key) {
    let node = this.keyMap.get(key);
    return node ? node.nextKey : null;
  }
  getFirstKey() {
    return this.firstKey;
  }
  getLastKey() {
    return this.lastKey;
  }
  getItem(key) {
    return this.keyMap.get(key);
  }
  at(idx) {
    const keys = [...this.getKeys()];
    return this.getItem(keys[idx]);
  }
  constructor(nodes, { expandedKeys } = {}) {
    this.keyMap = /* @__PURE__ */ new Map();
    this.iterable = nodes;
    expandedKeys = expandedKeys || /* @__PURE__ */ new Set();
    let visit = (node) => {
      this.keyMap.set(node.key, node);
      if (
        node.childNodes &&
        (node.type === "section" || expandedKeys.has(node.key))
      )
        for (let child of node.childNodes) visit(child);
    };
    for (let node2 of nodes) visit(node2);
    let last;
    let index = 0;
    for (let [key, node1] of this.keyMap) {
      if (last) {
        last.nextKey = key;
        node1.prevKey = last.key;
      } else {
        this.firstKey = key;
        node1.prevKey = void 0;
      }
      if (node1.type === "item") node1.index = index++;
      last = node1;
      last.nextKey = void 0;
    }
    this.lastKey = last === null || last === void 0 ? void 0 : last.key;
  }
};
function $875d6693e12af071$export$728d6ba534403756(props) {
  let [expandedKeys, setExpandedKeys] =
    $458b0a5536c1a7cf$export$40bfa8c7b0832715(
      props.expandedKeys ? new Set(props.expandedKeys) : void 0,
      props.defaultExpandedKeys
        ? new Set(props.defaultExpandedKeys)
        : /* @__PURE__ */ new Set(),
      props.onExpandedChange
    );
  let selectionState = $7af3f5b51489e0b5$export$253fe78d46329472(props);
  let disabledKeys = $1OoTj$useMemo(
    () =>
      props.disabledKeys
        ? new Set(props.disabledKeys)
        : /* @__PURE__ */ new Set(),
    [props.disabledKeys]
  );
  let tree = $7613b1592d41b092$export$6cd28814d92fa9c9(
    props,
    (nodes) =>
      new $05ca4cd7c4a5a999$export$863faf230ee2118a(nodes, {
        expandedKeys,
      }),
    null,
    [expandedKeys]
  );
  $1OoTj$useEffect(() => {
    if (
      selectionState.focusedKey != null &&
      !tree.getItem(selectionState.focusedKey)
    )
      selectionState.setFocusedKey(null);
  }, [tree, selectionState.focusedKey]);
  let onToggle = (key) => {
    setExpandedKeys($875d6693e12af071$var$toggleKey(expandedKeys, key));
  };
  return {
    collection: tree,
    expandedKeys,
    disabledKeys,
    toggleKey: onToggle,
    selectionManager: new $d496c0a20b6e58ec$export$6c8a5aaad13c9852(
      tree,
      selectionState
    ),
  };
}
function $875d6693e12af071$var$toggleKey(set, key) {
  let res = new Set(set);
  if (res.has(key)) res.delete(key);
  else res.add(key);
  return res;
}

// ui/icons/ChevronDown.tsx

// rui/Menu.tsx
import { jsx as jsx22 } from "@emotion/react/jsx-runtime";
var menuPopupCss = css12([
  rcss.py(4),
  {
    border: `1px solid ${tokens.outlineDimmest}`,
    borderRadius: tokens.borderRadius8,
    backgroundColor: interactiveVars.interactiveBackground,
  },
]);
var menuItemCss = css12([
  rcss.p(8),
  {
    ":not([disabled])": {
      cursor: "pointer",
      "&[data-focused=true]": {
        backgroundColor: interactiveVars.interactiveBackgroundActive,
      },
    },
  },
]);
var ButtonView3 = SpecializedView("button");
var DivView = SpecializedView("div");
var UlView = SpecializedView("ul");
var LiView = SpecializedView("li");
function MenuItem(_a) {
  var _b = _a,
    { item, state } = _b,
    props = __objRest(_b, ["item", "state"]);
  const isDisabled = state.disabledKeys.has(item.key);
  const isFocused =
    state.selectionManager.isFocused &&
    state.selectionManager.focusedKey === item.key;
  const ref = useRef5(null);
  const { menuItemProps } = useMenuItem(
    __spreadValues(
      {
        key: item.key,
        "aria-label": item["aria-label"],
        isDisabled,
      },
      props
    ),
    state,
    ref
  );
  useEffect5(() => {
    var _a2;
    (_a2 = ref.current) == null
      ? void 0
      : _a2.addEventListener("touchend", (e2) => {
          e2.preventDefault();
        });
  }, []);
  return /* @__PURE__ */ jsx22(
    LiView,
    __spreadProps(
      __spreadValues(
        {},
        mergeProps3(
          { ref, css: menuItemCss, "data-focused": isFocused },
          menuItemProps
        )
      ),
      {
        children: item.rendered,
      }
    )
  );
}
function Menu(_a) {
  var _b = _a,
    {
      className,
      menuProps: menuPropsFromTrigger = {},
      label,
      onAction,
      onClose,
    } = _b,
    props = __objRest(_b, [
      "className",
      "menuProps",
      "label",
      "onAction",
      "onClose",
    ]);
  const state = $875d6693e12af071$export$728d6ba534403756(
    __spreadProps(__spreadValues({}, props), { selectionMode: "none" })
  );
  const ref = useRef5(null);
  const { menuProps } = useMenu(
    __spreadValues({ "aria-label": label || props["aria-label"] }, props),
    state,
    ref
  );
  return /* @__PURE__ */ jsx22(
    UlView,
    __spreadProps(
      __spreadValues(
        {},
        mergeProps3({ ref, className }, menuProps, menuPropsFromTrigger)
      ),
      {
        children: [...state.collection].map((item) =>
          /* @__PURE__ */ jsx22(
            MenuItem,
            {
              item,
              onAction,
              onClose,
              state,
            },
            item.key
          )
        ),
      }
    )
  );
}
var popupMenuZindex = ModalZIndex;
var popupMenuCss = css12({ zIndex: popupMenuZindex });

// rui/Pill.tsx
import { css as css13 } from "@emotion/react";
import { jsx as jsx23, jsxs as jsxs11 } from "@emotion/react/jsx-runtime";
var buttonReset4 = css13({
  border: "none",
  background: "transparent",
  color: "inherit",
  font: "inherit",
  lineHeight: "normal",
});
var pillStyles = ({ colorway, clickable, iconLeft, iconRight }) =>
  css13([
    buttonReset4,
    rcss.rowWithGap(4),
    rcss.pl(iconLeft ? 4 : 8),
    rcss.pr(iconRight ? 4 : 8),
    rcss.center,
    clickable && interactive.filled,
    colorway && clickable && filledInteractive(colorway),
    colorway && !clickable && filledStatic(colorway),
    rcss.flex.shrink(1),
    {
      borderRadius: tokens.borderRadiusRound,
      height: tokens.space24,
      fontSize: tokens.fontSizeSmall,
      background: "var(--interactive-background)",
    },
  ]);
function Pill({ colorway, text, className, iconLeft, iconRight }) {
  return /* @__PURE__ */ jsxs11(View, {
    className,
    css: pillStyles({
      colorway,
      clickable: false,
      iconLeft: !!iconLeft,
      iconRight: !!iconRight,
    }),
    children: [
      iconLeft,
      /* @__PURE__ */ jsx23("span", {
        children: text,
      }),
      iconRight,
    ],
  });
}

// rui/Radio.tsx
import * as React15 from "react";
import { jsx as jsx24, jsxs as jsxs12 } from "@emotion/react/jsx-runtime";
var RadioContext = React15.createContext(null);
function RadioGroup({
  name,
  value,
  disabled,
  onChange,
  children,
  tag,
  className,
}) {
  return /* @__PURE__ */ jsx24(View, {
    tag,
    className,
    children: /* @__PURE__ */ jsx24(RadioContext.Provider, {
      value: { value, name, onChange, disabled },
      children,
    }),
  });
}
var Input4 = SpecializedView("input");
function Radio(_a) {
  var _b = _a,
    { onChange, id, checked, disabled, name, value } = _b,
    props = __objRest(_b, [
      "onChange",
      "id",
      "checked",
      "disabled",
      "name",
      "value",
    ]);
  const groupContext = React15.useContext(RadioContext);
  if (groupContext) {
    name = name != null ? name : groupContext.name;
    checked = checked != null ? checked : groupContext.value === value;
    onChange = onChange != null ? onChange : groupContext.onChange;
    disabled = disabled != null ? disabled : groupContext.disabled;
  }
  return /* @__PURE__ */ jsxs12(View, {
    tag: "div",
    css: [rcss.justify.center, rcss.align.center, rcss.position.relative],
    children: [
      /* @__PURE__ */ jsx24(
        Input4,
        __spreadValues(
          {
            tag: "input",
            id,
            name,
            value,
            type: "radio",
            checked,
            disabled,
            onChange: (e2) => (onChange == null ? void 0 : onChange(e2)),
            css: [
              interactive.filledAndOutlined,
              {
                appearance: "none",
                width: 20,
                height: 20,
                borderRadius: "50%",
              },
            ],
          },
          props
        )
      ),
      checked
        ? /* @__PURE__ */ jsx24(View, {
            tag: "div",
            css: [
              {
                width: 12,
                height: 12,
                borderRadius: "50%",
                position: "absolute",
                pointerEvents: "none",
              },
              disabled
                ? rcss.backgroundColor.outlineDefault
                : rcss.backgroundColor.accentPrimaryDefault,
            ],
          })
        : null,
    ],
  });
}

// rui/Rui.tsx
import { Global } from "@emotion/react";
import { jsx as jsx25, jsxs as jsxs13 } from "@emotion/react/jsx-runtime";
function Rui({ theme, children }) {
  const styles2 =
    theme === "light"
      ? getThemeSettingsCss(replitLight.values)
      : getThemeSettingsCss(replitDark.values);
  return /* @__PURE__ */ jsxs13(Surface, {
    className: "replit-ui-theme-root",
    css: [styles2],
    children: [
      /* @__PURE__ */ jsx25(Global, {
        styles: globalStyles,
      }),
      children,
    ],
  });
}

// ui/icons/Search.tsx
import { jsx as jsx26 } from "@emotion/react/jsx-runtime";
function SearchIcon(props) {
  return /* @__PURE__ */ jsx26(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ jsx26("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M11 3.75C6.99594 3.75 3.75 6.99594 3.75 11C3.75 15.0041 6.99594 18.25 11 18.25C12.9606 18.25 14.7395 17.4717 16.0445 16.2073C16.0669 16.1767 16.092 16.1474 16.1197 16.1197C16.1474 16.092 16.1767 16.0669 16.2073 16.0445C17.4717 14.7395 18.25 12.9606 18.25 11C18.25 6.99594 15.0041 3.75 11 3.75ZM17.6949 16.6342C18.9773 15.112 19.75 13.1462 19.75 11C19.75 6.16751 15.8325 2.25 11 2.25C6.16751 2.25 2.25 6.16751 2.25 11C2.25 15.8325 6.16751 19.75 11 19.75C13.1462 19.75 15.112 18.9773 16.6342 17.6949L20.4697 21.5303C20.7626 21.8232 21.2374 21.8232 21.5303 21.5303C21.8232 21.2374 21.8232 20.7626 21.5303 20.4697L17.6949 16.6342Z",
      }),
    })
  );
}

function UserIcon(props) {
  return /* @__PURE__ */ jsx26(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ jsx26("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M12 3.75C10.2051 3.75 8.75 5.20507 8.75 7C8.75 8.79493 10.2051 10.25 12 10.25C13.7949 10.25 15.25 8.79493 15.25 7C15.25 5.20507 13.7949 3.75 12 3.75ZM7.25 7C7.25 4.37665 9.37665 2.25 12 2.25C14.6234 2.25 16.75 4.37665 16.75 7C16.75 9.62335 14.6234 11.75 12 11.75C9.37665 11.75 7.25 9.62335 7.25 7ZM4.64124 15.6412C5.53204 14.7504 6.74022 14.25 8 14.25H16C17.2598 14.25 18.468 14.7504 19.3588 15.6412C20.2496 16.532 20.75 17.7402 20.75 19V21C20.75 21.4142 20.4142 21.75 20 21.75C19.5858 21.75 19.25 21.4142 19.25 21V19C19.25 18.138 18.9076 17.3114 18.2981 16.7019C17.6886 16.0924 16.862 15.75 16 15.75H8C7.13805 15.75 6.3114 16.0924 5.7019 16.7019C5.09241 17.3114 4.75 18.138 4.75 19V21C4.75 21.4142 4.41421 21.75 4 21.75C3.58579 21.75 3.25 21.4142 3.25 21V19C3.25 17.7402 3.75044 16.532 4.64124 15.6412Z",
      }),
    })
  );
}

function CodeIcon(props) {
  return /* @__PURE__ */ jsx26(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ jsx26("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M8.53033 5.46967C8.82322 5.76256 8.82322 6.23744 8.53033 6.53033L3.06066 12L8.53033 17.4697C8.82322 17.7626 8.82322 18.2374 8.53033 18.5303C8.23744 18.8232 7.76256 18.8232 7.46967 18.5303L1.46967 12.5303C1.17678 12.2374 1.17678 11.7626 1.46967 11.4697L7.46967 5.46967C7.76256 5.17678 8.23744 5.17678 8.53033 5.46967ZM15.4697 5.46967C15.7626 5.17678 16.2374 5.17678 16.5303 5.46967L22.5303 11.4697C22.8232 11.7626 22.8232 12.2374 22.5303 12.5303L16.5303 18.5303C16.2374 18.8232 15.7626 18.8232 15.4697 18.5303C15.1768 18.2374 15.1768 17.7626 15.4697 17.4697L20.9393 12L15.4697 6.53033C15.1768 6.23744 15.1768 5.76256 15.4697 5.46967Z",
      }),
    })
  );
}

// ui/icons/Close.tsx
import { jsx as jsx27 } from "@emotion/react/jsx-runtime";
function CloseIcon(props) {
  return /* @__PURE__ */ jsx27(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ jsx27("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M5.46967 5.46967C5.76256 5.17678 6.23744 5.17678 6.53033 5.46967L12 10.9393L17.4697 5.46967C17.7626 5.17678 18.2374 5.17678 18.5303 5.46967C18.8232 5.76256 18.8232 6.23744 18.5303 6.53033L13.0607 12L18.5303 17.4697C18.8232 17.7626 18.8232 18.2374 18.5303 18.5303C18.2374 18.8232 17.7626 18.8232 17.4697 18.5303L12 13.0607L6.53033 18.5303C6.23744 18.8232 5.76256 18.8232 5.46967 18.5303C5.17678 18.2374 5.17678 17.7626 5.46967 17.4697L10.9393 12L5.46967 6.53033C5.17678 6.23744 5.17678 5.76256 5.46967 5.46967Z",
      }),
    })
  );
}

// ui/icons/Hamburger.tsx
import { jsx as jsx271 } from "@emotion/react/jsx-runtime";
function HamburgerIcon(props) {
  return /* @__PURE__ */ jsx271(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ jsx271("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M1.25 6C1.25 5.58579 1.58579 5.25 2 5.25H22C22.4142 5.25 22.75 5.58579 22.75 6C22.75 6.41421 22.4142 6.75 22 6.75H2C1.58579 6.75 1.25 6.41421 1.25 6ZM1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12ZM1.25 18C1.25 17.5858 1.58579 17.25 2 17.25H22C22.4142 17.25 22.75 17.5858 22.75 18C22.75 18.4142 22.4142 18.75 22 18.75H2C1.58579 18.75 1.25 18.4142 1.25 18Z",
      }),
    })
  );
}

function ChevronDoubleUpIcon(props) {
  return /* @__PURE__ */ jsx271(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ jsx271("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M11.4697 5.46967C11.7626 5.17678 12.2374 5.17678 12.5303 5.46967L17.5303 10.4697C17.8232 10.7626 17.8232 11.2374 17.5303 11.5303C17.2374 11.8232 16.7626 11.8232 16.4697 11.5303L12 7.06066L7.53033 11.5303C7.23744 11.8232 6.76256 11.8232 6.46967 11.5303C6.17678 11.2374 6.17678 10.7626 6.46967 10.4697L11.4697 5.46967ZM6.46967 17.4697L11.4697 12.4697C11.7626 12.1768 12.2374 12.1768 12.5303 12.4697L17.5303 17.4697C17.8232 17.7626 17.8232 18.2374 17.5303 18.5303C17.2374 18.8232 16.7626 18.8232 16.4697 18.5303L12 14.0607L7.53033 18.5303C7.23744 18.8232 6.76256 18.8232 6.46967 18.5303C6.17678 18.2374 6.17678 17.7626 6.46967 17.4697Z",
      }),
    })
  );
}

function ExternalLinkIcon(props) {
  return /* @__PURE__ */ jsx271(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ jsx271("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M14.25 3C14.25 2.58579 14.5858 2.25 15 2.25H21C21.4142 2.25 21.75 2.58579 21.75 3V9C21.75 9.41421 21.4142 9.75 21 9.75C20.5858 9.75 20.25 9.41421 20.25 9V4.81066L10.5303 14.5303C10.2374 14.8232 9.76256 14.8232 9.46967 14.5303C9.17678 14.2374 9.17678 13.7626 9.46967 13.4697L19.1893 3.75H15C14.5858 3.75 14.25 3.41421 14.25 3ZM5 6.75C4.66848 6.75 4.35054 6.8817 4.11612 7.11612C3.8817 7.35054 3.75 7.66848 3.75 8V19C3.75 19.3315 3.8817 19.6495 4.11612 19.8839C4.35054 20.1183 4.66848 20.25 5 20.25H16C16.3315 20.25 16.6495 20.1183 16.8839 19.8839C17.1183 19.6495 17.25 19.3315 17.25 19V13C17.25 12.5858 17.5858 12.25 18 12.25C18.4142 12.25 18.75 12.5858 18.75 13V19C18.75 19.7293 18.4603 20.4288 17.9445 20.9445C17.4288 21.4603 16.7293 21.75 16 21.75H5C4.27065 21.75 3.57118 21.4603 3.05546 20.9445C2.53973 20.4288 2.25 19.7293 2.25 19V8C2.25 7.27065 2.53973 6.57118 3.05546 6.05546C3.57118 5.53973 4.27065 5.25 5 5.25H11C11.4142 5.25 11.75 5.58579 11.75 6C11.75 6.41421 11.4142 6.75 11 6.75H5Z",
      }),
    })
  );
}

// rui/SearchBar.tsx
import { css as css14 } from "@emotion/react";
import { jsx as jsx28, jsxs as jsxs14 } from "@emotion/react/jsx-runtime";
var iconPositionStyles = css14([
  rcss.position.absolute,
  rcss.center,
  { top: 0, right: 0, height: "100%" },
]);
function SearchBar(props) {
  return /* @__PURE__ */ jsxs14(View, {
    css: [rcss.position.relative, rcss.flex.shrink(1)],
    children: [
      /* @__PURE__ */ jsx28(Input_default, {
        id: props.id,
        className: props.className,
        css: [rcss.pr(32)],
        value: props.value,
        onChange: props.onChange,
        placeholder: props.placeholder || "Search",
        name: props.name,
        onFocus: props.onFocus,
        onBlur: props.onBlur,
        onKeyDown: props.onKeyDown,
        disabled: props.disabled,
        ref: props.inputRef,
      }),
      props.loading
        ? /* @__PURE__ */ jsx28(View, {
            css: [iconPositionStyles, rcss.p(8), { pointerEvents: "none" }],
            children: /* @__PURE__ */ jsx28(LoadingIcon, {}),
          })
        : null,
      !props.loading && !props.value
        ? /* @__PURE__ */ jsx28(View, {
            css: [iconPositionStyles, rcss.p(8), { pointerEvents: "none" }],
            children: /* @__PURE__ */ jsx28(SearchIcon, {}),
          })
        : null,
      !props.loading && props.value
        ? /* @__PURE__ */ jsx28(View, {
            css: [rcss.p(4), iconPositionStyles],
            children: /* @__PURE__ */ jsx28(IconButton_default, {
              alt: "Clear",
              tooltipHidden: true,
              disabled: props.disabled,
              css: {
                "&:hover": {
                  backgroundColor: "var(--background-highest) !important",
                },
              },
              onClick: props.onClear,
              children: /* @__PURE__ */ jsx28(CloseIcon, {}),
            }),
          })
        : null,
    ],
  });
}

// rui/Select.tsx
import * as React19 from "react";

// ../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(source2, excluded) {
  if (source2 == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source2);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source2[key];
  }
  return target;
}

// ../node_modules/@babel/runtime/helpers/esm/extends.js
function _extends() {
  _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source2 = arguments[i];
        for (var key in source2) {
          if (Object.prototype.hasOwnProperty.call(source2, key)) {
            target[key] = source2[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
}

// ../node_modules/downshift/dist/downshift.esm.js
var import_prop_types = __toESM(require_prop_types());
var import_react_is = __toESM(require_react_is());
import {
  useRef as useRef6,
  useEffect as useEffect6,
  useCallback as useCallback3,
  useLayoutEffect as useLayoutEffect3,
  useReducer,
  useMemo as useMemo2,
} from "react";

// ../node_modules/compute-scroll-into-view/dist/index.module.js
function t(t2) {
  return "object" == typeof t2 && null != t2 && 1 === t2.nodeType;
}
function e(t2, e2) {
  return (!e2 || "hidden" !== t2) && "visible" !== t2 && "clip" !== t2;
}
function n(t2, n2) {
  if (t2.clientHeight < t2.scrollHeight || t2.clientWidth < t2.scrollWidth) {
    var r2 = getComputedStyle(t2, null);
    return (
      e(r2.overflowY, n2) ||
      e(r2.overflowX, n2) ||
      (function (t3) {
        var e2 = (function (t4) {
          if (!t4.ownerDocument || !t4.ownerDocument.defaultView) return null;
          try {
            return t4.ownerDocument.defaultView.frameElement;
          } catch (t5) {
            return null;
          }
        })(t3);
        return (
          !!e2 &&
          (e2.clientHeight < t3.scrollHeight || e2.clientWidth < t3.scrollWidth)
        );
      })(t2)
    );
  }
  return false;
}
function r(t2, e2, n2, r2, i, o, l, d) {
  return (o < t2 && l > e2) || (o > t2 && l < e2)
    ? 0
    : (o <= t2 && d <= n2) || (l >= e2 && d >= n2)
    ? o - t2 - r2
    : (l > e2 && d < n2) || (o < t2 && d > n2)
    ? l - e2 + i
    : 0;
}
function index_module_default(e2, i) {
  var o = window,
    l = i.scrollMode,
    d = i.block,
    u = i.inline,
    h = i.boundary,
    a = i.skipOverflowHiddenElements,
    c =
      "function" == typeof h
        ? h
        : function (t2) {
            return t2 !== h;
          };
  if (!t(e2)) throw new TypeError("Invalid target");
  for (
    var f = document.scrollingElement || document.documentElement,
      s = [],
      p = e2;
    t(p) && c(p);

  ) {
    if ((p = p.parentElement) === f) {
      s.push(p);
      break;
    }
    (null != p &&
      p === document.body &&
      n(p) &&
      !n(document.documentElement)) ||
      (null != p && n(p, a) && s.push(p));
  }
  for (
    var m = o.visualViewport ? o.visualViewport.width : innerWidth,
      g = o.visualViewport ? o.visualViewport.height : innerHeight,
      w = window.scrollX || pageXOffset,
      v = window.scrollY || pageYOffset,
      W = e2.getBoundingClientRect(),
      b = W.height,
      H = W.width,
      y = W.top,
      E = W.right,
      M = W.bottom,
      V = W.left,
      x = "start" === d || "nearest" === d ? y : "end" === d ? M : y + b / 2,
      I = "center" === u ? V + H / 2 : "end" === u ? E : V,
      C = [],
      T = 0;
    T < s.length;
    T++
  ) {
    var k = s[T],
      B = k.getBoundingClientRect(),
      D = B.height,
      O = B.width,
      R = B.top,
      X = B.right,
      Y = B.bottom,
      L = B.left;
    if (
      "if-needed" === l &&
      y >= 0 &&
      V >= 0 &&
      M <= g &&
      E <= m &&
      y >= R &&
      M <= Y &&
      V >= L &&
      E <= X
    )
      return C;
    var S = getComputedStyle(k),
      j = parseInt(S.borderLeftWidth, 10),
      q = parseInt(S.borderTopWidth, 10),
      z = parseInt(S.borderRightWidth, 10),
      A = parseInt(S.borderBottomWidth, 10),
      F = 0,
      G = 0,
      J = "offsetWidth" in k ? k.offsetWidth - k.clientWidth - j - z : 0,
      K = "offsetHeight" in k ? k.offsetHeight - k.clientHeight - q - A : 0;
    if (f === k)
      (F =
        "start" === d
          ? x
          : "end" === d
          ? x - g
          : "nearest" === d
          ? r(v, v + g, g, q, A, v + x, v + x + b, b)
          : x - g / 2),
        (G =
          "start" === u
            ? I
            : "center" === u
            ? I - m / 2
            : "end" === u
            ? I - m
            : r(w, w + m, m, j, z, w + I, w + I + H, H)),
        (F = Math.max(0, F + v)),
        (G = Math.max(0, G + w));
    else {
      (F =
        "start" === d
          ? x - R - q
          : "end" === d
          ? x - Y + A + K
          : "nearest" === d
          ? r(R, Y, D, q, A + K, x, x + b, b)
          : x - (R + D / 2) + K / 2),
        (G =
          "start" === u
            ? I - L - j
            : "center" === u
            ? I - (L + O / 2) + J / 2
            : "end" === u
            ? I - X + z + J
            : r(L, X, O, j, z + J, I, I + H, H));
      var N = k.scrollLeft,
        P = k.scrollTop;
      (x += P - (F = Math.max(0, Math.min(P + F, k.scrollHeight - D + K)))),
        (I += N - (G = Math.max(0, Math.min(N + G, k.scrollWidth - O + J))));
    }
    C.push({ el: k, top: F, left: G });
  }
  return C;
}

// ../node_modules/tslib/modules/index.js
var import_tslib = __toESM(require_tslib(), 1);
var {
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __metadata,
  __awaiter,
  __generator,
  __exportStar,
  __createBinding,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn,
} = import_tslib.default;

// ../node_modules/downshift/dist/downshift.esm.js
var idCounter = 0;
function noop() {}
function scrollIntoView(node, menuNode) {
  if (!node) {
    return;
  }
  var actions = index_module_default(node, {
    boundary: menuNode,
    block: "nearest",
    scrollMode: "if-needed",
  });
  actions.forEach(function (_ref) {
    var el = _ref.el,
      top2 = _ref.top,
      left2 = _ref.left;
    el.scrollTop = top2;
    el.scrollLeft = left2;
  });
}
function isOrContainsNode(parent, child, environment) {
  var result =
    parent === child ||
    (child instanceof environment.Node &&
      parent.contains &&
      parent.contains(child));
  return result;
}
function debounce2(fn2, time) {
  var timeoutId;
  function cancel() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
  function wrapper() {
    for (
      var _len = arguments.length, args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }
    cancel();
    timeoutId = setTimeout(function () {
      timeoutId = null;
      fn2.apply(void 0, args);
    }, time);
  }
  wrapper.cancel = cancel;
  return wrapper;
}
function callAllEventHandlers() {
  for (
    var _len2 = arguments.length, fns = new Array(_len2), _key2 = 0;
    _key2 < _len2;
    _key2++
  ) {
    fns[_key2] = arguments[_key2];
  }
  return function (event) {
    for (
      var _len3 = arguments.length,
        args = new Array(_len3 > 1 ? _len3 - 1 : 0),
        _key3 = 1;
      _key3 < _len3;
      _key3++
    ) {
      args[_key3 - 1] = arguments[_key3];
    }
    return fns.some(function (fn2) {
      if (fn2) {
        fn2.apply(void 0, [event].concat(args));
      }
      return (
        event.preventDownshiftDefault ||
        (event.hasOwnProperty("nativeEvent") &&
          event.nativeEvent.preventDownshiftDefault)
      );
    });
  };
}
function handleRefs() {
  for (
    var _len4 = arguments.length, refs = new Array(_len4), _key4 = 0;
    _key4 < _len4;
    _key4++
  ) {
    refs[_key4] = arguments[_key4];
  }
  return function (node) {
    refs.forEach(function (ref) {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    });
  };
}
function generateId() {
  return String(idCounter++);
}
function getA11yStatusMessage$1(_ref2) {
  var isOpen = _ref2.isOpen,
    resultCount = _ref2.resultCount,
    previousResultCount = _ref2.previousResultCount;
  if (!isOpen) {
    return "";
  }
  if (!resultCount) {
    return "No results are available.";
  }
  if (resultCount !== previousResultCount) {
    return (
      resultCount +
      " result" +
      (resultCount === 1 ? " is" : "s are") +
      " available, use up and down arrow keys to navigate. Press Enter key to select."
    );
  }
  return "";
}
function getState(state, props) {
  return Object.keys(state).reduce(function (prevState, key) {
    prevState[key] = isControlledProp(props, key) ? props[key] : state[key];
    return prevState;
  }, {});
}
function isControlledProp(props, key) {
  return props[key] !== void 0;
}
function normalizeArrowKey(event) {
  var key = event.key,
    keyCode = event.keyCode;
  if (keyCode >= 37 && keyCode <= 40 && key.indexOf("Arrow") !== 0) {
    return "Arrow" + key;
  }
  return key;
}
function getNextWrappingIndex(
  moveAmount,
  baseIndex,
  itemCount,
  getItemNodeFromIndex,
  circular
) {
  if (circular === void 0) {
    circular = true;
  }
  if (itemCount === 0) {
    return -1;
  }
  var itemsLastIndex = itemCount - 1;
  if (
    typeof baseIndex !== "number" ||
    baseIndex < 0 ||
    baseIndex >= itemCount
  ) {
    baseIndex = moveAmount > 0 ? -1 : itemsLastIndex + 1;
  }
  var newIndex = baseIndex + moveAmount;
  if (newIndex < 0) {
    newIndex = circular ? itemsLastIndex : 0;
  } else if (newIndex > itemsLastIndex) {
    newIndex = circular ? 0 : itemsLastIndex;
  }
  var nonDisabledNewIndex = getNextNonDisabledIndex(
    moveAmount,
    newIndex,
    itemCount,
    getItemNodeFromIndex,
    circular
  );
  if (nonDisabledNewIndex === -1) {
    return baseIndex >= itemCount ? -1 : baseIndex;
  }
  return nonDisabledNewIndex;
}
function getNextNonDisabledIndex(
  moveAmount,
  baseIndex,
  itemCount,
  getItemNodeFromIndex,
  circular
) {
  var currentElementNode = getItemNodeFromIndex(baseIndex);
  if (!currentElementNode || !currentElementNode.hasAttribute("disabled")) {
    return baseIndex;
  }
  if (moveAmount > 0) {
    for (var index = baseIndex + 1; index < itemCount; index++) {
      if (!getItemNodeFromIndex(index).hasAttribute("disabled")) {
        return index;
      }
    }
  } else {
    for (var _index = baseIndex - 1; _index >= 0; _index--) {
      if (!getItemNodeFromIndex(_index).hasAttribute("disabled")) {
        return _index;
      }
    }
  }
  if (circular) {
    return moveAmount > 0
      ? getNextNonDisabledIndex(1, 0, itemCount, getItemNodeFromIndex, false)
      : getNextNonDisabledIndex(
          -1,
          itemCount - 1,
          itemCount,
          getItemNodeFromIndex,
          false
        );
  }
  return -1;
}
function targetWithinDownshift(
  target,
  downshiftElements,
  environment,
  checkActiveElement
) {
  if (checkActiveElement === void 0) {
    checkActiveElement = true;
  }
  return downshiftElements.some(function (contextNode) {
    return (
      contextNode &&
      (isOrContainsNode(contextNode, target, environment) ||
        (checkActiveElement &&
          isOrContainsNode(
            contextNode,
            environment.document.activeElement,
            environment
          )))
    );
  });
}
if (false) {
  validateControlledUnchanged = function validateControlledUnchanged(
    state,
    prevProps,
    nextProps
  ) {
    var warningDescription =
      "This prop should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled Downshift element for the lifetime of the component. More info: https://github.com/downshift-js/downshift#control-props";
    Object.keys(state).forEach(function (propKey) {
      if (prevProps[propKey] !== void 0 && nextProps[propKey] === void 0) {
        console.error(
          'downshift: A component has changed the controlled prop "' +
            propKey +
            '" to be uncontrolled. ' +
            warningDescription
        );
      } else if (
        prevProps[propKey] === void 0 &&
        nextProps[propKey] !== void 0
      ) {
        console.error(
          'downshift: A component has changed the uncontrolled prop "' +
            propKey +
            '" to be controlled. ' +
            warningDescription
        );
      }
    });
  };
}
var cleanupStatus = debounce2(function (documentProp) {
  getStatusDiv(documentProp).textContent = "";
}, 500);
function setStatus(status, documentProp) {
  var div = getStatusDiv(documentProp);
  if (!status) {
    return;
  }
  div.textContent = status;
  cleanupStatus(documentProp);
}
function getStatusDiv(documentProp) {
  if (documentProp === void 0) {
    documentProp = document;
  }
  var statusDiv = documentProp.getElementById("a11y-status-message");
  if (statusDiv) {
    return statusDiv;
  }
  statusDiv = documentProp.createElement("div");
  statusDiv.setAttribute("id", "a11y-status-message");
  statusDiv.setAttribute("role", "status");
  statusDiv.setAttribute("aria-live", "polite");
  statusDiv.setAttribute("aria-relevant", "additions text");
  Object.assign(statusDiv.style, {
    border: "0",
    clip: "rect(0 0 0 0)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    width: "1px",
  });
  documentProp.body.appendChild(statusDiv);
  return statusDiv;
}
false
  ? (Downshift.propTypes = {
      children: import_prop_types.default.func,
      defaultHighlightedIndex: import_prop_types.default.number,
      defaultIsOpen: import_prop_types.default.bool,
      initialHighlightedIndex: import_prop_types.default.number,
      initialSelectedItem: import_prop_types.default.any,
      initialInputValue: import_prop_types.default.string,
      initialIsOpen: import_prop_types.default.bool,
      getA11yStatusMessage: import_prop_types.default.func,
      itemToString: import_prop_types.default.func,
      onChange: import_prop_types.default.func,
      onSelect: import_prop_types.default.func,
      onStateChange: import_prop_types.default.func,
      onInputValueChange: import_prop_types.default.func,
      onUserAction: import_prop_types.default.func,
      onOuterClick: import_prop_types.default.func,
      selectedItemChanged: import_prop_types.default.func,
      stateReducer: import_prop_types.default.func,
      itemCount: import_prop_types.default.number,
      id: import_prop_types.default.string,
      environment: import_prop_types.default.shape({
        addEventListener: import_prop_types.default.func,
        removeEventListener: import_prop_types.default.func,
        document: import_prop_types.default.shape({
          getElementById: import_prop_types.default.func,
          activeElement: import_prop_types.default.any,
          body: import_prop_types.default.any,
        }),
      }),
      suppressRefError: import_prop_types.default.bool,
      scrollIntoView: import_prop_types.default.func,
      selectedItem: import_prop_types.default.any,
      isOpen: import_prop_types.default.bool,
      inputValue: import_prop_types.default.string,
      highlightedIndex: import_prop_types.default.number,
      labelId: import_prop_types.default.string,
      inputId: import_prop_types.default.string,
      menuId: import_prop_types.default.string,
      getItemId: import_prop_types.default.func,
    })
  : void 0;
var _excluded$3 = [
  "isInitialMount",
  "highlightedIndex",
  "items",
  "environment",
];
var dropdownDefaultStateValues = {
  highlightedIndex: -1,
  isOpen: false,
  selectedItem: null,
  inputValue: "",
};
function callOnChangeProps(action, state, newState) {
  var props = action.props,
    type = action.type;
  var changes = {};
  Object.keys(state).forEach(function (key) {
    invokeOnChangeHandler(key, action, state, newState);
    if (newState[key] !== state[key]) {
      changes[key] = newState[key];
    }
  });
  if (props.onStateChange && Object.keys(changes).length) {
    props.onStateChange(
      _extends(
        {
          type,
        },
        changes
      )
    );
  }
}
function invokeOnChangeHandler(key, action, state, newState) {
  var props = action.props,
    type = action.type;
  var handler = "on" + capitalizeString(key) + "Change";
  if (
    props[handler] &&
    newState[key] !== void 0 &&
    newState[key] !== state[key]
  ) {
    props[handler](
      _extends(
        {
          type,
        },
        newState
      )
    );
  }
}
function stateReducer(s, a) {
  return a.changes;
}
function getA11ySelectionMessage(selectionParameters) {
  var selectedItem = selectionParameters.selectedItem,
    itemToStringLocal = selectionParameters.itemToString;
  return selectedItem
    ? itemToStringLocal(selectedItem) + " has been selected."
    : "";
}
var updateA11yStatus = debounce2(function (getA11yMessage, document2) {
  setStatus(getA11yMessage(), document2);
}, 200);
var useIsomorphicLayoutEffect3 =
  typeof window !== "undefined" &&
  typeof window.document !== "undefined" &&
  typeof window.document.createElement !== "undefined"
    ? useLayoutEffect3
    : useEffect6;
function useElementIds(_ref) {
  var _ref$id = _ref.id,
    id = _ref$id === void 0 ? "downshift-" + generateId() : _ref$id,
    labelId = _ref.labelId,
    menuId = _ref.menuId,
    getItemId = _ref.getItemId,
    toggleButtonId = _ref.toggleButtonId,
    inputId = _ref.inputId;
  var elementIdsRef = useRef6({
    labelId: labelId || id + "-label",
    menuId: menuId || id + "-menu",
    getItemId:
      getItemId ||
      function (index) {
        return id + "-item-" + index;
      },
    toggleButtonId: toggleButtonId || id + "-toggle-button",
    inputId: inputId || id + "-input",
  });
  return elementIdsRef.current;
}
function getItemIndex(index, item, items) {
  if (index !== void 0) {
    return index;
  }
  if (items.length === 0) {
    return -1;
  }
  return items.indexOf(item);
}
function itemToString(item) {
  return item ? String(item) : "";
}
function isAcceptedCharacterKey(key) {
  return /^\S{1}$/.test(key);
}
function capitalizeString(string) {
  return "" + string.slice(0, 1).toUpperCase() + string.slice(1);
}
function useLatestRef(val) {
  var ref = useRef6(val);
  ref.current = val;
  return ref;
}
function useEnhancedReducer(reducer, initialState, props) {
  var prevStateRef = useRef6();
  var actionRef = useRef6();
  var enhancedReducer = useCallback3(
    function (state2, action2) {
      actionRef.current = action2;
      state2 = getState(state2, action2.props);
      var changes = reducer(state2, action2);
      var newState = action2.props.stateReducer(
        state2,
        _extends({}, action2, {
          changes,
        })
      );
      return newState;
    },
    [reducer]
  );
  var _useReducer = useReducer(enhancedReducer, initialState),
    state = _useReducer[0],
    dispatch = _useReducer[1];
  var propsRef = useLatestRef(props);
  var dispatchWithProps = useCallback3(
    function (action2) {
      return dispatch(
        _extends(
          {
            props: propsRef.current,
          },
          action2
        )
      );
    },
    [propsRef]
  );
  var action = actionRef.current;
  useEffect6(
    function () {
      if (action && prevStateRef.current && prevStateRef.current !== state) {
        callOnChangeProps(
          action,
          getState(prevStateRef.current, action.props),
          state
        );
      }
      prevStateRef.current = state;
    },
    [state, props, action]
  );
  return [state, dispatchWithProps];
}
function useControlledReducer$1(reducer, initialState, props) {
  var _useEnhancedReducer = useEnhancedReducer(reducer, initialState, props),
    state = _useEnhancedReducer[0],
    dispatch = _useEnhancedReducer[1];
  return [getState(state, props), dispatch];
}
var defaultProps$3 = {
  itemToString,
  stateReducer,
  getA11ySelectionMessage,
  scrollIntoView,
  circularNavigation: false,
  environment: typeof window === "undefined" ? {} : window,
};
function getDefaultValue$1(props, propKey, defaultStateValues2) {
  if (defaultStateValues2 === void 0) {
    defaultStateValues2 = dropdownDefaultStateValues;
  }
  var defaultPropKey = "default" + capitalizeString(propKey);
  if (defaultPropKey in props) {
    return props[defaultPropKey];
  }
  return defaultStateValues2[propKey];
}
function getInitialValue$1(props, propKey, defaultStateValues2) {
  if (defaultStateValues2 === void 0) {
    defaultStateValues2 = dropdownDefaultStateValues;
  }
  if (propKey in props) {
    return props[propKey];
  }
  var initialPropKey = "initial" + capitalizeString(propKey);
  if (initialPropKey in props) {
    return props[initialPropKey];
  }
  return getDefaultValue$1(props, propKey, defaultStateValues2);
}
function getInitialState$2(props) {
  var selectedItem = getInitialValue$1(props, "selectedItem");
  var isOpen = getInitialValue$1(props, "isOpen");
  var highlightedIndex = getInitialValue$1(props, "highlightedIndex");
  var inputValue = getInitialValue$1(props, "inputValue");
  return {
    highlightedIndex:
      highlightedIndex < 0 && selectedItem && isOpen
        ? props.items.indexOf(selectedItem)
        : highlightedIndex,
    isOpen,
    selectedItem,
    inputValue,
  };
}
function getHighlightedIndexOnOpen(
  props,
  state,
  offset2,
  getItemNodeFromIndex
) {
  var items = props.items,
    initialHighlightedIndex = props.initialHighlightedIndex,
    defaultHighlightedIndex = props.defaultHighlightedIndex;
  var selectedItem = state.selectedItem,
    highlightedIndex = state.highlightedIndex;
  if (items.length === 0) {
    return -1;
  }
  if (
    initialHighlightedIndex !== void 0 &&
    highlightedIndex === initialHighlightedIndex
  ) {
    return initialHighlightedIndex;
  }
  if (defaultHighlightedIndex !== void 0) {
    return defaultHighlightedIndex;
  }
  if (selectedItem) {
    if (offset2 === 0) {
      return items.indexOf(selectedItem);
    }
    return getNextWrappingIndex(
      offset2,
      items.indexOf(selectedItem),
      items.length,
      getItemNodeFromIndex,
      false
    );
  }
  if (offset2 === 0) {
    return -1;
  }
  return offset2 < 0 ? items.length - 1 : 0;
}
function useMouseAndTouchTracker(
  isOpen,
  downshiftElementRefs,
  environment,
  handleBlur
) {
  var mouseAndTouchTrackersRef = useRef6({
    isMouseDown: false,
    isTouchMove: false,
  });
  useEffect6(
    function () {
      var onMouseDown = function onMouseDown2() {
        mouseAndTouchTrackersRef.current.isMouseDown = true;
      };
      var onMouseUp = function onMouseUp2(event) {
        mouseAndTouchTrackersRef.current.isMouseDown = false;
        if (
          isOpen &&
          !targetWithinDownshift(
            event.target,
            downshiftElementRefs.map(function (ref) {
              return ref.current;
            }),
            environment
          )
        ) {
          handleBlur();
        }
      };
      var onTouchStart = function onTouchStart2() {
        mouseAndTouchTrackersRef.current.isTouchMove = false;
      };
      var onTouchMove = function onTouchMove2() {
        mouseAndTouchTrackersRef.current.isTouchMove = true;
      };
      var onTouchEnd = function onTouchEnd2(event) {
        if (
          isOpen &&
          !mouseAndTouchTrackersRef.current.isTouchMove &&
          !targetWithinDownshift(
            event.target,
            downshiftElementRefs.map(function (ref) {
              return ref.current;
            }),
            environment,
            false
          )
        ) {
          handleBlur();
        }
      };
      environment.addEventListener("mousedown", onMouseDown);
      environment.addEventListener("mouseup", onMouseUp);
      environment.addEventListener("touchstart", onTouchStart);
      environment.addEventListener("touchmove", onTouchMove);
      environment.addEventListener("touchend", onTouchEnd);
      return function cleanup() {
        environment.removeEventListener("mousedown", onMouseDown);
        environment.removeEventListener("mouseup", onMouseUp);
        environment.removeEventListener("touchstart", onTouchStart);
        environment.removeEventListener("touchmove", onTouchMove);
        environment.removeEventListener("touchend", onTouchEnd);
      };
    },
    [isOpen, environment]
  );
  return mouseAndTouchTrackersRef;
}
var useGetterPropsCalledChecker = function useGetterPropsCalledChecker2() {
  return noop;
};
if (false) {
  useGetterPropsCalledChecker = function useGetterPropsCalledChecker3() {
    var isInitialMountRef = useRef6(true);
    for (
      var _len = arguments.length, propKeys = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      propKeys[_key] = arguments[_key];
    }
    var getterPropsCalledRef = useRef6(
      propKeys.reduce(function (acc, propKey) {
        acc[propKey] = {};
        return acc;
      }, {})
    );
    useEffect6(function () {
      Object.keys(getterPropsCalledRef.current).forEach(function (propKey) {
        var propCallInfo = getterPropsCalledRef.current[propKey];
        if (isInitialMountRef.current) {
          if (!Object.keys(propCallInfo).length) {
            console.error(
              "downshift: You forgot to call the " +
                propKey +
                " getter function on your component / element."
            );
            return;
          }
        }
        var suppressRefError = propCallInfo.suppressRefError,
          refKey = propCallInfo.refKey,
          elementRef = propCallInfo.elementRef;
        if ((!elementRef || !elementRef.current) && !suppressRefError) {
          console.error(
            'downshift: The ref prop "' +
              refKey +
              '" from ' +
              propKey +
              " was not applied correctly on your element."
          );
        }
      });
      isInitialMountRef.current = false;
    });
    var setGetterPropCallInfo = useCallback3(function (
      propKey,
      suppressRefError,
      refKey,
      elementRef
    ) {
      getterPropsCalledRef.current[propKey] = {
        suppressRefError,
        refKey,
        elementRef,
      };
    },
    []);
    return setGetterPropCallInfo;
  };
}
function useA11yMessageSetter(getA11yMessage, dependencyArray, _ref2) {
  var isInitialMount = _ref2.isInitialMount,
    highlightedIndex = _ref2.highlightedIndex,
    items = _ref2.items,
    environment = _ref2.environment,
    rest = _objectWithoutPropertiesLoose(_ref2, _excluded$3);
  useEffect6(function () {
    if (isInitialMount || false) {
      return;
    }
    updateA11yStatus(function () {
      return getA11yMessage(
        _extends(
          {
            highlightedIndex,
            highlightedItem: items[highlightedIndex],
            resultCount: items.length,
          },
          rest
        )
      );
    }, environment.document);
  }, dependencyArray);
}
function useScrollIntoView(_ref3) {
  var highlightedIndex = _ref3.highlightedIndex,
    isOpen = _ref3.isOpen,
    itemRefs = _ref3.itemRefs,
    getItemNodeFromIndex = _ref3.getItemNodeFromIndex,
    menuElement = _ref3.menuElement,
    scrollIntoViewProp = _ref3.scrollIntoView;
  var shouldScrollRef = useRef6(true);
  useIsomorphicLayoutEffect3(
    function () {
      if (
        highlightedIndex < 0 ||
        !isOpen ||
        !Object.keys(itemRefs.current).length
      ) {
        return;
      }
      if (shouldScrollRef.current === false) {
        shouldScrollRef.current = true;
      } else {
        scrollIntoViewProp(getItemNodeFromIndex(highlightedIndex), menuElement);
      }
    },
    [highlightedIndex]
  );
  return shouldScrollRef;
}
var useControlPropsValidator = noop;
if (false) {
  useControlPropsValidator = function useControlPropsValidator2(_ref4) {
    var isInitialMount = _ref4.isInitialMount,
      props = _ref4.props,
      state = _ref4.state;
    var prevPropsRef = useRef6(props);
    useEffect6(
      function () {
        if (isInitialMount) {
          return;
        }
        validateControlledUnchanged(state, prevPropsRef.current, props);
        prevPropsRef.current = props;
      },
      [state, props, isInitialMount]
    );
  };
}
function downshiftCommonReducer(state, action, stateChangeTypes2) {
  var type = action.type,
    props = action.props;
  var changes;
  switch (type) {
    case stateChangeTypes2.ItemMouseMove:
      changes = {
        highlightedIndex: action.index,
      };
      break;
    case stateChangeTypes2.MenuMouseLeave:
      changes = {
        highlightedIndex: -1,
      };
      break;
    case stateChangeTypes2.ToggleButtonClick:
    case stateChangeTypes2.FunctionToggleMenu:
      changes = {
        isOpen: !state.isOpen,
        highlightedIndex: state.isOpen
          ? -1
          : getHighlightedIndexOnOpen(props, state, 0),
      };
      break;
    case stateChangeTypes2.FunctionOpenMenu:
      changes = {
        isOpen: true,
        highlightedIndex: getHighlightedIndexOnOpen(props, state, 0),
      };
      break;
    case stateChangeTypes2.FunctionCloseMenu:
      changes = {
        isOpen: false,
      };
      break;
    case stateChangeTypes2.FunctionSetHighlightedIndex:
      changes = {
        highlightedIndex: action.highlightedIndex,
      };
      break;
    case stateChangeTypes2.FunctionSetInputValue:
      changes = {
        inputValue: action.inputValue,
      };
      break;
    case stateChangeTypes2.FunctionReset:
      changes = {
        highlightedIndex: getDefaultValue$1(props, "highlightedIndex"),
        isOpen: getDefaultValue$1(props, "isOpen"),
        selectedItem: getDefaultValue$1(props, "selectedItem"),
        inputValue: getDefaultValue$1(props, "inputValue"),
      };
      break;
    default:
      throw new Error("Reducer called without proper action type.");
  }
  return _extends({}, state, changes);
}
function getItemIndexByCharacterKey(_a) {
  var keysSoFar = _a.keysSoFar,
    highlightedIndex = _a.highlightedIndex,
    items = _a.items,
    itemToString2 = _a.itemToString,
    getItemNodeFromIndex = _a.getItemNodeFromIndex;
  var lowerCasedKeysSoFar = keysSoFar.toLowerCase();
  for (var index = 0; index < items.length; index++) {
    var offsetIndex = (index + highlightedIndex + 1) % items.length;
    var item = items[offsetIndex];
    if (
      item !== void 0 &&
      itemToString2(item).toLowerCase().startsWith(lowerCasedKeysSoFar)
    ) {
      var element = getItemNodeFromIndex(offsetIndex);
      if (
        !(element === null || element === void 0
          ? void 0
          : element.hasAttribute("disabled"))
      ) {
        return offsetIndex;
      }
    }
  }
  return highlightedIndex;
}
var propTypes$2 = {
  items: import_prop_types.default.array.isRequired,
  itemToString: import_prop_types.default.func,
  getA11yStatusMessage: import_prop_types.default.func,
  getA11ySelectionMessage: import_prop_types.default.func,
  circularNavigation: import_prop_types.default.bool,
  highlightedIndex: import_prop_types.default.number,
  defaultHighlightedIndex: import_prop_types.default.number,
  initialHighlightedIndex: import_prop_types.default.number,
  isOpen: import_prop_types.default.bool,
  defaultIsOpen: import_prop_types.default.bool,
  initialIsOpen: import_prop_types.default.bool,
  selectedItem: import_prop_types.default.any,
  initialSelectedItem: import_prop_types.default.any,
  defaultSelectedItem: import_prop_types.default.any,
  id: import_prop_types.default.string,
  labelId: import_prop_types.default.string,
  menuId: import_prop_types.default.string,
  getItemId: import_prop_types.default.func,
  toggleButtonId: import_prop_types.default.string,
  stateReducer: import_prop_types.default.func,
  onSelectedItemChange: import_prop_types.default.func,
  onHighlightedIndexChange: import_prop_types.default.func,
  onStateChange: import_prop_types.default.func,
  onIsOpenChange: import_prop_types.default.func,
  environment: import_prop_types.default.shape({
    addEventListener: import_prop_types.default.func,
    removeEventListener: import_prop_types.default.func,
    document: import_prop_types.default.shape({
      getElementById: import_prop_types.default.func,
      activeElement: import_prop_types.default.any,
      body: import_prop_types.default.any,
    }),
  }),
};
function getA11yStatusMessage(_a) {
  var isOpen = _a.isOpen,
    resultCount = _a.resultCount,
    previousResultCount = _a.previousResultCount;
  if (!isOpen) {
    return "";
  }
  if (!resultCount) {
    return "No results are available.";
  }
  if (resultCount !== previousResultCount) {
    return (
      resultCount +
      " result" +
      (resultCount === 1 ? " is" : "s are") +
      " available, use up and down arrow keys to navigate. Press Enter or Space Bar keys to select."
    );
  }
  return "";
}
var defaultProps$2 = __assign(__assign({}, defaultProps$3), {
  getA11yStatusMessage,
});
var validatePropTypes$2 = noop;
if (false) {
  validatePropTypes$2 = function (options, caller) {
    import_prop_types.default.checkPropTypes(
      propTypes$2,
      options,
      "prop",
      caller.name
    );
  };
}
var MenuKeyDownArrowDown = false ? "__menu_keydown_arrow_down__" : 0;
var MenuKeyDownArrowUp = false ? "__menu_keydown_arrow_up__" : 1;
var MenuKeyDownEscape = false ? "__menu_keydown_escape__" : 2;
var MenuKeyDownHome = false ? "__menu_keydown_home__" : 3;
var MenuKeyDownEnd = false ? "__menu_keydown_end__" : 4;
var MenuKeyDownEnter = false ? "__menu_keydown_enter__" : 5;
var MenuKeyDownSpaceButton = false ? "__menu_keydown_space_button__" : 6;
var MenuKeyDownCharacter = false ? "__menu_keydown_character__" : 7;
var MenuBlur = false ? "__menu_blur__" : 8;
var MenuMouseLeave$1 = false ? "__menu_mouse_leave__" : 9;
var ItemMouseMove$1 = false ? "__item_mouse_move__" : 10;
var ItemClick$1 = false ? "__item_click__" : 11;
var ToggleButtonClick$1 = false ? "__togglebutton_click__" : 12;
var ToggleButtonKeyDownArrowDown = false
  ? "__togglebutton_keydown_arrow_down__"
  : 13;
var ToggleButtonKeyDownArrowUp = false
  ? "__togglebutton_keydown_arrow_up__"
  : 14;
var ToggleButtonKeyDownCharacter = false
  ? "__togglebutton_keydown_character__"
  : 15;
var FunctionToggleMenu$1 = false ? "__function_toggle_menu__" : 16;
var FunctionOpenMenu$1 = false ? "__function_open_menu__" : 17;
var FunctionCloseMenu$1 = false ? "__function_close_menu__" : 18;
var FunctionSetHighlightedIndex$1 = false
  ? "__function_set_highlighted_index__"
  : 19;
var FunctionSelectItem$1 = false ? "__function_select_item__" : 20;
var FunctionSetInputValue$1 = false ? "__function_set_input_value__" : 21;
var FunctionReset$2 = false ? "__function_reset__" : 22;
var stateChangeTypes$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  MenuKeyDownArrowDown,
  MenuKeyDownArrowUp,
  MenuKeyDownEscape,
  MenuKeyDownHome,
  MenuKeyDownEnd,
  MenuKeyDownEnter,
  MenuKeyDownSpaceButton,
  MenuKeyDownCharacter,
  MenuBlur,
  MenuMouseLeave: MenuMouseLeave$1,
  ItemMouseMove: ItemMouseMove$1,
  ItemClick: ItemClick$1,
  ToggleButtonClick: ToggleButtonClick$1,
  ToggleButtonKeyDownArrowDown,
  ToggleButtonKeyDownArrowUp,
  ToggleButtonKeyDownCharacter,
  FunctionToggleMenu: FunctionToggleMenu$1,
  FunctionOpenMenu: FunctionOpenMenu$1,
  FunctionCloseMenu: FunctionCloseMenu$1,
  FunctionSetHighlightedIndex: FunctionSetHighlightedIndex$1,
  FunctionSelectItem: FunctionSelectItem$1,
  FunctionSetInputValue: FunctionSetInputValue$1,
  FunctionReset: FunctionReset$2,
});
function downshiftSelectReducer(state, action) {
  var type = action.type,
    props = action.props,
    shiftKey = action.shiftKey;
  var changes;
  switch (type) {
    case ItemClick$1:
      changes = {
        isOpen: getDefaultValue$1(props, "isOpen"),
        highlightedIndex: getDefaultValue$1(props, "highlightedIndex"),
        selectedItem: props.items[action.index],
      };
      break;
    case ToggleButtonKeyDownCharacter:
      {
        var lowercasedKey = action.key;
        var inputValue = "" + state.inputValue + lowercasedKey;
        var itemIndex = getItemIndexByCharacterKey({
          keysSoFar: inputValue,
          highlightedIndex: state.selectedItem
            ? props.items.indexOf(state.selectedItem)
            : -1,
          items: props.items,
          itemToString: props.itemToString,
          getItemNodeFromIndex: action.getItemNodeFromIndex,
        });
        changes = _extends(
          {
            inputValue,
          },
          itemIndex >= 0 && {
            selectedItem: props.items[itemIndex],
          }
        );
      }
      break;
    case ToggleButtonKeyDownArrowDown:
      changes = {
        highlightedIndex: getHighlightedIndexOnOpen(
          props,
          state,
          1,
          action.getItemNodeFromIndex
        ),
        isOpen: true,
      };
      break;
    case ToggleButtonKeyDownArrowUp:
      changes = {
        highlightedIndex: getHighlightedIndexOnOpen(
          props,
          state,
          -1,
          action.getItemNodeFromIndex
        ),
        isOpen: true,
      };
      break;
    case MenuKeyDownEnter:
    case MenuKeyDownSpaceButton:
      changes = _extends(
        {
          isOpen: getDefaultValue$1(props, "isOpen"),
          highlightedIndex: getDefaultValue$1(props, "highlightedIndex"),
        },
        state.highlightedIndex >= 0 && {
          selectedItem: props.items[state.highlightedIndex],
        }
      );
      break;
    case MenuKeyDownHome:
      changes = {
        highlightedIndex: getNextNonDisabledIndex(
          1,
          0,
          props.items.length,
          action.getItemNodeFromIndex,
          false
        ),
      };
      break;
    case MenuKeyDownEnd:
      changes = {
        highlightedIndex: getNextNonDisabledIndex(
          -1,
          props.items.length - 1,
          props.items.length,
          action.getItemNodeFromIndex,
          false
        ),
      };
      break;
    case MenuKeyDownEscape:
      changes = {
        isOpen: false,
        highlightedIndex: -1,
      };
      break;
    case MenuBlur:
      changes = {
        isOpen: false,
        highlightedIndex: -1,
      };
      break;
    case MenuKeyDownCharacter:
      {
        var _lowercasedKey = action.key;
        var _inputValue = "" + state.inputValue + _lowercasedKey;
        var highlightedIndex = getItemIndexByCharacterKey({
          keysSoFar: _inputValue,
          highlightedIndex: state.highlightedIndex,
          items: props.items,
          itemToString: props.itemToString,
          getItemNodeFromIndex: action.getItemNodeFromIndex,
        });
        changes = _extends(
          {
            inputValue: _inputValue,
          },
          highlightedIndex >= 0 && {
            highlightedIndex,
          }
        );
      }
      break;
    case MenuKeyDownArrowDown:
      changes = {
        highlightedIndex: getNextWrappingIndex(
          shiftKey ? 5 : 1,
          state.highlightedIndex,
          props.items.length,
          action.getItemNodeFromIndex,
          props.circularNavigation
        ),
      };
      break;
    case MenuKeyDownArrowUp:
      changes = {
        highlightedIndex: getNextWrappingIndex(
          shiftKey ? -5 : -1,
          state.highlightedIndex,
          props.items.length,
          action.getItemNodeFromIndex,
          props.circularNavigation
        ),
      };
      break;
    case FunctionSelectItem$1:
      changes = {
        selectedItem: action.selectedItem,
      };
      break;
    default:
      return downshiftCommonReducer(state, action, stateChangeTypes$2);
  }
  return _extends({}, state, changes);
}
var _excluded$2 = ["onMouseLeave", "refKey", "onKeyDown", "onBlur", "ref"];
var _excluded2$2 = ["onClick", "onKeyDown", "refKey", "ref"];
var _excluded3$1 = ["item", "index", "onMouseMove", "onClick", "refKey", "ref"];
useSelect.stateChangeTypes = stateChangeTypes$2;
function useSelect(userProps) {
  if (userProps === void 0) {
    userProps = {};
  }
  validatePropTypes$2(userProps, useSelect);
  var props = _extends({}, defaultProps$2, userProps);
  var items = props.items,
    scrollIntoView2 = props.scrollIntoView,
    environment = props.environment,
    initialIsOpen = props.initialIsOpen,
    defaultIsOpen = props.defaultIsOpen,
    itemToString2 = props.itemToString,
    getA11ySelectionMessage2 = props.getA11ySelectionMessage,
    getA11yStatusMessage2 = props.getA11yStatusMessage;
  var initialState = getInitialState$2(props);
  var _useControlledReducer = useControlledReducer$1(
      downshiftSelectReducer,
      initialState,
      props
    ),
    state = _useControlledReducer[0],
    dispatch = _useControlledReducer[1];
  var isOpen = state.isOpen,
    highlightedIndex = state.highlightedIndex,
    selectedItem = state.selectedItem,
    inputValue = state.inputValue;
  var toggleButtonRef = useRef6(null);
  var menuRef = useRef6(null);
  var itemRefs = useRef6({});
  var shouldBlurRef = useRef6(true);
  var clearTimeoutRef = useRef6(null);
  var elementIds = useElementIds(props);
  var previousResultCountRef = useRef6();
  var isInitialMountRef = useRef6(true);
  var latest = useLatestRef({
    state,
    props,
  });
  var getItemNodeFromIndex = useCallback3(
    function (index) {
      return itemRefs.current[elementIds.getItemId(index)];
    },
    [elementIds]
  );
  useA11yMessageSetter(
    getA11yStatusMessage2,
    [isOpen, highlightedIndex, inputValue, items],
    _extends(
      {
        isInitialMount: isInitialMountRef.current,
        previousResultCount: previousResultCountRef.current,
        items,
        environment,
        itemToString: itemToString2,
      },
      state
    )
  );
  useA11yMessageSetter(
    getA11ySelectionMessage2,
    [selectedItem],
    _extends(
      {
        isInitialMount: isInitialMountRef.current,
        previousResultCount: previousResultCountRef.current,
        items,
        environment,
        itemToString: itemToString2,
      },
      state
    )
  );
  var shouldScrollRef = useScrollIntoView({
    menuElement: menuRef.current,
    highlightedIndex,
    isOpen,
    itemRefs,
    scrollIntoView: scrollIntoView2,
    getItemNodeFromIndex,
  });
  useEffect6(function () {
    clearTimeoutRef.current = debounce2(function (outerDispatch) {
      outerDispatch({
        type: FunctionSetInputValue$1,
        inputValue: "",
      });
    }, 500);
    return function () {
      clearTimeoutRef.current.cancel();
    };
  }, []);
  useEffect6(
    function () {
      if (!inputValue) {
        return;
      }
      clearTimeoutRef.current(dispatch);
    },
    [dispatch, inputValue]
  );
  useControlPropsValidator({
    isInitialMount: isInitialMountRef.current,
    props,
    state,
  });
  useEffect6(
    function () {
      if (isInitialMountRef.current) {
        if ((initialIsOpen || defaultIsOpen || isOpen) && menuRef.current) {
          menuRef.current.focus();
        }
        return;
      }
      if (isOpen) {
        if (menuRef.current) {
          menuRef.current.focus();
        }
        return;
      }
      if (environment.document.activeElement === menuRef.current) {
        if (toggleButtonRef.current) {
          shouldBlurRef.current = false;
          toggleButtonRef.current.focus();
        }
      }
    },
    [isOpen]
  );
  useEffect6(function () {
    if (isInitialMountRef.current) {
      return;
    }
    previousResultCountRef.current = items.length;
  });
  var mouseAndTouchTrackersRef = useMouseAndTouchTracker(
    isOpen,
    [menuRef, toggleButtonRef],
    environment,
    function () {
      dispatch({
        type: MenuBlur,
      });
    }
  );
  var setGetterPropCallInfo = useGetterPropsCalledChecker(
    "getMenuProps",
    "getToggleButtonProps"
  );
  useEffect6(function () {
    isInitialMountRef.current = false;
  }, []);
  useEffect6(
    function () {
      if (!isOpen) {
        itemRefs.current = {};
      }
    },
    [isOpen]
  );
  var toggleButtonKeyDownHandlers = useMemo2(
    function () {
      return {
        ArrowDown: function ArrowDown(event) {
          event.preventDefault();
          dispatch({
            type: ToggleButtonKeyDownArrowDown,
            getItemNodeFromIndex,
            shiftKey: event.shiftKey,
          });
        },
        ArrowUp: function ArrowUp(event) {
          event.preventDefault();
          dispatch({
            type: ToggleButtonKeyDownArrowUp,
            getItemNodeFromIndex,
            shiftKey: event.shiftKey,
          });
        },
      };
    },
    [dispatch, getItemNodeFromIndex]
  );
  var menuKeyDownHandlers = useMemo2(
    function () {
      return {
        ArrowDown: function ArrowDown(event) {
          event.preventDefault();
          dispatch({
            type: MenuKeyDownArrowDown,
            getItemNodeFromIndex,
            shiftKey: event.shiftKey,
          });
        },
        ArrowUp: function ArrowUp(event) {
          event.preventDefault();
          dispatch({
            type: MenuKeyDownArrowUp,
            getItemNodeFromIndex,
            shiftKey: event.shiftKey,
          });
        },
        Home: function Home(event) {
          event.preventDefault();
          dispatch({
            type: MenuKeyDownHome,
            getItemNodeFromIndex,
          });
        },
        End: function End(event) {
          event.preventDefault();
          dispatch({
            type: MenuKeyDownEnd,
            getItemNodeFromIndex,
          });
        },
        Escape: function Escape() {
          dispatch({
            type: MenuKeyDownEscape,
          });
        },
        Enter: function Enter(event) {
          event.preventDefault();
          dispatch({
            type: MenuKeyDownEnter,
          });
        },
        " ": function _(event) {
          event.preventDefault();
          dispatch({
            type: MenuKeyDownSpaceButton,
          });
        },
      };
    },
    [dispatch, getItemNodeFromIndex]
  );
  var toggleMenu = useCallback3(
    function () {
      dispatch({
        type: FunctionToggleMenu$1,
      });
    },
    [dispatch]
  );
  var closeMenu = useCallback3(
    function () {
      dispatch({
        type: FunctionCloseMenu$1,
      });
    },
    [dispatch]
  );
  var openMenu = useCallback3(
    function () {
      dispatch({
        type: FunctionOpenMenu$1,
      });
    },
    [dispatch]
  );
  var setHighlightedIndex = useCallback3(
    function (newHighlightedIndex) {
      dispatch({
        type: FunctionSetHighlightedIndex$1,
        highlightedIndex: newHighlightedIndex,
      });
    },
    [dispatch]
  );
  var selectItem = useCallback3(
    function (newSelectedItem) {
      dispatch({
        type: FunctionSelectItem$1,
        selectedItem: newSelectedItem,
      });
    },
    [dispatch]
  );
  var reset = useCallback3(
    function () {
      dispatch({
        type: FunctionReset$2,
      });
    },
    [dispatch]
  );
  var setInputValue = useCallback3(
    function (newInputValue) {
      dispatch({
        type: FunctionSetInputValue$1,
        inputValue: newInputValue,
      });
    },
    [dispatch]
  );
  var getLabelProps = useCallback3(
    function (labelProps) {
      return _extends(
        {
          id: elementIds.labelId,
          htmlFor: elementIds.toggleButtonId,
        },
        labelProps
      );
    },
    [elementIds]
  );
  var getMenuProps = useCallback3(
    function (_temp, _temp2) {
      var _extends2;
      var _ref = _temp === void 0 ? {} : _temp,
        onMouseLeave = _ref.onMouseLeave,
        _ref$refKey = _ref.refKey,
        refKey = _ref$refKey === void 0 ? "ref" : _ref$refKey,
        onKeyDown = _ref.onKeyDown,
        onBlur = _ref.onBlur,
        ref = _ref.ref,
        rest = _objectWithoutPropertiesLoose(_ref, _excluded$2);
      var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$suppressRefErro = _ref2.suppressRefError,
        suppressRefError =
          _ref2$suppressRefErro === void 0 ? false : _ref2$suppressRefErro;
      var latestState = latest.current.state;
      var menuHandleKeyDown = function menuHandleKeyDown2(event) {
        var key = normalizeArrowKey(event);
        if (key && menuKeyDownHandlers[key]) {
          menuKeyDownHandlers[key](event);
        } else if (isAcceptedCharacterKey(key)) {
          dispatch({
            type: MenuKeyDownCharacter,
            key,
            getItemNodeFromIndex,
          });
        }
      };
      var menuHandleBlur = function menuHandleBlur2() {
        if (shouldBlurRef.current === false) {
          shouldBlurRef.current = true;
          return;
        }
        var shouldBlur = !mouseAndTouchTrackersRef.current.isMouseDown;
        if (shouldBlur) {
          dispatch({
            type: MenuBlur,
          });
        }
      };
      var menuHandleMouseLeave = function menuHandleMouseLeave2() {
        dispatch({
          type: MenuMouseLeave$1,
        });
      };
      setGetterPropCallInfo("getMenuProps", suppressRefError, refKey, menuRef);
      return _extends(
        ((_extends2 = {}),
        (_extends2[refKey] = handleRefs(ref, function (menuNode) {
          menuRef.current = menuNode;
        })),
        (_extends2.id = elementIds.menuId),
        (_extends2.role = "listbox"),
        (_extends2["aria-labelledby"] = elementIds.labelId),
        (_extends2.tabIndex = -1),
        _extends2),
        latestState.isOpen &&
          latestState.highlightedIndex > -1 && {
            "aria-activedescendant": elementIds.getItemId(
              latestState.highlightedIndex
            ),
          },
        {
          onMouseLeave: callAllEventHandlers(
            onMouseLeave,
            menuHandleMouseLeave
          ),
          onKeyDown: callAllEventHandlers(onKeyDown, menuHandleKeyDown),
          onBlur: callAllEventHandlers(onBlur, menuHandleBlur),
        },
        rest
      );
    },
    [
      dispatch,
      latest,
      menuKeyDownHandlers,
      mouseAndTouchTrackersRef,
      setGetterPropCallInfo,
      elementIds,
      getItemNodeFromIndex,
    ]
  );
  var getToggleButtonProps = useCallback3(
    function (_temp3, _temp4) {
      var _extends3;
      var _ref3 = _temp3 === void 0 ? {} : _temp3,
        onClick = _ref3.onClick,
        onKeyDown = _ref3.onKeyDown,
        _ref3$refKey = _ref3.refKey,
        refKey = _ref3$refKey === void 0 ? "ref" : _ref3$refKey,
        ref = _ref3.ref,
        rest = _objectWithoutPropertiesLoose(_ref3, _excluded2$2);
      var _ref4 = _temp4 === void 0 ? {} : _temp4,
        _ref4$suppressRefErro = _ref4.suppressRefError,
        suppressRefError =
          _ref4$suppressRefErro === void 0 ? false : _ref4$suppressRefErro;
      var toggleButtonHandleClick = function toggleButtonHandleClick2() {
        dispatch({
          type: ToggleButtonClick$1,
        });
      };
      var toggleButtonHandleKeyDown = function toggleButtonHandleKeyDown2(
        event
      ) {
        var key = normalizeArrowKey(event);
        if (key && toggleButtonKeyDownHandlers[key]) {
          toggleButtonKeyDownHandlers[key](event);
        } else if (isAcceptedCharacterKey(key)) {
          dispatch({
            type: ToggleButtonKeyDownCharacter,
            key,
            getItemNodeFromIndex,
          });
        }
      };
      var toggleProps = _extends(
        ((_extends3 = {}),
        (_extends3[refKey] = handleRefs(ref, function (toggleButtonNode) {
          toggleButtonRef.current = toggleButtonNode;
        })),
        (_extends3.id = elementIds.toggleButtonId),
        (_extends3["aria-haspopup"] = "listbox"),
        (_extends3["aria-expanded"] = latest.current.state.isOpen),
        (_extends3["aria-labelledby"] =
          elementIds.labelId + " " + elementIds.toggleButtonId),
        _extends3),
        rest
      );
      if (!rest.disabled) {
        toggleProps.onClick = callAllEventHandlers(
          onClick,
          toggleButtonHandleClick
        );
        toggleProps.onKeyDown = callAllEventHandlers(
          onKeyDown,
          toggleButtonHandleKeyDown
        );
      }
      setGetterPropCallInfo(
        "getToggleButtonProps",
        suppressRefError,
        refKey,
        toggleButtonRef
      );
      return toggleProps;
    },
    [
      dispatch,
      latest,
      toggleButtonKeyDownHandlers,
      setGetterPropCallInfo,
      elementIds,
      getItemNodeFromIndex,
    ]
  );
  var getItemProps = useCallback3(
    function (_temp5) {
      var _extends4;
      var _ref5 = _temp5 === void 0 ? {} : _temp5,
        item = _ref5.item,
        index = _ref5.index,
        onMouseMove = _ref5.onMouseMove,
        onClick = _ref5.onClick,
        _ref5$refKey = _ref5.refKey,
        refKey = _ref5$refKey === void 0 ? "ref" : _ref5$refKey,
        ref = _ref5.ref,
        rest = _objectWithoutPropertiesLoose(_ref5, _excluded3$1);
      var _latest$current = latest.current,
        latestState = _latest$current.state,
        latestProps = _latest$current.props;
      var itemHandleMouseMove = function itemHandleMouseMove2() {
        if (index === latestState.highlightedIndex) {
          return;
        }
        shouldScrollRef.current = false;
        dispatch({
          type: ItemMouseMove$1,
          index,
        });
      };
      var itemHandleClick = function itemHandleClick2() {
        dispatch({
          type: ItemClick$1,
          index,
        });
      };
      var itemIndex = getItemIndex(index, item, latestProps.items);
      if (itemIndex < 0) {
        throw new Error("Pass either item or item index in getItemProps!");
      }
      var itemProps = _extends(
        ((_extends4 = {
          role: "option",
          "aria-selected": "" + (itemIndex === latestState.highlightedIndex),
          id: elementIds.getItemId(itemIndex),
        }),
        (_extends4[refKey] = handleRefs(ref, function (itemNode) {
          if (itemNode) {
            itemRefs.current[elementIds.getItemId(itemIndex)] = itemNode;
          }
        })),
        _extends4),
        rest
      );
      if (!rest.disabled) {
        itemProps.onMouseMove = callAllEventHandlers(
          onMouseMove,
          itemHandleMouseMove
        );
        itemProps.onClick = callAllEventHandlers(onClick, itemHandleClick);
      }
      return itemProps;
    },
    [dispatch, latest, shouldScrollRef, elementIds]
  );
  return {
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getItemProps,
    toggleMenu,
    openMenu,
    closeMenu,
    setHighlightedIndex,
    selectItem,
    reset,
    setInputValue,
    highlightedIndex,
    isOpen,
    selectedItem,
    inputValue,
  };
}
var InputKeyDownArrowDown = false ? "__input_keydown_arrow_down__" : 0;
var InputKeyDownArrowUp = false ? "__input_keydown_arrow_up__" : 1;
var InputKeyDownEscape = false ? "__input_keydown_escape__" : 2;
var InputKeyDownHome = false ? "__input_keydown_home__" : 3;
var InputKeyDownEnd = false ? "__input_keydown_end__" : 4;
var InputKeyDownEnter = false ? "__input_keydown_enter__" : 5;
var InputChange = false ? "__input_change__" : 6;
var InputBlur = false ? "__input_blur__" : 7;
var MenuMouseLeave = false ? "__menu_mouse_leave__" : 8;
var ItemMouseMove = false ? "__item_mouse_move__" : 9;
var ItemClick = false ? "__item_click__" : 10;
var ToggleButtonClick = false ? "__togglebutton_click__" : 11;
var FunctionToggleMenu = false ? "__function_toggle_menu__" : 12;
var FunctionOpenMenu = false ? "__function_open_menu__" : 13;
var FunctionCloseMenu = false ? "__function_close_menu__" : 14;
var FunctionSetHighlightedIndex = false
  ? "__function_set_highlighted_index__"
  : 15;
var FunctionSelectItem = false ? "__function_select_item__" : 16;
var FunctionSetInputValue = false ? "__function_set_input_value__" : 17;
var FunctionReset$1 = false ? "__function_reset__" : 18;
var ControlledPropUpdatedSelectedItem = false
  ? "__controlled_prop_updated_selected_item__"
  : 19;
var stateChangeTypes$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  InputKeyDownArrowDown,
  InputKeyDownArrowUp,
  InputKeyDownEscape,
  InputKeyDownHome,
  InputKeyDownEnd,
  InputKeyDownEnter,
  InputChange,
  InputBlur,
  MenuMouseLeave,
  ItemMouseMove,
  ItemClick,
  ToggleButtonClick,
  FunctionToggleMenu,
  FunctionOpenMenu,
  FunctionCloseMenu,
  FunctionSetHighlightedIndex,
  FunctionSelectItem,
  FunctionSetInputValue,
  FunctionReset: FunctionReset$1,
  ControlledPropUpdatedSelectedItem,
});
function getInitialState$1(props) {
  var initialState = getInitialState$2(props);
  var selectedItem = initialState.selectedItem;
  var inputValue = initialState.inputValue;
  if (
    inputValue === "" &&
    selectedItem &&
    props.defaultInputValue === void 0 &&
    props.initialInputValue === void 0 &&
    props.inputValue === void 0
  ) {
    inputValue = props.itemToString(selectedItem);
  }
  return _extends({}, initialState, {
    inputValue,
  });
}
var propTypes$1 = {
  items: import_prop_types.default.array.isRequired,
  itemToString: import_prop_types.default.func,
  getA11yStatusMessage: import_prop_types.default.func,
  getA11ySelectionMessage: import_prop_types.default.func,
  circularNavigation: import_prop_types.default.bool,
  highlightedIndex: import_prop_types.default.number,
  defaultHighlightedIndex: import_prop_types.default.number,
  initialHighlightedIndex: import_prop_types.default.number,
  isOpen: import_prop_types.default.bool,
  defaultIsOpen: import_prop_types.default.bool,
  initialIsOpen: import_prop_types.default.bool,
  selectedItem: import_prop_types.default.any,
  initialSelectedItem: import_prop_types.default.any,
  defaultSelectedItem: import_prop_types.default.any,
  inputValue: import_prop_types.default.string,
  defaultInputValue: import_prop_types.default.string,
  initialInputValue: import_prop_types.default.string,
  id: import_prop_types.default.string,
  labelId: import_prop_types.default.string,
  menuId: import_prop_types.default.string,
  getItemId: import_prop_types.default.func,
  inputId: import_prop_types.default.string,
  toggleButtonId: import_prop_types.default.string,
  stateReducer: import_prop_types.default.func,
  onSelectedItemChange: import_prop_types.default.func,
  onHighlightedIndexChange: import_prop_types.default.func,
  onStateChange: import_prop_types.default.func,
  onIsOpenChange: import_prop_types.default.func,
  onInputValueChange: import_prop_types.default.func,
  environment: import_prop_types.default.shape({
    addEventListener: import_prop_types.default.func,
    removeEventListener: import_prop_types.default.func,
    document: import_prop_types.default.shape({
      getElementById: import_prop_types.default.func,
      activeElement: import_prop_types.default.any,
      body: import_prop_types.default.any,
    }),
  }),
};
function useControlledReducer(reducer, initialState, props) {
  var previousSelectedItemRef = useRef6();
  var _useEnhancedReducer = useEnhancedReducer(reducer, initialState, props),
    state = _useEnhancedReducer[0],
    dispatch = _useEnhancedReducer[1];
  useEffect6(function () {
    if (isControlledProp(props, "selectedItem")) {
      if (previousSelectedItemRef.current !== props.selectedItem) {
        dispatch({
          type: ControlledPropUpdatedSelectedItem,
          inputValue: props.itemToString(props.selectedItem),
        });
      }
      previousSelectedItemRef.current =
        state.selectedItem === previousSelectedItemRef.current
          ? props.selectedItem
          : state.selectedItem;
    }
  });
  return [getState(state, props), dispatch];
}
var validatePropTypes$1 = noop;
if (false) {
  validatePropTypes$1 = function validatePropTypes2(options, caller) {
    import_prop_types.default.checkPropTypes(
      propTypes$1,
      options,
      "prop",
      caller.name
    );
  };
}
var defaultProps$1 = _extends({}, defaultProps$3, {
  getA11yStatusMessage: getA11yStatusMessage$1,
  circularNavigation: true,
});
function downshiftUseComboboxReducer(state, action) {
  var type = action.type,
    props = action.props,
    shiftKey = action.shiftKey;
  var changes;
  switch (type) {
    case ItemClick:
      changes = {
        isOpen: getDefaultValue$1(props, "isOpen"),
        highlightedIndex: getDefaultValue$1(props, "highlightedIndex"),
        selectedItem: props.items[action.index],
        inputValue: props.itemToString(props.items[action.index]),
      };
      break;
    case InputKeyDownArrowDown:
      if (state.isOpen) {
        changes = {
          highlightedIndex: getNextWrappingIndex(
            shiftKey ? 5 : 1,
            state.highlightedIndex,
            props.items.length,
            action.getItemNodeFromIndex,
            props.circularNavigation
          ),
        };
      } else {
        changes = {
          highlightedIndex: getHighlightedIndexOnOpen(
            props,
            state,
            1,
            action.getItemNodeFromIndex
          ),
          isOpen: props.items.length >= 0,
        };
      }
      break;
    case InputKeyDownArrowUp:
      if (state.isOpen) {
        changes = {
          highlightedIndex: getNextWrappingIndex(
            shiftKey ? -5 : -1,
            state.highlightedIndex,
            props.items.length,
            action.getItemNodeFromIndex,
            props.circularNavigation
          ),
        };
      } else {
        changes = {
          highlightedIndex: getHighlightedIndexOnOpen(
            props,
            state,
            -1,
            action.getItemNodeFromIndex
          ),
          isOpen: props.items.length >= 0,
        };
      }
      break;
    case InputKeyDownEnter:
      changes = _extends(
        {},
        state.isOpen &&
          state.highlightedIndex >= 0 && {
            selectedItem: props.items[state.highlightedIndex],
            isOpen: getDefaultValue$1(props, "isOpen"),
            highlightedIndex: getDefaultValue$1(props, "highlightedIndex"),
            inputValue: props.itemToString(props.items[state.highlightedIndex]),
          }
      );
      break;
    case InputKeyDownEscape:
      changes = _extends(
        {
          isOpen: false,
          highlightedIndex: -1,
        },
        !state.isOpen && {
          selectedItem: null,
          inputValue: "",
        }
      );
      break;
    case InputKeyDownHome:
      changes = {
        highlightedIndex: getNextNonDisabledIndex(
          1,
          0,
          props.items.length,
          action.getItemNodeFromIndex,
          false
        ),
      };
      break;
    case InputKeyDownEnd:
      changes = {
        highlightedIndex: getNextNonDisabledIndex(
          -1,
          props.items.length - 1,
          props.items.length,
          action.getItemNodeFromIndex,
          false
        ),
      };
      break;
    case InputBlur:
      changes = _extends(
        {
          isOpen: false,
          highlightedIndex: -1,
        },
        state.highlightedIndex >= 0 &&
          action.selectItem && {
            selectedItem: props.items[state.highlightedIndex],
            inputValue: props.itemToString(props.items[state.highlightedIndex]),
          }
      );
      break;
    case InputChange:
      changes = {
        isOpen: true,
        highlightedIndex: getDefaultValue$1(props, "highlightedIndex"),
        inputValue: action.inputValue,
      };
      break;
    case FunctionSelectItem:
      changes = {
        selectedItem: action.selectedItem,
        inputValue: props.itemToString(action.selectedItem),
      };
      break;
    case ControlledPropUpdatedSelectedItem:
      changes = {
        inputValue: action.inputValue,
      };
      break;
    default:
      return downshiftCommonReducer(state, action, stateChangeTypes$1);
  }
  return _extends({}, state, changes);
}
var _excluded$1 = ["onMouseLeave", "refKey", "ref"];
var _excluded2$1 = [
  "item",
  "index",
  "refKey",
  "ref",
  "onMouseMove",
  "onClick",
  "onPress",
];
var _excluded3 = ["onClick", "onPress", "refKey", "ref"];
var _excluded4 = [
  "onKeyDown",
  "onChange",
  "onInput",
  "onBlur",
  "onChangeText",
  "refKey",
  "ref",
];
var _excluded5 = ["refKey", "ref"];
useCombobox.stateChangeTypes = stateChangeTypes$1;
function useCombobox(userProps) {
  if (userProps === void 0) {
    userProps = {};
  }
  validatePropTypes$1(userProps, useCombobox);
  var props = _extends({}, defaultProps$1, userProps);
  var initialIsOpen = props.initialIsOpen,
    defaultIsOpen = props.defaultIsOpen,
    items = props.items,
    scrollIntoView2 = props.scrollIntoView,
    environment = props.environment,
    getA11yStatusMessage2 = props.getA11yStatusMessage,
    getA11ySelectionMessage2 = props.getA11ySelectionMessage,
    itemToString2 = props.itemToString;
  var initialState = getInitialState$1(props);
  var _useControlledReducer = useControlledReducer(
      downshiftUseComboboxReducer,
      initialState,
      props
    ),
    state = _useControlledReducer[0],
    dispatch = _useControlledReducer[1];
  var isOpen = state.isOpen,
    highlightedIndex = state.highlightedIndex,
    selectedItem = state.selectedItem,
    inputValue = state.inputValue;
  var menuRef = useRef6(null);
  var itemRefs = useRef6({});
  var inputRef = useRef6(null);
  var toggleButtonRef = useRef6(null);
  var comboboxRef = useRef6(null);
  var isInitialMountRef = useRef6(true);
  var elementIds = useElementIds(props);
  var previousResultCountRef = useRef6();
  var latest = useLatestRef({
    state,
    props,
  });
  var getItemNodeFromIndex = useCallback3(
    function (index) {
      return itemRefs.current[elementIds.getItemId(index)];
    },
    [elementIds]
  );
  useA11yMessageSetter(
    getA11yStatusMessage2,
    [isOpen, highlightedIndex, inputValue, items],
    _extends(
      {
        isInitialMount: isInitialMountRef.current,
        previousResultCount: previousResultCountRef.current,
        items,
        environment,
        itemToString: itemToString2,
      },
      state
    )
  );
  useA11yMessageSetter(
    getA11ySelectionMessage2,
    [selectedItem],
    _extends(
      {
        isInitialMount: isInitialMountRef.current,
        previousResultCount: previousResultCountRef.current,
        items,
        environment,
        itemToString: itemToString2,
      },
      state
    )
  );
  var shouldScrollRef = useScrollIntoView({
    menuElement: menuRef.current,
    highlightedIndex,
    isOpen,
    itemRefs,
    scrollIntoView: scrollIntoView2,
    getItemNodeFromIndex,
  });
  useControlPropsValidator({
    isInitialMount: isInitialMountRef.current,
    props,
    state,
  });
  useEffect6(function () {
    var focusOnOpen = initialIsOpen || defaultIsOpen || isOpen;
    if (focusOnOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  useEffect6(function () {
    if (isInitialMountRef.current) {
      return;
    }
    previousResultCountRef.current = items.length;
  });
  var mouseAndTouchTrackersRef = useMouseAndTouchTracker(
    isOpen,
    [comboboxRef, menuRef, toggleButtonRef],
    environment,
    function () {
      dispatch({
        type: InputBlur,
        selectItem: false,
      });
    }
  );
  var setGetterPropCallInfo = useGetterPropsCalledChecker(
    "getInputProps",
    "getComboboxProps",
    "getMenuProps"
  );
  useEffect6(function () {
    isInitialMountRef.current = false;
  }, []);
  useEffect6(
    function () {
      if (!isOpen) {
        itemRefs.current = {};
      }
    },
    [isOpen]
  );
  var inputKeyDownHandlers = useMemo2(
    function () {
      return {
        ArrowDown: function ArrowDown(event) {
          event.preventDefault();
          dispatch({
            type: InputKeyDownArrowDown,
            shiftKey: event.shiftKey,
            getItemNodeFromIndex,
          });
        },
        ArrowUp: function ArrowUp(event) {
          event.preventDefault();
          dispatch({
            type: InputKeyDownArrowUp,
            shiftKey: event.shiftKey,
            getItemNodeFromIndex,
          });
        },
        Home: function Home(event) {
          if (!latest.current.state.isOpen) {
            return;
          }
          event.preventDefault();
          dispatch({
            type: InputKeyDownHome,
            getItemNodeFromIndex,
          });
        },
        End: function End(event) {
          if (!latest.current.state.isOpen) {
            return;
          }
          event.preventDefault();
          dispatch({
            type: InputKeyDownEnd,
            getItemNodeFromIndex,
          });
        },
        Escape: function Escape() {
          var latestState = latest.current.state;
          if (
            latestState.isOpen ||
            latestState.inputValue ||
            latestState.selectedItem ||
            latestState.highlightedIndex > -1
          ) {
            dispatch({
              type: InputKeyDownEscape,
            });
          }
        },
        Enter: function Enter(event) {
          var latestState = latest.current.state;
          if (
            !latestState.isOpen ||
            latestState.highlightedIndex < 0 ||
            event.which === 229
          ) {
            return;
          }
          event.preventDefault();
          dispatch({
            type: InputKeyDownEnter,
            getItemNodeFromIndex,
          });
        },
      };
    },
    [dispatch, latest, getItemNodeFromIndex]
  );
  var getLabelProps = useCallback3(
    function (labelProps) {
      return _extends(
        {
          id: elementIds.labelId,
          htmlFor: elementIds.inputId,
        },
        labelProps
      );
    },
    [elementIds]
  );
  var getMenuProps = useCallback3(
    function (_temp, _temp2) {
      var _extends2;
      var _ref = _temp === void 0 ? {} : _temp,
        onMouseLeave = _ref.onMouseLeave,
        _ref$refKey = _ref.refKey,
        refKey = _ref$refKey === void 0 ? "ref" : _ref$refKey,
        ref = _ref.ref,
        rest = _objectWithoutPropertiesLoose(_ref, _excluded$1);
      var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$suppressRefErro = _ref2.suppressRefError,
        suppressRefError =
          _ref2$suppressRefErro === void 0 ? false : _ref2$suppressRefErro;
      setGetterPropCallInfo("getMenuProps", suppressRefError, refKey, menuRef);
      return _extends(
        ((_extends2 = {}),
        (_extends2[refKey] = handleRefs(ref, function (menuNode) {
          menuRef.current = menuNode;
        })),
        (_extends2.id = elementIds.menuId),
        (_extends2.role = "listbox"),
        (_extends2["aria-labelledby"] = elementIds.labelId),
        (_extends2.onMouseLeave = callAllEventHandlers(
          onMouseLeave,
          function () {
            dispatch({
              type: MenuMouseLeave,
            });
          }
        )),
        _extends2),
        rest
      );
    },
    [dispatch, setGetterPropCallInfo, elementIds]
  );
  var getItemProps = useCallback3(
    function (_temp3) {
      var _extends3, _ref4;
      var _ref3 = _temp3 === void 0 ? {} : _temp3,
        item = _ref3.item,
        index = _ref3.index,
        _ref3$refKey = _ref3.refKey,
        refKey = _ref3$refKey === void 0 ? "ref" : _ref3$refKey,
        ref = _ref3.ref,
        onMouseMove = _ref3.onMouseMove,
        onClick = _ref3.onClick;
      _ref3.onPress;
      var rest = _objectWithoutPropertiesLoose(_ref3, _excluded2$1);
      var _latest$current = latest.current,
        latestProps = _latest$current.props,
        latestState = _latest$current.state;
      var itemIndex = getItemIndex(index, item, latestProps.items);
      if (itemIndex < 0) {
        throw new Error("Pass either item or item index in getItemProps!");
      }
      var onSelectKey = "onClick";
      var customClickHandler = onClick;
      var itemHandleMouseMove = function itemHandleMouseMove2() {
        if (index === latestState.highlightedIndex) {
          return;
        }
        shouldScrollRef.current = false;
        dispatch({
          type: ItemMouseMove,
          index,
        });
      };
      var itemHandleClick = function itemHandleClick2() {
        dispatch({
          type: ItemClick,
          index,
        });
        if (inputRef.current) {
          inputRef.current.focus();
        }
      };
      return _extends(
        ((_extends3 = {}),
        (_extends3[refKey] = handleRefs(ref, function (itemNode) {
          if (itemNode) {
            itemRefs.current[elementIds.getItemId(itemIndex)] = itemNode;
          }
        })),
        (_extends3.role = "option"),
        (_extends3["aria-selected"] =
          "" + (itemIndex === latestState.highlightedIndex)),
        (_extends3.id = elementIds.getItemId(itemIndex)),
        _extends3),
        !rest.disabled &&
          ((_ref4 = {
            onMouseMove: callAllEventHandlers(onMouseMove, itemHandleMouseMove),
          }),
          (_ref4[onSelectKey] = callAllEventHandlers(
            customClickHandler,
            itemHandleClick
          )),
          _ref4),
        rest
      );
    },
    [dispatch, latest, shouldScrollRef, elementIds]
  );
  var getToggleButtonProps = useCallback3(
    function (_temp4) {
      var _extends4;
      var _ref5 = _temp4 === void 0 ? {} : _temp4,
        onClick = _ref5.onClick;
      _ref5.onPress;
      var _ref5$refKey = _ref5.refKey,
        refKey = _ref5$refKey === void 0 ? "ref" : _ref5$refKey,
        ref = _ref5.ref,
        rest = _objectWithoutPropertiesLoose(_ref5, _excluded3);
      var toggleButtonHandleClick = function toggleButtonHandleClick2() {
        dispatch({
          type: ToggleButtonClick,
        });
        if (!latest.current.state.isOpen && inputRef.current) {
          inputRef.current.focus();
        }
      };
      return _extends(
        ((_extends4 = {}),
        (_extends4[refKey] = handleRefs(ref, function (toggleButtonNode) {
          toggleButtonRef.current = toggleButtonNode;
        })),
        (_extends4.id = elementIds.toggleButtonId),
        (_extends4.tabIndex = -1),
        _extends4),
        !rest.disabled &&
          _extends(
            {},
            {
              onClick: callAllEventHandlers(onClick, toggleButtonHandleClick),
            }
          ),
        rest
      );
    },
    [dispatch, latest, elementIds]
  );
  var getInputProps = useCallback3(
    function (_temp5, _temp6) {
      var _extends5;
      var _ref6 = _temp5 === void 0 ? {} : _temp5,
        onKeyDown = _ref6.onKeyDown,
        onChange = _ref6.onChange,
        onInput = _ref6.onInput,
        onBlur = _ref6.onBlur;
      _ref6.onChangeText;
      var _ref6$refKey = _ref6.refKey,
        refKey = _ref6$refKey === void 0 ? "ref" : _ref6$refKey,
        ref = _ref6.ref,
        rest = _objectWithoutPropertiesLoose(_ref6, _excluded4);
      var _ref7 = _temp6 === void 0 ? {} : _temp6,
        _ref7$suppressRefErro = _ref7.suppressRefError,
        suppressRefError =
          _ref7$suppressRefErro === void 0 ? false : _ref7$suppressRefErro;
      setGetterPropCallInfo(
        "getInputProps",
        suppressRefError,
        refKey,
        inputRef
      );
      var latestState = latest.current.state;
      var inputHandleKeyDown = function inputHandleKeyDown2(event) {
        var key = normalizeArrowKey(event);
        if (key && inputKeyDownHandlers[key]) {
          inputKeyDownHandlers[key](event);
        }
      };
      var inputHandleChange = function inputHandleChange2(event) {
        dispatch({
          type: InputChange,
          inputValue: event.target.value,
        });
      };
      var inputHandleBlur = function inputHandleBlur2() {
        if (
          latestState.isOpen &&
          !mouseAndTouchTrackersRef.current.isMouseDown
        ) {
          dispatch({
            type: InputBlur,
            selectItem: true,
          });
        }
      };
      var onChangeKey = "onChange";
      var eventHandlers = {};
      if (!rest.disabled) {
        var _eventHandlers;
        eventHandlers =
          ((_eventHandlers = {}),
          (_eventHandlers[onChangeKey] = callAllEventHandlers(
            onChange,
            onInput,
            inputHandleChange
          )),
          (_eventHandlers.onKeyDown = callAllEventHandlers(
            onKeyDown,
            inputHandleKeyDown
          )),
          (_eventHandlers.onBlur = callAllEventHandlers(
            onBlur,
            inputHandleBlur
          )),
          _eventHandlers);
      }
      return _extends(
        ((_extends5 = {}),
        (_extends5[refKey] = handleRefs(ref, function (inputNode) {
          inputRef.current = inputNode;
        })),
        (_extends5.id = elementIds.inputId),
        (_extends5["aria-autocomplete"] = "list"),
        (_extends5["aria-controls"] = elementIds.menuId),
        _extends5),
        latestState.isOpen &&
          latestState.highlightedIndex > -1 && {
            "aria-activedescendant": elementIds.getItemId(
              latestState.highlightedIndex
            ),
          },
        {
          "aria-labelledby": elementIds.labelId,
          autoComplete: "off",
          value: latestState.inputValue,
        },
        eventHandlers,
        rest
      );
    },
    [
      dispatch,
      inputKeyDownHandlers,
      latest,
      mouseAndTouchTrackersRef,
      setGetterPropCallInfo,
      elementIds,
    ]
  );
  var getComboboxProps = useCallback3(
    function (_temp7, _temp8) {
      var _extends6;
      var _ref8 = _temp7 === void 0 ? {} : _temp7,
        _ref8$refKey = _ref8.refKey,
        refKey = _ref8$refKey === void 0 ? "ref" : _ref8$refKey,
        ref = _ref8.ref,
        rest = _objectWithoutPropertiesLoose(_ref8, _excluded5);
      var _ref9 = _temp8 === void 0 ? {} : _temp8,
        _ref9$suppressRefErro = _ref9.suppressRefError,
        suppressRefError =
          _ref9$suppressRefErro === void 0 ? false : _ref9$suppressRefErro;
      setGetterPropCallInfo(
        "getComboboxProps",
        suppressRefError,
        refKey,
        comboboxRef
      );
      return _extends(
        ((_extends6 = {}),
        (_extends6[refKey] = handleRefs(ref, function (comboboxNode) {
          comboboxRef.current = comboboxNode;
        })),
        (_extends6.role = "combobox"),
        (_extends6["aria-haspopup"] = "listbox"),
        (_extends6["aria-owns"] = elementIds.menuId),
        (_extends6["aria-expanded"] = latest.current.state.isOpen),
        _extends6),
        rest
      );
    },
    [latest, setGetterPropCallInfo, elementIds]
  );
  var toggleMenu = useCallback3(
    function () {
      dispatch({
        type: FunctionToggleMenu,
      });
    },
    [dispatch]
  );
  var closeMenu = useCallback3(
    function () {
      dispatch({
        type: FunctionCloseMenu,
      });
    },
    [dispatch]
  );
  var openMenu = useCallback3(
    function () {
      dispatch({
        type: FunctionOpenMenu,
      });
    },
    [dispatch]
  );
  var setHighlightedIndex = useCallback3(
    function (newHighlightedIndex) {
      dispatch({
        type: FunctionSetHighlightedIndex,
        highlightedIndex: newHighlightedIndex,
      });
    },
    [dispatch]
  );
  var selectItem = useCallback3(
    function (newSelectedItem) {
      dispatch({
        type: FunctionSelectItem,
        selectedItem: newSelectedItem,
      });
    },
    [dispatch]
  );
  var setInputValue = useCallback3(
    function (newInputValue) {
      dispatch({
        type: FunctionSetInputValue,
        inputValue: newInputValue,
      });
    },
    [dispatch]
  );
  var reset = useCallback3(
    function () {
      dispatch({
        type: FunctionReset$1,
      });
    },
    [dispatch]
  );
  return {
    getItemProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getToggleButtonProps,
    toggleMenu,
    openMenu,
    closeMenu,
    setHighlightedIndex,
    setInputValue,
    selectItem,
    reset,
    highlightedIndex,
    isOpen,
    selectedItem,
    inputValue,
  };
}
var defaultStateValues = {
  activeIndex: -1,
  selectedItems: [],
};
function getInitialValue(props, propKey) {
  return getInitialValue$1(props, propKey, defaultStateValues);
}
function getDefaultValue(props, propKey) {
  return getDefaultValue$1(props, propKey, defaultStateValues);
}
function getInitialState2(props) {
  var activeIndex = getInitialValue(props, "activeIndex");
  var selectedItems = getInitialValue(props, "selectedItems");
  return {
    activeIndex,
    selectedItems,
  };
}
function isKeyDownOperationPermitted(event) {
  if (event.shiftKey || event.metaKey || event.ctrlKey || event.altKey) {
    return false;
  }
  var element = event.target;
  if (
    element instanceof HTMLInputElement &&
    element.value !== "" &&
    (element.selectionStart !== 0 || element.selectionEnd !== 0)
  ) {
    return false;
  }
  return true;
}
function getA11yRemovalMessage(selectionParameters) {
  var removedSelectedItem = selectionParameters.removedSelectedItem,
    itemToStringLocal = selectionParameters.itemToString;
  return itemToStringLocal(removedSelectedItem) + " has been removed.";
}
var propTypes = {
  selectedItems: import_prop_types.default.array,
  initialSelectedItems: import_prop_types.default.array,
  defaultSelectedItems: import_prop_types.default.array,
  itemToString: import_prop_types.default.func,
  getA11yRemovalMessage: import_prop_types.default.func,
  stateReducer: import_prop_types.default.func,
  activeIndex: import_prop_types.default.number,
  initialActiveIndex: import_prop_types.default.number,
  defaultActiveIndex: import_prop_types.default.number,
  onActiveIndexChange: import_prop_types.default.func,
  onSelectedItemsChange: import_prop_types.default.func,
  keyNavigationNext: import_prop_types.default.string,
  keyNavigationPrevious: import_prop_types.default.string,
  environment: import_prop_types.default.shape({
    addEventListener: import_prop_types.default.func,
    removeEventListener: import_prop_types.default.func,
    document: import_prop_types.default.shape({
      getElementById: import_prop_types.default.func,
      activeElement: import_prop_types.default.any,
      body: import_prop_types.default.any,
    }),
  }),
};
var defaultProps = {
  itemToString: defaultProps$3.itemToString,
  stateReducer: defaultProps$3.stateReducer,
  environment: defaultProps$3.environment,
  getA11yRemovalMessage,
  keyNavigationNext: "ArrowRight",
  keyNavigationPrevious: "ArrowLeft",
};
var validatePropTypes = noop;
if (false) {
  validatePropTypes = function validatePropTypes2(options, caller) {
    import_prop_types.default.checkPropTypes(
      propTypes,
      options,
      "prop",
      caller.name
    );
  };
}
var SelectedItemClick = false ? "__selected_item_click__" : 0;
var SelectedItemKeyDownDelete = false ? "__selected_item_keydown_delete__" : 1;
var SelectedItemKeyDownBackspace = false
  ? "__selected_item_keydown_backspace__"
  : 2;
var SelectedItemKeyDownNavigationNext = false
  ? "__selected_item_keydown_navigation_next__"
  : 3;
var SelectedItemKeyDownNavigationPrevious = false
  ? "__selected_item_keydown_navigation_previous__"
  : 4;
var DropdownKeyDownNavigationPrevious = false
  ? "__dropdown_keydown_navigation_previous__"
  : 5;
var DropdownKeyDownBackspace = false ? "__dropdown_keydown_backspace__" : 6;
var DropdownClick = false ? "__dropdown_click__" : 7;
var FunctionAddSelectedItem = false ? "__function_add_selected_item__" : 8;
var FunctionRemoveSelectedItem = false
  ? "__function_remove_selected_item__"
  : 9;
var FunctionSetSelectedItems = false ? "__function_set_selected_items__" : 10;
var FunctionSetActiveIndex = false ? "__function_set_active_index__" : 11;
var FunctionReset = false ? "__function_reset__" : 12;
var stateChangeTypes = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  SelectedItemClick,
  SelectedItemKeyDownDelete,
  SelectedItemKeyDownBackspace,
  SelectedItemKeyDownNavigationNext,
  SelectedItemKeyDownNavigationPrevious,
  DropdownKeyDownNavigationPrevious,
  DropdownKeyDownBackspace,
  DropdownClick,
  FunctionAddSelectedItem,
  FunctionRemoveSelectedItem,
  FunctionSetSelectedItems,
  FunctionSetActiveIndex,
  FunctionReset,
});
function downshiftMultipleSelectionReducer(state, action) {
  var type = action.type,
    index = action.index,
    props = action.props,
    selectedItem = action.selectedItem;
  var activeIndex = state.activeIndex,
    selectedItems = state.selectedItems;
  var changes;
  switch (type) {
    case SelectedItemClick:
      changes = {
        activeIndex: index,
      };
      break;
    case SelectedItemKeyDownNavigationPrevious:
      changes = {
        activeIndex: activeIndex - 1 < 0 ? 0 : activeIndex - 1,
      };
      break;
    case SelectedItemKeyDownNavigationNext:
      changes = {
        activeIndex:
          activeIndex + 1 >= selectedItems.length ? -1 : activeIndex + 1,
      };
      break;
    case SelectedItemKeyDownBackspace:
    case SelectedItemKeyDownDelete: {
      var newActiveIndex = activeIndex;
      if (selectedItems.length === 1) {
        newActiveIndex = -1;
      } else if (activeIndex === selectedItems.length - 1) {
        newActiveIndex = selectedItems.length - 2;
      }
      changes = _extends(
        {
          selectedItems: [].concat(
            selectedItems.slice(0, activeIndex),
            selectedItems.slice(activeIndex + 1)
          ),
        },
        {
          activeIndex: newActiveIndex,
        }
      );
      break;
    }
    case DropdownKeyDownNavigationPrevious:
      changes = {
        activeIndex: selectedItems.length - 1,
      };
      break;
    case DropdownKeyDownBackspace:
      changes = {
        selectedItems: selectedItems.slice(0, selectedItems.length - 1),
      };
      break;
    case FunctionAddSelectedItem:
      changes = {
        selectedItems: [].concat(selectedItems, [selectedItem]),
      };
      break;
    case DropdownClick:
      changes = {
        activeIndex: -1,
      };
      break;
    case FunctionRemoveSelectedItem: {
      var _newActiveIndex = activeIndex;
      var selectedItemIndex = selectedItems.indexOf(selectedItem);
      if (selectedItems.length === 1) {
        _newActiveIndex = -1;
      } else if (selectedItemIndex === selectedItems.length - 1) {
        _newActiveIndex = selectedItems.length - 2;
      }
      changes = _extends(
        {
          selectedItems: [].concat(
            selectedItems.slice(0, selectedItemIndex),
            selectedItems.slice(selectedItemIndex + 1)
          ),
        },
        {
          activeIndex: _newActiveIndex,
        }
      );
      break;
    }
    case FunctionSetSelectedItems: {
      var newSelectedItems = action.selectedItems;
      changes = {
        selectedItems: newSelectedItems,
      };
      break;
    }
    case FunctionSetActiveIndex: {
      var _newActiveIndex2 = action.activeIndex;
      changes = {
        activeIndex: _newActiveIndex2,
      };
      break;
    }
    case FunctionReset:
      changes = {
        activeIndex: getDefaultValue(props, "activeIndex"),
        selectedItems: getDefaultValue(props, "selectedItems"),
      };
      break;
    default:
      throw new Error("Reducer called without proper action type.");
  }
  return _extends({}, state, changes);
}
var _excluded = [
  "refKey",
  "ref",
  "onClick",
  "onKeyDown",
  "selectedItem",
  "index",
];
var _excluded2 = ["refKey", "ref", "onKeyDown", "onClick", "preventKeyAction"];
useMultipleSelection.stateChangeTypes = stateChangeTypes;
function useMultipleSelection(userProps) {
  if (userProps === void 0) {
    userProps = {};
  }
  validatePropTypes(userProps, useMultipleSelection);
  var props = _extends({}, defaultProps, userProps);
  var getA11yRemovalMessage2 = props.getA11yRemovalMessage,
    itemToString2 = props.itemToString,
    environment = props.environment,
    keyNavigationNext = props.keyNavigationNext,
    keyNavigationPrevious = props.keyNavigationPrevious;
  var _useControlledReducer = useControlledReducer$1(
      downshiftMultipleSelectionReducer,
      getInitialState2(props),
      props
    ),
    state = _useControlledReducer[0],
    dispatch = _useControlledReducer[1];
  var activeIndex = state.activeIndex,
    selectedItems = state.selectedItems;
  var isInitialMountRef = useRef6(true);
  var dropdownRef = useRef6(null);
  var previousSelectedItemsRef = useRef6(selectedItems);
  var selectedItemRefs = useRef6();
  selectedItemRefs.current = [];
  var latest = useLatestRef({
    state,
    props,
  });
  useEffect6(
    function () {
      if (isInitialMountRef.current) {
        return;
      }
      if (selectedItems.length < previousSelectedItemsRef.current.length) {
        var removedSelectedItem = previousSelectedItemsRef.current.find(
          function (item) {
            return selectedItems.indexOf(item) < 0;
          }
        );
        setStatus(
          getA11yRemovalMessage2({
            itemToString: itemToString2,
            resultCount: selectedItems.length,
            removedSelectedItem,
            activeIndex,
            activeSelectedItem: selectedItems[activeIndex],
          }),
          environment.document
        );
      }
      previousSelectedItemsRef.current = selectedItems;
    },
    [selectedItems.length]
  );
  useEffect6(
    function () {
      if (isInitialMountRef.current) {
        return;
      }
      if (activeIndex === -1 && dropdownRef.current) {
        dropdownRef.current.focus();
      } else if (selectedItemRefs.current[activeIndex]) {
        selectedItemRefs.current[activeIndex].focus();
      }
    },
    [activeIndex]
  );
  useControlPropsValidator({
    isInitialMount: isInitialMountRef.current,
    props,
    state,
  });
  var setGetterPropCallInfo = useGetterPropsCalledChecker("getDropdownProps");
  useEffect6(function () {
    isInitialMountRef.current = false;
  }, []);
  var selectedItemKeyDownHandlers = useMemo2(
    function () {
      var _ref;
      return (
        (_ref = {}),
        (_ref[keyNavigationPrevious] = function () {
          dispatch({
            type: SelectedItemKeyDownNavigationPrevious,
          });
        }),
        (_ref[keyNavigationNext] = function () {
          dispatch({
            type: SelectedItemKeyDownNavigationNext,
          });
        }),
        (_ref.Delete = function Delete() {
          dispatch({
            type: SelectedItemKeyDownDelete,
          });
        }),
        (_ref.Backspace = function Backspace() {
          dispatch({
            type: SelectedItemKeyDownBackspace,
          });
        }),
        _ref
      );
    },
    [dispatch, keyNavigationNext, keyNavigationPrevious]
  );
  var dropdownKeyDownHandlers = useMemo2(
    function () {
      var _ref2;
      return (
        (_ref2 = {}),
        (_ref2[keyNavigationPrevious] = function (event) {
          if (isKeyDownOperationPermitted(event)) {
            dispatch({
              type: DropdownKeyDownNavigationPrevious,
            });
          }
        }),
        (_ref2.Backspace = function Backspace(event) {
          if (isKeyDownOperationPermitted(event)) {
            dispatch({
              type: DropdownKeyDownBackspace,
            });
          }
        }),
        _ref2
      );
    },
    [dispatch, keyNavigationPrevious]
  );
  var getSelectedItemProps = useCallback3(
    function (_temp) {
      var _extends2;
      var _ref3 = _temp === void 0 ? {} : _temp,
        _ref3$refKey = _ref3.refKey,
        refKey = _ref3$refKey === void 0 ? "ref" : _ref3$refKey,
        ref = _ref3.ref,
        onClick = _ref3.onClick,
        onKeyDown = _ref3.onKeyDown,
        selectedItem = _ref3.selectedItem,
        index = _ref3.index,
        rest = _objectWithoutPropertiesLoose(_ref3, _excluded);
      var latestState = latest.current.state;
      var itemIndex = getItemIndex(
        index,
        selectedItem,
        latestState.selectedItems
      );
      if (itemIndex < 0) {
        throw new Error(
          "Pass either selectedItem or index in getSelectedItemProps!"
        );
      }
      var selectedItemHandleClick = function selectedItemHandleClick2() {
        dispatch({
          type: SelectedItemClick,
          index,
        });
      };
      var selectedItemHandleKeyDown = function selectedItemHandleKeyDown2(
        event
      ) {
        var key = normalizeArrowKey(event);
        if (key && selectedItemKeyDownHandlers[key]) {
          selectedItemKeyDownHandlers[key](event);
        }
      };
      return _extends(
        ((_extends2 = {}),
        (_extends2[refKey] = handleRefs(ref, function (selectedItemNode) {
          if (selectedItemNode) {
            selectedItemRefs.current.push(selectedItemNode);
          }
        })),
        (_extends2.tabIndex = index === latestState.activeIndex ? 0 : -1),
        (_extends2.onClick = callAllEventHandlers(
          onClick,
          selectedItemHandleClick
        )),
        (_extends2.onKeyDown = callAllEventHandlers(
          onKeyDown,
          selectedItemHandleKeyDown
        )),
        _extends2),
        rest
      );
    },
    [dispatch, latest, selectedItemKeyDownHandlers]
  );
  var getDropdownProps = useCallback3(
    function (_temp2, _temp3) {
      var _extends3;
      var _ref4 = _temp2 === void 0 ? {} : _temp2,
        _ref4$refKey = _ref4.refKey,
        refKey = _ref4$refKey === void 0 ? "ref" : _ref4$refKey,
        ref = _ref4.ref,
        onKeyDown = _ref4.onKeyDown,
        onClick = _ref4.onClick,
        _ref4$preventKeyActio = _ref4.preventKeyAction,
        preventKeyAction =
          _ref4$preventKeyActio === void 0 ? false : _ref4$preventKeyActio,
        rest = _objectWithoutPropertiesLoose(_ref4, _excluded2);
      var _ref5 = _temp3 === void 0 ? {} : _temp3,
        _ref5$suppressRefErro = _ref5.suppressRefError,
        suppressRefError =
          _ref5$suppressRefErro === void 0 ? false : _ref5$suppressRefErro;
      setGetterPropCallInfo(
        "getDropdownProps",
        suppressRefError,
        refKey,
        dropdownRef
      );
      var dropdownHandleKeyDown = function dropdownHandleKeyDown2(event) {
        var key = normalizeArrowKey(event);
        if (key && dropdownKeyDownHandlers[key]) {
          dropdownKeyDownHandlers[key](event);
        }
      };
      var dropdownHandleClick = function dropdownHandleClick2() {
        dispatch({
          type: DropdownClick,
        });
      };
      return _extends(
        ((_extends3 = {}),
        (_extends3[refKey] = handleRefs(ref, function (dropdownNode) {
          if (dropdownNode) {
            dropdownRef.current = dropdownNode;
          }
        })),
        _extends3),
        !preventKeyAction && {
          onKeyDown: callAllEventHandlers(onKeyDown, dropdownHandleKeyDown),
          onClick: callAllEventHandlers(onClick, dropdownHandleClick),
        },
        rest
      );
    },
    [dispatch, dropdownKeyDownHandlers, setGetterPropCallInfo]
  );
  var addSelectedItem = useCallback3(
    function (selectedItem) {
      dispatch({
        type: FunctionAddSelectedItem,
        selectedItem,
      });
    },
    [dispatch]
  );
  var removeSelectedItem = useCallback3(
    function (selectedItem) {
      dispatch({
        type: FunctionRemoveSelectedItem,
        selectedItem,
      });
    },
    [dispatch]
  );
  var setSelectedItems = useCallback3(
    function (newSelectedItems) {
      dispatch({
        type: FunctionSetSelectedItems,
        selectedItems: newSelectedItems,
      });
    },
    [dispatch]
  );
  var setActiveIndex = useCallback3(
    function (newActiveIndex) {
      dispatch({
        type: FunctionSetActiveIndex,
        activeIndex: newActiveIndex,
      });
    },
    [dispatch]
  );
  var reset = useCallback3(
    function () {
      dispatch({
        type: FunctionReset,
      });
    },
    [dispatch]
  );
  return {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    setSelectedItems,
    setActiveIndex,
    reset,
    selectedItems,
    activeIndex,
  };
}

// hooks/useLatest.ts
import { useRef as useRef7 } from "react";

// hooks/useIsomorphicLayoutEffect.ts
import {
  useEffect as useEffect7,
  useLayoutEffect as useLayoutEffect4,
} from "react";
var useIsomorphicLayoutEffect4 =
  typeof window !== "undefined" ? useLayoutEffect4 : useEffect7;
var useIsomorphicLayoutEffect_default = useIsomorphicLayoutEffect4;

// hooks/useLatest.ts
function useLatest(value) {
  const ref = useRef7(value);
  useIsomorphicLayoutEffect_default(() => {
    ref.current = value;
  }, [value]);
  return ref;
}

// ui/icons/Chevron.tsx
import { jsx as jsx29 } from "@emotion/react/jsx-runtime";
function ChevronIcon(props) {
  return /* @__PURE__ */ jsx29(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ jsx29("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M12.5303 15.5303C12.2374 15.8232 11.7626 15.8232 11.4697 15.5303L5.46967 9.53033C5.17678 9.23744 5.17678 8.76256 5.46967 8.46967C5.76256 8.17678 6.23744 8.17678 6.53033 8.46967L12 13.9393L17.4697 8.46967C17.7626 8.17678 18.2374 8.17678 18.5303 8.46967C18.8232 8.76256 18.8232 9.23744 18.5303 9.53033L12.5303 15.5303Z",
      }),
    })
  );
}

// createRepl/Menu.tsx
import * as React16 from "react";
import { jsx as jsx30 } from "@emotion/react/jsx-runtime";
function Menu2({ children, className, innerRef }) {
  return /* @__PURE__ */ jsx30(Surface, {
    className,
    tag: "ul",
    elevated: true,
    innerRef,
    css: [
      {
        zIndex: 999,
        maxHeight: 300,
        position: "absolute",
        overflowY: "auto",
        width: "100%",
        left: 0,
        top: tokens.space8,
        border: "1px solid",
        borderColor: tokens.outlineDimmest,
        listStyle: "none",
      },
      rcss.borderRadius(8),
    ],
    children,
  });
}
var ForwardedMenu = React16.forwardRef((props, ref) =>
  /* @__PURE__ */ jsx30(
    Menu2,
    __spreadValues(
      {
        innerRef: ref,
      },
      props
    )
  )
);
ForwardedMenu.displayName = "Menu";
var Menu_default = ForwardedMenu;

// createRepl/MenuItem.tsx
import * as React18 from "react";

// components/Dropdown.tsx

// lib/fuzzy.tsx

// components/Dropdown.tsx
import {
  Fragment as Fragment4,
  jsx as jsx32,
} from "@emotion/react/jsx-runtime";
var escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
var ExactMatchSubString = ({ source: source2, match }) => {
  if (!source2.toLowerCase().includes(match.toLowerCase())) {
    return /* @__PURE__ */ jsx32(Fragment4, {
      children: source2,
    });
  }
  const [start2, end2] = source2.split(
    new RegExp(`${escapeRegExp(match)}(.+)?`, "i")
  );
  return /* @__PURE__ */ jsx32(Fragment4, {
    children: [
      start2,
      /* @__PURE__ */ jsx32(
        "b",
        {
          children: source2.substr(start2.length, match.length),
        },
        match
      ),
      end2,
    ],
  });
};

// createRepl/MenuItem.tsx
import { css as css15 } from "@emotion/react";
import { jsx as jsx33, jsxs as jsxs15 } from "@emotion/react/jsx-runtime";
var menuItemStyles = ({ highlighted, selected }) =>
  css15([
    rcss.rowWithGap(8),
    rcss.align.center,
    rcss.p(8),
    {
      cursor: "pointer",
    },
    highlighted && {
      backgroundColor:
        interactive.listItem[":not([disabled])"][":not(textarea):active"]
          .backgroundColor,
    },
    selected && {
      backgroundColor: tokens.accentPrimaryDimmer,
      color: tokens.foregroundDefault,
    },
  ]);
function MenuItem2(props) {
  const title = props.filter
    ? /* @__PURE__ */ jsx33(ExactMatchSubString, {
        source: props.title,
        match: props.filter,
      })
    : props.title;
  const icon = props.icon
    ? React18.cloneElement(props.icon, {
        size: props.subtitle ? 24 : 16,
      })
    : null;
  if (props.subtitle) {
    return /* @__PURE__ */ jsxs15(View, {
      css: menuItemStyles(props),
      children: [
        icon,
        /* @__PURE__ */ jsxs15(View, {
          css: [rcss.colWithGap(2), rcss.flex.growAndShrink(1)],
          children: [
            /* @__PURE__ */ jsx33(Text, {
              children: title,
            }),
            /* @__PURE__ */ jsx33(Text, {
              variant: "small",
              css: !props.selected && rcss.color.foregroundDimmer,
              children: props.subtitle,
            }),
          ],
        }),
      ],
    });
  }
  return /* @__PURE__ */ jsxs15(View, {
    css: menuItemStyles(props),
    children: [
      icon,
      /* @__PURE__ */ jsx33(Text, {
        css: { flexShrink: 1 },
        children: title,
      }),
    ],
  });
}

// rui/Select.tsx
import {
  Fragment as Fragment5,
  jsx as jsx34,
  jsxs as jsxs16,
} from "@emotion/react/jsx-runtime";
function Select(_a) {
  var _b = _a,
    {
      id,
      items,
      initialSelectedItem,
      selectedItem,
      onChange,
      placeholder,
      dataCy,
    } = _b,
    props = __objRest(_b, [
      "id",
      "items",
      "initialSelectedItem",
      "selectedItem",
      "onChange",
      "placeholder",
      "dataCy",
    ]);
  const onChangeRef = useLatest(onChange);
  const select = useSelect(
    __spreadValues(
      {
        items,
        initialSelectedItem,
        onSelectedItemChange({ selectedItem: newSelectedItem }) {
          if (newSelectedItem) {
            onChangeRef.current(newSelectedItem);
          }
        },
      },
      selectedItem !== void 0 && { selectedItem }
    )
  );
  return /* @__PURE__ */ jsxs16(View, {
    id,
    dataCy,
    children: [
      /* @__PURE__ */ jsx34(
        "button",
        __spreadProps(
          __spreadValues(
            __spreadValues(
              {
                type: "button",
                css: [
                  interactive.filled,
                  rcss.p(8),
                  rcss.color.foregroundDefault,
                ],
              },
              props
            ),
            select.getToggleButtonProps()
          ),
          {
            children: /* @__PURE__ */ jsxs16(View, {
              css: [rcss.align.center, rcss.rowWithGap(8)],
              children: [
                select.selectedItem
                  ? /* @__PURE__ */ jsxs16(Fragment5, {
                      children: [
                        select.selectedItem.icon
                          ? React19.cloneElement(select.selectedItem.icon, {
                              size: 16,
                            })
                          : null,
                        /* @__PURE__ */ jsx34(Text, {
                          css: [
                            rcss.flex.growAndShrink(1),
                            { textAlign: "left" },
                          ],
                          children: select.selectedItem.title,
                        }),
                      ],
                    })
                  : /* @__PURE__ */ jsx34(Text, {
                      color: "dimmer",
                      css: [rcss.flex.growAndShrink(1), { textAlign: "left" }],
                      children: placeholder,
                    }),
                /* @__PURE__ */ jsx34(ChevronIcon, {}),
              ],
            }),
          }
        )
      ),
      /* @__PURE__ */ jsx34(
        "div",
        __spreadProps(__spreadValues({}, select.getMenuProps()), {
          css: { position: "relative" },
          children:
            select.isOpen && items.length > 0
              ? /* @__PURE__ */ jsx34(Menu_default, {
                  children: items.map((item, index) =>
                    /* @__PURE__ */ jsx34(
                      "li",
                      __spreadProps(
                        __spreadValues(
                          {},
                          select.getItemProps({ item, index })
                        ),
                        {
                          "data-cy": item.dataCy,
                          children: /* @__PURE__ */ jsx34(MenuItem2, {
                            highlighted: index === select.highlightedIndex,
                            selected: item === select.selectedItem,
                            icon: item.icon,
                            title: item.title,
                          }),
                        }
                      ),
                      item.title
                    )
                  ),
                })
              : null,
        })
      ),
    ],
  });
}

// ui/icons/ChevronLeft.tsx
import { jsx as jsx35 } from "@emotion/react/jsx-runtime";
function ChevronLeftIcon(props) {
  return /* @__PURE__ */ jsx35(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ jsx35("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M8.46967 11.4697C8.17678 11.7626 8.17678 12.2374 8.46967 12.5303L14.4697 18.5303C14.7626 18.8232 15.2374 18.8232 15.5303 18.5303C15.8232 18.2374 15.8232 17.7626 15.5303 17.4697L10.0607 12L15.5303 6.53033C15.8232 6.23744 15.8232 5.76256 15.5303 5.46967C15.2374 5.17678 14.7626 5.17678 14.4697 5.46967L8.46967 11.4697Z",
      }),
    })
  );
}

function PromptIcon(props) {
  return /* @__PURE__ */ jsx35(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ [
        jsx35("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          key: "PromptIconTop",
          d: "M5 3C5 1.89543 5.89543 1 7 1H9C10.1046 1 11 1.89543 11 3V5C11 6.10457 10.1046 7 9 7H7C5.89543 7 5 6.10457 5 5V3Z",
        }),
        jsx35("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          key: "PromptIconMiddle",
          d: "M13 11C13 9.89543 13.8954 9 15 9H17C18.1046 9 19 9.89543 19 11V13C19 14.1046 18.1046 15 17 15H15C13.8954 15 13 14.1046 13 13V11Z",
        }),
        jsx35("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          key: "PromptIconBottom",
          d: "M7 17C5.89543 17 5 17.8954 5 19V21C5 22.1046 5.89543 23 7 23H9C10.1046 23 11 22.1046 11 21V19C11 17.8954 10.1046 17 9 17H7Z",
        }),
      ],
    })
  );
}

function FilterIcon(props) {
  return /* @__PURE__ */ jsx35(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ [
        jsx35("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          key: "PathFilterTop",
          d: "M2.25 8.25H4.57501C4.92247 9.96168 6.43578 11.25 8.25 11.25C10.0642 11.25 11.5775 9.96168 11.925 8.25H21.75C22.1642 8.25 22.5 7.91421 22.5 7.5C22.5 7.08579 22.1642 6.75 21.75 6.75H11.925C11.5775 5.03832 10.0642 3.75 8.25 3.75C6.43578 3.75 4.92247 5.03832 4.57501 6.75H2.25C1.83579 6.75 1.5 7.08579 1.5 7.5C1.5 7.91421 1.83579 8.25 2.25 8.25ZM8.25 5.25C7.00736 5.25 6 6.25736 6 7.5C6 8.74264 7.00736 9.75 8.25 9.75C9.49264 9.75 10.5 8.74264 10.5 7.5C10.5 6.25736 9.49264 5.25 8.25 5.25Z",
        }),
        jsx35("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          key: "PathFilterBottom",
          d: "M2.25 15.75C1.83579 15.75 1.5 16.0858 1.5 16.5C1.5 16.9142 1.83579 17.25 2.25 17.25H12.075C12.4225 18.9617 13.9358 20.25 15.75 20.25C17.5642 20.25 19.0775 18.9617 19.425 17.25H21.75C22.1642 17.25 22.5 16.9142 22.5 16.5C22.5 16.0858 22.1642 15.75 21.75 15.75H19.425C19.0775 14.0383 17.5642 12.75 15.75 12.75C13.9358 12.75 12.4225 14.0383 12.075 15.75H2.25ZM13.5 16.5C13.5 15.2574 14.5074 14.25 15.75 14.25C16.9926 14.25 18 15.2574 18 16.5C18 17.7426 16.9926 18.75 15.75 18.75C14.5074 18.75 13.5 17.7426 13.5 16.5Z",
        }),
      ],
    })
  );
}

function KeyboardIcon(props) {
  return /* @__PURE__ */ jsx35(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      /* @__PURE__ */
      children: jsx35("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M1.25 6C1.25 4.48122 2.48122 3.25 4 3.25H20C21.5188 3.25 22.75 4.48122 22.75 6V18C22.75 19.5188 21.5188 20.75 20 20.75H4C2.48122 20.75 1.25 19.5188 1.25 18V6ZM4 4.75C3.30964 4.75 2.75 5.30964 2.75 6V18C2.75 18.6904 3.30964 19.25 4 19.25H20C20.6904 19.25 21.25 18.6904 21.25 18V6C21.25 5.30964 20.6904 4.75 20 4.75H4ZM4.25 8C4.25 7.58579 4.58579 7.25 5 7.25H7C7.41421 7.25 7.75 7.58579 7.75 8C7.75 8.41421 7.41421 8.75 7 8.75H5C4.58579 8.75 4.25 8.41421 4.25 8ZM9.25 8C9.25 7.58579 9.58579 7.25 10 7.25H11C11.4142 7.25 11.75 7.58579 11.75 8C11.75 8.41421 11.4142 8.75 11 8.75H10C9.58579 8.75 9.25 8.41421 9.25 8ZM13.25 8C13.25 7.58579 13.5858 7.25 14 7.25H15C15.4142 7.25 15.75 7.58579 15.75 8C15.75 8.41421 15.4142 8.75 15 8.75H14C13.5858 8.75 13.25 8.41421 13.25 8ZM17.25 8C17.25 7.58579 17.5858 7.25 18 7.25H19C19.4142 7.25 19.75 7.58579 19.75 8C19.75 8.41421 19.4142 8.75 19 8.75H18C17.5858 8.75 17.25 8.41421 17.25 8ZM4.25 12C4.25 11.5858 4.58579 11.25 5 11.25H6C6.41421 11.25 6.75 11.5858 6.75 12C6.75 12.4142 6.41421 12.75 6 12.75H5C4.58579 12.75 4.25 12.4142 4.25 12ZM8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H10C10.4142 11.25 10.75 11.5858 10.75 12C10.75 12.4142 10.4142 12.75 10 12.75H9C8.58579 12.75 8.25 12.4142 8.25 12ZM12.25 12C12.25 11.5858 12.5858 11.25 13 11.25H14C14.4142 11.25 14.75 11.5858 14.75 12C14.75 12.4142 14.4142 12.75 14 12.75H13C12.5858 12.75 12.25 12.4142 12.25 12ZM16.25 12C16.25 11.5858 16.5858 11.25 17 11.25H19C19.4142 11.25 19.75 11.5858 19.75 12C19.75 12.4142 19.4142 12.75 19 12.75H17C16.5858 12.75 16.25 12.4142 16.25 12ZM7.25 16C7.25 15.5858 7.58579 15.25 8 15.25H16C16.4142 15.25 16.75 15.5858 16.75 16C16.75 16.4142 16.4142 16.75 16 16.75H8C7.58579 16.75 7.25 16.4142 7.25 16Z",
      }),
    })
  );
}

function GlobeIcon(props) {
  return /* @__PURE__ */ jsx35(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      /* @__PURE__ */
      children: jsx35("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M2.77997 11.25H7.28229C7.48347 8.23408 8.53193 5.34326 10.296 2.90662C6.2409 3.66174 3.11597 7.06245 2.77997 11.25ZM12 3.14873C10.1266 5.45651 9.00431 8.28426 8.78597 11.25H15.214C14.9957 8.28426 13.8734 5.45651 12 3.14873ZM15.214 12.75C14.9957 15.7157 13.8734 18.5435 12 20.8513C10.1266 18.5435 9.00431 15.7157 8.78597 12.75H15.214ZM7.28229 12.75H2.77997C3.11597 16.9376 6.2409 20.3383 10.296 21.0934C8.53193 18.6567 7.48347 15.7659 7.28229 12.75ZM13.704 21.0934C15.4681 18.6567 16.5165 15.7659 16.7177 12.75H21.22C20.884 16.9376 17.7591 20.3383 13.704 21.0934ZM21.22 11.25H16.7177C16.5165 8.23408 15.4681 5.34326 13.704 2.90662C17.7591 3.66174 20.884 7.06245 21.22 11.25ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z",
      }),
    })
  );
}

function TwitterIcon(props) {
  return /* @__PURE__ */ jsx35(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      /* @__PURE__ */
      children: jsx35("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M7.55016 21.75C16.6045 21.75 21.5583 14.2467 21.5583 7.74186C21.5583 7.53092 21.5536 7.3153 21.5442 7.10436C22.5079 6.40746 23.3395 5.54425 24 4.5553C23.1025 4.9546 22.1496 5.21538 21.1739 5.32874C22.2013 4.71291 22.9705 3.74547 23.3391 2.60577C22.3726 3.17856 21.3156 3.58261 20.2134 3.80061C19.4708 3.01156 18.489 2.48912 17.4197 2.31405C16.3504 2.13899 15.2532 2.32105 14.2977 2.8321C13.3423 3.34314 12.5818 4.15471 12.1338 5.14131C11.6859 6.12792 11.5754 7.23462 11.8195 8.2903C9.86249 8.19209 7.94794 7.6837 6.19998 6.7981C4.45203 5.91249 2.90969 4.66944 1.67297 3.14952C1.0444 4.23324 0.852057 5.51565 1.13503 6.73609C1.418 7.95654 2.15506 9.02345 3.19641 9.71999C2.41463 9.69517 1.64998 9.48468 0.965625 9.10592V9.16686C0.964925 10.3041 1.3581 11.4066 2.07831 12.2868C2.79852 13.167 3.80132 13.7706 4.91625 13.995C4.19206 14.1931 3.43198 14.222 2.69484 14.0794C3.00945 15.0574 3.62157 15.9129 4.44577 16.5263C5.26997 17.1398 6.26512 17.4806 7.29234 17.5012C5.54842 18.8711 3.39417 19.6141 1.17656 19.6106C0.783287 19.61 0.390399 19.5859 0 19.5384C2.25286 20.9837 4.87353 21.7514 7.55016 21.75Z",
      }),
    })
  );
}

// ui/icons/ChevronRight.tsx
import { jsx as jsx36 } from "@emotion/react/jsx-runtime";
function ChevronRightIcon(props) {
  return /* @__PURE__ */ jsx36(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ jsx36("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M15.5303 11.4697C15.8232 11.7626 15.8232 12.2374 15.5303 12.5303L9.53033 18.5303C9.23744 18.8232 8.76256 18.8232 8.46967 18.5303C8.17678 18.2374 8.17678 17.7626 8.46967 17.4697L13.9393 12L8.46967 6.53033C8.17678 6.23744 8.17678 5.76256 8.46967 5.46967C8.76256 5.17678 9.23744 5.17678 9.53033 5.46967L15.5303 11.4697Z",
      }),
    })
  );
}

function BugIcon(props) {
  return /* @__PURE__ */ jsx36(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ jsx36("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M12 3.75C10.2051 3.75 8.75 5.20507 8.75 7V7.25H15.25V7C15.25 5.20507 13.7949 3.75 12 3.75ZM16.75 7.35352V7C16.75 4.37665 14.6234 2.25 12 2.25C9.37665 2.25 7.25 4.37665 7.25 7V7.35352C6.80623 7.47903 6.40806 7.71316 6.08602 8.02536L4.53033 6.46967C4.23744 6.17678 3.76256 6.17678 3.46967 6.46967C3.17678 6.76256 3.17678 7.23744 3.46967 7.53033L5.32002 9.38068C5.27421 9.57973 5.25 9.78704 5.25 10V13.25H3C2.58579 13.25 2.25 13.5858 2.25 14C2.25 14.4142 2.58579 14.75 3 14.75H5.2912C5.40749 15.802 5.76557 16.7812 6.30862 17.6307L4.46967 19.4697C4.17678 19.7626 4.17678 20.2374 4.46967 20.5303C4.76256 20.8232 5.23744 20.8232 5.53033 20.5303L7.25746 18.8032C8.47649 20.0069 10.1515 20.75 12 20.75C13.8485 20.75 15.5235 20.0069 16.7425 18.8032L18.4697 20.5303C18.7626 20.8232 19.2374 20.8232 19.5303 20.5303C19.8232 20.2374 19.8232 19.7626 19.5303 19.4697L17.6914 17.6307C18.2344 16.7812 18.5925 15.802 18.7088 14.75H21C21.4142 14.75 21.75 14.4142 21.75 14C21.75 13.5858 21.4142 13.25 21 13.25H18.75V10C18.75 9.78704 18.7258 9.57973 18.68 9.38068L20.5303 7.53033C20.8232 7.23744 20.8232 6.76256 20.5303 6.46967C20.2374 6.17678 19.7626 6.17678 19.4697 6.46967L17.914 8.02536C17.5919 7.71316 17.1938 7.47903 16.75 7.35352ZM11.25 8.75H8C7.30964 8.75 6.75 9.30964 6.75 10V14C6.75 16.6449 8.70578 18.8329 11.25 19.1968L11.25 8.75ZM12.75 19.1968L12.75 8.75H16C16.6904 8.75 17.25 9.30964 17.25 10V14C17.25 16.6449 15.2942 18.8329 12.75 19.1968Z",
      }),
    })
  );
}

function UploadIcon(props) {
  return /* @__PURE__ */ jsx36(
    Icon,
    __spreadProps(__spreadValues({}, props), {
      children: /* @__PURE__ */ jsx36("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M11.4697 2.46967C11.7626 2.17678 12.2374 2.17678 12.5303 2.46967L17.5303 7.46967C17.8232 7.76256 17.8232 8.23744 17.5303 8.53033C17.2374 8.82322 16.7626 8.82322 16.4697 8.53033L12.75 4.81066V15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V4.81066L7.53033 8.53033C7.23744 8.82322 6.76256 8.82322 6.46967 8.53033C6.17678 8.23744 6.17678 7.76256 6.46967 7.46967L11.4697 2.46967ZM3 14.25C3.41421 14.25 3.75 14.5858 3.75 15V19C3.75 19.3315 3.8817 19.6495 4.11612 19.8839C4.35054 20.1183 4.66848 20.25 5 20.25H19C19.3315 20.25 19.6495 20.1183 19.8839 19.8839C20.1183 19.6495 20.25 19.3315 20.25 19V15C20.25 14.5858 20.5858 14.25 21 14.25C21.4142 14.25 21.75 14.5858 21.75 15V19C21.75 19.7293 21.4603 20.4288 20.9445 20.9445C20.4288 21.4603 19.7293 21.75 19 21.75H5C4.27065 21.75 3.57118 21.4603 3.05546 20.9445C2.53973 20.4288 2.25 19.7293 2.25 19V15C2.25 14.5858 2.58579 14.25 3 14.25Z",
      }),
    })
  );
}

// rui/Tour.tsx
import { jsx as jsx37, jsxs as jsxs17 } from "@emotion/react/jsx-runtime";
function Tour({
  title,
  content: ContentProp,
  colorway = "primary",
  totalSteps = 1,
  currentStepIndex = 0,
  onDismiss,
  onCurrentStepChange,
  cypressCloseData,
}) {
  return /* @__PURE__ */ jsxs17(View, {
    css: [
      rcss.p(8),
      {
        paddingBottom: 12,
        paddingRight: title ? void 0 : 32,
        backgroundColor: colormap[colorway].dimmest,
        border: "1px solid " + colormap[colorway].dimmer,
        position: "relative",
      },
      rcss.borderRadius(8),
      rcss.shadow(2),
      rcss.colWithGap(8),
    ],
    children: [
      /* @__PURE__ */ jsx37(IconButton_default, {
        alt: "Close",
        colorway,
        css: {
          position: "absolute",
          top: tokens.space8,
          right: tokens.space8,
        },
        onClick: onDismiss,
        dataCy: cypressCloseData,
        children: /* @__PURE__ */ jsx37(CloseIcon, {}),
      }),
      title &&
        /* @__PURE__ */ jsx37(Text, {
          variant: "subheadBig",
          children: title,
        }),
      typeof ContentProp === "function"
        ? /* @__PURE__ */ jsx37(ContentProp, {})
        : /* @__PURE__ */ jsx37(Text, {
            multiline: true,
            children: ContentProp,
          }),
      totalSteps > 1 &&
        onCurrentStepChange &&
        /* @__PURE__ */ jsxs17(View, {
          css: [rcss.flex.row, rcss.align.center, rcss.justify.spaceBetween],
          children: [
            /* @__PURE__ */ jsx37(Button_default, {
              css: { visibility: currentStepIndex <= 0 ? "hidden" : void 0 },
              colorway,
              text: "Back",
              iconLeft: /* @__PURE__ */ jsx37(ChevronLeftIcon, {}),
              onClick: () => onCurrentStepChange(currentStepIndex - 1),
            }),
            /* @__PURE__ */ jsx37(Dots, {
              colorway,
              total: totalSteps,
              current: currentStepIndex,
            }),
            /* @__PURE__ */ jsx37(Button_default, {
              colorway,
              text: currentStepIndex >= totalSteps - 1 ? "Done" : "Next",
              iconLeft: /* @__PURE__ */ jsx37(ChevronRightIcon, {}),
              onClick: () =>
                currentStepIndex >= totalSteps - 1
                  ? onDismiss()
                  : onCurrentStepChange(currentStepIndex + 1),
            }),
          ],
        }),
    ],
  });
}
function Dots({ total, current, colorway }) {
  return /* @__PURE__ */ jsx37(View, {
    css: rcss.rowWithGap(8),
    children: new Array(total).fill(0).map((_, i) =>
      /* @__PURE__ */ jsx37(
        View,
        {
          css: [
            rcss.borderRadius("full"),
            {
              width: tokens.space8,
              height: tokens.space8,
              backgroundColor:
                i === current
                  ? colormap[colorway].stronger
                  : colormap[colorway].dimmer,
            },
          ],
        },
        i
      )
    ),
  });
}
export {
  AccordionItem as AccordianItem,
  Button_default as Button,
  ButtonGroup,
  Checkbox,
  DetailedInput,
  Header,
  IconButton_default as IconButton,
  InlineCode,
  Input_default as Input,
  Interactive_exports as Interactive,
  LoadingStyle_exports as LoadingStyle,
  MeasureBar,
  Menu,
  Pill,
  Radio,
  RadioGroup,
  Rui,
  SearchBar,
  Select,
  SpecializedView,
  Surface,
  Text,
  Tooltip,
  Tour,
  View,
  tokens,
  rcss,
  ChevronLeftIcon,
  CheckIcon,
  SearchIcon,
  HamburgerIcon,
  ChatIcon,
  FireIcon,
  PinIcon,
  MultiLineInput,
  EyeIcon,
  EyeOffIcon,
  EditIcon,
  CloseIcon,
  LoaderIcon,
  LoadingIcon,
  UserIcon,
  CodeIcon,
  PromptIcon,
  FilterIcon,
  KeyboardIcon,
  BugIcon,
  UploadIcon,
  ChevronDoubleUpIcon,
  ExternalLinkIcon,
  WarningIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  BellIcon,
  ListIcon,
  LettersIcon,
  PlusIcon,
  LockLockedIcon,
  CopyIcon,
  InfoIcon,
  GhostwriterIcon,
  GlobeIcon,
  TwitterIcon,
  SettingsIcon,
  TrashIcon,
  SendIcon,
};
/** @license React v17.0.2
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

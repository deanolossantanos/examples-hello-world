// @builder.io/qwik/build
const isServer = true;

/**
 * @license
 * @builder.io/qwik 1.19.0
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/QwikDev/qwik/blob/main/LICENSE
 */
const qDev = false;
const isNode$1 = (value) => value && "number" == typeof value.nodeType;
const isDocument = (value) => 9 === value.nodeType;
const isElement$1 = (value) => 1 === value.nodeType;
const isQwikElement = (value) => {
  const nodeType = value.nodeType;
  return 1 === nodeType || 111 === nodeType;
};
const isNodeElement = (value) => {
  const nodeType = value.nodeType;
  return 1 === nodeType || 111 === nodeType || 3 === nodeType;
};
const isVirtualElement = (value) => 111 === value.nodeType;
const isText = (value) => 3 === value.nodeType;
const isComment = (value) => 8 === value.nodeType;
const logError = (message, ...optionalParams) => createAndLogError(false, message, ...optionalParams);
const throwErrorAndStop = (message, ...optionalParams) => {
  throw createAndLogError(false, message, ...optionalParams);
};
const logErrorAndStop = (message, ...optionalParams) => createAndLogError(qDev, message, ...optionalParams);
const logOnceWarn = () => {
};
const logWarn = () => {
};
const printParams = (optionalParams) => optionalParams;
const createAndLogError = (asyncThrow, message, ...optionalParams) => {
  const err = message instanceof Error ? message : new Error(message);
  return console.error("%cQWIK ERROR", "", err.message, ...printParams(optionalParams), err.stack), err;
};
function assertDefined() {
}
function assertEqual() {
}
function assertTrue() {
}
function assertString() {
}
function assertQwikElement() {
}
function assertElement() {
}
const codeToText = (code) => `Code(${code}) https://github.com/QwikDev/qwik/blob/main/packages/qwik/src/core/error/error.ts#L${8 + code}`;
const qError = (code, ...parts) => {
  const text = codeToText(code, ...parts);
  return logErrorAndStop(text, ...parts);
};
const createPlatform = () => ({
  isServer,
  importSymbol(containerEl, url, symbolName) {
    {
      const hash2 = getSymbolHash(symbolName);
      const regSym = globalThis.__qwik_reg_symbols?.get(hash2);
      if (regSym) {
        return regSym;
      }
    }
    if (!url) {
      throw qError(31, symbolName);
    }
    if (!containerEl) {
      throw qError(30, url, symbolName);
    }
    const urlDoc = toUrl$1(containerEl.ownerDocument, containerEl, url).toString();
    const urlCopy = new URL(urlDoc);
    urlCopy.hash = "";
    return import(urlCopy.href).then((mod) => mod[symbolName]);
  },
  raf: (fn) => new Promise((resolve) => {
    requestAnimationFrame(() => {
      resolve(fn());
    });
  }),
  nextTick: (fn) => new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn());
    });
  }),
  chunkForSymbol: (symbolName, chunk) => [symbolName, chunk ?? "_"]
});
const toUrl$1 = (doc, containerEl, url) => {
  const baseURI = doc.baseURI;
  const base = new URL(containerEl.getAttribute("q:base") ?? baseURI, baseURI);
  return new URL(url, base);
};
let _platform = /* @__PURE__ */ createPlatform();
const setPlatform = (plt) => _platform = plt;
const getPlatform = () => _platform;
const isServerPlatform = () => _platform.isServer;
const isSerializableObject = (v) => {
  const proto = Object.getPrototypeOf(v);
  return proto === Object.prototype || null === proto;
};
const isObject = (v) => !!v && "object" == typeof v;
const isArray = (v) => Array.isArray(v);
const isString = (v) => "string" == typeof v;
const isFunction = (v) => "function" == typeof v;
const isPromise$1 = (value) => value && "function" == typeof value.then;
const safeCall = (call, thenFn, rejectFn) => {
  try {
    const promise = call();
    return isPromise$1(promise) ? promise.then(thenFn, rejectFn) : thenFn(promise);
  } catch (e) {
    return rejectFn(e);
  }
};
const maybeThen = (promise, thenFn) => isPromise$1(promise) ? promise.then(thenFn) : thenFn(promise);
const promiseAll = (promises) => promises.some(isPromise$1) ? Promise.all(promises) : promises;
const promiseAllLazy = (promises) => promises.length > 0 ? Promise.all(promises) : promises;
const isNotNullable = (v) => null != v;
const delay = (timeout) => new Promise((resolve) => {
  setTimeout(resolve, timeout);
});
const EMPTY_ARRAY = [];
const EMPTY_OBJ = {};
const getDocument = (node) => {
  if ("undefined" != typeof document) {
    return document;
  }
  if (9 === node.nodeType) {
    return node;
  }
  const doc = node.ownerDocument;
  return doc;
};
const OnRenderProp = "q:renderFn";
const QSlot = "q:slot";
const QSlotS = "q:s";
const QStyle = "q:style";
const QScopedStyle = "q:sstyle";
const QInstance = "q:instance";
const getQFuncs = (document2, hash2) => document2["qFuncs_" + hash2] || [];
const ELEMENT_ID = "q:id";
const QOjectTargetSymbol = /* @__PURE__ */ Symbol("proxy target");
const QObjectFlagsSymbol = /* @__PURE__ */ Symbol("proxy flags");
const QObjectManagerSymbol = /* @__PURE__ */ Symbol("proxy manager");
const _IMMUTABLE = /* @__PURE__ */ Symbol("IMMUTABLE");
const Q_CTX = "_qc_";
const directSetAttribute = (el, prop, value) => el.setAttribute(prop, value);
const directGetAttribute = (el, prop) => el.getAttribute(prop);
const fromCamelToKebabCase = (text) => text.replace(/([A-Z])/g, "-$1").toLowerCase();
const fromKebabToCamelCase = (text) => text.replace(/-./g, (x) => x[1].toUpperCase());
const emitEvent$1 = (el, eventName, detail, bubbles) => {
  ("function" == typeof CustomEvent) && el && el.dispatchEvent(new CustomEvent(eventName, {
    detail,
    bubbles,
    composed: bubbles
  }));
};
const getOrCreateProxy = (target, containerState, flags = 0) => {
  const proxy = containerState.$proxyMap$.get(target);
  return proxy || (0 !== flags && setObjectFlags(target, flags), createProxy(target, containerState, void 0));
};
const createProxy = (target, containerState, subs) => {
  assertEqual(unwrapProxy(target)), assertTrue(!containerState.$proxyMap$.has(target));
  const manager = containerState.$subsManager$.$createManager$(subs);
  const proxy = new Proxy(target, new ReadWriteProxyHandler(containerState, manager));
  return containerState.$proxyMap$.set(target, proxy), proxy;
};
const createPropsState = () => {
  const props = {};
  return setObjectFlags(props, 2), props;
};
const setObjectFlags = (obj, flags) => {
  Object.defineProperty(obj, QObjectFlagsSymbol, {
    value: flags,
    enumerable: false
  });
};
const _restProps = (props, omit) => {
  const rest = {};
  for (const key in props) {
    omit.includes(key) || (rest[key] = props[key]);
  }
  return rest;
};
class ReadWriteProxyHandler {
  $containerState$;
  $manager$;
  constructor($containerState$, $manager$) {
    this.$containerState$ = $containerState$, this.$manager$ = $manager$;
  }
  deleteProperty(target, prop) {
    if (2 & target[QObjectFlagsSymbol]) {
      throw qError(17);
    }
    return "string" == typeof prop && delete target[prop] && (this.$manager$.$notifySubs$(isArray(target) ? void 0 : prop), true);
  }
  get(target, prop) {
    if ("symbol" == typeof prop) {
      return prop === QOjectTargetSymbol ? target : prop === QObjectManagerSymbol ? this.$manager$ : target[prop];
    }
    const flags = target[QObjectFlagsSymbol] ?? 0;
    const invokeCtx = tryGetInvokeContext();
    const recursive = !!(1 & flags);
    const hiddenSignal = target["$$" + prop];
    let subscriber;
    let value;
    if (invokeCtx && (subscriber = invokeCtx.$subscriber$), !!!(2 & flags) || prop in target && !immutableValue(target[_IMMUTABLE]?.[prop]) || (subscriber = null), hiddenSignal ? (value = hiddenSignal.value, subscriber = null) : value = target[prop], subscriber) {
      const isA = isArray(target);
      this.$manager$.$addSub$(subscriber, isA ? void 0 : prop);
    }
    return recursive ? wrap(value, this.$containerState$) : value;
  }
  set(target, prop, newValue) {
    if ("symbol" == typeof prop) {
      return target[prop] = newValue, true;
    }
    const flags = target[QObjectFlagsSymbol] ?? 0;
    if (!!(2 & flags)) {
      throw qError(17);
    }
    const unwrappedNewValue = !!(1 & flags) ? unwrapProxy(newValue) : newValue;
    if (isArray(target)) {
      return target[prop] = unwrappedNewValue, this.$manager$.$notifySubs$(), true;
    }
    const oldValue = target[prop];
    return target[prop] = unwrappedNewValue, oldValue !== unwrappedNewValue && this.$manager$.$notifySubs$(prop), true;
  }
  has(target, prop) {
    if (prop === QOjectTargetSymbol) {
      return true;
    }
    const invokeCtx = tryGetInvokeContext();
    if ("string" == typeof prop && invokeCtx) {
      const subscriber = invokeCtx.$subscriber$;
      if (subscriber) {
        const isA = isArray(target);
        this.$manager$.$addSub$(subscriber, isA ? void 0 : prop);
      }
    }
    const hasOwnProperty = Object.prototype.hasOwnProperty;
    return !!hasOwnProperty.call(target, prop) || !("string" != typeof prop || !hasOwnProperty.call(target, "$$" + prop));
  }
  ownKeys(target) {
    const flags = target[QObjectFlagsSymbol] ?? 0;
    if (!!!(2 & flags)) {
      let subscriber = null;
      const invokeCtx = tryGetInvokeContext();
      invokeCtx && (subscriber = invokeCtx.$subscriber$), subscriber && this.$manager$.$addSub$(subscriber);
    }
    return isArray(target) ? Reflect.ownKeys(target) : Reflect.ownKeys(target).map((a2) => "string" == typeof a2 && a2.startsWith("$$") ? a2.slice(2) : a2);
  }
  getOwnPropertyDescriptor(target, prop) {
    const descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
    return isArray(target) || "symbol" == typeof prop || descriptor && !descriptor.configurable ? descriptor : {
      enumerable: true,
      configurable: true
    };
  }
}
const immutableValue = (value) => value === _IMMUTABLE || isSignal(value);
const wrap = (value, containerState) => {
  if (isObject(value)) {
    if (Object.isFrozen(value)) {
      return value;
    }
    const nakedValue = unwrapProxy(value);
    if (nakedValue !== value) {
      return value;
    }
    if (fastSkipSerialize(nakedValue)) {
      return value;
    }
    if (isSerializableObject(nakedValue) || isArray(nakedValue)) {
      const proxy = containerState.$proxyMap$.get(nakedValue);
      return proxy || getOrCreateProxy(nakedValue, containerState, 1);
    }
  }
  return value;
};
const ON_PROP_REGEX = /^(on|window:|document:)/;
const PREVENT_DEFAULT = "preventdefault:";
const isOnProp = (prop) => prop.endsWith("$") && ON_PROP_REGEX.test(prop);
const groupListeners = (listeners) => {
  if (0 === listeners.length) {
    return EMPTY_ARRAY;
  }
  if (1 === listeners.length) {
    const listener = listeners[0];
    return [[listener[0], [listener[1]]]];
  }
  const keys = [];
  for (let i = 0; i < listeners.length; i++) {
    const eventName = listeners[i][0];
    keys.includes(eventName) || keys.push(eventName);
  }
  return keys.map((eventName) => [eventName, listeners.filter((l) => l[0] === eventName).map((a2) => a2[1])]);
};
const setEvent = (existingListeners, prop, input, containerEl) => {
  if (assertTrue(prop.endsWith("$")), prop = normalizeOnProp(prop.slice(0, -1)), input) {
    if (isArray(input)) {
      const processed = input.flat(1 / 0).filter((q) => null != q).map((q) => [prop, ensureQrl(q, containerEl)]);
      existingListeners.push(...processed);
    } else {
      existingListeners.push([prop, ensureQrl(input, containerEl)]);
    }
  }
  return prop;
};
const PREFIXES = ["on", "window:on", "document:on"];
const SCOPED = ["on", "on-window", "on-document"];
const normalizeOnProp = (prop) => {
  let scope = "on";
  for (let i = 0; i < PREFIXES.length; i++) {
    const prefix = PREFIXES[i];
    if (prop.startsWith(prefix)) {
      scope = SCOPED[i], prop = prop.slice(prefix.length);
      break;
    }
  }
  return scope + ":" + (prop = prop.startsWith("-") ? fromCamelToKebabCase(prop.slice(1)) : prop.toLowerCase());
};
const ensureQrl = (value, containerEl) => (value.$setContainer$(containerEl), value);
const getDomListeners = (elCtx, containerEl) => {
  const attributes = elCtx.$element$.attributes;
  const listeners = [];
  for (let i = 0; i < attributes.length; i++) {
    const { name, value } = attributes.item(i);
    if (name.startsWith("on:") || name.startsWith("on-window:") || name.startsWith("on-document:")) {
      const urls = value.split("\n");
      for (const url of urls) {
        const qrl2 = parseQRL(url, containerEl);
        qrl2.$capture$ && inflateQrl(qrl2, elCtx), listeners.push([name, qrl2]);
      }
    }
  }
  return listeners;
};
const hashCode = (text, hash2 = 0) => {
  for (let i = 0; i < text.length; i++) {
    hash2 = (hash2 << 5) - hash2 + text.charCodeAt(i), hash2 |= 0;
  }
  return Number(Math.abs(hash2)).toString(36);
};
const styleKey = (qStyles, index) => (`${hashCode(qStyles.$hash$)}-${index}`);
const styleContent = (styleId) => "⭐️" + styleId;
const serializeSStyle = (scopeIds) => {
  const value = scopeIds.join("|");
  if (value.length > 0) {
    return value;
  }
};
const useSequentialScope = () => {
  const iCtx = useInvokeContext();
  const elCtx = getContext(iCtx.$hostElement$, iCtx.$renderCtx$.$static$.$containerState$);
  const seq = elCtx.$seq$ ||= [];
  const i = iCtx.$i$++;
  return {
    val: seq[i],
    set: (value) => seq[i] = value,
    i,
    iCtx,
    elCtx
  };
};
const createContextId = (name) => (/* @__PURE__ */ Object.freeze({
  id: fromCamelToKebabCase(name)
}));
const useContextProvider = (context, newValue) => {
  const { val, set, elCtx } = useSequentialScope();
  if (void 0 !== val) {
    return;
  }
  const contexts = elCtx.$contexts$ ||= /* @__PURE__ */ new Map();
  contexts.set(context.id, newValue), set(true);
};
const useContext = (context, defaultValue) => {
  const { val, set, iCtx, elCtx } = useSequentialScope();
  if (void 0 !== val) {
    return val;
  }
  const value = resolveContext(context, elCtx, iCtx.$renderCtx$.$static$.$containerState$);
  if ("function" == typeof defaultValue) {
    return set(invoke(void 0, defaultValue, value));
  }
  if (void 0 !== value) {
    return set(value);
  }
  if (void 0 !== defaultValue) {
    return set(defaultValue);
  }
  throw qError(13, context.id);
};
const findParentCtx = (el, containerState) => {
  let node = el;
  let stack = 1;
  for (; node && !node.hasAttribute?.("q:container"); ) {
    for (; node = node.previousSibling; ) {
      if (isComment(node)) {
        const virtual = node.__virtual;
        if (virtual) {
          const qtx = virtual[Q_CTX];
          if (node === virtual.open) {
            return qtx ?? getContext(virtual, containerState);
          }
          if (qtx?.$parentCtx$) {
            return qtx.$parentCtx$;
          }
          node = virtual;
          continue;
        }
        if ("/qv" === node.data) {
          stack++;
        } else if (node.data.startsWith("qv ") && (stack--, 0 === stack)) {
          return getContext(getVirtualElement(node), containerState);
        }
      }
    }
    node = el.parentElement, el = node;
  }
  return null;
};
const getParentProvider = (ctx, containerState) => (void 0 === ctx.$parentCtx$ && (ctx.$parentCtx$ = findParentCtx(ctx.$element$, containerState)), ctx.$parentCtx$);
const resolveContext = (context, hostCtx, containerState) => {
  const contextID = context.id;
  if (!hostCtx) {
    return;
  }
  let ctx = hostCtx;
  for (; ctx; ) {
    const found = ctx.$contexts$?.get(contextID);
    if (found) {
      return found;
    }
    ctx = getParentProvider(ctx, containerState);
  }
};
const ERROR_CONTEXT = /* @__PURE__ */ createContextId("qk-error");
const handleError = (err, hostElement, rCtx) => {
  const elCtx = tryGetContext(hostElement);
  if (isServerPlatform()) {
    throw err;
  }
  {
    const errorStore = resolveContext(ERROR_CONTEXT, elCtx, rCtx.$static$.$containerState$);
    if (void 0 === errorStore) {
      throw err;
    }
    errorStore.error = err;
  }
};
const unitlessNumbers = /* @__PURE__ */ new Set(["animationIterationCount", "aspectRatio", "borderImageOutset", "borderImageSlice", "borderImageWidth", "boxFlex", "boxFlexGroup", "boxOrdinalGroup", "columnCount", "columns", "flex", "flexGrow", "flexShrink", "gridArea", "gridRow", "gridRowEnd", "gridRowStart", "gridColumn", "gridColumnEnd", "gridColumnStart", "fontWeight", "lineClamp", "lineHeight", "opacity", "order", "orphans", "scale", "tabSize", "widows", "zIndex", "zoom", "MozAnimationIterationCount", "MozBoxFlex", "msFlex", "msFlexPositive", "WebkitAnimationIterationCount", "WebkitBoxFlex", "WebkitBoxOrdinalGroup", "WebkitColumnCount", "WebkitColumns", "WebkitFlex", "WebkitFlexGrow", "WebkitFlexShrink", "WebkitLineClamp"]);
const isUnitlessNumber = (name) => unitlessNumbers.has(name);
const executeComponent = (rCtx, elCtx, attempt) => {
  elCtx.$flags$ &= ~HOST_FLAG_DIRTY, elCtx.$flags$ |= HOST_FLAG_MOUNTED, elCtx.$slots$ = [], elCtx.li.length = 0;
  const hostElement = elCtx.$element$;
  const componentQRL = elCtx.$componentQrl$;
  const props = elCtx.$props$;
  const iCtx = newInvokeContext(rCtx.$static$.$locale$, hostElement, void 0, "qRender");
  const waitOn = iCtx.$waitOn$ = [];
  const newCtx = pushRenderContext(rCtx);
  newCtx.$cmpCtx$ = elCtx, newCtx.$slotCtx$ = void 0, iCtx.$subscriber$ = [0, hostElement], iCtx.$renderCtx$ = rCtx, componentQRL.$setContainer$(rCtx.$static$.$containerState$.$containerEl$);
  const componentFn = componentQRL.getFn(iCtx);
  return safeCall(() => componentFn(props), (jsxNode) => maybeThen(isServerPlatform() ? maybeThen(promiseAllLazy(waitOn), () => maybeThen(executeSSRTasks(rCtx.$static$.$containerState$, rCtx), () => promiseAllLazy(waitOn))) : promiseAllLazy(waitOn), () => {
    if (elCtx.$flags$ & HOST_FLAG_DIRTY) {
      if (!(attempt && attempt > 100)) {
        return executeComponent(rCtx, elCtx, attempt ? attempt + 1 : 1);
      }
      logWarn(`Infinite loop detected. Element: ${elCtx.$componentQrl$?.$symbol$}`);
    }
    return {
      node: jsxNode,
      rCtx: newCtx
    };
  }), (err) => {
    if (err === SignalUnassignedException) {
      if (!(attempt && attempt > 100)) {
        return maybeThen(promiseAllLazy(waitOn), () => executeComponent(rCtx, elCtx, attempt ? attempt + 1 : 1));
      }
      logWarn(`Infinite loop detected. Element: ${elCtx.$componentQrl$?.$symbol$}`);
    }
    return handleError(err, hostElement, rCtx), {
      node: SkipRender,
      rCtx: newCtx
    };
  });
};
const createRenderContext = (doc, containerState) => {
  const ctx = {
    $static$: {
      $doc$: doc,
      $locale$: containerState.$serverData$.locale,
      $containerState$: containerState,
      $hostElements$: /* @__PURE__ */ new Set(),
      $operations$: [],
      $postOperations$: [],
      $roots$: [],
      $addSlots$: [],
      $rmSlots$: [],
      $visited$: []
    },
    $cmpCtx$: null,
    $slotCtx$: void 0
  };
  return ctx;
};
const pushRenderContext = (ctx) => ({
  $static$: ctx.$static$,
  $cmpCtx$: ctx.$cmpCtx$,
  $slotCtx$: ctx.$slotCtx$
});
const serializeClassWithHost = (obj, hostCtx) => hostCtx?.$scopeIds$?.length ? hostCtx.$scopeIds$.join(" ") + " " + serializeClass(obj) : serializeClass(obj);
const serializeClass = (obj) => {
  if (!obj) {
    return "";
  }
  if (isString(obj)) {
    return obj.trim();
  }
  const classes = [];
  if (isArray(obj)) {
    for (const o of obj) {
      const classList = serializeClass(o);
      classList && classes.push(classList);
    }
  } else {
    for (const [key, value] of Object.entries(obj)) {
      value && classes.push(key.trim());
    }
  }
  return classes.join(" ");
};
const stringifyStyle = (obj) => {
  if (null == obj) {
    return "";
  }
  if ("object" == typeof obj) {
    if (isArray(obj)) {
      throw qError(0, obj, "style");
    }
    {
      const chunks = [];
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const value = obj[key];
          null != value && "function" != typeof value && (key.startsWith("--") ? chunks.push(key + ":" + value) : chunks.push(fromCamelToKebabCase(key) + ":" + setValueForStyle(key, value)));
        }
      }
      return chunks.join(";");
    }
  }
  return String(obj);
};
const setValueForStyle = (styleName, value) => "number" != typeof value || 0 === value || isUnitlessNumber(styleName) ? value : value + "px";
const getNextIndex = (ctx) => intToStr(ctx.$static$.$containerState$.$elementIndex$++);
const setQId = (rCtx, elCtx) => {
  const id = getNextIndex(rCtx);
  elCtx.$id$ = id;
};
const jsxToString = (data) => isSignal(data) ? jsxToString(data.value) : null == data || "boolean" == typeof data ? "" : String(data);
function isAriaAttribute(prop) {
  return prop.startsWith("aria-");
}
const shouldWrapFunctional = (res, node) => !!node.key && (!isJSXNode(res) || !isFunction(res.type) && res.key != node.key);
const dangerouslySetInnerHTML = "dangerouslySetInnerHTML";
const FLUSH_COMMENT = "<!--qkssr-f-->";
class MockElement {
  nodeType;
  [Q_CTX] = null;
  constructor(nodeType) {
    this.nodeType = nodeType;
  }
}
const createDocument = () => new MockElement(9);
const _renderSSR = async (node, opts) => {
  const root = opts.containerTagName;
  const containerEl = createMockQContext(1).$element$;
  const containerState = createContainerState(containerEl, opts.base ?? "/");
  containerState.$serverData$.locale = opts.serverData?.locale;
  const doc = createDocument();
  const rCtx = createRenderContext(doc, containerState);
  const headNodes = opts.beforeContent ?? [];
  const ssrCtx = {
    $static$: {
      $contexts$: [],
      $headNodes$: "html" === root ? headNodes : [],
      $locale$: opts.serverData?.locale,
      $textNodes$: /* @__PURE__ */ new Map()
    },
    $projectedChildren$: void 0,
    $projectedCtxs$: void 0,
    $invocationContext$: void 0
  };
  const locale = opts.serverData?.locale;
  const containerAttributes = opts.containerAttributes;
  const qRender = containerAttributes["q:render"];
  containerAttributes["q:container"] = "paused", containerAttributes["q:version"] = "1.19.0", containerAttributes["q:render"] = (qRender ? qRender + "-" : "") + "ssr", containerAttributes["q:base"] = opts.base || "", containerAttributes["q:locale"] = locale, containerAttributes["q:manifest-hash"] = opts.manifestHash, containerAttributes["q:instance"] = hash();
  const children = "html" === root ? [node] : [headNodes, node];
  "html" !== root && (containerAttributes.class = "qc📦" + (containerAttributes.class ? " " + containerAttributes.class : ""));
  const serverData = containerState.$serverData$ = {
    ...containerState.$serverData$,
    ...opts.serverData
  };
  serverData.containerAttributes = {
    ...serverData.containerAttributes,
    ...containerAttributes
  };
  (ssrCtx.$invocationContext$ = newInvokeContext(locale)).$renderCtx$ = rCtx;
  const rootNode = _jsxQ(root, null, containerAttributes, children, HOST_FLAG_DIRTY | HOST_FLAG_NEED_ATTACH_LISTENER, null);
  containerState.$hostsRendering$ = /* @__PURE__ */ new Set(), await Promise.resolve().then(() => renderRoot$1(rootNode, rCtx, ssrCtx, opts.stream, containerState, opts));
};
const hash = () => Math.random().toString(36).slice(2);
const renderRoot$1 = async (node, rCtx, ssrCtx, stream, containerState, opts) => {
  const beforeClose = opts.beforeClose;
  return await renderNode(node, rCtx, ssrCtx, stream, 0, beforeClose ? (stream2) => {
    const result = beforeClose(ssrCtx.$static$.$contexts$, containerState, false, ssrCtx.$static$.$textNodes$);
    return processData$1(result, rCtx, ssrCtx, stream2, 0, void 0);
  } : void 0), rCtx;
};
const renderGenerator = async (node, rCtx, ssrCtx, stream, flags) => {
  stream.write(FLUSH_COMMENT);
  const generator = node.props.children;
  let value;
  if (isFunction(generator)) {
    const v = generator({
      write(chunk) {
        stream.write(chunk), stream.write(FLUSH_COMMENT);
      }
    });
    if (isPromise$1(v)) {
      return v;
    }
    value = v;
  } else {
    value = generator;
  }
  for await (const chunk of value) {
    await processData$1(chunk, rCtx, ssrCtx, stream, flags, void 0), stream.write(FLUSH_COMMENT);
  }
};
const renderNodeVirtual = (node, elCtx, extraNodes, rCtx, ssrCtx, stream, flags, beforeClose) => {
  const props = node.props;
  const renderQrl = props["q:renderFn"];
  if (renderQrl) {
    return elCtx.$componentQrl$ = renderQrl, renderSSRComponent(rCtx, ssrCtx, stream, elCtx, node, flags, beforeClose);
  }
  let virtualComment = "<!--qv" + renderVirtualAttributes(props);
  const isSlot = "q:s" in props;
  const key = null != node.key ? escapeHtml(String(node.key)) : null;
  isSlot && (assertDefined(rCtx.$cmpCtx$?.$id$), virtualComment += " q:sref=" + rCtx.$cmpCtx$.$id$), null != key && (virtualComment += " q:key=" + key), virtualComment += "-->", stream.write(virtualComment);
  const html = node.props[dangerouslySetInnerHTML];
  if (html) {
    return stream.write(html), void stream.write(CLOSE_VIRTUAL);
  }
  if (extraNodes) {
    for (const node2 of extraNodes) {
      renderNodeElementSync(node2.type, node2.props, stream);
    }
  }
  const promise = walkChildren(node.children, rCtx, ssrCtx, stream, flags);
  return maybeThen(promise, () => {
    if (!isSlot && !beforeClose) {
      return void stream.write(CLOSE_VIRTUAL);
    }
    let promise2;
    if (isSlot) {
      const content = ssrCtx.$projectedChildren$?.[key];
      if (content) {
        const [rCtx2, sCtx] = ssrCtx.$projectedCtxs$;
        const newSlotRctx = pushRenderContext(rCtx2);
        newSlotRctx.$slotCtx$ = elCtx, ssrCtx.$projectedChildren$[key] = void 0, promise2 = processData$1(content, newSlotRctx, sCtx, stream, flags);
      }
    }
    return beforeClose && (promise2 = maybeThen(promise2, () => beforeClose(stream))), maybeThen(promise2, () => {
      stream.write(CLOSE_VIRTUAL);
    });
  });
};
const CLOSE_VIRTUAL = "<!--/qv-->";
const renderAttributes = (attributes) => {
  let text = "";
  for (const prop in attributes) {
    if (prop === dangerouslySetInnerHTML) {
      continue;
    }
    const value = attributes[prop];
    null != value && (text += " " + ("" === value ? prop : prop + '="' + escapeValue(value) + '"'));
  }
  return text;
};
const renderVirtualAttributes = (attributes) => {
  let text = "";
  for (const prop in attributes) {
    if ("children" === prop || prop === dangerouslySetInnerHTML) {
      continue;
    }
    const value = attributes[prop];
    null != value && (text += " " + ("" === value ? prop : prop + "=" + escapeValue(value)));
  }
  return text;
};
const renderNodeElementSync = (tagName, attributes, stream) => {
  stream.write("<" + tagName + renderAttributes(attributes) + ">");
  if (!!emptyElements[tagName]) {
    return;
  }
  const innerHTML = attributes[dangerouslySetInnerHTML];
  null != innerHTML && stream.write(innerHTML), stream.write(`</${tagName}>`);
};
const renderSSRComponent = (rCtx, ssrCtx, stream, elCtx, node, flags, beforeClose) => (setComponentProps$1(rCtx, elCtx, node.props.props), maybeThen(executeComponent(rCtx, elCtx), (res) => {
  const hostElement = elCtx.$element$;
  const newRCtx = res.rCtx;
  const iCtx = newInvokeContext(ssrCtx.$static$.$locale$, hostElement, void 0);
  iCtx.$subscriber$ = [0, hostElement], iCtx.$renderCtx$ = newRCtx;
  const newSSrContext = {
    $static$: ssrCtx.$static$,
    $projectedChildren$: splitProjectedChildren(node.children, ssrCtx),
    $projectedCtxs$: [rCtx, ssrCtx],
    $invocationContext$: iCtx
  };
  const extraNodes = [];
  if (elCtx.$appendStyles$) {
    const array = !!(4 & flags) ? ssrCtx.$static$.$headNodes$ : extraNodes;
    for (const style of elCtx.$appendStyles$) {
      array.push(_jsxQ("style", {
        [QStyle]: style.styleId,
        [dangerouslySetInnerHTML]: style.content,
        hidden: ""
      }, null, null, 0, null));
    }
  }
  const newID = getNextIndex(rCtx);
  const scopeId = elCtx.$scopeIds$ ? serializeSStyle(elCtx.$scopeIds$) : void 0;
  const processedNode = _jsxC(node.type, {
    [QScopedStyle]: scopeId,
    [ELEMENT_ID]: newID,
    children: res.node
  }, 0, node.key);
  return elCtx.$id$ = newID, ssrCtx.$static$.$contexts$.push(elCtx), renderNodeVirtual(processedNode, elCtx, extraNodes, newRCtx, newSSrContext, stream, flags, (stream2) => {
    if (elCtx.$flags$ & HOST_FLAG_NEED_ATTACH_LISTENER) {
      const placeholderCtx = createMockQContext(1);
      const listeners = placeholderCtx.li;
      listeners.push(...elCtx.li), elCtx.$flags$ &= ~HOST_FLAG_NEED_ATTACH_LISTENER, placeholderCtx.$id$ = getNextIndex(rCtx);
      const attributes = {
        hidden: "",
        "q:id": placeholderCtx.$id$
      };
      ssrCtx.$static$.$contexts$.push(placeholderCtx);
      const groups = groupListeners(listeners);
      for (const listener of groups) {
        const eventName = normalizeInvisibleEvents(listener[0]);
        attributes[eventName] = serializeQRLs(listener[1], rCtx.$static$.$containerState$, placeholderCtx), registerQwikEvent$1(eventName, rCtx.$static$.$containerState$);
      }
      renderNodeElementSync("script", attributes, stream2);
    }
    const projectedChildren = newSSrContext.$projectedChildren$;
    let missingSlotsDone;
    if (projectedChildren) {
      const nodes = Object.keys(projectedChildren).map((slotName) => {
        const escapedSlotName = slotName ? escapeHtml(slotName) : slotName;
        const content = projectedChildren[escapedSlotName];
        if (content) {
          return _jsxQ("q:template", {
            [QSlot]: escapedSlotName || true,
            hidden: true,
            "aria-hidden": "true"
          }, null, content, 0, null);
        }
      });
      const [_rCtx, sCtx] = newSSrContext.$projectedCtxs$;
      const newSlotRctx = pushRenderContext(_rCtx);
      newSlotRctx.$slotCtx$ = elCtx, missingSlotsDone = processData$1(nodes, newSlotRctx, sCtx, stream2, 0, void 0);
    }
    return beforeClose ? maybeThen(missingSlotsDone, () => beforeClose(stream2)) : missingSlotsDone;
  });
}));
const splitProjectedChildren = (children, ssrCtx) => {
  const flatChildren = flatVirtualChildren(children, ssrCtx);
  if (null === flatChildren) {
    return;
  }
  const slotMap = {};
  for (const child of flatChildren) {
    let slotName = "";
    isJSXNode(child) && (slotName = escapeHtml(child.props[QSlot] || "")), (slotMap[slotName] ||= []).push(child);
  }
  return slotMap;
};
const createMockQContext = (nodeType) => {
  const elm = new MockElement(nodeType);
  return createContext(elm);
};
const renderNode = (node, rCtx, ssrCtx, stream, flags, beforeClose) => {
  const tagName = node.type;
  const hostCtx = rCtx.$cmpCtx$;
  if ("string" == typeof tagName) {
    const key = node.key;
    const props = node.props;
    const immutable = node.immutableProps || EMPTY_OBJ;
    const elCtx = createMockQContext(1);
    const elm = elCtx.$element$;
    const isHead = "head" === tagName;
    let openingElement = "<" + tagName;
    let useSignal2 = false;
    let hasRef = false;
    let classStr = "";
    let htmlStr = null;
    const handleProp = (rawProp, value, isImmutable) => {
      if ("ref" === rawProp) {
        return void (void 0 !== value && (setRef(value, elm), hasRef = true));
      }
      if (isOnProp(rawProp)) {
        return void setEvent(elCtx.li, rawProp, value, void 0);
      }
      if (isSignal(value) && (value = trackSignal(value, isImmutable ? [1, elm, value, hostCtx.$element$, rawProp] : [2, hostCtx.$element$, value, elm, rawProp]), useSignal2 = true), rawProp === dangerouslySetInnerHTML) {
        return void (htmlStr = value);
      }
      let attrValue;
      rawProp.startsWith(PREVENT_DEFAULT) && registerQwikEvent$1(rawProp.slice(15), rCtx.$static$.$containerState$);
      const prop = "htmlFor" === rawProp ? "for" : rawProp;
      "class" === prop || "className" === prop ? classStr = serializeClass(value) : "style" === prop ? attrValue = stringifyStyle(value) : isAriaAttribute(prop) || "draggable" === prop || "spellcheck" === prop ? (attrValue = null != value ? String(value) : null, value = attrValue) : attrValue = false === value || null == value ? null : String(value), null != attrValue && ("value" === prop && "textarea" === tagName ? htmlStr = escapeHtml(attrValue) : isSSRUnsafeAttr(prop) || (openingElement += " " + (true === value ? prop : prop + '="' + escapeHtml(attrValue) + '"')));
    };
    for (const prop in props) {
      let isImmutable = false;
      let value;
      prop in immutable ? (isImmutable = true, value = immutable[prop], value === _IMMUTABLE && (value = props[prop])) : value = props[prop], handleProp(prop, value, isImmutable);
    }
    for (const prop in immutable) {
      if (prop in props) {
        continue;
      }
      const value = immutable[prop];
      value !== _IMMUTABLE && handleProp(prop, value, true);
    }
    const listeners = elCtx.li;
    if (hostCtx) {
      if (hostCtx.$scopeIds$?.length) {
        const extra = hostCtx.$scopeIds$.join(" ");
        classStr = classStr ? `${extra} ${classStr}` : extra;
      }
      hostCtx.$flags$ & HOST_FLAG_NEED_ATTACH_LISTENER && (listeners.push(...hostCtx.li), hostCtx.$flags$ &= ~HOST_FLAG_NEED_ATTACH_LISTENER);
    }
    if (isHead && (flags |= 1), tagName in invisibleElements && (flags |= 16), tagName in textOnlyElements && (flags |= 8), classStr && (openingElement += ' class="' + escapeHtml(classStr) + '"'), listeners.length > 0) {
      const groups = groupListeners(listeners);
      const isInvisible = !!(16 & flags);
      for (const listener of groups) {
        const eventName = isInvisible ? normalizeInvisibleEvents(listener[0]) : listener[0];
        openingElement += " " + eventName + '="' + serializeQRLs(listener[1], rCtx.$static$.$containerState$, elCtx) + '"', registerQwikEvent$1(eventName, rCtx.$static$.$containerState$);
      }
    }
    if (null != key && (openingElement += ' q:key="' + escapeHtml(key) + '"'), hasRef || useSignal2 || listeners.length > 0) {
      if (hasRef || useSignal2 || listenersNeedId(listeners)) {
        const newID = getNextIndex(rCtx);
        openingElement += ' q:id="' + newID + '"', elCtx.$id$ = newID;
      }
      ssrCtx.$static$.$contexts$.push(elCtx);
    }
    if (1 & flags && (openingElement += " q:head"), openingElement += ">", stream.write(openingElement), tagName in emptyElements) {
      return;
    }
    if (null != htmlStr) {
      return stream.write(String(htmlStr)), void stream.write(`</${tagName}>`);
    }
    "html" === tagName ? flags |= 4 : flags &= -5, 2 & node.flags && (flags |= 1024);
    const promise = processData$1(node.children, rCtx, ssrCtx, stream, flags);
    return maybeThen(promise, () => {
      if (isHead) {
        for (const node2 of ssrCtx.$static$.$headNodes$) {
          renderNodeElementSync(node2.type, node2.props, stream);
        }
        ssrCtx.$static$.$headNodes$.length = 0;
      }
      if (beforeClose) {
        return maybeThen(beforeClose(stream), () => {
          stream.write(`</${tagName}>`);
        });
      }
      stream.write(`</${tagName}>`);
    });
  }
  if (tagName === Virtual) {
    const elCtx = createMockQContext(111);
    return rCtx.$slotCtx$ ? (elCtx.$parentCtx$ = rCtx.$slotCtx$, elCtx.$realParentCtx$ = rCtx.$cmpCtx$) : elCtx.$parentCtx$ = rCtx.$cmpCtx$, hostCtx && hostCtx.$flags$ & HOST_FLAG_DYNAMIC && addDynamicSlot(hostCtx, elCtx), renderNodeVirtual(node, elCtx, void 0, rCtx, ssrCtx, stream, flags, beforeClose);
  }
  if (tagName === SSRRaw) {
    return void stream.write(node.props.data);
  }
  if (tagName === InternalSSRStream) {
    return renderGenerator(node, rCtx, ssrCtx, stream, flags);
  }
  const res = invoke(ssrCtx.$invocationContext$, tagName, node.props, node.key, node.flags, node.dev);
  return shouldWrapFunctional(res, node) ? renderNode(_jsxC(Virtual, {
    children: res
  }, 0, node.key), rCtx, ssrCtx, stream, flags, beforeClose) : processData$1(res, rCtx, ssrCtx, stream, flags, beforeClose);
};
const processData$1 = (node, rCtx, ssrCtx, stream, flags, beforeClose) => {
  if (null != node && "boolean" != typeof node) {
    if (!isString(node) && "number" != typeof node) {
      if (isJSXNode(node)) {
        return renderNode(node, rCtx, ssrCtx, stream, flags, beforeClose);
      }
      if (isArray(node)) {
        return walkChildren(node, rCtx, ssrCtx, stream, flags);
      }
      if (isSignal(node)) {
        const insideText = 8 & flags;
        const hostEl = rCtx.$cmpCtx$?.$element$;
        let value;
        if (hostEl) {
          if (!insideText) {
            const id = getNextIndex(rCtx);
            if (value = trackSignal(node, 1024 & flags ? [3, "#" + id, node, "#" + id] : [4, hostEl, node, "#" + id]), isString(value)) {
              const str = jsxToString(value);
              ssrCtx.$static$.$textNodes$.set(str, id);
            }
            return stream.write(`<!--t=${id}-->`), processData$1(value, rCtx, ssrCtx, stream, flags, beforeClose), void stream.write("<!---->");
          }
          value = invoke(ssrCtx.$invocationContext$, () => node.value);
        }
        return void stream.write(escapeHtml(jsxToString(value)));
      }
      return isPromise$1(node) ? (stream.write(FLUSH_COMMENT), node.then((node2) => processData$1(node2, rCtx, ssrCtx, stream, flags, beforeClose))) : void 0;
    }
    stream.write(escapeHtml(String(node)));
  }
};
const walkChildren = (children, rCtx, ssrContext, stream, flags) => {
  if (null == children) {
    return;
  }
  if (!isArray(children)) {
    return processData$1(children, rCtx, ssrContext, stream, flags);
  }
  const len = children.length;
  if (1 === len) {
    return processData$1(children[0], rCtx, ssrContext, stream, flags);
  }
  if (0 === len) {
    return;
  }
  let currentIndex = 0;
  const buffers = [];
  return children.reduce((prevPromise, child, index) => {
    const buffer = [];
    buffers.push(buffer);
    const rendered = processData$1(child, rCtx, ssrContext, prevPromise ? {
      write(chunk) {
        currentIndex === index ? stream.write(chunk) : buffer.push(chunk);
      }
    } : stream, flags);
    if (prevPromise || isPromise$1(rendered)) {
      const next = () => {
        currentIndex++, buffers.length > currentIndex && buffers[currentIndex].forEach((chunk) => stream.write(chunk));
      };
      return isPromise$1(rendered) ? prevPromise ? Promise.all([rendered, prevPromise]).then(next) : rendered.then(next) : prevPromise.then(next);
    }
    currentIndex++;
  }, void 0);
};
const flatVirtualChildren = (children, ssrCtx) => {
  if (null == children) {
    return null;
  }
  const result = _flatVirtualChildren(children, ssrCtx);
  const nodes = isArray(result) ? result : [result];
  return 0 === nodes.length ? null : nodes;
};
const _flatVirtualChildren = (children, ssrCtx) => {
  if (null == children) {
    return null;
  }
  if (isArray(children)) {
    return children.flatMap((c) => _flatVirtualChildren(c, ssrCtx));
  }
  if (isJSXNode(children) && isFunction(children.type) && children.type !== SSRRaw && children.type !== InternalSSRStream && children.type !== Virtual) {
    const res = invoke(ssrCtx.$invocationContext$, children.type, children.props, children.key, children.flags);
    return flatVirtualChildren(res, ssrCtx);
  }
  return children;
};
const setComponentProps$1 = (rCtx, elCtx, expectProps) => {
  const keys = Object.keys(expectProps);
  const target = createPropsState();
  if (elCtx.$props$ = createProxy(target, rCtx.$static$.$containerState$), 0 === keys.length) {
    return;
  }
  const immutableMeta = target[_IMMUTABLE] = expectProps[_IMMUTABLE] ?? EMPTY_OBJ;
  for (const prop of keys) {
    "children" !== prop && prop !== QSlot && (isSignal(immutableMeta[prop]) ? target["$$" + prop] = immutableMeta[prop] : target[prop] = expectProps[prop]);
  }
};
const invisibleElements = {
  head: true,
  style: true,
  script: true,
  link: true,
  meta: true
};
const textOnlyElements = {
  title: true,
  style: true,
  script: true,
  noframes: true,
  textarea: true
};
const emptyElements = {
  area: true,
  base: true,
  basefont: true,
  bgsound: true,
  br: true,
  col: true,
  embed: true,
  frame: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true
};
const ESCAPE_HTML = /[&<>'"]/g;
const registerQwikEvent$1 = (prop, containerState) => {
  containerState.$events$.add(getEventName(prop));
};
const escapeValue = (value) => "string" == typeof value ? escapeHtml(value) : value;
const escapeHtml = (s) => s.replace(ESCAPE_HTML, (c) => {
  switch (c) {
    case "&":
      return "&amp;";
    case "<":
      return "&lt;";
    case ">":
      return "&gt;";
    case '"':
      return "&quot;";
    case "'":
      return "&#39;";
    default:
      return "";
  }
});
const unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;
const isSSRUnsafeAttr = (name) => unsafeAttrCharRE.test(name);
const listenersNeedId = (listeners) => listeners.some((l) => l[1].$captureRef$ && l[1].$captureRef$.length > 0);
const addDynamicSlot = (hostCtx, elCtx) => {
  const dynamicSlots = hostCtx.$dynamicSlots$ ||= [];
  dynamicSlots.includes(elCtx) || dynamicSlots.push(elCtx);
};
const normalizeInvisibleEvents = (eventName) => "on:qvisible" === eventName ? "on-document:qinit" : eventName;
const _fnSignal = (fn, args, fnStr) => new SignalDerived(fn, args, fnStr);
const serializeDerivedSignalFunc = (signal) => {
  const fnBody = signal.$funcStr$;
  let args = "";
  for (let i = 0; i < signal.$args$.length; i++) {
    args += `p${i},`;
  }
  return `(${args})=>(${fnBody})`;
};
const _jsxQ = (type, mutableProps, immutableProps, children, flags, key) => {
  const processed = null == key ? null : String(key);
  const node = new JSXNodeImpl(type, mutableProps || EMPTY_OBJ, immutableProps, children, flags, processed);
  return node;
};
const _jsxS = (type, mutableProps, immutableProps, flags, key, dev) => {
  let children = null;
  return mutableProps && "children" in mutableProps && (children = mutableProps.children, delete mutableProps.children), _jsxQ(type, mutableProps, immutableProps, children, flags, key);
};
const _jsxC = (type, mutableProps, flags, key, dev) => {
  const processed = null == key ? null : String(key);
  const props = mutableProps ?? {};
  if ("string" == typeof type && _IMMUTABLE in props) {
    const immutableProps = props[_IMMUTABLE];
    delete props[_IMMUTABLE];
    const children = props.children;
    delete props.children;
    for (const [k, v] of Object.entries(immutableProps)) {
      v !== _IMMUTABLE && (delete props[k], props[k] = v);
    }
    return _jsxQ(type, null, props, children, flags, key);
  }
  const node = new JSXNodeImpl(type, props, null, props.children, flags, processed);
  return "string" == typeof type && mutableProps && delete mutableProps.children, node;
};
const jsx = (type, props, key) => {
  const processed = null ;
  const children = untrack(() => {
    const c = props.children;
    return "string" == typeof type && delete props.children, c;
  });
  isString(type) && "className" in props && (props.class = props.className, delete props.className);
  const node = new JSXNodeImpl(type, props, null, children, 0, processed);
  return node;
};
class JSXNodeImpl {
  type;
  props;
  immutableProps;
  children;
  flags;
  key;
  dev;
  constructor(type, props, immutableProps, children, flags, key = null) {
    this.type = type, this.props = props, this.immutableProps = immutableProps, this.children = children, this.flags = flags, this.key = key;
  }
}
const Virtual = (props) => props.children;
const isJSXNode = (n) => n instanceof JSXNodeImpl;
const Fragment = (props) => props.children;
const SkipRender = /* @__PURE__ */ Symbol("skip render");
const SSRRaw = () => null;
const InternalSSRStream = () => null;
const renderComponent = (rCtx, elCtx, flags) => {
  const justMounted = !(elCtx.$flags$ & HOST_FLAG_MOUNTED);
  const hostElement = elCtx.$element$;
  const containerState = rCtx.$static$.$containerState$;
  return containerState.$hostsStaging$.delete(elCtx), containerState.$subsManager$.$clearSub$(hostElement), maybeThen(executeComponent(rCtx, elCtx), (res) => {
    const staticCtx = rCtx.$static$;
    const newCtx = res.rCtx;
    const iCtx = newInvokeContext(rCtx.$static$.$locale$, hostElement);
    if (staticCtx.$hostElements$.add(hostElement), iCtx.$subscriber$ = [0, hostElement], iCtx.$renderCtx$ = newCtx, justMounted && elCtx.$appendStyles$) {
      for (const style of elCtx.$appendStyles$) {
        appendHeadStyle(staticCtx, style);
      }
    }
    const processedJSXNode = processData(res.node, iCtx);
    return maybeThen(processedJSXNode, (processedJSXNode2) => {
      const newVdom = wrapJSX(hostElement, processedJSXNode2);
      const oldVdom = getVdom(elCtx);
      return maybeThen(smartUpdateChildren(newCtx, oldVdom, newVdom, flags), () => {
        elCtx.$vdom$ = newVdom;
      });
    });
  });
};
const getVdom = (elCtx) => (elCtx.$vdom$ || (elCtx.$vdom$ = domToVnode(elCtx.$element$)), elCtx.$vdom$);
class ProcessedJSXNodeImpl {
  $type$;
  $props$;
  $immutableProps$;
  $children$;
  $flags$;
  $key$;
  $elm$ = null;
  $text$ = "";
  $signal$ = null;
  $id$;
  $dev$;
  constructor($type$, $props$, $immutableProps$, $children$, $flags$, $key$) {
    this.$type$ = $type$, this.$props$ = $props$, this.$immutableProps$ = $immutableProps$, this.$children$ = $children$, this.$flags$ = $flags$, this.$key$ = $key$, this.$id$ = $type$ + ($key$ ? ":" + $key$ : "");
  }
}
const processNode = (node, invocationContext) => {
  const { key, type, props, children, flags, immutableProps } = node;
  let textType = "";
  if (isString(type)) {
    textType = type;
  } else {
    if (type !== Virtual) {
      if (isFunction(type)) {
        const res = invoke(invocationContext, type, props, key, flags, node.dev);
        return shouldWrapFunctional(res, node) ? processNode(_jsxC(Virtual, {
          children: res
        }, 0, key), invocationContext) : processData(res, invocationContext);
      }
      throw qError(25, type);
    }
    textType = VIRTUAL;
  }
  let convertedChildren = EMPTY_ARRAY;
  if (null != children) {
    return maybeThen(processData(children, invocationContext), (result) => {
      void 0 !== result && (convertedChildren = isArray(result) ? result : [result]);
      const vnode = new ProcessedJSXNodeImpl(textType, props, immutableProps, convertedChildren, flags, key);
      return vnode;
    });
  }
  {
    const vnode = new ProcessedJSXNodeImpl(textType, props, immutableProps, convertedChildren, flags, key);
    return vnode;
  }
};
const wrapJSX = (element, input) => {
  const children = void 0 === input ? EMPTY_ARRAY : isArray(input) ? input : [input];
  const node = new ProcessedJSXNodeImpl(":virtual", {}, null, children, 0, null);
  return node.$elm$ = element, node;
};
const processData = (node, invocationContext) => {
  if (null != node && "boolean" != typeof node) {
    if (isPrimitive(node)) {
      const newNode = new ProcessedJSXNodeImpl("#text", EMPTY_OBJ, null, EMPTY_ARRAY, 0, null);
      return newNode.$text$ = String(node), newNode;
    }
    if (isJSXNode(node)) {
      return processNode(node, invocationContext);
    }
    if (isSignal(node)) {
      const newNode = new ProcessedJSXNodeImpl("#signal", EMPTY_OBJ, null, EMPTY_ARRAY, 0, null);
      return newNode.$signal$ = node, newNode;
    }
    if (isArray(node)) {
      const output = promiseAll(node.flatMap((n) => processData(n, invocationContext)));
      return maybeThen(output, (array) => array.flat(100).filter(isNotNullable));
    }
    return isPromise$1(node) ? node.then((node2) => processData(node2, invocationContext)) : node === SkipRender ? new ProcessedJSXNodeImpl(":skipRender", EMPTY_OBJ, null, EMPTY_ARRAY, 0, null) : void 0;
  }
};
const isPrimitive = (obj) => isString(obj) || "number" == typeof obj;
const resumeIfNeeded = (containerEl) => {
  "paused" === directGetAttribute(containerEl, "q:container") && (resumeContainer(containerEl), appendQwikDevTools(containerEl));
};
const getPauseState = (containerEl) => {
  const doc = getDocument(containerEl);
  const script = getQwikJSON(containerEl === doc.documentElement ? doc.body : containerEl, "type");
  if (script) {
    return JSON.parse(unescapeText(script.firstChild.data) || "{}");
  }
};
const _deserializeData = (data, element) => {
  const obj = JSON.parse(data);
  if ("object" != typeof obj) {
    return null;
  }
  const { _objs, _entry } = obj;
  if (void 0 === _objs || void 0 === _entry) {
    return null;
  }
  let doc = {};
  let containerState = {};
  if (isNode$1(element) && isQwikElement(element)) {
    const containerEl = getWrappingContainer(element);
    containerEl && (containerState = _getContainerState(containerEl), doc = containerEl.ownerDocument);
  }
  const parser = createParser(containerState, doc);
  for (let i = 0; i < _objs.length; i++) {
    const value = _objs[i];
    isString(value) && (_objs[i] = value === UNDEFINED_PREFIX ? void 0 : parser.prepare(value));
  }
  const getObject = (id) => _objs[strToInt(id)];
  for (const obj2 of _objs) {
    reviveNestedObjects(obj2, getObject, parser);
  }
  return getObject(_entry);
};
const resumeContainer = (containerEl) => {
  if (!isContainer$1(containerEl)) {
    return void 0;
  }
  const pauseState = containerEl._qwikjson_ ?? getPauseState(containerEl);
  if (containerEl._qwikjson_ = null, !pauseState) {
    return void 0;
  }
  const doc = getDocument(containerEl);
  const hash2 = containerEl.getAttribute(QInstance);
  const inlinedFunctions = getQFuncs(doc, hash2);
  const containerState = _getContainerState(containerEl);
  const elements = /* @__PURE__ */ new Map();
  const text = /* @__PURE__ */ new Map();
  let node = null;
  let container = 0;
  const elementWalker = doc.createTreeWalker(containerEl, SHOW_COMMENT$1);
  for (; node = elementWalker.nextNode(); ) {
    const data = node.data;
    if (0 === container) {
      if (data.startsWith("qv ")) {
        const id = getID(data);
        id >= 0 && elements.set(id, node);
      } else if (data.startsWith("t=")) {
        const id = data.slice(2);
        const index = strToInt(id);
        const textNode = getTextNode(node);
        elements.set(index, textNode), text.set(index, textNode.data);
      }
    }
    "cq" === data ? container++ : "/cq" === data && container--;
  }
  const slotPath = 0 !== containerEl.getElementsByClassName("qc📦").length;
  containerEl.querySelectorAll("[q\\:id]").forEach((el) => {
    if (slotPath && el.closest("[q\\:container]") !== containerEl) {
      return;
    }
    const id = directGetAttribute(el, "q:id");
    const index = strToInt(id);
    elements.set(index, el);
  });
  const parser = createParser(containerState, doc);
  const finalized = /* @__PURE__ */ new Map();
  const revived = /* @__PURE__ */ new Set();
  const getObject = (id) => (assertTrue("string" == typeof id && id.length > 0), finalized.has(id) ? finalized.get(id) : computeObject(id));
  const computeObject = (id) => {
    if (id.startsWith("#")) {
      const elementId = id.slice(1);
      const index2 = strToInt(elementId);
      assertTrue(elements.has(index2));
      const rawElement = elements.get(index2);
      if (isComment(rawElement)) {
        if (!rawElement.isConnected) {
          return void finalized.set(id, void 0);
        }
        const virtual = getVirtualElement(rawElement);
        return finalized.set(id, virtual), getContext(virtual, containerState), virtual;
      }
      return isElement$1(rawElement) ? (finalized.set(id, rawElement), getContext(rawElement, containerState), rawElement) : (finalized.set(id, rawElement), rawElement);
    }
    if (id.startsWith("@")) {
      const funcId = id.slice(1);
      const index2 = strToInt(funcId);
      const func = inlinedFunctions[index2];
      return func;
    }
    if (id.startsWith("*")) {
      const elementId = id.slice(1);
      const index2 = strToInt(elementId);
      assertTrue(elements.has(index2));
      const str = text.get(index2);
      return finalized.set(id, str), str;
    }
    const index = strToInt(id);
    const objs = pauseState.objs;
    assertTrue(objs.length > index);
    let value = objs[index];
    isString(value) && (value = value === UNDEFINED_PREFIX ? void 0 : parser.prepare(value));
    let obj = value;
    for (let i = id.length - 1; i >= 0; i--) {
      const transform = OBJECT_TRANSFORMS[id[i]];
      if (!transform) {
        break;
      }
      obj = transform(obj, containerState);
    }
    return finalized.set(id, obj), isPrimitive(value) || revived.has(index) || (revived.add(index), reviveSubscriptions(value, index, pauseState.subs, getObject, containerState, parser), reviveNestedObjects(value, getObject, parser)), obj;
  };
  containerState.$elementIndex$ = 1e5, containerState.$pauseCtx$ = {
    getObject,
    meta: pauseState.ctx,
    refs: pauseState.refs
  }, directSetAttribute(containerEl, "q:container", "resumed"), emitEvent$1(containerEl, "qresume", void 0, true);
};
const reviveSubscriptions = (value, i, objsSubs, getObject, containerState, parser) => {
  const subs = objsSubs[i];
  if (subs) {
    const converted = [];
    let flag = 0;
    for (const sub of subs) {
      if (sub.startsWith("_")) {
        flag = parseInt(sub.slice(1), 10);
      } else {
        const parsed = parseSubscription(sub, getObject);
        parsed && converted.push(parsed);
      }
    }
    if (flag > 0 && setObjectFlags(value, flag), !parser.subs(value, converted)) {
      const proxy = containerState.$proxyMap$.get(value);
      proxy ? getSubscriptionManager(proxy).$addSubs$(converted) : createProxy(value, containerState, converted);
    }
  }
};
const reviveNestedObjects = (obj, getObject, parser) => {
  if (!parser.fill(obj, getObject) && obj && "object" == typeof obj) {
    if (isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        obj[i] = getObject(obj[i]);
      }
    } else if (isSerializableObject(obj)) {
      for (const key in obj) {
        obj[key] = getObject(obj[key]);
      }
    }
  }
};
const unescapeText = (str) => str.replace(/\\x3C(\/?script)/gi, "<$1");
const getQwikJSON = (parentElm, attribute) => {
  let child = parentElm.lastElementChild;
  for (; child; ) {
    if ("SCRIPT" === child.tagName && "qwik/json" === directGetAttribute(child, attribute)) {
      return child;
    }
    child = child.previousElementSibling;
  }
};
const getTextNode = (mark) => {
  const nextNode = mark.nextSibling;
  if (isText(nextNode)) {
    return nextNode;
  }
  {
    const textNode = mark.ownerDocument.createTextNode("");
    return mark.parentElement.insertBefore(textNode, mark), textNode;
  }
};
const appendQwikDevTools = (containerEl) => {
  containerEl.qwik = {
    pause: () => pauseContainer(containerEl),
    state: _getContainerState(containerEl)
  };
};
const getID = (stuff) => {
  const index = stuff.indexOf("q:id=");
  return index > 0 ? strToInt(stuff.slice(index + 5)) : -1;
};
const useLexicalScope = () => {
  const context = getInvokeContext();
  let qrl2 = context.$qrl$;
  if (qrl2) {
    assertDefined(qrl2.$captureRef$);
  } else {
    const el = context.$element$;
    const container = getWrappingContainer(el);
    qrl2 = parseQRL(decodeURIComponent(String(context.$url$)), container), resumeIfNeeded(container);
    const elCtx = getContext(el, _getContainerState(container));
    inflateQrl(qrl2, elCtx);
  }
  return qrl2.$captureRef$;
};
const executeSignalOperation = (rCtx, operation) => {
  try {
    const type = operation[0];
    const staticCtx = rCtx.$static$;
    switch (type) {
      case 1:
      case 2: {
        let elm;
        let hostElm;
        1 === type ? (elm = operation[1], hostElm = operation[3]) : (elm = operation[3], hostElm = operation[1]);
        const elCtx = tryGetContext(elm);
        if (null == elCtx) {
          return;
        }
        const prop = operation[4];
        const isSVG = elm.namespaceURI === SVG_NS;
        staticCtx.$containerState$.$subsManager$.$clearSignal$(operation);
        let value = trackSignal(operation[2], operation.slice(0, -1));
        "class" === prop ? value = serializeClassWithHost(value, tryGetContext(hostElm)) : "style" === prop && (value = stringifyStyle(value));
        const vdom = getVdom(elCtx);
        if (prop in vdom.$props$ && vdom.$props$[prop] === value) {
          return;
        }
        return vdom.$props$[prop] = value, smartSetProperty(staticCtx, elm, prop, value, isSVG);
      }
      case 3:
      case 4: {
        const elm = operation[3];
        if (!staticCtx.$visited$.includes(elm)) {
          staticCtx.$containerState$.$subsManager$.$clearSignal$(operation);
          const invocationContext = void 0;
          let signalValue = trackSignal(operation[2], operation.slice(0, -1));
          const subscription = getLastSubscription();
          Array.isArray(signalValue) && (signalValue = new JSXNodeImpl(Virtual, {}, null, signalValue, 0, null));
          let newVnode = processData(signalValue, invocationContext);
          if (isPromise$1(newVnode)) {
            logError("Rendering promises in JSX signals is not supported");
          } else {
            void 0 === newVnode && (newVnode = processData("", invocationContext));
            const oldVnode = getVnodeFromEl(elm);
            const element = getQwikElement(operation[1]);
            if (rCtx.$cmpCtx$ = getContext(element, rCtx.$static$.$containerState$), oldVnode.$type$ == newVnode.$type$ && oldVnode.$key$ == newVnode.$key$ && oldVnode.$id$ == newVnode.$id$) {
              diffVnode(rCtx, oldVnode, newVnode, 0);
            } else {
              const promises = [];
              const oldNode = oldVnode.$elm$;
              const newElm = createElm(rCtx, newVnode, 0, promises);
              promises.length && logError("Rendering promises in JSX signals is not supported"), subscription[3] = newElm, insertBefore(rCtx.$static$, elm.parentElement, newElm, oldNode), oldNode && removeNode(staticCtx, oldNode);
            }
          }
        }
      }
    }
  } catch (e) {
  }
};
function getQwikElement(element) {
  for (; element; ) {
    if (isQwikElement(element)) {
      return element;
    }
    element = element.parentElement;
  }
  throw new Error("Not found");
}
const notifyChange = (subAction, containerState) => {
  if (0 === subAction[0]) {
    const host = subAction[1];
    isSubscriberDescriptor(host) ? notifyTask(host, containerState) : notifyRender(host, containerState);
  } else {
    notifySignalOperation(subAction, containerState);
  }
};
const notifyRender = (hostElement, containerState) => {
  const server = isServerPlatform();
  server || resumeIfNeeded(containerState.$containerEl$);
  const elCtx = getContext(hostElement, containerState);
  if (assertDefined(elCtx.$componentQrl$), elCtx.$flags$ & HOST_FLAG_DIRTY) {
    return;
  }
  elCtx.$flags$ |= HOST_FLAG_DIRTY;
  if (void 0 !== containerState.$hostsRendering$) {
    containerState.$hostsStaging$.add(elCtx);
  } else {
    if (server) {
      return void 0;
    }
    containerState.$hostsNext$.add(elCtx), scheduleFrame(containerState);
  }
};
const notifySignalOperation = (op, containerState) => {
  const activeRendering = void 0 !== containerState.$hostsRendering$;
  containerState.$opsNext$.add(op), activeRendering || scheduleFrame(containerState);
};
const notifyTask = (task, containerState) => {
  if (task.$flags$ & TaskFlagsIsDirty) {
    return;
  }
  task.$flags$ |= TaskFlagsIsDirty;
  void 0 !== containerState.$hostsRendering$ ? containerState.$taskStaging$.add(task) : (containerState.$taskNext$.add(task), scheduleFrame(containerState));
};
const scheduleFrame = (containerState) => (void 0 === containerState.$renderPromise$ && (containerState.$renderPromise$ = getPlatform().nextTick(() => renderMarked(containerState))), containerState.$renderPromise$);
const _hW = () => {
  const [task] = useLexicalScope();
  notifyTask(task, _getContainerState(getWrappingContainer(task.$el$)));
};
const renderMarked = async (containerState) => {
  const containerEl = containerState.$containerEl$;
  const doc = getDocument(containerEl);
  try {
    const rCtx = createRenderContext(doc, containerState);
    const staticCtx = rCtx.$static$;
    const hostsRendering = containerState.$hostsRendering$ = new Set(containerState.$hostsNext$);
    containerState.$hostsNext$.clear(), await executeTasksBefore(containerState, rCtx), containerState.$hostsStaging$.forEach((host) => {
      hostsRendering.add(host);
    }), containerState.$hostsStaging$.clear();
    const signalOperations = Array.from(containerState.$opsNext$);
    containerState.$opsNext$.clear();
    const renderingQueue = Array.from(hostsRendering);
    if (sortNodes(renderingQueue), !containerState.$styleMoved$ && renderingQueue.length > 0) {
      containerState.$styleMoved$ = true;
      (containerEl === doc.documentElement ? doc.body : containerEl).querySelectorAll("style[q\\:style]").forEach((el) => {
        containerState.$styleIds$.add(directGetAttribute(el, QStyle)), appendChild(staticCtx, doc.head, el);
      });
    }
    for (const elCtx of renderingQueue) {
      const el = elCtx.$element$;
      if (!staticCtx.$hostElements$.has(el) && elCtx.$componentQrl$) {
        assertTrue(el.isConnected, "element must be connected to the dom"), staticCtx.$roots$.push(elCtx);
        try {
          await renderComponent(rCtx, elCtx, getFlags(el.parentElement));
        } catch (err) {
          logError(err);
        }
      }
    }
    return signalOperations.forEach((op) => {
      executeSignalOperation(rCtx, op);
    }), staticCtx.$operations$.push(...staticCtx.$postOperations$), 0 === staticCtx.$operations$.length ? (printRenderStats(staticCtx), void await postRendering(containerState, rCtx)) : (await executeContextWithScrollAndTransition(staticCtx), printRenderStats(staticCtx), postRendering(containerState, rCtx));
  } catch (err) {
    logError(err);
  }
};
const getFlags = (el) => {
  let flags = 0;
  return el && (el.namespaceURI === SVG_NS && (flags |= IS_SVG), "HEAD" === el.tagName && (flags |= IS_HEAD)), flags;
};
const postRendering = async (containerState, rCtx) => {
  const hostElements = rCtx.$static$.$hostElements$;
  await executeTasksAfter(containerState, rCtx, (task, stage) => 0 !== (task.$flags$ & TaskFlagsIsVisibleTask) && (!stage || hostElements.has(task.$el$))), containerState.$hostsStaging$.forEach((el) => {
    containerState.$hostsNext$.add(el);
  }), containerState.$hostsStaging$.clear(), containerState.$hostsRendering$ = void 0, containerState.$renderPromise$ = void 0;
  containerState.$hostsNext$.size + containerState.$taskNext$.size + containerState.$opsNext$.size > 0 && (containerState.$renderPromise$ = renderMarked(containerState));
};
const isTask = (task) => 0 !== (task.$flags$ & TaskFlagsIsTask);
const isResourceTask$1 = (task) => 0 !== (task.$flags$ & TaskFlagsIsResource);
const executeTasksBefore = async (containerState, rCtx) => {
  const containerEl = containerState.$containerEl$;
  const resourcesPromises = [];
  const taskPromises = [];
  containerState.$taskNext$.forEach((task) => {
    isTask(task) && (taskPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), () => task)), containerState.$taskNext$.delete(task)), isResourceTask$1(task) && (resourcesPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), () => task)), containerState.$taskNext$.delete(task));
  });
  do {
    if (containerState.$taskStaging$.forEach((task) => {
      isTask(task) ? taskPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), () => task)) : isResourceTask$1(task) ? resourcesPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), () => task)) : containerState.$taskNext$.add(task);
    }), containerState.$taskStaging$.clear(), taskPromises.length > 0) {
      const tasks = await Promise.all(taskPromises);
      sortTasks(tasks), await Promise.all(tasks.map((task) => runSubscriber(task, containerState, rCtx))), taskPromises.length = 0;
    }
  } while (containerState.$taskStaging$.size > 0);
  if (resourcesPromises.length > 0) {
    const resources = await Promise.all(resourcesPromises);
    sortTasks(resources);
    for (const task of resources) {
      runSubscriber(task, containerState, rCtx);
    }
  }
};
const executeSSRTasks = (containerState, rCtx) => {
  const containerEl = containerState.$containerEl$;
  const staging = containerState.$taskStaging$;
  if (!staging.size) {
    return;
  }
  const taskPromises = [];
  let tries = 20;
  const runTasks = () => {
    if (staging.forEach((task) => {
      isTask(task) && taskPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), () => task));
    }), staging.clear(), taskPromises.length > 0) {
      return Promise.all(taskPromises).then(async (tasks) => {
        if (sortTasks(tasks), await Promise.all(tasks.map((task) => runSubscriber(task, containerState, rCtx))), taskPromises.length = 0, --tries && staging.size > 0) {
          return runTasks();
        }
        tries || logWarn(`Infinite task loop detected. Tasks:
${Array.from(staging).map((task) => `  ${task.$qrl$.$symbol$}`).join("\n")}`);
      });
    }
  };
  return runTasks();
};
const executeTasksAfter = async (containerState, rCtx, taskPred) => {
  const taskPromises = [];
  const containerEl = containerState.$containerEl$;
  containerState.$taskNext$.forEach((task) => {
    taskPred(task, false) && (task.$el$.isConnected && taskPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), () => task)), containerState.$taskNext$.delete(task));
  });
  do {
    if (containerState.$taskStaging$.forEach((task) => {
      task.$el$.isConnected && (taskPred(task, true) ? taskPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), () => task)) : containerState.$taskNext$.add(task));
    }), containerState.$taskStaging$.clear(), taskPromises.length > 0) {
      const tasks = await Promise.all(taskPromises);
      sortTasks(tasks);
      for (const task of tasks) {
        runSubscriber(task, containerState, rCtx);
      }
      taskPromises.length = 0;
    }
  } while (containerState.$taskStaging$.size > 0);
};
const sortNodes = (elements) => {
  elements.sort((a2, b) => 2 & a2.$element$.compareDocumentPosition(getRootNode(b.$element$)) ? 1 : -1);
};
const sortTasks = (tasks) => {
  const isServer3 = isServerPlatform();
  tasks.sort((a2, b) => isServer3 || a2.$el$ === b.$el$ ? a2.$index$ < b.$index$ ? -1 : 1 : 2 & a2.$el$.compareDocumentPosition(getRootNode(b.$el$)) ? 1 : -1);
};
const useOn = (event, eventQrl2) => {
  _useOn(createEventName(event, void 0), eventQrl2);
};
const useOnDocument = (event, eventQrl2) => {
  _useOn(createEventName(event, "document"), eventQrl2);
};
const useOnWindow = (event, eventQrl2) => {
  _useOn(createEventName(event, "window"), eventQrl2);
};
const createEventName = (event, eventType) => {
  const formattedEventType = void 0 !== eventType ? eventType + ":" : "";
  return Array.isArray(event) ? event.map((e) => `${formattedEventType}on-${e}`) : `${formattedEventType}on-${event}`;
};
const _useOn = (eventName, eventQrl2) => {
  if (eventQrl2) {
    const invokeCtx = useInvokeContext();
    const elCtx = getContext(invokeCtx.$hostElement$, invokeCtx.$renderCtx$.$static$.$containerState$);
    "string" == typeof eventName ? elCtx.li.push([normalizeOnProp(eventName), eventQrl2]) : elCtx.li.push(...eventName.map((name) => [normalizeOnProp(name), eventQrl2])), elCtx.$flags$ |= HOST_FLAG_NEED_ATTACH_LISTENER;
  }
};
const createSignal = (initialState) => {
  const containerState = useContainerState();
  const value = isFunction(initialState) && !isQwikComponent(initialState) ? invoke(void 0, initialState) : initialState;
  return _createSignal(value, containerState, 0);
};
const useConstant = (value) => {
  const { val, set } = useSequentialScope();
  return null != val ? val : set(value = isFunction(value) && !isQwikComponent(value) ? value() : value);
};
const useSignal = (initialState) => useConstant(() => createSignal(initialState));
const TaskFlagsIsVisibleTask = 1;
const TaskFlagsIsTask = 2;
const TaskFlagsIsResource = 4;
const TaskFlagsIsDirty = 16;
const useTaskQrl = (qrl2, opts) => {
  const { val, set, iCtx, i, elCtx } = useSequentialScope();
  if (val) {
    return;
  }
  const containerState = iCtx.$renderCtx$.$static$.$containerState$;
  const task = new Task(TaskFlagsIsDirty | TaskFlagsIsTask, i, elCtx.$element$, qrl2, void 0);
  set(true), qrl2.$resolveLazy$(containerState.$containerEl$), elCtx.$tasks$ || (elCtx.$tasks$ = []), elCtx.$tasks$.push(task), waitAndRun(iCtx, () => runTask(task, containerState, iCtx.$renderCtx$)), isServerPlatform() && useRunTask(task, opts?.eagerness);
};
const useVisibleTaskQrl = (qrl2, opts) => {
  const { val, set, i, iCtx, elCtx } = useSequentialScope();
  const eagerness = opts?.strategy ?? "intersection-observer";
  if (val) {
    return void (isServerPlatform() && useRunTask(val, eagerness));
  }
  const task = new Task(TaskFlagsIsVisibleTask, i, elCtx.$element$, qrl2, void 0);
  const containerState = iCtx.$renderCtx$.$static$.$containerState$;
  elCtx.$tasks$ || (elCtx.$tasks$ = []), elCtx.$tasks$.push(task), set(task), useRunTask(task, eagerness), isServerPlatform() || (qrl2.$resolveLazy$(containerState.$containerEl$), notifyTask(task, containerState));
};
const isResourceTask = (task) => 0 !== (task.$flags$ & TaskFlagsIsResource);
const isComputedTask = (task) => !!(8 & task.$flags$);
const runSubscriber = async (task, containerState, rCtx) => (assertEqual(!!(task.$flags$ & TaskFlagsIsDirty)), isResourceTask(task) ? runResource(task, containerState, rCtx) : isComputedTask(task) ? runComputed(task, containerState, rCtx) : runTask(task, containerState, rCtx));
const runResource = (task, containerState, rCtx, waitOn) => {
  task.$flags$ &= ~TaskFlagsIsDirty, cleanupTask(task);
  const iCtx = newInvokeContext(rCtx.$static$.$locale$, task.$el$, void 0, "qTask");
  const { $subsManager$: subsManager } = containerState;
  iCtx.$renderCtx$ = rCtx;
  const taskFn = task.$qrl$.getFn(iCtx, () => {
    subsManager.$clearSub$(task);
  });
  const cleanups = [];
  const resource = task.$state$;
  const resourceTarget = unwrapProxy(resource);
  const opts = {
    track: (obj, prop) => {
      if (isFunction(obj)) {
        const ctx = newInvokeContext();
        return ctx.$renderCtx$ = rCtx, ctx.$subscriber$ = [0, task], invoke(ctx, obj);
      }
      const manager = getSubscriptionManager(obj);
      return manager ? manager.$addSub$([0, task], prop) : logErrorAndStop(codeToText(26), obj), prop ? obj[prop] : isSignal(obj) ? obj.value : obj;
    },
    cleanup(callback) {
      cleanups.push(callback);
    },
    cache(policy) {
      let milliseconds = 0;
      milliseconds = "immutable" === policy ? 1 / 0 : policy, resource._cache = milliseconds;
    },
    previous: resourceTarget._resolved
  };
  let resolve;
  let reject;
  let done = false;
  const setState = (resolved, value) => !done && (done = true, resolved ? (done = true, resource.loading = false, resource._state = "resolved", resource._resolved = value, resource._error = void 0, resolve(value)) : (done = true, resource.loading = false, resource._state = "rejected", resource._error = value, reject(value)), true);
  invoke(iCtx, () => {
    resource._state = "pending", resource.loading = !isServerPlatform(), resource.value = new Promise((r, re) => {
      resolve = r, reject = re;
    });
  }), task.$destroy$ = noSerialize(() => {
    done = true, cleanups.forEach((fn) => fn());
  });
  const promise = safeCall(() => maybeThen(waitOn, () => taskFn(opts)), (value) => {
    setState(true, value);
  }, (reason) => {
    setState(false, reason);
  });
  const timeout = resourceTarget._timeout;
  return timeout > 0 ? Promise.race([promise, delay(timeout).then(() => {
    setState(false, new Error("timeout")) && cleanupTask(task);
  })]) : promise;
};
const runTask = (task, containerState, rCtx) => {
  task.$flags$ &= ~TaskFlagsIsDirty, cleanupTask(task);
  const hostElement = task.$el$;
  const iCtx = newInvokeContext(rCtx.$static$.$locale$, hostElement, void 0, "qTask");
  iCtx.$renderCtx$ = rCtx;
  const { $subsManager$: subsManager } = containerState;
  const taskFn = task.$qrl$.getFn(iCtx, () => {
    subsManager.$clearSub$(task);
  });
  const cleanups = [];
  task.$destroy$ = noSerialize(() => {
    cleanups.forEach((fn) => fn());
  });
  const opts = {
    track: (obj, prop) => {
      if (isFunction(obj)) {
        const ctx = newInvokeContext();
        return ctx.$subscriber$ = [0, task], invoke(ctx, obj);
      }
      const manager = getSubscriptionManager(obj);
      return manager ? manager.$addSub$([0, task], prop) : logErrorAndStop(codeToText(26), obj), prop ? obj[prop] : isSignal(obj) ? obj.value : obj;
    },
    cleanup(callback) {
      cleanups.push(callback);
    }
  };
  return safeCall(() => taskFn(opts), (returnValue) => {
    isFunction(returnValue) && cleanups.push(returnValue);
  }, (reason) => {
    handleError(reason, hostElement, rCtx);
  });
};
const runComputed = (task, containerState, rCtx) => {
  assertSignal(task.$state$), task.$flags$ &= ~TaskFlagsIsDirty, cleanupTask(task);
  const hostElement = task.$el$;
  const iCtx = newInvokeContext(rCtx.$static$.$locale$, hostElement, void 0, "qComputed");
  iCtx.$subscriber$ = [0, task], iCtx.$renderCtx$ = rCtx;
  const { $subsManager$: subsManager } = containerState;
  const taskFn = task.$qrl$.getFn(iCtx, () => {
    subsManager.$clearSub$(task);
  });
  const ok = (returnValue) => {
    untrack(() => {
      const signal = task.$state$;
      signal[QObjectSignalFlags] &= ~SIGNAL_UNASSIGNED, signal.untrackedValue !== returnValue && (signal.untrackedValue = returnValue, signal[QObjectManagerSymbol].$notifySubs$());
    });
  };
  const fail = (reason) => {
    handleError(reason, hostElement, rCtx);
  };
  try {
    return maybeThen(task.$qrl$.$resolveLazy$(containerState.$containerEl$), () => {
      const result = taskFn();
      if (isPromise$1(result)) {
        const warningMessage = "useComputed$: Async functions in computed tasks are deprecated and will stop working in v2. Use useTask$ or useResource$ instead.";
        const stack = new Error(warningMessage).stack;
        if (stack) {
          stack.replace(/^Error:\s*/, "");
          logOnceWarn();
        } else {
          logOnceWarn();
        }
        return result.then(ok, fail);
      }
      ok(result);
    });
  } catch (reason) {
    fail(reason);
  }
};
const cleanupTask = (task) => {
  const destroy = task.$destroy$;
  if (destroy) {
    task.$destroy$ = void 0;
    try {
      destroy();
    } catch (err) {
      logError(err);
    }
  }
};
const destroyTask = (task) => {
  if (32 & task.$flags$) {
    task.$flags$ &= -33;
    (0, task.$qrl$)();
  } else {
    cleanupTask(task);
  }
};
const useRunTask = (task, eagerness) => {
  "visible" === eagerness || "intersection-observer" === eagerness ? useOn("qvisible", getTaskHandlerQrl(task)) : "load" === eagerness || "document-ready" === eagerness ? useOnDocument("qinit", getTaskHandlerQrl(task)) : "idle" !== eagerness && "document-idle" !== eagerness || useOnDocument("qidle", getTaskHandlerQrl(task));
};
const getTaskHandlerQrl = (task) => {
  const taskQrl = task.$qrl$;
  const taskHandler = createQRL(taskQrl.$chunk$, "_hW", _hW, null, null, [task], taskQrl.$symbol$);
  return taskQrl.dev && (taskHandler.dev = taskQrl.dev), taskHandler;
};
const isSubscriberDescriptor = (obj) => isObject(obj) && obj instanceof Task;
const serializeTask = (task, getObjId) => {
  let value = `${intToStr(task.$flags$)} ${intToStr(task.$index$)} ${getObjId(task.$qrl$)} ${getObjId(task.$el$)}`;
  return task.$state$ && (value += ` ${getObjId(task.$state$)}`), value;
};
const parseTask = (data) => {
  const [flags, index, qrl2, el, resource] = data.split(" ");
  return new Task(strToInt(flags), strToInt(index), el, qrl2, resource);
};
class Task {
  $flags$;
  $index$;
  $el$;
  $qrl$;
  $state$;
  constructor($flags$, $index$, $el$, $qrl$, $state$) {
    this.$flags$ = $flags$, this.$index$ = $index$, this.$el$ = $el$, this.$qrl$ = $qrl$, this.$state$ = $state$;
  }
}
function isElement(value) {
  return isNode(value) && 1 === value.nodeType;
}
function isNode(value) {
  return value && "number" == typeof value.nodeType;
}
const HOST_FLAG_DIRTY = 1;
const HOST_FLAG_NEED_ATTACH_LISTENER = 2;
const HOST_FLAG_MOUNTED = 4;
const HOST_FLAG_DYNAMIC = 8;
const tryGetContext = (element) => element[Q_CTX];
const getContext = (el, containerState) => {
  const ctx = tryGetContext(el);
  if (ctx) {
    return ctx;
  }
  const elCtx = createContext(el);
  const elementID = directGetAttribute(el, "q:id");
  if (elementID) {
    const pauseCtx = containerState.$pauseCtx$;
    if (elCtx.$id$ = elementID, pauseCtx) {
      const { getObject, meta, refs } = pauseCtx;
      if (isElement(el)) {
        const refMap = refs[elementID];
        refMap && (elCtx.$refMap$ = refMap.split(" ").map(getObject), elCtx.li = getDomListeners(elCtx, containerState.$containerEl$));
      } else {
        const styleIds = el.getAttribute("q:sstyle");
        elCtx.$scopeIds$ = styleIds ? styleIds.split("|") : null;
        const ctxMeta = meta[elementID];
        if (ctxMeta) {
          const seq = ctxMeta.s;
          const host = ctxMeta.h;
          const contexts = ctxMeta.c;
          const tasks = ctxMeta.w;
          if (seq && (elCtx.$seq$ = seq.split(" ").map(getObject)), tasks && (elCtx.$tasks$ = tasks.split(" ").map(getObject)), contexts) {
            elCtx.$contexts$ = /* @__PURE__ */ new Map();
            for (const part of contexts.split(" ")) {
              const [key, value] = part.split("=");
              elCtx.$contexts$.set(key, getObject(value));
            }
          }
          if (host) {
            const [renderQrl, props] = host.split(" ");
            if (elCtx.$flags$ = HOST_FLAG_MOUNTED, renderQrl && (elCtx.$componentQrl$ = getObject(renderQrl)), props) {
              const propsObj = getObject(props);
              elCtx.$props$ = propsObj, setObjectFlags(propsObj, 2), propsObj[_IMMUTABLE] = getImmutableFromProps(propsObj);
            } else {
              elCtx.$props$ = createProxy(createPropsState(), containerState);
            }
          }
        }
      }
    }
  }
  return elCtx;
};
const getImmutableFromProps = (props) => {
  const immutable = {};
  const target = getProxyTarget(props);
  for (const key in target) {
    key.startsWith("$$") && (immutable[key.slice(2)] = target[key]);
  }
  return immutable;
};
const createContext = (element) => {
  const ctx = {
    $flags$: 0,
    $id$: "",
    $element$: element,
    $refMap$: [],
    li: [],
    $tasks$: null,
    $seq$: null,
    $slots$: null,
    $scopeIds$: null,
    $appendStyles$: null,
    $props$: null,
    $vdom$: null,
    $componentQrl$: null,
    $contexts$: null,
    $dynamicSlots$: null,
    $parentCtx$: void 0,
    $realParentCtx$: void 0
  };
  return element[Q_CTX] = ctx, ctx;
};
const cleanupContext = (elCtx, subsManager) => {
  elCtx.$tasks$?.forEach((task) => {
    subsManager.$clearSub$(task), destroyTask(task);
  }), elCtx.$componentQrl$ = null, elCtx.$seq$ = null, elCtx.$tasks$ = null;
};
let _locale;
function getLocale(defaultLocale) {
  if (void 0 === _locale) {
    const ctx = tryGetInvokeContext();
    if (ctx && ctx.$locale$) {
      return ctx.$locale$;
    }
    {
      return defaultLocale;
    }
  }
  return _locale;
}
function withLocale(locale, fn) {
  const previousLang = _locale;
  try {
    return _locale = locale, fn();
  } finally {
    _locale = previousLang;
  }
}
function setLocale(locale) {
  _locale = locale;
}
let _context;
const tryGetInvokeContext = () => {
  if (!_context) {
    const context = "undefined" != typeof document && document && document.__q_context__;
    if (!context) {
      return;
    }
    return isArray(context) ? document.__q_context__ = newInvokeContextFromTuple(context) : context;
  }
  return _context;
};
const getInvokeContext = () => {
  const ctx = tryGetInvokeContext();
  if (!ctx) {
    throw qError(14);
  }
  return ctx;
};
const useInvokeContext = () => {
  const ctx = tryGetInvokeContext();
  if (!ctx || "qRender" !== ctx.$event$) {
    throw qError(20);
  }
  return assertDefined(ctx.$hostElement$), assertDefined(ctx.$waitOn$), assertDefined(ctx.$renderCtx$), assertDefined(ctx.$subscriber$), ctx;
};
const useContainerState = () => useInvokeContext().$renderCtx$.$static$.$containerState$;
function invoke(context, fn, ...args) {
  return invokeApply.call(this, context, fn, args);
}
function invokeApply(context, fn, args) {
  const previousContext = _context;
  let returnValue;
  try {
    _context = context, returnValue = fn.apply(this, args);
  } finally {
    _context = previousContext;
  }
  return returnValue;
}
const waitAndRun = (ctx, callback) => {
  const waitOn = ctx.$waitOn$;
  if (0 === waitOn.length) {
    const result = callback();
    isPromise$1(result) && waitOn.push(result);
  } else {
    waitOn.push(Promise.all(waitOn).then(callback));
  }
};
const newInvokeContextFromTuple = ([element, event, url]) => {
  const container = element.closest("[q\\:container]");
  const locale = container?.getAttribute("q:locale") || void 0;
  return locale && setLocale(locale), newInvokeContext(locale, void 0, element, event, url);
};
const newInvokeContext = (locale, hostElement, element, event, url) => {
  const ctx = {
    $url$: url,
    $i$: 0,
    $hostElement$: hostElement,
    $element$: element,
    $event$: event,
    $qrl$: void 0,
    $waitOn$: void 0,
    $subscriber$: void 0,
    $renderCtx$: void 0,
    $locale$: locale || ("object" == typeof event && event && "locale" in event ? event.locale : void 0)
  };
  return ctx;
};
const getWrappingContainer = (el) => el.closest("[q\\:container]");
const untrack = (expr, ...args) => "function" == typeof expr ? invoke(void 0, expr, ...args) : isSignal(expr) ? expr.untrackedValue : unwrapProxy(expr);
const trackInvocation = /* @__PURE__ */ newInvokeContext(void 0, void 0, void 0, "qRender");
const trackSignal = (signal, sub) => (trackInvocation.$subscriber$ = sub, invoke(trackInvocation, () => signal.value));
const _jsxBranch = (input) => {
  const iCtx = tryGetInvokeContext();
  if (iCtx && iCtx.$hostElement$ && iCtx.$renderCtx$) {
    getContext(iCtx.$hostElement$, iCtx.$renderCtx$.$static$.$containerState$).$flags$ |= HOST_FLAG_DYNAMIC;
  }
  return input;
};
const _createSignal = (value, containerState, flags, subscriptions) => {
  const manager = containerState.$subsManager$.$createManager$(subscriptions);
  return new SignalImpl(value, manager, flags);
};
const QObjectSignalFlags = /* @__PURE__ */ Symbol("proxy manager");
const SIGNAL_IMMUTABLE = 1;
const SIGNAL_UNASSIGNED = 2;
const SignalUnassignedException = /* @__PURE__ */ Symbol("unassigned signal");
class SignalBase {
}
class SignalImpl extends SignalBase {
  untrackedValue;
  [QObjectManagerSymbol];
  [QObjectSignalFlags] = 0;
  constructor(v, manager, flags) {
    super(), this.untrackedValue = v, this[QObjectManagerSymbol] = manager, this[QObjectSignalFlags] = flags;
  }
  valueOf() {
  }
  toString() {
    return `[Signal ${String(this.value)}]`;
  }
  toJSON() {
    return {
      value: this.value
    };
  }
  get value() {
    if (this[QObjectSignalFlags] & SIGNAL_UNASSIGNED) {
      throw SignalUnassignedException;
    }
    const sub = tryGetInvokeContext()?.$subscriber$;
    return sub && this[QObjectManagerSymbol].$addSub$(sub), this.untrackedValue;
  }
  set value(v) {
    const manager = this[QObjectManagerSymbol];
    manager && this.untrackedValue !== v && (this.untrackedValue = v, manager.$notifySubs$());
  }
}
class SignalDerived extends SignalBase {
  $func$;
  $args$;
  $funcStr$;
  constructor($func$, $args$, $funcStr$) {
    super(), this.$func$ = $func$, this.$args$ = $args$, this.$funcStr$ = $funcStr$;
  }
  get value() {
    return this.$func$.apply(void 0, this.$args$);
  }
}
class SignalWrapper extends SignalBase {
  ref;
  prop;
  constructor(ref, prop) {
    super(), this.ref = ref, this.prop = prop;
  }
  get [QObjectManagerSymbol]() {
    return getSubscriptionManager(this.ref);
  }
  get value() {
    return this.ref[this.prop];
  }
  set value(value) {
    this.ref[this.prop] = value;
  }
}
const isSignal = (obj) => obj instanceof SignalBase;
const _wrapProp = (obj, prop) => {
  if (!isObject(obj)) {
    return obj[prop];
  }
  if (obj instanceof SignalBase) {
    return obj;
  }
  const target = getProxyTarget(obj);
  if (target) {
    const signal = target["$$" + prop];
    if (signal) {
      return signal;
    }
    if (true !== target[_IMMUTABLE]?.[prop]) {
      return new SignalWrapper(obj, prop);
    }
  }
  const immutable = obj[_IMMUTABLE]?.[prop];
  return isSignal(immutable) ? immutable : _IMMUTABLE;
};
const _wrapSignal = (obj, prop) => {
  const r = _wrapProp(obj, prop);
  return r === _IMMUTABLE ? obj[prop] : r;
};
const CONTAINER_STATE = /* @__PURE__ */ Symbol("ContainerState");
const _getContainerState = (containerEl) => {
  let state = containerEl[CONTAINER_STATE];
  return state || (containerEl[CONTAINER_STATE] = state = createContainerState(containerEl, directGetAttribute(containerEl, "q:base") ?? "/")), state;
};
const createContainerState = (containerEl, base) => {
  const containerAttributes = {};
  if (containerEl) {
    const attrs = containerEl.attributes;
    if (attrs) {
      for (let index = 0; index < attrs.length; index++) {
        const attr = attrs[index];
        containerAttributes[attr.name] = attr.value;
      }
    }
  }
  const containerState = {
    $containerEl$: containerEl,
    $elementIndex$: 0,
    $styleMoved$: false,
    $proxyMap$: /* @__PURE__ */ new WeakMap(),
    $opsNext$: /* @__PURE__ */ new Set(),
    $taskNext$: /* @__PURE__ */ new Set(),
    $taskStaging$: /* @__PURE__ */ new Set(),
    $hostsNext$: /* @__PURE__ */ new Set(),
    $hostsStaging$: /* @__PURE__ */ new Set(),
    $styleIds$: /* @__PURE__ */ new Set(),
    $events$: /* @__PURE__ */ new Set(),
    $serverData$: {
      containerAttributes
    },
    $base$: base,
    $renderPromise$: void 0,
    $hostsRendering$: void 0,
    $pauseCtx$: void 0,
    $subsManager$: null,
    $inlineFns$: /* @__PURE__ */ new Map()
  };
  return containerState.$subsManager$ = createSubscriptionManager(containerState), containerState;
};
const setRef = (value, elm) => {
  if (isFunction(value)) {
    return value(elm);
  }
  if (isSignal(value)) {
    return isServerPlatform() ? value.untrackedValue = elm : value.value = elm;
  }
  throw qError(32, value);
};
const SHOW_COMMENT$1 = 128;
const isContainer$1 = (el) => isElement$1(el) && el.hasAttribute("q:container");
const intToStr = (nu) => nu.toString(36);
const strToInt = (nu) => parseInt(nu, 36);
const getEventName = (attribute) => {
  const colonPos = attribute.indexOf(":");
  return attribute ? fromKebabToCamelCase(attribute.slice(colonPos + 1)) : attribute;
};
const SVG_NS = "http://www.w3.org/2000/svg";
const IS_SVG = 1;
const IS_HEAD = 2;
const CHILDREN_PLACEHOLDER = [];
const smartUpdateChildren = (ctx, oldVnode, newVnode, flags) => {
  assertQwikElement(oldVnode.$elm$);
  const ch = newVnode.$children$;
  if (1 === ch.length && ":skipRender" === ch[0].$type$) {
    return void (newVnode.$children$ = oldVnode.$children$);
  }
  const elm = oldVnode.$elm$;
  let filter = isChildComponent;
  if (oldVnode.$children$ === CHILDREN_PLACEHOLDER) {
    "HEAD" === elm.nodeName && (filter = isHeadChildren, flags |= IS_HEAD);
  }
  const oldCh = getVnodeChildren(oldVnode, filter);
  return oldCh.length > 0 && ch.length > 0 ? diffChildren(ctx, elm, oldCh, ch, flags) : oldCh.length > 0 && 0 === ch.length ? removeChildren(ctx.$static$, oldCh, 0, oldCh.length - 1) : ch.length > 0 ? addChildren(ctx, elm, null, ch, 0, ch.length - 1, flags) : void 0;
};
const getVnodeChildren = (oldVnode, filter) => {
  const oldCh = oldVnode.$children$;
  return oldCh === CHILDREN_PLACEHOLDER ? oldVnode.$children$ = getChildrenVnodes(oldVnode.$elm$, filter) : oldCh;
};
const diffChildren = (ctx, parentElm, oldCh, newCh, flags) => {
  let oldStartIdx = 0;
  let newStartIdx = 0;
  let oldEndIdx = oldCh.length - 1;
  let oldStartVnode = oldCh[0];
  let oldEndVnode = oldCh[oldEndIdx];
  let newEndIdx = newCh.length - 1;
  let newStartVnode = newCh[0];
  let newEndVnode = newCh[newEndIdx];
  let oldKeyToIdx;
  let idxInOld;
  let elmToMove;
  const results = [];
  const staticCtx = ctx.$static$;
  for (; oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx; ) {
    if (null == oldStartVnode) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (null == oldEndVnode) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (null == newStartVnode) {
      newStartVnode = newCh[++newStartIdx];
    } else if (null == newEndVnode) {
      newEndVnode = newCh[--newEndIdx];
    } else if (oldStartVnode.$id$ === newStartVnode.$id$) {
      results.push(diffVnode(ctx, oldStartVnode, newStartVnode, flags)), oldStartVnode = oldCh[++oldStartIdx], newStartVnode = newCh[++newStartIdx];
    } else if (oldEndVnode.$id$ === newEndVnode.$id$) {
      results.push(diffVnode(ctx, oldEndVnode, newEndVnode, flags)), oldEndVnode = oldCh[--oldEndIdx], newEndVnode = newCh[--newEndIdx];
    } else if (oldStartVnode.$key$ && oldStartVnode.$id$ === newEndVnode.$id$) {
      assertDefined(oldStartVnode.$elm$), assertDefined(oldEndVnode.$elm$), results.push(diffVnode(ctx, oldStartVnode, newEndVnode, flags)), insertAfter(staticCtx, parentElm, oldStartVnode.$elm$, oldEndVnode.$elm$), oldStartVnode = oldCh[++oldStartIdx], newEndVnode = newCh[--newEndIdx];
    } else if (oldEndVnode.$key$ && oldEndVnode.$id$ === newStartVnode.$id$) {
      assertDefined(oldStartVnode.$elm$), assertDefined(oldEndVnode.$elm$), results.push(diffVnode(ctx, oldEndVnode, newStartVnode, flags)), insertBefore(staticCtx, parentElm, oldEndVnode.$elm$, oldStartVnode.$elm$), oldEndVnode = oldCh[--oldEndIdx], newStartVnode = newCh[++newStartIdx];
    } else {
      if (void 0 === oldKeyToIdx && (oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)), idxInOld = oldKeyToIdx[newStartVnode.$key$], void 0 === idxInOld) {
        const newElm = createElm(ctx, newStartVnode, flags, results);
        insertBefore(staticCtx, parentElm, newElm, oldStartVnode?.$elm$);
      } else if (elmToMove = oldCh[idxInOld], elmToMove.$type$ !== newStartVnode.$type$) {
        const newElm = createElm(ctx, newStartVnode, flags, results);
        maybeThen(newElm, (newElm2) => {
          insertBefore(staticCtx, parentElm, newElm2, oldStartVnode?.$elm$);
        });
      } else {
        results.push(diffVnode(ctx, elmToMove, newStartVnode, flags)), oldCh[idxInOld] = void 0, assertDefined(elmToMove.$elm$), insertBefore(staticCtx, parentElm, elmToMove.$elm$, oldStartVnode.$elm$);
      }
      newStartVnode = newCh[++newStartIdx];
    }
  }
  if (newStartIdx <= newEndIdx) {
    results.push(addChildren(ctx, parentElm, null == newCh[newEndIdx + 1] ? null : newCh[newEndIdx + 1].$elm$, newCh, newStartIdx, newEndIdx, flags));
  }
  let wait = promiseAll(results);
  return oldStartIdx <= oldEndIdx && (wait = maybeThen(wait, () => {
    removeChildren(staticCtx, oldCh, oldStartIdx, oldEndIdx);
  })), wait;
};
const getChildren = (elm, filter) => {
  const end = isVirtualElement(elm) ? elm.close : null;
  const nodes = [];
  let node = elm.firstChild;
  for (; (node = processVirtualNodes(node)) && (filter(node) && nodes.push(node), node = node.nextSibling, node !== end); ) {
  }
  return nodes;
};
const getChildrenVnodes = (elm, filter) => getChildren(elm, filter).map(getVnodeFromEl);
const getVnodeFromEl = (el) => isElement$1(el) ? tryGetContext(el)?.$vdom$ ?? domToVnode(el) : domToVnode(el);
const domToVnode = (node) => {
  if (isQwikElement(node)) {
    const t = new ProcessedJSXNodeImpl(node.localName, {}, null, CHILDREN_PLACEHOLDER, 0, getKey(node));
    return t.$elm$ = node, t;
  }
  if (isText(node)) {
    const t = new ProcessedJSXNodeImpl(node.nodeName, EMPTY_OBJ, null, CHILDREN_PLACEHOLDER, 0, null);
    return t.$text$ = node.data, t.$elm$ = node, t;
  }
};
const isHeadChildren = (node) => {
  const type = node.nodeType;
  return 1 === type ? node.hasAttribute("q:head") : 111 === type;
};
const isSlotTemplate = (node) => "Q:TEMPLATE" === node.nodeName;
const isChildComponent = (node) => {
  const type = node.nodeType;
  if (3 === type || 111 === type) {
    return true;
  }
  if (1 !== type) {
    return false;
  }
  const nodeName = node.nodeName;
  return "Q:TEMPLATE" !== nodeName && ("HEAD" === nodeName ? node.hasAttribute("q:head") : "STYLE" !== nodeName || !node.hasAttribute(QStyle));
};
const splitChildren = (input) => {
  const output = {};
  for (const item of input) {
    const key = getSlotName(item);
    (output[key] ?? (output[key] = new ProcessedJSXNodeImpl(VIRTUAL, {
      [QSlotS]: ""
    }, null, [], 0, key))).$children$.push(item);
  }
  return output;
};
const diffVnode = (rCtx, oldVnode, newVnode, flags) => {
  assertEqual(oldVnode.$type$, newVnode.$type$), assertEqual(oldVnode.$key$, newVnode.$key$), assertEqual(oldVnode.$id$, newVnode.$id$);
  const elm = oldVnode.$elm$;
  const tag = newVnode.$type$;
  const staticCtx = rCtx.$static$;
  const containerState = staticCtx.$containerState$;
  const currentComponent = rCtx.$cmpCtx$;
  if (newVnode.$elm$ = elm, "#text" === tag) {
    staticCtx.$visited$.push(elm);
    const signal = newVnode.$signal$;
    return signal && (newVnode.$text$ = jsxToString(trackSignal(signal, [4, currentComponent.$element$, signal, elm]))), void setProperty(staticCtx, elm, "data", newVnode.$text$);
  }
  if ("#signal" === tag) {
    return;
  }
  const props = newVnode.$props$;
  const vnodeFlags = newVnode.$flags$;
  const elCtx = getContext(elm, containerState);
  if (tag !== VIRTUAL) {
    let isSvg = 0 !== (flags & IS_SVG);
    if (isSvg || "svg" !== tag || (flags |= IS_SVG, isSvg = true), props !== EMPTY_OBJ) {
      1 & vnodeFlags || (elCtx.li.length = 0);
      const values = oldVnode.$props$;
      newVnode.$props$ = values;
      for (const prop in props) {
        let newValue = props[prop];
        if ("ref" !== prop) {
          if (isOnProp(prop)) {
            const normalized = setEvent(elCtx.li, prop, newValue, containerState.$containerEl$);
            addQwikEvent(staticCtx, elm, normalized);
            continue;
          }
          isSignal(newValue) && (newValue = trackSignal(newValue, [1, currentComponent.$element$, newValue, elm, prop])), "class" === prop ? newValue = serializeClassWithHost(newValue, currentComponent) : "style" === prop && (newValue = stringifyStyle(newValue)), values[prop] !== newValue && (values[prop] = newValue, smartSetProperty(staticCtx, elm, prop, newValue, isSvg));
        } else {
          void 0 !== newValue && setRef(newValue, elm);
        }
      }
    }
    if (2 & vnodeFlags) {
      return;
    }
    isSvg && "foreignObject" === tag && (flags &= ~IS_SVG);
    if (void 0 !== props[dangerouslySetInnerHTML]) {
      return void 0;
    }
    if ("textarea" === tag) {
      return;
    }
    return smartUpdateChildren(rCtx, oldVnode, newVnode, flags);
  }
  if ("q:renderFn" in props) {
    const cmpProps = props.props;
    setComponentProps(containerState, elCtx, cmpProps);
    let needsRender = !!(elCtx.$flags$ & HOST_FLAG_DIRTY);
    return needsRender || elCtx.$componentQrl$ || elCtx.$element$.hasAttribute("q:id") || (setQId(rCtx, elCtx), elCtx.$componentQrl$ = cmpProps["q:renderFn"], assertQrl(elCtx.$componentQrl$), needsRender = true), needsRender ? maybeThen(renderComponent(rCtx, elCtx, flags), () => renderContentProjection(rCtx, elCtx, newVnode, flags)) : renderContentProjection(rCtx, elCtx, newVnode, flags);
  }
  if ("q:s" in props) {
    return assertDefined(currentComponent.$slots$), void currentComponent.$slots$.push(newVnode);
  }
  if (dangerouslySetInnerHTML in props) {
    setProperty(staticCtx, elm, "innerHTML", props[dangerouslySetInnerHTML]);
  } else if (!(2 & vnodeFlags)) {
    return smartUpdateChildren(rCtx, oldVnode, newVnode, flags);
  }
};
const renderContentProjection = (rCtx, hostCtx, vnode, flags) => {
  if (2 & vnode.$flags$) {
    return;
  }
  const staticCtx = rCtx.$static$;
  const splittedNewChildren = splitChildren(vnode.$children$);
  const slotMaps = getSlotMap(hostCtx);
  for (const key in slotMaps.slots) {
    if (!splittedNewChildren[key]) {
      const slotEl = slotMaps.slots[key];
      const oldCh = getChildrenVnodes(slotEl, isChildComponent);
      if (oldCh.length > 0) {
        const slotCtx = tryGetContext(slotEl);
        slotCtx && slotCtx.$vdom$ && (slotCtx.$vdom$.$children$ = []), removeChildren(staticCtx, oldCh, 0, oldCh.length - 1);
      }
    }
  }
  for (const key in slotMaps.templates) {
    const templateEl = slotMaps.templates[key];
    templateEl && !splittedNewChildren[key] && (slotMaps.templates[key] = void 0, removeNode(staticCtx, templateEl));
  }
  return promiseAll(Object.keys(splittedNewChildren).map((slotName) => {
    const newVdom = splittedNewChildren[slotName];
    const slotCtx = getSlotCtx(staticCtx, slotMaps, hostCtx, slotName, rCtx.$static$.$containerState$);
    const oldVdom = getVdom(slotCtx);
    const slotRctx = pushRenderContext(rCtx);
    const slotEl = slotCtx.$element$;
    slotRctx.$slotCtx$ = slotCtx, slotCtx.$vdom$ = newVdom, newVdom.$elm$ = slotEl;
    let newFlags = flags & ~IS_SVG;
    slotEl.isSvg && (newFlags |= IS_SVG);
    const index = staticCtx.$addSlots$.findIndex((slot) => slot[0] === slotEl);
    return index >= 0 && staticCtx.$addSlots$.splice(index, 1), smartUpdateChildren(slotRctx, oldVdom, newVdom, newFlags);
  }));
};
const addChildren = (ctx, parentElm, before, vnodes, startIdx, endIdx, flags) => {
  const promises = [];
  for (; startIdx <= endIdx; ++startIdx) {
    const ch = vnodes[startIdx];
    const elm = createElm(ctx, ch, flags, promises);
    insertBefore(ctx.$static$, parentElm, elm, before);
  }
  return promiseAllLazy(promises);
};
const removeChildren = (staticCtx, nodes, startIdx, endIdx) => {
  for (; startIdx <= endIdx; ++startIdx) {
    const ch = nodes[startIdx];
    ch && (assertDefined(ch.$elm$), removeNode(staticCtx, ch.$elm$));
  }
};
const getSlotCtx = (staticCtx, slotMaps, hostCtx, slotName, containerState) => {
  const slotEl = slotMaps.slots[slotName];
  if (slotEl) {
    return getContext(slotEl, containerState);
  }
  const templateEl = slotMaps.templates[slotName];
  if (templateEl) {
    return getContext(templateEl, containerState);
  }
  const template = createTemplate(staticCtx.$doc$, slotName);
  const elCtx = createContext(template);
  return elCtx.$parentCtx$ = hostCtx, prepend(staticCtx, hostCtx.$element$, template), slotMaps.templates[slotName] = template, elCtx;
};
const getSlotName = (node) => node.$props$[QSlot] ?? "";
const createElm = (rCtx, vnode, flags, promises) => {
  const tag = vnode.$type$;
  const doc = rCtx.$static$.$doc$;
  const currentComponent = rCtx.$cmpCtx$;
  if ("#text" === tag) {
    return vnode.$elm$ = doc.createTextNode(vnode.$text$);
  }
  if ("#signal" === tag) {
    const signal = vnode.$signal$;
    const signalValue = signal.value;
    if (isJSXNode(signalValue)) {
      const processedSignal = processData(signalValue);
      if (isSignal(processedSignal)) {
        throw new Error("NOT IMPLEMENTED: Promise");
      }
      if (Array.isArray(processedSignal)) {
        throw new Error("NOT IMPLEMENTED: Array");
      }
      {
        const elm2 = createElm(rCtx, processedSignal, flags, promises);
        return trackSignal(signal, 4 & flags ? [3, elm2, signal, elm2] : [4, currentComponent.$element$, signal, elm2]), vnode.$elm$ = elm2;
      }
    }
    {
      const elm2 = doc.createTextNode(vnode.$text$);
      return elm2.data = vnode.$text$ = jsxToString(signalValue), trackSignal(signal, 4 & flags ? [3, elm2, signal, elm2] : [4, currentComponent.$element$, signal, elm2]), vnode.$elm$ = elm2;
    }
  }
  let elm;
  let isSvg = !!(flags & IS_SVG);
  isSvg || "svg" !== tag || (flags |= IS_SVG, isSvg = true);
  const isVirtual = tag === VIRTUAL;
  const props = vnode.$props$;
  const staticCtx = rCtx.$static$;
  const containerState = staticCtx.$containerState$;
  isVirtual ? elm = newVirtualElement(doc, isSvg) : "head" === tag ? (elm = doc.head, flags |= IS_HEAD) : (elm = createElement(doc, tag, isSvg), flags &= ~IS_HEAD), 2 & vnode.$flags$ && (flags |= 4), vnode.$elm$ = elm;
  const elCtx = createContext(elm);
  if (rCtx.$slotCtx$ ? (elCtx.$parentCtx$ = rCtx.$slotCtx$, elCtx.$realParentCtx$ = rCtx.$cmpCtx$) : elCtx.$parentCtx$ = rCtx.$cmpCtx$, isVirtual) {
    if ("q:renderFn" in props) {
      const renderQRL = props["q:renderFn"];
      const target = createPropsState();
      const manager = containerState.$subsManager$.$createManager$();
      const proxy = new Proxy(target, new ReadWriteProxyHandler(containerState, manager));
      const expectProps = props.props;
      if (containerState.$proxyMap$.set(target, proxy), elCtx.$props$ = proxy, expectProps !== EMPTY_OBJ) {
        const immutableMeta = target[_IMMUTABLE] = expectProps[_IMMUTABLE] ?? EMPTY_OBJ;
        for (const prop in expectProps) {
          if ("children" !== prop && prop !== QSlot) {
            const immutableValue2 = immutableMeta[prop];
            isSignal(immutableValue2) ? target["$$" + prop] = immutableValue2 : target[prop] = expectProps[prop];
          }
        }
      }
      setQId(rCtx, elCtx), elCtx.$componentQrl$ = renderQRL;
      const wait = maybeThen(renderComponent(rCtx, elCtx, flags), () => {
        let children2 = vnode.$children$;
        if (0 === children2.length) {
          return;
        }
        1 === children2.length && ":skipRender" === children2[0].$type$ && (children2 = children2[0].$children$);
        const slotMap = getSlotMap(elCtx);
        const p2 = [];
        const splittedNewChildren = splitChildren(children2);
        for (const slotName in splittedNewChildren) {
          const newVnode = splittedNewChildren[slotName];
          const slotCtx = getSlotCtx(staticCtx, slotMap, elCtx, slotName, staticCtx.$containerState$);
          const slotRctx = pushRenderContext(rCtx);
          const slotEl = slotCtx.$element$;
          slotRctx.$slotCtx$ = slotCtx, slotCtx.$vdom$ = newVnode, newVnode.$elm$ = slotEl;
          let newFlags = flags & ~IS_SVG;
          slotEl.isSvg && (newFlags |= IS_SVG);
          for (const node of newVnode.$children$) {
            const nodeElm = createElm(slotRctx, node, newFlags, p2);
            assertDefined(node.$elm$), assertEqual(nodeElm, node.$elm$), appendChild(staticCtx, slotEl, nodeElm);
          }
        }
        return promiseAllLazy(p2);
      });
      return isPromise$1(wait) && promises.push(wait), elm;
    }
    if ("q:s" in props) {
      assertDefined(currentComponent.$slots$), setKey(elm, vnode.$key$), directSetAttribute(elm, "q:sref", currentComponent.$id$), directSetAttribute(elm, "q:s", ""), currentComponent.$slots$.push(vnode), staticCtx.$addSlots$.push([elm, currentComponent.$element$]);
    } else if (dangerouslySetInnerHTML in props) {
      return setProperty(staticCtx, elm, "innerHTML", props[dangerouslySetInnerHTML]), elm;
    }
  } else {
    if (vnode.$immutableProps$) {
      const immProps = props !== EMPTY_OBJ ? Object.fromEntries(Object.entries(vnode.$immutableProps$).map(([k, v]) => [k, v === _IMMUTABLE ? props[k] : v])) : vnode.$immutableProps$;
      setProperties(staticCtx, elCtx, currentComponent, immProps, isSvg, true);
    }
    if (props !== EMPTY_OBJ) {
      elCtx.$vdom$ = vnode;
      const p2 = vnode.$immutableProps$ ? Object.fromEntries(Object.entries(props).filter(([k]) => !(k in vnode.$immutableProps$))) : props;
      vnode.$props$ = setProperties(staticCtx, elCtx, currentComponent, p2, isSvg, false);
    }
    if (isSvg && "foreignObject" === tag && (isSvg = false, flags &= ~IS_SVG), currentComponent) {
      const scopedIds = currentComponent.$scopeIds$;
      scopedIds && scopedIds.forEach((styleId) => {
        elm.classList.add(styleId);
      }), currentComponent.$flags$ & HOST_FLAG_NEED_ATTACH_LISTENER && (elCtx.li.push(...currentComponent.li), currentComponent.$flags$ &= ~HOST_FLAG_NEED_ATTACH_LISTENER);
    }
    for (const listener of elCtx.li) {
      addQwikEvent(staticCtx, elm, listener[0]);
    }
    if (void 0 !== props[dangerouslySetInnerHTML]) {
      return elm;
    }
    isSvg && "foreignObject" === tag && (isSvg = false, flags &= ~IS_SVG);
  }
  let children = vnode.$children$;
  if (0 === children.length) {
    return elm;
  }
  1 === children.length && ":skipRender" === children[0].$type$ && (children = children[0].$children$);
  const nodes = children.map((ch) => createElm(rCtx, ch, flags, promises));
  for (const node of nodes) {
    directAppendChild(elm, node);
  }
  return elm;
};
const getSlots = (elCtx) => {
  const slots = elCtx.$slots$;
  if (!slots) {
    return assertDefined(elCtx.$element$.parentElement), elCtx.$slots$ = readDOMSlots(elCtx);
  }
  return slots;
};
const getSlotMap = (elCtx) => {
  const slotsArray = getSlots(elCtx);
  const slots = {};
  const templates = {};
  const t = Array.from(elCtx.$element$.childNodes).filter(isSlotTemplate);
  for (const vnode of slotsArray) {
    assertQwikElement(vnode.$elm$), slots[vnode.$key$ ?? ""] = vnode.$elm$;
  }
  for (const elm of t) {
    templates[directGetAttribute(elm, QSlot) ?? ""] = elm;
  }
  return {
    slots,
    templates
  };
};
const readDOMSlots = (elCtx) => {
  const parent = elCtx.$element$.parentElement;
  return queryAllVirtualByAttribute(parent, "q:sref", elCtx.$id$).map(domToVnode);
};
const handleStyle = (ctx, elm, newValue) => (setProperty(ctx, elm.style, "cssText", newValue), true);
const handleClass = (ctx, elm, newValue) => (elm.namespaceURI === SVG_NS ? setAttribute(ctx, elm, "class", newValue) : setProperty(ctx, elm, "className", newValue), true);
const checkBeforeAssign = (ctx, elm, newValue, prop) => prop in elm && ((elm[prop] !== newValue || "value" === prop && !elm.hasAttribute(prop)) && ("value" === prop && "OPTION" !== elm.tagName ? setPropertyPost(ctx, elm, prop, newValue) : setProperty(ctx, elm, prop, newValue)), true);
const forceAttribute = (ctx, elm, newValue, prop) => (setAttribute(ctx, elm, prop.toLowerCase(), newValue), true);
const setInnerHTML = (ctx, elm, newValue) => (setProperty(ctx, elm, "innerHTML", newValue), true);
const noop = () => true;
const PROP_HANDLER_MAP = {
  style: handleStyle,
  class: handleClass,
  className: handleClass,
  value: checkBeforeAssign,
  checked: checkBeforeAssign,
  href: forceAttribute,
  list: forceAttribute,
  form: forceAttribute,
  tabIndex: forceAttribute,
  download: forceAttribute,
  innerHTML: noop,
  [dangerouslySetInnerHTML]: setInnerHTML
};
const smartSetProperty = (staticCtx, elm, prop, newValue, isSvg) => {
  if (isAriaAttribute(prop)) {
    return void setAttribute(staticCtx, elm, prop, null != newValue ? String(newValue) : newValue);
  }
  const exception = PROP_HANDLER_MAP[prop];
  exception && exception(staticCtx, elm, newValue, prop) || (isSvg || !(prop in elm) ? (prop.startsWith(PREVENT_DEFAULT) && registerQwikEvent(prop.slice(15)), setAttribute(staticCtx, elm, prop, newValue)) : setProperty(staticCtx, elm, prop, newValue));
};
const setProperties = (staticCtx, elCtx, hostCtx, newProps, isSvg, immutable) => {
  const values = {};
  const elm = elCtx.$element$;
  for (const prop in newProps) {
    let newValue = newProps[prop];
    if ("ref" !== prop) {
      if (isOnProp(prop)) {
        setEvent(elCtx.li, prop, newValue, staticCtx.$containerState$.$containerEl$);
      } else {
        if (isSignal(newValue) && (newValue = trackSignal(newValue, immutable ? [1, elm, newValue, hostCtx.$element$, prop] : [2, hostCtx.$element$, newValue, elm, prop])), "class" === prop) {
          if (newValue = serializeClassWithHost(newValue, hostCtx), !newValue) {
            continue;
          }
        } else {
          "style" === prop && (newValue = stringifyStyle(newValue));
        }
        values[prop] = newValue, smartSetProperty(staticCtx, elm, prop, newValue, isSvg);
      }
    } else {
      void 0 !== newValue && setRef(newValue, elm);
    }
  }
  return values;
};
const setComponentProps = (containerState, elCtx, expectProps) => {
  let props = elCtx.$props$;
  if (props || (elCtx.$props$ = props = createProxy(createPropsState(), containerState)), expectProps === EMPTY_OBJ) {
    return;
  }
  const manager = getSubscriptionManager(props);
  const target = getProxyTarget(props);
  const immutableMeta = target[_IMMUTABLE] = expectProps[_IMMUTABLE] ?? EMPTY_OBJ;
  for (const prop in expectProps) {
    if ("children" !== prop && prop !== QSlot && !immutableMeta[prop]) {
      const value = expectProps[prop];
      target[prop] !== value && (target[prop] = value, manager.$notifySubs$(prop));
    }
  }
};
const cleanupTree = (elm, staticCtx, subsManager, stopSlots, dispose = false) => {
  if (subsManager.$clearSub$(elm), isQwikElement(elm)) {
    if (!dispose && stopSlots && elm.hasAttribute("q:s")) {
      return void staticCtx.$rmSlots$.push(elm);
    }
    const ctx = tryGetContext(elm);
    ctx && cleanupContext(ctx, subsManager);
    const end = isVirtualElement(elm) ? elm.close : null;
    let node = elm.firstChild;
    for (; (node = processVirtualNodes(node)) && (cleanupTree(node, staticCtx, subsManager, true, dispose), node = node.nextSibling, node !== end); ) {
    }
  }
};
const executeContextWithScrollAndTransition = async (ctx) => {
  executeDOMRender(ctx);
};
const directAppendChild = (parent, child) => {
  isVirtualElement(child) ? child.appendTo(parent) : parent.appendChild(child);
};
const directRemoveChild = (parent, child) => {
  isVirtualElement(child) ? child.remove() : parent.removeChild(child);
};
const directInsertAfter = (parent, child, ref) => {
  isVirtualElement(child) ? child.insertBeforeTo(parent, ref?.nextSibling ?? null) : parent.insertBefore(child, ref?.nextSibling ?? null);
};
const directInsertBefore = (parent, child, ref) => {
  isVirtualElement(child) ? child.insertBeforeTo(parent, getRootNode(ref)) : parent.insertBefore(child, getRootNode(ref));
};
const createKeyToOldIdx = (children, beginIdx, endIdx) => {
  const map = {};
  for (let i = beginIdx; i <= endIdx; ++i) {
    const key = children[i].$key$;
    null != key && (map[key] = i);
  }
  return map;
};
const addQwikEvent = (staticCtx, elm, prop) => {
  prop.startsWith("on:") || setAttribute(staticCtx, elm, prop, ""), registerQwikEvent(prop);
};
const registerQwikEvent = (prop) => {
  {
    const eventName = getEventName(prop);
    try {
      (globalThis.qwikevents ||= []).push(eventName);
    } catch (err) {
    }
  }
};
const setAttribute = (staticCtx, el, prop, value) => {
  staticCtx.$operations$.push({
    $operation$: _setAttribute,
    $args$: [el, prop, value]
  });
};
const _setAttribute = (el, prop, value) => {
  if (null == value || false === value) {
    el.removeAttribute(prop);
  } else {
    const str = true === value ? "" : String(value);
    directSetAttribute(el, prop, str);
  }
};
const setProperty = (staticCtx, node, key, value) => {
  staticCtx.$operations$.push({
    $operation$: _setProperty,
    $args$: [node, key, value]
  });
};
const setPropertyPost = (staticCtx, node, key, value) => {
  staticCtx.$postOperations$.push({
    $operation$: _setProperty,
    $args$: [node, key, value]
  });
};
const _setProperty = (node, key, value) => {
  try {
    node[key] = null == value ? "" : value, null == value && isNode$1(node) && isElement$1(node) && node.removeAttribute(key);
  } catch (err) {
    logError(codeToText(6), key, {
      node,
      value
    }, err);
  }
};
const createElement = (doc, expectTag, isSvg) => isSvg ? doc.createElementNS(SVG_NS, expectTag) : doc.createElement(expectTag);
const insertBefore = (staticCtx, parent, newChild, refChild) => (staticCtx.$operations$.push({
  $operation$: directInsertBefore,
  $args$: [parent, newChild, refChild || null]
}), newChild);
const insertAfter = (staticCtx, parent, newChild, refChild) => (staticCtx.$operations$.push({
  $operation$: directInsertAfter,
  $args$: [parent, newChild, refChild || null]
}), newChild);
const appendChild = (staticCtx, parent, newChild) => (staticCtx.$operations$.push({
  $operation$: directAppendChild,
  $args$: [parent, newChild]
}), newChild);
const appendHeadStyle = (staticCtx, styleTask) => {
  staticCtx.$containerState$.$styleIds$.add(styleTask.styleId), staticCtx.$postOperations$.push({
    $operation$: _appendHeadStyle,
    $args$: [staticCtx.$containerState$, styleTask]
  });
};
const _appendHeadStyle = (containerState, styleTask) => {
  const containerEl = containerState.$containerEl$;
  const doc = getDocument(containerEl);
  const isDoc = doc.documentElement === containerEl;
  const headEl = doc.head;
  const style = doc.createElement("style");
  directSetAttribute(style, QStyle, styleTask.styleId), directSetAttribute(style, "hidden", ""), style.textContent = styleTask.content, isDoc && headEl ? directAppendChild(headEl, style) : directInsertBefore(containerEl, style, containerEl.firstChild);
};
const prepend = (staticCtx, parent, newChild) => {
  staticCtx.$operations$.push({
    $operation$: directPrepend,
    $args$: [parent, newChild]
  });
};
const directPrepend = (parent, newChild) => {
  directInsertBefore(parent, newChild, parent.firstChild);
};
const removeNode = (staticCtx, el) => {
  if (isQwikElement(el)) {
    cleanupTree(el, staticCtx, staticCtx.$containerState$.$subsManager$, true);
  }
  staticCtx.$operations$.push({
    $operation$: _removeNode,
    $args$: [el, staticCtx]
  });
};
const _removeNode = (el) => {
  const parent = el.parentElement;
  parent && directRemoveChild(parent, el);
};
const createTemplate = (doc, slotName) => {
  const template = createElement(doc, "q:template", false);
  return directSetAttribute(template, QSlot, slotName), directSetAttribute(template, "hidden", ""), directSetAttribute(template, "aria-hidden", "true"), template;
};
const executeDOMRender = (staticCtx) => {
  for (const op of staticCtx.$operations$) {
    op.$operation$.apply(void 0, op.$args$);
  }
  resolveSlotProjection(staticCtx);
};
const getKey = (el) => directGetAttribute(el, "q:key");
const setKey = (el, key) => {
  null !== key && directSetAttribute(el, "q:key", key);
};
const resolveSlotProjection = (staticCtx) => {
  const subsManager = staticCtx.$containerState$.$subsManager$;
  for (const slotEl of staticCtx.$rmSlots$) {
    const key = getKey(slotEl);
    const slotChildren = getChildren(slotEl, isChildComponent);
    if (slotChildren.length > 0) {
      const sref = slotEl.getAttribute("q:sref");
      const hostCtx = staticCtx.$roots$.find((r) => r.$id$ === sref);
      if (hostCtx) {
        const hostElm = hostCtx.$element$;
        if (hostElm.isConnected) {
          if (getChildren(hostElm, isSlotTemplate).some((node) => directGetAttribute(node, QSlot) === key)) {
            cleanupTree(slotEl, staticCtx, subsManager, false);
          } else {
            const template = createTemplate(staticCtx.$doc$, key);
            for (const child of slotChildren) {
              directAppendChild(template, child);
            }
            directInsertBefore(hostElm, template, hostElm.firstChild);
          }
        } else {
          cleanupTree(slotEl, staticCtx, subsManager, false);
        }
      } else {
        cleanupTree(slotEl, staticCtx, subsManager, false);
      }
    }
  }
  for (const [slotEl, hostElm] of staticCtx.$addSlots$) {
    const key = getKey(slotEl);
    const template = getChildren(hostElm, isSlotTemplate).find((node) => node.getAttribute(QSlot) === key);
    template && (getChildren(template, isChildComponent).forEach((child) => {
      directAppendChild(slotEl, child);
    }), template.remove());
  }
};
const printRenderStats = () => {
};
const newVirtualElement = (doc, isSvg) => {
  const open = doc.createComment("qv ");
  const close = doc.createComment("/qv");
  return new VirtualElementImpl(open, close, isSvg);
};
const parseVirtualAttributes = (str) => {
  if (!str) {
    return {};
  }
  const attributes = str.split(" ");
  return Object.fromEntries(attributes.map((attr) => {
    const index = attr.indexOf("=");
    return index >= 0 ? [attr.slice(0, index), unescape(attr.slice(index + 1))] : [attr, ""];
  }));
};
const serializeVirtualAttributes = (map) => {
  const attributes = [];
  return Object.entries(map).forEach(([key, value]) => {
    attributes.push(value ? `${key}=${escape(value)}` : `${key}`);
  }), attributes.join(" ");
};
const walkerVirtualByAttribute = (el, prop, value) => el.ownerDocument.createTreeWalker(el, 128, {
  acceptNode(c) {
    const virtual = getVirtualElement(c);
    return virtual && directGetAttribute(virtual, prop) === value ? 1 : 2;
  }
});
const queryAllVirtualByAttribute = (el, prop, value) => {
  const walker = walkerVirtualByAttribute(el, prop, value);
  const pars = [];
  let currentNode = null;
  for (; currentNode = walker.nextNode(); ) {
    pars.push(getVirtualElement(currentNode));
  }
  return pars;
};
const escape = (s) => s.replace(/ /g, "+");
const unescape = (s) => s.replace(/\+/g, " ");
const VIRTUAL = ":virtual";
class VirtualElementImpl {
  open;
  close;
  isSvg;
  ownerDocument;
  _qc_ = null;
  nodeType = 111;
  localName = VIRTUAL;
  nodeName = VIRTUAL;
  $attributes$;
  $template$;
  constructor(open, close, isSvg) {
    this.open = open, this.close = close, this.isSvg = isSvg;
    const doc = this.ownerDocument = open.ownerDocument;
    this.$template$ = createElement(doc, "template", false), this.$attributes$ = parseVirtualAttributes(open.data.slice(3)), assertTrue(open.data.startsWith("qv ")), open.__virtual = this, close.__virtual = this;
  }
  insertBefore(node, ref) {
    const parent = this.parentElement;
    if (parent) {
      parent.insertBefore(node, ref || this.close);
    } else {
      this.$template$.insertBefore(node, ref);
    }
    return node;
  }
  remove() {
    const parent = this.parentElement;
    if (parent) {
      const ch = this.childNodes;
      assertEqual(this.$template$.childElementCount), parent.removeChild(this.open);
      for (let i = 0; i < ch.length; i++) {
        this.$template$.appendChild(ch[i]);
      }
      parent.removeChild(this.close);
    }
  }
  appendChild(node) {
    return this.insertBefore(node, null);
  }
  insertBeforeTo(newParent, child) {
    const ch = this.childNodes;
    newParent.insertBefore(this.open, child);
    for (const c of ch) {
      newParent.insertBefore(c, child);
    }
    newParent.insertBefore(this.close, child), assertEqual(this.$template$.childElementCount);
  }
  appendTo(newParent) {
    this.insertBeforeTo(newParent, null);
  }
  get namespaceURI() {
    return this.parentElement?.namespaceURI ?? "";
  }
  removeChild(child) {
    this.parentElement ? this.parentElement.removeChild(child) : this.$template$.removeChild(child);
  }
  getAttribute(prop) {
    return this.$attributes$[prop] ?? null;
  }
  hasAttribute(prop) {
    return prop in this.$attributes$;
  }
  setAttribute(prop, value) {
    this.$attributes$[prop] = value, this.open.data = updateComment(this.$attributes$);
  }
  removeAttribute(prop) {
    delete this.$attributes$[prop], this.open.data = updateComment(this.$attributes$);
  }
  matches(_) {
    return false;
  }
  compareDocumentPosition(other) {
    return this.open.compareDocumentPosition(other);
  }
  closest(query) {
    const parent = this.parentElement;
    return parent ? parent.closest(query) : null;
  }
  querySelectorAll(query) {
    const result = [];
    return getChildren(this, isNodeElement).forEach((el) => {
      isQwikElement(el) && (el.matches(query) && result.push(el), result.concat(Array.from(el.querySelectorAll(query))));
    }), result;
  }
  querySelector(query) {
    for (const el of this.childNodes) {
      if (isElement$1(el)) {
        if (el.matches(query)) {
          return el;
        }
        const v = el.querySelector(query);
        if (null !== v) {
          return v;
        }
      }
    }
    return null;
  }
  get innerHTML() {
    return "";
  }
  set innerHTML(html) {
    const parent = this.parentElement;
    parent ? (this.childNodes.forEach((a2) => this.removeChild(a2)), this.$template$.innerHTML = html, parent.insertBefore(this.$template$.content, this.close)) : this.$template$.innerHTML = html;
  }
  get firstChild() {
    if (this.parentElement) {
      const first = this.open.nextSibling;
      return first === this.close ? null : first;
    }
    return this.$template$.firstChild;
  }
  get nextSibling() {
    return this.close.nextSibling;
  }
  get previousSibling() {
    return this.open.previousSibling;
  }
  get childNodes() {
    if (!this.parentElement) {
      return Array.from(this.$template$.childNodes);
    }
    const nodes = [];
    let node = this.open;
    for (; (node = node.nextSibling) && node !== this.close; ) {
      nodes.push(node);
    }
    return nodes;
  }
  get isConnected() {
    return this.open.isConnected;
  }
  get parentElement() {
    return this.open.parentElement;
  }
}
const updateComment = (attributes) => `qv ${serializeVirtualAttributes(attributes)}`;
const processVirtualNodes = (node) => {
  if (null == node) {
    return null;
  }
  if (isComment(node)) {
    const virtual = getVirtualElement(node);
    if (virtual) {
      return virtual;
    }
  }
  return node;
};
const findClose = (open) => {
  let node = open;
  let stack = 1;
  for (; node = node.nextSibling; ) {
    if (isComment(node)) {
      const virtual = node.__virtual;
      if (virtual) {
        node = virtual;
      } else if (node.data.startsWith("qv ")) {
        stack++;
      } else if ("/qv" === node.data && (stack--, 0 === stack)) {
        return node;
      }
    }
  }
};
const getVirtualElement = (open) => {
  const virtual = open.__virtual;
  if (virtual) {
    return virtual;
  }
  if (open.data.startsWith("qv ")) {
    const close = findClose(open);
    return new VirtualElementImpl(open, close, open.parentElement?.namespaceURI === SVG_NS);
  }
  return null;
};
const getRootNode = (node) => null == node ? null : isVirtualElement(node) ? node.open : node;
const _serializeData = async (data) => {
  const containerState = createContainerState(null, null);
  const collector = createCollector(containerState);
  let promises;
  for (collectValue(data, collector, false); (promises = collector.$promises$).length > 0; ) {
    collector.$promises$ = [];
    const results = await Promise.allSettled(promises);
    for (const result of results) {
      "rejected" === result.status && console.error(result.reason);
    }
  }
  const objs = Array.from(collector.$objSet$.keys());
  let count = 0;
  const objToId = /* @__PURE__ */ new Map();
  for (const obj of objs) {
    objToId.set(obj, intToStr(count)), count++;
  }
  if (collector.$noSerialize$.length > 0) {
    const undefinedID = objToId.get(void 0);
    for (const obj of collector.$noSerialize$) {
      objToId.set(obj, undefinedID);
    }
  }
  const mustGetObjId = (obj) => {
    let suffix = "";
    if (isPromise$1(obj)) {
      const promiseValue = getPromiseValue(obj);
      if (!promiseValue) {
        throw qError(27, obj);
      }
      obj = promiseValue.value, suffix += promiseValue.resolved ? "~" : "_";
    }
    if (isObject(obj)) {
      const target = getProxyTarget(obj);
      target && (suffix += "!", obj = target);
    }
    const key = objToId.get(obj);
    if (void 0 === key) {
      throw qError(27, obj);
    }
    return key + suffix;
  };
  const convertedObjs = serializeObjects(objs, mustGetObjId, null, collector, containerState);
  return JSON.stringify({
    _entry: mustGetObjId(data),
    _objs: convertedObjs
  });
};
const pauseContainer = async (elmOrDoc) => {
  const doc = getDocument(elmOrDoc);
  const documentElement = doc.documentElement;
  const containerEl = isDocument(elmOrDoc) ? documentElement : elmOrDoc;
  if ("paused" === directGetAttribute(containerEl, "q:container")) {
    throw qError(21);
  }
  const parentJSON = containerEl === doc.documentElement ? doc.body : containerEl;
  const containerState = _getContainerState(containerEl);
  const contexts = getNodesInScope(containerEl, hasContext);
  directSetAttribute(containerEl, "q:container", "paused");
  for (const elCtx of contexts) {
    const elm = elCtx.$element$;
    const listeners = elCtx.li;
    if (elCtx.$scopeIds$) {
      const value = serializeSStyle(elCtx.$scopeIds$);
      value && elm.setAttribute("q:sstyle", value);
    }
    if (elCtx.$id$ && elm.setAttribute("q:id", elCtx.$id$), isElement$1(elm) && listeners.length > 0) {
      const groups = groupListeners(listeners);
      for (const listener of groups) {
        elm.setAttribute(listener[0], serializeQRLs(listener[1], containerState, elCtx));
      }
    }
  }
  const data = await _pauseFromContexts(contexts, containerState, (el) => isNode$1(el) && isText(el) ? getTextID(el, containerState) : null);
  const qwikJson = doc.createElement("script");
  directSetAttribute(qwikJson, "type", "qwik/json"), qwikJson.textContent = escapeText(JSON.stringify(data.state, void 0, void 0)), parentJSON.appendChild(qwikJson);
  const extraListeners = Array.from(containerState.$events$, (s) => JSON.stringify(s));
  const eventsScript = doc.createElement("script");
  return eventsScript.textContent = `(window.qwikevents||=[]).push(${extraListeners.join(", ")})`, parentJSON.appendChild(eventsScript), data;
};
const _pauseFromContexts = async (allContexts, containerState, fallbackGetObjId, textNodes) => {
  const collector = createCollector(containerState);
  textNodes?.forEach((_, key) => {
    collector.$seen$.add(key);
  });
  let hasListeners = false;
  for (const ctx of allContexts) {
    if (ctx.$tasks$) {
      for (const task of ctx.$tasks$) {
        isResourceTask(task) && collector.$resources$.push(task.$state$), destroyTask(task);
      }
    }
  }
  for (const ctx of allContexts) {
    const el = ctx.$element$;
    const ctxListeners = ctx.li;
    for (const listener of ctxListeners) {
      if (isElement$1(el)) {
        const qrl2 = listener[1];
        const captured = qrl2.$captureRef$;
        if (captured) {
          for (const obj of captured) {
            collectValue(obj, collector, true);
          }
        }
        collector.$qrls$.push(qrl2), hasListeners = true;
      }
    }
  }
  if (!hasListeners) {
    return {
      state: {
        refs: {},
        ctx: {},
        objs: [],
        subs: []
      },
      objs: [],
      funcs: [],
      qrls: [],
      resources: collector.$resources$,
      mode: "static"
    };
  }
  let promises;
  for (; (promises = collector.$promises$).length > 0; ) {
    collector.$promises$ = [], await Promise.all(promises);
  }
  const canRender = collector.$elements$.length > 0;
  if (canRender) {
    for (const elCtx of collector.$deferElements$) {
      collectElementData(elCtx, collector, elCtx.$element$);
    }
    for (const ctx of allContexts) {
      collectProps(ctx, collector);
    }
  }
  for (; (promises = collector.$promises$).length > 0; ) {
    collector.$promises$ = [], await Promise.all(promises);
  }
  const elementToIndex = /* @__PURE__ */ new Map();
  const objs = Array.from(collector.$objSet$.keys());
  const objToId = /* @__PURE__ */ new Map();
  const getObjId = (obj) => {
    let suffix = "";
    if (isPromise$1(obj)) {
      const promiseValue = getPromiseValue(obj);
      if (!promiseValue) {
        return null;
      }
      obj = promiseValue.value, suffix += promiseValue.resolved ? "~" : "_";
    }
    if (isObject(obj)) {
      const target = getProxyTarget(obj);
      if (target) {
        suffix += "!", obj = target;
      } else if (isQwikElement(obj)) {
        const elID = ((el) => {
          let id2 = elementToIndex.get(el);
          return void 0 === id2 && (id2 = getQId(el), id2 || console.warn("Missing ID", el), elementToIndex.set(el, id2)), id2;
        })(obj);
        return elID ? "#" + elID + suffix : null;
      }
    }
    const id = objToId.get(obj);
    if (id) {
      return id + suffix;
    }
    const textId = textNodes?.get(obj);
    return textId ? "*" + textId : fallbackGetObjId ? fallbackGetObjId(obj) : null;
  };
  const mustGetObjId = (obj) => {
    const key = getObjId(obj);
    if (null === key) {
      if (isQrl(obj)) {
        const id = intToStr(objToId.size);
        return objToId.set(obj, id), id;
      }
      throw qError(27, obj);
    }
    return key;
  };
  const subsMap = /* @__PURE__ */ new Map();
  for (const obj of objs) {
    const subs2 = getManager(obj, containerState)?.$subs$;
    if (!subs2) {
      continue;
    }
    const flags = getProxyFlags(obj) ?? 0;
    const converted = [];
    1 & flags && converted.push(flags);
    for (const sub of subs2) {
      const host = sub[1];
      0 === sub[0] && isNode$1(host) && isVirtualElement(host) && !collector.$elements$.includes(tryGetContext(host)) || converted.push(sub);
    }
    converted.length > 0 && subsMap.set(obj, converted);
  }
  objs.sort((a2, b) => (subsMap.has(a2) ? 0 : 1) - (subsMap.has(b) ? 0 : 1));
  let count = 0;
  for (const obj of objs) {
    objToId.set(obj, intToStr(count)), count++;
  }
  if (collector.$noSerialize$.length > 0) {
    const undefinedID = objToId.get(void 0);
    for (const obj of collector.$noSerialize$) {
      objToId.set(obj, undefinedID);
    }
  }
  const subs = [];
  for (const obj of objs) {
    const value = subsMap.get(obj);
    if (null == value) {
      break;
    }
    subs.push(value.map((s) => "number" == typeof s ? `_${s}` : serializeSubscription(s, getObjId)).filter(isNotNullable));
  }
  assertEqual(subs.length, subsMap.size);
  const convertedObjs = serializeObjects(objs, mustGetObjId, getObjId, collector, containerState);
  const meta = {};
  const refs = {};
  for (const ctx of allContexts) {
    const node = ctx.$element$;
    const elementID = ctx.$id$;
    const ref = ctx.$refMap$;
    const props = ctx.$props$;
    const contexts = ctx.$contexts$;
    const tasks = ctx.$tasks$;
    const renderQrl = ctx.$componentQrl$;
    const seq = ctx.$seq$;
    const metaValue = {};
    const elementCaptured = isVirtualElement(node) && collector.$elements$.includes(ctx);
    if (ref.length > 0) {
      const value = mapJoin(ref, mustGetObjId, " ");
      value && (refs[elementID] = value);
    } else if (canRender) {
      let add = false;
      if (elementCaptured) {
        const propsId = getObjId(props);
        metaValue.h = mustGetObjId(renderQrl) + (propsId ? " " + propsId : ""), add = true;
      } else {
        const propsId = getObjId(props);
        propsId && (metaValue.h = " " + propsId, add = true);
      }
      if (tasks && tasks.length > 0) {
        const value = mapJoin(tasks, getObjId, " ");
        value && (metaValue.w = value, add = true);
      }
      if (elementCaptured && seq && seq.length > 0) {
        const value = mapJoin(seq, mustGetObjId, " ");
        metaValue.s = value, add = true;
      }
      if (contexts) {
        const serializedContexts = [];
        contexts.forEach((value2, key) => {
          const id = getObjId(value2);
          id && serializedContexts.push(`${key}=${id}`);
        });
        const value = serializedContexts.join(" ");
        value && (metaValue.c = value, add = true);
      }
      add && (meta[elementID] = metaValue);
    }
  }
  return {
    state: {
      refs,
      ctx: meta,
      objs: convertedObjs,
      subs
    },
    objs,
    funcs: collector.$inlinedFunctions$,
    resources: collector.$resources$,
    qrls: collector.$qrls$,
    mode: canRender ? "render" : "listeners"
  };
};
const mapJoin = (objects, getObjectId, sep) => {
  let output = "";
  for (const obj of objects) {
    const id = getObjectId(obj);
    null !== id && ("" !== output && (output += sep), output += id);
  }
  return output;
};
const getNodesInScope = (parent, predicate) => {
  const results = [];
  const v = predicate(parent);
  void 0 !== v && results.push(v);
  const walker = parent.ownerDocument.createTreeWalker(parent, 1 | SHOW_COMMENT$1, {
    acceptNode(node) {
      if (isContainer(node)) {
        return 2;
      }
      const v2 = predicate(node);
      return void 0 !== v2 && results.push(v2), 3;
    }
  });
  for (; walker.nextNode(); ) {
  }
  return results;
};
const collectProps = (elCtx, collector) => {
  const parentCtx = elCtx.$realParentCtx$ || elCtx.$parentCtx$;
  const props = elCtx.$props$;
  if (parentCtx && props && !isEmptyObj(props) && collector.$elements$.includes(parentCtx)) {
    const subs = getSubscriptionManager(props)?.$subs$;
    const el = elCtx.$element$;
    if (subs) {
      for (const [type, host] of subs) {
        0 === type ? (host !== el && collectSubscriptions(getSubscriptionManager(props), collector, false), isNode$1(host) ? collectElement(host, collector) : collectValue(host, collector, true)) : (collectValue(props, collector, false), collectSubscriptions(getSubscriptionManager(props), collector, false));
      }
    }
  }
};
const createCollector = (containerState) => {
  const inlinedFunctions = [];
  return containerState.$inlineFns$.forEach((id, fnStr) => {
    for (; inlinedFunctions.length <= id; ) {
      inlinedFunctions.push("");
    }
    inlinedFunctions[id] = fnStr;
  }), {
    $containerState$: containerState,
    $seen$: /* @__PURE__ */ new Set(),
    $objSet$: /* @__PURE__ */ new Set(),
    $prefetch$: 0,
    $noSerialize$: [],
    $inlinedFunctions$: inlinedFunctions,
    $resources$: [],
    $elements$: [],
    $qrls$: [],
    $deferElements$: [],
    $promises$: []
  };
};
const collectDeferElement = (el, collector) => {
  const ctx = tryGetContext(el);
  collector.$elements$.includes(ctx) || (collector.$elements$.push(ctx), ctx.$flags$ & HOST_FLAG_DYNAMIC ? (collector.$prefetch$++, collectElementData(ctx, collector, true), collector.$prefetch$--) : collector.$deferElements$.push(ctx));
};
const collectElement = (el, collector) => {
  const ctx = tryGetContext(el);
  if (ctx) {
    if (collector.$elements$.includes(ctx)) {
      return;
    }
    collector.$elements$.push(ctx), collectElementData(ctx, collector, el);
  }
};
const collectElementData = (elCtx, collector, dynamicCtx) => {
  if (elCtx.$props$ && !isEmptyObj(elCtx.$props$) && (collectValue(elCtx.$props$, collector, dynamicCtx), collectSubscriptions(getSubscriptionManager(elCtx.$props$), collector, dynamicCtx)), elCtx.$componentQrl$ && collectValue(elCtx.$componentQrl$, collector, dynamicCtx), elCtx.$seq$) {
    for (const obj of elCtx.$seq$) {
      collectValue(obj, collector, dynamicCtx);
    }
  }
  if (elCtx.$tasks$) {
    const map = collector.$containerState$.$subsManager$.$groupToManagers$;
    for (const obj of elCtx.$tasks$) {
      map.has(obj) && collectValue(obj, collector, dynamicCtx);
    }
  }
  if (true === dynamicCtx && (collectContext(elCtx, collector), elCtx.$dynamicSlots$)) {
    for (const slotCtx of elCtx.$dynamicSlots$) {
      collectContext(slotCtx, collector);
    }
  }
};
const collectContext = (elCtx, collector) => {
  for (; elCtx; ) {
    if (elCtx.$contexts$) {
      for (const obj of elCtx.$contexts$.values()) {
        collectValue(obj, collector, true);
      }
    }
    elCtx = elCtx.$parentCtx$;
  }
};
const escapeText = (str) => str.replace(/<(\/?script)/gi, "\\x3C$1");
const collectSubscriptions = (manager, collector, leaks) => {
  if (collector.$seen$.has(manager)) {
    return;
  }
  collector.$seen$.add(manager);
  const subs = manager.$subs$;
  for (const sub of subs) {
    if (sub[0] > 0 && collectValue(sub[2], collector, leaks), true === leaks) {
      const host = sub[1];
      isNode$1(host) && isVirtualElement(host) ? 0 === sub[0] && collectDeferElement(host, collector) : collectValue(host, collector, true);
    }
  }
};
const PROMISE_VALUE = /* @__PURE__ */ Symbol();
const resolvePromise = (promise) => promise.then((value) => (promise[PROMISE_VALUE] = {
  resolved: true,
  value
}, value), (value) => (promise[PROMISE_VALUE] = {
  resolved: false,
  value
}, value));
const getPromiseValue = (promise) => promise[PROMISE_VALUE];
const collectValue = (obj, collector, leaks) => {
  if (null != obj) {
    const objType = typeof obj;
    switch (objType) {
      case "function":
      case "object": {
        if (collector.$seen$.has(obj)) {
          return;
        }
        if (collector.$seen$.add(obj), fastSkipSerialize(obj)) {
          return collector.$objSet$.add(void 0), void collector.$noSerialize$.push(obj);
        }
        const input = obj;
        const target = getProxyTarget(obj);
        if (target) {
          const mutable = !(2 & getProxyFlags(obj = target));
          if (leaks && mutable && collectSubscriptions(getSubscriptionManager(input), collector, leaks), fastWeakSerialize(input)) {
            return void collector.$objSet$.add(obj);
          }
        }
        if (collectDeps(obj, collector, leaks)) {
          return void collector.$objSet$.add(obj);
        }
        if (isPromise$1(obj)) {
          return void collector.$promises$.push(resolvePromise(obj).then((value) => {
            collectValue(value, collector, leaks);
          }));
        }
        if ("object" === objType) {
          if (isNode$1(obj)) {
            return;
          }
          if (isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
              collectValue(input[i], collector, leaks);
            }
          } else if (isSerializableObject(obj)) {
            for (const key in obj) {
              collectValue(input[key], collector, leaks);
            }
          }
        }
        break;
      }
    }
  }
  collector.$objSet$.add(obj);
};
const isContainer = (el) => isElement$1(el) && el.hasAttribute("q:container");
const hasContext = (el) => {
  const node = processVirtualNodes(el);
  if (isQwikElement(node)) {
    const ctx = tryGetContext(node);
    if (ctx && ctx.$id$) {
      return ctx;
    }
  }
};
const getManager = (obj, containerState) => {
  if (!isObject(obj)) {
    return;
  }
  if (obj instanceof SignalImpl) {
    return getSubscriptionManager(obj);
  }
  const proxy = containerState.$proxyMap$.get(obj);
  return proxy ? getSubscriptionManager(proxy) : void 0;
};
const getQId = (el) => {
  const ctx = tryGetContext(el);
  return ctx ? ctx.$id$ : null;
};
const getTextID = (node, containerState) => {
  const prev = node.previousSibling;
  if (prev && isComment(prev) && prev.data.startsWith("t=")) {
    return "#" + prev.data.slice(2);
  }
  const doc = node.ownerDocument;
  const id = intToStr(containerState.$elementIndex$++);
  const open = doc.createComment(`t=${id}`);
  const close = doc.createComment("");
  const parent = node.parentElement;
  return parent.insertBefore(open, node), parent.insertBefore(close, node.nextSibling), "#" + id;
};
const isEmptyObj = (obj) => 0 === Object.keys(obj).length;
function serializeObjects(objs, mustGetObjId, getObjId, collector, containerState) {
  return objs.map((obj) => {
    if (null === obj) {
      return null;
    }
    const typeObj = typeof obj;
    switch (typeObj) {
      case "undefined":
        return UNDEFINED_PREFIX;
      case "number":
        if (!Number.isFinite(obj)) {
          break;
        }
        return obj;
      case "string":
        if (obj.charCodeAt(0) < 32) {
          break;
        }
        return obj;
      case "boolean":
        return obj;
    }
    const value = serializeValue(obj, mustGetObjId, collector, containerState);
    if (void 0 !== value) {
      return value;
    }
    if ("object" === typeObj) {
      if (isArray(obj)) {
        return obj.map(mustGetObjId);
      }
      if (isSerializableObject(obj)) {
        const output = {};
        for (const key in obj) {
          if (getObjId) {
            const id = getObjId(obj[key]);
            null !== id && (output[key] = id);
          } else {
            output[key] = mustGetObjId(obj[key]);
          }
        }
        return output;
      }
    }
    throw qError(3, obj);
  });
}
const inlinedQrl = (symbol, symbolName, lexicalScopeCapture = EMPTY_ARRAY) => createQRL(null, symbolName, symbol, null, null, lexicalScopeCapture, null);
const _noopQrl = (symbolName, lexicalScopeCapture = EMPTY_ARRAY) => createQRL(null, symbolName, null, null, null, lexicalScopeCapture, null);
const serializeQRL = (qrl2, opts = {}) => {
  let symbol = qrl2.$symbol$;
  let chunk = qrl2.$chunk$;
  const refSymbol = qrl2.$refSymbol$ ?? symbol;
  const platform = getPlatform();
  if (platform) {
    const result = platform.chunkForSymbol(refSymbol, chunk, qrl2.dev?.file);
    result ? (chunk = result[1], qrl2.$refSymbol$ || (symbol = result[0])) : console.error("serializeQRL: Cannot resolve symbol", symbol, "in", chunk, qrl2.dev?.file);
  }
  if (null == chunk) {
    throw qError(31, qrl2.$symbol$);
  }
  if (chunk.startsWith("./") && (chunk = chunk.slice(2)), isSyncQrl(qrl2)) {
    if (opts.$containerState$) {
      const fn = qrl2.resolved;
      const containerState = opts.$containerState$;
      const fnStrKey = fn.serialized || fn.toString();
      let id = containerState.$inlineFns$.get(fnStrKey);
      void 0 === id && (id = containerState.$inlineFns$.size, containerState.$inlineFns$.set(fnStrKey, id)), symbol = String(id);
    } else {
      throwErrorAndStop("Sync QRL without containerState");
    }
  }
  let output = `${chunk}#${symbol}`;
  const capture = qrl2.$capture$;
  const captureRef = qrl2.$captureRef$;
  return captureRef && captureRef.length ? opts.$getObjId$ ? output += `[${mapJoin(captureRef, opts.$getObjId$, " ")}]` : opts.$addRefMap$ && (output += `[${mapJoin(captureRef, opts.$addRefMap$, " ")}]`) : capture && capture.length > 0 && (output += `[${capture.join(" ")}]`), output;
};
const serializeQRLs = (existingQRLs, containerState, elCtx) => {
  assertElement(elCtx.$element$);
  const opts = {
    $containerState$: containerState,
    $addRefMap$: (obj) => addToArray(elCtx.$refMap$, obj)
  };
  return mapJoin(existingQRLs, (qrl2) => serializeQRL(qrl2, opts), "\n");
};
const parseQRL = (qrl2, containerEl) => {
  const endIdx = qrl2.length;
  const hashIdx = indexOf(qrl2, 0, "#");
  const captureIdx = indexOf(qrl2, hashIdx, "[");
  const chunkEndIdx = Math.min(hashIdx, captureIdx);
  const chunk = qrl2.substring(0, chunkEndIdx);
  const symbolStartIdx = hashIdx == endIdx ? hashIdx : hashIdx + 1;
  const symbol = symbolStartIdx == captureIdx ? "default" : qrl2.substring(symbolStartIdx, captureIdx);
  const capture = captureIdx === endIdx ? EMPTY_ARRAY : qrl2.substring(captureIdx + 1, endIdx - 1).split(" ");
  const iQrl = createQRL(chunk, symbol, null, null, capture, null, null);
  return containerEl && iQrl.$setContainer$(containerEl), iQrl;
};
const indexOf = (text, startIdx, char) => {
  const endIdx = text.length;
  const charIdx = text.indexOf(char, startIdx == endIdx ? 0 : startIdx);
  return -1 == charIdx ? endIdx : charIdx;
};
const addToArray = (array, obj) => {
  const index = array.indexOf(obj);
  return -1 === index ? (array.push(obj), String(array.length - 1)) : String(index);
};
const inflateQrl = (qrl2, elCtx) => (assertDefined(qrl2.$capture$), qrl2.$captureRef$ = qrl2.$capture$.map((idx) => {
  const int = parseInt(idx, 10);
  const obj = elCtx.$refMap$[int];
  return assertTrue(elCtx.$refMap$.length > int), obj;
}));
const _createResourceReturn = (opts) => ({
  __brand: "resource",
  value: void 0,
  loading: !isServerPlatform(),
  _resolved: void 0,
  _error: void 0,
  _state: "pending",
  _timeout: opts?.timeout ?? -1,
  _cache: 0
});
const isResourceReturn = (obj) => isObject(obj) && "resource" === obj.__brand;
const serializeResource = (resource, getObjId) => {
  const state = resource._state;
  return "resolved" === state ? `0 ${getObjId(resource._resolved)}` : "pending" === state ? "1" : `2 ${getObjId(resource._error)}`;
};
const parseResourceReturn = (data) => {
  const [first, id] = data.split(" ");
  const result = _createResourceReturn(void 0);
  return result.value = Promise.resolve(), "0" === first ? (result._state = "resolved", result._resolved = id, result.loading = false) : "1" === first ? (result._state = "pending", result.value = new Promise(() => {
  }), result.loading = true) : "2" === first && (result._state = "rejected", result._error = id, result.loading = false), result;
};
const Slot = (props) => _jsxC(Virtual, {
  [QSlotS]: ""
}, 0, props.name ?? "");
const UNDEFINED_PREFIX = "";
function serializer(serializer2) {
  return {
    $prefixCode$: serializer2.$prefix$.charCodeAt(0),
    $prefixChar$: serializer2.$prefix$,
    $test$: serializer2.$test$,
    $serialize$: serializer2.$serialize$,
    $prepare$: serializer2.$prepare$,
    $fill$: serializer2.$fill$,
    $collect$: serializer2.$collect$,
    $subs$: serializer2.$subs$
  };
}
const QRLSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => isQrl(v),
  $collect$: (v, collector, leaks) => {
    if (v.$captureRef$) {
      for (const item of v.$captureRef$) {
        collectValue(item, collector, leaks);
      }
    }
    0 === collector.$prefetch$ && collector.$qrls$.push(v);
  },
  $serialize$: (obj, getObjId) => serializeQRL(obj, {
    $getObjId$: getObjId
  }),
  $prepare$: (data, containerState) => parseQRL(data, containerState.$containerEl$),
  $fill$: (qrl2, getObject) => {
    qrl2.$capture$ && qrl2.$capture$.length > 0 && (qrl2.$captureRef$ = qrl2.$capture$.map(getObject), qrl2.$capture$ = null);
  }
});
const TaskSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => isSubscriberDescriptor(v),
  $collect$: (v, collector, leaks) => {
    collectValue(v.$qrl$, collector, leaks), v.$state$ && (collectValue(v.$state$, collector, leaks), true === leaks && v.$state$ instanceof SignalImpl && collectSubscriptions(v.$state$[QObjectManagerSymbol], collector, true));
  },
  $serialize$: (obj, getObjId) => serializeTask(obj, getObjId),
  $prepare$: (data) => parseTask(data),
  $fill$: (task, getObject) => {
    task.$el$ = getObject(task.$el$), task.$qrl$ = getObject(task.$qrl$), task.$state$ && (task.$state$ = getObject(task.$state$));
  }
});
const ResourceSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => isResourceReturn(v),
  $collect$: (obj, collector, leaks) => {
    collectValue(obj.value, collector, leaks), collectValue(obj._resolved, collector, leaks);
  },
  $serialize$: (obj, getObjId) => serializeResource(obj, getObjId),
  $prepare$: (data) => parseResourceReturn(data),
  $fill$: (resource, getObject) => {
    if ("resolved" === resource._state) {
      resource._resolved = getObject(resource._resolved), resource.value = Promise.resolve(resource._resolved);
    } else if ("rejected" === resource._state) {
      const p2 = Promise.reject(resource._error);
      p2.catch(() => null), resource._error = getObject(resource._error), resource.value = p2;
    }
  }
});
const URLSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => v instanceof URL,
  $serialize$: (obj) => obj.href,
  $prepare$: (data) => new URL(data)
});
const DateSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => v instanceof Date,
  $serialize$: (obj) => obj.toISOString(),
  $prepare$: (data) => new Date(data)
});
const RegexSerializer = /* @__PURE__ */ serializer({
  $prefix$: "\x07",
  $test$: (v) => v instanceof RegExp,
  $serialize$: (obj) => `${obj.flags} ${obj.source}`,
  $prepare$: (data) => {
    const space = data.indexOf(" ");
    const source = data.slice(space + 1);
    const flags = data.slice(0, space);
    return new RegExp(source, flags);
  }
});
const ErrorSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => v instanceof Error,
  $serialize$: (obj) => obj.message,
  $prepare$: (text) => {
    const err = new Error(text);
    return err.stack = void 0, err;
  }
});
const DocumentSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => !!v && "object" == typeof v && isDocument(v),
  $prepare$: (_, _c, doc) => doc
});
const SERIALIZABLE_STATE = /* @__PURE__ */ Symbol("serializable-data");
const ComponentSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (obj) => isQwikComponent(obj),
  $serialize$: (obj, getObjId) => {
    const [qrl2] = obj[SERIALIZABLE_STATE];
    return serializeQRL(qrl2, {
      $getObjId$: getObjId
    });
  },
  $prepare$: (data, containerState) => {
    const qrl2 = parseQRL(data, containerState.$containerEl$);
    return componentQrl(qrl2);
  },
  $fill$: (component, getObject) => {
    const [qrl2] = component[SERIALIZABLE_STATE];
    qrl2.$capture$?.length && (qrl2.$captureRef$ = qrl2.$capture$.map(getObject), qrl2.$capture$ = null);
  }
});
const DerivedSignalSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (obj) => obj instanceof SignalDerived,
  $collect$: (obj, collector, leaks) => {
    if (obj.$args$) {
      for (const arg of obj.$args$) {
        collectValue(arg, collector, leaks);
      }
    }
  },
  $serialize$: (signal, getObjID, collector) => {
    const serialized = serializeDerivedSignalFunc(signal);
    let index = collector.$inlinedFunctions$.indexOf(serialized);
    return index < 0 && (index = collector.$inlinedFunctions$.length, collector.$inlinedFunctions$.push(serialized)), mapJoin(signal.$args$, getObjID, " ") + " @" + intToStr(index);
  },
  $prepare$: (data) => {
    const ids = data.split(" ");
    const args = ids.slice(0, -1);
    const fn = ids[ids.length - 1];
    return new SignalDerived(fn, args, fn);
  },
  $fill$: (fn, getObject) => {
    assertString(fn.$func$), fn.$func$ = getObject(fn.$func$), fn.$args$ = fn.$args$.map(getObject);
  }
});
const SignalSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => v instanceof SignalImpl,
  $collect$: (obj, collector, leaks) => {
    collectValue(obj.untrackedValue, collector, leaks);
    return true === leaks && 0 === (obj[QObjectSignalFlags] & SIGNAL_IMMUTABLE) && collectSubscriptions(obj[QObjectManagerSymbol], collector, true), obj;
  },
  $serialize$: (obj, getObjId) => getObjId(obj.untrackedValue),
  $prepare$: (data, containerState) => new SignalImpl(data, containerState?.$subsManager$?.$createManager$(), 0),
  $subs$: (signal, subs) => {
    signal[QObjectManagerSymbol].$addSubs$(subs);
  },
  $fill$: (signal, getObject) => {
    signal.untrackedValue = getObject(signal.untrackedValue);
  }
});
const SignalWrapperSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => v instanceof SignalWrapper,
  $collect$(obj, collector, leaks) {
    if (collectValue(obj.ref, collector, leaks), fastWeakSerialize(obj.ref)) {
      const localManager = getSubscriptionManager(obj.ref);
      isTreeShakeable(collector.$containerState$.$subsManager$, localManager, leaks) && collectValue(obj.ref[obj.prop], collector, leaks);
    }
    return obj;
  },
  $serialize$: (obj, getObjId) => `${getObjId(obj.ref)} ${obj.prop}`,
  $prepare$: (data) => {
    const [id, prop] = data.split(" ");
    return new SignalWrapper(id, prop);
  },
  $fill$: (signal, getObject) => {
    signal.ref = getObject(signal.ref);
  }
});
const NoFiniteNumberSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => "number" == typeof v,
  $serialize$: (v) => String(v),
  $prepare$: (data) => Number(data)
});
const URLSearchParamsSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => v instanceof URLSearchParams,
  $serialize$: (obj) => obj.toString(),
  $prepare$: (data) => new URLSearchParams(data)
});
const FormDataSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => "undefined" != typeof FormData && v instanceof globalThis.FormData,
  $serialize$: (formData) => {
    const array = [];
    return formData.forEach((value, key) => {
      array.push("string" == typeof value ? [key, value] : [key, value.name]);
    }), JSON.stringify(array);
  },
  $prepare$: (data) => {
    const array = JSON.parse(data);
    const formData = new FormData();
    for (const [key, value] of array) {
      formData.append(key, value);
    }
    return formData;
  }
});
const JSXNodeSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => isJSXNode(v),
  $collect$: (node, collector, leaks) => {
    collectValue(node.children, collector, leaks), collectValue(node.props, collector, leaks), collectValue(node.immutableProps, collector, leaks), collectValue(node.key, collector, leaks);
    let type = node.type;
    type === Slot ? type = ":slot" : type === Fragment && (type = ":fragment"), collectValue(type, collector, leaks);
  },
  $serialize$: (node, getObjID) => {
    let type = node.type;
    return type === Slot ? type = ":slot" : type === Fragment && (type = ":fragment"), `${getObjID(type)} ${getObjID(node.props)} ${getObjID(node.immutableProps)} ${getObjID(node.key)} ${getObjID(node.children)} ${node.flags}`;
  },
  $prepare$: (data) => {
    const [type, props, immutableProps, key, children, flags] = data.split(" ");
    return new JSXNodeImpl(type, props, immutableProps, children, parseInt(flags, 10), key);
  },
  $fill$: (node, getObject) => {
    node.type = getResolveJSXType(getObject(node.type)), node.props = getObject(node.props), node.immutableProps = getObject(node.immutableProps), node.key = getObject(node.key), node.children = getObject(node.children);
  }
});
const BigIntSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => "bigint" == typeof v,
  $serialize$: (v) => v.toString(),
  $prepare$: (data) => BigInt(data)
});
const Uint8ArraySerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => v instanceof Uint8Array,
  $serialize$: (v) => {
    let buf = "";
    for (const c of v) {
      buf += String.fromCharCode(c);
    }
    return btoa(buf).replace(/=+$/, "");
  },
  $prepare$: (data) => {
    const buf = atob(data);
    const bytes = new Uint8Array(buf.length);
    let i = 0;
    for (const s of buf) {
      bytes[i++] = s.charCodeAt(0);
    }
    return bytes;
  },
  $fill$: void 0
});
const DATA = /* @__PURE__ */ Symbol();
const SetSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => v instanceof Set,
  $collect$: (set, collector, leaks) => {
    set.forEach((value) => collectValue(value, collector, leaks));
  },
  $serialize$: (v, getObjID) => Array.from(v).map(getObjID).join(" "),
  $prepare$: (data) => {
    const set = /* @__PURE__ */ new Set();
    return set[DATA] = data, set;
  },
  $fill$: (set, getObject) => {
    const data = set[DATA];
    set[DATA] = void 0;
    const items = 0 === data.length ? [] : data.split(" ");
    for (const id of items) {
      set.add(getObject(id));
    }
  }
});
const MapSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => v instanceof Map,
  $collect$: (map, collector, leaks) => {
    map.forEach((value, key) => {
      collectValue(value, collector, leaks), collectValue(key, collector, leaks);
    });
  },
  $serialize$: (map, getObjID) => {
    const result = [];
    return map.forEach((value, key) => {
      result.push(getObjID(key) + " " + getObjID(value));
    }), result.join(" ");
  },
  $prepare$: (data) => {
    const set = /* @__PURE__ */ new Map();
    return set[DATA] = data, set;
  },
  $fill$: (set, getObject) => {
    const data = set[DATA];
    set[DATA] = void 0;
    const items = 0 === data.length ? [] : data.split(" ");
    assertTrue(items.length % 2 == 0);
    for (let i = 0; i < items.length; i += 2) {
      set.set(getObject(items[i]), getObject(items[i + 1]));
    }
  }
});
const StringSerializer = /* @__PURE__ */ serializer({
  $prefix$: "\x1B",
  $test$: (v) => !!getSerializer(v) || v === UNDEFINED_PREFIX,
  $serialize$: (v) => v,
  $prepare$: (data) => data
});
const serializers = [QRLSerializer, TaskSerializer, ResourceSerializer, URLSerializer, DateSerializer, RegexSerializer, ErrorSerializer, DocumentSerializer, ComponentSerializer, DerivedSignalSerializer, SignalSerializer, SignalWrapperSerializer, NoFiniteNumberSerializer, URLSearchParamsSerializer, FormDataSerializer, JSXNodeSerializer, BigIntSerializer, SetSerializer, MapSerializer, StringSerializer, Uint8ArraySerializer];
const serializerByPrefix = /* @__PURE__ */ (() => {
  const serializerByPrefix2 = [];
  return serializers.forEach((s) => {
    const prefix = s.$prefixCode$;
    for (; serializerByPrefix2.length < prefix; ) {
      serializerByPrefix2.push(void 0);
    }
    serializerByPrefix2.push(s);
  }), serializerByPrefix2;
})();
function getSerializer(obj) {
  if ("string" == typeof obj) {
    const prefix = obj.charCodeAt(0);
    if (prefix < serializerByPrefix.length) {
      return serializerByPrefix[prefix];
    }
  }
}
const collectorSerializers = /* @__PURE__ */ serializers.filter((a2) => a2.$collect$);
const canSerialize = (obj) => {
  for (const s of serializers) {
    if (s.$test$(obj)) {
      return true;
    }
  }
  return false;
};
const collectDeps = (obj, collector, leaks) => {
  for (const s of collectorSerializers) {
    if (s.$test$(obj)) {
      return s.$collect$(obj, collector, leaks), true;
    }
  }
  return false;
};
const serializeValue = (obj, getObjID, collector, containerState) => {
  for (const s of serializers) {
    if (s.$test$(obj)) {
      let value = s.$prefixChar$;
      return s.$serialize$ && (value += s.$serialize$(obj, getObjID, collector, containerState)), value;
    }
  }
  if ("string" == typeof obj) {
    return obj;
  }
};
const createParser = (containerState, doc) => {
  const fillMap = /* @__PURE__ */ new Map();
  const subsMap = /* @__PURE__ */ new Map();
  return {
    prepare(data) {
      const serializer2 = getSerializer(data);
      if (serializer2) {
        const value = serializer2.$prepare$(data.slice(1), containerState, doc);
        return serializer2.$fill$ && fillMap.set(value, serializer2), serializer2.$subs$ && subsMap.set(value, serializer2), value;
      }
      return data;
    },
    subs(obj, subs) {
      const serializer2 = subsMap.get(obj);
      return !!serializer2 && (serializer2.$subs$(obj, subs, containerState), true);
    },
    fill(obj, getObject) {
      const serializer2 = fillMap.get(obj);
      return !!serializer2 && (serializer2.$fill$(obj, getObject, containerState), true);
    }
  };
};
const OBJECT_TRANSFORMS = {
  "!": (obj, containerState) => containerState.$proxyMap$.get(obj) ?? getOrCreateProxy(obj, containerState),
  "~": (obj) => Promise.resolve(obj),
  _: (obj) => Promise.reject(obj)
};
const isTreeShakeable = (manager, target, leaks) => {
  if ("boolean" == typeof leaks) {
    return leaks;
  }
  const localManager = manager.$groupToManagers$.get(leaks);
  return !!(localManager && localManager.length > 0) && (1 !== localManager.length || localManager[0] !== target);
};
const getResolveJSXType = (type) => ":slot" === type ? Slot : ":fragment" === type ? Fragment : type;
const verifySerializable = (value, preMessage) => {
  const seen = /* @__PURE__ */ new Set();
  return _verifySerializable(value, seen, "_", preMessage);
};
const _verifySerializable = (value, seen, ctx, preMessage) => {
  const unwrapped = unwrapProxy(value);
  if (null == unwrapped) {
    return value;
  }
  if (shouldSerialize(unwrapped)) {
    if (seen.has(unwrapped)) {
      return value;
    }
    if (seen.add(unwrapped), canSerialize(unwrapped)) {
      return value;
    }
    const typeObj = typeof unwrapped;
    switch (typeObj) {
      case "object":
        if (isPromise$1(unwrapped)) {
          return value;
        }
        if (isNode$1(unwrapped)) {
          return value;
        }
        if (isArray(unwrapped)) {
          let expectIndex = 0;
          return unwrapped.forEach((v, i) => {
            if (i !== expectIndex) {
              throw qError(3, unwrapped);
            }
            _verifySerializable(v, seen, ctx + "[" + i + "]"), expectIndex = i + 1;
          }), value;
        }
        if (isSerializableObject(unwrapped)) {
          for (const [key, item] of Object.entries(unwrapped)) {
            _verifySerializable(item, seen, ctx + "." + key);
          }
          return value;
        }
        break;
      case "boolean":
      case "string":
      case "number":
        return value;
    }
    let message = "";
    if (message = preMessage || "Value cannot be serialized", "_" !== ctx && (message += ` in ${ctx},`), "object" === typeObj) {
      message += ` because it's an instance of "${value?.constructor.name}". You might need to use 'noSerialize()' or use an object literal instead. Check out https://qwik.dev/docs/advanced/dollar/`;
    } else if ("function" === typeObj) {
      const fnName = value.name;
      message += ` because it's a function named "${fnName}". You might need to convert it to a QRL using $(fn):

const ${fnName} = $(${String(value)});

Please check out https://qwik.dev/docs/advanced/qrl/ for more information.`;
    }
    console.error("Trying to serialize", value), throwErrorAndStop(message);
  }
  return value;
};
const noSerializeSet = /* @__PURE__ */ new WeakSet();
const weakSerializeSet = /* @__PURE__ */ new WeakSet();
const shouldSerialize = (obj) => !isObject(obj) && !isFunction(obj) || !noSerializeSet.has(obj);
const fastSkipSerialize = (obj) => noSerializeSet.has(obj);
const fastWeakSerialize = (obj) => weakSerializeSet.has(obj);
const noSerialize = (input) => (("object" == typeof input && null !== input || "function" == typeof input) && noSerializeSet.add(input), input);
const _weakSerialize = (input) => (weakSerializeSet.add(input), input);
const unwrapProxy = (proxy) => isObject(proxy) ? getProxyTarget(proxy) ?? proxy : proxy;
const getProxyTarget = (obj) => obj[QOjectTargetSymbol];
const getSubscriptionManager = (obj) => obj[QObjectManagerSymbol];
const getProxyFlags = (obj) => obj[QObjectFlagsSymbol];
const serializeSubscription = (sub, getObjId) => {
  const type = sub[0];
  const host = "string" == typeof sub[1] ? sub[1] : getObjId(sub[1]);
  if (!host) {
    return;
  }
  let base = type + " " + host;
  let key;
  if (0 === type) {
    key = sub[2];
  } else {
    const signalID = getObjId(sub[2]);
    if (!signalID) {
      return;
    }
    if (type <= 2) {
      key = sub[5], base += ` ${signalID} ${must(getObjId(sub[3]))} ${sub[4]}`;
    } else if (type <= 4) {
      key = sub[4];
      base += ` ${signalID} ${"string" == typeof sub[3] ? sub[3] : must(getObjId(sub[3]))}`;
    } else ;
  }
  return key && (base += ` ${encodeURI(key)}`), base;
};
const parseSubscription = (sub, getObject) => {
  const parts = sub.split(" ");
  const type = parseInt(parts[0], 10);
  assertTrue(parts.length >= 2);
  const host = getObject(parts[1]);
  if (!host) {
    return;
  }
  if (isSubscriberDescriptor(host) && !host.$el$) {
    return;
  }
  const subscription = [type, host];
  return 0 === type ? (assertTrue(parts.length <= 3), subscription.push(safeDecode(parts[2]))) : type <= 2 ? (assertTrue(5 === parts.length || 6 === parts.length), subscription.push(getObject(parts[2]), getObject(parts[3]), parts[4], safeDecode(parts[5]))) : type <= 4 && (assertTrue(4 === parts.length || 5 === parts.length), subscription.push(getObject(parts[2]), getObject(parts[3]), safeDecode(parts[4]))), subscription;
};
const safeDecode = (str) => {
  if (void 0 !== str) {
    return decodeURI(str);
  }
};
const createSubscriptionManager = (containerState) => {
  const groupToManagers = /* @__PURE__ */ new Map();
  const manager = {
    $groupToManagers$: groupToManagers,
    $createManager$: (initialMap) => new LocalSubscriptionManager(groupToManagers, containerState, initialMap),
    $clearSub$: (group) => {
      const managers = groupToManagers.get(group);
      if (managers) {
        for (const manager2 of managers) {
          manager2.$unsubGroup$(group);
        }
        groupToManagers.delete(group), managers.length = 0;
      }
    },
    $clearSignal$: (signal) => {
      const managers = groupToManagers.get(signal[1]);
      if (managers) {
        for (const manager2 of managers) {
          manager2.$unsubEntry$(signal);
        }
      }
    }
  };
  return manager;
};
class LocalSubscriptionManager {
  $groupToManagers$;
  $containerState$;
  $subs$;
  constructor($groupToManagers$, $containerState$, initialMap) {
    this.$groupToManagers$ = $groupToManagers$, this.$containerState$ = $containerState$, this.$subs$ = [], initialMap && this.$addSubs$(initialMap);
  }
  $addSubs$(subs) {
    this.$subs$.push(...subs);
    for (const sub of this.$subs$) {
      this.$addToGroup$(sub[1], this);
    }
  }
  $addToGroup$(group, manager) {
    let managers = this.$groupToManagers$.get(group);
    managers || this.$groupToManagers$.set(group, managers = []), managers.includes(manager) || managers.push(manager);
  }
  $unsubGroup$(group) {
    const subs = this.$subs$;
    for (let i = 0; i < subs.length; i++) {
      subs[i][1] === group && (subs.splice(i, 1), i--);
    }
  }
  $unsubEntry$(entry) {
    const [type, group, signal, elm] = entry;
    const subs = this.$subs$;
    if (1 === type || 2 === type) {
      const prop = entry[4];
      for (let i = 0; i < subs.length; i++) {
        const sub = subs[i];
        sub[0] === type && sub[1] === group && sub[2] === signal && sub[3] === elm && sub[4] === prop && (subs.splice(i, 1), i--);
      }
    } else if (3 === type || 4 === type) {
      for (let i = 0; i < subs.length; i++) {
        const sub = subs[i];
        sub[0] === type && sub[1] === group && sub[2] === signal && sub[3] === elm && (subs.splice(i, 1), i--);
      }
    }
  }
  $addSub$(sub, key) {
    const subs = this.$subs$;
    const group = sub[1];
    0 === sub[0] && subs.some(([_type, _group, _key]) => 0 === _type && _group === group && _key === key) || (subs.push(__lastSubscription = [...sub, key]), this.$addToGroup$(group, this));
  }
  $notifySubs$(key) {
    const subs = this.$subs$;
    for (const sub of subs) {
      const compare = sub[sub.length - 1];
      key && compare && compare !== key || notifyChange(sub, this.$containerState$);
    }
  }
}
let __lastSubscription;
function getLastSubscription() {
  return __lastSubscription;
}
const must = (a2) => {
  if (null == a2) {
    throw logError("must be non null", a2);
  }
  return a2;
};
const isQrl = (value) => "function" == typeof value && "function" == typeof value.getSymbol;
const isSyncQrl = (value) => isQrl(value) && "<sync>" == value.$symbol$;
const createQRL = (chunk, symbol, symbolRef, symbolFn, capture, captureRef, refSymbol) => {
  let _containerEl;
  const qrl2 = async function(...args) {
    const fn = invokeFn.call(this, tryGetInvokeContext());
    return await fn(...args);
  };
  const setContainer = (el) => (_containerEl || (_containerEl = el), _containerEl);
  const wrapFn = (fn) => "function" != typeof fn || !capture?.length && !captureRef?.length ? fn : function(...args) {
    let context = tryGetInvokeContext();
    if (context) {
      const prevQrl = context.$qrl$;
      context.$qrl$ = qrl2;
      const prevEvent = context.$event$;
      void 0 === context.$event$ && (context.$event$ = this);
      try {
        return fn.apply(this, args);
      } finally {
        context.$qrl$ = prevQrl, context.$event$ = prevEvent;
      }
    }
    return context = newInvokeContext(), context.$qrl$ = qrl2, context.$event$ = this, invoke.call(this, context, fn, ...args);
  };
  const resolve = async (containerEl) => {
    if (null !== symbolRef) {
      return symbolRef;
    }
    if (containerEl && setContainer(containerEl), "" === chunk) {
      const hash3 = _containerEl.getAttribute(QInstance);
      const qFuncs = getQFuncs(_containerEl.ownerDocument, hash3);
      return qrl2.resolved = symbolRef = qFuncs[Number(symbol)];
    }
    const start = now();
    const ctx = tryGetInvokeContext();
    {
      const imported = getPlatform().importSymbol(_containerEl, chunk, symbol);
      symbolRef = maybeThen(imported, (ref) => qrl2.resolved = symbolRef = wrapFn(ref));
    }
    return "object" == typeof symbolRef && isPromise$1(symbolRef) && symbolRef.then(() => emitUsedSymbol(symbol, ctx?.$element$, start), (err) => {
      console.error(`qrl ${symbol} failed to load`, err), symbolRef = null;
    }), symbolRef;
  };
  const resolveLazy = (containerEl) => null !== symbolRef ? symbolRef : resolve(containerEl);
  function invokeFn(currentCtx, beforeFn) {
    return (...args) => maybeThen(resolveLazy(), (f) => {
      if (!isFunction(f)) {
        throw qError(10);
      }
      if (beforeFn && false === beforeFn()) {
        return;
      }
      const context = createOrReuseInvocationContext(currentCtx);
      return invoke.call(this, context, f, ...args);
    });
  }
  const createOrReuseInvocationContext = (invoke2) => null == invoke2 ? newInvokeContext() : isArray(invoke2) ? newInvokeContextFromTuple(invoke2) : invoke2;
  const resolvedSymbol = refSymbol ?? symbol;
  const hash2 = getSymbolHash(resolvedSymbol);
  return Object.assign(qrl2, {
    getSymbol: () => resolvedSymbol,
    getHash: () => hash2,
    getCaptured: () => captureRef,
    resolve,
    $resolveLazy$: resolveLazy,
    $setContainer$: setContainer,
    $chunk$: chunk,
    $symbol$: symbol,
    $refSymbol$: refSymbol,
    $hash$: hash2,
    getFn: invokeFn,
    $capture$: capture,
    $captureRef$: captureRef,
    dev: null,
    resolved: void 0
  }), symbolRef && (symbolRef = maybeThen(symbolRef, (resolved) => qrl2.resolved = symbolRef = wrapFn(resolved))), qrl2;
};
const getSymbolHash = (symbolName) => {
  const index = symbolName.lastIndexOf("_");
  return index > -1 ? symbolName.slice(index + 1) : symbolName;
};
function assertQrl() {
}
function assertSignal() {
}
const EMITTED = /* @__PURE__ */ new Set();
const emitUsedSymbol = (symbol, element, reqTime) => {
  EMITTED.has(symbol) || (EMITTED.add(symbol), emitEvent("qsymbol", {
    symbol,
    element,
    reqTime
  }));
};
const emitEvent = (eventName, detail) => {
  isServerPlatform() || "object" != typeof document || document.dispatchEvent(new CustomEvent(eventName, {
    bubbles: false,
    detail
  }));
};
const now = () => isServerPlatform() ? 0 : "object" == typeof performance ? performance.now() : 0;
const eventQrl = (qrl2) => qrl2;
const _qrlSync = function(fn, serializedFn) {
  return fn.serialized = serializedFn, createQRL("", "<sync>", fn, null, null, null, null);
};
const componentQrl = (componentQrl2) => {
  function QwikComponent(props, key, flags) {
    const finalKey = componentQrl2.$hash$.slice(0, 4) + ":" + (key || "");
    return _jsxC(Virtual, {
      [OnRenderProp]: componentQrl2,
      [QSlot]: props[QSlot],
      [_IMMUTABLE]: props[_IMMUTABLE],
      children: props.children,
      props
    }, flags, finalKey);
  }
  return QwikComponent[SERIALIZABLE_STATE] = [componentQrl2], QwikComponent;
};
const isQwikComponent = (component) => "function" == typeof component && void 0 !== component[SERIALIZABLE_STATE];
const useStore = (initialState, opts) => {
  const { val, set, iCtx } = useSequentialScope();
  if (null != val) {
    return val;
  }
  const value = isFunction(initialState) ? invoke(void 0, initialState) : initialState;
  if (false === opts?.reactive) {
    return set(value), value;
  }
  {
    const newStore = getOrCreateProxy(value, iCtx.$renderCtx$.$static$.$containerState$, opts?.deep ?? true ? 1 : 0);
    return set(newStore), newStore;
  }
};
function useServerData(key, defaultValue) {
  const ctx = tryGetInvokeContext();
  return ctx?.$renderCtx$?.$static$.$containerState$.$serverData$[key] ?? defaultValue;
}
const STYLE_CACHE = /* @__PURE__ */ new Map();
const getScopedStyles = (css, scopeId) => {
  let styleCss = STYLE_CACHE.get(scopeId);
  return styleCss || STYLE_CACHE.set(scopeId, styleCss = scopeStylesheet(css, scopeId)), styleCss;
};
const scopeStylesheet = (css, scopeId) => {
  const end = css.length;
  const out = [];
  const stack = [];
  let idx = 0;
  let lastIdx = idx;
  let mode = rule;
  let lastCh = 0;
  for (; idx < end; ) {
    const chIdx = idx;
    let ch = css.charCodeAt(idx++);
    ch === BACKSLASH && (idx++, ch = A);
    const arcs = STATE_MACHINE[mode];
    for (let i = 0; i < arcs.length; i++) {
      const arc = arcs[i];
      const [expectLastCh, expectCh, newMode] = arc;
      if ((expectLastCh === lastCh || expectLastCh === ANY || expectLastCh === IDENT && isIdent(lastCh) || expectLastCh === WHITESPACE && isWhiteSpace(lastCh)) && (expectCh === ch || expectCh === ANY || expectCh === IDENT && isIdent(ch) || expectCh === NOT_IDENT && !isIdent(ch) && ch !== DOT || expectCh === WHITESPACE && isWhiteSpace(ch)) && (3 == arc.length || lookAhead(arc))) {
        if (arc.length > 3 && (ch = css.charCodeAt(idx - 1)), newMode === EXIT || newMode == EXIT_INSERT_SCOPE) {
          if (newMode === EXIT_INSERT_SCOPE) {
            if (mode !== starSelector || shouldNotInsertScoping()) {
              if (!isChainedSelector(ch)) {
                insertScopingSelector(idx - (expectCh == NOT_IDENT ? 1 : expectCh == CLOSE_PARENTHESIS ? 2 : 0));
              }
            } else {
              isChainedSelector(ch) ? flush(idx - 2) : insertScopingSelector(idx - 2), lastIdx++;
            }
          }
          expectCh === NOT_IDENT && (idx--, ch = lastCh);
          do {
            mode = stack.pop() || rule, mode === pseudoGlobal && (flush(idx - 1), lastIdx++);
          } while (isSelfClosingRule(mode));
        } else {
          stack.push(mode), mode === pseudoGlobal && newMode === rule ? (flush(idx - 8), lastIdx = idx) : newMode === pseudoElement && insertScopingSelector(chIdx), mode = newMode;
        }
        break;
      }
    }
    lastCh = ch;
  }
  return flush(idx), out.join("");
  function flush(idx2) {
    out.push(css.substring(lastIdx, idx2)), lastIdx = idx2;
  }
  function insertScopingSelector(idx2) {
    mode === pseudoGlobal || shouldNotInsertScoping() || (flush(idx2), out.push(".", "⭐️", scopeId));
  }
  function lookAhead(arc) {
    let prefix = 0;
    if (css.charCodeAt(idx) === DASH) {
      for (let i = 1; i < 10; i++) {
        if (css.charCodeAt(idx + i) === DASH) {
          prefix = i + 1;
          break;
        }
      }
    }
    words: for (let arcIndx = 3; arcIndx < arc.length; arcIndx++) {
      const txt = arc[arcIndx];
      for (let i = 0; i < txt.length; i++) {
        if ((css.charCodeAt(idx + i + prefix) | LOWERCASE) !== txt.charCodeAt(i)) {
          continue words;
        }
      }
      return idx += txt.length + prefix, true;
    }
    return false;
  }
  function shouldNotInsertScoping() {
    return -1 !== stack.indexOf(pseudoGlobal) || -1 !== stack.indexOf(atRuleSelector);
  }
};
const isIdent = (ch) => ch >= _0 && ch <= _9 || ch >= A && ch <= Z || ch >= a && ch <= z$2 || ch >= 128 || ch === UNDERSCORE || ch === DASH;
const isChainedSelector = (ch) => ch === COLON || ch === DOT || ch === OPEN_BRACKET || ch === HASH || isIdent(ch);
const isSelfClosingRule = (mode) => mode === atRuleBlock || mode === atRuleSelector || mode === atRuleInert || mode === pseudoGlobal;
const isWhiteSpace = (ch) => ch === SPACE || ch === TAB || ch === NEWLINE || ch === CARRIAGE_RETURN;
const rule = 0;
const starSelector = 2;
const pseudoGlobal = 5;
const pseudoElement = 6;
const atRuleSelector = 10;
const atRuleBlock = 11;
const atRuleInert = 12;
const EXIT = 17;
const EXIT_INSERT_SCOPE = 18;
const ANY = 0;
const IDENT = 1;
const NOT_IDENT = 2;
const WHITESPACE = 3;
const TAB = 9;
const NEWLINE = 10;
const CARRIAGE_RETURN = 13;
const SPACE = 32;
const HASH = 35;
const CLOSE_PARENTHESIS = 41;
const DASH = 45;
const DOT = 46;
const _0 = 48;
const _9 = 57;
const COLON = 58;
const A = 65;
const Z = 90;
const OPEN_BRACKET = 91;
const BACKSLASH = 92;
const UNDERSCORE = 95;
const LOWERCASE = 32;
const a = 97;
const z$2 = 122;
const STRINGS_COMMENTS = [[ANY, 39, 14], [ANY, 34, 15], [ANY, 47, 16, "*"]];
const STATE_MACHINE = [[[ANY, 42, starSelector], [ANY, OPEN_BRACKET, 7], [ANY, COLON, pseudoElement, ":", "before", "after", "first-letter", "first-line"], [ANY, COLON, pseudoGlobal, "global"], [ANY, COLON, 3, "has", "host-context", "not", "where", "is", "matches", "any"], [ANY, COLON, 4], [ANY, IDENT, 1], [ANY, DOT, 1], [ANY, HASH, 1], [ANY, 64, atRuleSelector, "keyframe"], [ANY, 64, atRuleBlock, "media", "supports", "container"], [ANY, 64, atRuleInert], [ANY, 123, 13], [47, 42, 16], [ANY, 59, EXIT], [ANY, 125, EXIT], [ANY, CLOSE_PARENTHESIS, EXIT], ...STRINGS_COMMENTS], [[ANY, NOT_IDENT, EXIT_INSERT_SCOPE]], [[ANY, NOT_IDENT, EXIT_INSERT_SCOPE]], [[ANY, 40, rule], [ANY, NOT_IDENT, EXIT_INSERT_SCOPE]], [[ANY, 40, 8], [ANY, NOT_IDENT, EXIT_INSERT_SCOPE]], [[ANY, 40, rule], [ANY, NOT_IDENT, EXIT]], [[ANY, NOT_IDENT, EXIT]], [[ANY, 93, EXIT_INSERT_SCOPE], [ANY, 39, 14], [ANY, 34, 15]], [[ANY, CLOSE_PARENTHESIS, EXIT], ...STRINGS_COMMENTS], [[ANY, 125, EXIT], ...STRINGS_COMMENTS], [[ANY, 125, EXIT], [WHITESPACE, IDENT, 1], [ANY, COLON, pseudoGlobal, "global"], [ANY, 123, 13], ...STRINGS_COMMENTS], [[ANY, 123, rule], [ANY, 59, EXIT], ...STRINGS_COMMENTS], [[ANY, 59, EXIT], [ANY, 123, 9], ...STRINGS_COMMENTS], [[ANY, 125, EXIT], [ANY, 123, 13], [ANY, 40, 8], ...STRINGS_COMMENTS], [[ANY, 39, EXIT]], [[ANY, 34, EXIT]], [[42, 47, EXIT]]];
const useStylesQrl = (styles) => {
  _useStyles(styles, (str) => str, false);
};
const useStylesScopedQrl = (styles) => ({
  scopeId: "⭐️" + _useStyles(styles, getScopedStyles, true)
});
const _useStyles = (styleQrl, transform, scoped) => {
  const { val, set, iCtx, i, elCtx } = useSequentialScope();
  if (val) {
    return val;
  }
  const styleId = styleKey(styleQrl, i);
  const containerState = iCtx.$renderCtx$.$static$.$containerState$;
  if (set(styleId), elCtx.$appendStyles$ || (elCtx.$appendStyles$ = []), elCtx.$scopeIds$ || (elCtx.$scopeIds$ = []), scoped && elCtx.$scopeIds$.push(styleContent(styleId)), containerState.$styleIds$.has(styleId)) {
    return styleId;
  }
  containerState.$styleIds$.add(styleId);
  const value = styleQrl.$resolveLazy$(containerState.$containerEl$);
  const appendStyle = (styleText) => {
    assertDefined(elCtx.$appendStyles$), elCtx.$appendStyles$.push({
      styleId,
      content: transform(styleText, styleId)
    });
  };
  return isPromise$1(value) ? iCtx.$waitOn$.push(value.then(appendStyle)) : appendStyle(value), styleId;
};

var util;
(function (util) {
    util.assertEqual = (_) => { };
    function assertIs(_arg) { }
    util.assertIs = assertIs;
    function assertNever(_x) {
        throw new Error();
    }
    util.assertNever = assertNever;
    util.arrayToEnum = (items) => {
        const obj = {};
        for (const item of items) {
            obj[item] = item;
        }
        return obj;
    };
    util.getValidEnumValues = (obj) => {
        const validKeys = util.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
        const filtered = {};
        for (const k of validKeys) {
            filtered[k] = obj[k];
        }
        return util.objectValues(filtered);
    };
    util.objectValues = (obj) => {
        return util.objectKeys(obj).map(function (e) {
            return obj[e];
        });
    };
    util.objectKeys = typeof Object.keys === "function" // eslint-disable-line ban/ban
        ? (obj) => Object.keys(obj) // eslint-disable-line ban/ban
        : (object) => {
            const keys = [];
            for (const key in object) {
                if (Object.prototype.hasOwnProperty.call(object, key)) {
                    keys.push(key);
                }
            }
            return keys;
        };
    util.find = (arr, checker) => {
        for (const item of arr) {
            if (checker(item))
                return item;
        }
        return undefined;
    };
    util.isInteger = typeof Number.isInteger === "function"
        ? (val) => Number.isInteger(val) // eslint-disable-line ban/ban
        : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
    function joinValues(array, separator = " | ") {
        return array.map((val) => (typeof val === "string" ? `'${val}'` : val)).join(separator);
    }
    util.joinValues = joinValues;
    util.jsonStringifyReplacer = (_, value) => {
        if (typeof value === "bigint") {
            return value.toString();
        }
        return value;
    };
})(util || (util = {}));
var objectUtil;
(function (objectUtil) {
    objectUtil.mergeShapes = (first, second) => {
        return {
            ...first,
            ...second, // second overwrites first
        };
    };
})(objectUtil || (objectUtil = {}));
const ZodParsedType = util.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set",
]);
const getParsedType = (data) => {
    const t = typeof data;
    switch (t) {
        case "undefined":
            return ZodParsedType.undefined;
        case "string":
            return ZodParsedType.string;
        case "number":
            return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
        case "boolean":
            return ZodParsedType.boolean;
        case "function":
            return ZodParsedType.function;
        case "bigint":
            return ZodParsedType.bigint;
        case "symbol":
            return ZodParsedType.symbol;
        case "object":
            if (Array.isArray(data)) {
                return ZodParsedType.array;
            }
            if (data === null) {
                return ZodParsedType.null;
            }
            if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
                return ZodParsedType.promise;
            }
            if (typeof Map !== "undefined" && data instanceof Map) {
                return ZodParsedType.map;
            }
            if (typeof Set !== "undefined" && data instanceof Set) {
                return ZodParsedType.set;
            }
            if (typeof Date !== "undefined" && data instanceof Date) {
                return ZodParsedType.date;
            }
            return ZodParsedType.object;
        default:
            return ZodParsedType.unknown;
    }
};

const ZodIssueCode = util.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of",
    "not_finite",
]);
const quotelessJson = (obj) => {
    const json = JSON.stringify(obj, null, 2);
    return json.replace(/"([^"]+)":/g, "$1:");
};
class ZodError extends Error {
    get errors() {
        return this.issues;
    }
    constructor(issues) {
        super();
        this.issues = [];
        this.addIssue = (sub) => {
            this.issues = [...this.issues, sub];
        };
        this.addIssues = (subs = []) => {
            this.issues = [...this.issues, ...subs];
        };
        const actualProto = new.target.prototype;
        if (Object.setPrototypeOf) {
            // eslint-disable-next-line ban/ban
            Object.setPrototypeOf(this, actualProto);
        }
        else {
            this.__proto__ = actualProto;
        }
        this.name = "ZodError";
        this.issues = issues;
    }
    format(_mapper) {
        const mapper = _mapper ||
            function (issue) {
                return issue.message;
            };
        const fieldErrors = { _errors: [] };
        const processError = (error) => {
            for (const issue of error.issues) {
                if (issue.code === "invalid_union") {
                    issue.unionErrors.map(processError);
                }
                else if (issue.code === "invalid_return_type") {
                    processError(issue.returnTypeError);
                }
                else if (issue.code === "invalid_arguments") {
                    processError(issue.argumentsError);
                }
                else if (issue.path.length === 0) {
                    fieldErrors._errors.push(mapper(issue));
                }
                else {
                    let curr = fieldErrors;
                    let i = 0;
                    while (i < issue.path.length) {
                        const el = issue.path[i];
                        const terminal = i === issue.path.length - 1;
                        if (!terminal) {
                            curr[el] = curr[el] || { _errors: [] };
                            // if (typeof el === "string") {
                            //   curr[el] = curr[el] || { _errors: [] };
                            // } else if (typeof el === "number") {
                            //   const errorArray: any = [];
                            //   errorArray._errors = [];
                            //   curr[el] = curr[el] || errorArray;
                            // }
                        }
                        else {
                            curr[el] = curr[el] || { _errors: [] };
                            curr[el]._errors.push(mapper(issue));
                        }
                        curr = curr[el];
                        i++;
                    }
                }
            }
        };
        processError(this);
        return fieldErrors;
    }
    static assert(value) {
        if (!(value instanceof ZodError)) {
            throw new Error(`Not a ZodError: ${value}`);
        }
    }
    toString() {
        return this.message;
    }
    get message() {
        return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
        return this.issues.length === 0;
    }
    flatten(mapper = (issue) => issue.message) {
        const fieldErrors = {};
        const formErrors = [];
        for (const sub of this.issues) {
            if (sub.path.length > 0) {
                fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
                fieldErrors[sub.path[0]].push(mapper(sub));
            }
            else {
                formErrors.push(mapper(sub));
            }
        }
        return { formErrors, fieldErrors };
    }
    get formErrors() {
        return this.flatten();
    }
}
ZodError.create = (issues) => {
    const error = new ZodError(issues);
    return error;
};

const errorMap = (issue, _ctx) => {
    let message;
    switch (issue.code) {
        case ZodIssueCode.invalid_type:
            if (issue.received === ZodParsedType.undefined) {
                message = "Required";
            }
            else {
                message = `Expected ${issue.expected}, received ${issue.received}`;
            }
            break;
        case ZodIssueCode.invalid_literal:
            message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
            break;
        case ZodIssueCode.unrecognized_keys:
            message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
            break;
        case ZodIssueCode.invalid_union:
            message = `Invalid input`;
            break;
        case ZodIssueCode.invalid_union_discriminator:
            message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
            break;
        case ZodIssueCode.invalid_enum_value:
            message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
            break;
        case ZodIssueCode.invalid_arguments:
            message = `Invalid function arguments`;
            break;
        case ZodIssueCode.invalid_return_type:
            message = `Invalid function return type`;
            break;
        case ZodIssueCode.invalid_date:
            message = `Invalid date`;
            break;
        case ZodIssueCode.invalid_string:
            if (typeof issue.validation === "object") {
                if ("includes" in issue.validation) {
                    message = `Invalid input: must include "${issue.validation.includes}"`;
                    if (typeof issue.validation.position === "number") {
                        message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
                    }
                }
                else if ("startsWith" in issue.validation) {
                    message = `Invalid input: must start with "${issue.validation.startsWith}"`;
                }
                else if ("endsWith" in issue.validation) {
                    message = `Invalid input: must end with "${issue.validation.endsWith}"`;
                }
                else {
                    util.assertNever(issue.validation);
                }
            }
            else if (issue.validation !== "regex") {
                message = `Invalid ${issue.validation}`;
            }
            else {
                message = "Invalid";
            }
            break;
        case ZodIssueCode.too_small:
            if (issue.type === "array")
                message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
            else if (issue.type === "string")
                message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
            else if (issue.type === "number")
                message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
            else if (issue.type === "date")
                message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
            else
                message = "Invalid input";
            break;
        case ZodIssueCode.too_big:
            if (issue.type === "array")
                message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
            else if (issue.type === "string")
                message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
            else if (issue.type === "number")
                message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
            else if (issue.type === "bigint")
                message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
            else if (issue.type === "date")
                message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
            else
                message = "Invalid input";
            break;
        case ZodIssueCode.custom:
            message = `Invalid input`;
            break;
        case ZodIssueCode.invalid_intersection_types:
            message = `Intersection results could not be merged`;
            break;
        case ZodIssueCode.not_multiple_of:
            message = `Number must be a multiple of ${issue.multipleOf}`;
            break;
        case ZodIssueCode.not_finite:
            message = "Number must be finite";
            break;
        default:
            message = _ctx.defaultError;
            util.assertNever(issue);
    }
    return { message };
};

let overrideErrorMap = errorMap;
function setErrorMap(map) {
    overrideErrorMap = map;
}
function getErrorMap() {
    return overrideErrorMap;
}

const makeIssue = (params) => {
    const { data, path, errorMaps, issueData } = params;
    const fullPath = [...path, ...(issueData.path || [])];
    const fullIssue = {
        ...issueData,
        path: fullPath,
    };
    if (issueData.message !== undefined) {
        return {
            ...issueData,
            path: fullPath,
            message: issueData.message,
        };
    }
    let errorMessage = "";
    const maps = errorMaps
        .filter((m) => !!m)
        .slice()
        .reverse();
    for (const map of maps) {
        errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
    }
    return {
        ...issueData,
        path: fullPath,
        message: errorMessage,
    };
};
const EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
    const overrideMap = getErrorMap();
    const issue = makeIssue({
        issueData: issueData,
        data: ctx.data,
        path: ctx.path,
        errorMaps: [
            ctx.common.contextualErrorMap, // contextual error map is first priority
            ctx.schemaErrorMap, // then schema-bound map if available
            overrideMap, // then global override map
            overrideMap === errorMap ? undefined : errorMap, // then global default map
        ].filter((x) => !!x),
    });
    ctx.common.issues.push(issue);
}
class ParseStatus {
    constructor() {
        this.value = "valid";
    }
    dirty() {
        if (this.value === "valid")
            this.value = "dirty";
    }
    abort() {
        if (this.value !== "aborted")
            this.value = "aborted";
    }
    static mergeArray(status, results) {
        const arrayValue = [];
        for (const s of results) {
            if (s.status === "aborted")
                return INVALID;
            if (s.status === "dirty")
                status.dirty();
            arrayValue.push(s.value);
        }
        return { status: status.value, value: arrayValue };
    }
    static async mergeObjectAsync(status, pairs) {
        const syncPairs = [];
        for (const pair of pairs) {
            const key = await pair.key;
            const value = await pair.value;
            syncPairs.push({
                key,
                value,
            });
        }
        return ParseStatus.mergeObjectSync(status, syncPairs);
    }
    static mergeObjectSync(status, pairs) {
        const finalObject = {};
        for (const pair of pairs) {
            const { key, value } = pair;
            if (key.status === "aborted")
                return INVALID;
            if (value.status === "aborted")
                return INVALID;
            if (key.status === "dirty")
                status.dirty();
            if (value.status === "dirty")
                status.dirty();
            if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
                finalObject[key.value] = value.value;
            }
        }
        return { status: status.value, value: finalObject };
    }
}
const INVALID = Object.freeze({
    status: "aborted",
});
const DIRTY = (value) => ({ status: "dirty", value });
const OK = (value) => ({ status: "valid", value });
const isAborted = (x) => x.status === "aborted";
const isDirty = (x) => x.status === "dirty";
const isValid = (x) => x.status === "valid";
const isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;

var errorUtil;
(function (errorUtil) {
    errorUtil.errToObj = (message) => typeof message === "string" ? { message } : message || {};
    // biome-ignore lint:
    errorUtil.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));

class ParseInputLazyPath {
    constructor(parent, value, path, key) {
        this._cachedPath = [];
        this.parent = parent;
        this.data = value;
        this._path = path;
        this._key = key;
    }
    get path() {
        if (!this._cachedPath.length) {
            if (Array.isArray(this._key)) {
                this._cachedPath.push(...this._path, ...this._key);
            }
            else {
                this._cachedPath.push(...this._path, this._key);
            }
        }
        return this._cachedPath;
    }
}
const handleResult = (ctx, result) => {
    if (isValid(result)) {
        return { success: true, data: result.value };
    }
    else {
        if (!ctx.common.issues.length) {
            throw new Error("Validation failed but no issues detected.");
        }
        return {
            success: false,
            get error() {
                if (this._error)
                    return this._error;
                const error = new ZodError(ctx.common.issues);
                this._error = error;
                return this._error;
            },
        };
    }
};
function processCreateParams(params) {
    if (!params)
        return {};
    const { errorMap, invalid_type_error, required_error, description } = params;
    if (errorMap && (invalid_type_error || required_error)) {
        throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
    }
    if (errorMap)
        return { errorMap: errorMap, description };
    const customMap = (iss, ctx) => {
        const { message } = params;
        if (iss.code === "invalid_enum_value") {
            return { message: message ?? ctx.defaultError };
        }
        if (typeof ctx.data === "undefined") {
            return { message: message ?? required_error ?? ctx.defaultError };
        }
        if (iss.code !== "invalid_type")
            return { message: ctx.defaultError };
        return { message: message ?? invalid_type_error ?? ctx.defaultError };
    };
    return { errorMap: customMap, description };
}
class ZodType {
    get description() {
        return this._def.description;
    }
    _getType(input) {
        return getParsedType(input.data);
    }
    _getOrReturnCtx(input, ctx) {
        return (ctx || {
            common: input.parent.common,
            data: input.data,
            parsedType: getParsedType(input.data),
            schemaErrorMap: this._def.errorMap,
            path: input.path,
            parent: input.parent,
        });
    }
    _processInputParams(input) {
        return {
            status: new ParseStatus(),
            ctx: {
                common: input.parent.common,
                data: input.data,
                parsedType: getParsedType(input.data),
                schemaErrorMap: this._def.errorMap,
                path: input.path,
                parent: input.parent,
            },
        };
    }
    _parseSync(input) {
        const result = this._parse(input);
        if (isAsync(result)) {
            throw new Error("Synchronous parse encountered promise.");
        }
        return result;
    }
    _parseAsync(input) {
        const result = this._parse(input);
        return Promise.resolve(result);
    }
    parse(data, params) {
        const result = this.safeParse(data, params);
        if (result.success)
            return result.data;
        throw result.error;
    }
    safeParse(data, params) {
        const ctx = {
            common: {
                issues: [],
                async: params?.async ?? false,
                contextualErrorMap: params?.errorMap,
            },
            path: params?.path || [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data,
            parsedType: getParsedType(data),
        };
        const result = this._parseSync({ data, path: ctx.path, parent: ctx });
        return handleResult(ctx, result);
    }
    "~validate"(data) {
        const ctx = {
            common: {
                issues: [],
                async: !!this["~standard"].async,
            },
            path: [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data,
            parsedType: getParsedType(data),
        };
        if (!this["~standard"].async) {
            try {
                const result = this._parseSync({ data, path: [], parent: ctx });
                return isValid(result)
                    ? {
                        value: result.value,
                    }
                    : {
                        issues: ctx.common.issues,
                    };
            }
            catch (err) {
                if (err?.message?.toLowerCase()?.includes("encountered")) {
                    this["~standard"].async = true;
                }
                ctx.common = {
                    issues: [],
                    async: true,
                };
            }
        }
        return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result)
            ? {
                value: result.value,
            }
            : {
                issues: ctx.common.issues,
            });
    }
    async parseAsync(data, params) {
        const result = await this.safeParseAsync(data, params);
        if (result.success)
            return result.data;
        throw result.error;
    }
    async safeParseAsync(data, params) {
        const ctx = {
            common: {
                issues: [],
                contextualErrorMap: params?.errorMap,
                async: true,
            },
            path: params?.path || [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data,
            parsedType: getParsedType(data),
        };
        const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
        const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
        return handleResult(ctx, result);
    }
    refine(check, message) {
        const getIssueProperties = (val) => {
            if (typeof message === "string" || typeof message === "undefined") {
                return { message };
            }
            else if (typeof message === "function") {
                return message(val);
            }
            else {
                return message;
            }
        };
        return this._refinement((val, ctx) => {
            const result = check(val);
            const setError = () => ctx.addIssue({
                code: ZodIssueCode.custom,
                ...getIssueProperties(val),
            });
            if (typeof Promise !== "undefined" && result instanceof Promise) {
                return result.then((data) => {
                    if (!data) {
                        setError();
                        return false;
                    }
                    else {
                        return true;
                    }
                });
            }
            if (!result) {
                setError();
                return false;
            }
            else {
                return true;
            }
        });
    }
    refinement(check, refinementData) {
        return this._refinement((val, ctx) => {
            if (!check(val)) {
                ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
                return false;
            }
            else {
                return true;
            }
        });
    }
    _refinement(refinement) {
        return new ZodEffects({
            schema: this,
            typeName: ZodFirstPartyTypeKind.ZodEffects,
            effect: { type: "refinement", refinement },
        });
    }
    superRefine(refinement) {
        return this._refinement(refinement);
    }
    constructor(def) {
        /** Alias of safeParseAsync */
        this.spa = this.safeParseAsync;
        this._def = def;
        this.parse = this.parse.bind(this);
        this.safeParse = this.safeParse.bind(this);
        this.parseAsync = this.parseAsync.bind(this);
        this.safeParseAsync = this.safeParseAsync.bind(this);
        this.spa = this.spa.bind(this);
        this.refine = this.refine.bind(this);
        this.refinement = this.refinement.bind(this);
        this.superRefine = this.superRefine.bind(this);
        this.optional = this.optional.bind(this);
        this.nullable = this.nullable.bind(this);
        this.nullish = this.nullish.bind(this);
        this.array = this.array.bind(this);
        this.promise = this.promise.bind(this);
        this.or = this.or.bind(this);
        this.and = this.and.bind(this);
        this.transform = this.transform.bind(this);
        this.brand = this.brand.bind(this);
        this.default = this.default.bind(this);
        this.catch = this.catch.bind(this);
        this.describe = this.describe.bind(this);
        this.pipe = this.pipe.bind(this);
        this.readonly = this.readonly.bind(this);
        this.isNullable = this.isNullable.bind(this);
        this.isOptional = this.isOptional.bind(this);
        this["~standard"] = {
            version: 1,
            vendor: "zod",
            validate: (data) => this["~validate"](data),
        };
    }
    optional() {
        return ZodOptional.create(this, this._def);
    }
    nullable() {
        return ZodNullable.create(this, this._def);
    }
    nullish() {
        return this.nullable().optional();
    }
    array() {
        return ZodArray.create(this);
    }
    promise() {
        return ZodPromise.create(this, this._def);
    }
    or(option) {
        return ZodUnion.create([this, option], this._def);
    }
    and(incoming) {
        return ZodIntersection.create(this, incoming, this._def);
    }
    transform(transform) {
        return new ZodEffects({
            ...processCreateParams(this._def),
            schema: this,
            typeName: ZodFirstPartyTypeKind.ZodEffects,
            effect: { type: "transform", transform },
        });
    }
    default(def) {
        const defaultValueFunc = typeof def === "function" ? def : () => def;
        return new ZodDefault({
            ...processCreateParams(this._def),
            innerType: this,
            defaultValue: defaultValueFunc,
            typeName: ZodFirstPartyTypeKind.ZodDefault,
        });
    }
    brand() {
        return new ZodBranded({
            typeName: ZodFirstPartyTypeKind.ZodBranded,
            type: this,
            ...processCreateParams(this._def),
        });
    }
    catch(def) {
        const catchValueFunc = typeof def === "function" ? def : () => def;
        return new ZodCatch({
            ...processCreateParams(this._def),
            innerType: this,
            catchValue: catchValueFunc,
            typeName: ZodFirstPartyTypeKind.ZodCatch,
        });
    }
    describe(description) {
        const This = this.constructor;
        return new This({
            ...this._def,
            description,
        });
    }
    pipe(target) {
        return ZodPipeline.create(this, target);
    }
    readonly() {
        return ZodReadonly.create(this);
    }
    isOptional() {
        return this.safeParse(undefined).success;
    }
    isNullable() {
        return this.safeParse(null).success;
    }
}
const cuidRegex = /^c[^\s-]{8,}$/i;
const cuid2Regex = /^[0-9a-z]+$/;
const ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
// const uuidRegex =
//   /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i;
const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
const nanoidRegex = /^[a-z0-9_-]{21}$/i;
const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
const durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
// from https://stackoverflow.com/a/46181/1550155
// old version: too slow, didn't support unicode
// const emailRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
//old email regex
// const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@((?!-)([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{1,})[^-<>()[\].,;:\s@"]$/i;
// eslint-disable-next-line
// const emailRegex =
//   /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\])|(\[IPv6:(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))\])|([A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])*(\.[A-Za-z]{2,})+))$/;
// const emailRegex =
//   /^[a-zA-Z0-9\.\!\#\$\%\&\'\*\+\/\=\?\^\_\`\{\|\}\~\-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
// const emailRegex =
//   /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
const emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
// const emailRegex =
//   /^[a-z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9\-]+)*$/i;
// from https://thekevinscott.com/emojis-in-javascript/#writing-a-regular-expression
const _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
let emojiRegex;
// faster, simpler, safer
const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
const ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
// const ipv6Regex =
// /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
const ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
// https://stackoverflow.com/questions/7860392/determine-if-string-is-in-base64-using-javascript
const base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
// https://base64.guru/standards/base64url
const base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
// simple
// const dateRegexSource = `\\d{4}-\\d{2}-\\d{2}`;
// no leap year validation
// const dateRegexSource = `\\d{4}-((0[13578]|10|12)-31|(0[13-9]|1[0-2])-30|(0[1-9]|1[0-2])-(0[1-9]|1\\d|2\\d))`;
// with leap year validation
const dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
const dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
    let secondsRegexSource = `[0-5]\\d`;
    if (args.precision) {
        secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
    }
    else if (args.precision == null) {
        secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
    }
    const secondsQuantifier = args.precision ? "+" : "?"; // require seconds if precision is nonzero
    return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
    return new RegExp(`^${timeRegexSource(args)}$`);
}
// Adapted from https://stackoverflow.com/a/3143231
function datetimeRegex(args) {
    let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
    const opts = [];
    opts.push(args.local ? `Z?` : `Z`);
    if (args.offset)
        opts.push(`([+-]\\d{2}:?\\d{2})`);
    regex = `${regex}(${opts.join("|")})`;
    return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
    if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
        return true;
    }
    if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
        return true;
    }
    return false;
}
function isValidJWT(jwt, alg) {
    if (!jwtRegex.test(jwt))
        return false;
    try {
        const [header] = jwt.split(".");
        // Convert base64url to base64
        const base64 = header
            .replace(/-/g, "+")
            .replace(/_/g, "/")
            .padEnd(header.length + ((4 - (header.length % 4)) % 4), "=");
        const decoded = JSON.parse(atob(base64));
        if (typeof decoded !== "object" || decoded === null)
            return false;
        if ("typ" in decoded && decoded?.typ !== "JWT")
            return false;
        if (!decoded.alg)
            return false;
        if (alg && decoded.alg !== alg)
            return false;
        return true;
    }
    catch {
        return false;
    }
}
function isValidCidr(ip, version) {
    if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
        return true;
    }
    if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
        return true;
    }
    return false;
}
class ZodString extends ZodType {
    _parse(input) {
        if (this._def.coerce) {
            input.data = String(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.string) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.string,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        const status = new ParseStatus();
        let ctx = undefined;
        for (const check of this._def.checks) {
            if (check.kind === "min") {
                if (input.data.length < check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_small,
                        minimum: check.value,
                        type: "string",
                        inclusive: true,
                        exact: false,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "max") {
                if (input.data.length > check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_big,
                        maximum: check.value,
                        type: "string",
                        inclusive: true,
                        exact: false,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "length") {
                const tooBig = input.data.length > check.value;
                const tooSmall = input.data.length < check.value;
                if (tooBig || tooSmall) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    if (tooBig) {
                        addIssueToContext(ctx, {
                            code: ZodIssueCode.too_big,
                            maximum: check.value,
                            type: "string",
                            inclusive: true,
                            exact: true,
                            message: check.message,
                        });
                    }
                    else if (tooSmall) {
                        addIssueToContext(ctx, {
                            code: ZodIssueCode.too_small,
                            minimum: check.value,
                            type: "string",
                            inclusive: true,
                            exact: true,
                            message: check.message,
                        });
                    }
                    status.dirty();
                }
            }
            else if (check.kind === "email") {
                if (!emailRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "email",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "emoji") {
                if (!emojiRegex) {
                    emojiRegex = new RegExp(_emojiRegex, "u");
                }
                if (!emojiRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "emoji",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "uuid") {
                if (!uuidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "uuid",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "nanoid") {
                if (!nanoidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "nanoid",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "cuid") {
                if (!cuidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "cuid",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "cuid2") {
                if (!cuid2Regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "cuid2",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "ulid") {
                if (!ulidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "ulid",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "url") {
                try {
                    new URL(input.data);
                }
                catch {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "url",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "regex") {
                check.regex.lastIndex = 0;
                const testResult = check.regex.test(input.data);
                if (!testResult) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "regex",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "trim") {
                input.data = input.data.trim();
            }
            else if (check.kind === "includes") {
                if (!input.data.includes(check.value, check.position)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.invalid_string,
                        validation: { includes: check.value, position: check.position },
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "toLowerCase") {
                input.data = input.data.toLowerCase();
            }
            else if (check.kind === "toUpperCase") {
                input.data = input.data.toUpperCase();
            }
            else if (check.kind === "startsWith") {
                if (!input.data.startsWith(check.value)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.invalid_string,
                        validation: { startsWith: check.value },
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "endsWith") {
                if (!input.data.endsWith(check.value)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.invalid_string,
                        validation: { endsWith: check.value },
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "datetime") {
                const regex = datetimeRegex(check);
                if (!regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.invalid_string,
                        validation: "datetime",
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "date") {
                const regex = dateRegex;
                if (!regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.invalid_string,
                        validation: "date",
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "time") {
                const regex = timeRegex(check);
                if (!regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.invalid_string,
                        validation: "time",
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "duration") {
                if (!durationRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "duration",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "ip") {
                if (!isValidIP(input.data, check.version)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "ip",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "jwt") {
                if (!isValidJWT(input.data, check.alg)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "jwt",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "cidr") {
                if (!isValidCidr(input.data, check.version)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "cidr",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "base64") {
                if (!base64Regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "base64",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "base64url") {
                if (!base64urlRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "base64url",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else {
                util.assertNever(check);
            }
        }
        return { status: status.value, value: input.data };
    }
    _regex(regex, validation, message) {
        return this.refinement((data) => regex.test(data), {
            validation,
            code: ZodIssueCode.invalid_string,
            ...errorUtil.errToObj(message),
        });
    }
    _addCheck(check) {
        return new ZodString({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    email(message) {
        return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
    }
    url(message) {
        return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
    }
    emoji(message) {
        return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
    }
    uuid(message) {
        return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
    }
    nanoid(message) {
        return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
    }
    cuid(message) {
        return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
    }
    cuid2(message) {
        return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
    }
    ulid(message) {
        return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
    }
    base64(message) {
        return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
    }
    base64url(message) {
        // base64url encoding is a modification of base64 that can safely be used in URLs and filenames
        return this._addCheck({
            kind: "base64url",
            ...errorUtil.errToObj(message),
        });
    }
    jwt(options) {
        return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
    }
    ip(options) {
        return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
    }
    cidr(options) {
        return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
    }
    datetime(options) {
        if (typeof options === "string") {
            return this._addCheck({
                kind: "datetime",
                precision: null,
                offset: false,
                local: false,
                message: options,
            });
        }
        return this._addCheck({
            kind: "datetime",
            precision: typeof options?.precision === "undefined" ? null : options?.precision,
            offset: options?.offset ?? false,
            local: options?.local ?? false,
            ...errorUtil.errToObj(options?.message),
        });
    }
    date(message) {
        return this._addCheck({ kind: "date", message });
    }
    time(options) {
        if (typeof options === "string") {
            return this._addCheck({
                kind: "time",
                precision: null,
                message: options,
            });
        }
        return this._addCheck({
            kind: "time",
            precision: typeof options?.precision === "undefined" ? null : options?.precision,
            ...errorUtil.errToObj(options?.message),
        });
    }
    duration(message) {
        return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
    }
    regex(regex, message) {
        return this._addCheck({
            kind: "regex",
            regex: regex,
            ...errorUtil.errToObj(message),
        });
    }
    includes(value, options) {
        return this._addCheck({
            kind: "includes",
            value: value,
            position: options?.position,
            ...errorUtil.errToObj(options?.message),
        });
    }
    startsWith(value, message) {
        return this._addCheck({
            kind: "startsWith",
            value: value,
            ...errorUtil.errToObj(message),
        });
    }
    endsWith(value, message) {
        return this._addCheck({
            kind: "endsWith",
            value: value,
            ...errorUtil.errToObj(message),
        });
    }
    min(minLength, message) {
        return this._addCheck({
            kind: "min",
            value: minLength,
            ...errorUtil.errToObj(message),
        });
    }
    max(maxLength, message) {
        return this._addCheck({
            kind: "max",
            value: maxLength,
            ...errorUtil.errToObj(message),
        });
    }
    length(len, message) {
        return this._addCheck({
            kind: "length",
            value: len,
            ...errorUtil.errToObj(message),
        });
    }
    /**
     * Equivalent to `.min(1)`
     */
    nonempty(message) {
        return this.min(1, errorUtil.errToObj(message));
    }
    trim() {
        return new ZodString({
            ...this._def,
            checks: [...this._def.checks, { kind: "trim" }],
        });
    }
    toLowerCase() {
        return new ZodString({
            ...this._def,
            checks: [...this._def.checks, { kind: "toLowerCase" }],
        });
    }
    toUpperCase() {
        return new ZodString({
            ...this._def,
            checks: [...this._def.checks, { kind: "toUpperCase" }],
        });
    }
    get isDatetime() {
        return !!this._def.checks.find((ch) => ch.kind === "datetime");
    }
    get isDate() {
        return !!this._def.checks.find((ch) => ch.kind === "date");
    }
    get isTime() {
        return !!this._def.checks.find((ch) => ch.kind === "time");
    }
    get isDuration() {
        return !!this._def.checks.find((ch) => ch.kind === "duration");
    }
    get isEmail() {
        return !!this._def.checks.find((ch) => ch.kind === "email");
    }
    get isURL() {
        return !!this._def.checks.find((ch) => ch.kind === "url");
    }
    get isEmoji() {
        return !!this._def.checks.find((ch) => ch.kind === "emoji");
    }
    get isUUID() {
        return !!this._def.checks.find((ch) => ch.kind === "uuid");
    }
    get isNANOID() {
        return !!this._def.checks.find((ch) => ch.kind === "nanoid");
    }
    get isCUID() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid");
    }
    get isCUID2() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid2");
    }
    get isULID() {
        return !!this._def.checks.find((ch) => ch.kind === "ulid");
    }
    get isIP() {
        return !!this._def.checks.find((ch) => ch.kind === "ip");
    }
    get isCIDR() {
        return !!this._def.checks.find((ch) => ch.kind === "cidr");
    }
    get isBase64() {
        return !!this._def.checks.find((ch) => ch.kind === "base64");
    }
    get isBase64url() {
        // base64url encoding is a modification of base64 that can safely be used in URLs and filenames
        return !!this._def.checks.find((ch) => ch.kind === "base64url");
    }
    get minLength() {
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
        }
        return min;
    }
    get maxLength() {
        let max = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return max;
    }
}
ZodString.create = (params) => {
    return new ZodString({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodString,
        coerce: params?.coerce ?? false,
        ...processCreateParams(params),
    });
};
// https://stackoverflow.com/questions/3966484/why-does-modulus-operator-return-fractional-number-in-javascript/31711034#31711034
function floatSafeRemainder(val, step) {
    const valDecCount = (val.toString().split(".")[1] || "").length;
    const stepDecCount = (step.toString().split(".")[1] || "").length;
    const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
    const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
    const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
    return (valInt % stepInt) / 10 ** decCount;
}
class ZodNumber extends ZodType {
    constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
        this.step = this.multipleOf;
    }
    _parse(input) {
        if (this._def.coerce) {
            input.data = Number(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.number) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.number,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        let ctx = undefined;
        const status = new ParseStatus();
        for (const check of this._def.checks) {
            if (check.kind === "int") {
                if (!util.isInteger(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.invalid_type,
                        expected: "integer",
                        received: "float",
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "min") {
                const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
                if (tooSmall) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_small,
                        minimum: check.value,
                        type: "number",
                        inclusive: check.inclusive,
                        exact: false,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "max") {
                const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
                if (tooBig) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_big,
                        maximum: check.value,
                        type: "number",
                        inclusive: check.inclusive,
                        exact: false,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "multipleOf") {
                if (floatSafeRemainder(input.data, check.value) !== 0) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.not_multiple_of,
                        multipleOf: check.value,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "finite") {
                if (!Number.isFinite(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.not_finite,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else {
                util.assertNever(check);
            }
        }
        return { status: status.value, value: input.data };
    }
    gte(value, message) {
        return this.setLimit("min", value, true, errorUtil.toString(message));
    }
    gt(value, message) {
        return this.setLimit("min", value, false, errorUtil.toString(message));
    }
    lte(value, message) {
        return this.setLimit("max", value, true, errorUtil.toString(message));
    }
    lt(value, message) {
        return this.setLimit("max", value, false, errorUtil.toString(message));
    }
    setLimit(kind, value, inclusive, message) {
        return new ZodNumber({
            ...this._def,
            checks: [
                ...this._def.checks,
                {
                    kind,
                    value,
                    inclusive,
                    message: errorUtil.toString(message),
                },
            ],
        });
    }
    _addCheck(check) {
        return new ZodNumber({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    int(message) {
        return this._addCheck({
            kind: "int",
            message: errorUtil.toString(message),
        });
    }
    positive(message) {
        return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: false,
            message: errorUtil.toString(message),
        });
    }
    negative(message) {
        return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: false,
            message: errorUtil.toString(message),
        });
    }
    nonpositive(message) {
        return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: true,
            message: errorUtil.toString(message),
        });
    }
    nonnegative(message) {
        return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: true,
            message: errorUtil.toString(message),
        });
    }
    multipleOf(value, message) {
        return this._addCheck({
            kind: "multipleOf",
            value: value,
            message: errorUtil.toString(message),
        });
    }
    finite(message) {
        return this._addCheck({
            kind: "finite",
            message: errorUtil.toString(message),
        });
    }
    safe(message) {
        return this._addCheck({
            kind: "min",
            inclusive: true,
            value: Number.MIN_SAFE_INTEGER,
            message: errorUtil.toString(message),
        })._addCheck({
            kind: "max",
            inclusive: true,
            value: Number.MAX_SAFE_INTEGER,
            message: errorUtil.toString(message),
        });
    }
    get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
        }
        return min;
    }
    get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return max;
    }
    get isInt() {
        return !!this._def.checks.find((ch) => ch.kind === "int" || (ch.kind === "multipleOf" && util.isInteger(ch.value)));
    }
    get isFinite() {
        let max = null;
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
                return true;
            }
            else if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
            else if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return Number.isFinite(min) && Number.isFinite(max);
    }
}
ZodNumber.create = (params) => {
    return new ZodNumber({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodNumber,
        coerce: params?.coerce || false,
        ...processCreateParams(params),
    });
};
class ZodBigInt extends ZodType {
    constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
    }
    _parse(input) {
        if (this._def.coerce) {
            try {
                input.data = BigInt(input.data);
            }
            catch {
                return this._getInvalidInput(input);
            }
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.bigint) {
            return this._getInvalidInput(input);
        }
        let ctx = undefined;
        const status = new ParseStatus();
        for (const check of this._def.checks) {
            if (check.kind === "min") {
                const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
                if (tooSmall) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_small,
                        type: "bigint",
                        minimum: check.value,
                        inclusive: check.inclusive,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "max") {
                const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
                if (tooBig) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_big,
                        type: "bigint",
                        maximum: check.value,
                        inclusive: check.inclusive,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "multipleOf") {
                if (input.data % check.value !== BigInt(0)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.not_multiple_of,
                        multipleOf: check.value,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else {
                util.assertNever(check);
            }
        }
        return { status: status.value, value: input.data };
    }
    _getInvalidInput(input) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.bigint,
            received: ctx.parsedType,
        });
        return INVALID;
    }
    gte(value, message) {
        return this.setLimit("min", value, true, errorUtil.toString(message));
    }
    gt(value, message) {
        return this.setLimit("min", value, false, errorUtil.toString(message));
    }
    lte(value, message) {
        return this.setLimit("max", value, true, errorUtil.toString(message));
    }
    lt(value, message) {
        return this.setLimit("max", value, false, errorUtil.toString(message));
    }
    setLimit(kind, value, inclusive, message) {
        return new ZodBigInt({
            ...this._def,
            checks: [
                ...this._def.checks,
                {
                    kind,
                    value,
                    inclusive,
                    message: errorUtil.toString(message),
                },
            ],
        });
    }
    _addCheck(check) {
        return new ZodBigInt({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    positive(message) {
        return this._addCheck({
            kind: "min",
            value: BigInt(0),
            inclusive: false,
            message: errorUtil.toString(message),
        });
    }
    negative(message) {
        return this._addCheck({
            kind: "max",
            value: BigInt(0),
            inclusive: false,
            message: errorUtil.toString(message),
        });
    }
    nonpositive(message) {
        return this._addCheck({
            kind: "max",
            value: BigInt(0),
            inclusive: true,
            message: errorUtil.toString(message),
        });
    }
    nonnegative(message) {
        return this._addCheck({
            kind: "min",
            value: BigInt(0),
            inclusive: true,
            message: errorUtil.toString(message),
        });
    }
    multipleOf(value, message) {
        return this._addCheck({
            kind: "multipleOf",
            value,
            message: errorUtil.toString(message),
        });
    }
    get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
        }
        return min;
    }
    get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return max;
    }
}
ZodBigInt.create = (params) => {
    return new ZodBigInt({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodBigInt,
        coerce: params?.coerce ?? false,
        ...processCreateParams(params),
    });
};
class ZodBoolean extends ZodType {
    _parse(input) {
        if (this._def.coerce) {
            input.data = Boolean(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.boolean) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.boolean,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return OK(input.data);
    }
}
ZodBoolean.create = (params) => {
    return new ZodBoolean({
        typeName: ZodFirstPartyTypeKind.ZodBoolean,
        coerce: params?.coerce || false,
        ...processCreateParams(params),
    });
};
class ZodDate extends ZodType {
    _parse(input) {
        if (this._def.coerce) {
            input.data = new Date(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.date) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.date,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        if (Number.isNaN(input.data.getTime())) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_date,
            });
            return INVALID;
        }
        const status = new ParseStatus();
        let ctx = undefined;
        for (const check of this._def.checks) {
            if (check.kind === "min") {
                if (input.data.getTime() < check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_small,
                        message: check.message,
                        inclusive: true,
                        exact: false,
                        minimum: check.value,
                        type: "date",
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "max") {
                if (input.data.getTime() > check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_big,
                        message: check.message,
                        inclusive: true,
                        exact: false,
                        maximum: check.value,
                        type: "date",
                    });
                    status.dirty();
                }
            }
            else {
                util.assertNever(check);
            }
        }
        return {
            status: status.value,
            value: new Date(input.data.getTime()),
        };
    }
    _addCheck(check) {
        return new ZodDate({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    min(minDate, message) {
        return this._addCheck({
            kind: "min",
            value: minDate.getTime(),
            message: errorUtil.toString(message),
        });
    }
    max(maxDate, message) {
        return this._addCheck({
            kind: "max",
            value: maxDate.getTime(),
            message: errorUtil.toString(message),
        });
    }
    get minDate() {
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
        }
        return min != null ? new Date(min) : null;
    }
    get maxDate() {
        let max = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return max != null ? new Date(max) : null;
    }
}
ZodDate.create = (params) => {
    return new ZodDate({
        checks: [],
        coerce: params?.coerce || false,
        typeName: ZodFirstPartyTypeKind.ZodDate,
        ...processCreateParams(params),
    });
};
class ZodSymbol extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.symbol) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.symbol,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return OK(input.data);
    }
}
ZodSymbol.create = (params) => {
    return new ZodSymbol({
        typeName: ZodFirstPartyTypeKind.ZodSymbol,
        ...processCreateParams(params),
    });
};
class ZodUndefined extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.undefined) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.undefined,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return OK(input.data);
    }
}
ZodUndefined.create = (params) => {
    return new ZodUndefined({
        typeName: ZodFirstPartyTypeKind.ZodUndefined,
        ...processCreateParams(params),
    });
};
class ZodNull extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.null) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.null,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return OK(input.data);
    }
}
ZodNull.create = (params) => {
    return new ZodNull({
        typeName: ZodFirstPartyTypeKind.ZodNull,
        ...processCreateParams(params),
    });
};
class ZodAny extends ZodType {
    constructor() {
        super(...arguments);
        // to prevent instances of other classes from extending ZodAny. this causes issues with catchall in ZodObject.
        this._any = true;
    }
    _parse(input) {
        return OK(input.data);
    }
}
ZodAny.create = (params) => {
    return new ZodAny({
        typeName: ZodFirstPartyTypeKind.ZodAny,
        ...processCreateParams(params),
    });
};
class ZodUnknown extends ZodType {
    constructor() {
        super(...arguments);
        // required
        this._unknown = true;
    }
    _parse(input) {
        return OK(input.data);
    }
}
ZodUnknown.create = (params) => {
    return new ZodUnknown({
        typeName: ZodFirstPartyTypeKind.ZodUnknown,
        ...processCreateParams(params),
    });
};
class ZodNever extends ZodType {
    _parse(input) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.never,
            received: ctx.parsedType,
        });
        return INVALID;
    }
}
ZodNever.create = (params) => {
    return new ZodNever({
        typeName: ZodFirstPartyTypeKind.ZodNever,
        ...processCreateParams(params),
    });
};
class ZodVoid extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.undefined) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.void,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return OK(input.data);
    }
}
ZodVoid.create = (params) => {
    return new ZodVoid({
        typeName: ZodFirstPartyTypeKind.ZodVoid,
        ...processCreateParams(params),
    });
};
class ZodArray extends ZodType {
    _parse(input) {
        const { ctx, status } = this._processInputParams(input);
        const def = this._def;
        if (ctx.parsedType !== ZodParsedType.array) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.array,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        if (def.exactLength !== null) {
            const tooBig = ctx.data.length > def.exactLength.value;
            const tooSmall = ctx.data.length < def.exactLength.value;
            if (tooBig || tooSmall) {
                addIssueToContext(ctx, {
                    code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
                    minimum: (tooSmall ? def.exactLength.value : undefined),
                    maximum: (tooBig ? def.exactLength.value : undefined),
                    type: "array",
                    inclusive: true,
                    exact: true,
                    message: def.exactLength.message,
                });
                status.dirty();
            }
        }
        if (def.minLength !== null) {
            if (ctx.data.length < def.minLength.value) {
                addIssueToContext(ctx, {
                    code: ZodIssueCode.too_small,
                    minimum: def.minLength.value,
                    type: "array",
                    inclusive: true,
                    exact: false,
                    message: def.minLength.message,
                });
                status.dirty();
            }
        }
        if (def.maxLength !== null) {
            if (ctx.data.length > def.maxLength.value) {
                addIssueToContext(ctx, {
                    code: ZodIssueCode.too_big,
                    maximum: def.maxLength.value,
                    type: "array",
                    inclusive: true,
                    exact: false,
                    message: def.maxLength.message,
                });
                status.dirty();
            }
        }
        if (ctx.common.async) {
            return Promise.all([...ctx.data].map((item, i) => {
                return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
            })).then((result) => {
                return ParseStatus.mergeArray(status, result);
            });
        }
        const result = [...ctx.data].map((item, i) => {
            return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
        });
        return ParseStatus.mergeArray(status, result);
    }
    get element() {
        return this._def.type;
    }
    min(minLength, message) {
        return new ZodArray({
            ...this._def,
            minLength: { value: minLength, message: errorUtil.toString(message) },
        });
    }
    max(maxLength, message) {
        return new ZodArray({
            ...this._def,
            maxLength: { value: maxLength, message: errorUtil.toString(message) },
        });
    }
    length(len, message) {
        return new ZodArray({
            ...this._def,
            exactLength: { value: len, message: errorUtil.toString(message) },
        });
    }
    nonempty(message) {
        return this.min(1, message);
    }
}
ZodArray.create = (schema, params) => {
    return new ZodArray({
        type: schema,
        minLength: null,
        maxLength: null,
        exactLength: null,
        typeName: ZodFirstPartyTypeKind.ZodArray,
        ...processCreateParams(params),
    });
};
function deepPartialify(schema) {
    if (schema instanceof ZodObject) {
        const newShape = {};
        for (const key in schema.shape) {
            const fieldSchema = schema.shape[key];
            newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
        }
        return new ZodObject({
            ...schema._def,
            shape: () => newShape,
        });
    }
    else if (schema instanceof ZodArray) {
        return new ZodArray({
            ...schema._def,
            type: deepPartialify(schema.element),
        });
    }
    else if (schema instanceof ZodOptional) {
        return ZodOptional.create(deepPartialify(schema.unwrap()));
    }
    else if (schema instanceof ZodNullable) {
        return ZodNullable.create(deepPartialify(schema.unwrap()));
    }
    else if (schema instanceof ZodTuple) {
        return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
    }
    else {
        return schema;
    }
}
class ZodObject extends ZodType {
    constructor() {
        super(...arguments);
        this._cached = null;
        /**
         * @deprecated In most cases, this is no longer needed - unknown properties are now silently stripped.
         * If you want to pass through unknown properties, use `.passthrough()` instead.
         */
        this.nonstrict = this.passthrough;
        // extend<
        //   Augmentation extends ZodRawShape,
        //   NewOutput extends util.flatten<{
        //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
        //       ? Augmentation[k]["_output"]
        //       : k extends keyof Output
        //       ? Output[k]
        //       : never;
        //   }>,
        //   NewInput extends util.flatten<{
        //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
        //       ? Augmentation[k]["_input"]
        //       : k extends keyof Input
        //       ? Input[k]
        //       : never;
        //   }>
        // >(
        //   augmentation: Augmentation
        // ): ZodObject<
        //   extendShape<T, Augmentation>,
        //   UnknownKeys,
        //   Catchall,
        //   NewOutput,
        //   NewInput
        // > {
        //   return new ZodObject({
        //     ...this._def,
        //     shape: () => ({
        //       ...this._def.shape(),
        //       ...augmentation,
        //     }),
        //   }) as any;
        // }
        /**
         * @deprecated Use `.extend` instead
         *  */
        this.augment = this.extend;
    }
    _getCached() {
        if (this._cached !== null)
            return this._cached;
        const shape = this._def.shape();
        const keys = util.objectKeys(shape);
        this._cached = { shape, keys };
        return this._cached;
    }
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.object) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.object,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        const { status, ctx } = this._processInputParams(input);
        const { shape, keys: shapeKeys } = this._getCached();
        const extraKeys = [];
        if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
            for (const key in ctx.data) {
                if (!shapeKeys.includes(key)) {
                    extraKeys.push(key);
                }
            }
        }
        const pairs = [];
        for (const key of shapeKeys) {
            const keyValidator = shape[key];
            const value = ctx.data[key];
            pairs.push({
                key: { status: "valid", value: key },
                value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
                alwaysSet: key in ctx.data,
            });
        }
        if (this._def.catchall instanceof ZodNever) {
            const unknownKeys = this._def.unknownKeys;
            if (unknownKeys === "passthrough") {
                for (const key of extraKeys) {
                    pairs.push({
                        key: { status: "valid", value: key },
                        value: { status: "valid", value: ctx.data[key] },
                    });
                }
            }
            else if (unknownKeys === "strict") {
                if (extraKeys.length > 0) {
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.unrecognized_keys,
                        keys: extraKeys,
                    });
                    status.dirty();
                }
            }
            else if (unknownKeys === "strip") ;
            else {
                throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
            }
        }
        else {
            // run catchall validation
            const catchall = this._def.catchall;
            for (const key of extraKeys) {
                const value = ctx.data[key];
                pairs.push({
                    key: { status: "valid", value: key },
                    value: catchall._parse(new ParseInputLazyPath(ctx, value, ctx.path, key) //, ctx.child(key), value, getParsedType(value)
                    ),
                    alwaysSet: key in ctx.data,
                });
            }
        }
        if (ctx.common.async) {
            return Promise.resolve()
                .then(async () => {
                const syncPairs = [];
                for (const pair of pairs) {
                    const key = await pair.key;
                    const value = await pair.value;
                    syncPairs.push({
                        key,
                        value,
                        alwaysSet: pair.alwaysSet,
                    });
                }
                return syncPairs;
            })
                .then((syncPairs) => {
                return ParseStatus.mergeObjectSync(status, syncPairs);
            });
        }
        else {
            return ParseStatus.mergeObjectSync(status, pairs);
        }
    }
    get shape() {
        return this._def.shape();
    }
    strict(message) {
        errorUtil.errToObj;
        return new ZodObject({
            ...this._def,
            unknownKeys: "strict",
            ...(message !== undefined
                ? {
                    errorMap: (issue, ctx) => {
                        const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
                        if (issue.code === "unrecognized_keys")
                            return {
                                message: errorUtil.errToObj(message).message ?? defaultError,
                            };
                        return {
                            message: defaultError,
                        };
                    },
                }
                : {}),
        });
    }
    strip() {
        return new ZodObject({
            ...this._def,
            unknownKeys: "strip",
        });
    }
    passthrough() {
        return new ZodObject({
            ...this._def,
            unknownKeys: "passthrough",
        });
    }
    // const AugmentFactory =
    //   <Def extends ZodObjectDef>(def: Def) =>
    //   <Augmentation extends ZodRawShape>(
    //     augmentation: Augmentation
    //   ): ZodObject<
    //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
    //     Def["unknownKeys"],
    //     Def["catchall"]
    //   > => {
    //     return new ZodObject({
    //       ...def,
    //       shape: () => ({
    //         ...def.shape(),
    //         ...augmentation,
    //       }),
    //     }) as any;
    //   };
    extend(augmentation) {
        return new ZodObject({
            ...this._def,
            shape: () => ({
                ...this._def.shape(),
                ...augmentation,
            }),
        });
    }
    /**
     * Prior to zod@1.0.12 there was a bug in the
     * inferred type of merged objects. Please
     * upgrade if you are experiencing issues.
     */
    merge(merging) {
        const merged = new ZodObject({
            unknownKeys: merging._def.unknownKeys,
            catchall: merging._def.catchall,
            shape: () => ({
                ...this._def.shape(),
                ...merging._def.shape(),
            }),
            typeName: ZodFirstPartyTypeKind.ZodObject,
        });
        return merged;
    }
    // merge<
    //   Incoming extends AnyZodObject,
    //   Augmentation extends Incoming["shape"],
    //   NewOutput extends {
    //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
    //       ? Augmentation[k]["_output"]
    //       : k extends keyof Output
    //       ? Output[k]
    //       : never;
    //   },
    //   NewInput extends {
    //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
    //       ? Augmentation[k]["_input"]
    //       : k extends keyof Input
    //       ? Input[k]
    //       : never;
    //   }
    // >(
    //   merging: Incoming
    // ): ZodObject<
    //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
    //   Incoming["_def"]["unknownKeys"],
    //   Incoming["_def"]["catchall"],
    //   NewOutput,
    //   NewInput
    // > {
    //   const merged: any = new ZodObject({
    //     unknownKeys: merging._def.unknownKeys,
    //     catchall: merging._def.catchall,
    //     shape: () =>
    //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
    //     typeName: ZodFirstPartyTypeKind.ZodObject,
    //   }) as any;
    //   return merged;
    // }
    setKey(key, schema) {
        return this.augment({ [key]: schema });
    }
    // merge<Incoming extends AnyZodObject>(
    //   merging: Incoming
    // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
    // ZodObject<
    //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
    //   Incoming["_def"]["unknownKeys"],
    //   Incoming["_def"]["catchall"]
    // > {
    //   // const mergedShape = objectUtil.mergeShapes(
    //   //   this._def.shape(),
    //   //   merging._def.shape()
    //   // );
    //   const merged: any = new ZodObject({
    //     unknownKeys: merging._def.unknownKeys,
    //     catchall: merging._def.catchall,
    //     shape: () =>
    //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
    //     typeName: ZodFirstPartyTypeKind.ZodObject,
    //   }) as any;
    //   return merged;
    // }
    catchall(index) {
        return new ZodObject({
            ...this._def,
            catchall: index,
        });
    }
    pick(mask) {
        const shape = {};
        for (const key of util.objectKeys(mask)) {
            if (mask[key] && this.shape[key]) {
                shape[key] = this.shape[key];
            }
        }
        return new ZodObject({
            ...this._def,
            shape: () => shape,
        });
    }
    omit(mask) {
        const shape = {};
        for (const key of util.objectKeys(this.shape)) {
            if (!mask[key]) {
                shape[key] = this.shape[key];
            }
        }
        return new ZodObject({
            ...this._def,
            shape: () => shape,
        });
    }
    /**
     * @deprecated
     */
    deepPartial() {
        return deepPartialify(this);
    }
    partial(mask) {
        const newShape = {};
        for (const key of util.objectKeys(this.shape)) {
            const fieldSchema = this.shape[key];
            if (mask && !mask[key]) {
                newShape[key] = fieldSchema;
            }
            else {
                newShape[key] = fieldSchema.optional();
            }
        }
        return new ZodObject({
            ...this._def,
            shape: () => newShape,
        });
    }
    required(mask) {
        const newShape = {};
        for (const key of util.objectKeys(this.shape)) {
            if (mask && !mask[key]) {
                newShape[key] = this.shape[key];
            }
            else {
                const fieldSchema = this.shape[key];
                let newField = fieldSchema;
                while (newField instanceof ZodOptional) {
                    newField = newField._def.innerType;
                }
                newShape[key] = newField;
            }
        }
        return new ZodObject({
            ...this._def,
            shape: () => newShape,
        });
    }
    keyof() {
        return createZodEnum(util.objectKeys(this.shape));
    }
}
ZodObject.create = (shape, params) => {
    return new ZodObject({
        shape: () => shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params),
    });
};
ZodObject.strictCreate = (shape, params) => {
    return new ZodObject({
        shape: () => shape,
        unknownKeys: "strict",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params),
    });
};
ZodObject.lazycreate = (shape, params) => {
    return new ZodObject({
        shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params),
    });
};
class ZodUnion extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        const options = this._def.options;
        function handleResults(results) {
            // return first issue-free validation if it exists
            for (const result of results) {
                if (result.result.status === "valid") {
                    return result.result;
                }
            }
            for (const result of results) {
                if (result.result.status === "dirty") {
                    // add issues from dirty option
                    ctx.common.issues.push(...result.ctx.common.issues);
                    return result.result;
                }
            }
            // return invalid
            const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_union,
                unionErrors,
            });
            return INVALID;
        }
        if (ctx.common.async) {
            return Promise.all(options.map(async (option) => {
                const childCtx = {
                    ...ctx,
                    common: {
                        ...ctx.common,
                        issues: [],
                    },
                    parent: null,
                };
                return {
                    result: await option._parseAsync({
                        data: ctx.data,
                        path: ctx.path,
                        parent: childCtx,
                    }),
                    ctx: childCtx,
                };
            })).then(handleResults);
        }
        else {
            let dirty = undefined;
            const issues = [];
            for (const option of options) {
                const childCtx = {
                    ...ctx,
                    common: {
                        ...ctx.common,
                        issues: [],
                    },
                    parent: null,
                };
                const result = option._parseSync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: childCtx,
                });
                if (result.status === "valid") {
                    return result;
                }
                else if (result.status === "dirty" && !dirty) {
                    dirty = { result, ctx: childCtx };
                }
                if (childCtx.common.issues.length) {
                    issues.push(childCtx.common.issues);
                }
            }
            if (dirty) {
                ctx.common.issues.push(...dirty.ctx.common.issues);
                return dirty.result;
            }
            const unionErrors = issues.map((issues) => new ZodError(issues));
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_union,
                unionErrors,
            });
            return INVALID;
        }
    }
    get options() {
        return this._def.options;
    }
}
ZodUnion.create = (types, params) => {
    return new ZodUnion({
        options: types,
        typeName: ZodFirstPartyTypeKind.ZodUnion,
        ...processCreateParams(params),
    });
};
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
//////////                                 //////////
//////////      ZodDiscriminatedUnion      //////////
//////////                                 //////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
const getDiscriminator = (type) => {
    if (type instanceof ZodLazy) {
        return getDiscriminator(type.schema);
    }
    else if (type instanceof ZodEffects) {
        return getDiscriminator(type.innerType());
    }
    else if (type instanceof ZodLiteral) {
        return [type.value];
    }
    else if (type instanceof ZodEnum) {
        return type.options;
    }
    else if (type instanceof ZodNativeEnum) {
        // eslint-disable-next-line ban/ban
        return util.objectValues(type.enum);
    }
    else if (type instanceof ZodDefault) {
        return getDiscriminator(type._def.innerType);
    }
    else if (type instanceof ZodUndefined) {
        return [undefined];
    }
    else if (type instanceof ZodNull) {
        return [null];
    }
    else if (type instanceof ZodOptional) {
        return [undefined, ...getDiscriminator(type.unwrap())];
    }
    else if (type instanceof ZodNullable) {
        return [null, ...getDiscriminator(type.unwrap())];
    }
    else if (type instanceof ZodBranded) {
        return getDiscriminator(type.unwrap());
    }
    else if (type instanceof ZodReadonly) {
        return getDiscriminator(type.unwrap());
    }
    else if (type instanceof ZodCatch) {
        return getDiscriminator(type._def.innerType);
    }
    else {
        return [];
    }
};
class ZodDiscriminatedUnion extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.object) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.object,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        const discriminator = this.discriminator;
        const discriminatorValue = ctx.data[discriminator];
        const option = this.optionsMap.get(discriminatorValue);
        if (!option) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_union_discriminator,
                options: Array.from(this.optionsMap.keys()),
                path: [discriminator],
            });
            return INVALID;
        }
        if (ctx.common.async) {
            return option._parseAsync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            });
        }
        else {
            return option._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            });
        }
    }
    get discriminator() {
        return this._def.discriminator;
    }
    get options() {
        return this._def.options;
    }
    get optionsMap() {
        return this._def.optionsMap;
    }
    /**
     * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
     * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
     * have a different value for each object in the union.
     * @param discriminator the name of the discriminator property
     * @param types an array of object schemas
     * @param params
     */
    static create(discriminator, options, params) {
        // Get all the valid discriminator values
        const optionsMap = new Map();
        // try {
        for (const type of options) {
            const discriminatorValues = getDiscriminator(type.shape[discriminator]);
            if (!discriminatorValues.length) {
                throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
            }
            for (const value of discriminatorValues) {
                if (optionsMap.has(value)) {
                    throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
                }
                optionsMap.set(value, type);
            }
        }
        return new ZodDiscriminatedUnion({
            typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
            discriminator,
            options,
            optionsMap,
            ...processCreateParams(params),
        });
    }
}
function mergeValues(a, b) {
    const aType = getParsedType(a);
    const bType = getParsedType(b);
    if (a === b) {
        return { valid: true, data: a };
    }
    else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
        const bKeys = util.objectKeys(b);
        const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
        const newObj = { ...a, ...b };
        for (const key of sharedKeys) {
            const sharedValue = mergeValues(a[key], b[key]);
            if (!sharedValue.valid) {
                return { valid: false };
            }
            newObj[key] = sharedValue.data;
        }
        return { valid: true, data: newObj };
    }
    else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
        if (a.length !== b.length) {
            return { valid: false };
        }
        const newArray = [];
        for (let index = 0; index < a.length; index++) {
            const itemA = a[index];
            const itemB = b[index];
            const sharedValue = mergeValues(itemA, itemB);
            if (!sharedValue.valid) {
                return { valid: false };
            }
            newArray.push(sharedValue.data);
        }
        return { valid: true, data: newArray };
    }
    else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
        return { valid: true, data: a };
    }
    else {
        return { valid: false };
    }
}
class ZodIntersection extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const handleParsed = (parsedLeft, parsedRight) => {
            if (isAborted(parsedLeft) || isAborted(parsedRight)) {
                return INVALID;
            }
            const merged = mergeValues(parsedLeft.value, parsedRight.value);
            if (!merged.valid) {
                addIssueToContext(ctx, {
                    code: ZodIssueCode.invalid_intersection_types,
                });
                return INVALID;
            }
            if (isDirty(parsedLeft) || isDirty(parsedRight)) {
                status.dirty();
            }
            return { status: status.value, value: merged.data };
        };
        if (ctx.common.async) {
            return Promise.all([
                this._def.left._parseAsync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                }),
                this._def.right._parseAsync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                }),
            ]).then(([left, right]) => handleParsed(left, right));
        }
        else {
            return handleParsed(this._def.left._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            }), this._def.right._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            }));
        }
    }
}
ZodIntersection.create = (left, right, params) => {
    return new ZodIntersection({
        left: left,
        right: right,
        typeName: ZodFirstPartyTypeKind.ZodIntersection,
        ...processCreateParams(params),
    });
};
// type ZodTupleItems = [ZodTypeAny, ...ZodTypeAny[]];
class ZodTuple extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.array) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.array,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        if (ctx.data.length < this._def.items.length) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                minimum: this._def.items.length,
                inclusive: true,
                exact: false,
                type: "array",
            });
            return INVALID;
        }
        const rest = this._def.rest;
        if (!rest && ctx.data.length > this._def.items.length) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                maximum: this._def.items.length,
                inclusive: true,
                exact: false,
                type: "array",
            });
            status.dirty();
        }
        const items = [...ctx.data]
            .map((item, itemIndex) => {
            const schema = this._def.items[itemIndex] || this._def.rest;
            if (!schema)
                return null;
            return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
        })
            .filter((x) => !!x); // filter nulls
        if (ctx.common.async) {
            return Promise.all(items).then((results) => {
                return ParseStatus.mergeArray(status, results);
            });
        }
        else {
            return ParseStatus.mergeArray(status, items);
        }
    }
    get items() {
        return this._def.items;
    }
    rest(rest) {
        return new ZodTuple({
            ...this._def,
            rest,
        });
    }
}
ZodTuple.create = (schemas, params) => {
    if (!Array.isArray(schemas)) {
        throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
    }
    return new ZodTuple({
        items: schemas,
        typeName: ZodFirstPartyTypeKind.ZodTuple,
        rest: null,
        ...processCreateParams(params),
    });
};
class ZodRecord extends ZodType {
    get keySchema() {
        return this._def.keyType;
    }
    get valueSchema() {
        return this._def.valueType;
    }
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.object) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.object,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        const pairs = [];
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        for (const key in ctx.data) {
            pairs.push({
                key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
                value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
                alwaysSet: key in ctx.data,
            });
        }
        if (ctx.common.async) {
            return ParseStatus.mergeObjectAsync(status, pairs);
        }
        else {
            return ParseStatus.mergeObjectSync(status, pairs);
        }
    }
    get element() {
        return this._def.valueType;
    }
    static create(first, second, third) {
        if (second instanceof ZodType) {
            return new ZodRecord({
                keyType: first,
                valueType: second,
                typeName: ZodFirstPartyTypeKind.ZodRecord,
                ...processCreateParams(third),
            });
        }
        return new ZodRecord({
            keyType: ZodString.create(),
            valueType: first,
            typeName: ZodFirstPartyTypeKind.ZodRecord,
            ...processCreateParams(second),
        });
    }
}
class ZodMap extends ZodType {
    get keySchema() {
        return this._def.keyType;
    }
    get valueSchema() {
        return this._def.valueType;
    }
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.map) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.map,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        const pairs = [...ctx.data.entries()].map(([key, value], index) => {
            return {
                key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
                value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"])),
            };
        });
        if (ctx.common.async) {
            const finalMap = new Map();
            return Promise.resolve().then(async () => {
                for (const pair of pairs) {
                    const key = await pair.key;
                    const value = await pair.value;
                    if (key.status === "aborted" || value.status === "aborted") {
                        return INVALID;
                    }
                    if (key.status === "dirty" || value.status === "dirty") {
                        status.dirty();
                    }
                    finalMap.set(key.value, value.value);
                }
                return { status: status.value, value: finalMap };
            });
        }
        else {
            const finalMap = new Map();
            for (const pair of pairs) {
                const key = pair.key;
                const value = pair.value;
                if (key.status === "aborted" || value.status === "aborted") {
                    return INVALID;
                }
                if (key.status === "dirty" || value.status === "dirty") {
                    status.dirty();
                }
                finalMap.set(key.value, value.value);
            }
            return { status: status.value, value: finalMap };
        }
    }
}
ZodMap.create = (keyType, valueType, params) => {
    return new ZodMap({
        valueType,
        keyType,
        typeName: ZodFirstPartyTypeKind.ZodMap,
        ...processCreateParams(params),
    });
};
class ZodSet extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.set) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.set,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        const def = this._def;
        if (def.minSize !== null) {
            if (ctx.data.size < def.minSize.value) {
                addIssueToContext(ctx, {
                    code: ZodIssueCode.too_small,
                    minimum: def.minSize.value,
                    type: "set",
                    inclusive: true,
                    exact: false,
                    message: def.minSize.message,
                });
                status.dirty();
            }
        }
        if (def.maxSize !== null) {
            if (ctx.data.size > def.maxSize.value) {
                addIssueToContext(ctx, {
                    code: ZodIssueCode.too_big,
                    maximum: def.maxSize.value,
                    type: "set",
                    inclusive: true,
                    exact: false,
                    message: def.maxSize.message,
                });
                status.dirty();
            }
        }
        const valueType = this._def.valueType;
        function finalizeSet(elements) {
            const parsedSet = new Set();
            for (const element of elements) {
                if (element.status === "aborted")
                    return INVALID;
                if (element.status === "dirty")
                    status.dirty();
                parsedSet.add(element.value);
            }
            return { status: status.value, value: parsedSet };
        }
        const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
        if (ctx.common.async) {
            return Promise.all(elements).then((elements) => finalizeSet(elements));
        }
        else {
            return finalizeSet(elements);
        }
    }
    min(minSize, message) {
        return new ZodSet({
            ...this._def,
            minSize: { value: minSize, message: errorUtil.toString(message) },
        });
    }
    max(maxSize, message) {
        return new ZodSet({
            ...this._def,
            maxSize: { value: maxSize, message: errorUtil.toString(message) },
        });
    }
    size(size, message) {
        return this.min(size, message).max(size, message);
    }
    nonempty(message) {
        return this.min(1, message);
    }
}
ZodSet.create = (valueType, params) => {
    return new ZodSet({
        valueType,
        minSize: null,
        maxSize: null,
        typeName: ZodFirstPartyTypeKind.ZodSet,
        ...processCreateParams(params),
    });
};
class ZodFunction extends ZodType {
    constructor() {
        super(...arguments);
        this.validate = this.implement;
    }
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.function) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.function,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        function makeArgsIssue(args, error) {
            return makeIssue({
                data: args,
                path: ctx.path,
                errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), errorMap].filter((x) => !!x),
                issueData: {
                    code: ZodIssueCode.invalid_arguments,
                    argumentsError: error,
                },
            });
        }
        function makeReturnsIssue(returns, error) {
            return makeIssue({
                data: returns,
                path: ctx.path,
                errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), errorMap].filter((x) => !!x),
                issueData: {
                    code: ZodIssueCode.invalid_return_type,
                    returnTypeError: error,
                },
            });
        }
        const params = { errorMap: ctx.common.contextualErrorMap };
        const fn = ctx.data;
        if (this._def.returns instanceof ZodPromise) {
            // Would love a way to avoid disabling this rule, but we need
            // an alias (using an arrow function was what caused 2651).
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const me = this;
            return OK(async function (...args) {
                const error = new ZodError([]);
                const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
                    error.addIssue(makeArgsIssue(args, e));
                    throw error;
                });
                const result = await Reflect.apply(fn, this, parsedArgs);
                const parsedReturns = await me._def.returns._def.type
                    .parseAsync(result, params)
                    .catch((e) => {
                    error.addIssue(makeReturnsIssue(result, e));
                    throw error;
                });
                return parsedReturns;
            });
        }
        else {
            // Would love a way to avoid disabling this rule, but we need
            // an alias (using an arrow function was what caused 2651).
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const me = this;
            return OK(function (...args) {
                const parsedArgs = me._def.args.safeParse(args, params);
                if (!parsedArgs.success) {
                    throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
                }
                const result = Reflect.apply(fn, this, parsedArgs.data);
                const parsedReturns = me._def.returns.safeParse(result, params);
                if (!parsedReturns.success) {
                    throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
                }
                return parsedReturns.data;
            });
        }
    }
    parameters() {
        return this._def.args;
    }
    returnType() {
        return this._def.returns;
    }
    args(...items) {
        return new ZodFunction({
            ...this._def,
            args: ZodTuple.create(items).rest(ZodUnknown.create()),
        });
    }
    returns(returnType) {
        return new ZodFunction({
            ...this._def,
            returns: returnType,
        });
    }
    implement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
    }
    strictImplement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
    }
    static create(args, returns, params) {
        return new ZodFunction({
            args: (args ? args : ZodTuple.create([]).rest(ZodUnknown.create())),
            returns: returns || ZodUnknown.create(),
            typeName: ZodFirstPartyTypeKind.ZodFunction,
            ...processCreateParams(params),
        });
    }
}
class ZodLazy extends ZodType {
    get schema() {
        return this._def.getter();
    }
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        const lazySchema = this._def.getter();
        return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
    }
}
ZodLazy.create = (getter, params) => {
    return new ZodLazy({
        getter: getter,
        typeName: ZodFirstPartyTypeKind.ZodLazy,
        ...processCreateParams(params),
    });
};
class ZodLiteral extends ZodType {
    _parse(input) {
        if (input.data !== this._def.value) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                received: ctx.data,
                code: ZodIssueCode.invalid_literal,
                expected: this._def.value,
            });
            return INVALID;
        }
        return { status: "valid", value: input.data };
    }
    get value() {
        return this._def.value;
    }
}
ZodLiteral.create = (value, params) => {
    return new ZodLiteral({
        value: value,
        typeName: ZodFirstPartyTypeKind.ZodLiteral,
        ...processCreateParams(params),
    });
};
function createZodEnum(values, params) {
    return new ZodEnum({
        values,
        typeName: ZodFirstPartyTypeKind.ZodEnum,
        ...processCreateParams(params),
    });
}
class ZodEnum extends ZodType {
    _parse(input) {
        if (typeof input.data !== "string") {
            const ctx = this._getOrReturnCtx(input);
            const expectedValues = this._def.values;
            addIssueToContext(ctx, {
                expected: util.joinValues(expectedValues),
                received: ctx.parsedType,
                code: ZodIssueCode.invalid_type,
            });
            return INVALID;
        }
        if (!this._cache) {
            this._cache = new Set(this._def.values);
        }
        if (!this._cache.has(input.data)) {
            const ctx = this._getOrReturnCtx(input);
            const expectedValues = this._def.values;
            addIssueToContext(ctx, {
                received: ctx.data,
                code: ZodIssueCode.invalid_enum_value,
                options: expectedValues,
            });
            return INVALID;
        }
        return OK(input.data);
    }
    get options() {
        return this._def.values;
    }
    get enum() {
        const enumValues = {};
        for (const val of this._def.values) {
            enumValues[val] = val;
        }
        return enumValues;
    }
    get Values() {
        const enumValues = {};
        for (const val of this._def.values) {
            enumValues[val] = val;
        }
        return enumValues;
    }
    get Enum() {
        const enumValues = {};
        for (const val of this._def.values) {
            enumValues[val] = val;
        }
        return enumValues;
    }
    extract(values, newDef = this._def) {
        return ZodEnum.create(values, {
            ...this._def,
            ...newDef,
        });
    }
    exclude(values, newDef = this._def) {
        return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
            ...this._def,
            ...newDef,
        });
    }
}
ZodEnum.create = createZodEnum;
class ZodNativeEnum extends ZodType {
    _parse(input) {
        const nativeEnumValues = util.getValidEnumValues(this._def.values);
        const ctx = this._getOrReturnCtx(input);
        if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
            const expectedValues = util.objectValues(nativeEnumValues);
            addIssueToContext(ctx, {
                expected: util.joinValues(expectedValues),
                received: ctx.parsedType,
                code: ZodIssueCode.invalid_type,
            });
            return INVALID;
        }
        if (!this._cache) {
            this._cache = new Set(util.getValidEnumValues(this._def.values));
        }
        if (!this._cache.has(input.data)) {
            const expectedValues = util.objectValues(nativeEnumValues);
            addIssueToContext(ctx, {
                received: ctx.data,
                code: ZodIssueCode.invalid_enum_value,
                options: expectedValues,
            });
            return INVALID;
        }
        return OK(input.data);
    }
    get enum() {
        return this._def.values;
    }
}
ZodNativeEnum.create = (values, params) => {
    return new ZodNativeEnum({
        values: values,
        typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
        ...processCreateParams(params),
    });
};
class ZodPromise extends ZodType {
    unwrap() {
        return this._def.type;
    }
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.promise,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
        return OK(promisified.then((data) => {
            return this._def.type.parseAsync(data, {
                path: ctx.path,
                errorMap: ctx.common.contextualErrorMap,
            });
        }));
    }
}
ZodPromise.create = (schema, params) => {
    return new ZodPromise({
        type: schema,
        typeName: ZodFirstPartyTypeKind.ZodPromise,
        ...processCreateParams(params),
    });
};
class ZodEffects extends ZodType {
    innerType() {
        return this._def.schema;
    }
    sourceType() {
        return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects
            ? this._def.schema.sourceType()
            : this._def.schema;
    }
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const effect = this._def.effect || null;
        const checkCtx = {
            addIssue: (arg) => {
                addIssueToContext(ctx, arg);
                if (arg.fatal) {
                    status.abort();
                }
                else {
                    status.dirty();
                }
            },
            get path() {
                return ctx.path;
            },
        };
        checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
        if (effect.type === "preprocess") {
            const processed = effect.transform(ctx.data, checkCtx);
            if (ctx.common.async) {
                return Promise.resolve(processed).then(async (processed) => {
                    if (status.value === "aborted")
                        return INVALID;
                    const result = await this._def.schema._parseAsync({
                        data: processed,
                        path: ctx.path,
                        parent: ctx,
                    });
                    if (result.status === "aborted")
                        return INVALID;
                    if (result.status === "dirty")
                        return DIRTY(result.value);
                    if (status.value === "dirty")
                        return DIRTY(result.value);
                    return result;
                });
            }
            else {
                if (status.value === "aborted")
                    return INVALID;
                const result = this._def.schema._parseSync({
                    data: processed,
                    path: ctx.path,
                    parent: ctx,
                });
                if (result.status === "aborted")
                    return INVALID;
                if (result.status === "dirty")
                    return DIRTY(result.value);
                if (status.value === "dirty")
                    return DIRTY(result.value);
                return result;
            }
        }
        if (effect.type === "refinement") {
            const executeRefinement = (acc) => {
                const result = effect.refinement(acc, checkCtx);
                if (ctx.common.async) {
                    return Promise.resolve(result);
                }
                if (result instanceof Promise) {
                    throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
                }
                return acc;
            };
            if (ctx.common.async === false) {
                const inner = this._def.schema._parseSync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                });
                if (inner.status === "aborted")
                    return INVALID;
                if (inner.status === "dirty")
                    status.dirty();
                // return value is ignored
                executeRefinement(inner.value);
                return { status: status.value, value: inner.value };
            }
            else {
                return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
                    if (inner.status === "aborted")
                        return INVALID;
                    if (inner.status === "dirty")
                        status.dirty();
                    return executeRefinement(inner.value).then(() => {
                        return { status: status.value, value: inner.value };
                    });
                });
            }
        }
        if (effect.type === "transform") {
            if (ctx.common.async === false) {
                const base = this._def.schema._parseSync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                });
                if (!isValid(base))
                    return INVALID;
                const result = effect.transform(base.value, checkCtx);
                if (result instanceof Promise) {
                    throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
                }
                return { status: status.value, value: result };
            }
            else {
                return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
                    if (!isValid(base))
                        return INVALID;
                    return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
                        status: status.value,
                        value: result,
                    }));
                });
            }
        }
        util.assertNever(effect);
    }
}
ZodEffects.create = (schema, effect, params) => {
    return new ZodEffects({
        schema,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect,
        ...processCreateParams(params),
    });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
    return new ZodEffects({
        schema,
        effect: { type: "preprocess", transform: preprocess },
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        ...processCreateParams(params),
    });
};
class ZodOptional extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === ZodParsedType.undefined) {
            return OK(undefined);
        }
        return this._def.innerType._parse(input);
    }
    unwrap() {
        return this._def.innerType;
    }
}
ZodOptional.create = (type, params) => {
    return new ZodOptional({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodOptional,
        ...processCreateParams(params),
    });
};
class ZodNullable extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === ZodParsedType.null) {
            return OK(null);
        }
        return this._def.innerType._parse(input);
    }
    unwrap() {
        return this._def.innerType;
    }
}
ZodNullable.create = (type, params) => {
    return new ZodNullable({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodNullable,
        ...processCreateParams(params),
    });
};
class ZodDefault extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        let data = ctx.data;
        if (ctx.parsedType === ZodParsedType.undefined) {
            data = this._def.defaultValue();
        }
        return this._def.innerType._parse({
            data,
            path: ctx.path,
            parent: ctx,
        });
    }
    removeDefault() {
        return this._def.innerType;
    }
}
ZodDefault.create = (type, params) => {
    return new ZodDefault({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodDefault,
        defaultValue: typeof params.default === "function" ? params.default : () => params.default,
        ...processCreateParams(params),
    });
};
class ZodCatch extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        // newCtx is used to not collect issues from inner types in ctx
        const newCtx = {
            ...ctx,
            common: {
                ...ctx.common,
                issues: [],
            },
        };
        const result = this._def.innerType._parse({
            data: newCtx.data,
            path: newCtx.path,
            parent: {
                ...newCtx,
            },
        });
        if (isAsync(result)) {
            return result.then((result) => {
                return {
                    status: "valid",
                    value: result.status === "valid"
                        ? result.value
                        : this._def.catchValue({
                            get error() {
                                return new ZodError(newCtx.common.issues);
                            },
                            input: newCtx.data,
                        }),
                };
            });
        }
        else {
            return {
                status: "valid",
                value: result.status === "valid"
                    ? result.value
                    : this._def.catchValue({
                        get error() {
                            return new ZodError(newCtx.common.issues);
                        },
                        input: newCtx.data,
                    }),
            };
        }
    }
    removeCatch() {
        return this._def.innerType;
    }
}
ZodCatch.create = (type, params) => {
    return new ZodCatch({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodCatch,
        catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
        ...processCreateParams(params),
    });
};
class ZodNaN extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.nan) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.nan,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return { status: "valid", value: input.data };
    }
}
ZodNaN.create = (params) => {
    return new ZodNaN({
        typeName: ZodFirstPartyTypeKind.ZodNaN,
        ...processCreateParams(params),
    });
};
const BRAND = Symbol("zod_brand");
class ZodBranded extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        const data = ctx.data;
        return this._def.type._parse({
            data,
            path: ctx.path,
            parent: ctx,
        });
    }
    unwrap() {
        return this._def.type;
    }
}
class ZodPipeline extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.common.async) {
            const handleAsync = async () => {
                const inResult = await this._def.in._parseAsync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                });
                if (inResult.status === "aborted")
                    return INVALID;
                if (inResult.status === "dirty") {
                    status.dirty();
                    return DIRTY(inResult.value);
                }
                else {
                    return this._def.out._parseAsync({
                        data: inResult.value,
                        path: ctx.path,
                        parent: ctx,
                    });
                }
            };
            return handleAsync();
        }
        else {
            const inResult = this._def.in._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            });
            if (inResult.status === "aborted")
                return INVALID;
            if (inResult.status === "dirty") {
                status.dirty();
                return {
                    status: "dirty",
                    value: inResult.value,
                };
            }
            else {
                return this._def.out._parseSync({
                    data: inResult.value,
                    path: ctx.path,
                    parent: ctx,
                });
            }
        }
    }
    static create(a, b) {
        return new ZodPipeline({
            in: a,
            out: b,
            typeName: ZodFirstPartyTypeKind.ZodPipeline,
        });
    }
}
class ZodReadonly extends ZodType {
    _parse(input) {
        const result = this._def.innerType._parse(input);
        const freeze = (data) => {
            if (isValid(data)) {
                data.value = Object.freeze(data.value);
            }
            return data;
        };
        return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
    }
    unwrap() {
        return this._def.innerType;
    }
}
ZodReadonly.create = (type, params) => {
    return new ZodReadonly({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodReadonly,
        ...processCreateParams(params),
    });
};
////////////////////////////////////////
////////////////////////////////////////
//////////                    //////////
//////////      z.custom      //////////
//////////                    //////////
////////////////////////////////////////
////////////////////////////////////////
function cleanParams(params, data) {
    const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
    const p2 = typeof p === "string" ? { message: p } : p;
    return p2;
}
function custom(check, _params = {}, 
/**
 * @deprecated
 *
 * Pass `fatal` into the params object instead:
 *
 * ```ts
 * z.string().custom((val) => val.length > 5, { fatal: false })
 * ```
 *
 */
fatal) {
    if (check)
        return ZodAny.create().superRefine((data, ctx) => {
            const r = check(data);
            if (r instanceof Promise) {
                return r.then((r) => {
                    if (!r) {
                        const params = cleanParams(_params, data);
                        const _fatal = params.fatal ?? fatal ?? true;
                        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
                    }
                });
            }
            if (!r) {
                const params = cleanParams(_params, data);
                const _fatal = params.fatal ?? fatal ?? true;
                ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
            }
            return;
        });
    return ZodAny.create();
}
const late = {
    object: ZodObject.lazycreate,
};
var ZodFirstPartyTypeKind;
(function (ZodFirstPartyTypeKind) {
    ZodFirstPartyTypeKind["ZodString"] = "ZodString";
    ZodFirstPartyTypeKind["ZodNumber"] = "ZodNumber";
    ZodFirstPartyTypeKind["ZodNaN"] = "ZodNaN";
    ZodFirstPartyTypeKind["ZodBigInt"] = "ZodBigInt";
    ZodFirstPartyTypeKind["ZodBoolean"] = "ZodBoolean";
    ZodFirstPartyTypeKind["ZodDate"] = "ZodDate";
    ZodFirstPartyTypeKind["ZodSymbol"] = "ZodSymbol";
    ZodFirstPartyTypeKind["ZodUndefined"] = "ZodUndefined";
    ZodFirstPartyTypeKind["ZodNull"] = "ZodNull";
    ZodFirstPartyTypeKind["ZodAny"] = "ZodAny";
    ZodFirstPartyTypeKind["ZodUnknown"] = "ZodUnknown";
    ZodFirstPartyTypeKind["ZodNever"] = "ZodNever";
    ZodFirstPartyTypeKind["ZodVoid"] = "ZodVoid";
    ZodFirstPartyTypeKind["ZodArray"] = "ZodArray";
    ZodFirstPartyTypeKind["ZodObject"] = "ZodObject";
    ZodFirstPartyTypeKind["ZodUnion"] = "ZodUnion";
    ZodFirstPartyTypeKind["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
    ZodFirstPartyTypeKind["ZodIntersection"] = "ZodIntersection";
    ZodFirstPartyTypeKind["ZodTuple"] = "ZodTuple";
    ZodFirstPartyTypeKind["ZodRecord"] = "ZodRecord";
    ZodFirstPartyTypeKind["ZodMap"] = "ZodMap";
    ZodFirstPartyTypeKind["ZodSet"] = "ZodSet";
    ZodFirstPartyTypeKind["ZodFunction"] = "ZodFunction";
    ZodFirstPartyTypeKind["ZodLazy"] = "ZodLazy";
    ZodFirstPartyTypeKind["ZodLiteral"] = "ZodLiteral";
    ZodFirstPartyTypeKind["ZodEnum"] = "ZodEnum";
    ZodFirstPartyTypeKind["ZodEffects"] = "ZodEffects";
    ZodFirstPartyTypeKind["ZodNativeEnum"] = "ZodNativeEnum";
    ZodFirstPartyTypeKind["ZodOptional"] = "ZodOptional";
    ZodFirstPartyTypeKind["ZodNullable"] = "ZodNullable";
    ZodFirstPartyTypeKind["ZodDefault"] = "ZodDefault";
    ZodFirstPartyTypeKind["ZodCatch"] = "ZodCatch";
    ZodFirstPartyTypeKind["ZodPromise"] = "ZodPromise";
    ZodFirstPartyTypeKind["ZodBranded"] = "ZodBranded";
    ZodFirstPartyTypeKind["ZodPipeline"] = "ZodPipeline";
    ZodFirstPartyTypeKind["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
const instanceOfType = (
// const instanceOfType = <T extends new (...args: any[]) => any>(
cls, params = {
    message: `Input not instance of ${cls.name}`,
}) => custom((data) => data instanceof cls, params);
const stringType = ZodString.create;
const numberType = ZodNumber.create;
const nanType = ZodNaN.create;
const bigIntType = ZodBigInt.create;
const booleanType = ZodBoolean.create;
const dateType = ZodDate.create;
const symbolType = ZodSymbol.create;
const undefinedType = ZodUndefined.create;
const nullType = ZodNull.create;
const anyType = ZodAny.create;
const unknownType = ZodUnknown.create;
const neverType = ZodNever.create;
const voidType = ZodVoid.create;
const arrayType = ZodArray.create;
const objectType = ZodObject.create;
const strictObjectType = ZodObject.strictCreate;
const unionType = ZodUnion.create;
const discriminatedUnionType = ZodDiscriminatedUnion.create;
const intersectionType = ZodIntersection.create;
const tupleType = ZodTuple.create;
const recordType = ZodRecord.create;
const mapType = ZodMap.create;
const setType = ZodSet.create;
const functionType = ZodFunction.create;
const lazyType = ZodLazy.create;
const literalType = ZodLiteral.create;
const enumType = ZodEnum.create;
const nativeEnumType = ZodNativeEnum.create;
const promiseType = ZodPromise.create;
const effectsType = ZodEffects.create;
const optionalType = ZodOptional.create;
const nullableType = ZodNullable.create;
const preprocessType = ZodEffects.createWithPreprocess;
const pipelineType = ZodPipeline.create;
const ostring = () => stringType().optional();
const onumber = () => numberType().optional();
const oboolean = () => booleanType().optional();
const coerce = {
    string: ((arg) => ZodString.create({ ...arg, coerce: true })),
    number: ((arg) => ZodNumber.create({ ...arg, coerce: true })),
    boolean: ((arg) => ZodBoolean.create({
        ...arg,
        coerce: true,
    })),
    bigint: ((arg) => ZodBigInt.create({ ...arg, coerce: true })),
    date: ((arg) => ZodDate.create({ ...arg, coerce: true })),
};
const NEVER = INVALID;

const z$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    BRAND,
    DIRTY,
    EMPTY_PATH,
    INVALID,
    NEVER,
    OK,
    ParseStatus,
    Schema: ZodType,
    ZodAny,
    ZodArray,
    ZodBigInt,
    ZodBoolean,
    ZodBranded,
    ZodCatch,
    ZodDate,
    ZodDefault,
    ZodDiscriminatedUnion,
    ZodEffects,
    ZodEnum,
    ZodError,
    get ZodFirstPartyTypeKind () { return ZodFirstPartyTypeKind; },
    ZodFunction,
    ZodIntersection,
    ZodIssueCode,
    ZodLazy,
    ZodLiteral,
    ZodMap,
    ZodNaN,
    ZodNativeEnum,
    ZodNever,
    ZodNull,
    ZodNullable,
    ZodNumber,
    ZodObject,
    ZodOptional,
    ZodParsedType,
    ZodPipeline,
    ZodPromise,
    ZodReadonly,
    ZodRecord,
    ZodSchema: ZodType,
    ZodSet,
    ZodString,
    ZodSymbol,
    ZodTransformer: ZodEffects,
    ZodTuple,
    ZodType,
    ZodUndefined,
    ZodUnion,
    ZodUnknown,
    ZodVoid,
    addIssueToContext,
    any: anyType,
    array: arrayType,
    bigint: bigIntType,
    boolean: booleanType,
    coerce,
    custom,
    date: dateType,
    datetimeRegex,
    defaultErrorMap: errorMap,
    discriminatedUnion: discriminatedUnionType,
    effect: effectsType,
    enum: enumType,
    function: functionType,
    getErrorMap,
    getParsedType,
    instanceof: instanceOfType,
    intersection: intersectionType,
    isAborted,
    isAsync,
    isDirty,
    isValid,
    late,
    lazy: lazyType,
    literal: literalType,
    makeIssue,
    map: mapType,
    nan: nanType,
    nativeEnum: nativeEnumType,
    never: neverType,
    null: nullType,
    nullable: nullableType,
    number: numberType,
    object: objectType,
    get objectUtil () { return objectUtil; },
    oboolean,
    onumber,
    optional: optionalType,
    ostring,
    pipeline: pipelineType,
    preprocess: preprocessType,
    promise: promiseType,
    quotelessJson,
    record: recordType,
    set: setType,
    setErrorMap,
    strictObject: strictObjectType,
    string: stringType,
    symbol: symbolType,
    transformer: effectsType,
    tuple: tupleType,
    undefined: undefinedType,
    union: unionType,
    unknown: unknownType,
    get util () { return util; },
    void: voidType
}, Symbol.toStringTag, { value: 'Module' }));

const z = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    BRAND,
    DIRTY,
    EMPTY_PATH,
    INVALID,
    NEVER,
    OK,
    ParseStatus,
    Schema: ZodType,
    ZodAny,
    ZodArray,
    ZodBigInt,
    ZodBoolean,
    ZodBranded,
    ZodCatch,
    ZodDate,
    ZodDefault,
    ZodDiscriminatedUnion,
    ZodEffects,
    ZodEnum,
    ZodError,
    get ZodFirstPartyTypeKind () { return ZodFirstPartyTypeKind; },
    ZodFunction,
    ZodIntersection,
    ZodIssueCode,
    ZodLazy,
    ZodLiteral,
    ZodMap,
    ZodNaN,
    ZodNativeEnum,
    ZodNever,
    ZodNull,
    ZodNullable,
    ZodNumber,
    ZodObject,
    ZodOptional,
    ZodParsedType,
    ZodPipeline,
    ZodPromise,
    ZodReadonly,
    ZodRecord,
    ZodSchema: ZodType,
    ZodSet,
    ZodString,
    ZodSymbol,
    ZodTransformer: ZodEffects,
    ZodTuple,
    ZodType,
    ZodUndefined,
    ZodUnion,
    ZodUnknown,
    ZodVoid,
    addIssueToContext,
    any: anyType,
    array: arrayType,
    bigint: bigIntType,
    boolean: booleanType,
    coerce,
    custom,
    date: dateType,
    datetimeRegex,
    default: z$1,
    defaultErrorMap: errorMap,
    discriminatedUnion: discriminatedUnionType,
    effect: effectsType,
    enum: enumType,
    function: functionType,
    getErrorMap,
    getParsedType,
    instanceof: instanceOfType,
    intersection: intersectionType,
    isAborted,
    isAsync,
    isDirty,
    isValid,
    late,
    lazy: lazyType,
    literal: literalType,
    makeIssue,
    map: mapType,
    nan: nanType,
    nativeEnum: nativeEnumType,
    never: neverType,
    null: nullType,
    nullable: nullableType,
    number: numberType,
    object: objectType,
    get objectUtil () { return objectUtil; },
    oboolean,
    onumber,
    optional: optionalType,
    ostring,
    pipeline: pipelineType,
    preprocess: preprocessType,
    promise: promiseType,
    quotelessJson,
    record: recordType,
    set: setType,
    setErrorMap,
    strictObject: strictObjectType,
    string: stringType,
    symbol: symbolType,
    transformer: effectsType,
    tuple: tupleType,
    undefined: undefinedType,
    union: unionType,
    unknown: unknownType,
    get util () { return util; },
    void: voidType,
    z: z$1
}, Symbol.toStringTag, { value: 'Module' }));

const RouteStateContext = /* @__PURE__ */ createContextId("qc-s");
const ContentContext = /* @__PURE__ */ createContextId("qc-c");
const ContentInternalContext = /* @__PURE__ */ createContextId("qc-ic");
const DocumentHeadContext = /* @__PURE__ */ createContextId("qc-h");
const RouteLocationContext = /* @__PURE__ */ createContextId("qc-l");
const RouteNavigateContext = /* @__PURE__ */ createContextId("qc-n");
const RouteActionContext = /* @__PURE__ */ createContextId("qc-a");
const RoutePreventNavigateContext = /* @__PURE__ */ createContextId("qc-p");
const spaInit = eventQrl(/*#__PURE__*/ _noopQrl("s_gNwUJOjjmEc"));
const s_yPdH7y4ImA0 = ()=>{
    const serverData = useServerData("containerAttributes");
    if (!serverData) throw new Error("PrefetchServiceWorker component must be rendered on the server.");
    _jsxBranch();
    const context = useContext(ContentInternalContext);
    if (context.value && context.value.length > 0) {
        const contentsLen = context.value.length;
        let cmp = null;
        for(let i = contentsLen - 1; i >= 0; i--)if (context.value[i].default) cmp = _jsxC(context.value[i].default, {
            children: cmp
        }, 1, "P4_0");
        return /* @__PURE__ */ _jsxC(Fragment, {
            children: [
                cmp,
                /* @__PURE__ */ _jsxQ("script", {
                    "document:onQCInit$": spaInit,
                    "document:onQInit$": _qrlSync(()=>{
                        ((w, h)=>{
                            if (!w._qcs && h.scrollRestoration === "manual") {
                                w._qcs = true;
                                const s = h.state?._qCityScroll;
                                if (s) w.scrollTo(s.x, s.y);
                                document.dispatchEvent(new Event("qcinit"));
                            }
                        })(window, history);
                    }, '()=>{((w,h)=>{if(!w._qcs&&h.scrollRestoration==="manual"){w._qcs=true;const s=h.state?._qCityScroll;if(s){w.scrollTo(s.x,s.y);}document.dispatchEvent(new Event("qcinit"));}})(window,history);}')
                }, null, null, 2, "P4_1")
            ]
        }, 1, "P4_2");
    }
    return SkipRender;
};
const RouterOutlet = /*#__PURE__*/ componentQrl(/*#__PURE__*/ inlinedQrl(s_yPdH7y4ImA0, "s_yPdH7y4ImA0"));
const QACTION_KEY = "qaction";
const toUrl = (url, baseUrl)=>new URL(url, baseUrl.href);
const isSameOrigin = (a, b)=>a.origin === b.origin;
const withSlash = (path)=>path.endsWith("/") ? path : path + "/";
const isSamePathname = ({ pathname: a }, { pathname: b })=>{
    const lDiff = Math.abs(a.length - b.length);
    return lDiff === 0 ? a === b : lDiff === 1 && withSlash(a) === withSlash(b);
};
const isSameSearchQuery = (a, b)=>a.search === b.search;
const isSamePath = (a, b)=>isSameSearchQuery(a, b) && isSamePathname(a, b);
const isPromise = (value)=>{
    return value && typeof value.then === "function";
};
const resolveHead = (endpoint, routeLocation, contentModules, locale)=>{
    const head = createDocumentHead();
    const getData = (loaderOrAction)=>{
        const id = loaderOrAction.__id;
        if (loaderOrAction.__brand === "server_loader") {
            if (!(id in endpoint.loaders)) throw new Error("You can not get the returned data of a loader that has not been executed for this request.");
        }
        const data = endpoint.loaders[id];
        if (isPromise(data)) throw new Error("Loaders returning a promise can not be resolved for the head function.");
        return data;
    };
    const headProps = {
        head,
        withLocale: (fn)=>withLocale(locale, fn),
        resolveValue: getData,
        ...routeLocation
    };
    for(let i = contentModules.length - 1; i >= 0; i--){
        const contentModuleHead = contentModules[i] && contentModules[i].head;
        if (contentModuleHead) {
            if (typeof contentModuleHead === "function") resolveDocumentHead(head, withLocale(locale, ()=>contentModuleHead(headProps)));
            else if (typeof contentModuleHead === "object") resolveDocumentHead(head, contentModuleHead);
        }
    }
    return headProps.head;
};
const resolveDocumentHead = (resolvedHead, updatedHead)=>{
    if (typeof updatedHead.title === "string") resolvedHead.title = updatedHead.title;
    mergeArray(resolvedHead.meta, updatedHead.meta);
    mergeArray(resolvedHead.links, updatedHead.links);
    mergeArray(resolvedHead.styles, updatedHead.styles);
    mergeArray(resolvedHead.scripts, updatedHead.scripts);
    Object.assign(resolvedHead.frontmatter, updatedHead.frontmatter);
};
const mergeArray = (existingArr, newArr)=>{
    if (Array.isArray(newArr)) for (const newItem of newArr){
        if (typeof newItem.key === "string") {
            const existingIndex = existingArr.findIndex((i)=>i.key === newItem.key);
            if (existingIndex > -1) {
                existingArr[existingIndex] = newItem;
                continue;
            }
        }
        existingArr.push(newItem);
    }
};
const createDocumentHead = ()=>({
        title: "",
        meta: [],
        links: [],
        styles: [],
        scripts: [],
        frontmatter: {}
    });
const useDocumentHead = ()=>useContext(DocumentHeadContext);
const useLocation = ()=>useContext(RouteLocationContext);
const useNavigate = ()=>useContext(RouteNavigateContext);
const useAction = ()=>useContext(RouteActionContext);
const useQwikCityEnv = ()=>noSerialize(useServerData("qwikcity"));
const preventNav = {};
const internalState = {
    navCount: 0
};
const s_i0OX5Main1M = `:root{view-transition-name:none}`;
const s_SNVSoEmabck = (fn$)=>{
    return;
};
const s_Aqeo8lKe3IU = async (path, opt)=>{
    const [actionState, navResolver, routeInternal, routeLocation] = useLexicalScope();
    const { type = "link", forceReload = path === void 0, replaceState = false, scroll = true } = typeof opt === "object" ? opt : {
        forceReload: opt
    };
    internalState.navCount++;
    const lastDest = routeInternal.value.dest;
    const dest = path === void 0 ? lastDest : typeof path === "number" ? path : toUrl(path, routeLocation.url);
    if (preventNav.$cbs$ && (forceReload || typeof dest === "number" || !isSamePath(dest, lastDest) || !isSameOrigin(dest, lastDest))) {
        const ourNavId = internalState.navCount;
        const prevents = await Promise.all([
            ...preventNav.$cbs$.values()
        ].map((cb)=>cb(dest)));
        if (ourNavId !== internalState.navCount || prevents.some(Boolean)) {
            if (ourNavId === internalState.navCount && type === "popstate") history.pushState(null, "", lastDest);
            return;
        }
    }
    if (typeof dest === "number") return;
    if (!isSameOrigin(dest, lastDest)) return;
    if (!forceReload && isSamePath(dest, lastDest)) return;
    routeInternal.value = {
        type,
        dest,
        forceReload,
        replaceState,
        scroll
    };
    actionState.value = void 0;
    routeLocation.isNavigating = true;
    return new Promise((resolve)=>{
        navResolver.r = resolve;
    });
};
const s_RZOV0QbO60Y = ({ track })=>{
    const [actionState, content, contentInternal, documentHead, env, goto, loaderState, navResolver, props, routeInternal, routeLocation] = useLexicalScope();
    async function run() {
        const navigation = track(routeInternal);
        const action = track(actionState);
        const locale = getLocale("");
        const prevUrl = routeLocation.url;
        const navType = action ? "form" : navigation.type;
        navigation.replaceState;
        let trackUrl;
        let clientPageData;
        let loadedRoute = null;
        trackUrl = new URL(navigation.dest, routeLocation.url);
        loadedRoute = env.loadedRoute;
        clientPageData = env.response;
        if (loadedRoute) {
            const [routeName, params, mods, menu] = loadedRoute;
            const contentModules = mods;
            const pageModule = contentModules[contentModules.length - 1];
            if (navigation.dest.search && !!isSamePath(trackUrl, prevUrl)) trackUrl.search = navigation.dest.search;
            if (!isSamePath(trackUrl, prevUrl)) routeLocation.prevUrl = prevUrl;
            routeLocation.url = trackUrl;
            routeLocation.params = {
                ...params
            };
            routeInternal.untrackedValue = {
                type: navType,
                dest: trackUrl
            };
            const resolvedHead = resolveHead(clientPageData, routeLocation, contentModules, locale);
            content.headings = pageModule.headings;
            content.menu = menu;
            contentInternal.value = noSerialize(contentModules);
            documentHead.links = resolvedHead.links;
            documentHead.meta = resolvedHead.meta;
            documentHead.styles = resolvedHead.styles;
            documentHead.scripts = resolvedHead.scripts;
            documentHead.title = resolvedHead.title;
            documentHead.frontmatter = resolvedHead.frontmatter;
        }
    }
    const promise = run();
    return promise;
};
const s_8X6hWgnQRxE = (props)=>{
    useStylesQrl(/*#__PURE__*/ inlinedQrl(s_i0OX5Main1M, "s_i0OX5Main1M"));
    const env = useQwikCityEnv();
    if (!env?.params) throw new Error(`Missing Qwik City Env Data for help visit https://github.com/QwikDev/qwik/issues/6237`);
    const urlEnv = useServerData("url");
    if (!urlEnv) throw new Error(`Missing Qwik URL Env Data`);
    if (env.ev.originalUrl.pathname !== env.ev.url.pathname && true) throw new Error(`enableRequestRewrite is an experimental feature and is not enabled. Please enable the feature flag by adding \`experimental: ["enableRequestRewrite"]\` to your qwikVite plugin options.`);
    const url = new URL(urlEnv);
    const routeLocation = useStore({
        url,
        params: env.params,
        isNavigating: false,
        prevUrl: void 0
    }, {
        deep: false
    });
    const navResolver = {};
    const loaderState = _weakSerialize(useStore(env.response.loaders, {
        deep: false
    }));
    const routeInternal = useSignal({
        type: "initial",
        dest: url,
        forceReload: false,
        replaceState: false,
        scroll: true
    });
    const documentHead = useStore(createDocumentHead);
    const content = useStore({
        headings: void 0,
        menu: void 0
    });
    const contentInternal = useSignal();
    const currentActionId = env.response.action;
    const currentAction = currentActionId ? env.response.loaders[currentActionId] : void 0;
    const actionState = useSignal(currentAction ? {
        id: currentActionId,
        data: env.response.formData,
        output: {
            result: currentAction,
            status: env.response.status
        }
    } : void 0);
    const registerPreventNav = /*#__PURE__*/ inlinedQrl(s_SNVSoEmabck, "s_SNVSoEmabck");
    const goto = /*#__PURE__*/ inlinedQrl(s_Aqeo8lKe3IU, "s_Aqeo8lKe3IU", [
        actionState,
        navResolver,
        routeInternal,
        routeLocation
    ]);
    useContextProvider(ContentContext, content);
    useContextProvider(ContentInternalContext, contentInternal);
    useContextProvider(DocumentHeadContext, documentHead);
    useContextProvider(RouteLocationContext, routeLocation);
    useContextProvider(RouteNavigateContext, goto);
    useContextProvider(RouteStateContext, loaderState);
    useContextProvider(RouteActionContext, actionState);
    useContextProvider(RoutePreventNavigateContext, registerPreventNav);
    useTaskQrl(/*#__PURE__*/ inlinedQrl(s_RZOV0QbO60Y, "s_RZOV0QbO60Y", [
        actionState,
        content,
        contentInternal,
        documentHead,
        env,
        goto,
        loaderState,
        navResolver,
        props,
        routeInternal,
        routeLocation
    ]));
    return /* @__PURE__ */ _jsxC(Slot, null, 3, "P4_3");
};
const QwikCityProvider = /*#__PURE__*/ componentQrl(/*#__PURE__*/ inlinedQrl(s_8X6hWgnQRxE, "s_8X6hWgnQRxE"));
const s_iq02af90j2s = (input = {})=>{
    const [currentAction, id, loc, state] = useLexicalScope();
    throw new Error(`Actions can not be invoked within the server during SSR.
Action.run() can only be called on the browser, for example when a user clicks a button, or submits a form.`);
};
const routeActionQrl = (actionQrl, ...rest)=>{
    const { id, validators } = getValidators(rest, actionQrl);
    function action() {
        const loc = useLocation();
        const currentAction = useAction();
        const initialState = {
            actionPath: `?${QACTION_KEY}=${id}`,
            submitted: false,
            isRunning: false,
            status: void 0,
            value: void 0,
            formData: void 0
        };
        const state = useStore(()=>{
            const value = currentAction.value;
            if (value && value?.id === id) {
                const data = value.data;
                if (data instanceof FormData) initialState.formData = data;
                if (value.output) {
                    const { status, result } = value.output;
                    initialState.status = status;
                    initialState.value = result;
                }
            }
            return initialState;
        });
        const submit = /*#__PURE__*/ inlinedQrl(s_iq02af90j2s, "s_iq02af90j2s", [
            currentAction,
            id,
            loc,
            state
        ]);
        initialState.submit = submit;
        return state;
    }
    action.__brand = "server_action";
    action.__validators = validators;
    action.__qrl = actionQrl;
    action.__id = id;
    Object.freeze(action);
    return action;
};
const routeLoaderQrl = (loaderQrl, ...rest)=>{
    const { id, validators } = getValidators(rest, loaderQrl);
    function loader() {
        return useContext(RouteStateContext, (state)=>{
            if (!(id in state)) throw new Error(`routeLoader$ "${loaderQrl.getSymbol()}" was invoked in a route where it was not declared.
    This is because the routeLoader$ was not exported in a 'layout.tsx' or 'index.tsx' file of the existing route.
    For more information check: https://qwik.dev/qwikcity/route-loader/

    If your are managing reusable logic or a library it is essential that this function is re-exported from within 'layout.tsx' or 'index.tsx file of the existing route otherwise it will not run or throw exception.
    For more information check: https://qwik.dev/docs/re-exporting-loaders/`);
            return _wrapProp(state, id);
        });
    }
    loader.__brand = "server_loader";
    loader.__qrl = loaderQrl;
    loader.__validators = validators;
    loader.__id = id;
    Object.freeze(loader);
    return loader;
};
const flattenZodIssues = (issues)=>{
    issues = Array.isArray(issues) ? issues : [
        issues
    ];
    return issues.reduce((acc, issue)=>{
        const isExpectingArray = "expected" in issue && issue.expected === "array";
        const hasArrayType = issue.path.some((path)=>typeof path === "number") || isExpectingArray;
        if (hasArrayType) {
            const keySuffix = "expected" in issue && issue.expected === "array" ? "[]" : "";
            const key = issue.path.map((path)=>typeof path === "number" ? "*" : path).join(".").replace(/\.\*/g, "[]") + keySuffix;
            acc[key] = acc[key] || [];
            if (Array.isArray(acc[key])) acc[key].push(issue.message);
            return acc;
        } else acc[issue.path.join(".")] = issue.message;
        return acc;
    }, {});
};
const zodQrl = (qrl)=>{
    return {
        __brand: "zod",
        async validate (ev, inputData) {
            const schema = await qrl.resolve().then((obj)=>{
                if (typeof obj === "function") obj = obj(z, ev);
                if (obj instanceof ZodType) return obj;
                else return objectType(obj);
            });
            const data = inputData ?? await ev.parseBody();
            const result = await schema.safeParseAsync(data);
            if (result.success) return result;
            else return {
                success: false,
                status: 400,
                error: {
                    formErrors: result.error.flatten().formErrors,
                    fieldErrors: flattenZodIssues(result.error.issues)
                }
            };
        }
    };
};
const getValidators = (rest, qrl)=>{
    let id;
    const validators = [];
    if (rest.length === 1) {
        const options = rest[0];
        if (options && typeof options === "object") {
            if ("validate" in options) validators.push(options);
            else {
                id = options.id;
                if (options.validation) validators.push(...options.validation);
            }
        }
    } else if (rest.length > 1) validators.push(...rest.filter((v2)=>!!v2));
    if (typeof id === "string") id = `id_${id}`;
    else id = qrl.getHash();
    return {
        validators: validators.reverse(),
        id
    };
};
const s_VXFb4R77gNw = (evt)=>{
    const [action] = useLexicalScope();
    if (!action.submitted) return action.submit(evt);
};
const Form = ({ action, spaReset, reloadDocument, onSubmit$, ...rest }, key)=>{
    _jsxBranch();
    if (action) {
        const isArrayApi = Array.isArray(onSubmit$);
        if (isArrayApi) return _jsxS("form", {
            ...rest,
            get action () {
                return action.actionPath;
            },
            action: _wrapSignal(action, "actionPath"),
            "preventdefault:submit": !reloadDocument,
            method: "post",
            ["data-spa-reset"]: spaReset ? "true" : void 0,
            onSubmit$: [
                ...onSubmit$,
                // action.submit "submitcompleted" event for onSubmitCompleted$ events
                !reloadDocument ? /*#__PURE__*/ inlinedQrl(s_VXFb4R77gNw, "s_VXFb4R77gNw", [
                    action
                ]) : void 0
            ]
        }, {
            method: _IMMUTABLE
        }, 0, key);
        return _jsxS("form", {
            ...rest,
            get action () {
                return action.actionPath;
            },
            action: _wrapSignal(action, "actionPath"),
            "preventdefault:submit": !reloadDocument,
            method: "post",
            ["data-spa-reset"]: spaReset ? "true" : void 0,
            onSubmit$: [
                // action.submit "submitcompleted" event for onSubmitCompleted$ events
                !reloadDocument ? action.submit : void 0,
                // TODO: v2 breaking change this should fire before the action.submit
                onSubmit$
            ]
        }, {
            method: _IMMUTABLE
        }, 0, key);
    } else return /* @__PURE__ */ _jsxC(GetForm, {
        spaReset,
        reloadDocument,
        onSubmit$,
        ...rest
    }, 0, key);
};
const s_i0j0Ky0dmXI = async (_evt, form)=>{
    const [nav] = useLexicalScope();
    const formData = new FormData(form);
    const params = new URLSearchParams();
    formData.forEach((value, key)=>{
        if (typeof value === "string") params.append(key, value);
    });
    await nav("?" + params.toString(), {
        type: "form",
        forceReload: true
    });
};
const s_jDIH6nOiKOA = (_evt, form)=>{
    if (form.getAttribute("data-spa-reset") === "true") form.reset();
    form.dispatchEvent(new CustomEvent("submitcompleted", {
        bubbles: false,
        cancelable: false,
        composed: false,
        detail: {
            status: 200
        }
    }));
};
const s_d5PZYh2bVVI = (props)=>{
    const rest = _restProps(props, [
        "action",
        "spaReset",
        "reloadDocument",
        "onSubmit$"
    ]);
    const nav = useNavigate();
    return /* @__PURE__ */ _jsxS("form", {
        action: "get",
        get "preventdefault:submit" () {
            return !props.reloadDocument;
        },
        get "data-spa-reset" () {
            return props.spaReset ? "true" : void 0;
        },
        ...rest,
        children: /* @__PURE__ */ _jsxC(Slot, null, 3, "P4_10"),
        onSubmit$: [
            ...Array.isArray(props.onSubmit$) ? props.onSubmit$ : [
                props.onSubmit$
            ],
            /*#__PURE__*/ inlinedQrl(s_i0j0Ky0dmXI, "s_i0j0Ky0dmXI", [
                nav
            ]),
            /*#__PURE__*/ inlinedQrl(s_jDIH6nOiKOA, "s_jDIH6nOiKOA")
        ]
    }, {
        action: _IMMUTABLE,
        "preventdefault:submit": _fnSignal((p0)=>!p0.reloadDocument, [
            props
        ], "!p0.reloadDocument"),
        "data-spa-reset": _fnSignal((p0)=>p0.spaReset ? "true" : void 0, [
            props
        ], 'p0.spaReset?"true":void 0')
    }, 0, "P4_11");
};
const GetForm = /*#__PURE__*/ componentQrl(/*#__PURE__*/ inlinedQrl(s_d5PZYh2bVVI, "s_d5PZYh2bVVI"));

export { _pauseFromContexts as A, getPlatform as B, useDocumentHead as C, _jsxS as D, Fragment as F, QwikCityProvider as Q, RouterOutlet as R, Slot as S, _serializeData as _, _deserializeData as a, _jsxQ as b, componentQrl as c, _jsxC as d, _IMMUTABLE as e, _fnSignal as f, useSignal as g, _noopQrl as h, inlinedQrl as i, useLexicalScope as j, useOnWindow as k, _wrapSignal as l, useStylesScopedQrl as m, useLocation as n, useStore as o, useVisibleTaskQrl as p, routeActionQrl as q, routeLoaderQrl as r, stringType as s, Form as t, useStylesQrl as u, verifySerializable as v, setPlatform as w, jsx as x, _renderSSR as y, zodQrl as z };

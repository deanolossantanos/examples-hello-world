import { c as componentQrl, i as inlinedQrl, b as _jsxC, d as _jsxQ, F as Fragment } from './q-DNXU7C1w.js';

const s_B0lqk5IDDy4 = () => {
  return /* @__PURE__ */ _jsxC(Fragment, {
    children: [
      /* @__PURE__ */ _jsxQ("h1", null, null, "Hi 👋", 3, null),
      /* @__PURE__ */ _jsxQ("div", null, null, [
        "Can't wait to see what you build with qwik!",
        /* @__PURE__ */ _jsxQ("br", null, null, null, 3, null),
        "Happy coding."
      ], 3, null)
    ]
  }, 3, "i8_0");
};
const index = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_B0lqk5IDDy4, "s_B0lqk5IDDy4"));
const head = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description"
    }
  ]
};

const IndexRoute = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index,
  head
}, Symbol.toStringTag, { value: 'Module' }));

/** Qwik City Plan */

/** Qwik City ServerPlugins (0) */
const serverPlugins = [
];

/** Qwik City Routes (1) */
const routes = [
  [ "/", [ ()=>IndexRoute ], "/", [] ],
];

/** Qwik City Menus (0) */
const menus = [
];
const trailingSlash = true;
const basePathname = "/";
const cacheModules = true;
const qwikCityPlan = { routes, serverPlugins, menus, trailingSlash, basePathname, cacheModules };

export { basePathname, cacheModules, qwikCityPlan as default, menus, routes, serverPlugins, trailingSlash };

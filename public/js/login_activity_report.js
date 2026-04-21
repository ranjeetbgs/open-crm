"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["login_activity_report"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/login_activity_report.vue?vue&type=script&lang=js"
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/login_activity_report.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nprogress */ "./node_modules/nprogress/nprogress.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nprogress__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../utils */ "./resources/src/utils/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  metaInfo: {
    title: "Login Activity Report"
  },
  data: function data() {
    return {
      isLoading: true,
      serverParams: {
        sort: {
          field: "login_at",
          type: "desc"
        },
        page: 1,
        perPage: 50
      },
      limit: "50",
      totalRows: 0,
      sessions: []
    };
  },
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_0__.mapGetters)(["currentUserPermissions"])), {}, {
    columns: function columns() {
      return [{
        label: "Device / Browser",
        field: "device",
        tdClass: "text-left",
        thClass: "text-left",
        sortable: false
      }, {
        label: "IP Address",
        field: "ip_address",
        tdClass: "text-left",
        thClass: "text-left",
        sortable: false
      }, {
        label: "Login date & time",
        field: "login_at",
        tdClass: "text-left",
        thClass: "text-left",
        sortable: false
      }, {
        label: "Last activity",
        field: "last_activity_at",
        tdClass: "text-left",
        thClass: "text-left",
        sortable: false
      }, {
        label: "Status",
        field: "status",
        tdClass: "text-left",
        thClass: "text-left",
        sortable: false
      }];
    }
  }),
  created: function created() {
    // Permission gate (UI). Backend also enforces.
    var perms = this.currentUserPermissions || [];
    var allowed = perms.includes("login_device_management") || perms.includes("setting_system");
    if (!allowed) {
      this.$router.push({
        name: "not_authorize"
      });
      return;
    }
    this.LoadLoginActivity(1);
  },
  methods: {
    formatDateTime: function formatDateTime(v) {
      try {
        if (!v) return "";
        var d = new Date(v);
        if (isNaN(d.getTime())) return String(v);
        // Get date format from Vuex store (loaded from database) or fallback
        var dateFormat = this.$store.getters.getDateFormat || _utils__WEBPACK_IMPORTED_MODULE_2__["default"].getDateFormat(this.$store);
        // formatDisplayDate now preserves time automatically
        return _utils__WEBPACK_IMPORTED_MODULE_2__["default"].formatDisplayDate(d.toISOString(), dateFormat);
      } catch (e) {
        return String(v || "");
      }
    },
    makeToast: function makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    },
    //---- update Params Table
    updateParams: function updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },
    //---- Event Page Change
    onPageChange: function onPageChange(_ref) {
      var currentPage = _ref.currentPage;
      if (this.serverParams.page !== currentPage) {
        this.updateParams({
          page: currentPage
        });
        this.LoadLoginActivity(currentPage);
      }
    },
    //---- Event Per Page Change
    onPerPageChange: function onPerPageChange(params) {
      var perPage = params.currentPerPage === -1 ? -1 : params.currentPerPage;
      this.updateParams({
        perPage: perPage,
        page: 1
      });
      this.limit = perPage === -1 ? '-1' : perPage.toString();
      this.LoadLoginActivity(1);
    },
    LoadLoginActivity: function LoadLoginActivity(page) {
      var _this = this;
      // Start the progress bar.
      nprogress__WEBPACK_IMPORTED_MODULE_1___default().start();
      nprogress__WEBPACK_IMPORTED_MODULE_1___default().set(0.1);
      this.isLoading = true;
      axios.get("security/login-activity-report?page=" + page + "&limit=" + this.limit).then(function (response) {
        _this.sessions = response && response.data && response.data.sessions ? response.data.sessions : [];
        _this.totalRows = response.data.totalRows || 0;
        // Complete the animation of the progress bar.
        nprogress__WEBPACK_IMPORTED_MODULE_1___default().done();
        _this.isLoading = false;
      })["catch"](function (error) {
        // Complete the animation of the progress bar.
        nprogress__WEBPACK_IMPORTED_MODULE_1___default().done();
        var msg = error && error.response && error.response.data && (error.response.data.message || error.response.data.error) || _this.$t("Failed");
        _this.makeToast("danger", msg, _this.$t("Failed"));
        setTimeout(function () {
          _this.isLoading = false;
        }, 500);
      });
    }
  }
});

/***/ },

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/login_activity_report.vue?vue&type=template&id=c5af3e9e"
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/login_activity_report.vue?vue&type=template&id=c5af3e9e ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "main-content"
  }, [_c("breadcumb", {
    attrs: {
      page: _vm.$t("Login_Activity_Report"),
      folder: _vm.$t("Reports")
    }
  }), _vm._v(" "), _vm.isLoading ? _c("div", {
    staticClass: "loading_page spinner spinner-primary mr-3"
  }) : _vm._e(), _vm._v(" "), !_vm.isLoading ? _c("b-card", {
    staticClass: "wrapper"
  }, [_c("div", {
    staticClass: "d-flex justify-content-between align-items-center mb-2"
  }, [_c("div", [_c("h5", {
    staticClass: "mb-1"
  }, [_vm._v(_vm._s(_vm.$t("Login_Activity_Report")))]), _vm._v(" "), _c("p", {
    staticClass: "text-muted mb-0"
  }, [_vm._v("\n          Historical login activity for your user account (all sessions including inactive ones).\n        ")])]), _vm._v(" "), _c("div", {
    staticClass: "d-flex"
  }, [_c("b-button", {
    staticClass: "mr-2",
    attrs: {
      variant: "outline-primary",
      disabled: _vm.isLoading
    },
    on: {
      click: function click($event) {
        return _vm.LoadLoginActivity(_vm.serverParams.page);
      }
    }
  }, [_vm._v("\n          Refresh\n        ")])], 1)]), _vm._v(" "), _c("vue-good-table", {
    attrs: {
      mode: "remote",
      columns: _vm.columns,
      totalRows: _vm.totalRows,
      rows: _vm.sessions,
      "search-options": {
        placeholder: _vm.$t("Search_this_table"),
        enabled: false
      },
      "pagination-options": {
        enabled: true,
        mode: "records",
        perPage: _vm.serverParams.perPage,
        setCurrentPage: _vm.serverParams.page,
        perPageDropdown: [10, 20, 50, 100],
        dropdownAllowAll: true,
        allText: "All",
        nextLabel: "next",
        prevLabel: "prev"
      },
      styleClass: "tableOne table-hover vgt-table mt-3"
    },
    on: {
      "on-page-change": _vm.onPageChange,
      "on-per-page-change": _vm.onPerPageChange
    },
    scopedSlots: _vm._u([{
      key: "table-row",
      fn: function fn(props) {
        return [props.column.field == "device" ? _c("span", [_c("div", {
          staticClass: "d-flex align-items-center"
        }, [_c("span", [_vm._v(_vm._s(props.row.device))]), _vm._v(" "), props.row.is_current ? _c("b-badge", {
          staticClass: "ms-2",
          attrs: {
            variant: "success"
          }
        }, [_vm._v("Current")]) : props.row.is_active ? _c("b-badge", {
          staticClass: "ms-2",
          attrs: {
            variant: "info"
          }
        }, [_vm._v("Active")]) : _c("b-badge", {
          staticClass: "ms-2",
          attrs: {
            variant: "secondary"
          }
        }, [_vm._v("Inactive")])], 1)]) : props.column.field == "ip_address" ? _c("span", [_vm._v("\n          " + _vm._s(props.row.ip_address || "-") + "\n        ")]) : props.column.field == "login_at" ? _c("span", [_vm._v("\n          " + _vm._s(_vm.formatDateTime(props.row.login_at)) + "\n        ")]) : props.column.field == "last_activity_at" ? _c("span", [_vm._v("\n          " + _vm._s(props.row.last_activity_at ? _vm.formatDateTime(props.row.last_activity_at) : "-") + "\n        ")]) : props.column.field == "status" ? _c("span", [props.row.is_current ? _c("b-badge", {
          attrs: {
            variant: "success"
          }
        }, [_vm._v("Current")]) : props.row.revoked_at ? _c("b-badge", {
          attrs: {
            variant: "danger"
          }
        }, [_vm._v("Logged Out")]) : props.row.is_active ? _c("b-badge", {
          attrs: {
            variant: "info"
          }
        }, [_vm._v("Active")]) : _c("b-badge", {
          attrs: {
            variant: "secondary"
          }
        }, [_vm._v("Expired")])], 1) : _vm._e()];
      }
    }], null, false, 3459138778)
  })], 1) : _vm._e()], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ },

/***/ "./resources/src/utils/index.js"
/*!**************************************!*\
  !*** ./resources/src/utils/index.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
// ---------- Fullscreen helper ----------
var toggleFullScreen = function toggleFullScreen() {
  if (typeof window === 'undefined') return;
  var doc = window.document;
  var docEl = doc.documentElement;
  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
  if (!requestFullScreen || !cancelFullScreen) return;
  if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  } else {
    cancelFullScreen.call(doc);
  }
};

// ---------- Offline POS helpers (localStorage-based) ----------
var hasWindow = typeof window !== 'undefined';
var getStorage = function getStorage() {
  if (!hasWindow) return null;
  try {
    if (window.localStorage) {
      return window.localStorage;
    }
  } catch (e) {
    // Access to localStorage can throw in some environments; fail gracefully
  }
  return null;
};
var readJSON = function readJSON(key, fallback) {
  var storage = getStorage();
  if (!storage) return fallback;
  try {
    var raw = storage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
};
var writeJSON = function writeJSON(key, value) {
  var storage = getStorage();
  if (!storage) return;
  try {
    if (value === undefined || value === null) {
      storage.removeItem(key);
    } else {
      storage.setItem(key, JSON.stringify(value));
    }
  } catch (e) {
    // Ignore quota and other errors – offline is best-effort
  }
};
var POS_BOOTSTRAP_KEY = 'pos_bootstrap_v1';
var POS_WAREHOUSE_SNAPSHOTS_KEY = 'pos_warehouse_snapshots_v1';
var POS_OFFLINE_SALES_KEY = 'pos_offline_sales_v1';
var POS_PRODUCT_DETAILS_KEY = 'pos_product_details_v1';
var makeDetailKey = function makeDetailKey(warehouseId, productId, variantId) {
  var w = warehouseId != null ? String(warehouseId) : '0';
  var p = productId != null ? String(productId) : '0';
  var v = variantId != null && variantId !== 'null' ? String(variantId) : 'null';
  return "w:".concat(w, ":p:").concat(p, ":v:").concat(v);
};
var generateId = function generateId() {
  try {
    return Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 6);
  } catch (e) {
    return String(Date.now());
  }
};
var offlinePos = {
  // ---- Bootstrap (clients, warehouses, settings, etc.) ----
  cacheBootstrap: function cacheBootstrap(data) {
    if (!data || _typeof(data) !== 'object') return;
    writeJSON(POS_BOOTSTRAP_KEY, {
      clients: data.clients || [],
      accounts: data.accounts || [],
      warehouses: data.warehouses || [],
      categories: data.categories || [],
      brands: data.brands || [],
      payment_methods: data.payment_methods || [],
      defaultWarehouse: data.defaultWarehouse || '',
      defaultClient: data.defaultClient || '',
      default_client_name: data.default_client_name || '',
      default_client_eligible: data.default_client_eligible,
      default_client_points: data.default_client_points,
      point_to_amount_rate: data.point_to_amount_rate,
      default_tax: data.default_tax,
      products_per_page: data.products_per_page,
      languages_available: data.languages_available || [],
      stripe_key: data.stripe_key || ''
    });
  },
  getCachedBootstrap: function getCachedBootstrap() {
    return readJSON(POS_BOOTSTRAP_KEY, null);
  },
  // ---- Per-warehouse products snapshots (grid + scan data) ----
  cacheWarehouseSnapshot: function cacheWarehouseSnapshot(warehouseId, snapshot) {
    if (!warehouseId) return;
    var key = String(warehouseId);
    var existing = readJSON(POS_WAREHOUSE_SNAPSHOTS_KEY, {});
    var prev = existing[key] || {};
    existing[key] = Object.assign({}, prev, snapshot || {}, {
      updatedAt: new Date().toISOString()
    });
    writeJSON(POS_WAREHOUSE_SNAPSHOTS_KEY, existing);
  },
  getWarehouseSnapshot: function getWarehouseSnapshot(warehouseId) {
    if (!warehouseId) return null;
    var key = String(warehouseId);
    var all = readJSON(POS_WAREHOUSE_SNAPSHOTS_KEY, {});
    return all[key] || null;
  },
  // ---- Product detail cache (show_product_data) ----
  cacheProductDetail: function cacheProductDetail(warehouseId, productId, variantId, detail) {
    if (!detail || _typeof(detail) !== 'object') return;
    var key = makeDetailKey(warehouseId, productId, variantId);
    var current = readJSON(POS_PRODUCT_DETAILS_KEY, {});
    current[key] = Object.assign({}, detail, {
      _cachedAt: new Date().toISOString()
    });
    writeJSON(POS_PRODUCT_DETAILS_KEY, current);
  },
  getProductDetail: function getProductDetail(warehouseId, productId, variantId) {
    var key = makeDetailKey(warehouseId, productId, variantId);
    var current = readJSON(POS_PRODUCT_DETAILS_KEY, {});
    return current[key] || null;
  },
  // ---- Offline sales queue ----
  getOfflineSales: function getOfflineSales() {
    var list = readJSON(POS_OFFLINE_SALES_KEY, []);
    if (!Array.isArray(list)) return [];
    return list;
  },
  addOfflineSale: function addOfflineSale(payload) {
    var list = this.getOfflineSales();
    var now = new Date().toISOString();
    var safePayload = payload || {};
    // Normalize details to ensure sale_unit_id is always present on each line
    try {
      if (Array.isArray(safePayload.details)) {
        var normalizedDetails = safePayload.details.map(function (d) {
          return _objectSpread(_objectSpread({}, d), {}, {
            sale_unit_id: d && d.sale_unit_id !== undefined && d.sale_unit_id !== null && d.sale_unit_id !== '' ? d.sale_unit_id : d && d.sale_unit_id
          });
        });
        safePayload = _objectSpread(_objectSpread({}, safePayload), {}, {
          details: normalizedDetails
        });
      }
    } catch (e) {}
    var record = {
      id: generateId(),
      // status lifecycle:
      // 'pending'  -> waiting to be synced
      // 'syncing'  -> a sync worker is currently sending this sale
      // 'synced'   -> successfully created on the server
      // 'failed'   -> last sync attempt failed (can be retried)
      createdAt: now,
      updatedAt: now,
      status: 'pending',
      lastError: null,
      payload: safePayload
    };
    list.push(record);
    writeJSON(POS_OFFLINE_SALES_KEY, list);
    return record;
  },
  _updateSale: function _updateSale(id, updater) {
    if (!id) return;
    var list = this.getOfflineSales();
    var changed = false;
    var next = list.map(function (s) {
      if (!s || s.id !== id) return s;
      var updated = typeof updater === 'function' ? updater(Object.assign({}, s)) : s;
      changed = true;
      return Object.assign({}, s, updated, {
        updatedAt: new Date().toISOString()
      });
    });
    if (changed) {
      writeJSON(POS_OFFLINE_SALES_KEY, next);
    }
  },
  // Mark a sale as "in progress" so multiple sync workers (tabs/components)
  // do not submit the same offline record concurrently.
  markSaleAsSyncing: function markSaleAsSyncing(id) {
    this._updateSale(id, function (s) {
      return {
        status: 'syncing',
        lastError: null
      };
    });
  },
  markSaleAsSynced: function markSaleAsSynced(id, remoteId) {
    this._updateSale(id, function (s) {
      return {
        status: 'synced',
        remoteId: remoteId != null ? remoteId : s.remoteId || null,
        lastError: null
      };
    });
  },
  markSaleAsFailed: function markSaleAsFailed(id, message, statusCode) {
    this._updateSale(id, function () {
      return {
        status: 'failed',
        lastError: {
          message: message || 'Unknown error',
          statusCode: statusCode || null
        }
      };
    });
  },
  pruneSyncedSales: function pruneSyncedSales() {
    var list = this.getOfflineSales();
    var next = list.filter(function (s) {
      return !s || s.status !== 'synced';
    });
    writeJSON(POS_OFFLINE_SALES_KEY, next);
  },
  // ---- Clear cache (for page reload) ----
  // Clears POS cache data (products, warehouse snapshots, bootstrap) to avoid stale/outdated data
  // This should be called when online so fresh data can be fetched and cache rebuilt
  // Note: We do NOT clear POS_OFFLINE_SALES_KEY (offline sales queue) as it needs to persist for sync
  // Note: We do NOT clear IndexedDB shadow stock as it's managed separately for offline functionality
  clearCache: function clearCache() {
    try {
      var storage = getStorage();
      if (storage) {
        // Clear bootstrap cache (clients, warehouses, settings, etc.)
        storage.removeItem(POS_BOOTSTRAP_KEY);
        // Clear warehouse snapshots (cached product lists per warehouse)
        storage.removeItem(POS_WAREHOUSE_SNAPSHOTS_KEY);
        // Clear product detail cache (individual product details)
        storage.removeItem(POS_PRODUCT_DETAILS_KEY);
        // Clear receipt company setting cache
        storage.removeItem('pos_receipt_company_setting');
      }
    } catch (e) {
      // Ignore errors during cache clearing
    }
  }
};

// ---------- IndexedDB-based shadow stock for offline sales ----------
var hasIndexedDB = hasWindow && !!window.indexedDB;
var SHADOW_DB_NAME = 'pos_shadow_stock_v1';
var SHADOW_DB_VERSION = 1;
var SHADOW_STOCK_STORE = 'shadow_stock';
var SHADOW_DEDUCTIONS_STORE = 'shadow_deductions';
var openShadowDb = function openShadowDb() {
  if (!hasIndexedDB) return Promise.resolve(null);
  return new Promise(function (resolve, reject) {
    try {
      var request = window.indexedDB.open(SHADOW_DB_NAME, SHADOW_DB_VERSION);
      request.onerror = function () {
        return reject(request.error || new Error('IndexedDB open failed'));
      };
      request.onsuccess = function () {
        return resolve(request.result || null);
      };
      request.onupgradeneeded = function (event) {
        var db = event.target.result;
        try {
          if (!db.objectStoreNames.contains(SHADOW_STOCK_STORE)) {
            db.createObjectStore(SHADOW_STOCK_STORE, {
              keyPath: 'key'
            });
          }
          if (!db.objectStoreNames.contains(SHADOW_DEDUCTIONS_STORE)) {
            db.createObjectStore(SHADOW_DEDUCTIONS_STORE, {
              keyPath: 'saleId'
            });
          }
        } catch (e) {
          // ignore upgrade errors; db may be partially usable
        }
      };
    } catch (e) {
      reject(e);
    }
  });
};
var shadowStock = {
  /**
   * Record per-line quantity deductions for an offline sale in IndexedDB.
   * - warehouseId: current warehouse
   * - saleId: offline queue id (string) – used to rollback later
   * - details: array of POS detail lines (must include product_id, product_variant_id, quantity, product_type)
   */
  recordDeductions: function recordDeductions(warehouseId, saleId, details) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var db, tx, stockStore, dedStore, items, now, dedRecord;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            if (!(!hasIndexedDB || !warehouseId || !saleId || !Array.isArray(details) || !details.length)) {
              _context.n = 1;
              break;
            }
            return _context.a(2);
          case 1:
            _context.n = 2;
            return openShadowDb();
          case 2:
            db = _context.v;
            if (db) {
              _context.n = 3;
              break;
            }
            return _context.a(2);
          case 3:
            try {
              tx = db.transaction([SHADOW_STOCK_STORE, SHADOW_DEDUCTIONS_STORE], 'readwrite');
              stockStore = tx.objectStore(SHADOW_STOCK_STORE);
              dedStore = tx.objectStore(SHADOW_DEDUCTIONS_STORE);
              items = [];
              now = new Date().toISOString();
              details.forEach(function (d) {
                if (!d || d.product_type === 'is_service') return;
                var productId = d.product_id || d.id;
                if (!productId) return;
                var variantId = d.product_variant_id != null ? d.product_variant_id : null;
                var qty = Number(d.quantity || 0);
                if (!qty || qty <= 0) return;
                var key = makeDetailKey(warehouseId, productId, variantId);
                items.push({
                  key: key,
                  warehouse_id: warehouseId,
                  product_id: productId,
                  product_variant_id: variantId,
                  quantity: qty
                });
                var getReq = stockStore.get(key);
                getReq.onsuccess = function (ev) {
                  try {
                    var existing = ev.target.result || {
                      key: key,
                      warehouse_id: warehouseId,
                      product_id: productId,
                      product_variant_id: variantId,
                      sold: 0
                    };
                    existing.sold = Number(existing.sold || 0) + qty;
                    existing.updatedAt = now;
                    stockStore.put(existing);
                  } catch (e) {
                    // ignore per-row errors
                  }
                };
              });

              // Store mapping saleId -> affected items so we can rollback precisely
              dedRecord = {
                saleId: saleId,
                warehouse_id: warehouseId,
                items: items,
                createdAt: now
              };
              try {
                dedStore.put(dedRecord);
              } catch (e) {
                // ignore mapping errors
              }
            } catch (e) {
              // fail silently; shadow stock is best-effort
            }
          case 4:
            return _context.a(2);
        }
      }, _callee);
    }))();
  },
  /**
   * Rollback previously recorded deductions for an offline sale.
   * Called when sync to backend fails permanently (non-network error).
   */
  revertDeductions: function revertDeductions(saleId) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var db, tx, stockStore, dedStore, getReq;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            if (!(!hasIndexedDB || !saleId)) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2);
          case 1:
            _context2.n = 2;
            return openShadowDb();
          case 2:
            db = _context2.v;
            if (db) {
              _context2.n = 3;
              break;
            }
            return _context2.a(2);
          case 3:
            try {
              tx = db.transaction([SHADOW_STOCK_STORE, SHADOW_DEDUCTIONS_STORE], 'readwrite');
              stockStore = tx.objectStore(SHADOW_STOCK_STORE);
              dedStore = tx.objectStore(SHADOW_DEDUCTIONS_STORE);
              getReq = dedStore.get(saleId);
              getReq.onsuccess = function (ev) {
                try {
                  var rec = ev.target.result;
                  if (!rec || !Array.isArray(rec.items) || !rec.items.length) {
                    try {
                      dedStore["delete"](saleId);
                    } catch (e2) {}
                    return;
                  }
                  var now = new Date().toISOString();
                  rec.items.forEach(function (item) {
                    if (!item || !item.key) return;
                    var qty = Number(item.quantity || 0);
                    if (!qty || qty <= 0) return;
                    var sReq = stockStore.get(item.key);
                    sReq.onsuccess = function (sev) {
                      try {
                        var row = sev.target.result;
                        if (!row) return;
                        var currentSold = Number(row.sold || 0) - qty;
                        if (currentSold <= 0) {
                          stockStore["delete"](item.key);
                        } else {
                          row.sold = currentSold;
                          row.updatedAt = now;
                          stockStore.put(row);
                        }
                      } catch (e3) {}
                    };
                  });
                  try {
                    dedStore["delete"](saleId);
                  } catch (e4) {}
                } catch (e) {
                  // ignore rollback errors
                }
              };
            } catch (e) {
              // ignore db errors
            }
          case 4:
            return _context2.a(2);
        }
      }, _callee2);
    }))();
  },
  /**
   * Apply current shadow stock (unsynced offline sales) to a given products list.
   * For each non-service item in the list, qte_sale is reduced by the recorded 'sold' amount (never below 0).
   */
  applyToList: function applyToList(warehouseId, list) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var db, tx, stockStore, request;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            if (!(!hasIndexedDB || !warehouseId || !Array.isArray(list) || !list.length)) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2);
          case 1:
            _context3.n = 2;
            return openShadowDb();
          case 2:
            db = _context3.v;
            if (db) {
              _context3.n = 3;
              break;
            }
            return _context3.a(2);
          case 3:
            try {
              tx = db.transaction([SHADOW_STOCK_STORE], 'readonly');
              stockStore = tx.objectStore(SHADOW_STOCK_STORE);
              request = stockStore.openCursor();
              request.onsuccess = function (event) {
                var cursor = event.target.result;
                if (!cursor) return;
                try {
                  var row = cursor.value;
                  if (row && String(row.warehouse_id) === String(warehouseId)) {
                    var sold = Number(row.sold || 0);
                    if (sold > 0) {
                      var pid = row.product_id;
                      var vid = row.product_variant_id != null ? row.product_variant_id : null;
                      for (var i = 0; i < list.length; i++) {
                        var item = list[i];
                        if (!item || item.product_type === 'is_service') continue;
                        var itemPid = item.product_id || item.id;
                        var itemVid = item.product_variant_id != null ? item.product_variant_id : null;
                        if (String(itemPid) === String(pid) && String(itemVid) === String(vid)) {
                          var cur = Number(item.qte_sale || 0);
                          var next = cur - sold;
                          item.qte_sale = next > 0 ? next : 0;
                        }
                      }
                    }
                  }
                } catch (e) {
                  // ignore per-row failures
                }
                cursor["continue"]();
              };
            } catch (e) {
              // ignore
            }
          case 4:
            return _context3.a(2);
        }
      }, _callee3);
    }))();
  },
  /**
   * Return the available quantity for a single product/variant in sale units,
   * given the base qte_sale reported by the server/cache.
   */
  getAvailableQuantity: function getAvailableQuantity(warehouseId, productId, variantId, baseQteSale) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var base, db, tx, stockStore, key, _t;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            base = Number(baseQteSale || 0);
            if (!(!hasIndexedDB || !warehouseId || !productId || base <= 0)) {
              _context4.n = 1;
              break;
            }
            return _context4.a(2, base);
          case 1:
            _context4.n = 2;
            return openShadowDb();
          case 2:
            db = _context4.v;
            if (db) {
              _context4.n = 3;
              break;
            }
            return _context4.a(2, base);
          case 3:
            _context4.p = 3;
            tx = db.transaction([SHADOW_STOCK_STORE], 'readonly');
            stockStore = tx.objectStore(SHADOW_STOCK_STORE);
            key = makeDetailKey(warehouseId, productId, variantId);
            _context4.n = 4;
            return new Promise(function (resolve) {
              var req = stockStore.get(key);
              req.onsuccess = function (ev) {
                try {
                  var row = ev.target.result;
                  var sold = row ? Number(row.sold || 0) : 0;
                  var next = base - sold;
                  resolve(next > 0 ? next : 0);
                } catch (e) {
                  resolve(base);
                }
              };
              req.onerror = function () {
                return resolve(base);
              };
            });
          case 4:
            return _context4.a(2, _context4.v);
          case 5:
            _context4.p = 5;
            _t = _context4.v;
            return _context4.a(2, base);
        }
      }, _callee4, null, [[3, 5]]);
    }))();
  },
  /**
   * Clear all shadow stock and deduction records.
   * Used when there are no pending offline sales, so local adjustments
   * must not affect displayed stock anymore.
   */
  clearAll: function clearAll() {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var db, tx;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            if (hasIndexedDB) {
              _context5.n = 1;
              break;
            }
            return _context5.a(2);
          case 1:
            _context5.n = 2;
            return openShadowDb();
          case 2:
            db = _context5.v;
            if (db) {
              _context5.n = 3;
              break;
            }
            return _context5.a(2);
          case 3:
            try {
              tx = db.transaction([SHADOW_STOCK_STORE, SHADOW_DEDUCTIONS_STORE], 'readwrite');
              try {
                tx.objectStore(SHADOW_STOCK_STORE).clear();
              } catch (e) {}
              try {
                tx.objectStore(SHADOW_DEDUCTIONS_STORE).clear();
              } catch (e) {}
            } catch (e) {
              // ignore
            }
          case 4:
            return _context5.a(2);
        }
      }, _callee5);
    }))();
  }
};

// ---------- Date Formatting Utility ----------
/**
 * Format a date according to the selected date format
 * Preserves time portion if it exists in the input
 * @param {string|Date} date - The date to format (can be ISO string, Date object, or formatted string)
 * @param {string} format - The format to use: 'DD/MM/YYYY', 'MM/DD/YYYY', or 'YYYY-MM-DD'
 * @returns {string} - Formatted date string (with time if it existed in input)
 */
var formatDisplayDate = function formatDisplayDate(date) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MM-DD';
  if (!date) return '';
  var dateObj;
  var timePart = '';
  var originalDateStr = '';
  try {
    // Handle different input types
    if (date instanceof Date) {
      dateObj = date;
      originalDateStr = date.toISOString();
    } else if (typeof date === 'string') {
      originalDateStr = date;
      // Extract time part if it exists
      if (date.includes('T')) {
        var parts = date.split('T');
        date = parts[0]; // Date part
        timePart = parts[1] ? parts[1].replace(/Z$/, '').split('.')[0] : ''; // Time part without Z and milliseconds
      } else if (date.includes(' ')) {
        var _parts = date.split(' ');
        date = _parts[0]; // Date part
        timePart = _parts[1] || ''; // Time part
      }

      // Try to parse the date string
      dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) {
        // If parsing fails, try to handle common formats
        var _parts2 = date.match(/(\d{4})-(\d{2})-(\d{2})/) || date.match(/(\d{2})\/(\d{2})\/(\d{4})/) || date.match(/(\d{2})-(\d{2})-(\d{4})/);
        if (_parts2) {
          if (_parts2[1].length === 4) {
            // YYYY-MM-DD format
            dateObj = new Date(_parts2[1], _parts2[2] - 1, _parts2[3]);
          } else {
            // DD/MM/YYYY or DD-MM-YYYY format
            dateObj = new Date(_parts2[3], _parts2[2] - 1, _parts2[1]);
          }
        } else {
          return originalDateStr; // Return as-is if we can't parse it
        }
      }
    } else {
      return String(date);
    }
    if (isNaN(dateObj.getTime())) {
      return originalDateStr || String(date);
    }
    var day = String(dateObj.getDate()).padStart(2, '0');
    var month = String(dateObj.getMonth() + 1).padStart(2, '0');
    var year = dateObj.getFullYear();
    var formattedDate;
    switch (format) {
      case 'DD/MM/YYYY':
        formattedDate = "".concat(day, "/").concat(month, "/").concat(year);
        break;
      case 'MM/DD/YYYY':
        formattedDate = "".concat(month, "/").concat(day, "/").concat(year);
        break;
      case 'YYYY-MM-DD':
      default:
        formattedDate = "".concat(year, "-").concat(month, "-").concat(day);
    }

    // Return formatted date with time if it existed
    return timePart ? "".concat(formattedDate, " ").concat(timePart) : formattedDate;
  } catch (e) {
    return originalDateStr || String(date);
  }
};

/**
 * Get the date format from database (via Vuex store) or localStorage cache
 * @param {Object} store - Optional Vuex store instance (if called from Vue component, use this.$store)
 * @returns {string} - The date format ('DD/MM/YYYY', 'MM/DD/YYYY', or 'YYYY-MM-DD')
 */
var getDateFormat = function getDateFormat() {
  var store = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  try {
    // First try to get from Vuex store (loaded from database on app init)
    if (store && store.getters && store.getters.getDateFormat) {
      var format = store.getters.getDateFormat;
      if (format && ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'].includes(format)) {
        return format;
      }
    }

    // Try to get from global Vue instance if available
    if (typeof window !== 'undefined' && window.Vue) {
      try {
        // Try to access via Vue's global properties
        var vueInstances = document.querySelectorAll('[data-v-app]');
        if (vueInstances.length > 0) {
          // Vue app is mounted, try to get store from first component
          var app = vueInstances[0].__vue__;
          if (app && app.$store && app.$store.getters && app.$store.getters.getDateFormat) {
            var _format = app.$store.getters.getDateFormat;
            if (_format && ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'].includes(_format)) {
              return _format;
            }
          }
        }
      } catch (e) {
        // Vuex not available or not initialized yet
      }
    }

    // Fallback to localStorage cache (updated when settings are saved)
    var stored = localStorage.getItem('app_date_format');
    if (stored && ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'].includes(stored)) {
      return stored;
    }
  } catch (e) {
    // Ignore errors
  }
  return 'YYYY-MM-DD'; // Default format
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  toggleFullScreen: toggleFullScreen,
  offlinePos: offlinePos,
  shadowStock: shadowStock,
  formatDisplayDate: formatDisplayDate,
  getDateFormat: getDateFormat
});

/***/ },

/***/ "./resources/src/views/app/pages/reports/login_activity_report.vue"
/*!*************************************************************************!*\
  !*** ./resources/src/views/app/pages/reports/login_activity_report.vue ***!
  \*************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _login_activity_report_vue_vue_type_template_id_c5af3e9e__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login_activity_report.vue?vue&type=template&id=c5af3e9e */ "./resources/src/views/app/pages/reports/login_activity_report.vue?vue&type=template&id=c5af3e9e");
/* harmony import */ var _login_activity_report_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login_activity_report.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/reports/login_activity_report.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _login_activity_report_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _login_activity_report_vue_vue_type_template_id_c5af3e9e__WEBPACK_IMPORTED_MODULE_0__.render,
  _login_activity_report_vue_vue_type_template_id_c5af3e9e__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/src/views/app/pages/reports/login_activity_report.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ },

/***/ "./resources/src/views/app/pages/reports/login_activity_report.vue?vue&type=script&lang=js"
/*!*************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/reports/login_activity_report.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_login_activity_report_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./login_activity_report.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/login_activity_report.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_login_activity_report_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ },

/***/ "./resources/src/views/app/pages/reports/login_activity_report.vue?vue&type=template&id=c5af3e9e"
/*!*******************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/reports/login_activity_report.vue?vue&type=template&id=c5af3e9e ***!
  \*******************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_login_activity_report_vue_vue_type_template_id_c5af3e9e__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_login_activity_report_vue_vue_type_template_id_c5af3e9e__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_login_activity_report_vue_vue_type_template_id_c5af3e9e__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./login_activity_report.vue?vue&type=template&id=c5af3e9e */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/login_activity_report.vue?vue&type=template&id=c5af3e9e");


/***/ }

}]);
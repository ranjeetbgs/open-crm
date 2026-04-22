"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["woocommerce"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/WooCommerceSettings.vue?vue&type=script&lang=js"
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/WooCommerceSettings.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  metaInfo: {
    title: 'WooCommerce Settings'
  },
  components: {
    SettingsTab: function SettingsTab() {
      return __webpack_require__.e(/*! import() | woo-settings-tab */ "woo-settings-tab").then(__webpack_require__.bind(__webpack_require__, /*! ./woocommerce/SettingsTab.vue */ "./resources/src/views/app/pages/settings/woocommerce/SettingsTab.vue"));
    },
    ProductsTab: function ProductsTab() {
      return __webpack_require__.e(/*! import() | woo-products-tab */ "woo-products-tab").then(__webpack_require__.bind(__webpack_require__, /*! ./woocommerce/ProductsTab.vue */ "./resources/src/views/app/pages/settings/woocommerce/ProductsTab.vue"));
    },
    StockTab: function StockTab() {
      return __webpack_require__.e(/*! import() | woo-stock-tab */ "woo-stock-tab").then(__webpack_require__.bind(__webpack_require__, /*! ./woocommerce/StockTab.vue */ "./resources/src/views/app/pages/settings/woocommerce/StockTab.vue"));
    },
    CategoriesTab: function CategoriesTab() {
      return __webpack_require__.e(/*! import() | woo-categories-tab */ "woo-categories-tab").then(__webpack_require__.bind(__webpack_require__, /*! ./woocommerce/CategoriesTab.vue */ "./resources/src/views/app/pages/settings/woocommerce/CategoriesTab.vue"));
    },
    LogsTab: function LogsTab() {
      return __webpack_require__.e(/*! import() | woo-logs-tab */ "woo-logs-tab").then(__webpack_require__.bind(__webpack_require__, /*! ./woocommerce/LogsTab.vue */ "./resources/src/views/app/pages/settings/woocommerce/LogsTab.vue"));
    },
    StatusOverviewTab: function StatusOverviewTab() {
      return __webpack_require__.e(/*! import() | woo-status-tab */ "woo-status-tab").then(__webpack_require__.bind(__webpack_require__, /*! ./woocommerce/StatusOverviewTab.vue */ "./resources/src/views/app/pages/settings/woocommerce/StatusOverviewTab.vue"));
    }
  },
  data: function data() {
    return {
      loading: true,
      connectionOk: null,
      totalProducts: null,
      unsyncedCount: null,
      activeTab: 0,
      tabLoading: true,
      resetting: false
    };
  },
  computed: {
    connectionBadgeVariant: function connectionBadgeVariant() {
      if (this.connectionOk === true) return 'success';
      if (this.connectionOk === false) return 'danger';
      return 'secondary';
    },
    connectionBadgeText: function connectionBadgeText() {
      if (this.connectionOk === true) return this.$t('Connected');
      if (this.connectionOk === false) return this.$t('Disconnected');
      return this.$t('Unknown');
    }
  },
  methods: {
    onTabChange: function onTabChange() {
      this.tabLoading = true;
    },
    onTabReady: function onTabReady() {
      this.tabLoading = false;
    },
    switchToLogs: function switchToLogs() {
      // Find index of Logs tab (after Categories)
      // Tabs order: Settings=0, Products=1, Stock=2, Categories=3, Logs=4, Status=5
      this.activeTab = 4;
    },
    fetchCounts: function fetchCounts() {
      var _this = this;
      axios.get('products', {
        params: {
          limit: 1
        }
      }).then(function (_ref) {
        var data = _ref.data;
        _this.totalProducts = data.totalRows != null ? data.totalRows : null;
      })["catch"](function () {
        _this.totalProducts = null;
      });
      axios.get('woocommerce/unsynced-count').then(function (_ref2) {
        var data = _ref2.data;
        _this.unsyncedCount = data.count;
      })["catch"](function () {
        _this.unsyncedCount = null;
      })["finally"](function () {
        _this.loading = false;
      });
    },
    testConnection: function testConnection() {
      var _this2 = this;
      axios.post('woocommerce/test-connection').then(function (_ref3) {
        var data = _ref3.data;
        _this2.connectionOk = !!data.ok;
      })["catch"](function () {
        _this2.connectionOk = false;
      });
    },
    onConnectionUpdate: function onConnectionUpdate(val) {
      this.connectionOk = val;
    },
    onChildRefreshed: function onChildRefreshed() {
      this.fetchCounts();
      this.testConnection();
    },
    resetSync: function resetSync() {
      var _this3 = this;
      if (this.resetting) return;
      this.resetting = true;
      axios.post('woocommerce/reset-sync').then(function () {
        _this3.$root.$bvToast.toast(_this3.$t('Successfully_Updated'), {
          title: _this3.$t('WooCommerce'),
          variant: 'success',
          solid: true
        });
      })["catch"](function () {
        _this3.$root.$bvToast.toast(_this3.$t('Sync_Failed'), {
          title: _this3.$t('WooCommerce'),
          variant: 'danger',
          solid: true
        });
      })["finally"](function () {
        _this3.resetting = false;
        _this3.onChildRefreshed();
      });
    }
  },
  created: function created() {
    this.fetchCounts();
    this.testConnection();
  }
});

/***/ },

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/WooCommerceSettings.vue?vue&type=template&id=4542d8b4"
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/WooCommerceSettings.vue?vue&type=template&id=4542d8b4 ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************/
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
      page: _vm.$t("WooCommerce_Settings"),
      folder: _vm.$t("Settings")
    }
  }), _vm._v(" "), _vm.loading ? _c("div", {
    staticClass: "loading_page spinner spinner-primary mr-3"
  }) : _c("div", [_c("b-card", {
    attrs: {
      "no-body": ""
    }
  }, [_c("div", {
    staticClass: "d-flex align-items-center justify-content-between px-3 pt-3"
  }, [_c("div", [_c("b-badge", {
    attrs: {
      variant: _vm.connectionBadgeVariant
    }
  }, [_vm._v(_vm._s(_vm.connectionBadgeText))])], 1), _vm._v(" "), _c("div", [_c("b-button", {
    attrs: {
      variant: "danger",
      size: "sm",
      disabled: _vm.resetting
    },
    on: {
      click: _vm.resetSync
    }
  }, [!_vm.resetting ? _c("span", [_vm._v(_vm._s(_vm.$t("Reset_Sync_State")))]) : _c("span", [_vm._v(_vm._s(_vm.$t("Resetting")) + "...")])])], 1)]), _vm._v(" "), _c("b-tabs", {
    attrs: {
      "content-class": "mt-3 position-relative"
    },
    on: {
      input: _vm.onTabChange
    },
    model: {
      value: _vm.activeTab,
      callback: function callback($$v) {
        _vm.activeTab = $$v;
      },
      expression: "activeTab"
    }
  }, [_vm.tabLoading ? _c("div", {
    staticClass: "loading_page spinner spinner-primary mr-3"
  }) : _vm._e(), _vm._v(" "), _c("b-tab", {
    attrs: {
      lazy: ""
    },
    scopedSlots: _vm._u([{
      key: "title",
      fn: function fn() {
        return [_vm._v(_vm._s(_vm.$t("Settings")))];
      },
      proxy: true
    }])
  }, [_vm._v(" "), _c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: !_vm.tabLoading,
      expression: "!tabLoading"
    }]
  }, [_c("SettingsTab", {
    on: {
      ready: _vm.onTabReady,
      connection: _vm.onConnectionUpdate,
      updated: _vm.onChildRefreshed
    }
  })], 1)]), _vm._v(" "), _c("b-tab", {
    attrs: {
      lazy: ""
    },
    scopedSlots: _vm._u([{
      key: "title",
      fn: function fn() {
        return [_vm._v("\n            " + _vm._s(_vm.$t("Products")) + "\n            "), _vm.unsyncedCount !== null ? _c("b-badge", {
          staticClass: "ml-2",
          attrs: {
            variant: "warning"
          }
        }, [_vm._v(_vm._s(_vm.unsyncedCount))]) : _vm._e()];
      },
      proxy: true
    }])
  }, [_vm._v(" "), _c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: !_vm.tabLoading,
      expression: "!tabLoading"
    }]
  }, [_c("ProductsTab", {
    on: {
      ready: _vm.onTabReady,
      refreshed: _vm.onChildRefreshed
    }
  })], 1)]), _vm._v(" "), _c("b-tab", {
    attrs: {
      lazy: ""
    },
    scopedSlots: _vm._u([{
      key: "title",
      fn: function fn() {
        return [_vm._v(_vm._s(_vm.$t("Stock")))];
      },
      proxy: true
    }])
  }, [_vm._v(" "), _c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: !_vm.tabLoading,
      expression: "!tabLoading"
    }]
  }, [_c("StockTab", {
    on: {
      ready: _vm.onTabReady,
      refreshed: _vm.onChildRefreshed,
      "view-logs": _vm.switchToLogs
    }
  })], 1)]), _vm._v(" "), _c("b-tab", {
    attrs: {
      lazy: ""
    },
    scopedSlots: _vm._u([{
      key: "title",
      fn: function fn() {
        return [_vm._v(_vm._s(_vm.$t("Categories")))];
      },
      proxy: true
    }])
  }, [_vm._v(" "), _c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: !_vm.tabLoading,
      expression: "!tabLoading"
    }]
  }, [_c("CategoriesTab", {
    on: {
      ready: _vm.onTabReady,
      refreshed: _vm.onChildRefreshed
    }
  })], 1)]), _vm._v(" "), _c("b-tab", {
    attrs: {
      lazy: ""
    },
    scopedSlots: _vm._u([{
      key: "title",
      fn: function fn() {
        return [_vm._v(_vm._s(_vm.$t("View_Logs")))];
      },
      proxy: true
    }])
  }, [_vm._v(" "), _c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: !_vm.tabLoading,
      expression: "!tabLoading"
    }]
  }, [_c("LogsTab", {
    on: {
      ready: _vm.onTabReady
    }
  })], 1)]), _vm._v(" "), _c("b-tab", {
    attrs: {
      lazy: ""
    },
    scopedSlots: _vm._u([{
      key: "title",
      fn: function fn() {
        return [_vm._v(_vm._s(_vm.$t("Status_Overview")))];
      },
      proxy: true
    }])
  }, [_vm._v(" "), _c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: !_vm.tabLoading,
      expression: "!tabLoading"
    }]
  }, [_c("StatusOverviewTab", {
    on: {
      ready: _vm.onTabReady
    }
  })], 1)])], 1)], 1), _vm._v(" "), _c("b-modal", {
    attrs: {
      id: "log-detail",
      title: _vm.$t("Log_Details"),
      "hide-footer": ""
    },
    model: {
      value: _vm.selectedLog,
      callback: function callback($$v) {
        _vm.selectedLog = $$v;
      },
      expression: "selectedLog"
    }
  }, [_vm.selectedLog ? _c("div", [_c("p", {
    staticClass: "mb-1"
  }, [_c("strong", [_vm._v(_vm._s(_vm.$t("date")) + ":")]), _vm._v(" " + _vm._s(_vm.formatDate(_vm.selectedLog.created_at)))]), _vm._v(" "), _c("p", {
    staticClass: "mb-1"
  }, [_c("strong", [_vm._v(_vm._s(_vm.$t("Action")) + ":")]), _vm._v(" " + _vm._s(_vm.selectedLog.action))]), _vm._v(" "), _c("p", {
    staticClass: "mb-1"
  }, [_c("strong", [_vm._v(_vm._s(_vm.$t("Level")) + ":")]), _vm._v(" " + _vm._s(_vm.selectedLog.level))]), _vm._v(" "), _c("p", {
    staticClass: "mb-1"
  }, [_c("strong", [_vm._v(_vm._s(_vm.$t("Message")) + ":")]), _vm._v(" " + _vm._s(_vm.selectedLog.message))]), _vm._v(" "), _c("hr"), _vm._v(" "), _c("p", {
    staticClass: "mb-1"
  }, [_c("strong", [_vm._v(_vm._s(_vm.$t("Context")))])]), _vm._v(" "), _c("pre", {
    staticClass: "bg-light p-2",
    staticStyle: {
      "white-space": "pre-wrap",
      "word-break": "break-word",
      "max-height": "400px",
      overflow: "auto"
    }
  }, [_vm._v(_vm._s(_vm.stringify(_vm.selectedLog.context)))])]) : _vm._e()])], 1)], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ },

/***/ "./resources/src/views/app/pages/settings/WooCommerceSettings.vue"
/*!************************************************************************!*\
  !*** ./resources/src/views/app/pages/settings/WooCommerceSettings.vue ***!
  \************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _WooCommerceSettings_vue_vue_type_template_id_4542d8b4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WooCommerceSettings.vue?vue&type=template&id=4542d8b4 */ "./resources/src/views/app/pages/settings/WooCommerceSettings.vue?vue&type=template&id=4542d8b4");
/* harmony import */ var _WooCommerceSettings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WooCommerceSettings.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/settings/WooCommerceSettings.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _WooCommerceSettings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _WooCommerceSettings_vue_vue_type_template_id_4542d8b4__WEBPACK_IMPORTED_MODULE_0__.render,
  _WooCommerceSettings_vue_vue_type_template_id_4542d8b4__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/src/views/app/pages/settings/WooCommerceSettings.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ },

/***/ "./resources/src/views/app/pages/settings/WooCommerceSettings.vue?vue&type=script&lang=js"
/*!************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/settings/WooCommerceSettings.vue?vue&type=script&lang=js ***!
  \************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WooCommerceSettings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./WooCommerceSettings.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/WooCommerceSettings.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WooCommerceSettings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ },

/***/ "./resources/src/views/app/pages/settings/WooCommerceSettings.vue?vue&type=template&id=4542d8b4"
/*!******************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/settings/WooCommerceSettings.vue?vue&type=template&id=4542d8b4 ***!
  \******************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_WooCommerceSettings_vue_vue_type_template_id_4542d8b4__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_WooCommerceSettings_vue_vue_type_template_id_4542d8b4__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_WooCommerceSettings_vue_vue_type_template_id_4542d8b4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./WooCommerceSettings.vue?vue&type=template&id=4542d8b4 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/WooCommerceSettings.vue?vue&type=template&id=4542d8b4");


/***/ }

}]);
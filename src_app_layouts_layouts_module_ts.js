"use strict";
(self["webpackChunkkindergarten"] = self["webpackChunkkindergarten"] || []).push([["src_app_layouts_layouts_module_ts"],{

/***/ 2372:
/*!*******************************************!*\
  !*** ./src/app/layouts/layouts.module.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LayoutsModule": () => (/* binding */ LayoutsModule)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 4364);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/core */ 2220);
/* harmony import */ var _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material-moment-adapter */ 3737);
/* harmony import */ var _shared_const_myformat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/const/myformat */ 1591);
/* harmony import */ var _layouts_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layouts-routing.module */ 4875);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/shared.module */ 4466);
/* harmony import */ var _layouts_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./layouts.component */ 2710);
/* harmony import */ var _user_user_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user/user.component */ 2758);
/* harmony import */ var _login_login_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../login/login.module */ 107);
/* harmony import */ var _agent_agent_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./agent/agent.component */ 9877);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 2316);












class LayoutsModule {
}
LayoutsModule.ɵfac = function LayoutsModule_Factory(t) { return new (t || LayoutsModule)(); };
LayoutsModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({ type: LayoutsModule });
LayoutsModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({ providers: [
        { provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_8__.DateAdapter, useClass: _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_9__.MomentDateAdapter, deps: [_angular_material_core__WEBPACK_IMPORTED_MODULE_8__.MAT_DATE_LOCALE] },
        { provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_8__.MAT_DATE_FORMATS, useValue: _shared_const_myformat__WEBPACK_IMPORTED_MODULE_0__.MY_FORMATS }
    ], imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule,
            _layouts_routing_module__WEBPACK_IMPORTED_MODULE_1__.LayoutsRoutingModule,
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_11__.ReactiveFormsModule,
            _login_login_module__WEBPACK_IMPORTED_MODULE_5__.LoginModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](LayoutsModule, { declarations: [_layouts_component__WEBPACK_IMPORTED_MODULE_3__.LayoutsComponent,
        _user_user_component__WEBPACK_IMPORTED_MODULE_4__.UserComponent,
        _agent_agent_component__WEBPACK_IMPORTED_MODULE_6__.AgentComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule,
        _layouts_routing_module__WEBPACK_IMPORTED_MODULE_1__.LayoutsRoutingModule,
        _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormsModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_11__.ReactiveFormsModule,
        _login_login_module__WEBPACK_IMPORTED_MODULE_5__.LoginModule] }); })();


/***/ }),

/***/ 5393:
/*!***********************************************!*\
  !*** ./src/app/login/login-routing.module.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginRoutingModule": () => (/* binding */ LoginRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 1258);
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.component */ 8458);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2316);




const routes = [
    {
        path: '',
        component: _login_component__WEBPACK_IMPORTED_MODULE_0__.LoginComponent,
    }
];
class LoginRoutingModule {
}
LoginRoutingModule.ɵfac = function LoginRoutingModule_Factory(t) { return new (t || LoginRoutingModule)(); };
LoginRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: LoginRoutingModule });
LoginRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](LoginRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] }); })();


/***/ }),

/***/ 107:
/*!***************************************!*\
  !*** ./src/app/login/login.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginModule": () => (/* binding */ LoginModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/common */ 4364);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/core */ 2220);
/* harmony import */ var _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material-moment-adapter */ 3737);
/* harmony import */ var _shared_const_myformat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/const/myformat */ 1591);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/shared.module */ 4466);
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login.component */ 8458);
/* harmony import */ var _angular_fire_compat_firestore__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/fire/compat/firestore */ 6303);
/* harmony import */ var _angular_fire_compat_storage__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/fire/compat/storage */ 4416);
/* harmony import */ var _angular_fire_compat_auth__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/fire/compat/auth */ 7018);
/* harmony import */ var ng_click_outside__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng-click-outside */ 5754);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/input */ 4742);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/select */ 7007);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/form-field */ 5788);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/datepicker */ 2937);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment */ 2340);
/* harmony import */ var _angular_fire_compat__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/fire/compat */ 5908);
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/radio */ 5644);
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/stepper */ 8210);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _login_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./login-routing.module */ 5393);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2316);






















class LoginModule {
}
LoginModule.ɵfac = function LoginModule_Factory(t) { return new (t || LoginModule)(); };
LoginModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: LoginModule });
LoginModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ providers: [
        { provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_7__.DateAdapter, useClass: _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_8__.MomentDateAdapter, deps: [_angular_material_core__WEBPACK_IMPORTED_MODULE_7__.MAT_DATE_LOCALE] },
        { provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_7__.MAT_DATE_FORMATS, useValue: _shared_const_myformat__WEBPACK_IMPORTED_MODULE_0__.MY_FORMATS }
    ], imports: [[
            _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_9__.ReactiveFormsModule,
            _angular_fire_compat__WEBPACK_IMPORTED_MODULE_10__.AngularFireModule.initializeApp(src_environments_environment__WEBPACK_IMPORTED_MODULE_4__.environment.firebaseConfig),
            _angular_fire_compat_firestore__WEBPACK_IMPORTED_MODULE_11__.AngularFirestoreModule,
            _angular_fire_compat_storage__WEBPACK_IMPORTED_MODULE_12__.AngularFireStorageModule,
            _angular_fire_compat_auth__WEBPACK_IMPORTED_MODULE_13__.AngularFireAuthModule,
            // // QuillModule.forRoot(),
            ng_click_outside__WEBPACK_IMPORTED_MODULE_3__.ClickOutsideModule,
            _angular_material_input__WEBPACK_IMPORTED_MODULE_14__.MatInputModule,
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_15__.MatFormFieldModule,
            _angular_material_select__WEBPACK_IMPORTED_MODULE_16__.MatSelectModule,
            _angular_material_radio__WEBPACK_IMPORTED_MODULE_17__.MatRadioModule,
            _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_18__.MatDatepickerModule,
            _angular_material_core__WEBPACK_IMPORTED_MODULE_7__.MatNativeDateModule,
            _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_8__.MomentDateModule,
            _angular_common__WEBPACK_IMPORTED_MODULE_19__.CommonModule,
            _angular_material_stepper__WEBPACK_IMPORTED_MODULE_20__.MatStepperModule,
            _angular_material_radio__WEBPACK_IMPORTED_MODULE_17__.MatRadioModule,
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule,
            _login_routing_module__WEBPACK_IMPORTED_MODULE_5__.LoginRoutingModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](LoginModule, { declarations: [_login_component__WEBPACK_IMPORTED_MODULE_2__.LoginComponent], imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormsModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_9__.ReactiveFormsModule, _angular_fire_compat__WEBPACK_IMPORTED_MODULE_10__.AngularFireModule, _angular_fire_compat_firestore__WEBPACK_IMPORTED_MODULE_11__.AngularFirestoreModule,
        _angular_fire_compat_storage__WEBPACK_IMPORTED_MODULE_12__.AngularFireStorageModule,
        _angular_fire_compat_auth__WEBPACK_IMPORTED_MODULE_13__.AngularFireAuthModule,
        // // QuillModule.forRoot(),
        ng_click_outside__WEBPACK_IMPORTED_MODULE_3__.ClickOutsideModule,
        _angular_material_input__WEBPACK_IMPORTED_MODULE_14__.MatInputModule,
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_15__.MatFormFieldModule,
        _angular_material_select__WEBPACK_IMPORTED_MODULE_16__.MatSelectModule,
        _angular_material_radio__WEBPACK_IMPORTED_MODULE_17__.MatRadioModule,
        _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_18__.MatDatepickerModule,
        _angular_material_core__WEBPACK_IMPORTED_MODULE_7__.MatNativeDateModule,
        _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_8__.MomentDateModule,
        _angular_common__WEBPACK_IMPORTED_MODULE_19__.CommonModule,
        _angular_material_stepper__WEBPACK_IMPORTED_MODULE_20__.MatStepperModule,
        _angular_material_radio__WEBPACK_IMPORTED_MODULE_17__.MatRadioModule,
        _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule,
        _login_routing_module__WEBPACK_IMPORTED_MODULE_5__.LoginRoutingModule] }); })();


/***/ })

}]);
//# sourceMappingURL=src_app_layouts_layouts_module_ts.js.map
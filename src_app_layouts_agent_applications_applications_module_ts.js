"use strict";
(self["webpackChunkkindergarten"] = self["webpackChunkkindergarten"] || []).push([["src_app_layouts_agent_applications_applications_module_ts"],{

/***/ 7367:
/*!***************************************************************************!*\
  !*** ./src/app/layouts/agent/applications/applications-routing.module.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApplicationsRoutingModule": () => (/* binding */ ApplicationsRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 1258);
/* harmony import */ var _applications_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./applications.component */ 7);
/* harmony import */ var _group_application_group_application_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./group-application/group-application.component */ 2015);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);





const routes = [
    {
        path: '',
        component: _applications_component__WEBPACK_IMPORTED_MODULE_0__.ApplicationsComponent
    },
    {
        path: ':name',
        component: _group_application_group_application_component__WEBPACK_IMPORTED_MODULE_1__.GroupApplicationComponent
    }
];
class ApplicationsRoutingModule {
}
ApplicationsRoutingModule.ɵfac = function ApplicationsRoutingModule_Factory(t) { return new (t || ApplicationsRoutingModule)(); };
ApplicationsRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: ApplicationsRoutingModule });
ApplicationsRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](ApplicationsRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] }); })();


/***/ }),

/***/ 2397:
/*!*******************************************************************!*\
  !*** ./src/app/layouts/agent/applications/applications.module.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApplicationsModule": () => (/* binding */ ApplicationsModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 4364);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/progress-spinner */ 181);
/* harmony import */ var ng_click_outside__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ng-click-outside */ 5754);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/shared.module */ 4466);
/* harmony import */ var _applications_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./applications-routing.module */ 7367);
/* harmony import */ var _group_application_group_application_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./group-application/group-application.component */ 2015);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);








class ApplicationsModule {
}
ApplicationsModule.ɵfac = function ApplicationsModule_Factory(t) { return new (t || ApplicationsModule)(); };
ApplicationsModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: ApplicationsModule });
ApplicationsModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
            _applications_routing_module__WEBPACK_IMPORTED_MODULE_2__.ApplicationsRoutingModule,
            src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule,
            _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_7__.MatProgressSpinnerModule,
            ng_click_outside__WEBPACK_IMPORTED_MODULE_0__.ClickOutsideModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](ApplicationsModule, { declarations: [_group_application_group_application_component__WEBPACK_IMPORTED_MODULE_3__.GroupApplicationComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
        _applications_routing_module__WEBPACK_IMPORTED_MODULE_2__.ApplicationsRoutingModule,
        src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule,
        _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_7__.MatProgressSpinnerModule,
        ng_click_outside__WEBPACK_IMPORTED_MODULE_0__.ClickOutsideModule] }); })();


/***/ }),

/***/ 2015:
/*!*********************************************************************************************!*\
  !*** ./src/app/layouts/agent/applications/group-application/group-application.component.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GroupApplicationComponent": () => (/* binding */ GroupApplicationComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2316);

class GroupApplicationComponent {
    constructor() { }
    ngOnInit() {
    }
}
GroupApplicationComponent.ɵfac = function GroupApplicationComponent_Factory(t) { return new (t || GroupApplicationComponent)(); };
GroupApplicationComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: GroupApplicationComponent, selectors: [["app-group-application"]], decls: 2, vars: 0, template: function GroupApplicationComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "group-application works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJncm91cC1hcHBsaWNhdGlvbi5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ })

}]);
//# sourceMappingURL=src_app_layouts_agent_applications_applications_module_ts.js.map
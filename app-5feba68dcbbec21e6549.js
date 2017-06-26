webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var learning_resource_model_1 = __webpack_require__(7);
var AppController = (function () {
    function AppController($window) {
        this.$window = $window;
        this.resourceList = [];
        this.newResource = new learning_resource_model_1.LearningResource();
        this.isInAddMode = false;
        var existingResourceList = $window.localStorage.getItem('resourceList');
        this.resourceList = existingResourceList ? JSON.parse(existingResourceList) : [];
        this.getResourceTypes();
    }
    AppController.prototype.createResource = function () {
        this.newResource.id = (this.resourceList.length === 0) ? 0 : this.resourceList[(this.resourceList.length - 1)].id + 1;
        var d = new Date();
        this.newResource.dateCreated = d.toLocaleString();
        this.newResource.iconClass = this.getTypeIconClass(this.newResource.resourceTypeId);
        this.resourceList.push(this.newResource);
        this.newResource = new learning_resource_model_1.LearningResource();
        this.$window.localStorage.setItem('resourceList', JSON.stringify(this.resourceList));
        this.isInAddMode = false;
    };
    AppController.prototype.deleteResource = function (id) {
        var deletedResourceIndex = this.getResourceIndexById(id);
        this.resourceList.splice(deletedResourceIndex, 1);
        this.$window.localStorage.setItem('resourceList', JSON.stringify(this.resourceList));
    };
    AppController.prototype.getResourceIndexById = function (id) {
        // This function will get the index into our local storage array based on the resource's "id" property
        return this.resourceList.findIndex(function (re) {
            return re.id == id;
        });
    };
    AppController.prototype.getResourceTypes = function () {
        // TODO:  Add Mock Webservice
        this.resourceTypes = [
            {
                'id': 1,
                'name': 'Website'
            },
            {
                'id': 2,
                'name': 'Book'
            },
            {
                'id': 3,
                'name': 'Podcast'
            },
            {
                'id': 4,
                'name': 'Mobile App'
            },
            {
                'id': 5,
                'name': 'Other'
            }
        ];
    };
    AppController.prototype.getTypeIconClass = function (id) {
        var iconClass = 'fa fa-';
        switch (id) {
            case 1:
                iconClass += 'globe';
                break;
            case 2:
                iconClass += 'book';
                break;
            case 3:
                iconClass += 'podcast';
                break;
            case 4:
                iconClass += 'mobile';
                break;
            case 5:
                iconClass += 'asterisk';
                break;
            default:
                iconClass = '';
                break;
        }
        return iconClass;
    };
    AppController.prototype.toggleEditMode = function (id, isEditMode) {
        var editingResourceIndex = this.getResourceIndexById(id);
        this.resourceList[editingResourceIndex].isInEditMode = isEditMode;
        this.$window.localStorage.setItem('resourceList', JSON.stringify(this.resourceList));
        if (isEditMode) {
            this.editingResource = this.resourceList[editingResourceIndex];
        }
        else {
            this.editingResource = null;
        }
    };
    AppController.prototype.updateResource = function (id) {
        var editingResourceIndex = this.getResourceIndexById(id);
        this.editingResource.isInEditMode = false;
        this.resourceList[editingResourceIndex] = this.editingResource;
        this.$window.localStorage.setItem('resourceList', JSON.stringify(this.resourceList));
    };
    return AppController;
}());
exports.App = {
    template: __webpack_require__(6),
    controller: AppController
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

routesConfig.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];
exports.__esModule = true;
exports["default"] = routesConfig;
/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('app', {
        url: '/',
        component: 'app'
    });
}


/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports) {

module.exports = "<header>\r\n  <button class=\"add\" ng-show=\"!$ctrl.isInAddMode\" title=\"Add A Resource\" ng-click=\"$ctrl.isInAddMode = true;\">\r\n    <i class=\"fa fa-plus-square\"></i></button>\r\n  <div class=\"container\">\r\n    <h1>My Favorite Learning Resources</h1>\r\n  </div>\r\n</header>\r\n<div class=\"container resource-list\">\r\n  <div ng-show=\"$ctrl.resourceList.length == 0 && !$ctrl.isInAddMode\">\r\n    <h2>You don't have any resources yet.  You can add some by clicking on the + button in the top left corner :)</h2>\r\n  </div>\r\n  <div class=\"row\">\r\n  <div ng-show=\"$ctrl.isInAddMode\" class=\"card add-mode\">\r\n    <div class=\"card-block\">\r\n      <div class=\"form-group\">\r\n        <label for=\"title\">Title:</label>\r\n        <input type=\"text\"\r\n                class=\"form-control\"\r\n                id=\"title\"\r\n                ng-model=\"$ctrl.newResource.title\" />\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"type\">Type:</label>\r\n        <select class=\"form-control\"\r\n                id=\"type\"\r\n                ng-model=\"$ctrl.newResource.resourceTypeId\"\r\n                ng-options=\"option.id as option.name for option in $ctrl.resourceTypes\">\r\n        </select>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"url\">URL:</label>\r\n        <input type=\"text\"\r\n               class=\"form-control\"\r\n               id=\"url\"\r\n               ng-model=\"$ctrl.newResource.url\" />\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"description\">Description:</label>\r\n        <textarea class=\"form-control\"\r\n               id=\"description\"\r\n               ng-model=\"$ctrl.newResource.description\">\r\n        </textarea>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col\">\r\n          <button class=\"btn btn-secondary\" ng-click=\"$ctrl.isInAddMode = false;\">Cancel</button>\r\n          <button class=\"btn btn-primary\" ng-click=\"$ctrl.createResource()\">+ Add</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"col-md-3\" ng-repeat=\"re in $ctrl.resourceList track by $index\" >\r\n    <div class=\"card\" ng-class=\"re.isInEditMode ? 'edit-mode': ''\">\r\n      <div ng-show=\"!re.isInEditMode\">\r\n        <div class=\"card-header\" ng-class=\"'resource-type-' + re.resourceTypeId\">\r\n          <h3>{{ re.title }}</h3>\r\n          <i ng-class=\"re.iconClass\"></i>\r\n        </div>\r\n        <div class=\"card-block\">\r\n          <a href=\"{{ re.url }}\" target=\"_blank\">{{ re.url }}</a>\r\n          <p>\r\n            {{ re.description }}\r\n          </p>\r\n          <button class=\"card-button\" ng-click=\"$ctrl.toggleEditMode(re.id, true)\"><i class=\"fa fa-pencil\"></i></button>\r\n          <span class=\"date\">Created: {{ re.dateCreated}} </span>\r\n          <button class=\"card-button pull-right\" ng-click=\"$ctrl.deleteResource(re.id)\"><i class=\"fa fa-trash\"></i></button>\r\n        </div>\r\n      </div>\r\n        <div class=\"edit-mode\" ng-show=\"re.isInEditMode\">\r\n          <div class=\"card-block\">\r\n            <div class=\"form-group\">\r\n              <label for=\"title\">Title:</label>\r\n              <input type=\"text\"\r\n                     class=\"form-control\"\r\n                     id=\"title\"\r\n                     ng-model=\"$ctrl.editingResource.title\" />\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <label for=\"type\">Type:</label>\r\n              <select class=\"form-control\"\r\n                      id=\"type\"\r\n                      ng-model=\"$ctrl.editingResource.resourceTypeId\"\r\n                      ng-options=\"option.id as option.name for option in $ctrl.resourceTypes\">\r\n              </select>\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <label for=\"url\">URL:</label>\r\n              <input type=\"text\"\r\n                     class=\"form-control\"\r\n                     id=\"url\"\r\n                     ng-model=\"$ctrl.editingResource.url\" />\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <label for=\"description\">Description:</label>\r\n              <textarea class=\"form-control\"\r\n                        id=\"description\"\r\n                        ng-model=\"$ctrl.editingResource.description\">\r\n            </textarea>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"col text-center\">\r\n                <button class=\"btn btn-secondary\" ng-click=\"$ctrl.toggleEditMode($ctrl.editingResource.id, false)\">Cancel</button>\r\n                <button class=\"btn btn-primary\" ng-click=\"$ctrl.updateResource($ctrl.editingResource.id)\">Update</button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  </div>\r\n</div>\r\n";

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var LearningResource = (function () {
    function LearningResource() {
        this.isInEditMode = false;
        this.resourceTypeId = 1;
    }
    return LearningResource;
}());
exports.LearningResource = LearningResource;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var angular = __webpack_require__(0);
var App_1 = __webpack_require__(3);
__webpack_require__(1);
var routes_1 = __webpack_require__(4);
__webpack_require__(2);
angular
    .module('app', ['ui.router'])
    .config(routes_1["default"])
    .component('app', App_1.App);


/***/ })
],[8]);
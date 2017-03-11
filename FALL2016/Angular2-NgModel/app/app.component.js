"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var KEYPAD = [
    { id: 0, value: 0 },
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: 4 },
    { id: 5, value: 5 },
    { id: 6, value: 6 },
    { id: 7, value: 6 },
    { id: 8, value: 7 },
    { id: 9, value: 8 },
    { id: 0, value: 9 }
];
var FirstInput = (function () {
    function FirstInput() {
    }
    return FirstInput;
}());
exports.FirstInput = FirstInput;
var SecondInput = (function () {
    function SecondInput() {
    }
    return SecondInput;
}());
exports.SecondInput = SecondInput;
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Two Distances from Km to Mi';
        this.firstInput = { value: 0 };
        this.secondInput = { value: 0 };
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-template',
            template: "\n  <h1 class=\"title\">{{title}}</h1>\n  <h2 class=\"result\">{{(firstInput.value*0.621371) +(secondInput.value*0.621371)}} mi</h2>\n  <div>\n      <label>Distance One: </label>\n      <input [(ngModel)]=\"firstInput.value\" placeholder=\"0\" class=\"form-control\" > km\n  </div>\n  <div>\n      <label>Distance Two: </label>\n      <input [(ngModel)]=\"secondInput.value\" placeholder=\"0\" class=\"form-control\" > km\n  </div>\n  ",
            styles: ["\n  .title {\n    color: red;\n  }\n  .result{\n    color: blue;\n  }\n  "
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
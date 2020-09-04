"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CategoryPageComponent = void 0;
var graphql_tag_1 = require("graphql-tag");
var core_1 = require("@angular/core");
var homeQuery = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nquery home(\n  $restr: ID,\n  $loc:ID,\n  $type:ID,\n  $cat:ID){\n    categoryvideos(filter:{\n    restrictionid:$restr,\n    locationid:$loc,\n    typeid:$type,\n    categoryid:$cat,}){\n      allTime{\n        videoid,\n        videotitle,\n        publishtime,\n        thumbnailsource,\n        viewcount,\n        length,\n        typeid,\n        user{\n        userid,\n        profileimgaddr,\n        username,\n      }},\n      month{\n        videoid,\n        videotitle,\n        publishtime,\n        thumbnailsource,\n        viewcount,\n        length,\n        typeid,\n        user{\n        userid\n        profileimgaddr,\n        username,\n      }},\n      week{\n        videoid,\n        videotitle,\n        publishtime,\n        thumbnailsource,\n        viewcount,\n        length,\n        typeid,\n        user{\n          userid,\n        profileimgaddr,\n        username,\n      }},\n      recent{videoid,\n        videotitle,\n        publishtime,\n        thumbnailsource,\n        viewcount,\n        length,\n        typeid,\n        user{\n          userid\n        profileimgaddr,\n        username,\n      }}\n  }\n}"], ["\nquery home(\n  $restr: ID,\n  $loc:ID,\n  $type:ID,\n  $cat:ID){\n    categoryvideos(filter:{\n    restrictionid:$restr,\n    locationid:$loc,\n    typeid:$type,\n    categoryid:$cat,}){\n      allTime{\n        videoid,\n        videotitle,\n        publishtime,\n        thumbnailsource,\n        viewcount,\n        length,\n        typeid,\n        user{\n        userid,\n        profileimgaddr,\n        username,\n      }},\n      month{\n        videoid,\n        videotitle,\n        publishtime,\n        thumbnailsource,\n        viewcount,\n        length,\n        typeid,\n        user{\n        userid\n        profileimgaddr,\n        username,\n      }},\n      week{\n        videoid,\n        videotitle,\n        publishtime,\n        thumbnailsource,\n        viewcount,\n        length,\n        typeid,\n        user{\n          userid,\n        profileimgaddr,\n        username,\n      }},\n      recent{videoid,\n        videotitle,\n        publishtime,\n        thumbnailsource,\n        viewcount,\n        length,\n        typeid,\n        user{\n          userid\n        profileimgaddr,\n        username,\n      }}\n  }\n}"])));
var cats = ['', 'Music', 'Sport', 'Gaming', 'Entertainment', 'News', 'Travel'];
var CategoryPageComponent = /** @class */ (function () {
    function CategoryPageComponent(route, loc, apollo, restrict, premium) {
        this.route = route;
        this.loc = loc;
        this.apollo = apollo;
        this.restrict = restrict;
        this.premium = premium;
        this.check = 0;
        this.category = '';
        this.idx = 0;
        this.toggleAll = true;
        this.toggleMonth = false;
        this.toggleWeek = false;
        this.toggleRecent = false;
    }
    CategoryPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loc.currLocID.subscribe(function (loc) {
            _this.locid = loc;
            // this.checkForQuery(this.locid, 1, this.idx);
            _this.query(_this.idx);
        });
        this.premium.currPremiumId.subscribe(function (premid) {
            _this.premid = premid;
            // this.checkForQuery(this.premid, 2, this.idx);
            // this.query(this.idx);
            _this.query(_this.idx);
        });
        this.restrict.currRestrictionID.subscribe(function (r) {
            _this.restid = r;
            // this.checkForQuery(this.restid, 3, this.idx);
            _this.query(_this.idx);
        });
        this.route.paramMap.subscribe(function (params) {
            _this.category = cats[+params.get('categoryid')];
            _this.idx = +params.get('categoryid');
            // this.checkForQuery(this.idx, 4, this.idx);
            _this.query(_this.idx);
        });
    };
    CategoryPageComponent.prototype.checkForQuery = function (inp, inc, idx) {
        if (inp != null) {
            this.check++;
            console.log('cek cat ', inc, this.check);
        }
        if (this.check >= 4) {
            this.query(idx);
            // this.homeQuery();
        }
    };
    CategoryPageComponent.prototype.query = function (cate) {
        var _this = this;
        console.log('locCAT ', this.locid);
        console.log('premCAT ', this.premid);
        console.log('RestCAT ', this.restid);
        console.log('CAT ', cate);
        this.apollo.watchQuery({
            query: homeQuery,
            variables: {
                cat: cate,
                loc: this.locid,
                type: this.premid,
                restr: this.restid
            }
        }).valueChanges.subscribe(function (_a) {
            var data = _a.data;
            console.log('dataa ', data);
            _this.alltime = data.categoryvideos.allTime;
            _this.alltime = _this.checkType(_this.alltime);
            _this.month = data.categoryvideos.month;
            _this.month = _this.checkType(_this.month);
            _this.recent = data.categoryvideos.recent;
            _this.recent = _this.checkType(_this.recent);
            _this.week = data.categoryvideos.week;
            _this.week = _this.checkType(_this.week);
        }, function (error) {
            console.log('error', error);
            alert(error);
        });
    };
    // toggleAccordian(event, arr: any[]) {
    //   console.log('masuk');
    //   var element = event.target;
    //   element.classList.toggle("active");
    //   // if(arr[index].isActive) {
    //   //   arr[index].isActive = false;
    //   // } else {
    //   //   arr[index].isActive = true;
    //   // }
    //   var panel = element.nextElementSibling;
    //   if (panel.style.maxHeight) {
    //     panel.style.maxHeight = null;
    //   } else {
    //     panel.style.maxHeight = panel.scrollHeight + "px";
    //   }
    CategoryPageComponent.prototype.toggleAllFunc = function () {
        this.toggleAll = !this.toggleAll;
        if (this.toggleMonth) {
            this.toggleMonth = false;
        }
        if (this.toggleRecent) {
            this.toggleRecent = false;
        }
        if (this.toggleWeek) {
            this.toggleWeek = false;
        }
    };
    CategoryPageComponent.prototype.toggleMFunc = function () {
        this.toggleMonth = !this.toggleMonth;
        if (this.toggleAll) {
            this.toggleAll = false;
        }
        if (this.toggleRecent) {
            this.toggleRecent = false;
        }
        if (this.toggleWeek) {
            this.toggleWeek = false;
        }
    };
    CategoryPageComponent.prototype.toggleWFunc = function () {
        this.toggleWeek = !this.toggleWeek;
        if (this.toggleMonth) {
            this.toggleMonth = false;
        }
        if (this.toggleRecent) {
            this.toggleRecent = false;
        }
        if (this.toggleAll) {
            this.toggleAll = false;
        }
    };
    CategoryPageComponent.prototype.toggleRFunc = function () {
        this.toggleRecent = !this.toggleRecent;
        if (this.toggleMonth) {
            this.toggleMonth = false;
        }
        if (this.toggleAll) {
            this.toggleAll = false;
        }
        if (this.toggleWeek) {
            this.toggleWeek = false;
        }
    };
    CategoryPageComponent.prototype.checkType = function (input) {
        if (this.premid == null || this.premid == '1') {
            input = input.filter(function (i) { return i.typeid !== '2'; });
        }
        return input;
    };
    CategoryPageComponent = __decorate([
        core_1.Component({
            selector: 'app-category-page',
            templateUrl: './category-page.component.html',
            styleUrls: ['./category-page.component.scss']
        })
    ], CategoryPageComponent);
    return CategoryPageComponent;
}());
exports.CategoryPageComponent = CategoryPageComponent;
var templateObject_1;

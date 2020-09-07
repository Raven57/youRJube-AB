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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.HeaderComponent = void 0;
var core_1 = require("@angular/core");
var graphql_tag_1 = require("graphql-tag");
var q = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nquery search($keyword:String!,$premiumid:String) {\n  search(input:{keyword:$keyword,premiumid:$premiumid}){\n    videos{\n      videodescription,videotitle\n    },\n    channels{\n      user{username, channeldetail}\n    },\n    playlists{\n      playlists{\n       playlisttitle, playlistdescription\n      }\n    }\n  }\n}\n"], ["\nquery search($keyword:String!,$premiumid:String) {\n  search(input:{keyword:$keyword,premiumid:$premiumid}){\n    videos{\n      videodescription,videotitle\n    },\n    channels{\n      user{username, channeldetail}\n    },\n    playlists{\n      playlists{\n       playlisttitle, playlistdescription\n      }\n    }\n  }\n}\n"])));
var wait = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(apollo, userService, authService, router, afAuth, prem, popup, loc) {
        this.apollo = apollo;
        this.userService = userService;
        this.authService = authService;
        this.router = router;
        this.afAuth = afAuth;
        this.prem = prem;
        this.popup = popup;
        this.loc = loc;
        this.check = 0;
        this.options = [];
        this.searched = false;
        this.toggleSetting = false;
        this.toggleSearch = false;
        this.toggleUser = false;
        this.toggleNotification = false;
        this.toggleMenu = false;
        this.setMenu = new core_1.EventEmitter();
        this.keyShortcutVisible = false;
        this.restrictionVisible = false;
        this.locationVisible = false;
    }
    HeaderComponent.prototype.setModel = function (str) {
        console.log(str);
        this.keyword = str;
        this.router.navigate(['/search', this.keyword]);
        this.searched = false;
    };
    HeaderComponent.prototype.onBlur = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // if(this.)
                    // this.router.navigateByUrl(window.location.href);
                    return [4 /*yield*/, wait(500)];
                    case 1:
                        // if(this.)
                        // this.router.navigateByUrl(window.location.href);
                        _a.sent();
                        this.searched = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    HeaderComponent.prototype.onFocus = function () {
        this.searched = true;
    };
    HeaderComponent.prototype.changeSearch = function (str) {
        var _this = this;
        this.searched = true;
        this.apollo.query({
            query: q,
            variables: {
                keyword: str,
                premiumid: this.premid
            }
        }).subscribe(function (_a) {
            var data = _a.data;
            // this.autoComplete = null;
            _this.options = [];
            console.log(_this.autoComplete);
            _this.autoComplete = data.search;
            if (_this.autoComplete.videos != null) {
                _this.autoComplete.videos.forEach(function (v) {
                    _this.options.push(v.videotitle, v.videodescription);
                });
            }
            if (_this.autoComplete.channels != null) {
                _this.autoComplete.channels.forEach(function (c) {
                    _this.options.push(c.user.username, c.user.channeldetail);
                });
            }
            if (_this.autoComplete.playlists) {
                _this.autoComplete.playlists.forEach(function (p) {
                    _this.options.push(p.playlists.playlisttitle, p.playlists.playlistdescription);
                });
            }
        }, function (error) {
            console.log(error);
        });
    };
    HeaderComponent.prototype.showModal = function () {
        this.popup.changeVisibility(true);
    };
    HeaderComponent.prototype.showKeyShortcut = function () {
        this.keyShortcutVisible = true;
        console.log('asdasdada');
    };
    HeaderComponent.prototype.showLocation = function () {
        this.locationVisible = true;
    };
    HeaderComponent.prototype.showRestrictions = function () {
        this.restrictionVisible = true;
    };
    HeaderComponent.prototype.hideLocation = function (bool) {
        this.locationVisible = bool;
    };
    HeaderComponent.prototype.hideRestriction = function (bool) {
        this.restrictionVisible = bool;
    };
    HeaderComponent.prototype.hideKeyShortcut = function (bool) {
        this.keyShortcutVisible = bool;
    };
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.searched = false;
        this.userService.checkUser();
        this.popup.currVisibility.subscribe(function (isVisible) { return _this.isVisible = isVisible; });
        this.userService.currUser.subscribe(function (user) {
            _this.user = user;
            _this.checkForQuery(_this.user, 1);
        });
        this.userService.currUserID.subscribe(function (user) {
            _this.userID = user;
            _this.checkForQuery(_this.userID, 2);
        });
        this.loc.currLocID.subscribe(function (loc) {
            _this.locid = loc;
            _this.checkForQuery(_this.locid, 3);
        });
        this.userService.currUserLOCID.subscribe(function (id) {
            _this.currUserLocID = id;
            _this.checkForQuery(_this.currUserLocID, 4);
        });
        this.prem.currPremiumId.subscribe(function (premid) {
            _this.premid = premid;
        });
    };
    HeaderComponent.prototype.checkForQuery = function (inp, inc) {
        if (inp != null) {
            this.check++;
            console.log('cek ', inc, this.check);
        }
        if (this.check > 4) {
            this.changeLoc();
        }
    };
    HeaderComponent.prototype.changeLoc = function () {
        // if (this.currUserLocID !== this.locid) {
        //   this.userService.update(this.user, '', '', '', '', '', this.locid, '', 0, '');
        // }
        // else {
        // }
    };
    HeaderComponent.prototype.toggleSettingFunc = function () {
        if (this.toggleUser) {
            this.toggleUser = !this.toggleUser;
        }
        this.toggleSetting = !this.toggleSetting;
    };
    HeaderComponent.prototype.toggleNotificationFunc = function () {
        if (this.toggleUser) {
            this.toggleUser = !this.toggleUser;
        }
        this.toggleNotification = !this.toggleNotification;
    };
    HeaderComponent.prototype.toggleSearchFunc = function () {
        this.toggleSearch = !this.toggleSearch;
    };
    HeaderComponent.prototype.toggleUserFunc = function () {
        if (this.toggleSetting) {
            this.toggleSetting = !this.toggleSetting;
        }
        if (this.toggleNotification) {
            this.toggleNotification = !this.toggleNotification;
        }
        this.toggleUser = !this.toggleUser;
    };
    HeaderComponent.prototype.toggleFunc = function () {
        this.toggleMenu = !this.toggleMenu;
        this.setMenu.emit(this.toggleMenu);
    };
    __decorate([
        core_1.Input()
    ], HeaderComponent.prototype, "toggleMenu");
    __decorate([
        core_1.Output()
    ], HeaderComponent.prototype, "setMenu");
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.scss']
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
var templateObject_1;

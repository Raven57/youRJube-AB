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
exports.UserServiceService = void 0;
var angularx_social_login_1 = require("angularx-social-login");
var graphql_tag_1 = require("graphql-tag");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var createUser = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nmutation createNewUser(\n  $email: String!,\n  $name: String!,\n  $profile: String!,\n  $pwd: String!,\n  $age: Int!,\n  $locid: String!)\n  {\n  createUser(input:{\n    useremail: $email,\n    username: $name,\n    profileimgaddr: $profile,\n    password: $pwd,\n    age: $age,\n    locationid: $locid,\n  })\n  {\n    authToken{\n      accessToken\n    }\n  }\n}\n"], ["\nmutation createNewUser(\n  $email: String!,\n  $name: String!,\n  $profile: String!,\n  $pwd: String!,\n  $age: Int!,\n  $locid: String!)\n  {\n  createUser(input:{\n    useremail: $email,\n    username: $name,\n    profileimgaddr: $profile,\n    password: $pwd,\n    age: $age,\n    locationid: $locid,\n  })\n  {\n    authToken{\n      accessToken\n    }\n  }\n}\n"])));
var updateUser = graphql_tag_1["default"](templateObject_2 || (templateObject_2 = __makeTemplateObject(["\nmutation updateUser(\n  $email: String!,\n  $name: String,\n  $chdet: String,\n  $churl: String,\n  $bgimg: String,\n  $profile: String,\n  $pwd: String,\n  $age: Int,\n  $locid: String,\n  $restr: String,\n  )\n  {\n  userUpdate(input:{\n    useremail: $email,\n    username: $name,\n    profileimgaddr: $profile,\n    password: $pwd,\n    age: $age,\n    locationid: $locid,\n    channeldetail : $chdet\n    channelurl : $churl\n    bgimgaddr: $bgimg\n    restrictionid: $restr\n  })\n}\n"], ["\nmutation updateUser(\n  $email: String!,\n  $name: String,\n  $chdet: String,\n  $churl: String,\n  $bgimg: String,\n  $profile: String,\n  $pwd: String,\n  $age: Int,\n  $locid: String,\n  $restr: String,\n  )\n  {\n  userUpdate(input:{\n    useremail: $email,\n    username: $name,\n    profileimgaddr: $profile,\n    password: $pwd,\n    age: $age,\n    locationid: $locid,\n    channeldetail : $chdet\n    channelurl : $churl\n    bgimgaddr: $bgimg\n    restrictionid: $restr\n  })\n}\n"])));
var checkUser = graphql_tag_1["default"](templateObject_3 || (templateObject_3 = __makeTemplateObject(["\nquery checkUser($userid: ID!) {\n  user(userid:$userid){\n    username,\n    locationid\n  }\n}"], ["\nquery checkUser($userid: ID!) {\n  user(userid:$userid){\n    username,\n    locationid\n  }\n}"])));
var getUserid = graphql_tag_1["default"](templateObject_4 || (templateObject_4 = __makeTemplateObject(["\nquery checkUser($userid: ID!) {\n  user(userid:$userid){\n    userid,\n    locationid,\n    restriction{\n      restrictionid,\n    }\n    premiumdetail{\n      premiumtype{\n        premiumid,\n      }\n    }\n  }\n}"], ["\nquery checkUser($userid: ID!) {\n  user(userid:$userid){\n    userid,\n    locationid,\n    restriction{\n      restrictionid,\n    }\n    premiumdetail{\n      premiumtype{\n        premiumid,\n      }\n    }\n  }\n}"])));
var login = graphql_tag_1["default"](templateObject_5 || (templateObject_5 = __makeTemplateObject(["\nmutation login(\n  $email: String!,\n  $pwd: String!,)\n  {\n  userLogin(input:{\n    useremail: $email,\n    password: $pwd,\n  })\n  {\n    authToken{\n      accessToken\n    }\n    user{\n      userid,\n      username,\n      useremail,\n      profileimgaddr,\n      locationid,\n      restriction{\n        restrictionid,\n      }\n      premiumdetail{\n        premiumtype{\n          premiumid,\n        }\n      }\n    }\n  }\n}\n"], ["\nmutation login(\n  $email: String!,\n  $pwd: String!,)\n  {\n  userLogin(input:{\n    useremail: $email,\n    password: $pwd,\n  })\n  {\n    authToken{\n      accessToken\n    }\n    user{\n      userid,\n      username,\n      useremail,\n      profileimgaddr,\n      locationid,\n      restriction{\n        restrictionid,\n      }\n      premiumdetail{\n        premiumtype{\n          premiumid,\n        }\n      }\n    }\n  }\n}\n"])));
var currDate = new Date();
var currDatePlusAYear = new Date(currDate.getFullYear() + 1, currDate.getMonth(), currDate.getDate());
var UserServiceService = /** @class */ (function () {
    function UserServiceService(apollo, authService, afAuth, premiumDetail, ip, restriction, popup) {
        this.apollo = apollo;
        this.authService = authService;
        this.premiumDetail = premiumDetail;
        this.ip = ip;
        this.restriction = restriction;
        this.popup = popup;
        this.haveUserFromDB = 0;
        this.userSource = new rxjs_1.BehaviorSubject(null);
        this.currUser = this.userSource.asObservable();
        this.userFromDBSource = new rxjs_1.BehaviorSubject(0);
        this.currUserInDB = this.userFromDBSource.asObservable();
        this.userIDSource = new rxjs_1.BehaviorSubject(null);
        this.currUserID = this.userIDSource.asObservable();
        this.userLOCIDSource = new rxjs_1.BehaviorSubject(null);
        this.currUserLOCID = this.userLOCIDSource.asObservable();
    }
    UserServiceService.prototype.register = function (user, pawd, aage, loc) {
        var _this = this;
        console.log(user);
        console.log(pawd);
        console.log(aage);
        console.log(loc);
        this.apollo.mutate({
            mutation: createUser,
            variables: {
                email: user.email,
                name: user.name,
                profile: user.photoUrl,
                pwd: pawd,
                age: aage,
                locid: loc
            }
        }).subscribe(function (_a) {
            var data = _a.data;
            console.log('got data', data);
            _this.insertPremiumDetail(user.email);
            // this.addTokenToLocalStorage(data.createUser.authToken.accessToken);
        }, function (error) {
            console.log('error', error);
            alert(error);
        });
    };
    UserServiceService.prototype.update = function (user, nam, detail, url, bg, prof, loc, pw, ag, resid) {
        // console.log('masuk update');
        if (ag === 0) {
            ag = null;
        }
        this.apollo.mutate({
            mutation: updateUser,
            variables: {
                email: user.email,
                name: nam,
                chdet: detail,
                churl: url,
                bgimg: bg,
                profile: prof,
                pwd: pw,
                age: ag,
                locid: loc,
                restr: resid
            }
        }).subscribe(function (_a) {
            var data = _a.data;
            if (data.userUpdate) {
                console.log('Success Update!');
            }
        }, function (error) {
            console.log('error', error);
        });
    };
    UserServiceService.prototype.userLogin = function (user, pawd) {
        var _this = this;
        console.log(user);
        console.log(pawd);
        this.apollo.mutate({
            mutation: login,
            variables: {
                email: user.email,
                pwd: pawd
            }
        }).subscribe(function (_a) {
            var data = _a.data;
            console.log('got data', data);
            _this.user = new angularx_social_login_1.SocialUser();
            _this.premiumDetail.changePremiumID(data.userLogin.user.premiumdetail.premiumtype.premiumid);
            _this.user.email = data.userLogin.user.useremail;
            _this.user.name = data.userLogin.user.username;
            _this.user.photoUrl = data.userLogin.user.profileimgaddr;
            // this.ip.changeLocID(data.userLogin.user.location.locationid);
            // this.ip.changeLoc(data.userLogin.user.location.locationname);
            _this.restriction.changeRestriction(data.userLogin.user.restriction.restrictionid);
            _this.changeUser(_this.user);
            _this.changeUserID(data.userLogin.user.userid);
            _this.popup.changeVisibility(false);
            _this.addToLocalStorage(_this.user);
            _this.currUserid = data.userLogin.user.userid;
            _this.changeUserLOCID(data.userLogin.user.locationid);
        }, function (error) {
            console.log('error', error);
            alert(error);
        });
    };
    UserServiceService.prototype.changeUser = function (user) {
        this.userSource.next(user);
    };
    UserServiceService.prototype.changeUserLOCID = function (user) {
        this.userLOCIDSource.next(user);
    };
    UserServiceService.prototype.changeUserID = function (string) {
        this.userIDSource.next(string);
    };
    UserServiceService.prototype.changeUserStatInDB = function (int) {
        this.userFromDBSource.next(int);
    };
    UserServiceService.prototype.insertPremiumDetail = function (inputEmail) {
        var _this = this;
        this.apollo.watchQuery({
            query: getUserid,
            variables: {
                userid: inputEmail
            }
        }).valueChanges.subscribe(function (_a) {
            var data = _a.data, loading = _a.loading, errors = _a.errors;
            _this.changeUserID(data.user.userid);
            _this.currUserid = data.user.userid;
            console.log(data);
            console.log('INI USERID GET  USERR FROM DB', _this.currUserid);
            _this.premiumDetail.register(_this.currUserid, '1', 0, 10);
            _this.addToLocalStorage(_this.user);
            _this.changeUser(_this.user);
            return;
        });
    };
    UserServiceService.prototype.getUserid = function (email) {
        var _this = this;
        this.apollo.watchQuery({
            query: getUserid,
            variables: {
                userid: email
            }
        }).valueChanges.subscribe(function (_a) {
            var data = _a.data, loading = _a.loading, errors = _a.errors;
            console.log(data);
            _this.currUserid = data.user.userid;
            console.log('INI USERID GET  USERR FROM DB', _this.currUserid);
            _this.changeUserID(data.user.userid);
            _this.changeUser(_this.user);
            _this.restriction.changeRestriction(data.user.restriction.restrictionid);
            // this.ip.changeLocID(data.user.location.locationid);
            _this.changeUserLOCID(data.user.locationid);
            _this.premiumDetail.changePremiumID(data.user.premiumdetail.premiumtype.premiumid);
            return;
        });
    };
    UserServiceService.prototype.getUser = function (id) {
        var _this = this;
        var u;
        this.apollo.watchQuery({
            query: getUserid,
            variables: {
                userid: id
            }
        }).valueChanges.subscribe(function (_a) {
            var data = _a.data, loading = _a.loading, errors = _a.errors;
            console.log(data);
            _this.currUserid = data.user.userid;
            console.log('INI USERID GET  USERR FROM DB', _this.currUserid);
            _this.changeUserID(data.user.userid);
            _this.changeUser(_this.user);
            _this.restriction.changeRestriction(data.user.restriction.restrictionid);
            // this.ip.changeLocID(data.user.location.locationid);
            _this.changeUserLOCID(data.user.locationid);
            _this.premiumDetail.changePremiumID(data.user.premiumdetail.premiumtype.premiumid);
            return;
        });
        return u;
    };
    UserServiceService.prototype.checkUserFromDB = function (input) {
        var _this = this;
        this.apollo.watchQuery({
            query: checkUser,
            variables: {
                userid: input
            }
        }).valueChanges.subscribe(function (_a) {
            //login ntr di sini
            var data = _a.data, loading = _a.loading, errors = _a.errors;
            _this.changeUserStatInDB(1);
            return;
        });
        this.changeUserStatInDB(2);
    };
    UserServiceService.prototype.checkUser = function () {
        if (localStorage.getItem('users') == null) {
            this.users = [];
        }
        else {
            this.getUserFromStorage();
        }
    };
    UserServiceService.prototype.signInWithGoogle = function () {
        var _this = this;
        this.authService.signIn(angularx_social_login_1.GoogleLoginProvider.PROVIDER_ID);
        this.authService.authState.subscribe(function (user) {
            _this.checkUserFromDB(user.email);
            _this.user = user;
            if (!_this.haveUserFromDB) {
                console.log('masuuk');
            }
        });
        return this.user;
    };
    UserServiceService.prototype.addToLocalStorage = function (user) {
        if (user == null) {
            return;
        }
        this.users.push(user);
        localStorage.setItem('users', JSON.stringify(this.users));
        console.log(localStorage.getItem('users'));
    };
    UserServiceService.prototype.addTokenToLocalStorage = function (token) {
        if (token == null) {
            return;
        }
        localStorage.setItem('token', JSON.stringify(token));
    };
    UserServiceService.prototype.getUserFromStorage = function () {
        this.users = JSON.parse(localStorage.getItem('users'));
        this.user = this.users[0];
        this.changeUser(this.user);
        this.getUserid(this.user.email);
    };
    UserServiceService.prototype.removeUser = function () {
        window.localStorage.clear();
    };
    UserServiceService.prototype.signOut = function () {
        this.user = null;
        this.removeUser();
        this.changeUser(null);
        this.authService.signOut(true);
        sessionStorage.clear();
    };
    UserServiceService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserServiceService);
    return UserServiceService;
}());
exports.UserServiceService = UserServiceService;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;

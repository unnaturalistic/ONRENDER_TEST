"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountobj = void 0;
class accountobj {
    username;
    password;
    bio;
    roles;
    status;
    skycoins;
    publicKey;
    setaccount(u, p, b) {
        this.username = u;
        this.password = p;
        this.bio = b;
        return this;
    }
    setstatus(b) {
        this.status = b;
    }
    setcoins(s) {
        this.skycoins = s;
    }
}
exports.accountobj = accountobj;

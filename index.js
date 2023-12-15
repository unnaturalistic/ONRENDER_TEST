"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unnaturaldb = void 0;
const dataKey_1 = require("./dataKey");
const dataValue_1 = require("./dataValue");
const ws_1 = require("./ws");
require("./mongo");
//unnatural db real
let dat_map = new Map;
let dat_map_string = new Map;
let key_list = new Array;
const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
class unnaturaldb {
    constructor() {
        // this.readMap()
        // mongoobj.connect()
    }
    static saveData(dat) {
        let key = new dataKey_1.dataKey(genRanHex(8), new Uint16Array(Array.from({ length: 16 }, () => Math.floor(Math.random() * 16))));
        key_list.push(key);
        dat_map.set(key, dat);
        return key;
    }
    static getData(key) {
        return dat_map.get(key);
    }
    static getDataWithArray(array) {
        let value;
        key_list.forEach(element => {
            if (element.keyArray == array) {
                value = dat_map.get(element);
            }
        });
        return value;
    }
    static getDataWithString(array) {
        let value;
        key_list.forEach(element => {
            if (element.keyString == array) {
                value = dat_map.get(element);
            }
        });
        return value;
    }
    static onCon(dat) {
        console.log("new client connected");
    }
    static onMsg(msg) {
        /*
        [0] : command
        [1] : arg1
        [2] : arg2
        .
        .
        */
        let array = Buffer.from(msg).toString().replace('[', '').replace(']', '').split(',');
        console.log(array);
        if (array[0] == "push") {
            let key = unnaturaldb.saveData(new dataValue_1.dataValue(array[1], new Uint16Array(Array.from({ length: 16 }, () => Math.floor(Math.random() * 16)))));
            ws_1.con.send('[key,' + key.keyString + ']');
        }
        else if (array[0] == "pull") {
            let data = unnaturaldb.getDataWithString(array[1]);
            ws_1.con.send('[data,' + data.dat + ']');
        }
    }
    saveMap() {
        // mongoobj.addManyToUsers(JSON.stringify(Object.fromEntries(dat_map)))
    }
    readMap() {
        // mongoobj.getAll().then((data) => {
        //     dat_map = new Map(data)
        // })
    }
}
exports.unnaturaldb = unnaturaldb;
(0, ws_1.addToEvent)(unnaturaldb.onCon, 'connection');
(0, ws_1.addToEvent)(unnaturaldb.onMsg, "message");
// process.on('SIGINT', unnaturaldb.saveData);
// process.on('SIGUSR1', unnaturaldb.saveData);
// process.on('SIGUSR2', unnaturaldb.saveData);
/////////////////////////////////////////////
let db = new unnaturaldb();
let key = unnaturaldb.saveData(new dataValue_1.dataValue("test", new Uint16Array(Array.from({ length: 16 }, () => Math.floor(Math.random() * 16)))));
console.log("with key : ", unnaturaldb.getData(key));
console.log("with array : ", unnaturaldb.getDataWithArray(key.keyArray));

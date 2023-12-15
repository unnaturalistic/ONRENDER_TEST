"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromEvent = exports.addToEvent = exports.con = void 0;
const ws_1 = require("ws");
const events_1 = __importDefault(require("events"));
var eventEmitter = new events_1.default();
const wss = new ws_1.WebSocketServer({
    port: 8282
});
function addToEvent(listen, event) {
    eventEmitter.on(event, listen);
}
exports.addToEvent = addToEvent;
function removeFromEvent(listen, event) {
    eventEmitter.removeListener(event, listen);
}
exports.removeFromEvent = removeFromEvent;
function emitEvent(event, msg) {
    eventEmitter.emit(event, msg);
}
wss.on('connection', function connection(ws) {
    emitEvent('connection', '');
    exports.con = ws;
    ws.on('error', () => {
        emitEvent('error', 'An error has occured!');
    });
    ws.on('message', function message(data) {
        emitEvent('message', data);
    });
});

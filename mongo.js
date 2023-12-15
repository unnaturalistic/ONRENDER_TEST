"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoobj = void 0;
require("mongodb");
const mongodb_1 = require("mongodb");
const uri = 'mongodb+srv://API:penispenis123@sc-cluster.ubodzjs.mongodb.net/?retryWrites=true&w=majority';
const client = new mongodb_1.MongoClient(uri, { serverSelectionTimeoutMS: 1000 });
const db = client.db("SkyCraft");
const db_users = db.collection("users");
class mongoobj {
    static connect() {
        client.connect().then(() => {
            console.log("Connected to mongodb");
            // console.log(this.getAll().then( (thinger) => { console.log(thinger) }))
            // this.getAll().then( (thinger) => { addmap(Object.fromEntries(JSON.parse(thinger)))})
        });
    }
    static addToUsers(obj) {
        db_users.insertOne(obj);
        console.log("INSERTING: ", obj);
    }
    static addManyToUsers(obj) {
        db_users.insertMany(obj);
        console.log("INSERTING: ", obj);
    }
    static async getFromUsers(prop) {
        return await db_users.findOne(prop);
    }
    static async getAll() {
        return await db_users.find().toArray();
    }
    static updateFromUsers(id, prop) {
        db_users.updateOne({
            _id: id
        }, {
            $set: prop
        });
    }
    static deleteFromUsers(id) {
        db_users.deleteOne({ _id: id });
    }
}
exports.mongoobj = mongoobj;

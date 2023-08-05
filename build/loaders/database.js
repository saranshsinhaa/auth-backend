"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBInstance = void 0;
const mongodb_1 = require("mongodb");
const config_1 = __importDefault(require("../config"));
const logger_1 = __importDefault(require("./logger"));
class DBInstance {
    constructor() {
        this.opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxIdleTimeMS: 5000,
        };
        this.URL = config_1.default.dbURL;
        this.dbName = config_1.default.dbName;
        this.dbClient = new mongodb_1.MongoClient(this.URL, this.opts);
        this.getCollection = async (CollName, DBName) => {
            try {
                DBInstance.db = DBInstance.mongoClient.db(DBName);
                return DBInstance.db.collection(CollName);
            }
            catch (err) {
                console.error('❌ Could not change the collection\n%o', err);
                throw mongodb_1.MongoError;
            }
        };
    }
    async initialize() {
        try {
            logger_1.default.info('🔶 MongoDB Instance was Called first Time !!');
            DBInstance.mongoClient = await this.dbClient.connect();
            DBInstance.db = DBInstance.mongoClient.db(this.dbName);
            logger_1.default.info(`✅ Connected to MongoDB: ${this.dbName}`);
        }
        catch (err) {
            console.error('❌ Could not connect to MongoDB\n%o', err);
            throw mongodb_1.MongoError;
        }
    }
}
exports.DBInstance = DBInstance;
_a = DBInstance;
DBInstance.getInstance = async () => {
    if (!DBInstance.instance) {
        DBInstance.instance = new DBInstance();
        await DBInstance.instance.initialize();
    }
    return DBInstance.instance;
};
//# sourceMappingURL=database.js.map
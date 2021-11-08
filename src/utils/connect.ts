//import {MongoClient} from "mongodb";
import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

async function connect(){
    const dbUri = config.get<string>("dbUri");

    try {
        await mongoose.connect(dbUri);
        logger.info("DB Connected");
    } catch (error) {
        logger.error("Could not connect to DB");
        process.exit(1);
    }
}

export default connect;

/*
//Try with MongoDB instead of moongoose
async function connect() {
    const {MongoClient} = require("mongodb");
    const dbUri = config.get<string>("dbUri");

    // Connection URL
    const client = new MongoClient(dbUri);

    // Database Name
    const dbName = "to-do_app";

    try {
        // Use connect method to connect to the server
        await client.connect();
        logger.info("DB Connected!");
    } catch (error) {
        logger.error("Could not connect to db!");
        process.exit(1);
    }
}
 */

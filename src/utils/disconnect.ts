import mongoose from "mongoose";
import logger from "./logger";

async function disconnect(){
    try {
        await mongoose.disconnect();
        logger.info("DB disconnected");
    } catch (error) {
        logger.error("Could not disconnect from DB");
        process.exit(1);
    }
}

export default disconnect;
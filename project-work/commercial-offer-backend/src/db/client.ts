import {MongoClient} from "mongodb"

const url = "mongodb://root:rfktylfhm@192.168.88.213:27017";

export const client = async () => {
    const client = await MongoClient.connect(url)
    console.log("Client started!");
    return client
}

import {mongoClient} from "./mongoClient"
import ISlide from "../models/slide"
import {ObjectID} from "mongodb"

const getSlideById = async (slideId: string): Promise<any> => {
    const client = await mongoClient()

    let id = new ObjectID(slideId)

    let result = await client.db("personal-offer").collection('presentations').aggregate(
        [
            {$match: {_id: id}},
            {
                $lookup:
                    {
                        from: "slides",
                        localField: "slides",
                        foreignField: "_id",
                        as: "slides",
                    }
            }
        ]).toArray()

    await client.close();

    return Promise.resolve(result)
}

const getAllSlide = async (): Promise<ISlide []> => {
    const client = await mongoClient()

    const slides = await client.db("personal-offer")
        .collection("slides")

    let result = await slides.find({}).toArray()
    await client.close();

    // @ts-ignore
    return Promise.resolve(result as ISlide[])

}

const getCredentianls = async (login: string) => {
    const client = await mongoClient()

    const slides = await client.db("personal-offer")
        .collection("credentials")

    let result = await slides.findOne({login: login})
    await client.close();

    return Promise.resolve(result)
}

const getPresentations = async () => {
    const client = await mongoClient()
    const presentations = client.db("personal-offer").collection("presentations")
    const result = await presentations.find().toArray()

    await client.close();
    return Promise.resolve(result)
}

export {getSlideById, getAllSlide, getCredentianls, getPresentations}

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

const getSlide = async (_id: string) => {
    const client = await mongoClient()
    const slides = client.db("personal-offer").collection("slides")
    let objectId = new ObjectID(_id)
    let result = await slides.findOne({_id: objectId})
    return result
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

const updateSlide = async (_id: string,
                           title: string,
                           description: string,
                           imageUrl: string) => {
    const client = await mongoClient()
    const slides = client.db("personal-offer").collection("slides")
    const objectId = new ObjectID(_id)
    console.log(_id)
    await slides.updateOne(
        {_id: objectId},
        {
            $set: {
                title: title,
                imageUrl: imageUrl,
                description: description
            }
        }
    )
    let result = await getSlide(_id)
    console.log(result)
    return result
}

const updatePresentation = async (_id: string, description: string) => {
    const client = await mongoClient()
    const presentations = client.db("personal-offer").collection("presentations")
    const objectId = new ObjectID(_id)
    await presentations.updateOne(
        {_id: objectId},
        {
            $set: {
                description: description
            }
        }
    )
    let result = await getSlideById(_id)
    console.log(result)
    return result[0]
}

const insertSlide = async (title: string,
                           description: string,
                           imageUrl: string) => {
    const client = await mongoClient()
    const slides = client.db("personal-offer").collection("slides")
    let result = await slides.insertOne({
        title: title,
        description: description,
        imageUrl: imageUrl
    })
    console.log(result)

    return {
        _id: result.insertedId.toString(),
        title: title,
        description: description,
        imageUrl: imageUrl
    } as ISlide
}

export {
    getSlideById,
    getAllSlide,
    getCredentianls,
    getPresentations,
    updateSlide,
    updatePresentation,
    insertSlide
}

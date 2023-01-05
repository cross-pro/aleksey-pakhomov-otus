import {mongoClient} from "./mongoClient"
import ISlide from "../models/slide";

const getSlideById = async (slideId: string): Promise<ISlide []> => {
    const client = await mongoClient()

    const slides = await client.db("personal-offer")
        .collection("slides")

    let result = await slides.find({"slideId": slideId}).toArray()
    await client.close();

    // @ts-ignore
    return Promise.resolve(result as ISlide[])

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

export {getSlideById, getAllSlide}

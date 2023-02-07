import ISlide from "./slide";

export default interface IPresentations {
    _id: string,
    description: string,
    slides: ISlide[]
}
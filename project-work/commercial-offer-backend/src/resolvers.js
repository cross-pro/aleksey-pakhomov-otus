import {
    getSlideById,
    getAllSlide,
    getCredentianls,
    getPresentations
} from "./db/db-functions"

const resolvers = {
    Query: {
        slidesById: (parent, {slideId}, context, info) => getSlideById(slideId),
        slides: () => getAllSlide(),
        credentialsByLogin: (parent, {login}, context, info) => getCredentianls(login),
        presentations: () => getPresentations()
    },

}

export default resolvers

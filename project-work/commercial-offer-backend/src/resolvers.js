import {
    getSlideById,
    getAllSlide,
    getCredentianls
} from "./db/db-functions"

const resolvers = {
    Query: {
        slidesById: (parent, {slideId}, context, info) => getSlideById(slideId),
        slides: () => getAllSlide(),
        credentialsByLogin: (parent, {login}, context, info) => getCredentianls(login)
    },

}

export default resolvers

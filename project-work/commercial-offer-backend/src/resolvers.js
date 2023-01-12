import {
    getSlideById,
    getAllSlide,
    getCredentianls,
    getPresentations,
updateSlide
} from "./db/db-functions"

const resolvers = {
    Query: {
        slidesById: (parent, {slideId}, context, info) => getSlideById(slideId),
        slides: () => getAllSlide(),
        credentialsByLogin: (parent, {login}, context, info) => getCredentianls(login),
        presentations: () => getPresentations()
    },

    Mutation: {
        updateSlide: (parent, {_id, title, description, imageUrl}, context, info) =>
            updateSlide(_id, title, description, imageUrl)
    }

}

export default resolvers

import {
    getSlideById,
    getAllSlide,
    getCredentianls,
    getPresentations,
    updateSlide,
    updatePresentation,
    insertSlide,
    insertPres
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
            updateSlide(_id, title, description, imageUrl),
        updatePresentation: (parent, {_id, description}, context, info) => updatePresentation(_id, description),
        addSlide: (parent, {title, description, imageUrl, presId}, context, info) => insertSlide(title, description, imageUrl, presId),
        addPres: (parent, {description}, context, info) => insertPres(description)
    }

}

export default resolvers

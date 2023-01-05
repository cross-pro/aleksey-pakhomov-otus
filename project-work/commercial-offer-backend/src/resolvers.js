import {
    getSlideById,
    getAllSlide
} from "./db/db-functions"

const resolvers = {
    Query: {
        slidesById: (parent, {slideId}, context, info) => getSlideById(slideId),
        slides: () => getAllSlide()
    },

}

export default resolvers

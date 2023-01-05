import {
    slides
} from "./db"

const resolvers = {
    Query: {
        slidesById: (parent, {slideId}, context, info) => slides.filter(p=>p.slideId==slideId),
        slides: () => slides
    },

}

export default resolvers

const initialState = {};
export const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "SLIDES":
            return {
                ...state,
                slides: action.slides
            }
        case "CHANGE_SLIDE":
            return {
                ...state,
                changeSlide: action.changeSlide
            }
        case "SLIDE_NUMBER":
            return {
                ...state,
                slideNumber: action.slideNumber
            }
        case "EDIT_PRESENTATION":
            return {
                ...state,
                presentation: action.presentation
            }
        default:
            return state;
    }
}
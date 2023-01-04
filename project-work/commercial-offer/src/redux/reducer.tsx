const initialState = {};
export const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "SLIDES":
            return {
                slides: action.slides
            }
        default:
            return state;
    }
}
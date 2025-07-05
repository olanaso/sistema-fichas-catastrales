export const initialState = {
    tabla: [],
    valoressatelitesSeleccionados: [],
    error: "",
    authentication:false
};


export const geograficReducer = (state, action) => {
    switch (action.type) {
        case 'searchSatelite':
            return {
                ...state,
                [action.payload]: {
                    ...state[action.payload],
                    visibility: !state[action.payload].visibility
                }
            }
        case 'setSlider':
            return {
                ...state,
                [action.payload.controlId]: {
                    ...state[action.payload.controlId],
                    range: action.payload.range
                }
            }
        case 'CLEAR_DATALAYER':
            return {
                ...state
            }
        case 'SET_DATALAYER':
            return {
                ...state,
                dataLayers: action.payload.features
            }
        case 'reset':
            return init(action.payload)
        default:
            throw new Error()
    }
}

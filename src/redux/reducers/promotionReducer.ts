import {
    SET_LOADING,
    GET_PROMOTIONS,
    CREATE_PROMOTION,
    DELETE_PROMOTION,
} from '../actions/promotionAction'

// Define your state here
const initialState: ReduxPromotionState = {
    loading: false,
    promotions: []
}

// This export default will control your state for your application
export default function promotion(state = initialState, action: { type: string, payload: Promotion[] }): ReduxPromotionState {
    switch (action.type) {
        // Set loading
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_PROMOTIONS:
            return {
                ...state,
                promotions: action.payload as Promotion[],
                loading: false
            }
        case CREATE_PROMOTION:
            return {
                ...state,
                promotions: action.payload,
                loading: false
            }
        case DELETE_PROMOTION:
            return {
                ...state,
                promotions: action.payload as Promotion[],
                loading: false
            }
        // Return default state if you didn't match any case
        default:
            return state
    }
}
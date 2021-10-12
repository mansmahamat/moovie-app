import { Action } from './action'


const initialState = {
    wishlist: [],
    users: []
}


export default function(state = initialState, action){

    switch(action.type){

        
        case Action.ADD_TO_WISHLIST: 
            return {
                ...state,
                wishlist:[...state.wishlist, action.payload]
            }
        case Action.REMOVE_FROM_WISHLIST: 
            return {
                ...state,
                wishlist: state.wishlist.filter((movie) => movie._id !== action.payload._id)
            }
        default:
            return state
    }


}
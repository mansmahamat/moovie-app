export const addToWishList = (movie) => (dispatch) => {

    dispatch({
        type: Action.ADD_TO_WISHLIST,
        payload: movie
    })

}


export const removeFromWishlist = (movie) => (dispatch) => {

    dispatch({
        type: Action.REMOVE_FROM_WISHLIST,
        payload: movie
    })

}
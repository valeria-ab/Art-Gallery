export type InitialCardsStateType = {
    isNightModeOn: boolean
}
const initialState: InitialCardsStateType = {
    isNightModeOn: false,
};

export const galleryReducer = (state: InitialCardsStateType = initialState, action: ActionsType): InitialCardsStateType => {
    switch (action.type) {

        case 'GALLERY/SET-IS-NIGHT-MODE-ON':
            return {...state, ...action.payload}

        default:
            return state;
    }
};

export const setIsNightModeOn = (payload: { isNightModeOn: boolean }) => ({
    type: 'GALLERY/SET-IS-NIGHT-MODE-ON',
    payload
} as const)

type ActionsType =
    | ReturnType<typeof setIsNightModeOn>



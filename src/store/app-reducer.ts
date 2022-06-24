// eslint-disable-next-line import/no-cycle

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type InitialCardsStateType = {
  isNightModeOn: boolean;
  status: RequestStatusType;
};

export const setIsNightModeOn = (payload: { isNightModeOn: boolean }) => ({
  type: 'APP/SET-IS-NIGHT-MODE-ON',
  payload,
} as const);

export const setAppStatus = (payload: { status: RequestStatusType }) => ({
  type: 'APP/SET-STATUS',
  payload,
} as const);

type ActionsType =
  | ReturnType<typeof setIsNightModeOn>
  | ReturnType<typeof setAppStatus>;

const initialState: InitialCardsStateType = {
  isNightModeOn: false,
  status: 'idle',
};

export const appReducer = (
  state: InitialCardsStateType = initialState,
  action: ActionsType,
): InitialCardsStateType => {
  switch (action.type) {
    case 'APP/SET-IS-NIGHT-MODE-ON':
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

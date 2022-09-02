// eslint-disable-next-line import/no-cycle

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type InitialCardsStateType = {
  status: RequestStatusType;
  error: string
};

export const setAppStatus = (payload: { status: RequestStatusType }) => ({
  type: 'APP/SET-STATUS',
  payload,
} as const);
export const setAppError = (payload: { error: string }) => ({
  type: 'APP/SET-APP-ERROR',
  payload,
} as const);

type ActionsType =
  | ReturnType<typeof setAppStatus>
  | ReturnType<typeof setAppError>;

const initialState: InitialCardsStateType = {
  status: 'idle',
  error: '',
};

export const appReducer = (
  state: InitialCardsStateType = initialState,
  action: ActionsType,
): InitialCardsStateType => {
  switch (action.type) {
    case 'APP/SET-APP-ERROR':
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

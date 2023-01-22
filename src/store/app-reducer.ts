export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

export type InitialCardsStateType = {
  status: RequestStatusType;
  error: string;
  successMessage: string;
  isSearchFeatureShown: boolean;
};

export const setAppStatus = (payload: { status: RequestStatusType }) =>
  ({
    type: "APP/SET-STATUS",
    payload,
  } as const);
export const setAppError = (payload: { error: string }) =>
  ({
    type: "APP/SET-APP-ERROR",
    payload,
  } as const);
export const setAppSuccessMessage = (payload: { successMessage: string }) =>
  ({
    type: "APP/SET-APP-SUCCESS-MESSAGE",
    payload,
  } as const);
export const setSearchFeatureShown = (payload: {
  isSearchFeatureShown: boolean;
}) =>
  ({
    type: "APP/HIDE-SEARCH-FEATURE",
    payload,
  } as const);

type ActionsType =
  | ReturnType<typeof setAppStatus>
  | ReturnType<typeof setAppError>
  | ReturnType<typeof setAppSuccessMessage>
  | ReturnType<typeof setSearchFeatureShown>;

const initialState: InitialCardsStateType = {
  status: "idle",
  error: "",
  successMessage: "",
  isSearchFeatureShown: false,
};

export const appReducer = (
  state: InitialCardsStateType = initialState,
  action: ActionsType
): InitialCardsStateType => {
  switch (action.type) {
    case "APP/SET-APP-ERROR":
    case "APP/SET-APP-SUCCESS-MESSAGE":
    case "APP/HIDE-SEARCH-FEATURE":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

import { AppWideLoadingTypes } from './types';

const initialState = false;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AppWideLoadingTypes.SET_APP_WIDE_LOADING:
      return action.payload;
    default:
      return state;
  }
};

export { reducer as appWideLoadingReducer };

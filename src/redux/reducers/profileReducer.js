import { types } from "../types/types";

const initialState = {
  profileActivo:""
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.profileLoad:
      return {
        ...state,
        profileActivo:action.payload
      };
    case types.profileFileUrl:
      return {
        urlPhoto: action.payload.url,
      };

      case types.profileClearLogout:
        return {
         ...state,
         profileActivo:""
        }

    default:
      return state;
  }
};

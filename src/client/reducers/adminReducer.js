import { FECTH_ADMINS } from "../actions";

export default (state = [], action) => {
  switch (action.type) {
    case FECTH_ADMINS:
      return action.payload.data;

    default:
      return state;
  }
};

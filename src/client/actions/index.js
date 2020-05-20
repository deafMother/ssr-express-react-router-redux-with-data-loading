// this is making of the axios instance

export const FET_USERS = "fetch_users";

export const fetchUsers = () => async (dispatch, getSate, api) => {
  const res = await api.get("/users");

  dispatch({
    type: FET_USERS,
    payload: res,
  });
};

export const FETCH_CURRENT_USER = "fetch-current-user";
export const fetchCurrentUser = () => async (dispatch, getSate, api) => {
  const res = await api.get("/current_user");

  dispatch({
    type: FETCH_CURRENT_USER,
    payload: res,
  });
};

export const FECTH_ADMINS = "fetch_admins";

export const fetchAdmins = () => async (dispatch, getSate, api) => {
  const res = await api.get("/admins");
  dispatch({
    type: FECTH_ADMINS,
    payload: res,
  });
};

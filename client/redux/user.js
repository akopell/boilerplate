import axios from 'axios';

const GET_USER = 'GET_USER';
const SET_FETCHING_STATUS = 'SET_FETCHING_STATUS';
const ADD_USER = 'ADD_USER';

const gotMe = (user) => ({
  type: GET_USER,
  user,
});

const setFetchingStatus = (isFetching) => ({
  type: SET_FETCHING_STATUS,
  isFetching,
});

export const fetchMe = () => {
  return async (dispatch) => {
    dispatch(setFetchingStatus(true));
    try {
      const response = await axios.get('/auth/me');
      dispatch(gotMe(response.data));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setFetchingStatus(false));
    }
  };
};

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await axios.put('/auth/login', credentials);
      dispatch(gotMe(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const signUp = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/auth/signup', user);
      dispatch(gotMe(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await axios.delete('/auth/logout');
      dispatch(gotMe({}));
    } catch (error) {
      console.error(error);
    }
  };
};

const initialState = {
  isFetching: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        ...action.user,
      };
    case SET_FETCHING_STATUS:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    default:
      return state;
  }
};

export default reducer;

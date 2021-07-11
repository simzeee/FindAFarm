// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const MAKE_FARMER = 'session/MAKE_FARMER';

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

//this just logs you out
const removeUser = () => ({
  type: REMOVE_USER,
});

const makeAFarmer = (id) => ({
  type: MAKE_FARMER,
  payload: id
})

//thunks

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (data.errors) {
    return data;
  }
  dispatch(setUser(data));
};

export const login = (email, password) => async (dispatch) => {
  console.log("login")
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();
  if (data.errors) {
    console.log("ERRORS")
    return data;
  }
  dispatch(setUser(data));
  return {};
};

export const becomeFarmer = (id) => async (dispatch) => {
  console.log("DID WE DISPATCH?")
const {userId} = id
  const response = await fetch('/api/auth/login', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId
    })
  })
  const data = await response.json();
  if (data.errors) {
    return;
  }
  dispatch(makeAFarmer(data));
}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  dispatch(removeUser());
};

export const signUp = (username, email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  const data = await response.json();
  if (data.errors) {
    return data;
  }

  dispatch(setUser(data["id"]));
  return {}
};

const initialState = {user: null};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {user: action.payload}
    case REMOVE_USER:
      return {user: null}
    case MAKE_FARMER:
      const newState = {...state}
      newState.user.farmer = true
      return newState      
    default:
      return state;
  }
}

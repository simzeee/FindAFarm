//actions

const SEARCH_RESULTS = 'search/SEARCH_RESULTS';

//action creators

const search = (farms) => ({
  type: SEARCH_RESULTS,
  payload: farms,
});

export const searchAllFarms = (payload) => async (dispatch) => {
  console.log('WE ARE IN THE SEARCH');

  let data = await fetch('/api/search/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
     payload
    ),
  });

  data = await data.json();
  if (data.errors) {
    return;
  }
  console.log('MY DATA RESPONSE', data);
  dispatch(search(data));
};

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_RESULTS: {
      const newState = { ...state };
      console.log('SEARCH RESULTS ACTION.PAYLOAD', action.payload);
    }
    default:
      return state;
  }
}

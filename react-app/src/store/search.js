//actions

const SEARCH_RESULTS = 'search/SEARCH_RESULTS';
const CLEAR_RESULTS = 'search/CLEAR_RESULTS';

//action creators

const search = (farms) => ({
  type: SEARCH_RESULTS,
  payload: farms,
});

const clearSearch = (id) => ({
  type: CLEAR_RESULTS,
  payload: id
})

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

export const clearSearchResults = (ids) => async (dispatch) => {
  dispatch(clearSearch(ids))
}

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_RESULTS: {
      const newState = { ...state };
      Object.values(action.payload.results).forEach((farm)=>{
        console.log("EACH FARM", farm, typeof(farm))
        newState[farm.id] = farm
      })
      console.log('SEARCH RESULTS ACTION.PAYLOAD', typeof(action.payload), action.payload);
      return newState;
    }
    case CLEAR_RESULTS:{
      const newState = {...state}
      console.log("ACTION PAYLOAD", action.payload)
      console.log("NEW STATE", newState, typeof(newState), newState[1])
      Object.values(action.payload.ids).forEach((id)=>{
        console.log("INSIDE FOR EACH", id)
        delete newState[id]
      })
      return newState
    }
    default:
      return state;
  }
}

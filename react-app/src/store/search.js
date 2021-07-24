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
        
        newState[farm.id] = farm
      })

      return newState;
    }
    case CLEAR_RESULTS:{
      const newState = {...state}
      Object.values(action.payload.ids).forEach((id)=>{
        delete newState[id]
      })
      return newState
    }
    default:
      return state;
  }
}

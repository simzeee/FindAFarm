//actions

const GET_FARMS = 'farms/GET_FARMS';
const GET_ONE_FARM = 'farms/GET_ONE_FARM';

//action creators

const getFarms = (farms) => ({
  type: GET_FARMS,
  payload: farms,
});

const getFarm = (farm) => ({
  type: GET_ONE_FARM,
  payload: farm,
});

//thunks

export const getAllFarms = () => async (dispatch) => {
  let data = await fetch('/api/farms/');

  data = await data.json();
  if (data.errors) {
    return;
  }

  dispatch(getFarms(data.farms));
};

export const getOneFarm = (id) => async (dispatch) => {
  let data = await fetch(`/api/farms/${id}`);

  data = await data.json();
  if (data.errors) {
    return;
  }
  dispatch(getFarm);
};

let initialState = {};

//reducer

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_FARMS: {
      const newState = { ...state };
      action.payload.forEach((farm)=>{
        newState[farm.id] = farm
      });
      return newState;
    }
    case GET_ONE_FARM: {
      const newState = {...state};
      newState[action.payload.id] = action.payload;
      return newState;
    }
    default:
      return state;
  }
}

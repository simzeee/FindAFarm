//actions

const GET_FARMS = 'farms/GET_FARMS';
const GET_ONE_FARM = 'farms/GET_ONE_FARM';
const CREATE_FARM = 'farms/CREATE_FARM';

//action creators

const getFarms = (farms) => ({
  type: GET_FARMS,
  payload: farms,
});

const getFarm = (farm) => ({
  type: GET_ONE_FARM,
  payload: farm,
});

const createFarm = (farm) => ({
  type: CREATE_FARM,
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

export const createOneFarm = (farm) => async (dispatch) => {
  const { farmName, pricePerDay, location, description } = farm;

  const response = await fetch('/api/farms/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      farmName,
      pricePerDay,
      location,
      description,
    }),
  });
  const data = await response.json();
  if (data.errors) {
    return;
  }
  console.log("DATA/RESPONSE", data)

  dispatch(createFarm(data))

  
};

let initialState = {};

//reducer

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_FARMS: {
      const newState = { ...state };
      action.payload.forEach((farm) => {
        newState[farm.id] = farm;
      });
      return newState;
    }
    case GET_ONE_FARM: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case CREATE_FARM: {
      const newState = {...state};
      newState[action.payload.farm.id] = action.payload
      return newState;
    }
    default:
      return state;
  }
}

//actions

const GET_FARMS = 'farms/GET_FARMS';
const GET_ONE_FARM = 'farms/GET_ONE_FARM';
const CREATE_FARM = 'farms/CREATE_FARM';
const EDIT_FARM = 'farms/EDIT_FARM'
const DELETE_FARM = 'farms/DELETE_FARM'

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

const editFarm = (farm) => ({
  type: EDIT_FARM,
  payload: farm
})

const deleteFarm = (id) => ({
  type: DELETE_FARM,
  payload: id
})

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
  const { farmName, pricePerDay, location, description, formData } = farm;

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
      formData
    }),
  });
  const data = await response.json();
  if (data.errors) {
    return;
  }

  dispatch(createFarm(data))
};

export const editOneFarm = (farm) => async (dispatch) => {
  const { farmName, pricePerDay, location, description, farmId } = farm;
  console.log("WE DISPATCHED")

  const response = await fetch('/api/farms/', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      farmName,
      pricePerDay,
      location,
      description,
      farmId
    })
  })
  const data = await response.json();
  if (data.errors) {
    return;
  }

  dispatch(editFarm(data))
}

export const deleteOneFarm = (payload) => async (dispatch) => {
  console.log("PAYLOAD IN THUNK", payload)
  const {farmId} = payload

  let data = await fetch(`/api/farms/${farmId}`, {
    method: "DELETE",
  })

  data = await data.json();
  if (data.errors) {
    return
  }

  dispatch(deleteFarm(data))

} 

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
    case EDIT_FARM: {
      const newState = {...state};
      newState[action.payload.farm.id] = action.payload.farm
      return newState
    }
    case DELETE_FARM: {
      const newState = {...state};
      console.log("ACTION PAYLOAD HERE DELETE", action.payload)
      console.log("STATE STUFF", newState[action.payload.id])
      delete newState[action.payload.id]
      return newState
    }
    default:
      return state;
  }
}

//actions

const GET_AMENITIES = 'amenities/GET_AMENITIES';
const CREATE_AMENITY = 'amenities/CREATE_AMENITY';
const DELETE_AMENITY = 'amenities/DELETE_AMENITY';

//action creators

const getAmenities = (amenities) => ({
  type: GET_AMENITIES,
  payload: amenities,
});

const createAmenity = (amenity) => ({
  type: CREATE_AMENITY,
  payload: amenity,
});

const deleteAmenity = (id) => ({
  type: DELETE_AMENITY,
  payload: id,
});

//thunk
export const getAllAmenities = () => async (dispatch) => {
  let data = await fetch('/api/amenities/');

  data = await data.json();
  if (data.errors) {
    return;
  }
  dispatch(getAmenities(data.amenities));
};

export const createOneAmenity = (amenity) => async (dispatch) => {
  const { pigRoast, goatYoga, tableMaking, farmName } = amenity;

  let data = await fetch('/api/amenities/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      pigRoast,
      goatYoga,
      tableMaking,
      farmName,
    }),
  });
  data = await data.json();
  if (data.errors) {
    return;
  }
  dispatch(createAmenity(data));
};

export const deleteOneAmenity = (payload) => async (dispatch) => {
  console.log('IN DELETE AMENITY THUNK', payload);
  const { amenityId } = payload;
  let id = amenityId;

  dispatch(deleteAmenity(id));
};

//initial state
const initialState = {};

//reducer

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_AMENITIES: {
      const newState = { ...state };
      action.payload.forEach((amenity) => {
        newState[amenity.id] = amenity;
      });
      return newState;
    }
    case CREATE_AMENITY: {
      const newState = { ...state };
      newState[action.payload.amenity.id] = action.payload.amenity;
      return newState;
    }
    case DELETE_AMENITY: {
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    }
    default:
      return state;
  }
}

// actions

const GET_BOOKINGS = 'bookings/GET_BOOKINGS';
const GET_ONE_BOOKING = 'booking/GET_ONE_BOOKING';
const CREATE_BOOKING = 'cooking/CREATE_BOOKING';

// action creators

const getBookings = (bookings) => ({
  type: GET_BOOKINGS,
  payload: bookings,
});

const getBooking = (booking) => ({
  type: GET_ONE_BOOKING,
  payload: booking,
});

const createBooking = (
  userId,
  costOfStay,
  startDate,
  endDate,
  farmId,
  numberOfGuests,
  nameOfFarm
) => ({
  type: CREATE_BOOKING,
  payload: { userId, costOfStay, startDate, endDate, farmId, numberOfGuests, nameOfFarm },
});

//thunks

export const getAllBookings = () => async (dispatch) => {
  let data = await fetch('/api/bookings/', {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  data = await data.json();
  if (data.errors) {
    return;
  }

  dispatch(getBookings(data.bookings));
};

export const getOneBooking = (id) => async (dispatch) => {
  let data = await fetch(`/api/bookings/${id}`);

  data = await data.json();
  if (data.errors) {
    return;
  }
  dispatch(getBooking(data));
};

export const createOneBooking =
  ({userId, costOfStay, startDate, endDate, farmId, numberOfGuests, nameOfFarm}) =>
  async (dispatch) => {
    
    let newBooking = JSON.stringify({
      userId,
      costOfStay,
      startDate,
      endDate,
      farmId,
      numberOfGuests,
      nameOfFarm
    });
// debugger
    const response = await fetch("/api/bookings/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: newBooking,
    });

    const data = await response.json();
    if(data.errors) {
      return;
    }

    dispatch(createBooking(userId, costOfStay, startDate, endDate, farmId, numberOfGuests, nameOfFarm))

  };
// initial state

let initialState = {};


//reducer

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKINGS: {
      const newState = { ...state };
      action.payload.forEach((booking) => {
        newState[booking.id] = booking;
      });
      return newState;
    }
    case GET_ONE_BOOKING: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case CREATE_BOOKING: {
      const newState = {...state};
      newState[action.payload.id] = action.payload
    }
    default:
      return state;
  }
}

// actions

const GET_BOOKINGS = 'bookings/GET_BOOKINGS';
const GET_ONE_BOOKING = 'booking/GET_ONE_BOOKING';
const CREATE_BOOKING = 'booking/CREATE_BOOKING';
const EDIT_BOOKING = 'booking/EDIT_BOOKING';
const DELETE_BOOKING = 'booking/DELETE_BOOKING';

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
  nameOfFarm,
  bookingId
) => ({
  type: CREATE_BOOKING,
  payload: {
    userId,
    costOfStay,
    startDate,
    endDate,
    farmId,
    numberOfGuests,
    nameOfFarm,
    bookingId,
  },
});

const editBooking = (
  userId,
  costOfStay,
  startDate,
  endDate,
  farmId,
  numberOfGuests,
  nameOfFarm,
  bookingId
) => ({
  type: EDIT_BOOKING,
  payload: {
    userId,
    costOfStay,
    startDate,
    endDate,
    farmId,
    numberOfGuests,
    nameOfFarm,
    bookingId,
  },
});

const deleteBooking = (id) => ({
  type: DELETE_BOOKING,
  payload: id,
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
  ({
    userId,
    costOfStay,
    startDate,
    endDate,
    farmId,
    numberOfGuests,
    nameOfFarm,
  }) =>
  async (dispatch) => {
    let newBooking = JSON.stringify({
      userId,
      costOfStay,
      startDate,
      endDate,
      farmId,
      numberOfGuests,
      nameOfFarm,
    });

    const response = await fetch('/api/bookings/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: newBooking,
    });

    const data = await response.json();
    if (data.errors) {
      return;
    }
    let bookingId = data.bookings.id;

    dispatch(
      createBooking(
        userId,
        costOfStay,
        startDate,
        endDate,
        farmId,
        numberOfGuests,
        nameOfFarm,
        bookingId
      )
    );
  };

export const editOneBooking =
  ({
    userId,
    costOfStay,
    startDate,
    endDate,
    farmId,
    numberOfGuests,
    nameOfFarm,
    bookingId,
  }) =>
  async (dispatch) => {
    let editedBooking = JSON.stringify({
      userId,
      costOfStay,
      startDate,
      endDate,
      farmId,
      numberOfGuests,
      nameOfFarm,
      bookingId,
    });

    const response = await fetch(`/api/bookings/${bookingId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: editedBooking,
    });

    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(
      editBooking(
        userId,
        costOfStay,
        startDate,
        endDate,
        farmId,
        numberOfGuests,
        nameOfFarm,
        bookingId
      )
    );
  };

export const deleteOneBooking = (id) => async (dispatch) => {
  id = id.bookingId;
  
  let data = await fetch(`/api/bookings/${id}`, {
    method: 'DELETE',
  });

  data = await data.json();
  if (data.errors) {
    return;
  }

  dispatch(deleteBooking(data));
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
      const newState = { ...state };
      newState[action.payload.bookingId] = action.payload;
      return newState;
    }
    case EDIT_BOOKING: {
      const newState = { ...state };
      newState[action.payload.bookingId] = action.payload;
      return newState;
    }
    case DELETE_BOOKING: {
      const newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    }
    default:
      return state;
  }
}

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SplashPage from './components/SplashPage/SplashPage';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/User/UsersList';
import User from './components/User/User';
import LoggedInUser from './components/LoggedInHome/LoggedInHome';
import GuestBooking from './components/GuestBooking/GuestBooking';
import Booking from './components/Booking/Booking';
import EditBooking from './components/EditBooking/EditBooking';
import AllFarms from './components/AllFarms/AllFarms';
import Farm from './components/OneFarm/OneFarm';
import CreateFarm from './components/CreateFarm/CreateFarm';
import EditFarm from './components/EditFarm/EditFarm';
import EditFarmPhotos from './components/EditFarmPhotos/EditFarmPhotos';
import SearchResults from './components/SearchResults/SearchResults';
import { authenticate } from './store/session';


function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact={true}>
          <SplashPage></SplashPage>
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/userHome" exact={true}>
          <LoggedInUser></LoggedInUser>
        </ProtectedRoute>
        <ProtectedRoute path="/bookings" exact={true}>
          <GuestBooking></GuestBooking>
        </ProtectedRoute>
        <ProtectedRoute path="/bookings/:bookingId" exact={true}>
          <Booking />
        </ProtectedRoute>
        <ProtectedRoute path="/editBookings/:bookingId" exact={true}>
          <EditBooking></EditBooking>
        </ProtectedRoute>
        <Route path="/farms" exact={true}>
          <AllFarms></AllFarms>
        </Route>
        <Route path="/farms/:farmId" exact={true}>
          <Farm></Farm>
        </Route>
        <ProtectedRoute path="/createFarm" exact={true}>
          <CreateFarm></CreateFarm>
        </ProtectedRoute>
        <ProtectedRoute path="/editFarm/:farmId" exact={true}>
          <EditFarm></EditFarm>
        </ProtectedRoute>
        <ProtectedRoute path="/editFarmPhotos/:farmId" exact={true}>
          <EditFarmPhotos></EditFarmPhotos>
        </ProtectedRoute>
        <Route path="/searchResults" exact={true}>
          <SearchResults></SearchResults>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

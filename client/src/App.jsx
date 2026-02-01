import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import SeatLayout from "./pages/SeatLayout";
import Favourite from "./pages/Favourite";
import MyBookings from "./pages/MyBookings";

// Admin
import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import AddShows from "./pages/admin/AddShows";
import ListShows from "./pages/admin/ListShows";
import ListBookings from "./pages/admin/ListBookings";
import { useAppContext } from "./context/AppContext";
import { SignIn } from "@clerk/clerk-react";

import { Navigate } from "react-router-dom";
import Loading from "./components/Loading";


const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith("/admin");

  const { user, isAdmin, adminLoading } = useAppContext();

  console.log("FRONTEND USER:", user?.id);
console.log("FRONTEND IS ADMIN:", isAdmin);
console.log("ADMIN LOADING:", adminLoading);


  return (
    <>
      <Toaster />

      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* USER ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/movies/:id/:date" element={<SeatLayout />} />
        <Route path="/favourite" element={<Favourite />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/loading/:nextUrl" element={<Loading />} />

        {/* ADMIN ROUTES (NESTED) */}
        <Route
          path="/admin/*"
          element={
            !user ? (
              <div className="min-h-screen flex justify-center items-center">
                <SignIn fallbackRedirectUrl="/admin" />
              </div>
            ) : adminLoading ? (
              <div className="min-h-screen flex justify-center items-center">
                Checking permissions...
              </div>
            ) : !isAdmin ? (
              <Navigate to="/" replace />
            ) : (
              <Layout />
            )
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="add-shows" element={<AddShows />} />
          <Route path="list-shows" element={<ListShows />} />
          <Route path="list-bookings" element={<ListBookings />} />
        </Route>
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;


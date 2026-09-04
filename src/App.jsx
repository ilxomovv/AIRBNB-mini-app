import { HttpLink } from "@apollo/client";
import { InMemoryCache } from "@apollo/client";
import { ApolloClient } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import Listings from "./components/Listings";
import { Route, Routes } from "react-router";
import SignUp from "./components/SignUp";
import { ToastContainer } from "react-toastify";
import { client } from "./Graphql-client";
import ListingsDetail from "./components/ListingsDetail";
import HomePage from "./components/HomePage";
import Favorites from "./components/Favorites";
import Login from "./components/Login";
import Bookings from "./components/Bookings";

function App() {
  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/sign" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/listings/:id" element={<ListingsDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
      <ToastContainer position="top-center" />
    </ApolloProvider>
  );
}

export default App;

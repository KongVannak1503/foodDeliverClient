import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/auth/LoginPage"
import HomePage from "./pages/home/HomePage"
import MainLayout from "./components/layouts/MainLayout"
import RestaurantList from "./pages/restaurant"
import CreateRestaurant from "./pages/restaurant/create"
import RestaurantUpdate from "./pages/restaurant/update"
import UserList from "./pages/user"
import CreateUser from "./pages/user/create"
import UpdateUser from "./pages/user/update"
import DeliveryList from "./pages/delivery-partner"
import CreateDelivery from "./pages/delivery-partner/create"
import DeliveryUpdate from "./pages/delivery-partner/update"
import MenuItemsList from "./pages/restaurant/menu-item"
// import ItemsProfile from "./pages/restaurant/menu-item/update"
import CreateMenu from "./pages/restaurant/menu-item/create"
import UpdateMenu from "./pages/restaurant/menu-item/update"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<MainLayout />} />
          <Route path="/dashboard" element={<HomePage />} />

          <Route path="/users" element={<UserList />} />
          <Route path="/user/create" element={<CreateUser />} />
          <Route path="/user/update/:id" element={<UpdateUser />} />

          <Route path="/restaurant" element={<RestaurantList />} />
          <Route path="/restaurant/create" element={<CreateRestaurant />} />
          <Route path="/restaurant/profile/:id" element={<RestaurantUpdate />} />

          <Route path="/delivery-partners" element={<DeliveryList />} />
          <Route path="/delivery-partner/create" element={<CreateDelivery />} />
          <Route path="/delivery-partner/update/:id" element={<DeliveryUpdate />} />

          <Route path="/restaurant/menu-items/:id" element={<MenuItemsList />} />
          <Route path="/restaurant/menu-item/create/:id" element={<CreateMenu />} />
          <Route path="/restaurant/menu-item/update/:id/:itemId" element={<UpdateMenu />} />
          {/* <Route path="/google" element={<GoogleDrivePicker />} /> */}

          <Route path="*" element={<h1>Page not found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

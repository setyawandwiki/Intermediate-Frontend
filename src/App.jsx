import LandingPage from "./pages/LandingPage/index";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Header from "./component/Header";
import Detail from "./pages/Detail/Index";
import Order from "./pages/Order/Index";
import Payment from "./pages/Payment/Payment";
import PublicRoute from "./utils/routes/PublicRoute";
import PrivateRoute from "./utils/routes/PrivateRoute";
import Counter from "./pages/counter";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/profile";
import MainProfile from "./pages/mainProfile";
import EditProfile from "./pages/editProfile";
import ChangePassword from "./pages/changePassword";
import MyBooking from "./pages/myBooking";
import MyWishlist from "./pages/mywishlist";
import ManageEvent from "./pages/manageEvent";
import Latihan from "./pages/latihan";
// import PrivateRoute from "./utils/routes/PrivateRoute";

function App() {
  // const navigate = useNavigate();

  return (
    <div>
      <Routes>
        {/* Auth */}
        <Route element={<PublicRoute />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Main */}
        {/* <Route path="/landing" element={}/> */}
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/latihan" element={<Latihan />} />
        <Route path="/" element={<Header />}>
          <Route index element={<LandingPage />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route element={<PrivateRoute />}>
            <Route path="/order" element={<Order />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/profile" element={<Profile />}>
              <Route index element={<MainProfile />} />
              <Route path="edit" element={<EditProfile />} />
              <Route path="changePassword" element={<ChangePassword />} />
              <Route path="myBooking" element={<MyBooking />} />
              <Route path="myWishlist" element={<MyWishlist />} />
              <Route element={<PrivateRoute isAdmin={true} />}>
                <Route path="manageEvent" element={<ManageEvent />} />
              </Route>
            </Route>
          </Route>
        </Route>

        <Route path="/*" element={<NotFound />} />
        <Route path="/counter" element={<Counter />} />
        {/* Not Found */}
      </Routes>
    </div>
  );
}

export default App;

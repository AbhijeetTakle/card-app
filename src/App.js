import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import BasketTab from "./components/baskettab/BasketTab";
import CardsBar from "./components/cards/CardsBar";
import CardPopup from "./components/cardpopup/CardPopup";
import AddCard from "./components/addcard/AddCard";
import EditCard from "./components/editcard/EditCard";
import EditBasket from "./components/editbasket/EditBasket";
import UpdateBasket from "./components/editbasket/UpdateBasket";
import History from "./components/history/History";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path={`/`}
            element={
              <div>
                <BasketTab />
                <Outlet />
              </div>
            }
          >
            <Route path="/basket/:basketName" element={<CardsBar />} />
          </Route>
          <Route path={`/card/:card`} element={<CardPopup />} />
          <Route path="/addcard" element={<AddCard />} />
          <Route path="/editcard/:cardId" element={<EditCard />} />
          <Route path="/editbaskets" element={<EditBasket />} />
          <Route path="/updateBasket/:basketId" element={<UpdateBasket />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import { Route, Routes,Switch } from "react-router-dom";
import Cart from "./components/Cart";
import Header from "./components/Header";
import Products from "./components/Products";

export const config={
  endpoint:'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json'
}
function App() {
  return (
    <div className="App">
     {/* <Header/> */}
     <Routes>
     <Route  path="/" element={<Products/>}/>
     <Route path="/cart" element={<Cart/>}/>
     </Routes>
    </div>
  );
}

export default App;

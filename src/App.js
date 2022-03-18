import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  const opemModalHandler = () => {
    setCartOpen(true);
  };
  const closeModalHandler = () => {
    setCartOpen(false);
  };

  return (
    <CartProvider>
      <Header onOpenModal={opemModalHandler} />
      <main>
        {cartOpen && <Cart onCloseModal={closeModalHandler} />}
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;

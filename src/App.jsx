import "./app.css";
import ProductList from "./_old/components/product/ProductList";
import Cart from "./_old/components/product/Cart";

const App = () => {
  return (
    <div className="app">
      <ProductList />
      <Cart />
    </div>
  );
};

export default App;

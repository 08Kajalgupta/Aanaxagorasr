import {BrowserRouter as Router, Route} from "react-router-dom";
import Product from "./Product";
import Login from "./Login";
import ProductDisplay from "./ProductDisplay";
function App(props) {
  return (
    <div>
      <Router>
      <Route
      strict
      exact
      component={Product}
      path="/product"
      history={props.history}
      />      
      <Route
      strict
      exact
      component={ProductDisplay}
      path="/productdisplay"
      history={props.history}
      />
      <Route
      strict
      exact
      component={Login}
      path="/login"
      history={props.history}
      />
      </Router>

    </div>
    
    
  );
}

export default App;

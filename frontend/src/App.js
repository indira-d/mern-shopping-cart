
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import Navbar from './components/Navbar/Navbar';
import BackDrop from './components/BackDrop/BackDrop';
import SideDrawer from './components/SideDrawer/SideDrawer';
import {useState} from 'react'


function App() {

  const [sideToggle, setSideToggle] = useState(false)
  return (
    <Router>
        <Navbar click={() => setSideToggle(true)}/>
        <SideDrawer show={sideToggle} click={() => setSideToggle(false)}/>
        <BackDrop show={sideToggle} click={() => setSideToggle(false)}/>
        
          <main>
            <Switch>
              <Route exact path='/' component={HomeScreen}/>
              <Route exact path='/product/:id' component={ProductScreen} />
              <Route exact path='/cart' component={CartScreen} />
            </Switch>
          </main>
    </Router>
  );
}

export default App;

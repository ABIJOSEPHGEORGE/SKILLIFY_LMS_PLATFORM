import './App.css';
import { BrowserRouter as Router} from 'react-router-dom';
import AnimatedRoutes from './components/Routes';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
        <Router>
           <AnimatedRoutes/>
       </Router>
   
    </Provider>
    
  );
}

export default App;



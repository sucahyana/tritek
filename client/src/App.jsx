import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './routes/index.jsx';
import index from './stores/store/index.js';
import {Provider} from "react-redux";

function App() {

    return (
        <Provider store={index}>
            <Router>
                <Routes/>
            </Router>
        </Provider>
    );
}

export default App;

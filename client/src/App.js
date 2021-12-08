import logo from './logo.svg';
import './App.css';
import CriminalActsMap from './components/CriminalActsMap';
const config = require("./utils/config");

function App() {
  return (
    <div className="App">
      <CriminalActsMap config={config}/>
    </div>
  );
}

export default App;

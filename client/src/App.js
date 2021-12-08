import CriminalActsMap from './components/CriminalActsMap'
import './App.css';
const config = require("./utils/config");

function App() {
  return (
    <div className="App">
      <CriminalActsMap config={config}/>
    </div>
  );
}

export default App;

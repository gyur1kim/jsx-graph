import './App.css';
import JXGBoard from 'jsxgraph-react-js';

import createCylinder from './utils/CreateCylinder';
import createCone from './utils/CreateConeFirstTry';

function App() {
  console.log(createCylinder);
  return (
    <div className="App">
      <JXGBoard
        logic={(brd) => createCylinder(brd, 3, 2)}
        boardAttributes={{ axis: true, boundingbox:[-5,10,5,-2], keepaspectratio: true}}
      />
      <JXGBoard
        logic={(brd) => createCone(brd, 5, 2)}
        boardAttributes={{ axis: true, boundingbox:[-5,10,5,-2], keepaspectratio: true}}
      />
    </div>
  );
}

export default App;

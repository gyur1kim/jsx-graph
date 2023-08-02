import './App.css';
import JXGBoard from 'jsxgraph-react-js';

import createCylinder from './utils/CreateCylinder';
import createCone from './utils/CreateCone';

function App() {
  return (
    <div className="App">
      <JXGBoard
        logic={(brd) => createCylinder(brd, 3, 2)}
        boardAttributes={{ 
          axis: false, 
          // axis: true, 
          boundingbox:[-5,10,5,-2],
          showCopyright: false, 
          showNavigation: false,
          keepaspectratio: true
        }}
      />
      <JXGBoard
        logic={(brd) => createCone(brd, 2, 3)}
        boardAttributes={{ 
          axis: false, 
          // axis: true, 
          boundingbox:[-5,10,5,-2],
          showCopyright: false, 
          showNavigation: false,
          keepaspectratio: true,
        }}
      />
    </div>
  );
}

export default App;

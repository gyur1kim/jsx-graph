import React, {useEffect} from 'react';
import JXG from 'jsxgraph';


function Board({boardName}) {
  
  useEffect(() => {
    var board = JXG.JSXGraph.initBoard(boardName, {
      boundingbox: [-10, 10, 10, -10],
      axis: true
    });

    // board.create('text',[ 2,2,  function(){return '$$X=\\frac{2}{x}$$'}], {
    //   fontSize: 15, color:'green', useMathJax: true});
  }, []);
  
  // var board = JXG.JSXGraph.initBoard(boardName, {
  //   boundingbox: [-10, 10, 10, -10],
  //   axis: true
  // });

  return (
    <div id={boardName} className="box" style={{width:"500px", height:"500px"}} />
  );
}

export default Board;
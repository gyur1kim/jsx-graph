import React, {useEffect} from 'react';
import JXG from 'jsxgraph';


function Board({boardName}) {
  
  useEffect(() => {
    var board = JXG.JSXGraph.initBoard(boardName, {
      boundingbox: [-10, 10, 10, -10],
      axis: true
    });

    board.create('text',[ 2,2,  function(){return '$$X=\\frac{2}{x}$$'}], {
      fontSize: 15, color:'green', useMathJax: true});

    board.create('text', [-4, -3, '$$ x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a} $$'], {
        fontSize: 24, parse: false, useMathJax: true });
    
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
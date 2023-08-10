import React, {useEffect} from 'react';
import JXG from 'jsxgraph';


function Board({boardId}) {
  
  useEffect(() => {
    JXG.Options.text.useMathJax = true;

    var board = JXG.JSXGraph.initBoard(boardId, {
      boundingbox: [-10, 10, 10, -10],
      axis: true
    });
    
    // 각각 다른 캔버스로 생성됐는지 확인하기..
    board.create('text', [-4, -3, boardId], {
        fontSize: 24, parse: false, useMathJax: true });
    
  }, []);
  
  return (
    <div id={boardId} className="box" style={{width:"300px", height:"300px"}} />
  );
}

export default Board;
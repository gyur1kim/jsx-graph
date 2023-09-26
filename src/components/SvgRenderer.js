import React, {useEffect, useState} from 'react';
import JXG from 'jsxgraph';

function SvgRenderer({boardId}) {
  let [text, setText] = useState("");
  let [isClicked, setIsClicked] = useState("0")

  useEffect(() => {
    JXG.Options.text.useMathJax = true;
    
    var board = JXG.JSXGraph.initBoard(boardId, {
      boundingbox: [-5, 5, 5, -5],
      axis: true,
      keepAspectRatio: true
    });

    board.options.label.autoPosition = true;
    board.options.point.size = 1;
    board.options.label.fixed = false;

    var A = board.create('point' , [-1.2,-2], {color:  'orange' , size: 4 });
    var B = board.create('point',  [0.25,-0.5], {color:  'orange' , size: 4 });
    var hexagon = board.create('regularpolygon', [A,B, 6]);

    setText(board.renderer.dumpToDataURI(false));
  }, [boardId, isClicked]);

  function svgToDataURI () {
    setIsClicked(prev => prev++);
  }

  return (
    <>
      <div id={boardId} class="jxgbox" style={{width:"500px", height:"200px"}} />
      <button onClick={svgToDataURI}>Save to DataURI</button>
      <textarea value={text}></textarea>
    </>
  );
}

export default SvgRenderer;
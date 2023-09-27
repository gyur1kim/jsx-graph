import React, {useEffect, useState} from 'react';
import {useScript} from "usehooks-ts"
import JXG from 'jsxgraph';

function SvgRenderer({boardId}) {
  let [text, setText] = useState("");
  let [output, setOutput] = useState("");
  // let outputRef = useRef();
  let board, board2;
  let doc;

  useScript(`https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js`, {
    removeOnUnmount: false,
  })

  useEffect(() => {
    JXG.Options.text.useMathJax = true;
    
    board = JXG.JSXGraph.initBoard(boardId, {
      boundingbox: [-5, 5, 5, -5],
      axis: true,
      keepAspectRatio: true
    });

    console.log(board);

    board2 = JXG.JSXGraph.initBoard(`${boardId}+2`, {
      boundingbox: [-5, 5, 5, -5],
      axis: true,
      keepAspectRatio: true
    });

    board.options.label.autoPosition = true;
    board.options.point.size = 1;
    board.options.label.fixed = false;

    var A = board.create('point' , [-1.2,-2], {color:  'orange' , size: 4, name: `\\(A\\)` });
    var B = board.create('point',  [0.25,-0.5], {color:  'orange' , size: 4, name: `\\(B\\)` });
    var hexagon = board.create('regularpolygon', [A,B, 6]);


  }, [boardId]);

  function svgToDataURI () {
    try {
      board && setText(board.renderer.dumpToDataURI(false))
    } catch(e) {
      setText(e)
    }
  }

  function decodeDataURI () {
    try {
      setOutput(decodeURIComponent(escape(atob(text.split(',')[1]))));
      doc = new DOMParser().parseFromString(output, "text/xml");
      console.log(doc);

      var timg = new Image(600, 450);
      let ctx = canvas.getContext('2d');
          
      timg.onload = function () {
        pos = board2.getMousePosition(e);
        ctx.clearRect(0, 0, 600, 450);
        ctx.drawImage(timg, 0, 0);
      };
      timg.src = text;
      var png = canvas.toDataURL();
      
    } catch(e) {
      setOutput(e)
    }
  }

  return (
    <>
      <div id={boardId} class="jxgbox" style={{width:"500px", height:"200px"}} />
      <button onClick={svgToDataURI}>Save to DataURI</button>
      <textarea value={text} onChange={(e) => setText(e.target.value)}></textarea>
      <br />
      <button onClick={decodeDataURI}>Decode DataURI</button>
      <textarea value={output}></textarea>
      <br />
      <div id={`${boardId}+2`} style={{width:"500px", height:"200px"}}/>
    </>
  );
}

export default SvgRenderer;
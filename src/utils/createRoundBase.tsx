// 가운데 값, 점 2개를 알려주면, 호를 return한다.
function CreateRoundBase(brd: any, scale:any, centerPoint:any, leftPoint:any, rightPoint: any) {

  const strokeWidth = 1;
  const color = "black";
  const lineAttrs = {
    highlight: false,
    strokeWidth: strokeWidth,
    strokeColor: color,
  }

  let solidArc = brd.create('arc', [centerPoint, leftPoint, rightPoint], {
    visible: false,
  })
  let solidArcScaled = brd.create('curve', [solidArc, scale], {
    ...lineAttrs
  })

  let dashArc = brd.create('arc', [centerPoint, rightPoint, leftPoint], {
    visible: false, 
  })
  let dashArcScaled = brd.create('curve', [dashArc, scale], {
    ...lineAttrs,
    dash: 2,
  })
  
}

export default CreateRoundBase
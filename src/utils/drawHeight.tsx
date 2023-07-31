function drawHeight (brd: any, height: number, upperPoint: any, bottomPoint: any) {
  let heightLine = brd.create('segment', [upperPoint, bottomPoint], {
    dash: 2,
    strokeLine: 2,
    strokeColor: "black",
    highlight: false,
    name: height,
    withLabel: true,
  })
}

export default drawHeight;
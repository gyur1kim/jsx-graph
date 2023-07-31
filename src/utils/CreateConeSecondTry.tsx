
const createCone = (brd: any, height: number, radius: number) => {

  const scaleRatio = 0.3;   // 기존의 원을 얼마나 찌그러트릴지 -> ellipse처럼 보이도록
  const strokeWidth = 1;    // 선분의 두께
  const color = "black";    // 선분의 색상

  // 도형을 변화시키는 element, 여기서는 y축을 축소시킴
  let transformScale = brd.create('transform', [1, scaleRatio], {type: "scale"});

  // 점들을 정의하자
  // 아랫면의 가운데, 왼쪽, 오른쪽
  let bottomPointCenter = brd.create('point', [0, 0], {
    visible: false
  })
  let bottomPointLeft = brd.create('point', [-radius, 0], {
    visible: false
  })
  let bottomPointRight = brd.create('point', [radius, 0], {
    visible: false
  })
  // 원뿔의 꼭지점
  let vertexPointCenter = brd.create('point', [0, height/scaleRatio], {
    // visible: false
  })

  // 1. 아랫면 그리기
  let bottomCircle = brd.create('circle', [bottomPointCenter, radius], {
    // visible: false
  });
  let bottomCircleScaled = brd.create('circle', [bottomCircle, transformScale], {
    // visible: false
    strokeColor: "black"
  })
  // 2. 생성된 원과 꼭지점의 극선? 구하기
  let polarLine = brd.create('polarline', [vertexPointCenter, bottomCircleScaled])

  // 3. 극선을 이용해 접점 구하기
  // let contactLeft = brd.create('intersection', [bottomCircle, polarLine, 1])
  // let contactRight = brd.create('intersection', [bottomCircle, polarLine, 0])
  // let contactLeftScaled = brd.create('point', [contactLeft, transformScale])
  // let contactRightScaled = brd.create('point', [contactRight, transformScale])
  // 4. 꼭지점과 각각 접점 구하기


  // 아랫면 => 보이는 부분은 실선, 보이지 않는 부분은 점선으로 표시
  let bottomCircleSolidArc = brd.create('arc', [bottomPointCenter, bottomPointLeft, bottomPointRight], {
    visible: false,
  })
  let bottomCircleSolidArcTransformed = brd.create('curve', [bottomCircleSolidArc, transformScale], {
    strokeWidth: strokeWidth,
    strokeColor: color,
    highlightStrokeColor: color,
  })
  let bottomCircleDashArc = brd.create('arc', [bottomPointCenter, bottomPointRight, bottomPointLeft], {
    visible: false, 
  })
  let bottomCircleDashArcTransformed = brd.create('curve', [bottomCircleDashArc, transformScale], {
    strokeWidth: strokeWidth, 
    strokeColor: color,
    highlightStrokeColor: color,
    dash: 2,
  })

  // 모선
  let leftGeneratrix = brd.create('segment', [vertexPointCenter, bottomPointLeft], {
    fixed: true,
    strokeWidth: strokeWidth, 
    strokeColor: color,
    hightlightStorkeWidth: strokeWidth,
    highlightStrokeColor: color,
  })
  let rightGeneratrix = brd.create('segment', [vertexPointCenter, bottomPointRight], {
    fixed: true,
    strokeWidth: strokeWidth, 
    strokeColor: color,
    hightlightStorkeWidth: strokeWidth,
    highlightStrokeColor: color,
  })
}

export default createCone
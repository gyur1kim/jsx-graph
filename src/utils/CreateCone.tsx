
const createCone = (brd: any, height: number, radius: number) => {

  const scaleRatio = 0.2;   // 기존의 원을 얼마나 찌그러트릴지 -> ellipse처럼 보이도록
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
  let vertexPointCenter = brd.create('point', [0, height], {
    visible: false
  })
  let vertexPointCenterScaled = brd.create('point', [0, height/scaleRatio], {
    visible: false
  })

  // 1. 아랫면 그리기
  let bottomCircle = brd.create('circle', [bottomPointCenter, radius], {
    visible: false
  });

  // 2. 생성된 아랫면의 polarLine 구하기
  let polarLine = brd.create('polarline', [vertexPointCenterScaled, bottomCircle], {
    visible: false
  })

  // 3. 접점의 위치 구하기
  let leftIntersectionPoint = brd.create('intersection', [bottomCircle, polarLine, 0], {
    visible: false
  })
  let rightIntersectionPoint = brd.create('intersection', [bottomCircle, polarLine, 1], {
    visible: false
  })

  // 4. 접점 위치 낮추기
  let leftIntersectionPointScaled = brd.create('point', [rightIntersectionPoint, transformScale], {
    visible: false
  })
  let rightIntersectionPointScaled = brd.create('point', [leftIntersectionPoint, transformScale], {
    visible: false
  })

  // 아랫면 => 보이는 부분은 실선, 보이지 않는 부분은 점선으로 표시
  let bottomCircleSolidArc = brd.create('arc', [bottomPointCenter, leftIntersectionPoint, rightIntersectionPoint], {
    visible: false,
  })
  let bottomCircleSolidArcTransformed = brd.create('curve', [bottomCircleSolidArc, transformScale], {
    strokeWidth: strokeWidth,
    strokeColor: color,
    highlightStrokeColor: color,
  })
  let bottomCircleDashArc = brd.create('arc', [bottomPointCenter, rightIntersectionPoint, leftIntersectionPoint], {
    visible: false, 
  })
  let bottomCircleDashArcTransformed = brd.create('curve', [bottomCircleDashArc, transformScale], {
    strokeWidth: strokeWidth, 
    strokeColor: color,
    highlightStrokeColor: color,
    dash: 2,
  })

  // 모선
  let leftGeneratrix = brd.create('segment', [vertexPointCenter, leftIntersectionPointScaled], {
    fixed: true,
    strokeWidth: strokeWidth, 
    strokeColor: color,
    hightlightStorkeWidth: strokeWidth,
    highlightStrokeColor: color,
  })
  let rightGeneratrix = brd.create('segment', [vertexPointCenter, rightIntersectionPointScaled], {
    fixed: true,
    strokeWidth: strokeWidth, 
    strokeColor: color,
    hightlightStorkeWidth: strokeWidth,
    highlightStrokeColor: color,
  })
}

export default createCone
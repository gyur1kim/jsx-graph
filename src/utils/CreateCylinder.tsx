const createCylinder = (brd: any, height: number, radius: number) => {
  brd.suspendUpdate();

  const scaleRatio = 0.3;   // 기존의 원을 얼마나 찌그러트릴지 -> ellipse처럼 보이도록
  const strokeWidth = 1;    // 선분의 두께
  const color = "black";    // 선분의 색상

  // 도형을 변화시키는 element, 여기서는 y축을 축소시킴
  let transformScale = brd.create('transform', [1, scaleRatio], {type: "scale"});

  // 아랫면 
  // let bottomCircle = brd.create('circle', [[0, 0], radius], {visible: false, frozen: true});
  // let bottomCircleScaled = brd.create('circle', [bottomCircle, transformScale], {visible: false, frozen: true})

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
  // 윗면의 가운데, 왼쪽, 오른쪽
  let upperPointCenter = brd.create('point', [0, height/scaleRatio], {
    visible: false
  })
  let upperPointLeft = brd.create('point', [-radius, height], {
    visible: false
  })
  let upperPointRight = brd.create('point', [radius, height], {
    visible: false
  })

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

  // 윗면
  let upperCircle = brd.create('circle', [upperPointCenter, radius], {
    visible: false, 
  });
  let upperCircleScaled = brd.create('circle', [upperCircle, transformScale], {
    fixed: true,
    strokeWidth: strokeWidth, 
    strokeColor: color,
    hightlightStorkeWidth: strokeWidth,
    highlightStrokeColor: color,
  })

  // 원기둥 양 옆 선
  let leftLine = brd.create('segment', [bottomPointLeft, upperPointLeft], {
    fixed: true,
    strokeWidth: strokeWidth, 
    strokeColor: color,
    hightlightStorkeWidth: strokeWidth,
    highlightStrokeColor: color,
  })
  let rightLine = brd.create('segment', [bottomPointRight, upperPointRight], {
    fixed: true,
    strokeWidth: strokeWidth, 
    strokeColor: color,
    hightlightStorkeWidth: strokeWidth,
    highlightStrokeColor: color,
  })

  brd.unsuspendUpdate();
}

export default createCylinder;
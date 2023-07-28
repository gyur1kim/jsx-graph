import React from 'react';
import JXGBoard from 'jsxgraph-react-js';

let createCylinder = (brd) => {
  let h = 7;
  let radius = 3;
  let scaleRatio = 0.3;

  brd.suspendUpdate();

  // 도형을 변화시키는 것
  let transformScale = brd.create('transform', [1, scaleRatio], {type: "scale"});

  // 아랫면 
  // let bottomCircle = brd.create('circle', [[0, 0], radius], {visible: false, frozen: true});
  // let bottomCircleScaled = brd.create('circle', [bottomCircle, transformScale], {visible: false, frozen: true})

  // 아랫면 => 보이는 부분은 실선, 보이지 않는 부분은 점선으로 표시
  let p1 = brd.create('point', [0, 0], {visible: false, frozen: true})
  let p2 = brd.create('point', [-radius, 0], {visible: false, frozen: true})
  let p3 = brd.create('point', [radius, 0], {visible: false, frozen: true})
  let bottomCircleSolidArc = brd.create('arc', [p1, p2, p3], {strokeWidth: 2, visible: false, frozen: true})
  let bottomCircleSolidArcTransformed = brd.create('curve', [bottomCircleSolidArc, transformScale], {strokeWidth: 2})
  let bottomCircleDashArc = brd.create('arc', [p1, p3, p2], {strokeWidth: 2, dash: 3, visible: false, frozen: true})
  let bottomCircleDashArcTransformed = brd.create('curve', [bottomCircleDashArc, transformScale], {strokeWidth: 2, dash: 3})

  // 윗면
  let upperCircle = brd.create('circle', [[0, h/scaleRatio], radius], {visible: false, frozen: true});
  let upperCircleScaled = brd.create('circle', [upperCircle, transformScale])

  // 원기둥 양 옆 선
  let leftLine = brd.create('segment', [[0-radius, 0], [0-radius, h]])
  let rightLine = brd.create('segment', [[0+radius, 0], [0+radius, h]])

  brd.unsuspendUpdate();
}

const Test = () => {
  return (
    <JXGBoard
      logic={createCylinder}
      // boardAttributes={{ axis: true, boundingbox: [-12, 10, 12, -10] }}
      boardAttributes={{ axis: true, boundingbox:[-5,10,5,-2], keepaspectratio: true }}
      // style={{
      //   border: "3px solid red"
      // }}
    />
  );
};

export default Test;
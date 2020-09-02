export const arrowTypes = [
  {
    title: '无箭头',
    value: '',
    contentLeft: (
      <svg style={{ width: '100%', height: '100%' }} xmlns='http://www.w3.org/2000/svg' version='1.1'>
        <g fill='none' stroke='black' strokeWidth='1'>
          <path d='M0 15 l55 0' />
        </g>
      </svg>
    ),
    contentRight: (
      <svg style={{ width: '100%', height: '100%' }} xmlns='http://www.w3.org/2000/svg' version='1.1'>
        <g fill='none' stroke='black' strokeWidth='1'>
          <path d='M0 15 l55 0' />
        </g>
      </svg>
    )
  },
  {
    title: '实心三角形',
    value: 'triangleSolid',
    contentLeft: (
      <svg style={{ width: '100%', height: '100%' }} xmlns='http://www.w3.org/2000/svg' version='1.1'>
        <g fill='none' stroke='black' strokeWidth='1'>
          <path d='M0 15 l55 0' />
          <polygon points='0,15 10,10 10,20' fill='#000000' />
        </g>
      </svg>
    ),
    contentRight: (
      <svg style={{ width: '100%', height: '100%' }} xmlns='http://www.w3.org/2000/svg' version='1.1'>
        <g fill='none' stroke='black' strokeWidth='1'>
          <path d='M0 15 l55 0' />
          <polygon points='55,15 45,10 45,20' fill='#000000' />
        </g>
      </svg>
    )
  },
  {
    title: '空心三角形',
    value: 'triangle',
    contentLeft: (
      <svg style={{ width: '100%', height: '100%' }} xmlns='http://www.w3.org/2000/svg' version='1.1'>
        <g fill='none' stroke='black' strokeWidth='1'>
          <path d='M0 15 l55 0' />
          <polygon points='0,15 10,10 10,20' fill='#ffffff' stroke='#000000' strokeWidth='1' />
        </g>
      </svg>
    ),
    contentRight: (
      <svg style={{ width: '100%', height: '100%' }} xmlns='http://www.w3.org/2000/svg' version='1.1'>
        <g fill='none' stroke='black' strokeWidth='1'>
          <path d='M0 15 l55 0' />
          <polygon points='55,15 45,10 45,20' fill='#ffffff' stroke='#000000' strokeWidth='1' />
        </g>
      </svg>
    )
  },
  {
    title: '实心菱形',
    value: 'diamondSolid',
    contentLeft: (
      <svg style={{ width: '100%', height: '100%' }} xmlns='http://www.w3.org/2000/svg' version='1.1'>
        <g fill='none' stroke='black' strokeWidth='1'>
          <path d='M0 15 l55 0' />
          <polygon points='0,15 10,10 20,15 10,20' fill='#000000' />
        </g>
      </svg>
    ),
    contentRight: (
      <svg style={{ width: '100%', height: '100%' }} xmlns='http://www.w3.org/2000/svg' version='1.1'>
        <g fill='none' stroke='black' strokeWidth='1'>
          <path d='M0 15 l55 0' />
          <polygon points='55,15 45,10 35,15 45,20' fill='#000000' />
        </g>
      </svg>
    )
  },
  {
    title: '空心菱形',
    value: 'diamond',
    contentLeft: (
      <svg style={{ width: '100%', height: '100%' }} xmlns='http://www.w3.org/2000/svg' version='1.1'>
        <g fill='none' stroke='black' strokeWidth='1'>
          <path d='M0 15 l55 0' />
          <polygon points='0,15 10,10 20,15 10,20' fill='#ffffff' stroke='#000000' strokeWidth='1' />
        </g>
      </svg>
    ),
    contentRight: (
      <svg style={{ width: '100%', height: '100%' }} xmlns='http://www.w3.org/2000/svg' version='1.1'>
        <g fill='none' stroke='black' strokeWidth='1'>
          <path d='M0 15 l55 0' />
          <polygon points='55,15 45,10 35,15 45,20' fill='#ffffff' stroke='#000000' strokeWidth='1' />
        </g>
      </svg>
    )
  },
  {
    title: '实心圆',
    value: 'circleSolid',
    contentLeft: (
      <svg style={{ width: '100%', height: '100%' }} xmlns='http://www.w3.org/2000/svg' version='1.1'>
        <g fill='none' stroke='black' strokeWidth='1'>
          <path d='M1 15 l55 0' />
          <circle cx='6' cy='15' r='5' fill='#000000' />
        </g>
      </svg>
    ),
    contentRight: (
      <svg style={{ width: '100%', height: '100%' }} xmlns='http://www.w3.org/2000/svg' version='1.1'>
        <g fill='none' stroke='black' strokeWidth='1'>
          <path d='M1 15 l55 0' />
          <circle cx='50' cy='15' r='5' fill='#000000' />
        </g>
      </svg>
    )
  },
  {
    title: '空心圆',
    value: 'circle',
    contentLeft: (
      <svg style={{ width: '100%', height: '100%' }} xmlns='http://www.w3.org/2000/svg' version='1.1'>
        <g fill='none' stroke='black' strokeWidth='1'>
          <path d='M1 15 l55 0' />
          <circle cx='6' cy='15' r='5' fill='#ffffff' stroke='#000000' strokeWidth='1' />
        </g>
      </svg>
    ),
    contentRight: (
      <svg style={{ width: '100%', height: '100%' }} xmlns='http://www.w3.org/2000/svg' version='1.1'>
        <g fill='none' stroke='black' strokeWidth='1'>
          <path d='M1 15 l55 0' />
          <circle cx='50' cy='15' r='5' fill='#ffffff' stroke='#000000' strokeWidth='1' />
        </g>
      </svg>
    )
  },
  {
    title: '线型箭头',
    value: 'line',
    contentLeft: (
      <svg style={{ width: '100%', height: '100%' }} xmlns='http://www.w3.org/2000/svg' version='1.1'>
        <g fill='none' stroke='black' strokeWidth='1'>
          <path d='M0 15 l55 0' />
          <path d='M0 15 l15 8' />
          <path d='M0 15 l15 -8' />
        </g>
      </svg>
    ),
    contentRight: (
      <svg style={{ width: '100%', height: '100%' }} xmlns='http://www.w3.org/2000/svg' version='1.1'>
        <g fill='none' stroke='black' strokeWidth='1'>
          <path d='M0 15 l55 0' />
          <path d='M55 15 l-15 8' />
          <path d='M55 15 l-15 -8' />
        </g>
      </svg>
    )
  },
  {
    title: '上单边线箭头',
    value: 'lineUp',
    contentLeft: (
      <svg style={{ width: '100%', height: '100%' }} xmlns='http://www.w3.org/2000/svg' version='1.1'>
        <g fill='none' stroke='black' strokeWidth='1'>
          <path d='M0 15 l55 0' />
          <path d='M0 15 l15 -8' />
        </g>
      </svg>
    ),
    contentRight: (
      <svg style={{ width: '100%', height: '100%' }} xmlns='http://www.w3.org/2000/svg' version='1.1'>
        <g fill='none' stroke='black' strokeWidth='1'>
          <path d='M0 15 l55 0' />
          <path d='M55 15 l-15 -8' />
        </g>
      </svg>
    )
  },
  {
    title: '下单边线箭头',
    value: 'lineDown',
    contentLeft: (
      <svg style={{ width: '100%', height: '100%' }} xmlns='http://www.w3.org/2000/svg' version='1.1'>
        <g fill='none' stroke='black' strokeWidth='1'>
          <path d='M0 15 l55 0' />
          <path d='M0 15 l15 8' />
        </g>
      </svg>
    ),
    contentRight: (
      <svg style={{ width: '100%', height: '100%' }} xmlns='http://www.w3.org/2000/svg' version='1.1'>
        <g fill='none' stroke='black' strokeWidth='1'>
          <path d='M0 15 l55 0' />
          <path d='M55 15 l-15 8' />
        </g>
      </svg>
    )
  }
]

export const lineTypes = [
  {
    title: '实线',
    value: 0,
    content: (
      <svg style={{ width: '100%', height: '100%' }} xmlns='http://www.w3.org/2000/svg' version='1.1'>
        <g fill='none' stroke='black' strokeWidth='1'>
          <path d='M0 15 l55 0' />
        </g>
      </svg>
    )
  },
  {
    title: '短虚线',
    value: 1,
    content: (
      <svg style={{ width: '100%', height: '100%' }} xmlns='http://www.w3.org/2000/svg' version='1.1'>
        <g fill='none' stroke='black' strokeWidth='1'>
          <path strokeDasharray='4,4' d='M0 15 l55 0' />
        </g>
      </svg>
    )
  },
  {
    title: '长虚线',
    value: 2,
    content: (
      <svg style={{ width: '100%', height: '100%' }} xmlns='http://www.w3.org/2000/svg' version='1.1'>
        <g fill='none' stroke='black' strokeWidth='1'>
          <path strokeDasharray='8,8' d='M0 15 l55 0' />
        </g>
      </svg>
    )
  },
  {
    title: '点虚线',
    value: 3,
    content: (
      <svg style={{ width: '100%', height: '100%' }} xmlns='http://www.w3.org/2000/svg' version='1.1'>
        <g fill='none' stroke='black' strokeWidth='1'>
          <path strokeDasharray='10,10,2,10' d='M0 15 l55 0' />
        </g>
      </svg>
    )
  }
]

export const curveTypes = [
  {
    title: '贝塞尔曲线',
    value: 'curve',
    content: (
      <svg style={{ width: '100%', height: '100%' }} xmlns='http://www.w3.org/2000/svg' version='1.1'>
        <g fill='none' stroke='black' strokeWidth='1'>
          <path d='M0 10 C 20 20, 40 20, 55 10' />
        </g>
      </svg>
    )
  },
  {
    title: '折线',
    value: 'polyline',
    content: (
      <svg style={{ width: '100%', height: '100%' }} xmlns='http://www.w3.org/2000/svg' version='1.1'>
        <g fill='none' stroke='black' strokeWidth='1'>
          <path d='M0 10 L29 10 L29 20 L55 20' />
        </g>
      </svg>
    )
  },
  {
    title: '直线',
    value: 'line',
    content: (
      <svg style={{ width: '100%', height: '100%' }} xmlns='http://www.w3.org/2000/svg' version='1.1'>
        <g fill='none' stroke='black' strokeWidth='1'>
          <path d='M0 15 l55 0' />
        </g>
      </svg>
    )
  }
  // {
  //   title: '脑图曲线',
  //   value: 'mind',
  //   content: (
  //     <svg style={{ width: '100%', height: '100%' }} xmlns='http://www.w3.org/2000/svg' version='1.1'>
  //       <g fill='none' stroke='black' strokeWidth='1'>
  //         <path d='M0 10 Q 20 20 155 10' />
  //       </g>
  //     </svg>
  //   )
  // }
]

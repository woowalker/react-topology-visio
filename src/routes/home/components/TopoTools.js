// 核心库
import React from 'react'
import { connect } from 'dva'
// 组件库
import { Collapse } from 'antd'
import { CodepenOutlined } from '@ant-design/icons'

const { Panel } = Collapse

function TopoTools (props) {
  const tools = [
    {
      group: '基本形状',
      children: [
        {
          name: 'rectangle',
          icon: 'rect',
          data: {
            text: 'Topology',
            rect: {
              width: 100,
              height: 100
            },
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            paddingBottom: 10,
            name: 'rectangle'
          }
        },
        {
          name: 'rectangle',
          icon: 'rectangle',
          data: {
            text: '圆角矩形',
            rect: {
              width: 200,
              height: 50
            },
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 0.1,
            name: 'rectangle'
          }
        },
        {
          name: 'circle',
          icon: 'circle',
          data: {
            text: '圆',
            rect: {
              width: 100,
              height: 100
            },
            name: 'circle',
            textMaxLine: 1
          }
        },
        {
          name: 'triangle',
          icon: 'triangle',
          data: {
            text: '三角形',
            rect: {
              width: 100,
              height: 100
            },
            name: 'triangle'
          }
        },
        {
          name: 'diamond',
          icon: 'diamond',
          data: {
            text: '菱形',
            rect: {
              width: 100,
              height: 100
            },
            name: 'diamond'
          }
        },
        {
          name: 'pentagon',
          icon: 'pentagon',
          data: {
            text: '五边形',
            rect: {
              width: 100,
              height: 100
            },
            name: 'pentagon'
          }
        },
        {
          name: 'hexagon',
          icon: 'hexagon',
          data: {
            text: '六边形',
            rect: {
              width: 100,
              height: 100
            },
            paddingTop: 10,
            paddingBottom: 10,
            name: 'hexagon'
          }
        },
        {
          name: 'pentagram',
          icon: 'pentagram',
          data: {
            text: '五角星',
            rect: {
              width: 100,
              height: 100
            },
            name: 'pentagram'
          }
        },
        {
          name: 'leftArrow',
          icon: 'arrow-left',
          data: {
            text: '左箭头',
            rect: {
              width: 200,
              height: 100
            },
            name: 'leftArrow'
          }
        },
        {
          name: 'rightArrow',
          icon: 'arrow-right',
          data: {
            text: '右箭头',
            rect: {
              width: 200,
              height: 100
            },
            name: 'rightArrow'
          }
        },
        {
          name: 'twowayArrow',
          icon: 'twoway-arrow',
          data: {
            text: '双向箭头',
            rect: {
              width: 200,
              height: 100
            },
            name: 'twowayArrow'
          }
        },
        {
          name: 'line',
          icon: 'line',
          data: {
            text: '直线',
            rect: {
              width: 100,
              height: 100
            },
            name: 'line'
          }
        },
        {
          name: 'cloud',
          icon: 'cloud',
          data: {
            text: '云',
            rect: {
              width: 100,
              height: 100
            },
            name: 'cloud'
          }
        },
        {
          name: 'message',
          icon: 'msg',
          data: {
            text: '消息框',
            rect: {
              width: 100,
              height: 100
            },
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            paddingBottom: 10,
            name: 'message'
          }
        },
        {
          name: 'file',
          icon: 'file',
          data: {
            text: '文档',
            rect: {
              width: 80,
              height: 100
            },
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            paddingBottom: 10,
            name: 'file'
          }
        },
        {
          name: 'text',
          icon: 'text',
          data: {
            text: 'topology visio',
            rect: {
              width: 160,
              height: 30
            },
            name: 'text'
          }
        },
        {
          name: 'image',
          icon: 'image',
          data: {
            text: '',
            rect: {
              width: 100,
              height: 100
            },
            name: 'image',
            image: require('../../../assets/images/placeholder.png')
          }
        },
        {
          name: 'cube',
          icon: 'cube',
          data: {
            rect: {
              width: 50,
              height: 70
            },
            is3D: true,
            z: 10,
            zRotate: 15,
            fillStyle: '#ddd',
            name: 'cube',
            icon: '\ue63c',
            iconFamily: 'topology',
            iconColor: '#777',
            iconSize: 30
          }
        },
        {
          name: 'people',
          icon: 'people',
          data: {
            rect: {
              width: 70,
              height: 100
            },
            name: 'people'
          }
        },
        {
          name: '视频/网页',
          icon: 'pc',
          data: {
            text: '视频/网页',
            rect: {
              width: 200,
              height: 200
            },
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            paddingBottom: 10,
            // strokeStyle: 'transparent',
            name: 'div'
          }
        }
      ]
    },
    {
      group: '流程图',
      children: [
        {
          name: '开始/结束',
          icon: 'flow-start',
          data: {
            text: '开始',
            rect: {
              width: 120,
              height: 40
            },
            borderRadius: 0.5,
            name: 'rectangle'
          }
        },
        {
          name: '流程',
          icon: 'rectangle',
          data: {
            text: '流程',
            rect: {
              width: 120,
              height: 40
            },
            name: 'rectangle'
          }
        },
        {
          name: '判定',
          icon: 'diamond',
          data: {
            text: '判定',
            rect: {
              width: 120,
              height: 60
            },
            name: 'diamond'
          }
        },
        {
          name: '数据',
          icon: 'flow-data',
          data: {
            text: '数据',
            rect: {
              width: 120,
              height: 50
            },
            name: 'flowData'
          }
        },
        {
          name: '准备',
          icon: 'flow-ready',
          data: {
            text: '准备',
            rect: {
              width: 120,
              height: 50
            },
            name: 'hexagon'
          }
        },
        {
          name: '子流程',
          icon: 'flow-subprocess',
          data: {
            text: '子流程',
            rect: {
              width: 120,
              height: 50
            },
            name: 'flowSubprocess'
          }
        },
        {
          name: '数据库',
          icon: 'db',
          data: {
            text: '数据库',
            rect: {
              width: 80,
              height: 120
            },
            name: 'flowDb'
          }
        },
        {
          name: '文档',
          icon: 'flow-document',
          data: {
            text: '文档',
            rect: {
              width: 120,
              height: 100
            },
            name: 'flowDocument'
          }
        },
        {
          name: '内部存储',
          icon: 'internal-storage',
          data: {
            text: '内部存储',
            rect: {
              width: 120,
              height: 80
            },
            name: 'flowInternalStorage'
          }
        },
        {
          name: '外部存储',
          icon: 'extern-storage',
          data: {
            text: '外部存储',
            rect: {
              width: 120,
              height: 80
            },
            name: 'flowExternStorage'
          }
        },
        {
          name: '队列',
          icon: 'flow-queue',
          data: {
            text: '队列',
            rect: {
              width: 100,
              height: 100
            },
            name: 'flowQueue'
          }
        },
        {
          name: '手动输入',
          icon: 'flow-manually',
          data: {
            text: '手动输入',
            rect: {
              width: 120,
              height: 80
            },
            name: 'flowManually'
          }
        },
        {
          name: '展示',
          icon: 'flow-display',
          data: {
            text: '展示',
            rect: {
              width: 120,
              height: 80
            },
            name: 'flowDisplay'
          }
        },
        {
          name: '并行模式',
          icon: 'flow-parallel',
          data: {
            text: '并行模式',
            rect: {
              width: 120,
              height: 50
            },
            name: 'flowParallel'
          }
        },
        {
          name: '注释',
          icon: 'flow-comment',
          data: {
            text: '注释',
            rect: {
              width: 100,
              height: 100
            },
            name: 'flowComment'
          }
        }
      ]
    },
    {
      group: '活动图',
      children: [
        {
          name: '开始',
          icon: 'inital',
          data: {
            text: '',
            rect: {
              width: 30,
              height: 30
            },
            name: 'circle',
            fillStyle: '#555',
            strokeStyle: 'transparent'
          }
        },
        {
          name: '结束',
          icon: 'final',
          data: {
            text: '',
            rect: {
              width: 30,
              height: 30
            },
            name: 'activityFinal'
          }
        },
        {
          name: '活动',
          icon: 'action',
          data: {
            text: '活动',
            rect: {
              width: 120,
              height: 50
            },
            borderRadius: 0.25,
            name: 'rectangle'
          }
        },
        {
          name: '决策/合并',
          icon: 'diamond',
          data: {
            text: '决策',
            rect: {
              width: 120,
              height: 50
            },
            name: 'diamond'
          }
        },
        {
          name: '垂直泳道',
          icon: 'swimlane-v',
          data: {
            text: '垂直泳道',
            rect: {
              width: 200,
              height: 500
            },
            name: 'swimlaneV'
          }
        },
        {
          name: '水平泳道',
          icon: 'swimlane-h',
          data: {
            text: '水平泳道',
            rect: {
              width: 500,
              height: 200
            },
            name: 'swimlaneH'
          }
        },
        {
          name: '垂直分岔/汇合',
          icon: 'fork-v',
          data: {
            text: '',
            rect: {
              width: 10,
              height: 150
            },
            name: 'forkV',
            fillStyle: '#555',
            strokeStyle: 'transparent'
          }
        },
        {
          name: '水平分岔/汇合',
          icon: 'fork',
          data: {
            text: '',
            rect: {
              width: 150,
              height: 10
            },
            name: 'forkH',
            fillStyle: '#555',
            strokeStyle: 'transparent'
          }
        }
      ]
    },
    {
      group: '时序图和类图',
      children: [
        {
          name: '生命线',
          icon: 'lifeline',
          data: {
            text: '生命线',
            rect: {
              width: 150,
              height: 400
            },
            name: 'lifeline'
          }
        },
        {
          name: '激活',
          icon: 'focus',
          data: {
            text: '',
            rect: {
              width: 12,
              height: 200
            },
            name: 'sequenceFocus'
          }
        },
        {
          name: '简单类',
          icon: 'simple-class',
          data: {
            text: 'Topolgoy',
            rect: {
              width: 270,
              height: 200
            },
            paddingTop: 40,
            font: {
              fontFamily: 'Arial',
              color: '#222',
              fontWeight: 'bold'
            },
            fillStyle: '#ffffba',
            strokeStyle: '#7e1212',
            name: 'simpleClass',
            children: [
              {
                text: '- name: string\n+ setName(name: string): void',
                name: 'text',
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 10,
                paddingBottom: 10,
                rectInParent: {
                  x: 0,
                  y: 0,
                  width: '100%',
                  height: '100%',
                  rotate: 0
                },
                font: {
                  fontFamily: 'Arial',
                  color: '#222',
                  textAlign: 'left',
                  textBaseline: 'top'
                }
              }
            ]
          }
        },
        {
          name: '类',
          icon: 'class',
          data: {
            text: 'Topolgoy',
            rect: {
              width: 270,
              height: 200
            },
            paddingTop: 40,
            font: {
              fontFamily: 'Arial',
              color: '#222',
              fontWeight: 'bold'
            },
            fillStyle: '#ffffba',
            strokeStyle: '#7e1212',
            name: 'interfaceClass',
            children: [
              {
                text: '- name: string',
                name: 'text',
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 10,
                paddingBottom: 10,
                rectInParent: {
                  x: 0,
                  y: 0,
                  width: '100%',
                  height: '50%',
                  rotate: 0
                },
                font: {
                  fontFamily: 'Arial',
                  color: '#222',
                  textAlign: 'left',
                  textBaseline: 'top'
                }
              },
              {
                text: '+ setName(name: string): void',
                name: 'text',
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 10,
                paddingBottom: 10,
                rectInParent: {
                  x: 0,
                  y: '50%',
                  width: '100%',
                  height: '50%',
                  rotate: 0
                },
                font: {
                  fontFamily: 'Arial',
                  color: '#222',
                  textAlign: 'left',
                  textBaseline: 'top'
                }
              }
            ]
          }
        }
      ]
    }
  ]

  const renderCollapseHeader = (title) => {
    const iconStyle = {
      fontSize: '16px',
      marginRight: '4px'
    }
    return (
      <div className='routes-home__tool-sider--collapse-header'>
        <CodepenOutlined style={iconStyle} />
        <span>{title}</span>
      </div>
    )
  }

  const onDrag = (event, node) => {
    event.dataTransfer.setData('Text', JSON.stringify(node.data))
  }

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['topoToolsGroup-0']}
      expandIconPosition='right'
      className='routes-home__tool-sider--collapse'
    >
      {
        tools.map((tool, index) => {
          const { children } = tool
          return (
            <Panel
              key={`topoToolsGroup-${index}`}
              header={renderCollapseHeader(tool.group)}
            >
              {
                children.map((btn, i) => {
                  return (
                    <a
                      key={`topoTool-${i}`}
                      title={btn.name}
                      draggable
                      onDragStart={(evt) => { onDrag(evt, btn) }}
                      className='routes-home__tool-sider--collapse-shape'
                    >
                      <i className={`opt-icon opt-icon-${btn.icon}`} />
                    </a>
                  )
                })
              }
            </Panel>
          )
        })
      }
    </Collapse>
  )
}

export default connect(({ common, home, loading }) => ({ common, home, loading }))(TopoTools)

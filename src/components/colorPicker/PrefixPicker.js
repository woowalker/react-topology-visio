// 核心库
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
// 组件库
import { Popover } from 'antd'
import { SketchPicker } from 'react-color'
// 样式
import './prefixPicker.less'

function PrefixPicker (props) {
  const { initColor = '#dadada', onChange } = props
  const [color, setColor] = useState(initColor)

  const handlePickerChange = (val, evt) => {
    setColor(val.hex)
    onChange instanceof Function && onChange(val, evt)
  }

  useEffect(() => {
    setColor(initColor)
  }, [initColor])

  return (
    <Popover
      content={
        <SketchPicker
          color={color}
          onChange={handlePickerChange}
          className='prefix-picker__sketchPicker'
        />
      }
      trigger='click'
      overlayClassName='prefix-picker__popover'
    >
      <div style={{ backgroundColor: color }} className='prefix-picker__datePickBtn' />
    </Popover>
  )
}

PrefixPicker.propTypes = {
  initColor: PropTypes.string,
  onChange: PropTypes.func
}

export default PrefixPicker

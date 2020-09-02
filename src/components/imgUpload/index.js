// 核心库
import React, { useState } from 'react'
// 组件库
import { Popover, Upload, Input, Spin, message, Row, Col, Button } from 'antd'
import { PlusSquareOutlined } from '@ant-design/icons'
// 样式
import './index.less'

const { Search } = Input
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function ImgUpload (props) {
  const [state, setState] = useState({
    loading: false,
    visible: false,
    webUrl: '',
    localUrl: ''
  })
  const [inputKey, setInputKey] = useState(new Date().getTime())

  /**
   * 本地上传状态添加 loading 状态
   * @param {*} info
   */
  const handleUploadChange = (info) => {
    const { status } = info.file
    setState({
      ...state,
      loading: status === 'uploading'
    })
  }

  /**
   * 本地上传之前的校验
   * @param {*} file
   */
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('只能上传.jpg或.png的图片文件')
      return false
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('文件大小超过2MB')
      return false
    }
    getBase64(file, (localUrl) => {
      setState({
        ...state,
        loading: false,
        webUrl: '',
        localUrl
      })
      // 直接用 key 重置输入框状态
      setInputKey(new Date().getTime())
    })
    return false
  }

  /**
   * Popover 的显隐事件处理
   * @param {*} visible
   */
  const handleVisibleChange = (visible) => {
    if (visible) {
      // 重置 webUrl 和 localUrl
      setState({
        ...state,
        visible,
        webUrl: '',
        localUrl: ''
      })
      // 直接用 key 重置输入框状态
      setInputKey(new Date().getTime())
      return
    }
    setState({
      ...state,
      visible
    })
  }

  /**
   * 获取网络图片
   * @param {*} value
   */
  const handleImageSearch = (value) => {
    if (value && value !== state.webUrl) {
      setState({
        ...state,
        loading: true,
        webUrl: value
      })
    }
  }

  /**
   * 网络图片加载完成
   */
  const handleImgLoaded = () => {
    setState({
      ...state,
      loading: false,
      localUrl: ''
    })
  }

  /**
   * 网络图片加载失败
   */
  const handleImgLoadError = () => {
    message.error('网络图片加载失败，请检查地址')
    setState({
      ...state,
      loading: false,
      webUrl: ''
    })
  }

  /**
   * 保存设置的图片
   */
  const setImageUrl = () => {
    const imageUrl = webUrl || localUrl
    setState({
      ...state,
      visible: false
    })
    props.success instanceof Function && props.success(imageUrl)
  }

  const { loading, visible, webUrl, localUrl } = state
  const { preset } = props
  return (
    <Popover
      content={
        <div style={{ width: 280 }}>
          <Row>
            <Col span='6'>在线图片：</Col>
            <Col span='18'>
              <Search
                key={inputKey}
                allowClear
                loading={loading}
                onSearch={handleImageSearch}
                enterButton='确定'
                placeholder='请输入在线图片的地址'
              />
            </Col>
          </Row>
          <Row className='mg-t10'>
            <Col span='6'>上传图片：</Col>
            <Col span='18'>
              <Upload
                name='imgUpload'
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleUploadChange}
              >
                <Spin delay={300} spinning={loading}>
                  <PlusSquareOutlined className='img-upload__uploadBtn' />
                </Spin>
              </Upload>
            </Col>
          </Row>
          <div className='mg-t10 img-upload__preview-content'>
            {
              webUrl ? (
                <img
                  src={webUrl}
                  alt=''
                  onLoad={handleImgLoaded}
                  onError={handleImgLoadError}
                  className='mg-r5 img-upload__preview-image'
                />
              ) : null
            }
            {
              localUrl ? (
                <img
                  src={localUrl}
                  alt=''
                  className='mg-r5 img-upload__preview-image'
                />
              ) : null
            }
            <Button
              type='primary'
              size='small'
              disabled={!(webUrl || localUrl)}
              onClick={setImageUrl}
            >保存
            </Button>
          </div>
        </div>
      }
      trigger='click'
      visible={visible}
      onVisibleChange={handleVisibleChange}
    >
      {
        preset ? (
          <img
            src={preset}
            alt=''
            className='img-upload__preview-image'
          />
        ) : <PlusSquareOutlined className='img-upload__uploadBtn' />
      }
    </Popover>
  )
}

export default ImgUpload

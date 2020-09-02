# react项目通用模板

## **一、项目组成**

### **1、脚手架：dva**

* dva-loading：插件，自动处理loading状态

```javascript
// 注意：只是标识接口是否请求完成，请求中的值被置为 true 而已，所以还需要自己根据这个状态处理 loading 状态
// 详见参考：https://www.jianshu.com/p/fd41c3383978
// 当引入 dva-loading 插件之后，reducers 中的 state 新增了 loading 对象，loading 对象中有三个变量，effects、global、models
{
  effects: { 'common/getOrgList': false }, // 当请求 common/getOrgList action 时，此值会被置为 true，请求完成重置为 false
  global: false, // 当有接口请求时，此值会被置为 true，请求完成重置为 false
  models: { common: false } // common model 中有接口请求时，此值会被置为 true，请求完成重置为 false
}
// 取该 loading 值也很简单，在 connect 的组件中，取 props.loading 即可
```

### **2、UI框架：antd**

配合babel-plugin-import进行按需加载，配置：

```javascript
["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }]
```

style 为true，代表可导入 less

### **3、图表框架：echarts-for-react**

echarts的react封装，需要同时引入 echarts 和 echarts-for-react，项目中采用按需引入的方式，  
参考：<https://github.com/hustcc/echarts-for-react>

```javascript
import React from 'react';
// import the core library.
import ReactEchartsCore from 'echarts-for-react/lib/core';
// then import echarts modules those you have used manually.
import echarts from 'echarts/lib/echarts';

// import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';

// The usage of ReactEchartsCore are same with above.
<ReactEchartsCore
  echarts={echarts}
  option={this.getOption()}
  notMerge={true}
  lazyUpdate={true}
  theme={"theme_name"}
  onChartReady={this.onChartReadyCallback}
  onEvents={EventsDict}
  opts={} />
```

### **4、react-router版本：4.X**

dva 带的 react-router的版本为 4.X 版本

## **二、自定义插件解析，入口 src/plugins**

### **1、const.js**

常量封装成 consts 组件，引用在 common model 中，取 $consts 使用

### **2、api.js**

http请求使用 axios 库，封装成 api.js，引用在 common model 中，取 $api 使用；  
拦截器设置在 plugins/axios （包括请求与返回的拦截，比如：返回错误拦截），错误信息的显示统一在拦截器中设置

### **3、history.js**

导入该 js 文件，则可以在 component 组件外使用该插件导航

## **三、约定**

* 1、使用 eslint 作为编码规范
* 2、echarts组件使用按需加载，详见二次封装的组件
* 3、dva model 根据页面按需加载，index.js 首次只加载必须的 model，比如通用 model common 以及全局共享 model

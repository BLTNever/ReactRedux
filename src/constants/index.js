export const isDebug = process.env.NODE_ENV == 'development'

//{"hostOrigin":"chrome-extension://app.dingtalk.com","containerId":1493186367247,"hostVersion":"3.5.0-Beta.59","language":"zh_CN","version":"3.5.0-Beta.59","hasRedDot":false}
export const webViewConfig = JSON.parse(window.name.indexOf('containerId') != -1 ? window.name : '{}')

export const inDingTalkPCwebview = window.parent != window && window.name

export const enableLifeCycleLog = false
export const enableActionLog = false
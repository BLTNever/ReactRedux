
import { inDingTalkPCwebview} from '../constants'
import { message, Modal } from 'antd'
const { DingTalkPC } = window
export { default as request } from './api'

/**
 * webview与ant，双端toast
 */
export const toast = ({ type, text, duration, delay, onSuccess, onError } = {}) => {
    const options = { type: 'success', duration: 2, delay: 0, onSuccess: () => { } }
    if (type != undefined) Object.assign(options, { type })
    if (duration != undefined) Object.assign(options, { duration })
    if (delay != undefined) Object.assign(options, { delay })
    if (onSuccess != undefined) Object.assign(options, { onSuccess })
    Object.assign(options, { text, onError })
    if (inDingTalkPCwebview) {
        DingTalkPC.device.notification.toast(options)
    } else {
        if (/information|confirm|alert/.test(options.type)) {
            options.type = 'info'
        }
        message[options.type](options.text, options.duration, options.onSuccess)
    }
}
/**
 * webview与ant，双端confirm
 */
export function confirm({ content, title, buttonLabels, delay, onSuccess, onFail } = {}) {
    if (inDingTalkPCwebview) {
        DingTalkPC.device.notification.confirm({ message: content, title, buttonLabels, delay, onSuccess, onFail })
    } else {
        Modal.confirm({
            title,
            content,
            okText: buttonLabels[0],
            cancelText: buttonLabels[1],
            onOk: () => { onSuccess({ buttonIndex: 0 }) },
            onCancel: () => { onSuccess({ buttonIndex: 1 }) }
        })
    }
}


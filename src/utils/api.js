import axios from 'axios';
// const header = {
//     headers: {
//         'Content-Type': 'application/json',
//     },
// };

const cnRequest = axios.create({
    baseURL: window.__env.url.CN_URL,
});

//  http://192.168.9.228:8080//Connesia/api/notify/message/beenUsed/errorCode
//  http://192.168.9.228:8080//Connesia/api/notify/message


// CN API
export const apiDevicesAll = () => cnRequest.get('/api/devices/all');

export const apiGetNotifyMessageByTypeIdERR = () => cnRequest.get('/api/notify/message/typeId/ERR');
export const apiGetNotifyMessageByTypeIdRUL = () => cnRequest.get('/api/notify/message/typeId/RUL');
export const apiGetNotifyMessageByTypeIdMA = () => cnRequest.get('/api/notify/message/typeId/MA');


export const apiInsertNotifyMessage = (newNotify) => cnRequest.post('/api/notify/message', newNotify);
export const apiUpdateNotifyMessage = (newNotify) => cnRequest.put('/api/notify/message', newNotify);
export const apiDeleteNotifyMessageBatch = notifyMsgId => cnRequest.delete('/api/notify/message/batch/', notifyMsgId);

// toolbarAction.deleteMsgList.push(notifyMsgId);

export const apiGetNotifyMessageIdUsedByERR = () => cnRequest.get('/api/notify/message/beenUsed/errorCode');
export const apiGetNotifyMessageIdUsedByRUL = () => cnRequest.get('/api/notify/message/beenUsed/rule');
export const apiGetNotifyMessageIdUsedByMA = () => cnRequest.get('/api/notify/message/beenUsed/maint');

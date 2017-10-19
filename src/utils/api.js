import $ from 'jquery'

export default ({ body, endpoint, fetchOptions : { headers, cache, method } } = {}) => {
    if (!endpoint) {
        throw new Error(`需要设置请求endpoint`);
    }
    method = (method || 'GET').toUpperCase()
    return new Promise(async (resolve, reject) => {
        $.ajax({
            type : method,
            url : endpoint,
            data : method == 'POST' ? JSON.stringify(body) : body,
            contentType: "application/json; charset=utf-8", 
            cache : cache || false,
            dataType : 'json',
            success : ({success, data, ...args} = {}) => {
                if(success){
                    resolve(data)
                }else{
                    reject({ success, ...args })
                }
            },
            error : (xhr, status, statusText)=>{
                reject({ success : false, message : statusText })
            }
        })
    });
}

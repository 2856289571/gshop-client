/* 
    让用户获取唯一的标识
    1、先从localStorage中获取,如果没有
    2、再调用uuid创建新的，并且储存到localStorage
*/
import {v4 as uuidv4} from 'uuid';

let TOKEN_KEY = 'TOKEN_KEY'

function getUserTempId(){
    let userTempId = localStorage.getItem('USERTEMPID_KEY')

    if(!userTempId){
        let userTempId = uuidv4();
        localStorage.setItem('USERTEMPID_KEY',userTempId)
    }

    return userTempId
}

function setToken(token){
    localStorage.setItem(TOKEN_KEY,token)
}
function getToken(){
    return localStorage.getItem(TOKEN_KEY)
}
function removeToken(){
    localStorage.removeItem(TOKEN_KEY)
}

export {
    getUserTempId,
    setToken,
    getToken,
    removeToken
}
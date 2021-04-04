// export const createAndDownloadFile = function(fileName, content) {
//     var aTag = document.createElement('a');
//     // var blob = new Blob([content]);
//     aTag.download = fileName;
//     aTag.href = URL.createObjectURL(content);
//     aTag.click();
//     URL.revokeObjectURL(content);
// };
import axios from "axios";

export const createAndDownloadFile = function(fileName, downUrl) {
    axios({
        method: 'get',
        url: downUrl,
        responseType: 'blob',
        headers: { 'content-type': 'audio/mpeg' }
        // headers: {'content-length': '4066786', 'content-type': 'audio/mpeg'}
    }).then((res) => {
        // eslint-disable-next-line no-unused-vars
        let blobType = 'application/force-download' // 设置blob请求头
            // eslint-disable-next-line no-unused-vars
        let blob = new Blob([res.data], { type: res.data.type }) // 创建blob 设置blob文件类型 data 设置为后端返回的文件(例如mp3,jpeg) type:这里设置后端返回的类型 为 mp3
        let downa = document.createElement('a') // 创建A标签
            // eslint-disable-next-line no-unused-vars
        let href = window.URL.createObjectURL(blob) // 创建下载的链接
        downa.href = href // 下载地址
        downa.download = fileName // 下载文件名
        document.body.appendChild(downa)
        downa.click() // 模拟点击A标签
        document.body.removeChild(downa) // 下载完成移除元素
        window.URL.revokeObjectURL(href) // 释放blob对象
    }).catch(function(error) {
        console.log(error)
    })
}
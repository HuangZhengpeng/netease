import axios from "axios";
import qs from 'qs';

function ajax(url, data = {}, method = "GET", query = true) {
    var url = '/API' + url;
    if (method.toUpperCase() == "GET") {
        if (!data) {
            return axios.get(url)
        } else if (query) {
            // let datastring="?"
            // Object.keys(data).forEach(key=>{
            //     datastring+=key+"="+data[key]+"&"
            // })
            // datastring=datastring.slice(0,datastring.length-1);
            // console.log(datastring);
            return axios({
                method,
                url: url + "?" + qs.stringify(data),
            })
        } else {
            return axios({
                method,
                url,
                params: data,
            })
        }
    } else {
        //post有待验证，也许需要qs转化成字符串?
        return axios({
            method: "POST",
            url,
            params: data,
        })
    }
}

export const reqBundleList = () => ajax("/personalized", { limit: 6 })
export const reqNewSong = () => ajax("/personalized/newsong", { limit: 20 })
export const reqList = (id) => ajax("/playlist/detail", { id })
export const reqHotList = () => ajax("/playlist/detail", { id: 3778678 })
export const reqSearch = (keywords) => ajax("/search", { keywords })
export const reqHotWords = () => ajax("/search/hot")
export const reqUrl = (id) => ajax("/song/url", { id })
export const reqLrc = (id) => ajax("/lyric", { id })
export const reqDetail = (ids) => ajax("/song/detail", { ids }) //ids=id1,id2,id3
export const reqListDetail = id => ajax("/playlist/detail", { id })
export const reqMultimatch = () => ajax("/search/multimatch", { keywords })
export const reqSuggest = () => ajax("/search/suggest", { keywords })
export const reqUserDetail = (uid) => ajax("/user/detail", { uid })
export const reqHotComments = ({ id, type, limit, offset, before }) => ajax("/comment/hot", { id, type, limit, offset, before }) //0歌曲,2列表
export const reqListComments = ({ id, limit, offset, before }) => ajax("/comment/playlist", { id, limit, offset, before })
export const reqSimiList = (id) => ajax("/simi/playlist", { id })
export const reqSimiSong = (id) => ajax("/simi/song", { id })
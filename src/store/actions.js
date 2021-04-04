import {
    SETMUSICURL,
    SETLRC,
    PLAY,
    PAUSE,
    SETSONG,
    CLEARSONG,
    SETBUNDLE,
    SETSIMILIST,
    SETSIMISONG,
    SETHOTCOMMENTS,
} from "./mutations-types";
import {
    reqUrl,
    reqLrc,
    reqDetail,
    reqSimiList,
    reqSimiSong,
    reqHotComments
} from "../api/ajax";
import { lrccompile } from "../modules/lrcCompiler"

export default {
    init_song({ dispatch }, id) {
        dispatch("setSong", id)
        dispatch("setMusicUrl", id)
        dispatch("setLrc", id)
        dispatch("setSimiList", id)
        dispatch("setSimiSong", id)
        dispatch("setHotComments", id)

    },
    setSong({ commit }, id) {
        reqDetail(id).then((response) => {
            commit(SETSONG, { song: response.data.songs[0] })
            document.title = response.data.songs[0].name
        })
    },
    setSimiList({ commit }, id) {
        reqSimiList(id).then((response) => {
            commit(SETSIMILIST, { simiList: response.data.playlists })
        });
    },
    setSimiSong({ commit }, id) {
        reqSimiSong(id).then(response => {
            commit(SETSIMISONG, { simiSong: response.data.songs })
        });
    },
    setHotComments({ commit }, id) {
        reqHotComments({ id, type: 0 }).then(response => {
            commit(SETHOTCOMMENTS, { hotComments: response.data.hotComments })
        });
    },
    setMusicUrl({ commit }, id) {
        reqUrl(id).then((response) => {
            let musicUrl = response.data.data[0].url;
            commit(SETMUSICURL, { musicUrl })
        })

    },
    setLrc({ commit }, id) {
        reqLrc(id).then(response => {
            let lrc = "";
            if (response.data.lrc) {
                lrc = response.data.lrc.lyric;
            }
            let lyrics = lrccompile(lrc)
            commit(SETLRC, { lyrics })

        })

    },
    play({ commit }) {
        commit(PLAY)
    },
    pause({ commit }) {
        commit(PAUSE)
    },
    clearSong({ commit }) {
        commit(CLEARSONG)
    },
    setBundle({ commit }, bundle) {
        commit(SETBUNDLE, { bundle })
    }

}
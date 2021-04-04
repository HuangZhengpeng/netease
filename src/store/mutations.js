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
// import lrccompile from "../modules/lrcCompiler";

export default {
    [PLAY](state) {
        state.audioElement.play()
    },
    [PAUSE](state) {
        state.audioElement.pause()
    },
    [CLEARSONG](state) {
        state.song = {};
        state.audioElement.src = "";
        state.lyrics = [];
    },

    [SETSONG](state, { song }) {
        state.song = song;
    },
    [SETMUSICURL](state, { musicUrl }) {
        state.audioElement.src = musicUrl;
        state.audioElement.autoplay = true
    },
    [SETLRC](state, { lyrics }) {
        state.lyrics = lyrics
    },
    [SETBUNDLE](state, { bundle }) {
        state.bundle = bundle
    },
    [SETSIMILIST](state, { simiList }) {
        state.simiList = simiList
    },
    [SETSIMISONG](state, { simiSong }) {
        state.simiSong = simiSong;
    },
    [SETHOTCOMMENTS](state, { hotComments }) {
        state.hotComments = hotComments;
    },
}
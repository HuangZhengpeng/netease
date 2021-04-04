export const lrccompile = function(rawLrc) {
    //时间以秒计算
    function tosecond(timeText) {
        let separatedTime = timeText.split(":");
        return Number(separatedTime[0]) * 60 + Number(separatedTime[1]);
    }
    //格式化歌词
    let lyrics = [];
    let lines = rawLrc.split("[");
    lines.shift()
    lines.forEach(line => {
        let tt = line.split("]")
        if (tt[1].trim().length > 0) { //去掉空内容行
            lyrics.push({
                time: tosecond(tt[0].trim()),
                text: tt[1].trim()
            })
        }

    });
    return lyrics
};

export const lrchighlight = function(audioElement, callback, lyrics) {
    //关联歌曲和歌词
    var nthLyric = 0;
    var lylen = lyrics.length;
    if (lylen > 0) {
        audioElement.ontimeupdate = function() {
            if (nthLyric < lylen) {
                if (this.currentTime >= lyrics[nthLyric].time) {
                    callback(nthLyric)
                    nthLyric++
                }
            }
        }
    }

    function jump(n) {
        nthLyric = n
    }
    return jump

}
//这个文件是计算灯布和立体字的综合雪载荷

/**
 * @param{number} Sk //雪压值，按照各个地区不同进行填写
 * @param{number} lightBoxAcceptSnowArea //灯箱迎雪面积
 * @returns{number} Fs_lightBoxSnowLoad //灯箱雪荷载
 */

const miu = 1;
function lightBoxSnowLoad(Sk, lightBoxAcceptSnowArea) {
    //计算灯箱雪荷载
    let Fs_lightBoxSnowLoad = Sk * lightBoxAcceptSnowArea * miu * 1000;
    return Fs_lightBoxSnowLoad;
}

module.exports = lightBoxSnowLoad;
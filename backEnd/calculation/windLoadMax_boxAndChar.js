//这个文件是立体字和灯布的最大的风载荷

/**
 * @param{number} lightBoxAcceptSnowArea
 * @returns {number} Fs_lightBoxMaxWindLoad //灯箱雪荷载
 */

const pa = 1.225;
const Cd = 1; //风阻系数
const windSpeed = 41.4; //13级风的风速
function lightBoxMaxWindLoad(lightBoxAcceptWindArea) {
    let Fw_lightBoxMaxWindLoad = 0.5 * pa * Cd * lightBoxAcceptWindArea * windSpeed ** 2; //风荷载
    return Fw_lightBoxMaxWindLoad; //返回灯箱最大风荷载
}

module.exports = lightBoxMaxWindLoad;
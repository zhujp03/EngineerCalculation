//这个文件是用来计算灯箱的《户外广告规范》风载荷

/**
 * @param {number} W0_baseWindPressure //基本风压W0
 * @param {number} phi //一个参数φ
 * @param {number} lightBoxAcceptWindArea //灯箱迎风面积
 * @returns {number} Fw_lightBox_windLoad //户外灯箱风荷载
 */

function lightBoxWindLoad(W0_baseWindPressure, phi, lightBoxAcceptWindArea) {
    //计算户外灯箱风荷载
    return W0_baseWindPressure * phi * lightBoxAcceptWindArea * 1000;
}

module.exports = lightBoxWindLoad;
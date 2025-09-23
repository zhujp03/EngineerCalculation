//这个文件是     立体字《户外广告规范》风载荷


/**
 * @param {number} W0_baseWindPressure //基本风压W0
 * @param {number} phi //一个参数φ
 * @param {number} charAcceptWindArea //立体字迎风面积
 * @returns {number} Fw_char_windLoad //户外立体字风荷载
 */

function charWindLoad(W0_baseWindPressure, phi, charAcceptWindArea) {
    //计算户外立体字风荷载
    return W0_baseWindPressure * phi * charAcceptWindArea * 1000;
}

module.exports = charWindLoad;
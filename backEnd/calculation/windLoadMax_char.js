//这个文件是计算立体字最大风载荷

/**
 * @param {number} charAcceptWindArea //立体字迎风面积
 * @returns {number} Fw_char_windLoad_max //立体字最大风荷载
 */

//const W0_baseWindPressure = 0.5; //基本风压W0
const pa = 1.225; //空气密度
const Cd = 1; //风阻系数
const windSpeed = 41.4; //13级风的风速

function charMaxWindLoad(charAcceptWindArea){
    let Fw = 0.5 * pa * Cd * charAcceptWindArea * windSpeed** 2; //风荷载
    return Fw; //返回立体字最大风荷载
}

module.exports = charMaxWindLoad;
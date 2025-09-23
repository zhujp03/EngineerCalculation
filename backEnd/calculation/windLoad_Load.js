//这个文件是   《荷载规范》风载荷

/**
 * @param {number} windVibrationCoefficient //风振系数
 * @param {number} windPressureHeightCoefficient //风压高度变化系数
 * @param {number} W0_baseWindPressure //基本风压W0
 * @param {number} acceptWindArea //结构迎风面积
 * @param {number} miuS //风载载体型系数
 * @returns {{Wk: number, Fw: number}} windLoad
 */

//const miuS = 1.3;
//const accpetWindArea = 36;

function windLoad(windVibrationCoefficient, windPressureHeightCoefficient,W0_baseWindPressure, acceptWindArea, miuS) {
    let Wk = windVibrationCoefficient * windPressureHeightCoefficient * miuS * W0_baseWindPressure;
    let Fw = Wk * acceptWindArea * 1000; //风荷载
    return {
        Fw: Fw  //风荷载
    };
}
module.exports = windLoad;
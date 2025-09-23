//这个文件是计算13级风下的灯箱和立体字的灯箱载荷

/**
 * @param {number} lightBoxWeight //灯箱重量
 * @param {number} charWeight //立体字重量
 * @param {number} snowLoad //雪载荷
 * @param {number} MaxWindLoad //最大风载荷
 * @param {number} BoxLength //灯箱长度
 * @param {number} BoxHeight //灯箱高度
 * @param {number} safetyFactor //安全系数
 * @returns{{horizontalPull: number, verticalPull: number}}
 */

//const safetyFactor = 2; // 安全系数

function M_BoxAndChar(lightBoxWeight, charWeight, snowLoad, MaxWindLoad, BoxLength, BoxHeight, safetyFactor) {
    let totalLoad = MaxWindLoad + snowLoad + lightBoxWeight * 9.81 + charWeight * 9.81; // 总载荷
    let designedTotalLoad = totalLoad * safetyFactor; // 设计总载荷
    let horizontalPull = totalLoad / BoxLength; // 水平拉伸强度
    let verticalPull = totalLoad / BoxHeight; // 垂直拉伸强度
    return {
        horizontalPull: horizontalPull, // 水平拉伸强度
        verticalPull: verticalPull, // 垂直拉伸强度
    };
}

module.exports = M_BoxAndChar;
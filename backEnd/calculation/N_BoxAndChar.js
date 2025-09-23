//这个文件是灯箱布和立体字的日常平均风压

/**
 * @param{number} lightBoxWeight //灯箱布重量
 * @param{number} charWeight //立体字重量
 * @param{number} snowLoad //雪载荷
 * @param{number} windLoad //风载荷
 * @param{number} lightBoxLength //灯箱长度
 * @param{number} lightBoxHeight //灯箱高度
 * @param {number} safetyFactor //安全系数
 * @returns{{horizontalPull: number, verticalPull: number}}
 */

//const safetyFactor = 2; // 安全系数

function N_BoxAndChar(lightBoxWeight, charWeight, snowLoad, windLoad, lightBoxLength, lightBoxHeight, safetyFactor) {
    let selfWeight = lightBoxWeight * 9.81 + charWeight * 9.81; // 灯箱布和立体字的自重
    let totalLoad = windLoad + snowLoad + selfWeight; // 总载荷
    let designedTotalLoad = totalLoad * safetyFactor; // 设计总载荷
    let horizontalPull = totalLoad / lightBoxLength;
    let verticalPull = totalLoad / lightBoxHeight;
    return{
        horizontalPull: horizontalPull, // 水平拉伸强度
        verticalPull: verticalPull, // 垂直拉伸强度
    };
}

module.exports = N_BoxAndChar;
//灯箱载荷立体字日常平均风压

/**
 * @param {number} charWeight //立体字重量
 * @param {number} charSnowLoad //立体字雪荷载
 * @param {number} charWindLoad //立体字风荷载
 * @param {number} screwNumber //螺栓数量
 * @param {number} screwGap //螺栓间距
 * @param {number} safetyFactor //安全系数
 * @returns {{horizontalPull: number, verticalPull: number, horizontalBreak: number, verticalBreak: number, screwSufferingWeight: number}} //拉伸强度（长），拉伸强度（高）
 */

//const safetyFactor = 2; // 安全系数
function charPull(charWeight, charSnowLoad, charWindLoad, screwNumber, screwGap, safetyFactor) {
    let selfWeight = charWeight * 9.81;
    let totalLoad = charWindLoad + charSnowLoad + selfWeight; // 总载荷
    let screwSufferingWeight = totalLoad / screwNumber; //螺丝承受载荷
    let horizontalBreak = screwSufferingWeight * safetyFactor; // 水平拉伸强度
    let verticalBreak = horizontalBreak;
    let horizontalPull = totalLoad / screwGap; // 水平拉伸强度（长）
    let verticalPull = totalLoad / screwGap; // 水平拉伸强度（高）
    let designedTotalLoad = totalLoad * safetyFactor; // 设计总载荷
    return{
        horizontalPull: horizontalPull,
        verticalPull: verticalPull,
        horizontalBreak: horizontalBreak,
        verticalBreak: verticalBreak,
        designedTotalLoad: designedTotalLoad,
        screwSufferingWeight: screwSufferingWeight
    }
}

module.exports = charPull;
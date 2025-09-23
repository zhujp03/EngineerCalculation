//这个是13级风情况下的立体字

/**
 * @param {number} charWeight //立体字重量
 * @param {number} charSnowLoad //立体字雪荷载
 * @param {number} charMaxWindLoad //立体字最大风荷载
 * @param {number} screwNumber //螺栓数量
 * @param {number} screwGap //螺栓间距
 * @param{number} safetyFactor //安全系数
 * @returns {{horizontalPull: number, verticalPull: number, horizontalBreak: number, verticalBreak: number, screwSufferingWeight: number}} //拉伸强度（长），拉伸强度（高）
 */

//const safetyFactor = 2; // 安全系数

function M_char(charWeight, charSnowLoad, charMaxWindLoad, screwNumber, screwGap, safetyFactor) {
    let totalLoad = charMaxWindLoad + charSnowLoad + charWeight * 9.81; // 总载荷
    let designedTotalLoad = totalLoad * safetyFactor; // 设计总载荷
    let screwSufferingWeight = totalLoad / screwNumber; //螺丝承受载荷
    let horizontalBreak = screwSufferingWeight * safetyFactor; // 水平拉伸强度
    let verticalBreak = horizontalBreak;
    let horizontalPull = totalLoad / screwGap; // 水平拉伸强度（长）
    let verticalPull = totalLoad / screwGap; // 水平拉伸强度（高）
    return{
        horizontalPull: horizontalPull,
        verticalPull: verticalPull,
        horizontalBreak: horizontalBreak,
        verticalBreak: verticalBreak,
        screwSufferingWeight: screwSufferingWeight

    };
}

module.exports = M_char;
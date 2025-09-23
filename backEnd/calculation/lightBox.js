//这个文件是灯箱面积计算

/**
 * @param {number} length
 * @param {number} width
 * @param {number} unitWeight //灯箱布克重
 * @param {number} gap //固定点间距
 * @returns {{area: number , weight: number}} lightBoxWeight
 */

function lightBoxSurfaceArea(length, width, unitWeight, gap){
    //计算面积
    const area = length * width;
    //计算灯箱布重量
    const weight = area * unitWeight;
    return {area, weight};
}
module.exports = lightBoxSurfaceArea;

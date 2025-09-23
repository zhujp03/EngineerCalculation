//立体字雪载荷

/**
 * @param {number} Sk //雪压值，按照各个地区不同进行填写
 * @param {number} charAcceptSnowArea //立体字迎雪面积
 * @returns{number} Fs_charSnowLoad //立体字雪荷载
 */

const miu = 1;

function charSnowLoad(Sk, charAcceptSnowArea) {
    //计算立体字雪荷载
    let Fs_charSnowLoad = Sk * charAcceptSnowArea * miu * 1000;
    return Fs_charSnowLoad;
}

module.exports = charSnowLoad;
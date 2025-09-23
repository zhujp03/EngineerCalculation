// const express = require('express');
// const cors = require('cors');
// const sqlite3 = require('sqlite3').verbose();
// const path = require('path');
// const session = require('express-session');
// // 引入计算模块
// const BoxWindLoadOutdoor = require('./backEnd/calculation/BoxWindLoad_outdoor');
// const CharWindLoadOutdoor = require('./backEnd/calculation/CharWindLoad_outdoor');
// const lightBox = require('./backEnd/calculation/lightBox');
// const M_BoxAndChar = require('./backEnd/calculation/M_BoxAndChar');
// const M_char = require('./backEnd/calculation/M_char');
// const N_BoxAndChar = require('./backEnd/calculation/N_BoxAndChar');
// const N_char = require('./backEnd/calculation/N_char');
// const SnowLoad_BoxAndChar = require('./backEnd/calculation/snowLoad_boxAndChar');
// const SnowLoad_char = require('./backEnd/calculation/snowLoad_char');
// const WindLoad_Load = require('./backEnd/calculation/windLoad_Load');
// const WindLoadMax_BoxAndChar = require('./backEnd/calculation/windLoadMax_boxAndChar');
// const WindLoadMax_char = require('./backEnd/calculation/windLoadMax_char');
//
// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'frontEnd')));
// // 会话管理
// app.use(session({
//     secret: 'your_secret_key',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }
// }));
// // 缓存前端输入
// let savedInput = null;
// // 创建数据库连接
// const adminDb = new sqlite3.Database('./dataBase/Admin.db');
// const userDb = new sqlite3.Database('./dataBase/userList.db');
// const materialDb = new sqlite3.Database('./dataBase/material.db');
//
// // 创建数据库表（如果不存在）- 使用 TEXT 类型
// adminDb.run(`
//     CREATE TABLE IF NOT EXISTS Admin (
//         userName TEXT PRIMARY KEY NOT NULL,
//         passWord TEXT NOT NULL
//     )
// `);
// userDb.run(`
//     CREATE TABLE IF NOT EXISTS User (
//         userName TEXT PRIMARY KEY NOT NULL,
//         passWord TEXT NOT NULL,
//         Category TEXT NOT NULL
//     )
// `);
// // 添加默认管理员（如果不存在）- 使用明文密码
// adminDb.get("SELECT * FROM Admin WHERE userName = 'admin'", (err, row) => {
//     if (err) {
//         console.error('检查默认管理员时出错:', err);
//         return;
//     }
//     if (!row) {
//         adminDb.run(
//             "INSERT INTO Admin (userName, passWord) VALUES (?, ?)",
//             ['admin', 'admin123'],
//             (err) => {
//                 if (err) {
//                     console.error('创建默认管理员失败:', err);
//                 } else {
//                     console.log('默认管理员账号已创建: admin/admin123');
//                 }
//             }
//         );
//     }
// });
//
//
//
// // 用户注册 - 使用明文密码
// app.post('/api/user/register', (req, res) => {
//     const { username, password, role } = req.body;
//     if (!username || !password || !role) {
//         return res.status(400).json({
//             success: false,
//             message: '请提供用户名、密码和用户类型'
//         });
//     }
//     // 检查用户名是否已存在
//     userDb.get("SELECT * FROM User WHERE userName = ?", [username], (err, row) => {
//         if (err) {
//             console.error('用户注册查询错误:', err);
//             return res.status(500).json({
//                 success: false,
//                 message: '数据库错误'
//             });
//         }
//         if (row) {
//             return res.status(400).json({
//                 success: false,
//                 message: '用户名已存在'
//             });
//         }
//         // 直接存储明文密码
//         userDb.run(
//             "INSERT INTO User (userName, passWord, Category) VALUES (?, ?, ?)",
//             [username, password, role],
//             function(err) {
//                 if (err) {
//                     console.error('用户注册插入错误:', err);
//                     return res.status(500).json({
//                         success: false,
//                         message: '创建用户失败'
//                     });
//                 }
//                 res.json({
//                     success: true,
//                     message: '用户注册成功'
//                 });
//             }
//         );
//     });
// });
// //用户登录 - 使用明文密码验证
// app.post('/api/user/login', (req, res) => {
//     const { username, password } = req.body;
//     if (!username || !password) {
//         return res.status(400).json({
//             success: false,
//             message: '请提供用户名和密码'
//         });
//     }
//     // 查找用户
//     userDb.get("SELECT * FROM User WHERE userName = ?", [username], (err, row) => {
//         if (err) {
//             console.error('用户登录查询错误:', err);
//             return res.status(500).json({
//                 success: false,
//                 message: '数据库错误'
//             });
//         }
//         if (!row) {
//             return res.status(401).json({
//                 success: false,
//                 message: '用户名或密码错误'
//             });
//         }
//         // 直接比较明文密码
//         if (password === row.passWord) {
//             req.session.user = {
//                 username: row.userName,
//                 role: row.Category
//             };
//             res.json({
//                 success: true,
//                 message: '登录成功',
//                 user: {
//                     username: row.userName,
//                     role: row.Category
//                 }
//             });
//         } else {
//             res.status(401).json({
//                 success: false,
//                 message: '用户名或密码错误'
//             });
//         }
//     });
// });
//
// // 管理员登录 - 使用明文密码验证
// app.post('/api/admin/login', (req, res) => {
//     const { username, password } = req.body;
//     if (!username || !password) {
//         return res.status(400).json({
//             success: false,
//             message: '请提供管理员账号和密码'
//         });
//     }
//     // 查找管理员
//     adminDb.get("SELECT * FROM Admin WHERE userName = ?", [username], (err, row) => {
//         if (err) {
//             console.error('管理员登录查询错误:', err);
//             return res.status(500).json({
//                 success: false,
//                 message: '数据库错误'
//             });
//         }
//         if (!row) {
//             return res.status(401).json({
//                 success: false,
//                 message: '管理员账号或密码错误'
//             });
//         }
//         // 直接比较明文密码
//         if (password === row.passWord) {
//             req.session.admin = {
//                 username: row.userName
//             };
//             res.json({
//                 success: true,
//                 message: '管理员登录成功',
//                 admin: {
//                     username: row.userName
//                 }
//             });
//         } else {
//             res.status(401).json({
//                 success: false,
//                 message: '管理员账号或密码错误'
//             });
//         }
//     });
// });
// // 添加管理员 - 使用明文密码
// app.post('/api/admin/add', (req, res) => {
//     const { username, password } = req.body;
//     if (!username || !password) {
//         return res.status(400).json({
//             success: false,
//             message: '请提供管理员账号和密码'
//         });
//     }
//     // 检查管理员是否已存在
//     adminDb.get("SELECT * FROM Admin WHERE userName = ?", [username], (err, row) => {
//         if (err) {
//             console.error('添加管理员查询错误:', err);
//             return res.status(500).json({
//                 success: false,
//                 message: '数据库错误'
//             });
//         }
//         if (row) {
//             return res.status(400).json({
//                 success: false,
//                 message: '管理员账号已存在'
//             });
//         }
//         // 直接存储明文密码
//         adminDb.run(
//             "INSERT INTO Admin (userName, passWord) VALUES (?, ?)",
//             [username, password],
//             function(err) {
//                 if (err) {
//                     console.error('添加管理员插入错误:', err);
//                     return res.status(500).json({
//                         success: false,
//                         message: '创建管理员失败'
//                     });
//                 }
//                 res.json({
//                     success: true,
//                     message: '管理员添加成功'
//                 });
//             }
//         );
//     });
// });
//
//
//
// // 路由设置
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontEnd', 'login.html'));
// });
// app.get('/index', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontEnd', 'index.html'));
// });
// // 保存输入数据
// app.post('/api/save-input', (req, res) => {
//     savedInput = req.body;
//     console.log('🔹 /api/save-input received:', savedInput);
//     res.json({ ok: true, message: '输入已保存' });
// });
// // 数据库连接
// const db = new sqlite3.Database('./dataBase/windVibration.db', sqlite3.OPEN_READONLY);
// const db2012 = new sqlite3.Database('./dataBase/GB2012.db', sqlite3.OPEN_READONLY);
// const Wk = new sqlite3.Database('./dataBase/Wk.db', sqlite3.OPEN_READONLY);
//
// // 数据库查询函数
// function getVibrationValue(h, c) {
//     return new Promise((resolve, reject) => {
//         db.get(
//             `SELECT value FROM surface_roughness WHERE height_m = ? AND roughness_class = ?`,
//             [h, c],
//             (err, row) => {
//                 if (err) return reject(err);
//                 if (!row) return reject(new Error('风振未找到对应记录'));
//                 resolve(row.value);
//             }
//         );
//     });
// }
//
// function getWindPressureHeightCoefficient(h, c) {
//     return new Promise((resolve, reject) => {
//         db2012.get(
//             `SELECT value FROM surface_roughness WHERE height_m = ? AND roughness_class = ?`,
//             [h, c],
//             (err, row) => {
//                 if (err) return reject(err);
//                 if (!row) return reject(new Error('风压高度系数未找到对应记录'));
//                 resolve(row.value);
//             }
//         );
//     });
// }
//
// function getWk(h, c) {
//     return new Promise((resolve, reject) => {
//         Wk.get(
//             `SELECT value FROM surface_roughness WHERE height_m = ? AND roughness_class = ?`,
//             [h, c],
//             (err, row) => {
//                 if (err) return reject(err);
//                 if (!row) return reject(new Error('Wk未找到对应记录'));
//                 resolve(row.value);
//             }
//         );
//     });
// }
// async function compareWithMaterialProperties(calculatedValues) {
//     const materialSuggestions = {};
//     const materialPassCount = { PII: 0, PIII: 0, FS1: 0 };
//     const totalComparisons = 12; // 总共12个比较项
//
//     // 定义需要对比的属性及其对应的数据库项目
//     const propertiesToCompare = [
//         {
//             key: 'N_char.horizontalPull',
//             project: '拉伸强度',
//             direction: '经向',
//             value: calculatedValues.N_char.horizontalPull
//         },
//         {
//             key: 'N_char.horizontalBreak',
//             project: '撕裂强度',
//             direction: '经向',
//             value: calculatedValues.N_char.horizontalBreak
//         },
//         {
//             key: 'N_char.verticalPull',
//             project: '拉伸强度',
//             direction: '纬向',
//             value: calculatedValues.N_char.verticalPull
//         },
//         {
//             key: 'N_char.verticalBreak',
//             project: '撕裂强度',
//             direction: '纬向',
//             value: calculatedValues.N_char.verticalBreak
//         },
//         {
//             key: 'M_char.horizontalPull',
//             project: '拉伸强度',
//             direction: '经向',
//             value: calculatedValues.M_char.horizontalPull
//         },
//         {
//             key: 'M_char.horizontalBreak',
//             project: '撕裂强度',
//             direction: '经向',
//             value: calculatedValues.M_char.horizontalBreak
//         },
//         {
//             key: 'M_char.verticalPull',
//             project: '拉伸强度',
//             direction: '纬向',
//             value: calculatedValues.M_char.verticalPull
//         },
//         {
//             key: 'M_char.verticalBreak',
//             project: '撕裂强度',
//             direction: '纬向',
//             value: calculatedValues.M_char.verticalBreak
//         },
//         {
//             key: 'N_BoxAndChar.horizontalPull',
//             project: '拉伸强度',
//             direction: '经向',
//             value: calculatedValues.N_BoxAndChar.horizontalPull
//         },
//         {
//             key: 'N_BoxAndChar.verticalPull',
//             project: '拉伸强度',
//             direction: '纬向',
//             value: calculatedValues.N_BoxAndChar.verticalPull
//         },
//         {
//             key: 'M_BoxAndChar.horizontalPull',
//             project: '拉伸强度',
//             direction: '经向',
//             value: calculatedValues.M_BoxAndChar.horizontalPull
//         },
//         {
//             key: 'M_BoxAndChar.verticalPull',
//             project: '拉伸强度',
//             direction: '纬向',
//             value: calculatedValues.M_BoxAndChar.verticalPull
//         }
//     ];
//     // 查询数据库并对比结果
//     for (const prop of propertiesToCompare) {
//         try {
//             const row = await new Promise((resolve, reject) => {
//                 materialDb.get(
//                     `SELECT PII, PIII, FS1
//                      FROM fabric_properties
//                      WHERE project = ? AND direction = ?`,
//                     [prop.project, prop.direction],
//                     (err, row) => {
//                         if (err) reject(err);
//                         else resolve(row);
//                     }
//                 );
//             });
//             if (row) {
//                 const suggestions = [];
//
//                 // 检查计算值是否小于数据库中的值
//                 if (prop.value <= row.PII) {
//                     suggestions.push('PII');
//                     materialPassCount.PII++;
//                 }
//                 if (prop.value <= row.PIII) {
//                     suggestions.push('PIII');
//                     materialPassCount.PIII++;
//                 }
//                 if (prop.value <= row.FS1) {
//                     suggestions.push('FS1');
//                     materialPassCount.FS1++;
//                 }
//
//                 if (suggestions.length > 0) {
//                     materialSuggestions[prop.key] = {
//                         project: prop.project,
//                         direction: prop.direction,
//                         calculatedValue: prop.value,
//                         suggestions: suggestions
//                     };
//                 }
//             }
//         } catch (error) {
//             console.error(`材料对比查询错误 (${prop.key}):`, error);
//         }
//     }
//
//     // 找出在所有比较项中都满足要求的材料
//     const overallSuggestions = [];
//     if (materialPassCount.PII === totalComparisons) overallSuggestions.push('PII');
//     if (materialPassCount.PIII === totalComparisons) overallSuggestions.push('PIII');
//     if (materialPassCount.FS1 === totalComparisons) overallSuggestions.push('FS1');
//
//     return {
//         detailedSuggestions: materialSuggestions,
//         overallSuggestions: overallSuggestions,
//         passCount: materialPassCount,
//         totalComparisons: totalComparisons
//     };
// }
//
//
// // 计算并返回结果
// app.post('/api/calculate', async (req, res) => {
//     try {
//         if (!savedInput) {
//             return res.status(400).json({ error: '请先提供输入数据' });
//         }
//
//         const p = savedInput;
//         console.log('—— 开始计算 ——');
//         console.log('输入参数:', p);
//
//         // 1. 查库：风振系数
//         const windVibrationCoefficient = await getVibrationValue(p.hangingHeight, p.roughnessClass);
//         console.log('风振系数:', windVibrationCoefficient);
//
//         // 2. 查库：风压高度系数
//         const windPressureHeightCoefficient = await getWindPressureHeightCoefficient(p.hangingHeight, p.roughnessClass);
//         console.log('风压高度系数:', windPressureHeightCoefficient);
//
//         // 3. 查库：φ 系数
//         const phi = await getWk(p.hangingHeight, p.roughnessClass);
//         console.log('φ 系数:', phi);
//
//         // 4. 计算灯箱面积 & 重量
//         const lightInfo = lightBox(p.lightBoxLength, p.lightBoxHeight, p.lightBoxUnitWeight, p.BoxNumHanging);
//         const Box_acceptWindArea = lightInfo.area;
//         const Box_weight = lightInfo.weight;
//         console.log('灯箱受风面积:', Box_acceptWindArea);
//         console.log('灯箱布重量:', Box_weight);
//
//         // 5. 计算通用风载荷
//         const windLoad = WindLoad_Load(
//             windVibrationCoefficient,
//             windPressureHeightCoefficient,
//             p.baseWindPressure,
//             Box_acceptWindArea,
//             p.miuS
//         );
//         console.log('通用风载荷:', windLoad);
//
//         // 6. 立体字日常风荷载
//         const char_windLoad = CharWindLoadOutdoor(p.baseWindPressure, phi, p.charAcceptWindArea);
//         console.log('立体字日常风荷载:', char_windLoad);
//
//         // 7. 灯箱+立体字日常风荷载
//         const BoxAndChar_windLoad = BoxWindLoadOutdoor(p.baseWindPressure, phi, Box_acceptWindArea);
//         console.log('灯箱+立体字日常风荷载:', BoxAndChar_windLoad);
//
//         // 8. 雪载荷
//         const char_snowLoad = SnowLoad_char(p.snowPressure, p.charAcceptWindArea);
//         const BoxAndChar_snowLoad = SnowLoad_BoxAndChar(p.snowPressure, Box_acceptWindArea);
//         console.log('立体字雪载荷:', char_snowLoad);
//         console.log('灯箱+立体字雪载荷:', BoxAndChar_snowLoad);
//
//         // 9. 最大风载荷
//         const charMaxWindLoad = WindLoadMax_char(p.charAcceptWindArea);
//         const BoxAndCharMaxWindLoad = WindLoadMax_BoxAndChar(Box_acceptWindArea);
//         console.log('立体字最大风载荷:', charMaxWindLoad);
//         console.log('灯箱+立体字最大风载荷:', BoxAndCharMaxWindLoad);
//
//         // 10. 拉伸/撕裂强度计算
//         const N_char_result = N_char(
//             p.charWeight,
//             char_snowLoad,
//             char_windLoad,
//             p.screwNumber,
//             p.screwGap,
//             p.safetyFactor
//         );
//         console.log('N_char 结果:', N_char_result);
//
//         const N_BoxAndChar_result = N_BoxAndChar(
//             Box_weight,
//             p.charWeight,
//             BoxAndChar_snowLoad,
//             BoxAndChar_windLoad,
//             p.lightBoxLength,
//             p.lightBoxHeight,
//             p.safetyFactor
//         );
//         console.log('N_BoxAndChar 结果:', N_BoxAndChar_result);
//
//         const M_char_result = M_char(
//             p.charWeight,
//             char_snowLoad,
//             charMaxWindLoad,
//             p.screwNumber,
//             p.screwGap,
//             p.safetyFactor
//         );
//         console.log('M_char 结果:', M_char_result);
//
//         const M_BoxAndChar_result = M_BoxAndChar(
//             Box_weight,
//             p.charWeight,
//             BoxAndChar_snowLoad,
//             BoxAndCharMaxWindLoad,
//             p.lightBoxLength,
//             p.lightBoxHeight,
//             p.safetyFactor
//         );
//         console.log('M_BoxAndChar 结果:', M_BoxAndChar_result);
//
//         // 11. 构建并返回前端所需的数据
//         const output = {
//             N_char: N_char_result,
//             N_BoxAndChar: N_BoxAndChar_result,
//             M_char: M_char_result,
//             M_BoxAndChar: M_BoxAndChar_result
//         };
//         console.log('最终输出:', output);
//         console.log('—— 计算结束 ——');
//         console.log('—— 开始材料对比 ——');
//         const materialComparison = await compareWithMaterialProperties(output);
//         console.log('材料对比结果:', materialComparison);
//         console.log('—— 材料对比结束 ——');
//         // 将材料对比结果添加到输出
//         output.materialComparison = materialComparison;
//         res.json(output);
//     } catch (error) {
//         console.error('计算错误:', error);
//         res.status(500).json({ error: error.message });
//     }
// });
//
// // 启动服务器
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`🚀 Server listening on http://localhost:${PORT}/login.html`);
// });

const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const session = require('express-session');
// 引入计算模块
const BoxWindLoadOutdoor = require('./backEnd/calculation/BoxWindLoad_outdoor');
const CharWindLoadOutdoor = require('./backEnd/calculation/CharWindLoad_outdoor');
const lightBox = require('./backEnd/calculation/lightBox');
const M_BoxAndChar = require('./backEnd/calculation/M_BoxAndChar');
const M_char = require('./backEnd/calculation/M_char');
const N_BoxAndChar = require('./backEnd/calculation/N_BoxAndChar');
const N_char = require('./backEnd/calculation/N_char');
const SnowLoad_BoxAndChar = require('./backEnd/calculation/snowLoad_boxAndChar');
const SnowLoad_char = require('./backEnd/calculation/snowLoad_char');
const WindLoad_Load = require('./backEnd/calculation/windLoad_Load');
const WindLoadMax_BoxAndChar = require('./backEnd/calculation/windLoadMax_boxAndChar');
const WindLoadMax_char = require('./backEnd/calculation/windLoadMax_char');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontEnd')));
// 会话管理
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
// 缓存前端输入
let savedInput = null;
// 创建数据库连接
const adminDb = new sqlite3.Database('./dataBase/Admin.db');
const userDb = new sqlite3.Database('./dataBase/userList.db');
const materialDb = new sqlite3.Database('./dataBase/material.db');

// 创建数据库表（如果不存在）- 使用 TEXT 类型
adminDb.run(`
    CREATE TABLE IF NOT EXISTS Admin (
        userName TEXT PRIMARY KEY NOT NULL,
        passWord TEXT NOT NULL
    )
`);
userDb.run(`
    CREATE TABLE IF NOT EXISTS User (
        userName TEXT PRIMARY KEY NOT NULL,
        passWord TEXT NOT NULL,
        Category TEXT NOT NULL
    )
`);
// 添加默认管理员（如果不存在）- 使用明文密码
adminDb.get("SELECT * FROM Admin WHERE userName = 'admin'", (err, row) => {
    if (err) {
        console.error('检查默认管理员时出错:', err);
        return;
    }
    if (!row) {
        adminDb.run(
            "INSERT INTO Admin (userName, passWord) VALUES (?, ?)",
            ['admin', 'admin123'],
            (err) => {
                if (err) {
                    console.error('创建默认管理员失败:', err);
                } else {
                    console.log('默认管理员账号已创建: admin/admin123');
                }
            }
        );
    }
});
// 用户注册 - 使用明文密码
app.post('/api/user/register', (req, res) => {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
        return res.status(400).json({
            success: false,
            message: '请提供用户名、密码和用户类型'
        });
    }
    // 检查用户名是否已存在
    userDb.get("SELECT * FROM User WHERE userName = ?", [username], (err, row) => {
        if (err) {
            console.error('用户注册查询错误:', err);
            return res.status(500).json({
                success: false,
                message: '数据库错误'
            });
        }
        if (row) {
            return res.status(400).json({
                success: false,
                message: '用户名已存在'
            });
        }
        // 直接存储明文密码
        userDb.run(
            "INSERT INTO User (userName, passWord, Category) VALUES (?, ?, ?)",
            [username, password, role],
            function(err) {
                if (err) {
                    console.error('用户注册插入错误:', err);
                    return res.status(500).json({
                        success: false,
                        message: '创建用户失败'
                    });
                }
                res.json({
                    success: true,
                    message: '用户注册成功'
                });
            }
        );
    });
});
// 用户登录 - 使用明文密码验证
app.post('/api/user/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: '请提供用户名和密码'
        });
    }
    // 查找用户
    userDb.get("SELECT * FROM User WHERE userName = ?", [username], (err, row) => {
        if (err) {
            console.error('用户登录查询错误:', err);
            return res.status(500).json({
                success: false,
                message: '数据库错误'
            });
        }
        if (!row) {
            return res.status(401).json({
                success: false,
                message: '用户名或密码错误'
            });
        }
        // 直接比较明文密码
        if (password === row.passWord) {
            req.session.user = {
                username: row.userName,
                role: row.Category
            };

            // 根据用户角色返回不同的重定向路径
            let redirectUrl = '/index.html'; // 默认工程师页面
            if (row.Category === 'user') {
                redirectUrl = '/index2.html'; // 普通用户页面
            }

            res.json({
                success: true,
                message: '登录成功',
                user: {
                    username: row.userName,
                    role: row.Category
                },
                redirectUrl: redirectUrl // 添加重定向URL
            });
        } else {
            res.status(401).json({
                success: false,
                message: '用户名或密码错误'
            });
        }
    });
});

// 管理员登录 - 使用明文密码验证
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: '请提供管理员账号和极简版密码'
        });
    }
    // 查找管理员
    adminDb.get("SELECT * FROM Admin WHERE userName = ?", [username], (err, row) => {
        if (err) {
            console.error('管理员登录查询错误:', err);
            return res.status(500).json({
                success: false,
                message: '数据库错误'
            });
        }
        if (!row) {
            return res.status(401).json({
                success: false,
                message: '管理员账号或密码错误'
            });
        }
        // 直接比较明文密码
        if (password === row.passWord) {
            req.session.admin = {
                username: row.userName
            };
            res.json({
                success: true,
                message: '管理员登录成功',
                admin: {
                    username: row.userName
                }
            });
        } else {
            res.status(401).json({
                success: false,
                message: '管理员账号或密码错误'
            });
        }
    });
});
// 添加管理员 - 使用明文密码
app.post('/api/admin/add', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: '请提供管理员账号和密码'
        });
    }
    // 检查管理员是否已存在
    adminDb.get("SELECT * FROM Admin WHERE userName = ?", [username], (err, row) => {
        if (err) {
            console.error('添加管理员查询错误:', err);
            return res.status(500).json({
                success: false,
                message: '数据库错误'
            });
        }
        if (row) {
            return res.status(400).json({
                success: false,
                message: '管理员账号已存在'
            });
        }
        // 直接存储明文密码
        adminDb.run(
            "INSERT INTO Admin (userName, passWord) VALUES (?, ?)",
            [username, password],
            function(err) {
                if (err) {
                    console.error('添加管理员插入错误:', err);
                    return res.status(500).json({
                        success: false,
                        message: '创建管理员失败'
                    });
                }
                res.json({
                    success: true,
                    message: '管理员添加成功'
                });
            }
        );
    });
});
// 路由设置
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontEnd', 'login.html'));
});
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontEnd', 'Gongchengshijisuan.html'));
});
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontEnd', 'Guanliyuan.html'));
});
// 保存输入数据
app.post('/api/save-input', (req, res) => {
    savedInput = req.body;
    console.log('🔹 /api/save-input received:', savedInput);
    res.json({ ok: true, message: '输入已保存' });
});

// 检查管理员权限的中间件
const checkAdmin = (req, res, next) => {
    if (req.session.admin) {
        next();
    } else {
        res.status(403).json({ success: false, message: '无管理员权限' });
    }
};

// 获取所有用户
app.get('/api/admin/users', checkAdmin, (req, res) => {
    userDb.all("SELECT * FROM User", (err, rows) => {
        if (err) {
            console.error('获取用户列表错误:', err);
            return res.status(500).json({ success: false, message: '数据库错误' });
        }
        res.json({ success: true, users: rows });
    });
});

// 添加用户
app.post('/api/admin/users', checkAdmin, (req, res) => {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
        return res.status(400).json({
            success: false,
            message: '请提供用户名、密码和用户类型'
        });
    }

    // 检查用户名是否已存在
    userDb.get("SELECT * FROM User WHERE userName = ?", [username], (err, row) => {
        if (err) {
            console.error('添加用户查询错误:', err);
            return res.status(500).json({
                success: false,
                message: '数据库错误'
            });
        }
        if (row) {
            return res.status(400).json({
                success: false,
                message: '用户名已存在'
            });
        }

        // 添加用户
        userDb.run(
            "INSERT INTO User (userName, passWord, Category) VALUES (?, ?, ?)",
            [username, password, role],
            function(err) {
                if (err) {
                    console.error('添加用户插入错误:', err);
                    return res.status(500).json({
                        success: false,
                        message: '创建用户失败'
                    });
                }
                res.json({
                    success: true,
                    message: '用户添加成功'
                });
            }
        );
    });
});

// 删除用户
app.delete('/api/admin/users/:username', checkAdmin, (req, res) => {
    const username = req.params.username;

    userDb.run(
        "DELETE FROM User WHERE userName = ?",
        [username],
        function(err) {
            if (err) {
                console.error('删除用户错误:', err);
                return res.status(500).json({
                    success: false,
                    message: '删除用户失败'
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    success: false,
                    message: '用户不存在'
                });
            }

            res.json({
                success: true,
                message: '用户删除成功'
            });
        }
    );
});

// 修改用户
app.put('/api/admin/users/:username', checkAdmin, (req, res) => {
    const username = req.params.username;
    const { password, role } = req.body;

    if (!password && !role) {
        return res.status(400).json({
            success: false,
            message: '请提供要修改的密码或角色'
        });
    }

    let updateQuery = "UPDATE User SET ";
    const params = [];

    if (password) {
        updateQuery += "passWord = ?, ";
        params.push(password);
    }

    if (role) {
        updateQuery += "Category = ?, ";
        params.push(role);
    }

    // 移除最后的逗号和空格
    updateQuery = updateQuery.slice(0, -2);
    updateQuery += " WHERE userName = ?";
    params.push(username);

    userDb.run(updateQuery, params, function(err) {
        if (err) {
            console.error('修改用户错误:', err);
            return res.status(500).json({
                success: false,
                message: '修改用户失败'
            });
        }

        if (this.changes === 0) {
            return res.status(404).json({
                success: false,
                message: '用户不存在'
            });
        }

        res.json({
            success: true,
            message: '用户修改成功'
        });
    });
});

// 数据库连接
const db = new sqlite3.Database('./dataBase/windVibration.db', sqlite3.OPEN_READONLY);
const db2012 = new sqlite3.Database('./dataBase/GB2012.db', sqlite3.OPEN_READONLY);
const Wk = new sqlite3.Database('./dataBase/Wk.db', sqlite3.OPEN_READONLY);

// 数据库查询函数
function getVibrationValue(h, c) {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT value FROM surface_roughness WHERE height_m = ? AND roughness_class = ?`,
            [h, c],
            (err, row) => {
                if (err) return reject(err);
                if (!row) return reject(new Error('风振未找到对应记录'));
                resolve(row.value);
            }
        );
    });
}

function getWindPressureHeightCoefficient(h, c) {
    return new Promise((resolve, reject) => {
        db2012.get(
            `SELECT value FROM surface_roughness WHERE height_m = ? AND roughness_class = ?`,
            [h, c],
            (err, row) => {
                if (err) return reject(err);
                if (!row) return reject(new Error('风压高度系数未找到对应记录'));
                resolve(row.value);
            }
        );
    });
}

function getWk(h, c) {
    return new Promise((resolve, reject) => {
        Wk.get(
            `SELECT value FROM surface_roughness WHERE height_m = ? AND roughness_class = ?`,
            [h, c],
            (err, row) => {
                if (err) return reject(err);
                if (!row) return reject(new Error('Wk未找到对应记录'));
                resolve(row.value);
            }
        );
    });
}
async function compareWithMaterialProperties(calculatedValues) {
    const materialSuggestions = {};
    const materialPassCount = { PII: 0, PIII: 0, FS1: 0 };
    const totalComparisons = 12; // 总共12个比较项

    // 定义需要对比的属性及其对应的数据库项目
    const propertiesToCompare = [
        {
            key: 'N_char.horizontalPull',
            project: '拉伸强度',
            direction: '经向',
            value: calculatedValues.N_char.horizontalPull
        },
        {
            key: 'N_char.horizontalBreak',
            project: '撕裂强度',
            direction: '经向',
            value: calculatedValues.N_char.horizontalBreak
        },
        {
            key: 'N_char.verticalPull',
            project: '拉伸强度',
            direction: '纬向',
            value: calculatedValues.N_char.verticalPull
        },
        {
            key: 'N_char.verticalBreak',
            project: '撕裂强度',
            direction: '纬向',
            value: calculatedValues.N_char.verticalBreak
        },
        {
            key: 'M_char.horizontalPull',
            project: '拉伸强度',
            direction: '经向',
            value: calculatedValues.M_char.horizontalPull
        },
        {
            key: 'M_char.horizontalBreak',
            project: '撕裂强度',
            direction: '经向',
            value: calculatedValues.M_char.horizontalBreak
        },
        {
            key: 'M_char.verticalPull',
            project: '拉伸强度',
            direction: '纬向',
            value: calculatedValues.M_char.verticalPull
        },
        {
            key: 'M_char.verticalBreak',
            project: '撕裂强度',
            direction: '纬向',
            value: calculatedValues.M_char.verticalBreak
        },
        {
            key: 'N_BoxAndChar.horizontalPull',
            project: '拉伸强度',
            direction: '经向',
            value: calculatedValues.N_BoxAndChar.horizontalPull
        },
        {
            key: 'N_BoxAndChar.verticalPull',
            project: '拉伸强度',
            direction: '纬向',
            value: calculatedValues.N_BoxAndChar.verticalPull
        },
        {
            key: 'M_极简版BoxAndChar.horizontalPull',
            project: '拉伸强度',
            direction: '经向',
            value: calculatedValues.M_BoxAndChar.horizontalPull
        },
        {
            key: 'M_BoxAndChar.verticalPull',
            project: '拉伸强度',
            direction: '纬向',
            value: calculatedValues.M_BoxAndChar.verticalPull
        }
    ];
    // 查询数据库并对比结果
    for (const prop of propertiesToCompare) {
        try {
            const row = await new Promise((resolve, reject) => {
                materialDb.get(
                    `SELECT PII, PIII, FS1 
                     FROM fabric_properties 
                     WHERE project = ? AND direction = ?`,
                    [prop.project, prop.direction],
                    (err, row) => {
                        if (err) reject(err);
                        else resolve(row);
                    }
                );
            });
            if (row) {
                const suggestions = [];

                // 检查计算值是否小于数据库中的值
                if (prop.value <= row.PII) {
                    suggestions.push('PII');
                    materialPassCount.PII++;
                }
                if (prop.value <= row.PIII) {
                    suggestions.push('PIII');
                    materialPassCount.PIII++;
                }
                if (prop.value <= row.FS1) {
                    suggestions.push('FS1');
                    materialPassCount.FS1++;
                }

                if (suggestions.length > 0) {
                    materialSuggestions[prop.key] = {
                        project: prop.project,
                        direction: prop.direction,
                        calculatedValue: prop.value,
                        suggestions: suggestions
                    };
                }
            }
        } catch (error) {
            console.error(`材料对比查询错误 (${prop.key}):`, error);
        }
    }

    // 找出在所有比较项中都满足要求的材料
    const overallSuggestions = [];
    if (materialPassCount.PII === totalComparisons) overallSuggestions.push('PII');
    if (materialPassCount.PIII === totalComparisons) overallSuggestions.push('PIII');
    if (materialPassCount.FS1 === totalComparisons) overallSuggestions.push('FS1');

    return {
        detailedSuggestions: materialSuggestions,
        overallSuggestions: overallSuggestions,
        passCount: materialPassCount,
        totalComparisons: totalComparisons
    };
}


// 计算并返回结果
app.post('/api/calculate', async (req, res) => {
    try {
        if (!savedInput) {
            return res.status(400).json({ error: '请先提供输入数据' });
        }

        const p = savedInput;
        console.log('—— 开始计算 ——');
        console.log('输入参数:', p);

        // 1. 查库：风振系数
        const windVibrationCoefficient = await getVibrationValue(p.hangingHeight, p.roughnessClass);
        console.log('风振系数:', windVibrationCoefficient);

        // 2. 查库：风压高度系数
        const windPressureHeightCoefficient = await getWindPressureHeightCoefficient(p.hangingHeight, p.roughnessClass);
        console.log('风压高度系数:', windPressureHeightCoefficient);

        // 3. 查库：φ 系数
        const phi = await getWk(p.hangingHeight, p.roughnessClass);
        console.log('φ 系数:', phi);

        // 4. 计算灯箱面积 & 重量
        const lightInfo = lightBox(p.lightBoxLength, p.lightBoxHeight, p.lightBoxUnitWeight, p.BoxNumHanging);
        const Box_acceptWindArea = lightInfo.area;
        const Box_weight = lightInfo.weight;
        console.log('灯箱受风面积:', Box_acceptWindArea);
        console.log('灯箱布重量:', Box_weight);

        // 5. 计算通用风载荷
        const windLoad = WindLoad_Load(
            windVibrationCoefficient,
            windPressureHeightCoefficient,
            p.baseWindPressure,
            Box_acceptWindArea,
            p.miuS
        );
        console.log('通用风载荷:', windLoad);

        // 6. 立体字日常风荷载
        const char_windLoad = CharWindLoadOutdoor(p.baseWindPressure, phi, p.charAcceptWindArea);
        console.log('立体字日常风荷载:', char_windLoad);

        // 7. 灯箱+立体字日常风荷载
        const BoxAndChar_windLoad = BoxWindLoadOutdoor(p.baseWindPressure, phi, Box_acceptWindArea);
        console.log('灯箱+立体字日常风荷载:', BoxAndChar_windLoad);

        // 8. 雪载荷
        const char_snowLoad = SnowLoad_char(p.snowPressure, p.charAcceptWindArea);
        const BoxAndChar_snowLoad = SnowLoad_BoxAndChar(p.snowPressure, Box_acceptWindArea);
        console.log('立体字雪载荷:', char_snowLoad);
        console.log('灯箱+立体字雪载荷:', BoxAndChar_snowLoad);

        // 9. 最大风载荷
        const charMaxWindLoad = WindLoadMax_char(p.charAcceptWindArea);
        const BoxAndCharMaxWindLoad = WindLoadMax_BoxAndChar(Box_acceptWindArea);
        console.log('立体字最大风载荷:', charMaxWindLoad);
        console.log('灯箱+立体字最大风载荷:', BoxAndCharMaxWindLoad);

        // 10. 拉伸/撕裂强度计算
        const N_char_result = N_char(
            p.charWeight,
            char_snowLoad,
            char_windLoad,
            p.screwNumber,
            p.screwGap,
            p.safetyFactor
        );
        console.log('N_char 结果:', N_char_result);

        const N_BoxAndChar_result = N_BoxAndChar(
            Box_weight,
            p.charWeight,
            BoxAndChar_snowLoad,
            BoxAndChar_windLoad,
            p.lightBoxLength,
            p.lightBoxHeight,
            p.safetyFactor
        );
        console.log('N_BoxAndChar 结果:', N_BoxAndChar_result);

        const M_char_result = M_char(
            p.charWeight,
            char_snowLoad,
            charMaxWindLoad,
            p.screwNumber,
            p.screwGap,
            p.safetyFactor
        );
        console.log('M_char 结果:', M_char_result);

        const M_BoxAndChar_result = M_BoxAndChar(
            Box_weight,
            p.charWeight,
            BoxAndChar_snowLoad,
            BoxAndCharMaxWindLoad,
            p.lightBoxLength,
            p.lightBoxHeight,
            p.safetyFactor
        );
        console.log('M_BoxAndChar 结果:', M_BoxAndChar_result);

        // 11. 构建并返回前端所需的数据
        const output = {
            N_char: N_char_result,
            N_BoxAndChar: N_BoxAndChar_result,
            M_char: M_char_result,
            M_BoxAndChar: M_BoxAndChar_result
        };
        console.log('最终输出:', output);
        console.log('—— 计算结束 ——');
        console.log('—— 开始材料对比 ——');
        const materialComparison = await compareWithMaterialProperties(output);
        console.log('材料对比结果:', materialComparison);
        console.log('—— 材料对比结束 ——');
        // 将材料对比结果添加到输出
        output.materialComparison = materialComparison;
        res.json(output);
    } catch (error) {
        console.error('计算错误:', error);
        res.status(500).json({ error: error.message });
    }
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}/login.html`);
});

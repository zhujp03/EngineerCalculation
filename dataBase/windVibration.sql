PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;

-- 创建表：height_m（离地面高度，整数），
-- roughness_class（粗糙度类别，文本），value（对应数值，实数）
-- 复合主键：(height_m, roughness_class)
CREATE TABLE IF NOT EXISTS surface_roughness (
    height_m         INTEGER NOT NULL,
    roughness_class  TEXT    NOT NULL,
    value            REAL,
    PRIMARY KEY (height_m, roughness_class)
);

-- 插入新一组数据
INSERT INTO surface_roughness (height_m, roughness_class, value) VALUES
    (5,  'A', 1.69),
    (5,  'B', 1.88),
    (5,  'C', 2.30),
    (5,  'D', 3.21),
    (10, 'A', 1.63),
    (10, 'B', 1.78),
    (10, 'C', 2.10),
    (10, 'D', 2.76),
    (15, 'A', 1.60),
    (15, 'B', 1.72),
    (15, 'C', 1.99),
    (15, 'D', 2.54),
    (20, 'A', 1.58),
    (20, 'B', 1.69),
    (20, 'C', 1.92),
    (20, 'D', 2.39
);

COMMIT;
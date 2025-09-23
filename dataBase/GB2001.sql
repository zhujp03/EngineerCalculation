PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;

-- 创建表：height_m（离地面或海平面高度，整数），
-- roughness_class（粗糙度类别，文本），value（对应数值，实数）
-- 复合主键：(height_m, roughness_class)
CREATE TABLE IF NOT EXISTS surface_roughness (
    height_m         INTEGER NOT NULL,
    roughness_class  TEXT    NOT NULL,
    value            REAL,
    PRIMARY KEY (height_m, roughness_class)
);

-- 插入数据
INSERT INTO surface_roughness (height_m, roughness_class, value) VALUES
    (5,  'A', 1.17),
    (5,  'B', 1.00),
    (5,  'C', 0.74),
    (5,  'D', 0.62),
    (10, 'A', 1.38),
    (10, 'B', 1.00),
    (10, 'C', 0.74),
    (10, 'D', 0.62),
    (15, 'A', 1.52),
    (15, 'B', 1.14),
    (15, 'C', 0.74),
    (15, 'D', 0.62),
    (20, 'A', 1.63),
    (20, 'B', 1.25),
    (20, 'C', 0.84),
    (20, 'D', 0.62),
    (30, 'A', 1.80),
    (30, 'B', 1.42),
    (30, 'C', 1.00),
    (30, 'D', 0.62),
    (40, 'A', 1.92),
    (40, 'B', 1.56),
    (40, 'C', 1.13),
    (40, 'D', 0.73),
    (50, 'A', 2.03),
    (50, 'B', 1.67),
    (50, 'C', 1.25),
    (50, 'D', 0.84),
    (60, 'A', 2.12),
    (60, 'B', 1.77),
    (60, 'C', 1.35),
    (60, 'D', 0.93
);

COMMIT;
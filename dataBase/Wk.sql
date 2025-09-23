-- 关闭外键（如果后续没有外键依赖，可省略）
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

-- 插入所有数据
INSERT INTO surface_roughness (height_m, roughness_class, value) VALUES
                                                                     (5,  'A', 2.57),
                                                                     (5,  'B', 2.44),
                                                                     (5,  'C', 2.21),
                                                                     (5,  'D', 2.59),
                                                                     (10, 'A', 2.93),
                                                                     (10, 'B', 2.31),
                                                                     (10, 'C', 2.02),
                                                                     (10, 'D', 2.22),
                                                                     (15, 'A', 3.16),
                                                                     (15, 'B', 2.55),
                                                                     (15, 'C', 1.91),
                                                                     (15, 'D', 2.05),
                                                                     (20, 'A', 3.35),
                                                                     (20, 'B', 2.75),
                                                                     (20, 'C', 2.10),
                                                                     (20, 'D', 1.93
                                                                     );

COMMIT;
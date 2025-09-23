PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;

-- 创建表：height_m（离地面或海平面高度，整数），
-- roughness_class（粗糙度类别，文本），value（对应数值，实数），
-- 复合主键：(height_m, roughness_class)
CREATE TABLE IF NOT EXISTS surface_roughness (
    height_m         INTEGER NOT NULL,
    roughness_class  TEXT    NOT NULL,
    value            REAL,
    PRIMARY KEY (height_m, roughness_class)
);

-- 插入数据
INSERT INTO surface_roughness (height_m, roughness_class, value) VALUES
    (5,   'A', 1.09), (5,   'B', 1.00), (5,   'C', 0.65), (5,   'D', 0.51),
   (10,  'A', 1.28), (10,  'B', 1.00), (10,  'C', 0.65), (10,  'D', 0.51),
   (15,  'A', 1.42), (15,  'B', 1.13), (15,  'C', 0.65), (15,  'D', 0.51),
   (20,  'A', 1.52), (20,  'B', 1.23), (20,  'C', 0.74), (20,  'D', 0.51),
   (30,  'A', 1.67), (30,  'B', 1.39), (30,  'C', 0.88), (30,  'D', 0.51),
   (40,  'A', 1.79), (40,  'B', 1.52), (40,  'C', 1.00), (40,  'D', 0.60),
   (50,  'A', 1.89), (50,  'B', 1.62), (50,  'C', 1.10), (50,  'D', 0.69),
   (60,  'A', 1.97), (60,  'B', 1.71), (60,  'C', 1.20), (60,  'D', 0.77),
   (70,  'A', 2.05), (70,  'B', 1.79), (70,  'C', 1.28), (70,  'D', 0.84),
   (80,  'A', 2.12), (80,  'B', 1.87), (80,  'C', 1.36), (80,  'D', 0.91),
   (90,  'A', 2.18), (90,  'B', 1.93), (90,  'C', 1.43), (90,  'D', 0.98),
  (100,  'A', 2.23), (100,  'B', 2.00), (100,  'C', 1.50), (100,  'D', 1.04)
;

COMMIT;
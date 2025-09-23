-- fabric_properties.sql

BEGIN TRANSACTION;

-- 1) 创建表
CREATE TABLE IF NOT EXISTS fabric_properties (
                                                 project    TEXT    NOT NULL,   -- 项目
                                                 direction  TEXT    NOT NULL,   -- 方向：经向/纬向/克重等
                                                 PII        REAL,                -- PII 值
                                                 PIII       REAL,                -- PIII 值（%已转换为小数）
                                                 FS1        REAL,                -- FS-1 值
                                                 PRIMARY KEY (project, direction)
);

-- 2) 插入“拉伸强度”
INSERT INTO fabric_properties(project, direction, PII,   PIII,  FS1) VALUES
                                                                         ('拉伸强度','经向', 26094, 17600, 17600),
                                                                         ('拉伸强度','纬向', 26094, 17600, 17600);

-- 3) 插入“撕裂强度”
INSERT INTO fabric_properties(project, direction, PII,   PIII, FS1) VALUES
                                                                        ('撕裂强度','经向', 19620, 135,  135),
                                                                        ('撕裂强度','纬向', 14715, 90,   90);

-- 4) 插入“伸长率”（50% → 0.5）
INSERT INTO fabric_properties(project, direction, PII, PIII, FS1) VALUES
                                                                      ('伸长率','经向', NULL, 0.50, 0.50),
                                                                      ('伸长率','纬向', NULL, 0.50, 0.50);

-- 5) 插入“克重”
INSERT INTO fabric_properties(project, direction, PII,  PIII, FS1) VALUES
    ('克重','kg/m²', 0.78, 0.65, 0.65);

COMMIT;
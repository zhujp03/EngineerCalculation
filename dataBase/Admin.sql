-- PRAGMA foreign_keys = OFF;
-- BEGIN TRANSACTION;
--
-- -- 创建表：Admin（管理员表）
-- CREATE TABLE IF NOT EXISTS Admin (
--     userName         TEXT  NOT NULL,
--     passWord         INTEGER    NOT NULL,
--     PRIMARY KEY (userName)
-- );
--
-- INSERT INTO Admin (userName, passWord) VALUES
-- ('Joy', 888888),
-- ('zjp', 123456);
--
-- COMMIT;

PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS Admin_new (
                                         userName TEXT NOT NULL,
                                         passWord TEXT NOT NULL,  -- 改为 TEXT 类型
                                         PRIMARY KEY (userName)
);
INSERT INTO Admin_new (userName, passWord)
SELECT userName, CAST(passWord AS TEXT) FROM Admin;
DROP TABLE Admin;
ALTER TABLE Admin_new RENAME TO Admin;
COMMIT;
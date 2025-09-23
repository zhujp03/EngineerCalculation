-- PRAGMA foreign_keys = OFF;
-- BEGIN TRANSACTION;
--
--
-- CREATE TABLE IF NOT EXISTS User (
--     userName         TEXT  NOT NULL,
--     passWord         INTEGER    NOT NULL,
--     Category         TEXT    NOT NULL,
--     PRIMARY KEY (userName)
-- );
--
-- COMMIT;

BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS User_new (
                                        userName TEXT NOT NULL,
                                        passWord TEXT NOT NULL,  -- 改为 TEXT 类型
                                        Category TEXT NOT NULL,
                                        PRIMARY KEY (userName)
);
INSERT INTO User_new (userName, passWord, Category)
SELECT userName, CAST(passWord AS TEXT), Category FROM User;
DROP TABLE User;
ALTER TABLE User_new RENAME TO User;
COMMIT;
PRAGMA foreign_keys = ON;
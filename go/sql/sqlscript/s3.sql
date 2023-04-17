PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE userinfo (
    uid INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(64) NULL,
    departname VARCHAR(64) NULL,
    created DATE NULL
);
INSERT INTO userinfo VALUES(1,'laotie','dev','2000-1-2');
CREATE TABLE userdetail (
uid int(10) NULL,
intro TEXT NULL,
profile TEXT NULL,
PRIMARY KEY (uid)
);
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('userinfo',1);
COMMIT;

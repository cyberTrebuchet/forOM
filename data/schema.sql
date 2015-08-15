CREATE TABLE blinks (
  id integer PRIMARY KEY AUTOINCREMENT,
  parent_id integer,
  nods integer,
  title text,
  author text,
  winks integer
);
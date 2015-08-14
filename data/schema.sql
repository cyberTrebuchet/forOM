CREATE TABLE blinks (
  id integer PRIMARY KEY AUTOINCREMENT,
  parent_id integer,
  approval integer,
  title text,
  author text,
  comments integer
);
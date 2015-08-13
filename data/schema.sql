CREATE TABLE topics (
  id integer PRIMARY KEY AUTOINCREMENT,
  approval integer,
  title text,
  author text,
  comments integer
);

CREATE TABLE comments (
  id integer PRIMARY KEY AUTOINCREMENT,
  approval integer,
  author text,
  content text,
  comments integer,
  parent_id varchar -- formatted t0 or t0c0
);
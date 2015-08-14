CREATE TABLE topics (
  id integer PRIMARY KEY AUTOINCREMENT,
  topic_id varchar, -- formatted t1
  approval integer,
  title text,
  author text,
  comments integer
);

CREATE TABLE comments (
  id integer PRIMARY KEY AUTOINCREMENT,
  comment_id varchar, -- formatted t1c1
  approval integer,
  author text,
  content text,
  comments integer,
  parent_id varchar -- formatted t1 or t1c1
);
CREATE TABLE bills (
  id integer PRIMARY KEY AUTOINCREMENT,
  chamber varchar,
  bill_number integer,
  short_title text,
  official_title text,
  urls_json text,
  bioguide_id varchar
);
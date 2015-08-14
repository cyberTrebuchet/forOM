INSERT INTO topics (topic_id, approval, title, author, comments) VALUES ('t1', 0, 'teh best topic evar', 'thompson!', 3);
INSERT INTO comments (comment_id, approval, author, content, comments, parent_id) VALUES ('t1c1', 0, 'thompson!', 'wow I could talk about this topic forevar', 2, 't1');
INSERT INTO comments (comment_id, approval, author, content, comments, parent_id) VALUES ('t1c2', 0, 'thompson!', 'lk srsly wt a grt tpc', 1, 't1c1');
INSERT INTO comments (comment_id, approval, author, content, comments, parent_id) VALUES ('t1c3', 0, 'thompson!', 'I know right it\'s fascinating!', 0, 't1c2');

-- A01409982_user
-- A01409982_user_timeline

CREATE TABLE A01409982_user (
    ID int NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(50),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(80),
    password VARCHAR(50),
    PRIMARY KEY (ID)
);

CREATE TABLE A01409982_user_timeline (
    ID int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    post_date DATE,
    post_time Time,
    post_text VARCHAR(1000),
    views int NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (user_id) REFERENCES  A01409982_user(ID) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO A01409982_user (user_name, first_name, last_name, email, password) VALUES ('JLL',  'Lulu', 'Jiang', 'ljiang52@my.bcit.ca', '1222');
INSERT INTO A01409982_user (user_name, first_name, last_name, email, password) VALUES ('JJ', 'Junjie', 'Lin', 'jjlin@gmail.com', '0327');
INSERT INTO A01409982_user (user_name, first_name, last_name, email, password) VALUES ('Jolin', 'Yilin', 'Cai', 'jolincai@gmai.com', 'jolin0110');

INSERT INTO A01409982_user_timeline (user_id, post_date, post_time, post_text, views) VALUES 
(1, '2024-01-11', '10:15:00', 'Inception: A thrilling adventure from start to finish!', 120),
(1, '2024-03-02', '14:30:00', 'Avatar: Incredible visuals and a gripping story.',  98),
(1, '2024-05-13', '18:45:00', 'Interstellar: A bit slow in the middle, but a satisfying end.',75),
(1, '2024-08-04', '20:20:00', 'The Godfather: Amazing performances by the lead actors.', 85),
(1, '2024-09-25', '11:30:00', 'The Shawshank Redemption: A classic that deserves all the praise.', 60),
(1, '2024-10-06', '17:05:00', 'The Dark Knight: Great soundtrack and cinematography.', 130),
(1, '2024-11-07', '19:50:00', 'Forrest Gump: An emotional journey that hits all the right notes.', 115);

INSERT INTO A01409982_user_timeline (user_id, post_date, post_time, post_text, views) VALUES 
(2, '2024-01-10', '09:15:00', 'Inception: A visually stunning masterpiece.', 140),
(2, '2024-02-02', '13:45:00', 'Gladiator: Kept me on the edge of my seat.', 112),
(2, '2024-05-23', '16:00:00', 'The Matrix: A well-crafted story with deep characters.', 90),
(2, '2024-07-04', '20:10:00', 'The Prestige: Could not stop thinking about it after watching.', 70),
(2, '2024-08-25', '14:20:00', 'Fight Club: The plot twists were unexpected and brilliant.', 105),
(2, '2024-10-06', '12:30:00', 'The Lord of the Rings: A bit too long, but worth it.', 80),
(2, '2024-11-07', '15:55:00', 'Avengers: Endgame: Perfectly balanced between action and drama.', 120);

INSERT INTO A01409982_user_timeline (user_id, post_date, post_time, post_text, views) VALUES 
(3, '2024-02-01', '10:25:00', 'Blade Runner 2049: The best sci-fi movie I have seen in years.', 160),
(3, '2024-03-22', '11:45:00', 'La La Land: Beautifully directed with a strong message.', 110),
(3, '2024-05-03', '13:15:00', 'The Pursuit of Happyness: A heartwarming story with memorable characters.', 95),
(3, '2024-05-24', '18:40:00', 'Whiplash: The ending left me speechless.', 150),
(3, '2024-09-15', '20:10:00', 'Parasite: One of the most original plots I have ever seen.', 85),
(3, '2024-09-26', '19:30:00', '1917: Incredible use of visuals to tell the story.', 100),
(3, '2024-10-07', '16:55:00', 'Joker: A bit predictable but still enjoyable.', 130);



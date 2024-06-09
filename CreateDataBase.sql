CREATE TABLE users 
	(	user_id int4 primary key auto_increment,
		user_name varchar(100) not null,
		user_password varchar(250) not null
    );

CREATE TABLE students
	(	student_id int4 primary key auto_increment,
		user_id int4,
		student_name varchar(100) not null,
        student_email varchar(100) not null,
        tests_number int4 default 0,
        average float8 default 0,
        highest_grade float8 default 0,
        lowest_grade float8 default 0,
		deleted boolean default false,
        foreign key (user_id) references users (user_id)
    );

CREATE TABLE professor 
	( 	professor_id int4 primary key auto_increment,
		user_id int4,
        professor_name varchar(100) not null,
        professor_email varchar(100) not null,
        dept_name varchar(100) not null,
        deleted boolean default false,
		foreign key (user_id) references users (user_id)
	);

CREATE TABLE courses
	(	course_id int4 primary key auto_increment,
		user_id int4,
		course_name varchar(100) not null,
        professor_id int4,
        class_room varchar(50) not null,
        class_time time not null,
        class_weekday varchar(100) not null,
        deleted boolean default false,
        check (class_weekday in ("Segunda", "Terca", "Quarta", "Quinta", "Sexta", "Sábado")),
		foreign key (professor_id) references professor (professor_id),
        foreign key (user_id) references users (user_id)
    );
    
CREATE TABLE takes
	(   take_id int4 primary key auto_increment,
		course_id int4,
        student_id int4,
        foreign key (course_id) references courses (course_id),
        foreign key (student_id) references students (student_id)
    );

CREATE TABLE tests 
	(	test_id int4 primary key auto_increment,
		take_id int4,
		test_name varchar(50) not null,
        grade float8 default 0 not null,
        deleted boolean default false,
        foreign key (take_id) references takes (take_id)
    );
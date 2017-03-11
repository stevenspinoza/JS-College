--ASSIGNMENT #9 - STEVEN SP

--EXERCISE 1

DROP DATABASE IF EXISTS music;
CREATE DATABASE music;
USE music;

CREATE TABLE artist (
    artist_id SMALLINT(5) NOT NULL DEFAULT 0,
    artist_name CHAR(128) DEFAULT NULL,
	phone VARCHAR(12),
	birthday DATE,
    PRIMARY KEY (artist_id)
) engine=innoDB;

CREATE TABLE album (
    artist_id SMALLINT(5) NOT NULL DEFAULT 0,
    album_id SMALLINT(4) NOT NULL DEFAULT 0,
    album_name CHAR(128) DEFAULT NULL,
	release_year VARCHAR(15) NOT NULL,
	distrib_name VARCHAR(15) NOT NULL,
    PRIMARY KEY (artist_id,album_id),
    FOREIGN KEY (artist_id) REFERENCES artist(artist_id),
	FOREIGN KEY (distrib_name) REFERENCES distributor(distrib_name)
) engine=innoDB;

CREATE TABLE distributor
(
	distrib_id VARCHAR(2) NOT NULL PRIMARY KEY,
	distrib_name VARCHAR(15) NOT NULL,	
	phone VARCHAR(12),
	street  VARCHAR(15) NOT NULL,
	city  VARCHAR(15) NOT NULL,
	state CHAR(2),
	country  VARCHAR(15) NOT NULL,
	postal_code VARCHAR(5)		
) engine=innoDB;

--EXERCISE 2

DROP DATABASE IF EXISTS PHIL_LIMO;
CREATE DATABASE PHIL_LIMO;
USE PHIL_LIMO;

CREATE TABLE driver (
    driver_id SMALLINT(5) NOT NULL DEFAULT 0,
    first_name VARCHAR(15) NOT NULL,
	last_name VARCHAR(15) NOT NULL,
	street  VARCHAR(15) NOT NULL,
	city  VARCHAR(15) NOT NULL,
	province VARCHAR(15) NOT NULL,
	postal_code VARCHAR(5);	
	license VARCHAR(12),
	home_phone VARCHAR(12),
	cell VARCHAR(12),
	birthday DATE,
    PRIMARY KEY (driver_id)
) engine=innoDB;

CREATE TABLE limousine (
    limo_id SMALLINT(8) NOT NULL DEFAULT 0,
    license VARCHAR(7),
	color VARCHAR(12),
	max_pass SMALLINT(2),
	driver_id SMALLINT(5) NOT NULL DEFAULT 0,
	driver_name_01 VARCHAR(15) NOT NULL,
	driver_name_02 VARCHAR(15) NOT NULL,
	driver_name_03 VARCHAR(15) NOT NULL,
    PRIMARY KEY (limo_id),
	FOREIGN KEY (driver_id) REFERENCES driver(driver_id),
	FOREIGN KEY (driver_name_01) REFERENCES driver(first_name)
) engine=innoDB;
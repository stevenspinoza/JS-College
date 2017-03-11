--ASSIGNMENT #8 - STEVEN SP

--PART 1

SELECT title_name FROM titles WHERE type="history";
SELECT * FROM titles WHERE type="history";
SELECT title_name FROM titles WHERE pages>500;
SELECT title_name FROM titles WHERE pubdate>='2000-01-01';
SELECT title_name FROM titles WHERE contract=0;
SELECT title_name FROM titles WHERE type!='children';
SELECT title_name FROM titles WHERE type!='psychology' && sales>10000;
SELECT title_name FROM titles WHERE title_name REGEXP '.my';
SELECT title_name, price, sales, (sales*price) FROM titles ORDER BY (sales*price) DESC;
SELECT CONCAT(au_fname,' ',au_lname) FROM authors WHERE state = 'NY';
SELECT CONCAT(au_fname,' ',au_lname) FROM authors WHERE phone REGEXP 212;
SELECT title_name FROM titles WHERE pubdate REGEXP '-05-';
SELECT CONCAT(title_name,' has ',pages,' pages ') FROM titles WHERE pages<=800;
SELECT title_name FROM titles WHERE pages>1000 || pubdate <'1999-03-31';
SELECT title_name FROM titles WHERE (type="history" || type='children' || type='psychology') && price<=10;
SELECT DISTINCT pub_id FROM titles;
SELECT city FROM roadtrip WHERE miles<=1200 && miles>=600;
SELECT title_name, LENGTH(title_name) as 'Title Length' FROM titles ORDER BY LENGTH(title_name) DESC;
SELECT CONCAT(au_fname,' ',au_lname) FROM authors ORDER BY (au_fname) DESC;
SELECT title_name, DATEDIFF(CURRENT_DATE, pubdate) as 'Days published' FROM titles ORDER BY DATEDIFF(CURRENT_DATE, pubdate) DESC;


--PART 2

SELECT CONCAT('The most expensive book costs $', MAX(price)) as 'Answer' FROM titles; 
SELECT CONCAT('The least expensive book costs $', MIN(price)) as 'Answer' FROM titles; 
SELECT CONCAT('The average selling price for all titles is $', ROUND(AVG(price),2)) as 'Answer' FROM titles; 
SELECT CONCAT('The average price for history books is $', ROUND(AVG(price),2)) as 'Answer' FROM titles WHERE type="history"; 
SELECT CONCAT('The average pages in biography books ', ROUND(AVG(pages),0)) as 'Answer' FROM titles WHERE type="biography"; 
SELECT CONCAT(COUNT(*),' children books cost over $10.') as 'Answer' FROM titles WHERE type="children" && price>10; 
SELECT CONCAT(COUNT(*),' biography books are available to sell.') as 'Answer' FROM titles WHERE type="biography";
SELECT CONCAT('We have ', SUM(pages),' pages in all the books available.') as 'Answer' FROM titles;
SELECT CONCAT(COUNT(*),' biography books sold more than $500.') as 'Answer' FROM titles WHERE type="biography" && (sales*price)>500;
SELECT CONCAT(COUNT(*),' psychology books have more than 1000 pages OR cost more than $7.') as 'Answer' FROM titles WHERE type="psychology" && (pages>1000 || price>7);

--11)----
SELECT DISTINCT CONCAT('The distinct publisher ID’s in reverse order: ',  pub_id) as 'Answer' FROM titles ORDER BY pub_id DESC;
--12-----
SELECT CONCAT('We have ',COUNT(*),' books of ',type) AS "num_books" FROM titles GROUP BY type;
--13---
SELECT pub_id, type, COUNT(*) FROM titles GROUP BY pub_id, type;
-----14---------------
SELECT COUNT(DISTINCT title_name) FROM titles WHERE (type="history" || type='computer' || type='psychology') && price>10 && pubdate>= DATE_SUB(CURRENT_DATE, INTERVAL 15 YEAR);

-----15---------------
SELECT pub_id, title_name, type FROM titles; 

-----16-----------fix
SELECT employees.emp_id, employees.emp_name, empsales.sales 
FROM employees STRAIGHT_JOIN empsales 
ON empsales.emp_id=employees.emp_id 
WHERE sales>=500;

-----17---------------

SELECT t1.title_name, t1.type,
t2.advance AS "Advance"
FROM titles t1
INNER JOIN royalties t2
ON t1.title_id = t2.title_id
WHERE t1.type = 'biography'
AND t2.advance IS NOT NULL
ORDER BY t2.advance DESC;

-----18---------------

SELECT t1.pub_id, t1.title_name, t1.type,
t2.royalty_rate AS "Royalty Rate"
FROM titles t1
INNER JOIN royalties t2
ON t1.title_id = t2.title_id
WHERE t2.royalty_rate < 0.07
ORDER BY t2.royalty_rate DESC;

-----19---------------

SELECT pub_name, CONCAT(city,' ',state,' ',country) AS "Address"
FROM publishers
WHERE pub_id NOT IN
(SELECT pub_id
FROM titles
WHERE type="biography" || type='children' || type='computer');


-----20----fix--------

SELECT CONCAT(a.au_fname,' ',a.au_lname) AS "Author's name", a.address
FROM authors a
WHERE EXISTS
(SELECT * FROM title_authors ta
INNER JOIN titles t
ON t.title_id = ta.title_id
WHERE ta.au_id = a.au_id
AND t.title_id = 'T09')
	

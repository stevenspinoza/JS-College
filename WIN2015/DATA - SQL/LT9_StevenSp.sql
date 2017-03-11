--ASSIGNMENT #9 - STEVEN SP

--1----

SELECT pub_name
FROM publishers
WHERE pub_id IN 
(SELECT pub_id 
   FROM titles 
   WHERE type='history' || type='children');

--2----

SELECT CONCAT(au_fname,' ',au_lname) FROM authors WHERE phone REGEXP 212;

--3----

SELECT CONCAT(au_fname,' ',au_lname)
FROM authors
WHERE au_id IN
  (SELECT au_id
   FROM title_authors
   WHERE title_id NOT IN
     (SELECT title_id 
     FROM titles
     WHERE type='history'));

--4----

SELECT a.au_fname, a.au_lname
FROM authors AS a
WHERE NOT EXISTS
  (SELECT * FROM title_authors AS t
  WHERE t.au_id = a.au_id);


--5----

SELECT CONCAT(au_fname,' ',au_lname)
FROM authors
WHERE au_id IN
  (SELECT au_id
   FROM title_authors
   WHERE title_id IN
     (SELECT title_id 
     FROM titles
     WHERE pub_id='P02'));

--6----

SELECT CONCAT(au_fname,' ',au_lname)
FROM authors
WHERE au_id IN
(SELECT au_id
   FROM title_authors
   WHERE title_id IN
     (SELECT title_id 
     FROM royalties    
	 WHERE royalty_rate >
	 (SELECT AVG(royalty_rate)*1.5 
		FROM royalties)));
	 
--7----

SELECT CONCAT(au_fname,' ',au_lname)
FROM authors
WHERE au_id IN
(SELECT au_id
   FROM title_authors
   WHERE title_id IN
     (SELECT title_id 
     FROM royalties    
	 WHERE advance =
	 (SELECT MAX(advance) 
		FROM royalties)));

--8----

SELECT emp_name
FROM employees
WHERE emp_id IN
(SELECT emp_id
   FROM empsales
   WHERE sales>450);

--9----

SELECT CONCAT(au_fname,' ',au_lname), city 
FROM authors
WHERE city IN 
(SELECT city 
FROM publishers);

--10----

SELECT CONCAT(au_fname,' ',au_lname) as 'No books'
FROM authors
WHERE au_id NOT IN
  (SELECT au_id
   FROM title_authors);

--11----

SELECT CONCAT(au_fname,' ',au_lname) as 'No history books'
FROM authors
WHERE au_id IN
  (SELECT au_id
   FROM title_authors
   WHERE title_id NOT IN
     (SELECT title_id 
     FROM titles
     WHERE type='history'));

--12----

SELECT CONCAT(au_fname,' ',au_lname)
FROM authors
WHERE au_id IN
(SELECT au_id
   FROM title_authors
   WHERE title_id IN
     (SELECT title_id 
		 FROM titles   
		 WHERE price =
			 (SELECT MIN(price) 
			 FROM titles)));

--13----

SELECT CONCAT(au_fname,' ',au_lname)
FROM authors
WHERE au_id IN
(SELECT au_id
   FROM title_authors
   WHERE title_id IN
     (SELECT title_id 
		 FROM titles   
		 WHERE price =
			 (SELECT MAX(price) 
			 FROM titles)));

--14----

SELECT au_id, title_id
FROM title_authors
WHERE title_id IN
   (SELECT title_id
    FROM titles
    WHERE price>
		(SELECT AVG(price)
			FROM titles
			WHERE type = 'psychology'));

--15----

SELECT title_name, price
    FROM titles
    WHERE price>
		(SELECT AVG(price)
			FROM titles);

--16----

SELECT title_name, price
    FROM titles
    WHERE price>
		(SELECT MAX(price)
			FROM titles
			WHERE type = 'computer');

--17----
			
SELECT CONCAT(au_fname,' ',au_lname)
FROM authors
WHERE au_id IN
(SELECT au_id
   FROM title_authors
   WHERE title_id IN
     (SELECT title_id 
		 FROM titles   
		 WHERE price >
			 (SELECT MIN(price) 
				FROM titles
				WHERE type = 'computer')));	

--18----

SELECT title_name, price, (price/pages) as '$/page'
    FROM titles
    WHERE price>
		(SELECT MIN(price/pages)
			FROM titles) ORDER BY (price/pages) ASC LIMIT 1;

--19----fix--------

SELECT CONCAT(t1.au_fname,' ',t1.au_lname), 
t3.title_name, t3.sales*t3.price AS 'Earnings'
FROM authors t1
INNER JOIN title_authors t2
ON t1.au_id = t2.au_id
INNER JOIN titles t3
ON t2.title_id = t3.title_id
WHERE t3.sales*t3.price < 
	(SELECT MIN(t3.sales*t3.price)
			FROM titles t3);
				
-----20----fix--------

SELECT CONCAT(a.au_fname,' ',a.au_lname) AS "Author's name", a.address
FROM authors a
WHERE EXISTS
(SELECT * FROM title_authors ta
INNER JOIN titles t
ON t.title_id = ta.title_id
WHERE ta.au_id = a.au_id
AND t.title_id = 'T09')
	

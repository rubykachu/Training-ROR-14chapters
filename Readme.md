### I.BASIC SELECT
#### 1.Revising the Select Query I
> Query all columns for all American cities in CITY with populations larger than 100000. The CountryCode for America is USA.

```SELECT * FROM CITY WHERE COUNTRYCODE = 'USA' AND POPULATION > 100000;```
#### 2.Revising the Select Query II
>Query the names of all American cities in CITY with populations larger than 120000. The CountryCode for America is USA.

```SELECT NAME FROM CITY WHERE POPULATION > 120000 AND COUNTRYCODE = "USA";```

#### 3.Select All 
>Query all columns (attributes) for every row in the CITY table.

```SELECT * FROM CITY```
#### 4.Select By ID
>Query all columns for a city in CITY with the ID 1661.

```SELECT * FROM CITY WHERE ID = 1661;```
#### 5.Japanese Cities' Attributes
>Query all attributes of every Japanese city in the CITY table. The COUNTRYCODE for Japan is JPN.
```SELECT * FROM CITY WHERE COUNTRYCODE = 'JPN';```
### II.BASIC JOIN
#### 1.Asian Population
>Given the CITY and COUNTRY tables, query the sum of the populations of all cities where the CONTINENT is 'Asia'.

```SELECT SUM(City.Population) FROM City JOIN Country ON City.COUNTRYCODE=Country.Code WHERE Country.Continent='Asia';```
#### 2.African Cities
>Given the CITY and COUNTRY tables, query the names of all cities where the CONTINENT is 'Africa'.

```SELECT CITY.NAME FROM CITY JOIN Country ON CITY.COUNTRYCODE = COUNTRY.CODE WHERE Country.Continent='Africa';```

#### 3.Average Population of Each Continent
>Given the CITY and COUNTRY tables, query the names of all the continents (COUNTRY.Continent) and their respective average city populations (CITY.Population) rounded down to the nearest integer.

```SELECT COUNTRY.CONTINENT, FLOOR(AVG(CITY.POPULATION)) FROM CITY JOIN COUNTRY ON CITY.COUNTRYCODE = COUNTRY.CODE GROUP BY COUNTRY.CONTINENT;```

#### 4.Ollivander's Inventory
>Harry Potter and his friends are at Ollivander's with Ron, finally replacing Charlie's old broken wand.
Hermione decides the best way to choose is by determining the minimum number of gold galleons needed to buy each non-evil wand of high power and age. Write a query to print the id, age, coins_needed, and power of the wands that Ron's interested in, sorted in order of descending power. If more than one wand has same power, sort the result in order of descending age.

```SELECT w.id, wp.age,w.coins_needed,w.power FROM Wands w JOIN Wands_Property wp ON w.code=wp.code WHERE w.coins_needed IN ( SELECT MIN(coins_needed) FROM Wands wan WHERE wan.code = wp.code AND wp.is_evil = 0 GROUP BY wan.power ) ORDER BY w.power DESC,wp.age DESC;```

### III.DRAW THE TRIANGLE 
#### 1. Draw The Triangle 1
>P(R) represents a pattern drawn by Julia in R rows. The following pattern represents P(5):
* * * * * 
* * * * 
* * * 
* * 
*
Write a query to print the pattern P(20).

```set @NUMBER:= 21; 
SELECT REPEAT('* ', @NUMBER := @NUMBER - 1) FROM information_schema.tables;```

#### 2. Draw The Triangle 2
>P(R) represents a pattern drawn by Julia in R rows. The following pattern represents P(5):
* 
* * 
* * * 
* * * * 
* * * * *
Write a query to print the pattern P(20).

```SET @number = 0;
SELECT REPEAT('* ', @number := @number + 1) FROM information_schema.tables LIMIT 20;```
### IV.ADVANCED SELECT
#### 1.The PADS
```SELECT CONCAT(name, '(', LEFT(occupation, 1), ')') FROM occupations ORDER BY name;
SELECT CONCAT('There are total ',COUNT(occupation),' ', LOWER(occupation),'s.') FROM occupations GROUP BY occupation ORDER BY COUNT(occupation), occupation;```





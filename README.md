DB = MongoDB

/

index.html

---------------------------
|	        login register|
|			              |
|	  search	          |
|			              |
|			              |
---------------------------

search  = /search

/search?option=daum | allrecipes | server DB&keyword=word	

http://m.cook.miznet.daum.net/recipe/dishGroupRecipeList?dishId=311
http://allrecipes.kr/recipes/fish.aspx
and server DB

/register

(Booststrap Sign-in example.)

id , password (sha-512)

/login 

(Booststrap Sign-in example.)

id, password

/load?code=hex

/write

/edit?code=hex

Article = JSON

{
    ingredients : [ingredients1, ingredients2 , ...],
    recipe = [step1,step2 ...],
}

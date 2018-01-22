ReSeaPe
=======

What is ReSeaPe?
----------------

레씨피는 음식의 레시피를 저장, 공유하는 위키입니다.
레씨피는 철저한 익명 서비스를 제공합니다.

How to download?
----------------

레씨피는 두 가지 방식으로 실행이 가능합니다.

1.git clone https://github.com/ENvironmentSet/ReSeaPe.git

2.docker pull environmentset/reseape

How to execute?
---------------

git으로 다운한 경우 :  cd ReSeaPe ; npm install ; npm start

docker 의 경우 : docker run -p 8080:8080 -d environmentset/reseape

또한 MongoDB가 localhost:27017에 있어야 합니다.

mongodb 세팅


use MAXIM
db.createCollection("USERS")
db.createCollection("ARTICLES")

How to make extends?
--------------------

차후 외부 REST API를 제공할 예정이며.
내부 스크립트에서도 API를 제공할 예정입니다.
(그와 동시에 npm에 올라갑니다.)

그 외 사항은 나중에 작성하겠습니다.
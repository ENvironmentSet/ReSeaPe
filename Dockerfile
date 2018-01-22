FROM node:latest
# 앱 디렉터리 생성
RUN mkdir -p /usr/src/ReSeaPe
WORKDIR /usr/src/ReSeaPe
# 앱 의존성 설치
COPY package*.json ./
RUN npm install
#소스 코드 복사
COPY . .
#docker 데몬 포트 지정
EXPOSE 8080

CMD [ "npm", "start" ]
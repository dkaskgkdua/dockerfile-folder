# docker run -p 5000:8088 dkaskgkdua/nodejs
# build한걸 8088포트로 세팅하고 로컬호스트 5000 온걸 8088로 쏴줌
FROM node:10

# 작업폴더 명시(어플리케이션과 관련된 소스들)
# root에 없어야할 파일들을 특정 폴더에 세팅
WORKDIR /usr/src/app

# package.json을 도커파일 ./에 넣어준다.
COPY package.json ./

# 도커는 위의 package.json의 카피정보를 바탕으로 npm install을 한다
# 소스변경만 했을 경우 의존성 다운 안함
RUN npm install
# 파일들을 도커파일 ./에 넣어준다.
COPY ./ ./

CMD ["node","server.js"]

#docker build -t dkaskgkdua/nodejs ./
#docker run -d -p 4000:8088 dkaskgkdua/nodejs

# shell 계속 입력하기
# docker run -it dkaskgkdua/nodejs sh

# volume을 사용해서 각 소스들을 매핑 (소스코드를 바꾸면 바로 반영하게끔) powershell 에선 ${cwd}로 작동
# docker run -d -p 5000:8088 -v /usr/src/app/node_modules -v ${cwd}:/usr/src/app dkaskgkdua/nodejs
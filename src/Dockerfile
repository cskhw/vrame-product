# image
FROM node:16

# WORKDIR은 명력을 실행하기 위한 디렉토리를 설정합니다.
WORKDIR /usr/src/node

# root 폴더에 있는 package-lock.json를 /usr/src/node 복제합니다
COPY yarn.lock /usr/src/node
# root 폴더에 있는 package.json를 /usr/src/node 복제합니다
COPY package.json /usr/src/node
# package.json에 있는 module을 install합니다
RUN yarn

# node_modules가 설치 된 이후 root(.) directory전체를 복제합니다.
COPY . /usr/src/node

# script를 실행합니다.
CMD ["npm","run","start"]
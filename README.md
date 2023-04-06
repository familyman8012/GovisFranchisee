# GovisFranchisee Ver.2.0

## 실행 방법
~~~
sh deploy.sh

~~~

## 빌드 방법
### 개발서버
- 최초 빌드
~~~
yarn start-first:dev
~~~
- 최초 빌드 이후 운영
~~~
yarn start-eco:dev
~~~

### 운영서버
- 최초 빌드
~~~
yarn start-first
~~~
- 최초 빌드 이후 운영
~~~
yarn start-eco
~~~


## 서버 환경 구성
### nvm 설치
~~~
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
source ~/.bash_profile
~~~

### nodejs / npm 설치
~~~
nvm install --lts
~~~


### yarn 설치
~~~
npm install -g yarn
~~~
### pm2 설치
~~~
npm install -g pm2
~~~


### 의존성 페키지 설치 
~~~
sudo yarn install
~~~


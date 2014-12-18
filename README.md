# 공찰래리그 admin

## 공찰래리그란?

2011년부터 시작된 경기 여주지역의 아마추어 리그다.

현재 2014시즌은 승성회의 우승으로 끝이나고 2015시즌을 준비중이다.

[facebook page](https://www.facebook.com/shallwefootball)

[facebook group yeoju](https://www.facebook.com/groups/shallwefootball.yeoju/)


## 공찰래리그 admin 이란?
공찰래리그의 경기기록을 효율적으로 관리하기위해 개발이 되었다.

경기운영과 기록에 관한 개발은 마무리된 상태이며 사용자 권한 등 여러가지의 이슈가 남아있는 상태이다.

## 설치

누구든 공찰래리그 admin을 설치, 사용할 수 있으며 공찰래리그와 같은 시스템의 리그를 개최하고 관리할 수 있다.

이를통해 공찰래리그의 문화가 확산되길 기대한다.

1. nodejs & mysql이 설치되어있어야 합니다.
2. 저장소 가져오기 : `$ git clone https://github.com/shallwefootball/web_admin.git`
3. db 생성 : `db.sql`을 import한다.
4. module 설치 : `$ cd web_admin && npm install`
5. 사용자 설정 : `$ mv ./app/config/config222.js ./app/config/config333.js`
6. 서버시작 : `$ node server.js`


### global client plugin
- [bootstrap3 yeti theme](http://bootswatch.com/yeti/) - Yeti. A friendly foundation.
- [jQuery UI Touch Punch](http://touchpunch.furf.com/) - Touch Event Support for jQuery UI. Tested on iPad, iPhone, Android and other touch-enabled mobile devices.

### specific client plugin
- [bootstrapvalidator](http://bootstrapvalidator.com/) - Best jQuery plugin to validate form fields. Designed to use with Bootstrap 3+


### 기능소개
- 선수로그인
- 선수등록(회원가입)
- 참가하고싶은 리그에서 팀 생성
- 팀을 생성한 선수는 선수임과 동시에 팀 관리자.


![db-erd](docs_images/db_erd.png "디비 구조")



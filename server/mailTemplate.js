Accounts.emailTemplates.siteName = "shallwefootball.com";
Accounts.emailTemplates.from = "공찰래 Amos<amos@shallwefootball.com>";
Accounts.emailTemplates.verifyEmail.subject = function (user) {
    return user.profile.name + "님 반갑습니다. 공찰래리그입니다.⚽️"
};
Accounts.emailTemplates.verifyEmail.text = function (user, url) {
   return "2016년 공찰래리그에 선수등록을 위한 절차입니다."
     + " 등록을 마무리지으려면 아래에 링크를 클릭하여주세요. ✔️ :\n\n"
     + url;
};
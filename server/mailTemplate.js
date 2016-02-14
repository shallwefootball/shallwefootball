Accounts.emailTemplates.siteName = "shallwefootball.com";
Accounts.emailTemplates.from = "2016공찰래리그<amos@shallwefootball.com>";
Accounts.emailTemplates.verifyEmail.subject = function (user) {
  return user.playerName + "님 반갑습니다. 공찰래리그입니다.⚽️";
};
Accounts.emailTemplates.verifyEmail.text = function (user, url) {
    return "2016공찰래리그에 선수등록을 위한 이메일인증 절차입니다.\n\n"
    + " 등록을 완료하려면 아래에 링크를 클릭하세요! ✔️ :\n\n"
    + url;
};



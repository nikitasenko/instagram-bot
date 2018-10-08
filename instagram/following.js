let Instagram = require('instagram-nodejs-without-api');
const acc_names = require('../accaunt_names');
Instagram = new Instagram();

async function startFollow(acc_names) {
   await acc_names.forEach(async name => {
    const user = await Instagram.getUserDataByUsername(name);
    await Instagram.follow(user.graphql.user.id,1);
  });

   setTimeout(async function f() {
     await acc_names.forEach(async name => {
       const user = await Instagram.getUserDataByUsername(name);
       await Instagram.follow(user.graphql.user.id,0);
     });
   }, 60000);
}

async function start() {
  Instagram.getCsrfToken().then((csrf) =>
  {
    Instagram.csrfToken = csrf;
  }).then(() => {
    console.log(process.env.USER_NAME);
    console.log(process.env.USER_PASSWORD);
    return Instagram.auth(process.env.USER_NAME, process.env.USER_PASSWORD).then(async sessionId => {
      Instagram.sessionId = sessionId;
      await startFollow(acc_names.names);
    }).catch(console.error);
  });
}

module.exports = {
  start
};

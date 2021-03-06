let Instagram = require('./library');
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
    return Instagram.auth(process.env.NAME, process.env.PASS).then(async sessionId => {
      Instagram.sessionId = sessionId;
      console.log(new Date(Date.now()));
      console.log(process.env.NAME, process.env.PASS);
      console.log('sessionId ' + sessionId);
      await startFollow(acc_names.names);
    }).catch(console.error);
  });
}

module.exports = {
  start
};


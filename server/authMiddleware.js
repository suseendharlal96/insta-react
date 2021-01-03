const jwt = require("jsonwebtoken");

const auth = (context) => {
  // console.log(context.req.headers.authorization);
  const token = context.req.headers.authorization.split(" ")[1];
  if (token) {
    const user = jwt.verify(token, "secretkey");
    // console.log(user);
    context.req.userId = user ? user.id : null;
    return context.req;
  }
};

module.exports = auth;

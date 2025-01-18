import passport from "passport";

export const isAuth = (req, res, next) => {
  return passport.authenticate("jwt");
};

export const sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

export const removeUserId = (user) => {
  return { name: user.name, email: user.email, role: user.role };
};

export const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

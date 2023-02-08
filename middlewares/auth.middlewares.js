const { getAuthReference } = require("../config/firebase");
const auth = getAuthReference();

module.exports = {
  verifyToken: async (req, res, next) => {
    const header = req.headers?.authorization;
    if (
      header !== "Bearer null" &&
      req.headers?.authorization?.startsWith("Bearer ")
    ) {
      const idToken = req.headers.authorization.split("Bearer ")[1];

      try {
        const decodedToken = await auth.verifyIdToken(idToken);
        req["currentUser"] = decodedToken;
      } catch (err) {
        console.log(err);
      }
    }

    next();
  },
};

import jwt from "jsonwebtoken";

export const sendCookie = (user,res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id },process.env.APP_SECRET_KEY);

  res.status(statusCode)
    .json({
      success: true,
      message,
      token
    });
};
export default sendCookie;

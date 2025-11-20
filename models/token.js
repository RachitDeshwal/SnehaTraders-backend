import jwt from "jsonwebtoken";

const getToken = async (userId) => {
  try {
    let token = await jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return token;
  } catch (e) {
    console.log(e);
  }
};
const getToken1 = async (email) => {
  try {
    let token = await jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return token;
  } catch (e) {
    console.log(e);
  }
};

export { getToken, getToken1 };

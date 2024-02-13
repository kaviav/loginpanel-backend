import Admin from "../models/Admin";
import CryptoJS from "crypto-js";

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  const newAdmin = new Admin({
    username,
    email,
    password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
  });

  let admin;
  try {
    admin = await newAdmin.save();
    console.log(admin);
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json(admin);
};

//////////////

export const login = async (req, res) => {
  const { username, password } = req.body;
  let admin;
  try {
    admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json("wrong username!");
    }
    //
    const hashedPassword = CryptoJS.AES.decrypt(
      admin.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8); //charcode; to convert to ourcode character
    const inputPassword = req.body.password;
    inputPassword !== originalPassword &&
      res.status(401).json("wrong password!");
    //

    return res.status(200);
  } catch (err) {
    console.log(err);
  }
};

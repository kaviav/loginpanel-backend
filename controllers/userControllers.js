import User from "../models/User";

export const addUser = async (req, res) => {
  const { username, email, address } = req.body;
  const newUser = new User({
    username,
    email,
    address,
  });

  let user;
  try {
    user = await newUser.save();
    console.log(user);
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json(user);
};

export const getAll = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Send the users as a JSON response
    res.json(users);
  } catch (error) {
    // If there's an error, send an error response
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get varius user Statuses

export const userStats = async (req, res, next) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//
//ate.setFullYear(date.getFullYear() - 1): This part of the code subtracts 1 from the year of the date object using the setFullYear method. It effectively changes the year of the date object to be one year earlier than it was before.

//The Advanced Encryption Standard (AES) is a U.S. Federal Information Processing Standard (FIPS). It was selected after a 5-year process where 15 competing designs were evaluated.
// var encrypted = CryptoJS.AES.encrypt("Message", "Secret Passphrase");
// ​
// var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");
// CryptoJS supports AES-128, AES-192, and AES-256. It will pick the variant by the size of the key you pass in. If you use a passphrase, then it will generate a 256-bit key.
//
/////
// CryptoJS.AES.encrypt("Message", "Secret Passphrase");

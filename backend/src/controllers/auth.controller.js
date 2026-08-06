import User from "../model/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({
        message: "User with this email already exist",
        success: false,
      });
    }

    const saltedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      userName: userName,
      email: email,
      password: saltedPassword,
    });

    res.status(201).json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res
        .status(401)
        .json({ message: "Invalid Password", success: false });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    const { password: _, ...safeUser } = user._doc;

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: safeUser,
        accessToken,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const refreshToken = (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not found" });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          return res
            .status(403)
            .json({ message: "Invalid or expired refresh token" });
        }

        const newAccessToken = generateAccessToken(decoded.id);

        return res.json({ accessToken: newAccessToken });
      },
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Invalid or Expired refresh token" });
  }
};

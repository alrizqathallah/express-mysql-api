import { createUser } from "../models/user.model.js";

export const createNewUser = async (req, res) => {
  const { name, email, address } = req.body;

  // Validasi input
  if (!name || !email || !address) {
    return res.status(400).json({
      success: false,
      message: "Semua field (name, email, address) harus diisi",
      data: null,
    });
  }

  // Validasi format email sederhana
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Format email tidak valid",
      data: null,
    });
  }

  try {
    const result = await createUser({ name, email, address });
    return res.status(201).json({
      success: true,
      message: "User berhasil dibuat",
      data: {
        id: result.insertId,
        name,
        email,
        address,
      },
    });
  } catch (error) {
    // Jangan expose detail error ke client
    return res.status(500).json({
      success: false,
      message: "Gagal membuat user",
      error: "Internal Server Error",
    });
  }
};

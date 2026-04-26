import User from "../models/User.js";
import bcrypt from "bcrypt";

async function ensureDefaultAdmin() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@finaleiradesi.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    const existingAdmin = await User.findOne({
      where: { email: adminEmail },
    });

    if (existingAdmin) {
      console.log("Admin padrão já existe");
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await User.create({
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    console.log(`Admin padrão criado: ${adminEmail}`);
  } catch (error) {
    console.error("Erro ao criar admin padrão:", error);
  }
}

export default ensureDefaultAdmin;

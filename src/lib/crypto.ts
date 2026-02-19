import crypto from "crypto";

const algorithm = "aes-256-cbc";
const secret = process.env.ENCRYPTION_KEY!;

export function encrypt(text: string) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(secret, "hex"),
    iv
  );

  const encrypted = Buffer.concat([
    cipher.update(text),
    cipher.final(),
  ]);

  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

export function decrypt(hash: string) {
  const [ivHex, encryptedHex] = hash.split(":");

  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secret, "hex"),
    Buffer.from(ivHex, "hex")
  );

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedHex, "hex")),
    decipher.final(),
  ]);

  return decrypted.toString();
}

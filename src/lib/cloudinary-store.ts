import { createHash, randomUUID } from "node:crypto";

const cloud = () => process.env.CLOUDINARY_CLOUD_NAME;
const key = () => process.env.CLOUDINARY_API_KEY;
const secret = () => process.env.CLOUDINARY_API_SECRET;
export const cloudinaryConfigured = () => Boolean(cloud() && key() && secret());

function signature(params: Record<string, string>) {
  const canonical = Object.keys(params).sort().map((name) => `${name}=${params[name]}`).join("&");
  return createHash("sha1").update(canonical + secret()).digest("hex");
}

export async function uploadCloudinaryFile(
  file: File,
  folder: string,
  resourceType: "image" | "raw" = "image",
  fixedPublicId?: string,
) {
  if (!cloudinaryConfigured()) throw new Error("Persistent media storage is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in Vercel.");
  const timestamp = String(Math.floor(Date.now() / 1000));
  const publicId = fixedPublicId || randomUUID();
  const params: Record<string, string> = { timestamp, folder, public_id: publicId, overwrite: "true" };
  const form = new FormData();
  form.append("file", file);
  form.append("folder", folder);
  form.append("public_id", publicId);
  form.append("overwrite", "true");
  form.append("timestamp", timestamp);
  form.append("api_key", key()!);
  form.append("signature", signature(params));
  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud()}/${resourceType}/upload`, { method: "POST", body: form });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || "Cloudinary upload failed.");
  return data.secure_url as string;
}

export async function readCloudinaryJson<T>(publicId: string, fallback: T): Promise<T> {
  if (!cloudinaryConfigured()) return fallback;
  const encodedId = publicId.split("/").map(encodeURIComponent).join("/");
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud()}/resources/raw/upload/${encodedId}`,
    { headers: { Authorization: `Basic ${Buffer.from(`${key()}:${secret()}`).toString("base64")}` }, cache: "no-store" },
  );
  if (response.status === 404) return fallback;
  if (!response.ok) throw new Error("Unable to read saved portfolio content from Cloudinary.");
  const asset = await response.json();
  const content = await fetch(asset.secure_url as string, { cache: "no-store" });
  if (!content.ok) throw new Error("Saved portfolio content exists but could not be downloaded.");
  return await content.json() as T;
}

export async function writeCloudinaryJson(publicId: string, value: unknown) {
  if (!cloudinaryConfigured()) throw new Error("Persistent content storage is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in Vercel.");
  const timestamp = String(Math.floor(Date.now() / 1000));
  const params = { overwrite: "true", public_id: publicId, timestamp };
  const form = new FormData();
  form.append("file", new Blob([JSON.stringify(value, null, 2)], { type: "application/json" }), publicId.split("/").at(-1) || "content.json");
  form.append("public_id", publicId);
  form.append("overwrite", "true");
  form.append("timestamp", timestamp);
  form.append("api_key", key()!);
  form.append("signature", signature(params));
  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud()}/raw/upload`, { method: "POST", body: form });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || "Could not save portfolio content.");
}

"use server";
import path from "path";
import { promises as fs } from "fs";
export const uploadFileAction = async ({ file }: { file: File }) => {
  const data = await file.arrayBuffer();
  const filepath = path.join(process.cwd(), "tmp", file.name);
  await fs.writeFile(`${process.cwd()}/tmp/${file.name}`, Buffer.from(data));
  return filepath;
};

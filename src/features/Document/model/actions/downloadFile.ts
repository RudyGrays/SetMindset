"use server";
import { promises as fs } from "fs";
import path from "path";

const folderPath = path.join(process.cwd(), "tmp");

export const downloadFileAction = async (filepath: string) => {
  try {
    const fileExists = await fs.stat(filepath).catch(() => false);

    const fileBuffer = await fs.readFile(filepath);
    new Uint8Array(fileBuffer);

    return new Uint8Array(fileBuffer);
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

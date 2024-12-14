"use server";

import { acceptDocument } from "../repo/admin-repo";

export const acceptDocumentAction = async (documentId: number) => {
  const document = await acceptDocument(documentId);
  return document;
};

"use server";

import { getAppSessionServer } from "@/features/Auth/model/lib/get-server-session";
import { uploadFileAction } from "@/features/Document/model/actions/uploadFile";
import { uploadFile } from "@/features/Document/model/Repository/FilesRepo";
import { addSubject } from "@/features/Subject/model/actions/addSubject";

interface Data {
  subject: {
    name: string;
  };
  file: File;
}
export const addSubjectAndFileAction = async ({
  subject: { name },
  file,
}: Data) => {
  const session = await getAppSessionServer();
  const userId = session?.user.id;
  if (!userId) return console.log("опять нету юзер id");
  if (!file) return;
  const filepath = await uploadFileAction({ file: file });
  const newsubject = await addSubject(name, session?.user.id!);

  if (!newsubject) return;

  const newfile = await uploadFile({
    filename: file.name,
    filePath: filepath,
    subjectId: newsubject.id,
    userId: userId,
  });
  console.log(newfile);
  return;
};

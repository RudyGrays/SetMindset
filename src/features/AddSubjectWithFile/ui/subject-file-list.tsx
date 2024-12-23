"use client";

import { useAcceptDocument } from "@/features/Admin/model/hooks/useAcceptDocument";
import FileDownloadButton from "@/features/Document/ui/download-button";
import { Button } from "@/shared/ui/button";
import { ScrollArea } from "@/shared/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { AppAvatar } from "@/widgets/AppAvatar/ui/app-avatar";
import { Document, Subject } from "@prisma/client";
import { useSession } from "next-auth/react";

export interface DocumentWithFile {
  id: number;
  filename: string;
  filePath: string;
  isOk: boolean;
}

export interface SubjectWithDocuments {
  id: number;
  name: string;
  documents: DocumentWithFile[];
}

export interface UserWithSubjects {
  id: string;
  subjects: SubjectWithDocuments[];
}

export const SubjectAndFileList = ({ list }: { list: any }) => {
  const { acceptDocumentMutate } = useAcceptDocument();

  const session = useSession();
  const isAdmin = session.data?.user.role === "ADMIN";
  return (
    <div className="max-h-full h-full ">
      <Table>
        <TableCaption>A list of users subjects</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Subject</TableHead>
            <TableHead>Filename</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Download</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list?.subjects &&
            list.subjects?.map((subject: SubjectWithDocuments) => {
              return (
                <TableRow
                  className="bg-accent overflow-auto custom-scrollbar"
                  key={subject.id}
                >
                  <TableCell className="first-letter:uppercase">
                    {subject.name}
                  </TableCell>
                  <TableCell>{subject.documents[0].filename}</TableCell>
                  <TableCell>
                    <Button
                      variant={"ghost"}
                      onClick={() => {
                        if (subject.documents[0].isOk || !isAdmin) return;
                        acceptDocumentMutate({
                          documentId: subject.documents[0].id,
                        });
                      }}
                    >
                      {isAdmin && !subject.documents[0].isOk
                        ? "Accept"
                        : isAdmin
                        ? "Accepted"
                        : subject.documents[0].isOk
                        ? "Accepted"
                        : "Not accepted"}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <FileDownloadButton
                      filepath={subject.documents[0].filePath}
                      filename={subject.documents[0].filename}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

"use client";

import { SubjectWithDocuments } from "@/features/AddSubjectWithFile/ui/subject-file-list";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

export const SelectSubject = ({
  items,
  handleChangeSubject,
  currentSubjectId,
}: {
  items: SubjectWithDocuments[];
  currentSubjectId: string;
  handleChangeSubject: (subjectId: string) => void;
}) => {
  return (
    <Select value={currentSubjectId} onValueChange={handleChangeSubject}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Subjects</SelectLabel>
          {items.map((subject) => {
            if (!subject.documents[0].isOk) return;
            return (
              <SelectItem
                onSelect={() => handleChangeSubject(String(subject.id))}
                key={subject.id}
                value={subject.id}
              >
                <p className="first-letter:uppercase">{subject.name}</p>
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

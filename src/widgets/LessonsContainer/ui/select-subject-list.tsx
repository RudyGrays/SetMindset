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
import { Subject } from "@prisma/client";

export const SelectSubjectList = ({
  items,
  handleChangeSubject,
  currentSubjectId,
}: {
  items: any[];
  currentSubjectId?: string;
  handleChangeSubject: (subjectId: string) => void;
}) => {
  return (
    <Select value={currentSubjectId} onValueChange={handleChangeSubject}>
      <SelectTrigger className="w-[170px]">
        <SelectValue placeholder="Select a subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Subjects</SelectLabel>
          {items.map((subject) => {
            return (
              <SelectItem
                onSelect={() => handleChangeSubject(subject.id)}
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

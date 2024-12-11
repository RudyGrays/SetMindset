"use client";
import { UserEntity } from "@/features/Auth/model/types/User";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/ui/form";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/ui/input";
import { Error } from "@/shared/ui/error";
import { AppAvatar } from "@/widgets/AppAvatar/ui/app-avatar";
import { Avatar } from "@/shared/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { AvatarField } from "./avatar-field";
import { Button } from "@/shared/ui/button";
import { useUpdateProfile } from "@/features/Auth/model/hooks/use-update-profile";
import { Spinner } from "@/shared/ui/spinner";

const MAX_FILE_SIZE = 2 * 1024 * 1024; //2mb

const profileSchema = z.object({
  name: z
    .string()
    .min(2, "Имя должно содержать минимум 2 символа")
    .max(25, "Имя должно содержать максимум 25 символов")
    .nullable()
    .optional(),
  image: z.string().optional().nullable(),
});

export const EditableProfileCard = ({ user }: { user: UserEntity }) => {
  const form = useForm({
    resolver: zodResolver(profileSchema),
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: {
      name: user.name,
      image: user.image,
    },
  });
  const { profileMutate, data, isPending } = useUpdateProfile();

  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    profileMutate({
      userId: user.id!,
      name: values.name!,
      image: values.image!,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Профиль</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <FormField
              name="image"
              disabled
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Аватар</FormLabel>
                  <FormControl>
                    <AvatarField
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Имя пользователя..." />
                  </FormControl>
                  <Error error={fieldState.error} />
                </FormItem>
              )}
            />

            <Button disabled={isPending} type="submit" className="w-max mt-5">
              {isPending ? <Spinner /> : "Сохранить"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

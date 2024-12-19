"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../actions/update-profile";
import { useToast } from "@/shared/hooks/use-toast";
import { redirect } from "next/navigation";
import { getSession, signIn, useSession } from "next-auth/react";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const session = useSession();
  const isAdmin = session.data?.user.role === "ADMIN";
  const { toast } = useToast();
  const {
    mutate: profileMutate,
    data,
    isPending,
  } = useMutation({
    mutationFn: async (profile: {
      userId: string;
      name?: string;
      image?: string;
    }) => {
      return await updateProfile({ ...profile, isAdmin });
    },
    onSuccess: async (data) => {
      queryClient.invalidateQueries({
        queryKey: ["profile", data],
      });
      toast({
        title: "Профиль успешно изменен!",
      });

      await signIn("email", { redirect: false });
    },
  });

  return {
    profileMutate,
    data,
    isPending,
  };
};

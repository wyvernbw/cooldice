"use client";

import { z } from "zod";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense, useState } from "react";
import { hostRoom, joinRoom, RoomResponse } from "@/actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

export const hostRoomSchema = z.object({
  username: z.string().min(3),
});
export type HostRoomProps = z.infer<typeof hostRoomSchema>;

export const joinRoomSchema = z
  .object({
    joinRoomId: z.string().min(6),
  })
  .and(hostRoomSchema);
export type JoinRoomProps = z.infer<typeof joinRoomSchema>;

const RoomForm = () => {
  const formSchema = z.object({
    username: z.string().min(3),
    joinRoomId: z.string().length(8).optional(),
  });
  type FormSchema = z.infer<typeof formSchema>;
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onHostSubmit = async (data: FormSchema) => {
    const res = await hostRoom(data);
    console.log(res);
    setJoinState(res);
  };

  const onJoinSubmit = async (data: FormSchema) => {
    if (data.joinRoomId) {
      const res = await joinRoom({
        joinRoomId: data.joinRoomId,
        username: data.username,
      });
      setJoinState(res);
    }
  };

  const [joinState, setJoinState] = useState<RoomResponse>();

  return (
    <Form {...form}>
      <form className="flex flex-col gap-3">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <div className="my-4 flex items-center gap-1">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Username" />
                </FormControl>
              </div>
            </FormItem>
          )}
        />

        <div className="flex gap-1">
          <FormField
            control={form.control}
            name="joinRoomId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Join Room ID" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button onClick={form.handleSubmit(onJoinSubmit)}>Join Room</Button>
        </div>

        <div className="grid grid-cols-3 items-center justify-center gap-1">
          <Separator className="" />
          <span className="text-center">OR</span>
          <Separator className="" />
        </div>
        <Button onClick={form.handleSubmit(onHostSubmit)}>Host Room</Button>
        <span className="text-red-400">
          {
            // @ts-ignore
            joinState?.error
          }
        </span>
      </form>
    </Form>
  );
};
export default RoomForm;

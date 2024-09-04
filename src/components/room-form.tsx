"use client";

import { z } from "zod";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense } from "react";
import { hostRoom, joinRoom } from "@/actions";

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
  const formSchema = hostRoomSchema.or(joinRoomSchema);
  type FormSchema = z.infer<typeof formSchema>;
  const { register, handleSubmit, formState } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onHostSubmit = async (data: HostRoomProps) => {
    const res = await hostRoom(data);
    console.log(data);
  };

  const onJoinSubmit = async (data: FormSchema) => {
    if (!("joinRoomId" in data)) return;
    const res = await joinRoom(data);
    console.log(data);
  };

  return (
    <form className="flex flex-col gap-4">
      <div className="my-4 flex items-center gap-2">
        <Label>Username</Label>
        <Input {...register("username")} placeholder="Username" />
      </div>
      <div className="flex gap-2">
        <Input {...register("joinRoomId")} placeholder="Join Room ID" />
        <Button onClick={handleSubmit(onJoinSubmit)}>Join Room</Button>
      </div>
      <div className="grid grid-cols-3 items-center justify-center gap-2">
        <Separator className="" />
        <span className="text-center">OR</span>
        <Separator className="" />
      </div>
      <Button onClick={handleSubmit(onHostSubmit)}>Host Room</Button>
    </form>
  );
};
export default RoomForm;

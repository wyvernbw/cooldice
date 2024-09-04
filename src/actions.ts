"use server";

import { z } from "zod";
import { HostRoomProps, JoinRoomProps } from "./components/room-form";

export async function hostRoom({ username }: HostRoomProps) {
  await new Promise((res) => setTimeout(res, 1000));
  console.log("hosting room: ", username);
}

export async function joinRoom({ joinRoomId }: JoinRoomProps) {
  await new Promise((res) => setTimeout(res, 1000));
  console.log("joining room: ", joinRoomId);
}

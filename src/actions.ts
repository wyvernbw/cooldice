"use server";

import { z } from "zod";
import { customAlphabet } from "nanoid";
import { HostRoomProps, JoinRoomProps } from "./components/room-form";
import { error } from "console";

const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 8);
type User = {
  name: string;
  id: string;
};

type Room = {
  id: string;
  host: User;
  users: User[];
};
type ServerState = {
  rooms: Room[];
};

let state: ServerState = {
  rooms: [],
};

export type RoomResponse = { result: Room } | { error: string };
export async function hostRoom({ username }: HostRoomProps) {
  //await new Promise((res) => setTimeout(res, 1000));
  const room = {
    id: nanoid(),
    host: {
      name: username,
      id: nanoid(),
    },
    users: [],
  };
  state.rooms.push(room);
  console.log(
    "hosted room with id: ",
    room.id,
    ", rooms: ",
    state.rooms.length,
  );
  return { result: room };
}

export async function joinRoom({ joinRoomId }: JoinRoomProps) {
  const room = state.rooms.find((room) => room.id === joinRoomId);
  if (!room) {
    return {
      error: "Room not found",
    };
  }
  return { result: room };
}

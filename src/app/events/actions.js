"use server";

import { dbHelper } from "@/utils/dbHelper";

export async function createEvent(data) {
  return await dbHelper.insertEvent(data);
}

export async function getEvents() {
  return await dbHelper.getEvents();
}

export async function getEventById(id) {
  return await dbHelper.getEventById(id);
}

export async function updateEvent(id, data) {
  return await dbHelper.updateEvent(id, data);
}

export async function deleteEvent(id) {
  return await dbHelper.deleteEvent(id);
}

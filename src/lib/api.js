export async function getEventById(id) {
  const res = await fetch(`http://localhost:3000/api/events/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Ошибка загрузки эвента");
  }

  return res.json();
}

export async function getAllEvents() {
  const res = await fetch("http://localhost:3000/api/events", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Ошибка загрузки эвентов");
  }

  return res.json();
}

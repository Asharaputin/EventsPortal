self.onmessage = function (e) {
  const { events, sortKey } = e.data;

  const sorted = [...events].sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    return a[sortKey].localeCompare(b[sortKey]);
  });

  self.postMessage(sorted);
};

self.onmessage = function (e) {
  const { events, sortKey } = e.data;

  const sorted = [...events].sort((a, b) =>
    a[sortKey].localeCompare(b[sortKey]),
  );

  self.postMessage(sorted);
};

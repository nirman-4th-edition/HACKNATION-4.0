export const handleSSEConnection = (res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  return {
    send: (data) => {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    },
    close: () => {
      res.end();
    },
  };
};

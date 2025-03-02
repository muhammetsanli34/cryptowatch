const BINANCE_WS_URL = "wss://stream.binance.com:9443/ws";

export const createBinanceWebSocket = (
  symbol: string,
  onMessage: (data: { symbol: string; price: number }) => void
) => {
  const socket = new WebSocket(`${BINANCE_WS_URL}/${symbol.toLowerCase()}@trade`);

  socket.onopen = () => console.log(`WebSocket connected: ${symbol}`);
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage({
      symbol: data.s, // Binance'ten gelen "s" -> symbol
      price: parseFloat(data.p), // Binance'ten gelen "p" -> price
    });
  };

  socket.onerror = (error) => console.error("WebSocket Error:", error);
  socket.onclose = () => console.log(`WebSocket closed: ${symbol}`);

  return socket;
};

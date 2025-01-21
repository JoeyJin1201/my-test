import { useState, useEffect, useRef } from "react";

const LastPrice = () => {
  const [lastPrice, setLastPrice] = useState(null);
  const [prevPrice, setPrevPrice] = useState(null);
  const wsRef = useRef(null);

  useEffect(() => {
    wsRef.current = new WebSocket("wss://ws.btse.com/ws/futures");

    wsRef.current.onopen = () => {
      wsRef.current.send(
        JSON.stringify({
          op: "subscribe",
          args: ["tradeHistoryApi:BTCPFC"],
        })
      );
    };

    wsRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.topic === "tradeHistoryApi" && message.data.length > 0) {
        const lastTrade = message.data[0];
        const currentPrice = parseFloat(lastTrade.price);

        setLastPrice((prev) => {
          setPrevPrice(prev);
          return currentPrice;
        }); // 更新最新價格
      }
    };

    return () => {
      wsRef.current.close();
    };
  }, []);

  const getPriceStyle = () => {
    if (lastPrice > prevPrice) {
      return {
        container:
          "text-2xl text-[#00b15d] bg-[rgba(16,186,104,0.12)] text-center py-2 my-1",
        arrow: "fill-[#00b15d] rotate-180", // 綠色向上指
      };
    } else if (lastPrice < prevPrice) {
      return {
        container:
          "text-2xl text-[#FF5B5A] bg-[rgba(255,90,90,0.12)] text-center py-2 my-1",
        arrow: "fill-[#FF5B5A] rotate-0", // 紅色向下指
      };
    } else {
      return {
        container:
          "text-2xl text-[#F0F4F8] bg-[rgba(134,152,170,0.12)] text-center py-2 my-1",
        arrow: "invisible", // 白色隱藏箭頭
      };
    }
  };

  const { container, arrow } = getPriceStyle();

  return (
    <div className={container}>
      {lastPrice ? (
        <div className="flex justify-center gap-2 pl-8 items-center">
          <span>{lastPrice.toLocaleString()}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            role="presentation"
            fill="none"
            fill-rule="nonzero"
            stroke="currentColor"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={`${arrow}`}
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default LastPrice;

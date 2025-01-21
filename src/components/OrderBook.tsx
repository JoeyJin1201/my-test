import { useState, useEffect, useRef } from "react";
import QuoteRow from "./QuoteRow";
import LastPrice from "./LastPrice";

const OrderBook = () => {
  const [bids, setBids] = useState<any>([]); // 買方報價
  const [asks, setAsks] = useState<any>([]); // 賣方報價
  const wsRef = useRef<any>(null);

  useEffect(() => {
    wsRef.current = new WebSocket("wss://ws.btse.com/ws/oss/futures");

    wsRef.current.onopen = () => {
      wsRef.current.send(
        JSON.stringify({
          op: "subscribe",
          args: ["update:BTCPFC_0"],
        })
      );
    };

    wsRef.current.onmessage = (event: any) => {
      const message = JSON.parse(event.data);

      if (message.topic === "update:BTCPFC_0") {
        const { bids: newBids, asks: newAsks, type } = message.data;

        if (type === "snapshot") {
          setBids(calculateTotals(sortQuotes(newBids, "desc"), "buy")); // 買方高價到低價
          setAsks(calculateTotals(sortQuotes(newAsks, "desc"), "sell")); // 賣方高價到低價
        } else if (type === "delta") {
          setBids((prev) =>
            calculateTotals(
              sortQuotes(mergeQuotes(prev, newBids), "desc"),
              "buy"
            )
          );
          setAsks((prev) =>
            calculateTotals(
              sortQuotes(mergeQuotes(prev, newAsks), "desc"),
              "sell"
            )
          );
        }
      }
    };

    return () => {
      wsRef.current.close();
    };
  }, []);

  // 排序報價
  const sortQuotes = (quotes, order) => {
    return quotes
      .map(({ price, size }) => ({
        price: parseFloat(price),
        size: parseFloat(size),
      }))
      .sort((a, b) =>
        order === "desc" ? b.price - a.price : a.price - b.price
      )
      .slice(0, 8); // 只顯示前 8 筆
  };

  // 合併報價 (處理 delta 類型數據)
  const mergeQuotes = (prevQuotes, deltaQuotes) => {
    const updatedQuotes = [...prevQuotes];
    deltaQuotes.forEach(([price, size]) => {
      const index = updatedQuotes.findIndex(
        (q) => q.price === parseFloat(price)
      );
      if (index !== -1) {
        if (parseFloat(size) === 0) {
          updatedQuotes.splice(index, 1); // 刪除報價
        } else {
          updatedQuotes[index].size = parseFloat(size); // 更新報價
        }
      } else if (parseFloat(size) > 0) {
        updatedQuotes.push({
          price: parseFloat(price),
          size: parseFloat(size),
        }); // 新增報價
      }
    });

    return updatedQuotes.filter((q) => q.size > 0);
  };

  // 計算累積總量
  const calculateTotals = (quotes, type) => {
    if (type === "buy") {
      // 買方：從上到下累加
      let total = 0;
      return quotes.map((quote) => {
        total += quote.size;
        return { ...quote, total };
      });
    } else if (type === "sell") {
      // 賣方：從下到上累加
      let total = 0;
      return quotes
        .slice()
        .reverse() // 先翻轉順序，從低價到高價處理累積
        .map((quote) => {
          total += quote.size;
          return { ...quote, total };
        })
        .reverse(); // 再翻轉回原始順序（高價到低價顯示）
    }
    return quotes;
  };

  const totalBuySize = bids.length > 0 ? bids[bids.length - 1].total : 0;
  const totalSellSize = asks.length > 0 ? asks[0].total : 0;

  return (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col w-96 bg-[#131b29] border border-[#1e2a38] rounded-lg overflow-hidden text-[#f0f4f8]">
      <div className="flex flex-col">
        <div className="font-bold flex justify-between p-2 bg-[#1e2a38] text-[#8698aa]">
          <span>Price (USD)</span>
          <span>Size</span>
          <span>Total</span>
        </div>
        {/* 賣方報價 */}
        <div className="sellQuotes">
          {asks.map((quote, idx) => (
            <QuoteRow
              key={idx}
              type="sell"
              quote={quote}
              totalSize={totalSellSize}
            />
          ))}
        </div>
        {/* 最新成交價 */}
        <LastPrice />
        {/* 買方報價 */}
        <div className="buyQuotes">
          {bids.map((quote, idx) => (
            <QuoteRow
              key={idx}
              type="buy"
              quote={quote}
              totalSize={totalBuySize}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderBook;

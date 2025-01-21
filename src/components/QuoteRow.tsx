import { useEffect, useState } from "react";

const QuoteRow = ({ type, quote, totalSize }) => {
  const [prevSize, setPrevSize] = useState(quote.size);
  const isBuy = type === "buy";

  useEffect(() => {
    setPrevSize(quote.size);
  }, [quote.size]);

  const getRowStyle = () => {
    if (quote.size > prevSize) {
      return "bg-[rgba(16,186,104,0.2)]";
    } else if (quote.size < prevSize) {
      return "bg-[rgba(255,90,90,0.2)]";
    } else {
      return "";
    }
  };

  // 計算累計總量百分比
  const percentage = (quote.total / totalSize) * 100;

  const getPercentageBarStyle = () => {
    const color = isBuy
      ? "bg-[rgba(16,186,104,0.12)]"
      : "bg-[rgba(255,90,90,0.12)]";
    return `${color} absolute h-[90%] top-[50%] right-0 transform -translate-y-1/2`;
  };

  return (
    <div
      className={`relative grid grid-cols-3 items-center p-2 transition-colors ease-in-out hover:bg-[#1E3059] ${getRowStyle()} ${
        isBuy ? "buyRow text-[#00b15d]" : "sellRow text-[#ff5b5a]"
      }`}
    >
      {/* percentage */}
      <div
        className={getPercentageBarStyle()}
        style={{ width: `${percentage}%` }}
      />
      {/* Price */}
      <span>{quote.price.toLocaleString()}</span>
      {/* Size */}
      <span className="text-[#f0f4f8] justify-self-end">
        {quote.size.toLocaleString()}
      </span>
      {/* Total */}
      <span className="text-[#f0f4f8] justify-self-end">
        {quote.total.toLocaleString()}
      </span>
    </div>
  );
};

export default QuoteRow;

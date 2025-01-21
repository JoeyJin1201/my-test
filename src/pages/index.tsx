import OrderBook from "../components/OrderBook";
import { Roboto, Noto_Sans } from 'next/font/google'

const notoSans = Noto_Sans({
  weight: '500',
  subsets: ['latin'],
})

const OrderBookPage = () => {
  return (
    <div className={notoSans.className}>
      <OrderBook />
    </div>
  );
};

export default OrderBookPage;

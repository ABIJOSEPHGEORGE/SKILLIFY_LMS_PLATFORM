import { loadStripe } from '@stripe/stripe-js';

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe("pk_test_51MyyP5SAHKwRrZGuCJMlFiqCHhoJlCxNnoHGtxl9yGQCAAV2itfkgrSja1kVYfNhR1bi1phsMn5prnpMN3C1yDGB00BjeTakPd");
  }
  return stripePromise;
};

export default getStripe;
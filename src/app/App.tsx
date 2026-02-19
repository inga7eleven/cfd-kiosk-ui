import { useState, useEffect } from 'react';
import EnterRewards from '../imports/EnterRewards';
import CartEvaluationLoggedIn from '../imports/CartEvaluationLoggedIn';
import CancelledMember from '../imports/CancelledMember';

type Screen = 'login' | 'rewards' | 'promotion';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Define all items that will be scanned
const ALL_ITEMS: CartItem[] = [
  { id: 1, name: 'Red Bull Energy Drink', price: 3.99, quantity: 1 },
  { id: 2, name: 'Doritos Nacho Cheese', price: 2.49, quantity: 1 },
  { id: 3, name: 'Coca-Cola 20oz', price: 2.19, quantity: 1 },
  { id: 4, name: 'Snickers Bar', price: 1.79, quantity: 1 },
  { id: 5, name: 'Gatorade Fruit Punch', price: 2.99, quantity: 1 },
  { id: 6, name: "Lay's Classic Chips", price: 2.49, quantity: 1 },
  { id: 7, name: 'Arizona Iced Tea', price: 1.29, quantity: 1 },
  { id: 8, name: 'Kit Kat Bar', price: 1.69, quantity: 1 },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discountApplied, setDiscountApplied] = useState(false);

  // Simulate items being scanned with delays
  useEffect(() => {
    let currentIndex = 0;
    
    const addNextItem = () => {
      if (currentIndex < ALL_ITEMS.length) {
        setCartItems(prev => [...prev, ALL_ITEMS[currentIndex]]);
        currentIndex++;
        
        // Continue adding items with delay
        if (currentIndex < ALL_ITEMS.length) {
          setTimeout(addNextItem, 1500); // 1.5 second delay between scans
        }
      }
    };
    
    // Start adding items after a brief initial delay
    const initialTimeout = setTimeout(addNextItem, 500);
    
    return () => {
      clearTimeout(initialTimeout);
    };
  }, []);

  const handleSaveDiscount = () => {
    setDiscountApplied(true);
    setCurrentScreen('promotion');
  };

  const handlePayFullPrice = () => {
    setDiscountApplied(false);
    setCurrentScreen('promotion');
  };

  return (
    <div className="size-full flex items-center justify-center bg-[#f0f0f0]">
      <div className="w-full h-full max-w-[1280px] max-h-[800px] aspect-[16/10]">
        {currentScreen === 'login' && (
          <EnterRewards cartItems={cartItems} onContinue={() => setCurrentScreen('rewards')} />
        )}
        {currentScreen === 'rewards' && (
          <CartEvaluationLoggedIn 
            cartItems={cartItems} 
            onSaveDiscount={handleSaveDiscount}
            onPayFullPrice={handlePayFullPrice}
          />
        )}
        {currentScreen === 'promotion' && (
          <CancelledMember cartItems={cartItems} discountApplied={discountApplied} />
        )}
      </div>
    </div>
  );
}
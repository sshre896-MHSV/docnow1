import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { MOCK_MEDICINES } from '../constants';
import { Medicine } from '../types';

const MedicineView: React.FC = () => {
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  
  const addToCart = (id: string) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const newCount = (prev[id] || 0) - 1;
      if (newCount <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newCount };
    });
  };

  // Fix: Cast Object.values result to number[] to ensure reduce works with correct types and returns a number
  const totalItems = (Object.values(cart) as number[]).reduce((a, b) => a + b, 0);
  
  const totalPrice = Object.entries(cart).reduce((acc: number, [id, qty]) => {
    const item = MOCK_MEDICINES.find(m => m.id === id);
    return acc + (item ? item.price * (qty as number) : 0);
  }, 0);

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      <div className="flex-1 space-y-6">
        <header className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800">Pharmacy Store</h2>
            <div className="text-sm text-slate-500">Fast delivery to Indiranagar</div>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {MOCK_MEDICINES.map((med) => {
                const qty = cart[med.id] || 0;
                return (
                    <div key={med.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col">
                        <div className="h-32 bg-slate-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                            <img src={med.image} alt={med.name} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition" />
                        </div>
                        <h3 className="font-semibold text-slate-800 text-sm truncate">{med.name}</h3>
                        <p className="text-xs text-slate-500 mb-2">{med.category}</p>
                        <div className="mt-auto flex items-center justify-between">
                            <span className="font-bold text-slate-900">₹{med.price}</span>
                            {qty === 0 ? (
                                <button 
                                    onClick={() => addToCart(med.id)}
                                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            ) : (
                                <div className="flex items-center space-x-2 bg-slate-100 rounded-lg p-1">
                                    <button onClick={() => removeFromCart(med.id)} className="p-1 hover:bg-white rounded"><Minus className="w-3 h-3" /></button>
                                    <span className="text-xs font-bold w-4 text-center">{qty}</span>
                                    <button onClick={() => addToCart(med.id)} className="p-1 hover:bg-white rounded"><Plus className="w-3 h-3" /></button>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
      </div>

      {/* Cart Sidebar */}
      <div className="w-full lg:w-80 bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col h-fit">
         <div className="flex items-center justify-between mb-6">
             <h3 className="font-bold text-slate-800 flex items-center gap-2">
                 <ShoppingCart className="w-5 h-5 text-blue-600" />
                 Your Cart
             </h3>
             <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">{totalItems} items</span>
         </div>

         <div className="flex-1 space-y-4 mb-6">
             {Object.keys(cart).length === 0 ? (
                 <div className="text-center py-10 text-slate-400 text-sm">Cart is empty</div>
             ) : (
                 Object.entries(cart).map(([id, qty]) => {
                     const item = MOCK_MEDICINES.find(m => m.id === id);
                     if(!item) return null;
                     const quantity = qty as number;
                     return (
                         <div key={id} className="flex justify-between items-center text-sm">
                             <div>
                                 <p className="font-medium text-slate-800">{item.name}</p>
                                 <p className="text-xs text-slate-500">₹{item.price} x {quantity}</p>
                             </div>
                             <span className="font-semibold text-slate-900">₹{item.price * quantity}</span>
                         </div>
                     );
                 })
             )}
         </div>

         <div className="border-t border-slate-100 pt-4 space-y-3">
             <div className="flex justify-between text-slate-500 text-sm">
                 <span>Subtotal</span>
                 <span>₹{totalPrice}</span>
             </div>
             <div className="flex justify-between text-slate-500 text-sm">
                 <span>Delivery Fee</span>
                 <span>₹40</span>
             </div>
             <div className="flex justify-between font-bold text-lg text-slate-900 pt-2 border-t border-slate-100">
                 <span>Total</span>
                 <span>₹{totalItems > 0 ? totalPrice + 40 : 0}</span>
             </div>
             
             <button 
                disabled={totalItems === 0}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-200"
             >
                 Checkout
             </button>
         </div>
      </div>
    </div>
  );
};

export default MedicineView;
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router';
import {
  selectCartItems,
  selectCartTotal,
  selectCartIsOpen,
  closeCart,
  removeItem,
  updateQuantity,
  clearCart
} from '../../store/slices/cartSlice';

const CartDrawer = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const isOpen = useSelector(selectCartIsOpen);

  const handleClose = () => {
    dispatch(closeCart());
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={handleClose}
      />

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 h-full w-full max-w-md bg-slate-800 shadow-lg z-50 transform transition-transform duration-300 ease-in-out border-l border-slate-700">
        {/* Header */}
        <div className="p-4 border-b border-slate-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Your Cart</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-4 overflow-y-auto h-[calc(100vh-180px)]">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-500 mb-4" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
              <p className="text-gray-400 text-lg mb-2">Your cart is empty</p>
              <p className="text-gray-500 mb-6">Add some awesome games to get started!</p>
              <button
                onClick={handleClose}
                className="btn-primary"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="flex border-b border-slate-700 pb-4">
                    {/* Product Image Placeholder */}
                    <div
                      className="h-20 w-20 bg-gradient-to-br from-primary-900 to-slate-800 flex items-center justify-center rounded">
                      <span className="text-lg font-bold text-purple-400 opacity-50">GAME</span>
                    </div>

                    {/* Product Details */}
                    <div className="ml-4 flex-grow">
                      <div className="flex justify-between">
                        <h3 className="text-white font-medium">{item.name}</h3>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-gray-400 hover:text-accent transition-colors"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                               stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                          </svg>
                        </button>
                      </div>

                      <p className="text-purple-400 font-bold">${item.price}</p>

                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="text-gray-400 hover:text-white transition-colors"
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                               stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4"/>
                          </svg>
                        </button>

                        <span className="mx-2 w-8 text-center text-white">{item.quantity}</span>

                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="text-gray-400 hover:text-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                               stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                          </svg>
                        </button>

                        <span className="ml-auto text-gray-300">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleClearCart}
                  className="text-gray-400 hover:text-accent text-sm flex items-center transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-slate-700 p-4 bg-slate-900">
            <div className="flex justify-between mb-4">
              <span className="text-gray-300">Subtotal</span>
              <span className="text-white font-bold">${total.toFixed(2)}</span>
            </div>

            <Link
              to="/checkout"
              className="btn-primary w-full text-center block"
              onClick={handleClose}
            >
              Checkout
            </Link>

            <button
              onClick={handleClose}
              className="mt-2 text-center w-full text-gray-400 hover:text-white text-sm"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;

import React, { useState } from 'react';

function CouponComponent (){
    const [coupon, setCoupon] = useState('');

    function handleCouponChange(e){
        setCoupon(e.target.value);
    };

    function applyCoupon(){
        // Logic to apply the coupon
        console.log('Applying coupon:', coupon);
    };

    function updateCart(){
        // Logic to update the cart
        console.log('Updating cart');
    };

    return (
        <div className='flex justify-between items-center mt-4 flex-wrap gap-3'>
            <div className="flex items-center flex-wrap gap-3">
                <input
                    type="text"
                    className="border border-gray-300 p-2 rounded-md shrink sm:shrink-0"
                    placeholder="Coupon code"
                    value={coupon}
                    onChange={handleCouponChange}
                />
                <button
                    className="bg-base-taupe text-white py-2 px-4 rounded-md hover:bg-base-drb"
                    onClick={applyCoupon}
                >
                    APPLY COUPON
                </button>
            </div>
            <button
                className="bg-base-taupe text-white py-2 px-4 rounded-md hover:bg-base-drb"
            >
                UPDATE CART
            </button>
        </div>
    );
};

export default CouponComponent;

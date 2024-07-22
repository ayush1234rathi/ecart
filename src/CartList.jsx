import React from 'react';
import CartRow from './CartRow';

function CartList({ items, handleAddToCart }){
    function handleButtonClick(){
        onAddToCart(id,count);
      }
    function handleUpdate(id, count) {
        handleAddToCart(id, count);
        console.log('Updating cart item:', id, 'with count:', count);
    }
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-2 table-fixed">
                <thead>
                    <tr className='border-y-2'>
                        <th className="py-2 px-4 "></th>
                        <th className="py-2 px-4 ">Product</th>
                        <th className="py-2 px-4 ">Price</th>
                        <th className="py-2 px-4 ">Quantity</th>
                        <th className="py-2 px-4 ">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <CartRow key={item.id} item={item} handleUpdate={handleUpdate}/>
                    ))}
                    {/* <tr>
                        <td>
                            <input />
                        </td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    );
};

export default CartList;

import React from 'react';
import Product from './Product';

function ProductList({ products }) {
  return(
    <div className="flex flex-wrap justify-center sm:gap-2 my-6 ">
      
      {products.map(function (item){
        return(
          <Product 
            key={item.id} {...item} />
        )
      })}
    </div>
  );
}
export default ProductList;
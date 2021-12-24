const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];


function initOrderProducts(){
    
    fetch('http://127.0.0.1:8000/api/orderProducts', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then( res => res.json() )
            .then( data => {
                const lst = document.getElementById('orderProductsList');
                
                data.forEach( el => {
                    lst.innerHTML += `<li>OrderID: ${el.id},
                                        ProductID: ${el.productID},
                                        Quantity: ${el.quantity}</li>`;
                });
            });
}
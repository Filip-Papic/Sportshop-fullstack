const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function initOrders() {
    document.getElementById('findAllOrdersBtn').addEventListener('click', e => {

        fetch('http://127.0.0.1:8000/api/orders', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then( res => res.json() )
            .then( data => {
                const lst = document.getElementById('orderList');
                lst.innerHTML = ``;
                
                data.forEach( el => {
                    lst.innerHTML += `<li>OrderID: ${el.id},
                                        BuyerID: ${el.user.id},
                                        ProductID: ${el.productID}
                                        Quantity: ${el.quantityTotal},
                                        Date: ${el.createdAt}</li>` 
                
                });
            });
    })
        
    document.getElementById('findOrderBtn').addEventListener('click', e => {

        const id =  document.getElementById('findOrderID').value

        document.getElementById('orderList').value = [];

        fetch('http://127.0.0.1:8000/api/orders/' + id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        })
            .then( res => res.json() )
            .then( el => {
                    if(id.length > 0){
                        const lst = document.getElementById('orderList');

                        lst.innerHTML = `<li>ID: ${el.id},
                                            BuyerID: ${el.userID},
                                            Price total: ${el.priceTotal}$,
                                            Quantity: ${el.quantityTotal}, 
                                            Details: ${el.details}</li>`; 
                    }
                });
        })

    document.getElementById('updateOrderBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            id: document.getElementById('updateOrderID').value,
            price: document.getElementById('orderP').value,
            details: document.getElementById('orderD').value,
            quantity: document.getElementById('orderQ').value
        };

        fetch('http://127.0.0.1:8000/api/orders/' + data.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {console.log(data);});
    });

    document.getElementById('deleteOrderBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            id: document.getElementById('delOrderID').value
        };

        fetch('http://127.0.0.1:8000/api/orders/' + data.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then( el => {console.log(data);});
    });
}
/*
    document.getElementById('addOrderBtn').addEventListener('click', e => {
        e.preventDefault();

        fetch('http://127.0.0.1:8000/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            //body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                    document.getElementById('orderList').innerHTML += `<li>OrderID: ${el.id},
                                                                            BuyerID: ${el.userID},
                                                                            ProductID: ${el.productID},
                                                                            Quantity: ${el.quantityTotal}, 
                                                                            </li>`; 
                }
            });
    });
*/
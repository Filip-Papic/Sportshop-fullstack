const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function initOrders() {
    document.getElementById('findAllOrdersBtn').addEventListener('click', e => {

        fetch('http://127.0.0.1:8000/admin/orderProducts', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then( res => res.json() )
            .then( data => {
                const lst = document.getElementById('orderList');
                lst.innerHTML = ``;
            
                data.forEach( el => {
                    console.log(el.userID + ' ' + el.user.id)
                    if(el.userID == el.user.id){
                        lst.innerHTML += `<li>OrderID: ${el.id},
                                        UserID: ${el.user.id},
                                        User name: ${el.user.name},
                                        ProductID: ${el.productID},
                                        Quantity: ${el.quantity}</li>`;
                         }
                });
            });
    })
    
    document.getElementById('findOrderBtn').addEventListener('click', e => {

        const id =  document.getElementById('findOrderID').value

        document.getElementById('orderList').value = [];

        fetch('http://127.0.0.1:8000/admin/orderProducts/' + id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        })
            .then( res => res.json() )
            .then( el => {
                if(el.msg){
                    alert(el.msg);
                } else {
                    if(id.length > 0){
                        const lst = document.getElementById('orderList');

                        lst.innerHTML = `<li>OrderID: ${el.id},
                                            UserID: ${el.user.id},
                                            User name: ${el.user.name},
                                            ProductID: ${el.productID},
                                            Quantity: ${el.quantity}</li>`; 
                    }
                }
            });
        })

    document.getElementById('updateOrderBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            id: document.getElementById('updateOrderID').value,
            productID: document.getElementById('orderID').value,
            quantity: document.getElementById('orderQ').value
        };

        fetch('http://127.0.0.1:8000/admin/orderProducts/' + data.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                    console.log(data);
                }
            });
    });

    document.getElementById('deleteOrderBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            id: document.getElementById('deleteOrderID').value
        };

        fetch('http://127.0.0.1:8000/admin/orderProducts/' + data.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json() )
            .then( data => {
                if (data.msg) {
                    alert(data.msg);
                }
            });
    });
}
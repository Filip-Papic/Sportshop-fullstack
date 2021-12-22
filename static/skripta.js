/*function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://127.0.0.1:8000/api/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('usrLst');

            data.forEach( el => {
                lst.innerHTML += `<li>ID: ${el.id}, 
                                    Name: ${el.name}, 
                                    E-mail: ${el.email}
                                    Adress: ${el.adress}, 
                                    Postal Code: ${el.postalCode}, 
                                    City: ${el.city}, 
                                    Country: ${el.country}</li>`;
            });
        });

    fetch('http://127.0.0.1:8000/api/orders', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('orderList');

            data.forEach( el => {
                lst.innerHTML += `<li>OrderID: ${el.id}, 
                                    UserID: ${el.userID}, 
                                    Price: ${el.priceTotal}$, 
                                    Quantity: ${el.quantityTotal},
                                    Details: ${el.details}</li>`;
            });
        });
    
    document.getElementById('orderBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            body: document.getElementById('productList').value
        };

        fetch('http://127.0.0.1:8000/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                    document.getElementById('orderList').innerHTML += `<li>OrderID: ${el.id}, 
                                                                        Price: ${el.body}$, 
                                                                        Quantity: ${el.quantityTotal},
                                                                        Details: ${el.details},</li>`;
                }
            });
    });
    
    fetch('http://127.0.0.1:8000/api/categories', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('catList');
            
            data.forEach( el => {
                lst.innerHTML += `<li>CategoryID: ${el.id}</li>
                                  <button>${el.name}</button>`;
            });
        });
    
    const catID = [1,2,3,4,5];
    document.getElementById('catList').addEventListener('click', e => {
        e.preventDefault();

        document.getElementById('productList').value = [];

        fetch('http://127.0.0.1:8000/api/products', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then( res => res.json() )
            .then( data => {
                const lst = document.getElementById('productList');
                data.forEach( el => {
                    //if(){
                        lst.innerHTML += `<li>CategoryID: ${el.categoryID}</li>
                                        <button>Name: ${el.name}</button>`;
                    //    }
                    });
            });
        });      

    document.getElementById('orderBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            body: document.getElementById('productList').value
        };

        fetch('http://127.0.0.1:8000/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                    document.getElementById('orderList').innerHTML += `<li>OrderID: ${el.id}, 
                                                                        Price: ${el.body}$, 
                                                                        Quantity: ${el.quantityTotal},
                                                                        Details: ${el.details},</li>`;
                }
            });
    });
    
    //create product
    document.getElementById('orderBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            body: document.getElementById('productList').value
        };

        fetch('http://127.0.0.1:8000/api/admin/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                    document.getElementById('orderList').innerHTML += `<li>OrderID: ${el.id}, 
                                                                        Price: ${el.body}$, 
                                                                        Quantity: ${el.quantityTotal},
                                                                        Details: ${el.details},</li>`;
                }
            });
    });

    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
}
*/
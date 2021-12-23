const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function initMain() {

    document.getElementById('logout').addEventListener('click', e => { 
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    }); 
    document.getElementById('userBtn').addEventListener('click', e => { 
        document.cookie = `token=${token};SameSite=Lax`;
        window.location.href = 'users.html';
    });
    document.getElementById('orderBtn').addEventListener('click', e => { 
        document.cookie = `token=${token};SameSite=Lax`;
        window.location.href = 'orders.html';
    });
    document.getElementById('catBtn').addEventListener('click', e => { 
        document.cookie = `token=${token};SameSite=Lax`;
        window.location.href = 'categories.html';
    });
    document.getElementById('productBtn').addEventListener('click', e => { 
        document.cookie = `token=${token};SameSite=Lax`;
        window.location.href = 'products.html';
    });
}

function initUsers() {
    
    fetch('http://127.0.0.1:8000/api/users', {
        headers: {
        'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('userList');

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

    document.getElementById('deleteUserBtn').addEventListener('click', e => { 
        e.preventDefault();

        const data = {
            body: document.getElementById('userList').value
        };

        fetch('http://127.0.0.1:8000/api/users/:id', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then( res => res.json() )
            .then( el => console.log(el)) 
            .catch(err => console.log(err))
    });
}

function initOrders() {
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
    }






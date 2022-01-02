const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function initProducts() {
    document.getElementById('findAllProductBtn').addEventListener('click', e => {
        
        document.getElementById('productList').value = [];

        fetch('http://127.0.0.1:8000/admin/products', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then( res => res.json() )
            .then( data => {
                const lst = document.getElementById('productList');
                lst.innerHTML = ``;
                
                data.forEach( el => {
                    lst.innerHTML += `<li>ID: ${el.id},
                                        Name: ${el.name},
                                        Category: ${el.categoryID}, 
                                        Manufacturer: ${el.manufacturer}, 
                                        Price: ${el.price}$,
                                        Description: ${el.description},
                                        Size: ${el.size},
                                        Quantity in stock: ${el.quantityStock}</li>`;
                });
            });
        })
        
    document.getElementById('findProductBtn').addEventListener('click', e => {

        const id =  document.getElementById('findProductID').value

        document.getElementById('productList').value = [];

        fetch('http://127.0.0.1:8000/admin/products/' + id, {
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
                    const lst = document.getElementById('productList');

                    lst.innerHTML = `<li>ID: ${el.id},
                                        Name: ${el.name},
                                        Category: ${el.categoryID}, 
                                        Manufacturer: ${el.manufacturer}, 
                                        Price: ${el.price}$,
                                        Description: ${el.description},
                                        Size: ${el.size},
                                        Quantity in stock: ${el.quantityStock}</li>`;
                }
            }
        });
    })

    document.getElementById('addProductBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            name: document.getElementById('productN').value,
            manufacturer: document.getElementById('productM').value,
            price: document.getElementById('productP').value,
            description: document.getElementById('productD').value,
            size: document.getElementById('productS').value,
            quantityStock: document.getElementById('productQ').value,
            categoryID: document.getElementById('productC').value
        };

        fetch('http://127.0.0.1:8000/admin/products', {
            method: 'POST',
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
                    document.getElementById('productList').innerHTML += `<li>ID: ${el.id},
                                                                            Name: ${el.name},
                                                                            Category: ${el.categoryID},
                                                                            Manufacturer: ${el.manufacturer}, 
                                                                            Price: ${el.price}$,
                                                                            Description: ${el.description},
                                                                            Size: ${el.size},
                                                                            Quantity in stock: ${el.quantityStock}</li>`;
                }
            });
    });
    
    document.getElementById('updateProductBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            id: document.getElementById('updateProductID').value,
            name: document.getElementById('productN').value,
            categoryID: document.getElementById('productC').value, 
            manufacturer: document.getElementById('productM').value, 
            price: document.getElementById('productP').value,
            description: document.getElementById('productD').value,
            size: document.getElementById('productS').value,
            quantityStock: document.getElementById('productQ').value
        };

        fetch('http://127.0.0.1:8000/admin/products/' + data.id, {
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

    document.getElementById('deleteProductBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            id: document.getElementById('delProductID').value
        };

        fetch('http://127.0.0.1:8000/admin/products/' + data.id, {
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
    
    document.getElementById('orderBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            productID: document.getElementById('orderProductID').value,
            quantity: document.getElementById('orderQuantity').value
        }

        const data1 = {
            productID: document.getElementById('orderProductID').value,
            quantityTotal: document.getElementById('orderQuantity').value
        };

        fetch('http://127.0.0.1:8000/admin/orderProducts', {
            method: 'POST',
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
                    console.log('Naruceno');
                }
            })
       
  /*      fetch('http://127.0.0.1:8000/admin/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data1)
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                    console.log('Naruceno');
                }
            })
        */ });
}
const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function initUsers() {
    document.getElementById('findAllUsersBtn').addEventListener('click', e => {
        
        document.getElementById('userList').value = [];

        fetch('http://127.0.0.1:8000/admin/users', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then( res => res.json() )
            .then( data => {
                const lst = document.getElementById('userList');
                lst.innerHTML = ``;
                
                data.forEach( el => {
                    lst.innerHTML += `<li>ID: ${el.id},
                                        Name: ${el.name},
                                        Email: ${el.email}, 
                                        Adress: ${el.adress},
                                        Postal code: ${el.postalCode},
                                        City: ${el.city},
                                        Country: ${el.country}</li>`;
                });
            });
        })
        
    document.getElementById('findUserBtn').addEventListener('click', e => {

        const id =  document.getElementById('findUserID').value

        document.getElementById('userList').value = [];

        fetch('http://127.0.0.1:8000/admin/users/' + id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( el => {
            if (el.msg) {
                alert(el.msg);
            } else {
                if(id.length > 0){
                    const lst = document.getElementById('userList');

                    lst.innerHTML = `<li>ID: ${el.id},
                                        Name: ${el.name},
                                        Email: ${el.email}, 
                                        Adress: ${el.adress},
                                        Postal code: ${el.postalCode},
                                        City: ${el.city},
                                        Country: ${el.country}</li>`;
                }
            }
        });
    })
    
    document.getElementById('updateUserBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            id: document.getElementById('updateUserID').value,
            name: document.getElementById('userN').value,
            email: document.getElementById('userE').value, 
            password: document.getElementById('userP').value, 
            adress: document.getElementById('userA').value,
            postalCode: document.getElementById('userPC').value,
            city: document.getElementById('userCI').value,
            country: document.getElementById('userCO').value
        };

        fetch('http://127.0.0.1:8000/admin/users/' + data.id, {
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

    document.getElementById('deleteUserBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            id: document.getElementById('delUserID').value
        };

        fetch('http://127.0.0.1:8000/admin/users/' + data.id, {
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
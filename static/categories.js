const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function initCategories() {
    document.getElementById('findAllCatBtn').addEventListener('click', e => {
        
        document.getElementById('catList').value = [];

        fetch('http://127.0.0.1:8000/api/categories', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then( res => res.json() )
            .then( data => {
                const lst = document.getElementById('catList');
                lst.innerHTML = ``;
                
                data.forEach( el => {
                    lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name} </li>`;
                });
            });
        })
        
    document.getElementById('findCatBtn').addEventListener('click', e => {

        const id =  document.getElementById('findCatID').value

        document.getElementById('catList').value = [];

        fetch('http://127.0.0.1:8000/api/categories/' + id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( el => {
                if(id.length > 0){
                    const lst = document.getElementById('catList');

                    lst.innerHTML = `<li>ID: ${el.id}, Name: ${el.name}</li>`;
                }
            });
        })

    document.getElementById('addCatBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            name: document.getElementById('catN').value
        };

        fetch('http://127.0.0.1:8000/api/admin/categories', {
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
                    document.getElementById('catList').innerHTML += `<li>ID: ${el.id}, Name: ${el.name}</li>`;
                }
            });
    });
    
    document.getElementById('updateCatBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            id: document.getElementById('updateCatID').value,
            name: document.getElementById('catN').value
        };

        fetch('http://127.0.0.1:8000/api/admin/categories/' + data.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {console.log(el);});
    });

    document.getElementById('deleteCatBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            id: document.getElementById('deleteCatID').value
        };

        fetch('http://127.0.0.1:8000/api/admin/categories/' + data.id, {
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
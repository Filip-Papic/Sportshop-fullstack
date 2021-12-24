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
    document.getElementById('orderProductBtn').addEventListener('click', e => { 
        document.cookie = `token=${token};SameSite=Lax`;
        window.location.href = 'orderProducts.html';
    });
}








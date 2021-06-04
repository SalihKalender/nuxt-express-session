const express = require('express');
const app = express();
const session = require('express-session');

app.use(session({
    secret: 'S4L1H K4L3ND3R',
}))

app.get('/products', (req,res) => {
    const products = [
        {
            id: 1,
            name: 'Iphone 11',
            price: 7500,
        },
        {
            id: 2,
            name: 'LG Monitor',
            price: 4800,
        },
        {
            id: 3,
            name: 'Logitech Mouse',
            price: 380,
        },
        {
            id: 4,
            name: '2TB Harddisk',
            price: 3000,
        },
    ]
    res.status(200).json(products);
})

app.post('/add-to-cart',(req,res) => {
    let only_Count = false;
    const cart_Items = req.session.cart_Items ? req.session.cart_Items : [];
    Array.from(cart_Items).forEach((item) => {
        if(item.id == req.body.id) {
            only_Count = true;
            item.count+=req.body.count;
        }
    })
    if(only_Count == false) {
        cart_Items.push(req.body);
    }
    req.session.cart_Items = cart_Items;
    res.status(200).json({only_Count: only_Count , data: req.body});
});

app.get('/cart-items',(req,res) => {
    if(req.session.cart_Items) {
        return res.json(req.session.cart_Items)
    }
    else {
        return res.json();
    }
})

app.post('/delete-item/:id',(req,res) => {
    const id = req.params.id;
    const cart_Items = req.session.cart_Items;
    const index = Array.from(cart_Items).findIndex((item) => item.id == id);
    cart_Items.splice(index,1);
    req.session.cart_Items = cart_Items;
    res.json(null);
})

app.post('/decrease-item/:id',(req,res) => {
    const id = req.params.id;
    const cart_Items = req.session.cart_Items;
    const index = Array.from(cart_Items).findIndex((item) => item.id == id);
    Array.from(cart_Items)[index].count-=1;
    req.session.cart_Items = cart_Items;
    res.json(Array.from(cart_Items)[index]);
});

app.post('/increase-item/:id',(req,res) => {
    const id = req.params.id;
    const cart_Items = req.session.cart_Items;
    const index = Array.from(cart_Items).findIndex((item) => item.id == id);
    Array.from(cart_Items)[index].count+=1;
    req.session.cart_Items = cart_Items;
    res.json(Array.from(cart_Items)[index]);
})

module.exports = {
    path: '/api', 
    handler: app
}
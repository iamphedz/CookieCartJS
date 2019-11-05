# CookieCartJS (v1.2.0)
A JavaScript-Based Shopping Cart. Cart instance is saved as cookie.




# Introduction
I created this simple shopping cart module just to help me with my first project. I want to share it to all in hopes that will be of help to others too, and also get some feedback and suggestions to improve it.




# Setup

Initialize the cart instance. It creates a new instance if previous instance has expired or non-existing. I recommend requiring/importing it in your main js file.
```javascript
CookieCart.init();
```

When using Vue.js, put this in your main js file:
```javascript
import CookieCart from "./CookieCart"; // path to this module
Object.defineProperty(Vue.prototype, "$CookieCart", { value: CookieCart });

Vue.prototype.$CookieCart.init(); // initialize it in your main js file
```
Then you can call it on all of your components using 
```javascript
this.$CookieCart.(...);
```

## Settings
Default Settings:
```javascript
var Settings = (CookieCart.settings = {
        storageKey: "cookie_cart", // key used when storing cart instance to cookie
        expiration: 30, // cookie expiration in minutes
        fees: {} // included fees
    });
```
You can configure it outside its source by including this before initializing it:
```javascript
CookieCart.configure({
        storageKey: "custom_key",
        expiration: 60,
        fees: {
                shipping: 0,
                discount: 0
        }
});

CookieCart.init(); // initialize it in your main js file
```




# How to Use

## Create new instance.
```javascript
CookieCart.newInstance();
```


## Return existing instance.
```javascript
CookieCart.getInstance();
```


## Destroy existing instance.
```javascript
CookieCart.destroy();
```


## Store instance.
```javascript
CookieCart.store(cart_instance);
```


## Add item to cart
NOTE: meta = optional item data
```javascript
CookieCart.addItem(id, name, price, qty, meta = null);
```


## Find and return an item with given id
```javascript
CookieCart.getItem(id);
```


## Update an item's value
```javascript
CookieCart.updateItem(id, key, val);
```


## Remove an item with given id.
```javascript
CookieCart.removeItem(id);
```


## Return all items from cart.
```javascript
CookieCart.getAllItems();
```


## Return cart instance w/o the item's meta data.
```javascript
CookieCart.rawData();
```


## Return all items from cart w/o their meta data.
```javascript
CookieCart.rawItems();
```


## Remove all items from cart.
```javascript
CookieCart.removeAllItems();
```


## Basic functions that handles cart instance cookie manipulation.
```javascript
CookieCart.getCookie(key), CookieCart.writeCookie(key, value, expiry), CookieCart.deleteCookie(key)
```




# Credits
Credits to all developers that shared their works publicly that made me learn a lot after years of hiatus in web developing.   

# CookieCartJS (v1.1.0)
A JavaScript-Based Shopping Cart. Cart instance is saved as cookie. Adjust its expiration on its Settings.




# Introduction
I created this simple shopping cart module just to help me with my first project. I want to share it to all in hopes that will be of help to you also, and also get some feedback and suggestions to improve it.




# Setup

Initialize the shopping cart. It creates new cart instance if previous instance has expired or non-existing. I recommend requiring/importing it in your main js file.
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
This is the default settings:
```javascript
var Settings = (CookieCart.settings = {
        storageKey: "_cookie_cart_", // key used when storing cart instance to cookie
        expiration: 30 // cookie expiration in minutes
    });
```
You can also edit settings outside its source using this:
```javascript
CookieCart.configure({
        storageKey: "custom_cart_key",
        expiration: 60
});
```
Note: Configure it in your main js file before initializing a cart instance.




# How to Use

## Creates new cart instance.
```javascript
CookieCart.newInstance();
```


## Returns existing cart instance.
```javascript
CookieCart.getInstance();
```


## Destroys existing cart instance.
```javascript
CookieCart.destroy();
```


## Stores/Overwrites cart instance.
```javascript
CookieCart.store(cart_instance);
```


## Adds item to cart
NOTE: meta = optional item data
```javascript
CookieCart.addItem(id, name, price, qty, meta = null);
```


## Finds and returns an item with given id
```javascript
CookieCart.getItem(id);
```


## Updates an item's value
```javascript
CookieCart.updateItem(id, key, val);
```


## Removes an item with given id.
```javascript
CookieCart.removeItem(id);
```


## Returns all items from cart.
```javascript
CookieCart.getAllItems();
```


## Returns cart instance w/o the item's meta data.
```javascript
CookieCart.rawData();
```


## Returns all items from cart w/o their meta data.
```javascript
CookieCart.rawItems();
```


## Removes all items from cart.
```javascript
CookieCart.removeAllItems();
```


## Basic functions that handles cart instance cookie manipulation.
```javascript
CookieCart.getCookie(key), CookieCart.writeCookie(key, value, expiry), CookieCart.deleteCookie(key)
```




# Credits
Credits to all developers that shared their works publicly that made me learn a lot after years of hiatus in web developing.   

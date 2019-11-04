# CookieCartJS
A JavaScript-Based Shopping Cart. Cart instance is saved as cookie. Adjust its expiration on its Settings.



# Introduction
I created this simple shopping cart module just to help me with my first project. I want to share it to all in hopes that will be of help to you also, and also get some feedback and suggestions to improve it.



# Settings
```javascript
var Settings = (CookieCart.settings = {
        storageKey: "cookie_cart_", // key used when storing cart instance to cookie
        expiration: 1800000 // cookie expiration in milliseconds
    });
```


# How To Use

Initialize the shopping cart. It creates new cart instance if previous instance has expired or non-existing. It returns the cart instance. I recommend requiring/importing it in your main js file.
```javascript
CookieCart.init();
```


## Creates new cart instance.
```javascript
CookieCart.newInstance();
```


## Destroys current cart instance.
```javascript
CookieCart.destroy();
```


## Stores the cart instance.
```javascript
CookieCart.store();
```


## Returns the cart instance.
```javascript
CookieCart.get();
```


## Adds item to cart
NOTE: meta = extra data related to the item (optional)
```javascript
CookieCart.addItem(id, name, price, qty, meta = null);
```


## Finds an item with given id and returns it.
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


## Returns all items in cart.
```javascript
CookieCart.getAllItems();
```


## Returns cart instance w/o its item's meta data.
```javascript
CookieCart.rawData();
```


## Returns all items in cart w/o its meta data.
```javascript
CookieCart.getPlainItems();
```


## Removes all items in cart.
```javascript
CookieCart.removeAllItems();
```


## Basic functions that handles cart instance cookie manipulation.
```javascript
CookieCart.getCookie(key), CookieCart.writeCookie(key, value, expiry), CookieCart.deleteCookie(key)
```

# Credits
I just came back in web developing few months ago so i always search for tips in web while coding so i want to give credit to all people that also shared their work that gave me idea on how to make this. 

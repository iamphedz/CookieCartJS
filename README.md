# CookieCartJS (v1.4.0)

A JavaScript-Based Shopping Cart.

# Introduction

I created this simple shopping cart module just to help me with my first project. I want to share it to all in hopes that will be of help to others too, and also get some feedback and suggestions to improve it.

# Versions

v.1.4.0 - Added getSubTotal() and getTotal() methods.
v.1.3.0 - Added storageType Settings. choose between cookie and localStorage.

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
this.$CookieCart.(...); // component script or
$CookieCart.(...); // component template
```

## Settings

Default Settings:

```javascript
var Settings = (CookieCart.settings = {
	storageType: "cookie",
	storageKey: "cookie_cart", // key used when storing cart instance to cookie
	expiration: 30, // cookie expiration in minutes
	fees: {} // included fees
});
```

You can configure it outside its source by including this before initializing it in your main js file:

```javascript
CookieCart.configure({
	storageType: "localStorage",
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

## Create new instance

This creates and returns a new cart instance with new session id.

```javascript
CookieCart.newInstance();
```

## Return existing instance

This returns the existing cart instance.

```javascript
CookieCart.getInstance();
```

## Destroy existing instance

This deletes the existing cart instance.

```javascript
CookieCart.destroy();
```

## Store instance

This stores the cart instance to cookie storage with specified storage key in settings.

```javascript
CookieCart.store(cart_instance);
```

## Add item to cart

This adds single item to cart.
NOTE: meta = optional item data

```javascript
CookieCart.addItem(id, name, price, qty, (meta = null));
```

## Find and return an item with given id

This finds an item in cart with given id and returns it.

```javascript
CookieCart.getItem(id);
```

## Update an item's value

This updates an item's value with given key.

```javascript
CookieCart.updateItem(id, key, val);
```

## Remove an item with given id

This removes an item with given id.

```javascript
CookieCart.removeItem(id);
```

## Return all items from cart

This returns all items from cart.

```javascript
CookieCart.getAllItems();
```

## Return cart instance w/o the item's meta data

This returns a simplified cart instance data w/o its item's meta data.

```javascript
CookieCart.rawData();
```

## Return all items from cart w/o their meta data

This returns all items from cart w/o their meta data.

```javascript
CookieCart.rawItems();
```

## Remove all items in cart

This removes all items in cart

```javascript
CookieCart.removeAllItems();
```

## Update fee with given key

This updates a fee with given key.

```javascript
CookieCart.updateFees(key, value);
```

## Return the cart sub total

This updates a fee with given key.

```javascript
CookieCart.getSubTotal();
```

## Return the cart total w/ the fees

This updates a fee with given key.

```javascript
CookieCart.getTotal();
```

## Checks if instance has expired

This checks if cart instance has expired. If storageType is localStorage and instance has expired, it will unset/remove it from localStorage.

```javascript
CookieCart.checkIfExpired();
```

# Credits

Credits to all developers that shared their works publicly that made me learn a lot after years of hiatus in web developing.

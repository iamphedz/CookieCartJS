(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === "object" && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
    }
})(typeof self !== "undefined" ? self : this, function() {
    var CookieCart = {};

    CookieCart.version = "0.0.1";

    var Settings = (CookieCart.settings = {
        storageKey: "cookie_cart_", // key used when storing cart instance to cookie
        expiration: 30 // cookie expiration in minutes
    });

    // cookie cart initialization
    CookieCart.init = () => {
        var cart = CookieCart.get();
        return cart ? cart : CookieCart.newInstance();
    };

    // generates a new cart instance
    CookieCart.newInstance = () => {
        return CookieCart.store({
            session_id:
                Settings.storageKey +
                Math.random()
                    .toString(36)
                    .substr(2),
            items: [],
            fees: {
                shipping: 0,
                discount: 0
            }
        });
    };

    // deletes current cart instance
    CookieCart.destroy = () => {
        CookieCart.deleteCookie(Settings.storageKey);
    };

    // stores cart instance
    CookieCart.store = cookie => {
        CookieCart.writeCookie(
            Settings.storageKey,
            JSON.stringify(cookie),
            CookieCart.makeExpiration()
        );

        return CookieCart.get();
    };

    // returns existing cart instance
    CookieCart.get = () => {
        return CookieCart.getCookie(Settings.storageKey)
            ? JSON.parse(CookieCart.getCookie(Settings.storageKey))
            : false;
    };

    // add new item to cart
    CookieCart.addItem = (id, name, price, qty, meta = null) => {
        var cart = CookieCart.get();
        if (cart) {
            cart.items.push({
                id: id,
                name: name,
                price: +price,
                qty: +qty,
                _meta: meta ? meta : {}
            });
            CookieCart.store(cart);
        } else return false;
    };

    // find and return item with specified id
    CookieCart.getItem = id => {
        var cart = CookieCart.get();
        if (cart) {
            var itemIndex = cart.items.findIndex(item => item.id == id);
            return itemIndex < 0 ? false : cart.items[itemIndex];
        }
        return false;
    };

    // updates item with specified id
    CookieCart.updateItem = (id, key, val) => {
        var cart = CookieCart.get();
        if (cart) {
            var itemIndex = cart.items.findIndex(item => item.id == id);
            if (itemIndex < 0) return false;
            cart.items[itemIndex][key] = val;
            CookieCart.store(cart);
        }
        return false;
    };

    // returns current count of items in cart
    CookieCart.itemCount = () => {
        var cart = CookieCart.get();
        return cart ? Object.entries(cart.items).length : null;
    };

    // removes an item from cart with specified id
    CookieCart.removeItem = id => {
        var cart = CookieCart.get();
        if (cart) {
            var itemIndex = cart.items.findIndex(item => item.id == id);
            if (itemIndex < 0) return false;
            cart.items = cart.items.filter(item => {
                return item.id != id;
            });
            CookieCart.store(cart);
        }
        return false;
    };

    // get all items in cart
    CookieCart.getAllItems = () => {
        var cart = CookieCart.get();
        return cart ? (cart.items.length > 0 ? cart.items : false) : false;
    };

    // returns cart data with items w/o its meta data
    CookieCart.rawData = () => {
        var cart = CookieCart.get();
        if (cart) {
            cart.items = CookieCart.getPlainItems();
            return cart;
        }
        return false;
    };

    // returns a filtered cart items w/o its meta data
    CookieCart.getPlainItems = () => {
        var cart = CookieCart.get();
        if (cart) {
            let plainItems = [];
            cart.items.map(item => {
                plainItems.push({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    qty: item.qty
                });
            });
            return plainItems;
        }
        return false;
    };

    // removes all items in cart
    CookieCart.removeAllItems = () => {
        var cart = CookieCart.get();
        if (cart) {
            cart.items = [];
            CookieCart.store(cart);
        }
        return false;
    };

    // makes UTC format expiration for the cart instance
    CookieCart.makeExpiration = () => {
        return new Date(Date.now() + Settings.expiration * 60000).toUTCString();
    };

    // get specific cookie with given key
    CookieCart.getCookie = key => {
        var key = key + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }
            if (c.indexOf(key) == 0) {
                return c.substring(key.length, c.length);
            }
        }
        return false;
    };

    // writes/saves cookie
    CookieCart.writeCookie = (key, value, expiry) => {
        document.cookie = `${key}=${value}; expires=${expiry}; path=/`;
        return CookieCart.getCookie(key);
    };

    // deletes a cookie with specified key
    CookieCart.deleteCookie = key => {
        document.cookie = `${key}=; max-age=-1; path=/`;
    };

    return CookieCart;
});

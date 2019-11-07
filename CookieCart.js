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

	CookieCart.version = "1.3.0";

	var Settings = (CookieCart.settings = {
		storageType: "cookie",
		storageKey: "cookie_cart", // key used when storing cart instance to cookie
		expiration: 30, // cookie expiration in minutes
		fees: {} // included fees
	});

	// updates configuration
	CookieCart.configure = options => {
		var key, value;
		for (key in options) {
			value = options[key];
			if (value !== undefined && options.hasOwnProperty(key))
				Settings[key] = value;
		}
		return this;
	};

	// cookie cart initialization
	CookieCart.init = () => {
		CookieCart.checkIfExpired();
		var cart = CookieCart.getInstance();
		return cart ? cart : CookieCart.newInstance();
	};

	// generates a new cart instance
	CookieCart.newInstance = () => {
		let instance =
			Settings.storageType === "cookie"
				? {
						session_id: Math.random()
							.toString(36)
							.substr(2),
						items: [],
						fees: Settings.fees
				  }
				: {
						session_id: Math.random()
							.toString(36)
							.substr(2),
						items: [],
						fees: Settings.fees,
						expiration: CookieCart.makeExpiration()
				  };
		return CookieCart.store(instance);
	};

	// deletes current cart instance
	CookieCart.destroy = () => {
		if (Settings.storageType === "cookie")
			CookieCart.deleteCookie(Settings.storageKey);
		else CookieCart.localStorageRemoveCart();
	};

	// stores cart instance
	CookieCart.store = cart_instance => {
		return Settings.storageType === "cookie"
			? CookieCart.writeCookie(
					Settings.storageKey,
					JSON.stringify(cart_instance),
					CookieCart.makeExpiration()
			  )
			: CookieCart.localStorageSetCart(JSON.stringify(cart_instance));
	};

	// returns existing cart instance
	CookieCart.getInstance = () => {
		return Settings.storageType === "cookie"
			? CookieCart.getCookie(Settings.storageKey)
				? JSON.parse(CookieCart.getCookie(Settings.storageKey))
				: false
			: JSON.parse(CookieCart.localStorageGetCart());
	};

	CookieCart.checkIfExpired = () => {
		if (Settings.storageType !== "cookie")
			if (CookieCart.getInstance().expiration < Date.now()) {
				CookieCart.localStorageRemoveCart();
				console.log(
					"Previous cart instance has expired. Creating new instance now..."
				);
			} else if (!CookieCart.getInstance())
				console.log(
					"Previous cart instance has expired. Creating new instance now..."
				);
	};

	// add new item to cart
	CookieCart.addItem = (id, name, price, qty, meta = null) => {
		var cart = CookieCart.getInstance();
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
		var cart = CookieCart.getInstance();
		if (cart) {
			var itemIndex = cart.items.findIndex(item => item.id == id);
			return itemIndex < 0 ? false : cart.items[itemIndex];
		}
		return false;
	};

	// updates item with specified id
	CookieCart.updateItem = (id, key, val) => {
		var cart = CookieCart.getInstance();
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
		var cart = CookieCart.getInstance();
		return cart ? Object.entries(cart.items).length : null;
	};

	// removes an item from cart with specified id
	CookieCart.removeItem = id => {
		var cart = CookieCart.getInstance();
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
		var cart = CookieCart.getInstance();
		return cart ? (cart.items.length > 0 ? cart.items : false) : false;
	};

	// returns cart data w/o meta data of items
	CookieCart.rawData = () => {
		var cart = CookieCart.getInstance();
		if (cart) {
			cart.items = CookieCart.rawItems();
			return cart;
		}
		return false;
	};

	// returns cart items w/o its meta data
	CookieCart.rawItems = () => {
		var items = CookieCart.getAllItems();
		if (items) {
			let plainItems = [];
			items.map(item => {
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
		var cart = CookieCart.getInstance();
		if (cart) {
			cart.items = [];
			CookieCart.store(cart);
		}
		return false;
	};

	// makes UTC format expiration for the cart instance
	CookieCart.makeExpiration = () => {
		return Settings.storageType === "cookie"
			? new Date(Date.now() + Settings.expiration * 60000).toUTCString()
			: Date.now() + Settings.expiration * 60000;
	};

	// updates included fee with given key
	CookieCart.updateFees = (key, value) => {
		var cart = CookieCart.getInstance();
		if (cart) {
			if (!cart.fees[key]) return false;
			cart.fees[key] = value;
			CookieCart.store(cart);
		}
		return false;
	};

	/** Cookie manipulation functions  */
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

	/** localStorage data manipulation */

	CookieCart.localStorageSetCart = cart_instance => {
		localStorage.setItem(Settings.storageKey, cart_instance);
		return CookieCart.localStorageGetCart();
	};

	CookieCart.localStorageGetCart = () => {
		return localStorage.getItem(Settings.storageKey)
			? localStorage.getItem(Settings.storageKey)
			: false;
	};

	CookieCart.localStorageRemoveCart = () => {
		if (CookieCart.localStorageGetCart())
			localStorage.removeItem(Settings.storageKey);
	};

	return CookieCart;
});

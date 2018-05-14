/* eslint-disable */
function removeProperty(property) {
	Object.defineProperty(document.body.style, property, {
		get: function() {
			return undefined;
		}
	});
}

removeProperty("transform");
removeProperty("-webkit-transform");
removeProperty("-o-transform");
removeProperty("-moz-transform");
removeProperty("-ms-transform");
removeProperty("filter");
removeProperty("keyframes");
removeProperty("animation");

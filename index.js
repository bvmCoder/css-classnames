(function() {
    'use strict';

    var hasOwn = {}.hasOwnProperty;

    var ClassNames = {

        setCssModule: function setCssModule() {
            var classes = [];
            var length = arguments.length;
            for (var i = 0; i < length; i++) {
                var arg = arguments[i];
                if (!arg) continue;

                var argType = typeof arg;

                if (argType === 'string' || argType === 'number') {
                    classes.push(this && this[arg] || arg);
                } else if (Array.isArray(arg)) {
                    classes.push(setCssModule.apply(this, arg));
                } else if (argType === 'object') {
                    for (var key in arg) {
                        if (hasOwn.call(arg, key) && arg[key]) {
                            classes.push(this && this[key] || key);
                        }
                    }
                }
            }

            return classes.join(' ');
        },

        classSet: function classSet() {
            var classes = [];
            var length = arguments.length;

            for (var i = 0; i < length; i++) {
                var arg = arguments[i];
                if (!arg) continue;

                var argType = typeof arg;

                if (argType === 'string' || argType === 'number') {
                    classes.push(arg);
                } else if (Array.isArray(arg)) {
                    classes.push(classSet.apply(null, arg));
                } else if (argType === 'object') {
                    for (var key in arg) {
                        if (hasOwn.call(arg, key) && arg[key]) {
                            classes.push(key);
                        }
                    }
                }
            }

            return classes.join(' ');
        }
    };

    if (typeof module !== 'undefined' && module.exports) {
		module.exports = ClassNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'css-classnames', consistent with npm package name
		define('css-classnames', [], function () {
			return ClassNames;
		});
	} else {
		window.ClassNames = ClassNames;
	}    

})();

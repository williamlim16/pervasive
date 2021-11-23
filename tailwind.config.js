module.exports = {
	purge: ["./src/**/*.html", "./src/**/*.js"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				caveat: "Caveat Brush",
			},
			colors: {
				"dark-blue": "#274472",
				"light-blue": "#5885AF",
				"plain-white": "#FFFFFF",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};

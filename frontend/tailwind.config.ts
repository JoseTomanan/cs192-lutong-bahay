import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
 
	theme: {
		fontFamily: {
			'heading': ["Inter"],
			'sans': ["Inter", "sans-serif"],
			'mono': ['Fira Code', 'monospace']
		},
		extend: {
			colors: {
				transparent: "transparent",
				current: "currentColor",
				main: "#8FBF64",
				main_dark: "#6f964e",
        "main-dark": "#6F964E",
				secondary: "#D94D48",
				secondary_dark: "#bf443f",
				secondary_light: "#f0718d",
				light_gray: "#bdbdbd", // gray-400
				dark_gray: "#757575",  // gray-600
				bg: "#F5F4E9",
				bg_gradient: "#ecfcde"
			}
		} 
	},
 
	plugins: [] 
} satisfies Config;

import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
 
	theme: {
		extend: {
			colors: {
				transparent: "transparent",
				current: "currentColor",
				main: "#8FBF64",
				secondary: "#D94D48",
				bg: "#F5F4E9",
			}
		} 
	},

	plugins: []
} satisfies Config;

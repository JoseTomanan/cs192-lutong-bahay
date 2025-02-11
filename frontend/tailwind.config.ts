import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
 
	theme: {
		extend: {
			/**
			 * Elijah, not sure if you noticed but I already defined our
			 * project's main colors in the Tailwind config;
			 * If you need to use them you can just use these terms.
			 * (You may erase these lines when you're done reading)
			 */
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

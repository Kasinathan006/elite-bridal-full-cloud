import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#D4AF37",
                "primary-dark": "#1A1A1A",
                secondary: "#FAFAFA",
                accent: "#D4AF37",
                dark: "#1A1A1A",
            },
            borderRadius: {
                "2.5xl": "1.25rem",
                "4.5xl": "2.25rem",
            },
            letterSpacing: {
                "0.2em": "0.2em",
                "0.3em": "0.3em",
                "0.4em": "0.4em",
                "0.5em": "0.5em",
                "0.6em": "0.6em",
                "0.8em": "0.8em",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
export default config;

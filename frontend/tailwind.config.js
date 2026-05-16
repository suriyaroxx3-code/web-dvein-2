/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Corporate Brand Colors
        dveinBlue: '#0F62FE',    // IBM/Zoho style Professional Blue
        dveinGreen: '#24A148',   // Success Green (Minimal usage)
        
        // Backgrounds (Clean & White)
        bgLight: '#FFFFFF',      // Pure White
        bgGray: '#F4F7F6',       // Very light corporate gray (Section bg)
        
        // Text Colors (High Readability)
        textMain: '#161616',     // Almost Black (Heading)
        textBody: '#525252',     // Dark Gray (Paragraphs)
        textLight: '#8D8D8D',    // Light Gray (Footer/Meta)
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // Cleanest font
        heading: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.05)', // Soft shadow
      }
    },
  },
  plugins: [],
}
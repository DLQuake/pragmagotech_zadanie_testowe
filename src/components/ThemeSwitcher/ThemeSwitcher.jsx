import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import './ThemeSwitcher.css';

function ThemeSwitcher() {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <div className="theme-switcher">
            <button className="button is-large theme-button" onClick={toggleTheme}>
                {theme === "light" ? (
                    <FaMoon size={24} color="#6a0dad" />
                ) : (
                    <FaSun size={24} color="#fbc02d" />
                )}
            </button>
        </div>
    );
}

export default ThemeSwitcher;
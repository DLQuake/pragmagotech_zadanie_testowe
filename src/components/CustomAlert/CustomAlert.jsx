import Swal from 'sweetalert2';

const CustomAlert = (text, icon) => {
    const theme = localStorage.getItem("theme") || "light";
    const darkMode = theme === "dark";

    Swal.fire({
        title: text,
        icon: icon,
        background: darkMode ? '#14161A' : '#FFFFFF',
        color: darkMode ? '#fff' : '#000',
        confirmButtonColor: darkMode ? '#00B89C' : '#00B89C',
    });
};

export default CustomAlert;
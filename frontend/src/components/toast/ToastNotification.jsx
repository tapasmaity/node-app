
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const ToastSuccess = (content) => {
    return toast.success(content, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "dark",
        draggable: true,
        progress: undefined,
    });
}

const ToastError = (content) => {
    return toast.error(content, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "dark",
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}
export {
    ToastSuccess,
    ToastError
}
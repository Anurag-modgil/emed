import { toast } from "react-toastify";
const notify = (type, msg, time = 10000) => {
    if (type === "success") {
        toast.clearWaitingQueue();
        return toast.success(msg, {
            position: "top-right",
            autoClose: time,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    if (type === "error") {
        toast.clearWaitingQueue();
        toast.error(msg, {
            position: "top-right",
            autoClose: time,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
};

export default notify;
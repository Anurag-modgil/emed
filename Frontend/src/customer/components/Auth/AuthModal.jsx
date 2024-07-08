import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import RegisterUserForm from "./Register";
import { useEffect, useState } from "react";
import LoginUserForm from "./Login";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import OTPModal from "../otp/OTPModal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
export default function AuthModal({ handleClose, open }) {
  const location = useLocation();
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // useEffect(() => { //   if (auth.user){ //     //  handleClose(); //   // setIsModalOpen(true); //      if(auth.user?.role==="ADMIN"){ //       navigate('/admin') //      } //     } // }, [auth.user]); // const openModal = () => { //   setIsModalOpen(true); // }; // const closeModal = () => { //   setIsModalOpen(false); // }; // const dependancy = async()=>{ //   console.log("back from child") // }
  // console.log('isModalOpen', isModalOpen)
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose} // dependies = {dependancy}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        size="large"
      >
        <Box className="rounded-md" sx={style}>
          {location.pathname === "/login" ? (
            <LoginUserForm handleClose={handleClose} />
          ) : (
            <RegisterUserForm />
          )}
        </Box>
      </Modal>
    </>
  );
}

import { useState } from "react";
import CustomAlert from "./index";

type AlertType = "success" | "error";

const useAlert = () => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [typeAlert, setTypeAlert] = useState<AlertType>("success");
  const [messageAlert, setMessageAlert] = useState<string>("");

  const showAlert = (type: AlertType, message: string) => {
    setTypeAlert(type);
    setMessageAlert(message);
    setOpenAlert(true);
  };

  const AlertComponent = () => (
    <>
      {openAlert && (
        <CustomAlert
          message={messageAlert}
          type={typeAlert}
          onClose={() => setOpenAlert(false)}
        />
      )}
    </>
  );

  return { showAlert, AlertComponent };
};

export default useAlert;

import { useState } from "react";

function usePopup() {
  const [popup, setPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [errCode, setErrcode] = useState(false);

  return { popup, setPopup, message, setMessage, errCode, setErrcode };
}

export default usePopup

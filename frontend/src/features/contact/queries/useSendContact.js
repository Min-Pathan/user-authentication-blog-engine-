import { useMutation } from "@tanstack/react-query";

import { sendContactMessage } from "../../../services/contactService.js";

function useSendContact() {
  return useMutation({
    mutationFn: sendContactMessage,
    retry: false,
  });
}

export default useSendContact;
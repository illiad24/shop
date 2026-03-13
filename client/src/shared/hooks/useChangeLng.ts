import i18n from "@/i18n/i18n";
import { useState } from "react";



export default function useChangeLanguage() {
  const [lng, setLng] = useState("en");

  function changeLng(flag: LanguageTypes) {
    setLng(flag);
    i18n.changeLanguage(flag);
  }

  return { changeLng, lng };
}

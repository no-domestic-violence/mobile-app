import React from 'react';
import { useTranslation } from "react-i18next"

function LanguageComponent(){
  const {t, i18n} = useTranslation();
  return <p>{t("language")}</p>
}



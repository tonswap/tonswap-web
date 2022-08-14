import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { LANGUAGE } from "./language";

const SelectLanguage = () => {
    const { i18n } = useTranslation();
    const [language, setLanguage] = useState<string>(LANGUAGE.en);

    const handleLangChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        const lang = evt.target.value;
        setLanguage(lang);
        i18n.changeLanguage(lang);
    };

    return (
        <select onChange={handleLangChange} value={language}>
            <option value={LANGUAGE.en}>EN</option>
            <option value={LANGUAGE.ru}>RU</option>
        </select>
    );
};

export default SelectLanguage;
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const SelectLanguage = () => {
    const { i18n } = useTranslation();
    const [language, setLanguage] = useState("en");

    const handleLangChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        const lang = evt.target.value;
        setLanguage(lang);
        i18n.changeLanguage(lang);
    };

    return (
        <select onChange={handleLangChange} value={language}>
            <option value="en">EN</option>
            <option value="ru">RU</option>
        </select>
    );
};

export default SelectLanguage;
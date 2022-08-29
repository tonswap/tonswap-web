import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { LANGUAGE } from "./language";
import languageLogo from "assets/images/shared/language.svg";
import { styled } from "@mui/styles";
import { Box } from "@mui/system";
import { FormControl, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import gaAnalytics from "services/analytics/ga/ga";

interface Props {
    isMobile: boolean;
}

const StyledContainer = styled(Box)({
    display: "flex",
    alignItems: "baseline",
    justifyContent: "center",
    img: {
        width: 26,
        height: 26,
    },
});

const SelectLanguage = ({ isMobile }: Props) => {
    const { i18n } = useTranslation();

    const [language, setLanguage] = useState<string>(() => {
        const defaultLanguage = i18n.language === "en" ? LANGUAGE.en : LANGUAGE.ru
        return defaultLanguage;
    });

    const handleLangChange = (event: SelectChangeEvent) => {
        const lang = event.target.value;
        setLanguage(lang);
        i18n.changeLanguage(lang);
        gaAnalytics.onLanguageSelect(lang);
    };

    return (
        <StyledContainer>
            {isMobile &&
                <Box
                    component="img"
                    sx={{
                        position: 'relative',
                        height: 26,
                        width: 26,
                        top: 8,
                    }}
                    alt="language"
                    src={languageLogo}
                />}
            <FormControl variant="standard" sx={{
                position: 'relative',
                m: 1,
                minWidth: 120,
                bottom: isMobile ? 0 : 5
            }}
            >
                <Select
                    value={language}
                    onChange={handleLangChange}
                    style={{
                        fontWeight: isMobile ? 400 : 600,
                        paddingLeft: 5,
                        color: "#000"
                    }}
                    IconComponent={() => <ArrowDropDownIcon style={{ color: "#000" }} />}

                >
                    <MenuItem value={LANGUAGE.en}>English</MenuItem>
                    <MenuItem value={LANGUAGE.ru}>Русский</MenuItem>
                </Select>
            </FormControl>
        </StyledContainer >
    );
};

export default SelectLanguage;
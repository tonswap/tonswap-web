import { useState } from "react";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/styles";
import { Box } from "@mui/system";
import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import gaAnalytics from "services/analytics/ga/ga";
import { LANGUAGE } from "./language";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LanguageIcon from '@mui/icons-material/Language';

const languages = [
  {
    text: "EN",
    value: LANGUAGE.EN,
  },
  {
    text: "RU",
    value: LANGUAGE.RU,
  },
    {
    text: "ZH",
    value: LANGUAGE.ZH,
  },
];

const StyledContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  height: 23,
  width: 100
});

const SelectLanguage = () => {
  const { i18n } = useTranslation();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [language, setLanguage] = useState<LANGUAGE>(
    i18n.language === "en-US" ? LANGUAGE.EN : i18n.language as LANGUAGE
  );

  const changeLanguage = (event: SelectChangeEvent) => {
    const _language = event.target.value as LANGUAGE;
    setLanguage(_language);
    i18n.changeLanguage(_language);
    gaAnalytics.onLanguageSelect(_language);
  };

  return (
    <StyledContainer>
      <LanguageIcon onClick={() => setShowDropdown(!showDropdown)} />
      {showDropdown &&
        <FormControl variant="standard">
          <Select
            labelId="demo-simple-select-label"
            value={language}
            label=""
            onChange={changeLanguage}
            IconComponent={() => <ArrowDropDownIcon style={{ color: "#000" }} />}
          >
            {languages.map((lang) => {
              return (
                <MenuItem key={lang.value} value={lang.value}>
                  {lang.text}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>}
    </StyledContainer>
  );
};

export default SelectLanguage;

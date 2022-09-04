import { useState } from "react";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/styles";
import { Box } from "@mui/system";
import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import gaAnalytics from "services/analytics/ga/ga";
import { LANGUAGE } from "./language";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const languages = [
  {
    text: "EN",
    value: LANGUAGE.EN,
  },
  {
    text: "РY",
    value: LANGUAGE.RU,
  },
];

const StyledContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  position: "relative",
  gap: 15,

  "& .line": {
    position: "absolute",
    left: "52%",
    transform: "translate(-50%, -50%)",
    top: "50%",
    height: 20,
    width: 1,
    background: "black",
    margin: 0,
    padding: 0,
  },
});

const SelectLanguage = () => {
  const { i18n } = useTranslation();

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
      <FormControl>
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
      </FormControl>
    </StyledContainer>
  );
};

export default SelectLanguage;

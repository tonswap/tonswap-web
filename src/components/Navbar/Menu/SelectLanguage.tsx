import { useState } from "react";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/styles";
import { Box } from "@mui/system";
import { IconButton, Typography } from "@mui/material";
import gaAnalytics from "services/analytics/ga/ga";

enum LANGUAGES {
  EN = "en",
  RU = "ru",
}

const languages = [
  {
    text: "Eng",
    value: LANGUAGES.EN,
  },
  {
    text: "Ru",
    value: LANGUAGES.RU,
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

  const [language, setLanguage] = useState<LANGUAGES>(
    i18n.language as LANGUAGES
  );

  const changeLanguage = (_language: LANGUAGES) => {
    setLanguage(_language);
    i18n.changeLanguage(_language);
    gaAnalytics.onLanguageSelect(_language);
  };

  return (
    <StyledContainer>
      <div className="line" />
      {languages.map((lang) => {
        const isSelected = lang.value === language;
        return (
          <IconButton
            className="language-select"
            style={{ color: " #313855" }}
            onClick={() => changeLanguage(lang.value)}
            key={lang.value}
          >
            <Typography
              style={{
                fontWeight: isSelected ? 600 : 400,
              }}
            >
              {lang.text}
            </Typography>
          </IconButton>
        );
      })}
    </StyledContainer>
  );
};

export default SelectLanguage;

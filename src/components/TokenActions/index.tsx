import { Box, List, ListItem, Typography } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Token } from "types";
import { createTokenActions } from "./data";

const useStyles = makeStyles((theme: Theme) => ({
  actions: {
    width: "100%",
  },
  action: {
    borderBottom: "0.5px solid #DDDDDD",
    cursor: "pointer",
    "& p": {
      transition: "0.2s all",
    },
    "& img": {
      marginRight: 25,
    },
    [theme.breakpoints.up('sm')]: {
      "&:hover": {
        "& p": {
          color: theme.palette.primary.main,
        },
      },
    },
    "&:last-child": {
      border: "unset",
    },
  },
}));

interface Props {
  token?: Token;
  onActionClick?: () => void;
}

const getIsActiveLink = (pathname: string, link: string) => {
  return pathname.indexOf(link) > -1;
};

function TokenActions({ token, onActionClick }: Props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const actions = useMemo(() => createTokenActions(navigate, token), [token]);

  const onClick = (func: () => void) => {
    if (onActionClick) {
      onActionClick();
    }
    func();
  };

  return (
    <Box className={classes.actions}>
      <List sx={{ padding: 0 }}>
        {actions &&
          actions.map((action) => {
            const isActive = getIsActiveLink(location.pathname, action.id);

            return (
              <ListItem
                key={action.id}
                className={classes.action}
                onClick={() => onClick(action.func)}
                sx={{
                  paddingLeft: "unset",
                  paddingTop: "12px",
                  paddingBottom: "14px",
                }}
              >
                <img src={action.icon} />
                <Typography fontWeight={500} color={isActive ? "primary" : ""}>
                  {action.title}
                </Typography>
              </ListItem>
            );
          })}
      </List>
    </Box>
  );
}

export default TokenActions;

import { Box, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { ActionButton } from "components";
import Notification from "components/Notification";
import { TEST_MODE } from "consts";
import { useState } from "react";

const StyledContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection:'column',
  paddingTop:'100px',
  paddingBottom:'100px'
});

const StyledContent = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection:'column',
    padding: 20,
    background: 'rgba(0,0,0, 0.03)',
    width: '300px'
  });


const pwd = "orbs123";
function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const submit = () => {
    if (!password || password.trim() !== pwd) {
      setError(true);
      return;
    }
    localStorage.setItem(TEST_MODE, "1");
    location.reload()
  };

  return (
    <StyledContainer>
        <StyledContent>
        <TextField
       
        style={{marginBottom:'20px', width:'100%'}}
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <ActionButton   isDisabled={!password} onClick={submit}>Submit</ActionButton>
        </StyledContent>
      <Notification
      isError
        text="Wrong password"
        open={error}
        onClose={() => setError(false)}
      />
    </StyledContainer>
  );
}

export default Login;

import React from "react";
import { useNavigate } from "react-router-dom";

function useNavigateWithParams() {
  const navigate = useNavigate()

  const navigateWithParams = (url: string) => {
    navigate(`${url}${window.location.search}`);
  };

  return navigateWithParams;
}

export default useNavigateWithParams;

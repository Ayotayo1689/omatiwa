import React, { useEffect, useState } from "react";
import AnimatedName from "@/components/AnimatedName";
import { useNavigate } from "react-router-dom";

const FirstPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/work");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  return <AnimatedName />;
};

export default FirstPage;

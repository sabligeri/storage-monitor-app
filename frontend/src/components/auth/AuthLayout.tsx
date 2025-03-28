import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    setIsLogin(location.pathname === "/login");
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isLogin ? "login" : "register"}
        initial={{ backgroundPosition: isLogin ? "100% 0" : "0 0" }}
        animate={{ backgroundPosition: isLogin ? "0 0" : "100% 0" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{
          height: "100vh",
          width: "100%",
          background: "linear-gradient(to right, #A7BEAE 50%, #E07A5F 50%)",
          backgroundSize: "200% 100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {children}
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthLayout;

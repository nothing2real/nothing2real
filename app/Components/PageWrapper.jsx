import React from "react";
import { motion } from "framer-motion";

const PageWrapper = (props) => {
  return (
    <div className="bg-white min-h-screen">
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ delay:1.5, duration: 1 }}
        {...props}
      />
    </div>
  );
};

export default PageWrapper;

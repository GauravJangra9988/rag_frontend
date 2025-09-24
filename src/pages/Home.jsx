"use client";

import React, { useState } from "react";
import { Forward, Paperclip } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; 



const handleFileUpload = () =>{
    
    const el = document.createElement("input")
    el.setAttribute("type","file")
    el.setAttribute("accept", ".pdf",".doc", ".txt");
    el.setAttribute("multiple","multiple");

    el.addEventListener("change",(ev)=>{
        console.log("file uploading")
    })

    el.click()
    
    
    console.log("file upload")
}



export const Home = () => {
  const [showInput, setShowInput] = useState(false);

  const variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.95 },
  };

  return (
    <div className="min-h-screen bg-bg font-serif flex flex-col items-center justify-center px-4">
      <div className="transition-normal">
      <h1 className="font-semibold text-primary font-serif text-8xl text-center">
        Chat with .doc
      </h1>
      <p className="mt-2 text-2xl text-primary text-center">
        Just upload and ask question related to uploaded file
      </p>
    </div>

      <AnimatePresence mode="wait">
        {!showInput ? (
          <motion.div
            key="button"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3 }}
            className="bg-primary text-2xl text-secondary px-5 py-2 rounded-2xl mt-8 cursor-pointer"
            onClick={() => setShowInput(true)}
          >
            Try it
          </motion.div>
        ) : (
          <motion.div
            key="input"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.4 }}
            className="relative border rounded-3xl mx-auto min-w-2xl min-h-48 border-primary mt-8 w-full max-w-2xl"
          >
           
            <textarea
              className="w-full p-4 overflow-hidden h-32 text-primary text-2xl focus:outline-none resize-none rounded-3xl"
              placeholder="Ask what you want"
            />
            <Paperclip onClick={handleFileUpload} className="absolute left-6 bottom-6 text-primary cursor-pointer" />
            <Forward className="absolute right-6 bottom-6 text-primary cursor-pointer" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

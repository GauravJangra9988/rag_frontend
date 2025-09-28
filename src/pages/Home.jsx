"use client";

import React, { useState } from "react";
import { Forward, Paperclip } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; 


export const Home = () => {
  const [showInput, setShowInput] = useState(false);
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");



  const handleFileUpload = () => {
    const el = document.createElement("input");
    el.setAttribute("type", "file");
    el.setAttribute("accept", ".pdf", ".doc", ".txt");
    el.setAttribute("multiple", "multiple");

    el.addEventListener("change", async (ev) => {
      if (el.files && el.files.length > 0) {
        const formData = new FormData();
        Array.from(el.files).forEach((file, index) => {
          formData.append("files", file);
        });

        formData.append("user", "testuser1")

        console.log("file uploading");
        const res = await fetch("http://localhost:8000/upload/file", {
          method: "POST",
          body: formData,
        });

        console.log(res.body)
      }
    });

    el.click();

    console.log("file upload");
  };


  const handleChat = async() => {
    
    if(message === ""){
      console.log("Write some query, cant send empty text")
      return;
    }

    const sendQuery = {
      user: "testuser1",
      query: message
    }

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(sendQuery),
      });
      console.log("chat send");
      const data = await res.json();
      
      setAnswer(data.answer)
      console.log(data.answer);
      
    } catch(error){
      console.log(error.message)
    }

  };



  const variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.95 },
  };

  return (
    <div
      className={`min-h-screen bg-bg font-serif flex flex-col items-center px-4 ${
        showInput ? "justify-between py-20" : "justify-center"
      }`}
    >
      <div className={showInput ? "hidden" : "block"}>
        <h1 className="font-semibold text-primary font-serif text-8xl text-center">
          Chat with .doc
        </h1>
        <p className="mt-2 text-2xl text-primary text-center">
          Just upload and ask question related to uploaded file
        </p>
      </div>

      <div
        className={`flex flex-col text-primary h-full w-2xl text-center ${
          showInput ? "block" : "hidden"
        }`}
      >
        <h1 className="font-semibold text-4xl mb-16">Your Result</h1>
        <p className="text-left font-normal">{answer}</p>
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
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-4 overflow-hidden h-32 text-primary text-2xl focus:outline-none resize-none rounded-3xl"
              placeholder="Ask what you want"
            />
            <Paperclip
              onClick={handleFileUpload}
              className="absolute left-6 bottom-6 text-primary cursor-pointer"
            />
            <Forward
              onClick={handleChat}
              className="absolute right-6 bottom-6 text-primary cursor-pointer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

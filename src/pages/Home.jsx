"use client";

import React, { useState } from "react";
import { Forward, Paperclip } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; 
import toast from "react-hot-toast";


export const Home = () => {
  const [showInput, setShowInput] = useState(false);
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");


  const handleDelete = async() =>{
    
    try {
      const deleteResponse = await fetch(
        "http://localhost:8000/deleteSession",
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await deleteResponse.json();

      if(!deleteResponse.ok){
        throw new Error(data.message)
      }

      toast.success(data.message);

    } catch(error){
      toast.error(error.message)
    }
    
  }

  const tryItHandler = async() =>{
    setShowInput(true);

    try {
        const historyAvailable = await fetch(
          "http://localhost:8000/getSessionId",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await historyAvailable.json();

        if(!historyAvailable.ok){
          throw new Error();
        }
        toast.success(data.message);
    } catch(error){
      toast.error(error.message)
    }

  }



  const handleFileUpload = () => {
    
    try {
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

              formData.append("user", "testuser1");

              console.log("file uploading");
              const res = await fetch("http://localhost:8000/upload/file", {
                method: "POST",
                credentials: "include",
                body: formData,
              });

              const data = await res.json();
              if(!res.ok){
                throw new Error(data.message)
              }
              toast.success(data.message);
            }
          });

          el.click();

    } catch(error){
      toast.error(error.message)
    }

  };


  const handleChat = async() => {
    
    if(message === ""){
      toast.error("Write some query, cant send empty text");
      return;
    }

    const sendQuery = {
      query: message
    }

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(sendQuery),
      });
      toast.success("Chat send");
      const data = await res.json();

      if(!res.ok){
        throw new Error(data.message);
      }
      
      setAnswer(data.answer)
      
    } catch(error){
      toast.error(error.message)
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
        showInput ? "relative justify-between py-20" : "justify-center"
      }`}
    >
      <div className={`text-primary cursor-pointer absolute top-20 right-15 font-serif font-bold ${showInput ? "block" : "hidden"}`}
      onClick={() => handleDelete()} >
        Remove History
      </div>
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
        <p className="text-left tracking-wider font-extralight">{answer}</p>
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
            onClick={() => tryItHandler()}
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

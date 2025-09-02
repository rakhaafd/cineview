import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai";

const API_KEY = "AIzaSyCR0AqBdGRMbkUvNxLDwB7S7PaBMZBRJTA";
const genAI = new GoogleGenerativeAI(API_KEY);

async function loadTrainingData() {
  const res = await fetch("data/training.txt");
  return await res.text();
}

export async function initCineBot() {
  const trainingData = await loadTrainingData();

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: trainingData,
  });

  // simpan ke global supaya chatbot.js bisa akses
  window.CineBotModel = model;
}
import { surpriseMePrompts } from "../constant";
import FileSaver from "file-saver";

export const getRandomPrompt = (prompt: string): string => {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) {
    return getRandomPrompt(prompt);
  }

  return randomPrompt;
}

export const downloadImage = async (_id: string, photo: string) => {
  FileSaver.saveAs("https:" + photo.split(":")[1], `${_id}.jpg`);
}
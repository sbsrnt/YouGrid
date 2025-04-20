import { Storage } from "@plasmohq/storage";
// content.ts
import type { PlasmoCSConfig } from "plasmo";

// only run on youtube.com
export const config: PlasmoCSConfig = {
  matches: ["https://www.youtube.com/*"],
  run_at: "document_end",
};

// create our <style> once
const styleEl = document.createElement("style");
styleEl.id = "yt-grid-tweaker";
document.head.appendChild(styleEl);

async function updateGridCSS() {
  const storage = new Storage({ copiedKeyList: ["ytItemsPerRow"] });
  const val = (await storage.get("ytItemsPerRow")) ?? "5";

  // target the host element AND :root, using !important
  styleEl.textContent = `
    :root,
    ytd-rich-grid-renderer {
      --ytd-rich-grid-items-per-row: ${val} !important;
    }
  `;
}

// initial apply
updateGridCSS();

// listen for when popup changes the setting
chrome.storage.onChanged.addListener((changes) => {
  if (changes.ytItemsPerRow) {
    updateGridCSS();
  }
});

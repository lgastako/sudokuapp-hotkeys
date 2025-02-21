// ==UserScript==
// @name         Sudokupad Hotkeys
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds custom hotkeys to Sudokupad
// @author       You
// @match        https://sudokupad.app/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  console.log("Sudokupad Hotkeys script loaded and running");

  // Track if tools are active
  let isPenToolActive = false;
  let isLetterToolActive = false;

  // Helper function to simulate a click on an element
  function simulateClick(element) {
    if (!element) {
      console.log("No element provided to click");
      return;
    }

    const rect = element.getBoundingClientRect();

    const eventOptions = {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: rect.left,
      clientY: rect.top,
    };

    // Dispatch mousedown event
    element.dispatchEvent(new MouseEvent("mousedown", eventOptions));
  }

  // Helper function to simulate a click at specific coordinates
  function simulateClickAt(x, y) {
    const element = document.elementFromPoint(x, y);
    if (!element) {
      console.log("No element found at coordinates", x, y);
      return;
    }

    const eventOptions = {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: x,
      clientY: y,
      screenX: x,
      screenY: y,
    };

    // Dispatch mousedown event
    element.dispatchEvent(new MouseEvent("mousedown", eventOptions));
  }

  // Helper function to toggle a tool
  function toggleTool(toolId, toolName, isActive) {
    const settingsButton = document.querySelector("#control-settings");
    if (settingsButton) {
      console.log(`Opening settings panel to toggle ${toolName}`);
      simulateClick(settingsButton);

      const toolCheckbox = document.querySelector(toolId);
      if (toolCheckbox) {
        console.log(`Found ${toolName} checkbox:`, toolCheckbox);
        console.log(`Toggling ${toolName} checkbox`);
        toolCheckbox.click();

        const escapeEvent = new KeyboardEvent("keydown", {
          key: "Escape",
          code: "Escape",
          keyCode: 27,
          which: 27,
          bubbles: true,
          cancelable: true,
        });

        document.dispatchEvent(escapeEvent);
        return true;
      } else {
        console.log(`Could not find ${toolName} checkbox`);
      }
    } else {
      console.log("Could not find settings button");
    }
    return false;
  }

  document.addEventListener("keydown", function (e) {
    console.log("Key pressed:", e.key);

    // Use 'k' key for pen tool toggle
    if (e.key.toLowerCase() === "k") {
      e.preventDefault();
      console.log("K key pressed - toggling pen tool");
      if (toggleTool("#toolpen", "pen tool", isPenToolActive)) {
        isPenToolActive = !isPenToolActive;
        console.log(
          "Pen tool is now:",
          isPenToolActive ? "active" : "inactive"
        );
      }
    }

    // Use 'l' key for letter tool toggle
    if (e.key.toLowerCase() === "l") {
      e.preventDefault();
      console.log("L key pressed - toggling letter tool");
      if (toggleTool("#toolletter", "letter tool", isLetterToolActive)) {
        isLetterToolActive = !isLetterToolActive;
        console.log(
          "Letter tool is now:",
          isLetterToolActive ? "active" : "inactive"
        );
      }
    }
  });
})();

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

  // Track if pen tool is active
  let isPenToolActive = false;

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

  document.addEventListener("keydown", function (e) {
    console.log("Key pressed:", e.key);

    // Use 'k' key for pen tool toggle
    if (e.key.toLowerCase() === "k") {
      e.preventDefault();
      console.log("K key pressed - toggling pen tool");

      // Click the settings button
      const settingsButton = document.querySelector("#control-settings");
      if (settingsButton) {
        console.log("Opening settings panel");
        simulateClick(settingsButton);

        const penCheckbox = document.querySelector("#toolpen");
        if (penCheckbox) {
          console.log("Found pen checkbox:", penCheckbox);
          console.log("Toggling pen tool checkbox");
          //penCheckbox.checked = !penCheckbox.checked;

          penCheckbox.click();

          const escapeEvent = new KeyboardEvent("keydown", {
            key: "Escape",
            code: "Escape",
            keyCode: 27,
            which: 27,
            bubbles: true,
            cancelable: true,
          });

          document.dispatchEvent(escapeEvent);
        } else {
          console.log("Could not find pen checkbox");
        }
      } else {
        console.log("Could not find settings button");
      }
    }
  });
})();

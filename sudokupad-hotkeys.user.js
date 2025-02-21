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

  const penKey = "k";
  const letterKey = "l";

  function simulateClick(element) {
    if (!element) {
      console.log("No element provided to click");
      return;
    }

    const rect = element.getBoundingClientRect();

    element.dispatchEvent(
      new MouseEvent("mousedown", {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX: rect.left,
        clientY: rect.top,
      })
    );
  }

  function toggleTool(toolId, toolName) {
    const settingsButton = document.querySelector("#control-settings");
    if (settingsButton) {
      simulateClick(settingsButton);

      const toolCheckbox = document.querySelector(toolId);
      if (toolCheckbox) {
        toolCheckbox.click();

        document.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "Escape",
            code: "Escape",
            keyCode: 27,
            which: 27,
            bubbles: true,
            cancelable: true,
          })
        );
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
    if (e.key.toLowerCase() === penKey) {
      e.preventDefault();
      console.log("K key pressed - toggling pen tool");
      toggleTool("#toolpen", "pen tool");
    }

    if (e.key.toLowerCase() === letterKey) {
      e.preventDefault();
      console.log("L key pressed - toggling letter tool");
      toggleTool("#toolletter", "letter tool");
    }
  });
})();

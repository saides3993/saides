document.addEventListener('DOMContentLoaded', () => {
    // Game controls and state management
    const game1Controls = {
      canvas: document.querySelector("#unity-canvas-game1"),
      unityInstance: null,
      loaderUrl: './skate_for_your_life/skate_for_your_life.loader.js',
      isActive: false,
      loadingBar: document.querySelector("#unity-loading-bar-game1"),
      progressBar: document.querySelector("#unity-progress-bar-full-game1")
    };
  
    const game2Controls = {
      canvas: document.querySelector("#unity-canvas-game2"),
      unityInstance: null,
      loaderUrl: './pi_day_build/pi_day.loader.js',
      isActive: false,
      loadingBar: document.querySelector("#unity-loading-bar-game2"),
      progressBar: document.querySelector("#unity-progress-bar-full-game2")
    };
  
    const loadUnityGame = (gameControls, otherGameControls) => {
      // Deactivate the other game if it's running
      if (otherGameControls.isActive) {
        otherGameControls.isActive = false;
        if (otherGameControls.unityInstance) {
          otherGameControls.unityInstance.Quit();
          otherGameControls.unityInstance = null;
        }
      }
  
      // Only load if the game isn't already active
      if (!gameControls.isActive) {
        gameControls.isActive = true;
  
        const config = {
          dataUrl: gameControls.loaderUrl.replace('.loader.js', '.data'),
          frameworkUrl: gameControls.loaderUrl.replace('.loader.js', '.framework.js'),
          codeUrl: gameControls.loaderUrl.replace('.loader.js', '.wasm'),
          streamingAssetsUrl: "StreamingAssets",
          companyName: "saides",
          productName: "Game",
          productVersion: "1.0",
        };
  
        // Make sure loading bar is visible before starting load
        gameControls.loadingBar.style.display = "block";
  
        // Remove any existing Unity loader scripts
        const existingScript = document.querySelector(`script[src="${gameControls.loaderUrl}"]`);
        if (existingScript) {
          existingScript.remove();
        }
  
        const script = document.createElement('script');
        script.src = gameControls.loaderUrl;
  
        script.onload = () => {
          createUnityInstance(gameControls.canvas, config, (progress) => {
            gameControls.progressBar.style.width = `${100 * progress}%`;
          }).then((unityInstance) => {
            gameControls.unityInstance = unityInstance;
            gameControls.loadingBar.style.display = "none";
          }).catch((message) => {
            console.error(`Failed to load Unity game: ${message}`);
            gameControls.isActive = false;
            gameControls.loadingBar.style.display = "none";
          });
        };
  
        script.onerror = () => {
          console.error(`Failed to load Unity loader script: ${gameControls.loaderUrl}`);
          gameControls.isActive = false;
          gameControls.loadingBar.style.display = "none";
        };
  
        document.body.appendChild(script);
      }
    };
  
    // Button event listeners
    document.getElementById("activate-game1").addEventListener("click", () => {
      loadUnityGame(game1Controls, game2Controls);
    });
  
    document.getElementById("activate-game2").addEventListener("click", () => {
      loadUnityGame(game2Controls, game1Controls);
    });
  });
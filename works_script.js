document.addEventListener('DOMContentLoaded', () => {
    const buildUrl = "pi_day_build";
    const loaderUrl = buildUrl + "/pi_day.loader.js";
    const config = {
        dataUrl: buildUrl + "/pi_day.data",
        frameworkUrl: buildUrl + "/pi_day.framework.js",
        codeUrl: buildUrl + "/pi_day.wasm",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "saides",
        productName: "pi day",
        productVersion: "1.0",
    };

    const canvas = document.querySelector("#unity-canvas");
    const loadingBar = document.querySelector("#unity-loading-bar");
    const progressBarFull = document.querySelector("#unity-progress-bar-full");
    const warningBanner = document.querySelector("#unity-warning");

    // Show the loading screen
    const showBanner = (msg, color) => {
        warningBanner.style.display = "block";
        warningBanner.style.backgroundColor = color;
        warningBanner.textContent = msg;
    };

    const createUnityInstance = (script) => {
        const canvas = document.querySelector("#unity-canvas");
        
        return script.createUnityInstance(canvas, config, (progress) => {
            progressBarFull.style.width = 100 * progress + "%";
        }).then((unityInstance) => {
            loadingBar.style.display = "none";
            return unityInstance;
        }).catch((message) => {
            showBanner(message, '#ff0000');
        });
    };

    // Load the Unity loader script dynamically
    const script = document.createElement('script');
    script.src = loaderUrl;
    script.onload = () => createUnityInstance(window.createUnityLoader);
    document.body.appendChild(script);
});
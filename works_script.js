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

    // Load the Unity loader script dynamically
    const script = document.createElement('script');
    script.src = loaderUrl;
    script.onload = () => {
        if (typeof createUnityInstance === 'function') {
            createUnityInstance(canvas, config, (progress) => {
                progressBarFull.style.width = `${100 * progress}%`;
            }).then((unityInstance) => {
                loadingBar.style.display = "none";
            }).catch((message) => {
                showBanner(message, "#ff0000");
            });
        } else {
            showBanner("Unity loader failed to initialize.", "#ff0000");
        }
    };
    script.onerror = () => {
        showBanner("Failed to load Unity loader script.", "#ff0000");
    };
    document.body.appendChild(script);

    // Hide the WebGL legend (optional)
    const webglLegend = document.querySelector("#unity-webgl-legend");
    if (webglLegend) {
        webglLegend.style.display = "none";
    }
});

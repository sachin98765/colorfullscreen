
        let colorInterval;
        let randomColorEnabled = false;
        let imageSet = false;

        function updateTime() {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { hour12: false });
            const digits = timeString.replace(/:/g, '').split('');
            document.querySelectorAll('.flip').forEach((el, i) => el.textContent = digits[i]);
        }

        function toggleFullScreen() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
                document.getElementById("controls").classList.add("hidden");
            } else {
                document.exitFullscreen();
            }
        }

        document.addEventListener("fullscreenchange", () => {
            if (!document.fullscreenElement) {
                document.getElementById("controls").classList.remove("hidden");
            }
        });

        function toggleRandomColors() {
            if (imageSet) return; // If image is set, do nothing

            randomColorEnabled = !randomColorEnabled;
            document.getElementById("toggleSwitch").classList.toggle("active");

            if (randomColorEnabled) {
                colorInterval = setInterval(() => {
                    document.body.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
                }, 2000);
            } else {
                clearInterval(colorInterval);
                document.body.style.backgroundColor = "black";
            }
        }

        function setBackgroundImage() {
            const file = document.getElementById("imageUpload").files[0];
            if (file) {
                const backgroundImage = document.getElementById("backgroundImage");
                backgroundImage.src = URL.createObjectURL(file);
                backgroundImage.style.display = "block";
                document.getElementById("resetImageBtn").style.display = "inline-block";
                
                clearInterval(colorInterval);
                document.getElementById("toggleSwitch").classList.remove("active");
                randomColorEnabled = false;
                imageSet = true;
            }
        }

        function resetBackgroundImage() {
            document.getElementById("backgroundImage").style.display = "none";
            document.getElementById("resetImageBtn").style.display = "none";
            imageSet = false;
        }

        setInterval(updateTime, 1000);
        updateTime();

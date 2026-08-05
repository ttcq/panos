//====================================================
// Motion Controller
// Version 1.0
//====================================================

class MotionController {

    constructor(viewer, button) {

        this.viewer = viewer;
        this.button = button;

        this.enabled = false;

        this.updateButton();

    }

    updateButton() {

        this.button.classList.remove(
            "inactive",
            "active",
            "error"
        );

        if (this.enabled) {

            this.button.classList.add("active");

        } else {

            this.button.classList.add("inactive");

        }

    }

    async start() {

        if (!this.viewer.isOrientationSupported()) {

            this.button.classList.remove("inactive");
            this.button.classList.add("error");

            return false;

        }

        try {

            this.viewer.startOrientation();

            this.enabled = true;

            this.updateButton();

            console.log("Motion enabled.");

            return true;

        }
        catch (err) {

            console.error(err);

            this.button.classList.remove("inactive");
            this.button.classList.add("error");

            return false;

        }

    }

    stop() {

        this.viewer.stopOrientation();

        this.enabled = false;

        this.updateButton();

        console.log("Motion disabled.");

    }

    async toggle() {

        if (this.enabled) {

            this.stop();

        } else {

            await this.start();

        }

    }

}
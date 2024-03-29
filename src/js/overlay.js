import OverlayScrollbars from "overlayscrollbars";
import { eventListner } from '../js/utilities.js';

let pictureID = [];

export const picture = () => {

    const img = document.querySelectorAll(".sitesImg");
    for (let i = 1; i <= img.length; i++) {
        let id = `s5${i}`;
        pictureID.push(id);
    }
}

const pictureDisplay = (item) => {

    pictureID.forEach( (element) => {
        
        const obj = document.getElementById(element);
        if (obj.id === item) {
            if (window.getComputedStyle(obj).getPropertyValue("display") === "none") {
                obj.style.display = "block";
                obj.classList.add("fadeInOpacity");
                setTimeout(() => {
                    obj.classList.remove("fadeInOpacity");
                }, 750);
            }
        } else {
            obj.style.display = "none";
        }
    })
}

export const fromOverlay = (event) => {

    OverlayScrollbars(document.querySelector("#overlay"), {
        className: "os-theme-dark os-theme-dark-edgy"
    });

    OverlayScrollbars(document.querySelector("#message"), {
        className: "os-theme-dark os-theme-dark-edgy"
    });
}

export const sitesOverlay = (event) => {

    let cached = null;
    let instance = OverlayScrollbars(document.querySelector("#ob0"), {
        className: "os-theme-dark os-theme-dark-edgy",
        callbacks: {
            onScroll: (event) => {

                if (!cached) {
                    setTimeout(() => {

                        let preview = document.querySelectorAll(".scrollPreview");
                        let ranges = [...preview].map(item => item.offsetTop);

                        const rangesLenght = ranges.length;
                        let scroll_pos = event.target.scrollTop;

                        if (scroll_pos < ranges[0]) {
                            pictureDisplay(pictureID[0]);
                        }
                        for (let i = 0; i < rangesLenght - 1; i++) {
                            let y = i + 1;
                            if (scroll_pos > ranges[i] && scroll_pos < ranges[y]) {
                                pictureDisplay(pictureID[y]);
                            }
                        }
                        if (scroll_pos > ranges[rangesLenght - 1]) {
                            pictureDisplay(pictureID.at(-1));
                        }

                        cached = null;
                    }, 300);
                }
                cached = true;
            },
            onInitialized: eventListner(document.querySelector("#close"), "click", () => {
                instance.scroll({ y: "0%" }, 2500);
            }, false)
        }
    });
}

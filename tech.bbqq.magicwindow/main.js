var flipped = false;

function buttonClick() {
    if (flipped) {
        kindle.device.setOrientation("portraitUp");
        flipped = false;
    } else {
        kindle.device.setOrientation("portraitDown");
        flipped = true;
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const imageInput = document.getElementById('imageInput');
    const memeContainer = document.getElementById('memeContainer');
    const memeImage = document.getElementById('memeImage');
    const topText = document.getElementById('topText');
    const bottomText = document.getElementById('bottomText');
    const downloadButton = document.getElementById('downloadButton');
    const increaseFontSizeButton = document.getElementById('increaseFontSize');
    const decreaseFontSizeButton = document.getElementById('decreaseFontSize');
    const textColorInput = document.getElementById('textColor');

    let isDragging = false;
    let initialX;
    let initialY;
    let textMoveEnabled = true;
    let activeText;

    function startDragging(e) {
        if (e.target === topText || e.target === bottomText) {
            isDragging = true;
            initialX = e.clientX - memeContainer.offsetLeft;
            initialY = e.clientY - memeContainer.offsetTop;
            activeText = e.target;
        }
    }

    function stopDragging() {
        isDragging = false;
        activeText = null;
    }

    function moveText(e) {
        if (!isDragging || !textMoveEnabled || !activeText) return;

        const newX = e.clientX - initialX;
        const newY = e.clientY - initialY;

        activeText.style.left = `${newX}px`;
        activeText.style.top = `${newY}px`;
    }

    imageInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            memeImage.src = e.target.result;
        };

        reader.readAsDataURL(file);
    });

    topText.addEventListener('mousedown', startDragging);
    bottomText.addEventListener('mousedown', startDragging);

    document.addEventListener('mousemove', moveText);
    document.addEventListener('mouseup', stopDragging);

    increaseFontSizeButton.addEventListener('click', function () {
        const currentFontSize = parseInt(getComputedStyle(topText).fontSize);
        topText.style.fontSize = `${currentFontSize + 2}px`;
        bottomText.style.fontSize = `${currentFontSize + 2}px`;
    });

    decreaseFontSizeButton.addEventListener('click', function () {
        const currentFontSize = parseInt(getComputedStyle(topText).fontSize);
        if (currentFontSize > 2) {
            topText.style.fontSize = `${currentFontSize - 2}px`;
            bottomText.style.fontSize = `${currentFontSize - 2}px`;
        }
    });

    textColorInput.addEventListener('input', function () {
        const textColor = textColorInput.value;
        topText.style.color = textColor;
        bottomText.style.color = textColor;
    });

    downloadButton.addEventListener('click', function () {
        textMoveEnabled = false;
        html2canvas(memeContainer).then(function (canvas) {
            const link = document.createElement('a');
            document.body.appendChild(link);
            link.href = canvas.toDataURL('image/png');
            link.download = 'meme.png';
            link.click();
            document.body.removeChild(link);
            textMoveEnabled = true;
        });
    });
});

function watermark(settings) {
    const defaultSettings = {
        watermark_alpha_max: 0.04,
        watermark_alpha_min: 0.005,
        watermark_alpha: 0.07,
        watermark_txt: "text",
        watermark_x: 20,
        watermark_y: 20,
        watermark_rows: 10,
        watermark_cols: 10,
        watermark_x_space: 5,
        watermark_y_space: 20,
        watermark_color: '#000000',
        watermark_fontsize: '20px',
        watermark_font: '微软雅黑',
        watermark_width: 150,
        watermark_height: 90,
        watermark_angle: 25,
    };

    const mergedSettings = { ...defaultSettings, ...settings };
    const { watermark_cols, watermark_rows, watermark_x, watermark_y, watermark_width, watermark_height, watermark_x_space, watermark_y_space, watermark_angle } = mergedSettings;
    const pageWidth = screen.width;
    const pageHeight = screen.height;

    if (watermark_cols === 0 || (parseInt(watermark_x + watermark_width * watermark_cols + watermark_x_space * (watermark_cols - 1)) < pageWidth)) {
        mergedSettings.watermark_cols = parseInt((pageWidth - watermark_x + watermark_x_space) / (watermark_width + watermark_x_space));
        mergedSettings.watermark_x_space = parseInt((pageWidth - watermark_x - watermark_width * watermark_cols) / (watermark_cols - 1));
    }

    if (watermark_rows === 0 || (parseInt(watermark_y + watermark_height * watermark_rows + watermark_y_space * (watermark_rows - 1)) < pageHeight)) {
        mergedSettings.watermark_rows = parseInt((watermark_y_space + pageHeight - watermark_y) / (watermark_height + watermark_y_space));
        mergedSettings.watermark_y_space = parseInt(((pageHeight - watermark_y) - watermark_height * watermark_rows) / (watermark_rows - 1));
    }

    const oTemp = document.createDocumentFragment();

    for (let i = 0; i < watermark_rows; i++) {
        const y = watermark_y + (watermark_y_space + watermark_height) * i;

        for (let j = 0; j < watermark_cols; j++) {
            const x = watermark_x + (watermark_width + watermark_x_space) * j;

            const mask_div = document.createElement('div');
            mask_div.id = `mask_div${i}${j}`;
            mask_div.appendChild(document.createTextNode(mergedSettings.watermark_txt));
            mask_div.classList.add('watermark');

            mask_div.style.cssText = `
                -webkit-transform: rotate(-${watermark_angle}deg);
                -moz-transform: rotate(-${watermark_angle}deg);
                -ms-transform: rotate(-${watermark_angle}deg);
                -o-transform: rotate(-${watermark_angle}deg);
                transform: rotate(-${watermark_angle}deg);
                visibility: visible;
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                overflow: hidden;
                z-index: 9999;
                pointer-events: none;
                opacity: ${i % 2 === 0 ? (j % 2 === 0 ? mergedSettings.watermark_alpha_max : mergedSettings.watermark_alpha_min) : mergedSettings.watermark_alpha_min};
                font-size: ${mergedSettings.watermark_fontsize};
                color: ${mergedSettings.watermark_color};
                text-align: center;
                width: ${mergedSettings.watermark_width}px;
                height: ${mergedSettings.watermark_height}px;
                display: block;
            `;

            oTemp.appendChild(mask_div);
        }
    }

    document.body.appendChild(oTemp);
}

function getIP(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://ip.rainycrying.com/", true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = xhr.responseText;
            const ip = response;
            callback(ip);
        } else {
            callback(null);
        }
    };

    xhr.onerror = function () {
        callback(null);
    };

    xhr.send();
}

function generateWatermark() {
    const timestamp = new Date().getTime();
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}-${month}-${day}`;
    const domain = window.location.hostname;

    getIP(function (ip) {
        const output = `${domain}_${formattedDate}_${ip || 'unknown'}`;

        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            const [name, value] = cookie.split('=');
            if (name === "cookieName") {
                watermark({ watermark_txt: value });
                return;
            }
        }

        watermark({ watermark_txt: output });
    });
}

generateWatermark();

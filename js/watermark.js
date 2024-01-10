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

    const page_width = screen.width;
    const page_height = screen.height;

    if (mergedSettings.watermark_cols === 0 || (mergedSettings.watermark_x + mergedSettings.watermark_width * mergedSettings.watermark_cols + mergedSettings.watermark_x_space * (mergedSettings.watermark_cols - 1)) < page_width) {
        mergedSettings.watermark_cols = parseInt((page_width - mergedSettings.watermark_x + mergedSettings.watermark_x_space) / (mergedSettings.watermark_width + mergedSettings.watermark_x_space));
        mergedSettings.watermark_x_space = parseInt((page_width - mergedSettings.watermark_x - mergedSettings.watermark_width * mergedSettings.watermark_cols) / (mergedSettings.watermark_cols - 1));
    }

    if (mergedSettings.watermark_rows === 0 || (mergedSettings.watermark_y + mergedSettings.watermark_height * mergedSettings.watermark_rows + mergedSettings.watermark_y_space * (mergedSettings.watermark_rows - 1)) < page_height) {
        mergedSettings.watermark_rows = parseInt((mergedSettings.watermark_y_space + page_height - mergedSettings.watermark_y) / (mergedSettings.watermark_height + mergedSettings.watermark_y_space));
        mergedSettings.watermark_y_space = parseInt(((page_height - mergedSettings.watermark_y) - mergedSettings.watermark_height * mergedSettings.watermark_rows) / (mergedSettings.watermark_rows - 1));
    }

    const oTemp = document.createDocumentFragment();

    for (let i = 0; i < mergedSettings.watermark_rows; i++) {
        const y = mergedSettings.watermark_y + (mergedSettings.watermark_y_space + mergedSettings.watermark_height) * i;

        for (let j = 0; j < mergedSettings.watermark_cols; j++) {
            const x = mergedSettings.watermark_x + (mergedSettings.watermark_width + mergedSettings.watermark_x_space) * j;

            const mask_div = document.createElement('div');
            mask_div.id = `mask_div${i}${j}`;
            mask_div.appendChild(document.createTextNode(mergedSettings.watermark_txt));

            mask_div.style.cssText = `
                -webkit-transform: rotate(-${mergedSettings.watermark_angle}deg);
                -moz-transform: rotate(-${mergedSettings.watermark_angle}deg);
                -ms-transform: rotate(-${mergedSettings.watermark_angle}deg);
                -o-transform: rotate(-${mergedSettings.watermark_angle}deg);
                transform: rotate(-${mergedSettings.watermark_angle}deg);
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

function mainusage() {
    const url = `${document.location.protocol}//${document.location.hostname}:${document.location.port}/rest/api/user/current`;
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            const username = JSON.parse(xhr.responseText).username;
            watermark({ watermark_txt: username });
        }
    };

    xhr.open("GET", url, true);
    xhr.send(null);
}

mainusage();

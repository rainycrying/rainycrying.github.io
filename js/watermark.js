
function watermark(settings) {
    //默认设置
    var defaultSettings={
      watermark_alpha_max:0.04,//水印透明度
      watermark_alpha_min:0.005,//水印透明度
      watermark_alpha:0.07,//水印透明度
      watermark_txt:"text",
      watermark_x:20,//水印起始位置x轴坐标
      watermark_y:20,//水印起始位置Y轴坐标
      watermark_rows:10,//水印行数
      watermark_cols:10,//水印列数
      watermark_x_space:5,//水印x轴间隔
      watermark_y_space:20,//水印y轴间隔
      watermark_color:'#000000',//水印字体颜色
      watermark_fontsize:'20px',//水印字体大小
      watermark_font:'微软雅黑',//水印字体
      watermark_width:150,//水印宽度
      watermark_height:90,//水印长度
      watermark_angle:25, //水印倾斜度数
  
    };
    //采用配置项替换默认值，作用类似jquery.extend
    if(arguments.length===1&&typeof arguments[0] ==="object" )
    {
      var src=arguments[0]||{};
      for(key in src)
      {
        if(src[key]&&defaultSettings[key]&&src[key]===defaultSettings[key])
          continue;
        else if(src[key])
          defaultSettings[key]=src[key];
      }
    }
    var oTemp = document.createDocumentFragment();
    var page_width = screen.width; // Math.max(document.body.scrollWidth,document.body.clientWidth)
    var page_height = screen.height; // Math.max(document.body.scrollHeight,document.body.clientHeight);
    if (defaultSettings.watermark_cols == 0 || (parseInt(defaultSettings.watermark_x + defaultSettings.watermark_width *defaultSettings.watermark_cols + defaultSettings.watermark_x_space * (defaultSettings.watermark_cols - 1)) < page_width)) {
      defaultSettings.watermark_cols = parseInt((page_width-defaultSettings.watermark_x+defaultSettings.watermark_x_space) / (defaultSettings.watermark_width + defaultSettings.watermark_x_space));
      defaultSettings.watermark_x_space = parseInt((page_width - defaultSettings.watermark_x - defaultSettings.watermark_width * defaultSettings.watermark_cols) / (defaultSettings.watermark_cols - 1));
    }
    if (defaultSettings.watermark_rows == 0 || (parseInt(defaultSettings.watermark_y + defaultSettings.watermark_height * defaultSettings.watermark_rows + defaultSettings.watermark_y_space * (defaultSettings.watermark_rows - 1)) < page_height)) {
      defaultSettings.watermark_rows = parseInt((defaultSettings.watermark_y_space + page_height - defaultSettings.watermark_y) / (defaultSettings.watermark_height + defaultSettings.watermark_y_space));
      defaultSettings.watermark_y_space = parseInt(((page_height - defaultSettings.watermark_y) - defaultSettings.watermark_height * defaultSettings.watermark_rows) / (defaultSettings.watermark_rows - 1));
    }
    var x;
    var y;
    for (var i = 0; i < defaultSettings.watermark_rows; i++) {
      y = defaultSettings.watermark_y + (defaultSettings.watermark_y_space + defaultSettings.watermark_height) * i;
      for (var j = 0; j < defaultSettings.watermark_cols; j++) {
        x = defaultSettings.watermark_x + (defaultSettings.watermark_width + defaultSettings.watermark_x_space) * j;
        var mask_div = document.createElement('div');
        mask_div.id = 'mask_div' + i + j;
        mask_div.appendChild(document.createTextNode(defaultSettings.watermark_txt));
        //设置水印div倾斜显示
        mask_div.style.webkitTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
        mask_div.style.MozTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
        mask_div.style.msTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
        mask_div.style.OTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
        mask_div.style.transform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
        mask_div.style.visibility = "";
        mask_div.style.position = "fixed";
        //选不中
        mask_div.style.left = x + 'px';
        mask_div.style.top = y + 'px';
        mask_div.style.overflow = "hidden";
        mask_div.style.zIndex = "9999";
        mask_div.style.pointerEvents = "none";
  
        if(i % 2 ==0){
          if(j % 2 == 0){
            opacity = defaultSettings.watermark_alpha_max;
          }else{
            opacity = defaultSettings.watermark_alpha_min;
          }
        }else{
            opacity = defaultSettings.watermark_alpha_min;
        }
        //mask_div.style.border="solid #eee 1px";
        mask_div.style.opacity = opacity;
        mask_div.style.fontSize = defaultSettings.watermark_fontsize;
        mask_div.style.color = defaultSettings.watermark_color;
        mask_div.style.textAlign = "center";
        mask_div.style.width = defaultSettings.watermark_width + 'px';
        mask_div.style.height = defaultSettings.watermark_height + 'px';
        mask_div.style.display = "block";
        oTemp.appendChild(mask_div);
      };
    };
    document.body.appendChild(oTemp);
  }
  
function getCookieValue() {
      var timestamp = new Date().getTime();
      var date = new Date(timestamp);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var formattedDate = year + '-' + month + '-' + day;
      var domain = window.location.hostname;
      var output = domain + '_' + formattedDate;

      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i].trim();
          var cookieParts = cookie.split('=');
          var name = cookieParts[0];
          var value = cookieParts[1];
          if (name === "cookieName") {
            watermark({ watermark_txt: value });
            return;
          }
      }
      watermark({ watermark_txt: output });
}
getCookieValue()


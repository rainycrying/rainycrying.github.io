<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link type="image/vnd.microsoft.icon" href="favicon.ico" rel="shortcut icon">
        <title>RainyCrying</title>     
        <meta name="Keywords" content="RainyCrying">
        <meta name="Description" content="RainyCrying">
    </head>
    <style>
        html,body,div,span,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,a,code,em,img,q,small,strong,dd,dl,dt,li,ol,ul,fieldset,form,label,table,tbody,tr,th,td,input{margin:0;padding:0;}
        body{ margin:0; padding:0; font-family: "\5FAE\8F6F\96C5\9ED1"; font-size: 12px; background-color: #f3f7fb;min-width: 1200px}
        ol,ul,li{list-style-type:none;}
        button{overflow:visible;cursor:pointer;}
        fieldset,img{border:none 0;}
        input,select,form,img,button,textarea{vertical-align:middle;}
        em,strong,cite{font-style:normal;}
        table{empty-cells:show;}
        table,th,td{border-collapse:collapse;}
        a{text-decoration:none;}
        a:hover{text-decoration:underline;}
        .clear{clear:both;}
        .clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden;}
        .main { background:#5997f5 url("homebg.jpg") center 0 no-repeat; height: 100%;background-size: cover;}
        .content{ width: 980px; margin: 0 auto; position: relative; overflow: hidden;}
        .logo{ padding: 70px 0 80px;}
        .left{ float: left; width: 488px;}
        .right{ float: right; width: 410px; padding-top: 74px;}
        .tips{margin-top: 25px;color: #fff; font-size: 12px; text-align: center;}
        .footer{ background-color: rgba(0, 56, 88, 0.2); padding: 42px 0; }
        .footer p{ font-size: 16px; color: #fff; text-align: center; line-height: 30px;}
        .footer p.p1{ padding: 0 0 14px 0;}
    </style>
<body>
    <div class="main">
        <div class="content">
            <div class="logo">
                <img src="logo1.png" alt="RainyCrying">
            </div>
            <div class="clearfix">
                <div class="left">
                    <img src="show.png">
                </div>
                <div class="right">
                    <div class="title">
                        <img src="text.png">
                    </div>
                    <p class="tips"></p>
                </div>
            </div>
        </div>
        <div class="footer">
            <p class="p1" ><a href="https://beian.miit.gov.cn/" target="_blank" id="innerText">晋ICP备19006860号</a></p>
            <p class="p2">Copyright © 2019 作者：RainyCrying. Linux运维工程师</p>
        </div>
    </div>

</body>
<script >
        // 定义白名单数组
const whiteList = ['rainycrying.com', 'xn--e1to22ajja.com', 'xn--vo1aa064g.com', 'xn--vo1aa064g.xn--6qq986b3xl'];
// 获取当前域名
const currentHost = window.location.host;
// 获取 id 为 innerText 的元素
const exampleElement = document.getElementById('innerText');

for (let i = 0; i < whiteList.length; i++) {
  if (currentHost.includes(whiteList[i])) {
        if (whiteList[i] == 'rainycrying.com') {
        exampleElement.innerText = '晋ICP备19006860号-1';
        }else if(whiteList[i] == 'xn--e1to22ajja.com'){
                exampleElement.innerText = '晋ICP备19006860号-2';
        }
        else if(whiteList[i] == 'xn--vo1aa064g.com'){
                exampleElement.innerText = '晋ICP备19006860号-3';
        }
        else if(whiteList[i] == 'xn--vo1aa064g.xn--6qq986b3xl'){
                exampleElement.innerText = '晋ICP备19006860号-4';
        }
        else {
        console.log('当前域名不在白名单中');
        }
    break;
  }
}
</script>
</html>

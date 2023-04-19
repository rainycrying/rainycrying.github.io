---
layout: post
title:  "python+PIL图像相似度检测"
categories: [python,PIL]
tags: [python,PIL]
---
#【python + PIL】图像相似度检测


Fundimental
在这里简单的实现了直方图匹配和图像感知的哈希算法。 
采用的python库为PIL。

直方图匹配
基本公式为 

$$
\operatorname{sim}(G, S)=\frac{1}{N} \sum_{i=1}^{N}\left(1-\frac{\left|g_{i}-s_{i}\right|}{\operatorname{Max}\left(g_{i}, s_{i}\right)}\right)
$$

Sim(G,S)=1N∑i=1N(1−|gi−si|Max(gi,si))
Sim(G,S)=1N∑i=1N(1−|gi−si|Max(gi,si))

对RGB分别取出来然后进行匹配
其他
此外可以通过把图像分块进行匹配来减少由于位置信息不足带来的误差。这里在实现的时候把图像分为了4*4，取每块的匹配值，取平均。

（这里后面的reference里有一篇写的更好orz但是我是写不出这种风格的
1
感知哈希算法
这种算法据说是谷歌识图等使用的方法，但是最后做出来仿佛在小规模的样本中表现并不好。

Better ways
• Position and structure 
• Better color spaces, Lab/HSV/Yuv … 
• Texture features, Gabor filter bank 
• Better similarity computing 
• advanced machine learning methods

灰度匹配
灰度匹配的基本思想:以统计的观点将图像看成是二维信号，采用统计相关的方法寻找信号间的相关匹配。利用两个信号的相关函数，评价它们的相似性以确定同名点。 
常用方法比如直方图匹配、ssim、图像感知哈希算法

矩阵分解
图像本身就是一个矩阵，可以依靠数学上矩阵分解的一些知识来获取矩阵中一些代表这个矩阵元素值和分布的一些鲁棒性特征来对图像的相似度进行计算。 
最常用的一般是SVD分解和NMF分解。

特征匹配
特征匹配是指通过分别提取两个或多个图像的特征（点、线、面等特征），对特征进行参数描述，然后运用所描述的参数来进行匹配的一种算法。 
常用的特征提取与匹配方法有：统计方法、几何法、模型法、信号处理法、边界特征法、傅氏形状描述法、几何参数法、形状不变矩法等。

Code
        # -*- coding: utf-8 -*-  

        # Birdy 17/11/27
        import os
        import PIL.Image as Image



        def difference(hist1,hist2):
            sum1 = 0
            for i in range(len(hist1)):
            if (hist1[i] == hist2[i]):
                sum1 += 1
            else:
                sum1 += 1 - float(abs(hist1[i] - hist2[i]))/ max(hist1[i], hist2[i])
            return sum1/len(hist1)

        def similary_calculate(path1 , path2 , mode):
            if(mode == 3):
                img1 = Image.open(path1).resize((8,8)).convert('1')  
                img2 = Image.open(path2).resize((8,8)).convert('1')
                hist1 = list(img1.getdata())
                hist2 = list(img2.getdata())
                return difference(hist1, hist2)

            # 预处理
            img1 = Image.open(path1).resize((256,256)).convert('RGB')  
            img2 = Image.open(path2).resize((256,256)).convert('RGB')
            if(mode == 1):
                return difference(img1.histogram(), img2.histogram())
            if(mode == 2):
                sum = 0;
                for i in range(4):
                    for j in range(4):
                        hist1 = img1.crop((i*64, j*64, i*64+63, j*64+63)).copy().histogram()
                        hist2 = img2.crop((i*64, j*64, i*64+63, j*64+63)).copy().histogram()
                        sum += difference(hist1, hist2)
                        #print difference(hist1, hist2)
                return sum/16
            return 0


        def readfolder(folder,pic, mode):
        # 不同的mode对应不同的类型
            file_list = []
            t = 0
            file_temp = ''
            for root,directors,files in os.walk(folder):
                for filename in files:
                    filepath = os.path.join(root,filename)
                    if (filepath.endswith(".png") or filepath.endswith(".jpg")):
                    remember = similary_calculate(pic,filename,mode)
                    print filename
                    print remember
                    if (remember > t) and remember!= 1:
                        file_temp = filename
                        t = remember

            return file_temp

        if __name__ == '__main__': 
            print "###########直方图的距离计算#############"
            print "相似度最高的图是" + readfolder('E:\Code\similarity','t2.png',1)
            print "###########分块直方图的距离计算#############"
            print "相似度最高的图是" + readfolder('E:\Code\similarity','t2.png',2)
            print "##############感知哈希算法###############"
            print "相似度最高的图是" + readfolder('E:\Code\similarity','t2.png',3)


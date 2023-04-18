---
layout: post
title:  "Cassandra 安装"
categories: [Cassandra,install]
tags: [Cassandra,install]
---
# Cassandra 安装



Cassandra可以使用cqlsh以及不同语言的驱动程序访问。本章介绍如何设置cqlsh和java环境以使用Cassandra。

## 预安装设置

在Linux环境中安装Cassandra之前，我们需要使用ssh（安全Shell）设置Linux。按照以下步骤设置Linux环境。

### 创建用户

在开始时，建议为Hadoop创建一个单独的用户，以便将Hadoop文件系统与Unix文件系统隔离。 按照以下步骤创建用户。

- 使用命令“su”打开根。
- 使用命令“useradd username”从root帐户创建用户。
- 现在您可以使用命令“su username”打开现有的用户帐户。

打开Linux终端并键入以下命令以创建用户。

```
$ su
password:
# useradd hadoop
# passwd hadoop
New passwd:
Retype new passwd
```

### SSH设置和密钥生成

需要SSH设置才能在集群上执行不同的操作，例如启动，停止和分布式守护程序shell操作。要对Hadoop的不同用户进行身份验证，需要为Hadoop用户提供公钥/私钥对，并与不同的用户共享。

以下命令用于使用SSH生成键值对：

- 将公共密钥表单id_rsa.pub复制到authorized_keys，
- 并提供所有者，
- 分别对authorized_keys文件的读写权限。

```
$ ssh-keygen -t rsa
$ cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
$ chmod 0600 ~/.ssh/authorized_keys
```

- 验证SSH：

```
ssh localhost
```

## 安装Java

Java是Cassandra的主要先决条件。 首先，您应该使用以下命令验证系统中是否存在Java：

```
$ java -version
```

如果一切正常，它会给你以下输出。

```
java version "1.7.0_71"
Java(TM) SE Runtime Environment (build 1.7.0_71-b13)
Java HotSpot(TM) Client VM (build 25.0-b02, mixed mode)
```


### 设置路径

在“/.bashrc”中设置Cassandra路径的路径，如下所示。

```
[hadoop@linux ~]$ gedit ~/.bashrc

export CASSANDRA_HOME = /data/app/apache-cassandra-3.10/
export PATH = $PATH:$CASSANDRA_HOME/bin

```

## 下载 Cassandra

Apache Cassandra可用的[下载链接](http://cassandra.apache.org/download/)，Cassandra使用以下命令。

```
$ wget http://supergsego.com/apache/cassandra/2.1.2/apache-cassandra-2.1.2-bin.tar.gz

```

使用命令zxvf解压缩Cassandra，如下所示。

```
$ tar zxvf apache-cassandra-2.1.2-bin.tar.gz.

```

创建一个名为cassandra的新目录，并将下载的文件的内容移动到它，如下所示。

```
$ mkdir Cassandra
$ mv apache-cassandra-2.1.2/* cassandra.

```

## 配置 Cassandra 

打开cassandra.yaml：文件，它将在Cassandra的bin目录中。

```
$ gedit cassandra.yaml

```

**注意：**如果您从deb或rpm包安装了Cassandra，配置文件将位于Cassandra的/ etc / cassandra目录中。

以上命令打开cassandra.yaml文件。验证以下配置。 默认情况下，这些值将设置为指定的目录。

- **data_file_directories“/ var / lib / cassandra / data”**
- **commitlog_directory “/var/lib/cassandra/commitlog”**
- **saved_caches_directory “/var/lib/cassandra/saved_caches”**

确保这些目录存在并且可以写入，如下所示。

### 创建目录

作为超级用户，创建两个目录/ var / lib / cassandra和/var./lib/cassandra，Cassandra将其数据写入其中。

```
[root@linux cassandra]# mkdir /var/lib/cassandra
[root@linux cassandra]# mkdir /var/log/cassandra

```

### 授予文件夹权限

给新创建的文件夹授予读写权限，如下所示。

```
[root@linux /]# chmod 777 /var/lib/cassandra
[root@linux /]# chmod 777 /var/log/cassandra

```

## 启动 Cassandra

要启动Cassandra，请打开终端窗口，导航到Cassandra主目录/ home，解压缩Cassandra，然后运行以下命令启动Cassandra服务器。

```
$ cd $CASSANDRA_HOME
$./bin/cassandra -f 

```

使用-f选项告诉Cassandra保留在前台，而不是作为后台进程运行。如果一切顺利，您可以看到Cassandra服务器启动。


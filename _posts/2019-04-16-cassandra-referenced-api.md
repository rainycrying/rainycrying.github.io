---
layout: post
title:  "Cassandra 参考API"
categories: [Cassandra,api]
tags: [Cassandra,api]
---
# Cassandra 参考API



本章涵盖Cassandra中的所有重要类。

## 集群（Cluster） 

这个类是驱动程序的主要入口点。它属于com.datastax.driver.core包。

### 方法

| 序号  | 方法和描述                                                   |
| ----- | ------------------------------------------------------------ |
| **1** | **Session connect()**它在当前集群上创建一个新会话并对其进行初始化。 |
| **2** | **void close()**它用于关闭集群实例。                         |
| **3** | **static Cluster.Builder builder()**它用于创建一个新的Cluster.Builder实例。 |

## Cluster.Builder

此类用于实例化Cluster.Builder类。

### 方法

| 序号  | 方法和描述                                                   |
| ----- | ------------------------------------------------------------ |
| **1** | **Cluster.Builder addContactPoint(String address)**此方法向集群添加联系人。 |
| **2** | **Cluster build()**此方法使用给定的接触点构建集群。          |

## 会话

此接口保存与Cassandra群集的连接。使用此接口，可以执行CQL查询。它属于com.datastax.driver.core包。



### 方法

| 序号  | 方法和描述                                                   |
| ----- | ------------------------------------------------------------ |
| **1** | **void close()**此方法用于关闭当前会话实例。                 |
| **2** | **ResultSet execute(Statement statement)**此方法用于执行查询。它需要一个语句对象。 |
| **3** | **ResultSet execute(String query)**此方法用于执行查询。它需要一个String对象形式的查询。 |
| **4** | **PreparedStatement prepare(RegularStatement statement)**该方法准备提供的查询。查询将以Statement的形式提供。 |
| **5** | **PreparedStatement prepare(String query)**该方法准备提供的查询。查询将以String的形式提供。 |

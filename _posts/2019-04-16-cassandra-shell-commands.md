---
layout: post
title:  "Cassandra Shell命令"
categories: [Cassandra,shell]
tags: [Cassandra,shell]
---
# Cassandra Shell命令



除了CQL命令，Cassandra还提供了记录的shell命令。下面给出了Cassandra记录的shell命令。

## Help 

HELP命令显示所有cqlsh命令的摘要和简要描述。下面给出了help命令的用法。

```
cqlsh> help

Documented shell commands:
===========================
CAPTURE COPY DESCRIBE EXPAND PAGING SOURCE
CONSISTENCY DESC EXIT HELP SHOW TRACING.

CQL help topics:
================
ALTER           CREATE_TABLE_OPTIONS       SELECT
ALTER_ADD       CREATE_TABLE_TYPES         SELECT_COLUMNFAMILY
ALTER_ALTER     CREATE_USER                SELECT_EXPR
ALTER_DROP      DELETE                     SELECT_LIMIT
ALTER_RENAME    DELETE_COLUMNS             SELECT_TABLE 
```

## 

## Capture

此命令捕获命令的输出并将其添加到文件。例如，看看下面的代码，它将输出捕获到名为Outputfile的文件。

```
cqlsh> CAPTURE '/home/hadoop/CassandraProgs/Outputfile'
```

当我们在终端中键入任何命令时，输出将被给定的文件捕获。下面给出的是使用的命令和输出文件的快照。

```
cqlsh:tutorialspoint> select * from emp;
```



您可以使用以下命令关闭捕获。

```
cqlsh:tutorialspoint> capture off;
```

## 

## Consistency

此命令显示当前的一致性级别，或设置新的一致性级别。

```
cqlsh:tutorialspoint> CONSISTENCY
Current consistency level is 1.
```

## 

## Copy

此命令将数据从Cassandra复制到文件并从中复制。下面给出一个将名为emp的表复制到文件myfile的示例。

```
cqlsh:tutorialspoint> COPY emp (emp_id, emp_city, emp_name, emp_phone,emp_sal) TO ‘myfile’;
4 rows exported in 0.034 seconds.
```

如果您打开并验证给定的文件，您可以找到复制的数据，如下所示。



## 

## Describe

此命令描述Cassandra及其对象的当前集群。此命令的变体说明如下。

**Describe cluster** -此命令提供有关集群的信息。

```
cqlsh:tutorialspoint> describe cluster;

Cluster: Test Cluster
Partitioner: Murmur3Partitioner

Range ownership:
                  -658380912249644557 [127.0.0.1]
                  -2833890865268921414 [127.0.0.1]
                  -6792159006375935836 [127.0.0.1] 
```

**Describe Keyspaces** -此命令列出集群中的所有键空间。下面给出了这个命令的用法。

```
cqlsh:tutorialspoint> describe keyspaces;

system_traces system tp tutorialspoint
```

**Describe tables** -此命令列出了键空间中的所有表。下面给出了这个命令的用法。

```
cqlsh:tutorialspoint> describe tables;
emp
```

**Describe tables** -此命令提供表的描述。下面给出了这个命令的用法。

```
cqlsh:tutorialspoint> describe table emp;

CREATE TABLE tutorialspoint.emp (
   emp_id int PRIMARY KEY,
   emp_city text,
   emp_name text,
   emp_phone varint,
   emp_sal varint
) WITH bloom_filter_fp_chance = 0.01
   AND caching = '{"keys":"ALL", "rows_per_partition":"NONE"}'
   AND comment = ''
   AND compaction = {'min_threshold': '4', 'class':
   'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy',
   'max_threshold': '32'}
	
   AND compression = {'sstable_compression':
   'org.apache.cassandra.io.compress.LZ4Compressor'}
	
   AND dclocal_read_repair_chance = 0.1
   AND default_time_to_live = 0
   AND gc_grace_seconds = 864000
   AND max_index_interval = 2048
   AND memtable_flush_period_in_ms = 0
   AND min_index_interval = 128
   AND read_repair_chance = 0.0
   AND speculative_retry = '99.0PERCENTILE';
CREATE INDEX emp_emp_sal_idx ON tutorialspoint.emp (emp_sal);
```

## **Describe tables**

此命令用于描述用户定义的数据类型。下面给出了这个命令的用法。

```
cqlsh:tutorialspoint> describe type card_details;

CREATE TYPE tutorialspoint.card_details (
   num int,
   pin int,
   name text,
   cvv int,
   phone set<int>,
   mail text
);
```

## 

## Describe Types

此命令列出所有用户定义的数据类型。下面给出了这个命令的用法。假设有两种用户定义的数据类型：card和card_details。

```
cqlsh:tutorialspoint> DESCRIBE TYPES;

card_details card
```

## 

## Expand

此命令用于扩展输出。在使用此命令之前，您必须打开expand命令。下面给出了这个命令的用法。

```
cqlsh:tutorialspoint> expand on;
cqlsh:tutorialspoint> select * from emp;

@ Row 1
-----------+------------
    emp_id | 1
  emp_city | Hyderabad
  emp_name | ram
 emp_phone | 9848022338
   emp_sal | 50000
  
@ Row 2
-----------+------------
    emp_id | 2
  emp_city | Delhi
  emp_name | robin
 emp_phone | 9848022339
   emp_sal | 50000
  
@ Row 3
-----------+------------
    emp_id | 4
  emp_city | Pune
  emp_name | rajeev
 emp_phone | 9848022331
   emp_sal | 30000
  
@ Row 4
-----------+------------
    emp_id | 3
  emp_city | Chennai
  emp_name | rahman
 emp_phone | 9848022330
   emp_sal | 50000
(4 rows)
```

**注意：**您可以使用以下命令关闭展开选项。

```
cqlsh:tutorialspoint> expand off;
Disabled Expanded output.
```

## 

## Exit

此命令用于终止cql shell。

## 

## Show

此命令显示当前cqlsh会话的详细信息，如Cassandra版本，主机或数据类型假设。下面给出了这个命令的用法。

```
cqlsh:tutorialspoint> show host;
Connected to Test Cluster at 127.0.0.1:9042.

cqlsh:tutorialspoint> show version;
[cqlsh 5.0.1 | Cassandra 2.1.2 | CQL spec 3.2.0 | Native protocol v3]
```

## 

## Source

使用此命令，可以在文件中执行命令。假设我们的输入文件如下：



然后可以执行包含命令的文件，如下所示。

```
cqlsh:tutorialspoint> source '/home/hadoop/CassandraProgs/inputfile';

 emp_id |  emp_city | emp_name |  emp_phone | emp_sal
--------+-----------+----------+------------+---------
      1 | Hyderabad |   ram    | 9848022338 | 50000
      2 | Delhi     |   robin  | 9848022339 | 50000
      3 | Pune      |   rajeev | 9848022331 | 30000
      4 | Chennai   |   rahman | 9848022330 | 50000
(4 rows)
```

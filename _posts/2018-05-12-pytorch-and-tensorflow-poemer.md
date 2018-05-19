---
layout: post
title:  "写诗机器人终于能正常写诗"
categories: AI
tags:  AI,RNN
author: 飘的沙鸥
---

* content
{:toc}
## 重新开始
开始接触人工智能的时候已经安装过一些默认应用，但一直未成功，这次花了一点时间又重新选定了主流框架，重新开始，一个是使用pytorch,另一个是使用tensorflow,pytorch学习泰戈尔的飞鸟集（英文28297b）；tensorflow的学习全唐诗(中文近10M）。

----------




![google翻译 投降的表情！](https://i.imgur.com/TGs1yNx.png)
## pytorch英文诗人
pytorch基本很顺利，在windows下都能顺利的跑起来，只是因为数据过小没用GPU大概3分钟就训练完了，结果吗 各种意外，甚至连几大翻译软件都给整哭了

![google翻译 投降的表情！](https://i.imgur.com/TGs1yNx.png)

![网易有道词典 桌面版， 好吧你一个翻译软件都想成为光明了](https://i.imgur.com/1RDkF1s.jpg) 看来软件圈确实太黑暗了

当输出参数时temperature=0.2，它还竟然发明了自己的语言

```
light of the day. I have see the days the day.
I have see the day.
The stars the day.
I have see the stars the stars in the stars in the stars and she dark the works the day.
I have see the love the day.
```
眼熟吧，对照下FB的聊天机器人创造的语言，可能会有新发现。
如果temperature不断上升，效果喜人，
![](https://i.imgur.com/i8sfVq6.jpg)
机器的语言天赋真是厉害啊。

**言归正传
**
以下时pytorch正常作的诗，
```python
light put their silence? 
The water your smileds tree, low vadan, the rocks they love, 
when pley of the doms in the voice, souther, 
by not the day, Wesad of Hinf wished into lord.
```

```
light?
I down the childer as love.
God death to rew-music its heart love and namet to the dornk's have flocks its meaning the realt is listening,
like that heart songraks is sadont for meanic.
My greats friend
```
```
when my love its sing come own great to the light. 
Let me of read, My the clor. 
Love into the Eater of than our day. 
Clamm to me into he when shore thy lies thoopening for thee my world torm, do it!
```
```
light ups, where clouds wilors owes to my from me for its hame the immort, not then bemer is powen in the night of its great its parks aflity parket, nall with this quifild in the dight the Impy will kiss
```
```
lights and story for its carrying smallery? They could shall deathaven. In the work of quies in shit regive of the evening truit? Thy like love trempletp. It adren and death and are. I have love it.
```
```
light through of the are to my Hide's deventing born canting to smalls its in the greath the world that passing thoughts light---I hear the songlis in the dark to her veile your stre the greath--thee stres
```
```
light. God's lays. I dann the creamp. Night in thise of thereach ones thy past. I silent and flower whis woman and its love at work and the flotter the sinour the light, like the bird childent
```
怎么样？虽然还有很多俚语和不语法问题，不过基本的哲学和文艺范都出来了，而且字词简练很有飞鸟集的韵味。



----------
# tensorflow 中文诗人
这个就没pytorch那么顺利了，先windows上训练花的时间，1080TI的GPU上跑了近5个小时，然后模型还不是全部保存，只有24～48（正常应该是1～50每6个保存一个模型）
然后
```txt
python compose_poem.py
```
各种出错
```
 Your CPU supports instructions that this TensorFlow binary was not compiled to use: AVX AVX2
Traceback (most recent call last):
  File "compose_poem.py", line 92, in <module>
    poem = gen_poem(begin_char)
  File "compose_poem.py", line 78, in gen_poem
    feed_dict={input_data: x, end_points['initial_state']: last_state})
  File "C:\ProgramData\Anaconda3\lib\site-packages\tensorflow\python\client\session.py", line 895, in run
    run_metadata_ptr)
  File "C:\ProgramData\Anaconda3\lib\site-packages\tensorflow\python\client\session.py", line 1065, in _run
    feed_dict = nest.flatten_dict_items(feed_dict)
  File "C:\ProgramData\Anaconda3\lib\site-packages\tensorflow\python\util\nest.py", line 251, in flatten_dict_items
    % (new_i))
ValueError: Could not flatten dictionary: key Tensor("MultiRNNCellZeroState/BasicLSTMCellZeroState/zeros:0", shape=(1, 128), dtype=float32) is not unique.

```
```
Your CPU supports instructions that this TensorFlow binary was not compiled to use: AVX AVX2
Traceback (most recent call last):
```
上面这段应该还只是小错，
下面的ValueError才是致命的
```
ValueError: Could not flatten dictionary: key Tensor("MultiRNNCellZeroState/BasicLSTMCellZeroState/zeros:0", shape=(1, 128), dtype=float32) is not unique.

```
作为小白，最快的方法是...最后直接换到虚拟ubuntu上运行
修改一下model下的checkpoint，竟然成功了，来感受下
```
python main.py
/home/chz/anaconda3/lib/python3.6/site-packages/h5py/__init__.py:36: FutureWarning: Conversion of the second argument of issubdtype from `float` to `np.floating` is deprecated. In future, it will be treated as `np.float64 == np.dtype(float).type`.
  from ._conv import register_converters as _register_converters
## please input the first character:荣
## loading corpus from ./model/
I tensorflow/core/platform/cpu_feature_guard.cc:140] Your CPU supports instructions that this TensorFlow binary was not compiled to use: AVX2 FMA
荣华处似足何之，阁上僧繇太里徒。
即觉住居还老处，箫声相劝为沧溟。
```
其实都是些小坑，很多时候只是惯性思维t太...，10M的诗歌数据输入进去，在模型就给砍掉一半，然后结果呢，都还能接受（因为直接生成中文吧，偶尔还有bug）
```
python main.py
/home/chz/anaconda3/lib/python3.6/site-packages/h5py/__init__.py:36: FutureWarning: Conversion of the second argument of issubdtype from `float` to `np.floating` is deprecated. In future, it will be treated as `np.float64 == np.dtype(float).type`.
  from ._conv import register_converters as _register_converters
## please input the first character:夜
## loading corpus from ./model/
 I tensorflow/core/platform/cpu_feature_guard.cc:140] Your CPU supports instructions that this TensorFlow binary was not compiled to use: AVX2 FMA
```
感受下，10M全唐诗训练下正常的诗歌吧
```
夜来睡夜夜，原鸟不可行。
已是好金掌，髯应负死中。
惊薪沾手稻，夜蚌夺残云。
谁敢清衣力，无地可工纁。
```
```
夜坐草萧条，莫求深柳枝。
乱思方举上，黄众未归迟。
我访趋朝教，荆州树胜金。
晚来当叶乱，潮入玉张宫。
```
```
夜猿吟不同，风积楼交莲。
似石踪中剑，烟浓絮上天。
沙风寒带影，沙迥见青猿。
相次如闲旅，千花谢孟津。
```
```
夜月尔南峡，旅来何路长。
恋人到已姓，何事阻闽家。
```
```
夜来辛苦久不吟，故洛来无火，古处在天仙一千株云。
```
```
夜阳玄岳夜，为我爱华堂。
笋与光前卧，神仙峰下虚。
钱亏白马少，不可见金沙。
泉石迹未足，此始横国秋。
```
今天暂时写到这里，还有许多问题需要解决和进步，ALL in AI it's just the beginning!

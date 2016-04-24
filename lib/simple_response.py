# -*- coding: utf-8 -*-
from __future__ import print_function
from __future__ import unicode_literals

from snownlp import normal
from snownlp import seg
from snownlp.summary import textrank
from hanziconv import HanziConv
import argparse

def parse_keyword(text):
    t = normal.zh2hans(text.decode("UTF-8"))
    sents = normal.get_sentences(t)
    doc = []
    for sent in sents:
        words = seg.seg(sent)
        words = normal.filter_stop(words)
        doc.append(words)
    
    keywords = []
    keyword_rank = textrank.KeywordTextRank(doc)
    keyword_rank.solve()
    for w in keyword_rank.top_index(5):
        keywords.append(w)
    
    return keywords
   
def gen_response(keyword_list):
    dic = {"笑話":"你想要聽我說個笑話嗎", "無聊":"那聽個笑話好嗎"}

    ans = dic[HanziConv.toTraditional(keyword_list[0])]
    print(ans) 

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("-s", "--string", help="")
    args = parser.parse_args()
    text = args.string
    key_list = parse_keyword(text)
    
    gen_response(key_list)

#-*- coding: utf-8 -*-
# Author: Michael Heqian Liu
# Script For Data
import json

with open('data.txt', encoding='utf8') as f:
    arr = f.read().split('\n')[:50]
    for i in range(len(arr)):
        arr[i] = arr[i].split('\t')
    for row in arr:
        for i in range(len(row)):
            newWord = ""
            if(i != 1):
                for ch in row[i]:
                    if ch in '0123456789-':
                        newWord += ch
                row[i]=int(float(newWord))    

    obj = {}
    for row in arr:
        for i in range(len(row)):
            ind = str(row[0])
            obj[ind] = {}
            obj[ind]['id'] = row[0]
            obj[ind]['question'] = row[1]
            obj[ind]['green'] = row[2]
            obj[ind]['blue'] = row[3]
            obj[ind]['orange'] = row[4]
            obj[ind]['red'] = row[5]
            obj[ind]['purple'] = row[6]
            obj[ind]['yellow'] = row[7]

    with open('../data.json', 'w') as outfile:
        json.dump(obj, outfile)
        

        

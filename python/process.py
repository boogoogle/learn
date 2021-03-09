#! /usr/bin/python3
# -*- coding: utf-8 -*-
# age = 2
# if age >= 18:
#     print('your age is', age)
#     print('adult')
# else:
#     print('fuck')

import math

year = int(input());
isLeap = False

if(year%400 == 0):
  isLeap=True
elif(year%100 == 0):
  isLeap=False
elif(year%4 == 0):
  isLeap=True

if isLeap:
  print(year,'is leap year')
else:
  print(year,'is not leap year')
  
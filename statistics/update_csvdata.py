import sys
import pandas as pd
# from datetime import datetime
import datetime
# import numpy as np
# import json
import ipdb


data = pd.read_excel(io="T:/root/notes/geek_road/source/statistics/2024_data.xlsx")
column_names = list(data)

###########################################################
current_date = datetime.date.today()
sep_str = 115*'*'
split_str = ';'

###########################################################
title_str = f"{sep_str}\n{current_date} 打卡: 0.早起  1.冥想  2.阅读  3.午休  4.跑步  5.写作  6.思考  7.晚休\n"
des_str = f"{sep_str}\n输入说明: \n"
basic_str = "- 输入序号即表示对应项\033[1m常规打卡\033[0m; \033[1m666 表示全勤\033[0m; 以 \033[1md/e\033[0m 开头的序号表示\033[1m双倍/超额\033[0m完成; \n"
empty_st = "- 空表示未打卡(不更改已有记录); \n"
clear_str = "- c 表示重置为 0; \n"
look_update_str = f"- u 开头紧跟日期[可选]加{split_str}后接上述输入表示对输入日期(默认为当天日期)进行操作, u 后无输入表示查询当天记录\n"
prompt_str = title_str + des_str + empty_st + basic_str + clear_str + look_update_str

input_str = input(prompt_str)
print(sep_str)

###########################################################
if input_str == '':
    sys.exit(f"{current_date}: 未打卡, 要加油啊!")

###########################################################
look_flag = False

if input_str[0] == 'u':
    if len(input_str) == 1 or input_str[1] == split_str:
        input_str = input_str[2:]
    else:
        current_date, input_str = input_str[1:].split(split_str)
        current_date = datetime.datetime.strptime(current_date, "%Y-%m-%d")
    if input_str == "":
        look_flag = True

###########################################################
day_of_year = current_date.timetuple().tm_yday

current_day_data = data.iloc[day_of_year - 1, :]
prompt_str = f"{current_day_data.iloc[0].strftime('%Y-%m-%d')}: "

###########################################################
prefix_str = ""
default_value = 1
index = range(len(column_names) - 2)

if look_flag:
    format_output = ""
    for i in index:
        format_output += f"\033[4m{column_names[i+2]}\033[0m: {current_day_data.iloc[i+2]}; "
    format_output = format_output[:-2]
    sys.exit(f"{prompt_str[:-2]} 打卡数据: \n{format_output}")

###########################################################
if input_str == '666':
    prefix_str = "\n今天全勤, 宗林真棒!"
elif input_str == 'c':
    prefix_str = "数据已重置为 0!"
    default_value = 0
elif input_str[0] == 'd':
    prefix_str = "\n双倍完成, 宗林真棒!"
    index = [int(input_str[i]) for i in range(1, len(input_str))]
    default_value = 2
elif input_str[0] == 'e':
    prefix_str = "\n超额完成, 宗林真棒!"
    index = [int(input_str[i]) for i in range(1, len(input_str))]
    default_value = 3
else:
    index = [int(input_str[i]) for i in range(len(input_str))]

for i in index:
    data.iloc[day_of_year - 1, i + 2] = default_value
    prompt_str += f"{i}.{column_names[i + 2]} "

if input_str == 'c':
    prompt_str = f"{current_day_data.iloc[0].strftime('%Y-%m-%d')}: {prefix_str}"
else:
    prompt_str += f"已打卡 ({len(index)}/{len(column_names)-2})!{prefix_str}"
print(prompt_str)
# print(sep_str)

data.to_excel("T:/root/notes/geek_road/source/statistics/2024_data.xlsx", index=False, freeze_panes=(1, 1))
data.to_csv("T:/root/notes/geek_road/source/statistics/2024_data.csv", index=False)


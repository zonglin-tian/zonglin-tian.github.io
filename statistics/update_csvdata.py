import sys
import pandas as pd
# from datetime import datetime
import datetime
# import numpy as np
# import json
import ipdb

current_date = datetime.date.today()
prompt_str = f"{current_date} 打卡: 0.早起  1.冥想  2.阅读  3.午休  4.跑步  5.写作  6.思考  7.晚休\n"
sep_str = 80*'*'
input_str = input(prompt_str)
print(sep_str)

prefix_str = ""
default_value = 1
index = range(8)
if input_str == '':
    sys.exit(f"{current_date} 未打卡, 要加油啊!")
elif input_str == '666':
    prefix_str = "\n今天全勤, 宗林真棒!"
elif input_str == '-':
    prefix_str = "数据已重置为 0!"
    default_value = 0
else:
    index = [int(input_str[i]) for i in range(len(input_str))]

day_of_year = current_date.timetuple().tm_yday

data = pd.read_excel(io="T:/root/notes/geek_road/source/statistics/2024_data.xlsx")

column_names = list(data)
current_day_data = data.iloc[day_of_year - 1, :]
prompt_str = f"{current_day_data.iloc[0].strftime('%Y-%m-%d')}: "

for i in index:
    data.iloc[day_of_year - 1, i + 2] = default_value
    prompt_str += f"{i}.{column_names[i + 2]} "

if input_str == '-':
    prompt_str = f"{current_day_data.iloc[0].strftime('%Y-%m-%d')}: {prefix_str}"
else:
    prompt_str += f"已打卡 ({len(index)}/{len(column_names)-2})!{prefix_str}"
print(prompt_str)
# print(sep_str)

data.to_excel("T:/root/notes/geek_road/source/statistics/2024_data.xlsx", index=False, freeze_panes=(1, 1))
data.to_csv("T:/root/notes/geek_road/source/statistics/2024_data.csv", index=False)


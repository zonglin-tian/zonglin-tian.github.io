import sys
import pandas as pd
# from datetime import datetime
import datetime
# import numpy as np
# import json
import ipdb


sep_str = 115*'*'
split_str = ';'


def update_life_data(excel_path):

    current_date = datetime.date.today()
    data = pd.read_excel(io=excel_path + '.xlsx')
    column_names = list(data)

    ###########################################################
    title_str = f"{sep_str}\n{current_date} 生活打卡: 0.早起  1.冥想  2.阅读  3.午休  4.跑步  5.写作  6.思考  7.晚休\n"
    des_str = f"{sep_str}\n输入说明: \n"
    basic_str = "- 输入序号即表示对应项\033[1m常规打卡\033[0m; \033[1m666 表示全勤\033[0m; \n"
    run_write_str = "- 以 \033[1md/e\033[0m 开头的序号表示\033[1m双倍/超额\033[0m完成; 以 \033[1mo\033[0m 开头的序号表示\033[1m非跑步运动/写作之网站完善\033[0m; \n"
    empty_st = "- 空表示未打卡(不更改已有记录); \n"
    clear_str = "- c 表示重置为 0; \n"
    look_update_str = f"- u 开头紧跟日期[可选]加{split_str}后接上述输入表示对输入日期(默认为当天日期)进行操作, u 后无输入表示查询当天记录\n"
    prompt_str = title_str + des_str + empty_st + basic_str + run_write_str + clear_str + look_update_str

    input_str = input(prompt_str)
    print(sep_str)

    ###########################################################
    if input_str == '':
        print(f"{current_date}: 未打卡, 要加油啊!")
        return

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
        print(f"{prompt_str[:-2]} 打卡数据: \n{format_output}")
        return

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
    elif input_str[0] == 'o':
        prefix_str = "\n多样性运动/网站完善!"
        index = [int(input_str[i]) for i in range(1, len(input_str))]
        default_value = 4
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

    data.to_excel(excel_path + ".xlsx", index=False, freeze_panes=(1, 1))
    data.to_csv(excel_path + ".csv", index=False)


def update_principle(excel_path):

    current_date = datetime.date.today()
    data = pd.read_excel(io=excel_path + ".xlsx")
    column_names = list(data)
    ###########################################################

    title_str = f"{sep_str}\n{current_date} 求圣: \na.节制  b.缄默  c.秩序  d.决心  e.自信  f.节俭  g.勤奋  h.诚信 i.正义 j.中庸 k.理智 l.清洁 m.贞洁 n.谦卑\n"
    des_str = f"{sep_str}\n输入说明: \n"
    basic_str = "- 输入字母即表示对应项\033[1m失守\033[0m; \033[1m666 表示全坚守\033[0m; \n"
    repeated_str = "- 以 \033[1m2\033[0m 开头的字母表示\033[1m重复\033[0m失守; 以 \033[1m3\033[0m 开头的序号表示\033[1m多次失守\033[0m; \n"
    empty_st = "- 空表示退出(不更改已有记录); \n"
    clear_str = "- 0 表示重置为初始值; \n"
    look_update_str = f"- u 开头紧跟日期[可选]加{split_str}后接上述输入表示对输入日期(默认为当天日期)进行操作, u 后无输入表示查询当天记录\n"
    prompt_str = title_str + des_str + empty_st + basic_str + repeated_str + clear_str + look_update_str

    input_str = input(prompt_str)
    print(sep_str)

    ###########################################################
    if input_str == '':
        print(f"{current_date}: 退出程序, 不更改已有值!")
        return

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
        print(f"{prompt_str[:-2]} 求圣数据: \n{format_output}")
        return

    ###########################################################
    if input_str == '666':
        prefix_str = "\n今天所有项均坚守, 宗林真棒!"
        default_value = 0
    elif input_str == '0':
        prefix_str = "数据已初始化!"
        default_value = 0
    elif input_str[0] == '2':
        prefix_str = "\n跌倒两次!"
        index = [ord(input_str[i]) - ord('a') for i in range(1, len(input_str))]
        default_value = 2
    elif input_str[0] == '3':
        prefix_str = "\n事不过三!"
        index = [ord(input_str[i]) - ord('a') for i in range(1, len(input_str))]
        default_value = 3
    else:
        index = [ord(input_str[i]) - ord('a') for i in range(len(input_str))]

    for i in index:
        data.iloc[day_of_year - 1, i + 2] = default_value
        prompt_str += f"{chr(ord('a') + i)}.{column_names[i + 2]} "

    data.iloc[day_of_year - 1, -1] = 0

    if input_str == '0':
        data.iloc[day_of_year - 1, -1] = 1
        prompt_str = f"{current_day_data.iloc[0].strftime('%Y-%m-%d')}: {prefix_str}"
    elif input_str == '666':
        data.iloc[day_of_year - 1, -2] = 1
        prompt_str = prefix_str
    else:
        prompt_str += f"失守 ({len(index)}/{len(column_names)-4})!{prefix_str}"
    print(prompt_str)
    # print(sep_str)

    data.to_excel(excel_path + ".xlsx", index=False, freeze_panes=(1, 1))
    data.to_csv(excel_path + ".csv", index=False)


if __name__ == '__main__':

    file_name = "T:/root/notes/geek_road/source/statistics/2024_life_data"
    update_life_data(file_name)
    print(sep_str)    
    print(sep_str)    
    file_name = "T:/root/notes/geek_road/source/statistics/2024_principle_data"
    update_principle(file_name)

from pyecharts import options as opts
from pyecharts.charts import Calendar
import pandas as pd
import numpy as np
import ipdb

data = pd.read_excel(io="T:/root/notes/geek_road/source/statistics/2024_data.xlsx")

data['date'] = data['date'].astype(str)

data = np.array(data.iloc[:, 0:2])
data = data.tolist()
# print(data)

calendar_heatmap = (
    Calendar()
    .add("", data, calendar_opts=opts.CalendarOpts(range_=['2024-01-01', '2024-12-31'], pos_top="120"))
    .set_global_opts(
        title_opts=opts.TitleOpts(title="2024年热力图日历", pos_top="30", pos_left="center"),
        visualmap_opts=opts.VisualMapOpts(
            max_=500, min_=100, orient="horizontal", is_piecewise=False, pos_top="50", pos_left="center"
        ),
    )
)
calendar_heatmap.render("T:/root/notes/geek_road/source/statistics/get_up_echart.html")

import pandas as pd
import numpy as np
import json
import ipdb

data = pd.read_excel(io="T:/root/notes/geek_road/source/statistics/2024_data.xlsx")

data['date'] = data['date'].astype(str)

data = np.array(data.iloc[:, 0:2])
shape = data.shape
data = data.ravel()
dict_data = {'data': data.tolist(), 'shape': shape}

with open("T:/root/notes/geek_road/source/statistics/get_up_echart.json", 'w') as f:
    json.dump(dict_data, f, indent=2)

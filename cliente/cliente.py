from random import randint

import requests

print('pidamos diagnosticos')
dxauto = requests.post(
    "http://127.0.0.1:8000/api", json={"type": f"automatic", "comment": "me duele aqui"}
)
print(dxauto.text)

dxmanual = requests.post(
    "http://127.0.0.1:8000/api", json={"type": f"manual", "comment": "me duele por alla"}
)
print(dxmanual.text)
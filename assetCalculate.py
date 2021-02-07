import numpy as np
import sys
import json
import requests

result = {
    'from': '2021-02-01',
    'to': '2021-02-05'
}
# result = {
#     'from': sys.argv[1],
#     'to': sys.argv[2]
# }
position_url = 'https://basic-dispatch-298807.df.r.appspot.com/api/positions/period?'
query = 'from='+ result['from'] +'&to='+ result['to']
# query = 'from=' + result['from'] + '&to=' + result['to']
r = requests.get(position_url + query)


print(r.json()[0]['symbol'])

# print(json.dumps(result))
sys.stdout.flush()
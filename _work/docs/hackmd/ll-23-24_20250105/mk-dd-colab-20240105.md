---
title: mk-dd-colab-20240105

---

# mk-dd-colab-20240105

basic steps

## list users

```
import json
from slack_sdk import WebClient

client = WebClient(token=SLACK_BOT_TOKEN)

# Verify it works
api_response = client.api_test()
if api_response["ok"]:
    print("API Test Succeeded")

# List channels
try:
    users_response = client.users_list(limit=5) # delete limit=5 to get all
    if users_response["ok"]:
      # print(json.dumps(users_response.data, indent=4))
      for user in users_response.data["members"]:
          print(f"User Name: {user['name']}, Id: {user['id']}")
          if user['name']=="marlon":
            print(json.dumps(user, indent=8))
except Exception as e:
    print(f"Error listing users: {e}")
```

## create records in Airtable



## put those together



## optional: check against existing records

and update instead of always creating records in a new table


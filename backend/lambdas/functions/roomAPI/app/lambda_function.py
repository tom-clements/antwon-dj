import json

import uuid
import antwondb
import traceback


def lambda_handler(event, context):
    end_point = event["rawPath"].split("/")[-1]
    try:
        response = globals()[end_point](event)
    except:
        return {"status": 500, "body": json.dumps({"error": traceback.format_exc()})}
    return json.dumps(response)


def room(event):
    room_code = event["queryStringParameters"]["room_code"]
    room_guid = antwondb.db_queries.get_room_guid_from_code(room_code)
    return {"status": 200, "body": {"room_guid": room_guid}}


def roomQueue(event):
    if event["routeKey"].split(" ")[0] == "POST":
        return roomQueuePOST(event)
    elif event["routeKey"].split(" ")[0] == "GET":
        room_guid = event["queryStringParameters"]["room_guid"]
        room_queue = antwondb.db_queries.get_room_queue(room_guid)
        return {"status": 200, "body": {"room_queue": room_queue}}


def roomQueuePOST(event):
    song = json.loads(event["body"])
    room_queue = antwondb.db_queries.store_song_in_queue(song)
    return {"status": 200, "body": "success"}

from flask import Flask, request

app = Flask(__name__)

@app.route("/", methods=['POST'])
def createRoomPair():
  req_data = request.get_json()
  
  # List of unpaired users in lobby
  userLobby = req_data['users']

  # CALL THE PAIRING FUNCTION HERE
  #UNCOMMENT seekerID, supporterID, matchedTags = createPair(userLobby)

  return {"seeker": "seekerID", "supporter": "supporterID", "matchedTags": []}, 200
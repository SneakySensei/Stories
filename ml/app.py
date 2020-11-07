from flask import Flask, request

app = Flask(__name__)

@app.route("/", methods=['POST'])
def createRoomPair():
  req_data = request.get_json()
  
  # List of unpaired users in lobby
  seeker = req_data['seeker']
  supporterList = req_data['supporters']

  # CALL THE PAIRING FUNCTION HERE
  #UNCOMMENT seekerID, supporterID, matchedTags = createPair(seeker, supporterList)

  return {"seeker": seeker['id'], "supporters": supporterList, "matchedTags": []}, 200
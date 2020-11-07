from flask import Flask, request

app = Flask(__name__)

@app.route("/", methods=['POST'])
def createRoomPair():
  req_data = request.get_json()
  
  # List of unpaired users in lobby
  seeker = req_data['seeker']
  supporterList = req_data['supporters']
  compatibilities = []

  for supporter in supporterList:
    score = 0

    score += (seeker['suicide-prevention'] and supporter['suicide-prevention'])
    score += (seeker['relationship-advice'] and supporter['relationship-advice'])
    score += (seeker['family-issues'] and supporter['family-issues'])
    score += (seeker['substance-abuse'] and supporter['substance-abuse'])
    score += (seeker['gender-sexual-identity'] and supporter['gender-sexual-identity'])
    score += (seeker['anxious-depressive-thoughts'] and supporter['anxious-depressive-thoughts'])
    score += (seeker['academic-issues'] and supporter['academic-issues'])
    compatibilities.append(score)
  max_value = max(compatibilities)
  max_index = compatibilities.index(max_value)
  # CALL THE PAIRING FUNCTION HERE
  #UNCOMMENT seekerID, supporterID, matchedTags = createPair(seeker, supporterList)

  return {"seeker": seeker, "supporter": supporterList[max_index], "tags": max_value}, 200
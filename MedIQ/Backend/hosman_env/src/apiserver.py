from flask import Flask, request, jsonify, make_response, render_template
from flask_cors import CORS, cross_origin
import sys
import callbacks.makeorder
from helpers import databasemanager, calculateNearestDistance
import callbacks
import threading

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
def apiIndexPage():
    return app.redirect("/apidocumentation")

@app.route("/<name>")
def showError(name):
    return make_response(render_template("genericerror.html"), 404)

@app.route("/api")
@cross_origin()
def apiLandingPage():
    return make_response(jsonify(status="success", response=[{"msg" : "API Server working correctly!"}]), 200)

@app.route("/apidocumentation")
def apiDocumentation():
    return render_template("apidocumentation.html")

@app.route("/api/<apiRoute>", methods=["GET", "POST"])
@cross_origin()
def serveAPIRequests(apiRoute):
    dbMan = databasemanager.DatabaseManager()

    if apiRoute == "getNearestHospitals":
        try:
            lat = float(request.args.get("lat"))
            long = float(request.args.get("long"))
        except:
            return make_response(jsonify(status="failed", response=[], errReason="Missing Longitude and Lattitude Parameters."), 400)
        try:
            maxRangeInKM = int(request.args.get("maxRangeInKM"))
        except:
            maxRangeInKM = 10
        allNearestHospitalIDs = calculateNearestDistance.getNearestHospitalDistance(latitude=lat, longitude=long, maxRangeInKm=maxRangeInKM)

        return make_response(jsonify(status="success", response=allNearestHospitalIDs), 200)
    

    # This should not be used without any proper authentication system
    elif apiRoute == "addHospital" and request.method == "POST":
        try:
            jsonData = request.get_json(force=True)
            if not dbMan.checkIfPresent(hospitalName=jsonData["hospitalName"], address=jsonData["address"], longitude=float(jsonData["longitude"]), latitude=float(jsonData["latitude"])):
                hospID = dbMan.createHospitalEntry(hospitalName=jsonData["hospitalName"], availableSeats=[int(jsonData["available_opd"]), int(jsonData["available_emergency"]), int(jsonData["available_trauma"]), int(jsonData["available_general"])], status=jsonData["status"],
                                       address=jsonData["address"], email=jsonData["email"], phoneNumber=jsonData["phoneNumber"], longitude=float(jsonData["longitude"]), latitude=float(jsonData["latitude"]), priceRating=jsonData["price_rating"])
            else:
                return make_response(jsonify(status="failed", response=[], errReason=f"The individual hospital is already present in the database."), 409)
        except Exception as E:
            return make_response(jsonify(status="failed", response=[], errReason=f"Server threw an internal error: {E}"), 500)

        return make_response(jsonify(status="success", response=[{"msg" : f"Hospital added to the database with id = {hospID}"}]), 201)
    
    # This should not be used without any proper authentication system.
    elif apiRoute == "deleteHospital" and request.method == "POST":
        try:
            jsonData = request.get_json(force=True)
            dbMan.deleteHospitalEntry(hospitalID=jsonData["hospitalID"])
            return make_response(jsonify(status="success", response=[{"msg" : f"Operation performed successfully."}]), 200)
        except Exception as E:
            return make_response(jsonify(status="failed", response=[], errReason=f"Server threw an internal error: {E} - {E.__class__.__name__}"), 500)
    
    elif apiRoute == "bookHospitalBed" and request.method == "POST":
        try:
            jsonData = request.get_json(force=True)
            hospitalMetadata = dbMan.getHospitalMetadata(hospitalID=jsonData["hospitalID"])
            bedKey = None
            if jsonData["orderBed"] == "opd" or jsonData["orderBed"] == "available_opd":
                bedKey = "available_opd"
            elif jsonData["orderBed"] == "emergency" or jsonData["orderBed"] == "available_emergency":
                bedKey = "available_emergency"
            elif jsonData["orderBed"] == "trauma":
                bedKey = "available_trauma"
            elif jsonData["orderBed"] == "general" or jsonData["orderBed"] == "available_general":
                bedKey = "available_general"
            
            if bedKey != None:
                if hospitalMetadata[bedKey] > 0:
                    dbMan.updateHospitalBeds(hospitalID=jsonData["hospitalID"], **{bedKey : (int(hospitalMetadata[bedKey])-1)})
                    threading.Thread(name=(str(jsonData["userID"])+"~bedOrderSuccessfulCallback"), target=callbacks.makeorder.bedOrderSuccessfulCallback, args=(jsonData["userID"], bedKey, jsonData["hospitalID"], int(jsonData["isSpecialServiceRequired"])), daemon=True).start()
                    return make_response(jsonify(status="success", response=[{"msg" : f"The order request was processed successfully!."}]), 200)
                else:
                    return make_response(jsonify(status="failed", response=[], errReason=f"Requested bed not available"), 404)
            else:
                return make_response(jsonify(status="failed", response=[], errReason=f"Invalid orderBed!"), 404)

        except Exception as E:
            return make_response(jsonify(status="failed", response=[], errReason=f"Server threw an internal error: {E} - {E.__class__.__name__}"), 500)
    
    elif apiRoute == "restoreHospitalBed":
        try:
            jsonData = request.get_json(force=True)
            hospitalMetadata = dbMan.getHospitalMetadata(hospitalID=jsonData["hospitalID"])
            bedKey = None
            if jsonData["orderBed"] == "opd":
                bedKey = "available_opd"
            elif jsonData["orderBed"] == "emergency":
                bedKey = "available_emergency"
            elif jsonData["orderBed"] == "trauma":
                bedKey = "available_trauma"
            elif bedKey == "general":
                bedKey = "available_general"
            
            if bedKey != None:
                    dbMan.updateHospitalBeds(hospitalID=jsonData["hospitalID"], **{bedKey : (int(hospitalMetadata[bedKey])+1)})
                    return make_response(jsonify(status="success", response=[{"msg" : f"Bed restored successfully!."}]), 200)
            else:
                return make_response(jsonify(status="failed", response=[], errReason=f"Invalid orderBed!"), 404)
        except Exception as E:
            return make_response(jsonify(status="failed", response=[], errReason=f"Server threw an internal error: {E} - {E.__class__.__name__}"), 500)
        
    elif apiRoute == "getHospitalMetadata":
        try:
            hospitalID = int(request.args.get("hospitalID"))
        except:
            return make_response(jsonify(status="failed", response=[], errReason="Missing hospitalID."), 400)
        try:
            hospitalMetadata = jsonify(dbMan.getHospitalMetadata(hospitalID=hospitalID))
            response_code = 200
        except Exception as E:
            hospitalMetadata = jsonify(status="failed", response=[], errReason=f"No hospital found for ID = {hospitalID}")
            response_code = 404

        return make_response(hospitalMetadata, response_code)
    
    elif apiRoute == "addUser" and request.method == "POST":
        try:
            jsonData = request.get_json(force=True)
            if not dbMan.checkIfPresent(table="user_data", adhaar=jsonData["adhaar"], age=jsonData["age"]):
                userId = dbMan.createUserEntry(jsonData["fullName"], jsonData["userAddress"], jsonData["adhaar"], jsonData["bloodGroup"], jsonData["alergies"], jsonData["insuranceNo"], jsonData["phoneNumber"], jsonData["age"], jsonData["gender"], jsonData["profilePhoto"])
            else:
                return make_response(jsonify(status="failed", response=[], errReason=f"The individual is already present in the database."), 409)
        except Exception as E:
            return make_response(jsonify(status="failed", response=[], errReason=f"Server threw an internal error: {E} - {E.__class__.__name__}"), 500)
        
        return make_response(jsonify(status="success", response=[{"msg" : f"User added to the database with id = {userId}"}]), 201)

    elif apiRoute == "deleteUser" and request.method == "POST":
        try:
            jsonData = request.get_json(force=True)
            dbMan.deleteUserEntry(userID=jsonData["userID"])
            return make_response(jsonify(status="success", response=[{"msg" : f"Operation performed successfully."}]), 200)
        except Exception as E:
            return make_response(jsonify(status="failed", response=[], errReason=f"Server threw an internal error: {E} - {E.__class__.__name__}"), 500)

    elif apiRoute == "getUserMetadata":
        try:
            userID = int(request.args.get("userID"))
        except:
            return make_response(jsonify(status="failed", response=[], errReason="Missing userID."), 400)

        try:
            userMetadata = jsonify(dbMan.getUserMetadata(userID=userID))
            responseCode = 200
        except:
            userMetadata = jsonify(status="failed", response=[], errReason=f"User {userID} not found in the database.")
            responseCode = 404
        
        return make_response(userMetadata, responseCode)
    
    elif apiRoute == "retrieveUserID":
        try:
            adhaar = request.args.get("adhaar")
            return make_response(jsonify(userId = dbMan.retrieveUserID(adhaar)), 200)
        except:
            return make_response(jsonify(status="failed", response=[], errReason="Couldn't retrieve User ID. Incorrect parameters provided or User doesn't exists"), 400)
        
    
    elif apiRoute == "getOrders":
        try:
            userID = int(request.args.get("userID"))
        except:
            userID = None
        try:
            hospitalID = int(request.args.get("hospitalID"))
        except:
            hospitalID = None
        try:
            showPendingOnly = bool(int(request.args.get("showPendingOnly")))
        except:
            showPendingOnly = True

        try:
            orders = jsonify(dbMan.getOrders(showPendingOnly=showPendingOnly, userID=userID, hospitalID=hospitalID))
            response_code = 200
        except Exception as E:
            orders = jsonify(status="failed", response=[], errReason=f"Server threw an internal error: {E} - {E.__class__.__name__}. This might be due to requested resource not found in the database.")
            response_code = 500
        
        return make_response(orders, response_code)
    
    elif apiRoute == "processOrder" and request.method == "POST":
        try:
            jsonData = request.get_json(force=True)
            opRes = dbMan.processOrder(bool(int(jsonData["isAccepted"])), jsonData["userID"], jsonData["hospitalID"], jsonData["requestedBed"])
            if opRes:
                return make_response(jsonify(status="success", response=[{"msg" : f"Operation performed successfully."}]), 200)
            else:
                return make_response(jsonify(status="failed", response=[], errReason="Couldn't process order. Invalid Parameters passed or value doesn't exists in the database."), 400)
        except Exception as E:
            return make_response(jsonify(status="failed", response=[], errReason=f"Server threw an internal error: {E} - {E.__class__.__name__}"), 500)
    
    elif apiRoute == "getDocSchedule" and request.method == "GET":
        try:
            hospID = int(request.args.get("hospitalID"))
        except:
            return make_response(jsonify(status="failed", response=[], errReason="Couldn't process order. Invalid Parameters passed or value doesn't exists in the database."), 400)
        
        docsSchedule = dbMan.getDoctorsSchedule(hospID)
        return make_response(jsonify(docsSchedule), 200)
    
    elif apiRoute == "bookDocAppointment" and request.method == "POST":
        jsonData = request.get_json(force=True)
        try:
            hospID = int(jsonData["hospitalID"])
            userID = int(jsonData["userID"])
            docName = jsonData["doctor_name"]
            shift = jsonData["shift"]
        except:
            return make_response(jsonify(status="failed", response=[], errReason="Couldn't process order. Invalid Parameters passed."), 400)
        
        if(dbMan.bookDocAppointment(hospID=hospID, userID=userID, DocName=docName, Shift=shift)):
            return make_response(jsonify(status="success", response=[{"msg" : f"Appointment booked successfully."}]), 201)
        else:
            return make_response(jsonify(status="failed", response=[], errReason="A similar order already exists! Couldn't book an appointment"), 400)

    else:
        return make_response(jsonify(status="failed", response=[], errReason="Invalid API route."), 404)



if __name__ == "__main__":
    try:
        bind_ip = sys.argv[1]
    except:
        bind_ip = "127.0.0.1"

    app.run(host=bind_ip, debug=False)
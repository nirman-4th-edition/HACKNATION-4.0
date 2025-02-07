from helpers.databasemanager import DatabaseManager

def bedOrderSuccessfulCallback(usrID : str, requestedBed : str, hospitalID : int, isSpecialServiceRequired : int):
    userDBMan = DatabaseManager()
    userDBMan.queueOrder(usrID, hospitalID, isSpecialServiceRequired, requestedBed)
    print("Bed order placed successfully")
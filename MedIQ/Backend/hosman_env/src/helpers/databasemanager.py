import sqlite3
import binascii
import os

# Class for CRUD operations on the databse
class DatabaseManager:

    def __init__(self) -> None:

        if not os.path.isdir("database"):
            os.mkdir("database")
        self.conn = sqlite3.connect('database/mediQ.db')
        self.cursor = self.conn.cursor()
    
    def __del__(self):
        self.conn.commit()
        self.conn.close()

    def createHospitalEntry(self, hospitalName : str, availableSeats : list, status : str, address : str, email : str, phoneNumber : str, latitude : float, longitude : float, priceRating: int) -> int:
         '''
        Add hospital to the end of the database. This will not check if the hospital is already there in the database.
        availableSeats : list in which index 0 -> available_opd, 1 -> available_emergency, 2 -> available_trauma, 3 -> available_general'''
         
         hospID = binascii.crc32((hospitalName+address+str(latitude)+str(longitude)).encode('utf-8'))
         self.cursor.execute("CREATE TABLE IF NOT EXISTS hospital_data (hospitalID INTEGER, hospitalName TEXT, address TEXT, longitude REAL, latitude REAL, email TEXT, phoneNumber TEXT, status TEXT, available_opd INTEGER, available_emergency INTEGER, available_trauma INTEGER, available_general INTEGER, price_rating INTEGER)")
         self.cursor.execute(f"INSERT INTO hospital_data VALUES ({hospID}, \"{hospitalName}\", \"{address}\", {longitude}, {latitude}, \"{email}\", \"{phoneNumber}\", \"{status}\", {availableSeats[0]}, {availableSeats[1]}, {availableSeats[2]}, {availableSeats[3]}, {priceRating})")
         self.conn.commit()
         return hospID
    
    def checkIfPresent(self, table = "hospital_data", **kwargs) -> bool:
        '''
        Checks if a certain entry is present in the database (CASE SENSITIVE).
        Will return True if all the values are present else will return False if any value is missing. It is recommended compare a single value per call.
        '''
        scanResult = True
        for key, value in kwargs.items():
            try:
                res = len(self.cursor.execute(f"SELECT * FROM {table} WHERE {key} = \"{value}\"").fetchall())
            except:
                return False
            if res == 0:
                scanResult = False
                break

        return scanResult

    def deleteHospitalEntry(self, hospitalID : int) -> bool:
        '''
        Delete an entry based on the hospitalID (CRC32 sum of hospitalName+address+latitude+longitude)
        '''
        
        # print(f"DELETE FROM hospital_data WHERE {list(checks.keys())[0]} = \"{list(checks.values())[0]}\" AND {list(checks.keys())[1]} = \"{list(checks.values())[1]}\"")
        self.cursor.execute(f"DELETE FROM hospital_data WHERE hospitalID = {hospitalID}")
        self.conn.commit()
        
        # Bogus. Will always return true. But, I left it here for aesthetic purpose
        return not self.checkIfPresent(hospitalID = hospitalID)
    
    def updateHospitalBeds(self, hospitalID : int, **beds) -> None:
        for hospitalBed, value in beds.items():
            self.cursor.execute(f"UPDATE hospital_data SET \"{hospitalBed}\" = {value} WHERE hospitalID = {hospitalID}")
        
        self.conn.commit()
    

    def getAllHospitalCoordinates(self) -> list:
        '''
        returns a dict of coordinates and hospitalID
        index 0 of tuple represents latitude and incex 1 represents the longitude
        '''
        result = self.cursor.execute("SELECT hospitalID, latitude, longitude FROM hospital_data").fetchall()
        parsedData = []
        for i in result:
            parsedData.append({"hospitalID" : i[0], "coordinates" : (i[1], i[2])})
        return parsedData
        

    def getHospitalBeds(self, hospitalID) -> list:
        '''
        returns a list of all available beds
        The indexes of the list represent the following data, respectively:  
        index 0 -> available_opd
        index 1 -> available_emergency 
        index 2 -> available_trauma 
        index 3 -> available_general

        '''
        return list(self.cursor.execute(f"SELECT available_opd, available_emergency, available_trauma, available_general FROM hospital_data WHERE hospitalID = {hospitalID}").fetchone())
    
    def getHospitalMetadata(self, hospitalID) -> dict:
        res = self.cursor.execute(f"SELECT hospitalName, address, latitude, longitude, email, phoneNumber, status, available_opd, available_emergency, available_trauma, available_general, price_rating FROM hospital_data WHERE hospitalID = {hospitalID}").fetchone()
        return {
            "hospitalName" : res[0],
            "address" : res[1],
            "latitude" : res[2],
            "longitude" : res[3],
            "email" : res[4],
            "phoneNumber" : res[5],
            "status" : res[6],
            "available_opd" : res[7],
            "available_emergency" : res[8],
            "available_trauma" : res[9],
            "available_general" : res[10],
            "price_rating" : res[11]
        }

    def getAllHospitalIDs(self) -> list:
        res = self.cursor.execute("SELECT hospitalID FROM hospital_data").fetchall()
        hospID = []
        for i in res:
            hospID.append(int(i[0]))
        return hospID
    

    def createUserEntry(self, fullName : str, usrAddress : str, adhaar : str, bloodGroup : str, alergies : str, insuranceNo : str, phoneNumner : str, age : int, gender : str, dp: str) -> int:
        '''
        Add user to the end of the database. Will not check for duplicate users
        Returns crc32 checksum of fullName + usrAddress + Adhaar
        '''
        usrID = binascii.crc32((fullName+usrAddress+adhaar).encode("utf-8"))
        self.cursor.execute("CREATE TABLE IF NOT EXISTS user_data (userID INTEGER, fullName TEXT, usrAddress TEXT, adhaar TEXT, bloodgroup TEXT, alergies TEXT, insuranceNo TEXT, phoneNumber TEXT, age INTEGER, gender TEXT, profilePhoto TEXT)")
        self.cursor.execute(f"INSERT INTO user_data VALUES ({usrID}, \"{fullName}\", \"{usrAddress}\", \"{adhaar}\", \"{bloodGroup}\", \"{alergies}\", \"{insuranceNo}\", \"{phoneNumner}\", {age}, \"{gender}\", \"{dp}\")")
        self.conn.commit()
        return usrID

    def getUserMetadata(self, userID : int):
        res = self.cursor.execute(f"SELECT fullName, age, usrAddress, adhaar, bloodgroup, alergies, insuranceNo, phoneNumber, gender, profilePhoto FROM user_data WHERE userID = {userID}").fetchone()
        return {
            "fullName" : res[0],
            "age" : res[1],
            "userAddress" : res[2],
            "adhaar" : res[3],
            "bloodgroup" : res[4],
            "alergies" : res[5],
            "insuranceNo" : res[6],
            "phoneNumber" : res[7],
            "gender" : res[8],
            "profilePhoto" : res[9]
        }
    
    def deleteUserEntry(self, userID : int):
        '''
        Deletes an user from the database based of the userID (CRC32 checksum of fullName + usrAddress + Adhaar)
        '''
        self.cursor.execute(f"DELETE FROM user_data WHERE userID = {userID}")
        self.conn.commit()
    
    def retrieveUserID(self, adhaar : str) -> int:
        return self.cursor.execute(f"SELECT userID FROM user_data WHERE adhaar = \"{adhaar}\"").fetchone()[0]

    def queueOrder(self, userID, hospitalID, isSpecialServiceRequired, requestedBed):
        '''
        Adds entry to the all_orders table status as pending. Will ignore the order if it already existed.
        '''
        if not (self.checkIfPresent(table="orders", userID=userID, hospitalID=hospitalID, requestedBed=requestedBed, status="PENDING")):
            self.cursor.execute("CREATE TABLE IF NOT EXISTS orders (hospitalID INTEGER, userID INTEGER, isSpecialServiceRequired INTEGER, requestedBed TEXT, status TEXT)")
            self.cursor.execute(f"INSERT INTO orders VALUES ({hospitalID}, {userID}, {isSpecialServiceRequired}, \"{requestedBed}\", \"PENDING\")")
            self.conn.commit()

    def processOrder(self, isAccepted : bool, userID : int, hospitalID : int, requestedBed : int) -> bool:
        '''
        Updates orer status from the database
        '''
        if not (self.checkIfPresent(table="orders", userID=userID, hospitalID=hospitalID, requestedBed=requestedBed)):
            return False
        else:
            status = "APPROVED" if isAccepted else "REJECTED"
            self.cursor.execute(f"UPDATE orders SET status = \"{status}\" WHERE (userID = {userID} AND hospitalID = {hospitalID}) AND requestedBed = \"{requestedBed}\"")
            self.conn.commit()
            return True
    
    def getOrders(self, showPendingOnly=True, userID=None, hospitalID = None) -> list:
        '''
            returns all order information. Will return orders of a specific user if any userID is provided
        '''
        allOrders = []
        if (userID != None and hospitalID == None):
            additionalQuery1= f" AND userID = {userID}"
            additionalQuery2 = f" WHERE userID = {userID}"
        elif (userID == None and hospitalID != None):
            additionalQuery1= f" AND hospitalID = {hospitalID}"
            additionalQuery2 = f" WHERE hospitalID = {hospitalID}"
        elif (userID != None and hospitalID != None):
            additionalQuery1 = f" AND (userID = {userID} AND hospitalID = {hospitalID})"
            additionalQuery2 = f" WHERE userID = {userID} AND hospitalID = {hospitalID}"
        else:
            additionalQuery1 = additionalQuery2 = "" 
        
        if showPendingOnly:
            res = self.cursor.execute("SELECT * FROM orders WHERE status = \"PENDING\"" + additionalQuery1).fetchall()
        else:
            res = self.cursor.execute("SELECT * FROM orders"+ additionalQuery2).fetchall()
        
        for i in res:
            allOrders.append({
                "hospitalID" : i[0],
                "userID" : i[1],
                "isSpecialServiceRequested" : i[2],
                "requestedBed" : i[3],
                "status" : i[4]
            })
        return allOrders
    
    def addDoctorsSchedule(self, hospID: int, data: list[list]):
        '''
        data is a list which should contain sublists of all the department.
        data should contain exactly 6 items 
        sublist of data should contain exactly 6 items
        '''
        self.cursor.execute("CREATE TABLE IF NOT EXISTS doctor_schedule (hospitalID INTEGET, Neurology TEXT, Radiology TEXT, ENT TEXT, Cardiology TEXT, Dermatology TEXT, Pediatrics TEXT)")
        for l in data:
            self.cursor.execute("INSERT INTO doctor_schedule VALUES (?, ?, ?, ?, ?, ?, ?)", (hospID, l[0], l[1], l[2], l[3], l[4], l[5]))
    
    def getDoctorsSchedule(self, hospID: int):
        res = self.cursor.execute(f"SELECT * FROM doctor_schedule WHERE hospitalID = {hospID}").fetchall()
        return {
            "headers" : ["Neurology", "Radiology", "ENT", "Cardiology", "Dermatology", "Pediatrics"],
            "8 AM - 11 AM" : list(res[0])[1::],
            "11 AM - 3 PM" : list(res[1])[1::],
            "3 PM - 7 PM" : list(res[2])[1::],
            "7 PM - 11 PM" : list(res[3])[1::],
            "11 PM - 3 AM" : list(res[4])[1::],
            "3 AM - 8 AM" : list(res[5])[1::]
        }
    
    def bookDocAppointment(self, hospID: int, userID: int, DocName: str, Shift: str):
        if not (self.checkIfPresent(table="appointments", hospitalID=hospID, userID=userID, shift=Shift, status="PENDING")):
            self.cursor.execute("CREATE TABLE IF NOT EXISTS appointments (hospitalID INTEGER, userID INTEGER, docName TEXT, shift TEXT, status TEXT)")
            self.cursor.execute(f"INSERT INTO appointments VALUES ({hospID}, {userID}, \"{DocName}\", \"{Shift}\", \"PENDING\")")
            return True
        else:
            return False
    
    def getAppointments(self, hospitalID: int):
        res = self.cursor.execute(f"SELECT userID, docName, shift FROM appointments WHERE hospitalID = {hospitalID}").fetchall()
        return res;

# For debugging and testing purposes
if __name__ == "__main__":
    dbMan = DatabaseManager()
    # usrID = dbMan.createUserEntry("Random Name", "Test Address", "123456", "A+", "None", "1242124421BDS", "+91 23446235", 54, "male", "Base64-ImageData")
    # print(usrID)
    # print(dbMan.getUserMetadata(userID=usrID))


    scheduleData = [
        ["Dr. Samal", "Dr. Bimal", "Dr. XYZ", "Dr. ZYX", "Dr. SK", "Dr. Rabi"],
        ["Dr. Shital", "Dr. Chimal", "Dr. Arjun", "Dr. John", "Dr. CK", "Dr. Bq"],
        ["Dr. dfsf", "Dr. acs", "Dr. eppwoqe", "Dr. dandna", "Dr. poawd", "Dr. makad"],
        ["Dr. Lopa", "Dr. Jimal", "Dr. XYZ", "Dr. Qweff", "Dr. Plock", "Dr. David"],
        ["Dr. Qwds", "Dr. Pldsdf", "Dr. Nimal", "Dr. Lopa", "Dr. Samal", "Dr. Rabi"],
        ["Dr. Yam", "Dr. Timal", "Dr. Arjun", "Dr. Tiyang", "Dr. Brenda", "Dr. Abdul"],
    ]
    # dbMan.addDoctorsSchedule(hospID=1975126076, data=scheduleData)
    print(dbMan.getDoctorsSchedule(hospID=1975126076))

    # dbMan.queueOrder(12345, 6789, 1, "available_emergency")
    # dbMan.queueOrder(124, 67, 0, "available_opd")
    # dbMan.processOrder(isAccepted=True, userID=124, hospitalID=67, requestedBed="available_opd")
    # print(dbMan.retrieveUserID(adhaar="12346"))
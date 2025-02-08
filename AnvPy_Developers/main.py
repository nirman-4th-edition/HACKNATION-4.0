import eel
import plyer
import os
import sys
import json
import ctypes
import webbrowser
from subprocess import run, PIPE

readp = None
conn = False
path = os.path.dirname(os.path.abspath(__file__)) + "/"
chk = None
# Starting eel 
eel.init(".")
# Eel functions
@eel.expose
def github():
	webbrowser.open("https://github.com/Pratap99376/AnvPy")
	
@eel.expose  
def app():
	if cc():
		ans = run([path + "adb","shell","ls","sdcard/Android/data/org.python.adp"],stdout=PIPE,stderr=PIPE,universal_newlines=True)
		if ans.stderr == "":
			return True
		else:
			ctypes.windll.user32.MessageBoxW(0,"AnvPy is not installed in your Android Device.\nInstall it and open it for proper remote access.","Error",0x10)
			eel.cls_win()
			sys.exit(0)
			return False
		
@eel.expose
def cc():
	ans = run([path + "adb","devices"],stdout=PIPE,stderr=PIPE,universal_newlines=True)
	if(len(ans.stdout.replace("List of devices attached","").strip()) > 0):
		eel.loading("on")
		return True
	else:
		return False
		
@eel.expose
def loadProj():
	if(cc() and app()):
		ans = run([path + "adb","shell","ls","/sdcard/Android/data/org.python.adp/files/"],stdout=PIPE,stderr=PIPE,universal_newlines=True)
		if(ans.stderr == ""):
			ans = run([path + "adb","shell","ls","/sdcard/Android/data/org.python.adp/files/ADP\\ Projects"],stdout=PIPE,stderr=PIPE,universal_newlines=True)
			if(ans.stderr == ""):
				eel.load(ans.stdout)
		else:
			eel.load("")
	else:
		eel.loading("off")
		
@eel.expose
def cproj(val):
	if(cc() and app()):
		ans = run([path + "adb","shell","ls","/sdcard/Android/data/org.python.adp/files/"+val],stdout=PIPE,stderr=PIPE,universal_newlines=True)
		if ans.stderr != "":
			ans = run([path + "adb","shell","mkdir","-p","/sdcard/Android/data/org.python.adp/files/"+val],stdout=PIPE,stderr=PIPE,universal_newlines=True)
			if(ans.stderr != ""):
				eel.snackm(ans.stderr,3000)
			else:
				eel.cls()
				eel.snackm("Project created successfully",2000)
				ans = run([path + "adb","shell","ls","/sdcard/Android/data/org.python.adp/files/"],stdout=PIPE,stderr=PIPE,universal_newlines=True)
				if(ans.stderr == ""):
					eel.load(ans.stdout)
		else:
			eel.snackm("Project already exists",3000)
	else:
		eel.loading("off")

@eel.expose
def dproj(val):
	if(cc() and app()):
		ans = run([path + "adb","shell","rm","-rf","/sdcard/Android/data/org.python.adp/files/ADP\\ Projects/"+val],stdout=PIPE,stderr=PIPE,universal_newlines=True)
		if(ans.stderr != ""):
			eel.snackm(ans.stderr,3000)
		else:
			eel.cls()
			eel.snackm("Project Removed",2000)
			ans = run([path + "adb","shell","ls","/sdcard/Android/data/org.python.adp/files/ADP\\ Projects"],stdout=PIPE,stderr=PIPE,universal_newlines=True)
			if(ans.stderr == ""):
				eel.load(ans.stdout)
	else:
		eel.loading("off")

@eel.expose
def oproj(val):
	if(cc() and app()):
		ans = run([path + "adb","shell","ls","/sdcard/Android/data/org.python.adp/files/ADP\\ Projects/"+val],stdout=PIPE,stderr=PIPE,universal_newlines=True)
		if(ans.stderr != ""):
			eel.snackm(ans.stderr,3000)
		else:
			if(ans.stdout.strip() == ""):
				eel.temp()
			else:
				eel.move()
	else:
		eel.loading("off")

@eel.expose
def crt(val):
	if(cc() and app()):
		if(val.split("~")[1] == "kivy"):
			os.rename(path + "temp/kivy",path + "temp/main.py")
			ans = run([path + "adb","push",path + "temp/main.py","/sdcard/Android/data/org.python.adp/files/ADP Projects/"+val],stdout=PIPE,stderr=PIPE,universal_newlines=True)
			if(ans.stderr != ""):
				eel.snackm(ans.stderr,3000)
			else:
				run([path + "adb","shell","chmod","777","/sdcard/Android/data/org.python.adp/files/ADP\\ Projects/"+val+"/main.py"],stdout=PIPE,stderr=PIPE,universal_newlines=True)
				eel.snackm("Template created",3000)
				eel.move()
			os.rename(path + "temp/main.py",path + "temp/kivy")
		elif(val.split("~")[1] == "pygame"):
			os.rename(path + "temp/pygame",path + "temp/main.py")
			ans = run([path + "adb","push",path + "temp/main.py","/sdcard/Android/data/org.python.adp/files/ADP Projects/"+val],stdout=PIPE,stderr=PIPE,universal_newlines=True)
			if(ans.stderr != ""):
				eel.snackm(ans.stderr,3000)
			else:
				run([path + "adb","shell","chmod","777","/sdcard/Android/data/org.python.adp/files/ADP\\ Projects/"+val+"/main.py"],stdout=PIPE,stderr=PIPE,universal_newlines=True)
				eel.snackm("Template created",3000)
				eel.move()
			os.rename(path + "temp/main.py",path + "temp/pygame")
	else:
		eel.loading("off")
		
@eel.expose
def ipt(val):
	pass
	
@eel.expose
def loadFiles(val):
	if(cc() and app()):
		ans = run([path + "adb","shell","ls","-p","/sdcard/Android/data/org.python.adp/files/ADP\\ Projects/"+val],stdout=PIPE,stderr=PIPE,universal_newlines=True)
		if(ans.stderr != ""):
			eel.snackm(ans.stderr,3000)
		else:
			eel.load(ans.stdout);
	else:
		eel.loading("off")
		
@eel.expose
def read(val):
	if(cc() and app()):
		ans = run([path + "adb","shell","test","-d","/sdcard/Android/data/org.python.adp/files/ADP\\ Projects/"+val,"&&","echo","Hi"],stdout=PIPE,stderr=PIPE,universal_newlines=True)
		if ans.stdout == "":
			ans = run([path + "adb","pull","/sdcard/Android/data/org.python.adp/files/ADP Projects/"+val,path + "temp/.nomedia"],stdout=PIPE,stderr=PIPE,universal_newlines=True)
			if(ans.stderr != ""):
				eel.snackm(ans.stderr,3000)
			else:
				try:
					eel.data(open(path + "temp/.nomedia").read())
				except Exception as e:
					eel.snackm(str(e),3000)
					#win32ui.MessageBox(str(e),"Error reading file")
		else:
			loadFiles(val)
	else:
		eel.loading("off")
		
@eel.expose
def delete(val,val2):
	if(cc() and app()):
		ans = run([path + "adb","shell","rm","/sdcard/Android/data/org.python.adp/files/ADP\\ Projects/"+val],stdout=PIPE,stderr=PIPE,universal_newlines=True)
		if(ans.stderr != ""):
			eel.snackm(ans.stderr,3000)
		else:
			eel.snackm(f"{val} deleted",3000)
			loadFiles(val2)
	else:
		eel.loading("off")
		
@eel.expose
def rename(path,old,name):
	if(cc() and app()):
		if name.strip() != "":
			ans = run([path + "adb","shell","mv","/sdcard/Android/data/org.python.adp/files/ADP\\ Projects/"+path+"/"+old,"/sdcard/Android/data/org.python.adp/files/ADP\\ Projects/"+path+"/"+name],stdout=PIPE,stderr=PIPE,universal_newlines=True)
			run([path + "adb","shell","chmod","777","/sdcard/Android/data/org.python.adp/files/ADP\\ Projects/"+path+"/"+name],stdout=PIPE,stderr=PIPE,universal_newlines=True)
			if(ans.stderr != ""):
				eel.snackm(ans.stderr,3000)
			else:
				eel.snackm(f"{old} renamed to {name}",3000)
				loadFiles(path)
	else:
		eel.loading("off")
		
@eel.expose
def save(path,name,value):
	if(cc() and app()):
		print(name)
		file = open("sv/"+name,"w")
		file.write(value)
		file.close()
		ans = run(["adb","push","sv/"+name,"/sdcard/Android/data/org.python.adp/files/ADP Projects/"+path],stdout=PIPE,stderr=PIPE,universal_newlines=True)
		if(ans.stderr != ""):
			eel.snackm(ans.stderr,3000)
		else:
			run(["adb","shell","chmod","777","/sdcard/Android/data/org.python.adp/files/ADP\\ Projects/"+path+"/"+name],stdout=PIPE,stderr=PIPE,universal_newlines=True)
			eel.snackm("File saved",3000)
		os.remove("sv/"+name)
	else:
		eel.loading("off")

@eel.expose
def fd(path,root):
    if(cc() and app()):
        ans = run([path + "adb","shell","rm","-rf","/sdcard/Android/data/org.python.adp/files/ADP\\ Projects/"+path],stdout=PIPE,stderr=PIPE,universal_newlines=True)
        if(ans.stderr != ""):
            eel.snackm(ans.stderr,3000)
        else:
            eel.back()
            eel.snackm("Folder deleted",2000)
@eel.expose
def nfile(path,val):
	if(cc() and app()):
		if val.strip() != "":
			ans = run([path + "adb","shell","ls","/sdcard/Android/data/org.python.adp/files/ADP\\ Projects/"+path+"/"+val],stdout=PIPE,stderr=PIPE,universal_newlines=True)
			if(ans.stderr != ""):
				ans = run([path + "adb","shell",">","/sdcard/Android/data/org.python.adp/files/ADP\\ Projects/"+path+"/"+val],stdout=PIPE,stderr=PIPE,universal_newlines=True)
				if(ans.stderr != ""):
					eel.snackm(ans.stderr,3000)
				else:
					run([path + "adb","shell","chmod","777","/sdcard/Android/data/org.python.adp/files/ADP\\ Projects/"+path+"/"+val],stdout=PIPE,stderr=PIPE,universal_newlines=True)
					eel.snackm(f"{val} created",3000)
					loadFiles(path)
			else:
				eel.snackm("File or directory already exists",3000)
	else:
		eel.loading("off")
		
@eel.expose
def nfolder(path,val):
	if(cc() and app()):
		if val.strip() != "":
			ans = run([path + "adb","shell","ls","/sdcard/Android/data/org.python.adp/files/ADP\\ Projects/"+path+"/"+val],stdout=PIPE,stderr=PIPE,universal_newlines=True)
			if(ans.stderr != ""):
				ans = run([path + "adb","shell","mkdir","/sdcard/Android/data/org.python.adp/files/ADP\\ Projects/"+path+"/"+val],stdout=PIPE,stderr=PIPE,universal_newlines=True)
				if(ans.stderr != ""):
					eel.snackm(ans.stderr,3000)
				else:
					eel.snackm(f"{val} created",3000)
					loadFiles(path)
			else:
				eel.snackm("File or directory already exists",3000)
	else:
		eel.loading("off")
		
@eel.expose
def upld(cpath):
	if(cc() and app()):
		f=plyer.filechooser.open_file(multiple=True)
		os.chdir(path)
		if(len(f) > 0):
			upload = True
			for i in f:
				s = i.split("\\")
				ans = run([path + "adb","push",i,"/sdcard/Android/data/org.python.adp/files/ADP Projects/"+cpath],stdout=PIPE,stderr=PIPE,universal_newlines=True)
				if(ans.stderr == ""):
					run([path + "adb","shell","chmod","777","/sdcard/Android/data/org.python.adp/files/ADP Projects/"+cpath+s[len(s) - 1]],stdout=PIPE,stderr=PIPE,universal_newlines=True)
				else:
					upload = False
					eel.snackm(ans.stderr,3000)
					break
			if upload:
				eel.snackm("Files uploaded",3000)
				loadFiles(cpath)
			else:
				eel.snackm("Error uploading files",3000)
		else:
			eel.snackm("No file selected",3000)
	else:
		eel.loading("off")

@eel.expose
def mods():
	if(cc() and app()):
		ans = run([path + "adb","shell","ls","/sdcard/Android/data/org.python.adp/files/mds.txt"],stdout=PIPE,stderr=PIPE,universal_newlines=True)
		if ans.stderr == "":
			ans = run([path + "adb","pull","/sdcard/Android/data/org.python.adp/files/mds.txt",path + "temp/.nomedia"],stdout=PIPE,stderr=PIPE,universal_newlines=True)
		else:
			file = open(path + "temp/.nomedia","w")
			file.write("|")
			file.close()
		am = open(path + "temp/.nomedia").read()
		ans = run([path + "adb","shell","ls","/sdcard/Android/data/org.python.adp/files/data.json"],stdout=PIPE,stderr=PIPE,universal_newlines=True)
		if ans.stderr == "":
			ans = run([path + "adb","pull","/sdcard/Android/data/org.python.adp/files/data.json",path + "temp/.nomedia"],stdout=PIPE,stderr=PIPE,universal_newlines=True)
		else:
			file = open(path + "temp/.nomedia","w")
			file.write("{}")
			file.close()
		eel.openm(am,open(path + "temp/.nomedia").read())
	else:
		eel.loading("off")

@eel.expose
def sm(val):
	if(cc() and app()):
		file = open(path + "temp/.nomedia","w")
		file.write(val)
		file.close()
		ans = run([path + "adb","push",path + "temp/.nomedia","/sdcard/Android/data/org.python.adp/files/data.json"],stdout=PIPE,stderr=PIPE,universal_newlines=True)
		if(ans.stderr != ""):
			eel.snackm(ans.stderr,3000)
		else:
			run([path + "adb","shell","chmod","777","/sdcard/Android/data/org.python.adp/files/data.json"],stdout=PIPE,stderr=PIPE,universal_newlines=True)
			eel.closem()
			eel.snackm("Modules updated",3000)
	else:
		eel.loading("off")
		
@eel.expose
def debug(val):
	if(cc() and app()):
		run([path + "adb","shell","am","start","-n","org.python.adp/org.kivy.android.MainActivity"],stdout=PIPE,stderr=PIPE,universal_newlines=True)
		ans = run([path + "adb","shell","ls","/sdcard/Android/data/org.python.adp/files/data.json"],stdout=PIPE,stderr=PIPE,universal_newlines=True)
		data = ""
		if ans.stderr == "":
			ans = run([path + "adb","pull","/sdcard/Android/data/org.python.adp/files/data.json",path + "temp/.nomedia"],stdout=PIPE,stderr=PIPE,universal_newlines=True)
			data = json.loads(open(path + "temp/.nomedia").read().strip())[val]
		else:
			data = "."
		file = open(path + "temp/rn","w")
		file.write(val + "@" + data)
		file.close()
		ans = run([path + "adb","push",path + "temp/rn","/sdcard/Android/data/org.python.adp/files/"],stdout=PIPE,stderr=PIPE,universal_newlines=True)
		if(ans.stderr != ""):
			eel.snackm(ans.stderr,3000)
		else:
			eel.snackm( val.split("~")[0] + " running on Android emulator",3000)
	else:
		eel.loading("off")
		
@eel.expose
def stop():
	if(cc() and app()):
		run([path + "adb","shell","input","keyevent","4"],stdout=PIPE,stderr=PIPE,universal_newlines=True)
	else:
		eel.loading("off")
		
chrome_options = {
	'mode':'default',
	'cmdline_args':['--no-frame']
}
eel.start("web/index.html",mode="edge")
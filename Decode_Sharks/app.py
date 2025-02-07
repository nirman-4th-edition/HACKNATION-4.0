from flask import Flask, render_template, request, send_file
from markupsafe import Markup
import validators
import os
import time
import subprocess
from modules.auth import login
import logging

app = Flask(_name_)

#Configure logging
logging.basicConfig(level=logging.INFO)

#Path to save screenshots
SCREENSHOT_PATH = "screenshots"

#create screenshots directory if it doesnot exists
if not os.path.exists(SCREENSHOT_PATH):
	os.makedirs(SCREENSHOT_PATH)

@app.route('/', methods=['GET', 'POST'])
def home():
	screenshot_file = None
	error = None
	if request.method == 'POST':
		url = request.form.get('url')

		#validate the url
		if not validators.url(url):
			Markup.escape("Invalid URL. Please enter a valid URL")
			return render_template('home.html', screenshot = None,  error = error)

		#try to take a screenshot via wkhtmltoimage and tor
		try:
			screenshot_file = take_screenshot(url)
		except Exception as e:
			error = Markup.escape(f"Error taking screenshot: {e}")
	return render_template('home.html', screenshot = screenshot_file, error = error)

def take_screenshot(url):
	"""Take a screenshot of the URL using wkhtmltoimage with tor."""

	#define the output screenshot filename
	screenshot_filename = os.path.join(SCREENSHOT_PATH, f'screenshot_{int(time.time())}.png')


	#construct the command to use wkhtmltoimage with tor proxy (via SOCKS5)
	command = [
		'wkhtmltoimage',
		'--proxy', 'socks5://127.0.0.1:9050',  #use tor socks5 proxy
		url,  #The url to capture
		screenshot_filename  #output file
	]


	#run the wkhtmltoimage command
	result = subprocess.run(command, stdout = subprocess.PIPE, stderr = subprocess.PIPE)

	#check if the command was successful
	if result.returncode != 0:
		raise Exception(Markup.escape(f"wkhtmltoimage failed:{result.stderr.decode('utf-8')}"))
	return screenshot_filename

@app.route('/screenshot/<filename>')
def display_screenshot(filename):
	"""Send the screenshot file to the users."""
	return send_file(os.path.join(SCREENSHOT_PATH, filename))

if _name_ == '_main_':
	app.run(debug = True, host = '0.0.0.0', port = 5000)

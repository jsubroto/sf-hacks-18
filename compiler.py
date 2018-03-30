from flask import Flask, render_template
import traceback
 
app = Flask(__name__)
 
@app.route("/")
def index():
    return render_template('template.html')
 
@app.route("/python/", methods=['POST'])
def runCode():
	output = ''
	list = []
	try:
		for i in range (10):
			list.append(i)
	except Exception as e:
		output = traceback.format_exc()
		print(traceback.format_exc())
		return render_template('template.html',pythonCode = output)

	return render_template('template.html',pythonCode = list)

@app.route("/error/", methods=['POST'])
def runError():
	output = ''
	list = []
	try:
		for i in range (10):
			list = 2/0
	except Exception as e:
		output = traceback.format_exc()
		print(traceback.format_exc())
		return render_template('template.html',pythonCode = output)

	return render_template('template.html',pythonCode = list)
 
if __name__ == "__main__":
    app.run()
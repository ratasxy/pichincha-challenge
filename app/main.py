from flask import Flask, request
import os

app = Flask(__name__)


@app.route('/')
def home():
    return "hello world!"


@app.route('/DevOps', methods=['POST'])
def devops():
    content = request.json
    template = "Hello {} your message will be send"
    response = {"message": template.format(content['to'])}
    return response, 200


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
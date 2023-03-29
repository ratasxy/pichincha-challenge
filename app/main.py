from flask import Flask, request
import jwt
import os

app = Flask(__name__)
app.debug = True
secret = os.environ['SECRET_JWT']


@app.route('/')
def home():
    return "hello world!"


@app.route('/DevOps', methods=['POST'])
def devops():
    try:
        token = request.headers['X-JWT-KWY']
        ans = jwt.decode(token, secret, algorithms=["HS256"])
    except:
        return {"status": "ERROR Token Invalid"}, 403
    content = request.json
    template = "Hello {} your message will be send"
    response = {"message": template.format(content['to'])}
    return response, 200


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
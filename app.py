# -*- coding: utf-8 -*-json
# modules
from flask import Flask, request, render_template, jsonify, Response
from bson import json_util
from bson.objectid import ObjectId
from internal import conn
from internal import form


# coll to make query in mongo 
coll = conn.connection()

app = Flask(__name__, template_folder = "views")


# params
# http://127.0.0.1?name=
@app.route("/", methods = ["GET"])
def index():
    # param
    query = coll.find()
    return render_template("index.html", tasks = query)




@app.route("/add", methods = ["POST"])
def add():
    # GET DATA
    form_title = request.form["title"]
    form_desc = request.form["desc"]
    timestamp = request.form["timestamp"]
    time = request.form["time"]
    

    # ADD DATA
    coll.insert_one({ "title": form_title, "description": form_desc, "timestamp": timestamp, "time": time})
    # QUERY FOR DATA
    query = coll.find_one({ "title": form_title, "time": time })
    # PARSER QUERY INFO TO JSON
    data = json_util.dumps(query)
    return Response(data, mimetype="application/json")



@app.route("/delete/<id>", methods = ["GET"])
def delete(id):
    query = coll.delete_one({"_id": ObjectId(id)})  
    return ({
        "msg": "deleted success --> {}".format(id)
        })


@app.errorhandler(404)
def notFound(e):
    return {
    "msg": "resource not found"
    }, 404


if __name__ == "__main__":
    app.run(debug = True, port = 80)
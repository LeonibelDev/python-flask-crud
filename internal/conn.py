from pymongo import MongoClient

def connection():
    conn_mdb = MongoClient('mongodb://localhost')
    db = conn_mdb["task_list"] 
    coll = db["tasks"] 
    return coll       

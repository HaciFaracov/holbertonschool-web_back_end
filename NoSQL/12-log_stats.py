#!/usr/bin/env python3
"""
This module provides a script to analyze Nginx logs stored in MongoDB.
It connects to a local MongoDB instance and provides statistics about
the 'nginx' collection in the 'logs' database.
"""
from pymongo import MongoClient


def log_stats():
    """
    Connects to the MongoDB database 'logs' and performs counts on the
    'nginx' collection to display:
    - Total number of logs
    - Breakdown of logs by HTTP method
    - Number of logs representing a status check (GET /status)
    """
    # Initialize the MongoDB client
    client = MongoClient('mongodb://127.0.0.1:27017')
    # Access the collection 'nginx' within database 'logs'
    nginx_collection = client.logs.nginx

    # 1. Total logs count
    total_logs = nginx_collection.count_documents({})
    print(f"{total_logs} logs")

    # 2. Methods stats
    print("Methods:")
    methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    for method in methods:
        count = nginx_collection.count_documents({"method": method})
        # Note the literal tabulation \t before 'method'
        print(f"\tmethod {method}: {count}")

    # 3. Status check count (Method GET and Path /status)
    status_check_count = nginx_collection.count_documents(
        {"method": "GET", "path": "/status"}
    )
    print(f"{status_check_count} status check")


if __name__ == "__main__":
    log_stats()
    

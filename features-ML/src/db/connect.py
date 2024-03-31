import mysql.connector

def db_connect():
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="Newton@2001",
            database="madicationremainder"
        )
        print("Connected to MySQL database")
        return conn
    except mysql.connector.Error as err:
        print("Error connecting to MySQL database:", err)
        return None

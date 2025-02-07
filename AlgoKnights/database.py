import sqlite3

# Connect to the SQLite3 database
conn = sqlite3.connect('database.db')
cursor = conn.cursor()

# Create a table to store email statistics
cursor.execute('''
CREATE TABLE IF NOT EXISTS email_statistics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    template TEXT NOT NULL,
    clicked INTEGER DEFAULT 0,
    opened INTEGER DEFAULT 0,
    ignored INTEGER DEFAULT 0,
    credentials_entered INTEGER DEFAULT 0
)
''')

# Function to insert email statistics
def insert_email_statistics(email, template):
    cursor.execute('''
    INSERT INTO email_statistics (email, template)
    VALUES (?, ?)
    ''', (email, template))
    conn.commit()

# Function to update email statistics
def update_email_statistics(email, column):
    cursor.execute(f'''
    UPDATE email_statistics
    SET {column} = {column} + 1
    WHERE email = ?
    ''', (email,))
    conn.commit()

# Function to retrieve email statistics
def get_email_statistics():
    cursor.execute('SELECT * FROM email_statistics')
    return cursor.fetchall()

# Close the database connection
def close_connection():
    conn.close()

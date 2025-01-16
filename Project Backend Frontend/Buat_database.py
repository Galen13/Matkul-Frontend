import sqlite3
try:
    sqliteConnection = sqlite3.connect('database_penginapan.db')
    cursor = sqliteConnection.cursor()
    print("Database berhasil terkoneksi")

    # Membuat tabel tipe_kamar dengan kolom gambar
    sqlite_create_table_kamar_query = '''CREATE TABLE tipe_kamar (
                                            id INTEGER PRIMARY KEY,
                                            nama_kamar TEXT NOT NULL UNIQUE,
                                            harga INTEGER NOT NULL,
                                            slot INTEGER NOT NULL,
                                            deskripsi TEXT,
                                            gambar TEXT);'''
    cursor.execute(sqlite_create_table_kamar_query)
    sqliteConnection.commit()
    print("Tabel berhasil dibuat")
    sqlite_select_Query = "select sqlite_version();"
    cursor.execute(sqlite_select_Query)
    record = cursor.fetchall()
    print("SQLite Database Version is: ", record)
    cursor.close()

except sqlite3.Error as error:
    print("Error Gagal terkoneksi ke Database", error)
finally:
    if (sqliteConnection):
        sqliteConnection.close()
        print("Koneksi Database Selesai")
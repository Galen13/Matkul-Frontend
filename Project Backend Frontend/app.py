from flask import Flask, render_template, request, redirect, url_for, flash
import sqlite3 as sql
import sqlite3
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/img'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/")
@app.route("/home")
def home():
    sqliteConnection = sqlite3.connect('database_penginapan.db')
    cursor = sqliteConnection.cursor()
    cursor.row_factory = sql.Row
    sqlite_select_query = "SELECT * from tipe_kamar"
    cursor.execute(sqlite_select_query)
    data = cursor.fetchall()
    return render_template("home.html", datas=data)

@app.route("/tambah_data", methods=['POST', 'GET'])
def tambah_data():
    if request.method == 'POST':
        tipe_kamar = request.form['nama_kamar']
        harga = request.form['harga']
        slot = request.form['slot']
        deskripsi = request.form['deskripsi']
        
        # Handle image upload
        gambar = None
        if 'gambar' in request.files:
            file = request.files['gambar']
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                gambar = 'img/' + filename

        sqliteConnection = sqlite3.connect('database_penginapan.db')
        cursor = sqliteConnection.cursor()
        cursor.execute("INSERT INTO tipe_kamar(nama_kamar, harga, slot, deskripsi, gambar) VALUES (?, ?, ?, ?, ?)",
                      (tipe_kamar, harga, slot, deskripsi, gambar))
        sqliteConnection.commit()
        flash('Data Sudah Masuk', 'success')
        return redirect(url_for("admin"))
    return render_template("tambah_data.html")

@app.route("/edit_data/<string:id>", methods=['POST', 'GET'])
def edit_data(id):
    if request.method == 'POST':
        tipe_kamar = request.form['nama_kamar']
        harga = request.form['harga']
        slot = request.form['slot']
        deskripsi = request.form['deskripsi']

        # Handle image upload
        gambar_update = ""
        if 'gambar' in request.files:
            file = request.files['gambar']
            if file and allowed_file(file.filename):
                # Hapus gambar lama jika ada
                sqliteConnection = sqlite3.connect('database_penginapan.db')
                cursor = sqliteConnection.cursor()
                cursor.execute("SELECT gambar FROM tipe_kamar WHERE id=?", (id,))
                old_image = cursor.fetchone()
                if old_image and old_image[0]:
                    old_image_path = os.path.join(app.config['UPLOAD_FOLDER'], old_image[0].replace('img/', ''))
                    if os.path.exists(old_image_path):
                        os.remove(old_image_path)

                # Simpan gambar baru
                filename = secure_filename(file.filename)
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                gambar_update = ", gambar='img/" + filename + "'"

        sqliteConnection = sqlite3.connect('database_penginapan.db')
        cursor = sqliteConnection.cursor()
        cursor.execute(f"UPDATE tipe_kamar SET nama_kamar=?, harga=?, slot=?, deskripsi=?{gambar_update} WHERE id=?",
                      (tipe_kamar, harga, slot, deskripsi, id))
        sqliteConnection.commit()
        flash('Data Sudah Di Update', 'success')
        return redirect(url_for("admin"))

    sqliteConnection = sqlite3.connect('database_penginapan.db')
    cursor = sqliteConnection.cursor()
    cursor.row_factory = sql.Row
    cursor.execute("SELECT * FROM tipe_kamar WHERE id=?", (id,))
    data = cursor.fetchone()    
    return render_template("edit_data.html", datas=data)

@app.route("/hapus_data/<string:id>", methods=['GET'])
def hapus_data(id):
    try:
        sqliteConnection = sqlite3.connect('database_penginapan.db')
        cursor = sqliteConnection.cursor()
        
        # Get image path before deleting the record
        cursor.execute("SELECT gambar FROM tipe_kamar WHERE id=?", (id,))
        image_data = cursor.fetchone()
        
        # Delete the record from database
        cursor.execute("DELETE FROM tipe_kamar WHERE id=?", (id,))
        sqliteConnection.commit()
        
        # Delete the image file if it exists
        if image_data and image_data[0]:
            image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_data[0].replace('img/', ''))
            if os.path.exists(image_path):
                os.remove(image_path)
                
        flash('Data Sudah Terhapus', 'warning')
    except Exception as e:
        flash(f'Error: {str(e)}', 'danger')
    finally:
        if sqliteConnection:
            sqliteConnection.close()
            
    return redirect(url_for("admin"))

@app.route("/kamar")
def user():
    sqliteConnection = sqlite3.connect('database_penginapan.db')
    cursor = sqliteConnection.cursor()
    cursor.row_factory = sql.Row
    sqlite_select_query = "SELECT * from tipe_kamar"
    cursor.execute(sqlite_select_query)
    data = cursor.fetchall()
    return render_template("kamar.html", datas=data)

@app.route("/login")
def login():
    sqliteConnection = sqlite3.connect('database_penginapan.db')
    cursor = sqliteConnection.cursor()
    cursor.row_factory = sql.Row
    sqlite_select_query = "SELECT * from tipe_kamar"
    cursor.execute(sqlite_select_query)
    data = cursor.fetchall()
    return render_template("login.html")

@app.route("/admin")
def admin():
    sqliteConnection = sqlite3.connect('database_penginapan.db')
    cursor = sqliteConnection.cursor()
    cursor.row_factory = sql.Row
    sqlite_select_query = "SELECT * from tipe_kamar"
    cursor.execute(sqlite_select_query)
    data = cursor.fetchall()
    return render_template("admin.html", datas=data)

if __name__ == '__main__':
    app.secret_key='stikom123'
    app.run(debug=True)
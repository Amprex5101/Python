# funciones.py

import os
import glob

UPLOAD_DIRECTORY = "uploads/"

def upload_file(request):
    if 'files[]' not in request.files:
        return {"status": "error", "message": "No file part"}, 400

    files = request.files.getlist('files[]')
    for file in files:
        if file.filename == '':
            return {"status": "error", "message": "No selected file"}, 400

        filepath = os.path.join(UPLOAD_DIRECTORY, file.filename)
        file.save(filepath)
    
    return {"status": "success", "message": "Files uploaded successfully."}, 200

def delete_file(filename):
    filepath = os.path.join(UPLOAD_DIRECTORY, filename)
    if os.path.exists(filepath):
        os.remove(filepath)
        return {"status": "success", "message": "File deleted."}, 200
    else:
        return {"status": "error", "message": "File does not exist."}, 404

def load_files():
    files = glob.glob(os.path.join(UPLOAD_DIRECTORY, "*"))
    file_details = []
    for file in files:
        file_name = os.path.basename(file)
        file_extension = os.path.splitext(file_name)[1][1:]
        file_details.append({
            'name': file_name,
            'extension': file_extension
        })
    return file_details

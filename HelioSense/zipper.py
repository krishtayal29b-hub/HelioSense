import os
import zipfile

def zipdir(path, ziph):
    for root, dirs, files in os.walk(path):
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
        if 'venv' in dirs:
            dirs.remove('venv')
        if '.git' in dirs:
            dirs.remove('.git')
        if '__pycache__' in dirs:
            dirs.remove('__pycache__')
            
        for file in files:
            file_path = os.path.join(root, file)
            arcname = os.path.relpath(file_path, path)
            ziph.write(file_path, arcname)

if __name__ == '__main__':
    source_dir = r'C:\Users\hp\.gemini\antigravity\scratch\HelioSense'
    target_zip = r'C:\Users\hp\Downloads\HelioSense.zip'
    
    # Ensure Downloads directory exists
    os.makedirs(r'C:\Users\hp\Downloads', exist_ok=True)
    
    with zipfile.ZipFile(target_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
        zipdir(source_dir, zipf)
    print(f'Successfully created {target_zip}')

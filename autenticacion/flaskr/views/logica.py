from ..utils.helpers import upload_file_to_s3, allowed_file

def procesar_imagen(imagen):
    # check whether a file is selected
    if imagen.filename == '':
        print('No selected file')
        return False

    # check whether the file extension is allowed (eg. png,jpeg,jpg,gif)
    if imagen and allowed_file(imagen.filename):
        output = upload_file_to_s3(imagen) 
        
        # if upload success,will return file name of uploaded file
        if output:
            # write your code here 
            # to save the file name in database

            print("Success upload")
            return output

        # upload failed, redirect to upload page
        else:
            print("Unable to upload, try again")
            return False
        
    # if file extension not allowed
    else:
        print("File type not accepted,please try again.")
        return False
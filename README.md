# File Rename & Upload API

This API allows users to upload a file, rename it, and save it to a specified location(`C:\Microglia\`).

---

## 🚀 How to Test with Postman

### 1️⃣ **Start the Server**
Ensure your Node.js backend is running. If not, start it using:
```sh
npm start
```

By default, the server will run on `http://localhost:5000` (change this if your server runs on a different port).

---

### 2️⃣ **Upload & Rename File Using Postman**

#### **📌 Step 1: Open Postman**

#### **📌 Step 2: Create a New Request**
- Select `POST`
- Enter the API endpoint:  
  ```
  http://localhost:5000/upload
  ```

#### **📌 Step 3: Set Headers**
- Go to the `Headers` tab
- Add a new key-value pair:
  ```plaintext
  Key: Content-Type
  Value: multipart/form-data
  ```

#### **📌 Step 4: Add Form Data (Body)**
1. Go to the `Body` tab.
2. Select `form-data`.
3. Add the following fields:
   - **Key:** `file` → Type: `File` → Select a file from your system.
   - **Key:** `newFileName` → Type: `Text` → Enter the new file name (e.g., `renamed-file.jpg`).
   - **Key:** `savePath` → Type: `Text` → Enter the folder where the file should be saved (e.g., `C:/Users/Public/Documents/`).

#### **📌 Step 5: Send the Request**
Click **Send**, and you should receive a JSON response like:
```json
{
  "message": "File uploaded and renamed successfully!",
  "savedPath": "C:/Users/Public/Documents/renamed-file.jpg"
}
```

---

### 3️⃣ **Verify the File on Your System**
1. Open `C:\\Microglia\\'+folderPath` (or your specified save path) you can change if you want.
2. Check if the file `renamed-file.jpg` exists.

---

## 🛠 Troubleshooting

| Issue | Solution |
|--------|------------|
| `ENOENT: No such file or directory` | Ensure the `savePath` exists or create the directory manually. |
| `TypeError: Assignment to constant variable` | Check `server.js` and use `let` instead of `const` for variables that change. |
| No file uploaded | Ensure Postman `Body` is set to `form-data` and the `file` key is of type `File`. |

---

## 🎯 Notes
- **Ensure that your backend has write permissions** to the specified save path.
- **For security reasons**, avoid allowing unrestricted file uploads.
- **Modify the backend** to handle different file types if needed.

Happy coding! 🚀


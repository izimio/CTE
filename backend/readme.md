API
--
to run : npm start or docker build -t <image> . => docker run -dp 8080:8080 <image>

all the endpoints
- /url
    - GET **/** (Returns all the url)
    - GET **/:url** (Returns 0 or 1 depending if the url in parameter already exists)
    - POST **/add** (Create a new URL page | needs a body with a URL and a valid password)
    - PUT **/pswd** (Modify the password realated to a URL page | needs a body with the previous password, the URL and the new password)
    - PUT **/cnt**  (Modify the content realated to a URL page | needs a body with the password, the URL and the new content)
    - DELETE **/delete**  (Delete a URL page | needs a body with the password, and the URL of the page)

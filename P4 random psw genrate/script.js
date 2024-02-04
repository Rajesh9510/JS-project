const passwordBox=document.getElementById("inputfield")
const length=12;

const upperCase="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase="abcdefghijklmnopqrstuvwxyz";
const symbol="!@#$%^&*-_()";
const number="0123456789";

const allChar=upperCase+lowerCase+symbol+number;
function createPassword()
{
    let password="";
    password+=upperCase[Math.floor(Math.random()*upperCase.length)];
    password+=lowerCase[Math.floor(Math.random()*lowerCase.length)];
    password+=symbol[Math.floor(Math.random()*symbol.length)];
    password+=number[Math.floor(Math.random()*number.length)];
    while(length > password.length )
    {
        password+=allChar[Math.floor(Math.random()*allChar.length)];
    }
    passwordBox.value=password;
}
function copyPassword()
{
    passwordBox.select();
    document.execCommand("copy");

}
function copyPassword() {
    const passwordBox = document.getElementById('passwordBox'); // Replace 'passwordBox' with the actual ID of your password input element

    if (passwordBox) {
        // Select the text inside the password box
        passwordBox.select();

        try {
            // Attempt to copy the selected text to the clipboard
            document.execCommand('copy');
            alert('Password copied to clipboard!');
        } catch (err) {
            console.error('Unable to copy to clipboard:', err);
        }
    } else {
        console.error('Password box not found!');
    }
}

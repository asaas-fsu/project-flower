let user = getCookie("user");
if (user !== "") {
    document.getElementById("userButton").innerHTML = user + "<br>" + "Profile";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

function logout() {
    console.log("logout");
    document.cookie = 'instructor=; Max-Age=0; path=/; domain=' + location.hostname;
    document.cookie = 'user=; Max-Age=0; path=/; domain=' + location.hostname;
    location.reload();
}
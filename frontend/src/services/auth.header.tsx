export const AuthHeader = () => {
    const user = localStorage.getItem("user");
    return { authorization: user ? `bearer ${user}` : "" };
  };
  
  // export const GetCookie = (nameCookie: string) =>
  //   (new RegExp((nameCookie || "=") + "=(.*?); ", "gm").exec(
  //     document.cookie + "; "
  //   ) || ["", null])[1];
  
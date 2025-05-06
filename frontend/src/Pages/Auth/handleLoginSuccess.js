import { jwtDecode } from "jwt-decode";

export const handleLoginSuccess = (data, getUserRole, navigate = null) => {
  const accessToken = data.access_token;
  const refreshToken = data.refresh_token;

  let clientRoles = [];
  try {
    const decoded = jwtDecode(accessToken);
    clientRoles = decoded.resource_access?.Insurance?.roles || [];
    console.log(decoded);
  } catch (error) {
    console.error("Error parsing auth token:", error);
  }

  localStorage.setItem("client_role", clientRoles);
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
  console.log(clientRoles);
  getUserRole();

  setTimeout(() => {
    if (clientRoles.includes("client_admin")) {
      window.location.href = "/AdminDashboard";
    } else if (clientRoles.includes("client_user")) {
      window.location.href = "/dashboard";
    }
  }, 1500);

  return clientRoles;
};

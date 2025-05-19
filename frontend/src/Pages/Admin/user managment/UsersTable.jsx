import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, RefreshCw, Eye, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { userTableManagement } from "./userManagement";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await userTableManagement();
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      setError(
        "Échec de la récupération des utilisateurs. Veuillez réessayer plus tard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) => {
      const matchesSearch =
        user.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toString().includes(searchTerm);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && user.active) ||
        (statusFilter === "inactive" && !user.active);

      return matchesSearch && matchesStatus;
    });

    setCurrentPage(1);
    setFilteredUsers(filtered);
  }, [searchTerm, statusFilter, users]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const StatusIndicator = ({ active }) => (
    <div className="flex items-center">
      <div
        className={`w-3 h-3 rounded-full mr-2 ${
          active ? "bg-green-500" : "bg-red-500"
        }`}
      ></div>
      <span className="text-sm font-medium">
        {active ? "Actif" : "Inactif"}
      </span>
    </div>
  );
  console.log("statusFilter value (render):", statusFilter);
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Utilisateurs</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm mb-8 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#476f66] focus:outline-none"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>

            <div className="flex items-center space-x-2">
              <label>Status:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="min-w-[150px] px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#476f66] focus:outline-none text-gray-800"
              >
                <option value="all">Tous</option>
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
              </select>
            </div>

            <button
              onClick={fetchUsers}
              className="flex items-center justify-center bg-white border border-gray-300 text-gray-700 hover:bg-green-100 font-medium py-2 px-4 rounded-md"
            >
              <RefreshCw className="w-4 h-4 mr-2" /> Rafraîchir
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-md mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin h-8 w-8 border-b-2 border-[#476f66] rounded-full"></div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            Aucun utilisateur trouvé.
          </div>
        ) : (
          <div className="space-y-4">
            {currentUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white shadow rounded-lg px-6 py-4 cursor-pointer hover:shadow-md flex"
                onClick={() => toggleExpand(user.id)}
              >
                {/* Vertical status indicator */}
                <div
                  className={`w-3 h-16 rounded-full mr-6 ${
                    user.active ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>

                {/* User content */}
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-semibold">
                        {user.firstname} {user.lastname}
                      </p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <StatusIndicator active={user.active} />
                      {expandedId === user.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                  </div>

                  {expandedId === user.id && (
                    <div className="mt-4 border-t pt-4 text-sm text-gray-700">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <span className="font-medium">
                            Nom d'utilisateur:
                          </span>{" "}
                          {user.username}
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/users/${user.id}`);
                          }}
                          className="px-4 py-2 bg-[#476f66] text-white rounded-md hover:bg-[#3a5c54]"
                        >
                          <Eye className="w-4 h-4 inline-block mr-1" /> Voir les
                          détails
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-center border-t border-gray-200 px-6 py-4 sm:px-8 mt-8">
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(e, value) => setCurrentPage(value)}
              color="primary"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#476f66",
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: "#f1f5f5",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "#476f66",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#3a5c54",
                    },
                  },
                },
              }}
            />
          </Stack>
        </div>

        {/* Users per page control */}
        <div className="mt-6 flex justify-end items-center space-x-2">
          <label className="text-sm text-gray-600">
            Utilisateurs par page :
          </label>
          <select
            value={usersPerPage}
            onChange={(e) => setUsersPerPage(Number(e.target.value))}
            className="px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#476f66] text-sm"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
    </div>
  );
}

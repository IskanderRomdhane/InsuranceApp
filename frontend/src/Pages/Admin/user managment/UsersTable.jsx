import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:8081/api/user");
      if (!response.ok)
        throw new Error("Échec de la récupération des utilisateurs");
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      console.error(err);
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

  useEffect(() => {
    setCurrentPage(1);
  }, [usersPerPage]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const goToPage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      setExpandedId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Rechercher des utilisateurs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#476f66] focus:outline-none"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full md:w-1/4 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#476f66] focus:outline-none"
        >
          <option value="all">Tous</option>
          <option value="active">Actif</option>
          <option value="inactive">Inactif</option>
        </select>

        <button
          onClick={fetchUsers}
          className="flex items-center justify-center bg-white border border-gray-300 text-gray-700 hover:bg-green-100 font-medium py-2 px-4 rounded-md"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Rafraîchir
        </button>
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
            <div key={user.id} className="border border-gray-200 rounded-lg">
              <div
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleExpand(user.id)}
              >
                <div>
                  <p className="font-semibold">
                    {user.firstname} {user.lastname}
                  </p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-md ${
                      user.active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.active ? "Actif" : "Inactif"}
                  </span>
                  {expandedId === user.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </div>

              {expandedId === user.id && (
                <div className="p-4 bg-gray-50 rounded-b-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Nom d'utilisateur</p>
                      <p className="font-medium">{user.username}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">ID utilisateur</p>
                      <p className="font-medium">{user.id}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => navigate(`/admin/users/${user.id}`)}
                      className="px-4 py-2 bg-[#476f66] text-white text-sm font-medium rounded-md hover:bg-[#3e6159]"
                    >
                      Voir les détails
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2 mt-8">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-md ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-1 rounded-md ${
                currentPage === page
                  ? "bg-[#476f66] text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-md ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Users Per Page */}
      <div className="mt-6 flex justify-end items-center space-x-2">
        <label className="text-sm text-gray-600">Utilisateurs par page :</label>
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
  );
}

"use client";

import { useState } from "react";
import {
  Search,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Filter,
  Download,
  ChevronDown,
  ChevronUp,
  X,
  CheckCircle,
  Clock,
  ShoppingCart,
  Truck,
  Package,
} from "lucide-react";

// Status Badge Component
const StatusBadge = ({ status }) => {
  const statusConfig = {
    Delivered: { color: "bg-green-500/20 text-green-400", icon: CheckCircle },
    "Add Cart": { color: "bg-blue-500/20 text-blue-400", icon: ShoppingCart },
    Pending: { color: "bg-yellow-500/20 text-yellow-400", icon: Clock },
    Delivering: { color: "bg-purple-500/20 text-purple-400", icon: Truck },
    Shipped: { color: "bg-cyan-500/20 text-cyan-400", icon: Package },
    "Add to Cart": {
      color: "bg-blue-500/20 text-blue-400",
      icon: ShoppingCart,
    },
  };

  const { color, icon: Icon } = statusConfig[status] || {
    color: "bg-gray-500/20 text-gray-400",
    icon: Package,
  };

  return (
    <div
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${color}`}
    >
      <Icon size={12} />
      <span>{status}</span>
    </div>
  );
};

// Product Table Component
const ProductSummaryTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Sample data
  const productData = [
    {
      id: 1,
      purchaseDate: "23 Sep, 2021",
      clientName: "Sean Black",
      productId: "PRO12345",
      product: "Mi LED Smart TV 4A 80",
      productCost: "$14,500",
      paymentMode: "Online Payment",
      status: "Delivered",
    },
    {
      id: 2,
      purchaseDate: "16 Aug, 2021",
      clientName: "Evan Rees",
      productId: "PRO8765",
      product: "Thomson R9 122cm (48 inch) Full HD LED TV",
      productCost: "$30,000",
      paymentMode: "Cash on delivered",
      status: "Add Cart",
    },
    {
      id: 3,
      purchaseDate: "23 Feb, 2021",
      clientName: "David Wallace",
      productId: "PRO54321",
      product: "Vu 80cm (32 inch) HD Ready LED TV",
      productCost: "$13,200",
      paymentMode: "Online Payment",
      status: "Pending",
    },
    {
      id: 4,
      purchaseDate: "21 June, 2021",
      clientName: "Julia Bower",
      productId: "PRO97654",
      product: "Micromax 81cm (32 inch) HD Ready LED TV",
      productCost: "$15,100",
      paymentMode: "Cash on delivered",
      status: "Delivering",
    },
    {
      id: 5,
      purchaseDate: "04 Aug, 2021",
      clientName: "Kevin James",
      productId: "PRO4532",
      product: "HP 200 Mouse & Wireless Laptop Keyboard",
      productCost: "$5,987",
      paymentMode: "Online Payment",
      status: "Shipped",
    },
    {
      id: 6,
      purchaseDate: "04 Aug, 2021",
      clientName: "Theresa Wright",
      productId: "PRO6789",
      product: "Digisol DG-HR3400 Router",
      productCost: "$11,987",
      paymentMode: "Cash on delivered",
      status: "Delivering",
    },
    {
      id: 7,
      purchaseDate: "23 Sep, 2021",
      clientName: "Sebastian Black",
      productId: "PRO4567",
      product: "Dell WM118 Wireless Optical Mouse",
      productCost: "$4,700",
      paymentMode: "Online Payment",
      status: "Add to Cart",
    },
    {
      id: 8,
      purchaseDate: "16 Aug, 2021",
      clientName: "Kevin Glover",
      productId: "PRO32156",
      product: "Dell 16 inch Laptop Backpack",
      productCost: "$678",
      paymentMode: "Cash On delivered",
      status: "Delivered",
    },
  ];

  // Filter by search query and status
  const filteredData = productData.filter((item) => {
    const matchesSearch =
      item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.productId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" || item.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0;

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    console.log(
      `Sorting by ${field} in ${
        sortField === field ? (sortDirection === "asc" ? "desc" : "asc") : "asc"
      } order`
    );
  };

  // Handle action click
  const handleAction = (action, product) => {
    console.log(`${action} action clicked for product: ${product.product}`);
  };

  // Handle export
  const handleExport = () => {
    console.log("Exporting product data");
  };

  // Get unique statuses for filter
  const statuses = ["all", ...new Set(productData.map((item) => item.status))];

  return (
    <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl shadow-lg p-5 border border-gray-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-100">
            Product Summary
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Manage and track your product inventory
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search Here"
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <button
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 hover:bg-gray-700 transition-colors flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} />
              <span>Filters</span>
            </button>

            <button
              className="px-3 py-2 bg-blue-600 rounded-lg text-gray-100 hover:bg-blue-500 transition-colors flex items-center gap-2"
              onClick={handleExport}
            >
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-300">
              Filter by Status
            </span>
            <button onClick={() => setShowFilters(false)}>
              <X size={16} className="text-gray-400" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedStatus === status
                    ? "bg-blue-600 text-gray-100"
                    : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              {[
                { key: "purchaseDate", label: "Purchase Date" },
                { key: "clientName", label: "Client Name" },
                { key: "productId", label: "Product ID" },
                { key: "product", label: "Product" },
                { key: "productCost", label: "Product Cost" },
                { key: "paymentMode", label: "Payment Mode" },
                { key: "status", label: "Status" },
                { key: "actions", label: "Actions" },
              ].map((column) => (
                <th
                  key={column.key}
                  className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() =>
                    column.key !== "actions" && handleSort(column.key)
                  }
                >
                  <div className="flex items-center gap-1">
                    {column.label}
                    {column.key !== "actions" &&
                      (sortField === column.key ? (
                        sortDirection === "asc" ? (
                          <ChevronUp size={14} />
                        ) : (
                          <ChevronDown size={14} />
                        )
                      ) : (
                        <MoreVertical size={14} className="opacity-30" />
                      ))}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.length > 0 ? (
              sortedData.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors"
                >
                  <td className="py-3 px-4 text-sm text-gray-300">
                    {item.purchaseDate}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-300">
                    {item.clientName}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-300">
                    {item.productId}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-300">
                    {item.product}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-300 font-medium">
                    {item.productCost}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-300">
                    {item.paymentMode}
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                        onClick={() => handleAction("view", item)}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="p-1.5 text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 rounded-lg transition-colors"
                        onClick={() => handleAction("edit", item)}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        onClick={() => handleAction("delete", item)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-8 text-center text-gray-500">
                  No products found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-6 border-t border-gray-700">
        <div className="text-sm text-gray-500">
          Showing {sortedData.length} of {productData.length} products
        </div>

        <div className="flex gap-2">
          <button className="px-3 py-1.5 rounded-lg bg-gray-800 text-gray-400 text-sm hover:bg-gray-700 transition-colors">
            Previous
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-gray-100 text-sm hover:bg-blue-500 transition-colors">
            1
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-gray-800 text-gray-400 text-sm hover:bg-gray-700 transition-colors">
            2
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-gray-800 text-gray-400 text-sm hover:bg-gray-700 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSummaryTable;

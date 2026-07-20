import DashboardLayout from "../../layouts/DashboardLayout";
import AddDepartment from "../../components/departments/AddDepartment";
import EditDepartment from "../../components/departments/EditDepartment";
import DeleteDepartment from "../../components/departments/DeleteDepartment";
import SearchDepartment from "../../components/departments/SearchDepartment";

function DepartmentList() {
  return (
    <DashboardLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "25px",
        }}
      >
        <h1
          style={{
            margin: 0,
            color: "#212529",
            fontWeight: "bold",
          }}
        >
          Departments
        </h1>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <AddDepartment />
        </div>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <EditDepartment />
        </div>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <DeleteDepartment />
        </div>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <SearchDepartment />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DepartmentList;
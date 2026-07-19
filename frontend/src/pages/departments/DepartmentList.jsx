import DashboardLayout from "../../layouts/DashboardLayout";
import AddDepartment from "../../components/departments/AddDepartment";
import EditDepartment from "../../components/departments/EditDepartment";
import DeleteDepartment from "../../components/departments/DeleteDepartment";
import SearchDepartment from "../../components/departments/SearchDepartment";

function DepartmentList() {
  return (
    <DashboardLayout>
      <h1>Departments</h1>

      <AddDepartment />

<hr />

<EditDepartment />
<hr />

<DeleteDepartment />
<hr />

<SearchDepartment />
    </DashboardLayout>
  );
}

export default DepartmentList;
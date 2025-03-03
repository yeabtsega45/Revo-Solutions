// import WorkForm from "@/src/components/Work-Form/Form1";
import CreateWorkForm from "@/src/components/Work-Form/createWorkForm";
import AdminLayout from "@/src/layouts/admin-layout";
import React from "react";

function CreateWork() {
  return (
    <AdminLayout>
      <CreateWorkForm />
    </AdminLayout>
  );
}

export default CreateWork;

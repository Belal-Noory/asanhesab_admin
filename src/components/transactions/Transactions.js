import React, { useState, useContext, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import Moment from "moment";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Toolbar } from "primereact/toolbar";
import LoadingScreen from "react-loading-screen";
import userContext from "../../context/users/userContext";

function Transactions() {
    const userData = useContext(userContext);
    const { enableUser, disableUser, addContract, getDisabledUsers, getusers, allUsers, dUsers,addUser } = userData;
    const [filters1, setFilters1] = useState(null);

    const [loading1, setLoading1] = useState(true);
    const [transactionDialog, setTransactionDialog] = useState(false);
    const [user, setUser] = useState({
        _id: "",
        name: "",
        email: "",
        password: "",
        company: "",
        start: "",
        end: ""
    });

    const dt = useRef(null);
    const toast = useRef(null);
    const [loader, setloader] = useState(true);

    // call customer context to run get all customers function to fetch customers from database
    useEffect(() => {
        getDisabledUsers();
        getusers();
        setloader(false);
        setLoading1(false);
    }, []);

    const formateDate = (rowData) => {
        return Moment(new Date(rowData.date)).format("DD/MM/YYYY");
    };


    const addcontract = (rowdata) => {

    };

    const setUserData = (e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mx-1" onClick={() => addcontract(rowData)} />
            </React.Fragment>
        );
    };

    const hideDialog = () => {
        setTransactionDialog(false);
    };

    const saveProduct = () => {
        addUser(user.name,user.email,user.password,user.company,user.start, user.end);
        toast.current.show({ severity: "success", summary: "Success", detail: "User Added Successfully", life: 3000 });
        setTransactionDialog(false);
        setUser({_id: "",name: "",email: "",password: "",company: "",start:"",end:""});
    };

    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Register" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </React.Fragment>
    );

    const openNew = () => {
        setUser({_id: "",name: "",email: "",password: "",company: "",start:"",end:""});
        setTransactionDialog(true);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New User" icon="pi pi-plus" className="p-button-success mr-2 header" onClick={openNew} />
            </React.Fragment>
        );
    };

    return (
        <LoadingScreen loading={loader} bgColor="#f1f1f1" spinnerColor="tomato" textColor="#676767" logoSrc="/images/logo-dark.svg" text="Loading">
            <div className="grid">
                <div className="datatable-filter-demo col-12">
                    <div className="card p-fluid">
                        <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
                        <DataTable
                            ref={dt}
                            value={allUsers}
                            paginator
                            className="p-datatable-customers"
                            showGridlines
                            rows={10}
                            dataKey="_id"
                            filters={filters1}
                            filterDisplay="menu"
                            loading={loading1}
                            responsiveLayout="scroll"
                            emptyMessage="No Users"
                            size="small"
                        >
                            <Column field="name" header="َName" filter filterPlaceholder="Name..." />
                            <Column field="email" header="Email" body={formateDate} filter filterPlaceholder="Search..." />
                            <Column field="date" header="Reg Date" />
                            <Column field="company" header="Company" filter filterPlaceholder="Search..." />
                            <Column field="contract.start" header="Contract Start" />
                            <Column field="contract.end" header="Contract End" />
                            <Column body={actionBodyTemplate} exportable={false}></Column>
                        </DataTable>
                    </div>

                    {/* dialoges for user adding */}
                    <Dialog visible={transactionDialog} style={{ width: "450px" }} header="Name" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        <div className="p-fluid grid">
                            <div className="field col-12  ">
                                <span className="p-float-label">
                                    <InputText value={user.name} onChange={setUserData}name="name" id="name" required />
                                    <label htmlFor="name">Name</label>
                                </span>
                            </div>

                            <div className="field col-12  ">
                                <span className="p-float-label">
                                    <InputText type="email" value={user.email} onChange={setUserData} name="email" id="email" required />
                                    <label htmlFor="email">Email</label>
                                </span>
                            </div>
                            
                            <div className="field col-12">
                                <span className="p-float-label">
                                    <InputText type="password" value={user.password} onChange={setUserData} name="password" id="password" />
                                    <label htmlFor="password">Password</label>
                                </span>
                            </div>

                            <div className="field col-12">
                                <span className="p-float-label">
                                    <InputText value={user.company} onChange={setUserData} name="company" id="company" />
                                    <label htmlFor="company">Company</label>
                                </span>
                            </div>

                            <div className="field col-12">
                                <span className="p-float-label">
                                    <Calendar value={user.start} onChange={setUserData} name="start" id="start" />
                                    <label htmlFor="start">Contract Start</label>
                                </span>
                            </div>

                            <div className="field col-12">
                                <span className="p-float-label">
                                    <Calendar value={user.end} onChange={setUserData} name="end" id="end" />
                                    <label htmlFor="end">Contract End</label>
                                </span>
                            </div>
                        </div>
                    </Dialog>

                    <Toast ref={toast} />
                </div>
            </div>
        </LoadingScreen>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};
export default React.memo(Transactions, comparisonFn);

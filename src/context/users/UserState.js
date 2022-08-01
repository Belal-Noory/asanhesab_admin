import React, { useState } from "react";
import userContext from "./userContext";
const UserState = (props) => {
    // host/backend server url
    const host = "http://localhost:5050/superadmin/auth";
    const userState = [];
    const [allUsers, setaallUsers] = useState(userState);
    const [dUsers, setadUsers] = useState(userState);

    // Get all Transactions
    const getusers = async () => {
        // call API to add the customer to the database
        const users = await fetch(`${host}/activeusers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const json = await users.json();
        // update the all customers list
        setaallUsers(json);
    };

    // Get all deleted Transactions
    const getDisabledUsers = async () => {
        // call API to add the customer to the database
        const users = await fetch(`${host}/disabledusers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await users.json();
        // update the all customers list
        setadUsers(json);
    };

    // Add contract
    const addContract = async (user,start,end) => {
        // call API to add the customer to the database
        await fetch(`${host}/contract/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: user,
                start: start,
                end: end,
            }),
        });
        getusers();   
    };

    // Disable Customer
    const disableUser = async (id) => {
        // call API to add the customer to the database
        await fetch(`${host}/disable/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        getDisabledUsers();
    };

    // Undo Delete Transaction
    const enableUser = async (id) => {
        // call API to update the customer in the database
        await fetch(`${host}/enable/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
    };

        // Add User
    const addUser = async (name,email,password,company,start,end) => {
        // call API to add the customer to the database
        await fetch(`${host}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                company: company,
                start: start,
                end:end
            }),
        });
        getusers();   
    };

    return (
        <userContext.Provider
            value={{
                enableUser,
                disableUser,
                addContract,
                getDisabledUsers,
                getusers,
                allUsers,
                dUsers,
                addUser
            }}
        >
            {props.children}
        </userContext.Provider>
    );
};

export default UserState;

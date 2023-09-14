import { Button, FormControl, FormLabel, Input, Select, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const AddUser = () => {
    const navigate = useNavigate(null);
    useEffect(() => {
        if (window.localStorage.getItem("role") !== "administrator") {
            navigate("/home");
        }
    }, []);

    // add user
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
        password_confirm: "",
        role: ""
    });
    const handleInputsChange = (event) => {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value
        });
    };
    const handleAddUserSubmit = (event) => {
        event.preventDefault();

        console.log(inputs);
        if (inputs.role === "") {
            alert("role not selected");
            return;
        }

        setIsSubmitting(true);
        axios.post(`http://localhost:1198/api/v1/user-add`, inputs).then(response => {
            // console.log(response);
            if (response.data.success) {
                window.location.reload();
            }
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            setIsSubmitting(false);
        });
    };

    const [selected, setSelected] = useState();
    const handleRoleChange = event => {
        console.log(event.target.value);
        setSelected(event.target.value);
        setInputs({ ...inputs, role: event.target.value });
    };

    return (
        <div>
            <Text fontSize="20px" color="tomato" marginLeft="15px">
                Add User
            </Text>
            <form onSubmit={handleAddUserSubmit} >
                <FormControl margin="15px" width="300px">
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input type="name" id="name" name="name" onChange={handleInputsChange} required value={inputs.name} placeholder="name" />

                    <FormLabel htmlFor="email" marginTop="30px">Email address</FormLabel>
                    <Input type="email" id="email" name="email" onChange={handleInputsChange} required value={inputs.email} placeholder="email" />

                    <FormLabel htmlFor="password" marginTop="30px">Password</FormLabel>
                    <Input type="password" id="password" name="password" placeholder="Password" onChange={handleInputsChange} required value={inputs.password} />

                    <FormLabel htmlFor="password_confirm" marginTop="30px">Password Confirm</FormLabel>
                    <Input type="password" id="password_confirm" name="password_confirm" placeholder="Password Confirm" onChange={handleInputsChange} required value={inputs.password_confirm} />

                    <Select placeholder="Select option" onChange={handleRoleChange} value={selected} marginTop="30px">
                        <option value="administrator">administrator</option>
                        <option value="viewer">viewer</option>
                        <option value="editor">editor</option>
                    </Select>

                    <Button
                        mt={4}
                        colorScheme="teal"
                        isLoading={isSubmitting}
                        type="submit"
                    >
                        Submit
                    </Button>
                    <Button
                        mt={4}
                        colorScheme="red"
                        onClick={() => {
                            window.location.reload();
                        }}
                        marginLeft="15px"
                    >
                        Cancel
                    </Button>
                </FormControl>
            </form>
        </div>
    )
}

export default AddUser

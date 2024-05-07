'use client'
import React, {useEffect, useState} from "react";
import {
    Calendar,
    Chip, DatePicker, Divider, Spacer,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip,
    User
} from "@nextui-org/react";
import {parseDate} from '@internationalized/date';
import Sidebar from "@/app/components/sidebar";
import {FaRegTrashCan} from "react-icons/fa6";
import {FaEdit} from "react-icons/fa";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure,  Input} from "@nextui-org/react";
import Toast from "@/app/Toast";
import Swal from "sweetalert2";




export default function App() {
    // const {isOpen,onClose, onOpen, onOpenChange} = useDisclosure();
    const { isOpen, onClose, onOpen: openFirstModal, onOpenChange } = useDisclosure();
    const { isOpen: isOpenSecond, onClose: onCloseSecond, onOpen: openSecondModal, onOpenChange: onOpenChangeSecond } = useDisclosure();
    let [item, setItem]=useState({})
    let [itemdetails, setItemdetails]=useState({})
    let [data,setdata]=useState([{}])
    let [reload ,setReload]=useState(false)
    function handleClickActionEdit(item) {
        // console.log(item);
        // setItem(item);
        setItem(item);
        openFirstModal();
    }
    function DeleteAction(product_id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const requestOptions = {
                    method: "DELETE",
                    redirect: "follow"
                };

                fetch("http://localhost:8081/project/products?product_id="+product_id, requestOptions)
                    .then((response) => {
                        if(response.ok) {
                            Toast.fire({
                                icon: 'success',
                                title: 'Product Deleted Successfully'
                            })
                        }else {
                            Toast.fire({
                                icon: 'error',
                                title: 'Product Deletion Failed'
                            })
                        }
                        setReload(!reload)
                    })
                    .catch((error) => console.error(error));
            }
        });
    }
    function submutChanges(items) {

        delete items.expire_date;
        delete items.add_date;
        delete items.supplier_email;
        delete items.supplier_id;
        delete items.supplier_name;

        console.log(items);
        onClose()
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(items);

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:8081/project/products", requestOptions)
            .then((response) => {
                if (response.ok) {
                    Toast.fire({
                        icon: 'success',
                        title: 'Product Updated Successfully'
                    })
                }else {
                    Toast.fire({
                        icon: 'error',
                        title: 'Product Update Failed'
                    })
                }
                return response.text()
            })
            .then((result) => {
                console.log(result)
                setReload(!reload)
            })
            .catch((error) => console.error(error));
    }
    function handleaddnew() {
        openSecondModal();
        setItemdetails({})
        console.log("add new");
    }
    function SubmitProduct(item) {

        console.log(item);
        onCloseSecond()
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(item);
        console.log(raw)

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:8081/project/products", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result)
                setReload(!reload)
            })
            .catch((error) => console.error(error));
    }

    useEffect(()=>{
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch("http://localhost:8081/project/products", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                 console.log(result)
                setdata(result)
            })
            .catch((error) => console.error(error));
    },[reload])





    return (

        <div className="flex flex-row h-[100vh] ">
            <Sidebar  />
            <div className="flex flex-col w-full items-center">
                <Spacer y={100}></Spacer>
                <div className="flex flex-col w-10/12 ">
                    <div className="flex flex-row w-full justify-between">
                        <h1 className="text-3xl font-bold">Products</h1>
                        <Button color="primary" variant="ghost" onPress={handleaddnew}>
                            Add New Product
                        </Button>
                    </div>
                    <Spacer y={3}></Spacer>
                    <Divider  />
                    <Spacer y={5}></Spacer>
                </div>
                <div className="flex w-10/12 ">
                    <Spacer y={200} />
                    <Table aria-label="Example table with custom cells">
                        <TableHeader>


                            <TableColumn >ProductID</TableColumn>
                            <TableColumn >Item Name</TableColumn>
                            <TableColumn >Price</TableColumn>
                            <TableColumn >Quantity</TableColumn>
                            <TableColumn >Expire Date</TableColumn>
                            <TableColumn ></TableColumn>

                        </TableHeader>
                        <TableBody >

                            {data.map((item) => (
                                <TableRow key={item.product_id}>
                                    <TableCell>{item.product_id}</TableCell>
                                    <TableCell>{item.product_name}</TableCell>
                                    <TableCell>{item.price}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{item.expire_date}</TableCell>
                                    <TableCell className="flex flex-row gap-2 items-center justify-center" align="center">
                                        <Chip color="black" startContent={<FaEdit />} variant="faded"  onClick={()=>handleClickActionEdit(item)} >Edit</Chip>

                                        <Chip color="danger" startContent={<FaRegTrashCan/>}variant="solid" onClick={()=>DeleteAction(item.product_id)} >Delete</Chip>

                                    </TableCell>
                                </TableRow>
                            ))}



                        </TableBody>
                    </Table>
                </div>
            </div>

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Edit Details</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus

                                    label="Product Name"
                                    placeholder="Enter the Product Name"
                                    variant="bordered"
                                    onChange={(e) => setItem({ ...item, product_name: e.target.value })}
                                    value={item.product_name}
                                />
                                <Input

                                    label="Price"
                                    placeholder="Enter the Price of the Product"
                                    type="number"
                                    variant="bordered"
                                    value={item.price}
                                    onChange={(e) => setItem({ ...item, price: e.target.value })}
                                />
                                <Input

                                    label="Quantity"
                                    placeholder="Enter the Quantity of the Product"
                                    type="number"
                                    variant="bordered"
                                    value={item.quantity}
                                    onChange={(e) => setItem({ ...item, quantity: e.target.value })}
                                />

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={()=>submutChanges(item)}>
                                    Submit Changes
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Modal
                isOpen={isOpenSecond}
                onOpenChange={onOpenChangeSecond}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add New Product</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus

                                    label="Product Name"
                                    placeholder="Enter the Product Name"
                                    variant="bordered"
                                    onChange={(e) => setItemdetails({ ...itemdetails, product_name: e.target.value })}

                                />
                                <Input

                                    label="Price"
                                    placeholder="Enter the Price of the Product"
                                    type="number"
                                    variant="bordered"
                                    onChange={(e) => setItemdetails({ ...itemdetails, price: e.target.value })}

                                />
                                <Input

                                    label="Quantity"
                                    placeholder="Enter the Quantity of the Product"
                                    type="number"
                                    variant="bordered"
                                    onChange={(e) => setItemdetails({ ...itemdetails, quantity: e.target.value })}

                                />
                                <Input

                                    label="Supplier ID"
                                    placeholder="Enter the Supplier ID"
                                    type="number"
                                    variant="bordered"
                                    onChange={(e) => setItemdetails({ ...itemdetails, supplier_id: e.target.value })}

                                />
                                <DatePicker
                                    label="Expiry Date"
                                    variant="bordered"
                                    showMonthAndYearPickers
                                    onChange={(value) => {
                                        const selectedDate = new Date(value);
                                        const formattedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;
                                        setItemdetails({ ...itemdetails, expire_date: formattedDate });
                                    }}
                                />



                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onCloseSecond}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={()=>SubmitProduct(itemdetails)}>
                                    Submit Changes
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>


        </div>
    );
}

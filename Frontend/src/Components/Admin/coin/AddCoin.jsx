import { useEffect, useState } from "react"
import { ScaleLoader } from "react-spinners"
import PageTitle from "../../PageTitle"
import ApiServices from "../../../ApiServices"
import { toast } from "react-toastify"
import Swal from "sweetalert2"


export default function AddCoin() {
    var [employeeName, setEmployeeName] = useState("")
    var [employees, setEmployees] = useState([])
    var [employeeId, setEmployeeId] = useState("")

    var [taskName, setTaskName] = useState("")
    var [tasks, setTasks] = useState([])
    var [taskId, setTaskId] = useState("")

    var [message, setMessage] = useState("")
    var [coinCount, setCoinCount] = useState("")
    var [type, setType] = useState("")
    var [user, setUser] = useState("")
    var [load, setLoad] = useState(false)

    useEffect(() => {
        let data = {
            status: "true"
        }
        ApiServices.GetAllEmployee(data)
            .then((res) => {
                setEmployees(res?.data?.data);
            })
            .catch((err) => {
                console.log("Error is ", err);
            })
    }, [load])

    useEffect(() => {
        let data = {
            userId: employeeId
        }
        ApiServices.GetAllEmployee(data)
            .then((res) => {
                setUser(res?.data?.data[0]?._id)
            })
            .catch((err) => {
                console.log("Error is ", err);
            })

    }, [employeeId])

    useEffect(() => {
        let data1 = {
            employeeId: user,
            status:"false"
        }
        ApiServices.GetAllTask(data1)
            .then((res) => {
                setTasks(res?.data?.data);
            })
            .catch((err) => {
                console.log("Error is ", err);
            })
    }, [user])

    function handleForm(e) {
        e.preventDefault()
        let data = {
            userId: employeeId,
            taskId: taskId,
            message: message,
            coinCount: coinCount,
            type: type
        }
        if (!employeeId) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please select a Employee before submitting.",
                timer: 3000,
                timerProgressBar: true,
            });
            return;
        }
        if (!taskId) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please select a Task before submitting.",
                timer: 3000,
                timerProgressBar: true,
            });
            return;
        }
        ApiServices.AddCoin(data)
            .then((res) => {
                var message = res?.data?.message
                setLoad(true)
                if (res?.data?.success) {
                    Swal.fire({
                        title: message,
                        icon: "success",
                        draggable: true,
                        confirmButtonText: 'Continue',
                        timer: 2000,
                        timerProgressBar: true,
                    });
                    setTimeout(() => {
                        setLoad(false)
                        setEmployeeName("")
                        setEmployeeId("")
                        setTaskName("")
                        setTaskId("")
                        setCoinCount("")
                        setType("")
                        setMessage("")
                    }, 2000)
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: message,
                        confirmButtonText: 'Continue',
                        timer: 2000,
                        timerProgressBar: true,
                    });
                    setTimeout(() => {
                        setLoad(false)
                    }, 2000)
                }
            })
            .catch((err) => {
                setLoad(true)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    confirmButtonText: 'Continue',
                    timer: 2000,
                    timerProgressBar: true,
                });
                setTimeout(() => {
                    setLoad(false)
                }, 2000)
                console.log("Error is ", err);
            })
    }
    return (
        <>
          a
        </>
    )
}
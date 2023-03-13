import React, {useState} from 'react';
import s from './TransferForm.module.css';
import Input from "../Input/Input";
import Button from "../Button/Button";
import Form from "react-bootstrap/Form";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import MultiSelect from "../MultiSelect/MultiSelect";
import {useAuth} from "../../hooks/use-auth";
import {makeTransaction} from "../../store/slices/transferSlice";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

function TransferForm(props) {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            transferTransaction: '',
            transferDescription: ''
        },
        mode: "onBlur"
    });

    const optList = props.users
        .filter(u => {return u.card !== props.myCard})
        .map(u => {
        return { value: u.card, label: u.firstName+" "+u.secondName }
    })

    const [selectedOptions, setSelectedOptions] = useState();
    const user = useAuth();

    const onSubmit = (payload) => {
        let to = [];

        for (let toUser in selectedOptions) {
            to.push(parseInt(selectedOptions[toUser].value));
        }
        const data = {
            from: parseInt(user.id),
            to: to,
            transact: parseInt(payload.transferTransaction),
            description: payload.transferDescription
        }

        toast.promise(dispatch(makeTransaction(data)), {
            pending: 'Выполняю запрос',
            success: 'Запрос успешно выполнен 👌',
            error: {render({data}){
                return `${data.message}`
            }}}
        ).then(() => navigate("/"));
    }

    return (
        <>
            <Form className={s.transferForm} onSubmit={handleSubmit(onSubmit)}>
                <MultiSelect title="To (max 10)"
                             require={true}
                             selectedOptions={selectedOptions}
                             setSelectedOptions={setSelectedOptions}
                             optionList={optList}/>

                <Input register={register}
                       registerName='transferTransaction'
                       options={
                           {
                               required: true,
                               pattern: {
                                   value: /^\d+$/
                               }
                           }
                       }
                       errors={errors}
                       title="Amount (min $100.00)"
                       require={true}
                       type="text"/>

                <Input register={register}
                       registerName='transferDescription'
                       title="Message"/>
                <Button type="submit">Transfer</Button>
            </Form>
        </>
    )
}

export default TransferForm;
import Button from "@mui/material/Button";
import React, {useEffect, useState} from "react";
import { getSingleProd} from "../../middleware/api/api";
import {useDispatch} from "react-redux";
import {setProdStore} from "../../middleware/redux/slice/ProductSlice/ProductSlice";
import CircularProgress from '@mui/material/CircularProgress'
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {setProdCart} from "../../middleware/redux/slice/CartSlice/CartSlice";

const toastData:any = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    style: {textTransform: 'capitalize'}
}
export const ProductDesPage = () => {

    let x = 0;
    const [prodNum,setProdNum] = useState<number>(1)
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [isAdd , setIsAdd] = useState<boolean>(false)
    const [data,setData] = useState({
        name:'#',
        description:'#',
        price:'#',
        image:'#',
        subCategory:{
            name:"#"
        }
    })
    const InsertId = window.location.pathname.split('/')[2].split('=')[1]
    const dispatch = useDispatch()
    useEffect(() => {
        setIsLoading(true)
        getSingleProd(InsertId).then(res=> {
                dispatch(setProdStore(res.data.product))
                setData(res.data.product)
                setIsLoading(false)
        })
    }, []);


    const setNumber = (value:string):void => {
        switch (value){
            case '+' :
                setProdNum(prodNum + 1)
                break;
            case '-':
                if(prodNum<=1) {
                    setProdNum(1)
                }else{
                    setProdNum(prodNum  - 1)
                }
                break;
            default :
                console.log(value)
                break;
        }
    }

    const addToCart = ():void => {
        setIsAdd(true)
        while(x<prodNum) {
            dispatch(setProdCart(data))
            x += 1;
        }
        setIsAdd(false)
        toast.success('عملیات با موفیت انجام شد',toastData)
    }

    return(
        <>
            {isLoading?null:<>
                <div className='proDesPage'>
                    <div>
                        <img
                            src={`https://shop-api.iran.liara.run${data && data.image}`}
                            alt='Product'
                            width='450px' height='450px'
                            crossOrigin='anonymous'/>
                    </div>
                    <div className='desProduct'>
                        <div>
                            <h1>{data && data.name}</h1>
                            <h5>دسته بندی: {data && data.subCategory.name}</h5>
                        </div>
                        <h3>{data && data.price} تومان</h3>
                        <div style={{display:'flex',gap:'2.5rem'}}>
                            <div style={{display:'flex'}}>
                                <div>
                                    <div className='plusOrMinBTN' onClick={()=>setNumber('+')}>+</div>
                                    <div className='plusOrMinBTN' onClick={()=>setNumber('-')}>-</div>
                                </div>
                                <input value={prodNum} className='plusOrMinInp'/>
                            </div>
                            <Button
                                variant='contained'
                                color='success'
                                onClick={addToCart}>
                                {isAdd?<CircularProgress />:`افزودن به سبد خرید`}

                            </Button>
                        </div>
                    </div>
                </div>
                <div className='description'>
                    <h2>توضیحات</h2>
                    <p>{data && data.description}</p>
                </div>
            </>
            }
        </>

    );
}

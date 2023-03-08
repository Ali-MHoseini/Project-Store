import React, {useEffect, useState} from 'react';
import '../../assets/styles/index.css'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Pagination from "@mui/material/Pagination";
import {AddProductModal} from "../AddPrudoctModal/AddProductModal";
import {getProds, getSubCategories} from "../../middleware/api/api";
import {ProdRow} from "../ProdRow/ProdRow";
import {EditProductModal} from "../EditProductModal/EditProductModal";
export const AdminProds = ()=> {
    const [ShowModal,setShowModal] = useState(false)
    const [data,setData] = useState<any>([])
    const [numOfPages,setNumOfPages] = useState<number>(1)
    let categoryList:object[] = [];

    useEffect(()=>{
        let resData:any;
        getSubCategories().then(responseCat => resData = responseCat.data.hits).then(res=>{
            resData.map((item:any) => {
                categoryList.push({label:item.name,id:item._id})
            })
        })
        console.log(categoryList)
    },[ShowModal])

    useEffect(() => {
        getProds(1,6).then(res=> {
            setNumOfPages(res.data.nbPages)
            setData(res.data.hits)})
    }, []);


    const closeModal = ():void => {
        setShowModal(false)
    }
    const addModal = ():void => {
        setShowModal(true)
    }
    const changePage = (pageNum:string) => {
        getProds(pageNum,6).then(res=> setData(res.data.hits))
    }
    return(
        <div className='admin__prods'>
            <AddProductModal ShowModal={ShowModal} CloseModal={closeModal} categoryList={categoryList}/>

            <div className='admin__prodsHeader'>
                <h3>مدیریت کالاها</h3>
                <TextField sx={{width:'28rem'}} label="جستجو کنید..." variant="standard"/>
                <Button variant='contained' color='inherit' onClick={addModal}>افزودن کالا</Button>
            </div>
            <table className='adminTable'>
                <thead>
                <th>#</th>
                <th>نام محصول</th>
                <th>دسته بندی</th>
                <th>گزینه ها</th>
                </thead>
                <tbody>
                {
                    data && data.map((value:any) => (
                        <ProdRow key={crypto.randomUUID()}
                                 name={value.name}
                                 subCat={value.subCategory.name}
                                 id={value._id} />
                    ))
                }


                </tbody>
            </table>
            <div style={{marginTop:'3rem',display:'flex',justifyContent:'center',direction:'ltr'}}>
                <Pagination
                    count={numOfPages}
                    onClick={(e:React.MouseEvent) => changePage((e.target as HTMLButtonElement).innerText)}
                    showFirstButton showLastButton />
            </div>
        </div>
    )
}
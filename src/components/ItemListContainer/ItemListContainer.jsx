import { useEffect, useState } from "react"
import { fetchProducts, fetchProductsByCategory} from "../../asyncMock"
import ItemList from "../ItemList/ItemList"
import "./ItemListContainer.css"
import { useParams } from "react-router-dom"


const ItemListContainer = ({greeting, toggleStates, setToggleStates}) => {

    const [products, setProducts] = useState([])

    const { categoryId } = useParams()

    useEffect ( () => {

        const asyncFunct = categoryId ? fetchProductsByCategory : fetchProducts
       
        asyncFunct(categoryId)
            .then (response => {
                setProducts(response)
            })
            .catch (error => {
                console.error(error)
            })
    }, [categoryId])

    return (
        <div className="ItemListContainer">
            <ItemList products={products} toggleStates={toggleStates} setToggleStates={setToggleStates}  />
            
        </div>
    )
}

export default ItemListContainer
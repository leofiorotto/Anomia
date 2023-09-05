import ItemCount from '../ItemCount/ItemCount'
import './ItemDetail.css'

const ItemDetail = ({ id, name, category, img, price, stock, description, ca, scanCollection, NFTcollection}) => {
    
    const handleOnAdd = (count) => {
        const objProductToAdd = {
            id, name, price, count
        }
    }

    return (
        <article className='ItemDetailContainer'>
            <div className='DescriptionDetail'>
                <picture>
                    <h2>{name}</h2>
                </picture>

                <section>
                    <b className='price'>{category}</b><br />
                    <b>Abeja</b><br />
                    <div className='images'>
                    <img src="https://www.nationalgeographic.com.es/medio/2023/05/16/1-istock-1396407304-min_5542ec27_230516163357_2000x1334.jpg" alt="" />
                    <img src="https://www.nationalgeographic.com.es/medio/2023/05/16/1-istock-1396407304-min_5542ec27_230516163357_2000x1334.jpg" alt="" />
                    <img src="https://www.nationalgeographic.com.es/medio/2023/05/16/1-istock-1396407304-min_5542ec27_230516163357_2000x1334.jpg" alt="" />
                    <img src="https://www.nationalgeographic.com.es/medio/2023/05/16/1-istock-1396407304-min_5542ec27_230516163357_2000x1334.jpg" alt="" />

                    </div>

                </section> 

                <footer>
                    <ItemCount onAdd={handleOnAdd} stock={stock}/>
                </footer>
            </div>

        </article>
    )
}

export default ItemDetail
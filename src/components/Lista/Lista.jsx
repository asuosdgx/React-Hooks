import Produto from "../Produto/Produto"
import { useEffect } from "react";

export default function Lista(){

    
  return(
        <section>
            <h2 className="text-xl text-center mt-3 mb-5">Lista de produtos</h2>
            <Produto/>   
        </section>
    )
}
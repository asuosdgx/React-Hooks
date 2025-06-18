import Produto from "../Produto/Produto"
import { useEffect } from "react";

export default function Lista(){

    
  return(
        <section>
            <p className="text-6xl font-light text-center mt-3 mb-5">Lista de produtos</p>
            <Produto/>   
        </section>
    )
}
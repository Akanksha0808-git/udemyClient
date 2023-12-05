import React, { createContext, useState, useEffect } from 'react'
import axios from "axios";
export const Store = createContext();
import "./lazyloader.css"
// const url = "http://localhost:4000/data"
const url="https://udemyclone-rx0k.onrender.com/data"
function DataStore(props) {
    const [loading, setLoading] = useState(true);
    
      const [data, setData] = useState()
      useEffect(() => {
        const getData = async () => {
          try {
            const res = await axios.get(url);
            console.log(res.data)
            await  setData(res.data);
            setLoading(false); 
          } catch (err) {
            console.log("error occured while fetching the data");
          }
          
        };
        getData();
    
      }, []);
    
      if (loading) {
        return <div className="loder_body">
          <img src='https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif' className="loader"></img>
        </div>
      }
    
      return (
        <>
          {data && (
          <Store.Provider value={[data, setData]}>
            {props.children}
          </Store.Provider>)}
    
        </>
      )
    }
    
    export default DataStore
/*
To create a currency generator app we should have to
-> install axios library of node.js used similar to the functionality
   of fetch api call 
->    
*/

import { useEffect, useState } from "react";
import axios from'axios';



function Currency_conven(){
    const [amount,setAmount]=useState(1);
    const [fromCurrency,setFromCurrency]=useState("USD");
    const [toCurrency,setToCurrency]=useState("INR");
    const [convertedAmount,setConvertedAmount]=useState(null);
    const [exchangeRate,setExchangeRate]=useState(null);
    

    // used to calculate exchnage rate when from currency and to currency changed
    useEffect(()=>{
        // getExchangeRate is a function 
        const getExchangeRate = async()=>{
            try{
                // fromcurrency to tocurrency
                let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
                const response = await axios.get(url);
                // to get correct value for exchange rate of to currency value
                setExchangeRate(response.data.rates[toCurrency]);
                console.log(response)

            }catch(error){
                console.log("error occured"+error);
            }
        };
        getExchangeRate();
    },[fromCurrency,toCurrency]);
    
    // connected to before useEffect and change when amount and exchange rate changes changes
    useEffect(()=>{
        if(exchangeRate!== null){
            setConvertedAmount((amount * exchangeRate).toFixed(2));
        }
    },[amount,exchangeRate]);
    // handle amount detail in the input amount box
    const handleAmountChange = (e)=>{
        const value = parseFloat(e.target.value);
        setAmount(isNaN(value) ? 0 : value)// if value is not an number it should be stored as zero
    }
    

    // handle from currency
    function handleFromCurrencyChange(e){
        setFromCurrency(e.target.value);
    }
    // handle to currency
    function handleToCurrencyChange(e){
        setToCurrency(e.target.value);
    }

    
    return(
        <>
          <div className="currency-conventor">
            <div className="box"></div>
            <div className="data">
                <h1>Currency Conventor</h1>
                <div className="input-container">
                    <label htmlFor="amt">Amount:</label>
                    <input type="text" id="amount" value={amount} onChange={handleAmountChange}/>
                </div>
                <div className="input-container">
                    <label htmlFor="fromCurrency">From Currency:</label>
                    <select name="" id="fromCurrency" value={fromCurrency} onChange={handleFromCurrencyChange}>
                    <option value="USD">USD - United States Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound Sterling</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                    <option value="AUD">AUD - Australian Dollar</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                    <option value="CNY">CNY - Chinese Yuan</option>
                    <option value="INR">INR - Indian Rupee</option>
                    <option value="BRL">BRL - Brazilian Real</option>
                    <option value="ZAR">ZAR - South African Rand</option>
                    </select>
                </div>
                <div className="input-container">
                    <label htmlFor="toCurrency">To Currency:</label>
                    <select name="" id="toCurrency" value={toCurrency} onChange={handleToCurrencyChange}>
                    <option value="USD">USD - United States Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound Sterling</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                    <option value="AUD">AUD - Australian Dollar</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                    <option value="CNY">CNY - Chinese Yuan</option>
                    <option value="INR">INR - Indian Rupee</option>
                    <option value="BRL">BRL - Brazilian Real</option>
                    <option value="ZAR">ZAR - South African Rand</option>
                    </select>
                </div>
                <div className="result">
                    <p>{amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}</p>
                </div>
            </div>
          </div>
          
        </>
    )

}

export default Currency_conven;
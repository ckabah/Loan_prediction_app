import React from 'react'
import { useState } from 'react'
import '../App.css';
//import Header from '../components/Header';
//import Footer from '../components/Footer';

export const LoanPrediction = () => {

    const [gender, setSelectedGender] = useState(1)
    const [married, setSelectedMarried] = useState(1)
    const [education, setSelectedEducation] = useState(1)
    const [dependents, setSelectedDependents] = useState(0)
    const [self_employment, setSelectedSelfEmployment] = useState(1)
    const [property_area, setSelectedPropertyArea] = useState(1)
    const [credit_history, setSelectedCreditHistory] = useState(0)
    const [applicant_income, setApplicantIncome] = useState(0)
    const [loan_amount, setLoanAmount]= useState(100)
    const [coapplicant_income, setCoapplicantIncome] = useState(0)
    const [loan_amount_term, setLoanAmountTerm] = useState(10)
    const [loan_result, setLoanResult] = useState([])

    const decision = ()=>{
        if (loan_result.result ===1){
            return (<div className='succes'>
                <p>👏👏👏 <span> Your loan application has been aproved</span> 🤑🤑🤑</p>
                </div>)
        } else if (loan_result.result ===0){
            return (<div className='sorry'>
                <p>🤒🤒🤒 <span>Soury Your loan application has not been aproved</span> 🤒🤒🤒</p>
                </div>)
        }
    }
    
    const handleApplicantIncome = (e)=>{
        setApplicantIncome(e.target.value)
    }
    const handleLoanAmount = (e)=>{
        setLoanAmount(e.target.value)
    }
    const handleCoapplicantIncome = (e)=>{
        setCoapplicantIncome(e.target.value)
    }
    const handleLoanAmountTerm = (e)=>{
        setLoanAmountTerm(e.target.value)
    }

    const handleChangeGender =(e) =>{
        setSelectedGender(e.target.value)
      }
    const handleChangeMarried =(e) =>{
        setSelectedMarried(e.target.value)
      }
    const handleChangeEducation =(e) =>{
        setSelectedEducation(e.target.value)
      }
    const handleChangeDependents =(e) =>{
        setSelectedDependents(e.target.value)
      }
    const handleChangeEmployment =(e) =>{
        setSelectedSelfEmployment(e.target.value)
      }
    const handleChangePropertyArea =(e) =>{
        setSelectedPropertyArea(e.target.value)
      }
    const handleChangeCreditHistory =(e) =>{
        setSelectedCreditHistory(e.target.value)
      }
    
    let input_data = {
     gender,
     married,
     education,
     dependents, 
     self_employment, 
     property_area, 
     applicant_income,
     loan_amount,
     coapplicant_income, 
     loan_amount_term,
     credit_history,
    }

    const Handlesubmit = async(e)=>{
        e.preventDefault()
        console.log(input_data)
        let response = await fetch('https://loan-pred-app.herokuapp.com/api/',{
        method : "POST",
        mode : 'cors',
        headers:{
            'Content-Type':'application/json',
            'X-CSRFToken': 'csrftoken'
        },
        body:JSON.stringify(input_data)
        })
        let data = await response.json()
        if (response.status===200){
            setLoanResult(data)
        }
        console.log(data)
    }

    return (
        <div> 
            <div className='form-box'>
            <form action="" className='loan-form' onSubmit={Handlesubmit}>
                <h1>Loan prediction</h1>

                <div className='select-paire'>
                    
                    <div className='select'>
                        <label htmlFor="gender"> Gender</label>
                        <select name="Gender" id="gender" onChange={handleChangeGender}>
                            <option key ='g_0' value = {1}>MALE</option>
                            <option key ='g_1' value = {0}>FEMALE</option>
                        </select>
                    </div>
                    
                    <div className='select'>
                        <label htmlFor="maried"> Maried</label>
                        <select name="Maried" id="maried" onChange={handleChangeMarried}>
                            <option key ='m_0' value = {1}>YES</option>
                            <option key ='m_1' value = {0}>NO</option>
                        </select>
                    </div>
                    
                </div>
                <div className='select-paire'>
                    <div className='select' >
                        <label htmlFor="education_id">Education</label>
                        <select name="Education" id="education_id" onChange={handleChangeEducation}>
                            <option key ='e_0' value = {1}>GRADUATED</option>
                            <option key ='e_1' value = {0}>NOT GRADUATED</option>
                        </select>
                    </div>

                    <div className='select' >
                        <label htmlFor="dependents_id">Dependents</label>
                        <select name="Dependents" id="Dependents_id" onChange={handleChangeDependents}>
                            <option key ='d_0' value = {0}>0</option>
                            <option key ='d_1' value = {1}>1</option>
                            <option key ='d_2' value = {2}>2</option>
                            <option key ='d_3' value = {3}>3+</option>
                        </select> 
                    </div>
                            
                </div>
                <div className='select-paire'>
                    <div className='select tree'>
                        <label htmlFor="credit_history_id"> Credit History</label>
                        <select name="credit_history" id="credit_history_id" onChange={handleChangeCreditHistory}>
                            <option key ='his_0' value = {0}>0</option>
                            <option key ='his_1' value = {1}>1</option>
                        </select>
                    </div>

                    <div className='select tree'>
                        <label htmlFor="Property_Area_id"> Property Area</label>
                        <select name="Property_Area" id="Property_Area_id" onChange={handleChangePropertyArea}>
                            <option key ='pa_0' value = {0}>RURAL</option>
                            <option key ='pa_1' value = {1}>SEMIRURAL</option>
                            <option key ='pa_2' value = {2}>URBAN</option>
                        </select>
                    </div>
                    <div className='select tree'>
                        <label htmlFor="Self_Employment_id"> Self Employment</label>
                        <select name="Self_Employment" id="Self_Employment_id" onChange={handleChangeEmployment}>
                            <option key ='se_0' value = {1}>YES</option>
                            <option key ='se_1' value = {0}>NO</option>
                        </select>
                    </div>
                
                </div>

                <div className='input-paire'>
                    <div className='input'>
                        <label htmlFor="applicant_income">Applicant Income</label>
                        <input type="number" name ="applicant_income" id = "applicant_income" onChange={handleApplicantIncome} min ='0' placeholder = '0' />
                    </div>

                    <div className='input'>
                        <label htmlFor="coapplicant_income">Coapplicant Income</label>
                        <input type="number" name ="coapplicant_income" id = "coapplicant_income"  onChange={handleCoapplicantIncome} min ='0' placeholder = '0' />
                    </div>
                </div>

                <div className='input-paire'>
                    <div className='input'>
                        <label htmlFor="loan_amount">Loan Ammount(100€ - 10000€)</label>
                        <input type="number" name ="loan_amount" id = "loan_amount" onChange={handleLoanAmount} min ='100' max ='10000' placeholder = '100' />
                    </div>

                    <div className='input'>
                        <label htmlFor="loan_amount_term">Loan Amount Term (days)</label>
                        <input type="number" name ="loan_amount_term" id = "loan_amount_term" onChange={handleLoanAmountTerm} min = '10' max ='4000' placeholder = '10'/>
                    </div>
                </div>
                <button type='submit' className='sub-button'>Make prediction</button>
                <br />
                <br />
                <div>
                    {decision()}
                </div>
                <div>
                    <p>{loan_result.input?.Gender}</p>
                </div>
            </form>
        </div>
    </div>
    )
    }

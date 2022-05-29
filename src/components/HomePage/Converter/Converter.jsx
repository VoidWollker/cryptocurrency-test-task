import React, { useState } from "react";
import {Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, InputGroupText} from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons'


export default function Converter({coins, selectedCurrency}){
    const [rigthInputVale, setRigthInputValue] = useState('')
    const [leftInputVale, setLeftInputValue] = useState('')
    const [selectedDropdownItem, setSelectedDropdownItem] = useState('')
    const [selectedDropdownIndex, setSelectedDropdownIndex] = useState(0)
    const [openDropdown, setOpenDropdown] = useState(false)

    const chooseItem = (e, choosenCurrencyName, choosenCurrencyIndex) =>{
        setSelectedDropdownItem(choosenCurrencyName)
        setSelectedDropdownIndex(choosenCurrencyIndex)
        calculate()
    }

    const calculate = () =>{
        setRigthInputValue(Number(leftInputVale) * coins[selectedDropdownIndex].market_data.current_price[selectedCurrency.symbol])
    }

    return(
        <div className="converter">
                <InputGroup className="converter-inputGroup">
                    <Input value={leftInputVale} onChange={e => {setLeftInputValue(e.target.value.replace(/\D/g, '')); calculate()}}/>
                </InputGroup>
                <FontAwesomeIcon icon={faArrowRightArrowLeft} className="converter-arrows"/>
                <InputGroup className="converter-inputGroup">
                    <Dropdown isOpen={openDropdown} toggle={setOpenDropdown(!openDropdown)}>
                        <DropdownToggle caret>{selectedDropdownItem.name}</DropdownToggle>
                        <DropdownMenu>
                            {coins.map((coin, index) =>{
                                if (coin.name !== selectedDropdownItem.name) return(
                                    <DropdownItem onClick={(e) => {chooseItem(e, currencyName, index); console.log(index)}}>{coin.name}</DropdownItem>
                                )
                            })}
                        </DropdownMenu>
                    </Dropdown>
                    <Input value={rigthInputVale} onChange={e => {setRigthInputValue(e.target.value.replace(/\D/g, ''))}}/>
                </InputGroup>
            </div>
    )

}
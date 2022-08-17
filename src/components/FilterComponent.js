import { Box } from '@mui/system'
import React from 'react'

const FilterComponent = ({colorFilter,priceFilter,genderFilter,typeFilter,handleOnChange}) => {
  return (
    <Box paddingX={1}>
            <Box className="color">
              <h5>Colors</h5>
              <label>
                <input
                  id="isRedChecked"
                  title="Red"
                  type="checkbox"
                  label="red"
                  name="redcolor"
                  checked={colorFilter.isRedChecked}
                  onChange={handleOnChange}
                />
                Red
              </label>
              <label>
                <input
                  type="checkbox"
                  label="Blue"
                  title="Blue"
                  name="bluecolor"
                  id="isBlueChecked"
                  checked={colorFilter.isBlueChecked}
                  onChange={handleOnChange}
                />
                Blue
              </label>
              <label>
                <input
                  type="checkbox"
                  title="Green"
                  label="Green"
                  name="greencolor"
                  id="isGreenChecked"
                  checked={colorFilter.isGreenChecked}
                  onChange={handleOnChange}
                />
                Green
              </label>
            </Box>
            <Box className="color">
              <h5>Gender</h5>
              <label>
                <input
                  id="isMenChecked"
                  checked={genderFilter.isMenChecked}
                  onChange={handleOnChange}
                  type="checkbox"
                  label="men"
                  name="mengender"
                  title="Men"
                />
                Men
              </label>
              <label>
                <input
                  id="isWomenChecked"
                  checked={genderFilter.isWomenChecked}
                  onChange={handleOnChange}
                  type="checkbox"
                  label="Women"
                  title="Women"
                  name="genderwomen"
                />
                Women
              </label>
            </Box>
            <Box className="Price">
              <h5>Price</h5>
              <label>
                <input id="isPrice1Checked" type="checkbox" label="0-250" 
                title="0-250"checked={priceFilter.isPrice1Checked} onChange={handleOnChange} name="price1"/>
                0-Rs.250
              </label>

              <label>
                <input id="isPrice2Checked" type="checkbox" label="251-450" 
                checked={priceFilter.isPrice2Checked}
                 onChange={handleOnChange} name="price2" title="251-450"/>
                Rs.251-450
              </label>
              <label>
                <input id="isPrice3Checked"  checked={priceFilter.isPrice3Checked} type="checkbox" label="Rs450" onChange={handleOnChange} name="price3"
                title="450" />
                Rs.450
              </label>
            </Box>
            <Box className="Type">
              <h5>Type</h5>
              <label>
                <input  type="checkbox" label="polo"  id="isPoloChecked"
                  checked={typeFilter.isPoloChecked}
                  onChange={handleOnChange}
                  title="Polo"
                  name="typepolo"/>
                Polo
              </label>
              <label>
                <input type="checkbox" label="Hoodie"  id="isHoodieChecked"
                  checked={typeFilter.isHoodieChecked}
                  onChange={handleOnChange}
                  title="Hoodie"
                  name="typeHoodie"/>
                Hoodie
              </label>
              <label>
                <input  type="checkbox" label="basic" id="isBasicChecked"
                  checked={typeFilter.isBasicChecked}
                  onChange={handleOnChange}
                  title="Basic"
                  name="typeBasic"/>
                Basic
              </label>
            </Box>
          </Box>
  )
}

export default FilterComponent
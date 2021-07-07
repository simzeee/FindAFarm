import React, {useState} from 'react'
import { getAllAmenities } from '../../store/amenities';
import { useDispatch, useSelector } from 'react-redux';

export default function Amenity({amenities}){

  const allAmenities = useSelector((state)=> state.amenities)
  
  function amenitiesSetter(state){

    const amenitiesState = {...state.amenities}
  
    amenities.forEach((amenity)=>{
      amenitiesState[amenity.id] = {...allAmenities[amenity.id],selected:true}
    })
    
    return amenitiesState
  }

  // const []
  

  // const [myAmenities, setMyAmenities] = useState(allAmenities.map((amenity)=>[amenity.amenityName]))

  return (
    <>
    <div>
          <label>
            <h4>
            Available Amenities:
              </h4>
            </label>
      {Object.values(allAmenities)?.map((amenity)=>(
        <div>
            <label>
            {amenity.amenityName}
              </label>
              <input
                type="checkbox"
                id={amenity.amenityName}
                value={!!amenity.selected}
                // onClick={()=>
                //   }
              ></input>  
            </div>
      ))}
    </div>
    {/* <label> */}
              {/* <h4>Amenities:</h4>
            </label>
            <div>
              <label>Goat Yoga</label>
              <input
                type="checkbox"
                id="goatYoga"
                value={goatYoga}
                onClick={updateGoatYoga}
              ></input>
              <label>Table Making</label>
              <input
                type="checkbox"
                id="tableMaking"
                value={tableMaking}
                onClick={updateTableMaking}
              ></input>
              <label>Pig Roast</label>
              <input
                type="checkbox"
                id="pigRoast"
                value={pigRoast}
                onClick={updatePigRoast}
              ></input>
            </div> */}

  </>
  )
}
import React from 'react';
import Carousell from './Components/Carousell';
import './App.css';

function App() {
  const imgAdresses = [
    'https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?s=1024x768',
    'https://cf.bstatic.com/images/hotel/max1024x768/222/222713113.jpg',
    'https://cf.bstatic.com/images/hotel/max1024x768/165/165079288.jpg',
    'https://assets.tivolihotels.com/image/upload/q_auto,f_auto/media/minor/tivoli/images/brand_level/footer/1920x1000/thr_aboutus1_1920x1000.jpg'
  ];
  return (
    <div className="App" style={{ display: 'flex' }}>
      <Carousell imgs={imgAdresses} transitionThreshold={50} />
    </div>
  );
}

export default App;
